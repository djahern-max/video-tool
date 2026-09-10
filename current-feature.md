# Feature NN — ATO-02: a case-study video lesson

Number this feature one past the last entry in `CHANGELOG.md`.

## Goal

Add a second lesson to course `ATO`: a short narrated **video** lesson,
package id `ATO-02`, that walks through one composed account-takeover
incident from start to finish. It exists to exercise the video pipeline end
to end inside a real course, and to move course `ATO` from 1.2 to 1.6 CPE
credits.

This feature authors the lesson and stops. It does not spend ElevenLabs credits,
render, export, or set status.

## Why this shape (read before drafting)

- **7.02.7.** A/V duration counts only if the video is additional learning,
  not narration of the text. ATO-01's guide *explains*. ATO-02 *shows*: one
  incident with its decisions made in front of the participant. If a block
  restates what a guide section says, it does not belong. `avIsAdditionalLearning`
  stays `true` only if that holds, and it must reflect reality, not the target.
- **Credit target.** superCPE computes the credit, not this repo. It is recorded here only to
  size the lesson. Today ATO's total is 64.322 minutes: 7,582 words ÷ 180, plus
  12 questions × 1.85. Reaching 80 minutes (1.6) needs this lesson's measured
  video plus 4 new questions × 1.85 ≥ 15.678 minutes. That means a measured
  video of **≥ 497 s**. Aim for about 600 s of projected runtime for margin.
  Falling short only costs credit. The minimums at 1.4 (4 review, 8 assessment) are still met.
- **Minimums at 1.6** (5.01.2.1, 6.01.2 charts): 5 review and 9 assessment across
  the course. ATO-01 has 5 and 7, so this lesson adds exactly 2 review and 2 assessment questions.
- **7.01.** Only learning content counts. Do not pad to reach the runtime. If the
  incident cannot fill about 600 s with sourced, non-repeating material, stop and
  report the honest length instead.

## Read first

- `CLAUDE.md`, `LESSON-RUNBOOK.md` (the "Video lessons" section), `src/blocks.ts`
- `scripts/new-lesson.ts` (the video module template) and `scripts/check-lessons.ts`
  (block rules, the 40–75 s sheet window, question rules 1–5)
- Every file in `guide/01/`, to know what the guide already says and so what
  the video must not repeat
- `sources/sec/INDEX.md` and the files it lists
- `src/lesson-01.ts`, for ATO-01's objective ids, its `sources` citation format,
  and its `author` block
- `src/questions-01.json`, for the stems this lesson must not duplicate

## Tasks

### 0. Establish

Record the answers in the changelog entry:

1. Pick the lesson number, the next number not registered in `src/lessons.ts`.
   Check that `drafts/ATO-02-review.md` does not already exist. If it does, stop
   and report.
2. **Measured pace.** From any existing `src/audio-meta-*.json` with generated
   audio, compute words per minute. Use `transcriptOf` word counts ÷
   `durationSeconds`, over blocks whose `voice` matches the current
   `ELEVENLABS_VOICE_ID`. Report the rate and which lessons it came from. If no
   measured audio exists for the current voice, report that and use 130 wpm.
3. How narrated blocks are indexed for `after_block`: does the title block count?
   Confirm from `export.ts` and `validate-package.ts`.

### 1. Scaffold

```
npm run new -- --lesson NN --code ATO-02 \
  --title "Anatomy of a Takeover: One Incident, Start to Finish" --course-code ATO
```

Use the default kind, video. `course.ts` changes only through this command,
which places the lesson at position 2. Run `npm run typecheck` immediately.

### 2. Source map before narration

In `drafts/ATO-02-review.md`, below the scaffolded header, write the source map
**before drafting any narration**. Break the incident into beats, and give each
factual beat the file in `sources/sec/` that supports it, with a locator.

The incident is a composed small CPA firm with composed people, and no real
companies, products, brands or people. The arc runs roughly:

1. The lure
2. The proxy page relaying credentials and MFA
3. The session token captured
4. What the attacker does with the access
5. The signals that show up
6. The response, in the order the guide gives

Keep every fact consistent with `guide/01/06`, `07`, `10` and `11`.

A beat with no source is either cut, or kept as story detail and flagged. Do not
search for new sources, and do not add files to `sources/`.

