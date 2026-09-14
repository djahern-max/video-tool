# GPT-02 — Setting up for professional use — accuracy record

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

Drafted 2026-09-14 (changelog entry 29): six body sections, front matter,
glossary, ten questions. Every flag and judgment item below carries a
recommended ruling under the CLAUDE.md Rulings rule; the judgment list is
closed on those defaults, and the content developer's 4.01.1 read of the
guide text is still ahead. Still unchecked.

Learning objectives (from `src/lesson-04.ts`):

Index references are to `drafts/GPT-source-index.md` as it stands in the
tree (regenerated over the final source set, changelog entry 25), by
file number and entry number as that index numbers them. The feature
spec that set these objectives was written against the previous
generation, which numbered files 6–11 differently; the references
below are translated to the current numbering. Files cited here:
8 = `openai-data-controls-faq-2026-09-13.pdf`, 10 = `openai-enterprise-privacy-2026-09-13.pdf`, 12 = `openai-how-your-data-is-used-2026-09-13.pdf`; 11 = `openai-enterprise-privacy-print-2026-09-13.pdf` is cited by the glossary only (added 2026-09-14, J5).

- **lo-1** — Distinguish the training defaults: individual plans train on conversations unless the user opts out; Business and Enterprise do not train by default, with explicit opt-in as the only exception. [index 12#1,2,7; 10#2,3,23]
- **lo-2** — Locate and set the training control on an individual plan, and state what it does and does not do: account-wide, prospective, does not clear history, and feedback can override it. [index 8#1–4,8; 12#3–5]
- **lo-3** — Describe the controls a Business or Enterprise workspace adds: admin access to conversations, retention settings, a Data Processing Addendum, and SOC 2 Type 2. [index 10#8,15,17,19,20]


---

## Sections

Index references are to `drafts/GPT-source-index.md` (entry 25 numbering,
extended for file 9 in entry 29, which this lesson does not use): 8 =
`openai-data-controls-faq-2026-09-13.pdf`, 10 =
`openai-enterprise-privacy-2026-09-13.pdf` (Reader-view capture), 11 =
`openai-enterprise-privacy-print-2026-09-13.pdf` (print-layout capture;
glossary only), 12 = `openai-how-your-data-is-used-2026-09-13.pdf`.

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
scope is limited to handoffs ("lesson 5 takes up …") and to statements of
what the pages do not state, where a participant would otherwise assume
something; those are listed under J7 for the developer to cut if they read
as method.

**Tally, whole lesson (body sections only):** 89 sentences — 56 sourced,
0 attributed, 32 connective, 1 flagged `UNSOURCED`. Four further flags sit
outside the body: one in the front matter (audience) and three in the
glossary (*Data Processing Addendum*, *Training*, *Workspace admin*), the
glossary's all boundary flags. Five flags in all. The attributed count is zero because every
source is OpenAI stating its own policy for its own products; there is no
third-party claim to report as someone else's (J8).

**Section plan.** Written from lesson 04's three objectives and the index
entries the scaffold cites for them (12#1,2,7 and 10#2,3,23 for lo-1;
8#1–4,8 and 12#3–5 for lo-2; 10#8,15,17,19,20 for lo-3), plus entries of
the same files that the prose needed: 10#1, 10#4, 10#9–14, 10#16, 10#18,
10#22, 8#5–6, 8#9, 12#6, 12#8. Six sections, two per objective. The
`<!-- index: … -->` comment at the head of each body file lists the
entries the prose uses; it is stripped before counting.

Word counts are `npm run check`'s estimate as of this draft; superCPE's
count is authoritative.

### front-matter — `00-front-matter.md` — role `front_matter` — excluded — 336 words

The "How this course works" block is the template from the end of
`docs/course-package.md`, unmodified (4.05.3 item 4). The opening
paragraph names the course, this lesson's ordinal, and the lesson's three
topics from its objectives; no lesson list, no course-level descriptor,
no source count. The second paragraph names the lesson's sources by
description ("help-center pages on data controls and on how your data is
used …, and its enterprise privacy page") and gives no number, so it does
not drift when `meta.sources` changes.

**Flags**
- `UNSOURCED` (descriptive) — "It is written for CPAs in public practice
  who use, or are deciding whether to use, ChatGPT in their work, and it
  assumes no prior experience with the tool." The audience statement, in
  the same words as GPT-01's, which the developer ruled keep on
  2026-09-14. Same flag class as ATO-01's front matter.
  Recommended ruling: keep as written — course reasoning, not a sourced
  claim; consistent with the ruling on GPT-01.

### sec-01 — `01-two-kinds-of-service.md` — role `body` — counted — 420 words — lo-1

**Index entries used, in order**
1. 12#1 — ChatGPT improves by training on conversations unless you opt
   out (sentences 3, 4, 7, 14)
2. 12#2 — services for individuals (ChatGPT, Codex): may use content to
   train (sentence 5)
3. 10#22 — OpenAI uses data from the individual versions of ChatGPT
   (sentence 6)
4. 12#7 — business products not trained on by default (sentences 3, 9)
5. 10#2 — business data not used for training by default (sentences 10,
   15)
6. 10#23 — product-by-product restatement, API after March 1, 2023
   (sentence 10)
7. 10#1 — "business data" defined (sentence 11)
8. 10#4 — Business and Enterprise are the two plans for employees
   (sentence 12)
9. 10#3 — explicit opt-in as the exception (sentence 15, with a forward
   reference)

**Classification:** 11 sourced (3, 4, 5, 6, 7, 9, 10, 11, 12, 14, 15) ·
0 attributed · 4 connective (1, 2, 8, 13) · 1 flagged (16).

Sentence 3 states the lesson's thesis, that the two sides start from
opposite defaults; it compresses 12#1 and 12#7 and is classed sourced on
both. Sentence 10's "twice" is what the index records (entries 2 and 23
are two statements of the same default on one page). Sentence 12 keeps
the page's own framing — the two plans it describes as the way to deploy
ChatGPT to employees — and does not say they are the only business plans,
because the page names six products (10#1).

**Flags**
- `UNSOURCED` (interpretive) — "Which side of the line an account is on
  is a fact about the account, not about the person using it: a CPA who
  signs in to a personal ChatGPT account at work is on the individual
  side, whatever the work is." The application of 12#2 that lo-1 exists
  to teach: the page's condition is "when you use our services for
  individuals", and this sentence says that condition follows the service,
  not the user. No source applies it to a professional using a personal
  account. Recommended ruling: keep — it is the sentence a participant
  needs, and it adds no fact beyond 12#2's condition; cut the second half
  if the developer reads it as a claim about a specific case.

### sec-02 — `02-turning-training-off.md` — role `body` — counted — 309 words — lo-2

**Index entries used, in order**
1. 8#1 — Data Controls decide whether conversations are used to improve
   models (sentences 1, 2)
2. 8#2 — turn it off under Settings → Data Controls, or "Do not train on
   my content" in the privacy portal (sentences 4, 5, 6)
3. 12#3 — either option is sufficient (sentences 4, 7)
4. 8#4 — account-wide, not per device (sentence 8)
5. 8#8 — can be changed at any time, no restrictions (sentence 10)
6. 8#9 — Team, Enterprise and Edu plans have additional data controls;
   defers to the enterprise privacy page (sentence 11)
7. 10#4 — Business and Enterprise (sentence 12)

**Classification:** 10 sourced (1, 2, 4, 5, 6, 7, 8, 10, 11, 12) ·
0 attributed · 3 connective (3, 9, 13) · 0 flagged.

Sentence 5 names the switch as the FAQ prints it, "Improve the model for
everyone". That label is not in the index entry's quote; it was read from
the page at the entry's location (file 8, pp. 2–3, the question heading
and the step lists; also file 12, p. 2) for this draft, because lo-2 asks
the participant to locate the control and a control is located by its
label (J1). Sentences 11–12 put the FAQ's "Team" and the enterprise
privacy page's "Business" side by side without asserting that they are
the same plan (J2). Sentence 9 restates 8#4 and is classed connective.

**Flags** — none.

### sec-03 — `03-what-the-setting-does.md` — role `body` — counted — 389 words — lo-2

**Index entries used, in order**
1. 12#4 — opting out is prospective, "new conversations" (sentence 2)
2. 8#3 — history is kept (sentence 5)
3. 12#5 — feedback puts the whole conversation into training even after
   opting out (sentences 8, 9)
4. 12#6 — Temporary Chat: no history, no memories, no training (sentences
   11, 13)
5. 8#5 — Temporary Chats deleted after 30 days (sentences 12, 13)
6. 8#6 — may be reviewed only to monitor for abuse (sentence 12)
7. 12#8 — some data retained; personal information reduced before
   training sets (sentence 14)

**Classification:** 8 sourced (2, 5, 8, 9, 11, 12, 13, 14) ·
0 attributed · 8 connective (1, 3, 4, 6, 7, 10, 15, 16) · 0 flagged.

Sentences 4 and 15 are boundary statements: 4 rests on the "Does not
cover" notes of both files 8 and 12 ("whether opting out affects
conversations already used"), and 15 on both files' "how long ordinary
conversations are retained". They state no fact about OpenAI's handling
and are classed connective (J7). Sentence 13's "up to 30 days" is 8#5's
"deleted … after 30 days" read as an upper bound; the page gives no
earlier deletion, and the phrase claims none.

**Flags** — none.

### sec-04 — `04-the-business-default.md` — role `body` — counted — 373 words — lo-1

**Index entries used, in order**
1. 10#1 — business data defined; commitments attach to it (sentence 3)
2. 10#2 — not used for training by default (sentence 4)
3. 10#23 — product-by-product restatement (sentence 5)
4. 12#7 — business products not trained on by default (sentence 6)
5. 10#3 — explicit opt-in, feedback mechanisms as the example (sentences
   7, 9, 10, 11)
