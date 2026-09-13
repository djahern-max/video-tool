# Current Feature

## GPT course, source index — regenerated for the final source set

## Why this runs again
Entry 24 reported two things about the source set. The Reader-view recapture
of the enterprise-privacy page had lost the page's "Updated: January 8,
2026" date and its SAML SSO line, and the ChatGPT Business product page was
an image whose only text was testimonials. Both are fixed in `sources/gpt/`
(commit 8239c24): the original print-layout capture is restored from git
history as `openai-enterprise-privacy-print-2026-09-13.pdf` alongside the
Reader-view capture, and `openai-chatgpt-business-2026-09-13.pdf` is removed.
Thirteen files.

The index is regenerated whole, as entries 23 and 24 were. Overwrite
`drafts/GPT-source-index.md`. Two captures of one page is deliberate: index
each as its own section, and in the print-layout section's "Claims
supported" take the date, the SSO line, and the retention-control bullet
that the Reader-view capture lacks; do not repeat claims the Reader-view
section already carries.

Everything below is entry 22's spec, unchanged except where marked **(v2)**, **(v3)** or **(v4)**.

## Goal
`drafts/GPT-source-index.md` exists and tells the author, for every file in
`sources/gpt/`, exactly which claims that file supports — quoted verbatim with
a page reference — so that lesson prose can be written from the index and
every factual sentence traces to a source *before* drafting. This is the
pre-drafting sourcing rule from the ATO course, made executable for course
GPT.

Nothing in this feature drafts lesson content, registers a lesson, or touches
a source file.

## The course this serves
Working title: "Using ChatGPT in an Accounting Practice". Field of study
Computer Software & Applications (Non-technical), Basic, QAS Self Study,
course code `GPT`. Planned shape — five text lessons and one video lesson:

| # | Working title | Kind |
|---|---|---|
| 01 | What the model is doing | text |
| 02 | Setting up for professional use | text |
| 03 | Prompting for accounting tasks | text |
| 04 | Verifying the output | text |
| 05 | Confidentiality and client data | text |
| 06 | A task, start to finish | video |

Working learning objectives:
1. Describe how a large language model produces a response and identify the
   failure modes that matter in professional work: fabrication, staleness,
   instruction drift.
2. Configure a ChatGPT workspace for professional use, including data-sharing
   and training controls, and distinguish consumer, Team, and Enterprise data
   handling.
3. Apply a structured prompt pattern (role, task, inputs, constraints, output
   format) to routine accounting tasks.
4. Verify model output against a source before relying on it, and document
   the verification.
5. Identify client information that must not be entered into a
   general-purpose model under the confidentiality rule, and apply a firm
   policy to a given situation.

These are working drafts. The index reports how well the sources cover them;
it does not rewrite them.

## In scope
- Reading every file in `sources/gpt/`
- Overwriting `drafts/GPT-source-index.md` **(v2)**
- A changelog entry

## Out of scope
- Any change under `sources/`. Not a rename, not a re-save, not a text
  extraction written there. Extract to a temp directory or `out/`.
- Any change to any other file under `drafts/`. **(v2)**
- `npm run new`, or any lesson module, questions file, or `guide/` content.
  The course is not registered by this feature.
- Rewriting the learning objectives or lesson list. Report gaps; do not fix
  them.
- Web research. If a source does not say something, the index says the
  source does not say it. Do not fill in from general knowledge.

## Read first
- `CLAUDE.md`, "Evidence directories" and "Four rules"
- `drafts/SEC-01-flag-triage.md` — the shape of the problem this index
  prevents: 41 UNSOURCED flags found after drafting
- `sources/gpt/` — list it; the file set is whatever is there, and the index
  must cover all of it

## Tasks

### 1. Extract
Extract text from every PDF in `sources/gpt/` into a temp directory, one
`.txt` per source, with page breaks preserved so page numbers can be cited.
`pdftotext -layout` is fine; the Standards under `docs/standards/` were
extracted the same way. **(v2)** Entry 22 used pypdf in a scratchpad
virtualenv because pdftotext was absent; do the same, and do not add a
dependency to `package.json` for it. If a file is not a PDF, report what it is and index
it from whatever text can be read; if nothing can be read, say so in the
index rather than guessing at its contents.

Do not commit the extracted text.

### 2. Index each source
One section per file, in filename order. Each section has exactly these
parts:

**Header** — filename as it exists on disk; publisher; document title as
printed on the document; publication or last-updated date if the document
states one, otherwise "not stated"; retrieval date if the filename carries
one.

**What it is** — two or three sentences on what the document is and who it
is written for. Not a summary of its contents.

**Claims supported** — a list. Each entry is one factual claim the course
could make, followed by the supporting passage quoted verbatim, at most 40
words, with its page number. The claim is in the index's words; the quote is
in the document's. One claim, one quote. If a claim needs two passages, that
is two entries. Aim for the claims that matter to the learning objectives
above, not for completeness — twelve well-chosen entries beat forty.

**Does not cover** — things a course author might expect this document to
support but it does not. **(v3, v4)** For the business-plan files (pricing-business and both
enterprise-privacy captures): say plainly which plan names each one
uses, whether any names "Team", and what each says about whether business
data is used for training. For pricing-personal: what it says about training
on data, if anything. Objective 2 depends on this and entries 22 and 23 could
not settle it. Note that the grid captures repeat cell text in row labels;
quote them as they are. Two to five bullets. This is the part that prevents
UNSOURCED flags: it is where the author learns that the prompt-engineering
page says nothing about accuracy, or that the data-controls FAQ does not
define "Enterprise".

**Currency risk** — one line. Is this a help-center page that can change
without notice, a dated publication, or a statute? This drives the 4.01
review cadence later.

### 3. Coverage
After the per-source sections, one table: rows are the five learning
objectives and the six lessons, columns are the source filenames, cells are
✓ where the source has at least one claim entry bearing on that row. Then a
short **Gaps** list: objectives or lessons with no ✓, or with a ✓ only from a
source whose currency risk is high. Report; do not propose new sources.

### 4. Two sources are probably not this course
`cpacom-ai-solution-due-diligence-guide.pdf` and
`cpacom-build-vs-buy-ai-decision-framework.pdf` are about selecting AI tools
for a firm. Index them like the rest, but if their claim entries do not bear
on any learning objective, say so plainly in a one-line note at the top of
each section rather than stretching claims to fit.

### 5. Changelog
One entry, numbered one past the last, in the CLAUDE.md format. **(v4)** Say
that this supersedes entry 24's index and why, in one line; do not edit
entry 22. Standards
touched: cite 4.01.1 only if, having read it in the 2026 Statement under
`docs/standards/`, the content developer's accuracy-review duty is what this
index serves. Otherwise write "none".

## Verify
1. Every quote in the index is findable verbatim in the extracted text of the
   source it is attributed to. Check mechanically — grep each quote — and
   report the count checked and the count found. A quote that cannot be found
   is removed, not paraphrased.
2. Every file in `sources/gpt/` has a section. `ls sources/gpt/` and the
   section headers must match one to one.
3. `git status` shows exactly two changes: `drafts/GPT-source-index.md`
   modified and `CHANGELOG.md` modified. Nothing under `sources/`. **(v2)**
   If the tree is not clean before starting, stop and report — `sources/gpt/`
   should have been committed before this runs.
4. `npm run typecheck` and `npm run check` unchanged from before — nothing
   here touches code, so this is a sanity check, not a gate.

## Not this feature
Registering course GPT, drafting lesson 01, and writing questions are the
next features, in that order, and each starts from this index.
