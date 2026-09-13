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

## Questions

## Judgment list — OPEN

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
