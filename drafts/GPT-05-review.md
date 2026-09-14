# GPT-05 — Confidentiality and client data — accuracy record

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

Drafted 2026-09-14 (changelog entry 32): six body sections, front matter,
glossary, ten questions. Every flag and judgment item below carries a
recommended ruling under the CLAUDE.md Rulings rule; the judgment list is
closed on those defaults, and the content developer's 4.01.1 read of the
guide text is still ahead. Still unchecked.

Learning objectives (from `src/lesson-07.ts`):

Index references are to `drafts/GPT-source-index.md` as it stands in the
tree (regenerated over the final source set, changelog entry 25), by
file number and entry number as that index numbers them. The feature
spec that set these objectives was written against the previous
generation, which numbered files 6–11 differently; the references
below are translated to the current numbering. Files cited here:
1 = `aicpa-code-1-700-001-confidential-client-information.pdf`, 4 = `cpacom-genai-toolkit.pdf`, 5 = `nh-rsa-309-b-18-confidential-communications.pdf`.

- **lo-1** — Apply the Confidential Client Information Rule: information is confidential by default, public information is not, and a client's name alone can be confidential. [index 1#1–5]
- **lo-2** — Describe the Code's two routes for third-party service providers — a confidentiality contract with reasonable assurance, or the client's specific consent — and the member's continuing responsibility. [index 1#6–12,16]
- **lo-3** — Recognize that state law may be more restrictive, using New Hampshire RSA 309-B:18, whose only general release is client permission and whose exceptions contain no service-provider clause. [index 1#13; 5#1–3]
- **lo-4** — Apply a firm policy that keeps client data out of individual-plan tools and de-identifies data before it enters any AI tool. [index 4#11–13]


---

## Sections

Index references are to `drafts/GPT-source-index.md` (entry 25 numbering,
extended for file 9 in entry 29 and file 8 in entry 30, neither of which
this lesson uses): 1 =
`aicpa-code-1-700-001-confidential-client-information.pdf`, 4 =
`cpacom-genai-toolkit.pdf`, 5 =
`nh-rsa-309-b-18-confidential-communications.pdf`. No sentence and no
question relies on any other file; `meta.sources` is unchanged from the
scaffold.

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

**The no-method-voice rule** is feature 28's, applied from the start. What
the guide says about its own scope is limited to handoffs, to statements
of what the documents do not state where a participant would otherwise
assume something, and to the no-advice boundary the spec requires; those
are listed under J5 and J6 for the developer to cut if they read as
method.

**Five instructions specific to this lesson**, from the feature spec, are
applied throughout and recorded under J1–J4:

1. *Rule text is reported as the rule's.* Every sentence that says what
   the Code, the statute or the toolkit says is built on an index quote,
   in the quote's words or a close paraphrase that neither widens nor
   narrows it; the spot check under J1 found every used entry's wording
   in the guide.
2. *The course's position is labelled as the course's.* It is stated
   once, in sec-04 under the heading "The position", in three sentences
   each flagged `UNSOURCED (position)`. Every other mention of it in the
   lesson is a reference to that section, not a restatement. The full
   list of sentences that state or refer to the position is under J2.
3. *The statute has no service-provider clause.* Sec-03 says so, says
   the state rule is narrower and that client permission is its only
   general release, and stops. No other state's law is stated (sec-03
   sentence 4). The Code's contract route is nowhere described as
   sufficient for a New Hampshire licensee.
4. *No legal advice.* No sentence tells a participant what is or is not
   permitted in their situation. The front matter and sec-04 sentence 12
   say so; sec-06 sentence 15 closes with it. A second-person and
   advice-voice scan of the body and front matter found only the
   template block, the statute's own words ("may not voluntarily
   disclose") and the boundary sentence itself.
5. *Nothing on the toolkit's 2023 date is used for product behaviour.*
   Sec-05 sentence 3 says the toolkit describes the product as it was in
   2023 and that the section takes its policy practices only. No
   sentence in the lesson states what ChatGPT does with input on the
   toolkit's authority; lesson 2's pages are referred to by handoff
   (sec-02 sentence 11, sec-05 sentences 3 and 11).

**Tally, whole lesson (body sections only):** 114 sentences — 35 sourced,
0 attributed, 75 connective, 4 flagged `UNSOURCED`. Three further flags
sit outside the body: one in the front matter (audience) and two in the
glossary (*Public LLM / public generative AI tool*, *Third-party service
provider*), both position flags. Seven flags in all, under the spec's
stop threshold of ten. Three of the four body flags are the three
sentences of sec-04's "The position", which the spec required and which
are flagged because they are the course's (J2); the fourth is sec-05's
reading of the toolkit's "public" as including an individual plan (J3).
No sentence is attributed, because every toolkit entry this lesson uses
is CPA.com's own advice rather than a quoted third party (J8).

**Section plan.** Written from lesson 07's four objectives and the index
entries the scaffold cites for them (1#1–5 for lo-1; 1#6–12, 16 for
lo-2; 1#13, 5#1–3 for lo-3; 4#11–13 for lo-4), plus entries of the same
files that the prose needed: 5#4–11; 1#18; 4#10, 4#14, 4#15, 4#16. Six
sections: one for lo-1 (sec-01), one for lo-2 (sec-02), one for lo-3
(sec-03), one for the course's position (sec-04, serving lo-1 to lo-3 by
application and examined only on what the Code says), two for lo-4
(sec-05 what goes in; sec-06 consent, disclosure and the policy's
shape). The `<!-- index: … -->` comment at the head of each body file
lists the entries the prose uses; it is stripped before counting.

Word counts are `npm run check`'s estimate as of this draft; superCPE's
count is authoritative.

### front-matter — `00-front-matter.md` — role `front_matter` — excluded — 420 words

The "How this course works" block is the template from the end of
`docs/course-package.md`, unmodified (4.05.3 item 4). The opening
paragraph names the course, this lesson's ordinal, and the lesson's
topics from its four objectives, including that the position on
ChatGPT is the course's; no lesson list, no course-level descriptor, no
source count. The second paragraph names the lesson's sources by
description, gives no number, and carries the no-advice sentence the
spec requires (J6).

**Flags**
- `UNSOURCED` (descriptive) — "It is written for CPAs in public practice
  who use, or are deciding whether to use, ChatGPT in their work, and it
  assumes no prior experience with the tool." The audience statement, in
  the same words as GPT-01's to GPT-04's; the developer ruled keep on
  GPT-01's on 2026-09-14. Recommended ruling: keep as written.

### sec-01 — `01-the-confidential-client-information-rule.md` — role `body` — counted — 426 words — lo-1

**Index entries used, in order**
1. 1#1 — a member in public practice shall not disclose any confidential
   client information without the specific consent of the client
   (sentence 3; the section number 1.700.001 is from the index's note on
   file 1)
2. 1#2 — any information obtained from the client that is not available
   to the public (sentence 6)
3. 1#3 — publicly accessible websites, databases, online discussion
   forums, or other electronic media (sentence 9)
4. 1#4 — unless the particular client information is available to the
   public, consider it confidential (sentence 11)
5. 1#5 — a bankruptcy-limited practice; disclosing the client's name
   could suggest financial difficulties (sentence 14)

**Classification:** 5 sourced (3, 6, 9, 11, 14) · 0 attributed · 14
connective (1, 2, 4, 5, 7, 8, 10, 12, 13, 15, 16, 17, 18, 19) · 0
flagged.

Sentences 7–8 split 1#2 into its two conditions and add nothing.
Sentence 10 restates 1#3's claim ("and so outside the rule"). Sentence
12 glosses 1#4: the question is whether the information is public, "not
whether it is sensitive" — the second half is a contrast the definition
supports by omission and is listed under J4. Sentences 15–16 gloss 1#5:
why the name is confidential in that practice and what the example
shows; sentence 16's "the test is what a disclosure reveals" is the
gloss the developer is most likely to read as a claim about the Code
(J4). Sentences 17–19 are the section map.

**Flags** — none.

### sec-02 — `02-third-party-service-providers.md` — role `body` — counted — 547 words — lo-2

**Index entries used, in order**
1. 1#6 — an entity that the member does not control (sentence 2)
2. 1#7 — using a third-party service provider: threats to compliance
   with the Rule may exist (sentence 5)
3. 1#8 — contractual agreement to maintain confidentiality plus
   reasonable assurance of appropriate procedures (sentence 7)
4. 1#9 — the extent of publicly available information on the provider's
   controls (sentence 9)
5. 1#10 — specific consent from the client before disclosing (sentence
   12)
