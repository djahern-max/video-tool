/**
 * Lesson 08 — "A task, start to finish"
 *
 * Content is data. No React, no JSX, no timing logic in this file.
 *
 * SCAFFOLD — every field marked TODO is a human's to write, and
 * drafts/GPT-06-review.md is where the content developer records the
 * 4.01.1 accuracy check on this lesson's generated content. Unvoiced
 * until audio-meta-08.json is populated.
 *
 * Duration resolution order: audio-meta-08.json first, estimatedSeconds
 * second. `estimatedSeconds` is Math.round(wordCount / 130 * 60). It exists
 * only so a silent render has a length; it is discarded the moment audio
 * exists and must never reach a credit calculation (7.02.7).
 *
 * Reveal markers: [[r]] sits in `narration`, immediately before the WORD it
 * reveals. generate-audio.ts strips the markers, reads their real timestamps
 * out of the ElevenLabs alignment stream, and writes them to
 * audio-meta-08.json. `reveals` is a preview estimate, discarded the moment
 * audio exists. The number of [[r]] markers in a block MUST equal the length
 * of that block's `reveals` array — verify with `npm run check` and
 * `npm run generate -- --lesson 08 --dry-run` before spending any API credit.
 */

import audioMeta from "./audio-meta-08.json";
import { audioHashOf } from "./audio-identity";
import type { Block, BlockMeta } from "./blocks";
import { COURSE_GPT } from "./course";
import type { PackageLessonMeta } from "./types";

export type { Block, Figure } from "./blocks";

export const meta = {
  lessonId: "08",
  // The manifest's lesson_id — the globally unique package code, not the
  // module selector above.
  courseCode: "GPT-06",
  courseTitle: COURSE_GPT.title,
  lessonTitle: "A task, start to finish",
  title: "A task, start to finish",
  subtitle: "TODO: the subtitle on the title sheet",
  eyebrow: "Lesson 08",
  // Display only. The manifest's position is read from COURSE_GPT.lessons
  // by export.ts; this is the string the title sheet renders.
  position: `Lesson 6 of ${COURSE_GPT.lessons.length}`,
  deliveryMethod: COURSE_GPT.deliveryMethod,
  fieldOfStudy: "Computer Software & Applications",
  revision: "1",
  revisionDate: "2026-09-13",
  // "draft" until the content developer works through
  // drafts/GPT-06-review.md, closes its judgment list, and sets "checked"
  // by hand. That is the 4.01.1 check: technology was used in developing
  // this content, so the developer is responsible for reviewing it for
  // accuracy. Nothing in the tooling sets it. The 4.02 content review is
  // superCPE's, by a licensed CPA against the ingested package, and this
  // flag does not evidence it.
  status: "draft",

  learningObjectives: [
    {
      id: "lo-1",
      text:
        "Carry a de-identified accounting task through prompt, output, verification, and refinement, and identify where the model's output required correction.",
    },
  ],
  nasbaFieldOfStudy: COURSE_GPT.nasbaFieldOfStudy,
  knowledgeLevel: COURSE_GPT.knowledgeLevel,
  prerequisites: COURSE_GPT.prerequisites,
  advancePreparation: COURSE_GPT.advancePreparation,
  // Only the files in sources/gpt/ that drafts/GPT-source-index.md shows
  // contributing at least one entry to this lesson's objectives; the entry
  // numbers behind each objective are in drafts/GPT-06-review.md.
  sources: [
    {
      citation:
        "CPA.com, \"CPA.com Generative AI Toolkit\" (© 2023; sources/gpt/cpacom-genai-toolkit.pdf)",
      role: "primary",
    },
    {
      citation:
        "OpenAI Help Center, \"Does ChatGPT tell the truth?\" (retrieved 2026-09-13; sources/gpt/openai-does-chatgpt-tell-the-truth-2026-09-13.pdf)",
      role: "primary",
    },
    {
      citation:
        "OpenAI Help Center, \"Prompt engineering best practices for ChatGPT\" (retrieved 2026-09-13; sources/gpt/openai-prompt-engineering-best-practices-2026-09-13.pdf)",
      role: "primary",
    },
  ],
  // This block becomes manifest.author — the author/developer of record
  // under 9.02.2(4). superCPE holds the content reviewer separately, in
  // subject_matter_experts; no reviewer's name belongs here.
  //
  // TEST PACKAGE. The jurisdiction and licence fields carry an explicit
  // sentinel rather than a plausible-looking value, so that no manifest in
  // this repo's history can be mistaken for one naming a real licensee.
  // Both must be filled with real values before any course goes to the
  // Registry.
  author: {
    name: "Dane Ahern",
    credentials: "Content developer",
    licenseJurisdiction: "N/A — test package",
    licenseNumber: "N/A — test package",
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
  b.narration.replace(/\s*\[\[r\]\]\s*/g, " ").replace(/\s+/g, " ").trim();

/** What gets sent to ElevenLabs. Markers intact; the script strips them. */
export const speechOf = (b: Block): string => b.speech ?? b.narration;

/**
 * The metadata for this block, or undefined if there is none that describes it.
 *
 * A block id is not an identity. Ids get reused: renumbering a lesson under
 * revision leaves `block-03` naming entirely different narration, and a lookup
 * by id alone happily returns the old measured duration and the old measured
 * reveal seconds for it. The stored `hash` is the identity — it is over the
 * exact text that was spoken — so an entry whose hash does not match this
 * block's current narration is treated as no entry at all, and the block falls
 * back to its estimates until it is regenerated.
 */
const audioFor = (b: Block): BlockMeta | undefined => {
  const entry = audio[b.id];
  return entry && entry.hash === audioHashOf(speechOf(b)) ? entry : undefined;
};

export const hasAudio = (b: Block): boolean => audioFor(b) !== undefined;

export const durationOf = (b: Block): number =>
  audioFor(b)?.durationSeconds ?? b.estimatedSeconds;

/** Measured reveals when we have them, hand-written estimates when we do not. */
export const revealsOf = (b: Block): number[] =>
  audioFor(b)?.reveals ?? b.reveals;

/**
 * Blocks with empty narration have no audio by design — the title sheet is the
 * only one. Counting it here would make this permanently true and the warning
 * in Root.tsx permanently useless.
 */
export const usingEstimates = blocks.some(
  (b) => b.narration.trim().length > 0 && !hasAudio(b)
);

export const totalSeconds = blocks.reduce((sum, b) => sum + durationOf(b), 0);
