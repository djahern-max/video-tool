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

Learning objectives (from `src/lesson-04.ts`):

Index references are to `drafts/GPT-source-index.md` as it stands in the
tree (regenerated over the final source set, changelog entry 25), by
file number and entry number as that index numbers them. The feature
spec that set these objectives was written against the previous
generation, which numbered files 6–11 differently; the references
below are translated to the current numbering. Files cited here:
8 = `openai-data-controls-faq-2026-09-13.pdf`, 10 = `openai-enterprise-privacy-2026-09-13.pdf`, 12 = `openai-how-your-data-is-used-2026-09-13.pdf`.

- **lo-1** — Distinguish the training defaults: individual plans train on conversations unless the user opts out; Business and Enterprise do not train by default, with explicit opt-in as the only exception. [index 12#1,2,7; 10#2,3,23]
- **lo-2** — Locate and set the training control on an individual plan, and state what it does and does not do: account-wide, prospective, does not clear history, and feedback can override it. [index 8#1–4,8; 12#3–5]
- **lo-3** — Describe the controls a Business or Enterprise workspace adds: admin access to conversations, retention settings, a Data Processing Addendum, and SOC 2 Type 2. [index 10#8,15,17,19,20]


---

## Sections

## Questions

## Judgment list — OPEN

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