6. 1#11 — consent specifies the nature, the type of third party, and the
   intended use (sentence 13)
7. 1#12 — in violation if the member cannot demonstrate that safeguards
   were applied (sentence 17)
8. 1#16 — the member must also obtain sufficient relevant data to support
   the work product (sentence 19)

**Classification:** 8 sourced (2, 5, 7, 9, 12, 13, 17, 19) · 0
attributed · 13 connective (1, 3, 4, 6, 8, 10, 11, 14, 15, 16, 18, 20,
21) · 0 flagged.

Sentences 3–4 gloss 1#6 (control is the test). Sentence 6's "the Code's
response to a threat is a safeguard" is the vocabulary of 1#12
("safeguards … threats") and introduces the two routes; listed under J4.
Sentence 8 splits 1#8 in two. Sentence 10 restates 1#9's claim ("depends
in part on what the provider has published"). Sentence 11 is a handoff
to lesson 2 and a boundary: whether OpenAI's published documents are
reasonable assurance for any firm is not said (J5). Sentences 14–15
gloss 1#11; sentence 15 ("consent that names none of the three is not
the consent the interpretation describes") is an application the
developer may read as a conclusion (J4). Sentence 18 glosses 1#12's
"demonstrate" as a record as much as an act (J4). Sentence 20 ("does not
change who answers for it") is the lesson's summary of 1#12 and 1#16
together (J4). Sentence 21 is file 1's "Does not cover" (whether OpenAI
is a third-party service provider) and a handoff to sec-04.

