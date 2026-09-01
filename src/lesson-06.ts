/**
 * Lesson 06 — "XLOOKUP, Dynamic Arrays, and LET"
 * Course: New Excel Functions for Accountants (XLFN-01)
 *
 * Content is data. No React, no JSX, no timing logic in this file.
 *
 * STATUS: draft. Narration written from working knowledge of Microsoft 365
 * documentation — no sources/ extractions exist yet. Every citation below is
 * UNSOURCED until drafts/XLFN-01-review.md traces it; see that file's
 * judgment list before setting "reviewed".
 *
 * Duration resolution order: audio-meta-06.json first, estimatedSeconds
 * second. `estimatedSeconds` is Math.round(wordCount / 130 * 60). It exists
 * only so a silent render has a length; it is discarded the moment audio
 * exists and must never reach a credit calculation (7.02.7).
 *
 * Reveal markers: [[r]] sits in `narration`, immediately before the WORD it
 * reveals. The number of [[r]] markers in a block MUST equal the length of
 * that block's `reveals` array — verify with `npm run check` and
 * `npm run generate -- --lesson 06 --dry-run` before spending any API credit.
 */

import audioMeta from "./audio-meta-06.json";
import type { PackageLessonMeta } from "./types";
import type { Block } from "./lesson-01";

export type { Block, Figure } from "./lesson-01";

