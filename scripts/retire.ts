#!/usr/bin/env node
/**
 * Retire a lesson: delete its files and unwire it from the three registries.
 *
 *   npm run retire -- --lesson 07
 *   npm run retire -- --lesson 07 --dry-run
 *   npm run retire -- --all
 *
 * The opposite of `npm run new`. Doing this by hand has been done twice, and
 * each time the hand edit had to get the same three things right: the two
 * registries, the course record, and the rule that deleting an MP3 means
 * resetting its `audio-meta-NN.json` in the same commit. Here the audio
 * directory and its measured timings are one removal — they cannot come
 * apart, so a lesson can never render silent while still claiming measured
 * durations.
 *
 * A course record that loses its last lesson goes with it. An empty course
 * record is not a course: it exports nothing, it names nothing, and leaving
 * one behind is exactly the hand cleanup these commands exist to remove.
 * `--all` therefore leaves `COURSES` empty, which is why `src/course.ts`
 * annotates it rather than inferring its element type.
 *
 * This is a workspace command. It changes nothing about what a package
 * contains, how it is validated, or what it attests, and it never touches
 * `meta.status`: it removes a lesson, it does not un-check one.
 *
 * What it deliberately does not delete:
 *
 *   drafts/   the accuracy record is where the content developer's 4.01.1
 *             check is written down, and it is the judgment list behind the
 *             numbers that reach the word count formula — supporting
 *             documentation under 9.02.2(2)(ii);
 *   sources/  the extractions the narration cites.
 *
 * Both are program-development records. Deleting them is a
 * human decision made by hand, not a side effect of clearing a workspace.
 * This command prints where they are and leaves them.
 *
 * Git history is the archive — the MP3s are committed source that cannot be
 * regenerated identically (regenerating spends ElevenLabs credits and gives a
 * different take). That is why a dirty working tree and an untracked MP3 are
 * refusals rather than warnings: a file with no history has nowhere to be
 * recovered from. `--force` waives the dirty-tree refusal and the
 * confirmation. Nothing waives the untracked-MP3 refusal.
 */

