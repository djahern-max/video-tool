/**
 * Lesson 02 — "The Risk-Free Rate Election"
 * Course: ASC 842 for Private Companies: The Practical Expedients (ASC842-PCX)
 *
 * Content is data. No React, no JSX, no timing logic in this file.
 *
 * DRAFT — see drafts/ASC842-PCX-02-review.md for the block-by-block
 * traceability record, the UNSOURCED flags, and the open judgment list.
 * Unvoiced until audio-meta-02.json is populated.
 *
 * Duration resolution order: audio-meta-02.json first, estimatedSeconds
 * second. `estimatedSeconds` is Math.round(wordCount / 130 * 60). It exists
 * only so a silent render has a length; it is discarded the moment audio
 * exists and must never reach a credit calculation (7.02.7).
 *
 * Reveal markers: [[r]] sits in `narration`, immediately before the WORD it
 * reveals. generate-audio.ts strips the markers, reads their real timestamps
 * out of the ElevenLabs alignment stream, and writes them to
 * audio-meta-02.json. `reveals` is a preview estimate, discarded the moment
 * audio exists. The number of [[r]] markers in a block MUST equal the length
 * of that block's `reveals` array — verify with `npm run check` and
 * `npm run generate -- --lesson 02 --dry-run` before spending any API credit.
 */

import audioMeta from "./audio-meta-02.json";
import { COURSE } from "./course";
import type { PackageLessonMeta } from "./types";
import type { Block } from "./lesson-01";

export type { Block, Figure } from "./lesson-01";

