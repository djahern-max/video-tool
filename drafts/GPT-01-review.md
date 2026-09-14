# GPT-01 — What the model gets wrong — accuracy record

This is where the content developer records reading the guide for
accuracy before the lesson ships (4.01.1 — technology was used in developing
it). Corrections to a text lesson stay nearly free, but what has to be
checked does not change: that the 7.02.5 role assignments are honest (nothing
excluded smuggled into `body`) and that any clips are additional learning,
not narration.

How to read it: for each section, the file, its role (which decides
whether its words are counted), and the sources relied on; then each
question with its sources and objective. The lesson data lives in
`src/lesson-NN.ts`, `src/questions-NN.json`, and `guide/NN/*.md`; edit
those files, not this one.

**Status, first draft (2026-09-13).** Unchecked.
`meta.status` is `"draft"`; export refuses it. The 4.02 independent content
review happens in superCPE, against the ingested package — not in this file.

Learning objectives (from `src/lesson-03.ts`):

Index references are to `drafts/GPT-source-index.md` as it stands in the
tree (regenerated over the final source set, changelog entry 25), by
file number and entry number as that index numbers them. The feature
spec that set these objectives was written against the previous
generation, which numbered files 6–11 differently; the references
below are translated to the current numbering. Files cited here:
4 = `cpacom-genai-toolkit.pdf`, 9 = `openai-does-chatgpt-tell-the-truth-2026-09-13.pdf`.

