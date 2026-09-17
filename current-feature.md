# Current Feature

## Feature NN — Sharper text in the render, and export checks that block ends fall in silence

> Set NN from the last entry in `CHANGELOG.md`. Entry 34 (lead-in and closing hold) was the last one seen when this was drafted.

## Goal

1. **Sharper text.** Rendered sheets keep crisp text edges: lossless frame capture and an explicit encoder quality, instead of Remotion's defaults. Frame count, fps, dimensions, and measured duration are unchanged.
2. **Silence guard.** `npm run export` refuses a video lesson if any `video.blocks[].end_seconds` does not fall inside a silence in the rendered MP4. superCPE pauses for review questions at those points, and this makes that attestation measured rather than assumed.

## Why

**Blur.** Slide text in GPT-06 looks soft in superCPE's player, worst when the player is narrow. Part of that is scale and cannot be fixed here: a 1920-wide frame shown at ~400 px. superCPE's full-screen feature addresses that.

The part this repo owns is capture and encode. Entry 01 recorded "JPEG re-encode noise" when comparing renders, which suggests Remotion's default JPEG frame capture is in use. JPEG rings and smears high-contrast text edges before H.264 ever sees them.

**Silence guard.** superCPE measured GPT-06: every block end is inside a silence, with at least 0.5 s of silence before it and only 0.07–0.19 s after it. That holds today because `generate` appends a 0.6 s tail to every block. Nothing verifies it.

A future change could silently move block ends into speech, as entry 34 changed the opening and 03's offset rule had to survive that. Candidate changes include the lead-in, the title hold, the tail, or how `blocks` is built.

## Standards

Read 7.02.7 and 9.02.2(2)(ii) in the 2026 Statement before citing them.

- The measured duration must not change. It is the A/V term of the credit formula, and its supporting documentation is retained. Re-rendering changes `video.mp4`'s bytes, so `content_hash` changes and superCPE ingests a new version. That is expected. Pre-launch, all superCPE data is test data.
- No narration, MP3, `audio-meta`, reveal, or block timing may change.

## In scope

- Recon of current render settings and the current GPT-06 file's encode
- Render settings: frame image format, CRF, codec and pixel format stated explicitly
- The silence guard in `scripts/export.ts`, with named constants
- Re-render and re-export lesson 08 (GPT-06)
- Changelog

## Out of scope

- `npm run generate` in any form except `--dry-run`
- Changing composition width, height, or fps, or any timing constant in `src/timing.ts`
- Type sizes, sheet design, footer strip content
- Rendering slides as HTML for the browser, or any package contract change
- `docs/course-package.md` (see Known gaps: report, do not edit)
- Anything in `../supercpe`
- Re-exporting lesson 02 (ATO-02). You may re-render it to confirm the settings apply, but do not export it.

## Locators

- `scripts/render.ts`
- `remotion.config.ts`, if present
- `src/Root.tsx`: composition width, height, fps
- `scripts/export.ts`: the video branch, its existing ffprobe duration check, and its refusal style
- `scripts/validate-package.ts`: read only. The guard needs the media file, so it belongs in export, as rule 5's ffprobe does.
- `dist/GPT-06/video.mp4` and `out/lesson-08.mp4`

## Tasks

### 0. Recon

Write the answers into the changelog draft first.

1. Current render settings:
   - every `Config.*` call in `remotion.config.ts`
   - every flag `render.ts` passes to `remotion render`
   - the composition's `width`, `height`, `fps` for lesson 08
2. `ffprobe -v error -show_streams -show_format dist/GPT-06/video.mp4`. Report:
   - `width`, `height`, `pix_fmt`, `profile`, `r_frame_rate`
   - video `bit_rate`, `nb_frames`
   - format `duration` and file size
3. The installed Remotion version, and the exact option names it uses for image format, CRF, and pixel format.
   - Check its docs or types in `node_modules`, not memory.
   - If PNG frame capture is not available for H.264 output in this version, stop and report.

