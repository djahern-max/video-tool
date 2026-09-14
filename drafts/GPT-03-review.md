# GPT-03 — Prompting for accounting tasks — accuracy record

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

Drafted 2026-09-14 (changelog entry 30): six body sections, front matter,
glossary, ten questions. Every flag and judgment item below carries a
recommended ruling under the CLAUDE.md Rulings rule; the judgment list is
closed on those defaults, and the content developer's 4.01.1 read of the
guide text is still ahead. Still unchecked.

Learning objectives (from `src/lesson-05.ts`):

Index references are to `drafts/GPT-source-index.md` as it stands in the
tree (regenerated over the final source set, changelog entry 25), by
file number and entry number as that index numbers them. The feature
spec that set these objectives was written against the previous
generation, which numbered files 6–11 differently; the references
below are translated to the current numbering. Files cited here:
4 = `cpacom-genai-toolkit.pdf`, 6 = `openai-chatgpt-pricing-business-2026-09-13.pdf`, 7 = `openai-chatgpt-pricing-personal-2026-09-13.pdf`, 13 = `openai-prompt-engineering-best-practices-2026-09-13.pdf`.

- **lo-1** — Write a prompt that is clear, specific, gives context, sets tone, and includes examples. [index 13#3,5; 4#8,9]
- **lo-2** — Refine a prompt iteratively by reviewing the output and adjusting the input. [index 13#4]
- **lo-3** — Ask for verbatim excerpts with citations when the answer will be checked against a source. [index 4#7]
- **lo-4** — Recognize that input length is bounded and that the bound differs by plan and model. [index 6#3; 7#2,3]


---

## Sections

Index references are to `drafts/GPT-source-index.md` (entry 25 numbering,
extended for file 9 in entry 29 and for file 8 in entry 30; this lesson
cites neither extension in its body): 4 = `cpacom-genai-toolkit.pdf`,
6 = `openai-chatgpt-pricing-business-2026-09-13.pdf`, 7 =
`openai-chatgpt-pricing-personal-2026-09-13.pdf`, 13 =
`openai-prompt-engineering-best-practices-2026-09-13.pdf`. One question's
distractor cites 8#10 (q-03) and two cite files 9 and 12 for facts
lesson 1 or 2 taught (q-04, q-08, q-09); those files are not in this
lesson's `meta.sources` because no body sentence relies on them.

**The three-way sentence rule** is feature 27's, unchanged: every body
sentence is *sourced* (states, in the course's words, a claim the index
carries as a numbered entry for one of this lesson's files), *attributed*
(reports what a named source says, where the claim is the source's rather
than the course's), or *connective* (transitions, headings, sentences that
introduce or summarise sourced ones, and statements about what this lesson
does or does not say). Anything else is `UNSOURCED`, quoted below, and
left in the draft. Sentence numbers are in reading order within the
section, headings excluded, split at sentence-ending punctuation followed
by a capital, quote or asterisk; the numbering is a convenience for this
record and is not in the guide text. Under that split a quoted
hypothetical prompt of three sentences counts as three (sec-05, 6–8).

**The no-method-voice rule** is feature 28's, applied from the start: the
guide teaches and does not describe its own sourcing restraint, count its
sources, or explain why a heading exists. What it does say about its own
scope is limited to handoffs ("lesson 4 is about checking it") and to
statements of what the pages do not state, where a participant would
otherwise assume something; those are listed under J5 for the developer
to cut if they read as method.

**Tally, whole lesson (body sections only):** 100 sentences — 28 sourced,
0 attributed, 70 connective, 2 flagged `UNSOURCED`. Four further flags sit
outside the body: one in the front matter (audience) and three in the
glossary (*Context window*, *GPT Instant / GPT Reasoning*, *Input
maximum*), all boundary flags. Six flags in all. The connective share is
high because the sources are short — file 13 is under 300 words of
substance and the toolkit's five entries are one sentence each — and the
lesson's work is applying them (J2, J3, J7). The attributed count is zero
because the toolkit entries used here are CPA.com's own advice, not a
quoted third party (J6).

**Section plan.** Written from lesson 05's four objectives and the index
entries the scaffold cites for them (13#3,5 and 4#8,9 for lo-1; 13#4 for
lo-2; 4#7 for lo-3; 6#3 and 7#2,3 for lo-4), plus entries of the same
files that the prose needed: 13#1, 13#2, 13#6, 4#10, 6#2, 6#4, 6#11, 7#4,
7#9. Six sections: one introductory (sec-01, the definitions and the
toolkit's "only as good as the prompt"), two for lo-1 (sec-02 clarity,
specificity, context; sec-03 tone and examples), one each for lo-2
(sec-04), lo-3 (sec-05) and lo-4 (sec-06). The `<!-- index: … -->`
comment at the head of each body file lists the entries the prose uses;
it is stripped before counting. Two comments also note a page-read
sentence (J1).

Word counts are `npm run check`'s estimate as of this draft; superCPE's
count is authoritative.

### front-matter — `00-front-matter.md` — role `front_matter` — excluded — 342 words

The "How this course works" block is the template from the end of
`docs/course-package.md`, unmodified (4.05.3 item 4). The opening
paragraph names the course, this lesson's ordinal, and the lesson's
topics from its four objectives; no lesson list, no course-level
descriptor, no source count. The second paragraph names the lesson's
sources by description ("help-center page on prompt engineering best
practices, the personal and business tabs of its pricing page, and the
CPA.com Generative AI Toolkit") and gives no number.

**Flags**
- `UNSOURCED` (descriptive) — "It is written for CPAs in public practice
  who use, or are deciding whether to use, ChatGPT in their work, and it
  assumes no prior experience with the tool." The audience statement, in
  the same words as GPT-01's and GPT-02's; the developer ruled keep on
  GPT-01's on 2026-09-14. Recommended ruling: keep as written — course
  reasoning, not a sourced claim; consistent with the two earlier rulings.

### sec-01 — `01-what-a-prompt-is.md` — role `body` — counted — 355 words — introductory (lo-1)

**Index entries used, in order**
1. 13#1 — a prompt is a text input that initiates a conversation or
   triggers a response; can be image or audio (sentence 3)
2. 13#2 — prompt engineering is designing and optimizing input prompts to
   guide responses (sentence 4)
3. 4#8 — generative AI is only as good as the prompt that drives it
   (sentence 8)
4. 13#6 — OpenAI's API prompting guides apply to ChatGPT too (sentence 12)

**Classification:** 4 sourced (3, 4, 8, 12) · 0 attributed · 11
connective (1, 2, 5, 6, 7, 9, 10, 11, 13, 14, 15) · 0 flagged.

Sentence 6 glosses the two verbs of 13#2's definition ("designing …
optimizing") and sentence 10 restates 4#8 from the user's side; both are
listed under J2. Sentence 13 is a boundary statement (the linked guides
are not in the set: file 13's "What it is" and "Does not cover"). Sentence
14 names the page's three practices and the toolkit's two; the three are
entries 13#3, 13#4 and 13#5 and the index's own summary of the page
("the page's three practices are clarity, iteration and tone", file 13
"Does not cover"), and the two are 4#9 and 4#7. Sentence 8's description
of the toolkit ("a 2023 introduction to generative AI written for
accounting and finance professionals") is the index's "What it is" for
file 4, in the words GPT-01 used.

**Flags** — none.

### sec-02 — `02-clear-specific-in-context.md` — role `body` — counted — 378 words — lo-1

**Index entries used, in order**
1. 13#3 — clear, specific, enough context for the model to understand
   what you are asking (sentences 2, 10, 12)
2. The sentence that follows 13#3 on the page, p. 2 — "Avoid ambiguity
   and be as precise as possible to get accurate and relevant responses"
   (sentences 2, 5, 9; read from the page, J1)

**Classification:** 5 sourced (2, 5, 9, 10, 12) · 0 attributed · 10
connective (1, 3, 4, 6, 7, 8, 11, 14, 15, 16) · 1 flagged (13).

Sentences 6 and 8 are hypothetical prompts that state no fact ("Tell me
about leases"; "Summarise this in five sentences …"), listed under J3.
Sentences 11 and 15 are the lesson's glosses of what "context" and the
three parts do, listed under J2. Sentence 14 is a boundary statement
resting on file 13's "Does not cover" ("The page says nothing about
whether a better prompt yields a truer answer"), classed connective (J5).

**Flags**
- `UNSOURCED` (interpretive) — "A request a colleague would understand
  may still fall short of it, because the colleague knows the client, the
  engagement, and the firm's house style, and the model knows none of
  that unless the prompt says it." The application of 13#3's test
  ("enough context for the model to understand") that lo-1 exists to
  teach: the page states the test, and this sentence says why a
  professional's habitual shorthand fails it. No source says what the
  model does or does not know about a firm; lesson 1's "patterns in
  training data" (9#1) is the nearest, and file 9 is not this lesson's.
  Recommended ruling: keep — it is the sentence a participant needs, and
  it adds no fact beyond the page's condition; cut the final clause ("and
  the model knows none of that unless the prompt says it") if the
  developer reads it as a claim about the model rather than about the
  prompt.

### sec-03 — `03-tone-and-examples.md` — role `body` — counted — 306 words — lo-1

**Index entries used, in order**
1. 13#5 — tone is set with descriptive adjectives; the page's list of
   words (sentence 3)
2. 4#9 — giving the model examples improves the output (sentence 7)

**Classification:** 2 sourced (3, 7) · 0 attributed · 12 connective (1,
2, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14) · 0 flagged.

The section is two sourced sentences and their application. Sentences 5
and 10 are illustrations that state no fact (a client draft asked for as
formal; a letter, a row, a point as examples), listed under J3. Sentences
8 and 14 are glosses (an example shows rather than describes; a better
first response is one that is refined rather than discarded), listed
under J2. Sentence 13 ("Neither makes the answer correct") is a boundary
statement resting on the same "Does not cover" note as sec-02 sentence
14 (J5). Sentence 11 is a handoff to lesson 5 and to sec-05.

**Flags** — none.

### sec-04 — `04-refining-by-iteration.md` — role `body` — counted — 335 words — lo-2

**Index entries used, in order**
1. 13#4 — start with an initial prompt, review the response, refine the
   prompt based on the output (sentences 2, 18)
2. The sentence that follows 13#4 on the page, p. 2 — "Adjust the
   wording, add more context, or simplify the request as needed to
   improve the results" (sentence 3; read from the page, J1)
3. 13#2 — designing and optimizing (sentence 16, the back-reference)

**Classification:** 4 sourced (2, 3, 16, 18) · 0 attributed · 14
connective (1, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 17) · 0 flagged.

Sentences 5–7 gloss the page's three refinements by tying each to a
part of sec-02 or sec-03 (J2). Sentences 8–11 are two hypothetical
rounds that state no fact (J3). Sentence 15 ("A prompt refined on the
strength of a response that has not been read closely is refined toward
whatever the response happened to be") is the lesson's reasoning about
the page's middle step, classed connective and listed under J2 as the
one gloss in this section the developer may read as a claim. Sentence
18's "puts no number on how many rounds" is what the page does not say.

**Flags** — none.

### sec-05 — `05-asking-for-verbatim-excerpts.md` — role `body` — counted — 388 words — lo-3

**Index entries used, in order**
1. 4#7 — prompting for verbatim excerpts mimics the way a human
   researcher gathers information; the index's claim adds "with
   citations so the human checks the source rather than the summary"
   (sentences 3, 4, 5, 11)
2. 4#10 — any example that references uploading data requires all
   identifiable information to be removed first (sentence 16)

**Classification:** 5 sourced (3, 4, 5, 11, 16) · 0 attributed · 12
connective (1, 2, 6, 7, 8, 9, 10, 13, 14, 15, 17, 18) · 1 flagged (12).

Sentence 5 states the citation half of 4#7's claim; the quote under that
entry does not contain the word "citation", the claim does, and the
toolkit's example prompts on the same page (p. 11) each ask for "a
citation at the end of each quote" (J4). Sentences 6–8 are one
hypothetical prompt, split three ways by the numbering rule; it states no
fact and is modelled on the shape of the toolkit's prompts without
reproducing one (J3). Sentence 14 hands lo-3's condition ("when the
answer will be checked against a source") to lesson 4. Sentence 17 is a
boundary statement: 4#10 is the toolkit's note on its own use cases.

**Flags**
- `UNSOURCED` (interpretive) — "A summary would have to be taken on
  trust; an excerpt with a citation is either found in the document at
  the cited place or it is not, and lesson 1 said what to make of a
  citation that cannot be found." The reason the practice works, in the
  course's words: 4#7 says the human researcher gathers information to
  reach conclusions, and 9#4 (lesson 1's, not this lesson's file) names
  fabricated citations as a hallucination. No entry states that an
  excerpt is checkable where a summary is not. Recommended ruling: keep
  — it is the sentence that makes lo-3 a reason rather than a habit, and
  it states no fact about the tool; cut "and lesson 1 said what to make
  of a citation that cannot be found" if the developer prefers the
  section not to lean on a file the lesson does not list.

### sec-06 — `06-how-much-can-go-in.md` — role `body` — counted — 440 words — lo-4

**Index entries used, in order**
1. 6#2 — Business Instant context window 54K; Enterprise 128K (sentences
   3, 4, 6)
2. 6#3 — Business Instant input maximum about 40 pages (sentences 3, 4, 7,
   8)
3. 6#4 — both business plans: Reasoning context 256K, input maximum about
   320 pages (sentences 3, 9)
4. 7#2 — Instant context window 27K on Free, 54K on Go (sentence 6)
5. 7#3 — Free Instant input maximum about 12 pages (sentences 7, 8)
6. 7#4 — Pro Reasoning input maximum about 680 pages, the largest on
   either grid (sentence 10)
7. 6#11 — file uploads included on Business (sentence 17)
8. 7#9 — file uploads limited on Free, included from Go up (sentence 17)

**Classification:** 8 sourced (3, 4, 6, 7, 8, 9, 10, 17) · 0 attributed ·
11 connective (1, 2, 5, 11, 12, 13, 14, 15, 16, 18, 19) · 0 flagged.

Sentence 3's row labels ("total context window", "input maximum", "GPT
Instant", "GPT Reasoning") are the cell labels quoted in entries 6#2–4
and 7#2–4. Sentence 4's "which the grid does not explain" and sentence
15's "the footnote its input-maximum row points to" rest on file 6's and
7's "Does not cover" ("Footnotes … were not captured"); sentence 15's "the
page states no date" is both files' "Date stated: not stated". Sentence
8's "more than three times" is arithmetic over 7#3 and 6#3 (40 ÷ 12);
sentence 11's "a factor of several" is 6#4 over 6#3 (320 ÷ 40) — both
listed under J4. Sentence 18 rests on file 7's "Does not cover" ("What
'Limited' means for any row … is not in the file"). Sentences 13 and 14
are the lesson's glosses of what the figures mean (J2). The section
states no price, no model description, and nothing about what the K
figure counts, because no file does (index Gaps).

**Flags** — none.

### glossary — `90-glossary.md` — role `glossary` — excluded — 477 words

Ten terms, mirrored in `meta.glossaryTerms` with `sectionId: "glossary"`;
the file's definitions carry a section pointer the module's do not. The
preamble says three terms are grid row labels the grid does not define,
without a count of sources.

1. **Context window** — 6#2, 6#4, 7#2; see flag below.
2. **Examples (in a prompt)** — 4#9.
3. **File uploads** — 6#11, 7#9; "limited" undefined per file 7's "Does
   not cover".
4. **GPT Instant / GPT Reasoning** — 6#2, 6#4, 7#2, 7#4 (the names as the
   cells print them); see flag below.
5. **Input maximum** — 6#3, 6#4, 7#3, 7#4; see flag below.
6. **Iterative refinement** — 13#4.
7. **Prompt** — 13#1. GPT-01's glossary carries the same term from the
   same entry; terms need only be unique within a manifest.
8. **Prompt engineering** — 13#2.
9. **Tone** — 13#5.
10. **Verbatim excerpt** — 4#7.

**Flags**
- `UNSOURCED` (boundary only) — the *Context window* entry. It locates
  the term as a grid row and gives the captured range; it does not say
  what the figure counts or what K stands for, because no file does
  (the footnote that would was not captured, files 6 and 7 "Does not
  cover"). Recommended ruling: keep as written — a definition from
  general knowledge is what the spec forbids; same class as GPT-02's
  *Workspace admin*.
- `UNSOURCED` (boundary only) — the *GPT Instant / GPT Reasoning* entry.
  The grid names the two models in its row labels and describes neither;
  the entry says so. Recommended ruling: keep as written.
- `UNSOURCED` (boundary only) — the *Input maximum* entry. Its figures
  are sourced (6#3, 6#4, 7#3, 7#4); what the row's footnote says is not
  in the set, and the entry says so. Recommended ruling: keep as written.

## Questions

Written into `src/questions-05.json`. Ten questions: six review, one
after each body section (5.01.2.1), and four assessment, one per
objective (6.01.2, the 75 percent floor is met at one per objective).
Every question is multiple choice with four choices; every feedback
string says why the correct choice is correct and why each of the other
three is wrong on the sources' account, and names the section to re-read
(5.01.2.2). The count is what the text honestly supports, not a minimum;
minimums are superCPE's, from course credit. Each question's `_source`
field in the JSON repeats the entries below.

| id | kind | placed / measures | index entries | sentence in the guide that answers it |
|---|---|---|---|---|
| q-01 | review | after sec-01 | 13#2, 13#1 | sec-01 s4: "The same page defines prompt engineering as the process of designing and optimizing input prompts to effectively guide a language model's responses." |
| q-02 | review | after sec-02 | 13#3 and the following sentence (J1); 13#1 (distractor) | sec-02 s2: "… ensure your prompts are clear, specific, and provide enough context for the model to understand what you are asking, and it adds: avoid ambiguity and be as precise as possible …" |
| q-03 | review | after sec-03 | 13#5, 4#9; 8#10 (distractor) | sec-03 s3 and s7: "… use descriptive adjectives to indicate the tone … formal, informal, friendly, professional, humorous, or serious." "… providing the model with examples helps get a better output." |
| q-04 | review | after sec-04 | 13#4 and the following sentence (J1); 12#5 (distractor) | sec-04 s2–3: "… start with an initial prompt, review the response, and refine the prompt based on the output. It then names three kinds of refinement: adjust the wording, add more context, or simplify the request …" |
| q-05 | review | after sec-05 | 4#7; 6#3, 7#3 (distractor) | sec-05 s4–5: "… by prompting the model to return verbatim excerpts, you can mimic the way a human researcher gathers information in order to reach conclusions more efficiently. A prompt of that kind asks for the excerpts with a citation …" |
| q-06 | review | after sec-06 | 7#3, 6#3; 6#4, 7#4 (distractor) | sec-06 s7: "The input maximum for the same model is about 12 pages of text on Free and about 40 pages on Business." |
| q-07 | assessment | lo-1 | 13#3 (and following sentence), 13#5, 4#9 | sec-02 s2, sec-03 s3 and s7 (above); the four prompts in the choices are hypothetical (J3). |
| q-08 | assessment | lo-2 | 13#4 (and following sentence); 6#3, 7#3, 9#2 (distractors) | sec-04 s2–3 (above) and s6: "*Add more context* is section 02's third part: if the response would suit a general reader and not the actual one, the actual reader goes into the prompt." |
| q-09 | assessment | lo-3 | 4#7; 9#6 (distractor) | sec-05 s4–5 (above) and s11: "… the human reaches the conclusion, and the model gathers the passages." |
| q-10 | assessment | lo-4 | 7#3, 6#3, 6#4, 7#4; files 6–7 "Does not cover" (distractor) | sec-06 s7, s9, s10: "… about 12 pages of text on Free and about 40 pages on Business." "… an input maximum of about 320 pages of text." "… the Pro plan's Reasoning input maximum is about 680 pages …" |

**Judgments on the questions**, with recommended rulings:

- **Q1 — q-07's choices are four hypothetical prompts.** None states a
  fact; the correct one is correct because it carries each practice the
  section sourced, and the feedback names the entry behind each. The
  "engagement letter" setting is a plainly hypothetical accounting
  context with no accounting content. Recommended ruling: accept.
- **Q2 — three distractors rest on lessons 1 and 2.** q-03 (b) uses the
  switch label (8#10), q-04 (d) uses the feedback override (12#5), q-08
  (d) and q-09 (c) use confidence-is-not-reliability (9#2, 9#6). Each is
  a fact the course has taught and the index carries; none is in this
  lesson's `meta.sources`, which lists what the body relies on.
  Recommended ruling: accept; add files 8, 9 and 12 as supporting if the
  developer wants every entry a question cites to appear in the lesson's
  source list.
- **Q3 — q-02 and q-04 test page-read sentences** ("avoid ambiguity …";
  "adjust the wording …"), the J1 reading. Recommended ruling: accept
  with J1; if J1 is overruled, the correct choices of both questions
  still stand on 13#3 and 13#4 alone, and the feedback's added clauses
  are cut.
- **Q4 — one assessment question per objective.** lo-1 names five
  elements, and q-07 measures them together in one prompt rather than
  one at a time. Recommended ruling: accept; the count the course needs
  is superCPE's.

## Judgment list — CLOSED (default rulings; developer read pending)

Two `UNSOURCED` flags in the body (sec-02 sentence 13, sec-05 sentence
12), one in the front matter (audience), three in the glossary (*Context
window*, *GPT Instant / GPT Reasoning*, *Input maximum*): six in all, each
quoted in its section above with its recommended ruling. The items below
are the judgments the draft had to make that a flag does not capture.
Under the CLAUDE.md Rulings rule each recommendation is the ruling unless
the content developer's 4.01.1 read of the guide text says otherwise;
that read is still ahead.

**J1 — two sentences read from the page at an entry's location.** File
13's page 2 puts one further sentence under each of two of its headings:
after 13#3's quote, "Avoid ambiguity and be as precise as possible to
get accurate and relevant responses"; after 13#4's quote, "Adjust the
wording, add more context, or simplify the request as needed to improve
the results." Neither is an index entry. Both were read from the page
for this draft, in the same way GPT-02 J1 read the switch label and
GPT-01 J5 read the tool's name, because lo-1 needs the page's own word
for the fault ("ambiguity") and lo-2 needs the page's own three moves.
Used in sec-02 sentences 2, 5 and 9, sec-04 sentence 3, and the feedback
of q-02, q-04, q-07 and q-08; classed sourced. Recommended ruling: accept
— an index entry for each would be the tidy fix, exactly as entry 30's
8#10 was for GPT-02's J1, and index edits beyond Part 0 are outside this
feature.

**J2 — glosses classed connective.** The sources are short and the
lesson's work is applying them, so a number of sentences restate an
entry's meaning in the course's words without adding a fact: sec-01
sentences 6 and 10; sec-02 sentences 11 and 15; sec-03 sentences 8 and
14; sec-04 sentences 4–7 and 15; sec-06 sentences 13 and 14. Each is
listed in its section. Sentence 15 of sec-04 ("refined toward whatever
the response happened to be") is the one the developer is most likely to
read as a claim. Recommended ruling: accept the class; reclassify any
the developer reads as a fact about the tool as a flag, and cut it if
the section reads as well without it.

**J3 — hypothetical illustrations.** The spec allows a plainly
hypothetical illustration that states no fact and says to flag when in
doubt. Seven are in the body: sec-02 sentences 6 and 8 (two contrasting
prompts), sec-03 sentences 5 and 10 (a client draft; a letter, a row, a
point), sec-04 sentences 8–11 (two refinement rounds), sec-05 sentences
6–8 (one prompt asking for excerpts), plus the four prompts in q-07's
choices. None states an accounting fact; the nearest is "Tell me about
leases", which is only an example of an ambiguous request. Sec-05's
prompt is modelled on the shape of the toolkit's example prompts (p. 11)
without reproducing any of their subject matter. Recommended ruling:
accept all; cut any the developer reads as teaching something the
sources do not.

**J4 — arithmetic and a claim's gloss.** Sec-06 sentence 8 ("more than
three times as much") and sentence 11 ("a factor of several") are
arithmetic over sourced figures (40 ÷ 12; 320 ÷ 40) and state no new
fact. Sec-05 sentence 5 states the citation half of 4#7's *claim*
("with citations so the human checks the source rather than the
summary"), which is not in the entry's forty-word quote but is in the
toolkit's example prompts on the same page ("with a citation at the end
of each quote"). Recommended ruling: accept both.

**J5 — boundary statements left in the body.** Sec-01 sentence 13 (the
linked guides), sec-02 sentence 14 and sec-03 sentence 13 (a clearer
prompt is not a truer answer), sec-04 sentence 18 (no number of rounds),
sec-05 sentence 17 (4#10 is about the toolkit's own use cases), sec-06
sentences 4, 15 and 18 (K unexplained; no date; the footnote; "limited"
undefined). Each rests on an index "Does not cover" or "Date stated"
note, each exists so that a participant does not assume the missing
fact, and each is phrased as a statement about the page. Feature 28's
rule kept sentences of this kind in GPT-01, and GPT-02's J7 kept three.
Recommended ruling: keep all; cut any the developer reads as method
rather than scope.

**J6 — zero attributed sentences.** The toolkit entries this lesson uses
(4#7, 4#8, 4#9, 4#10) are CPA.com's own advice, which the course reports
as the toolkit's; GPT-01's attributed class was for a quoted executive
(4#3), which this lesson does not use. Recommended ruling: accept the
class distribution.

**J7 — the sourced share is low.** 28 of 100 body sentences are sourced,
against 56 of 89 in GPT-02. The reason is the sources, not the prose:
file 13's substance is three practices of a sentence or two each, and
the toolkit's contribution is five one-line entries. A lesson written
only from those sentences would be a page long, and the objectives ask
the participant to *write*, *refine* and *ask*, which are applications.
Nothing was padded; every connective sentence either applies an entry
(J2), illustrates one (J3), or hands off. Recommended ruling: accept; if
the developer wants a higher sourced share, the remedy is more source
(the prompting guides file 13 links to), not less prose.

**J8 — LO 3's five-element pattern is not taught.** The index's Gaps say
no source names role, inputs, constraints or output format as elements
of a prompt, and lesson 05's objectives, as scaffolded, do not ask for
that pattern. The lesson teaches what the sources support: clear,
specific, context, tone, examples, iteration, verbatim excerpts, and the
input bound. Recommended ruling: accept; a future revision that wants the
pattern needs a source for it.

**J9 — sec-06 uses the context-window figures as well as the input
maximum.** lo-4 is about input length; the context window is a
different row, and the section gives both because the grid gives both
and a participant will see both. It says which of the two this section
is about (sentence 5) and does not say what the K figure counts.
Recommended ruling: accept as drafted; cut sentences 6 and 9's
context-window halves if the developer wants the section on one row
only.

**J10 — body length.** Six sections, 2,202 counted words by `check`'s
estimate, between 306 and 440 words. Nothing was written to a number;
sec-03 is the shortest because 13#5 and 4#9 say what they say in a
sentence each. Recommended ruling: accept.

## Sources still needed

From the Gaps section of `drafts/GPT-source-index.md` (entry 25), the
bullets that bear on this lesson, verbatim:

- **LO 3's pattern is unsourced.** No source names role, inputs,
  constraints or output format as elements of a prompt. Files 13 and 4
  support clarity, specificity, examples, iteration and tone; files 6 and
  7 add only that input length is bounded and that files can be uploaded.
  The five-element pattern in LO 3 will be `UNSOURCED` as a pattern even
  if each element can be argued from those. Every LO 3 source is high
  currency risk.
- **What the recaptures dropped is partly back.** File 11 restores the
  enterprise page's "Updated: January 8, 2026" date, its SAML SSO line and
  the line restricting the headline retention commitment to Enterprise,
  Healthcare and Edu. Still in git history only, and not citable from the
  current set: the pricing page's plan prices, its "Paid plans (Go, Plus,
  Business, and Enterprise) are priced per user per month" sentence, its
  "Enterprise and Business can purchase credits" footnote, its Privacy and
  Security & Administration row labels, its shared-context-window
  footnote, and the Go plan's "may include ads" line. A lesson that needs
  any of these needs a capture that has them.
