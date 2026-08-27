#!/usr/bin/env node
/**
 * Check every lesson module against the invariants the slide components and the
 * credit rules depend on.
 *
 * These rules already existed, written down in three places: lesson-01.ts's doc
 * comment, LESSON-RUNBOOK.md's "rules that will bite you", and the head of each
 * lesson file. None of them was executable. `generate --dry-run` reports marker
 * counts but does not fail on a mismatch, and finding out that way costs an
 * ElevenLabs round trip. This runs over the committed content instead, offline
 * and free.
 *
 * Usage:
 *   npm run check                 # every lesson
 *   npm run check -- --lesson 06  # one lesson
 *
 * Exit code is 1 if any ERROR fired, 0 otherwise. Warnings never fail the run.
 *
 * ERROR vs WARN is the difference between a wrong video and a wrong preview.
 * An ERROR means the rendered MP4 is defective: an element that never appears,
 * a blank sheet, audio that no longer matches its narration. A WARN means only
 * the silent preview is off, because `estimatedSeconds` and the `reveals`
 * fallback are both discarded the moment measured audio exists and neither may
 * ever reach a credit calculation (7.02.7).
 */

import { COURSE } from "../src/course";
import { LESSONS, type LessonId } from "../src/lessons";
import { QUESTIONS } from "../src/questions";

/* ------------------------------------------------------------------ */
/* Configuration                                                       */
/* ------------------------------------------------------------------ */

/** The constant lesson-01.ts documents. Estimates are derived from it. */
const WPM = 130;

/** Attention resets every 20–30s; a new sheet is the cheapest reset. */
const SHEET_MIN_SECONDS = 40;
const SHEET_MAX_SECONDS = 75;

/**
 * Which `figure.kind` each generic slide component accepts.
 *
 * Every component in slides.tsx early-returns null on a kind it does not
 * recognise, so a `Calc` slide carrying a `facts` figure renders a completely
 * blank sheet for the full length of its block. That is the single most
 * expensive mistake available here and nothing else catches it.
 *
 * This is a second copy of a mapping that lives in slides.tsx, and it is
 * deliberate: importing slides.tsx would pull React, Remotion, and
 * @remotion/google-fonts into a plain node script for the sake of five strings.
 * The `Block["slide"]` union already stops a misspelled component name at
 * compile time, so what is duplicated here is only the pairing.
 */
const FIGURE_KIND_FOR: Record<string, string> = {
  Statement: "statement",
  Facts: "facts",
  Calc: "calc",
  List: "list",
  Compare: "compare",
};

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

type AnyBlock = {
  id: string;
  sheet: string;
  citation: string;
  slide: string;
  figure?: Record<string, unknown>;
  narration: string;
  reveals: number[];
  estimatedSeconds: number;
  speech?: string;
};

type LessonModule = {
  meta: Record<string, string>;
  blocks: AnyBlock[];
  transcriptOf: (b: AnyBlock) => string;
  hasAudio: (b: AnyBlock) => boolean;
  durationOf: (b: AnyBlock) => number;
  revealsOf: (b: AnyBlock) => number[];
  usingEstimates: boolean;
  totalSeconds: number;
};

type Finding = { level: "ERROR" | "WARN"; block: string; message: string };

/**
 * Label a finding by id AND sheet. Duplicate ids are one of the things being
 * checked for, so labelling by id alone makes exactly the case that matters
 * unreadable — two findings on "block-04" with no way to tell which is which.
 */
const label = (b: AnyBlock) => `${b.id} ${b.sheet}`;

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const markerCount = (s: string) => (s.match(/\[\[r\]\]/g) ?? []).length;

const wordCount = (s: string) => s.split(/\s+/).filter(Boolean).length;

const expectedSeconds = (words: number) => Math.round((words / WPM) * 60);

/** The revealable elements in a figure, whichever key this kind uses. */
const figureElements = (figure: Record<string, unknown> | undefined): number | null => {
  if (!figure) return null;
  for (const key of ["lines", "rows", "items", "columns"]) {
    const v = figure[key];
    if (Array.isArray(v)) return v.length;
  }
  return null;
};

