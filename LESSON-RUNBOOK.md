# Lesson video runbook

How to take a lesson from nothing to a published video with recorded credit.
Written after producing lessons 01 and 02 of *Where Does It Actually Go?*

Everything happens on the Mac. superCPE only ever receives the finished
course package, through its admin packages page (step 9).

---

## Before you start

Know these three things about the lesson you are building:

- **Lesson number** — `02`, `03`, and so on. Two digits, always.
- **Package id** — the globally unique `lesson_id` the manifest carries
  (`ASC842-PCX-03`). Reusing one re-ingests downstream as a new *version* of
  that lesson; `npm run new` refuses a code already in use.
- **Which learning objective it maps to** — the narration has to actually
  teach that objective, because assessment questions are tied to it.

---

## 0. Scaffold it

```bash
npm run new -- --lesson 03 --code ASC842-PCX-03 --title "..."
npm run new -- --lesson 03 --code ASC450-LC-02 --title "..." --kind text
```

Writes `src/lesson-03.ts`, `src/questions-03.json`, `src/audio-meta-03.json`
(`{}`), `drafts/<code>-review.md`, and — for `--kind text` — `guide/03/` with
a front-matter and a body section. It makes both registry edits for you
(step 2), so there is nothing to copy and nothing to wire.

What it deliberately does not write:

- **Content.** Every descriptor field lands as a `TODO:`. Fill them in.
- **`meta.status`.** It is `"draft"` and only a human changes it (step 6).
- **A `COURSE.lessons` entry.** Which course this lesson belongs to and at
  what position is an authoring decision. Add it to `src/course.ts` by hand
  before exporting — export refuses a lesson with no course entry, and
  `npm run check` warns until it is there.

---

## 1. Write the lesson module

Edit the module step 0 wrote. Replace every `TODO:` in `meta`, then replace
the placeholder block with the real ones.

**Block anatomy.** Each block is one sheet on screen plus the narration read
over it:

```ts
{
  id: "block-01",          // unique within the lesson; drives the mp3 filename
  sheet: "S-01",           // printed in the sheet's corner
  citation: "40 CFR §262.13",
  slide: "Statement",      // Title | Statement | Facts | List | Compare | Calc
  figure: { kind: "statement", lines: ["...", "...", "..."] },
  narration: "Text with [[r]] markers before the word each item appears on.",
  reveals: [1, 25, 49],    // FALLBACK ONLY — discarded once audio exists
  estimatedSeconds: 55,
}
```

**Rules that will bite you if you break them:**

1. **Marker count must equal `reveals` length.** Slide components index into
   `reveals` positionally. A mismatch reads `undefined` and the element never
   appears on screen. The dry run in step 3 checks this.
2. **Figure items should be ≥ marker count.** Extra items reveal alongside the
   last marked one. Fewer items than markers means wasted markers.
3. **Mark the word, not the sentence.** `[[r]]` goes immediately before the
   word the item corresponds to, mid-sentence if that is where it falls.
4. **Never type a timing number anywhere else.** `reveals` and
   `estimatedSeconds` are the only permitted numbers, and both are fallbacks.
   `estimatedSeconds = Math.round(wordCount / 130 * 60)`.
5. **Aim for 40–75 seconds per sheet.** Attention resets every 20–30 seconds
   and a new sheet is the cheapest reset available. Eight blocks of ~120 words
   lands around 6 minutes.

---

## 2. Register the lesson

`npm run new` already did this — an import and an entry in `src/lessons.ts`,
an import and two entries in `src/questions.ts`. This is what it wrote, in
case you are reading a lesson that predates the command:

```ts
// src/lessons.ts
import * as lesson03 from "./lesson-03";

const REGISTRY = {
  "03": lesson03,
} as const;
```

`Root.tsx` loops over `LESSONS`, so the composition appears automatically.
Nothing else to edit.

---

## 3. Typecheck and dry run

Neither spends money. Do not skip.

```bash
npx tsc --noEmit
npm run generate -- --lesson 03 --dry-run
```

The dry run must show every narrated block with its marker count, and the
title sheet must be **absent** — it has no narration by design.

If `tsc` errors on `meta`, you missed a field the sheet chrome reads. The
error names it.

---

## 4. Preview silent

```bash
npm run dev
```

Open `Lesson03` in Studio and scrub every sheet. Check:

- Title sheet renders real text, not blanks
- Every `Facts` row and `List` item is visible by the end of its block
- Console shows the estimated-duration warning — it **should** fire, no audio
  exists yet

This is the last free review. After generation, fixing narration means
regenerating a block, and a regenerated block is a different take.

---

## 5. Generate narration

**This spends ElevenLabs credits.** It is the first irreversible step.

```bash
npm run generate -- --lesson 03
```

The script sends each block's narration to ElevenLabs, strips the `[[r]]`
markers, reads their real timestamps out of the character-level alignment
data, and writes duration + measured reveals + a content hash to
`audio-meta-03.json`. MP3s land in `public/audio/03/`.

**Blocks are cached by content hash.** Re-running skips anything unchanged, so
a second run costs nothing. If you edit one block's narration, only that block
regenerates.

Useful flags:

| Flag | Effect |
|---|---|
| `--dry-run` | Report only, send nothing |
| `--only block-04` | One block, for a pronunciation test |
| `--force` | Regenerate even if the hash matches |

The output line reports total runtime and how many blocks are still
estimated. **It should say zero.**

Ignore the 7.02.7 sanity check it prints. That is this segment alone through
the formula, which is not how credit works — credit attaches to the course,
summing all lessons and all questions, divided once.

---

## 6. Review, then clear the draft stamp

Listen straight through. Two things: reveals landing as the narrator names
each item, and no sheet sounding tonally different from its neighbors.

