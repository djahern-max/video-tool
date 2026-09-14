# GPT-06 — A task, start to finish — accuracy record

This is where the content developer records checking the drafted
narration for accuracy (4.01.1), **before any narration audio is
generated**. Once a block is voiced, changing one sentence costs an
ElevenLabs regeneration and produces a different take — so every correction
is nearly free now and expensive later.

How to read it: for each block, the narration as drafted (reveal markers
`[[r]]` left in place), the sources relied on with the specific paragraph,
and what each reveal marker reveals. Then the same for each question. The
lesson data lives in `src/lesson-NN.ts` and `src/questions-NN.json`; edit
those files, not this one.

**Status, first draft (2026-09-13).** Unchecked and unvoiced.
`meta.status` is `"draft"`; export refuses it. The 4.02 independent content
review happens in superCPE, against the ingested package — not in this file.

**Drafted 2026-09-14 (changelog entry 33).** Twelve narrated blocks, 941
words, rendered silent on estimated timings; five questions. Every flag
and judgment item below carries a recommended ruling under the CLAUDE.md
Rulings rule; the judgment list is closed on those defaults, and the
content developer's 4.01.1 read of the script is still ahead. **Still
unchecked, still unvoiced.** No narration has been purchased; the
developer reads this script first.

Learning objectives (from `src/lesson-08.ts`):

Index references are to `drafts/GPT-source-index.md` as it stands in the
tree (regenerated over the final source set, changelog entry 25), by
file number and entry number as that index numbers them. The feature
spec that set these objectives was written against the previous
generation, which numbered files 6–11 differently; the references
below are translated to the current numbering. Files cited here:
4 = `cpacom-genai-toolkit.pdf`, 9 = `openai-does-chatgpt-tell-the-truth-2026-09-13.pdf`, 13 = `openai-prompt-engineering-best-practices-2026-09-13.pdf`.

- **lo-1** — Carry a de-identified accounting task through prompt, output, verification, and refinement, and identify where the model's output required correction. [index 13#4; 9#7–12; 4#10,13]


---

## The task, and the session

