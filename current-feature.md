# Current Feature

## Video theme v2, end-of-video tail, voice-change dry run

> Run after feature 31 (GPT-05). Number the changelog entry from the last
> one in `CHANGELOG.md`.

## Goal
A rendered lesson looks like a page of the superCPE app, is readable at
the size the app's player shows it, and does not cut the narrator's last
word. Verified by re-rendering ATO-02 (lesson 02) — render only, no
narration generated. Nothing about what is said, counted, or measured
changes except the total duration if a tail is added.

## Why
The content developer watched ATO-02 in the superCPE player and found:
small monospace type on cream and pink cards, cramped spacing, a sheet
background that does not match the app, and the narrator's final word
cut off at the end. Entry 21 put the logo palette in the chrome; the
sheets themselves were not restyled.

## Part 1 — Theme v2
Wherever the theme tokens live after entry 21, restyle the sheet surfaces
to match the superCPE app's own UI, not the logo:
- White sheet background; page-level background the app's light grey if
  the player shows one around the video.
- Headings in navy (#032660), accents and highlights in blue (#0166FC),
  teal (#01B0A9) only for a single emphasis role. No pink, no cream.
- Body type: a proportional sans, not monospace, at a size readable when
  the player is ~700 px wide — assume body text must be legible at half
  the render's native width. Monospace remains only for literal code,
  prompts, or figures presented as typed.
- Spacing: generous line height and card padding; at most one idea per
  card; comparison cards side by side get a clear gutter and equal widths.
- Chrome (shield, footer strip with lesson id, source, and block ref)
  stays, restyled to match.
- Every existing block type renders in the new theme. Practice lesson
  BALLOON-01 and ATO-02 are the test set.

Do not change any narration, block id, `estimatedSeconds`, reveal, or
`audio-meta`. If a layout cannot fit its content at the new type size,
report the block; do not shrink the type to make it fit.

## Part 2 — Tail cut
1. Measure: `ffprobe` the last block's MP3 duration and the rendered
   ATO-02 MP4 duration; compare against where the final block starts.
   Report whether the MP4 ends before the audio does, or exactly at it
   with no silence after.
2. If the render ends at or before the last audio sample, add a fixed
   end tail (a configurable constant, default 1.5 s) of the closing
   sheet after the final block's audio ends. The tail is part of the
   rendered file and therefore part of the measured duration; it is not
   narration and contains no new content.
3. If the MP4 already carries a tail, report that the cut is in the
   player, not the render, and change nothing.

## Part 3 — Voice-change dry run
`ELEVENLABS_VOICE_ID` in `.env` was changed by the developer. Run
`npm run generate -- --lesson 02 --dry-run` and `--lesson 01 --dry-run`
(BALLOON-01, if still registered). Report the per-block miss reasons;
every generated block should report `voice changed: <old> to <new>`.
Send nothing. Regenerate nothing. Record the old and new voice ids in the
changelog entry so the record of which voice produced ATO-02's existing
audio survives.

## Out of scope
- `generate` without `--dry-run`. Not one block.
- Any narration or content edit to any lesson.
- GPT-06 design — next feature. Any new block type or animation.
- `export`. ATO-02's package in superCPE is test data and is not
  re-exported here.

## Read first
- `CLAUDE.md`; `CHANGELOG.md` entry 21 (theme rebrand) and entry 13
  (audio identity); `LESSON-RUNBOOK.md`
- The theme module and every sheet/block component under `src/`
- `scripts/render.ts` (or whatever `npm run render` runs) — where the
  composition's total duration is computed

## Verify
1. `npm run typecheck` clean; `npm run check` unchanged from before the
   feature except any finding this feature deliberately introduces (none
   expected).
2. `npm run render -- --lesson 02`; report frame count and duration before
   and after. If Part 2 added a tail, duration grows by exactly the tail.
3. Extract three frames from the new ATO-02 render (a title sheet, a
   comparison sheet, the closing sheet) to `out/` for the developer to
   look at, and name the files.
4. Part 3 dry-run output, per block.
5. `git status` limited to theme/component files, the render script if
   touched, `CHANGELOG.md`, and the spec rotation files. No `audio-meta`
   change, no MP3 change.
6. One report. Then commit.

## Changelog
Standards touched: 7.02.7 is not affected (no narration or additional-
learning claim changes); 9.02.2(2)(ii) if the tail changes the measured
duration — say so. Under Decisions: why type size wins over fit, and why
the tail is a render constant rather than silence appended to the last
MP3. Under Known gaps: any block that no longer fits.

## Not this feature
GPT-06: an on-screen task walkthrough — a prompt typed, output appearing,
the wrong figure highlighted, the corrected figure beside it — designed
against a real block from GPT-06's script. Then the ATO-02 rebuild.
