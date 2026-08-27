# Changelog
Append-only. Newest at the bottom. Never edit or delete a past entry —
if something was wrong, write a new entry saying so.
---

## 01 — Lift the pipeline and export a package
Shipped: 2026-08-27

**What changed**
- Lifted `../abacadaba/video` into this repo's root as it stood on 2026-08-27:
  six lessons. Complete measured audio: 01, 02, 03, 04 (8 narrated blocks
  each) and 06 (7 blocks). Lesson 05 has audio for 3 of its 9 narrated blocks
  and is the only lesson still `usingEstimates`. `meta.status` is cleared on
  01, 02, 04, and 05; 03 and 06 are `DRAFT — NOT REVIEWED`. Lesson 06 is the
  non-CPE ocean-energy fixture and keeps its "Not CPE eligible" sentinel.
  `.env` was not copied; `.env.example` lists the two vars `generate-audio.ts`
  reads (`ELEVENLABS_API_KEY`, `ELEVENLABS_VOICE_ID`). A local `.env` carries
  only the voice id — the manifest must record it — never the API key.
- These ESG/hazardous-waste lessons are test fixtures for the exporter, not
  superCPE content. They will be removed once the first accounting lesson
  exists (also stated in README.md).
- Normalized `src/audio-meta.json` → `src/audio-meta-01.json`. Beyond the
  import in `lesson-01.ts`, this required removing `generate-audio.ts`'s
  lesson-01 special case in its `metaPath` computation — the old name was
  built there, not imported. Voice settings untouched.
- `src/types.ts`: `PackageLessonMeta` extends the render-side `LessonMeta`
  with everything the manifest needs, plus the contract's `Question`/`Choice`
  shapes. Every lesson's `meta` now `satisfies` it. Two mappings are done in
  `export.ts` instead of renaming fields the slides read: manifest
  `lesson_id` is `meta.courseCode` (`meta.lessonId` is the module selector
  "01", not globally unique), and manifest `field_of_study` is a new
  `meta.nasbaFieldOfStudy` (`meta.fieldOfStudy` is the on-slide display
  string "ESG/Sustainability", which is not a NASBA value). The fixture
  lessons carry "Specialized Knowledge" as their NASBA field — a pragmatic
  classification for a test fixture, not a considered one; lesson 06's is ""
  and can never export. Objectives and sources were filled briefly from each
  lesson's blocks, per the fixture decision; author fields are `TODO:`
  placeholders on every lesson.
- `meta.status` is now the single authority on whether a lesson may ship.
  The stale `STATUS: DRAFT — NOT REVIEWED` header comments were deleted from
  all six lesson files; export refuses any lesson whose status is not the
  cleared value LESSON-RUNBOOK.md step 6 sets (`""`).
- Questions: `src/questions-01.json` carries the four lesson-1 questions from
  abacadaba's `seed_hazardous_waste_questions.sql` (1 review, 3 assessment —
  all had four choices, so no distractor needed inventing) with `after_block`
  and `objective_ids` assigned, plus four newly written review questions to
  reach 5 review + 3 assessment, each with feedback naming the block to
  re-study. The seed's questions for lessons 2–5 were not carried:
  `questions-02.json` through `-06.json` are `[]` as specified, and export
  refuses those lessons anyway. `src/questions.ts` maps lesson id → questions
  alongside `LESSONS`.
- `scripts/validate-package.ts`: `validatePackage(dir): string[]`, a
  maintained duplicate of superCPE's `backend/app/services/packages.py`
  (authoritative), same numbered rules and messages, minus the zip mechanics
  (it validates the directory export is about to zip) and minus rule 5's
  ffprobe comparison (export runs that against the render).
- `scripts/export.ts`: refuses in order — status not cleared; `usingEstimates`
  (naming the audio-less blocks, 7.02.7); missing or stale render (ffprobe vs
  `totalSeconds`, 1s tolerance) — then builds `dist/<lesson_id>/`
  (video.mp4, transcript.md with one `## <block id>` per narrated block,
  questions.json byte-verbatim, manifest.json), validates, and zips to
  `dist/<lesson_id>.zip` with the directory as the single top-level entry.
  `measured_at` is the latest mp3 mtime (rsync preserved abacadaba's:
  2026-08-24T12:27:05Z); `tts_model`/`tts_provider` are imported from
  `generate-audio.ts` (now exported constants, with a main-module guard so
  importing does not trigger generation); `tts_voice_id` comes from `.env`.
- `scripts/render.ts` gives render a generic `--lesson` flag; package.json
  scripts are now dev / generate / render / export / check / typecheck, the
  per-lesson variants deleted.
