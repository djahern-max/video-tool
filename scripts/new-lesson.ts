#!/usr/bin/env node
/**
 * Scaffold a new lesson and register it.
 *
 *   npm run new -- --lesson 07 --code GUM-07 --title "..."
 *   npm run new -- --lesson 07 --code GUM-07 --title "..." --kind text
 *   npm run new -- --lesson 07 --code GUM-07 --title "..." \\
 *     --course-code GUM --course-title "How to Chew Bubble Gum"
 *
 * The opposite of `npm run retire`. It writes the files a lesson needs and
 * makes the registry edits that were easy to get wrong by hand, and it
 * writes nothing that is a human's to write: every descriptor field lands as
 * a `TODO:`, `meta.status` is `"draft"` (rule 4 — nothing in the tooling
 * ever sets it to anything else), and `audio-meta-NN.json` is `{}` so
 * `usingEstimates` is true from the first moment, as it must be.
 *
 * With no `--course-code` it still writes no `lessons` entry, and that is
 * deliberate and unchanged: which course a lesson belongs to and at what
 * position is an authoring decision, export reads the manifest's course_code
 * and position from that record, and the command has nothing to go on — so
 * it prints that the entry is still needed rather than guessing.
 *
 * `--course-code` is how the author states the decision instead of making it
 * by hand afterwards. Once the course is named there is nothing left to
 * infer: the record is joined if it exists and created if it does not, and
 * the position is the next one in that course. The refusal above survives
 * for the case it was written for; what goes away is the guessing.
 *
 * Nothing here spends money or runs a render.
 */

import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { LESSONS } from "../src/lessons";
import {
  COURSE_TS,
  LESSONS_TS,
  QUESTIONS_TS,
  courseConstName,
  readCourses,
  registerCourseLesson,
  registerLesson,
  registerQuestions,
} from "./registry";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const refuse = (message: string): never => {
  console.error(`\n  REFUSED: ${message}\n\n  Nothing was created.\n`);
  process.exit(1);
};

const flag = (args: string[], name: string) => {
  const at = args.indexOf(name);
  return at !== -1 ? args[at + 1] : undefined;
};

const today = () => new Date().toISOString().slice(0, 10);

/* ------------------------------------------------------------------ */
/* Templates                                                           */
/* ------------------------------------------------------------------ */

/**
 * Which course const the generated module reads its course-level fields
 * from, and the `position` line that goes with it. Two shapes, because a
 * lesson placed in a course knows its position and one that is not does
 * not — see `resolveCourse`.
 */
type CourseBinding = { constName: string; positionField: string };

/** `meta.position` for a lesson this command placed in a course. */
const placedPosition = (constName: string, position: number) =>
  `  // Display only. The manifest's position is read from ${constName}.lessons\n` +
  `  // by export.ts; this is the string the title sheet renders.\n` +
  "  position: `Lesson " +
  position +
  " of ${" +
  constName +
  ".lessons.length}`,";

/** `meta.position` for a lesson with no course entry — still the author's. */
const unplacedPosition = (constName: string) =>
  `  // TODO: this lesson has no ${constName}.lessons entry yet. Write one —\n` +
  `  // \`npm run new --course-code\` does it — then say\n` +
  `  // \`Lesson N of \${${constName}.lessons.length}\` here.\n` +
  `  position: "TODO: Lesson N of M",`;

/**
 * The video module, in the shape `src/lesson-02.ts` had: types imported
 * rather than declared, course-level fields read from `src/course.ts` so the
 * course cannot drift across lessons, and the seven accessors at the bottom
 * that resolve duration and reveals from measured audio first.
 */
