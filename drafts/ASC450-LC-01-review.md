# ASC450-LC-01 — Recognizing, Measuring, and Disclosing Loss Contingencies — reviewer's document

This is the document a licensed CPA reads before the lesson ships. It is
the first **text lesson** (feature 05), so the economics differ from the
video lessons: there is no narration audio at stake, corrections stay
nearly free forever, and a re-export re-ingests in under a second with
superCPE versioning the change automatically. What does not differ is
4.01.1/4.02 — the reviewer reads the guide, and the sign-off asserts the
7.02.5 role assignments are honest (nothing excluded smuggled into
`body`) and that any future clips are additional learning, not narration.

How to read it: for each section, the file, its role (which decides
whether its words are counted), and the sources relied on; then each
question with its sources and objective. The lesson data lives in
`src/lesson-05.ts`, `src/questions-05.json`, and `guide/05/*.md`; edit
those files, not this one.

**Status, first draft (2026-09-01).** Unreviewed. `meta.status` is
`"draft"`; export refuses it. The full round trip (export → ingest →
summary → reader → delete) was exercised against a local superCPE with
status temporarily flipped, and the draft was deleted there; nothing of
this lesson exists server-side. **Caution:** the ASC 450 citations below
were written from working knowledge, not against `sources/` extractions —
this repo carries no ASC 450 source files yet. Verifying each quoted or
paraphrased paragraph against the Codification is the review's first
step, and pulling `450-20-25-2.txt` etc. into `sources/` the way the PCX
lessons did is the right way to close it.

## Sections

- **sec-00 · 00-front-matter.md · front_matter (excluded).** The
  contract's "How this course works" template verbatim, plus a
  course-specific intro paragraph. Nothing here earns credit.
- **sec-01 · 01-likelihood.md · body (counted).** Contingency definition
  and the three-point scale. Sources: ASC 450 Master Glossary
  (Contingency, Probable, Reasonably Possible, Remote).
- **sec-02 · 02-recognition.md · body (counted).** The two accrual
  conditions. Source: ASC 450-20-25-2 (also quoted in full in the
  appendix); the subsequent-events aside leans on 855-10-25 by reference.
- **sec-03 · 03-measurement.md · body (counted).** Range measurement:
  better estimate, else the minimum. Source: ASC 450-20-30-1.
- **sec-04 · 04-disclosure.md · body (counted).** Disclosure of the
  nature and the estimate (or the statement that none can be made) when
  reasonably possible loss exceeds any accrual. Sources: ASC 450-20-50-3
  through 50-4; the remote/guarantees aside references the exceptions
  region (450-20-50-6 territory).
- **sec-05 · 05-gain-contingencies.md · body (counted).** Gain
  contingencies wait for realization; disclosure avoids misleading
  implications. Sources: ASC 450-30-25-1, 450-30-50-1.
- **sec-90 · 90-glossary.md · glossary (excluded).** The five Master
  Glossary definitions, mirrored in `meta.glossaryTerms`.
- **sec-91 · 91-appendix-a.md · appendix (excluded).** ASC 450-20-25-2
  reproduced as supplementary reference material, per 7.02.5's
  full-text-goes-in-an-appendix rule.

## Questions

- **q-01 (review, after sec-01, lo-1).** Likelihood classification from
  counsel's wording. Master Glossary definitions.
- **q-02 (review, after sec-02, lo-2).** Probable but not estimable → no
  accrual, disclosure analysis follows. 450-20-25-2; 450-20-50-3.
- **q-03 (review, after sec-03, lo-3).** $2M–$9M range, no better
  estimate → accrue the minimum. 450-20-30-1.
- **q-04 (review, after sec-04, lo-4).** Notes for exposure above the
  accrual. 450-20-50-3 through 50-4.
- **q-05 (review, after sec-05, lo-4).** Plaintiff side: no receivable
  before realization. 450-30-25-1; 450-30-50-1.
- **q-06 (assessment, lo-1).** Ordering the three likelihood terms.
- **q-07 (assessment, lo-2).** Post-year-end information about a
  year-end condition. 450-20-25-2 condition (a).
- **q-08 (assessment, lo-3).** Better estimate within a range beats the
  minimum rule. 450-20-30-1.
- **q-09 (assessment, lo-4).** Unestimable reasonably possible loss +
  probable gain, no netting. 450-20-50-3/50-4; 450-30.

## Open judgment list

- **J1.** The appendix reproduces 450-20-25-2 from working knowledge.
  Verify it verbatim against the Codification before sign-off; an
  appendix labelled "in full" must be exact.
- **J2.** sec-01 asserts "probable" sits above "more likely than not."
  Standard reading of *likely*, and worth the reviewer's blessing since
  the guide states it flatly.
- **J3.** sec-02's subsequent-events aside compresses Type 1/Type 2
  recognized-vs-nonrecognized events into one sentence. Confirm the
  compression misleads no one, or expand.
- **J4.** sec-04 says remote contingencies "generally" need no
  disclosure "with narrow exceptions (guarantees…)". Confirm the hedged
  phrasing against 450-20-50-6 and the guarantees guidance.
- **J5.** sec-05 paraphrases 450-30-25-1's "might be to recognize
  revenue before its realization" as "would recognize revenue before
  realization." Slightly stronger than the source; bless or soften.
- **J6.** The worked numbers ($2M–$9M; $4M–$10M with a $6M better
  estimate) are illustrative figures awaiting the reviewer's blessing,
  like lesson 1's ≈$23,400 was.

When the list is closed: set `meta.status: "reviewed"` by hand in
`src/lesson-05.ts`, mirror it in `src/course.ts` (COURSE_ASC450), then
`npm run export -- --lesson 05`.
