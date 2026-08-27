# video-tool

Local, never deployed. Turns a lesson data file into a narrated Remotion video
and exports it as a **course package** for superCPE to ingest. The package
format in `docs/course-package.md` is the only thing this repo shares with
superCPE; superCPE's copy is authoritative and this one is kept identical to it.

## Lineage
This is abacadaba's `video/` directory (../abacadaba/video) lifted into its own
repo. Unlike superCPE, which was written fresh, the pipeline here is carried
over as-is: the ElevenLabs alignment-based reveal timing took real iteration to
get right, and the committed MP3s cannot be regenerated identically. Read
`../abacadaba/video/README.md` and `../abacadaba/CHANGELOG.md`'s "Video
pipeline" entries before changing anything.

## Stack
- Remotion, React, TypeScript
- ElevenLabs text-to-speech with character-level alignment
- ffprobe (system) for duration verification at export

## Three rules that hold everything up
1. **Content is data.** A lesson is a `src/lesson-NN.ts` array of plain objects
   plus a `src/questions-NN.json`. Slide components never know which lesson
   they render.
2. **Timing is measured, never typed.** Every duration and reveal reads from
   `audio-meta-NN.json`. No number expressing a duration appears in a component.
   `usingEstimates` is true until every narrated block has generated audio, and
   nothing may be exported while it is true.
3. **One copy of the narration.** `narration` is the transcript of record and
   carries the `[[r]]` reveal markers. `transcriptOf()` strips them.

## Layout
    src/                lesson data, slides, Remotion root
    scripts/            generate-audio.ts, export.ts
    public/audio/NN/    generated narration, committed (unreproducible = source)
    out/                rendered MP4s, ignored
    dist/               exported packages, ignored
    docs/               course-package.md, kept identical to superCPE's
    current-feature.md  the ONE feature being built right now
    CHANGELOG.md        append only, same format as superCPE

## Workflow
1. `current-feature.md` is the single source of truth. Build exactly what it
   describes; list anything out of scope at the end.
2. **Never run `npm run generate` without `--dry-run`.** Generating audio spends
   ElevenLabs credits and is the human's step.
3. Rendering (`npm run render`) is free and may be run.
4. When done, append the changelog entry and stop.

## Costs and secrets
- ElevenLabs key in `.env`, gitignored. Voice and model are frozen; changing
  them means regenerating every block of every lesson for consistency.
- Voice settings are recorded in `scripts/generate-audio.ts`. Do not change
  them inside a feature; that is a separate decision.

## Commands
    npm run dev                      Remotion Studio
    npm run generate -- --lesson 01 --dry-run
    npm run render -- --lesson 01
    npm run export -- --lesson 01