const videoModule = (id: string, code: string, title: string, course: CourseBinding) => `/**
 * Lesson ${id} — "${title}"
 *
 * Content is data. No React, no JSX, no timing logic in this file.
 *
 * SCAFFOLD — every field marked TODO is a human's to write, and
 * drafts/${code}-review.md is where the content developer records the
 * 4.01.1 accuracy check on this lesson's generated content. Unvoiced
 * until audio-meta-${id}.json is populated.
 *
 * Duration resolution order: audio-meta-${id}.json first, estimatedSeconds
 * second. \`estimatedSeconds\` is Math.round(wordCount / 130 * 60). It exists
 * only so a silent render has a length; it is discarded the moment audio
 * exists and must never reach a credit calculation (7.02.7).
 *
 * Reveal markers: [[r]] sits in \`narration\`, immediately before the WORD it
 * reveals. generate-audio.ts strips the markers, reads their real timestamps
 * out of the ElevenLabs alignment stream, and writes them to
 * audio-meta-${id}.json. \`reveals\` is a preview estimate, discarded the moment
 * audio exists. The number of [[r]] markers in a block MUST equal the length
 * of that block's \`reveals\` array — verify with \`npm run check\` and
 * \`npm run generate -- --lesson ${id} --dry-run\` before spending any API credit.
 */

import audioMeta from "./audio-meta-${id}.json";
import type { Block, BlockMeta } from "./blocks";
import { ${course.constName} } from "./course";
import type { PackageLessonMeta } from "./types";

export type { Block, Figure } from "./blocks";

export const meta = {
  lessonId: "${id}",
  // The manifest's lesson_id — the globally unique package code, not the
  // module selector above.
  courseCode: "${code}",
  courseTitle: ${course.constName}.title,
  lessonTitle: "${title}",
  title: "${title}",
  subtitle: "TODO: the subtitle on the title sheet",
  eyebrow: "Lesson ${id}",
${course.positionField}
  deliveryMethod: ${course.constName}.deliveryMethod,
  fieldOfStudy: "TODO: the display field of study on the sheet",
  revision: "A",
  revisionDate: "${today()}",
  // "draft" until the content developer works through
  // drafts/${code}-review.md, closes its judgment list, and sets "checked"
  // by hand. That is the 4.01.1 check: technology was used in developing
  // this content, so the developer is responsible for reviewing it for
  // accuracy. Nothing in the tooling sets it. The 4.02 content review is
  // superCPE's, by a licensed CPA against the ingested package, and this
  // flag does not evidence it.
  status: "draft",

  learningObjectives: [
    { id: "lo-1", text: "TODO: an objective this lesson actually teaches" },
    { id: "lo-2", text: "TODO: an objective this lesson actually teaches" },
    { id: "lo-3", text: "TODO: an objective this lesson actually teaches" },
    { id: "lo-4", text: "TODO: an objective this lesson actually teaches" },
  ],
  nasbaFieldOfStudy: ${course.constName}.nasbaFieldOfStudy,
  knowledgeLevel: ${course.constName}.knowledgeLevel,
  prerequisites: ${course.constName}.prerequisites,
  advancePreparation: ${course.constName}.advancePreparation,
  sources: [
    { citation: "TODO: the paragraph this lesson is built on", role: "primary" },
  ],
  // This block becomes manifest.author — the author/developer of record
  // under 9.02.2(4). superCPE holds the content reviewer separately, in
  // subject_matter_experts; no reviewer's name belongs here.
  author: {
    name: "TODO: the author/developer of record",
    credentials: "TODO: credentials",
    licenseJurisdiction: "TODO: jurisdiction",
    licenseNumber: "TODO: license number",
  },
  // Text a participant must read (7.02.5). 0 for an all-video lesson.
  wordCount: 0,
  // True unless the audio merely reads the slides (7.02.7).
  avIsAdditionalLearning: true,
} satisfies PackageLessonMeta;

export const blocks: Block[] = [
  {
    id: "title",
    sheet: "S-00",
    citation: "",
    slide: "Title",
    narration: "",
    reveals: [0.5, 1.5, 2.5],
    estimatedSeconds: 8,
  },

  {
    id: "block-01",
    sheet: "S-01",
    citation: "TODO: the paragraph under discussion",
    slide: "Statement",
    figure: {
      kind: "statement",
      lines: [
        "TODO: the first line on this sheet",
        "TODO: the second",
        "TODO: the third",
      ],
    },
    narration:
      "TODO: write this block's narration. A [[r]]reveal marker sits immediately before the word it reveals, and the number of markers must equal the length of this block's [[r]]reveals array. Delete this block once the real ones are [[r]]written.",
    reveals: [3, 8, 14],
    estimatedSeconds: 18,
  },
];

const audio = audioMeta as Record<string, BlockMeta>;

/** The transcript of record: markers stripped, nothing else changed. */
export const transcriptOf = (b: Block): string =>
  b.narration.replace(/\\s*\\[\\[r\\]\\]\\s*/g, " ").replace(/\\s+/g, " ").trim();

/** What gets sent to ElevenLabs. Markers intact; the script strips them. */
export const speechOf = (b: Block): string => b.speech ?? b.narration;

export const hasAudio = (b: Block): boolean => audio[b.id] !== undefined;

export const durationOf = (b: Block): number =>
  audio[b.id]?.durationSeconds ?? b.estimatedSeconds;

/** Measured reveals when we have them, hand-written estimates when we do not. */
export const revealsOf = (b: Block): number[] =>
  audio[b.id]?.reveals ?? b.reveals;

/**
 * Blocks with empty narration have no audio by design — the title sheet is the
 * only one. Counting it here would make this permanently true and the warning
 * in Root.tsx permanently useless.
 */
export const usingEstimates = blocks.some(
  (b) => b.narration.trim().length > 0 && !hasAudio(b)
);

export const totalSeconds = blocks.reduce((sum, b) => sum + durationOf(b), 0);
`;