export const meta = {
    lessonId: "06",
    courseCode: "XLFN-01",
    courseTitle: "New Excel Functions for Accountants",
    lessonTitle: "XLOOKUP, Dynamic Arrays, and LET",
    title: "XLOOKUP, Dynamic Arrays, and LET",
    subtitle: "Replacing the legacy lookup workflow",
    eyebrow: "Lesson 01",
    position: "Lesson 1 of 1",
    deliveryMethod: "Self study",
    fieldOfStudy: "Computer Software & Applications",
    revision: "A",
    revisionDate: "2026-09-01",
    status: "draft",

    learningObjectives: [
        {
            id: "lo-1",
            text: "Apply XLOOKUP, dynamic array functions, and LET to replace legacy lookup formulas and helper-column workflows.",
        },
    ],
    nasbaFieldOfStudy: "Computer Software & Applications",
    knowledgeLevel: "Basic",
    prerequisites: "None",
    advancePreparation: "None",
    sources: [
        { citation: "Microsoft 365 — XLOOKUP function documentation", role: "primary" },
        { citation: "Microsoft 365 — Dynamic array formulas and spilled array behavior", role: "primary" },
        { citation: "Microsoft 365 — LET function documentation", role: "primary" },
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
        citation: "Microsoft 365 documentation",
        slide: "Statement",
        figure: {
            kind: "statement",
            lines: ["Fragile lookups", "Helper columns", "Review risk"],
        },
        narration:
            "For twenty years, accountants have built workbooks on the same handful of functions. And those functions have real problems. VLOOKUP counts columns by position, so the moment someone inserts a column, the [[r]]lookup silently returns the wrong data. To work around its limits, we add [[r]]helper columns — extra fields that exist only to make a formula possible, cluttering the file and hiding the logic. And nested IF statements grow until nobody can read them, which means nobody can check them. That's not just inconvenient — it's a [[r]]review risk. A formula a reviewer can't follow is a formula nobody actually verified. Microsoft rebuilt this toolkit. Let's look at what replaced it.",
        speech:
            "For twenty years, accountants have built workbooks on the same handful of functions. And those functions have real problems. Vee lookup counts columns by position, so the moment someone inserts a column, the [[r]]lookup silently returns the wrong data. To work around its limits, we add [[r]]helper columns — extra fields that exist only to make a formula possible, cluttering the file and hiding the logic. And nested IF statements grow until nobody can read them, which means nobody can check them. That's not just inconvenient — it's a [[r]]review risk. A formula a reviewer can't follow is a formula nobody actually verified. Microsoft rebuilt this toolkit. Let's look at what replaced it.",
        reveals: [12, 22, 38],
        estimatedSeconds: 53,
    },

    {
        id: "block-02",
        sheet: "S-02",
        citation: "Microsoft 365 — XLOOKUP",
        slide: "Compare",
        figure: {
            kind: "compare",
            columns: [
                {
                    heading: "VLOOKUP",
                    emphasis: "wrong",
                    rows: [
                        { label: "Match", value: "Approximate by default" },
                        { label: "Direction", value: "Right of the key only" },
                        { label: "Missing value", value: "#N/A — wrap in IFERROR" },
                        { label: "Return column", value: "Counted by hand" },
                    ],
                },
                {
                    heading: "XLOOKUP",
                    emphasis: "right",
                    rows: [
                        { label: "Match", value: "Exact by default" },
                        { label: "Direction", value: "Any column, either side" },
                        { label: "Missing value", value: "if_not_found built in" },
                        { label: "Return column", value: "Named by reference" },
                    ],
                },
            ],
        },
        narration:
            "XLOOKUP replaces VLOOKUP, HLOOKUP, and most INDEX-MATCH pairs, and it fixes four problems at once. First, the [[r]]match. VLOOKUP matches approximately unless you remember to say FALSE — a silent source of wrong numbers. XLOOKUP matches exactly by default. Second, [[r]]direction. VLOOKUP can only return columns to the right of the lookup key; XLOOKUP returns from any column, left or right, so the layout of the data stops dictating the formula. Third, the [[r]]missing value. When VLOOKUP finds nothing, you get an N-A error unless you wrap the whole formula in IFERROR. XLOOKUP has an if-not-found argument built in — you decide what a miss returns. And fourth, the [[r]]return column. VLOOKUP counts columns by position, which is exactly the fragility from the last sheet. XLOOKUP points at the return column by reference, so inserting a column changes nothing.",
        speech:
            "XLOOKUP replaces vee lookup, aitch lookup, and most INDEX-MATCH pairs, and it fixes four problems at once. First, the [[r]]match. Vee lookup matches approximately unless you remember to say FALSE — a silent source of wrong numbers. XLOOKUP matches exactly by default. Second, [[r]]direction. Vee lookup can only return columns to the right of the lookup key; XLOOKUP returns from any column, left or right, so the layout of the data stops dictating the formula. Third, the [[r]]missing value. When vee lookup finds nothing, you get an N-A error unless you wrap the whole formula in IFERROR. XLOOKUP has an if-not-found argument built in — you decide what a miss returns. And fourth, the [[r]]return column. Vee lookup counts columns by position, which is exactly the fragility from the last sheet. XLOOKUP points at the return column by reference, so inserting a column changes nothing.",
        reveals: [8, 22, 36, 52],
        estimatedSeconds: 67,
    },

    {
        id: "block-03",
        sheet: "S-03",
        citation: "Microsoft 365 — dynamic arrays",
        slide: "Facts",
        figure: {
            kind: "facts",
            rows: [
                { label: "Spill", value: "One formula, many results" },
                { label: "FILTER", value: "Every row matching a condition" },
                { label: "UNIQUE", value: "Distinct values, by formula" },
                { label: "SORT", value: "Ordered output, source untouched" },
            ],
        },
        narration:
            "Dynamic arrays change the basic contract of a formula: one formula can now return many results, [[r]]spilling into the cells below and beside it. Three functions do most of the work for accountants. [[r]]FILTER pulls every row that meets a condition — every transaction coded to one account, straight out of the ledger, with no helper column and no copy-paste. [[r]]UNIQUE returns the distinct values in a range — the list of vendors actually used this year, built by formula instead of remove-duplicates. And [[r]]SORT orders the output without touching the source data. Chain them together and you get a small report — filter the ledger, keep the unique vendors, sort the result — that rebuilds itself whenever the data changes. No refresh, no macro, and nothing to forget at month end.",
        reveals: [7, 15, 30, 45],
        estimatedSeconds: 61,
    },

    {
        id: "block-04",
        sheet: "S-04",
        citation: "Microsoft 365 — LET",
        slide: "Calc",
        figure: {
            kind: "calc",
            rows: [
                { label: "Name a step", value: "gross = SUM(D2:D13)" },
                { label: "Name a step", value: "rate = XLOOKUP(state, states, rates)" },
                { label: "Use the names", value: "gross × rate", rule: true },
                { label: "LET(gross, …, rate, …, gross*rate)", value: "one readable formula", emphasis: "right" },
            ],
        },
        narration:
            "The last function is for whoever reviews the workbook. LET lets a formula [[r]]name its own steps. Take a simple tax accrual. First, name the [[r]]gross: the sum of the year's payments. Next, name the [[r]]rate: an XLOOKUP of the state against the rate table. Then the final answer is just [[r]]gross times rate — written in words, inside one cell. Without LET, that same formula is the SUM and the XLOOKUP nested into a single line, repeated wherever each piece is needed, and the reviewer has to decompile it by eye. With LET, the steps read in order, each intermediate value has a name, and nothing is computed twice. A formula you can read is a formula you can review — which is where this lesson started.",
        reveals: [5, 13, 21, 29],
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
 * Blocks with empty narration have no audio by design — the title sheet is
 * the only one.
 */
export const usingEstimates = blocks.some(
    (b) => b.narration.trim().length > 0 && !hasAudio(b)
);

export const totalSeconds = blocks.reduce((sum, b) => sum + durationOf(b), 0);