**Flags** — none.

### sec-03 — `03-new-hampshire-rsa-309-b-18.md` — role `body` — counted — 608 words — lo-3

**Index entries used, in order**
1. 1#13 — consider whether federal, state, or local statutes may be more
   restrictive (sentence 2)
2. 5#11 — section 309-B:18, New Hampshire Accountancy Act, RSA chapter
   309-B (sentence 3)
3. 5#10 — 1999; last amended effective July 1, 2024 (sentence 5)
4. 5#2, 5#3, 5#1 — the statute's sentence, in full (sentence 7; the
   three quotes are contiguous on the page and are reproduced in the
   statute's order)
5. 5#4 — such information shall be deemed confidential (sentence 8)
6. 5#3 — binds partners, officers, members, managers, shareholders and
   employees (sentence 11)
7. 5#1 — information communicated by the client relating to and in
   connection with services rendered (sentence 12)
8. 5#2 — permission of the client, heirs, successors or personal
   representatives (sentence 13; its second half is file 5's "Does not
   cover": permission is not qualified as written, specific, or informed)
9. 5#5 — disclosures required by the profession's reporting standards
   (sentence 16)
10. 5#6 — court and administrative proceedings under subpoena or summons
    (sentence 17)
11. 5#7 — RSA 310 proceedings, ethics investigations, peer review
    (sentence 18)
12. 5#8, 5#9 — need-to-know sharing in the organization serving the
    client; quality control (sentence 19)

**Classification:** 12 sourced (2, 3, 5, 7, 8, 11, 12, 13, 16, 17, 18,
19) · 0 attributed · 13 connective (1, 4, 6, 9, 10, 14, 15, 20, 21, 22,
23, 24, 25) · 0 flagged.

Sentence 4 is the spec's instruction that no other state's law is
stated. Sentence 9 restates 5#4's claim ("by statute, not by
agreement"). Sentences 14, 20, 22 and 24 are file 5's "Does not cover"
in the participant's terms: no counterpart to "specific consent"; no
service-provider clause; whether a vendor falls within the organization
clause is not addressed; no definition of "voluntarily disclose" and no
mention of technology (J5). Sentence 21 lists the exceptions sentences
16–19 gave and contrasts them with 1#8; sentence 23 draws the
comparison the index Gaps draw ("the two rules do not line up") in the
spec's word, *narrower*, and is the sentence the spec asks the guide to
say and stop at (J4). Sentence 25 is the handoff to sec-04.

**Flags** — none.

### sec-04 — `04-this-courses-position.md` — role `body` — counted — 363 words — lo-1 to lo-3 by application

**Index entries used, in order**
1. File 1 "Does not cover" (never names ChatGPT, an LLM, or generative
   AI in authoritative text) and file 5 "Does not cover" (never names
   technology, a vendor, or a computer system) — sentence 3
2. 1#18 — a nonauthoritative article, "Ethics Staff Insights: AI through
   an ethics lens", discusses threats to compliance when members use AI
   (sentence 4)
3. File 1 "Does not cover" (the AI guidance is cited, not reproduced;
   not in the set) — sentence 5
4. 4#14 — written disclosure and specific consent before sharing with a
   third party vendor, including AI (sentence 13)

**Classification:** 2 sourced (4, 13) · 0 attributed · 9 connective (1,
2, 3, 5, 6, 7, 11, 12, 14) · 3 flagged (8, 9, 10).

The section is built as the spec requires (J2): sentences 1–6 say what
neither rule says, on the index's "Does not cover" notes and 1#18;
sentence 7 marks the change of voice; sentences 8–10 are the position,
each flagged below; sentences 11–14 say what the position is not,
carry the no-advice boundary (sentence 12, J6), and report the
toolkit's own treatment of an AI vendor as a third party vendor (4#14)
as the toolkit's, which supports the position without sourcing it.
Sentence 14 says the toolkit's practices do not depend on the position,
which is true of 4#10–16 as the index states them.

**Flags**
- `UNSOURCED` (position) — "On this course's reading, entering
  confidential client information into ChatGPT is a disclosure of it
  within the meaning of the Confidential Client Information Rule,
  because the information leaves the member's hands and reaches an
  entity the member does not control, which is the Code's own test for
  a third-party service provider." The inference changelog entry 26 and
  the index's "Does not cover" name as the author's: that entering
  information into ChatGPT is a "disclosure" under the Code and that
  OpenAI is an entity the member does not control (1#6). No source
  applies the Rule to a chatbot. Recommended ruling: keep as written —
  it is the position the spec requires, stated once, under its own
  heading, as the course's.
- `UNSOURCED` (position) — "On the same reading, a licensee bound by RSA
  309-B:18 who enters such information into ChatGPT voluntarily
  discloses it within the meaning of the section." The statute's half
  of the same inference: file 5's "Does not cover" says the section
  never names technology and does not say what "voluntarily disclose"
  means. Recommended ruling: keep as written, for the same reason.
- `UNSOURCED` (position) — "The consequence, on this reading, is that
  section 02's two routes and section 03's release are the terms on
  which each rule would allow such a disclosure, and that for a New
  Hampshire licensee the statute's release is the narrower of the two."
  The consequence the course draws from the two flagged sentences above
  and from sec-03 sentence 23. It states what each rule's text would
  require on the course's reading; it does not say what is permitted in
  any reader's situation. Recommended ruling: keep as written; cut it
  if the developer wants the position stated in two sentences and its
  consequence left to the participant.

### sec-05 — `05-keeping-client-data-out.md` — role `body` — counted — 490 words — lo-4

**Index entries used, in order**
1. 4#12 — as a general rule, no client or business information into a
   public LLM (sentence 4)
2. 4#11 — the policy should prohibit uploading or asking questions about
   client data within a public generative AI tool (sentence 5)
3. 4#10 — examples that reference uploading data require all
   identifiable information to be removed prior to use (sentence 14)
4. 4#13 — de-identify (sanitize) personal information before ingesting
   it into both internal AI systems and public tools (sentence 15)

**Classification:** 4 sourced (4, 5, 14, 15) · 0 attributed · 14
connective (1, 2, 3, 6, 7, 8, 9, 10, 11, 13, 16, 17, 18, 19) · 1
flagged (12).

Sentence 2's description of the toolkit (2023; written for practitioners
when ChatGPT was new) is file 4's header and "What it is" in the index,
not a claim entry; classed connective as a statement about the
document. Sentence 3 is the spec's currency instruction in the
participant's terms (J5). Sentences 6–8 gloss 4#11–12: the scope is
"client or business information", which is wider than "confidential
client information"; the comparison is between two quoted phrases
(J4). Sentences 9–10 are the index Gaps ("General-purpose model is
undefined"; file 4 "Does not cover": never names a plan; cannot say
whether a paid workspace is public) (J5). Sentence 11 recaps lesson 2's
line from lesson 2's own sec-01, whose sources (files 10 and 12) are not
this lesson's; it is a handoff and states nothing lesson 2 did not (J7).
Sentence 13 is the boundary on business workspaces (J5). Sentence 16
restates 4#13's "both internal … and public". Sentence 17 is file 4's
lack of a definition and file 1's "Does not cover" (whether
de-identified client data is still confidential client information)
(J5). Sentences 18–19 summarise and hand off.

