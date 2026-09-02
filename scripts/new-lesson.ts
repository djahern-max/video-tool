#!/usr/bin/env node
/**
 * Scaffold a new lesson and register it.
 *
 *   npm run new -- --lesson 07 --code ASC842-PCX-07 --title "..."
 *   npm run new -- --lesson 07 --code ASC450-LC-02 --title "..." --kind text
 *
 * The opposite of `npm run retire`. It writes the files a lesson needs and
 * makes the two registry edits that were easy to get wrong by hand, and it
 * writes nothing that is a human's to write: every descriptor field lands as
 * a `TODO:`, `meta.status` is `"draft"` (rule 4 — nothing in the tooling
 * ever sets it to anything else), and `audio-meta-NN.json` is `{}` so
 * `usingEstimates` is true from the first moment, as it must be.
 *
 * It deliberately writes no `COURSE.lessons` entry. Which course a lesson
 * belongs to and at what position is an authoring decision, and export reads
 * the manifest's course_code and position from that record — so the command
 * prints that the entry is still needed.
 *
 * Nothing here spends money or runs a render.
 */

import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { LESSONS } from "../src/lessons";
import { COURSE_TS, LESSONS_TS, QUESTIONS_TS, registerLesson, registerQuestions } from "./registry";

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
 * The video module, in the shape `src/lesson-02.ts` had: types imported
 * rather than declared, course-level fields read from `src/course.ts` so the
 * course cannot drift across lessons, and the seven accessors at the bottom
 * that resolve duration and reveals from measured audio first.
 */
const videoModule = (id: string, code: string, title: string) => `/**
 * Lesson ${id} — "${title}"
 *
 * Content is data. No React, no JSX, no timing logic in this file.
 *
 * SCAFFOLD — every field marked TODO is a human's to write, and
 * drafts/${code}-review.md is where the reviewer's record goes. Unvoiced
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
import { COURSE } from "./course";
import type { PackageLessonMeta } from "./types";

export type { Block, Figure } from "./blocks";

export const meta = {
  lessonId: "${id}",
  // The manifest's lesson_id — the globally unique package code, not the
  // module selector above.
  courseCode: "${code}",
  courseTitle: COURSE.title,
  lessonTitle: "${title}",
  title: "${title}",
  subtitle: "TODO: the subtitle on the title sheet",
  eyebrow: "Lesson ${id}",
  // TODO: this lesson has no COURSE.lessons entry yet; write one, then say
  // \`Lesson N of \${COURSE.lessons.length}\` here.
  position: "TODO: Lesson N of M",
  deliveryMethod: COURSE.deliveryMethod,
  fieldOfStudy: "TODO: the display field of study on the sheet",
  revision: "A",
  revisionDate: "${today()}",
  // "draft" until the human works through drafts/${code}-review.md, closes
  // its judgment list, and sets "reviewed" by hand. Nothing in the tooling
  // sets it (4.01.1, 4.02).
  status: "draft",

  learningObjectives: [
    { id: "lo-1", text: "TODO: an objective this lesson actually teaches" },
    { id: "lo-2", text: "TODO: an objective this lesson actually teaches" },
    { id: "lo-3", text: "TODO: an objective this lesson actually teaches" },
    { id: "lo-4", text: "TODO: an objective this lesson actually teaches" },
  ],
  nasbaFieldOfStudy: COURSE.nasbaFieldOfStudy,
  knowledgeLevel: COURSE.knowledgeLevel,
  prerequisites: COURSE.prerequisites,
  advancePreparation: COURSE.advancePreparation,
  sources: [
    { citation: "TODO: the paragraph this lesson is built on", role: "primary" },
  ],
  author: {
    name: "TODO: the reviewing CPA's name",
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
const textModule = (id: string, code: string, title: string) => `/**
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
 * drafts/${code}-review.md is where the reviewer's record goes.
 */

import { COURSE } from "./course";
import type { TextLessonMeta } from "./types";

