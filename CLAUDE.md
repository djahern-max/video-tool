# video-tool

Local, never deployed. Turns a lesson data file into a course package: either a
narrated Remotion video or a markdown study guide, packaged in the shape
`docs/course-package.md` defines.

## Boundary

This repo emits **course packages**. That format is the only interface it has
to anything else; superCPE's copy of `docs/course-package.md` is authoritative
and this one is kept byte-identical to it. Neither repo imports from the other,
and no other consumer is supported.

A package is the deliverable, not the MP4 or the markdown, because the package
carries what the bare artifact cannot.

Both kinds carry:

- `content_hash` — changed content re-ingests as a new lesson version instead
  of silently overwriting one.
- `course_code` and `position`, read from the course record in `src/course.ts`,
  which is what places the lesson in a course downstream.

A video package also carries:

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

A text package also carries:

- Section roles, which decide what 7.02.5 counts. superCPE computes the word
  count from the shipped markdown; the package never declares one.
- Clip durations measured by ffprobe at export, truncated down to whole
  seconds, so a term of the formula may understate and never overstate.

`meta.status` is not in either package. No manifest carries it. It is a gate on
what may be built: export refuses a lesson the content developer has not
checked under 4.01.1. See rule 4.

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

Credit is computed over the **course**, not the lesson. A lesson contributes
minutes (words ÷ 180, A/V time, questions × 1.85); superCPE sums every attached
lesson's minutes, divides by 50 once, and rounds once. A lesson has no credit
figure of its own, and any per-lesson credit this repo prints is an estimate.

## Stack

- Remotion, React, TypeScript
- ElevenLabs text-to-speech with character-level alignment
- ffprobe (system) for duration verification at export

## Four rules that hold everything up

1. **Content is data.** A lesson is a `src/lesson-NN.ts` module of plain
   objects plus a `src/questions-NN.json`, and for a text lesson the markdown
   under `guide/<lessonId>/`. Slide components never know which lesson they
   render.
2. **Timing is measured, never typed.** Every narrated block's duration and
   reveal reads from `audio-meta-NN.json`. A clip's duration is ffprobed off the
   rendered file at export. No number expressing a duration appears in a
   component. `usingEstimates` is true until every narrated block has generated
   audio, and nothing may be exported while it is true.
3. **One copy of the narration.** `narration` is the transcript of record and
   carries the `[[r]]` reveal markers. `transcriptOf()` strips them. Nothing
   that is not meant to be spoken goes in `narration`.
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

`meta.kind` is `"video"` or `"text"`; absent means `"video"`. A course may hold
lessons of both kinds.

There is no nano learning program kind. Nothing in this repo models one; do not
invent a field for it. This is a standing decision, not an oversight: a spec
that needs a nano course must change this paragraph first, as its own decision.

- **Video.** Narrated blocks, rendered by Remotion, exported with
  `video.mp4` + `transcript.md`. `meta.wordCount` is typed by the author and is
  the one manifest number that is not measured; for an all-video program it is
  `0` and stays `0`.
- **Text.** A study guide is the program: markdown sections under
  `guide/<lessonId>/` with roles `front_matter | body | glossary | appendix`.
  Those roles implement 7.02.5's exclusion list — only `body` words count
  toward credit, and **superCPE computes the count**; a module that declares
  its own `word_count` is refused. Review questions are placed `after_section`.
  A text lesson with no clips never touches Remotion or ElevenLabs; `render`
  and `generate` refuse it by name.

The word count asymmetry is deliberate and easy to get backwards: on a text
lesson superCPE derives it and refuses a declared one; on a video lesson the
author types it and it is `0`.

### 7.02.7: when A/V time counts

A/V duration counts toward credit only if it is additional learning, not
narration of the text. The flag that claims it must reflect what the video
actually does. It must not be set to reach a credit target.

- **Clip in a text package.** Every clip must claim
  `avIsAdditionalLearning: true`, and export refuses one that does not. A clip
  that reads the guide aloud does not belong in a text package.
- **Video lesson.** `meta.avIsAdditionalLearning` is `true` when the video is
  the learning itself. 7.02.7 treats an all-video program's actual video time as
  the program time, with no word count. It is `false` if the audio merely reads
  the slides.