/**
 * The text module. A study guide is the program: the markdown under
 * guide/<id>/ is what the participant reads, there are no blocks and no
 * narration, and superCPE counts the body sections' words itself (7.02.5) —
 * which is why no `wordCount` field appears anywhere in it.
 */
const textModule = (id: string, code: string, title: string, course: CourseBinding) => `/**
 * Lesson ${id} — "${title}"
 *
 * A text lesson: the content is markdown under guide/${id}/, not narrated
 * blocks. There is no Remotion composition, no audio, and no render for this
 * module unless it gains a supplemental clip. The sections below name the
 * files in reading order; export copies them into the package verbatim and
 * superCPE counts the body sections' words itself (7.02.5) — which is why
 * there is no wordCount field anywhere in this module.
 *
 * Every clip added to \`media\` must claim \`avIsAdditionalLearning: true\`:
 * if the video reads the guide aloud, it does not belong here (7.02.7).
 *
 * Review questions live in questions-${id}.json and are placed by
 * \`after_section\` (5.01.2.1), not \`after_block\`.
 *
 * SCAFFOLD — every field marked TODO is a human's to write, and
 * drafts/${code}-review.md is where the content developer records the
 * 4.01.1 accuracy check on this lesson's generated content.
 */

import { ${course.constName} } from "./course";
import type { TextLessonMeta } from "./types";

export const meta = {
  kind: "text",
  lessonId: "${id}",
  // The manifest's lesson_id — the globally unique package code.
  courseCode: "${code}",
  title: "${title}",
  // "draft" until the content developer works through
  // drafts/${code}-review.md, closes its judgment list, and sets "checked"
  // by hand. That is the 4.01.1 check: technology was used in developing
  // this content, so the developer is responsible for reviewing it for
  // accuracy. Nothing in the tooling sets it. The 4.02 content review is
  // superCPE's, by a licensed CPA against the ingested package, and this
  // flag does not evidence it.
  status: "draft",

  sections: [
    { id: "sec-00", file: "00-front-matter.md", role: "front_matter", title: "How this course works" },
    { id: "sec-01", file: "01-body.md", role: "body", title: "TODO: the first body section" },
  ],

  // 4.05.3 item 3: superCPE refuses to publish a course whose guide has no
  // glossary. \`npm run check\` warns until this is written.
  glossaryTerms: [],

  learningObjectives: [
    { id: "lo-1", text: "TODO: an objective this guide actually teaches" },
    { id: "lo-2", text: "TODO: an objective this guide actually teaches" },
    { id: "lo-3", text: "TODO: an objective this guide actually teaches" },
    { id: "lo-4", text: "TODO: an objective this guide actually teaches" },
  ],
  nasbaFieldOfStudy: ${course.constName}.nasbaFieldOfStudy,
  knowledgeLevel: ${course.constName}.knowledgeLevel,
  prerequisites: ${course.constName}.prerequisites,
  advancePreparation: ${course.constName}.advancePreparation,
  sources: [
    { citation: "TODO: the paragraph this guide is built on", role: "primary" },
  ],
  // This block becomes manifest.author — the author/developer of record
  // under 9.02.2(4). superCPE holds the content reviewer separately, in
  // subject_matter_experts; no reviewer's name belongs here.
  author: {
    name: "TODO: the author/developer of record",
    credentials: "TODO: credentials",
    licenseJurisdiction: "TODO: jurisdiction",
    licenseNumber: "TODO: license number",
  },
  deliveryMethod: ${course.constName}.deliveryMethod,
  revision: "A",
  revisionDate: "${today()}",
} satisfies TextLessonMeta;
`;

