/**
 * Lesson 01 — "The Short-Term Lease Exception"
 * Course: ASC 842 for Private Companies: The Practical Expedients (ASC842-PCX)
 *
 * Content is data. No React, no JSX, no timing logic in this file.
 *
 * Content-reviewed by the author on 2026-08-27; see
 * drafts/ASC842-PCX-01-review.md for the block-by-block traceability record
 * and the closed judgment list. Unvoiced until audio-meta-01.json is populated.
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
 */

import audioMeta from "./audio-meta-01.json";
import { COURSE } from "./course";
import type { PackageLessonMeta } from "./types";

export type Figure =
  | { kind: "statement"; lines: string[] }
  | { kind: "facts"; rows: { label: string; value: string }[] }
  | {
    kind: "calc";
    rows: {
      label: string;
      value: string;
      emphasis?: "wrong" | "right";
      rule?: boolean;
    }[];
  }
  | { kind: "list"; items: string[] }
  | {
    kind: "compare";
    columns: {
      heading: string;
      rows: { label: string; value: string }[];
      emphasis?: "wrong" | "right";
    }[];
  };

export type Block = {
  id: string;
  sheet: string;
  citation: string;
  slide: "Title" | "Statement" | "Facts" | "Calc" | "List" | "Compare";
  figure?: Figure;
  narration: string; // transcript of record, may contain [[r]] markers
  reveals: number[]; // fallback seconds from block start, used until measured
  estimatedSeconds: number;
  speech?: string; // overrides narration for TTS only; rarely needed
};