**Flags**
- `UNSOURCED` (position) — "This course reads the toolkit's public tool
  as including any individual plan, whatever its training setting, so
  that on this course's reading the toolkit's rule keeps client and
  business information out of an individual-plan ChatGPT account; the
  toolkit does not draw that line, and the course does." The mapping
  lo-4's phrase "individual-plan tools" requires: the toolkit says
  "public LLM" and "public generative AI tool" and defines neither
  (index Gaps), and no OpenAI page uses either term. The sentence says
  whose line it is. Recommended ruling: keep as written — without it
  lo-4 cannot be taught from the toolkit's words; reword the objective
  to the toolkit's "public" if the developer would rather the lesson
  draw no line, which is a change to `src/lesson-07.ts` and to the
  course record's objectives, not to this sentence alone.

### sec-06 — `06-consent-disclosure-and-the-policy.md` — role `body` — counted — 519 words — lo-4

**Index entries used, in order**
1. 4#14 — written disclosure to and specific consent from the client
   before confidential information is shared with a third party vendor,
   including AI (sentence 2)
2. 4#15 — if disclosure is not specifically required, consider still
   disclosing a firm's use of AI in the engagement letter (sentence 6)
3. 4#16 — define ordinary use versus extraordinary use such as producing
   counsel or professional advice (sentence 8)
4. 1#12 — in violation if the member cannot demonstrate that safeguards
   were applied (sentence 11, restated from sec-02)

**Classification:** 4 sourced (2, 6, 8, 11) · 0 attributed · 12
connective (1, 3, 4, 5, 7, 9, 10, 12, 13, 14, 15, 16) · 0 flagged.

