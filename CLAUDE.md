# video-tool

Local, never deployed. Turns a lesson data file into a course package: either a
narrated Remotion video or a markdown study guide, packaged in the shape
`docs/course-package.md` defines.

## Boundary

This repo emits **course packages**. That format is the only interface it has
to anything else; superCPE's copy of `docs/course-package.md` is authoritative
and this one is kept byte-identical to it. Neither repo imports from the other,
and no other consumer is supported.

A package is the deliverable, not the MP4, because four things a bare video
cannot carry live in the package and nowhere else:

- `duration_source: "measured"` — 9.02.2(2)(ii) requires retaining the
  supporting documentation for the data used in the word count formula,
  including A/V duration. The number is never typed downstream; the tool that
  rendered it attests it was measured from the narration. (7.02.7 governs
  *whether* that duration may be counted at all — see "Two kinds of lesson.")
- `video.blocks` — measured per-block timings, so review questions can be
  placed at real points in the program (5.01.2.1).
- `transcript.md` — the transcript of record, retained under 9.02.2(7) program
  materials and as word count formula supporting documentation under
  9.02.2(2)(ii).
- `content_hash` — changed content re-ingests as a new lesson version instead
  of silently overwriting one.

`meta.status` is not one of them: it is in neither branch's manifest and no
package carries it. It is a gate on what may be built — export refuses a
lesson the content developer has not checked under 4.01.1. See rule 4.

Note that **9.02.1 is group programs**. Self study is 9.02.2, and its list of
required documentation elements ends at item 7. Cite 9.02.2 here, matching
superCPE.

### What this repo does not decide

These belong to superCPE. A feature spec that asks for them here is out of
scope no matter how it is phrased:

- CPE credit calculation
- Question-count minimums and readiness findings
- Assessment grading and feedback gating
- Publish gates, certificates, evaluations, record retention

Course-wide question **count** rules in particular cannot be computed here:
5.01.2.1 and 6.01.2 state minimums per CPE *credit*, credit is superCPE's, and
every added question moves credit by 1.85/50. A rule expressed as a per-lesson
count is a frozen snapshot of one course's shape, not a rule.

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
4. **The status flag is the developer's signature.** `meta.status` is
   `"draft" | "checked"`. Export refuses anything but `"checked"`, naming the
   lesson's accuracy record. Nothing in the tooling sets it, and setting it
   means editing **two** places in the same commit: `meta.status` and the
   matching lesson entry in the course record. They must not come apart.

   `meta.status` is the content developer's own check under **4.01.1**: when
   technology is used in developing a program, the content developer is
   responsible for reviewing the content for accuracy, and generated narration
   is exactly that case. `drafts/<code>-review.md` is where that check is
   recorded. The **4.02** independent content review is superCPE's — a
   licensed CPA with a reviewer login, reviewing an ingested package version,
   recorded in `course_reviews` and gated by `review_missing`,
   `reviewer_is_developer`, and `cpa_participation` findings over there.
   Nothing in this repo evidences it, and there is deliberately no reviewer
   surface here.

## Two kinds of lesson

`meta.kind` is `"video"` or `"text"`; absent means `"video"`. There is no nano
learning program kind. Nothing in this repo models one; do not invent a field
for it.

- **Video.** Narrated blocks, rendered by Remotion, exported with
  `video.mp4` + `transcript.md`. `meta.wordCount` is typed by the author and is
  the one manifest number that is not measured; for an all-video program it is
  `0` and stays `0`.
- **Text.** A study guide is the program: markdown sections under
  `guide/<lessonId>/` with roles `front_matter | body | glossary | appendix`.
  Those roles implement 7.02.5's exclusion list — only `body` words count
  toward credit, and **superCPE computes the count**; a module that declares
  its own `word_count` is refused. Review questions are placed `after_section`.
  Every clip must claim `avIsAdditionalLearning: true`: if the video reads the
  guide aloud, it does not belong in a text package (7.02.7). A text lesson
  with no clips never touches Remotion or ElevenLabs; `render` and `generate`
  refuse it by name.

The word count asymmetry is deliberate and easy to get backwards: on a text
lesson superCPE derives it and refuses a declared one; on a video lesson the
author types it and it is `0`.

## Layout

    src/                lesson data, slides, course record, Remotion root
    guide/<lessonId>/   text-lesson markdown sections
    scripts/            new-lesson.ts, retire.ts, generate-audio.ts, render.ts,
                        export.ts, validate-package.ts, check-lessons.ts,
                        registry.ts, text-preview.ts, word-count.ts
    public/audio/NN/    generated narration, committed (unreproducible = source)
    drafts/             per-lesson accuracy records, the developer's surface
    sources/            authoritative extractions the narration cites
    out/                rendered MP4s, ignored
    dist/               exported packages, ignored
    docs/               course-package.md, kept identical to superCPE's
    current-feature.md  the ONE feature being built right now
    CHANGELOG.md        append only

