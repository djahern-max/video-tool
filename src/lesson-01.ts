/**
 * Lesson 01 — "How Many Helium Balloons Would It Take to Lift an Excavator?"
 *
 * PRACTICE COURSE. Not a CPE program, not for credit, not for export to
 * superCPE. It exists to exercise the pipeline — in particular the `Image`
 * slide, which no real lesson has used yet. COURSE_BALLOON's
 * nasbaFieldOfStudy says so out loud; do not "fix" it to a real field.
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
 * of that block's `reveals` array — verify with `npm run check` and
 * `npm run generate -- --lesson 01 --dry-run` before spending any API credit.
 *
 * Images: block-05 and block-06 read from public/images/01/. `check` ERRORs
 * on a src that resolves to no file, so those two images must be on disk
 * before check passes. Licensing is the author's problem; nothing here
 * checks it.
 */

import audioMeta from "./audio-meta-01.json";
import type { Block, BlockMeta } from "./blocks";
import { COURSE_BALLOON } from "./course";
import type { PackageLessonMeta } from "./types";

export type { Block, Figure } from "./blocks";

export const meta = {
  lessonId: "01",
  // The manifest's lesson_id — the globally unique package code, not the
  // module selector above.
  courseCode: "BALLOON-01",
  courseTitle: COURSE_BALLOON.title,
  lessonTitle: "How Many Helium Balloons Would It Take to Lift an Excavator?",
  title: "How Many Helium Balloons Would It Take to Lift an Excavator?",
  subtitle: "A back-of-the-envelope calculation, done honestly",
  eyebrow: "Lesson 01",
  // Display only. The manifest's position is read from COURSE_BALLOON.lessons
  // by export.ts; this is the string the title sheet renders.
  position: `Lesson 1 of ${COURSE_BALLOON.lessons.length}`,
  deliveryMethod: COURSE_BALLOON.deliveryMethod,
  fieldOfStudy: "Practice — not for credit",
  revision: "A",
  revisionDate: "2026-09-05",
  // "draft" until the content developer works through
  // drafts/BALLOON-01-review.md, closes its judgment list, and sets "checked"
  // by hand. That is the 4.01.1 check: technology was used in developing
  // this content, so the developer is responsible for reviewing it for
  // accuracy. Nothing in the tooling sets it. The 4.02 content review is
  // superCPE's, by a licensed CPA against the ingested package, and this
  // flag does not evidence it.
  status: "draft",

  learningObjectives: [
    {
      id: "lo-1",
      text: "Explain why buoyant lift depends on the weight of the air displaced rather than on the weight of the lifting gas",
    },
    {
      id: "lo-2",
      text: "Compute the net lift of a stated volume of helium at sea level, accounting for the mass of the envelope",
    },
    {
      id: "lo-3",
      text: "Apply a per-unit lift figure to a stated payload mass to determine the number of units required",
    },
    {
      id: "lo-4",
      text: "Identify the assumptions that cause a back-of-the-envelope result to diverge from the real-world outcome",
    },
  ],
  nasbaFieldOfStudy: COURSE_BALLOON.nasbaFieldOfStudy,
  knowledgeLevel: COURSE_BALLOON.knowledgeLevel,
  prerequisites: COURSE_BALLOON.prerequisites,
  advancePreparation: COURSE_BALLOON.advancePreparation,
  sources: [
    {
      citation: "Archimedes, On Floating Bodies, Book I, Proposition 5",
      role: "primary",
    },
    {
      citation:
        "Density of dry air and of helium at 15 °C and 101.325 kPa (standard reference conditions)",
      role: "primary",
    },
    {
      citation:
        "Caterpillar 320 Hydraulic Excavator specifications — operating weight",
      role: "primary",
    },
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
  // True unless the audio merely reads the slides (7.02.7). The sheets carry
  // terms and figures; the narration derives them. Set this against the
  // finished render, not against this comment.
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
    slide: "Statement",
    figure: {
      kind: "statement",
      lines: [
        "Three numbers you can check",
        "One law of physics",
        "An error bar you understand",
      ],
    },
    narration:
      "Somewhere on the internet there is an answer to this question. It is probably wrong, and you have no way to tell. So we are going to do something better than look it up. We are going to build the answer ourselves, out of three numbers you can check, and one piece of physics that has been settled since Archimedes climbed out of the bath. That is what a [[r]]back-of-the-envelope calculation is. Not a guess. A chain of small, defensible steps, each one you could argue with, ending in a number whose [[r]]error bars you actually understand. When you are done you will not just have a number of balloons. You will know which of your [[r]]assumptions is doing the most damage.",
    reveals: [32, 43, 54],
    estimatedSeconds: 56,
  },

  {
    id: "block-02",
    sheet: "S-02",
    citation: "Archimedes, Bk I",
    slide: "Statement",
    figure: {
      kind: "statement",
      lines: [
        "Lift = weight of air displaced",
        "Minus everything in the balloon",
        "One number: net lift per m³",
      ],
    },
    narration:
      "Here is the part people get backwards. A helium balloon does not rise because helium is light. It rises because the balloon shoves air out of the way, and that displaced air weighs more than everything inside the balloon. [[r]]Archimedes' principle: the upward force on any object in a fluid equals the weight of the fluid it displaces. Air is a fluid. A balloon sitting in air is doing exactly what a boat does in water. So the useful quantity is not the weight of the helium. It is the [[r]]difference — the weight of the air pushed aside, minus the weight of the helium and the latex holding it. [[r]]Get that difference per cubic metre and you have the only number this whole problem turns on.",
    reveals: [18, 42, 51],
    estimatedSeconds: 59,
  },

  {
    id: "block-03",
    sheet: "S-03",
    citation: "15 °C, 101.325 kPa",
    slide: "Facts",
    figure: {
      kind: "facts",
      rows: [
        { label: "Dry air", value: "1.225 kg/m³" },
        { label: "Helium", value: "0.179 kg/m³" },
        { label: "11-inch balloon", value: "0.0115 m³" },
        { label: "Latex envelope", value: "2.8 g" },
      ],
    },
    narration:
      "Four numbers, all of them lookup-able, none of them controversial. [[r]]Dry air at fifteen degrees Celsius and sea level pressure: one point two two five kilograms per cubic metre. [[r]]Helium at the same temperature and pressure: zero point one seven nine. Those two are the whole show. The third is geometry. A standard eleven-inch party balloon, inflated, is near enough a sphere twenty-eight centimetres across, which is [[r]]zero point zero one one five cubic metres of helium. The fourth is the one everybody forgets. The latex itself weighs something — about [[r]]two point eight grams — and it is dead weight the balloon has to carry before it lifts anything of yours.",
    reveals: [5, 14, 31, 42],
    estimatedSeconds: 52,
  },

  {
    id: "block-04",
    sheet: "S-04",
    citation: "Net lift per m³",
    slide: "Calc",
    figure: {
      kind: "calc",
      rows: [
        { label: "Air displaced, per m³", value: "1.225 kg" },
        { label: "Less helium, per m³", value: "0.179 kg" },
        { label: "Net lift, per m³", value: "1.046 kg", rule: true },
        { label: "× 0.0115 m³ per balloon", value: "0.0120 kg" },
        {
          label: "Less 2.8 g of latex",
          value: "0.0092 kg",
          rule: true,
          emphasis: "right",
        },
      ],
    },
    narration:
      "Subtract and you are done. A cubic metre of air weighs [[r]]one point two two five kilograms. Fill that same cubic metre with helium and you have added [[r]]one hundred seventy-nine grams. The difference — the net lift of one cubic metre of helium — is [[r]]one point zero four six kilograms. Now scale it down to a balloon. Multiply by our zero point zero one one five cubic metres and one eleven-inch balloon lifts [[r]]twelve grams. Then pay the latex. Two point eight grams of it, gone before you attach anything. What is left, and this is the number the rest of the lesson runs on, is [[r]]nine point two grams of usable lift per balloon.",
    reveals: [6, 13, 21, 34, 49],
    estimatedSeconds: 54,
  },

  {
    id: "block-05",
    sheet: "S-05",
    citation: "11-inch balloon",
    slide: "Image",
    figure: {
      kind: "image",
      src: "images/01/balloon.jpg",
      alt: "A single inflated latex party balloon on a string, photographed against a plain light background",
      caption: "One 11-inch balloon ≈ 9.2 g of usable lift",
    },
    narration:
      "[[r]]This is the unit. Not a cubic metre of helium — nobody sells you that — but the thing you actually buy, tie off, and hold. [[r]]Nine point two grams. That is roughly two paperclips. It will not lift a can of soda. Hold one and you feel it pull, and the pull is not strong; what your hand registers is the string going taut, which is a much smaller force than you would guess from watching it strain upward. Everything from here is division. We have the lift of one balloon. We need the weight of one excavator. The interesting part is not the arithmetic — it is how absurd the answer gets.",
    reveals: [1, 11],
    estimatedSeconds: 53,
  },

  {
    id: "block-06",
    sheet: "S-06",
    citation: "CAT 320 spec sheet",
    slide: "Image",
    figure: {
      kind: "image",
      src: "images/01/excavator.png",
      alt: "A tracked hydraulic excavator with its boom lowered, parked on a gravel lot",
      caption: "Operating weight: about 22,000 kg",
    },
    narration:
      "[[r]]And this is the load. A Caterpillar 320 is a mid-size tracked hydraulic excavator — the one you see on almost every commercial site, digging footings, not the enormous mining machines. [[r]]Its operating weight is about twenty-two thousand kilograms. Twenty-two tonnes. That figure is the machine with a standard boom and stick, a bucket, fuel, and an operator in the seat, which is the honest number to use; the shipping weight is lower and would flatter our answer. Twenty-two thousand kilograms against nine point two grams. Those two numbers are not on speaking terms, and that mismatch is the entire point of the exercise.",
    reveals: [1, 14],
    estimatedSeconds: 48,
  },

  {
    id: "block-07",
    sheet: "S-07",
    citation: "22,000 ÷ 0.0092",
    slide: "Calc",
    figure: {
      kind: "calc",
      rows: [
        { label: "Excavator", value: "22,000 kg" },
        { label: "÷ lift per balloon", value: "0.0092 kg" },
        {
          label: "Balloons required",
          value: "≈ 2,400,000",
          rule: true,
          emphasis: "right",
        },
        { label: "Helium needed", value: "≈ 27,500 m³" },
      ],
    },
    narration:
      "So: twenty-two thousand kilograms of excavator, divided by nine point two grams of lift. The machine first. [[r]]Twenty-two thousand kilograms — the operating weight, not the shipping weight. Then the balloon. [[r]]Nine point two grams, which in kilograms is nought point nought nought nine two. Divide one by the other and you get [[r]]two point four million balloons, near enough — and near enough is doing real work, because our latex mass was a round number and our balloon was a perfect sphere. Two point four million balloons holds [[r]]twenty-seven and a half thousand cubic metres of helium: a sphere thirty-seven metres across, and more helium than a party supplier moves in a year.",
    reveals: [8, 14, 24, 41],
    estimatedSeconds: 53,
  },

  {
    id: "block-08",
    sheet: "S-08",
    citation: "Assumptions",
    slide: "Compare",
    figure: {
      kind: "compare",
      columns: [
        {
          heading: "On the envelope",
          rows: [
            { label: "Balloons", value: "2,400,000" },
            { label: "Helium", value: "27,500 m³" },
            { label: "Assumes", value: "still, sea level" },
          ],
        },
        {
          heading: "In the real world",
          rows: [
            { label: "String, netting", value: "adds tonnes" },
            { label: "Cluster", value: "not free air" },
            { label: "At altitude", value: "lift falls off" },
          ],
          emphasis: "wrong",
        },
      ],
    },
    narration:
      "[[r]]The envelope says two point four million. The world says something larger, and here is why. [[r]]Every balloon needs a string and a place to tie it. Two point four million strings, plus netting strong enough to hold twenty-two tonnes, is itself measured in tonnes — and every tonne of rigging demands its own hundred thousand balloons, which demand their own rigging. Second, a cluster is not a cloud of independent balloons; the ones inside are shielded and the whole mass has to be lifted as one shape. Third, lift falls as you climb, because the air you are displacing gets thinner. Your answer is a floor, not a forecast — and knowing which direction it is wrong in is the skill.",
    reveals: [1, 8],
    estimatedSeconds: 56,
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
