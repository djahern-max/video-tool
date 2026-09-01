/**
 * Lesson 03 — "Not Separating Lease and Nonlease Components"
 * Course: ASC 842 for Private Companies: The Practical Expedients (ASC842-PCX)
 *
 * Content is data. No React, no JSX, no timing logic in this file.
 *
 * DRAFT — see drafts/ASC842-PCX-03-review.md for the block-by-block
 * traceability record and the open judgment list. Third pass 2026-08-29:
 * Codification copies of 842-10-15-3, 15-33, and 15-42A arrived in sources/
 * (each confirmed word-for-word against Section A where it existed as
 * issued), so the lease definition and the 15-33 allocation mechanics now
 * cite the text of record, and block 6's lessor election — dropped at
 * second pass for want of a source — is restored per J10, citing 15-42A
 * for the election and both of its conditions. 15-31 and 15-38 are still
 * cited from Section A as issued. Unvoiced until audio-meta-03.json is
 * populated.
 *
 * Duration resolution order: audio-meta-03.json first, estimatedSeconds
 * second. `estimatedSeconds` is Math.round(wordCount / 130 * 60). It exists
 * only so a silent render has a length; it is discarded the moment audio
 * exists and must never reach a credit calculation (7.02.7).
 *
 * Reveal markers: [[r]] sits in `narration`, immediately before the WORD it
 * reveals. generate-audio.ts strips the markers, reads their real timestamps
 * out of the ElevenLabs alignment stream, and writes them to
 * audio-meta-03.json. `reveals` is a preview estimate, discarded the moment
 * audio exists. The number of [[r]] markers in a block MUST equal the length
 * of that block's `reveals` array — verify with `npm run check` and
 * `npm run generate -- --lesson 03 --dry-run` before spending any API credit.
 */

import audioMeta from "./audio-meta-03.json";
import { COURSE } from "./course";
import type { PackageLessonMeta } from "./types";
import type { Block } from "./lesson-01";

export type { Block, Figure } from "./lesson-01";

