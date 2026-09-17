# Current Feature

## GPT-06 polish: opening, close, text crispness, first-person narration

> Changelog entry 34. `generate` is expected in this feature — the
> developer has approved the spend. Regenerate only what changes.

## Goal
`out/lesson-08.mp4` opens on voice within a second, ends on a held final
sheet, renders every coloured figure crisp at native size, and is
narrated in first person, present tense, as someone doing the task. Same
twelve blocks, same screens, same sources, same facts. `meta.status`
stays `"draft"`.

## Why
The developer watched the voiced render: 7–8 s of dead air before the
first word, an abrupt end, coloured text that looked soft, and narration
that explains rather than does.

## Part 1 — Opening
Find why the first narration starts 7–8 s in (title hold, lead-in
constant, or a block with empty narration). Reduce it so the voice begins
within about one second of the first frame, with the title sheet still
readable. No content removed.

## Part 2 — Close
The video currently stops after the last teaching sentence and the
viewer cannot tell it has ended. Two things:

1. **A sign-off block.** Add a thirteenth block (or extend the last one)
   whose narration does three things in about 40–60 words: says the task
   is done and what it showed; restates the course's one rule — output is
   a first draft, verify before relying on it (9#9, GPT-04); and tells the
   viewer plainly that this is the end of the lesson and the course's
   guide and assessment follow. Connective and sourced only; no new
   claim. Screen: a Title-style closing sheet with the course title and
   the rule in one line, in the v2 theme. Record it in the review file
   like any block.
2. **A closing hold**: the final sheet stays for a configurable constant
   (default 3 s) after the last audio ends, in addition to the existing
   0.6 s per-block tail. Render-side, part of the measured duration; the
   record notes it as non-narration time.

## Part 3 — Text crispness
Render stills of the Check, Sweep, and Session blocks at their resting
frames at native 1920 width and inspect the coloured figures. If soft:
find the cause — fractional translate/scale left on the element after
its animation, opacity transitions on text, sub-pixel layout — and fix
so every text element rests on integer pixels with no transform. Report
which it was. If the native stills are already crisp, say so and change
nothing; the softness was the player scaling.

## Part 4 — First-person narration
Rewrite all twelve blocks' narration in first person, present tense, as
the participant doing the task and thinking aloud: "I'll paste the three
assets in… there's the table… Year 3 on Equipment B looks off — let me
check it." Rules:
- Every factual sentence keeps the same index entry it had. No new claim.
  Re-run the three-way classification; flag count must not rise.
- The composed-session disclosure stays, said naturally, once.
- The toolkit quote stays attributed.
- Reveal markers stay aligned to the on-screen moment they trigger; move
  the marker with the phrase, not the phrase to the marker.
- Screens do not change. If a rewritten sentence refers to something not
  on screen, rewrite the sentence.
- Keep the total within 850–1,000 words at the measured 164 wpm.
Update `drafts/GPT-06-review.md` block by block; default rulings; list
stays CLOSED pending the developer's read.

## Then
`npm run generate -- --lesson 08 --dry-run`; report the per-block reasons
(all should be `narration changed`). Then `npm run generate -- --lesson 08`
without dry-run, then `npm run render -- --lesson 08`. Commit the MP3s and
`audio-meta-08.json`.

## Out of scope
- Any other lesson. Any screen or component redesign beyond Part 3's fix.
- `export`. `status`.

## Read first
- `CLAUDE.md`; `LESSON-RUNBOOK.md`; `CHANGELOG.md` entries 31 and 33
- `src/lesson-08.ts`; `drafts/GPT-06-review.md`
- The Session, Check, Sweep components; the composition's timing code

## Verify
1. `npm run typecheck` clean; `npm run check` 0 errors.
2. Time of first audible sample in the new MP4 (ffprobe/ffmpeg silence
   detect); time of last audible sample vs file end.
3. Native-size stills before and after Part 3, if changed.
4. Word count, sentence classification counts, flag count before/after.
5. `git status`: `src/lesson-08.ts`, components touched, timing code,
   `drafts/GPT-06-review.md`, `public/audio/**` for lesson 08,
   `audio-meta-08.json`, `CHANGELOG.md`, spec rotation.
6. One report. Then commit.

## Changelog
Entry 34. Standards touched: 7.02.7 (screens unchanged; additional-
learning case per block re-confirmed against the new narration),
9.02.2(2)(ii) (duration changes; measured). Under Decisions: why first
person; why the close is a render constant. Under Known gaps: unread.

## Not this feature
Developer's read (`docs/developer-read.md`) of the whole course, then
`status: "checked"` on lessons 03–08; then export.
