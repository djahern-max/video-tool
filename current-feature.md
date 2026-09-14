# Current Feature

## GPT-05 "Confidentiality and client data" in full

> Changelog entry 32 (theme v2 took 31).

## Goal
Lesson GPT-05 (`src/lesson-07.ts`, `guide/07/`, `src/questions-07.json`)
has body prose, front matter, glossary, questions, and its review record,
drafted by the feature-29/30 procedure. Stays `"draft"`. After this, every
text lesson of course GPT exists and `check` reports rule-1 ERRORs only on
lesson 08.

## Why this one runs alone
Its sources are the AICPA Code (1.700.001, file 1) and NH RSA 309-B:18
(file 5), plus the toolkit's policy guidance (file 4). A study guide that
misstates what a conduct rule or a statute says is the failure 4.01.1
exists to catch, and a participant will act on it. So, in addition to the
three-way sentence rule:

- **Rule text is reported as the rule's.** What the Code says, the statute
  says, or the toolkit recommends is attributed or quoted from the index
  entry. Paraphrase does not widen or narrow it.
- **The course's position is labelled as the course's.** The changelog
  (entry 26) records that whether entering client information into ChatGPT
  is a "disclosure" under the Code, or a "voluntary disclosure" under the
  statute, is the author's inference. State it once, under its own heading,
  as the position this course takes — never as what the Code or the
  statute says. Flag any sentence that blurs the line.
- **The statute has no service-provider clause.** Do not teach the Code's
  contract-with-reasonable-assurance route as sufficient for a New
  Hampshire licensee; the guide says the state rule is narrower and that
  client permission is its only general release, and stops there. The
  course does not state the position of any other state.
- **No legal advice.** No sentence tells a participant what is or is not
  permitted in their situation. The guide states the rules, states the
  course's position, and states the toolkit's policy practices (lo-4).
- Nothing on the CPA.com toolkit's 2023 date may be used for any current
  product behaviour (index currency note on file 4).

## Procedure
Feature-30 Parts 1–6 unchanged: section plan (four to six body sections
with index tags), prose, front matter (template untouched; opening is
scope, audience, topics; no lists, descriptors, or counts), glossary
(traced or flagged; `meta.glossaryTerms`; `meta.sources` extended as
supporting where needed), questions (one review per section with feedback
both ways; at least one assessment per objective lo-1–lo-4; correct answers
stated in the guide and traced; no distractor the sources also support),
record (`drafts/GPT-05-review.md`, rulings written in, list marked
`CLOSED (default rulings; developer read pending)`).

For questions specifically: no question may have a correct answer that
depends on the course's inference. Test what the rules say and what the
toolkit recommends; the inference is taught, not examined.

Stop and report if flagged sentences exceed ten.

## Out of scope
- GPT-06 (lesson 08). Next feature — a video lesson, different shape.
- `meta.status`; `sources/`; any index edit. If a needed rule passage is
  not in the index, flag the sentence; do not open the source to add it.
- Web research or general knowledge, including any other state's law.

## Read first
- `CLAUDE.md`; `docs/course-package.md`
- `CHANGELOG.md` entry 26, the GPT-05 paragraph
- `drafts/GPT-source-index.md` — files 1, 4, 5 in full
- `src/lesson-07.ts`; `guide/06/` and `drafts/GPT-04-review.md` as the
  shape to match

## Verify
1. `npm run typecheck` clean.
2. `npm run check`: lesson 07 no ERROR, `[draft]` WARN only; remaining
   errors rule-1 on lesson 08 only.
3. Sentence counts and per-section word estimates.
4. List every sentence that states the course's position, by section and
   number, so the developer's read can go straight to them.
5. `git status` limited to lesson 07's files, its review record,
   `CHANGELOG.md`, and the spec rotation files.
6. One report. Then commit.

## Changelog
Entry 32. Standards touched: 4.01.1, 3.01, 5.01.2.1, 5.01.2.2, after
reading them. Under Decisions: how rule text and course position were kept
apart, and why the inference is not examined. Under Known gaps: draft and
unread; flags; anything the index could not source.

## Not this feature
GPT-06 (video): script, on-screen task walkthrough, narration blocks,
`avIsAdditionalLearning`, generate (paid, new voice), render, measured
duration. Then export of the whole course.
