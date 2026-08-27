# video-tool

Remotion compositions for CPE lesson videos, and the exporter that turns a
rendered lesson into a course package superCPE can ingest.

Local, never deployed. The package format in `docs/course-package.md` is the
only thing this repo shares with superCPE; superCPE's copy is authoritative
and this one is kept identical to it.

The lessons currently in `src/` — the hazardous-waste course *Where Does It
Actually Go?* and the non-CPE ocean-energy lesson — are test fixtures for the
exporter, not superCPE content. They will be removed once the first
accounting lesson exists.

## Setup

```bash
npm install
cp .env.example .env    # fill in the ElevenLabs key before generating
npm run dev             # Remotion Studio at localhost:3000
```

## Build order

The order matters, and it is not the obvious one. Every command takes
`-- --lesson <id>`.

**1. Render silent, and judge the slides.** Block durations start as
word-count estimates at 130 wpm, so you can see the whole lesson before
spending a single ElevenLabs credit. Scrub through Studio. Fix what reads
badly. `npm run check` validates every lesson's blocks and reveals offline.

**2. Generate narration. Human step — this spends ElevenLabs credits.**

```bash
npm run generate -- --lesson 01 --dry-run   # always dry-run first
npm run generate -- --lesson 01
```

Reads `narration` from each block, strips the `[[r]]` reveal markers, and
sends one API call per block — one file per block, so correcting one sentence
regenerates one block, not the lesson. Unchanged blocks are skipped by
content hash; `-- --only <block-id>` forces a single block, `-- --force`
regenerates everything. Writes `public/audio/<id>/<block-id>.mp3` and
`src/audio-meta-<id>.json`: measured duration and measured reveal seconds,
per block.

**3. Render.**

```bash
npm run render -- --lesson 01     # out/lesson-01.mp4
```

**4. Export the package.**

```bash
npm run export -- --lesson 01     # dist/<lesson_id>.zip
```

Refuses, with the reason, anything superCPE would reject: an unreviewed
lesson (`meta.status` not cleared), estimated durations, a render whose
ffprobe duration disagrees with the audio metadata, or any violation of the
contract rules mirrored in `scripts/validate-package.ts`. On success the zip
holds `manifest.json`, `video.mp4`, `transcript.md`, and `questions.json`
under a single `<lesson_id>/` directory.

**5. Upload to superCPE**, at its admin packages page. superCPE re-runs the
same validation on ingest; if it rejects a package this tool exported, the
bug is here.

Every exported package is unreviewed content until a licensed CPA signs it
off inside superCPE. Export attests measurement, not correctness.

## Structure

```
src/
  lesson-NN.ts         one lesson, content as data — no React, no timing numbers
  lessons.ts           LessonId -> lesson module, the one place that imports a lesson by name
  questions-NN.json    one lesson's questions, in the contract's questions.json shape
  questions.ts         LessonId -> questions, alongside LESSONS
  audio-meta-NN.json   measured durations and reveals, written by npm run generate
  types.ts             PackageLessonMeta and Question — what the manifest needs
  theme.ts             palette, type, layout tokens
  Sheet.tsx            drawing border + title block, wraps every slide
  slides.tsx           slide components, generic (Statement, Facts, Calc, List, Compare, Title)
                       and lesson-bespoke, all rendering from a block's data
  Lesson.tsx           sequences one lesson's blocks; no timing numbers
  Root.tsx             one composition per lesson, durations derived from content
scripts/
  generate-audio.ts    --lesson <id>; TTS with character-level alignment
  render.ts            --lesson <id>; wraps remotion render
  export.ts            --lesson <id>; builds, validates, and zips the package
  validate-package.ts  local mirror of superCPE's ingest rules (packages.py is authoritative)
  check-lessons.ts     offline invariants: markers, reveals, figures, pacing
public/audio/<id>/     narration, one file per block — committed; regenerating
                       costs money and gives a different take
docs/                  course-package.md, kept identical to superCPE's copy
out/                   rendered MP4s, gitignored, reproducible
dist/                  exported packages, gitignored, reproducible
```

Narration text may contain `[[r]]` markers, one per element in that block's
`reveals` array — a marker is where a slide element should appear.
`generate-audio.ts` strips them before sending text to ElevenLabs, then uses
the character-level alignment ElevenLabs returns to record the exact second
each marker was spoken. Until a block has been generated, its hand-written
`reveals` array is the fallback.

## Design notes

The visual language is a construction drawing set. Each slide is a numbered
sheet inside a drawing border, with a title block in the lower right carrying
the course code, the citation under discussion, the revision, and the sheet
number. That is not decoration: it puts a persistent citation on screen
without a caption fighting the content.

Palette is drafting vellum, graphite, and the fluorescent pink of surveyor's
flagging tape. The pink marks only the thing currently under discussion. If
it appears on more than two elements at once, something is wrong.

The `DRAFT — NOT REVIEWED` stamp comes from a lesson module's own
`meta.status`, which is the single authority on whether a lesson may ship:
export refuses any lesson whose status is not cleared, and the reviewer
clears it (LESSON-RUNBOOK.md, step 6).

## Two things that are compliance, not preference

**Estimated durations must never reach the credit calculation.** Under
7.02.7, when the entire program is video, credit is
`[video minutes + (questions × 1.85)] / 50`. The runtime in that formula has
to be the real one. `Root.tsx` warns loudly, per lesson, while any block is
still estimated; export refuses outright, and the manifest's
`duration_source: "measured"` is the attestation superCPE relies on.

**The transcript is a supplement, not required reading.** If the transcript
is presented as required course content, the narration becomes "narration of
the text" under 7.02.7 and you lose the argument for counting runtime. The
exported `transcript.md` is the transcript of record (9.02.1(8)), retained
for review — not participant reading material, and never counted in
`word_count`.
