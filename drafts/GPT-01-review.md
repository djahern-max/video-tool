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

## Questions

## Judgment list — OPEN

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
