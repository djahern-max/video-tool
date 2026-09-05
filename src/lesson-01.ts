/**
 * Lesson 01 — "How Many Helium Balloons Would It Take to Lift an Excavator?"
 *
 * PRACTICE COURSE. Not a CPE program, not for credit, not for export to
 * superCPE. It exists to exercise the pipeline — in particular the `Image`
 * slide, which no real lesson has used yet. COURSE_BALLOON's
 * nasbaFieldOfStudy says so out loud; do not "fix" it to a real field.
 *
 * Revision B pacing note: fourteen sheets rather than eight, most image
 * sheets 16–24s. That is deliberately outside LESSON-RUNBOOK.md's 40–75s
 * sheet window and `npm run check` warns on every one of them. The window was
 * set for all-typeset lessons; this lesson is testing whether a faster cut
 * reads better. Judge the render, then decide whether the window needs a
 * second case rather than treating the warnings as defects.
 *
 * Every block's first [[r]] marker sits in its first sentence. Revision A put
 * the first marker 32s into a 62s sheet and the sheet sat blank for half its
 * length. A sheet that fills immediately reads faster than a short sheet that
 * does not.
 *
 * Content is data. No React, no JSX, no timing logic in this file.
 *
 * Duration resolution order: audio-meta-01.json first, estimatedSeconds
 * second. `estimatedSeconds` is Math.round(wordCount / 130 * 60). It exists
 * only so a silent render has a length; it is discarded the moment audio
 * exists and must never reach a credit calculation (7.02.7).
 *
 * Reveal markers: [[r]] sits in `narration`, immediately before the WORD it
 * reveals. The number of [[r]] markers in a block MUST equal the length of
 * that block's `reveals` array.
 *
 * Images live in public/images/01/ and are committed source. `check` ERRORs
 * on a src that resolves to no file. Extensions are mixed (.jpg, .png,
 * .avif) because that is what the real files are; staticFile() does not care
 * and Chromium renders all three. Licensing is the author's problem.
 */

