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

import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { COURSES } from "../src/course";
import { isTextLesson, LESSONS, type LessonId } from "../src/lessons";
import { QUESTIONS } from "../src/questions";
import type { TextLessonMeta } from "../src/types";
import { printTextPreview, sectionWordCounts } from "./text-preview";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

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

  findings.push(...courseMirrorFindings(mod.meta.courseCode, status));

  return findings;
}

/**
 * COURSES[].lessons[].status mirrors meta.status (the module is the
 * authority — it gates export); a disagreement means course.ts was not
 * updated when the lesson's status changed, or vice versa.
 */
function courseMirrorFindings(packageId: string, status: string): Finding[] {
  const courseLesson = COURSES.flatMap((c) => c.lessons as readonly { lessonId: string; status: string }[])
    .find((l) => l.lessonId === packageId);
  if (!courseLesson) {
    return [{
      level: "WARN",
      block: "meta",
      message: `no COURSES lessons entry for "${packageId}" in src/course.ts — export will refuse this lesson (course_code/position come from the course record)`,
    }];
  }
  if (courseLesson.status !== status) {
    return [{
      level: "WARN",
      block: "meta",
      message: `the course record's status is "${courseLesson.status}" but meta.status is "${status}" — src/course.ts mirrors the module and one of them is stale`,
    }];
  }
  return [];
}

/* ------------------------------------------------------------------ */
/* Text lessons (feature 05)                                           */
/* ------------------------------------------------------------------ */

/**
 * The invariants a text lesson's export and ingest depend on, checked over
 * the committed guide files. ERROR means export or superCPE will refuse
 * it; WARN means it ships but the course will not publish (or a clip is
 * simply not rendered yet — out/ is reproducible and gitignored).
 */
