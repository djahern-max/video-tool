# GPT-06 — A task, start to finish — accuracy record

This is where the content developer records checking the drafted
narration for accuracy (4.01.1), **before any narration audio is
generated**. Once a block is voiced, changing one sentence costs an
ElevenLabs regeneration and produces a different take — so every correction
is nearly free now and expensive later.

How to read it: for each block, the narration as drafted (reveal markers
`[[r]]` left in place), the sources relied on with the specific paragraph,
and what each reveal marker reveals. Then the same for each question. The
lesson data lives in `src/lesson-NN.ts` and `src/questions-NN.json`; edit
those files, not this one.

**Status, first draft (2026-09-13).** Unchecked and unvoiced.
`meta.status` is `"draft"`; export refuses it. The 4.02 independent content
review happens in superCPE, against the ingested package — not in this file.

Learning objectives (from `src/lesson-08.ts`):

Index references are to `drafts/GPT-source-index.md` as it stands in the
tree (regenerated over the final source set, changelog entry 25), by
file number and entry number as that index numbers them. The feature
spec that set these objectives was written against the previous
generation, which numbered files 6–11 differently; the references
below are translated to the current numbering. Files cited here:
4 = `cpacom-genai-toolkit.pdf`, 9 = `openai-does-chatgpt-tell-the-truth-2026-09-13.pdf`, 13 = `openai-prompt-engineering-best-practices-2026-09-13.pdf`.

- **lo-1** — Carry a de-identified accounting task through prompt, output, verification, and refinement, and identify where the model's output required correction. [index 13#4; 9#7–12; 4#10,13]


---

## Block 1 — S-01

## Questions

## Judgment list — OPEN

## Sources still needed

From the Gaps section of `drafts/GPT-source-index.md` (entry 25), the
bullets that bear on this lesson, verbatim:

- **L06 has no source of its own.** The video lesson will rest on file 4's
  use-case prompts (2023, naming tools that may no longer exist as named),
  on files 6, 8, 9 and 13 for the workspace, settings, verification and
  iteration steps. Nothing in the set describes a complete accounting task
  end to end.