import { createInterface } from "node:readline";
import { existsSync, readdirSync, rmSync, statSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { LESSONS, type LessonId } from "../src/lessons";
import {
  COURSE_TS,
  LESSONS_TS,
  QUESTIONS_TS,
  readCourses,
  unregisterCourse,
  unregisterCourseLesson,
  unregisterLesson,
  unregisterQuestions,
} from "./registry";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

/* ------------------------------------------------------------------ */
/* Git                                                                 */
/* ------------------------------------------------------------------ */

const git = (...args: string[]) => {
  const r = spawnSync("git", args, { cwd: root, encoding: "utf8" });
  if (r.status !== 0) {
    // Every refusal here is a question about history, so there is nothing
    // this command can safely do without git.
    console.error(
      `\n  REFUSED: \`git ${args.join(" ")}\` failed. Git history is this ` +
        `command's archive — it cannot judge what is safe to delete without ` +
        `it.\n${r.stderr ?? ""}\n  Nothing was removed.\n`
    );
    process.exit(1);
  }
  return r.stdout;
};

/** Porcelain status lines for the given paths, dropping empty output. */
const statusOf = (paths: string[]) =>
  paths.length === 0
    ? []
    : git("status", "--porcelain", "--", ...paths).split("\n").filter(Boolean);

const trackedUnder = (path: string) =>
  new Set(git("ls-files", "--", path).split("\n").filter(Boolean));

/* ------------------------------------------------------------------ */
/* The plan                                                            */
/* ------------------------------------------------------------------ */

type Plan = {
  id: string;
  packageId: string;
  status: string;
  kind: string;
  /** Removal-set paths git tracks or could track. */
  versioned: string[];
  /** Removal-set paths that are gitignored and reproducible. */
  ignored: string[];
  /** MP3s on disk that git does not track — invariant 3's refusal. */
  untrackedMp3s: string[];
  /** Records left behind on purpose, printed and not removed. */
  leftBehind: string[];
};

const exists = (rel: string) => existsSync(join(root, rel));

const mp3sUnder = (rel: string): string[] => {
  if (!exists(rel)) return [];
  return readdirSync(join(root, rel))
    .filter((f) => f.endsWith(".mp3"))
    .sort()
    .map((f) => `${rel}/${f}`);
};

const distEntriesFor = (packageId: string): string[] => {
  const dist = join(root, "dist");
  if (!existsSync(dist)) return [];
  return readdirSync(dist)
    .filter((f) => f.startsWith(packageId))
    .sort()
    .map((f) => `dist/${f}`);
};

const draftsFor = (packageId: string): string[] => {
  const drafts = join(root, "drafts");
  if (!existsSync(drafts)) return [];
  return readdirSync(drafts)
    .filter((f) => f.includes(packageId) && !f.startsWith("."))
    .sort()
    .map((f) => `drafts/${f}`);
};

const sourcesDirs = (): string[] => {
  const sources = join(root, "sources");
  if (!existsSync(sources)) return [];
  const entries = readdirSync(sources).filter((f) => !f.startsWith("."));
  if (entries.length === 0) return [];
  return entries
    .sort()
    .map((f) => `sources/${f}${statSync(join(sources, f)).isDirectory() ? "/" : ""}`);
};

const planFor = (id: string): Plan => {
  const meta = LESSONS[id].meta as {
    courseCode?: string;
    status?: string;
    kind?: string;
  };
  const packageId = meta.courseCode ?? "(no courseCode)";

  const audioDir = `public/audio/${id}`;
  const versioned = [
    `src/lesson-${id}.ts`,
    `src/questions-${id}.json`,
    `src/audio-meta-${id}.json`,
    audioDir,
    `guide/${id}`,
  ].filter(exists);

  const ignored = [`out/lesson-${id}.mp4`].filter(exists).concat(distEntriesFor(packageId));

  const tracked = trackedUnder(audioDir);
  const untrackedMp3s = mp3sUnder(audioDir).filter((f) => !tracked.has(f));

  return {
    id,
    packageId,
    status: meta.status ?? "(none)",
    kind: meta.kind ?? "video",
    versioned,
    ignored,
    untrackedMp3s,
    leftBehind: draftsFor(packageId),
  };
};

/* ------------------------------------------------------------------ */
/* Refusals                                                            */
/* ------------------------------------------------------------------ */

const refuse = (message: string): never => {
  console.error(`\n  REFUSED: ${message}\n\n  Nothing was removed.\n`);
  process.exit(1);
};

/* ------------------------------------------------------------------ */
/* Main                                                                */
/* ------------------------------------------------------------------ */

const usage = () =>
  `\n  Usage: npm run retire -- --lesson <id>` +
  `\n         npm run retire -- --all` +
  `\n  Flags: --dry-run   print the removal set and change nothing` +
  `\n         --force     skip the confirmation and the dirty-tree refusal` +
  `\n  Ids:   ${Object.keys(LESSONS).sort().join(", ") || "(none registered)"}\n`;

const main = async () => {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const force = args.includes("--force");
  const all = args.includes("--all");
  const at = args.indexOf("--lesson");
  const only = at !== -1 ? args[at + 1] : undefined;

  if (all === (only !== undefined)) {
    console.error(usage());
    process.exit(1);
  }

  /* Refusal 1: an id nobody registers. */
  let ids: string[];
  if (all) {
    ids = Object.keys(LESSONS).sort();
    if (ids.length === 0) {
      console.log(`\n  No lessons are registered. Nothing to retire.\n`);
      return;
    }
  } else {
    if (!(only! in LESSONS)) {
      refuse(
        `no lesson "${only}". Registered ids: ` +
          `${Object.keys(LESSONS).sort().join(", ") || "(none)"}.`
      );
    }
    ids = [only!];
  }

  const plans = ids.map(planFor);

  /* Which course records lose their last lesson in this run. Computed from
     the file as it stands, before anything is removed, so --dry-run can name
     them alongside the file removals. */
  const retiring = new Set(plans.map((p) => p.packageId));
  const emptied = readCourses(root).filter(
    (c) => c.lessonIds.length > 0 && c.lessonIds.every((l) => retiring.has(l))
  );

  /* Refusal 2: uncommitted work under anything about to be removed. */
  if (!force) {
    const paths = plans.flatMap((p) => p.versioned);
    const dirty = statusOf(paths);
    if (dirty.length > 0) {
      refuse(
        `the working tree has uncommitted changes under the removal set. ` +
          `Git history is the archive here, and an uncommitted file has no ` +
          `history to be recovered from — commit or stash first:\n` +
          dirty.map((l) => `\n    ${l}`).join("") +
          `\n\n  (--force waives this refusal, and the confirmation with it.)`
      );
    }
  }

  /* Refusal 3: audio git never saw. --force does not waive this one. */
  const untracked = plans.flatMap((p) => p.untrackedMp3s);
  if (untracked.length > 0) {
    refuse(
      `these MP3s are not tracked by git, and the MP3s are committed source, ` +
        `not build output — they cannot be regenerated identically, and ` +
        `regenerating spends ElevenLabs credits. Git history is the only ` +
        `archive, so deleting an untracked MP3 destroys it:\n` +
        untracked.map((f) => `\n    ${f}`).join("") +
        `\n\n  Commit them first. --force does not waive this refusal.`
    );
  }

  /* ---- the plan, printed --------------------------------------- */

  console.log(`\n  Retiring ${plans.length} lesson(s): ${ids.join(", ")}\n`);

  for (const p of plans) {
    console.log(`  LESSON ${p.id}  ${p.packageId}  ${p.kind}  [${p.status}]`);
    for (const f of p.versioned) console.log(`    rm  ${f}`);
    for (const f of p.ignored) console.log(`    rm  ${f}   (gitignored, reproducible)`);
    if (p.versioned.length + p.ignored.length === 0) console.log(`    (no files on disk)`);
    console.log(`    edit ${LESSONS_TS}, ${QUESTIONS_TS}, ${COURSE_TS}`);
    console.log("");
  }

  for (const c of emptied) {
    console.log(
      `  COURSE ${c.courseCode}  ${c.title}\n` +
        `    rm  ${c.constName} in ${COURSE_TS}   (loses its last lesson)\n`
    );
  }

  /* ---- the warning, which does not block ------------------------ */

  for (const p of plans) {
    if (p.status !== "checked") continue;
    if (exists(`dist/${p.packageId}.zip`)) continue;
    console.log(
      `  WARNING: lesson ${p.id} (${p.packageId}) is "checked" but there is no\n` +
        `  dist/${p.packageId}.zip on disk. The transcript of record leaves this\n` +
        `  repo only inside an exported package, and superCPE retains it there\n` +
        `  as program materials under 9.02.2(7). If this lesson's package was\n` +
        `  never exported and ingested, retiring it leaves git history as the\n` +
        `  only copy.\n`
    );
  }

  const leftBehind = [...new Set(plans.flatMap((p) => p.leftBehind))].sort();
  const sources = sourcesDirs();
  if (leftBehind.length + sources.length > 0) {
    console.log(`  Left in place — program-development records:`);
    for (const f of leftBehind)
      console.log(`    keep  ${f}   (4.01.1 accuracy record; 9.02.2(2)(ii))`);
    for (const f of sources) console.log(`    keep  ${f}`);
    console.log(`  Deleting these is a human decision, made by hand.\n`);
  }

  if (dryRun) {
    console.log(`  Dry run. Nothing was changed.\n`);
    return;
  }

  /* ---- confirm --------------------------------------------------- */

  if (!force) {
    const rl = createInterface({ input: process.stdin, output: process.stdout });
    const answer = await new Promise<string>((resolve) =>
      rl.question(`  Remove all of the above? Type y to confirm: `, (a) => {
        rl.close();
        resolve(a);
      })
    );
    if (answer.trim().toLowerCase() !== "y") {
      console.log(`\n  Cancelled. Nothing was removed.\n`);
      return;
    }
    console.log("");
  }

  /* ---- apply ----------------------------------------------------- */

  for (const p of plans) {
    // The audio directory and its measured timings go in one operation:
    // both are in `versioned`, so they cannot come apart.
    for (const f of [...p.versioned, ...p.ignored]) {
      rmSync(join(root, f), { recursive: true, force: true });
      console.log(`  removed ${f}`);
    }

    unregisterLesson(root, p.id);
    unregisterQuestions(root, p.id);
    const course = unregisterCourseLesson(root, p.packageId);
    console.log(`  unregistered ${p.id} from ${LESSONS_TS} and ${QUESTIONS_TS}`);

    if (course) {
      console.log(
        `  removed ${p.packageId} from ${course.courseConst}.lessons in ${COURSE_TS}` +
          ` (was position ${course.position})`
      );
      if (course.remaining.length === 0) {
        // An empty course record is not a course. It goes in the same
        // operation, so the two cannot come apart.
        if (unregisterCourse(root, course.courseConst)) {
          console.log(
            `  removed course ${course.courseConst} from ${COURSE_TS} — it lost ` +
              `its last lesson`
          );
        }
      } else {
        console.log(
          `  NOTE: ${course.courseConst}.lessons positions are now ` +
            `${course.remaining.join(", ")} — position ${course.position} is a gap.\n` +
            `  Nothing renumbered them: superCPE ordered the course by these ` +
            `numbers, so closing a gap is a content decision, not a cleanup.`
        );
      }
    } else {
      console.log(`  no ${COURSE_TS} entry claimed ${p.packageId} — nothing to remove there`);
    }
    console.log("");
  }

  /* ---- closing summary ------------------------------------------- */

  console.log(`  Retired: ${ids.join(", ")}`);
  console.log(
    `  Git history still resolves every retired lesson module and every MP3\n` +
      `  at the commit before this one — that is the archive, and the reason\n` +
      `  a dirty tree and untracked audio are refusals.`
  );
  console.log(
    `  Each lesson's audio directory and its audio-meta-NN.json were removed\n` +
      `  together, so nothing is left claiming measured timings it cannot play.`
  );
  if (emptied.length > 0) {
    console.log(
      `  Course record(s) removed with their last lesson: ` +
        `${emptied.map((c) => c.constName).join(", ")}.`
    );
  }
  if (leftBehind.length + sources.length > 0) {
    console.log(`  Left in place: ${[...leftBehind, ...sources].join(", ")}`);
  }
  console.log(`\n  Now run:  npm run typecheck && npm run check\n`);
};

main();
