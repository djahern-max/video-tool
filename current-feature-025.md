# Current Feature

## Register course GPT, set its learning objectives, plan lesson 01

## Goal
Course `GPT` — "Using ChatGPT in an Accounting Practice" — is registered
with its six lessons, every lesson module carries its learning objectives
and descriptors, and lesson 01 has a section plan: guide files that exist,
carry a heading and the index entries they will draw on, and nothing else.
After this feature `npm run check` runs over eight lessons and the next
feature can draft lesson 01's prose from a section plan the author has
reviewed.

No prose is written. No questions are written. Nothing is exported.

## In scope
- `npm run new` six times, creating lessons 03–08 in course GPT
- Filling each new module's `meta`: objectives, descriptors, sources
- Lesson 03's (`GPT-01`) section plan: `meta.sections` and stub guide files
- The changelog entry

## Out of scope
- Body prose, glossary definitions, questions, narration, blocks. Every one
  of those is a later feature.
- Lessons 01 and 02 (ATO). Untouched.
- Any change under `sources/`.
- Editing `drafts/GPT-source-index.md`. It is read, not written.
- Credit estimates, question-count minimums, or anything the CLAUDE.md
  Boundary assigns to superCPE.

## Read first
- `CLAUDE.md`, all of it
- `scripts/new-lesson.ts` — what the scaffold creates and refuses
- `src/types.ts` — `TextLessonMeta`, `LearningObjective`, `Source`, `Author`
- `scripts/validate-package.ts` — the `FIELDS_OF_STUDY` set, so the field
  of study string is copied exactly from there, not typed from memory
- `drafts/GPT-source-index.md` — the whole file. The objectives below cite
  its entries by file number and entry number as the index numbers them.
- `src/lesson-01.ts` and its questions file, as the worked example of a
  filled-in module (ATO-01 is a text lesson)

## The course

| id | code | kind | title |
|---|---|---|---|
| 03 | GPT-01 | text | What the model gets wrong |
| 04 | GPT-02 | text | Setting up for professional use |
| 05 | GPT-03 | text | Prompting for accounting tasks |
| 06 | GPT-04 | text | Verifying the output |
| 07 | GPT-05 | text | Confidentiality and client data |
| 08 | GPT-06 | video | A task, start to finish |

Course code `GPT`, course title "Using ChatGPT in an Accounting Practice".
The first `npm run new` carries `--course-code GPT --course-title "..."`;
the rest carry `--course-code GPT` only.

Descriptors, identical on every lesson (3.02.1 — a course requires
agreement across its lessons):
- field of study: Computer Software & Applications — use the exact string
  from `FIELDS_OF_STUDY`
- knowledge level: Basic
- prerequisites: "None"
- advance preparation: "None"
- delivery method: whatever ATO-01 uses for QAS self study; copy it

`author`: copy the shape from ATO-01 and fill it with Dane's details from
that module. `revision` "1", `revisionDate` today. `status` stays `"draft"`.

## Learning objectives

Put these into each module's `learningObjectives` verbatim, with ids
`lo-1`, `lo-2`, … per lesson. The bracketed index references are for the
accuracy record, not the objective text — record them in the lesson's
`drafts/GPT-0N-review.md` under "Learning objectives", one line per
objective, so the developer can see what each rests on.