### 1. Render settings

Set explicitly, in one place (`remotion.config.ts` if it exists, else `render.ts` flags), each with a comment saying why:

- **Frame image format: PNG.** Lossless capture, so text edges are not JPEG-damaged before encoding.
- **Codec `h264`, pixel format `yuv420p`.** Stated, not defaulted. `yuv420p` is what every browser plays. Dark text on white is mostly luma, which 4:2:0 keeps at full resolution.
- **CRF 16.** Sheets are mostly static, so the size cost is small. Report the before/after file size. If the file more than triples, report it and use 18.

Do not change dimensions or fps.

### 2. Silence guard in export

In the video branch of `export.ts`, after the existing ffprobe duration check and before building `dist/`:

1. Run `ffmpeg -i <render> -af silencedetect=noise=<SILENCE_NOISE_DB>dB:d=<SILENCE_MIN_SECONDS> -f null -`. Parse the `silence_start` and `silence_end` pairs.
2. Constants, commented as ours (not from the Standards):
   - `SILENCE_NOISE_DB = -45`
   - `SILENCE_MIN_SECONDS = 0.3`
3. Treat two silences separated by less than 50 ms as one. GPT-06 has a 9 ms gap at 249.014–249.023 that should not fail a block.
4. For every entry in `blocks`, refuse unless `end_seconds` lies within a merged silence interval. The refusal names:
   - each failing block id and its `end_seconds`
   - the nearest silence interval
   - that superCPE pauses for review questions at block ends, so an end inside speech cuts the narrator off
5. Refuse before anything is created under `dist/`, like every other refusal.
6. ffmpeg missing is its own refusal, naming the binary. ffprobe is already required, and ffmpeg ships alongside it.

### 3. Re-render and re-export lesson 08

- `npm run render -- --lesson 08`, then `npm run export -- --lesson 08`.
- The measured duration must equal the previous render's to the frame. If it does not, stop and report.

### 4. Changelog

## Verify

1. `npm run typecheck` clean. `npm run check` output unchanged from before the feature.
2. **Recon answers** recorded.
3. **Before/after:**
   - render a still of the same frame in both settings: a dense sheet, e.g. S-03 or a Calc/Compare sheet
   - put both PNGs in `out/` for the developer
   - report the ffprobe fields from Task 0.2 for the new file, and the size change
4. **`nb_frames` and format `duration`** equal the old render's. The `blocks` array in the new manifest is byte-identical to the old one.
5. **The guard passes on lesson 08.**
6. **Negative test** on a scratch copy of the manifest data, not a committed file. Shift one block's `end_seconds` by +0.5 s into speech: export refuses, names the block, and creates nothing under `dist/`.
7. **`npm run generate -- --lesson 08 --dry-run`** reports every block unchanged, and nothing is sent.
8. **`git status`** shows no change under `public/audio/` or `src/audio-meta-*.json`.

## When done

Append the entry.

**Standards touched:**
- **7.02.7:** duration unchanged, frame for frame.
- **9.02.2(2)(ii):** block timings now verified against the rendered file.

**Decisions:**
- PNG capture
- CRF value and the size it cost
- `yuv420p` over `yuv444p`, for browser playback
- the guard lives in export, not the validator, because it needs the media
- the 50 ms merge rule

**Known gaps:**
- The superCPE package for GPT-06 is stale until the developer uploads the new zip.
- **Contract wording is stale.** `docs/course-package.md` says the first `start_seconds` "is the title sheet's duration." Since entry 34 it is `LEAD_IN_SECONDS` (GPT-06's manifest shows 1, with the title's `estimatedSeconds` at 4). Report the wording. Do not edit it here: the contract is edited byte-identically in both repos, as its own change.
- The superCPE player pauses 0.3 s before `end_seconds` (superCPE 036). That depends on `generate`'s `TAIL_SECONDS` staying at least 0.3. Name the constant's location, so a future change to it knows it has a consumer.

Then stop.