6. 12#1 — individual side: unless you opt out (sentence 10, the contrast)
7. 12#5 — feedback on the individual side (sentence 11, the comparison)
8. 10#9 — automated classifiers; classifications are metadata (sentence
   14)
9. 10#10 — human review only as described, service by service (sentence
   15)

**Classification:** 10 sourced (3, 4, 5, 6, 7, 9, 10, 11, 14, 15) ·
0 attributed · 6 connective (1, 2, 8, 12, 13, 16) · 0 flagged.

Sentence 7's "in the same paragraph" is where 10#2 and 10#3 sit on the
page (p. 1). Sentences 9–11 gloss the three words of 10#3 and each is
classed sourced on the entry it glosses; sentence 11's comparison with
the individual side is 12#5. Sentence 12 is a boundary statement resting
on file 10's "Does not cover" ("whether a Business workspace member can
opt in individually"), classed connective (J7).

**Flags** — none.

### sec-05 — `05-who-can-see-conversations.md` — role `body` — counted — 369 words — lo-3

**Index entries used, in order**
1. 10#4 — the two plans for employees (sentence 1)
2. 10#16 — ChatGPT Business described (sentence 2)
3. 10#11 — ChatGPT Enterprise described (sentence 3)
4. 10#17 — Business: admins can view, access, export, delete (sentences
   5, 6, 10, 11)
