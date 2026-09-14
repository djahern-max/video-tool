# Current Feature

## GPT-03 and GPT-04 in full

## Goal
Lessons GPT-03 "Prompting for accounting tasks" (`src/lesson-05.ts`,
`guide/05/`, `src/questions-05.json`) and GPT-04 "Verifying the output"
(`src/lesson-06.ts`, `guide/06/`, `src/questions-06.json`) each have body
prose, front matter, glossary, and questions, drafted exactly as GPT-02 was
in feature 29. Both stay `"draft"`. No developer read is waited on.

## Part 0 — Index entry for the switch label (GPT-02 J1)
Additive only. In `drafts/GPT-source-index.md`, file 8, add one entry
quoting the data-controls switch label as the page prints it ("Improve the
model for everyone"), numbered after the existing entries; renumber
nothing. Add a dated line to the index change note. Then in
`drafts/GPT-02-review.md`, update J1's ruling to cite the new entry and
change sec-01's index tag in `guide/04/` to include it. No prose change.

## Part 1 — GPT-03, then Part 2 — GPT-04
For each lesson, in order, the feature-29 Part 3 procedure unchanged:

1. **Section plan** from the lesson's objectives and their index entries:
   four to six body sections, each with an `<!-- index: … -->` tag;
   `meta.sections` set; files created.
2. **Prose** under the three-way sentence rule. No method-voice in
   participant text. Scope handoffs to other lessons are fine.
   Accounting examples only where the index carries one; a plainly
   hypothetical illustration that states no fact is fine, and when in
   doubt, flag it.
3. **Front matter**: template block untouched; opening paragraph is scope,
   audience, and this lesson's topics. No lesson list, no course-level
   descriptors, no source count.
4. **Glossary**: traced or flagged, never invented; `meta.glossaryTerms`
   filled; `meta.sources` extended as supporting where a term needs it.
5. **Questions**: one review question per body section by
   `after_section` with feedback both ways (5.01.2.1, 5.01.2.2); at least
   one assessment question per objective; every correct answer stated in
   the guide and traced; no distractor the sources would also support.
6. **Record**: `drafts/GPT-03-review.md` and `drafts/GPT-04-review.md` in
   GPT-02's shape, recommended rulings written in, judgment list marked
   `CLOSED (default rulings; developer read pending)`.

Complete GPT-03 fully — check clean — before starting GPT-04. If flagged
sentences exceed ten in either lesson, stop and report at that lesson;
do not start the next one.

Two things specific to these lessons:
- **GPT-04 lo-3** cites the General Standards Rule (file 1). Report what
  the Rule says as the Rule's; the link to verifying AI output is the
  course's position and must read as such, not as what the Rule says.
- **GPT-04 lo-4** — the documentation-as-firm-policy objective. The
  toolkit says counsel decides the form of the record. Do not describe
  what the record should contain; no source does.

## Out of scope
- GPT-05, GPT-06. Next feature.
- `meta.status` on any lesson.
- `sources/`; any index edit beyond Part 0.
- Web research or general knowledge.

## Read first
- `CLAUDE.md` (including the Rulings paragraph)
- `docs/course-package.md`
- `guide/04/` and `drafts/GPT-02-review.md` — the shape to match
- `src/lesson-05.ts`, `src/lesson-06.ts`; `drafts/GPT-source-index.md`

## Verify
1. `npm run typecheck` clean.
2. `npm run check`: lessons 05 and 06 — no ERROR, `[draft]` WARN only.
   Report totals; remaining errors should be rule-1 on lessons 07–08 only.
3. Sentence counts per lesson (sourced / attributed / connective / flagged)
   and per-section word estimates.
4. `git status` limited to the two lessons' files, the two review records,
   `drafts/GPT-source-index.md`, `drafts/GPT-02-review.md`,
   `guide/04/01-*.md` (index tag only), `CHANGELOG.md`.
5. One report at the end. Then commit.

## Changelog
Entry 30. Standards touched: 4.01.1, 3.01, 5.01.2.1, 5.01.2.2, after
reading them. Under Known gaps: both lessons draft and unread; flag counts;
what the index could not define.

## Not this feature
GPT-05 (confidentiality), then GPT-06 (video), then export.
