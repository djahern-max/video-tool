# video-tool

Local, never deployed. Turns a lesson data file into a course package: either a
narrated Remotion video or a markdown study guide, packaged in the shape
`docs/course-package.md` defines.

## Boundary

This repo emits **course packages**. That format is the only interface it has
to anything else; superCPE's copy of `docs/course-package.md` is authoritative
and this one is kept byte-identical to it. Neither repo imports from the other,
and no other consumer is supported.

A package is the deliverable, not the MP4, because five things a bare video
cannot carry live in the package and nowhere else:

- `duration_source: "measured"` — 7.02.7 needs the actual A/V duration. The
  number is never typed downstream; the tool that rendered it attests it was
  measured from the narration.
- `meta.status: "reviewed"` — 4.01.1 and 4.02. Export refuses anything else.
- `video.blocks` — measured per-block timings, so review questions can be
  placed at real points in the program (5.01.2.1).
- `transcript.md` — the transcript of record, retained under 9.02.1(8).
- `content_hash` — changed content re-ingests as a new lesson version instead
  of silently overwriting one.

## Stack

- Remotion, React, TypeScript
- ElevenLabs text-to-speech with character-level alignment
- ffprobe (system) for duration verification at export

## Four rules that hold everything up

1. **Content is data.** A lesson is a `src/lesson-NN.ts` array of plain objects
   plus a `src/questions-NN.json`. Slide components never know which lesson
   they render.
2. **Timing is measured, never typed.** Every duration and reveal reads from
   `audio-meta-NN.json`. No number expressing a duration appears in a component.
   `usingEstimates` is true until every narrated block has generated audio, and
   nothing may be exported while it is true.
3. **One copy of the narration.** `narration` is the transcript of record and
   carries the `[[r]]` reveal markers. `transcriptOf()` strips them.
4. **Review is a human's signature.** `meta.status` is `"draft" | "reviewed"`.
   Export refuses anything but `"reviewed"`, naming the lesson's review
   document. Nothing in the tooling sets it.

## Two kinds of lesson

`meta.kind` is `"video"` or `"text"`; absent means `"video"`.

- **Video.** Narrated blocks, rendered by Remotion, exported with
  `video.mp4` + `transcript.md`.
- **Text.** A study guide is the program: markdown sections under
  `guide/<lessonId>/` with roles `front_matter | body | glossary | appendix`,
  review questions placed `after_section`, optional supplemental clips. Only
  `body` words count toward credit (7.02.5) and superCPE computes the count —
  a module that declares its own `word_count` is refused. Every clip must claim
  `avIsAdditionalLearning: true`: if the video reads the guide aloud, it does
  not belong in a text package (7.02.7). A text lesson with no clips never
  touches Remotion or ElevenLabs; `render` and `generate` refuse it by name.

## Layout

    src/                lesson data, slides, Remotion root
    guide/<lessonId>/   text-lesson markdown sections
    scripts/            generate-audio.ts, export.ts, validate-package.ts
    public/audio/NN/    generated narration, committed (unreproducible = source)
    drafts/             per-lesson review documents, the reviewer's surface
    sources/            authoritative extractions the narration cites
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
- The MP3s under `public/audio/` are committed **source, not build output**.
  They cannot be regenerated identically, and regenerating them spends credits.
  Deleting one means resetting the matching `audio-meta-NN.json` to `{}` in the
  same commit, or the lesson renders silent while still claiming measured
  timings.

## Maintained duplicates

Two files here are hand-kept copies of superCPE code. When they disagree with
their originals, the originals win.

- `scripts/validate-package.ts` ← `backend/app/services/packages.py`
- `scripts/word-count.ts` ← `word_count.py`

## Commands

    npm run dev                      Remotion Studio
    npm run generate -- --lesson 01 --dry-run
    npm run render -- --lesson 01
    npm run export -- --lesson 01
    npm run check                    validate every lesson
    npm run typecheck
