/**
 * Lesson 91 — "Blowing a Bubble"
 *
 * Content is data. No React, no JSX, no timing logic in this file.
 *
 * SCAFFOLD — every field marked TODO is a human's to write, and
 * drafts/GUM-91-review.md is where the reviewer's record goes. Unvoiced
 * until audio-meta-91.json is populated.
 *
 * Duration resolution order: audio-meta-91.json first, estimatedSeconds
 * second. `estimatedSeconds` is Math.round(wordCount / 130 * 60). It exists
 * only so a silent render has a length; it is discarded the moment audio
 * exists and must never reach a credit calculation (7.02.7).
 *
 * Reveal markers: [[r]] sits in `narration`, immediately before the WORD it
 * reveals. generate-audio.ts strips the markers, reads their real timestamps
 * out of the ElevenLabs alignment stream, and writes them to
 * audio-meta-91.json. `reveals` is a preview estimate, discarded the moment
 * audio exists. The number of [[r]] markers in a block MUST equal the length
 * of that block's `reveals` array — verify with `npm run check` and
 * `npm run generate -- --lesson 91 --dry-run` before spending any API credit.
 */

import audioMeta from "./audio-meta-91.json";
import type { Block, BlockMeta } from "./blocks";
import { COURSE_GUM } from "./course";
import type { PackageLessonMeta } from "./types";

export type { Block, Figure } from "./blocks";

export const meta = {
  lessonId: "91",
  // The manifest's lesson_id — the globally unique package code, not the
  // module selector above.
  courseCode: "GUM-91",
  courseTitle: COURSE_GUM.title,
  lessonTitle: "Blowing a Bubble",
  title: "Blowing a Bubble",
  subtitle: "TODO: the subtitle on the title sheet",
  eyebrow: "Lesson 91",
  // Display only. The manifest's position is read from COURSE_GUM.lessons
  // by export.ts; this is the string the title sheet renders.
  position: `Lesson 1 of ${COURSE_GUM.lessons.length}`,
  deliveryMethod: COURSE_GUM.deliveryMethod,
  fieldOfStudy: "TODO: the display field of study on the sheet",
  revision: "A",
  revisionDate: "2026-09-04",
  // "draft" until the human works through drafts/GUM-91-review.md, closes
  // its judgment list, and sets "reviewed" by hand. Nothing in the tooling
  // sets it (4.01.1, 4.02).
  status: "draft",

  learningObjectives: [
    { id: "lo-1", text: "Identify the two changes chewing makes to gum before it can hold a bubble" },
    { id: "lo-2", text: "Describe the tongue technique used to open, inflate, and recover a bubble" },
  ],
  nasbaFieldOfStudy: COURSE_GUM.nasbaFieldOfStudy,
  knowledgeLevel: COURSE_GUM.knowledgeLevel,
  prerequisites: COURSE_GUM.prerequisites,
  advancePreparation: COURSE_GUM.advancePreparation,
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
    citation: "Bubble Gum Handbook §2.1",
    slide: "Statement",
    figure: {
      kind: "statement",
      lines: ["Granular and stiff", "Warmed and de-sugared", "Uniform, elastic, ready"],
    },
    narration:
      "Gum is not ready for a bubble the moment it goes in your mouth. Fresh from the wrapper it is [[r]]granular, full of sugar crystals and stiff resin that tear rather than stretch. Chewing does two things at once. It warms the base toward body temperature, which softens it, and it works the [[r]]sugar out, which is what actually changes the material. What you are left with after a minute or two is a uniform, warm, elastic mass. Only then will a film hold air instead of splitting. The test is [[r]]simple: if it still feels grainy, keep chewing.",
    reveals: [9, 25, 42],
    estimatedSeconds: 46,
  },

  {
    id: "block-02",
    sheet: "S-02",
    citation: "Bubble Gum Handbook §3.4",
    slide: "List",
    figure: {
      kind: "list",
      items: ["Flatten to an even sheet", "Open a pocket with the tongue", "Blow steadily, then recover"],
    },
    narration:
      "With the gum ready, the mechanics are mostly about the tongue. Flatten the mass against the back of your front teeth until it is a thin, even [[r]]sheet, thin enough to stretch and even enough that no thin spot pops first. Push the tip of your tongue into the center of that sheet to open a small [[r]]pocket, then blow steadily rather than hard. Steady pressure is the whole trick. When the bubble reaches the size you want, stop blowing and pull it back in with your tongue before it [[r]]bursts across your face.",
    reveals: [13, 26, 42],
    estimatedSeconds: 43,
  },
];

const audio = audioMeta as Record<string, BlockMeta>;

/** The transcript of record: markers stripped, nothing else changed. */
export const transcriptOf = (b: Block): string =>
  b.narration.replace(/\s*\[\[r\]\]\s*/g, " ").replace(/\s+/g, " ").trim();

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