function checkTextLesson(meta: TextLessonMeta): Finding[] {
  const findings: Finding[] = [];
  const err = (block: string, message: string) =>
    findings.push({ level: "ERROR", block, message });
  const warn = (block: string, message: string) =>
    findings.push({ level: "WARN", block, message });

  const guideDir = join(root, "guide", meta.lessonId);

  for (const k of ["courseCode", "title", "revision", "revisionDate", "deliveryMethod"] as const) {
    if (!meta[k]) {
      err("meta", `meta.${k} is missing or empty`);
    }
  }

  /* --- sections ---------------------------------------------------- */

  if (meta.sections.length === 0) {
    err("sections", "sections is empty — a text package with nothing to read is not a program");
  }
  const seen = new Set<string>();
  for (const s of meta.sections) {
    if (seen.has(s.id)) {
      err(s.id, `duplicate section id — superCPE rejects it, and after_section placement becomes ambiguous`);
    }
    seen.add(s.id);
    if (!["front_matter", "body", "glossary", "appendix"].includes(s.role)) {
      err(s.id, `role "${s.role}" is not one of the contract's four — only body sections enter the word count (7.02.5)`);
    }
    const path = join(guideDir, s.file);
    if (!existsSync(path)) {
      err(s.id, `guide/${meta.lessonId}/${s.file} does not exist — sections are committed markdown files`);
    }
  }
  const roles = meta.sections.map((s) => s.role);
  if (!roles.includes("body")) {
    err("sections", `no "body" section — nothing would be counted as required reading (7.02.5) and export refuses`);
  }
  if (!roles.includes("front_matter")) {
    err("sections", `no "front_matter" section — 4.05.3 item 4 requires the "How this course works" block and export refuses`);
  }

  /* --- glossary ----------------------------------------------------- */

  if (meta.glossaryTerms.length === 0) {
    warn("glossary", `glossaryTerms is empty — superCPE ingests with a warning and refuses to publish the course (4.05.3 item 3)`);
  }
  const terms = new Set<string>();
  for (const t of meta.glossaryTerms) {
    if (!t.term.trim() || !t.definition.trim()) {
      err("glossary", `a glossary term or definition is blank — superCPE rejects it`);
    }
    if (terms.has(t.term.trim())) {
      err("glossary", `duplicate glossary term "${t.term}" — superCPE rejects it`);
    }
    terms.add(t.term.trim());
    if (t.sectionId !== undefined && !seen.has(t.sectionId)) {
      err("glossary", `term "${t.term}" points at section "${t.sectionId}", which does not exist`);
    }
  }

  /* --- media -------------------------------------------------------- */

  for (const m of meta.media ?? []) {
    if (m.avIsAdditionalLearning !== true) {
      err(m.id, `avIsAdditionalLearning is not true — 7.02.7's test: a clip that narrates the text does not belong in a text package; export refuses`);
    }
    if (!seen.has(m.placement.afterSection)) {
      err(m.id, `placed after_section "${m.placement.afterSection}", which is not a section id — export refuses`);
    }
    if (!existsSync(join(root, m.file))) {
      warn(m.id, `${m.file} does not exist — render the clip before exporting (out/ is reproducible)`);
    }
  }

  /* --- review gate and course mirror -------------------------------- */

  const status = meta.status as string;
  if (status !== "draft" && status !== "reviewed") {
    err("meta", `meta.status must be "draft" or "reviewed", got "${status}" — export gates on this value`);
  } else if (status === "draft") {
    warn("meta", `status is "draft" — export will refuse it until the human works through drafts/${meta.courseCode}-review.md and sets status: "reviewed" by hand`);
  }
  findings.push(...courseMirrorFindings(meta.courseCode, status));

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
    const text = isTextLesson(id);
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

    // Rule 4: review placement, in the lesson's own medium (5.01.2.1) —
    // a video lesson places by narrated block, a text lesson by section
    // id, and in both never two review questions on the same spot.
    if (text) {
      const meta = mod.meta as unknown as TextLessonMeta;
      const sectionIds = new Set(meta.sections.map((s) => s.id));
      const sectionsUsed = new Map<string, string>();
      for (const q of review) {
        const where = `${id} ${q.id}`;
        if (q.after_block !== undefined) {
          err(where, `review question carries after_block — a text lesson places by after_section`);
        }
        if (q.after_section === undefined) {
          err(where, `review question has no after_section — superCPE cannot place it (5.01.2.1)`);
          continue;
        }
        if (!sectionIds.has(q.after_section)) {
          err(where, `after_section "${q.after_section}" is not a section id of the lesson`);
          continue;
        }
        const already = sectionsUsed.get(q.after_section);
        if (already) {
          err(where, `after_section "${q.after_section}" already carries ${already} — never two review questions on the same section (rule 4)`);
        } else {
          sectionsUsed.set(q.after_section, q.id);
        }
      }
      for (const q of assessment) {
        if (q.after_block !== undefined || q.after_section !== undefined) {
          err(`${id} ${q.id}`, `assessment question carries a placement — placement is for review questions only`);
        }
      }
    } else {
      const narrated = mod.blocks.filter((b) => b.narration.trim().length > 0).length;
      const blocksUsed = new Map<number, string>();
      for (const q of review) {
        const where = `${id} ${q.id}`;
        if (q.after_section !== undefined) {
          err(where, `review question carries after_section — a video lesson places by after_block`);
        }
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
        if (q.after_block !== undefined || q.after_section !== undefined) {
          err(`${id} ${q.id}`, `assessment question carries a placement — placement is for review questions only`);
        }
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
    if (isTextLesson(id)) {
      const meta = LESSONS[id].meta as TextLessonMeta;
      const findings = checkTextLesson(meta);
      errors += findings.filter((f) => f.level === "ERROR").length;
      warnings += findings.filter((f) => f.level === "WARN").length;

      const draft = meta.status === "reviewed" ? "" : `  [${meta.status}]`;
      console.log(`\nLESSON ${id}  ${meta.title}${draft}`);
      console.log(`  text · ${meta.sections.length} sections · ${(meta.media ?? []).length} clip(s)`);

      for (const f of findings) {
        const tag = f.level === "ERROR" ? "  ERROR" : "  warn ";
        console.log(`${tag} ${f.block.padEnd(14)} ${f.message}`);
      }
      if (findings.length === 0) console.log(`  ok`);

      // Task 5: the 7.02.5 accounting, printed whenever the files exist.
      // Clip minutes use only clips already rendered; export measures for
      // real and refuses on a missing file.
      if (meta.sections.every((s) => existsSync(join(root, "guide", meta.lessonId, s.file)))) {
        printTextPreview(
          sectionWordCounts(meta, join(root, "guide", meta.lessonId)),
          QUESTIONS[id].length,
          0
        );
      }
      continue;
    }

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

  // The course-wide question rules always run over every registered lesson
  // of a course — duplicate stems are a cross-lesson property, so a
  // --lesson filter cannot scope them. With two courses in the repo the
  // rules run per course: superCPE's rule 2 forbids stem collisions within
  // a course, not across the catalog.
  const allIds = (Object.keys(LESSONS) as LessonId[]).sort();
  for (const course of COURSES) {
    const packageIds = new Set<string>(course.lessons.map((l) => l.lessonId));
    const courseIds = allIds.filter((id) =>
      packageIds.has((LESSONS[id].meta as { courseCode: string }).courseCode)
    );
    if (courseIds.length === 0) continue;
    const courseFindings = checkCourseQuestions(courseIds);
    errors += courseFindings.filter((f) => f.level === "ERROR").length;
    warnings += courseFindings.filter((f) => f.level === "WARN").length;

    const questionCount = courseIds.reduce((sum, id) => sum + QUESTIONS[id].length, 0);
    console.log(`\nCOURSE ${course.courseCode}  ${course.title}`);
    console.log(`  ${courseIds.length} lesson(s) · ${questionCount} questions`);
    if (courseFindings.length === 0) {
      console.log(`  ok`);
    } else {
      for (const f of courseFindings) {
        const tag = f.level === "ERROR" ? "  ERROR" : "  warn ";
        console.log(`${tag} ${f.block.padEnd(14)} ${f.message}`);
      }
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
