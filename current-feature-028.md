# Current Feature

## GPT-01 revision: de-meta the prose, close the judgment list

## Goal
`guide/03/` reads as a study guide, not as an accuracy record. The
content developer has ruled on every open item in
`drafts/GPT-01-review.md` (feature 27) and those rulings are written down.
Nothing new is claimed; nothing is voiced, rendered, or exported;
`meta.status` stays `"draft"` — the developer's 4.01.1 read is still
ahead and this feature does not stand in for it.

## In scope
1. **De-meta the body prose.** Sentences in `guide/03/01–05*.md` that
   describe the course's own sourcing restraint — "this course uses it in
   the vendor's sense and no wider", "this course takes that example
   exactly as the toolkit states it and adds nothing to it", "two sources,
   then, from two sides", and any sentence of that kind — are removed or
   rewritten so the participant reads teaching, not method. The evidence
   of restraint already lives in the review record; it stays there.
   Attributions stay ("OpenAI's help page says…", "the toolkit quotes…").
   Sourced and attributed sentences keep their meaning; no new fact enters.
2. **Reword lo-3** in `src/lesson-03.ts` to match the source (9#12 says
   the tool "enables accurate calculations", not "only"):
   > Identify the code tool as the feature OpenAI ties accurate
   > calculation to, and treat ordinary responses as unverified
   > arithmetic.
   Adjust sec-05 sentence 3 and the glossary's *Code interpreter / Data
   analysis* entry if either asserts "only".
3. **Add file 13** (`openai-prompt-engineering-best-practices-2026-09-13.pdf`)
   to `meta.sources` in `src/lesson-03.ts`, using the `Source` shape from
   `src/types.ts` and the title as printed in the index header.
4. **Drop the lesson list** from `00-front-matter.md`'s opening paragraph.
   Keep the scope-and-audience sentence and this lesson's three topics.
   The "How this course works" template block is untouched (4.05.3).
5. **Record the rulings** in `drafts/GPT-01-review.md`:
   - Rename **Judgment list — OPEN** to **Judgment list — CLOSED
     (2026-09-14)**. Under each of J1–J10, add a one-line `Ruling:`.
     J1, J2, J3, J4, J8, J10 — accepted as drafted. J5 — lo-3 reworded
     (quote the new text). J6 — file 13 added to sources. J7 — accepted;
     index extension deferred to its own feature. J9 — lesson list dropped.
   - Under each of the five `UNSOURCED` flags, add `Ruling: keep as
     written — course reasoning, not a sourced claim.`
   - Under **Sections**, update the per-section sentence counts and
     classifications to the revised text. Do not renumber flags.
   - Update the lo-3 line at the top of the file.
   - Add a line under the status paragraph: revised 2026-09-14; still
     unchecked pending the developer's read.

## Out of scope
- Questions (`src/questions-03.json` untouched). Next feature.
- The index (`drafts/GPT-source-index.md`), `sources/`, any other lesson.
- Any edit to `meta` beyond `learningObjectives[lo-3]` and `sources`.
- Setting `meta.status`.

## Read first
- `CLAUDE.md`
- `drafts/GPT-01-review.md` — the Sections and Judgment list as they stand
- `guide/03/*.md`
- `guide/01/` sec-02 and sec-05 — the house style the body should sound like

## Verify
1. Reclassify every body sentence under the three-way rule. Report counts
   before and after. The flagged count must be exactly 3 in the body,
   5 overall; if it moves, stop and report.
2. `npm run typecheck` clean. `npm run check`: lesson 03 shows the same
   three rule-1 ERRORs, `[draft]` WARN, and five no-review-question WARNs;
   nothing new.
3. Word count per section from `check`'s preview, labelled estimate.
4. `git diff src/lesson-03.ts` shows only lo-3 and `sources`.
5. `git status`: `guide/03/*.md`, `src/lesson-03.ts`,
   `drafts/GPT-01-review.md`, `CHANGELOG.md`. Nothing else.
6. Paste back `guide/03/02-hallucination.md`, `05-calculation.md`, and
   the front matter's opening paragraph in full before committing.

## Changelog
Entry 28. Standards touched: 3.01 (lo-3 now no stronger than its
source), 4.01.1 (rulings recorded; read still pending). Under Decisions:
why meta-commentary was moved out of participant text. Under Known gaps:
still no questions; status still draft; J7's index extension deferred.

## Not this feature
- Extend the index for file 9 (the two extra hallucination forms and two
  limitations noted in J7) before lesson 04 draws on that page. Own
  feature, small.
- Questions for GPT-01.