export const meta = {
  kind: "text",
  lessonId: "${id}",
  // The manifest's lesson_id — the globally unique package code.
  courseCode: "${code}",
  title: "${title}",
  // "draft" until the human works through drafts/${code}-review.md, closes
  // its judgment list, and sets "reviewed" by hand. Nothing in the tooling
  // sets it (4.01.1, 4.02).
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
  nasbaFieldOfStudy: COURSE.nasbaFieldOfStudy,
  knowledgeLevel: COURSE.knowledgeLevel,
  prerequisites: COURSE.prerequisites,
  advancePreparation: COURSE.advancePreparation,
  sources: [
    { citation: "TODO: the paragraph this guide is built on", role: "primary" },
  ],
  author: {
    name: "TODO: the reviewing CPA's name",
    credentials: "TODO: credentials",
    licenseJurisdiction: "TODO: jurisdiction",
    licenseNumber: "TODO: license number",
  },
  deliveryMethod: COURSE.deliveryMethod,
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
 * The review document, headings only. Its contents are the reviewer's, not
 * this command's: the document is the 4.02 evidence that a licensed CPA read
 * the lesson, and pre-filling any of it would be the tool asserting something
 * no human did. `npm run retire` never deletes it.
 */
const reviewDoc = (code: string, title: string, kind: string) => `# ${code} — ${title} — reviewer's document

${
  kind === "text"
    ? `This is the document a licensed CPA reads before the lesson ships.
Corrections to a text lesson stay nearly free, but 4.01.1/4.02 do not
change: the reviewer reads the guide, and the sign-off asserts the 7.02.5
role assignments are honest (nothing excluded smuggled into \`body\`) and
that any clips are additional learning, not narration.

How to read it: for each section, the file, its role (which decides
whether its words are counted), and the sources relied on; then each
question with its sources and objective. The lesson data lives in
\`src/lesson-NN.ts\`, \`src/questions-NN.json\`, and \`guide/NN/*.md\`; edit
those files, not this one.`
    : `This is the document a licensed CPA reads **before any narration audio is
generated**. Once a block is voiced, changing one sentence costs an ElevenLabs
regeneration and produces a different take — so every correction is nearly
free now and expensive later.

How to read it: for each block, the narration as drafted (reveal markers
\`[[r]]\` left in place), the sources relied on with the specific paragraph,
and what each reveal marker reveals. Then the same for each question. The
lesson data lives in \`src/lesson-NN.ts\` and \`src/questions-NN.json\`; edit
those files, not this one.`
}

**Status, first draft (${today()}).** Unreviewed${kind === "text" ? "" : " and unvoiced"}.
\`meta.status\` is \`"draft"\`; export refuses it.

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

  if (!id || !code || !title) {
    console.error(
      `\n  Usage: npm run new -- --lesson <id> --code <lessonId> --title "..."` +
        `\n  Flags: --kind text|video   (default video)` +
        `\n  Registered ids: ${Object.keys(LESSONS).sort().join(", ") || "(none)"}\n`
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

  /* ---- write ----------------------------------------------------- */

  const written: string[] = [];
  const put = (rel: string, contents: string) => {
    mkdirSync(dirname(join(root, rel)), { recursive: true });
    writeFileSync(join(root, rel), contents, "utf8");
    written.push(rel);
  };

  put(
    modulePath,
    kind === "text" ? textModule(id, code, title) : videoModule(id, code, title)
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
  console.log("");
  console.log(
    `  No ${COURSE_TS} entry was written. Which course this lesson belongs to,\n` +
      `  and at what position, is an authoring decision — and export refuses a\n` +
      `  lesson with no course entry, because the manifest's course_code and\n` +
      `  position are read from that record. Add an entry to the right course's\n` +
      `  \`lessons\` array before exporting. \`npm run check\` warns until you do.`
  );
  console.log("");
  console.log(
    `  meta.status is "draft" and stays that way until a human sets it.\n` +
      `  Work through ${reviewPath}, then set status: "reviewed" by hand.`
  );
  console.log(`\n  Now run:  npm run typecheck && npm run check\n`);
};

main();