5. 10#18 — Business: OpenAI's access limited to authorized employees and
   confidentiality-bound contractors (sentences 7, 10)
6. 10#12 — Enterprise: users see their own; admins reach an audit log
   through the Compliance API (sentences 8, 10, 11)
7. 10#13 — Enterprise: OpenAI employees' three grounds (sentences 9, 10)

**Classification:** 10 sourced (1, 2, 3, 5, 6, 7, 8, 9, 10, 11) ·
0 attributed · 3 connective (4, 12, 13) · 0 flagged.

Sentence 6 restates 10#17 in the index's own gloss ("a firm's admin can
read staff chats"). Sentence 10 is a synthesis across entries 4–7: on
both plans admins can reach conversations and OpenAI's access is a stated
list; each component is sourced, and the generalisation is listed as J3.
Sentence 11 contrasts 10#17 with 10#12. The Business and Enterprise
answers are kept under separate headings because the page answers the
question separately for each product (file 11's entries 10 and 12 record
that structure; the body cites neither, and file 11 is listed as
supporting for the glossary only, J5).

**Flags** — none.

### sec-06 — `06-retention-addendum-audit.md` — role `body` — counted — 384 words — lo-3

**Index entries used, in order**
1. 10#15 — Enterprise: admins control retention; deleted conversations
   removed within 30 days unless law requires (sentences 2, 4, 5, 13)