const mmss = (seconds: number) =>
  `${Math.floor(seconds / 60)}m ${String(Math.round(seconds % 60)).padStart(2, "0")}s`;

/* ------------------------------------------------------------------ */
/* The checks                                                          */
/* ------------------------------------------------------------------ */

function checkLesson(mod: LessonModule): Finding[] {
  const findings: Finding[] = [];
  const err = (b: AnyBlock, message: string) =>
    findings.push({ level: "ERROR", block: label(b), message });
  const warn = (b: AnyBlock, message: string) =>
    findings.push({ level: "WARN", block: label(b), message });

  const seen = new Set<string>();

  for (const b of mod.blocks) {
    /* --- identity ------------------------------------------------- */

    if (seen.has(b.id)) {
      err(b, `duplicate block id — the mp3 filename collides and one block's audio silently overwrites the other`);
    }
    seen.add(b.id);

    const isTitle = b.slide === "Title";

    if (isTitle && b.narration.trim().length > 0) {
      err(b, `a Title block must have empty narration — usingEstimates excludes narration-less blocks, and a narrated title makes it permanently true`);
    }
    if (!isTitle && b.narration.trim().length === 0) {
      err(b, `empty narration on a non-Title block — it will render silent for ${b.estimatedSeconds}s`);
    }

    /* --- figure and slide pairing --------------------------------- */

    const generic = isTitle || b.slide in FIGURE_KIND_FOR;

    if (!generic) {
      // Lesson 01's bespoke components (Misconception, FiveSteps, and the rest)
      // carry their content inside the component rather than in a figure. There
      // is nothing here to count, so the figure checks below are skipped rather
      // than failed. Their element counts are a real blind spot: a bespoke
      // component with fewer elements than its block has markers cannot be
      // detected without reading the JSX.
      warn(b, `bespoke slide component "${b.slide}" — figure checks skipped, element count not verifiable from data`);
    } else if (isTitle) {
      if (b.figure) err(b, `a Title block should not carry a figure — Title reads meta, not figure`);
    } else {
      const wanted = FIGURE_KIND_FOR[b.slide];
      if (!b.figure) {
        err(b, `slide "${b.slide}" has no figure — the component returns null and the sheet renders blank for the whole block`);
      } else if (b.figure.kind !== wanted) {
        err(b, `slide "${b.slide}" wants figure.kind "${wanted}" but got "${String(b.figure.kind)}" — the component returns null and the sheet renders blank for the whole block`);
      }
    }

    /* --- markers vs reveals --------------------------------------- */

    const markers = markerCount(b.narration);
    const fallback = b.reveals;

    // The title sheet has no narration, so its three reveals are hand-set and
    // have no markers to match. Everything else must agree.
    if (!isTitle && markers !== fallback.length) {
      err(b, `${markers} marker(s) but reveals has ${fallback.length} entr${fallback.length === 1 ? "y" : "ies"} — slides index reveals positionally, so the mismatch renders undefined and the element never appears`);
    }

    if (fallback.length === 0) {
      err(b, `empty reveals array — nothing on this sheet will ever appear`);
    }

    const ascending = fallback.every((r, i) => i === 0 || r > fallback[i - 1]);
    if (!ascending) err(b, `reveals are not strictly ascending: [${fallback.join(", ")}]`);
    if (fallback.some((r) => r < 0)) err(b, `negative reveal time in [${fallback.join(", ")}]`);

    /* --- stale audio ---------------------------------------------- */

    const measured = mod.hasAudio(b);
    if (measured && !isTitle) {
      const measuredReveals = mod.revealsOf(b);
      if (measuredReveals.length !== markers) {
        err(b, `narration has ${markers} marker(s) but the measured audio recorded ${measuredReveals.length} — the mp3 is stale relative to the text. Regenerate this block before rendering`);
      }
    }

    /* --- figure element count ------------------------------------- */

    const elements = figureElements(b.figure);
    if (elements !== null && elements < fallback.length) {
      err(b, `figure has ${elements} element(s) but ${fallback.length} reveal(s) — the extra markers are wasted and the last ones fire on nothing`);
    }

    /* --- pacing --------------------------------------------------- */

    const actual = mod.durationOf(b);
    if (!isTitle && (actual < SHEET_MIN_SECONDS || actual > SHEET_MAX_SECONDS)) {
      warn(b, `${Math.round(actual)}s is outside the ${SHEET_MIN_SECONDS}–${SHEET_MAX_SECONDS}s sheet window${measured ? " (measured)" : " (estimated)"}`);
    }

    /* --- estimate hygiene ----------------------------------------- */
    /* Only meaningful until audio exists; measured duration always wins.  */

    if (!isTitle && !measured) {
      const words = wordCount(mod.transcriptOf(b));
      const want = expectedSeconds(words);
      if (b.estimatedSeconds !== want) {
        warn(b, `estimatedSeconds is ${b.estimatedSeconds} but ${words} words at ${WPM} wpm is ${want}`);
      }
      if (fallback[0] < 0.5) {
        warn(b, `first reveal at ${fallback[0]}s — nothing is on screen before it`);
      }
      const last = fallback[fallback.length - 1];
      if (last > b.estimatedSeconds - 3) {
        warn(b, `last reveal at ${last}s leaves under 3s before the sheet changes`);
      }
    }
  }

  /* --- speech drift ----------------------------------------------- */

  for (const b of mod.blocks) {
    if (b.speech && markerCount(b.speech) !== markerCount(b.narration)) {
      err(b, `speech and narration carry different marker counts — speech is what gets timed, narration is the transcript of record, and they must agree`);
    }
  }

  for (const k of ["courseCode", "courseTitle", "lessonTitle", "position",
    "deliveryMethod", "fieldOfStudy", "revision", "revisionDate"]) {
    if (!mod.meta[k]) {
      findings.push({
        level: "ERROR",
        block: "meta",
        message: `meta.${k} is missing or empty — it renders as undefined on the sheet`,
      });
    }
  }

  /* --- review gate ------------------------------------------------- */

  const status = mod.meta.status;
  if (status !== "draft" && status !== "reviewed") {
    findings.push({
      level: "ERROR",
      block: "meta",
      message: `meta.status must be "draft" or "reviewed", got "${status}" — export gates on this value`,
    });
  } else if (status === "draft") {
    // A warning, not an error: a draft renders fine, it just cannot ship.
    // Export refuses it; this makes the state visible without trying.
    findings.push({
      level: "WARN",
      block: "meta",
      message: `status is "draft" — export will refuse it until the human works through drafts/${mod.meta.courseCode}-review.md and sets status: "reviewed" by hand`,
    });
  }

  /* --- course-record mirror ----------------------------------------- */
  /* COURSE.lessons[].status mirrors meta.status (the module is the       */
  /* authority — it gates export); a disagreement means course.ts was     */
  /* not updated when the lesson's status changed, or vice versa.         */

  const courseLesson = COURSE.lessons.find((l) => l.lessonId === mod.meta.courseCode);
  if (!courseLesson) {
    findings.push({
      level: "WARN",
      block: "meta",
      message: `no COURSE.lessons entry for "${mod.meta.courseCode}" in src/course.ts — export will refuse this lesson (course_code/position come from the course record)`,
    });
  } else if (courseLesson.status !== status) {
    findings.push({
      level: "WARN",
      block: "meta",
      message: `COURSE.lessons[].status is "${courseLesson.status}" but meta.status is "${status}" — src/course.ts mirrors the module and one of them is stale`,
    });
  }

  return findings;
}