- `docs/course-package.md` verified byte-identical to superCPE's copy.
  README rewritten for this repo: build order is generate (human, spends
  credits) → render → export → upload to superCPE; the two compliance notes
  kept at the bottom; every exported package is unreviewed content until a
  licensed CPA signs it off inside superCPE.

**Standards touched**
- 7.02.7 — export refuses estimated durations outright (previously only
  `Root.tsx` warned); the measured duration and the `duration_source:
  "measured"` attestation are written to the manifest, and ffprobe re-measures
  the actual artifact at export.
- 9.02.1(8) — the transcript of record (markers stripped) is exported as
  `transcript.md`, labelled a review/retention document, never participant
  reading material, never counted in `word_count`.

**Decisions**
- Wrote a minimal PKZIP writer inside `export.ts` (node:zlib deflate + the
  three zip record types) instead of taking a zip dependency: Node has no
  built-in zip container, the format needed is small, and every produced zip
  is checked by `validatePackage` before upload and was verified against
  Python's `zipfile` (superCPE's reader). Store-vs-deflate is chosen per
  entry by whichever is smaller.
- superCPE's `packages.py` rule 3 checks required manifest fields only and
  tolerates unknown keys (verified against the code and a live 201), so the
  manifest also carries `course_code`, `position`, `delivery_method`, and
  `revision` from `meta` for superCPE feature 004 to formalize later.
- `manifest.lesson_id` = `meta.courseCode`, so the package and zip are named
  `HAZWASTE-01`, not `01`.

**Verified**
- `npm run typecheck` clean; `npm run check`: 0 errors, 1 pre-existing
  warning (lesson 01 block-02 on the 40s sheet-window boundary).
- Dry runs spend nothing: lessons 01–04 and 06 report every block unchanged;
  lesson 05 reports its six audio-less blocks as pending, which is its true
  state.
- `npm run render -- --lesson 01` → 375.061s, identical to abacadaba's
  render to the millisecond; full-video SSIM against abacadaba's
  `out/lesson-01.mp4` = 0.9998 over all 11,251 frames (JPEG re-encode noise;
  same frames, same reveal timing — reveals read the same measured
  `audio-meta-01.json`). Studio scrubbing left for the human eye.
- Export refusals: lesson 03 (status, named), lesson 05 (usingEstimates,
  blocks named), missing render (lesson 01 before rendering) — nothing
  created under `dist/` in any refusal case.
- `npm run export -- --lesson 01` → `dist/HAZWASTE-01.zip`; uploaded to the
  running superCPE at `/api/v1/admin/packages`: **201**, version 1, duration
  375s matching the render; re-upload: **200**, `created: false`, still
  version 1.
- `git status`: `.env`, `out/`, `dist/`, `node_modules/` ignored; all 42
  `public/audio/**/*.mp3` tracked.

**Known gaps**
- Author fields are `TODO:` placeholders on every lesson; no license number
  was invented.
- Lesson 05 lacks audio for blocks 04–09; lessons 02–06 have no questions;
  lessons 03 and 06 are unreviewed drafts. Export refuses all of them, each
  for its true reason.
- `scripts/validate-package.ts` is a maintained duplicate of superCPE's
  validator and must be kept in step with `packages.py` by hand.
- `courseCode`/`position`/`delivery_method`/`revision` ride along as unknown
  manifest keys; they are not yet in the contract (superCPE feature 004).
- The NASBA field "Specialized Knowledge" on the fixture lessons is a
  placeholder classification; the first real accounting lesson must choose
  its field deliberately.

## 02 — First accounting lesson, drafted from sources
Shipped: 2026-08-27

**What changed**
- Deleted the six ESG fixture lessons: `src/lesson-0[1-6].ts`,
  `questions-0[1-6].json`, `audio-meta-0[1-6].json`, and `public/audio/0[1-6]/`
  (42 committed MP3s — git history keeps them). `lessons.ts` and `questions.ts`
  now map only "01"; `Root.tsx` needed no change (it derives compositions from
  `LESSONS`). Removed the fixture note from README.md. Deleted the bespoke
  ASC 606-era slide components from `slides.tsx` (Misconception, LegacyBranch,
  FiveSteps, Fork, Criteria, Methods, Summary, and the now-unused Heading
  primitive) — none was reachable: `Block["slide"]` only ever admitted the six
  generic names. Every generic figure-driven component kept.