2. 10#20 — Business: admins control retention; deleted or unsaved
   conversations removed within 30 days unless law or harm prevention
   (sentences 3, 4, 5, 13)
3. 10#8 — Data Processing Addendum for Business, Enterprise, the API
   (sentences 7, 13)
4. 10#14 — Enterprise, Edu, Healthcare: SOC 2 Type 2 (sentences 10, 13)
5. 10#19 — Business: SOC 2 Type 2 (sentences 10, 13)
6. 10#17, 10#12 — admin access, restated in the closing list (sentence 13)

**Classification:** 7 sourced (2, 3, 4, 5, 7, 10, 13) · 0 attributed ·
8 connective (1, 6, 8, 9, 11, 12, 14, 15) · 0 flagged.

Sentence 4 compares the two retention answers; the two differences it
names (unsaved conversations; the harm-prevention ground) are visible in
the two quotes side by side and nowhere else, so it is classed sourced on
both entries and listed as J4. Sentence 8 says the addendum is the one
item that takes the form of an agreement the firm and OpenAI execute;
"execute" is 10#8's word, and the sentence adds no term of the addendum
(J6). Sentence 12 points to the glossary for the page's one-line
description of the SOC 2 audit, which is 11#6 (J5). Sentence 13's "Set
against section 02's single switch" is the lesson's contrast, not a claim
that individual plans lack the four items; files 8 and 12 do not describe
any of the four for individuals (their "Does not cover" notes), and the
four items themselves are each sourced (J6).

**Flags** — none.

### glossary — `90-glossary.md` — role `glossary` — excluded — 570 words

Ten terms, mirrored in `meta.glossaryTerms` with `sectionId: "glossary"`;
the file's definitions carry a section pointer the module's do not. The
preamble says one document is listed as supporting and why (the SOC 2
line), without a count.

1. **Business data** — 10#1.
2. **Data Controls** — 8#1.
3. **Data Processing Addendum (DPA)** — 10#8; see flag below.
4. **Enterprise Compliance API** — 10#12.
5. **"Improve the model for everyone"** — 8#2 and 8#3; the label as the
   page prints it (J1).
6. **Privacy portal** — 8#2, 12#3.
7. **SOC 2 Type 2** — 10#14, 10#19, and 11#6 for the page's description
   of what its SOC 2 audit confirms. File 11 added to `meta.sources` as
   `supporting` for this entry (J5).
8. **Temporary Chat** — 12#6, 8#5, 8#6.
9. **Training (on conversations)** — 12#1; see flag below.
10. **Workspace admin** — 10#17, 10#12, 10#15, 10#20; see flag below.

**Flags**
- `UNSOURCED` (boundary only) — the *Data Processing Addendum* entry. It
  describes the addendum by 10#8 (OpenAI can execute one for Business,
  Enterprise and the API) and does not say what an addendum is or what
  this one contains; no file in this lesson's list does. The entry
  therefore does not define the term, only locate it. Recommended ruling:
  keep as written — a definition from general knowledge is what the spec
  forbids, and lesson 5 is where the addendum's purpose is taken up.
- `UNSOURCED` (boundary only) — the *Training (on conversations)* entry.
  Its definition is 12#1's usage; its last sentence says what training
  does with a conversation technically is not described on either
  help-center page, which is file 8's "Does not cover" ("what 'used to
  train' means technically"). Recommended ruling: keep as written —
  honest boundary, same class as GPT-01's *large language model*.