Sentence 4 splits 4#14 into its three parts. Sentence 5's "cites no
rule" is file 4's "Does not cover" ("mirrors 1.700.040 but cites
nothing"), and its comparison to the Code's second route is between
4#14 and 1#10–11 as quoted (J4). Sentence 7 glosses 4#15 and says the
toolkit names no rule that requires disclosure, which is true of the
entry and of file 4's "Does not cover" (the AICPA Code is not cited)
(J5). Sentences 9–10 gloss 4#16. Sentence 12 is the sentence the
developer should read most carefully: it says a written policy is what
a member can demonstrate, which is index entry 1#12's own gloss ("a
written firm policy is how a firm demonstrates it") and not the Code's
quoted words, which say only that the member must be able to
demonstrate safeguards. Classed connective as an application of 1#12
and listed under J4 for a ruling. Sentence 13 is the no-advice boundary
(J6). Sentences 14–16 are the recap and the handoff to lesson 6 (J5);
the recap refers to the position by section and heading and does not
restate it (J2).

**Flags** — none.

### glossary — `90-glossary.md` — role `glossary` — excluded — 720 words

Ten terms, mirrored in `meta.glossaryTerms` with `sectionId: "glossary"`;
the file's definitions carry a section pointer the module's do not. The
preamble says two terms carry a line the sources leave undrawn, without
a count of sources.

1. **Confidential client information** — 1#2, 1#3, 1#4.
2. **Confidential Client Information Rule** — 1#1; the section number
   from the index's note on file 1.
3. **De-identify** — 4#13, 4#10; the last sentence is file 4's lack of
   a definition.
4. **Need to know** — 5#8, 5#9.
5. **Permission of the client** — 5#2; the last sentence is file 5's
   "Does not cover" (the form of the permission).
6. **Public LLM / public generative AI tool** — 4#12, 4#11, the index
   Gaps; see flag below.
7. **Reasonable assurance** — 1#8, 1#9.
8. **RSA 309-B:18** — 5#11, 5#10, 5#1, 5#3, 5#2; the last sentence is
   file 5's "Does not cover" (no definition of "voluntarily disclose";
   never names technology).
9. **Specific consent** — 1#1, 1#10, 1#11.
10. **Third-party service provider** — 1#6, 1#7, file 1's "Does not
    cover"; see flag below.

**Flags**
- `UNSOURCED` (position) — the *Public LLM / public generative AI tool*
  entry's second sentence: "reading an individual ChatGPT plan as a
  public tool in the toolkit's sense is this course's position, stated
  in section 05." A pointer to sec-05 sentence 12, carrying the same
  position into the glossary so that a participant who looks the term
  up sees whose line it is. Recommended ruling: keep as written; it
  stands or falls with sec-05 sentence 12.
- `UNSOURCED` (position) — the *Third-party service provider* entry's
  last sentence: "treating OpenAI as one is this course's position,
  stated in section 04." GPT-04's entry for the same term stopped at
  "a question the Code does not answer"; this lesson's answers it, as
  the course's, and the entry says so. Recommended ruling: keep as
  written; it stands or falls with sec-04 sentence 8.

## Questions

Written into `src/questions-07.json`. Ten questions: six review, one
after each body section (5.01.2.1), and four assessment, one per
objective (6.01.2, the 75 percent floor is met at one per objective).
Every question is multiple choice with four choices; every feedback
string says why the correct choice is correct and why each of the other
three is wrong on the sources' account, and names the section to re-read
(5.01.2.2). The count is what the text honestly supports, not a minimum;
minimums are superCPE's, from course credit. Each question's `_source`
field in the JSON repeats the entries below.

**The spec's rule for this lesson's questions** — no correct answer may
depend on the course's inference; the inference is taught, not examined
— is met as follows. q-04, the review question after sec-04, tests what
the Code's authoritative text says about AI (1#18 and file 1's "Does not
cover") and not the position; its distractor (b) is wrong because it
puts the position in the Code's mouth, which is the attribution the
section itself makes. q-09 compares the two rules' texts and rests on
sec-03 sentence 23, not on sec-04. No question mentions the position in
a correct choice.