/* ------------------------------------------------------------------ */
/* Course-wide question rules                                          */
/* ------------------------------------------------------------------ */
/*
 * superCPE feature 007 enforces these across the whole course on ingest;
 * they are applied here first so a course does not fail readiness on
 * arrival. All ERRORs: a violation is something superCPE will refuse.
 *
 *   1. Four assessment questions per lesson, each mapped to a different
 *      one of the lesson's objectives, so every objective is measured.
 *   2. No assessment stem duplicates a review stem anywhere in the course
 *      (compared lowercased, whitespace collapsed, trailing punctuation
 *      stripped). Checked here as: no two stems anywhere may collide.
 *   3. Assessment questions have four choices; review questions at least
 *      three (two-choice review questions do not count toward the minimum).
 *   4. Five review questions per lesson, each with `after_block` on the
 *      narrated block it tests, never two on the same block.
 *   5. Feedback on every question.
 */

const REVIEW_PER_LESSON = 5;
const ASSESSMENT_PER_LESSON = 4;

const normalizeStem = (stem: string): string =>
  stem.toLowerCase().replace(/\s+/g, " ").trim().replace(/[.?!…:;,]+$/, "");

function checkCourseQuestions(ids: LessonId[]): Finding[] {
  const findings: Finding[] = [];
  const err = (block: string, message: string) =>
    findings.push({ level: "ERROR", block, message });

  // Rule 2: duplicate stems anywhere in the course, review and assessment.
  const seenStems = new Map<string, string>(); // normalized stem -> "lesson id q-id"
  for (const id of ids) {
    for (const q of QUESTIONS[id]) {
      const where = `${id} ${q.id}`;
      const norm = normalizeStem(q.stem);
      const first = seenStems.get(norm);
      if (first) {
        err(where, `stem duplicates ${first} after normalization — a question testing the same fact must ask it differently (course rule 2)`);
      } else {
        seenStems.set(norm, where);
      }
    }
  }

  for (const id of ids) {
    const mod = LESSONS[id] as unknown as LessonModule;
    const questions = QUESTIONS[id];
    const narrated = mod.blocks.filter((b) => b.narration.trim().length > 0).length;
    const objectiveIds = (
      (mod.meta as unknown as { learningObjectives: { id: string }[] }).learningObjectives ?? []
    ).map((o) => o.id);

    const review = questions.filter((q) => q.kind === "review");
    const assessment = questions.filter((q) => q.kind === "assessment");

    // Rules 1 and 4: the counts.
    if (review.length !== REVIEW_PER_LESSON) {
      err(`${id} questions`, `${review.length} review question(s), rule 4 requires ${REVIEW_PER_LESSON}`);
    }
    if (assessment.length !== ASSESSMENT_PER_LESSON) {
      err(`${id} questions`, `${assessment.length} assessment question(s), rule 1 requires ${ASSESSMENT_PER_LESSON}`);
    }

    // Rule 4: review placement — on a real narrated block, one per block.
    const blocksUsed = new Map<number, string>();
    for (const q of review) {
      const where = `${id} ${q.id}`;
      if (q.after_block === undefined) {
        err(where, `review question has no after_block — superCPE cannot place it (5.01.2.1)`);
        continue;
      }
      if (!Number.isInteger(q.after_block) || q.after_block < 1 || q.after_block > narrated) {
        err(where, `after_block ${q.after_block} is outside 1..${narrated} (the lesson's narrated blocks)`);
        continue;
      }
      const already = blocksUsed.get(q.after_block);
      if (already) {
        err(where, `after_block ${q.after_block} already carries ${already} — never two review questions on the same block (rule 4)`);
      } else {
        blocksUsed.set(q.after_block, q.id);
      }
    }
    for (const q of assessment) {
      if (q.after_block !== undefined) {
        err(`${id} ${q.id}`, `assessment question carries after_block — placement is for review questions only`);
      }
    }

    // Rule 3: choice counts.
    for (const q of questions) {
      const min = q.kind === "assessment" ? 4 : 3;
      if (q.choices.length < min) {
        err(`${id} ${q.id}`, `${q.choices.length} choices — ${q.kind} questions need at least ${min} (rule 3)`);
      }
      if (!q.choices.some((c) => c.id === q.correct)) {
        err(`${id} ${q.id}`, `correct answer "${q.correct}" is not among the choice ids`);
      }
    }

    // Rule 5: feedback, and the contract's objective mapping.
    for (const q of questions) {
      if (!q.feedback || q.feedback.trim().length === 0) {
        err(`${id} ${q.id}`, `no feedback — every question explains the right answer, the misunderstandings, and the block to re-study (rule 5, 5.01.2.2)`);
      }
      if (!q.objective_ids || q.objective_ids.length === 0) {
        err(`${id} ${q.id}`, `maps to no learning objective — superCPE rejects it`);
      } else {
        for (const lo of q.objective_ids) {
          if (!objectiveIds.includes(lo)) {
            err(`${id} ${q.id}`, `objective "${lo}" is not among the lesson's learningObjectives (${objectiveIds.join(", ")})`);
          }
        }
      }
    }

    // Rule 1: assessment coverage — each question a different objective,
    // every objective measured.
    const coveredBy = new Map<string, string>();
    for (const q of assessment) {
      for (const lo of q.objective_ids ?? []) {
        const already = coveredBy.get(lo);
        if (already) {
          err(`${id} ${q.id}`, `objective ${lo} is already assessed by ${already} — each assessment question maps to a different objective (rule 1)`);
        } else {
          coveredBy.set(lo, q.id);
        }
      }
    }
    for (const lo of objectiveIds) {
      if (!coveredBy.has(lo)) {
        err(`${id} questions`, `objective ${lo} has no assessment question — every objective must be measured (rule 1, 6.01.2)`);
      }
    }
  }

  return findings;
}