import audioMeta from "./audio-meta-01.json";
import { audioHashOf } from "./audio-identity";
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
  revision: "B",
  revisionDate: "2026-09-05",
  // "draft" until the content developer works through
  // drafts/BALLOON-01-review.md, closes its judgment list, and sets "checked"
  // by hand. That is the 4.01.1 check. Nothing in the tooling sets it. The
  // 4.02 content review is superCPE's, by a licensed CPA against the ingested
  // package, and this flag does not evidence it.
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
  // True unless the audio merely reads the slides (7.02.7). Set this against
  // the finished render, not against this comment.
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
        "Three numbers you can look up",
        "One law of physics",
        "Error bars you understand",
      ],
    },
    narration:
      "[[r]]Somewhere on the internet, someone has already answered this question. It is probably wrong, and you have no way to tell. So we are going to build the answer ourselves, out of [[r]]three numbers you can look up and one piece of physics that has been settled since a Greek man got out of a bathtub. That is a back-of-the-envelope calculation. Not a guess: a chain of small steps you could argue with, ending in a number whose [[r]]error bars you actually understand. Which matters, because the error bars are the fun part.",
    reveals: [1, 15, 36],
    estimatedSeconds: 43,
  },

  {
    id: "block-02",
    sheet: "S-02",
    citation: "Archimedes, Bk I",
    slide: "Image",
    figure: {
      kind: "image",
      src: "images/01/boat.jpg",
      alt: "A boat floating on calm water, its hull sitting at the waterline",
      caption: "Displacement, demonstrated",
    },
    narration:
      "[[r]]Archimedes worked this out in a bathtub, and boats have been exploiting it ever since. A steel hull floats because it shoves aside more water than it weighs. [[r]]That is the entire trick, and a helium balloon is doing exactly the same thing in air.",
    reveals: [1, 13],
    estimatedSeconds: 21,
  },

  {
    id: "block-03",
    sheet: "S-03",
    citation: "Displacement",
    slide: "Statement",
    figure: {
      kind: "statement",
      lines: [
        "Lift = weight of air displaced",
        "Minus everything inside",
        "Net lift per cubic metre",
      ],
    },
    narration:
      "[[r]]Here is what people get backwards. A helium balloon does not rise because helium is light. It rises because the balloon pushes air out of the way, and [[r]]the air it pushed aside weighs more than everything inside it. So the number that matters is not the weight of the helium. It is the difference: air displaced, minus helium, minus the latex holding it together. [[r]]Get that difference per cubic metre and the rest of this is arithmetic.",
    reveals: [1, 13, 30],
    estimatedSeconds: 36,
  },

  {
    id: "block-04",
    sheet: "S-04",
    citation: "Where it comes from",
    slide: "Image",
    figure: {
      kind: "image",
      src: "images/01/helium-tank.jpg",
      alt: "A pressurised helium cylinder of the kind rented for filling party balloons",
      caption: "One tank ≈ 50 balloons",
    },
    narration:
      "[[r]]This is where the helium comes from. A rental tank like this one fills about fifty balloons, [[r]]which is worth remembering for later, when we find out how many we need. Fifty. Write it down.",
    reveals: [1, 8],
    estimatedSeconds: 16,
  },

  {
    id: "block-05",
    sheet: "S-05",
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
      "Four numbers, all of them boring, none of them controversial. [[r]]Dry air at sea level: one point two two five kilograms per cubic metre. [[r]]Helium at the same temperature and pressure: zero point one seven nine. Those two do all the work. Third, [[r]]a standard eleven-inch party balloon holds about zero point zero one one five cubic metres. And fourth, the one everyone forgets: [[r]]the latex itself weighs two point eight grams, and the balloon has to lift that before it lifts anything of yours.",
    reveals: [5, 12, 20, 30],
    estimatedSeconds: 39,
  },

  {
    id: "block-06",
    sheet: "S-06",
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
      "Subtract, and you are done. [[r]]A cubic metre of air weighs one point two two five kilos. [[r]]Fill it with helium and you have put back one hundred seventy-nine grams. [[r]]The difference, one point zero four six kilos, is the net lift of a cubic metre of helium. [[r]]Scale that down to one balloon and you get twelve grams. [[r]]Then pay the latex, and what is left is nine point two grams. That is the number this whole lesson runs on.",
    reveals: [3, 8, 14, 23, 28],
    estimatedSeconds: 37,
  },

  {
    id: "block-07",
    sheet: "S-07",
    citation: "11-inch balloon",
    slide: "Image",
    figure: {
      kind: "image",
      src: "images/01/balloon.jpg",
      alt: "A single inflated latex party balloon on a string against a plain background",
      caption: "9.2 g of usable lift",
    },
    narration:
      "[[r]]So this is the unit. Not a cubic metre of helium, which nobody sells you, but the thing you actually buy and tie to a chair. [[r]]Nine point two grams of lift, and every one of them earned.",
    reveals: [1, 12],
    estimatedSeconds: 18,
  },

  {
    id: "block-08",
    sheet: "S-08",
    citation: "9.2 grams",
    slide: "Image",
    figure: {
      kind: "image",
      src: "images/01/paperclips.jpg",
      alt: "A small number of steel paperclips on a plain surface",
      caption: "Two paperclips",
    },
    narration:
      "[[r]]Nine point two grams is two paperclips. That is what one balloon lifts. It will not lift a can of soda. [[r]]It will barely lift the string you tied it with. Now go look at an excavator.",
    reveals: [1, 10],
    estimatedSeconds: 17,
  },

  {
    id: "block-09",
    sheet: "S-09",
    citation: "CAT 320 spec sheet",
    slide: "Image",
    figure: {
      kind: "image",
      src: "images/01/excavator.png",
      alt: "A tracked hydraulic excavator with its boom lowered, parked on a gravel lot",
      caption: "About 22,000 kg",
    },
    narration:
      "[[r]]A Caterpillar 320. Mid-size, the kind on every commercial site, not one of the mining monsters. [[r]]Operating weight, about twenty-two thousand kilograms. That is with the boom, the bucket, the fuel and an operator in the seat, which is the honest figure. Shipping weight is lower, and using it would have flattered us.",
    reveals: [1, 8],
    estimatedSeconds: 24,
  },

  {
    id: "block-10",
    sheet: "S-10",
    citation: "For scale",
    slide: "Image",
    figure: {
      kind: "image",
      src: "images/01/balloon-crowd.avif",
      alt: "A large cluster of party balloons, several thousand of them, filling the frame",
      caption: "A few thousand",
    },
    narration:
      "[[r]]This is a few thousand balloons. Take a good look, because it is the last quantity in this lesson you will be able to picture. [[r]]Whatever number you are imagining right now, it is too small.",
    reveals: [1, 12],
    estimatedSeconds: 17,
  },

  {
    id: "block-11",
    sheet: "S-11",
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
      "So: twenty-two thousand kilograms of excavator, divided by nine point two grams of lift per balloon. [[r]]In kilograms that is nought point nought nought nine two, which is the sort of number you should write down rather than hold in your head. [[r]]Divide one by the other and you get two point four million balloons. [[r]]That is twenty-seven thousand five hundred cubic metres of helium, a sphere thirty-seven metres across. Remember the tank that fills fifty? You would need forty-eight thousand of them.",
    reveals: [8, 20, 26],
    estimatedSeconds: 38,
  },

  {
    id: "block-12",
    sheet: "S-12",
    citation: "The rigging",
    slide: "Image",
    figure: {
      kind: "image",
      src: "images/01/netting.jpg",
      alt: "Heavy rope cargo netting, knotted in a grid",
      caption: "The rigging problem",
    },
    narration:
      "[[r]]And now the part that ruins everything. Two point four million balloons need two point four million strings, and netting strong enough to hold twenty-two tonnes. All of that has weight. [[r]]Every tonne of rigging demands another hundred thousand balloons, which demand more rigging, which demands more balloons.",
    reveals: [1, 15],
    estimatedSeconds: 22,
  },

  {
    id: "block-13",
    sheet: "S-13",
    citation: "The honest answer",
    slide: "Image",
    figure: {
      kind: "image",
      src: "images/01/airship.jpg",
      alt: "An airship in flight, its single large gas envelope filling most of the frame",
      caption: "One bag, not two million",
    },
    narration:
      "[[r]]Which is why nobody does it this way. An airship carries one enormous envelope instead of two million small ones, so it pays for its skin once. [[r]]The physics was never the problem. The packaging was.",
    reveals: [1, 13],
    estimatedSeconds: 17,
  },

  {
    id: "block-14",
    sheet: "S-14",
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
      "[[r]]So the envelope says two point four million, and the world says more. Rigging adds mass that demands its own balloons. A cluster is not a cloud of independent balloons; the ones inside are shielded and the whole thing lifts as one shape. And lift falls as you climb, because the air you are displacing gets thinner. [[r]]Your answer is a floor, not a forecast. Knowing which direction it is wrong in is the entire skill.",
    reveals: [1, 27],
    estimatedSeconds: 35,
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