`current-feature.md` is the only feature spec that is authoritative. Any
`current-feature-NNN.md` in the tree is a superseded archive kept for history.
Do not execute one, and do not treat a rule stated in one as current — some of
them record decisions that have since been reversed.

## Workflow

1. `current-feature.md` is the single source of truth for what to build. Build
   exactly what it describes, **except** where it asks for something the
   Boundary section assigns to superCPE. In that case build the rest, and list
   the out-of-boundary items as findings at the end rather than implementing
   them. A spec cannot grant this repo a concern the boundary denies it.
2. **Never run `npm run generate` without `--dry-run`.** Generating audio spends
   ElevenLabs credits and is the human's step.
3. Rendering (`npm run render`) is free and may be run.
4. Before finishing: `npm run typecheck` and `npm run check` must both pass. If
   either is red, the feature is not done — report the failure rather than
   appending an entry over it.
5. Then append the changelog entry and stop.

### Changelog entry format

Append-only, newest at the bottom. Never edit or delete a past entry — if
something was wrong, write a new entry saying so. Match this shape:

    ## NNN — Short title
    Shipped: YYYY-MM-DD

    **What changed**
    - ...

    **Standards touched**
    - <paragraph> — <what it requires, in one line>

    **Decisions**
    - <what was chosen and what was rejected>

    **Known gaps**
    - <what is knowingly unfinished>

Cite a Standards paragraph only after reading it in the 2026 Statement. Do not
cite one from memory, and do not cite a superCPE feature number — they
renumber and this repo cannot see them.

## Costs and secrets

- ElevenLabs key in `.env`, gitignored. Voice and model are frozen; changing
  them means regenerating every block of every lesson for consistency. The
  generate cache enforces that rather than trusting anyone to remember
  `--force`: `audio-meta-NN.json` records the voice and model each block was
  generated under, and a block whose configuration no longer matches misses
  the cache. Run `--dry-run` first — the report separates a miss caused by an
  edit from one caused by the configuration.
- Voice settings are recorded in `scripts/generate-audio.ts`. Do not change
  them inside a feature; that is a separate decision.
- The MP3s under `public/audio/` are committed **source, not build output**.
  They cannot be regenerated identically, and regenerating them spends credits.
  Deleting one means resetting the matching `audio-meta-NN.json` to `{}` in the
  same commit, or the lesson renders silent while still claiming measured
  timings.
- `npm run retire` is the only supported way to delete audio. It removes
  `public/audio/NN/` and `src/audio-meta-NN.json` in one operation, so they
  cannot come apart, and it refuses any MP3 git does not already track —
  history is the archive, and `--force` does not waive that. Do not `rm` audio
  by hand.

## Maintained duplicates

Two files here are hand-kept copies of superCPE code. When they disagree with
their originals, the originals win.

- `scripts/validate-package.ts` ← `backend/app/services/packages.py`
- `scripts/word-count.ts` ← `word_count.py`

`scripts/check-lessons.ts` is **not** a maintained duplicate. It is video-tool's
own authoring discipline and deliberately mirrors no superCPE code — there is
no original for it anywhere, and naming one would be inventing a source. Any
comment in it claiming to mirror superCPE's readiness rules is unsourced: the
claim and the rules were written in the same file on the same day, with no
third-party original. Do not add course-wide count rules to it; see "What this
repo does not decide."

Every rule in it is decidable from the registered lessons without leaving the
repo — most from one lesson's module and its questions file, and duplicate-stem
detection from the registry as a whole, which is why `Finding.lessons` is a
list. That is what makes it safe for `npm run export` to gate on: export refuses
on any ERROR naming the lesson it is packaging, so these rules bind rather than
advise.

## Commands

    npm run dev                      Remotion Studio
    npm run new -- --lesson 07 --code GUM-07 --title "..."
                       [--kind text] [--course-code GUM [--course-title "..."]]
    npm run retire -- --lesson 07 [--dry-run] [--force]
    npm run retire -- --all
    npm run generate -- --lesson 01 --dry-run
    npm run render -- --lesson 01
    npm run export -- --lesson 01
    npm run check                    validate every registered lesson
    npm run typecheck

`npm run check` runs across every registered lesson, not just one, because
duplicate-stem detection is cross-lesson. A finding naming a different lesson
is not a failure of the lesson you are working on. `npm run export` runs the
same rules and refuses on any ERROR naming the lesson being exported — a
course-wide check, acted on lesson by lesson. It gates on the rules it can
evaluate from the lesson in front of it; it does not pre-check superCPE
readiness, which depends on credit it cannot see.