Flag classes: use only `illustration`, `framing`, `boundary only`,
`descriptive`, `interpretive`, and bare `UNSOURCED`. Do **not** use `analogy`,
`elaboration`, or `judgment`. Those classes are awaiting Dane's ruling.

### 3. Blocks

Replace the scaffold's TODO block with the real ones:

- Size the narration so that its projected runtime at the Task 0.2 pace is about
  600 s. Blocks should fall inside the 40–75 s window, which is roughly 11–15 blocks.
- Use existing slide types only: Statement, Facts, List, Compare. No Image, and no
  bespoke components. Figures show the incident's facts (timeline, signals,
  steps). They must not show the narration's sentences. `new-lesson.ts`'s rule
  applies: the flag is true unless the audio merely reads the slides.
- `[[r]]` markers = `reveals` length, and figure elements ≥ reveals.
  `estimatedSeconds` follows the template's formula.
- `citation` on each block names its source(s), in the format ATO-01 uses.
- Flags go in the review file, **never in `narration`**. Narration is spoken
  aloud and becomes the transcript of record.
- Write for the ear. Use `speech` only where a spelled-out form is needed for TTS.

### 4. Meta

- Two learning objectives, measurable, at the course's Basic level, and about
  applying the guide to an incident. Their ids must not collide with ATO-01's;
  continue past its highest id.
- `sources`: one entry per `sources/sec/` file actually cited, in ATO-01's format.
- `author`: copy ATO-01's block verbatim, including its test sentinels.
- `wordCount: 0` and `avIsAdditionalLearning: true`, as scaffolded.
- Fill `subtitle`, `eyebrow`, and the display `fieldOfStudy`.
- `status` stays `"draft"`.

### 5. Questions (`src/questions-NN.json`)

- **Two review questions** with `after_block`: one near the midpoint, one near the
  end. Each is a decision point in the incident ("what should the partner do
  next?"), not a recall question. Each has at least 3 choices (4 preferred), and
  feedback that gives the right answer, the misunderstanding, and the block to
  re-study.
- **Two assessment questions**, one per objective, with no placement and at least 3
  choices. They must not duplicate the review questions or any ATO-01 stem. No true/false.

### 6. Overlap check

Report every run of **8 or more consecutive words** that the narration shares with
any `guide/01/*.md` file. The target is zero. Use a throwaway script and do not
commit it.

For each block, also add one line to the review file saying what it adds beyond
the guide. Dane uses these to judge 7.02.7. They are not a pass/fail gate.

## Out of scope — do not do these

- Run `npm run generate` without `--dry-run`. `render`, `export` and `npm run dev`
  are Dane's.
- Edit `guide/01/`, `src/lesson-01.ts`, `src/questions-01.json`, anything
  under `sources/`, or any existing file in `drafts/`.
- Rename `sources/sec`, re-export ATO-01, or touch `dist/`.
- Change voice or model settings, `.env`, or `generate-audio.ts`.
- Set `meta.status`, or resolve any flag.

## Acceptance

1. `npm run typecheck` is clean.
2. `npm run check` reports no ERROR for the new lesson. ATO-01's findings are
   unchanged; paste the before and after counts. Explain any WARN on the new lesson.
3. `npm run generate -- --lesson NN --dry-run` lists every narrated block as new
   and spends nothing. Report the total character count.
4. Report projected runtime at the measured pace (≥ about 600 s), the 130 wpm
   estimate, and one labelled estimate line:
   `(64.322 + video min + 7.4) ÷ 50`.
5. The overlap report is attached, with any shared runs listed.
6. `drafts/ATO-02-review.md` holds the source map, the per-sentence flags, the
   per-block "adds beyond the guide" lines, and a short list of the judgment items Dane
   must decide.

## Stop rules

- The scaffold refuses, or typecheck fails after scaffolding and the fix is not obvious.
- The sourced material cannot fill about 500 s without repeating the guide.
- A fact in the incident would contradict the guide.

## When done

Append the changelog entry, including the Task 0 answers, and stop. The
next steps are Dane's:

1. The 4.01.1 check.
2. A Studio scrub (`npm run dev`).
3. `generate`, then `render`.
4. Set status to `"checked"`, in both places, in one commit.
5. `export`, then upload.