/* ------------------------------------------------------------------ */
/* Report                                                              */
/* ------------------------------------------------------------------ */

function main() {
  const argv = process.argv.slice(2);
  const at = argv.indexOf("--lesson");
  const only = at >= 0 ? argv[at + 1] : null;

  // Sorted, not insertion order. A key that looks like an array index ("99")
  // is enumerated before one that does not ("01"), so relying on the order
  // lessons.ts declares them in would put lessons in the wrong sequence the
  // first time an id loses its leading zero.
  const ids = (Object.keys(LESSONS) as LessonId[])
    .sort()
    .filter((id) => !only || id === only);

  if (only && ids.length === 0) {
    console.error(`No lesson "${only}". Known: ${(Object.keys(LESSONS) as LessonId[]).sort().join(", ")}`);
    process.exit(1);
  }

  let errors = 0;
  let warnings = 0;

  for (const id of ids) {
    const mod = LESSONS[id] as unknown as LessonModule;
    const findings = checkLesson(mod);
    errors += findings.filter((f) => f.level === "ERROR").length;
    warnings += findings.filter((f) => f.level === "WARN").length;

    const audio = mod.usingEstimates
      ? `${mmss(mod.totalSeconds)} estimated`
      : `${mmss(mod.totalSeconds)} measured`;
    const draft = mod.meta.status === "reviewed" ? "" : `  [${mod.meta.status}]`;

    console.log(`\nLESSON ${id}  ${mod.meta.courseTitle} — ${mod.meta.lessonTitle}${draft}`);
    console.log(`  ${mod.blocks.length} blocks · ${audio}`);

    if (findings.length === 0) {
      console.log(`  ok`);
      continue;
    }
    for (const f of findings) {
      const tag = f.level === "ERROR" ? "  ERROR" : "  warn ";
      console.log(`${tag} ${f.block.padEnd(14)} ${f.message}`);
    }
  }

  // The course-wide question rules always run over every registered lesson —
  // duplicate stems are a cross-lesson property, so a --lesson filter cannot
  // scope them.
  const allIds = (Object.keys(LESSONS) as LessonId[]).sort();
  const courseFindings = checkCourseQuestions(allIds);
  errors += courseFindings.filter((f) => f.level === "ERROR").length;
  warnings += courseFindings.filter((f) => f.level === "WARN").length;

  const questionCount = allIds.reduce((sum, id) => sum + QUESTIONS[id].length, 0);
  console.log(`\nCOURSE ${COURSE.courseCode}  ${COURSE.title}`);
  console.log(`  ${allIds.length} lessons · ${questionCount} questions`);
  if (courseFindings.length === 0) {
    console.log(`  ok`);
  } else {
    for (const f of courseFindings) {
      const tag = f.level === "ERROR" ? "  ERROR" : "  warn ";
      console.log(`${tag} ${f.block.padEnd(14)} ${f.message}`);
    }
  }

  console.log(
    `\n${ids.length} lesson(s) checked · ${errors} error(s) · ${warnings} warning(s)`
  );

  if (errors > 0) {
    console.log(
      `\nErrors mean the rendered video is defective. Fix them before spending` +
      ` narration credit or rendering.`
    );
  }

  process.exit(errors > 0 ? 1 : 0);
}

main();
