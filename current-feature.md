# Current Feature

## GPT-01 prose: draft the five body sections, front matter, and glossary

## Goal
`guide/03/` holds a complete first draft of lesson GPT-01 — "What the model
gets wrong" — in which every factual sentence traces to a numbered entry in
`drafts/GPT-source-index.md`, and every sentence that does not is marked in
the accuracy record before the developer reads it. Nothing is voiced,
rendered, exported, or checked; `meta.status` stays `"draft"`.

This is the first body prose of course GPT. Its job is as much to prove the
index-to-prose method as to produce the lesson: if the method fails here it
fails cheaply.

## In scope
- Body prose for sec-01 through sec-05 in `guide/03/`
- The front-matter file completed from the contract template
- Glossary terms: the file and `meta.glossaryTerms` in `src/lesson-03.ts`
- The "Sections" and "Judgment list" parts of `drafts/GPT-01-review.md`
- The changelog entry

## Out of scope
- Questions. `src/questions-03.json` is untouched; that is the next feature.
- Any other lesson, any change under `sources/`, any edit to the index.
- Any change to `meta` in `src/lesson-03.ts` other than `glossaryTerms`.
- Web research or general knowledge. If the index does not source a
  sentence, the sentence is either cut or flagged — never quietly kept.

## Read first
- `CLAUDE.md`, all of it
- `docs/course-package.md` — the front-matter template, the 7.02.5 roles,
  and what superCPE does with `glossary_terms`
- `drafts/GPT-source-index.md` — sections for files 4 and 9 in full, and
  the Gaps list
- `drafts/GPT-01-review.md` — the objectives and their index references
- `guide/03/*.md` — the section plan with its `<!-- index: … -->` tags
- `guide/01/` — ATO-01's body sections, as the worked example of the house
  style and of how a body section is shaped
- `drafts/SEC-01-flag-triage.md` — what an UNSOURCED flag looks like and
  why 41 of them was the failure this method prevents

## Sourcing rule
Every sentence in a body section is one of three things:

1. **Sourced.** It states, in the course's own words, a claim the index
   carries as a numbered entry for file 4 or file 9. The accuracy record
   lists the entry.
2. **Attributed.** It reports what a named source says, where the claim is
   the source's rather than the course's — "OpenAI's own help page tells
   users to…", "the CPA.com toolkit quotes…". Use this for file 4 entry 3
   in particular: "generated, not computed" is a quoted executive in the
   toolkit, not a finding, and the course should not assert it as one.
3. **Connective.** Transitions, headings, and sentences that introduce or
   summarise the sourced ones. No fact in them.

Anything else is flagged `UNSOURCED` in the accuracy record with the
sentence quoted, and stays in the draft so the developer can rule on it.
Do not paraphrase a flag away; do not cut it silently. The developer
decides.

No accounting examples unless the index carries one. It does not, for this
lesson. An invented example — "suppose the model is asked about ASC 842…" —
is fine only when it is plainly hypothetical and states no fact about ASC
842 or the model's behaviour on it. When in doubt, flag it.

## Sections

Write each body file from its plan tag. Target 350–500 words of body per
section, so the lesson lands near 2,000 body words; superCPE measures the
real count, and nothing here is written to a number.

- **sec-01 Generated, not computed** — 9#1; 4#3 attributed. What the model
  is doing when it answers, in the sources' terms and no further. The Gaps
  list says no source explains the mechanism: do not supply one.
- **sec-02 Hallucination and fabricated citations** — 9#2, 9#3, 9#4. This
  is the lesson's centre. OpenAI's own term, OpenAI's own examples.
- **sec-03 The knowledge cutoff** — 9#5. Short. "Staleness" is the course's
  word for it; say so once.
- **sec-04 Confidence is not correctness** — 9#6. Short.
- **sec-05 When the model can calculate** — 9#12; 4#3 attributed. The one
  practical rule in the lesson.

Where a section can be written honestly in fewer words than the target,
write fewer. Padding is the failure the ATO course taught.

**Front matter** — complete `00-front-matter.md` from the contract's "How
this course works" template. Course-level facts (title, field of study,
level, prerequisites) come from `COURSE_GPT`; do not type them a second
time in prose that could drift from the module.

**Glossary** — terms the sections use that a participant might not know:
at minimum *hallucination*, *knowledge cutoff*, *large language model*,
*prompt*, *code tool* (or whatever name file 9 uses for it). Each
definition traces to an index entry the same way body prose does; a term
the index cannot define is flagged, not invented. Fill `meta.glossaryTerms`
with `sectionId: "glossary"` on each.

## Accuracy record

In `drafts/GPT-01-review.md`, under **Sections**: one block per section
with the file, its role, and a numbered list of the index entries used, in
the order they appear. Under **Judgment list — OPEN**: every UNSOURCED flag
with its sentence quoted and the section it is in, plus any judgment the
draft had to make that the developer should confirm — attribution wording,
whether a hypothetical is plainly hypothetical, a glossary definition that
compresses two entries. Leave the other headings as they are.

## Verify
1. Every body sentence classified. Report counts: sourced, attributed,
   connective, flagged. If flagged exceeds ten across the lesson, stop and
   report before writing more — the plan or the index is wrong, not the
   prose.
2. `npm run typecheck` clean; `npm run check` shows lesson 03 with no ERROR.
   The questions WARN remains; the glossary WARN is gone.
3. `npx tsx scripts/text-preview.ts` or whatever `check` uses to print the
   word count per section — report the per-section and body totals as an
   estimate, labelled as such.
4. `git status`: `guide/03/*.md`, `src/lesson-03.ts` (glossaryTerms only —
   confirm with `git diff`), `drafts/GPT-01-review.md`, `CHANGELOG.md`.
   Nothing else.
5. Paste back `guide/03/02-hallucination.md` in full and the Judgment list
   before committing.

## Changelog
One entry, numbered one past the last. Standards touched: 4.01.1 and
7.02.5 after reading them. Under Decisions: the three-way sentence rule
and why attribution is used for file 4 entry 3. Under Known gaps: no
questions yet; the flag count; whatever the index could not define.

## Not this feature
Questions for GPT-01 — review after each body section, plus its share of
the assessment. Next.
