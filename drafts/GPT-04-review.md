# GPT-04 — Verifying the output — accuracy record

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

Learning objectives (from `src/lesson-06.ts`):

Index references are to `drafts/GPT-source-index.md` as it stands in the
tree (regenerated over the final source set, changelog entry 25), by
file number and entry number as that index numbers them. The feature
spec that set these objectives was written against the previous
generation, which numbered files 6–11 differently; the references
below are translated to the current numbering. Files cited here:
1 = `aicpa-code-1-700-001-confidential-client-information.pdf`, 4 = `cpacom-genai-toolkit.pdf`, 9 = `openai-does-chatgpt-tell-the-truth-2026-09-13.pdf`.

- **lo-1** — Treat output as a first draft, and verify quotes, figures, technical content, and document references against a source before relying on them. [index 9#7–9]
- **lo-2** — Use search-backed answers by following the cited links to the source rather than relying on the summary. [index 9#10,11]
- **lo-3** — Relate verification to the General Standards Rule: due professional care and sufficient relevant data. [index 1#14,15]
- **lo-4** — Document the review of AI output as firm policy, with counsel deciding the form of the record. [index 4#4–6]


---

## Sections

Index references are to `drafts/GPT-source-index.md` (entry 25 numbering,
extended for file 9 in entry 29, which this lesson uses — 9#13 and 9#15 —
and for file 8 in entry 30, which it does not): 1 =
`aicpa-code-1-700-001-confidential-client-information.pdf`, 4 =
`cpacom-genai-toolkit.pdf`, 9 =
`openai-does-chatgpt-tell-the-truth-2026-09-13.pdf`. One question's
distractor cites 10#2 for a fact lesson 2 taught (q-10); file 10 is not
in this lesson's `meta.sources` because no body sentence relies on it.

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
record and is not in the guide text.

**The no-method-voice rule** is feature 28's, applied from the start: the
guide teaches and does not describe its own sourcing restraint, count its
sources, or explain why a heading exists. What it does say about its own
scope is limited to handoffs ("lesson 5 takes it up") and to statements
of what the documents do not state, where a participant would otherwise
assume something; those are listed under J5 for the developer to cut if
they read as method. Sec-06's closing paragraph is a recap of what the
lesson has and has not said, in the participant's terms; it is listed
under J5 as the one passage closest to the line.

**Two instructions specific to this lesson**, from the feature spec, are
applied in sec-04 and sec-06 and recorded under J1 and J2: what the
General Standards Rule says is reported as the Rule's, and the link from
the Rule to verifying AI output is written as the course's position and
flagged as such; and nothing in the lesson describes what the review
record should contain, because the toolkit sends that to counsel and no
source gives a form of record.

**Tally, whole lesson (body sections only):** 98 sentences — 30 sourced,
1 attributed, 63 connective, 4 flagged `UNSOURCED`. Three further flags
sit outside the body: one in the front matter (audience) and two in the
glossary (*Third-party service provider*, *Verify*), both boundary flags.
Seven flags in all. Three of the four body flags are the three sentences
of sec-04's "This course's position", which the spec required and which
are flagged because they are the course's (J1). The one attributed
sentence is the toolkit's quoted executive (4#3), as in GPT-01 (J6).

**Section plan.** Written from lesson 06's four objectives and the index
entries the scaffold cites for them (9#7–9 for lo-1; 9#10,11 for lo-2;
1#14,15 for lo-3; 4#4–6 for lo-4), plus entries of the same files that
the prose needed: 9#1, 9#2, 9#3, 9#4, 9#5, 9#6, 9#12, 9#13, 9#15; 1#16,
1#17; 4#3, 4#7. Six sections: two for lo-1 (sec-01 the first-draft rule;
sec-02 the four items), one for lo-2 (sec-03), one for lo-3 (sec-04), two
for lo-4 (sec-05 the human review; sec-06 the record). The
`<!-- index: … -->` comment at the head of each body file lists the
entries the prose uses; it is stripped before counting.

Word counts are `npm run check`'s estimate as of this draft; superCPE's
count is authoritative.

### front-matter — `00-front-matter.md` — role `front_matter` — excluded — 357 words

The "How this course works" block is the template from the end of
`docs/course-package.md`, unmodified (4.05.3 item 4). The opening
paragraph names the course, this lesson's ordinal, and the lesson's
topics from its four objectives, including that the link to the General
Standards Rule is the course's; no lesson list, no course-level
descriptor, no source count. The second paragraph names the lesson's
sources by description and gives no number.

**Flags**
- `UNSOURCED` (descriptive) — "It is written for CPAs in public practice
  who use, or are deciding whether to use, ChatGPT in their work, and it
  assumes no prior experience with the tool." The audience statement, in
  the same words as GPT-01's, GPT-02's and GPT-03's; the developer ruled
  keep on GPT-01's on 2026-09-14. Recommended ruling: keep as written.

### sec-01 — `01-a-first-draft.md` — role `body` — counted — 347 words — lo-1

**Index entries used, in order**
1. 9#8 — use ChatGPT as a first draft, not a final source (sentences 3,
   13)
2. 9#7 — approach critically; verify important information from reliable
   sources (sentence 4)
3. 9#1 — responses from patterns in training data; can be incorrect or
   misleading (sentence 7)
4. 9#2 — may sound confident even when wrong (sentence 8)
5. 9#6 — confidence is not reliability (sentence 8)

**Classification:** 5 sourced (3, 4, 7, 8, 13) · 0 attributed · 10
connective (1, 2, 5, 6, 9, 10, 11, 12, 14, 15) · 0 flagged.

Sentences 9 and 10 gloss "first draft" (a document before someone has
checked it), listed under J4. Sentences 11–12 are a hypothetical (a
filing date in a response) that states no date and no fact, listed under
J3; its last clause restates 9#6. Sentence 13 restates 9#8 from the
other side ("a final source"). Sentence 5's "this lesson takes them as
its rule" is the course adopting the vendor's advice, not method voice.

**Flags** — none.

### sec-02 — `02-what-is-always-verified.md` — role `body` — counted — 391 words — lo-1

**Index entries used, in order**
1. 9#9 — always verify quotes, data, technical information, references
   to external documents (sentences 2, 14, 16)
2. 9#4 — fabricated quotes, citations, references to non-existent
   sources (sentence 4)
3. 9#3 — "hallucination" is the page's term for output that is not
   factually accurate (sentence 6)
4. 4#3 — generated output, not computed answers; attributed in the
   toolkit to Jeff Seibert, CEO of Digits (sentence 8, attributed)
5. 9#12 — accurate calculation is tied to a tool the page names (sentence
   9)
6. 9#13 — incorrect definitions, dates, or facts (sentence 12)

**Classification:** 5 sourced (2, 4, 6, 9, 12) · 1 attributed (8) · 10
connective (1, 3, 5, 7, 10, 11, 14, 15, 16, 17) · 1 flagged (13).

Sentence 8 is the attributed sentence: it names the source as an
executive quoted in the toolkit, in the words GPT-01 sec-05 used, and
sentence 9 keeps the quote at arm's length ("one executive's phrasing")
before giving the page's own version. Sentences 5 and 10 say how a
quotation, a reference and a figure are checked; they are the lesson's
glosses of "verify" (J4). Sentence 11's "the page gives no definition of
it" is a statement about the page read from the page (the four items are
listed without definition), listed under J5. Sentence 16 is a
hypothetical response that states no fact (J3).

**Flags**
- `UNSOURCED` (interpretive) — "For a CPA, a threshold, a rate, a filing
  date, or the wording of a standard is technical information in the
  ordinary sense of the words, and each is checked against the document
  that sets it." The application of 9#9's fourth item to accounting
  work: the page names "technical information" and gives no definition,
  and this sentence supplies examples from the participant's own field.
  No source lists these items; 9#13's "incorrect definitions, dates, or
  facts" is the nearest. It states no threshold, rate, date or standard.
  Recommended ruling: keep — the objective asks the participant to verify
  "technical content", and a participant needs to know what that is in
  their work; cut the list to "a date or the wording of a standard" if
  the developer wants only items 9#13 names.

### sec-03 — `03-search-backed-answers.md` — role `body` — counted — 402 words — lo-2

**Index entries used, in order**
1. 9#10 — without search, training only; with search, cited web sources
   (sentence 4)
2. 9#5 — the knowledge cutoff; not incorporated unless tools are used
   (sentence 5)
3. 9#11 — use search or deep research; check sources by visiting links
   directly (sentences 7, 9)
4. 9#4 — fabricated citations (sentence 9)
5. 9#15 — lack of access: technical issues, paywalls, robots.txt
   (sentence 11)

**Classification:** 5 sourced (4, 5, 7, 9, 11) · 0 attributed · 13
connective (1, 2, 3, 6, 8, 10, 12, 13, 14, 15, 16, 17, 18) · 0 flagged.

Sentence 4's second half ("with search or deep research, the model can
access and cite real-time web sources to answer with more recent
information") is the sentence that follows 9#10's quote on the page
(p. 3) and is what 9#10's claim summarises as "with search, cited web
sources"; classed sourced on the claim. Sentence 6 glosses the two
cases. Sentence 13 ("A source the model could not read is not one the
response can have drawn on, whatever the response says about it") is
the lesson's reading of 9#15 and is the one gloss in this section the
developer may read as a claim about the tool (J4). Sentences 15–17
restate sections 01 and 02 for the cited case. Sentence 18 is a boundary
statement: which plans include search is in files 6 and 7, which are not
this lesson's, and what "deep research" does is in the page's tools
table, which no entry quotes (J5).

**Flags** — none.

### sec-04 — `04-the-general-standards-rule.md` — role `body` — counted — 470 words — lo-3

**Index entries used, in order**
1. The index's note on file 1 (entries draw on 1.300, general standards)
   and 1#14, 1#15 — the Rule and its section (sentence 4)
2. 1#14 — due professional care (sentence 6)
3. 1#15 — sufficient relevant data (sentence 7)
4. 1#17 — the Code points to nonauthoritative Q&A 400.02, "Using the
   Output of Technology" (sentence 10)
5. 1#16 — third-party provider: the member must still obtain sufficient
   relevant data to support the work product (sentences 17, 19)

**Classification:** 6 sourced (4, 6, 7, 10, 17, 19) · 0 attributed · 10
connective (1, 2, 3, 5, 8, 9, 11, 12, 13, 18) · 3 flagged (14, 15, 16).

The section is built as the spec requires (J1): sentences 4–9 report the
Rule as the Rule's, in its words, and sentence 9 says what it does not
mention, resting on file 1's "Does not cover" ("The Code never names
ChatGPT, an LLM, or generative AI in authoritative text"). Sentences
10–12 report the Code's pointer (1#17) and that the guidance is not in
the Code or the set (file 1's "Does not cover": "cited, not
reproduced; neither is in the set"). Sentence 13 marks the change of
voice, and sentences 14–16 are the course's position, each flagged
below. Sentence 18 is the boundary the index draws on the third-party
question ("Applying 0.400.52 and 1.700.040 to a model vendor is the
author's inference, and the lesson should say so"); the lesson says so
and hands it to lesson 5. Sentence 4's "a short list of standards" is
the index's description of what the entries draw on; the number of
standards is not stated.

**Flags**
- `UNSOURCED` (position) — "On OpenAI's own description in sections 01
  and 02, a response from ChatGPT is a draft that may be incorrect, whose
  quotes, figures, technical content, and references the vendor says
  always to verify; on this course's reading, such a response is not, by
  itself, sufficient relevant data to afford a reasonable basis for a
  conclusion." The first half is 9#8, 9#1 and 9#9; the second half is
  the link lo-3 asks for, and no source states it. Index entry 1#15's
  claim carries the same link in its gloss ("which is what verifying
  model output supplies"), but the spec directs that the link read as
  the course's, and the sentence says so. Recommended ruling: keep as
  written — it is the objective, marked as the course's position, which
  is what the spec asked for.
- `UNSOURCED` (position) — "Verifying the response against a source is,
  on the same reading, how a member who used ChatGPT obtains the data
  the Rule requires: the response says where to look, and what is relied
  on is what the source says." The positive half of the same position.
  Recommended ruling: keep as written, for the same reason.
- `UNSOURCED` (position) — "The course connects due professional care to
  the same step, and it is the course, not the Rule, that says the
  checking is the care." The second standard lo-3 names, connected in
  the same way and marked the same way. Recommended ruling: keep as
  written; merge with the previous sentence if the developer wants one
  position sentence rather than two.

### sec-05 — `05-the-human-review.md` — role `body` — counted — 361 words — lo-4

**Index entries used, in order**
1. 4#4 — a human should review content used in decision-making or shared
   with clients (sentence 3)
2. 4#5 — accounting professionals are responsible for monitoring answers
   for accuracy (sentences 5, 6)
3. 4#7 — verbatim excerpts, so the human checks the source (sentences
   13, 15)

**Classification:** 5 sourced (3, 5, 6, 13, 15) · 0 attributed · 10
connective (1, 2, 4, 7, 8, 9, 10, 11, 12, 14) · 0 flagged.

Sentence 5's "list of risk considerations" is where 4#5 and 4#6 sit on
the page (p. 19, under a heading of that description); read from the
page for placement only (J2). Sentence 8 ("the two put the work in the
same place: on the professional") is a comparison of 4#5 with 1#14–15
and adds no fact. Sentences 9–10 are a hypothetical (a client's question
about a filing requirement) that states no requirement (J3). Sentence 11
("The toolkit does not say how a review is done") is a boundary
statement resting on the index Gaps ("No source gives a form of record")
and on 4#4's own words, which give the purpose of the review and not a
procedure (J5). Sentence 12 points back to sec-02's list as the nearest
thing to a checklist and does not call it one.

**Flags** — none.

### sec-06 — `06-documenting-the-review.md` — role `body` — counted — 340 words — lo-4

**Index entries used, in order**
1. 4#6 — discuss with general counsel necessary documentation of a
   review process for AI output (sentences 2, 5, 6, 11)
2. 4#5 — responsibility to monitor answers, in the same list (sentences
   2, 11)

**Classification:** 4 sourced (2, 5, 6, 11) · 0 attributed · 10
connective (1, 3, 4, 7, 8, 9, 10, 12, 13, 14) · 0 flagged.

The section follows the spec's second instruction (J2): it says the
process is documented and that counsel decides the form, and it does not
say what the record contains. Sentences 5 and 6 gloss the two halves of
4#6 ("necessary"; "with general counsel"). Sentence 7 is a scope
statement, not method: it tells the participant where the question
goes. Sentences 9–10 are the lesson's reasons for calling the record
firm policy (the firm has counsel; a process, not a response), listed
under J4. Sentence 11's "in the same list" is the page placement noted
under sec-05 (J2). Sentence 3 ("That is the whole of what the toolkit
says on the subject") is a statement about the document, matching the
index Gaps ("one line of support"). Sentences 13–14 are the recap; see
J5.

**Flags** — none.

### glossary — `90-glossary.md` — role `glossary` — excluded — 595 words

Ten terms, mirrored in `meta.glossaryTerms` with `sectionId: "glossary"`;
the file's definitions carry a section pointer the module's do not. The
preamble says two terms carry a question the sources leave open, without
a count of sources.

1. **Due professional care** — 1#14; the second sentence marks the link
   to model output as the course's (J1).
2. **First draft** — 9#8.
3. **General Standards Rule** — 1#14, 1#15, 1#17, and the index's note
   on file 1 for "section 1.300".
4. **Hallucination** — 9#3, 9#13, 9#4.
5. **Human review** — 4#4.
6. **Lack of access** — 9#15.
7. **Search / Deep research** — 9#10, 9#11; the boundary sentence
   (what each tool does; which plans) rests on file 9's "Does not
   cover" and on files 6–7 not being this lesson's.
8. **Sufficient relevant data** — 1#15; the second sentence marks the
   link as the course's (J1).
9. **Third-party service provider** — 1#6 (the definition), 1#16, and
   file 1's "Does not cover"; see flag below.
10. **Verify** — 9#7, 9#9; see flag below.

**Flags**
- `UNSOURCED` (boundary only) — the *Third-party service provider*
  entry. Its definition is 1#6 and its second sentence is 1#16; its
  third says the Code does not answer whether a model vendor is one,
  which is file 1's "Does not cover". The entry exists because sec-04
  uses the term and lesson 5 will need it; it draws no conclusion.
  Recommended ruling: keep as written — same class as GPT-02's *Data
  Processing Addendum*, a term located but not applied.
- `UNSOURCED` (boundary only) — the *Verify* entry. The page uses the
  word (9#7, 9#9) and does not define "reliable source" (file 9's "Does
  not cover": "What 'reliable sources' means for accounting work"); the
  entry's last sentence gives the sense in which this lesson uses the
  word, which is the course's. Recommended ruling: keep as written; cut
  the last sentence if the developer reads it as a definition from
  general knowledge rather than a statement of the lesson's usage.

## Questions

Written into `src/questions-06.json`. Ten questions: six review, one
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
| q-01 | review | after sec-01 | 9#8, 9#7; 9#6, 9#11, 9#12, 4#3 (distractors) | sec-01 s3–4: "… use ChatGPT as a first draft, not a final source. The same page says that OpenAI encourages users to approach ChatGPT critically and to verify important information from reliable sources." |
| q-02 | review | after sec-02 | 9#9; 9#4, 9#10 (distractors) | sec-02 s2: "Among its practical tips is a list of four things to verify always: quotes, data, technical information, and references to external documents." |
| q-03 | review | after sec-03 | 9#11, 9#4; 9#6, 9#7 (distractors) | sec-03 s7: "… use available tools like search or deep research, and check sources when accuracy matters by visiting links directly." |
| q-04 | review | after sec-04 | 1#14, 1#15, 1#17, 1#16; file 1 "Does not cover" | sec-04 s6–7, s9, s13: the two standards; "The Rule does not mention artificial intelligence, a language model, or a chatbot …"; "What follows is the course's, not the Rule's." |
| q-05 | review | after sec-05 | 4#4, 4#5; 9#6, 9#11 (distractors) | sec-05 s3 and s5: "… a human should review and ensure the appropriateness and accuracy of any content that is being used in decision-making or shared with clients." "… accounting professionals have a responsibility to monitor answers …" |
| q-06 | review | after sec-06 | 4#6; index Gaps (distractor) | sec-06 s2 and s6: "… discuss with general counsel necessary documentation of a review process for AI output." "… what the documentation must contain is decided with general counsel …" |
| q-07 | assessment | lo-1 | 9#8, 9#9, 9#4, 9#11, 9#7, 4#3 | sec-01 s3 and sec-02 s2 (above); sec-02 s5 and s10 (how a quotation, a reference and a figure are checked). |
| q-08 | assessment | lo-2 | 9#10, 9#11, 9#4, 9#8 | sec-03 s4 and s7 (above) and s15: "Search changes where a response comes from; it does not change what the page says to do with the response." |
| q-09 | assessment | lo-3 | 1#14, 1#15, 1#16; file 1 "Does not cover" | sec-04 s6–7 (the Rule's words), s9 (no mention of AI), s14–15 (the course's position, flagged). |
| q-10 | assessment | lo-4 | 4#4, 4#5, 4#6; 10#2 (distractor) | sec-05 s3 and s5, sec-06 s2 (above) and s9: "It is addressed to the firm, since it is the firm that has general counsel." |

**Judgments on the questions**, with recommended rulings:

- **Q1 — q-04 and q-09 test the course's position as the course's.** Both
  correct choices say the Rule does not mention AI and that the link to
  verification is this course's; the distractors are the ways of getting
  that wrong (putting the position in the Rule's text; reading the
  Rule's silence as inapplicability; inventing a disclosure or a
  prohibition). The correct choices therefore rest on sec-04's sourced
  sentences 6, 7 and 9 and on its flagged sentences 14–15 only for the
  attribution of the position, which the flags themselves make.
  Recommended ruling: accept; if the developer overrules the position
  flags, both questions are rewritten, not cut.
- **Q2 — q-07 and the sec-01 hypothetical are scenarios.** q-07's stem
  describes a response with a quoted standard, a rate and a ruling and
  names none; the correct choice is the four items applied. Recommended
  ruling: accept.
- **Q3 — two distractors rest on lessons 1 and 2.** q-01 (d) and q-07
  (d) use 4#3 and 9#12 (lesson 1's calculation point, both in this
  lesson's files); q-10 (d) uses 10#2 (the business training default,
  lesson 2's, file 10 not in this lesson's sources). Recommended ruling:
  accept; add file 10 as supporting if the developer wants every entry
  a question cites in the lesson's source list.
- **Q4 — one assessment question per objective.** lo-1 names four kinds
  of content and q-07 measures three of them in one scenario; lo-4
  names two things (the review, the record) and q-10 measures both.
  Recommended ruling: accept; the count the course needs is superCPE's.

## Judgment list — CLOSED (default rulings; developer read pending)

Four `UNSOURCED` flags in the body (sec-02 sentence 13; sec-04 sentences
14, 15, 16), one in the front matter (audience), two in the glossary
(*Third-party service provider*, *Verify*): seven in all, each quoted in
its section above with its recommended ruling. The items below are the
judgments the draft had to make that a flag does not capture. Under the
CLAUDE.md Rulings rule each recommendation is the ruling unless the
content developer's 4.01.1 read of the guide text says otherwise; that
read is still ahead.

**J1 — lo-3: the Rule's words are the Rule's; the link is the course's.**
The spec's instruction for this objective. Sec-04 reports 1#14 and 1#15
verbatim, says the Rule does not mention AI (file 1's "Does not cover"),
reports the Code's own pointer to nonauthoritative guidance on
technology's output (1#17), and only then, under a heading and after a
sentence that says so, states the course's position — in three
sentences, each flagged as position. The front matter and two glossary
entries (*Due professional care*, *Sufficient relevant data*) carry the
same marker. Index entry 1#15's claim itself glosses the standard as
"what verifying model output supplies"; that gloss is the index
author's and is not relied on as a source for the position. Recommended
ruling: accept as drafted; the position is the objective, and it is
marked as the course's everywhere it appears.

**J2 — lo-4: the record's contents are not described.** The spec's
second instruction. Sec-06 says the review process is documented
(4#6's "necessary") and that its form is decided with counsel, and says
that what the record should contain is not something the lesson says.
The "firm policy" half of lo-4 rests on three features of 4#6 the
lesson draws out (addressed to a firm; a process; beside 4#5 in the
same list), which are readings, not additions. Two placements are read
from the page (p. 19): that 4#5 and 4#6 are items in one list, and that
the list is one of risk considerations; both are structure, not claims.
Recommended ruling: accept as drafted; an index entry recording the
list's heading would be the tidy fix and is outside this feature.

**J3 — hypothetical illustrations.** Four in the body: sec-01 sentences
11–12 (a filing date in a response; no date given), sec-02 sentence 16
(a response with a quoted standard, a figure, a rate and a ruling; none
named), sec-05 sentences 9–10 (a client's question about a filing
requirement; no requirement stated), plus q-07's and q-09's scenarios.
Each states no accounting fact. Recommended ruling: accept all; cut any
the developer reads as teaching a fact the sources do not.

**J4 — glosses classed connective.** Sentences that restate an entry's
meaning or apply it without adding a fact: sec-01 sentences 9–10 (what
a first draft is), sec-02 sentences 5 and 10 (how a quotation, a
reference and a figure are checked), sec-03 sentences 6 and 13 (a
search-backed answer can be newer than the model; a source the model
could not read is not one it drew on), sec-05 sentence 8 (the Code and
the toolkit put the work on the professional), sec-06 sentences 9–10
(why the record is firm policy). Sec-03 sentence 13 is the one the
developer is most likely to read as a claim about the tool. Recommended
ruling: accept the class; reclassify any read as a fact about the tool
as a flag, and cut it if the section reads as well without it.

**J5 — boundary statements and the recap.** Sec-02 sentence 11 (no
definition of "technical information"), sec-03 sentence 18 (which plans;
what deep research is), sec-04 sentences 9, 11 and 18 (no mention of AI;
the guidance not reproduced; the third-party question open), sec-05
sentence 11 (how a review is done), sec-06 sentences 3 and 7 (the whole
of what the toolkit says; the record's contents). Each rests on an index
"Does not cover" or Gaps note and exists so a participant does not
assume the missing fact. Sec-06's closing paragraph (sentences 13–14)
recaps what the lesson said on whose authority and what it did not say;
it is written for the participant and names no source count, but it is
the passage closest to describing the lesson's own method. Recommended
ruling: keep the boundary statements; keep the recap, and cut it whole
if the developer reads it as method rather than summary.

**J6 — one attributed sentence.** Sec-02 sentence 8 reports the
toolkit's quoted executive (4#3) as GPT-01 did, with the arm's-length
framing in sentence 9. Every other toolkit entry used (4#4, 4#5, 4#6,
4#7) is CPA.com's own advice, reported as the toolkit's and classed
sourced. Recommended ruling: accept the class distribution.

**J7 — entries used outside their objective tags.** 9#1, 9#2, 9#3, 9#5,
9#12 and 9#13 are tagged L01 in the index and are used here as sourced
because the file is this lesson's and each is a numbered entry; 1#6 is
tagged L05 and is used in the glossary only. The sentence rule is by
file, not by tag. Recommended ruling: accept.

**J8 — file 2 not used.** The index tags 2#4 and 2#6 (test accuracy on
your own data; an accuracy figure without a methodology is not
evidence) to LO 4 and L04. Both are advice to a firm evaluating a
vendor's product, not about verifying a response, and the scaffold's
source list omitted file 2. Not drawn on. Recommended ruling: accept;
a revision that wants the due-diligence angle adds file 2 to
`meta.sources` and a section on testing before adoption.

**J9 — body length.** Six sections, 2,311 counted words by `check`'s
estimate, between 340 and 470 words. Sec-04 is the longest because it
reports the Rule, the Code's pointer, the position and the third-party
interpretation each in their own voice, which takes more sentences than
one voice would. Recommended ruling: accept.

## Sources still needed

From the Gaps section of `drafts/GPT-source-index.md` (entry 25), the
bullets that bear on this lesson, verbatim:

- **LO 4 is sourced but thin on documentation.** Verification itself is well
  supported (files 1, 2, 4, 9). "Document the verification" has one line
  of support: file 4 sends the firm to counsel for what to document. No
  source gives a form of record.
- **Neither rule names technology.** Whether entering client information
  into ChatGPT is a "disclosure" (file 1) or a "voluntary disclosure"
  (file 5) is the author's inference in both cases; no source in the set
  applies either rule to a model or a chatbot.