- **lo-1** — Explain that ChatGPT produces responses from patterns in its training data, so output is generated rather than computed. [index 9#1, 4#3]
- **lo-2** — Recognize the failure modes that matter in professional work: hallucination, fabricated citations, knowledge cutoff, and confidence that does not track correctness. [index 9#2–6]
- **lo-3** — State when calculation is reliable: only when the model uses a code tool. [index 9#12]


---

## Sections

Index references are to `drafts/GPT-source-index.md` (entry 25 numbering):
4 = `cpacom-genai-toolkit.pdf`, 9 =
`openai-does-chatgpt-tell-the-truth-2026-09-13.pdf`, 13 =
`openai-prompt-engineering-best-practices-2026-09-13.pdf` (glossary only).

**The three-way sentence rule** (from `current-feature.md`, spec for this
draft): every body sentence is *sourced* (states, in the course's words, a
claim the index carries as a numbered entry for file 4 or file 9),
*attributed* (reports what a named source says, where the claim is the
source's rather than the course's), or *connective* (transitions, headings,
sentences that introduce or summarise sourced ones, and statements about
what this course does or does not say). Anything else is `UNSOURCED`, quoted
below and in the judgment list, and left in the draft for the developer to
rule on. Sentence numbers are in reading order within the section, headings
excluded, as split at sentence-ending punctuation; the numbering is a
convenience for this record and is not in the guide text.

**Tally, whole lesson (body sections only):** 62 sentences — 22 sourced,
5 attributed, 32 connective, 3 flagged `UNSOURCED`. Two further flags sit
outside the body: the front matter's audience statement and the glossary's
*large language model* entry. Five flags in all, under the spec's stop
threshold of ten.

The `<!-- index: … -->` comment at the head of each body file was kept from
the section plan and updated to the entries the prose actually uses. It is
stripped before counting (docs/course-package.md, "How superCPE counts").

### front-matter — `00-front-matter.md` — role `front_matter` — excluded

The "How this course works" block is the template from the end of
`docs/course-package.md`, unmodified (4.05.3 item 4). The two opening
paragraphs were written for this feature. The first names the six lessons
from `COURSE_GPT.lessons`'s titles and this lesson's three topics from its
objectives; no course-level descriptor (field of study, level,
prerequisites, advance preparation) is typed here, per the spec, so nothing
in the prose can drift from `src/course.ts`. The second paragraph states
the lesson's sourcing method.

**Flags**
- `UNSOURCED` (descriptive) — "It is written for CPAs in public practice who
  use, or are deciding whether to use, ChatGPT in their work, and it assumes
  no prior experience with the tool." The audience statement. Confirm it
  matches how the course will be marketed and registered. Same flag class
  as ATO-01's front matter.

### sec-01 — `01-generated-not-computed.md` — role `body` — counted — 450 words — lo-1

**Index entries used, in order**
1. 9#1 — responses from patterns in training data; can be incorrect or
   misleading, "like any language model" (sentences 2, 3, 9, 16)
2. 9#2 — may sound confident even when wrong (sentences 4, 16)
3. 4#3 — "generated output, not computed answers" — **attributed** to Jeff
   Seibert, CEO of Digits, as quoted in the toolkit (sentence 11)
4. 9#12 — forward reference only, to section 05 (sentence 15, connective)

**Classification:** 5 sourced (2, 3, 4, 9, 16) · 1 attributed (11) ·
10 connective (1, 5–8, 10, 12–15) · 0 flagged.

Sentences 5–7 and 10 are boundary statements about what the sources do and
do not say; they rest on the index's Gaps bullet for LO 1 ("No document
explains how a large language model produces a response") and on file 9's
"Does not cover" note ("'Patterns in data it was trained on' is the whole
explanation"). They are classed connective because they state no fact
about the model. Sentence 12 is the course's own disclaimer on the
attribution; see J1.

**Flags** — none.

### sec-02 — `02-hallucination.md` — role `body` — counted — 402 words — lo-2

**Index entries used, in order**
1. 9#2 — sound confident even when wrong (sentence 1)
2. 9#3 — "hallucination" is OpenAI's term for responses that are not
   factually accurate (sentences 1–3)
3. 9#4 — fabricated quotes, studies, citations or references to
   non-existent sources (sentence 4)
4. 4#1 — toolkit: gets things wrong, makes things up, confident tone masks
   it — **attributed** (sentence 8)
5. 4#2 — toolkit's court-case example — **attributed** (sentence 9)
6. 9#9 — always verify quotes, data, technical information, references
   (sentence 12)

Entries 4#1, 4#2 and 9#9 are beyond the plan tag (9#2–4); all three are
file 4 or file 9 entries, which the sourcing rule permits. 9#9 is tagged
L04 in the index and is used here only to hand off to lesson 4.

**Classification:** 3 sourced (1, 4, 12) · 2 attributed (8, 9) ·
8 connective (2, 3, 5, 7, 10, 11, 13, 14) · 1 flagged (6).

Sentence 5 is a hypothetical, marked "purely as an illustration", and
states no fact about any standard or about the model's behaviour on it
(J2). Sentence 10 says the course adds nothing to the toolkit's example;
it does not claim the toolkit itself gives no details, because the index
does not say whether it does.

**Flags**
- `UNSOURCED` (interpretive) — "Nothing in the form of that citation says
  whether the paragraph exists, or whether it says what the response
  claims; a fabricated citation reads the same as a real one until someone
  goes and looks." The section's load-bearing sentence and the reason
  fabricated citations get their own heading. 9#4 establishes that
  fabricated citations occur; that they are indistinguishable on their face
  is the course's reasoning, stated by no source. Default: keep, as a
  consequence of what a citation is. The developer decides.

### sec-03 — `03-knowledge-cutoff.md` — role `body` — counted — 251 words — lo-2

**Index entries used, in order**
1. 9#5 — knowledge cutoff; responses do not incorporate later events unless
   tools are used (sentences 1, 3, 4, 11)
2. 9#10 — without search, responses come from training; with search, cited
   web sources (sentences 5, 11)
3. 9#9 — verify data (sentence 12)

**Classification:** 6 sourced (1, 3, 4, 5, 11, 12) · 0 attributed ·
7 connective (2, 6–10, 13) · 0 flagged.

Sentences 6–7 coin and label *staleness* as the course's own word, once,
as the spec directs; the definition is a restatement of 9#5's consequence,
not a new claim (J3). Sentences 8–9 say the course gives no cutoff date;
the index carries none. Sentence 10 is a hypothetical marked as such (J2).

**Flags** — none.

### sec-04 — `04-confidence.md` — role `body` — counted — 208 words — lo-2

**Index entries used, in order**
1. 9#6 — "Confidence isn't reliability"; high confidence in incorrect
   answers (sentences 1, 5, 6)
2. 9#2 — sound confident even when wrong (sentences 2, 6)
3. 4#1 — toolkit: confident, articulate, well-reasoned answers may mask the
   failing — **attributed** (sentences 3, 6)
4. 9#7 — OpenAI encourages users to approach ChatGPT critically and verify
   important information from reliable sources (sentence 7)

**Classification:** 5 sourced (1, 2, 5, 6, 7) · 1 attributed (3) ·
2 connective (8, 9) · 1 flagged (4).

Sentence 6 is a synthesis: it says the three failures described so far
share the property that, "on the sources' account", none announces itself
in the response's tone. Each component is sourced (9#2, 9#6, 4#1 for
confidence; 9#3–4 and 9#5 for the failures) but no source states the
generalisation. It is classed sourced with that qualifier and listed as
J4 for confirmation.

**Flags**
- `UNSOURCED` (framing) — "In ordinary professional life, tone carries
  information: a colleague who hedges is telling you something, and one
  who does not is telling you something else." A claim about how
  professionals read each other, made to set up the contrast in sentence 5.
  No source states it. Default: keep as framing; cut if it reads as an
  assertion the course would have to defend.

### sec-05 — `05-calculation.md` — role `body` — counted — 252 words — lo-3

**Index entries used, in order**
1. 9#12 — the tool "Enables accurate calculations, data visualizations,
   and structured logic" (sentences 2, 3)
2. 4#3 — "generated output, not computed answers … math or financial
   analysis" — **attributed** (sentence 4)
3. 9#9 — always verify data (sentence 7)

**Classification:** 3 sourced (2, 3, 7) · 1 attributed (4) ·
5 connective (1, 5, 8, 9, 10) · 1 flagged (6).

Sentence 2 names the tool as the page prints it, "Code interpreter / Data
analysis". That name is not in the index entry's quote; it was read from
the page at the entry's location (p. 2, the tools table) for this draft,
because the spec asks for "whatever name file 9 uses for it" (J5).
Sentence 3 states lo-3's claim in the index's wording — accuracy attaches
to the tool. The page's row says the tool "enables accurate calculations";
the "only when" in the objective and in the index's claim is the index's
reading of that row, not the page's word (J5).

**Flags**
- `UNSOURCED` (interpretive) — "A number that came out of a conversation
  in which the tool did not run is generated text about a number, not a
  calculation; if the number matters, either the tool computed it or it is
  recomputed somewhere else before it is relied on." The lesson's one
  practical rule, synthesised from 9#12 (accuracy attaches to the tool),
  4#3 (generated, not computed — attributed) and 9#9 (verify data). No
  source states the rule as a rule. Default: keep; it is what lo-3 exists
  to teach. The developer decides whether the synthesis is fair to its
  three parts.

### glossary — `90-glossary.md` — role `glossary` — excluded — 326 words

Six terms, mirrored in `meta.glossaryTerms` with `sectionId: "glossary"`;
the file's definitions carry a section pointer the module's do not.

1. **Code interpreter / Data analysis** — 9#12, name as the page prints it
   (J5).
2. **Hallucination** — 9#3, forms from 9#4.
3. **Knowledge cutoff** — 9#5.
4. **Large language model (LLM)** — see flag below.
5. **Prompt** — 13#1, an index entry for a file that is not among this
   lesson's `meta.sources` (J6).
6. **Staleness** — the course's own word, and the entry says so (J3).

**Flags**
- `UNSOURCED` (boundary only) — the *large language model* entry. The
  index cannot define the term from any file: file 4's glossary says LLMs
  are "trained on vast amounts of data" and stops (index, file 4 "Does not
  cover"), and file 9 says only "like any language model". The entry
  therefore describes the term by 9#1 and 4#3's usage and says in its own
  text that no source defines it. Confirm the entry is honest as written
  rather than supplying a definition from general knowledge, which the spec
  forbids.

## Questions

## Judgment list — OPEN

Three `UNSOURCED` flags in the body (sec-02 sentence 6, sec-04 sentence 4,
sec-05 sentence 6), one in the front matter (audience), one in the glossary
(*large language model*): five in all, each quoted in its section above.
The items below are the judgments the draft had to make that a flag does
not capture.

**J1 — the attribution wording for file 4 entry 3.** "Generated output,
not computed answers" is a quoted executive (Jeff Seibert, CEO of Digits)
in the 2023 CPA.com toolkit, not a finding of the toolkit. The draft
reports it as a quotation in sec-01 (sentence 11), disclaims it in the next
sentence, and uses it again in sec-05 (sentence 4) as "the toolkit's quoted
executive". The lesson's title and lo-1's "generated rather than computed"
rest on that phrase. Confirm that the wording keeps the claim the
executive's and that the course is comfortable titling a section after a
quotation it does not itself assert. The index's currency note on file 4
(2023; "must not be the source for any current product behaviour") is
respected: entries 1–3 are general statements about generative AI, not
product behaviour.

**J2 — two hypotheticals.** Sec-02 sentence 5 ("a response cites a numbered
paragraph of an accounting standard") and sec-03 sentence 10 ("a figure
that is revised every year"). Both are marked "purely as an illustration"
and state no fact about any standard, figure, or the model's behaviour on
either. The spec allows exactly this. Confirm each reads as plainly
hypothetical to a participant and not as a report.

**J3 — "staleness" is coined.** The spec says it is the course's word and
to say so once; sec-03 sentences 6–7 do, and the glossary entry repeats
that neither source uses it. Confirm the definition ("a response that
reflects the training data as of the cutoff and not what has happened
since") is no wider than 9#5.

**J4 — sec-04 sentence 6 is a synthesis.** "None of them announces itself
in the tone of the response" generalises 9#2, 9#6 and 4#1 across the three
failures described in sections 02–03. Classed sourced with the qualifier
"on the sources' account"; not flagged, because every component is
sourced. Decide whether that is the right class or whether it should carry
a flag.

**J5 — the tool's name and the objective's "only".** The index entry 9#12
quotes the tool's description, not its name. The name "Code interpreter /
Data analysis" was read from the page at that location (p. 2) for this
draft; the source file was opened for that one purpose. Also on that page
and not in the index: "Depending on your plan, ChatGPT may have access to
tools", and a way to check whether search is enabled. Neither is used. The
objective lo-3 and the index's claim say calculation is reliable *only*
when the tool is used; the page's row says the tool "enables accurate
calculations" and does not say "only". The draft (sec-05 sentence 3)
phrases it as the page attaching accuracy to the tool rather than to the
ordinary response. Confirm that reading, or reword lo-3.

**J6 — the glossary's *prompt* traces outside this lesson's sources.** Its
definition is index entry 13#1, from the prompt-engineering page, which is
not in `src/lesson-03.ts`'s `meta.sources`; the spec puts every `meta`
change other than `glossaryTerms` out of scope, so the source list was not
extended. Decide whether to add file 13 to this lesson's sources in a later
feature, move the term to lesson GPT-03's glossary, or leave it with its
citation as written.

**J7 — the page lists hallucination forms and limitations the index does
not carry.** At entry 9#4's location the page also lists "Incorrect
definitions, dates, or facts" and "Overconfident answers to ambiguous or
complex questions"; among limitations it also lists "Lack of access" and
"Bias and over-simplification". None is an index entry, so none is used.
The index is the human's and was not edited. Decide whether the index
should be extended before lesson 4 draws on this page again.

**J8 — sections 02, 03 and 04 draw on entries beyond their plan tags**
(4#1, 4#2, 9#7, 9#9, 9#10). All are file 4 or file 9 entries, which the
sourcing rule allows; the plan tags in the `<!-- index -->` comments were
updated to match. Confirm the widening is acceptable.

**J9 — the front matter names the six lessons** by the titles in
`COURSE_GPT.lessons`. If a lesson is retitled, that paragraph goes stale;
nothing checks it. Decide whether to keep the list or replace it with a
pointer to the course outline.

**J10 — body length.** The five sections total 1,563 counted words against
the spec's target of about 2,000, with sections 03–05 under the 350-word
floor. The spec says to write fewer where a section can be written
honestly in fewer, and these could not be lengthened without unsourced
material. Confirm the shortfall is acceptable.

## Sources still needed

From the Gaps section of `drafts/GPT-source-index.md` (entry 25), the
bullets that bear on this lesson, verbatim:

- **LO 1, first half, is still mostly unsourced.** No document explains how
  a large language model produces a response. The nearest are "patterns in
  data it was trained on" (file 9), "generated output, not computed
  answers" (file 4, a quoted CEO), the two-stage training account (file
  10, entry 21), and the context-window and input-maximum rows of the two
  grids (files 6 and 7), which attach figures to plans but do not carry
  the footnote explaining what shares the window. "Instruction drift"
  appears in no source. "Staleness" is supported only as the knowledge
  cutoff on file 9. Every ✓ on LO 1 is from a web page or the 2023
  toolkit; L01's ✓ from file 1 is only the Code's pointer to AI guidance it
  does not contain.