const frontMatterMd = (title: string) => `# ${title}

TODO: one paragraph saying what this course covers and who it is for.

## How this course works

This is a self study CPE program. The study guide below is the program;
read it in order.

**Sections.** The guide is divided into sections. Read a section, then
answer the review question that follows it. The next section opens once
the question is answered. You are told immediately whether your answer was
correct, with an explanation either way. Review questions are not scored
toward passing.

**Videos.** Some sections are followed by a short video that works through
an example or adds commentary. The videos add to the guide; they do not
read it aloud. You may scrub or replay them freely.

**Glossary and appendixes.** The glossary and any appendixes are reference
material, available from the course menu at any point. They are not
required reading and do not have to be read in order.

**Finding something.** Use the search box in the course menu to find any
word in the guide, or the glossary lookup for a definition.

**Finishing.** When every review question in the course has been answered,
the qualified assessment opens from the course page. Passing it records
your completion and issues your certificate.
`;

const bodyMd = `# TODO: the first body section

TODO: write it. This is a \`body\` section, so every word here counts toward
the credit calculation (7.02.5) — superCPE does the counting, and a module
that declares its own word_count is refused.
`;

/**
 * The lesson's accuracy record, headings only. Its contents are the content
 * developer's, not this command's: the document is where the 4.01.1 check on
 * technology-assisted content is written down, and it is supporting
 * documentation for the data that reaches the word count formula
 * (9.02.2(2)(ii)) — the judgment list behind the numbers. Pre-filling any of
 * it would be the tool asserting something no human did. `npm run retire`
 * never deletes it, for that reason.
 *
 * It is not 4.02 evidence. The independent content review is superCPE's.
 */
const reviewDoc = (code: string, title: string, kind: string) => `# ${code} — ${title} — accuracy record

${
  kind === "text"
    ? `This is where the content developer records reading the guide for
accuracy before the lesson ships (4.01.1 — technology was used in developing
it). Corrections to a text lesson stay nearly free, but what has to be
checked does not change: that the 7.02.5 role assignments are honest (nothing
excluded smuggled into \`body\`) and that any clips are additional learning,
not narration.

How to read it: for each section, the file, its role (which decides
whether its words are counted), and the sources relied on; then each
question with its sources and objective. The lesson data lives in
\`src/lesson-NN.ts\`, \`src/questions-NN.json\`, and \`guide/NN/*.md\`; edit
those files, not this one.`
    : `This is where the content developer records checking the drafted
narration for accuracy (4.01.1), **before any narration audio is
generated**. Once a block is voiced, changing one sentence costs an
ElevenLabs regeneration and produces a different take — so every correction
is nearly free now and expensive later.

How to read it: for each block, the narration as drafted (reveal markers
\`[[r]]\` left in place), the sources relied on with the specific paragraph,
and what each reveal marker reveals. Then the same for each question. The
lesson data lives in \`src/lesson-NN.ts\` and \`src/questions-NN.json\`; edit
those files, not this one.`
}

**Status, first draft (${today()}).** Unchecked${kind === "text" ? "" : " and unvoiced"}.
\`meta.status\` is \`"draft"\`; export refuses it. The 4.02 independent content
review happens in superCPE, against the ingested package — not in this file.

Learning objectives (from \`src/lesson-NN.ts\`):

---

## ${kind === "text" ? "Sections" : "Block 1 — S-01"}

## Questions

## Judgment list — OPEN

## Sources still needed
`;

/* ------------------------------------------------------------------ */
/* Main                                                                */
/* ------------------------------------------------------------------ */