- `src/course.ts`: the ASC842-PCX course record ("ASC 842 for Private
  Companies: The Practical Expedients", Accounting, Intermediate, stated
  prerequisites) and the four-lesson outline (01 short-term lease exception —
  draft; 02 risk-free rate; 03 not separating components; 04 common control —
  planned). Lesson meta imports the course-level fields instead of repeating
  them. `knowledgeLevel` is spelled "Intermediate" — the contract's 3.01.1
  casing — where current-feature.md wrote "intermediate"; the validator
  rejects the lowercase form.
- `src/lesson-01.ts` — "The Short-Term Lease Exception": title sheet plus
  eight narrated blocks, 990 words of narration, 7m45s estimated at the
  runbook's 130 wpm, every sheet inside the 40–75s window. Follows the
  feature's suggested arc, including the Calc worked example (forklift,
  twelve months at $2,000, elected vs not). Reveal fallbacks computed from
  marker word-positions at 130 wpm. `audio-meta-01.json` is `{}` —
  `usingEstimates` true, as it must be. `src/questions-01.json`: five review
  questions (each after the block it tests) and three assessment questions
  (four choices, no true/false), feedback per 5.01.2.2 naming the block to
  re-study; each question carries a `_source` comment key (rule 3 tolerates
  unknown keys, per feature 01).
- Text extraction of both ASU PDFs into `sources/asc842/ASU_2021-09.txt` and
  `ASU_2023-01.txt` (pypdf; Basis for Conclusions heading and BC-numbered
  paragraphs verified present in both), plus `sources/asc842/INDEX.md`
  listing every file and whether it is authoritative.
- `drafts/ASC842-PCX-01-review.md`: the reviewer's document — per block, the
  narration as drafted, sources with paragraph/BC identification, every
  UNSOURCED sentence flagged with what to verify, and each reveal marker's
  target; per question, sources and the objective tested; a non-empty
  "Sources still needed" list.

**Standards touched**
- 3.01 — the four learning objectives are written as observable outcomes
  (determine / apply / explain / identify).
- 3.02.1 — Intermediate level with stated prerequisites and advance
  preparation, held in `course.ts` so every lesson states the same ones.
- 4.01/4.01.1 — drafted from the authoritative sources in `sources/asc842/`
  with a per-block traceability record for the reviewer; NOT yet reviewed.

**Decisions**
- Found while drafting: `sources/asc842/842-20-30-3.txt` is mislabeled. Its
  content is the short-term lease reassessment guidance (current-feature.md
  attributes that text to 842-20-25-3), while ASU 2021-09 — authoritative and
  in `sources/` — quotes the real 842-20-30-3 in full: it is the
  discount-rate paragraph carrying the risk-free rate election. Lesson 2's
  planning table is unaffected (the citation there is right); the file needs
  renaming after the reviewer confirms the number. Block 6 cites "842-20
  (reassessment)" on-screen rather than asserting an unconfirmed number;
  INDEX.md and the review document both carry the full note.
- `meta.status` is cleared ("") rather than stamped DRAFT, so that export's
  refusal order surfaces the `usingEstimates` message naming every narrated
  block — the acceptance-specified state until the human generates. See
  Known gaps for the consequence.
- Block titles/citations kept inside the title block's ~22-character budget
  after a frame-by-frame check of the silent render showed longer references
  ellipsized.

**Verified**
- `npm run typecheck` clean; `npm run check`: 1 lesson, 0 errors, 0 warnings.
- `npm run generate -- --lesson 01 --dry-run`: all eight narrated blocks
  listed pending with marker counts (3/3/4/3/4/3/4/3), title sheet absent,
  nothing sent, nothing written.
- `npm run render -- --lesson 01`: 13,950 frames, 7:45.05 by ffprobe.
  End-of-block frames extracted for all nine sheets: every statement line,
  facts row, calc row, and list item visible by the end of its block; pink
  emphasis on exactly one element (the Calc total).
- `npm run export -- --lesson 01` refuses with the usingEstimates message
  naming all eight narrated blocks; nothing created under `dist/`.
- `ls src/`: exactly one lesson, one questions file, one audio-meta file;
  `public/audio/` holds only `.gitkeep`.

**Known gaps**
- The lesson is UNREVIEWED and UNVOICED. Because `meta.status` is cleared to
  let the usingEstimates refusal surface, export will no longer block on
  review once audio exists and the render is fresh — the review gate for this
  lesson is the human working through `drafts/ASC842-PCX-01-review.md` before
  running generate. If sign-off will not happen before generation, re-stamp
  `meta.status` first.
