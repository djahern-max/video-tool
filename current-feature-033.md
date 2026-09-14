# Current Feature

## GPT-06 "A task, start to finish" — script, screen design, questions

> Changelog entry 33. Stops before `generate`. No narration is purchased.

## Goal
Lesson 08 (`src/lesson-08.ts`, `src/questions-08.json`,
`drafts/GPT-06-review.md`) is a complete, renderable video lesson of about
5–6 minutes that walks one de-identified task through prompt, output,
verification, and correction, with the work visible on screen. Every block
renders in the v2 theme with estimated timings (`usingEstimates` true) and
the last rule-1 ERROR in `check` is gone. `meta.status` stays `"draft"`.
The developer reads the script before any audio is bought.

## Part 0 — GPT-05 J7
Add files 10 and 12 to `src/lesson-07.ts` `meta.sources` as supporting.
Update J7's ruling in `drafts/GPT-05-review.md`. No prose change.

## The task
A straight-line depreciation schedule for three fictional assets, each
with cost, salvage value, and useful life given as plain inputs. Three
assets, three years shown. Chosen because the arithmetic is small enough
to check on screen and the model's error can be *seen*, not described.

Hard limits on what the video may say:
- **No fact about any accounting standard, tax rule, or method choice.**
  "Straight-line" is used as the arithmetic the participant asked for,
  nothing more. No ASC, no IRS, no "GAAP requires".
- **The session is composed, and says so.** Once, early: this is an
  illustration built for the course, not a recording of a real session.
  The model's output on screen is written by us to show the failure the
  sources describe; it is not evidence of what ChatGPT does.
- **The failure shown must be one the index sources.** The ordinary
  response gives a figure that is wrong (9#1, 4#3 attributed, 9#12); it is
  caught by recomputing (10#7–9, GPT-04's rule); the corrected pass uses
  the code tool or an external recompute (9#12). Nothing about *how often*
  or *why* — no source says.
- **Every number shown as correct is correct.** Compute them in the
  module; do not type results. Every number shown as wrong is plainly
  labelled wrong on screen and in narration.
- **De-identified inputs only** (4#10, 4#13): asset names are generic
  ("Vehicle A"), no client, no firm, no real dollar figures that look
  like a real client's.

## Script
Write `src/lesson-08.ts` narration as roughly 12–16 blocks totalling
750–950 words (about 5–6 minutes at the current voice's measured rate
from ATO-02's audio-meta; compute the rate, don't assume 150 wpm). Shape:

1. What the task is and that the session is composed.
2. Writing the prompt — clear, specific, context, examples (13#4; GPT-03).
3. The output appears. It looks fine.
4. Verification — recompute one asset's figure by hand on screen. One
   figure is wrong. (GPT-04 lo-1; 10#7–9.)
5. Why that can happen, in one sentence, from GPT-01: generated, not
   computed (4#3 attributed; 9#1).
6. The corrected pass: rerun with the code tool, or recompute outside;
   the figure now matches (9#12).
7. What was kept: the prompt, the output, the check — lo-4 of GPT-04 says
   firm policy decides the record's form (4#4–6); state nothing about
   what the record contains.
8. Close: the rule the whole course has been building to — treat output
   as a first draft and verify before relying on it (10#7).

Sourcing is the three-way sentence rule, applied to narration. Each block
lists its index entries in a comment. Attribute the toolkit quote. The
accuracy record is `drafts/GPT-06-review.md` in the text lessons' shape,
one block per section, default rulings written in, list CLOSED pending the
developer's read. Flag anything unsourced; stop and report above ten.

**Additional learning (7.02.7).** The screen must carry what the voice
does not say: the prompt text, the output table, the hand recomputation,
the wrong figure and the right one side by side. Narration explains;
it does not read the screen aloud. If a block's screen only mirrors its
narration, redesign the block; do not set the flag to make it pass.
Set whatever `docs/course-package.md` requires of a video lesson's
duration and additional-learning attestation honestly, and say in the
record how each block earns it.

## Screen design
Extend the block types as needed, in the v2 theme, no new colours:
- **Session** — a chat pane: prompt appears as if typed, then the output
  appears below it as a small table. Typing and appearance are timed to
  reveals.
- **Check** — a side panel: the participant's own arithmetic for one
  asset, line by line, with counting numbers, ending in a figure that is
  compared against the table's. The mismatched cell is highlighted
  (blue → the "wrong" role; teal is reserved for the corrected figure).
- **Row sweep** — a highlight that moves down the table when the
  corrected output arrives, settling teal on the fixed cell.
Reuse Title, Statement, and Calc where they fit. Every new component gets
a still rendered at its last frame into `out/` for the developer.

## Questions
`src/questions-08.json`: review questions at sensible points
(`after_block`, per the package contract for video lessons) and at least
one assessment question on lo-1, correct answers stated in narration and
traced. Same distractor rule as the text lessons.

## Out of scope
- `npm run generate` in any form except `--dry-run` at the end. The
  developer reads the script first and buys audio after.
- `export`. Any change to other lessons beyond Part 0.
- Any real ChatGPT session, screenshot, or product image.

## Read first
- `CLAUDE.md`; `docs/course-package.md` (video lessons, `after_block`,
  duration and additional-learning fields); `LESSON-RUNBOOK.md`
- `src/lesson-02.ts` — ATO-02 as the worked video example
- `drafts/GPT-source-index.md` — files 4, 9, 10, 13
- `guide/03/`, `guide/06/` — the rules this video demonstrates
- `src/theme*` and block components after entry 31

## Verify
1. `npm run typecheck` clean; `npm run check` shows **no ERROR anywhere**;
   lesson 08 `[draft]` WARN and `usingEstimates` noted.
2. `npm run render -- --lesson 08` with estimated timings; report frame
   count and estimated duration. Stills of every new block type in `out/`.
3. Narration word count and the computed wpm rate used.
4. Sentence counts (sourced / attributed / connective / flagged).
5. `npm run generate -- --lesson 08 --dry-run`: every block `no audio
   yet`, nothing sent.
6. `git status` limited to lesson 08 files, its questions and record,
   new/changed components, `src/lesson-07.ts` and its record (Part 0),
   `CHANGELOG.md`, spec rotation. No `audio-meta`, no MP3.
7. One report. Then commit.

## Changelog
Entry 33. Standards touched: 7.02.7 (how each block is additional
learning), 4.01.1 (script unread), 3.01, 5.01.2.1, 5.01.2.2, after reading
them. Under Decisions: why the session is composed and labelled so, and
why no standard is named. Under Known gaps: estimated timings; unread;
flags.

## Not this feature
Developer's read of the whole course (`docs/developer-read.md`);
`generate` (paid) and `render` with measured audio; export of course GPT.
