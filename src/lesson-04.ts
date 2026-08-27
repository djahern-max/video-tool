/**
 * Lesson 04 — "Common Control Arrangements"
 * Course: ASC 842 for Private Companies: The Practical Expedients (ASC842-PCX)
 *
 * Content is data. No React, no JSX, no timing logic in this file.
 *
 * DRAFT — see drafts/ASC842-PCX-04-review.md for the block-by-block
 * traceability record, the UNSOURCED flags, and the open judgment list.
 * Unvoiced until audio-meta-04.json is populated.
 *
 * Duration resolution order: audio-meta-04.json first, estimatedSeconds
 * second. `estimatedSeconds` is Math.round(wordCount / 130 * 60). It exists
 * only so a silent render has a length; it is discarded the moment audio
 * exists and must never reach a credit calculation (7.02.7).
 *
 * Reveal markers: [[r]] sits in `narration`, immediately before the WORD it
 * reveals. generate-audio.ts strips the markers, reads their real timestamps
 * out of the ElevenLabs alignment stream, and writes them to
 * audio-meta-04.json. `reveals` is a preview estimate, discarded the moment
 * audio exists. The number of [[r]] markers in a block MUST equal the length
 * of that block's `reveals` array — verify with `npm run check` and
 * `npm run generate -- --lesson 04 --dry-run` before spending any API credit.
 */

import audioMeta from "./audio-meta-04.json";
import { COURSE } from "./course";
import type { PackageLessonMeta } from "./types";
import type { Block } from "./lesson-01";

export type { Block, Figure } from "./lesson-01";