- `UNSOURCED` (boundary only) — the *Workspace admin* entry. The page
  uses the term without defining it; the entry describes the role by what
  the page says it can do (10#17, 10#12, 10#15, 10#20) and says so.
  Recommended ruling: keep as written — same class as above.

## Questions

Written into `src/questions-04.json`. Ten questions: six review, one
after each body section (5.01.2.1), and four assessment — one each on
lo-1 and lo-2, two on lo-3, which names four distinct controls (6.01.2,
the 75 percent floor is met at one per objective). Every question is
multiple choice with four choices; every feedback string says why the
correct choice is correct and why each of the other three is wrong on
the sources' account, and names the section to re-read (5.01.2.2). The
count is what the text honestly supports, not a minimum; minimums are
superCPE's, from course credit. Each question's `_source` field in the
JSON repeats the entries below.

| id | kind | placed / measures | index entries | sentence in the guide that answers it |
|---|---|---|---|---|
| q-01 | review | after sec-01 | 12#1, 12#2, 10#2, 10#3 | sec-01 s14–15: "On an individual plan, conversations are used for training unless the user opts out. On ChatGPT Business or ChatGPT Enterprise, they are not, unless the customer has explicitly opted in …" |
| q-02 | review | after sec-02 | 8#2, 12#3; 8#4 (distractor) | sec-02 s4–7: "There are two places to turn training off, and either one is enough. … under Settings, then Data Controls … 'Improve the model for everyone' … 'Do not train on my content'. … either option is sufficient …" |
| q-03 | review | after sec-03 | 12#5; 8#3, 8#5 (distractors) | sec-03 s8: "Even after opting out, you can still give feedback on a response … and if you do, the entire conversation associated with that feedback may be used to train OpenAI's models." |
| q-04 | review | after sec-04 | 10#2, 10#3; 10#8, 10#9, 10#15, 10#20 (distractors) | sec-04 s7: "… if you have explicitly opted in to share your data with OpenAI, for example through its opt-in feedback mechanisms, to improve its services, then OpenAI may use the shared data to train its models." |
| q-05 | review | after sec-05 | 10#17, 10#18; 10#12 (distractor) | sec-05 s5 and s7: "… end users can view their own conversations, and … workspace admins … can view, access, export, and delete end user conversations in the workspace." "OpenAI's own access … is limited … to authorized employees … and to specialized third-party contractors …" |
| q-06 | review | after sec-06 | 10#15; 10#2 (distractor) | sec-06 s2: "On ChatGPT Enterprise, the page says, workspace admins control how long data is retained, and any deleted conversations are removed from OpenAI's systems within 30 days unless OpenAI is legally required to retain them." |
| q-07 | assessment | lo-1 | 12#1, 12#2, 12#7; 10#2, 10#3, 10#22, 10#23 | sec-01 s14–15 (above) and sec-04 s4, s7. |
| q-08 | assessment | lo-2 | 8#3, 8#4, 8#6, 8#8; 12#4, 12#5 | sec-02 s8: "… the setting applies to the entire account; it does not matter which device you are using." sec-03 s2 ("… will not train its models on your new conversations"), s5 ("… will still appear in your chat history …"), s8 (feedback, above). |
| q-09 | assessment | lo-3 | 10#17, 10#12, 10#15, 10#20, 10#8, 10#14, 10#19; 10#13, 10#18, 10#2, 10#3 (distractors) | sec-06 s13: "… the enterprise privacy page gives a workspace four things: admin access to members' conversations, admin control of retention, a Data Processing Addendum, and a SOC 2 Type 2 audit." |
| q-10 | assessment | lo-3 | 10#12; 10#13 (distractors) | sec-05 s8: "… workspace admins can access an audit log of conversations and GPTs through what the page calls the Enterprise Compliance API." |

**Judgments on the questions**, with recommended rulings:

- **Q1 — q-01's distractor (d) is the point the section's one flag makes.**
  The correct choice rests on sourced sentences 14–15; the flag (sentence
  16, that the side of the line follows the account) is what (d) gets
  wrong, and the feedback says the pages attach the default to the
  service. Recommended ruling: accept — the feedback cites 12#2's
  condition, not the flagged sentence.
- **Q2 — q-09's correct choice is sec-06's closing list**, a summary
  sentence over seven entries; the feedback names each entry's claim.
  Recommended ruling: accept.
- **Q3 — two assessment questions on lo-3, one each on lo-1 and lo-2.**
  Coverage is one per objective; the second lo-3 question exists because
  the objective names four controls and the Enterprise audit-log route is
  the one a Business-only reading would miss. Recommended ruling: accept;
  the count the course needs is superCPE's.
- **Q4 — q-03 and q-08 use the switch label** "Improve the model for
  everyone" in the stem. Same reading as J1. Recommended ruling: accept.

## Judgment list — CLOSED (default rulings; developer read pending)

One `UNSOURCED` flag in the body (sec-01 sentence 16), one in the front
matter (audience), three in the glossary (*Data Processing Addendum*,
*Training*, *Workspace admin*): five in all, each quoted in its section
above with its recommended ruling. The items below are the judgments the
draft had to make that a flag does not capture. Under the CLAUDE.md
Rulings rule each recommendation is the ruling unless the content
developer's 4.01.1 read of the guide text says otherwise; that read is
still ahead.

**J1 — the switch's label is read from the page, not from the index.**
"Improve the model for everyone" is the name file 8 prints for the
training setting (pp. 2–3: the question heading and each step list) and
file 12 repeats (p. 2); index entry 8#2 quotes the location ("Settings →
Data Controls") and the privacy-portal wording but not the label. The
label is used in sec-02 sentence 5, sec-03 sentence 1, the glossary, and
two question stems. Same situation as GPT-01's J5 (the tool's name).
Recommended ruling: accept — lo-2 asks the participant to locate the
control, and the label is how a control is located; an index entry
carrying the label would be the tidy fix, but index edits beyond file 9
are outside this feature.