const main = () => {
  const args = process.argv.slice(2);
  const id = flag(args, "--lesson");
  const code = flag(args, "--code");
  const title = flag(args, "--title");
  const kind = flag(args, "--kind") ?? "video";
  const courseCode = flag(args, "--course-code");
  const courseTitle = flag(args, "--course-title");

  if (!id || !code || !title) {
    console.error(
      `\n  Usage: npm run new -- --lesson <id> --code <lessonId> --title "..."` +
        `\n  Flags: --kind text|video     (default video)` +
        `\n         --course-code <code>  place the lesson in this course,` +
        `\n                               creating the record if it is new` +
        `\n         --course-title "..."  required when the course is new` +
        `\n  Registered ids: ${Object.keys(LESSONS).sort().join(", ") || "(none)"}` +
        `\n  Courses: ${readCourses(root).map((c) => c.courseCode).join(", ") || "(none)"}\n`
    );
    process.exit(1);
  }

  if (kind !== "video" && kind !== "text") {
    refuse(`--kind must be "video" or "text", got "${kind}".`);
  }

  if (!/^\d{2}$/.test(id)) {
    refuse(
      `--lesson must be two digits ("07"), got "${id}". The id is the module ` +
        `selector: it names src/lesson-${id}.ts, public/audio/${id}/, and the ` +
        `Remotion composition Lesson${id}.`
    );
  }

  if (id in LESSONS) {
    refuse(`lesson "${id}" is already registered in ${LESSONS_TS}.`);
  }

  const modulePath = `src/lesson-${id}.ts`;
  if (existsSync(join(root, modulePath))) {
    refuse(
      `${modulePath} already exists on disk but is not registered — an ` +
        `unregistered leftover. Retire it or move it aside by hand first.`
    );
  }

  /* A reused package id re-ingests downstream as a NEW VERSION of that
     lesson and marks the course's credit and review stale. That is a
     deliberate re-export, not a new lesson. */
  const collision = Object.keys(LESSONS).find(
    (other) => (LESSONS[other].meta as { courseCode?: string }).courseCode === code
  );
  if (collision) {
    refuse(
      `--code "${code}" is already lesson ${collision}'s package id. A reused ` +
        `package id re-ingests downstream as a new VERSION of that lesson and ` +
        `marks the course's credit and review stale — that is a deliberate ` +
        `re-export of lesson ${collision}, not a new lesson. Pick another code.`
    );
  }

  /* ---- the course decision --------------------------------------- */

  const courses = readCourses(root);
  const existingCourse = courses.find((c) => c.courseCode === courseCode);

  if (courseTitle !== undefined && courseCode === undefined) {
    refuse(
      `--course-title "${courseTitle}" was given with no --course-code. A title ` +
        `alone does not say which course this lesson joins, and the command ` +
        `will not guess. Name the course with --course-code.`
    );
  }

  if (courseCode !== undefined) {
    if (!/^[A-Za-z0-9][A-Za-z0-9._-]*$/.test(courseCode)) {
      refuse(
        `--course-code "${courseCode}" is not a usable course code. It becomes ` +
          `both a manifest course_code and the \`${courseConstName("X")}\`-style ` +
          `const in ${COURSE_TS}, so it must start alphanumeric and hold only ` +
          `letters, digits, ".", "-" and "_".`
      );
    }

    if (existingCourse && courseTitle !== undefined && courseTitle !== existingCourse.title) {
      refuse(
        `--course-title "${courseTitle}" disagrees with the existing ` +
          `${existingCourse.constName} record, which is titled ` +
          `"${existingCourse.title}". One course code is one course: retitling ` +
          `it here would silently give two lessons two different course titles. ` +
          `Drop --course-title to join the course as it stands, or edit the ` +
          `record deliberately.`
      );
    }

    if (!existingCourse && courseTitle === undefined) {
      refuse(
        `no course record has courseCode "${courseCode}", so this lesson would ` +
          `create one — and a course record needs a title. Pass ` +
          `--course-title "...", or use an existing code: ` +
          `${courses.map((c) => c.courseCode).join(", ") || "(none yet)"}.`
      );
    }

    if (!existingCourse && courses.some((c) => c.constName === courseConstName(courseCode))) {
      refuse(
        `course code "${courseCode}" would be declared as ` +
          `\`${courseConstName(courseCode)}\`, which ${COURSE_TS} already uses ` +
          `for another course. Two course codes cannot share one const: retire ` +
          `finds a record by its const name. Pick a different code.`
      );
    }
  }

  /* No course named: the command has nothing to go on, and inventing a
     placement is exactly what it must not do. The module still needs SOME
     course const for its descriptor fields, as it always has — the first
     record in the file — and the report says the entry is still missing. */
  const inheritFrom = courses[0];
  if (courseCode === undefined && !inheritFrom) {
    refuse(
      `${COURSE_TS} declares no courses, so there is nothing for this lesson's ` +
        `descriptor fields to read. Name the course it belongs to: ` +
        `--course-code <code> --course-title "...".`
    );
  }

  /* ---- write ----------------------------------------------------- */

  /* The course entry goes first, because the module template prints the
     position it was given. Everything that could refuse has refused by now. */
  const placed =
    courseCode !== undefined
      ? registerCourseLesson(
          root,
          { courseCode, title: courseTitle ?? existingCourse!.title },
          { lessonId: code, title }
        )
      : null;

  const course: CourseBinding = placed
    ? {
        constName: placed.courseConst,
        positionField: placedPosition(placed.courseConst, placed.position),
      }
    : {
        constName: inheritFrom!.constName,
        positionField: unplacedPosition(inheritFrom!.constName),
      };

  const written: string[] = [];
  const put = (rel: string, contents: string) => {
    mkdirSync(dirname(join(root, rel)), { recursive: true });
    writeFileSync(join(root, rel), contents, "utf8");
    written.push(rel);
  };

  put(
    modulePath,
    kind === "text"
      ? textModule(id, code, title, course)
      : videoModule(id, code, title, course)
  );
  put(`src/questions-${id}.json`, "[]\n");

  if (kind === "video") {
    // `{}` so usingEstimates is true from the first moment, as it must be:
    // nothing may be exported while it is. A text lesson has no narrated
    // blocks, so it gets no audio metadata file to be stale.
    put(`src/audio-meta-${id}.json`, "{}\n");
  } else {
    put(`guide/${id}/00-front-matter.md`, frontMatterMd(title));
    put(`guide/${id}/01-body.md`, bodyMd);
  }

  const reviewPath = `drafts/${code}-review.md`;
  if (existsSync(join(root, reviewPath))) {
    console.log(`\n  ${reviewPath} already exists — left untouched.`);
  } else {
    put(reviewPath, reviewDoc(code, title, kind));
  }

  registerLesson(root, id);
  registerQuestions(root, id);

  /* ---- report ---------------------------------------------------- */

  console.log(`\n  Created lesson ${id} (${kind}) — package id ${code}\n`);
  for (const f of written) console.log(`    wrote  ${f}`);
  console.log(`    edit   ${LESSONS_TS}`);
  console.log(`    edit   ${QUESTIONS_TS}`);
  if (placed) console.log(`    edit   ${COURSE_TS}`);
  console.log("");

  if (placed?.created) {
    console.log(
      `  Created course ${courseCode} as \`${placed.courseConst}\` in ${COURSE_TS},\n` +
        `  with this lesson at position ${placed.position}.\n\n` +
        `  Its knowledgeLevel is "Basic" and deliveryMethod "Self study" — valid\n` +
        `  values, not researched ones — and nasbaFieldOfStudy, prerequisites and\n` +
        `  advancePreparation are TODO strings. Every lesson of this course reads\n` +
        `  those four fields, and export validates them. Fill them in first.`
    );
  } else if (placed) {
    console.log(
      `  Added this lesson to \`${placed.courseConst}\` in ${COURSE_TS} at position\n` +
        `  ${placed.position} — the next one in that course, not the lowest free\n` +
        `  number: a gap left by a retired lesson is that lesson's place in the\n` +
        `  sequence, and this one does not take it over.`
    );
  } else {
    console.log(
      `  No ${COURSE_TS} entry was written. Which course this lesson belongs to,\n` +
        `  and at what position, is an authoring decision — and export refuses a\n` +
        `  lesson with no course entry, because the manifest's course_code and\n` +
        `  position are read from that record. Re-run with --course-code, or add\n` +
        `  an entry to the right course's \`lessons\` array before exporting.\n` +
        `  \`npm run check\` warns until you do.\n\n` +
        `  Its descriptor fields read \`${course.constName}\`, the first record in\n` +
        `  the file. If that is not this lesson's course, the import is wrong too.`
    );
  }
  console.log("");
  console.log(
    `  meta.status is "draft" and stays that way until a human sets it.\n` +
      `  Work through ${reviewPath} — the 4.01.1 accuracy check on this lesson's\n` +
      `  generated content — then set status: "checked" by hand, in this module\n` +
      `  and in the course record entry, in the same commit.`
  );
  console.log(`\n  Now run:  npm run typecheck && npm run check\n`);
};

main();