export const meta = {
  lessonId: "03",
  courseCode: COURSE.lessons[2].lessonId,
  courseTitle: COURSE.title,
  lessonTitle: COURSE.lessons[2].title,
  title: COURSE.lessons[2].title,
  subtitle: "One payment, one component — by election",
  eyebrow: "Lesson 03",
  position: `Lesson 3 of ${COURSE.lessons.length}`,
  deliveryMethod: COURSE.deliveryMethod,
  fieldOfStudy: "Accounting",
  revision: "A",
  revisionDate: "2026-08-27",
  // Draft until the human works through drafts/ASC842-PCX-03-review.md,
  // closes its judgment list, and sets "reviewed" by hand.
  status: "reviewed",

  learningObjectives: [
    { id: "lo-1", text: "Identify the lease and nonlease components bundled into a single contract payment, and state the default requirement to separate them and allocate the consideration." },
    { id: "lo-2", text: "Apply the 842-10-15-37 election: account for each lease component and its associated nonlease components as a single lease component, by class of underlying asset." },
    { id: "lo-3", text: "Explain the election's measurement effect: a larger lease liability and right-of-use asset that include the nonlease payments, with total expense over the term unchanged." },
    { id: "lo-4", text: "Evaluate when the election is cost-effective for a lessee, and recognize that the lessor allocates under its own requirements and has its own separate, conditional combination election." },
  ],
  nasbaFieldOfStudy: COURSE.nasbaFieldOfStudy,
  knowledgeLevel: COURSE.knowledgeLevel,
  prerequisites: COURSE.prerequisites,
  advancePreparation: COURSE.advancePreparation,
  sources: [
    { citation: "ASC 842-10-15-37", role: "primary" },
    { citation: "ASC 842-10-15-3", role: "supporting" },
    { citation: "ASC 842-10-15-31 and 15-33", role: "supporting" },
    { citation: "ASC 842-10-15-38", role: "supporting" },
    { citation: "ASC 842-10-15-42A", role: "supporting" },
    { citation: "ASC 842-20-25-6", role: "supporting" },
  ],
  author: {
    name: "Daniel J. Ahern",
    credentials: "CPA",
    licenseJurisdiction: "New Hampshire",
    licenseNumber: "07308",
  },
  wordCount: 0,
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
    citation: "842-10-15-37",
    slide: "Statement",
    figure: {
      kind: "statement",
      lines: [
        "One payment: rent + CAM + services",
        "The space is the lease component",
        "The services are nonlease components",
      ],
    },
    narration:
      "Back to the controller's office lease — the actual invoice this time. One payment a month, and inside it: rent for the space, [[r]]common area maintenance for the lobby she shares, and a service contract for the building's front desk. Under ASC eight forty-two, only one of those is a lease. The [[r]]space is the lease — the right to use an identified asset. The maintenance and the staffed desk are [[r]]services: things the landlord does, not things she controls the use of. The standard calls them nonlease components, and every bundled contract raises the same question — what is this one payment actually buying? It matters because the lease part goes on the balance sheet, and the service part does not.",
    reveals: [11, 24, 33],
    estimatedSeconds: 56,
  },

  {
    id: "block-02",
    sheet: "S-02",
    citation: "842-10-15-31; 15-33",
    slide: "Statement",
    figure: {
      kind: "statement",
      lines: [
        "Default: separate lease from nonlease components",
        "Allocate the payment on relative standalone prices",
        "No observable price? Estimate one",
      ],
    },
    narration:
      "The default rule is separation. The election we are about to meet is written as a choice [[r]]not to separate — which tells you what the baseline is: a lessee identifies each lease component and each nonlease component and accounts for them apart. Separating takes an [[r]]allocation: the single payment is split across the components in proportion to their standalone prices — what the space alone would rent for, what the services alone would cost. Where observable prices are not readily available, the lessee [[r]]estimates them. That is real work, on every bundled contract, for as long as the contracts keep changing. Keep the shape of that work in mind, because it is exactly what the election is priced against.",
    reveals: [8, 21, 39],
    estimatedSeconds: 55,
  },

  {
    id: "block-03",
    sheet: "S-03",
    citation: "842-10-15-37",
    slide: "Statement",
    figure: {
      kind: "statement",
      lines: [
        "An accounting policy, by class of underlying asset",
        "Lease + associated nonlease = one lease component",
        "Within a class: every contract, consistently",
      ],
    },
    narration:
      "Here is the election. The standard says: as a practical expedient, a lessee may, as an accounting policy election [[r]]by class of underlying asset, choose not to separate nonlease components from lease components and instead to account for each separate lease component and the nonlease components [[r]]associated with that lease component as a single lease component. Read it twice, because every phrase carries weight. It is an accounting policy, made by class — the same machinery as lessons one and two, with the same consistency: [[r]]every contract in an elected class follows it. And it merges each lease component with the nonlease components associated with it — the maintenance that rides on the office — not with unrelated services that happen to share a counterparty.",
    reveals: [9, 21, 39],
    estimatedSeconds: 58,
  },

  {
    id: "block-04",
    sheet: "S-04",
    citation: "15-37; 842-20-25-6",
    slide: "Facts",
    figure: {
      kind: "facts",
      rows: [
        { label: "Lease liability", value: "Larger — includes nonlease payments" },
        { label: "Right-of-use asset", value: "Larger, to match" },
        { label: "Total expense over the term", value: "Unchanged" },
        { label: "What moves", value: "Balance sheet, not earnings" },
      ],
    },
    narration:
      "What does electing actually do to the numbers? The whole payment becomes a lease payment. So the [[r]]lease liability is bigger — it now includes the present value of the maintenance and service money, dollars that would otherwise never have touched the balance sheet — and the [[r]]right-of-use asset grows with it. What does not change is [[r]]total expense. For an operating lease, the standard's single lease cost spreads the cost of the lease straight-line over the term, and that cost now simply includes the service dollars; separated, the same dollars arrive as service expense as the services are consumed. [[r]]Either way the income statement ends the term in the same place. The election moves the balance sheet, not earnings.",
    reveals: [8, 22, 26, 46],
    estimatedSeconds: 55,
  },

  {
    id: "block-05",
    sheet: "S-05",
    citation: "842-10-15-37",
    slide: "Statement",
    figure: {
      kind: "statement",
      lines: [
        "The alternative: allocation work, repeated",
        "Small service slice: elect — little liability cost",
        "Large service slice: the liability cost gets real",
      ],
    },
    narration:
      "Why would a lessee take a bigger liability on purpose? Because the alternative is the [[r]]allocation, forever. Standalone prices for the space, the maintenance, the desk; estimates where no observable price exists; the whole exercise redone when the contract changes. For an office lease where the services are a [[r]]sliver of the payment, that work buys almost nothing: the liability barely moves, and the allocation cost repeats while the election's cost is a slightly larger number, once. The calculus flips when the services are [[r]]large. A payment that is one-third building and two-thirds staffed services would put real service money on the balance sheet as a debt-like liability — and there, the saved work is often not worth what it costs. The election is by class, so a lessee can hold both positions: elect where services are trivial, separate where they are the point.",
    reveals: [7, 23, 39],
    estimatedSeconds: 66,
  },

  {
    id: "block-06",
    sheet: "S-06",
    citation: "842-10-15-37; 15-38; 15-42A",
    slide: "Statement",
    figure: {
      kind: "statement",
      lines: [
        "The lessee election stops at the lessee",
        "Lessors: allocate under the revenue standard",
        "Lessor election: same timing and pattern, operating lease",
        "Same contract, two right answers",
      ],
    },
    narration:
      "One caution before the arithmetic: the lessor side of the same contract is [[r]]not a mirror. The election you just read is written for a lessee — the paragraph says a lessee may. The lessor's own paragraphs send [[r]]allocation a different way entirely: a lessor allocates the consideration under the revenue standard's requirements. Lessors have their own version of this election, and it is [[r]]conditional: available only when the timing and pattern of transfer of the lease component and its associated nonlease components are the same, and when the lease component, on its own, would classify as an operating lease. A different rule and a different test, applied by the other party, that can reach a [[r]]different answer. So a tenant that combines and a landlord that separates can both be right about the identical payment. This course teaches the lessee election; if you sit on the lessor side, read the lessor paragraphs before borrowing any of it.",
    reveals: [6, 18, 30, 54],
    estimatedSeconds: 73,
  },

  {
    id: "block-07",
    sheet: "S-07",
    citation: "842-10-15-37",
    slide: "Calc",
    figure: {
      kind: "calc",
      rows: [
        { label: "Office lease, all-in", value: "36 months × $6,000" },
        { label: "Standalone split", value: "$5,000 space · $1,000 services" },
        { label: "Separated — lease liability", value: "≈ $166,800 (PV of $5,000 at 5%)", rule: true },
        { label: "Separated — services", value: "$1,000/month, expensed as incurred" },
        { label: "Combined — lease liability", value: "≈ $200,200 (PV of $6,000 at 5%)", rule: true },
        { label: "Extra liability from electing", value: "≈ $33,400" },
        { label: "Expense over the term, either way", value: "$216,000", emphasis: "right", rule: true },
      ],
    },
    narration:
      "Now the invoice, both ways. A [[r]]three-year office lease at six thousand dollars a month, all-in; standalone prices would split it five thousand for the space and one thousand for maintenance and services. [[r]]Separated, the lessee discounts only the five thousand — at, say, five percent, roughly one hundred sixty-six thousand eight hundred dollars of liability — and the service thousand is expensed month by month as plain operating cost. [[r]]Elected as a single lease component, the full six thousand discounts to roughly two hundred thousand two hundred dollars — about thirty-three thousand four hundred dollars more liability, and the same again on the asset side. And [[r]]either way, profit and loss carries six thousand dollars a month, two hundred sixteen thousand dollars over the term. Choose which statement takes the difference, because one of them must.",
    reveals: [3, 15, 32, 49],
    estimatedSeconds: 63,
  },

  {
    id: "block-08",
    sheet: "S-08",
    citation: "842-10-15-37",
    slide: "List",
    figure: {
      kind: "list",
      items: [
        "Default: separate, and allocate on standalone prices",
        "Elect: bigger liability and asset, same total expense",
        "Decide class by class — services small: elect; large: separate",
      ],
    },
    narration:
      "The nonlease election in three lines. [[r]]First, know the default: components separate, and the payment allocates on standalone prices — work that repeats for as long as the contracts do. [[r]]Second, know the price of skipping it: elect by class and the whole payment becomes a lease payment, so the liability and the asset grow by the present value of the services, while total expense does not move. [[r]]Third, choose class by class: where service money is small, the election trades a rounding error on the balance sheet for the end of the allocation work; where service money is large, the trade runs the other way. And remember the landlord plays by a different rule — the lessee election stops at the lessee.",
    reveals: [3, 14, 31],
    estimatedSeconds: 57,
  },
];

type BlockMeta = { durationSeconds: number; reveals: number[]; hash: string };
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