| id | kind | placed / measures | index entries | sentence in the guide that answers it |
|---|---|---|---|---|
| q-01 | review | after sec-01 | 1#2, 1#4; 1#3, 1#5 (distractors) | sec-01 s6 and s11: "… any information obtained from the client that is not available to the public." "… unless the particular client information is available to the public, such information should be considered confidential client information." |
| q-02 | review | after sec-02 | 1#8, 1#10; 1#9, 1#11 (distractors) | sec-02 s7 and s12: the contract plus reasonable assurance; "… obtain specific consent from the client before disclosing …" |
| q-03 | review | after sec-03 | 5#2, 5#5–9; file 5 "Does not cover", 1#8 (distractor b) | sec-03 s7 and s13: "Except by permission of the client …"; s20–21: "There is no service-provider clause." |
| q-04 | review | after sec-04 | 1#18; file 1 "Does not cover" | sec-04 s3–5: never names ChatGPT, an LLM, or generative AI; the note on the staff article; not reproduced. |
| q-05 | review | after sec-05 | 4#12, 4#11, 4#13; file 4 "Does not cover" (distractor b) | sec-05 s4 and s15: "… no client or business information should be entered into a public LLM." "… de-identify, or sanitize, personal information before ingesting it into both internal AI systems and public tools." |
| q-06 | review | after sec-06 | 4#14; 4#15 (distractor b) | sec-06 s2: "… provide written disclosure to and obtain specific consent from the client in the appropriate format before the confidential information is shared." |
| q-07 | assessment | lo-1 | 1#5, 1#4, 1#2, 1#3 | sec-01 s14 (the bankruptcy example), s11 (the default), s6 and s9 (definition; available to the public). |
| q-08 | assessment | lo-2 | 1#9, 1#8, 1#10, 1#12, 1#16 | sec-02 s9 (publicly available information as a factor), s7 and s12 (the two routes), s17 (demonstrate safeguards), s19 (obtain the data). |
| q-09 | assessment | lo-3 | 1#13, 1#8, 1#10; 5#2, 5#5–9; file 5 "Does not cover"; index Gaps | sec-03 s2 (consider more restrictive state law), s7 and s13 (permission), s20–21 and s23 (no service-provider clause; narrower). |
| q-10 | assessment | lo-4 | 4#12, 4#13, 4#14, 4#15, 4#16; 4#4 (distractor b) | sec-05 s4 and s15; sec-06 s2, s6 and s8. |

**Judgments on the questions**, with recommended rulings:

- **Q1 — q-04 examines the Code's pointer, not the position.** The
  review question after the position section could have asked what
  the position is; the spec forbids a correct answer that depends on
  it. q-04 therefore asks what the Code's authoritative text says about
  AI, which sec-04 sentences 3–5 state from 1#18 and the index. The
  question is tagged lo-1 because knowing what the Code does and does
  not say about the tool is part of applying the Rule. Recommended
  ruling: accept; retag to lo-2 if the developer reads the Code's
  AI note as belonging with the third-party interpretation.
- **Q2 — q-07, q-08 and q-09 are scenarios.** q-07's bankruptcy-limited
  practice is the Code's own example with a hypothetical vendor request
  added; q-08's provider and q-09's licensee are unnamed and state no
  fact. Recommended ruling: accept.
- **Q3 — distractors that rest on other lessons' facts.** q-05 (b) and
  q-06 (d) mention a training setting and a vendor's training
  commitment, lesson 2's subject; q-10 (b) mentions human review,
  lesson 4's. Each is wrong because nothing in this lesson's sources
  links that fact to the toolkit's rule, and the feedback says so. No
  file outside 1, 4 and 5 is cited for any of them. Recommended
  ruling: accept.
- **Q4 — q-09 (c) was rewritten before drafting closed.** A first
  version said the statute is "broader" because "permission" is
  unqualified; file 5's "Does not cover" does say the permission is not
  qualified as written, specific or informed, so a participant could
  argue the distractor from the sources. It was replaced with a
  distractor the statute's text plainly contradicts (a service-provider
  clause in the exceptions). Recommended ruling: accept.
- **Q5 — one assessment question per objective.** lo-2 names two routes
  and the continuing responsibility and q-08 measures all three in one
  scenario; lo-4 names two practices and q-10 measures both plus the
  toolkit's three others. Recommended ruling: accept; the count the
  course needs is superCPE's.

## Judgment list — CLOSED (default rulings; developer read pending)

Four `UNSOURCED` flags in the body (sec-04 sentences 8, 9, 10; sec-05
sentence 12), one in the front matter (audience), two in the glossary
(*Public LLM / public generative AI tool*, *Third-party service
provider*): seven in all, each quoted in its section above with its
recommended ruling. The items below are the judgments the draft had to
make that a flag does not capture. Under the CLAUDE.md Rulings rule each
recommendation is the ruling unless the content developer's 4.01.1 read
of the guide text says otherwise; that read is still ahead.

