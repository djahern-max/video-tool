/**
 * Lesson 08 — "A task, start to finish"
 *
 * Content is data. No React, no JSX, no timing logic in this file.
 *
 * The video lesson of course GPT, at position 6, after five study guides.
 * It exists to do what the guides cannot: put one de-identified task on
 * screen from the first prompt to the figure a participant would rely on —
 * the prompt as typed, the response as a table, the participant's own
 * recomputation beside it, the wrong figure and the right one side by side,
 * and the corrected pass arriving. Under 7.02.7 that is the test
 * `meta.avIsAdditionalLearning` claims: the video must add learning the
 * guides do not already give, not merely cover the same topic.
 * drafts/GPT-06-review.md carries the per-block argument for that claim,
 * and it is the content developer's to accept or reject.
 *
 * THE SESSION IS COMPOSED. It was written for this course to show the
 * failure the sources describe (a figure in an ordinary response that is
 * wrong, caught by recomputing, settled by the code tool or an external
 * recompute). It is not a recording of ChatGPT and is not evidence of what
 * the tool does; the narration says so once, early, and the Session pane's
 * header says so on every sheet it appears on. No fact about any
 * accounting standard, tax rule or method choice is stated: "straight-line"
 * is the arithmetic the prompt asks for, spelled out in the prompt, and
 * nothing more.
 *
 * EVERY FIGURE SHOWN AS CORRECT IS COMPUTED HERE, in `schedule` and its
 * helpers, from the three assets' inputs; none is typed. The one figure
 * shown as wrong — `WRONG` — is typed, because it is the composed error,
 * and it is labelled wrong on screen and in narration everywhere it
 * appears.
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
 *
 * Each block's comment lists the drafts/GPT-source-index.md entries its
 * narration rests on, by file and entry number under the entry-25 numbering
 * (4 = the CPA.com toolkit, 9 = "Does ChatGPT tell the truth?", 13 =
 * "Prompt engineering best practices").
 */

import audioMeta from "./audio-meta-08.json";
import { audioHashOf } from "./audio-identity";
import type { Block, BlockMeta, Table } from "./blocks";
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
  subtitle: "One composed session: prompt, output, check, correction",
  eyebrow: "Lesson 08",
  // Display only. The manifest's position is read from COURSE_GPT.lessons
  // by export.ts; this is the string the title sheet renders.
  position: `Lesson 6 of ${COURSE_GPT.lessons.length}`,
  deliveryMethod: COURSE_GPT.deliveryMethod,
  fieldOfStudy: "Computer Software & Applications",
  revision: "1",
  revisionDate: "2026-09-14",
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
  // numbers behind each block are in drafts/GPT-06-review.md.
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
  // Text a participant must read (7.02.5). 0 for an all-video lesson, and
  // it stays 0: this lesson ships video.mp4 and transcript.md, and the
  // transcript is the record of what was said, not reading matter.
  wordCount: 0,
  // True unless the audio merely reads the slides (7.02.7). The sheets here
  // carry the work — the prompt as sent, the response as a table, the
  // arithmetic line by line, the two figures side by side — and the
  // narration says what to do with it and why; neither reads the other.
  // The stronger 7.02.7 test, because course GPT also holds text lessons,
  // is whether this video adds learning guide/03/ to guide/07/ do not
  // already give. The per-block case is in drafts/GPT-06-review.md under
  // "What this block adds beyond the guides", and it is the content
  // developer's to accept.
  avIsAdditionalLearning: true,
} satisfies PackageLessonMeta;

/* ------------------------------------------------------------------ */
/* The task's figures                                                  */
/* ------------------------------------------------------------------ */

/**
 * Three fictional assets with generic names and round, de-identified inputs
 * (index 4#10, 4#13). Nothing here resembles a client's figures.
 */
type Asset = { name: string; cost: number; salvage: number; life: number };

const ASSETS: Asset[] = [
  { name: "Vehicle A", cost: 32000, salvage: 2000, life: 5 },
  { name: "Equipment B", cost: 45000, salvage: 5000, life: 8 },
  { name: "Furniture C", cost: 9600, salvage: 600, life: 6 },
];

const YEARS = ["Year 1", "Year 2", "Year 3"];

/** The arithmetic the prompt asks for, and nothing else. */
const annualOf = (a: Asset) => (a.cost - a.salvage) / a.life;