- **Video lesson in a course with a text lesson.** The video must not narrate
  that course's guide. If it restates the guide, the flag is `false`, and
  superCPE records the lesson as narrating the text and does not count its
  minutes. The test is whether the video adds learning the guide does not
  already give, not whether it covers the same topic.

## Layout

    src/                lesson data, slides, course record, Remotion root
    guide/<lessonId>/   text-lesson markdown sections
    scripts/            new-lesson.ts, retire.ts, generate-audio.ts, render.ts,
                        export.ts, validate-package.ts, check-lessons.ts,
                        registry.ts, text-preview.ts, word-count.ts
    public/audio/NN/    generated narration, committed (unreproducible = source)
    drafts/             per-lesson accuracy records and other working records;
                        evidence, see below
    sources/<dir>/      authoritative source files the lessons cite, one
                        directory per course; evidence, see below
    out/                rendered MP4s, ignored
    dist/               exported packages, ignored
    docs/               course-package.md, kept identical to superCPE's
    docs/standards/     NASBA Standards documents extracted to greppable .txt,
                        including the 2026 Statement
    LESSON-RUNBOOK.md   the human's step-by-step for building a lesson
    current-feature.md  the ONE feature being built right now
    CHANGELOG.md        append only

`sources/sec/` holds course `ATO`'s sources. It predates the SEC→ATO
course-code rename and is deliberately not renamed, because earlier records
cite that path.

`current-feature.md` is the only feature spec that is authoritative. Any
`current-feature-NNN.md` in the tree is a superseded archive kept for history.
Do not execute one, and do not treat a rule stated in one as current — some of
them record decisions that have since been reversed.

## Evidence directories

`drafts/` and `sources/` are retained as regulatory evidence.

- Automation never deletes, moves, or renames anything in either.
- In `drafts/`, a feature may create files and may write to files it created. It
  does not edit an existing record; those are the human's.
- In `sources/`, a feature adds files only when `current-feature.md` says so,
  and never modifies an existing one.
- `retire` already leaves accuracy records behind.

## Workflow

1. `current-feature.md` is the single source of truth for what to build. Build
   exactly what it describes, **except** where it asks for something the
   Boundary section assigns to superCPE. In that case build the rest, and list
   the out-of-boundary items as findings at the end rather than implementing
   them. A spec cannot grant this repo a concern the boundary denies it.
2. **Never run `npm run generate` without `--dry-run`.** Generating audio spends
   ElevenLabs credits and is the human's step.
3. Rendering (`npm run render`) is free and may be run, unless the feature
   spec says otherwise.
4. Before finishing:
   - `npm run typecheck` must pass.
   - `npm run check` must report no ERROR naming a lesson the feature created or
     changed. A change to `check-lessons.ts`, a slide component, `src/blocks.ts`,
     `src/types.ts`, or any other shared file counts as changing every
     registered lesson.
   - `check` exits 1 on an ERROR in *any* registered lesson. An ERROR naming only
     lessons the feature did not touch is not a blocker: report it with its
     message under Known gaps, and do not fix it inside this feature. Export
     scopes its gate the same way.
   - If a blocking check is red, the feature is not done. Report the failure
     rather than appending an entry over it.
5. Then append the changelog entry and stop.

### Changelog entry format

Append-only, newest at the bottom, numbered one past the last entry. Never edit
or delete a past entry — if something was wrong, write a new entry saying so.
Match this shape:

    ## NN — Short title
    Shipped: YYYY-MM-DD

    **What changed**
    - ...

    **Standards touched**
    - <paragraph> — <what it requires, in one line>

    **Decisions**
    - <what was chosen and what was rejected>

    **Known gaps**
    - <what is knowingly unfinished>

Cite a Standards paragraph only after reading it in the 2026 Statement under
`docs/standards/`. Do not cite one from memory, and do not cite a superCPE
feature number — they renumber and this repo cannot see them.

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
is not a failure of the lesson you are working on; see Workflow step 4.
`npm run export` runs the same rules and refuses on any ERROR naming the lesson
being exported — a course-wide check, acted on lesson by lesson. It gates on the
rules it can evaluate from the lesson in front of it; it does not pre-check
superCPE readiness, which depends on credit it cannot see.