*Update, 2026-09-14 (changelog entry 30).* The tidy fix is made: file 8
now carries entry 10, quoting the page's question heading, "How do I stop
my chats from training ChatGPT? (i.e., “Improve the model for everyone”)?"
(p. 2). Recommended ruling, revised: accept, citing 8#10. The label's
uses in sec-02 sentence 5, sec-03 sentence 1, the glossary's *"Improve
the model for everyone"* entry and the two question stems (q-03, q-08)
now trace to that entry; sec-02's index tag carries it, since sec-02 is
where the label is introduced. No prose changed.

**J2 — "Team".** The index's Gaps say the set cannot describe a plan
called Team and cannot say whether Team and Business are the same plan.
Sec-02 sentences 11–12 report 8#9 (Team, Enterprise and Edu have
additional data controls; see the enterprise privacy page) and then 10#4
(that page names Business and Enterprise), and say the lesson uses the
enterprise privacy page's names. Nothing asserts identity or renaming.
lo-3's wording already says "Business or Enterprise". Recommended ruling:
accept as drafted.

**J3 — sec-05 sentence 10 is a synthesis.** "On both plans, then, a
workspace member's conversations are reachable by the workspace's admins,
and OpenAI's own access is stated as a limited list" generalises 10#17,
10#12, 10#18 and 10#13. Each component is sourced; no entry states the
generalisation. Classed sourced. Recommended ruling: accept as drafted;
reclassify as a flag if the developer reads "reachable" as wider than
"view, access, export, and delete" plus "an audit log".

**J4 — sec-06 sentence 4 compares the two retention answers.** The two
differences named — "unsaved" and the harm-prevention ground — are in
10#20's quote and absent from 10#15's; the sentence reports the
difference and draws no conclusion from it. Recommended ruling: accept.

