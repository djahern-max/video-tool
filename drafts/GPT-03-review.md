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

## Questions

## Judgment list — OPEN

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