**03 / GPT-01**
- lo-1: Explain that ChatGPT produces responses from patterns in its
  training data, so output is generated rather than computed.
  [index 10#1, 4#3]
- lo-2: Recognize the failure modes that matter in professional work:
  hallucination, fabricated citations, knowledge cutoff, and confidence
  that does not track correctness. [10#2–6]
- lo-3: State when calculation is reliable: only when the model uses a
  code tool. [10#12]

**04 / GPT-02**
- lo-1: Distinguish the training defaults: individual plans train on
  conversations unless the user opts out; Business and Enterprise do not
  train by default, with explicit opt-in as the only exception.
  [12#1,2,7; 11#2,3,23]
- lo-2: Locate and set the training control on an individual plan, and
  state what it does and does not do: account-wide, prospective, does not
  clear history, and feedback can override it. [9#1–4,8; 12#3–5]
- lo-3: Describe the controls a Business or Enterprise workspace adds:
  admin access to conversations, retention settings, a Data Processing
  Addendum, and SOC 2 Type 2. [11#8,15,17,19,20]

**05 / GPT-03**
- lo-1: Write a prompt that is clear, specific, gives context, sets tone,
  and includes examples. [13#3,5; 4#8,9]
- lo-2: Refine a prompt iteratively by reviewing the output and adjusting
  the input. [13#4]
- lo-3: Ask for verbatim excerpts with citations when the answer will be
  checked against a source. [4#7]
- lo-4: Recognize that input length is bounded and that the bound differs
  by plan and model. [7#3; 8#2,3]

**06 / GPT-04**
- lo-1: Treat output as a first draft, and verify quotes, figures,
  technical content, and document references against a source before
  relying on them. [10#7–9]
- lo-2: Use search-backed answers by following the cited links to the
  source rather than relying on the summary. [10#10,11]
- lo-3: Relate verification to the General Standards Rule: due professional
  care and sufficient relevant data. [1#14,15]
- lo-4: Document the review of AI output as firm policy, with counsel
  deciding the form of the record. [4#4–6]

**07 / GPT-05**
- lo-1: Apply the Confidential Client Information Rule: information is
  confidential by default, public information is not, and a client's name
  alone can be confidential. [1#1–5]
- lo-2: Describe the Code's two routes for third-party service providers —
  a confidentiality contract with reasonable assurance, or the client's
  specific consent — and the member's continuing responsibility.
  [1#6–12,16]
- lo-3: Recognize that state law may be more restrictive, using New
  Hampshire RSA 309-B:18, whose only general release is client permission
  and whose exceptions contain no service-provider clause. [1#13; 5#1–3]
- lo-4: Apply a firm policy that keeps client data out of individual-plan
  tools and de-identifies data before it enters any AI tool. [4#11–13]

**08 / GPT-06**
- lo-1: Carry a de-identified accounting task through prompt, output,
  verification, and refinement, and identify where the model's output
  required correction. [13#4; 10#7–12; 4#10,13]

## Sources on each module

`meta.sources` lists, on every lesson, only the files in `sources/gpt/`
that the index shows contributing at least one entry to that lesson's
objectives. Use the `Source` shape from `src/types.ts`; where it wants a
title, use the title as printed in the index's header for that file. The
two CPA.com selection guides and the print-layout enterprise capture appear
only where the index actually cites them.

## Lesson 03 section plan

For `GPT-01` only, set `meta.sections` and create the files under
`guide/03/`:

| id | file | role | title |
|---|---|---|---|
| front-matter | 00-front-matter.md | front_matter | How this course works |
| sec-01 | 01-generated-not-computed.md | body | Generated, not computed |
| sec-02 | 02-hallucination.md | body | Hallucination and fabricated citations |
| sec-03 | 03-knowledge-cutoff.md | body | The knowledge cutoff |
| sec-04 | 04-confidence.md | body | Confidence is not correctness |
| sec-05 | 05-calculation.md | body | When the model can calculate |
| glossary | 90-glossary.md | glossary | Glossary |

The front-matter file starts from the contract's "How this course works"
template, as `new-lesson.ts` already does. Each body file contains its
heading, then one HTML comment listing the index entries it will draw on —
`<!-- index: 10#1, 4#3 -->` — and a `TODO prose` line. Nothing else. The
glossary file contains its heading and a `TODO` line; `meta.glossaryTerms`
stays empty (`check` will WARN; that is correct for a plan).

Section-to-entry mapping: sec-01 → 10#1, 4#3; sec-02 → 10#2–4; sec-03 →
10#5; sec-04 → 10#6; sec-05 → 10#12, 4#3.

Lessons 04–08 get whatever sections the scaffold gives them and nothing
more. Their plans are later features, each written after the previous
lesson's prose exists, because what lesson 02 needs to say depends on what
lesson 01 already said.

## Accuracy records

`npm run new` creates `drafts/GPT-0N-review.md` for each lesson. This
feature may write to those files because it created them. Under "Learning
objectives", list each objective with its index references. Under
"Sources still needed", copy the Gaps bullets from the index that bear on
that lesson, verbatim. Touch no other section, and touch no other file
under `drafts/`.

## Verify
1. `npm run typecheck` clean.
2. `npm run check`. Eight lessons. ERRORs naming any GPT lesson block the
   feature. WARNs on GPT lessons are expected — empty glossary, no
   questions, body sections with no prose — list them in the changelog
   entry under Known gaps rather than fixing them. The 12 ATO warnings
   are unchanged.
3. `npm run generate -- --lesson 08 --dry-run` reports nothing to spend:
   the video lesson's scaffold blocks have no narration to voice. Do not
   run generate without `--dry-run`.
4. `git status` shows only: `src/lesson-03.ts` … `src/lesson-08.ts`,
   `src/questions-03.json` … `-08.json`, `src/lessons.ts`,
   `src/questions.ts`, `src/course.ts`, `guide/03/`, `guide/04/` … as the
   scaffold makes them, `drafts/GPT-01-review.md` … `GPT-06-review.md`,
   `CHANGELOG.md`. Nothing under `sources/`, nothing in
   `drafts/GPT-source-index.md`, nothing in lessons 01 or 02.
5. Paste back the full text of `src/lesson-03.ts` and
   `drafts/GPT-01-review.md` for review before committing.

## Changelog
One entry, numbered one past the last. Standards touched: read 3.01,
3.01.1, and 3.02.1 in the 2026 Statement under `docs/standards/` before
citing them for the objectives and descriptors. Under Decisions: the
objectives were rewritten to what the index sources, dropping a model
mechanism, "instruction drift", "Team", and a five-element prompt pattern
that no source names. Under Known gaps: the WARNs from Verify 2, and the
index's finding that lesson 05 will apply two confidentiality rules to a
chatbot neither rule mentions — a course position the prose must state as
such.

## Not this feature
Lesson 01's prose, its glossary terms, its questions. Next.