export const meta = {
  lessonId: "02",
  courseCode: COURSE.lessons[1].lessonId,
  courseTitle: COURSE.title,
  lessonTitle: COURSE.lessons[1].title,
  title: COURSE.lessons[1].title,
  subtitle: "A published rate instead of an invented one",
  eyebrow: "Lesson 02",
  position: `Lesson 2 of ${COURSE.lessons.length}`,
  deliveryMethod: COURSE.deliveryMethod,
  fieldOfStudy: "Accounting",
  revision: "A",
  revisionDate: "2026-08-27",
  // Draft until the human works through drafts/ASC842-PCX-02-review.md,
  // closes its judgment list, and sets "reviewed" by hand.
  status: "reviewed",

  learningObjectives: [
    { id: "lo-1", text: "Determine the discount rate for a lessee's lease under 842-20-30-3: the rate implicit in the lease whenever it is readily determinable, otherwise the incremental borrowing rate or an elected risk-free rate." },
    { id: "lo-2", text: "Apply the risk-free rate election: identify the lessees eligible to elect, select a risk-free rate for a period comparable with the lease term, and state the disclosure the election requires." },
    { id: "lo-3", text: "Explain why ASU 2021-09 changed the election from entity-wide to by class of underlying asset, and what the change lets a lessee do." },
    { id: "lo-4", text: "Compute the effect of a lower discount rate on the initial lease liability and right-of-use asset, and weigh it against the cost of determining an incremental borrowing rate." },
  ],
  nasbaFieldOfStudy: COURSE.nasbaFieldOfStudy,
  knowledgeLevel: COURSE.knowledgeLevel,
  prerequisites: COURSE.prerequisites,
  advancePreparation: COURSE.advancePreparation,
  sources: [
    { citation: "ASC 842-20-30-3", role: "primary" },
    { citation: "ASU 2021-09 (incl. Basis for Conclusions)", role: "supporting" },
    { citation: "ASC 842-20-50-10", role: "supporting" },
    { citation: "ASC 842 Master Glossary — Incremental Borrowing Rate", role: "supporting" },
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
    citation: "ASU 2021-09 BC7; Glossary",
    slide: "Statement",
    figure: {
      kind: "statement",
      lines: [
        "Nothing to read a borrowing rate from",
        "Building an IBR: costly, complex, often outsourced",
        "All that work for one number",
      ],
    },
    narration:
      "Same controller, new problem. Her company signs a five-year office lease, and this one goes on the balance sheet — which means discounting the payments, which means picking a rate. The standard's default is the company's incremental borrowing rate: roughly, what it would pay to borrow a similar amount, on a secured basis, over a similar term. But the company has [[r]]no bank debt, no rated paper, no borrowing history — nothing to read a rate from. When the Board asked, preparers said building and defending an incremental borrowing rate was [[r]]costly and complex, that private companies rarely have treasury functions or quoted credit spreads, and that some were hiring valuation experts to produce this one input. [[r]]All of that, for a single number in a present value formula. This lesson is about the way out.",
    reveals: [28, 42, 54],
    estimatedSeconds: 63,
  },

  {
    id: "block-02",
    sheet: "S-02",
    citation: "842-20-30-3",
    slide: "Statement",
    figure: {
      kind: "statement",
      lines: [
        "Implicit rate — whenever readily determinable",
        "Otherwise: the incremental borrowing rate",
        "Non-PBE lessees: a risk-free rate, by class",
      ],
    },
    narration:
      "The discount rate paragraph answers her in three sentences. First: a lessee uses the [[r]]rate implicit in the lease whenever that rate is readily determinable — and practice reads readily determinable as a high bar, so in practice the first sentence rarely applies. Second: when the implicit rate is not readily determinable, the lessee uses its [[r]]incremental borrowing rate. That is the default the controller was dreading. Third, the relief. The standard says: a lessee that is not a public business entity is permitted to use a [[r]]risk-free discount rate for the lease instead of its incremental borrowing rate, determined using a period comparable with that of the lease term, as an accounting policy election made by class of underlying asset. Who may elect, what rate, and how the election is made — the rest of this lesson takes those in turn.",
    reveals: [6, 26, 40],
    estimatedSeconds: 66,
  },

  {
    id: "block-03",
    sheet: "S-03",
    citation: "ASU 2021-09 BC22",
    slide: "Facts",
    figure: {
      kind: "facts",
      rows: [
        { label: "The rate", value: "Risk-free, for a comparable period" },
        { label: "Practical source", value: "U.S. Treasury yields" },
        { label: "A five-year lease", value: "The five-year yield" },
        { label: "The discipline", value: "Match the term, at commencement" },
      ],
    },
    narration:
      "So what is the company actually electing to use? A [[r]]risk-free rate, determined — the paragraph's words — using a period comparable with that of the lease term. The standard never names a source, but the Board's discussion does: the working example is a [[r]]U.S. Treasury rate, publicly published by a reliable source, at maturities that line up with lease terms. That is the whole appeal. No model, no credit spread, no valuation report: for a [[r]]five-year office lease, a five-year Treasury yield, read off a public curve when the lease commences. And the [[r]]matching is the one discipline the election keeps: a comparable period means the five-year lease does not get the overnight rate because it is lower, or the ten-year because it is handy.",
    reveals: [5, 20, 35, 43],
    estimatedSeconds: 58,
  },

  {
    id: "block-04",
    sheet: "S-04",
    citation: "ASU 2021-09 BC8–15",
    slide: "Statement",
    figure: {
      kind: "statement",
      lines: [
        "As issued: one election, every lease",
        "A lower rate means a larger liability",
        "Wanted: the simple rate for the small classes",
        "ASU 2021-09: elect by class of underlying asset",
      ],
    },
    narration:
      "The by-class part is the new part, and the history explains the election better than the rule does. As issued in twenty sixteen, the election was [[r]]all or nothing: elect the risk-free rate and it applied to every lease the company had. Companies would not take that deal. A risk-free rate is [[r]]low, and a lower rate discounts less, so electing everywhere grossed up the balance sheet most on the leases that mattered most — real estate first. What preparers told the Board they wanted was the simple rate for the [[r]]small classes — high-volume, low-dollar office equipment — and a real borrowing rate for the big ones. In twenty twenty-one the Board agreed and remade the election [[r]]by class of underlying asset. Not a new rate; permission to draw the line where the cost sits.",
    reveals: [12, 24, 42, 54],
    estimatedSeconds: 63,
  },

  {
    id: "block-05",
    sheet: "S-05",
    citation: "842-20-30-3",
    slide: "Calc",
    figure: {
      kind: "calc",
      rows: [
        { label: "Office lease", value: "60 months × $5,000" },
        { label: "Total payments", value: "$300,000" },
        { label: "At a 7% IBR — lease liability", value: "≈ $252,500", rule: true },
        { label: "At a 7% IBR — ROU asset", value: "≈ $252,500" },
        { label: "At a 4% risk-free — lease liability", value: "≈ $271,500", rule: true },
        { label: "At a 4% risk-free — ROU asset", value: "≈ $271,500" },
        { label: "Extra balance sheet, same lease", value: "≈ $19,000", emphasis: "right", rule: true },
      ],
    },
    narration:
      "Now the trade, in dollars. One office lease, both rates: [[r]]sixty monthly payments of five thousand dollars — three hundred thousand dollars over the term. Suppose the incremental borrowing rate, if the company built one, would land near [[r]]seven percent: the payments discount to roughly two hundred fifty-two thousand five hundred dollars of lease liability, with a matching right-of-use asset. Elect the risk-free rate instead — say [[r]]four percent for a comparable five-year period — and the same payments discount to roughly two hundred seventy-one thousand five hundred dollars. [[r]]Nineteen thousand dollars more balance sheet, both sides, for the identical lease. That is the price of the shortcut. A risk-free rate sits below any real borrowing rate, a lower rate leaves more of the payments undiscounted, and what discounting does not remove, the balance sheet keeps.",
    reveals: [5, 18, 31, 41],
    estimatedSeconds: 63,
  },

  {
    id: "block-06",
    sheet: "S-06",
    citation: "842-20-30-3; BC18",
    slide: "Statement",
    figure: {
      kind: "statement",
      lines: [
        "“…whenever that rate is readily determinable”",
        "One lease's implicit rate beats the elected class rate",
        "A high bar — rare, but it outranks the election",
      ],
    },
    narration:
      "One exception sits inside the election, and the Board put it there deliberately. The paragraph's first sentence never stops applying: the standard says, a lessee should use the rate implicit in the lease [[r]]whenever that rate is readily determinable. Whenever — election or no election. So if the company elects the risk-free rate for its [[r]]equipment class, and for one equipment lease the lessor's pricing makes the implicit rate readily determinable, that one lease is discounted at the implicit rate — not the elected risk-free rate, and not an incremental borrowing rate. That fact pattern is the Board's own example in the Basis for Conclusions. In practice the exception [[r]]rarely bites — readily determinable stays a high bar, and the Board expects little effort spent proving a rate cannot be found — but where it bites, it outranks the election.",
    reveals: [15, 25, 50],
    estimatedSeconds: 65,
  },

  {
    id: "block-07",
    sheet: "S-07",
    citation: "842-20-30-3; 50-10",
    slide: "Facts",
    figure: {
      kind: "facts",
      rows: [
        { label: "Excluded", value: "Public business entities" },
        { label: "Eligible", value: "All other lessees — NFPs (even conduit bond obligors), EBPs" },
        { label: "Required disclosure", value: "The election, and the classes it covers" },
      ],
    },
    narration:
      "Who gets the election? The standard draws exactly one line: a lessee that is [[r]]not a public business entity. Public companies are out; everyone else is in. And the Board spelled out how wide everyone else runs: [[r]]not-for-profit entities — whether or not they are conduit bond obligors — and employee benefit plans are not public business entities, so they may elect. Keep that scope separate from lesson four's common control expedient, which does carve out conduit bond obligors; the two lists are close enough to mix up and different enough to matter. One string comes attached. A lessee that elects must [[r]]disclose the election, and the class or classes of underlying assets it applies to. The relief is in the measurement, never in the telling.",
    reveals: [6, 17, 47],
    estimatedSeconds: 58,
  },

  {
    id: "block-08",
    sheet: "S-08",
    citation: "842-20-30-3",
    slide: "List",
    figure: {
      kind: "list",
      items: [
        "Where does the IBR cost fall? Weigh it class by class",
        "A lower rate grows the liability — and can tip classification",
        "A readily determinable implicit rate always wins",
      ],
    },
    narration:
      "Three questions before electing the risk-free rate. [[r]]First, where does the cost fall? The election is by class, so weigh it class by class: high-volume, low-dollar classes are where incremental borrowing rate work costs the most and informs the least. [[r]]Second, can the balance sheet carry it? The risk-free rate runs below any real borrowing rate, so the liability and asset start larger — and the Board noted a larger present value can even tip a lease from operating into finance classification. [[r]]Third, is any lease's implicit rate readily determinable? If so, that lease uses it, election or not. Answer those three, elect by class, disclose the election and its classes — and the company that has never borrowed never has to invent the rate at which it would.",
    reveals: [3, 18, 38],
    estimatedSeconds: 60,
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