`meta.status` is `"draft"` or `"reviewed"`, nothing else, and export refuses
`"draft"`. Work through the lesson's review document,
`drafts/<lesson>-review.md`, until its judgment list is closed and the
reviewer signs off. Then set `status: "reviewed"` in `meta` **by hand** —
nothing in the tooling sets it; the status is the record that a human did
this step — and re-render. **Clearing the stamp does not require
regenerating audio** — it is a re-render only, and free.

---

## 7. Render

```bash
npx remotion render Lesson03 out/lesson-03.mp4
ffprobe -i out/lesson-03.mp4 2>&1 | grep Duration
```

A few minutes. The MP3s are pulled in automatically — the output has audio,
no separate mux step.

**That `ffprobe` duration is the number that matters.** It is measured off the
artifact, and it is the only figure permitted to reach the credit calculation
(7.02.7).

`video/out/` is gitignored. Do not commit the MP4 — it is reproducible from
what is committed.

---

## 8. Commit before uploading

This is the step that was skipped once and cost a morning. The original ASC
606 lesson modules were never committed and existed only in a git stash.

```bash
git add src/lesson-03.ts src/lessons.ts src/questions.ts src/questions-03.json \
        src/audio-meta-03.json public/audio/03/ drafts/ASC842-PCX-03-review.md
git commit -m "video: lesson 03 narration and module"
```

The MP3s are worth tracking — regenerating costs money and gives a different
take. The MP4 is not.

---

## 9. Upload

The admin **packages** page. Upload `dist/<lesson_id>.zip`; superCPE re-runs
this repo's validation on ingest, computes the word count itself, and
versions the package if that id has been ingested before.

If it rejects a package this tool exported, the bug is here, not there.

---

## 10. Recompute credit

Course editor → **Recompute credit**.

Credit is stale — and the course cannot publish — whenever the course changes
after the last computation. Adding a video is such a change.

The formula sums total A/V runtime plus questions × 1.85, divides by 50, and
rounds **down** to the nearest one-fifth. It never rounds up.

Expect the number to climb as each lesson lands. Five lessons at ~6:20 is
about 31 minutes of A/V; with 15 questions contributing 27.75 minutes, the
course should reach roughly 1.0 credit once all five are in.

---

## 11. Retire the lesson

Once the package is uploaded and accepted, the exported package — not this
repo — is the record downstream. `transcript.md` (9.02.1(8)) is retained by
superCPE inside it. At that point the workspace can be cleared:

```bash
npm run retire -- --lesson 03 --dry-run   # the removal set, changing nothing
npm run retire -- --lesson 03
npm run retire -- --all                   # every registered lesson
```

It deletes the module, the questions, the audio metadata, `public/audio/03/`,
`guide/03/`, the render, and the exported package, and unwires the lesson from
`lessons.ts`, `questions.ts`, and `course.ts`.

Three things it refuses, each naming what is wrong and removing nothing:

- an unknown lesson id;
- a working tree with uncommitted changes under anything it would remove —
  that is why step 8 exists, and `--force` waives this one;
- an MP3 git does not already track. **`--force` does not waive that one.**
  The MP3s are committed source; history is the only archive.

It warns, without blocking, when a `"reviewed"` lesson has no
`dist/<lesson_id>.zip` on disk: if that package was never exported and
ingested, retiring the lesson leaves git history as the only copy of the
transcript of record.

It never touches `drafts/` or `sources/`. The review document is the evidence
a licensed CPA signed the lesson off, and the extractions are what the
narration cited; both are program-development records under 9.02.1. It prints
where they are and leaves them for you to decide about.

Retiring leaves a gap in the surviving `COURSE.lessons[].position` values. It
says so and does not renumber them — superCPE ordered the course by those
numbers, so closing a gap is a content decision.

---

## Questions

Course-level rules, applied when writing any lesson's `questions-NN.json`.
superCPE (feature 007) enforces them across the whole course on ingest;
`npm run check` runs the same rules here first, as ERRORs, so a course does
not fail readiness on arrival.

1. **Assessment questions per lesson: four**, each mapped to a *different*
   one of the lesson's four objectives, so every objective in the course is
   measured (6.01.2 requires 75 percent; four-of-four per lesson makes it
   100 and removes the question from readiness).
2. **No assessment stem may duplicate a review stem** anywhere in the
   course, including across lessons. Compare after lowercasing, collapsing
   whitespace, and stripping trailing punctuation. A question that tests
   the same fact must ask it differently.
3. **Assessment questions have four choices; review questions at least
   three.** Two-choice review questions do not count toward the minimum, so
   do not write any.
4. **Review questions: five per lesson**, each with `after_block` on the
   block it tests, never two on the same block.
5. Feedback on every question: why the right answer is right, which
   misunderstanding each wrong answer reflects, and which block to re-study.

---

## Traps, collected

| Symptom | Cause |
|---|---|
| `generate` says "unchanged, skipped" on a fresh block | The run already happened. Check `public/audio/<id>/` before assuming failure. |
| Composition has audio timings but no sound | `audio-meta*.json` has entries whose MP3s were deleted. Reset the JSON to `{}`. `npm run retire` removes both together so this cannot happen; do not `rm` audio by hand. |
| Estimated-duration warning never fires | Same cause. `usingEstimates` is reading stale measurements. |
| `KeyError` on an env var in a one-line-per-variable command | Trailing whitespace after a `\`. Put it on one line. |
| A list item never appears on screen | Marker count ≠ `reveals` length. |
| Reveals land seconds off the words | You are on estimates, not measured audio. |
| CORS error in the browser | Often a 500 surfacing through Starlette middleware ordering. Check server logs first. |
| File missing that "definitely existed" | It was never committed. Commit before you need it. |