export const meta = {
  lessonId: "01",
  courseCode: COURSE.lessons[0].lessonId,
  courseTitle: COURSE.title,
  lessonTitle: COURSE.lessons[0].title,
  title: COURSE.lessons[0].title,
  subtitle: "Twelve months, measured the standard's way",
  eyebrow: "Lesson 01",
  position: `Lesson 1 of ${COURSE.lessons.length}`,
  deliveryMethod: COURSE.deliveryMethod,
  fieldOfStudy: "Accounting",
  revision: "A",
  revisionDate: "2026-08-27",
  // Set by hand 2026-08-27: drafts/ASC842-PCX-01-review.md's judgment list
  // is closed and the author signed off.
  status: "reviewed",

  learningObjectives: [
    { id: "lo-1", text: "Determine whether a lease is short-term at commencement, including the effect of renewal options the lessee is reasonably certain to exercise." },
    { id: "lo-2", text: "Apply the short-term lease election: recognize lease payments straight-line with no right-of-use asset or lease liability, and identify the disclosure that remains." },
    { id: "lo-3", text: "Explain that the election is an accounting policy made by class of underlying asset and applied to every qualifying lease in the class." },
    { id: "lo-4", text: "Identify the changes in circumstances that end short-term treatment and the accounting that follows." },
  ],
  nasbaFieldOfStudy: COURSE.nasbaFieldOfStudy,
  knowledgeLevel: COURSE.knowledgeLevel,
  prerequisites: COURSE.prerequisites,
  advancePreparation: COURSE.advancePreparation,
  sources: [
    { citation: "ASC 842-20-25-2", role: "primary" },
    { citation: "ASC 842 Master Glossary — Short-Term Lease", role: "supporting" },
    { citation: "ASC 842-10-30-1 through 30-2", role: "supporting" },
    { citation: "ASC 842-20-25-3", role: "supporting" },
    { citation: "ASC 842-20-25-6", role: "supporting" },
    { citation: "ASC 842-20-30-3", role: "supporting" },
    { citation: "ASC 842-20-50-4", role: "supporting" },
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
    citation: "Glossary; 842-20-25-2",
    slide: "Statement",
    figure: {
      kind: "statement",
      lines: [
        "A two-year copier lease: not short-term",
        "A one-year van lease with renewals: it depends",
        "“Short” is a defined term, not a feeling",
      ],
    },
    narration:
      "Picture a controller with two leases on her desk. The first is a [[r]]two-year lease on a copier. The second is a [[r]]one-year lease on a delivery van, with three one-year renewal options the company always takes. Ask which one is a short lease and instinct says both — the copier feels temporary, and the van renews one year at a time. Under ASC eight forty-two, instinct is wrong at least once. The copier lease is not short-term, and the van might not be either. [[r]]Short-term is a defined term with a precise boundary, and an election hangs on it: the one exception that lets a lessee keep a lease off the balance sheet entirely. This lesson is about where that boundary actually sits.",
    reveals: [6, 10, 39],
    estimatedSeconds: 57,
  },

  {
    id: "block-02",
    sheet: "S-02",
    citation: "842-20-25-2; Glossary",
    slide: "Statement",
    figure: {
      kind: "statement",
      lines: [
        "Twelve months or less at commencement",
        "No purchase option reasonably certain of exercise",
        "“A lessee may elect not to apply the recognition requirements…”",
      ],
    },
    narration:
      "Start with the definition. A short-term lease is one that, at the [[r]]commencement date, has a lease term of twelve months or less — and that does not include an option to purchase the underlying asset that the lessee is [[r]]reasonably certain to exercise. Both parts matter. A nine-month lease with a purchase option the lessee fully intends to take is not short-term, no matter how short the term reads. For leases that qualify, the standard says: [[r]]a lessee may elect not to apply the recognition requirements in this Subtopic to short-term leases. That one sentence is the entire exception. Everything else in this lesson is about what it includes, and what it quietly leaves out.",
    reveals: [6, 18, 36],
    estimatedSeconds: 54,
  },

  {
    id: "block-03",
    sheet: "S-03",
    citation: "842-10-30-1 to 30-2",
    slide: "Facts",
    figure: {
      kind: "facts",
      rows: [
        { label: "Stated term", value: "1 year" },
        { label: "Renewal options", value: "4 × 1 year" },
        { label: "Reasonably certain to renew?", value: "Yes" },
        { label: "Lease term", value: "5 years — not short-term" },
      ],
    },
    narration:
      "Here is the trap. The twelve months are measured against the [[r]]lease term, and the lease term is not the stated term. It is the noncancellable period plus any renewal periods the lessee is reasonably certain to exercise. By the same logic, it includes periods after a termination option the lessee is reasonably certain not to take. So take a [[r]]one-year warehouse lease with four one-year renewal options. If the company has built racking into the space, has no alternative site, and expects to renew — those renewals are reasonably certain, and the lease term is [[r]]five years, at commencement, on day one. Reasonably certain is judged by the economic incentives to renew — contract-based, asset-based, entity-based, and market-based factors, considered together, with no single factor deciding it. The [[r]]delivery van from the opening is the same arithmetic: one year plus three renewals the company always takes is a four-year lease term, not a short one.",
    reveals: [5, 28, 44, 60],
    estimatedSeconds: 72,
  },

  {
    id: "block-04",
    sheet: "S-04",
    citation: "842-20-25-2; 50-4",
    slide: "Statement",
    figure: {
      kind: "statement",
      lines: [
        "No right-of-use asset. No lease liability.",
        "Straight-line expense over the lease term",
        "The disclosure does not go away",
      ],
    },
    narration:
      "So what does the election actually buy. A lessee that elects it [[r]]recognizes no right-of-use asset and no lease liability for its short-term leases. Instead, the standard says, the lessee recognizes the lease payments in profit or loss on a [[r]]straight-line basis over the lease term, with variable payments expensed in the period the obligation is incurred. For most private companies that is the old, familiar operating-lease accounting: rent expense, evenly spread. What the election does not buy is silence. [[r]]Short-term lease cost still has to be disclosed — leases of a month or less aside — so the reader of the financial statements can see the expense that never touched the balance sheet. Off the balance sheet is not off the books.",
    reveals: [6, 18, 37],
    estimatedSeconds: 57,
  },

  {
    id: "block-05",
    sheet: "S-05",
    citation: "ASC 842-20-25-2",
    slide: "Facts",
    figure: {
      kind: "facts",
      rows: [
        { label: "Election made by", value: "Class of underlying asset" },
        { label: "Kind of election", value: "Accounting policy" },
        { label: "Within a class", value: "Every qualifying lease, or none" },
        { label: "Example classes", value: "Vehicles · Equipment · Real estate" },
      ],
    },
    narration:
      "The election is not made lease by lease. The standard says the accounting policy election shall be made by [[r]]class of underlying asset to which the right of use relates. Class itself is not defined, so it is read at face value — assets of a similar nature and use: [[r]]vehicles, say, or office equipment, or real estate. Electing for a class is an [[r]]accounting policy, which means consistency: within that class, every lease that qualifies as short-term gets the election, and every lease that does not qualify goes on the balance sheet. What you cannot do is [[r]]pick favorites — take the election for the delivery van you would rather not capitalize, while recognizing the identical van leased by another branch.",
    reveals: [9, 23, 30, 45],
    estimatedSeconds: 56,
  },

  {
    id: "block-06",
    sheet: "S-06",
    citation: "842-20-25-3",
    slide: "Statement",
    figure: {
      kind: "statement",
      lines: [
        "Extended past twelve months → no longer short-term",
        "Purchase option becomes reasonably certain → same result",
        "Account as if the change date were commencement",
      ],
    },
    narration:
      "Short-term status is not permanent. Two changes end it. If the [[r]]lease term changes so that it now extends more than twelve months past the end of the previously determined term — the six-month lease that gets an eighteen-month extension — the lease no longer meets the definition. And if a [[r]]purchase option the lessee holds becomes reasonably certain of exercise, same result. When either happens, the guidance sends you back to the beginning: the lessee applies the rest of the Topic [[r]]as if the date of the change in circumstances were the commencement date. In practice that means measuring and recognizing a right-of-use asset and lease liability on that date, using the facts as they stand then. The election defers the accounting; it cannot outrun the facts.",
    reveals: [5, 24, 38],
    estimatedSeconds: 59,
  },

  {
    id: "block-07",
    sheet: "S-07",
    citation: "842-20-25-2; 25-6",
    slide: "Calc",
    figure: {
      kind: "calc",
      rows: [
        { label: "Forklift lease", value: "12 months × $2,000" },
        { label: "Total payments", value: "$24,000" },
        { label: "Elected — balance sheet", value: "$0", rule: true },
        { label: "Elected — monthly expense", value: "$2,000 straight-line" },
        { label: "Not elected — lease liability", value: "≈ $23,400 (PV at 5%)", rule: true },
        { label: "Not elected — ROU asset", value: "≈ $23,400" },
        { label: "Not elected — monthly lease cost", value: "$2,000" },
        { label: "Total expense, either way", value: "$24,000", emphasis: "right", rule: true },
      ],
    },
    narration:
      "Now the same lease, both ways. A [[r]]forklift, leased for twelve months at two thousand dollars a month — twenty-four thousand dollars over the term, no renewal options, no purchase option. [[r]]With the election, the balance sheet shows nothing, and rent expense runs two thousand dollars a month, straight-line. [[r]]Without the election, the company discounts the payments — at, say, five percent, roughly twenty-three thousand four hundred dollars — and records that amount as both a lease liability and a right-of-use asset, which then unwind over the year. Here is the part worth remembering: for an operating lease, [[r]]total expense is twenty-four thousand dollars either way, and even the monthly pattern matches. The election does not change earnings. It spares a lessee the discounting, the schedules, and the balance-sheet gross-up for a lease that will be gone in a year.",
    reveals: [3, 14, 23, 45],
    estimatedSeconds: 65,
  },

  {
    id: "block-08",
    sheet: "S-08",
    citation: "842-20-25-2",
    slide: "List",
    figure: {
      kind: "list",
      items: [
        "Lease term ≤ 12 months at commencement — renewals included",
        "No purchase option reasonably certain of exercise",
        "Election covers the whole class of underlying asset",
      ],
    },
    narration:
      "Three things to check before calling a lease short-term. [[r]]First, the lease term: twelve months or less at commencement — counting every renewal period the lessee is reasonably certain to exercise, which is where the delivery van and the optioned warehouse fail. [[r]]Second, purchase options: if the lessee is reasonably certain to buy the asset, the lease is not short-term at any length. [[r]]Third, the election itself: it is a policy, made by class of underlying asset, and it carries every qualifying lease in the class with it. Check all three at commencement, and keep watching afterward — because an extension or a change of heart about an option ends the exception, and the balance sheet catches up on the day the facts change.",
    reveals: [4, 19, 29],
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