- 13 UNSOURCED flags across the eight blocks (3 in block 1, 2 in block 2,
  1 — the whole block — in block 3, 2 in block 4, 2 in block 5, 1 in block 6,
  2 in block 7); questions q-01, q-02, q-03, q-06, and q-07 inherit them.
- Sources still needed (full list in the review document): the Master
  Glossary "Short-term lease" definition; the lease-term / reasonably-certain
  guidance (believed 842-10-30-1 through 30-2); the short-term lease cost
  disclosure paragraph in 842-20-50; confirmation of the reassessment
  paragraph number (expected 842-20-25-3) and the source-file rename; the
  operating-lease straight-line lease cost paragraph; definitional support
  for "class of underlying asset".
- Author fields remain `TODO:` placeholders; no license number invented.
- `HAZWASTE-01` still exists in superCPE's database; superCPE has no package
  delete yet — noted for superCPE feature 004, along with the course-level
  fields `course.ts` now records.

## 02, addendum — UNSOURCED flags resolved against the completed source set
Shipped: 2026-08-27

**What changed**
- The human completed `sources/asc842/` (glossary definition, 842-10-30-1,
  842-10-30-2, 842-20-25-3 — the confirmed rename of the mislabeled file —
  842-20-25-6, 842-20-50-4, the real 842-20-30-3, and ASU 2016-02 Section A).
  Every UNSOURCED flag in `drafts/ASC842-PCX-01-review.md` was then resolved:
  citation where a paragraph supports the sentence, rewrite where none did.
- Two narration rewrites in `src/lesson-01.ts`, logged in the review
  document's Resolution log: block 3's "high threshold / effectively
  compelled" sentence (Basis-for-Conclusions language, not in sources)
  replaced with 842-10-30-2's economic-incentive factor language, and
  block 5's "A class is a grouping…" replaced with wording that does not
  promise a definition the Codification does not give (per INDEX.md).
  Block 3 also tightened to 842-10-30-1's "noncancellable period plus"
  phrasing. estimatedSeconds and reveals recomputed for both (block 3:
  138 words/64s, block 5: 122 words/56s; lesson now 7m52s estimated).
- Sheet citations now carry the real paragraph numbers (block 6 cites
  842-20-25-3); `meta.sources` lists all seven citations; question `_source`
  keys point at the actual files. The "no ROU asset / no liability" and
  as-if-commencement interpretations are anchored to 842-20-25-1 as issued
  (ASU 2016-02 Section A).
- Review document rewritten: per-block sources with paragraph quotes, a
  Resolution log, and "Sources still needed" replaced by a 12-item
  "Still needs a CPA's judgment" list (J1–J12).

**Verified**
- `npm run typecheck` clean; `npm run check`: 0 errors, 0 warnings.
- Dry run: all eight blocks pending, marker counts 3/3/4/3/4/3/4/3, nothing
  sent. Re-rendered silent: 14,160 frames (7m52s).

**Known gaps**
- Still unreviewed and unvoiced; the J1–J12 judgment items are the remaining
  review surface. The prior entry's note on `meta.status` stands.

## 02, second addendum — CPA review applied; judgment list closed
Shipped: 2026-08-27

**What changed**
- Applied the reviewer's dispositions of the twelve judgment items. Edits to
  `src/lesson-01.ts`: "a private company" → "a lessee" in blocks 1 and 7
  (J1/J11); block 2 drops "bargain" so the purchase-option example turns on
  intent, matching the glossary; block 3 adds the termination-option
  sentence from 842-10-30-1(b) (J3); block 4's disclosure sentence now
  carries 50-4(c)'s one-month-or-less carve-out (J5).
- Retired the month-to-month storage unit example (J4): the reviewer's
  analysis is that a true month-to-month either party can end without
  penalty has a one-month noncancellable lease term under 842-10-30-1 — it
  IS short-term — so the example undercut the point. Blocks 1, 3, and 8 now
  use a delivery van on a one-year lease with three always-taken one-year
  renewals (a four-year lease term); block 1's slide line is "A one-year van
  lease with renewals: it depends". No question used the retired example, so
  `questions-01.json` needed no content change.
- J2, J6, J7, J8, J9, J10 (the "≈ $23,400" arithmetic blessed), and J12
  accepted as drafted. The review document's judgment list is CLOSED;
  its Resolution log records every edit.
- estimatedSeconds and reveals recomputed for the six edited blocks; the
  narration is now 1,033 words, 8m05s estimated total. Re-rendered silent
  (14,550 frames) and spot-checked the changed sheet.

**Verified**
- `npm run typecheck` clean; `npm run check`: 0 errors, 0 warnings.
- Dry run: eight blocks pending, marker counts 3/3/4/3/4/3/4/3, nothing
  sent.

