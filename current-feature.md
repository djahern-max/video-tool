# Current Feature

## GPT-01 questions, then GPT-02 in full — no stop between

## Goal
Lesson GPT-01 has its review and assessment questions and `check` shows
no ERROR on it. Lesson GPT-02, "Setting up for professional use", has body
prose, front matter, glossary, and questions, drafted the same way. Both
stay `"draft"`. The content developer reads the whole course once at the
end, not lesson by lesson; this feature does not wait for that read.

## Process change — record it first
Add a short paragraph to `CLAUDE.md` under the review/record section:

> **Rulings.** Every `UNSOURCED` flag and every judgment item in a
> `drafts/GPT-NN-review.md` carries a recommended ruling written by the
> draft. That recommendation is the ruling unless the content developer's
> 4.01.1 read of the guide text says otherwise. The developer's read is the
> review; the record is the evidence of it. Features do not stop to ask.

Apply it here: write the recommended ruling under each item as you go, mark
the list `CLOSED (default rulings; developer read pending)`, and continue.

## Part 1 — GPT-01 questions (`src/questions-03.json`)
Follow the shape of `src/questions-01.json` and the rules in
`docs/course-package.md`.

- **Review questions:** one per body section (sec-01 … sec-05), placed by
  `after_section`. Multiple choice; feedback for correct and for incorrect
  (5.01.2.1). Not scored.
- **Assessment questions:** at least one per objective lo-1, lo-2, lo-3,
  which clears the three rule-1 ERRORs. Write what the text honestly
  supports; do not write to a count — question minimums are superCPE's.
- Every question's correct answer is stated in the guide text and traces to
  an index entry. Distractors must be plausible but wrong on the sources'
  account; no distractor may be a claim the sources would also support.
- Under **Questions** in `drafts/GPT-01-review.md`: per question — id,
  type, section or objective, index entry, and the sentence in the guide
  that answers it.

## Part 2 — Index extension for file 9 (J7)
Additive only. In `drafts/GPT-source-index.md`, file 9, add entries for
the items the page lists that the index omits: "Incorrect definitions,
dates, or facts", "Overconfident answers to ambiguous or complex
questions", "Lack of access", "Bias and over-simplification". Number them
after the existing entries; renumber nothing. Note the extension in the
index's own change note.

## Part 3 — GPT-02 (`src/lesson-04.ts`, `guide/04/`, `src/questions-04.json`)
1. **Section plan.** From lesson 04's objectives and the index entries
   they cite, write a plan of four to six body sections, each with a
   `<!-- index: … -->` tag. Set `meta.sections` and create the files.
2. **Prose.** The three-way sentence rule from feature 27's spec applies
   unchanged: sourced, attributed, or connective; anything else is
   `UNSOURCED`, quoted in the record, left in the text. Add the lesson
   learned in feature 28 from the start: **no method-voice in participant
   text.** The guide teaches; it does not describe its own sourcing
   restraint, count its sources, or explain why a heading exists. Scope
   handoffs to other lessons are fine.
3. **Front matter.** Template block untouched (4.05.3). Opening paragraph:
   scope and audience, this lesson's topics from its objectives. No lesson
   list, no course-level descriptors, no source count.
4. **Glossary.** Terms the sections use; each traced or flagged, never
   invented. Fill `meta.glossaryTerms`. Extend `meta.sources` if a glossary
   term needs a file the lesson does not yet list, marked supporting.
5. **Questions.** Same rules as Part 1.
6. **Record.** `drafts/GPT-02-review.md` in the same shape as GPT-01's,
   with recommended rulings written in and the list marked CLOSED as above.

Stop and report if flagged sentences exceed ten in the lesson; that means
the plan or the index is wrong, not the prose.

## Out of scope
- GPT-03 onward. Next feature.
- `meta.status` on any lesson. The developer's hand edit.
- `sources/`; any index edit beyond Part 2.
- Any web research or general knowledge.

## Read first
- `CLAUDE.md`; `docs/course-package.md` (questions and roles)
- `src/questions-01.json` — worked example of question shape
- `drafts/GPT-01-review.md`; `drafts/GPT-source-index.md`
- `guide/03/` as shipped after feature 28 — the house style to match
- `src/lesson-04.ts` — objectives and current scaffold

## Verify
1. `npm run typecheck` clean.
2. `npm run check`: lesson 03 — no ERROR, only `[draft]` WARN. Lesson 04 —
   no ERROR, `[draft]` WARN only. Report totals.
3. Sentence counts for GPT-02 (sourced / attributed / connective /
   flagged) and per-section word estimates for both lessons.
4. `git status` limited to: `CLAUDE.md`, `src/questions-03.json`,
   `drafts/GPT-01-review.md`, `drafts/GPT-source-index.md`,
   `src/lesson-04.ts`, `guide/04/*.md`, `src/questions-04.json`,
   `drafts/GPT-02-review.md`, `CHANGELOG.md`.
5. Report once, at the end. No paste-back of guide text; the developer reads
   it from the repo. Then commit.

## Changelog
Entry 29. Standards touched: 4.01.1 (default-ruling rule; read pending),
5.01.2.1 (review questions with feedback), 3.01 (assessment coverage per
objective). Under Decisions: the process change and why. Under Known gaps:
both lessons draft and unread; flag counts; anything the index could not
define for GPT-02.

## Not this feature
GPT-03, GPT-04, GPT-05, each as one feature in this same shape; then
GPT-06 (video); then export.