/** "45,000" — a locale-free formatter, so a render and a check agree. */
const money = (n: number) =>
  Math.round(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

/** The correct schedule: every cell computed. */
const schedule: Table = {
  columns: YEARS,
  rows: ASSETS.map((a) => ({
    label: a.name,
    cells: YEARS.map(() => money(annualOf(a))),
  })),
};

/**
 * The composed error: the one figure in the first response that is wrong.
 * Typed, because it is the illustration; labelled wrong wherever it shows.
 * Row 1 is Equipment B, column 2 is Year 3.
 */
const WRONG = { row: 1, col: 2, figure: 5500 };

const withWrongCell = (t: Table): Table => ({
  columns: t.columns,
  rows: t.rows.map((r, ri) => ({
    label: r.label,
    cells: r.cells.map((c, ci) => (ri === WRONG.row && ci === WRONG.col ? money(WRONG.figure) : c)),
  })),
});

/** The first response, as the composed session shows it. */
const firstResponse = withWrongCell(schedule);

const B = ASSETS[WRONG.row];
const inputsLine = ASSETS.map(
  (a) => `${a.name}: cost ${money(a.cost)}, salvage ${money(a.salvage)}, life ${a.life} years.`
).join(" ");

/* ------------------------------------------------------------------ */
/* Blocks                                                              */
/* ------------------------------------------------------------------ */

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

  // Index: connective throughout; the composed-session statement is the
  // lesson's own and is flagged `illustration` in the record.
  {
    id: "block-01",
    sheet: "S-01",
    citation: "Composed session, written for this course",
    slide: "Statement",
    figure: {
      kind: "statement",
      lines: [
        "One task, from the first prompt to the figure you would rely on",
        "A session composed for this course — not a recording of one",
        "Three assets, three years, the arithmetic exactly as asked",
      ],
    },
    narration:
      "[[r]]This lesson runs one task from the first prompt to the figure you " +
      "would rely on. [[r]]The session is composed: written for this course to " +
      "show the failure the earlier lessons describe, not a recording of " +
      "ChatGPT, and no evidence of what the tool does on any given day. " +
      "[[r]]The task is a straight-line depreciation schedule for three assets " +
      "over three years, using the arithmetic the prompt spells out and nothing " +
      "else.",
    reveals: [0.5, 7.5, 22.5],
    estimatedSeconds: 33,
  },

  // Index: 4#10 (identifiable information removed before any upload),
  // 4#13 (de-identify before ingesting into internal and public tools).
  {
    id: "block-02",
    sheet: "S-02",
    citation: "CPA.com Generative AI Toolkit, pp. 10, 18",
    slide: "Facts",
    figure: {
      kind: "facts",
      rows: ASSETS.map((a) => ({
        label: a.name,
        value: `Cost ${money(a.cost)} · salvage value ${money(a.salvage)} · useful life ${a.life} years`,
      })),
    },
    narration:
      "[[r]]Here are the inputs: three assets with generic names, and for each " +
      "a cost, a salvage value and a useful life. [[r]]Nothing here identifies " +
      "a client. The CPA.com toolkit's sample use cases require all " +
      "identifiable information to be removed before any data is uploaded, and " +
      "its advice is to de-identify personal information before it goes into " +
      "any AI tool, internal or public. [[r]]Generic names and round figures " +
      "are what that looks like on a task this size.",
    reveals: [0.5, 9.5, 28.5],
    estimatedSeconds: 36,
  },

  // Index: 13#3 (clear, specific, enough context), 4#8 (only as good as
  // the prompt that drives it), 13#1 (what a prompt is).
  {
    id: "block-03",
    sheet: "S-03",
    citation: "OpenAI, Prompt engineering best practices, p. 2; CPA.com toolkit, p. 16",
    slide: "Session",
    figure: {
      kind: "session",
      turns: [
        {
          role: "user",
          text:
            "Prepare a straight-line depreciation schedule for the three assets below. " +
            "Annual charge = (cost − salvage value) ÷ useful life in years, the same amount each year.",
        },
        { role: "user", text: inputsLine },
        {
          role: "user",
          text: "Show years 1 to 3 in a table, one row per asset, whole dollars, no commentary.",
        },
      ],
    },
    narration:
      "[[r]]The prompt first. OpenAI's practice is that a prompt should be " +
      "clear, specific, and carry enough context for the model to understand " +
      "what is being asked; the toolkit puts it more bluntly: generative AI is " +
      "only as good as the prompt that drives it. So the request states the " +
      "arithmetic in one line rather than assuming it. [[r]]It gives the inputs " +
      "in full. [[r]]And it says what the output should look like, so what " +
      "comes back can be read against what was asked.",
    reveals: [0.5, 26.5, 29],
    estimatedSeconds: 38,
  },

  // Index: 4#9 (examples help get a better output), 13#3 (enough context).
  {
    id: "block-04",
    sheet: "S-04",
    citation: "CPA.com toolkit, p. 16; OpenAI, Prompt engineering best practices, p. 2",
    slide: "Session",
    figure: {
      kind: "session",
      prior: [
        {
          role: "user",
          text:
            "Prepare a straight-line depreciation schedule for the three assets below. " +
            "Annual charge = (cost − salvage value) ÷ useful life in years, the same amount each year. " +
            "[inputs as above] Show years 1 to 3 in a table, one row per asset, whole dollars, no commentary.",
        },
      ],
      turns: [
        { role: "user", text: "Example row, for format only: Asset X | 1,000 | 1,000 | 1,000" },
        {
          role: "user",
          text:
            "Context: the figures are illustrative and de-identified. The schedule goes into a " +
            "working paper after it has been reviewed.",
        },
      ],
    },
    narration:
      "[[r]]Two more lines, each with a job. The toolkit says that giving the " +
      "model examples helps get a better output, so the prompt shows one row in " +
      "the shape it wants, with figures that belong to no asset. [[r]]Then the " +
      "context, in one sentence: what the figures are and what the schedule is " +
      "for. That is the enough-context part of the page's practice, stated " +
      "rather than assumed.",
    reveals: [0.5, 17.5],
    estimatedSeconds: 31,
  },

  // Index: 9#2 (may sound confident even when wrong), 9#6 (confidence is
  // not reliability). The table is composed; its wrong figure is not marked
  // here because nothing has been checked yet.
  {
    id: "block-05",
    sheet: "S-05",
    citation: "OpenAI, Does ChatGPT tell the truth?, pp. 1–2",
    slide: "Session",
    figure: {
      kind: "session",
      prior: [
        {
          role: "user",
          text:
            "Prepare a straight-line depreciation schedule … the same amount each year. " +
            "[inputs] Show years 1 to 3 in a table … Example row … Context: the figures are " +
            "illustrative and de-identified.",
        },
      ],
      turns: [
        { role: "assistant", table: firstResponse },
        { role: "assistant", text: "Totals and closing book values can be added if useful." },
      ],
    },
    narration:
      "[[r]]The response comes back in the shape the prompt asked for: three " +
      "rows, three years, whole dollars. The columns line up, the figures are " +
      "the right size, nothing invites a second look. [[r]]OpenAI's page says " +
      "the model may sound confident even when it is wrong, and that confidence " +
      "is not reliability. A tidy table is confidence in another form. Nothing " +
      "on this sheet says whether any figure in it is right.",
    reveals: [0.5, 15],
    estimatedSeconds: 33,
  },

  // Index: 9#8 (first draft, not a final source), 9#9 (always verify
  // quotes, data, technical information, references). The right-hand
  // column is guide/06 sec-02's account of how each is checked.
  {
    id: "block-06",
    sheet: "S-06",
    citation: "OpenAI, Does ChatGPT tell the truth?, p. 3",
    slide: "Facts",
    figure: {
      kind: "facts",
      rows: [
        { label: "Quotes", value: "Found in the document they are attributed to" },
        { label: "Data — this schedule", value: "Recomputed, or found in the record it is said to come from" },
        { label: "Technical information", value: "Checked against the document that sets it" },
        { label: "References to documents", value: "The document is found" },
      ],
    },
    narration:
      "[[r]]Before any of these figures goes anywhere, the page's rule applies: " +
      "use ChatGPT as a first draft, not a final source, and always verify " +
      "quotes, [[r]]data, [[r]]technical information, [[r]]and references to " +
      "external documents. A depreciation schedule is data, all of it. A figure " +
      "is checked by recomputing it, or by finding it in the record it is said " +
      "to come from. There is no record here; every figure came from the " +
      "prompt's own inputs. So the check is arithmetic.",
    reveals: [0.5, 11.5, 12, 13],
    estimatedSeconds: 36,
  },

  // Index: 9#9 (data is always verified); guide/06 sec-02's "recomputing
  // it" is the practice shown. Every figure on the right is computed from
  // the inputs; the last line's figure is the composed error, marked wrong.
  {
    id: "block-07",
    sheet: "S-07",
    citation: "OpenAI, Does ChatGPT tell the truth?, p. 3",
    slide: "Check",
    figure: {
      kind: "check",
      heading: `${B.name}, by hand`,
      table: firstResponse,
      rows: [
        { label: "Asset", value: B.name },
        { label: "Cost", value: money(B.cost) },
        { label: "Salvage value", value: money(B.salvage) },
        { label: "Cost less salvage", value: money(B.cost - B.salvage) },
        { label: "Useful life", value: `${B.life} years` },
        { label: "Annual charge", value: money(annualOf(B)) },
        { label: `${YEARS[WRONG.col]}, the same amount, as asked`, value: money(annualOf(B)), emphasis: "right" },
        {
          label: `The table's ${YEARS[WRONG.col]} figure — wrong`,
          value: money(WRONG.figure),
          emphasis: "wrong",
          against: { row: WRONG.row, col: WRONG.col },
        },
      ],
    },
    narration:
      "[[r]]Pick one asset and recompute it yourself, from the inputs, without " +
      "looking at the table. Equipment B. [[r]]Its cost. [[r]]Its salvage " +
      "value. [[r]]The difference is what gets depreciated. [[r]]Spread over " +
      "the life the prompt stated. [[r]]That is the annual charge, [[r]]and " +
      "year three is the same figure, as the prompt asked. [[r]]Now the table. " +
      "The year-three figure the response gave for Equipment B is not that " +
      "figure. It is wrong.",
    reveals: [0.5, 8, 9, 10, 13, 16, 18.5, 23.5],
    estimatedSeconds: 32,
  },

  // Index: 4#3 (generated output, not computed answers — attributed in the
  // toolkit to Jeff Seibert, CEO of Digits), 9#1 (patterns in training
  // data; can be incorrect or misleading). Nothing about how often or why.
  {
    id: "block-08",
    sheet: "S-08",
    citation: "CPA.com toolkit, p. 15 (quoting Jeff Seibert); OpenAI, Does ChatGPT tell the truth?, p. 1",
    slide: "Calc",
    figure: {
      kind: "calc",
      rows: [
        { label: `First response — ${B.name}, ${YEARS[WRONG.col]} — wrong`, value: money(WRONG.figure), emphasis: "wrong" },
        { label: "Recomputed from the inputs — right", value: money(annualOf(B)), emphasis: "right" },
        { label: "Overstated by", value: money(WRONG.figure - annualOf(B)), rule: true },
      ],
    },
    narration:
      "[[r]]Lesson one gave the one-sentence reason this can happen. An " +
      "executive quoted in the CPA.com toolkit put it this way: today's large " +
      "language models produce generated output, not computed answers. " +
      "[[r]]OpenAI's own page says a response is based on patterns in the data " +
      "the model was trained on, and can be incorrect or misleading. [[r]]That " +
      "is the whole explanation this course offers. No source says how often a " +
      "figure comes out wrong, or why this one would; only that the ordinary " +
      "response is not a calculation.",
    reveals: [0.5, 14, 25],
    estimatedSeconds: 40,
  },

  // Index: 13#4 (start with a prompt, review the response, refine the
  // prompt based on the output), 9#12 (accurate calculation is tied to the
  // code tool). The depiction of the tool running is composed; no source
  // says how a plan exposes it or how to tell it ran (file 9 "Does not
  // cover"; guide/03 sec-05).
  {
    id: "block-09",
    sheet: "S-09",
    citation: "OpenAI, Prompt engineering best practices, p. 2; Does ChatGPT tell the truth?, p. 2",
    slide: "Session",
    figure: {
      kind: "session",
      prior: [
        { role: "assistant", table: firstResponse, mark: { row: WRONG.row, col: WRONG.col, role: "wrong" } },
      ],
      turns: [
        {
          role: "user",
          text:
            `${YEARS[WRONG.col]} for ${B.name} does not equal (cost − salvage) ÷ life. ` +
            "Redo the schedule with the arithmetic run in the data analysis tool, and show the calculation.",
        },
        {
          role: "assistant",
          text:
            "annual = (cost − salvage) / life, each of years 1–3\n" +
            ASSETS.map((a) => `${a.name}: (${money(a.cost)} − ${money(a.salvage)}) / ${a.life} = ${money(annualOf(a))}`).join("\n"),
        },
      ],
    },
    narration:
      "[[r]]The page's second practice is iteration: start with an initial " +
      "prompt, review the response, and refine the prompt based on the output. " +
      "OpenAI ties accurate calculation to a tool its page names, not to the " +
      "ordinary response, so the second prompt says what was found and asks for " +
      "the arithmetic to be run there and shown. [[r]]How a plan exposes that " +
      "tool, or how to tell it ran, no source here says; that is why the check " +
      "you just made is what settles the figure.",
    reveals: [0.5, 26],
    estimatedSeconds: 39,
  },

  // Index: 9#12 (the code tool enables accurate calculations), 9#9 (data
  // is always verified); guide/03 sec-05's rule (the tool computed it, or
  // it is recomputed elsewhere) restated as lesson one's.
  {
    id: "block-10",
    sheet: "S-10",
    citation: "OpenAI, Does ChatGPT tell the truth?, pp. 2–3",
    slide: "Sweep",
    figure: {
      kind: "sweep",
      heading: "Second pass, as received",
      table: schedule,
      settle: { row: WRONG.row, col: WRONG.col },
      lines: [
        { label: `Recomputed by hand — ${B.name}, ${YEARS[WRONG.col]}`, value: money(annualOf(B)), emphasis: "right" },
        { label: "Second pass, arithmetic run in the tool", value: money(annualOf(B)), emphasis: "right" },
        { label: "First response", value: money(WRONG.figure), emphasis: "wrong" },
      ],
    },
    narration:
      "[[r]]The second pass comes back, and this time the figure in that cell " +
      "[[r]]matches the one you computed. [[r]]Lesson one's rule, restated: a " +
      "number from a conversation in which the tool did not run is generated " +
      "text about a number; if the number matters, either the tool computed it " +
      "or it is recomputed somewhere else before it is relied on. [[r]]Here " +
      "both happened, and they agree. That agreement, not the second table on " +
      "its own, is what makes this figure one you can rely on.",
    reveals: [0.5, 6, 8.5, 27.5],
    estimatedSeconds: 39,
  },

  // Index: 4#4 (a human reviews content used in a decision or shared with a
  // client), 4#5 (monitoring answers is the professional's responsibility),
  // 4#6 (documentation of the review process is discussed with counsel).
  // Nothing about what the record contains.
  {
    id: "block-11",
    sheet: "S-11",
    citation: "CPA.com toolkit, pp. 9, 19",
    slide: "List",
    figure: {
      kind: "list",
      items: [
        "The prompt, as sent — including the example row and the context",
        "The first response, with the wrong figure marked",
        "The recomputation by hand, for one asset",
        "The second pass, with the arithmetic shown",
      ],
    },
    narration:
      "[[r]]What this session leaves behind is on the sheet: the prompt, both " +
      "responses, and the check. [[r]]The toolkit says a human should review " +
      "and ensure the accuracy of any content used in decision-making or shared " +
      "with clients, that monitoring the answers is the accounting " +
      "professional's responsibility, and that a firm should discuss with " +
      "general counsel the necessary documentation of its review process. " +
      "[[r]]What that record contains is the firm's decision, with counsel. " +
      "This lesson says nothing about what it must hold.",
    reveals: [0.5, 7.5, 28.5],
    estimatedSeconds: 37,
  },

  // Index: 9#8 (first draft, not a final source), 9#7 (approach critically;
  // verify important information from reliable sources).
  {
    id: "block-12",
    sheet: "S-12",
    citation: "OpenAI, Does ChatGPT tell the truth?, pp. 2–3",
    slide: "Statement",
    figure: {
      kind: "statement",
      lines: [
        "A response is a first draft, not a final source",
        "A figure is relied on when it was computed or recomputed — not when it looks right",
        "Verify before relying. That is the whole course.",
      ],
    },
    narration:
      "[[r]]The rule this course has been building to fits in one sentence, and " +
      "it is the vendor's: use ChatGPT as a first draft, not a final source, " +
      "and verify important information from reliable sources before relying on " +
      "it. [[r]]Everything in this session was that sentence applied: a prompt " +
      "written so the task was clear, a response read as a draft, a figure " +
      "recomputed, a correction asked for, a record kept. [[r]]The tool did " +
      "what its vendor says it does. The check made the schedule yours.",
    reveals: [0.5, 17.5, 32.5],
    estimatedSeconds: 39,
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