export const meta = {
  lessonId: "04",
  courseCode: COURSE.lessons[3].lessonId,
  courseTitle: COURSE.title,
  lessonTitle: COURSE.lessons[3].title,
  title: COURSE.lessons[3].title,
  subtitle: "Written terms, and improvements that outlive the lease",
  eyebrow: "Lesson 04",
  position: `Lesson 4 of ${COURSE.lessons.length}`,
  deliveryMethod: COURSE.deliveryMethod,
  fieldOfStudy: "Accounting",
  revision: "A",
  revisionDate: "2026-08-27",
  // Draft until the human works through drafts/ASC842-PCX-04-review.md,
  // closes its judgment list, and sets "reviewed" by hand.
  status: "draft",

  learningObjectives: [
    { id: "lo-1", text: "Determine whether an entity is eligible for the practical expedient in 842-10-15-3A and apply written terms and conditions to decide whether a common control arrangement is or contains a lease." },
    { id: "lo-2", text: "Apply the expedient's limits: the practical rather than enforceable right to control, the arrangement-by-arrangement election, and the consequence of having no written terms." },
    { id: "lo-3", text: "Apply 842-20-35-12A: amortize leasehold improvements in a common control lease over their useful life to the common control group while the lessee controls the use of the underlying asset, for any entity." },
    { id: "lo-4", text: "Determine the accounting when the lessee no longer controls the underlying asset — a transfer through an adjustment to equity — and the disclosures required while useful life exceeds the lease term." },
  ],
  nasbaFieldOfStudy: COURSE.nasbaFieldOfStudy,
  knowledgeLevel: COURSE.knowledgeLevel,
  prerequisites: COURSE.prerequisites,
  advancePreparation: COURSE.advancePreparation,
  sources: [
    { citation: "ASC 842-10-15-3A", role: "primary" },
    { citation: "ASC 842-20-35-12A", role: "primary" },
    { citation: "ASU 2023-01 (incl. Basis for Conclusions)", role: "supporting" },
    { citation: "ASC 842-10-15-3B through 15-3C", role: "supporting" },
    { citation: "ASC 842-20-35-12, 35-12B, 50-7A", role: "supporting" },
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
    citation: "ASU 2023-01",
    slide: "Statement",
    figure: {
      kind: "statement",
      lines: [
        "One owner, two entities, one building",
        "Real money in leasehold improvements",
        "Is it a lease — and over what life do improvements amortize?",
      ],
    },
    narration:
      "Last lesson, and the most family-shaped problem in the course. The owner of a company also owns an [[r]]LLC, the LLC owns the building, and the operating company uses it — on a handshake, the way related parties actually deal. The operating company has also just spent real money on [[r]]leasehold improvements: a new roof, a built-out shop floor. Two questions follow, and the old guidance answered both badly. [[r]]Is this arrangement even a lease — when the terms live in a conversation, and the one owner on both sides could change them tomorrow? And if it is, over what life do those improvements depreciate — the paper lease term, or the years the group will actually use them? A twenty twenty-three amendment answers both, and this lesson closes the course with it.",
    reveals: [8, 23, 32],
    estimatedSeconds: 61,
  },

  {
    id: "block-02",
    sheet: "S-02",
    citation: "842-10-15-3A",
    slide: "Statement",
    figure: {
      kind: "statement",
      lines: [
        "Use the written terms to find — and account for — the lease",
        "Eligible: not a PBE, NFP conduit obligor, or SEC-filing EBP",
        "Practical — not enforceable — right to control",
        "Arrangement by arrangement; written terms required",
      ],
    },
    narration:
      "Issue one: what counts as a lease between related parties. The standard says: as a practical expedient, an entity may use the [[r]]written terms and conditions of a related party arrangement between entities under common control to determine whether that arrangement is or contains a lease — and, if it does, classify and account for it on the basis of those written terms. The eligible entities are the private ones: [[r]]not public business entities, not conduit bond obligor not-for-profits, and not employee benefit plans that file with the S-E-C. What the expedient removes is [[r]]enforceability: the question becomes whether the written terms convey the practical — as opposed to enforceable — right to control the use of an identified asset. No legal opinion. It is elected [[r]]arrangement by arrangement — the one election in this course that is not by class. And the operative word is written. No written terms, no expedient.",
    reveals: [10, 32, 43, 58],
    estimatedSeconds: 70,
  },

  {
    id: "block-03",
    sheet: "S-03",
    citation: "ASU 2023-01 BC13–16",
    slide: "Statement",
    figure: {
      kind: "statement",
      lines: [
        "Enforceability: costly to assess, rarely meaningful",
        "Could require a formal legal opinion",
        "The common owner can amend — or not enforce — at will",
        "Auditors wanted written terms anyway",
      ],
    },
    narration:
      "Why did the Board allow this? Because between entities under common control, legal enforceability was [[r]]costly to assess and rarely meaningful. Stakeholders told the Board that pinning down the enforceable terms of a family arrangement could mean a formal [[r]]legal opinion — hard and expensive precisely because of the common control — while the common owner could amend the terms at any time, or simply choose [[r]]not to enforce them. An arrangement controlled entirely by one party makes enforceability a strange question to build accounting on. The Board also noted the practical footnote: when entities did identify unwritten terms, auditors usually wanted them [[r]]written down anyway. So the expedient follows the paper: write the terms, use the terms. And at transition, the Board explicitly allowed entities to document existing handshakes in writing before their first statements under the expedient were issued.",
    reveals: [7, 18, 30, 48],
    estimatedSeconds: 65,
  },

  {
    id: "block-04",
    sheet: "S-04",
    citation: "842-20-35-12A",
    slide: "Statement",
    figure: {
      kind: "statement",
      lines: [
        "General rule: shorter of useful life and lease term",
        "Common control: useful life to the group",
        "…as long as the lessee controls the use, through a lease",
        "This half applies to all entities — even public",
      ],
    },
    narration:
      "Issue two: the roof. Ordinarily, leasehold improvements amortize over the [[r]]shorter of their useful life and the remaining lease term — a five-year lease turns a fifteen-year roof into a five-year expense. Between entities under common control, the Board decided that answer misstated the economics, and wrote a different one. The standard says: leasehold improvements associated with a lease between entities under common control shall be amortized over the [[r]]useful life of those improvements to the common control group — as long as the lessee [[r]]controls the use of the underlying asset through a lease. Not the lease term: the group's useful life. The reasoning is the family dynamic itself: the renewal decision belongs to the one owner on both sides, and improvements that outlast the lease do not leave the family. And note the reach: this half of the amendment applies to [[r]]every entity, public companies included. Only the written-terms expedient is private-company relief.",
    reveals: [5, 32, 39, 66],
    estimatedSeconds: 72,
  },

  {
    id: "block-05",
    sheet: "S-05",
    citation: "842-20-35-12A(b)",
    slide: "Statement",
    figure: {
      kind: "statement",
      lines: [
        "The condition: control through a lease",
        "Control ends → transfer within the group",
        "Through an adjustment to equity — not a P&L loss",
        "Impairment testing still applies (Topic 360)",
      ],
    },
    narration:
      "What happens when the music stops? The longer life is conditioned on control: the lessee amortizes over the group's useful life only [[r]]as long as it controls the use of the asset through a lease. The day it no longer does — the lease ends and is not renewed, the space is handed back — the remaining balance does not run through earnings as a loss. The standard says the improvements are [[r]]accounted for as a transfer between entities under common control, through an [[r]]adjustment to equity. The books treat it the way the family treats it: value moved from one pocket to another. Along the way, the improvements stay subject to ordinary [[r]]impairment testing under the property, plant, and equipment guidance — the longer life is not a shield for an asset that has stopped earning its keep.",
    reveals: [10, 33, 39, 52],
    estimatedSeconds: 64,
  },

  {
    id: "block-06",
    sheet: "S-06",
    citation: "842-20-50-7A; 65-7",
    slide: "Facts",
    figure: {
      kind: "facts",
      rows: [
        { label: "Disclose when", value: "Useful life exceeds the lease term" },
        { label: "The three numbers", value: "Unamortized balance · remaining life · lease term" },
        { label: "Effective", value: "Fiscal years beginning after 12/15/2023" },
        { label: "Transition", value: "Prospective options, or retrospective" },
      ],
    },
    narration:
      "Two housekeeping items, briefly, both from the same amendment. Disclosure first: when the group's useful life runs [[r]]past the lease term — which is every case this lesson cares about — the lessee discloses three numbers: the [[r]]unamortized balance of the improvements, their remaining useful life to the group, and the remaining lease term. The reader gets to see the mismatch the accounting is deliberately carrying. Transition second: the amendments took effect for fiscal years beginning after [[r]]December fifteenth, twenty twenty-three, with early adoption allowed. Entities already on ASC eight forty-two could apply them [[r]]prospectively — to new improvements, or to new and existing ones — or reach back retrospectively. And at adoption, an entity was allowed to put its unwritten arrangements in writing, and use the expedient from there forward.",
    reveals: [8, 17, 36, 43],
    estimatedSeconds: 60,
  },

  {
    id: "block-07",
    sheet: "S-07",
    citation: "842-20-35-12A",
    slide: "Calc",
    figure: {
      kind: "calc",
      rows: [
        { label: "Written lease", value: "5 years, LLC → operating company" },
        { label: "New roof", value: "$150,000 · 15-year life to the group" },
        { label: "General rule (35-12)", value: "$30,000/year over 5 years", rule: true },
        { label: "Common control (35-12A)", value: "$10,000/year over 15 years" },
        { label: "Lease ends at year 5", value: "$100,000 still unamortized", rule: true },
        { label: "It leaves as", value: "Equity transfer — not a P&L loss", emphasis: "right" },
      ],
    },
    narration:
      "Now the roof, in dollars. A [[r]]five-year written lease between the LLC and the operating company, and a new roof: one hundred fifty thousand dollars, with a useful life to the group of fifteen years. [[r]]Under the general rule, the roof amortizes over the shorter period: thirty thousand dollars a year for five years — a fifteen-year asset expensed three times too fast. [[r]]Under the common control rule, it amortizes over the group's fifteen: ten thousand dollars a year, for as long as the lessee keeps controlling the building through a lease. Now suppose at the end of year five the group moves the operating company out. [[r]]One hundred thousand dollars is still on the books — and it leaves as a transfer through equity, not as a loss through earnings. Same roof, same dollars. The difference is whether the accounting tells the story of a lease term, or of a family.",
    reveals: [3, 16, 29, 49],
    estimatedSeconds: 70,
  },

  {
    id: "block-08",
    sheet: "S-08",
    citation: "ASU 2023-01",
    slide: "List",
    figure: {
      kind: "list",
      items: [
        "Lesson 1 — short-term leases: off the balance sheet",
        "Lesson 2 — a risk-free rate, by class",
        "Lesson 3 — one payment, one lease component",
        "Lesson 4 — written terms, and the group's useful life",
      ],
    },
    narration:
      "The course close. Four lessons, four elections: [[r]]short-term leases kept off the balance sheet, a [[r]]risk-free rate instead of an invented borrowing rate, [[r]]service payments folded into the lease instead of allocated out of it, and [[r]]written terms taken at their word between entities under common control. One theme underneath all four. Each time, the Board looked at a precision the standard demanded — a measured rate, an allocated payment, a proven enforceability — and asked what it cost and what it bought. Where it bought little, and it bought least for private companies, the Board let lessees trade the precision for the cost. That is what a practical expedient is. Know the boundary of each election, write down what you have elected, and spend the precision where it still buys something.",
    reveals: [3, 7, 11, 17],
    estimatedSeconds: 61,
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