**One translation of the spec's references.** The feature spec cites
"10#7–9, GPT-04's rule" for the verification step and "10#7" for the
close. Under the current index numbering file 10 is the enterprise
privacy page, whose entries 7–9 are encryption, the Data Processing
Addendum and content classifiers; they cannot be what "GPT-04's rule"
means. GPT-04's lo-1 is indexed 9#7–9 (approach critically and verify;
first draft, not a final source; always verify quotes, data, technical
information, references), and this record reads the spec's "10#7–9" and
"10#7" as 9#7–9 and 9#7, the way the scaffold's own note says the spec's
file numbers are translated. Every other reference in the spec (9#1,
9#12, 4#3, 4#10, 4#13, 13#4, 4#4–6) is already in the current numbering.

**The task.** A straight-line depreciation schedule for three fictional
assets — Vehicle A (cost 32,000, salvage 2,000, life 5), Equipment B
(45,000, 5,000, 8), Furniture C (9,600, 600, 6) — three years shown. The
prompt spells out the arithmetic ("annual charge = (cost − salvage value)
÷ useful life in years, the same amount each year"), so that "straight
line" is the arithmetic the participant asked for and the course states
no fact about any accounting standard, tax rule or method choice. No
ASC, no IRS, no "GAAP requires" appears in narration, on any sheet, or
in any question.

**Every figure shown as correct is computed** in `src/lesson-08.ts`:
`annualOf` is `(cost − salvage) / life`, `schedule` maps it over the
assets and years, and the Check sheet's lines, the Calc sheet's
"recomputed" and "overstated by" rows, the Sweep sheet's lines and the
second pass's shown calculation are all built from those values. The one
figure shown as wrong — Equipment B, Year 3, **5,500** in the first
response — is the constant `WRONG`, typed because it is the composed
error, and it is labelled `wrong` on S-07 (cell highlight and line 08),
S-08 (row label), S-09 (the prior table's cell) and S-10 (the third
line), and in narration on S-07 ("It is wrong") and S-08 ("wrong").

**The session is composed.** It was written for this course to show the
failure the sources describe — a figure in an ordinary response that is
wrong (9#1, 4#3 attributed), caught by recomputing (9#9), settled by the
code tool or an outside recompute (9#12). It is not a recording of
ChatGPT and is not evidence of what the tool does. The narration says so
once, early (S-01 sentence 2); the Session pane's header says it on every
Session sheet (S-03, S-04, S-05, S-09), because a still of any one sheet
must not read as a screenshot. Nothing in the lesson says how often a
figure comes out wrong or why this one did; S-08 sentence 5 says that no
source says.

**De-identified inputs** (4#10, 4#13): generic asset names, round
figures, no client, no firm. S-02's narration says why.

## Rules applied

**The three-way sentence rule** (feature 27's, applied to narration as
the spec directs): every narrated sentence is *sourced* (states, in the
course's words, a claim the index carries as a numbered entry for one of
this lesson's files), *attributed* (reports what a named source says,
where the claim is the source's rather than the course's), or
*connective* (transitions, sentences that introduce or apply sourced
ones, statements about what this lesson does or does not say, and the
walk-through of the composed session itself). Anything else is
`UNSOURCED`, quoted below, and left in the draft. Sentence numbers are in
reading order within the block, markers stripped, split at
sentence-ending punctuation followed by a capital; the numbering is a
convenience for this record and is not in the script.

**The no-method-voice rule** (feature 28's): the narration teaches and
does not describe its own sourcing restraint or count its sources. The
boundary statements it does make (S-08 s5, S-09 s3, S-11 s4) exist so a
participant does not assume a fact the sources do not give, and are
listed under J5.

**Screen text.** The sentence rule is applied to narration. Text on the
sheets is either the composed session (prompt, tables, the shown
calculation), computed figures, or short labels; the one sheet that
carries prose claims of its own is S-06, whose right-hand column repeats
guide/06 sec-02's account of how each of the four verified items is
checked, and it is flagged below because one of those four sentences
carries a flag in GPT-04's record.

**Tally, whole script:** 56 sentences — 11 sourced, 1 attributed, 42
connective, 2 flagged `UNSOURCED`. Three further flags are not sentences:
the composed session itself, the depiction of the tool running on S-09,
and S-06's right-hand column. **Five flags in all**, under the ten that
would have stopped the draft; every recommended ruling is keep. The one
attributed sentence is the toolkit's quoted executive (4#3), as in GPT-01
and GPT-04.

**Additional learning (7.02.7).** `meta.avIsAdditionalLearning` is `true`.
Course GPT holds five text lessons, so the test is the stronger one: the
video must add learning the guides do not already give, not merely cover
the same topic. Each block below carries a line "What this block adds
beyond the guides" saying what is on the sheet that the narration does
not say and the guides do not carry. The general case: guide/05 teaches
how a prompt is written and guide/06 teaches that a figure is verified by
recomputing it; neither shows a prompt being typed, a response as a
table, an arithmetic check beside it, a wrong figure marked, or a
corrected pass arriving. Those are what the sheets carry. The narration
explains what to do with what is on screen and why; it does not read the
tables, the prompt or the arithmetic aloud. The claim is the content
developer's to accept.

**Word count and rate.** 941 narrated words. The rate used to size the
script is measured, not assumed: ATO-02's thirteen voiced blocks total
1,464 transcript words over 534.894 s of `audio-meta-02.json` duration,
which is **164.2 words per minute** (166.7 excluding the 0.6 s tail
`generate` adds per block). At that rate 941 words is about 5.7 minutes,
inside the spec's 5–6. The silent render is longer — 441 s, 7 m 21 s —
because `estimatedSeconds` is derived at the 130 wpm constant
`check-lessons.ts` uses, and that is the figure the sheet-window warnings
are computed from; every one of them clears at the measured rate or
does not, and either way the warnings are about the silent preview
(J9).

## Blocks

Thirteen blocks: one Title sheet, which carries no narration by design,
and twelve narrated. The title block is not counted in `after_block`
numbering — `scripts/export.ts` builds `video.blocks` from the narrated
blocks only — so block 1 below is `after_block: 1`.

Each block gives the narration as drafted with `[[r]]` in place, what each
marker brings up, the index entries with their locators, the sentence
classification, the flags, and the line on what the sheet adds beyond the
guides.

---

### Block 1 — `block-01` — S-01 — Statement — 72 words, est. 33s

**Narration as drafted** (markers in place):

> [[r]]This lesson runs one task from the first prompt to the figure you
> would rely on. [[r]]The session is composed: written for this course to
> show the failure the earlier lessons describe, not a recording of
> ChatGPT, and no evidence of what the tool does on any given day.
> [[r]]The task is a straight-line depreciation schedule for three assets
> over three years, using the arithmetic the prompt spells out and
> nothing else.

**Reveals** — 3 markers, 3 entries in `reveals`, 3 figure elements:

1. `0.5s` — "This lesson runs one task…" — the first line: one task, first prompt to the figure relied on
2. `7.5s` — "The session is composed…" — the second line: composed for this course, not a recording
3. `22.5s` — "The task is…" — the third line: three assets, three years, the arithmetic as asked

**Index entries used** — none; the block is the lesson's own framing.

**Classification:** 0 sourced · 0 attributed · 3 connective (1, 2, 3) · 0
flagged. Sentence 2 is the composed-session disclosure the spec
requires, once and early (J1). Sentence 3 describes the task without
stating any fact about a method (J2).

**Flags** — none in the narration. The composed session as a whole is
flag F1, below.

**What this block adds beyond the guides.** The three lines are a
contents page for the sheets that follow; the guides have no worked
task. On its own this block is framing, and it is the one sheet in the
lesson closest to mirroring its narration (J6).

### Block 2 — `block-02` — S-02 — Facts — 77 words, est. 36s

**Narration as drafted:**

> [[r]]Here are the inputs: three assets with generic names, and for each
> a cost, a salvage value and a useful life. [[r]]Nothing here identifies
> a client. The CPA.com toolkit's sample use cases require all
> identifiable information to be removed before any data is uploaded, and
> its advice is to de-identify personal information before it goes into
> any AI tool, internal or public. [[r]]Generic names and round figures
> are what that looks like on a task this size.

**Reveals** — 3 markers, 3 entries, 3 rows:

1. `0.5s` — "Here are the inputs…" — Vehicle A's row
2. `9.5s` — "Nothing here identifies…" — Equipment B's row
3. `28.5s` — "Generic names and round figures…" — Furniture C's row

**Index entries used, in order**
1. 4#10 — examples that reference uploading data require all
   identifiable information to be removed prior to use (sentence 3)
2. 4#13 — de-identify (sanitize) personal information before ingesting
   it into both internal AI systems and public tools (sentence 3)

**Classification:** 1 sourced (3) · 0 attributed · 3 connective (1, 2, 4)
· 0 flagged. Sentence 4 applies the two entries to the inputs on the
sheet (J4).

**Flags** — none.

**What this block adds beyond the guides.** The inputs themselves — three
assets, nine figures — which the narration names by kind and not by
value, and which every later sheet's arithmetic is computed from.
Guide/07 sec-05 teaches de-identification as a rule; this sheet shows
what a de-identified input set is.

### Block 3 — `block-03` — S-03 — Session — 83 words, est. 38s

**Narration as drafted:**

> [[r]]The prompt first. OpenAI's practice is that a prompt should be
> clear, specific, and carry enough context for the model to understand
> what is being asked; the toolkit puts it more bluntly: generative AI is
> only as good as the prompt that drives it. So the request states the
> arithmetic in one line rather than assuming it. [[r]]It gives the inputs
> in full. [[r]]And it says what the output should look like, so what
> comes back can be read against what was asked.

**Reveals** — 3 markers, 3 entries, 3 turns (each types in from its
marker):

1. `0.5s` — "The prompt first…" — the task line with the arithmetic spelled out
2. `26.5s` — "It gives the inputs…" — the inputs line (built from `ASSETS` in the module)
3. `29s` — "And it says what the output…" — the format line

**Index entries used, in order**
1. 13#3 — clear, specific, enough context for the model to understand
   what you are asking (sentence 2)
2. 4#8 — generative AI is only as good as the prompt that drives it
   (sentence 2)

**Classification:** 1 sourced (2) · 0 attributed · 4 connective (1, 3, 4,
5) · 0 flagged. Sentences 3–5 say what each typed paragraph does; the
paragraphs are on screen.

**Flags** — none in the narration. The prompt text is part of F1.

**What this block adds beyond the guides.** The prompt itself, verbatim,
appearing as typed: guide/05 sec-02 teaches clear, specific and in
context as three parts of one sentence of advice and gives fragments as
examples; this sheet shows a whole prompt for a whole task, with the
arithmetic, the inputs and the format each in its own paragraph. The
narration does not read it.

### Block 4 — `block-04` — S-04 — Session — 67 words, est. 31s

**Narration as drafted:**

> [[r]]Two more lines, each with a job. The toolkit says that giving the
> model examples helps get a better output, so the prompt shows one row
> in the shape it wants, with figures that belong to no asset. [[r]]Then
> the context, in one sentence: what the figures are and what the
> schedule is for. That is the enough-context part of the page's
> practice, stated rather than assumed.

**Reveals** — 2 markers, 2 entries, 2 turns (the first prompt is on
screen from frame 0 as a `prior` turn, compact, with "[inputs as above]"
standing in for the inputs paragraph):

1. `0.5s` — "Two more lines…" — the example row, "for format only: Asset X | 1,000 | 1,000 | 1,000"
2. `17.5s` — "Then the context…" — the context line: illustrative and de-identified; goes into a working paper after review

**Index entries used, in order**
1. 4#9 — providing the model with examples helps get a better output
   (sentence 2)
2. 13#3 — enough context (sentence 4)

**Classification:** 2 sourced (2, 4) · 0 attributed · 2 connective (1, 3)
· 0 flagged.

**Flags** — none in the narration.

**What this block adds beyond the guides.** The example row and the
context sentence as typed. Guide/05 sec-03 says examples help and does
not show one for a figures task; the row on screen has figures that
belong to no asset, which is what "for format only" means in practice.

### Block 5 — `block-05` — S-05 — Session — 71 words, est. 33s

**Narration as drafted:**

> [[r]]The response comes back in the shape the prompt asked for: three
> rows, three years, whole dollars. The columns line up, the figures are
> the right size, nothing invites a second look. [[r]]OpenAI's page says
> the model may sound confident even when it is wrong, and that
> confidence is not reliability. A tidy table is confidence in another
> form. Nothing on this sheet says whether any figure in it is right.

**Reveals** — 2 markers, 2 entries, 2 turns (the prompt, compacted to one
paragraph with ellipses, is a `prior` turn):

1. `0.5s` — "The response comes back…" — the first response's table (`firstResponse`: the computed schedule with `WRONG` in Equipment B, Year 3; nothing marked)
2. `15s` — "OpenAI's page says…" — the response's closing line, "Totals and closing book values can be added if useful."

**Index entries used, in order**
1. 9#2 — it might sound confident even when it's wrong (sentence 3)
2. 9#6 — confidence isn't reliability (sentence 3)

**Classification:** 1 sourced (3) · 0 attributed · 3 connective (1, 2, 5)
· 1 flagged (4).

**Flags**
- `UNSOURCED` (interpretive) — "A tidy table is confidence in another
  form." The page's two entries are about how a response sounds; this
  sentence extends them to how a table looks. No source says it. It
  states no fact about the tool; it tells the participant not to read a
  table's neatness as evidence, which is the page's point applied to the
  sheet in front of them. Recommended ruling: keep — it is the sentence
  that makes 9#6 bite on a table rather than on prose; cut it if the
  developer reads it as a claim about the tool rather than about the
  participant's reading.
- The table itself is F1 (composed). The wrong figure is on screen and
  is deliberately not marked: nothing has been checked yet.

**What this block adds beyond the guides.** The response as a table,
with the wrong figure sitting unmarked among eight right ones. Guide/03
and guide/06 say a response can be wrong and may not sound it; this
sheet lets the participant look at one that is and see that nothing on
it shows which figure. That experience is the sheet's, not the
narration's.

### Block 6 — `block-06` — S-06 — Facts — 79 words, est. 36s

**Narration as drafted:**

> [[r]]Before any of these figures goes anywhere, the page's rule applies:
> use ChatGPT as a first draft, not a final source, and always verify
> quotes, [[r]]data, [[r]]technical information, [[r]]and references to
> external documents. A depreciation schedule is data, all of it. A figure
> is checked by recomputing it, or by finding it in the record it is said
> to come from. There is no record here; every figure came from the
> prompt's own inputs. So the check is arithmetic.

**Reveals** — 4 markers, 4 entries, 4 rows:

1. `0.5s` — "Before any of these figures…" — Quotes: found in the document they are attributed to
2. `11.5s` — "data" — Data — this schedule: recomputed, or found in the record it is said to come from
3. `12s` — "technical information" — Technical information: checked against the document that sets it
4. `13s` — "and references…" — References to documents: the document is found

**Index entries used, in order**
1. 9#8 — use ChatGPT as a first draft, not a final source (sentence 1)
2. 9#9 — always verify quotes, data, technical information or references
   to external documents (sentence 1)

**Classification:** 1 sourced (1) · 0 attributed · 4 connective (2, 3, 4,
5) · 0 flagged in the narration. Sentence 2 applies 9#9's "data" to the
task. Sentence 3 is guide/06 sec-02's gloss of how a figure is checked
(classed connective there, J4 of GPT-04's record). Sentences 4–5 are
about the composed task.

**Flags**
- `UNSOURCED` (screen text, boundary) — the right-hand column of the
  sheet. Its four lines repeat guide/06 sec-02's account of how each
  item is checked: quotes found in the document they are attributed to
  and references by finding the document (GPT-04 J4, connective), data
  by recomputing or by the record (the same), and technical information
  "checked against the document that sets it", which is the second half
  of GPT-04's flagged sentence 13 in that section (ruling recommended
  there: keep). The column is on screen and not spoken; it is here so
  the sheet carries the "how" the narration does not say. Recommended
  ruling: keep, on the same ruling as GPT-04 sec-02's flag; if the
  developer cuts that sentence in guide/06, cut the third line here in
  the same commit.

**What this block adds beyond the guides.** The right-hand column: the
narration quotes the page's four items and says the schedule is data;
the sheet says how each of the four is checked, and marks data as this
task's. Guide/06 sec-02 has the same four items over four hundred
words; this sheet is the checklist form of it the guide deliberately
does not call a checklist.

### Block 7 — `block-07` — S-07 — Check — 70 words, est. 32s

**Narration as drafted:**

> [[r]]Pick one asset and recompute it yourself, from the inputs, without
> looking at the table. Equipment B. [[r]]Its cost. [[r]]Its salvage
> value. [[r]]The difference is what gets depreciated. [[r]]Spread over
> the life the prompt stated. [[r]]That is the annual charge, [[r]]and
> year three is the same figure, as the prompt asked. [[r]]Now the table.
> The year-three figure the response gave for Equipment B is not that
> figure. It is wrong.

**Reveals** — 8 markers, 8 entries, 8 rows (the response's table is on
the left from frame 0; each numbered line on the right appears on its
marker; the last line's `against` marks the table's Equipment B, Year 3
cell in the wrong role when it appears):

1. `0.5s` — "Pick one asset…" — 01 Asset · Equipment B
2. `8s` — "Its cost." — 02 Cost · 45,000
3. `9s` — "Its salvage value." — 03 Salvage value · 5,000
4. `10s` — "The difference…" — 04 Cost less salvage · 40,000
5. `13s` — "Spread over the life…" — 05 Useful life · 8 years
6. `16s` — "That is the annual charge," — 06 Annual charge · 5,000
7. `18.5s` — "and year three is the same figure…" — 07 Year 3, the same amount, as asked · 5,000 (right, teal)
8. `23.5s` — "Now the table." — 08 The table's Year 3 figure — wrong · 5,500 (accent), and the table cell highlighted with a WRONG tag

Every figure on lines 02–07 is computed in the module from Equipment
B's inputs; line 08 is `WRONG`.

**Index entries used** — 9#9 (data is always verified) is the rule the
block performs; guide/06 sec-02's "checked by recomputing it" is the
practice. No sentence states a claim.

**Classification:** 0 sourced · 0 attributed · 10 connective (1–10) · 0
flagged. The block is the walk-through: sentences 2–8 name each step
while the sheet shows its figure; sentences 9–10 state the composed
mismatch and label it wrong, as the spec requires (J2). The narration
reads no digit.

**Flags** — none in the narration; the mismatch is F1.

**What this block adds beyond the guides.** All of it. The arithmetic
line by line with the response's table beside it, the recomputed figure
in teal and the table's in accent with the cell marked, is the
verification guide/06 describes in a sentence, done on screen. The
narration says which step is which; the figures, the comparison and the
highlight are the sheet's.

### Block 8 — `block-08` — S-08 — Calc — 86 words, est. 40s

**Narration as drafted:**

> [[r]]Lesson one gave the one-sentence reason this can happen. An
> executive quoted in the CPA.com toolkit put it this way: today's large
> language models produce generated output, not computed answers.
> [[r]]OpenAI's own page says a response is based on patterns in the data
> the model was trained on, and can be incorrect or misleading. [[r]]That
> is the whole explanation this course offers. No source says how often a
> figure comes out wrong, or why this one would; only that the ordinary
> response is not a calculation.

**Reveals** — 3 markers, 3 entries, 3 rows:

1. `0.5s` — "Lesson one gave…" — First response — Equipment B, Year 3 — wrong · 5,500 (muted, the Calc slide's wrong role)
2. `14s` — "OpenAI's own page says…" — Recomputed from the inputs — right · 5,000 (teal)
3. `25s` — "That is the whole explanation…" — Overstated by · 500 (computed: `WRONG.figure − annualOf(B)`)

**Index entries used, in order**
1. 4#3 — generated output, not computed answers; attributed in the
   toolkit to Jeff Seibert, CEO of Digits (sentence 2, attributed)
2. 9#1 — responses based on patterns in the data it was trained on; can
   produce incorrect or misleading outputs (sentence 3)

**Classification:** 1 sourced (3) · 1 attributed (2) · 3 connective (1, 4,
5) · 0 flagged. Sentence 5's first half is a boundary statement resting
on file 9's "Does not cover" ("Any error rate or measure of how often it
is wrong") (J5); its second half restates 4#3.

**Flags** — none.

**What this block adds beyond the guides.** The two figures side by
side with the difference, which the spec asks for and no guide has.
Guide/03 sec-01 gives the generated-not-computed distinction in prose;
this sheet is what the distinction costs, in one asset's year.

### Block 9 — `block-09` — S-09 — Session — 85 words, est. 39s

**Narration as drafted:**

> [[r]]The page's second practice is iteration: start with an initial
> prompt, review the response, and refine the prompt based on the output.
> OpenAI ties accurate calculation to a tool its page names, not to the
> ordinary response, so the second prompt says what was found and asks
> for the arithmetic to be run there and shown. [[r]]How a plan exposes
> that tool, or how to tell it ran, no source here says; that is why the
> check you just made is what settles the figure.

**Reveals** — 2 markers, 2 entries, 2 turns (the first response, with
its Year 3 cell now marked wrong, is a `prior` turn, compact):

1. `0.5s` — "The page's second practice…" — the second prompt types in: "Year 3 for Equipment B does not equal (cost − salvage) ÷ life. Redo the schedule with the arithmetic run in the data analysis tool, and show the calculation."
2. `26s` — "How a plan exposes…" — the response's shown calculation: the formula and one line per asset, each computed in the module

**Index entries used, in order**
1. 13#4 — start with an initial prompt, review the response, and refine
   the prompt based on the output (sentence 1)
2. 9#12 — the tool the page prints as "Code interpreter / Data analysis"
   enables accurate calculations (sentence 2)

**Classification:** 2 sourced (1, 2) · 0 attributed · 1 connective (3) · 0
flagged in the narration. Sentence 3 is a boundary statement resting on
file 9's "Does not cover" and on guide/03 sec-05's closing paragraph,
which says that how to prompt for the tool and how to tell it ran belong
to later lessons; this is the later lesson, and its sources still do not
say (J3, J5).

**Flags**
- `UNSOURCED` (illustration) — the depiction of the tool running: the
  second prompt names "the data analysis tool" and the response shows a
  calculation. No source says that naming the tool causes it to run, how
  a given plan exposes it, or what the screen shows when it has run. The
  narration says exactly that in sentence 3 and draws the consequence:
  the participant's own check, not the second pass, settles the figure.
  The response text on screen is a calculation the module computed, not
  a claim about ChatGPT's interface. Recommended ruling: keep, with the
  sentence-3 disclaimer; if the developer would rather the lesson not
  depict the tool at all, the second prompt becomes "Recompute the
  schedule and show the calculation" and sentence 2 loses its second
  half, which is a change to `src/lesson-08.ts` only.

**What this block adds beyond the guides.** The refinement prompt as
typed, saying what the review found and what to do about it. Guide/05
sec-04 teaches iteration as three moves in the abstract; this sheet
shows the second prompt of a real exchange, written after the check.

### Block 10 — `block-10` — S-10 — Sweep — 85 words, est. 39s

**Narration as drafted:**

> [[r]]The second pass comes back, and this time the figure in that cell
> [[r]]matches the one you computed. [[r]]Lesson one's rule, restated: a
> number from a conversation in which the tool did not run is generated
> text about a number; if the number matters, either the tool computed it
> or it is recomputed somewhere else before it is relied on. [[r]]Here
> both happened, and they agree. That agreement, not the second table on
> its own, is what makes this figure one you can rely on.

**Reveals** — 4 markers, 4 entries, 1 + 3 elements:

1. `0.5s` — "The second pass comes back…" — the corrected table (`schedule`, every cell computed) appears and a neutral highlight sweeps down its rows, then settles teal on Equipment B, Year 3 with a RIGHT tag; the panel takes the marked wash
2. `6s` — "matches the one you computed" — line: Recomputed by hand — Equipment B, Year 3 · 5,000 RIGHT
3. `8.5s` — "Lesson one's rule…" — line: Second pass, arithmetic run in the tool · 5,000 RIGHT
4. `27.5s` — "Here both happened…" — line: First response · 5,500 WRONG

**Index entries used** — 9#12 (accurate calculation tied to the tool) and
9#9 (always verify data), through guide/03 sec-05's rule, which sentence
2 restates as lesson one's.

**Classification:** 0 sourced · 0 attributed · 4 connective (1, 2, 3, 4)
· 0 flagged. Sentence 2 is the course's own rule from guide/03 sec-05
("Read together, they give the lesson its one practical rule"), restated
with attribution to lesson one; it is a handoff, not a new claim (J7).
Sentences 3–4 are about the composed session and the lesson's reading of
it.

**Flags** — none in the narration; the second pass is F1.

**What this block adds beyond the guides.** The corrected table
arriving, the sweep settling on the one changed cell, and the three
figures — by hand, by the tool, and the first response — stacked with
their roles. The guides state the rule; this sheet is the rule's two
halves agreeing on one figure.

### Block 11 — `block-11` — S-11 — List — 81 words, est. 37s

**Narration as drafted:**

> [[r]]What this session leaves behind is on the sheet: the prompt, both
> responses, and the check. [[r]]The toolkit says a human should review
> and ensure the accuracy of any content used in decision-making or
> shared with clients, that monitoring the answers is the accounting
> professional's responsibility, and that a firm should discuss with
> general counsel the necessary documentation of its review process.
> [[r]]What that record contains is the firm's decision, with counsel.
> This lesson says nothing about what it must hold.

**Reveals** — 3 markers, 3 entries, 4 items (item 4 reveals with the
last marker):

1. `0.5s` — "What this session leaves behind…" — 01 The prompt, as sent — including the example row and the context
2. `7.5s` — "The toolkit says…" — 02 The first response, with the wrong figure marked
3. `28.5s` — "What that record contains…" — 03 The recomputation by hand, for one asset; 04 The second pass, with the arithmetic shown

**Index entries used, in order**
1. 4#4 — a human should review and ensure the appropriateness and
   accuracy of any content used in decision-making or shared with
   clients (sentence 2)
2. 4#5 — accounting professionals have a responsibility to monitor
   answers coming out of generative AI (sentence 2)
3. 4#6 — discuss with general counsel necessary documentation of a
   review process for AI output (sentences 2, 3)

**Classification:** 1 sourced (2) · 0 attributed · 3 connective (1, 3, 4)
· 0 flagged. Sentence 3 restates 4#6's "with general counsel"; sentence
4 is the spec's instruction — nothing about what the record contains —
stated in the participant's terms (J5). The list on the sheet is what
*this session* produced, not what a record must hold; sentence 1 says
so and sentence 4 closes the door.

**Flags** — none.

**What this block adds beyond the guides.** The four artefacts of one
session, enumerated. Guide/06 sec-06 says the review process is
documented in a form counsel decides and describes no record; this
sheet shows what one task leaves on the desk, which is the input to
that decision and not the decision.

### Block 12 — `block-12` — S-12 — Statement — 85 words, est. 39s

**Narration as drafted:**

> [[r]]The rule this course has been building to fits in one sentence,
> and it is the vendor's: use ChatGPT as a first draft, not a final
> source, and verify important information from reliable sources before
> relying on it. [[r]]Everything in this session was that sentence
> applied: a prompt written so the task was clear, a response read as a
> draft, a figure recomputed, a correction asked for, a record kept.
> [[r]]The tool did what its vendor says it does. The check made the
> schedule yours.

**Reveals** — 3 markers, 3 entries, 3 lines:

1. `0.5s` — "The rule this course…" — A response is a first draft, not a final source
2. `17.5s` — "Everything in this session…" — A figure is relied on when it was computed or recomputed — not when it looks right
3. `32.5s` — "The tool did what…" — Verify before relying. That is the whole course.

**Index entries used, in order**
1. 9#8 — use ChatGPT as a first draft, not a final source (sentence 1)
2. 9#7 — approach ChatGPT critically and verify important information
   from reliable sources (sentence 1)

**Classification:** 1 sourced (1) · 0 attributed · 2 connective (2, 3) ·
1 flagged (4). Sentence 3 ("The tool did what its vendor says it does")
rests on 9#1 — the vendor says it can produce incorrect output, and in
the composed session it did — and is classed connective as a summary.

**Flags**
- `UNSOURCED` (interpretive) — "The check made the schedule yours." A
  closing gloss: the participant's recomputation, not the response, is
  what the schedule rests on. It echoes guide/06 sec-04's position that
  a verified source, not the response, is what a conclusion rests on,
  which is flagged as the course's there; here it is said in the
  participant's terms with no standard named. Recommended ruling: keep;
  cut it if the developer reads it as importing the General Standards
  link, which this lesson does not otherwise mention.

**What this block adds beyond the guides.** The three lines are the
course's rule in three registers; the narration says the vendor's
sentence and lists what the session did. The second line — computed or
recomputed, not "looks right" — is the sheet's and is not spoken. This
is a close, and with S-01 the sheet nearest to its narration (J6).

## Questions

Written into `src/questions-08.json`. Five questions: three review,
placed by `after_block` at the three points where the participant has
just seen something to evaluate — after the prompt is complete (block
4), after the wrong figure is explained (block 8), and after the second
pass settles it (block 10) — and two assessment on lo-1, one on what is
required before relying on a figure and one on identifying where the
output required correction, which is the objective's second clause.
Every question has four choices; every feedback string says why the
correct choice is correct, why each of the other three is wrong on the
sources' account, and names the sheets to re-watch (5.01.2.2). Every
stem was checked against the other five GPT lessons' questions by `npm
run check`'s rule 2; none collides. The count is what the script
supports, not a minimum; minimums are superCPE's, from course credit.
Each question's `_source` field in the JSON repeats the entries below.

| id | kind | placed / measures | index entries | narration that answers it |
|---|---|---|---|---|
| q-01 | review | after block 4 | 13#3, 4#8, 4#9; file 13 "Does not cover", 9#12, 4#6 (distractors) | S-03 s2, S-04 s2 and s4: clear, specific, enough context; only as good as the prompt; examples help |
| q-02 | review | after block 8 | 9#1, 4#3 attributed; file 9 "Does not cover", 9#9, 9#12, 9#6, 9#7 (distractors) | S-08 s2–s5: generated output, not computed answers; patterns; no source says how often or why |
| q-03 | review | after block 10 | 9#12, 9#9, 9#8; file 9 "Does not cover", guide/03 sec-05 (distractors) | S-10 s2–s4: the tool computed it or it is recomputed elsewhere; both happened and agree |
| q-04 | assessment | lo-1 | 9#8, 9#9, 9#12; 9#2, 9#6, 4#3, 9#1 (distractors) | S-06 s1, S-07, S-10 s2: first draft; always verify data; computed or recomputed |
| q-05 | assessment | lo-1 | 9#9 (recomputing, per guide/06 sec-02); 4#9, 13#4 (distractors) | S-07 s1, s9–s10: one asset recomputed; the table's Year 3 figure for Equipment B is wrong |

**Judgments on the questions**, with recommended rulings:

- **Q1 — q-05 asks about the composed session as shown.** lo-1's second
  clause is "identify where the model's output required correction",
  and the only output in the lesson is the composed one, so the question
  asks where *that* output was wrong and how it was found. Its correct
  choice is a fact about the sheets, not about ChatGPT; its feedback
  rests the "how" on 9#9. Recommended ruling: accept; if the developer
  would rather no question turn on a composed fact, q-05 is rewritten
  as a scenario like q-04's, which leaves lo-1's second clause measured
  only through q-04's "identify" reading.
- **Q2 — distractors that state what no source says.** q-01 (b), q-02
  (c) and q-03 (d) each assert a link the sources do not make (prompt
  wording → correct figures; naming the tool → the tool ran). They are
  wrong because the sources are silent, and the feedback says so rather
  than asserting the opposite. Recommended ruling: accept.
- **Q3 — two assessment questions on one objective.** The lesson has one
  objective with two clauses; q-04 measures the first (carry the task
  through verification) and q-05 the second (identify where correction
  was required). Recommended ruling: accept; the count the course needs
  is superCPE's.
- **Q4 — placement.** Three review questions over twelve blocks, at
  blocks 4, 8 and 10: the first after the prompt is complete, the
  second after the mismatch has been explained, the third after it is
  settled. Nothing is stacked at the end (5.01.2.1 constrains spacing,
  not density). Recommended ruling: accept.

## Judgment list — CLOSED (default rulings; developer read pending)

Five flags: two in the narration (S-05 sentence 4, S-12 sentence 4), one
on the composed session as a whole (F1), one on the depiction of the
tool running (S-09), one on S-06's screen column. Each is quoted in its
block above with its recommended ruling. The items below are the
judgments the draft had to make that a flag does not capture. Under the
CLAUDE.md Rulings rule each recommendation is the ruling unless the
content developer's 4.01.1 read of the script says otherwise; that read
is still ahead, and no audio is bought before it.

**F1 — the composed session** (`illustration`). The prompt (S-03, S-04),
the first response's table and closing line (S-05, S-07, S-09), the
wrong figure (5,500), the second prompt and the shown calculation (S-09),
and the corrected table (S-10) are all written for this course. The
narration says so once (S-01 s2) and the Session pane's header says so
on every Session sheet. Every figure shown as correct is computed in the
module; the wrong one is typed and labelled. Recommended ruling: keep as
composed and labelled; a real session could not be used here (it would
be evidence of the tool's behaviour on one day, which the sources do not
support generalising from, and 4#10 would require its inputs to be
de-identified anyway).

**J1 — composed, and said once.** The spec asks that the session say it
is composed once, early. S-01 s2 is that sentence. The pane header
repeats it on screen because a still must not read as a screenshot; the
narration does not repeat it. Recommended ruling: accept both; if the
developer wants the header shorter, "COMPOSED SESSION" alone is the
minimum that still says it.

**J2 — the wrong figure is labelled and not diagnosed.** 5,500 against a
computed 5,000. The narration says it is wrong (S-07 s10, S-08 s1
label) and, in S-08 s5, that no source says why. The figure was chosen
so that it does not read as any particular slip (it is not, for
example, cost ÷ life with salvage forgotten), so that the participant
is not invited to infer a mechanism the sources do not give.
Recommended ruling: accept.

**J3 — the tool is depicted, and the depiction is disclaimed.** See the
flag on S-09. The alternative — no tool, an outside recompute only —
was rejected because the spec names the code tool as the corrected
pass and 9#12 is the one entry that ties a correct calculation to the
product. Recommended ruling: accept, with the S-09 s3 disclaimer.

**J4 — glosses classed connective.** S-02 s4 (generic names and round
figures are what de-identification looks like here), S-06 s2 (a
schedule is data), S-06 s3 (how a figure is checked — guide/06's gloss),
S-10 s4 (agreement, not the second table, is what makes the figure
reliable), S-12 s3 (the tool did what its vendor says it does). Each
applies an entry to the sheet in front of the participant and adds no
fact about the tool. Recommended ruling: accept the class; reclassify
any the developer reads as a claim about the tool as a flag.

**J5 — boundary statements.** S-08 s5 (no source says how often or why),
S-09 s3 (no source says how a plan exposes the tool or how to tell it
ran), S-11 s4 (this lesson says nothing about what the record must
hold). Each rests on an index "Does not cover" or on the spec's own
instruction, and exists so a participant does not assume the missing
fact. Recommended ruling: keep all three.

**J6 — the two sheets nearest their narration.** S-01 and S-12 are
Statement sheets whose three lines the narration paraphrases. Every
other sheet carries something the narration does not say (a prompt, a
table, a computation, a column, a list). The two are a title and a
close; the additional-learning claim for the lesson rests on the ten
between them. Recommended ruling: accept; if the developer wants no
sheet that mirrors, S-01 becomes the inputs sheet (merging with S-02)
and S-12 keeps only its second line, which is not spoken.

**J7 — lesson one's rule restated.** S-10 s2 restates guide/03 sec-05's
rule ("either the tool computed it or it is recomputed somewhere else
before it is relied on") as lesson one's. The rule is the course's
reading of 9#12 and 4#3 together, made in lesson 1 and reviewed there;
this lesson repeats it with attribution and adds nothing. Recommended
ruling: accept as a handoff.

**J8 — accent blue as the wrong role.** The spec assigns blue to the
mismatched cell and reserves teal for the corrected figure. theme.ts had
said accent never marks content; it now records this one exception,
confined to the Check and Sweep sheets. On the Calc sheet (S-08) the
existing wrong role — muted, not red — is kept, so the same figure is
accent on S-07 and S-10 and muted on S-08. Recommended ruling: accept;
if the developer wants one colour for "wrong" on every sheet, the Calc
slide's `EMPHASIS_COLOR.wrong` changes, which touches ATO-02's S-03,
S-10 and S-13 as well.

**J9 — sheet-window warnings.** `npm run check` warns on eleven of the
twelve blocks that their estimated duration is under the 40 s sheet
window. The spec's word budget (750–950) and block count (12–16) cannot
both be met inside that window at the check script's 130 wpm constant
(12 × 40 s at 130 wpm is 1,040 words). At the measured 164 wpm the
blocks run 24–34 s. The warnings describe the silent preview and are
discarded when audio exists; whether 25–35 s sheets are the right pace
for a worked task is the developer's call, and the runbook's window was
written for the argument-shaped ATO lessons. Recommended ruling: accept
the pace as drafted; if the developer wants every block inside the
window, the lesson merges to eight or nine blocks and the shape in the
spec changes.

**J10 — the example row.** S-04's "Asset X | 1,000 | 1,000 | 1,000" is
a format example with figures belonging to no asset. It states no
result and is not a claim; S-11's "kept" list names it as part of the
prompt. Recommended ruling: accept.

**J11 — one attributed sentence.** S-08 s2 reports the toolkit's quoted
executive (4#3) as GPT-01 and GPT-04 do, with the arm's-length framing
("an executive quoted in the CPA.com toolkit"). Every other toolkit
entry used (4#4, 4#5, 4#6, 4#8, 4#9, 4#10, 4#13) is CPA.com's own advice
and is reported as the toolkit's, classed sourced. Recommended ruling:
accept the class distribution.

**J12 — reveals and estimates are placeholders.** Every `reveals` entry
was placed by word offset at 130 wpm and every `estimatedSeconds` by the
same constant; both are discarded when `audio-meta-08.json` is
populated. The stills at `out/stills-08/` are each block's last frame
with every reveal in; they show layout, not timing. Recommended ruling:
none needed — this is rule 2 working as designed.

## Sources still needed

From the Gaps section of `drafts/GPT-source-index.md` (entry 25), the
bullets that bear on this lesson, verbatim:

- **L06 has no source of its own.** The video lesson will rest on file 4's
  use-case prompts (2023, naming tools that may no longer exist as named),
  on files 6, 8, 9 and 13 for the workspace, settings, verification and
  iteration steps. Nothing in the set describes a complete accounting task
  end to end.

What this draft did with that gap: the task is composed and labelled so
(F1), and no sentence claims that the session shows what ChatGPT does.
Files 6 and 8 (plans, settings) are not used and are not in
`meta.sources`; the lesson does not say which plan includes the tool or
how it is switched on (S-09 s3). A source that describes a complete task
end to end would let the session be reported rather than composed; none
is proposed here.
