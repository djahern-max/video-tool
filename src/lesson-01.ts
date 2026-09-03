/**
 * Lesson 01 — "How to Chew Bubble Gum"
 *
 * Content is data. No React, no JSX, no timing logic in this file.
 *
 * Duration resolution order: audio-meta-01.json first, estimatedSeconds
 * second. `estimatedSeconds` is Math.round(wordCount / 130 * 60). It exists
 * only so a silent render has a length; it is discarded the moment audio
 * exists and must never reach a credit calculation (7.02.7).
 *
 * Reveal markers: [[r]] sits in `narration`, immediately before the WORD it
 * reveals. generate-audio.ts strips the markers, reads their real timestamps
 * out of the ElevenLabs alignment stream, and writes them to
 * audio-meta-01.json. `reveals` is a preview estimate, discarded the moment
 * audio exists. The number of [[r]] markers in a block MUST equal the length
 * of that block's `reveals` array.
 */

import audioMeta from "./audio-meta-01.json";
import type { Block, BlockMeta } from "./blocks";
import { COURSE_GUM } from "./course";
import type { PackageLessonMeta } from "./types";

export type { Block, Figure } from "./blocks";

export const meta = {
  lessonId: "01",
  courseCode: "GUM-01",
  courseTitle: COURSE_GUM.title,
  lessonTitle: "How to Chew Bubble Gum",
  title: "How to Chew Bubble Gum",
  subtitle: "What the piece is made of, and why bubbles fail",
  eyebrow: "Lesson 01",
  position: `Lesson 1 of ${COURSE_GUM.lessons.length}`,
  deliveryMethod: COURSE_GUM.deliveryMethod,
  fieldOfStudy: "Personal Development",
  revision: "A",
  revisionDate: "2026-09-03",
  status: "draft",

  learningObjectives: [
    {
      id: "lo-1",
      text:
        "Identify the four functional components of a piece of bubble gum " +
        "and explain why the gum base passes through undigested.",
    },
    {
      id: "lo-2",
      text:
        "Describe what changes in a piece of gum during the first minutes " +
        "of chewing, and why a chewed piece blows better than a fresh one.",
    },
    {
      id: "lo-3",
      text:
        "Sequence the three steps required to form a bubble, and identify " +
        "the error that most often prevents one.",
    },
    {
      id: "lo-4",
      text:
        "Distinguish a bubble that pops from one that collapses, and " +
        "identify the cause of each.",
    },
  ],
  nasbaFieldOfStudy: COURSE_GUM.nasbaFieldOfStudy,
  knowledgeLevel: COURSE_GUM.knowledgeLevel,
  prerequisites: COURSE_GUM.prerequisites,
  advancePreparation: COURSE_GUM.advancePreparation,
  sources: [
    { citation: "TODO: scratch lesson — no source of record", role: "primary" },
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
    citation: "",
    slide: "Facts",
    figure: {
      kind: "facts",
      rows: [
        { label: "Gum base", value: "not digestible" },
        { label: "Sweeteners", value: "largest share by weight" },
        { label: "Softeners", value: "keep the base pliable" },
        { label: "Flavorings", value: "first to disappear" },
      ],
    },
    narration:
      "Bubble gum starts with something most people never think about: a base that is not food at all. " +
      "[[r]]Gum base is a blend of elastomers, resins, and waxes, and your body cannot break any of it down. " +
      "Everything else in the piece is there to be dissolved. " +
      "[[r]]Sweeteners, whether sugar or a sugar alcohol, make up the largest share by weight. " +
      "[[r]]Softeners keep the base pliable so it does not shatter when it cools. " +
      "And [[r]]flavorings, usually oils, are the first thing to disappear. " +
      "When people say gum stays in your stomach for seven years, they are thinking about the base. " +
      "It does pass through, intact, in a day or two, because there is nothing in the digestive tract that recognizes it.",
    reveals: [10, 27, 38, 46],
    estimatedSeconds: 57,
  },

  {
    id: "block-02",
    sheet: "S-02",
    citation: "",
    slide: "List",
    figure: {
      kind: "list",
      items: [
        "Body heat softens the base toward mouth temperature",
        "Saliva dissolves the sweeteners and carries the flavor oils",
        "What remains is base plus residual softener",
        "A chewed piece blows better than a fresh one",
      ],
    },
    narration:
      "The first thirty seconds of chewing do most of the work. " +
      "[[r]]Body heat softens the base toward the temperature of your mouth, which is where it becomes properly elastic. " +
      "[[r]]Saliva dissolves the sweeteners and carries the flavor oils across your tongue, which is why the taste is strongest at the start and gone within a few minutes. " +
      "[[r]]What remains is the base, plus whatever softener has not leached out. " +
      "That is the piece you actually blow bubbles with, and it is why gum that has been chewed for a while blows better than a fresh piece. " +
      "A fresh piece is still full of sugar crystals, and crystals are exactly what a thin film cannot tolerate.",
    reveals: [6, 18, 34],
    estimatedSeconds: 54,
  },

  {
    id: "block-03",
    sheet: "S-03",
    citation: "",
    slide: "Statement",
    figure: {
      kind: "statement",
      lines: [
        "Flatten the wad into an even sheet",
        "Open a pocket with the center of the tongue",
        "Seal the lips and blow slowly",
      ],
    },
    narration:
      "Blowing a bubble is a sequence, and skipping a step is why it fails. " +
      "[[r]]First, flatten the wad against the roof of your mouth with your tongue until it is an even sheet. Uneven thickness tears at the thin spot every time. " +
      "[[r]]Second, press that sheet against the back of your front teeth and push the center of your tongue through it to open a small pocket. " +
      "[[r]]Third, seal your lips around your tongue and blow slowly and steadily. " +
      "Speed is the most common mistake. " +
      "The film stretches at a rate it can sustain, and forcing air in faster than that rate does not make a bigger bubble, it makes a hole.",
    reveals: [7, 20, 35],
    estimatedSeconds: 53,
  },

  {
    id: "block-04",
    sheet: "S-04",
    citation: "",
    slide: "Compare",
    figure: {
      kind: "compare",
      columns: [
        {
          heading: "Pops",
          emphasis: "wrong",
          rows: [
            { label: "Film", value: "torn" },
            { label: "Cause", value: "blown too fast, or gum too fresh" },
            { label: "Recoverable", value: "no" },
          ],
        },
        {
          heading: "Collapses",
          emphasis: "right",
          rows: [
            { label: "Film", value: "intact" },
            { label: "Cause", value: "the lip seal leaked" },
            { label: "Recoverable", value: "yes" },
          ],
        },
      ],
    },
    narration:
      "Two things end a bubble, and they fail differently. " +
      "[[r]]A bubble that pops has hit the limit of the film itself: it thinned past the point where the base can hold together, usually because it was blown too fast or the gum was too fresh. " +
      "There is no recovering from that one. " +
      "[[r]]A bubble that collapses is different. The film is intact and the air simply left, through a seal that was never tight, a gap at the corner of the mouth, or a tongue pulled back too early. " +
      "That one is recoverable. " +
      "If the bubble deflates rather than bursting, the gum is fine and the fix is your lips, not the piece.",
    reveals: [5, 25],
    estimatedSeconds: 53,
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