**J5 — file 11 added to `meta.sources` as `supporting`.** The glossary's
*SOC 2 Type 2* entry needed the page's own description of what the audit
confirms, which only the print-layout capture carries (11#6); the spec
allows extending `meta.sources` for a glossary term, marked supporting.
The body cites no file 11 entry. The scaffold's source list had omitted
file 11 although the index tags thirteen of its entries to this lesson;
that omission predates this feature and is not corrected beyond the
glossary's need. Recommended ruling: accept; the developer may promote
file 11 to primary if a later revision cites it in the body (the date,
11#1, is the obvious candidate).

**J6 — two contrast sentences in sec-06.** Sentence 8 ("the one item in
this section that takes the form of an agreement the firm and OpenAI
execute") and sentence 13 ("Set against section 02's single switch …
four things") are contrasts drawn by the lesson. Neither adds a fact:
"execute" is 10#8's word, and the four items are each sourced; the
contrast with the individual plan rests on files 8 and 12 describing none
of the four for individuals. Both classed connective. Recommended ruling:
accept as drafted.

**J7 — boundary statements left in the body.** Sec-03 sentences 4 and 15
and sec-04 sentence 12 say what the pages do not state (retroactivity of
the opt-out; retention length on an individual plan; who in a workspace
can opt in). Each rests on an index "Does not cover" note, each exists so
that a participant does not assume the missing fact, and each is phrased
as a statement about the page, not about the course's sourcing. Feature
28's rule kept sentences of this kind in GPT-01 ("This lesson gives no
date for the cutoff"). Recommended ruling: keep all three; cut any the
developer reads as method rather than scope.

**J8 — zero attributed sentences.** GPT-01 used the attributed class for
a quoted executive in the CPA.com toolkit. This lesson's sources are all
OpenAI's statements about its own products, which the course reports as
what the vendor says and the index carries as claims; there is no
third-party assertion to hold at arm's length. Recommended ruling: accept
the class distribution.

**J9 — body length.** Six sections, 2,244 counted words by `check`'s
estimate, all between 309 and 420 words. Nothing was written to a number;
sec-02 is the shortest because 8#2, 8#4 and 8#8 say what they say in few
words. Recommended ruling: accept.

**J10 — the glossary's "Improve the model for everyone" is a quoted label
used as a term.** It is listed under its own label, in quotation marks,
because that is what a participant will search for. Recommended ruling:
accept.

**J11 — sec-01 sentence 12 and sec-05 sentence 1 say Business and
Enterprise are "the two" plans the page names for deploying ChatGPT to
employees.** That is 10#4's claim ("Business and Enterprise are the two
plans OpenAI names for deploying ChatGPT to employees"); the page names
six products in all (10#1), and the sentences do not say the two are the
only business plans. Recommended ruling: accept as drafted.

## Sources still needed

From the Gaps section of `drafts/GPT-source-index.md` (entry 25), the
bullets that bear on this lesson, verbatim:

- **LO 2's training controls are sourced on both sides of the line.** File
  10 says business data — ChatGPT Business and Enterprise by name — is not
  used for training by default and that the exception is an explicit
  opt-in; file 12 says the same for business products and gives the
  consumer default (training on, opt-out available); file 9 gives the
  consumer switch; file 11 dates the business commitments January 8, 2026.
- **LO 2's "Team" is still a name only one source uses.** File 8 says Team,
  Enterprise and Edu have "additional data controls" and stops. Files 6,
  10, 11 and 12 say "Business" and never "Team". Nothing in the set says
  whether Team and Business are the same plan, and nothing says one
  replaced the other. The set can distinguish consumer from business and
  can describe Business and Enterprise; it cannot describe a plan called
  Team. Rewording the objective is not this index's decision.
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
- **The ChatGPT Business product page is not in the set.** The image-only
  capture was removed, so the product page's own description of the plan
  is not citable. File 10's Business FAQ answer (entry 16) is the set's
  description of what ChatGPT Business is, and the business pricing grid
  (file 6) is the set's list of what it includes.
- **Prices are in no file.** Both pricing captures are feature grids
  without plan cards. The course does not need a price, but it cannot
  state one.
- **LO 2's ✓s are all high-currency-risk.** Every source bearing on LO 2 and
  L02 is a web page (6, 7, 8, 10, 11, 12), the 2023 toolkit (4), or a
  vendor-question list (2). File 10 is the most complete of them and is
  undated in its own capture; file 11 supplies the date for the same page.
- **SAML SSO is sourced as a commitment, not as a plan feature.** File 11
  lists it under OpenAI's general commitments; no file says which plan has
  it, because the business pricing grid was captured without its Security
  & Administration rows.