**Known gaps**
- Content review is complete but the lesson is still unvoiced; author fields
  remain `TODO:`. Next step is the human's: `npm run generate -- --lesson 01`
  after a final Studio scrub.

## 03 — Block timings in the manifest, and a real review gate
Shipped: 2026-08-27

**What changed**
- `manifest.video.blocks`: one `{ id, start_seconds, end_seconds }` per
  narrated block, in playback order, so superCPE can pause the video for
  review questions at the right second. Values are measured: `export.ts`
  walks the blocks with `durationOf` (the existing `usingEstimates` refusal
  already guarantees every narrated duration is measured), offset by the
  title sheet's `estimatedSeconds` — the only unnarrated block; its length
  is a fixed render constant, not an estimate of speech, so it is not
  subject to 7.02.7. Rounded to 3 decimals; each entry's `start_seconds` is
  by construction the previous `end_seconds`.
- `docs/course-package.md`: the `blocks` field and its four ingest rules.
  While syncing, the local copy turned out to be *behind* superCPE's
  authoritative one, which had formalized `course_code` and `position`
  (their feature 004); adopted that text too, and the edited contract is
  copied to `../supercpe/docs/course-package.md` — `diff` is empty, the two
  are byte-identical again. superCPE feature 006 enforces the blocks rules
  on its side.
- Adopting 004's rules exposed two drift bugs in `export.ts`: it wrote
  `course_code: meta.courseCode` (which is the *lesson* package id,
  "ASC842-PCX-01") and `position: meta.position` (the display string
  "Lesson 1 of 4") where the contract wants the course's code and an
  integer. Both now come from `COURSE` in `src/course.ts`, looked up by the
  lesson's package id; export refuses a lesson with no course entry.
- `scripts/validate-package.ts`: rule 18 (continuing from 17) — blocks
  entries match `transcript.md`'s `## <block id>` headings in order, count
  equals `narration_blocks`, timings contiguous and ascending, last
  `end_seconds` within 1s of `duration_seconds`. `blocks` joins
  `VIDEO_FIELDS`, and `course_code`/`position` join `MANIFEST_FIELDS`
  (rule 3); their value checks need the course database and stay
  server-side, like rule 5's ffprobe.
- `meta.status` is now a real vocabulary, `"draft" | "reviewed"`
  (`LessonStatus` in `src/types.ts`), replacing `""`-means-cleared. Export
  refuses anything but `"reviewed"`, naming `drafts/<lesson>-review.md`;
  `npm run check` warns on `"draft"` and errors on anything outside the
  vocabulary; the human sets `"reviewed"` by hand — nothing in the tooling
  sets it (LESSON-RUNBOOK.md step 6 rewritten accordingly). `Sheet.tsx`'s
  watermark now blanks on `"reviewed"` — it rendered `meta.status` raw, and
  the cleared value is no longer the empty string.
- `src/lesson-01.ts`: `status: "reviewed"` — its review document's judgment
  list is closed and the author signed off on 2026-08-27.
- Standards touched: 5.01.2.1 (block timings let review questions be placed
  throughout the program at measured points); 4.02 (export now requires a
  recorded review).

**Verified**
- `npm run typecheck` clean; `npm run check`: 0 errors, 0 warnings.
- `npm run export -- --lesson 01`: eight `blocks` entries, contiguous
  (asserted programmatically), first `start_seconds` 8.000 (the title
  sheet), last `end_seconds` 422.770 vs `duration_seconds` 423 (0.23s
  drift); manifest carries `course_code: "ASC842-PCX"`, `position: 1`.
- Temporarily setting `status: "draft"`: export refuses naming
  `drafts/ASC842-PCX-01-review.md`; `check` shows the `[draft]` tag and the
  warning. Restored `"reviewed"`.
- Rule 18 negative-tested on a tampered manifest copy: broken contiguity, a
  wrong block id, and a drifted last `end_seconds` each produce their error.

**Known gaps**
- Out of scope per the feature: lessons 2–4 (feature 04); no slide,
  narration, or voice changes; no audio regenerated.
- `COURSE.lessons[0].status` in `src/course.ts` still says `"draft"` — that
  is the course outline's production status, a different field from
  `meta.status`, and was not in scope. Worth reconciling when feature 04
  touches the course record.
- The validator cannot check "start of the first entry is the title sheet's
  duration" (the package does not carry the title length) or that timings
  are measured rather than estimated — both remain video-tool attestations,
  like `duration_source`.