**J1 — rule text reported as the rule's.** Every sentence that says what
the Code, the statute or the toolkit says was written from the index
quote for its entry and checked back against it: for every entry the
guide uses, the quote's wording is found in the guide (a six-word-window
check over the normalised text found every window of 1#1–6, 1#8–11,
1#16, 1#18, 4#11, 4#12, 4#14, 4#15, 5#1–3, 5#7 and most windows of the
rest, the misses being the guide's connective words inside a quote, such
as "the Rule" for the Code's bracketed citation in 1#12). Two
paraphrases to rule on: sec-03 sentence 7 joins 5#2, 5#3 and 5#1 into
the statute's one sentence in the statute's order, and sec-01 sentence 3
gives the Rule's section number from the index's note rather than from
an entry. Recommended ruling: accept both; the statute's sentence is
reproduced whole because splitting it would have changed what its
exception governs.

**J2 — the course's position, stated once; every sentence that states
or refers to it.** The spec asks for the list, by section and sentence,
so the developer's read can go straight to them.

*States the position (flagged):*
- sec-04 s8 — the Code half (disclosure; an entity the member does not
  control).
- sec-04 s9 — the statute half (voluntary disclosure).
- sec-04 s10 — the consequence (the routes and the release as the terms;
  the statute's release the narrower).
- sec-05 s12 — the toolkit's "public" read as including an individual
  plan (a second, separate position, on the toolkit's word rather than
  on either rule).
- glossary, *Public LLM / public generative AI tool*, second sentence —
  restates sec-05 s12 as a pointer.
- glossary, *Third-party service provider*, last sentence — restates
  sec-04 s8's premise as a pointer.

*Refers to the position without stating it (connective):*
- front matter, opening paragraph — names the topic and says the
  position is the course's and not either rule's.
- sec-01 s18 — "Section 04 states, as this course's position, how those
  rules bear on ChatGPT."
- sec-02 s21 — whether OpenAI is a third-party service provider is a
  question the Code does not answer; sec-04 says what the course makes
  of it.
- sec-03 s25 — "Section 04 says what this course makes of that."
- sec-04 s7 — the change-of-voice marker.
- sec-04 s11, s12, s14 — what the position is not.
- sec-06 s14 — the recap, which refers to sec-04 by heading and does
  not restate the position (edited before drafting closed: a first
  version restated it, which the spec's "state it once" does not allow).

No sentence blurs the line: every sentence that applies either rule to
ChatGPT is in sec-04's "The position" or points to it, and every
sentence that reports a rule is in the rule's own words. Recommended
ruling: accept the list; if the developer overrules the position, sec-04
is rewritten as a section on what the rules do not say, and q-04 is
untouched because it does not test the position.

**J3 — lo-4's "individual-plan tools".** The objective's phrase is not
the toolkit's; the toolkit says "public". Sec-05 reports the toolkit's
words, says it defines neither term and names no plan, recaps lesson 2's
line, and then draws the line as the course's in one flagged sentence.
The alternative — teaching lo-4 in the toolkit's word "public" alone —
would leave the objective's phrase untaught. Recommended ruling: accept
as drafted; the other course of action is to reword lo-4, which is a
change to the objectives, not to the prose.

**J4 — glosses classed connective.** Sentences that restate an entry's
meaning, split it into parts, or draw a comparison between two quoted
texts without adding a fact: sec-01 s8, s10, s12, s15, s16; sec-02 s3,
s4, s6, s8, s10, s14, s15, s18, s20; sec-03 s9, s21, s23; sec-05 s6–8,
s16; sec-06 s4, s5, s9, s10, s12. Four are the ones the developer is
most likely to read as claims: sec-01 s16 (the test is what a
disclosure reveals), sec-02 s15 (consent naming none of the three is
not the consent described), sec-02 s20 (a provider does not change who
answers for the work), and sec-06 s12 (a written policy is what the
member can show — index entry 1#12's own gloss, not the Code's words).
Recommended ruling: accept the class; reclassify any read as a claim
about the Code or the statute as a flag, and cut it if the section
reads as well without it. Sec-06 s12 is the one to rule on first.

**J5 — boundary statements, handoffs and the recap.** Sec-02 s11
(reasonable assurance for a given firm not said); sec-03 s4 (no other
state), s14, s20, s22, s24 (file 5's "Does not cover"); sec-04 s3, s5, s6
(neither rule names the tool; the article not reproduced); sec-05 s3
(the toolkit's 2023 product statements not used), s9, s10, s13, s17
(the toolkit's undefined terms; business workspaces; de-identification
undefined); sec-06 s7 (which rules require disclosure), s13 (whether a
policy is enough). Each rests on an index "Does not cover" or Gaps note
or on the spec's instructions, and exists so a participant does not
assume the missing fact. Sec-06's closing paragraph (s14–16) recaps
what the lesson said on whose authority and what it did not say, in
the participant's terms, as GPT-04's did. Recommended ruling: keep the
boundary statements; keep the recap, and cut it whole if the developer
reads it as method rather than summary.

**J6 — the no-advice sentences.** Three sentences say that nothing in
the lesson is advice about a reader's situation: front matter, second
paragraph; sec-04 s12; sec-06 s13 and the last clause of s15. The spec
requires the restraint; the sentences state it in the participant's
terms and do not describe the lesson's method beyond that. Recommended
ruling: keep all; if three reads as one too many, cut sec-06 s13 and
leave the front matter's and sec-04's.

**J7 — lesson 2 recapped without lesson 2's sources.** Sec-05 s11
states lesson 2's line (individual plans train unless the user opts
out; business plans do not by default) so that s12 can say which side
the toolkit's "public" is read to include. Lesson 2's sources for that
line are files 10 and 12, which are not in this lesson's
`meta.sources`; the sentence is a recap of guide/04's sec-01 and adds
nothing to it. Sec-02 s11 recaps lesson 2's list of documents the same
way. Recommended ruling: accept as connective handoffs; add files 10 and
12 as supporting sources if the developer wants every fact the lesson
repeats to be in its own source list.

*Ruling updated 2026-09-14 (changelog entry 33, Part 0):* files 10
(`openai-enterprise-privacy-2026-09-13.pdf`) and 12
(`openai-how-your-data-is-used-2026-09-13.pdf`) are added to
`src/lesson-07.ts` `meta.sources` with role `supporting`, so that the
two recap sentences (sec-02 s11, sec-05 s11) have their facts' sources in
this lesson's own list. The sentences are unchanged and stay classed
connective; the Sections preamble's note that `meta.sources` was
unchanged from the scaffold is superseded by this. The developer's read
is still ahead.

**J8 — no attributed sentence.** Every toolkit entry used (4#10–16) is
CPA.com's own advice and is reported as the toolkit's, classed sourced.
4#3, the quoted executive, is not used; 4#18, the toolkit's Samsung
account, is not used because the index says its details should not be
repeated as fact on the toolkit's authority. Recommended ruling: accept
the class distribution.

**J9 — entries used outside their objective tags.** 1#16 is tagged LO 4
/ L04 and is used in sec-02 for lo-2's "continuing responsibility", as
the scaffold's objective note anticipated. 1#18 is tagged L01 and L05
and is used in sec-04. 4#10 is tagged LO 3 and 5 and is used in sec-05.
The sentence rule is by file, not by tag. Recommended ruling: accept.

**J10 — files 2, 10, 11 and 12 not used.** The index tags 2#5 (nothing
with client information into a trial until the firm knows what happens
to it) and file 10's and 11's DPA, SOC 2 and access entries to LO 5 and
L05, and the Gaps say files 10 and 11 supply the vendor-side half of
the Code's contract route. Lesson 2 taught those facts; this lesson
hands off to it (sec-02 s11) rather than repeating them, so that the
assurance step is described as the Code describes it and not as a list
of OpenAI's documents. Recommended ruling: accept; a revision that
wants the vendor-side half in this lesson adds files 10 and 11 as
supporting and a paragraph to sec-02.

**J11 — body length.** Six sections, 2,953 counted words by `check`'s
estimate, between 363 and 608 words. Sec-03 is the longest because it
reproduces the statute's sentence whole and then each exception in the
statute's words; sec-04 is the shortest because the position is stated
once. Recommended ruling: accept.

**J12 — the scaffold record was filled, not replaced.** This file was
created by entry 25 with empty Sections, Questions and Judgment
headings; the preamble, the objectives block and the "Sources still
needed" bullets are kept as written, and the headings are filled, as
entries 29 and 30 did for GPT-02 to GPT-04. Nothing under `sources/`
and nothing in the index was touched.

## Sources still needed

From the Gaps section of `drafts/GPT-source-index.md` (entry 25), the
bullets that bear on this lesson, verbatim:

- **LO 5 has state law, and the two rules do not line up.** File 5 supplies
  New Hampshire RSA 309-B:18. Its general release is "permission of the
  client" and its exceptions list has no service-provider clause, while
  the Code (file 1) lets a member use a third-party provider under a
  confidentiality contract with reasonable assurance and no client
  consent. Files 10 and 11 supply the vendor-side half of the Code's route
  (a DPA, SOC 2 audits, limited human access, SAML SSO: file 10 entries 8,
  13, 14, 18, 19 and file 11 entries 2, 6); nothing supplies the statute's
  half. A lesson that teaches the Code's contract route as sufficient for
  a New Hampshire licensee would be unsourced on the statute.
- **Neither rule names technology.** Whether entering client information
  into ChatGPT is a "disclosure" (file 1) or a "voluntary disclosure"
  (file 5) is the author's inference in both cases; no source in the set
  applies either rule to a model or a chatbot.
- **"General-purpose model" is undefined.** LO 5 turns on it; file 4 says
  "public LLM" and "public generative AI tool" without defining either, and
  no OpenAI page uses any such term.
