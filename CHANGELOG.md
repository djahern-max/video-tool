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

## 04 — Lessons 2–4 drafted, and lesson 1's coverage fix
Shipped: 2026-08-27

**What changed**
- `src/lesson-02.ts` — "The Risk-Free Rate Election" (1,067 words),
  `lesson-03.ts` — "Not Separating Lease and Nonlease Components" (1,002),
  `lesson-04.ts` — "Common Control Arrangements" (1,135): title sheet plus
  eight narrated blocks each, every sheet inside the 40–75s window, four
  observable objectives each, same voice as lesson 1 ("the standard says"
  before each quotation, one quoted sentence per block at most, worked Calc
  examples). Each `audio-meta-NN.json` is `{}` — `usingEstimates` true, as
  it must be; `status: "draft"` on all three. Blocks 2–4 import their
  `Block`/`Figure` types from lesson-01 instead of redefining them.
- Arc adjustments where the sources argued for them, recorded in the review
  documents: lesson 2 block 7 teaches that NFP conduit bond obligors CAN
  make the risk-free rate election (the feature's arc said the opposite;
  ASU 2021-09's Summary and BC13 are explicit, and the exclusion the arc
  remembered belongs to lesson 4's ASU 2023-01 expedient — the contrast is
  now taught in both lessons and flagged J2 for the reviewer). Lesson 4
  block 4 adds that the leasehold-improvements amendment reaches all
  entities, public included (ASU 2023-01 Summary), which the arc did not
  mention.
- `src/questions-0[2-4].json`: 5 review + 4 assessment per lesson, four
  choices throughout, review questions on five distinct blocks, one
  assessment question per objective, feedback per 5.01.2.2 naming the block
  to re-study, `_source` comment keys throughout.
- Lesson 1 coverage fix: `q-09` (assessment, lo-3 — the objective its three
  assessment questions left unmeasured) added to `questions-01.json`;
  documented as a third addendum in `drafts/ASC842-PCX-01-review.md` with
  one open judgment item (J13) for the CPA. `meta.status` stays "reviewed";
  narration untouched. Re-exported → `dist/ASC842-PCX-01.zip`, 7m03s
  measured, 9 questions — a new content hash over the identical video
  (version 3 on upload).
- Course-wide question checks in `scripts/check-lessons.ts`, as ERRORs (the
  rules superCPE 007 will refuse on): per-lesson counts (5 review / 4
  assessment), assessment coverage of every objective with no two
  assessment questions sharing one, duplicate stems across all lessons'
  review and assessment questions (lowercased, whitespace collapsed,
  trailing punctuation stripped), `after_block` on a real narrated block
  and never two review questions on one block, four/three-choice minimums,
  feedback and objective mapping on every question. They run over every
  registered lesson even under `--lesson` (duplicate stems are cross-lesson).
  Negative-tested: a tampered questions file fired all five rule families;
  restored byte-identical.
- `src/course.ts`: lesson statuses reconciled (01 `reviewed`, 02–04
  `draft`) with a comment that `COURSE.lessons[].status` mirrors each
  module's `meta.status`; `check` now warns on disagreement (and on a
  lesson with no course entry).
- `drafts/ASC842-PCX-0[2-4]-review.md`: the lesson-1-format reviewer's
  documents — per block, narration as drafted, sources by paragraph/BC
  number, reveal targets; per question, sources and objective; UNSOURCED
  flags inline; open judgment lists (L2: J1–J7, L3: J1–J9, L4: J1–J8); a
  `Sources still needed` list in each (L4's is empty, deliberately).
- `LESSON-RUNBOOK.md`: the five question rules as a "Questions" section, so
  future lessons inherit them.
- Registered lessons 02–04 in `lessons.ts`/`questions.ts`; `Root.tsx`
  needed no change.

**Standards touched**
- 3.01 — twelve new learning objectives written as observable outcomes
  (determine / apply / explain / identify / evaluate / compute).
- 6.01.2 — assessment coverage (every objective measured, one question
  each) and the duplicate-stem prohibition applied at authoring time,
  enforced by `npm run check` before superCPE ever sees the course.
- 5.01.2.1 — five review questions per lesson placed on five distinct
  narrated blocks via `after_block`.

**Verified**
- `npm run typecheck` clean; `npm run check`: 4 lessons, 36 questions, 0
  errors, 3 warnings (the by-design `[draft]` warnings on 02–04; the
  status-mirror warning is silent because the statuses agree).
- Dry runs spend nothing: lessons 02–04 each list all eight narrated blocks
  pending with marker counts (3/3/4/4/4/3/3/3, 3/3/3/4/3/3/4/3,
  3/4/4/4/4/4/4/4), title sheets absent.
- Export refuses each of 02–04 on `draft` status, naming its review
  document; `npm run export -- --lesson 01` → `dist/ASC842-PCX-01.zip`,
  7m03s measured, 8 narrated blocks, 9 questions.
- Silent renders: lesson-02.mp4 8:22.06, lesson-03.mp4 7:50.06,
  lesson-04.mp4 8:51.05 (ffprobe), each matching its estimated total.
  End-of-block frames extracted for all 27 sheets: every statement line,
  facts row, calc row, and list item visible by the end of its block; pink
  emphasis on exactly one element per Calc sheet; titles render real text;
  draft watermark present.
- `ls src/`: four lessons, four questions files, four audio-meta files.

**Known gaps**
- Lessons 2–4 are UNREVIEWED and UNVOICED; their judgment lists are open
  (7 + 9 + 8 items) and their review documents are the CPA's next surface.
- Sources still needed (per the review documents): Master Glossary
  "Incremental Borrowing Rate" and a Codification `842-20-50-10.txt`
  (lesson 2); `842-10-15-33`, `842-10-15-35`, `842-10-15-42A`, and
  `842-10-15-3.txt` (lesson 3 — its lessor block and default-allocation
  mechanics are UNSOURCED until then); lesson 4 needs nothing.
- Lesson 1's J13 (the new q-09) awaits the CPA; version 3 exists locally in
  `dist/` and has not been uploaded to superCPE.
- The lesson-2/4 worked-example arithmetic (7%/4% office lease; $150,000
  roof) and lesson 3's ($5,000/$1,000 split at 5%) are illustrative figures
  awaiting the reviewer's blessing, like lesson 1's ≈$23,400 was.

## 05 — Text-package authoring and export
Shipped: 2026-09-01

Part C of superCPE feature 023 (the strategy is supercpe's
`docs/decisions/2026-09-01-text-first.md`): video-tool learns to author
and export a `kind: "text"` course package — a study guide whose markdown
sections are the program.

**What changed**
- `docs/course-package.md` mirrored byte-identically from supercpe
  (acceptance 10 of supercpe 023 closes; `diff` is empty). Copied from
  supercpe commit `0af49b5` **plus its uncommitted 023a working tree** —
  023a (manifest joins the content hash) was implemented there but not
  yet committed or changelogged when this shipped; the supercpe side
  should commit it so this record can point at a real commit.
- The text-lesson authoring shape, inside the existing conventions:
  `src/lesson-05.ts` exports one `meta` with `kind: "text"`, a `sections`
  array (`{id, file, role, title}`, files under `guide/<lessonId>/` as
  plain markdown), `glossaryTerms`, and optional `media` (clips, each
  with `placement.afterSection` and a per-item `avIsAdditionalLearning`
  claim). Registered in `lessons.ts`/`questions.ts` like any lesson.
  There is deliberately no `wordCount` field on `TextLessonMeta` —
  superCPE computes it — and export refuses a module that smuggles one
  in. `questions-05.json` places review questions by `after_section`.
- A text lesson with no clips never touches Remotion, ElevenLabs, or
  ffprobe of a render: `Root.tsx` registers no composition for it, and
  `render`/`generate` refuse it by name, pointing at export.
- `scripts/export.ts` gained the text branch: builds `manifest.json` +
  `guide/*.md` (copied verbatim) + optional `media/*` + `questions.json`,
  ffprobes each clip (truncating down), validates with the mirrored
  rules, zips. Refusals — each before anything is created under `dist/`:
  a media item not claiming additional learning (quoting 7.02.7's test),
  a declared word count, no `body` section, no `front_matter` section, a
  question or clip placed on a section id that does not exist.
- **content_hash per 023a, both kinds**: the parsed manifest, serialized
  canonically (sorted keys, no separator spaces, UTF-8, `content_hash`
  key absent), is hashed first, then the kind's files. The video branch
  now computes the digest after building the manifest and writes the file
  second. `dist/ASC842-PCX-01.zip` was re-exported under the new
  definition (same content bytes, new manifest hash) and revalidated; no
  audio was spent and no render re-run anywhere in this feature.
- `scripts/validate-package.ts` gained the kind peek, the text layout
  rule, and the text rules with packages.py's rule numbers and messages
  (rule 2 identity, 3 fields, 6 hash, 8–12 descriptors, 13–17 questions
  with `after_section`, sections/media/glossary checks). Also fixed a
  latent crash: `pyType(undefined)` fell through to `"dict"`, so
  validating questions with no `video` object dereferenced undefined.
- `scripts/word-count.ts`: the 7.02.5 counting rules ported regex-for-
  regex from supercpe's `word_count.py`; verified identical on 14 edge
  cases (fences, links, autolinks, images, tables, HTML, unicode) against
  the Python implementation directly.
- `scripts/text-preview.ts`: the per-section table (section, role, words,
  counted/excluded) and the estimate line
  `(counted ÷ 180 + clip min + questions × 1.85) ÷ 50`, labelled an
  estimate, printed at export and under `npm run check`.
- `scripts/check-lessons.ts` checks text lessons (roles, files exist and
  non-blank, body+front matter present, glossary, media claims) and
  extends the course-wide question rules: five review questions on five
  distinct real sections via `after_section`, no placements on
  assessments; the duplicate-stem check now runs **per course** (rule 2
  is a within-course rule, and the repo now holds two courses:
  `COURSE_ASC450` joined `src/course.ts`, with `COURSES` for lookups).
- One real lesson: ASC450-LC-01, "Recognizing, Measuring, and Disclosing
  Loss Contingencies" — front matter from the template, five short body
  sections, five-term glossary, an appendix reproducing 450-20-25-2, 5
  review + 4 assessment questions, no clip (none was convenient; the
  media path was exercised with a temporary entry instead — ffprobe,
  manifest, hash, and zip all verified, then removed).

**Standards touched**
- 7.02.5 — the counting rules and exclusions implemented at authoring
  time, matching the server: only `body` sections are counted, the
  exclusion list is a role, and the export preview shows shipped vs
  counted per section so the author sees superCPE's number first.
- 7.02.7 — the additional-learning claim is required per clip at export,
  refusing with the paragraph's own test quoted; a clip that narrates
  the text does not belong in a text package.
- 5.01.2.1 — review questions placed by `after_section` on distinct real
  sections, enforced at check and export before superCPE ever sees them.

**Verified**
- `npm run typecheck` clean; `npm run check`: 5 lessons, 45 questions, 0
  errors, 4 warnings (lesson 05's by-design `[draft]`; the 02–04
  status-mirror warnings pre-exist this feature — those modules say
  "reviewed" while `course.ts` still says "draft").
- All five named refusals fired with nothing created under `dist/`.
- Word counts: the glossary section hand-counted to 113 and matched; a
  word added to the appendix moved shipped 1397→1398 while counted held
  at 865; both exported zips validate against supercpe's own
  `packages.py` (the authority, not just the local mirror), with
  identical hashes and identical per-section counts.
- Round trip against a local supercpe (uvicorn + dev Postgres, a
  throwaway admin created and removed): upload → **201**, version 1,
  `word_count 865 (computed)`; package summary matched the export
  preview section by section (865/1397, roles 256/865/113/163, 5+4
  questions); course credit computed raw 0.429 against the preview's
  ≈0.43; reader preview returned all 8 sections' markdown; a one-word
  edit re-exported and re-ingested as **201, version 2** with no manual
  bookkeeping (023a), and re-uploading the original content deduped as a
  200 no-op against version 1's hash. Draft course, both package
  versions, and the throwaway admin all deleted; dev DB left with no
  packages and no courses.
- **Round-trip time, the Stage 1 number: 0.31s** — 0.29s from "edit one
  sentence in a section file" to re-exported, 0.02s to re-ingested.

**Decisions**
- Lesson 05 ships as `status: "draft"`: the round trip ran with the flag
  temporarily set, but no CPA review has happened, and
  `drafts/ASC450-LC-01-review.md` now carries the traceability record
  and an open judgment list (J1–J6) — including that the ASC 450
  citations were written from working knowledge with no `sources/`
  extractions yet. Setting "reviewed" stays the human's step.
- `meta.sections[].file` is the bare filename inside `guide/<lessonId>/`;
  export prefixes `guide/` in the manifest, so the contract path exists
  in exactly one place.
- `media[].file` points at a rendered artifact relative to the repo root
  (normally `out/…`), since clips come from the existing pipeline.

**Known gaps**
- `validate-package.ts` picked up the new duplicated text rules that must
  track supercpe's `packages.py` by hand — the standing known gap, now
  larger, and `word-count.ts` joins it as a second maintained duplicate
  (of `word_count.py`).
- `check-lessons.ts`'s estimate line counts clip minutes as 0 for a clip
  not yet rendered (export measures for real and refuses on a missing
  file).
- The supercpe commit for the mirrored contract is `0af49b5` + an
  uncommitted 023a working tree; re-verify the diff is still empty after
  023a lands over there.
- LESSON-RUNBOOK.md still describes only the video workflow; a text
  lesson's runbook (author sections → check → review doc → export) is a
  documentation follow-up.

## 06 — Retire a lesson, and scaffold the next one
Shipped: 2026-09-02

**What changed**
- `npm run retire -- --lesson NN` (`scripts/retire.ts`): deletes
  `src/lesson-NN.ts`, `src/questions-NN.json`, `src/audio-meta-NN.json`,
  `public/audio/NN/`, `guide/NN/`, `out/lesson-NN.mp4`, and `dist/<code>*`,
  and makes all three registry edits — the import and entry in `lessons.ts`,
  the import and two entries in `questions.ts`, and the `COURSE.lessons`
  entry in `course.ts`. `Root.tsx` needed no change; it derives compositions
  from `LESSONS`. `--all` does the whole workspace under one confirmation.
  `--dry-run` prints the same removal set and exits 0. Otherwise it prints
  the set and requires a typed `y`, which `--force` skips.
- Three refusals, in order, each naming what is wrong and creating nothing:
  an unknown lesson id, listing the registered ids the way `render.ts` does;
  a working tree with uncommitted changes under the removal set, printing
  the `git status --porcelain` lines; and any `public/audio/NN/*.mp3` git
  does not track, named file by file. `--force` waives the second and the
  confirmation. It does not waive the third. A `git` invocation that fails
  at all (not a repository, for instance) is itself a refusal — every
  question this command asks is a question about history.
- One warning that does not block: a `"reviewed"` lesson with no
  `dist/<lesson_id>.zip` on disk prints that the transcript of record leaves
  this repo only inside an exported package (9.02.1(8)), then continues to
  the confirmation.
- The audio directory and its measured timings are one removal, so they
  cannot come apart — the failure mode the old hand procedure had to
  remember (delete an MP3, reset `audio-meta-NN.json` to `{}` in the same
  commit) is now structural rather than remembered.
- `npm run new -- --lesson NN --code <lessonId> --title "..."`
  (`scripts/new-lesson.ts`), with `--kind text|video` defaulting to video.
  Writes the module from the shape `lesson-02.ts` had — types imported,
  course-level fields read from `src/course.ts` — with a title sheet and one
  placeholder narrated block, every descriptor field a `TODO:`, and
  `status: "draft"`. Also `questions-NN.json` as `[]`, `audio-meta-NN.json`
  as `{}` (so `usingEstimates` is true from the first moment), `guide/NN/`
  with a front-matter and a body section for `--kind text`, an empty
  `drafts/<code>-review.md`, and the entries in both registries. It refuses
  an id already registered, an id whose module file exists unregistered, an
  id that is not two digits, and a `--code` any registered lesson already
  uses — a reused package id re-ingests downstream as a new *version* of
  that lesson and marks the course's credit and review stale.
- It writes no `COURSE.lessons` entry, and prints that one is needed before
  export. Which course a lesson belongs to and at what position is an
  authoring decision.
- `scripts/registry.ts`: the registry edits both commands share, so they
  cannot disagree about the shape of what they write and remove. Line
  oriented, not an AST rewrite — these files are hand-read, and preserving
  their comments and spacing matters more than tolerating arbitrary
  formatting. Both registry files now carry a comment saying to keep one
  import and one entry per line, which is that module's contract.
- Three structural repairs the empty-registry state required, none of which
  changes what a package contains or attests:
  - `src/blocks.ts` is new and holds `Block` and `Figure`, which lived in
    `src/lesson-01.ts` with every other lesson re-exporting them from there.
    That made lesson 01 undeletable: retiring it took `slides.tsx` and every
    sibling with it. They are the render side's shape, not any one lesson's
    content.
  - `LESSONS`, `QUESTIONS`, and `QUESTIONS_FILE` are declared through a
    string index instead of `Record<LessonId, …>`. With no lesson
    registered `LessonId` is `never`, which made `LESSONS[id]` itself
    `never` and stopped every caller reading `.meta` from compiling.
    `LessonId` still derives from the registry, so `--lesson` stays checked,
    and a `satisfies Record<LessonId, …>` on the underlying literals keeps
    the exhaustiveness check in `questions.ts`.
  - `COURSE.lessons` is typed `CourseLesson[]`. Under `as const` an inline
    `[]` types its elements as `never`, and everything mapping over
    `course.lessons` stops compiling the moment the last lesson is retired.
- `scripts/remove-lesson.sh` deleted. It was the hand-rolled predecessor:
  dry-run by default, but it refused a `"reviewed"` lesson rather than the
  things that actually cannot be recovered, said nothing about
  `audio-meta-NN.json`, left `course.ts` to a "leftover mentions" grep, and
  contradicted the new CLAUDE.md line that `retire` is the only supported
  way to delete audio.
- Documentation: README gains step 0 (`new`) and step 6 (`retire`) in build
  order, plus the new files in Structure. CLAUDE.md lists both commands and
  gains a line under "Costs and secrets" that `retire` is the only supported
  way to delete audio, because it enforces the audio-meta invariant.
  LESSON-RUNBOOK.md gains step 0 and step 11, step 2 now records that `new`
  already did the registration, and step 9's upload is the admin packages
  page — the `~/projects/abacadaba/video` paths, the `upload_video.py`
  note, and the SSH-plus-`docker compose exec` slug lookup are gone.

**Standards touched**
- 9.02.1 — retire deliberately does not delete `drafts/` or `sources/`. The
  review document is the 4.02 evidence that a licensed CPA signed the lesson
  off, and the source extractions are what the narration cites; both are
  program-development records. It prints where they are and leaves them, and
  deleting them stays a human decision made by hand. The exported package,
  not this repo, is the retention artifact: `transcript.md` leaves here
  inside a package and is retained by superCPE under 9.02.1(8), which is why
  retiring a `"reviewed"` lesson with no package on disk warns and says so.
- 4.02 — nothing in either command sets, clears, or downgrades
  `meta.status`. `new` always writes `"draft"`; `retire` removes a lesson
  rather than un-reviewing one, and its refusals are about recoverability,
  not review state (which is where the old shell script drew the line).

**Verified**
- `npm run typecheck` and `npm run check` clean with zero lessons registered
  (0 lessons, 0 errors, 0 warnings), and `npm run dev` starts Studio and
  builds with no compositions and no errors.
- The `new` round trip, spending no credits and running no render:
  `npm run new -- --lesson 07 --code TEST-07 --title "T"` → typecheck clean;
  `check` 0 errors, 3 warnings (the `[draft]` gate, the missing course entry,
  and the placeholder block's 18s pacing); `generate -- --lesson 07
  --dry-run` listed `block-01` with its 3 reveals, title sheet absent,
  nothing sent; `export -- --lesson 07` refused on status first with nothing
  under `dist/`; `retire -- --lesson 07 --force` returned `git status` to
  clean apart from `drafts/TEST-07-review.md`.
- All three refusals fired and created nothing: an unknown id (`--lesson
  99`); a dirty tree, naming the three untracked files; an untracked MP3,
  named, and still refusing under `--force`.
- `--dry-run` changed nothing — `git status --porcelain` captured before and
  after was byte-identical.
- The rest was exercised in a throwaway clone (git history is what several
  of these turn on, and nothing here should be committed for a test): a
  reviewed video lesson with two committed MP3s and a `COURSE.lessons`
  entry at position 2 of 1–3, and a text lesson in the other course. The
  reviewed-but-unexported warning fired and named 9.02.1(8) without
  blocking; `n` at the prompt left `git status` clean; `y` removed the four
  paths, both registry entries, and the course entry, and reported
  "positions are now 1, 3 — position 2 is a gap" without renumbering.
  `drafts/` and `sources/` were untouched. `git log` and `git show` still
  resolved the retired module and both MP3 blobs at the prior commit.
  `retire --all` then emptied both registries and both course outlines, with
  typecheck and check clean at 0 lessons.
- `new`'s refusals: duplicate id, duplicate `--code` (naming the lesson that
  holds it), a non-two-digit id, and an invalid `--kind`, each creating
  nothing.
- The text scaffold checks clean at 0 errors, with the one honest warning
  that `glossaryTerms` is empty (4.05.3 item 3).

**Decisions**
- Git history is the archive. That is why a dirty working tree and an
  untracked MP3 are refusals rather than warnings: the MP3s are committed
  source that cannot be regenerated identically and cost credits to
  regenerate, and a file with no history has nowhere to be recovered from.
  `--force` is for the ordinary case of retiring something never committed
  (a scaffold, a test lesson), so it waives the dirty-tree refusal — and
  deliberately does not waive the untracked-audio one.
- `retire` does not refuse a `"reviewed"` lesson, which is where the shell
  script it replaces drew its line. Review state is not a recoverability
  question, and treating it as one taught the wrong lesson about what is
  actually irreversible here; the reviewed-but-unexported case is a warning
  naming 9.02.1(8) instead.
- The hand deletion that emptied the registry left `questions.ts` importing
  seven deleted JSON files and `course.ts` describing five lessons that no
  longer existed — `npm run typecheck` and `npm run check` were both broken
  on arrival, which is precisely the failure this feature exists to prevent.
  That deletion is finished here so the empty state is real; the course
  records remain in git.
- `new` writes `audio-meta-NN.json` only for a video lesson. Its stated
  reason is `usingEstimates`, which a text lesson does not have — an unused
  JSON file would be exactly the debris this feature removes. `retire` still
  removes the file for any lesson that has one.
- The runbook's retire step is 11, not 10: the file already had a step 10
  (Recompute credit), and retiring comes after it.

**Known gaps**
- Retiring a lesson leaves a gap in the surviving `COURSE.lessons[].position`
  values. The command says so and does not renumber: superCPE ordered the
  course by those numbers, so closing a gap is a content decision a human
  makes.
- The registry edits are line-oriented text edits. They depend on the two
  registry files keeping one import and one entry per line — stated in a
  comment at the head of each — and would need rewriting as an AST pass if
  those files are ever reformatted by a tool.
- `new` scaffolds against `COURSE`, the first course record. A lesson
  belonging to another course needs its `import { COURSE }` switched by
  hand, alongside the `COURSE.lessons` entry the command already says to
  write.

## 07 — The course-wide question counts were unsourced
Shipped: 2026-09-03

**What changed**
Nothing in the code. This entry records a defect in an earlier one.

`REVIEW_PER_LESSON = 5` and `ASSESSMENT_PER_LESSON = 4` in
`scripts/check-lessons.ts` entered the repo in feature 04, stated as two of
five "course-level question rules" in `current-feature-004.md` and copied
verbatim into the code comment, `LESSON-RUNBOOK.md`'s Questions section, and
entry 04 of this file. None of the four texts derives either number.

- The 4 has a stated rationale that is not a count: one assessment question per
  objective, because ASC842-PCX lessons each have four objectives. It is that
  course's objective count frozen as a constant. A lesson with a different
  number of objectives fails a rule that was never about counts.
- The 5 has no recorded rationale anywhere. Entry 04 cites 5.01.2.1 under
  Standards touched, but 5.01.2.1 is the placement-and-count paragraph and
  nothing in it produces 5.
- The four-choice assessment minimum has no recorded rationale either, and
  contradicts `validate-package.ts`'s `ASSESSMENT_MIN_CHOICES = 3` — the file
  that is a recorded mirror of superCPE's `packages.py` — and this project's
  policy that three-or-more is a policy choice, the Standards prohibiting
  forced choice rather than prescribing an option count. Two files in this
  repo, both presented as reflecting superCPE, disagreed on one rule, and the
  stricter one was the unrecorded copy.

The claim that superCPE enforces these is circular. "superCPE feature 007
enforces these across the whole course on ingest" appears in the feature
document that invented the rules, in the code comment copied from it, and in
the runbook section copied from that. There is no source outside video-tool.
`check-lessons.ts` was never listed in CLAUDE.md's maintained duplicates, so
unlike `validate-package.ts` it had no recorded original to lose step with.

Downstream consequence, recorded because it is in a shipped package:
ASC842-PCX lesson 01's `q-09` was added in feature 04 to bring that lesson to
four assessment questions. It is a real, sourced question and the objective it
covers (`lo-3`) was genuinely unmeasured before it. But the reason it was
written was a number nobody derived, and it changed the lesson's content hash
and produced version 3 on upload.

**Known gaps**
- Whether superCPE's readiness code enforces anything resembling these counts
  is unverified and was never verified. Nothing in this repo can answer it.

## 08 — The course-wide question counts come out, and export gates on what remains
Shipped: 2026-09-03

**What changed**
- `scripts/check-lessons.ts`: removed `REVIEW_PER_LESSON`,
  `ASSESSMENT_PER_LESSON`, and the two count checks. Question-count minimums
  are 5.01.2.1's three review questions per CPE credit and 6.01.2's five
  assessment questions per credit — both functions of credit, which superCPE
  computes and this repo does not. Adding a question moves credit by 1.85/50,
  so the minimum is not even a static function of the content. Question-count
  minimums and readiness findings are superCPE's; these rules crossed that
  boundary on the day they were written.
- Rule 1 keeps its coverage half (every objective carries at least one
  assessment question) and loses its uniqueness half (no two assessment
  questions on one objective). The uniqueness half existed only because four
  questions against four objectives forced a bijection; it is the count rule
  restated.
- Rule 3: assessment choice minimum 4 → 3, matching `validate-package.ts`.
  Review stays at 3, now with its basis recorded: 5.01.2.1 does not count
  true/false review questions toward the required number.
- Rule 4 (review questions on distinct blocks or sections) is unchanged and is
  what the removed 5 was standing in for. 5.01.2.1 asks for distribution at
  sufficient intervals, which is a placement property, decidable from the
  module alone.
- The header comment no longer claims superCPE enforces these rules.
- `scripts/export.ts` now runs the lesson check and refuses on ERROR, in both
  branches, after the status and `usingEstimates` refusals and before the
  render-exists check, creating nothing under `dist/`. Previously export never
  called `check-lessons.ts`, so a lesson could fail `npm run check` and export
  cleanly — the gate that would otherwise have caught a bad package before a
  Registry application.
- The course-wide question rules still run over every registered lesson;
  export acts only on findings naming the lesson being exported. The asymmetry
  is documented at the call site.
- `Finding` gained a `lessons: LessonId[]` field, and export filters on it
  rather than on a `block` string prefix — `block` is a display label
  ("b-03 S-02", "meta", "01 q-07") and parsing it would be guessing.
- **A duplicate-stem finding now names both lessons, not only the second.**
  It previously carried one label, the later of the two questions, so
  exporting the *earlier* lesson of a colliding pair passed the filter and
  shipped. A collision is a property of the pair: both packages carry a
  question asking the same thing, and both are now refused. The printed
  message and `block` label are unchanged, so `npm run check`'s output did not
  move.
- `check-lessons.ts` is now importable: `main()` runs behind the
  `process.argv[1]` guard `generate-audio.ts` already uses, so importing the
  seam does not run the report.
- WARN findings are printed and do not block. Their levels were calibrated for
  a voluntarily run script and are reassessed in this feature's inventory; no
  level was changed here.
- `LESSON-RUNBOOK.md` and `CLAUDE.md` updated. `CLAUDE.md` records
  `check-lessons.ts` as video-tool's own authoring discipline and explicitly
  not a maintained duplicate.

**Standards touched**
- 5.01.2.1, 6.01.2 — the per-credit minimums, named as superCPE's to evaluate
  rather than restated here as per-lesson constants.
- 6.01.2 — objective coverage retained: one assessment question per objective
  satisfies the 75 percent floor from the manifest alone.
- 4.01.1, 4.02 — export's review gate now runs the authoring checks it always
  claimed were run before a package shipped.

**Verified**
The repo has no registered lessons: feature 06 retired them and the working
tree carries an empty `REGISTRY`. `npm run check` reports "0 lesson(s)
checked" against the repo as it stands, so the acceptance runs that name
lesson 01 could not be run as written. Everything below was verified against
throwaway lessons scaffolded with `npm run new`, removed afterwards; the
working tree is back to only this feature's five files, with no untracked
leftovers.

- `npm run typecheck` clean. `npm run check` clean, exit 0.
- Scratch video lessons 91 and 92, each with four 3-choice assessment
  questions and *one* review question, check clean — 0 errors. Under the
  removed rules that shape was two errors per lesson (one review question, not
  five; three choices, not four). This is the removal, observed.
- Negative tests, each applied and reverted: a 2-choice assessment question
  errors; two assessment questions on one objective do not; an objective with
  no assessment question still errors; two review questions on one
  `after_block` still error; a stem duplicated across two lessons still
  errors; a removed `feedback` still errors.
- Export gate, exercised on a scratch **text** lesson: a broken question in
  the exported lesson refuses with the finding, creates nothing under `dist/`,
  and exits 1; the same breakage in a *different* registered lesson does not
  block, and the export succeeds and exits 0.
- Both directions of a stem collision refuse. Exporting the lesson holding the
  *first* of the two colliding stems is refused by a finding whose `block`
  label names the other lesson — the case that passed the filter before the
  `lessons` field existed.

**Known gaps**
- The video branch's gate was not exercised end to end. `usingEstimates`
  refuses before it, by design, and clearing that refusal means generating
  audio, which spends ElevenLabs credits and is the human's step. Its
  placement was verified by reading; the gate function itself is shared with
  the text branch and was exercised there.
- Acceptance items 4 and 5 as written — export lesson 01 and confirm its
  `content_hash` is unchanged — could not be run: lesson 01 does not exist in
  this repo. Nothing in this feature touches manifest construction or hashing,
  so no package content should move, but that is reasoning, not a measurement,
  and the first real export after this change should be compared against its
  predecessor.
- ASC842-PCX's questions were not inspected: no `src/questions-NN.json`
  remains in the tree. The 5 review + 4 assessment shape described in entry 07
  is recorded from history, not read from disk.
- The ERROR/WARN levels are unchanged from when they were set for a voluntary
  script. The inventory produced in this feature lists the ones worth
  revisiting now that ERROR blocks an export.

---

## 09 — `new` and `retire` own the course record
Shipped: 2026-09-03

**What changed**
- `npm run new` takes `--course-code` and `--course-title`. Naming a course
  places the lesson in it: the record is joined when the code matches one,
  and created — const, `COURSES` entry, doc comment — when it does not. The
  outline entry is appended at the next position. Hand-editing
  `src/course.ts` is no longer a step in the authoring loop.
- With no `--course-code`, `new` behaves exactly as it did: no course record,
  no `lessons` entry, and the same printed explanation that export will
  refuse until one exists.
- `npm run retire` removes a course record when it loses its last lesson, in
  the same operation that removes the lesson's outline entry, so the two
  cannot come apart. `--dry-run` names the records it would drop alongside
  the file removals. `--all` now leaves `COURSES` empty.
- `src/course.ts` gained an exported `Course` type, and `COURSES` is
  annotated `readonly Course[]`.
- `scripts/registry.ts` gained `readCourses`, `registerCourseLesson`,
  `unregisterCourse`, and `courseConstName`.
- `src/lesson-NN.ts`'s scaffolded `meta.position` is written out when the
  lesson was placed in a course (`` `Lesson 3 of ${COURSE_X.lessons.length}` ``)
  and stays a `TODO:` when it was not. It is a display string only; the
  manifest's `position` still comes from the course record, as before.
- Command lines updated in `LESSON-RUNBOOK.md`, `README.md`, `CLAUDE.md`.

**Standards touched**
- None. This is authoring ergonomics. The export gates, the review gate
  (`meta.status`, untouched by both commands), the manifest, `word_count`,
  and the package contract are all unchanged, and no paragraph of the 2026
  Statement was read for this entry — citing one would be decoration.

**Decisions**
- The refusal in `new-lesson.ts` — that the tool will not write a `lessons`
  entry — was kept, not deleted, and its comment now says why it survives.
  What this feature removes is the *guessing*: when the author names the
  course on the command line, nothing is left to infer. With no course named
  there still is, and the command still refuses.
- Position is the highest in the course plus one, never the lowest unused
  integer. `retire` deliberately leaves a gap when a lesson is retired from
  the middle of a course, because superCPE ordered the course by those
  numbers; a later unrelated lesson filling that gap would silently take over
  the retired lesson's place in the sequence. Rejected: compacting, and
  reusing the lowest free number.
- An emptied course record is removed rather than kept as a placeholder. The
  typing problem that creates — `COURSES` reachable at length zero, where an
  inline `[] as const` types its elements `never` — is solved the way
  `CourseLesson` already solved it for `lessons`: a named exported type and
  an explicit annotation. Rejected: leaving one record behind to keep the
  array non-empty, which is the hand cleanup these commands exist to remove.
- A created course record gets `knowledgeLevel: "Basic"` and
  `deliveryMethod: "Self study"` because those fields must hold values the
  validator accepts; `nasbaFieldOfStudy`, `prerequisites` and
  `advancePreparation` land as `TODO:` strings, matching how the lesson
  module's descriptor fields already scaffold. The command prints that all
  four need filling in before export. It does not research them.
- The course const name is derived from the course code
  (`GUM` → `COURSE_GUM`) rather than asked for as a flag. `retire` finds a
  record by walking back to the nearest `export const`, so the name has to be
  recoverable from the code alone; two names for one course is a drift the
  file cannot survive. Two course codes that would collapse to one identifier
  are a refusal.
- Refusals added, each naming what is wrong and creating nothing:
  `--course-title` disagreeing with an existing record's title;
  a new course code with no `--course-title`; `--course-title` with no
  `--course-code`; a course code that is not a usable identifier stem; a
  const-name collision. One more not in the spec: `new` with no course flags
  against a `src/course.ts` that declares no courses at all, which is newly
  reachable now that `retire --all` empties the file — the generated module
  reads its descriptor fields from a course const, and with none in the file
  there is nothing for it to import.
- `src/course.ts`'s header now states the shape both commands depend on
  (a record is an optional doc comment, then `export const NAME = {` through
  `} as const;`), because these are line-oriented text edits, not an AST
  rewrite, and that shape is a contract rather than formatting.

**Known gaps**
- `npm run check` exits 1 in this tree, on four pre-existing ERRORs about
  lesson 01's four scaffolded objectives having no assessment question. They
  are unchanged by this feature — they are scratch lesson content, which the
  feature excluded — and the output is byte-identical before and after. The
  feature is verified against them, not over them.
- `--course-title` cannot retitle an existing course; it only refuses on
  disagreement. Retitling a course is still a hand edit, and deliberately so:
  it changes the `courseTitle` every lesson of that course renders.
- Nothing renumbers positions, so a course whose middle lesson was retired
  keeps its gap and the next `new` lands past it. That is the decision above,
  not an oversight, but it means positions are not dense and nothing warns.
- The acceptance run was done in a throwaway copy of the repo under the
  scratch directory, because `retire --all` and repeated `new` runs destroy
  and rebuild the tree. The real tree was left holding lesson 01 and
  `COURSE_GUM` exactly as it started.

## 10 — An `Image` slide
Shipped: 2026-09-03

**What changed**
- `src/blocks.ts` gains a sixth `Figure` variant,
  `{ kind: "image"; src: string; alt: string; caption?: string }`, and
  `"Image"` joins `Block["slide"]`. `src` is a path relative to `public/`,
  loaded with `staticFile()`.
- `src/slides.tsx` gains the `Image` component and its `SLIDES` entry. It
  follows the shape of the other five: early-return `null` on a kind it does
  not recognise, `useCurrentFrame()`, `revealAt`, `revealTimeFor`. The image
  is reveal element 0 and the caption element 1, so one marker brings up the
  image alone and two bring up the image and then the caption.
- `scripts/check-lessons.ts`: `Image: "image"` joins `FIGURE_KIND_FOR`, so a
  mismatched `figure.kind` errors the way the other five do. `figureElements`
  returns 2 for an image figure with a caption and 1 without, instead of
  falling through to `null`. Two new ERRORs: a `figure.src` that names no file
  under `public/` (and a blank one), and a blank `alt`.
- `README.md` and `LESSON-RUNBOOK.md` say where image files live
  (`public/images/<lesson id>/`), that they are committed source rather than
  build output, and that licensing is the author's problem.

**Standards touched**
- None. This is a render-side slide type. `alt` and `caption` are narration
  sheet, not participant reading material, so `meta.wordCount` stays 0 for an
  all-video lesson and nothing here reaches a credit calculation.

**Decisions**
- The image sits inside the existing `Panel`, carrying the same hairline
  border and vellum-edge fill as the Compare columns, rather than going
  full-bleed. `theme.color.flag` is absent: the flag marks the one thing under
  discussion and on this sheet that is the whole image.
- The panel shrink-wraps the image rather than filling the sheet. The first
  attempt filled it, which left a portrait photograph sitting in a wide band
  of panel fill. Getting the panel to hug required driving its height from the
  row (`height: "100%"` on the panel, `width/height: auto` plus percentage
  caps on the image) — with the image absolutely filling the panel instead,
  the panel's shrink-to-fit width came from the image's *intrinsic* width,
  not its scaled width, and the panel came out 1260px wide around an 880px
  image. Both caps are percentages of a row flex has already measured, so no
  dimension is typed here, matching how no duration is typed anywhere else.
- `alt` is required, not optional. It is the only description of the image
  that survives into the transcript of record, and it is what a reviewer
  reads instead of the render.
- `figureElements` returns a number for an image figure rather than `null`.
  `null` is the "cannot count this" signal that skips the
  markers-exceed-elements check, and an image figure's element count is
  perfectly well known — it is just positional rather than an array length.
- The missing-`src` check is an ERROR, not a WARN, on the rule the file
  already uses: it produces a blank sheet for the block's whole length, which
  is the same defect the figure-kind pairing exists to catch, and it is
  decidable from the lesson's own module. So `npm run export` gates on it.
- Image licensing is an authoring responsibility and is **not** checked by any
  script. Nothing in this repo can tell a licensed photograph from an
  unlicensed one, and a check that pretended to would be worse than none.

**Known gaps**
- The `public/images/<lesson id>/` layout is a documented convention only.
  `check` verifies that `src` resolves under `public/`, not that it sits in
  that directory, so an image parked anywhere under `public/` passes.
- One image per sheet. Galleries, multiple images per block, and video-in-
  video were out of scope and remain unbuilt.
- Nothing verifies that `alt` actually describes the image, only that it is
  not blank — the same limit `check` has on every other authored string.
- Acceptance was run against a scratch lesson 99 (`IMG-99`) created with
  `npm run new`, verified with `remotion still` at 1200x800 and 600x1400, and
  removed with `npm run retire -- --lesson 99 --force`. `--force` was needed
  only because the scratch files were never committed, which is the one case
  the dirty-tree refusal has nothing to protect. The tree is back to an empty
  registry, as it started.

## 11 — `meta.status` is the developer's 4.01.1 check, not the 4.02 review
Shipped: 2026-09-04

**What changed**
- `LessonStatus` is now `"draft" | "checked"`. The passing value was
  `"reviewed"`, which collided with 4.02's "content reviewer" and is the word
  that produced the confusion this entry corrects. `"draft"` is unchanged.
  Renamed in `src/types.ts`, both comparisons in `scripts/export.ts`,
  `check-lessons.ts` (the vocabulary ERROR, the draft WARN, the two `[status]`
  header labels, and the course-mirror path), `retire.ts`'s
  checked-but-unexported warning, `new-lesson.ts`'s scaffold for both kinds,
  and the prose in `CLAUDE.md`, `README.md`, and `LESSON-RUNBOOK.md`.
- `src/Sheet.tsx` blanks the draft watermark on `"checked"` rather than
  `"reviewed"`. The watermark draws `meta.status` raw, so this string does
  reach the rendered frame — see **Decisions**.
- Both refusals in `scripts/export.ts` — the video branch's step 2 and the
  identical one at the head of `exportTextLesson` — now cite 4.01.1 only, name
  `drafts/<code>-review.md` as where the content developer's accuracy check is
  recorded, and say in the same breath that the 4.02 content review is
  superCPE's, performed by a licensed CPA against the ingested package, and is
  not what the flag represents. Neither refusal's condition, order, or exit
  code changed. The pointer to the runbook was also stale at "step 6"; the
  step is 7.
- `scripts/check-lessons.ts`'s draft WARN drops the "work through the review
  document" framing and matches the new refusal. Its section comments read
  "developer check gate (4.01.1)" rather than "review gate".
- `scripts/new-lesson.ts`: the scaffolded `status` comment in both module
  templates now states the 4.01.1 duty and disclaims 4.02. `author.name`'s
  TODO changes from "the reviewing CPA's name" to the author/developer of
  record, with a comment that the block becomes `manifest.author` under
  9.02.2(4) and that superCPE holds the content reviewer separately in
  `subject_matter_experts`. The generated `drafts/<code>-review.md` is titled
  "accuracy record" rather than "reviewer's document" and describes itself as
  the developer's 4.01.1 check.
- `scripts/retire.ts`: `drafts/` is preserved as the 4.01.1 accuracy record and
  9.02.2(2)(ii) supporting documentation rather than as "the 4.02 evidence that
  a licensed CPA signed the lesson off". What it preserves did not change.
- `CLAUDE.md` rule 4 is renamed "The status flag is the developer's signature"
  and its second paragraph is replaced: the flag is the developer's own 4.01.1
  check, `drafts/<code>-review.md` records it, and the 4.02 review is
  superCPE's — `course_reviews`, a reviewer login, `review_missing` /
  `reviewer_is_developer` / `cpa_participation` — evidenced by nothing here.
  The two-places instruction is unchanged.
- `CLAUDE.md`'s Boundary list drops the `meta.status` bullet and goes from five
  items to four. The flag is in neither branch's manifest object; it is a gate
  on what may be built, and the section now says so and cites 4.01.1.
- `README.md` and `LESSON-RUNBOOK.md`: `drafts/` is the developer's accuracy
  record throughout, step 7 is "Make the developer's accuracy check", and the
  upload step gains a line saying the 4.02 review happens in superCPE, by a
  licensed CPA with a reviewer login, against the ingested package.

**Standards touched**
- 4.01.1 — learning activities must be developed by subject matter experts,
  and where technology is used in developing the program the content developer
  is responsible for reviewing the content for accuracy. That is what
  `meta.status` attests, and the human who directed the generated narration is
  who makes it.
- 4.02 — programs must be reviewed by content reviewers other than those who
  developed them, before first presentation and after each significant
  revision. This is superCPE's: `course_reviews` with
  `content_updated_at_reviewed`, `current_review` in
  `backend/app/services/development.py`, submission behind
  `require_role("reviewer", "admin")`, and `review_missing`,
  `reviewer_is_developer`, `cpa_participation` as block findings on publish.
  Nothing in video-tool evidences it, and nothing here should be read as
  satisfying it.
- 9.02.2(2)(ii) — for self study sponsors using method 2, the word count
  formula calculation and the supporting documentation for the data used in it
  must be retained. `drafts/<code>-review.md` is the judgment list behind those
  numbers, which is why `retire` preserves it.
- 9.02.2(4) — author/instructor, author/developer, and content reviewer names
  and credentials, as applicable. `manifest.author` is the author/developer
  half; the content reviewer half lives in superCPE's `subject_matter_experts`
  and never in a lesson module.

**Decisions**
- **The gate stays.** Removing it was the obvious reading of "this repo has no
  review model", and it is wrong: 4.01.1 is a real duty, it falls on the human
  who directed the draft, and the flag is the only place that duty is recorded
  before a package leaves. Only the paragraph it cites and the record it names
  were wrong. No refusal's condition, order, or exit code moved.
- **The rename shipped.** `"reviewed"` → `"checked"` was confirmed with the
  author before starting. The value is internal — it is in neither manifest,
  which was verified against both manifest objects in `export.ts` before any
  edit — so nothing downstream sees it and the package contract is untouched.
  The alternative considered and rejected was fixing only the prose: lower
  risk, but it leaves the colliding word in the type, the refusals, and every
  scaffolded module.
- **The rename does reach the video.** `Sheet.tsx` draws `meta.status` raw and
  blanks it on the passing value, so the comparison moved with the rename.
  Verified on a scratch lesson 99 (`CHK-99`) with `remotion still` at frame 30:
  `"draft"` renders the pink `draft` stamp exactly as before, and `"checked"`
  renders the stamp blank exactly as `"reviewed"` did. The two frames differ in
  that stamp and nothing else. No shipped lesson is affected — the registry is
  empty — but any future module carrying a literal `"reviewed"` would now both
  fail typecheck and render its own status string into the frame.
- `drafts/` is cited to 9.02.2(2)(ii), not 9.02.2(7). It is the supporting
  documentation for the word count formula's inputs, not program materials —
  the participant never sees it, and `transcript.md` is what 9.02.2(7) covers.
- No reviewer surface, review model, or sign-off record was added here, and
  the spec's own out-of-scope list says there deliberately is none. The 4.02
  review is course-level against ingested package versions; the thing being
  reviewed does not exist until superCPE has it.
- Two `CLAUDE.md` drift items in the same pass, both listed by the spec: the
  Layout scripts list gains `render.ts`, `registry.ts`, and `text-preview.ts`;
  and "Maintained duplicates" no longer claims every `check-lessons.ts` rule is
  decidable from one lesson's module, which contradicted the Commands section's
  correct statement that duplicate-stem detection is cross-lesson. The same
  false claim sat in `check-lessons.ts`'s own header comment and was corrected
  there too, so the two files now agree.
- `src/course.ts`'s header no longer cites "superCPE feature 004" — `CLAUDE.md`
  forbids citing a superCPE feature number, since they renumber and this repo
  cannot see them — and names `scripts/export.ts` instead. It also no longer
  says flatly that the file is never written by hand: the commands own its
  structure, the human owns each entry's `status`, and `check` warns when the
  two files disagree.

**Known gaps**
- superCPE's `COMPLIANCE.md` still has no row for `meta.status`; from over
  there the flag is invisible. Its 4.01.1 row's parenthetical about the
  developer of record is now the only place either repo explains what the flag
  is. Naming it there would close the loop and is a superCPE edit, deliberately
  not made from here.
- Nothing prevents a developer from flipping `meta.status` to `"checked"`
  without opening the accuracy record. The flag records that a human asserted
  the 4.01.1 check, not that one happened — the same limit every authored
  string in this repo has.
- Acceptance ran against a scratch lesson 99 (`CHK-99`) created with
  `npm run new`, exported twice (refused on status with the new message and
  then on `usingEstimates`, nothing under `dist/` either time), stilled at both
  status values, and removed with `npm run retire -- --lesson 99 --force`;
  `drafts/CHK-99-review.md`, which `retire` correctly leaves behind, was
  deleted by hand. `git status --porcelain` matches what it was before.

## 12 — Correction: entry 06 cited 9.02.1, which is group programs
Shipped: 2026-09-04

**What changed**
- Nothing in behavior. This entry exists because the changelog is append-only
  and entry 06 is not edited.
- Entry 06 cites **9.02.1** for what `npm run retire` preserves and **9.02.1(8)**
  for the transcript of record, and `scripts/retire.ts` printed 9.02.1(8) in its
  checked-but-unexported warning. All of these are wrong in the same way.
  9.02.1 is the required documentation for **group** programs. Self study is
  **9.02.2**, and its element list ends at item **7** — there is no 9.02.2(8).
  `CLAUDE.md` already said this; entry 06 and `retire.ts` did not follow it.
- `scripts/retire.ts`'s warning now says the transcript of record is retained
  by superCPE as program materials under **9.02.2(7)**. `README.md` carried the
  same `9.02.1(8)` citation for the same sentence and was corrected with it.
- `rg '9\.02\.1' src/ scripts/` now returns nothing. The one remaining mention
  in `CLAUDE.md` is the standing note that 9.02.1 is group programs, which is
  the rule, not a citation.

**Standards touched**
- 9.02.1 — required documentation elements for group programs. Not this
  repo's; cited here only to say it was cited wrongly.
- 9.02.2(7) — program materials, the last of the seven required documentation
  elements for self study programs. This is what retains the transcript of
  record, and it is what entry 06 meant.

**Decisions**
- Written as a new entry rather than an edit to entry 06, per `CLAUDE.md`'s
  append-only rule: if something was wrong, say so in a new entry.
- Both paragraphs were read in the 2026 Statement before citing. 9.02.1 opens
  "Required documentation elements for group programs"; 9.02.2 opens "Required
  documentation elements for self study programs" and its list runs 1) through
  7), ending at "Program materials."

**Known gaps**
- Entry 06's prose still reads 9.02.1 and always will. A reader who finds it
  without reaching this entry will take the wrong citation, which is the cost
  of an append-only log.

## 13 — Block audio is identified by content, not by block id
Shipped: 2026-09-05

**What changed**
- New `src/audio-identity.ts`: `parseMarkers`, `hashOf`, `audioHashOf`. One
  hash function, imported by `scripts/generate-audio.ts` (which writes the
  hash), by every lesson module's accessors (which read it back), and by
  `scripts/check-lessons.ts` (which reports on it). Nothing computes it twice.
- The accessors check it. `hasAudio` is true only when an entry exists under
  the block's id **and** its `hash` is the hash of that block's current spoken
  text; `durationOf` and `revealsOf` fall back to `estimatedSeconds` and
  `reveals` on a mismatch exactly as they do on a missing entry.
  `usingEstimates` inherits the fix through `hasAudio` — confirmed by hand: a
  one-word narration edit flipped lesson 01 from `measured` to `estimated`
  with no other change.
- `BlockMeta` gained `voice` and `model`. `generate` records the voice id and
  the model id each block was generated under, and a block whose configuration
  no longer matches misses the cache. The dry-run report names the cause per
  block — `narration changed`, `voice changed: A to B`, `model changed`,
  `generated before the voice and model were recorded`, `mp3 missing`,
  `no audio yet` — and tallies the configuration-caused misses separately, so
  an author can see whether they are about to pay for an edit or for a setting.
- `generate` now requires `ELEVENLABS_VOICE_ID` for a dry run too. The voice is
  part of the cache key; without it the report cannot say hit or miss.
- `check` gained two findings: **ERROR** on an `audio-meta` entry whose hash is
  of different words, naming the block and the `--only` command that fixes it;
  **WARN** on an entry under an id no block carries.
- `npm run new`'s video scaffold emits the corrected accessors. The text
  scaffold emits none — a text lesson has no blocks and no audio-meta at all —
  so there was nothing there to correct and nothing that could carry the defect.
- `README.md`, `CLAUDE.md` and `LESSON-RUNBOOK.md` updated where they describe
  the cache and what editing narration costs.

**Standards touched**
- 9.02.2(2)(ii) — the A/V duration retained as supporting documentation for the
  word count formula. That number is what `durationOf` returns; returning one
  measured against different narration makes the retained documentation wrong,
  and `duration_source: "measured"` an untrue attestation.

**Decisions**
- The mismatch is an **ERROR**, not a WARN. It meets this file's own bar twice
  over: it produces a defective render — the old measured reveals composited
  onto new words, which is a sheet that sits blank — and it reaches a package,
  because it is the one condition under which `duration_source: "measured"` is
  false while `usingEstimates` says otherwise. It is decidable from the
  lesson's own module and its own metadata, so `export` can gate on it.
- An orphaned entry is a **WARN**. Nothing reads it, nothing renders it,
  nothing packages it. It is litter left by a renamed or removed block, not a
  defect, and failing a build over it would train people to ignore the level.
- Voice and model are recorded as their own fields rather than folded into
  `hash`. Folding them in would have made the two kinds of miss
  indistinguishable — and task 2 requires telling them apart — and it would
  have put the voice id inside a value the accessors must recompute, which
  they cannot: the voice lives in `.env` and the lesson modules are compiled
  into a browser bundle. So the *cache key* is the hash together with the
  voice and the model, and the *identity the accessors check* is the hash
  alone. Rejected: a second `configHash` field, which is the same information
  spent twice.
- SHA-256 is implemented in plain TypeScript in `src/audio-identity.ts`
  instead of `node:crypto`. The accessors run in the Remotion bundle, where
  `node:crypto` does not exist and webpack 5 does not polyfill it, and the
  alternative — a different hash on each side — is the defect this feature
  exists to close. The digest is byte-identical to `createHash("sha256")`,
  verified against it on nine vectors and against all fourteen hashes
  committed in `audio-meta-01.json`, so no existing metadata was invalidated
  by the move.
- The spec located the voice id in `scripts/generate-audio.ts`. It is not
  there and never was: `generate` and `export` both read
  `ELEVENLABS_VOICE_ID` from `.env`. Nothing was moved to make the spec true —
  relocating the voice is a configuration decision, and this feature was told
  not to make one. The acceptance run overrode the environment variable for
  one dry run instead, which is the same cache event and leaves `.env` alone.

**Known gaps**
- **This defect shipped.** Block audio was identified by id alone from the
  pipeline's first commit. `BlockMeta.hash` was written by `generate` and read
  by nothing. The condition was reachable by ordinary authoring — renumbering
  the blocks of a lesson under revision — and it was reached: BALLOON-01 was
  rewritten from 8 blocks to 14 with the ids reused, and two renders composited
  the old measured durations and reveal timestamps onto the new sheets while
  `usingEstimates` stayed false, which is the one gate that exists to stop
  estimated timings reaching a package.
- No registered lesson errors on the new check. BALLOON-01's fourteen stored
  hashes all match its current narration; the defective state was rendered, not
  committed.
- Every block of every existing lesson now misses the generate cache, on the
  grounds that its metadata predates the voice and model fields. That is the
  intended consequence and it is not free: BALLOON-01's fourteen blocks would
  be resent, and their audio is current. Whoever knows which voice generated
  them can write `voice` and `model` into `audio-meta-01.json` by hand — it is
  their own record of their own run — and the cache will hit again. The
  tooling will not guess it.
- A voice change is caught by `generate`, not by `render`, `check` or
  `usingEstimates`. The feature's goal statement asks for all four; its "In
  scope" list and its tasks assign the hash to the accessors and the voice to
  the cache, and only the cache can see a value that lives in `.env`. Closing
  the rest means deciding where the voice id belongs, which is a configuration
  decision this feature was told not to make.
- 9.02.2(2)(ii) is cited here on the authority of `CLAUDE.md` and earlier
  entries. `sources/` is empty and the 2026 Statement is not in the repo, so
  the paragraph was not read before citing it, contrary to the changelog rule.
- Deliberately not touched, both still open: the 40–75s sheet window, which is
  wrong for image-heavy lessons and warns on all fourteen of BALLOON-01's
  sheets; and the absence of a first-reveal-too-late check, the symmetric case
  of the last-reveal warning that already exists.

## 14 — Rule 4 becomes coverage, not exclusivity
Shipped: 2026-09-06

**What changed**
- `checkCourseQuestions` no longer errors when two review questions carry the
  same `after_block` or `after_section`. A narrated block or a guide section
  may now carry any number. Both branches lost their `blocksUsed` /
  `sectionsUsed` maps; every other rule-4 refusal is untouched — placement in
  the lesson's own medium, a placement naming a real block or section, and
  assessment questions carrying no placement at all.
- In its place, text lessons get a coverage check: a section whose `role` is
  `body` and that carries no review question is reported as a **WARN**, naming
  the section. `front_matter`, `glossary` and `appendix` are not checked —
  7.02.5 excludes them from the counted words, and they are not material a
  participant re-studies.
- No video counterpart was added. A narrated block is not a chapter.
- The header comment's five-rule list has rule 4 rewritten, including why the
  exclusivity reading came out. Rules 1, 2, 3 and 5 are unchanged, as is the
  paragraph above the list saying these are video-tool's own authoring
  discipline and mirror no superCPE rule.
- `LESSON-RUNBOOK.md` step 5 now states both halves: aim for a review question
  on every body section, and stacking two or three on one section is fine.

**Standards touched**
- 5.01.2.1 — "Review questions or other content reinforcement tools must be
  placed throughout the program in sufficient intervals to allow the
  participant the opportunity to evaluate the material that needs to be
  re-studied." That is a floor on spacing, not a ceiling on density: it
  forbids saving every question for the end and says nothing about a section
  checked twice. A section checked twice serves the stated purpose — letting
  the participant find what needs re-studying — better than one not checked at
  all, which is why the replacement rule looks at the uncovered sections
  rather than the doubled ones.
- 7.02.5 — only `body` words count toward credit, which is what scopes the
  coverage check to `body` sections.

**Decisions**
- Coverage ships as a **WARN**, not an ERROR. An ERROR is a stronger claim
  than 5.01.2.1 supports: the paragraph asks for sufficient intervals across
  the program and prescribes a count per credit, and nowhere requires one
  question per section. A lesson that covers most of its body and leaves one
  section to the assessment is a judgment call, not a defect.
- **The feature document's concrete reason for that does not hold, and the
  decision was kept anyway on the reason above.** It argued from a shipped
  guide with "8 sections and 5 review questions" that a coverage ERROR would
  refuse a lesson superCPE has already ingested. Once the rule is scoped to
  `body` — which the same document specifies — the arithmetic collapses: that
  guide (the ASC 450 contingencies lesson at commit 7ff8908, 8 sections) has
  5 body sections carrying one review question each, plus front matter,
  glossary and appendix, so it warns zero times. Recorded here rather than
  repeated in the code comment, which now says the same thing.
- Removing the exclusivity ERROR does not push the refusal downstream.
  `scripts/validate-package.ts`, this repo's copy of superCPE's `packages.py`,
  requires only that a review question's `after_section` name a section in the
  manifest; it has no distinctness rule. Confirmed by exporting a package with
  two review questions on one section — `export` runs `validatePackage` before
  zipping, and it passed.
- Rejected: also correcting `LESSON-RUNBOOK.md`'s "review … At least 2
  choices", which contradicts rule 3's minimum of 3. It is a real defect in
  the prose and it will produce an ERROR for anyone who follows it, but it is
  a statement of rule 3, and this feature was scoped to change no other rule.
  Reported rather than fixed.

**Known gaps**
- `ASC842-GDE`, the lesson the feature document's verification step names,
  does not exist in this repo — not in the working tree, not in `CHANGELOG.md`,
  not anywhere in git history. The verification that "`ASC842-GDE` still
  exports and its word counts and credit estimate are unchanged" could
  therefore not be run. The nearest real artifact is the ASC 450 guide
  described above, which is not in the tree either; the reset at 102bc1f
  removed it, and the registry is currently empty.
- Because the registry is empty, `npm run check` passes vacuously — 0 lessons.
  The behavior change was verified on a scratch text lesson (SCRATCH-99, 2
  body sections, 2 review questions stacked on `sec-01`, `sec-02` uncovered),
  which showed no error for the stacking, one WARN for the uncovered section,
  and a successful `npm run export` with that WARN standing. The scratch
  lesson was then retired.
- 5.01.2.1 was **not read in the 2026 Statement before being cited here.**
  `sources/` is empty and the Statement is not in the repo. The quotation
  above is the feature document's, and the citation rests on it and on the
  existing code comments — the same gap entry 13 recorded. The changelog rule
  says to read the paragraph first; it was not met.

## 15 — SEC-01 body prose, drafted from `sources/sec/`
Shipped: 2026-09-06

**What changed**
- All eleven `body` sections of SEC-01 written from `sources/sec/`: 7,582
  counted words against a 6,615 budget, every section over its own budget on
  source material alone. No section was padded.
- `00-front-matter.md` gained its scope-and-audience paragraph; the "How this
  course works" block was already the `docs/course-package.md` template.
  `90-glossary.md` and `91-appendix-a.md` written. All fourteen section files
  are now non-blank.
- Ten `meta.glossaryTerms` checked against 800-63B-4 Appendix D and six
  corrected in both `src/lesson-01.ts` and `90-glossary.md`. The one that
  mattered: **Passkey** claimed "the private key never leaves the
  authenticator," which is false for syncable authenticators — 800-63B-4
  §3.2.13 and Appendix B treat their keys as inherently exportable. Also
  corrected Authenticator (had the claimant possessing it, not the
  subscriber), MFA, Relying party, Session cookie, and Verifier impersonation
  resistance, which is the superseded name for phishing resistance and now
  says so.
- `drafts/SEC-01-review.md` written as the 4.01.1 accuracy record: per-section
  sources by paragraph and technique id, 41 `UNSOURCED` flags, and a
  ten-item `## Still needs judgment` list.
- **`sources/sec/CISA-Phishing-Guidance-Stopping-the-Attack-Cycle.pdf` was
  replaced.** The committed file was 475 bytes of Akamai "Access Denied"
  HTML saved under a `.pdf` name — a download that had returned 403 and was
  never checked. It is the source `INDEX.md` assigns to sections 02, 10 and
  11. The real document (872,842 bytes, sha256 `4ab4fdd2…5597f8`) was
  retrieved and every citation to it is against that.

**Standards touched**
- 3.01 — learning activities must be based on relevant learning objectives
  that clearly articulate the professional competence participants should
  achieve; each body section names the objective it serves.
- 4.01 — courses not subject to frequent change must be reviewed and revised,
  as necessary, at least every two years; the appendix records what to
  re-check at that review.
- 4.01.1 — where technology is used in developing a program, the content
  developer is responsible for reviewing the content for accuracy; this prose
  was drafted by a language model, and `drafts/SEC-01-review.md` is where that
  review is recorded.
- 4.05.3 — instructional materials must include, at a minimum, an overview of
  topics, the ability to find information quickly, the definition of key
  terms, navigation instructions, review questions with feedback, and a
  qualified assessment; this feature delivers the overview, the key terms and
  the navigation instructions.
- 7.02.5 — the word count excludes material not critical to the stated
  objectives, naming course introduction, instructions to the participant,
  biographies, table of contents, glossary, and appendixes of supplementary
  reference material; roles were assigned on that basis and nothing excluded
  was placed in a `body` section.

**Decisions**
- The review document records *claims* and their sources per section, quoting
  verbatim only flagged sentences, rather than reproducing all 7,582 words the
  way the ASC842 records reproduced narration. Narration is not otherwise
  readable as prose; a study guide is.
- `sources/sec/INDEX.md` was **not** edited, though its URL for the CISA
  phishing guidance is dead and its promised CISA `.txt` extractions do not
  exist. It is the human's authority on source standing; both are raised as
  J1 and J2 instead.
- Section 03 states in the participant-facing text that CISA's SMB password
  advice (composition rules, prohibiting recycling) is superseded by
  800-63B-4 §3.1.1.2 items 5 and 6. Rejected: writing the section as if the
  two agreed, or omitting the conflict. `INDEX.md`'s precedence rule decides
  it, and CPAs will meet the older advice in checklists. Raised as J4.
- Section 04 was written at the level MITRE ATT&CK T1555 and T1539 support,
  and says so in its own text, rather than sourcing a vendor technical
  analysis of infostealer artifacts. Rejected: describing browser credential
  store internals from working knowledge.
- Section 08 distinguishes CISA's number matching (the user *types* a value —
  a transfer 800-63B-4 §3.1.3 permits) from the compare-and-approve method
  §3.1.3 now disallows. Getting this backwards would produce the false
  statement "NIST bans number matching." Raised as J5.
- WebAuthn §1's introduction was cited for origin scoping, where `INDEX.md`
  says §1.2 and §1.3 only. It is mechanism rather than API surface and it is
  the only place the specification states the property plainly, but it is
  outside the letter of the instruction. Raised as J6 rather than glossed.
- `src/course.ts` was left alone. Its three `TODO:` descriptor fields were
  not in this feature's task list. Raised as J3.

**Known gaps**
- `UNSOURCED` flags by section: sec-00 1; sec-01 3; sec-02 5; sec-03 3;
  sec-04 3; sec-05 2; sec-06 2; sec-07 4; sec-08 4; sec-09 2; sec-10 5;
  sec-11 5; sec-90 2. Total 41, of which 38 are in `body` sections.
- Of `INDEX.md`'s "Not yet sourced" list: **infostealer artifact behaviour
  (section 04) is still unsourced** — the section states its own limit;
  **real-time proxy phishing as a deployed technique (section 07) is
  substantially closed** by the retrieved joint guidance, which lists the
  credential-plus-code relay among techniques actors use, but automated proxy
  toolkits remain unsourced and are not claimed; **detection indicators
  (section 10) are partly closed** by 800-63B-4 §4.6, §4.3 and §5.3 and by
  CISA's alerting and audit-trail advice, but mail rules created without the
  user and user-visible active-session lists remain unsourced and are named
  as unsourced in the guide text. No statistic or prevalence claim was
  written.
- The response ordering in section 11 — revoke, then change, then re-enrol —
  is the author's synthesis. Its mechanism is sourced; the sequence is not,
  and lo-6 is assessed on it. J8.
- The lesson is unchecked. `meta.status` is `"draft"` and nothing in this
  feature touched it. `npm run check` reports the expected six rule-1 ERRORs
  (no assessment question for any objective) and eleven rule-4 WARNs (no
  review question on any body section), plus the `[draft]` status WARN, and
  exits 1. Questions are feature 16.
- No clips exist. `meta.media` is absent, so the ~30 minutes of A/V in the
  course's 3.0-credit arithmetic is not yet earned, and no
  `avIsAdditionalLearning` attestation has been made.

## 16 — SEC-01 flag triage checklist
Shipped: 2026-09-09

**What changed**
- `drafts/SEC-01-flag-triage.md` added: all 41 `UNSOURCED` flags from
  `drafts/SEC-01-review.md` re-presented as one checkbox list, grouped by the
  class the review document already assigned, ordered by section id within
  each group, each entry carrying the verbatim guide sentence, the one-line
  ask, and the file path to open.
- Nothing else changed. No flag was resolved, no guide text was touched, no
  source was searched for, no question was written, and `meta.status` is
  still `"draft"`. The feature creates exactly one file.
- Every flagged sentence was taken from `guide/01/*.md` rather than from the
  review document's rendering of it, and all 40 quoted entries were
  machine-checked against the file they name. Spot-checked by hand across
  five sections: sec-02 "A connection indicator tells you the connection is
  protected…", sec-04 "A password in a browser store is software-readable by
  design…", sec-06 "A bearer token authorises whoever bears it…", sec-09
  "There is nothing for the user to get wrong…", sec-11 "Revoke, then change,
  then re-enrol."
- Per-section counts reconcile with entry 15 exactly: sec-00 1, sec-01 3,
  sec-02 5, sec-03 3, sec-04 3, sec-05 2, sec-06 2, sec-07 4, sec-08 4,
  sec-09 2, sec-10 5, sec-11 5, sec-90 2 — total 41. No number was adjusted
  on either side to make them agree.

**Standards touched**
- 4.01.1 — learning activities must be developed by subject matter experts,
  and if technology is used in the development of the program, the content
  developer is responsible for reviewing the content for accuracy; this
  checklist is a working aid for that review and not the record of it.

**Decisions**
- Three flags carry classes the feature's triage table has no row for:
  `analogy` (sec-01), `judgment` (sec-02), `elaboration` (sec-07). They are
  grouped separately with no default assigned. Rejected: mapping them onto a
  neighbouring row — the feature required the class be taken from the review
  document and the default be applied mechanically, and inventing a mapping
  is the judgment the file is forbidden to make.
- The sec-07 flag reserving the automated-proxy-toolkit claim is recorded as
  `NO SENTENCE`, not `TEXT NOT FOUND`. The guide deliberately does not make
  the claim, so there is no text that failed to be located.
- Where `drafts/SEC-01-review.md` renders a flag as a sentence ending in a
  full stop the guide does not have, the checklist quotes the guide's full
  sentence and the reconciliation report names the three cases. Rejected:
  editing the review document, which is out of scope and is the record.
- Group ordering was left as the feature specified even though Confirm-fast
  turned out to be the smallest group rather than the majority.

**Known gaps**
- Confirm-fast is 8 flags, not the ~21 the feature anticipated. The real
  shape is Confirm the inference 18, Needs a decision 12, Confirm-fast 8,
  unmapped 3. The sitting is 30 flags of substantive reasoning; the
  momentum-first ordering does not change that and the report says so.
- The three unmapped classes still need a default before the file can be
  worked straight down the left margin.
- Six of the ten judgment items (J1, J2, J3, J6, J9, J10) are not in this
  file, per the feature's instruction. They remain open in
  `drafts/SEC-01-review.md`.
- Nothing here advances the lesson toward `"checked"`. The 4.01.1 review is
  still entirely ahead of the content developer, and SEC-01 still carries no
  questions — six rule-1 ERRORs, eleven rule-4 WARNs and the `[draft]` WARN,
  unchanged by this feature.

## 17 — ATO-01 review questions, and the seventh assessment question
Shipped: 2026-09-09

**What changed**
- `src/questions-01.json` goes from 6 questions to **12**: five review
  questions (q-07 … q-11) placed by `after_section` on sec-01, sec-05,
  sec-06, sec-08 and sec-09, and a seventh assessment question (q-12) on
  lo-1. The six existing assessment questions were not touched.
- `drafts/SEC-01-review.md` gains an addendum recording, per question, the
  source file and the section or paragraph behind it, the objective tested,
  and the flag it inherits — none inherits one. **No new `UNSOURCED` flag was
  created.** J11 was added to `## Still needs judgment`; J1–J10 are unchanged
  and unrenumbered.
- The review document's `## Questions` section was stale — it said
  `src/questions-01.json` was `[]`, that questions were a later feature, and
  that `check` reported six rule-1 ERRORs and eleven rule-4 WARNs. Six
  assessment questions had shipped since. It is corrected in place and the
  old text is quoted in the correction rather than silently dropped.
- `npm run export -- --lesson 01` produced `dist/ATO-01.zip` — text package,
  14 sections, 0 clips, 12 questions, new `content_hash`
  `082c1a94…` (it was `64655c49…`), so it re-ingests as a new version of the
  package already on production rather than as a new package.
- Nothing else. No guide prose was edited, no source was re-read for the body
  sections, no clip was added, no duration was typed or asserted,
  `meta.status` was not touched, and `meta.courseCode` was not touched.

**Standards touched**
- 5.01.2.1 — review questions must be placed throughout the program in
  sufficient intervals so the participant can evaluate what needs re-studying;
  at least three with scored responses per CPE credit, and after the first
  full credit the chart governs the additions, where an additional 0.2
  requires 0. So 1.2 credit requires 3.
- 6.01.2 — at least five questions and scored responses per CPE credit on the
  qualified assessment, and after the first full credit the chart governs,
  where an additional 0.2 requires 2. So 1.2 credit requires 7. The same
  paragraph forbids duplicate review and qualified assessment questions
  except in courses where recall of information is the learning strategy —
  this is not such a course — and requires the assessment to measure a
  representative number of the objectives, being 75 percent or more.
- 7.01 — self study credit is awarded in one-fifth increments once the first
  full credit is earned (1.0, x.2, x.4, x.5, x.6, x.8), and a sponsor may
  round down but not up to the nearest increment. That is what turns 1.2864
  into 1.2.
- 4.01.1 — the content developer is responsible for reviewing generated
  content for accuracy. `drafts/SEC-01-review.md` is where that check is
  recorded, and the addendum puts the twelve questions inside its scope.

**Decisions**
- **The seventh assessment question was added for credit, not for coverage.**
  6.01.2's representative-number test is 75 percent of the learning
  objectives, and q-01 … q-06 already measure six of six — 100 percent, so
  coverage needed nothing. q-12 exists because 9 questions leave the course
  at 1.156 → 1.0 and 10 carry it to 1.2. The changelog says so plainly
  because the coverage reading would be false.
- **Zero-slack: the author chose option 2 — ship above the floor.** Twelve
  questions, not the floor of ten: two spare review questions on sec-05 and
  sec-06. At 1.2 the band runs from 10 questions (60.62) to 15 (70.87), so
  the two spares mean the 4.01.1 pass can cut two questions before the course
  falls back to 1.0 and the seventh assessment question is spent for nothing.
  Rejected: option 1 (ship 10, cheapest, zero cushion below the floor) and
  option 3 (ship 10 and record the fragility).
- **`revision` stays `"A"` and `revisionDate` stays `2026-09-06`,** on the
  author's decision that moving computed credit 1.0 → 1.2 is not a
  significant revision under 4.01. `src/lesson-01.ts` is therefore untouched
  by this feature. Whether a significant revision would have triggered
  anything under 4.02 is superCPE's question, not this repo's.
- **q-12 was placed on lo-1, resting wholly on sec-03.** The feature document
  guessed lo-1 as the objective whose sections carry the most sourced
  material and the fewest bare flags. lo-1 is right but not for that reason:
  on the flag triage's own numbers lo-4 carries fewer bare flags (2, both in
  sec-07) than lo-1 (3, in sec-02 and sec-04). What decides it is that lo-1's
  bare flags are confined to two sections, leaving sec-01, sec-03 and sec-05
  clean, and that sec-03 carried no review question — so the assessment
  question spreads the exposure instead of stacking a third question on the
  sections the review questions already use. Rejected: lo-4, whose clean
  material is exactly what q-10 and q-11 consume.
- **Sections were chosen on flag load first, overlap second.** sec-02,
  sec-04, sec-07, sec-10 and sec-11 were passed over because each carries a
  bare `UNSOURCED` flag on the claim a question would have had to rest on —
  sec-04's browser-store mechanism, sec-10's mail-rule and active-session
  indicators, sec-11's "revoke, then change, then re-enrol" ordering. In the
  sec-09..sec-11 band sec-09 was the only section without one. Writing a
  question on any of them would have inherited the flag, which is the ASC842
  failure the sourcing discipline exists to prevent.
- **All twelve stems were compared by hand before running `check`,** not only
  under rule 2's normalization. The two closest pairs are q-05/q-12 (both
  touch §3.1.1.2, but item 6 as a distractor versus item 5 as the answer) and
  q-03/q-09 (both concern a stolen session, but the mechanism versus §5.2's
  timeouts). Both are recorded in the addendum with why they are far enough
  apart in substance, which is the test 6.01.2 sets — normalized-distinct is
  the floor, not the target.
- **The package code in the feature document was stale and was not
  "corrected" here.** The document says `src/lesson-01.ts` carries
  `courseCode: "SEC-01"`; the working tree carries `"ATO-01"`, from an
  uncommitted rename that also renamed `COURSE_SEC` to `COURSE_ATO`, and
  `dist/` already held an ATO-01 package. The author confirmed production
  holds ATO-01, so the export re-ingests as a new version. Nothing in this
  feature changed `meta.courseCode` in either direction.

**Known gaps**
- **Two questions of cushion, and that is all.** Option 2 buys slack against
  the 4.01.1 pass cutting a question, not against it cutting three. If the
  developer's review removes three of the twelve, the course drops to 1.0,
  where it needs 3 review and 5 assessment questions and where q-12 was
  bought for nothing. Nothing in the tooling warns about this — `check`
  prints an estimate and says superCPE's computation is authoritative.
- **The rule-4 coverage WARN count is 6, not the 8 the feature document
  expected.** That is arithmetic, not drift: 11 body sections less 3 review
  questions is 8, less 5 is 6. The six are sec-02, sec-03, sec-04, sec-07,
  sec-10 and sec-11. They are correct and expected, and no review question
  was added to reduce them — the two spares were added for credit slack and
  went to sec-05 and sec-06 on their flag load, not on their WARN.
- **The review document's `## Questions` section was found stale and
  corrected,** as recorded above. Anything else in that document written
  before the six assessment questions shipped may be stale in the same way;
  only this section was checked.
- **`drafts/SEC-01-review.md` and `drafts/SEC-01-flag-triage.md` still carry
  the old code in their filenames,** while `src/lesson-01.ts` now points at
  `drafts/ATO-01-review.md`, which does not exist. The rename was the
  author's and outside this feature's scope, so nothing was renamed; the
  addendum states which file is the accuracy record.
- **Two sentences of the Statement were not fully legible.** The 2026
  Statement was read directly, but this machine has no PDF text tooling and
  the throwaway extractor drops runs in one of the document's fonts. In
  5.01.2.1 the subject of "… do not count toward the number of required
  review questions per CPE credit" was lost, and in 6.01.2 the forced-choice
  sentence reads "Forced choice responses such a[s] … assessment." The
  three-choice floor in `check-lessons.ts` rule 3 rests on the repo's earlier
  reading of those clauses, not on this one; every question shipped here has
  four choices, so nothing turns on it today. J2 in the review document
  already asks for committed `.txt` extractions of the source PDFs; the same
  argument now applies to the Statement.
- **The course still has no clips.** `meta.media` is absent and the manifest
  carries 0 seconds of A/V, so the ~30 minutes of audiovisual material in the
  3.0-credit arithmetic `current-feature-011.md` planned remains unearned and
  no `avIsAdditionalLearning` attestation has been made. **This is a
  1.2-credit course, not the 3.0 that document planned.**
- **The 4.01.1 review is still ahead of the content developer.** `meta.status`
  is `"checked"` and was not touched, but 41 `UNSOURCED` flags and now eleven
  judgment items (J1–J11) remain open in `drafts/SEC-01-review.md`. Nothing
  in this repo evidences the 4.02 independent content review, which is
  superCPE's.

## 18 — The q-12 citation, checked against the source, and the ATO-01 rename
Shipped: 2026-09-09

**What changed**
- **Nothing the package ships changed.** `dist/ATO-01.zip` was not rebuilt,
  `src/questions-01.json` was not edited, no question text moved,
  `meta.courseCode` and `meta.status` were not touched, and no guide file
  under `guide/01/` was opened for editing. `content_hash` is unchanged.
- `drafts/SEC-01-review.md` → `drafts/ATO-01-review.md` and
  `drafts/SEC-01-flag-triage.md` → `drafts/ATO-01-flag-triage.md`, by
  `git mv`, so history is preserved. `src/lesson-01.ts`'s doc comment already
  pointed at `drafts/ATO-01-review.md` and was a dangling reference until
  this commit; it now resolves.
- Remaining `SEC-01` references rewritten in `drafts/ATO-01-review.md`,
  `drafts/ATO-01-flag-triage.md` (titles and cross-references) and
  `sources/sec/INDEX.md` (four: the authority line, the sentence naming the
  accuracy record, the `UNSOURCED`-flag destination, and the note on the
  other 800-63-4 volumes). Nothing else in `INDEX.md` was touched — its dead
  CISA URL and its promised CISA `.txt` extractions are still J1 and J2, and
  neither was closed.
- CHANGELOG entries 15, 16 and 17 keep their `SEC-01` references. They
  describe what was true when they shipped and are the record.
- `drafts/ATO-01-review.md` gains **"q-12's citation, checked against the
  source"** in the question addendum, and its closing rename note is
  corrected in place with the superseded paragraph quoted rather than
  dropped.
- The uncommitted rename that entry 17 recorded as working-tree state is
  committed here, so the shipped package's identity no longer depends on it.

**Standards touched**
- 9.02.2(2)(ii) — the word count formula's supporting documentation must be
  retained; the accuracy record and its flag triage are that documentation
  and now carry the code the package ships under, with git history intact
  rather than deleted and recreated.
- 5.01.2.1 — review questions must be placed throughout the program at
  sufficient intervals, at least three with scored responses per CPE credit;
  "'True or false' questions do not count toward the number of required
  review questions per CPE credit."
- 6.01.2 — at least five questions and scored responses per CPE credit on the
  qualified assessment; "Forced choice responses such as 'True or false' or
  'yes or no' questions are not permissible on the qualified assessment."
- 4.01.1 — the content developer reviews content developed with technology
  for accuracy; `drafts/ATO-01-review.md` is where that check is recorded,
  and the citation check above is inside its scope.

**Decisions**
- **The premise of task 1 did not survive contact with the records: no record
  was wrong, and there is no summary table.** `CHANGELOG.md` contains no
  markdown table at any point in its history — entry 17 included — so nothing
  in it puts q-12 on §3.1.1.1 alone. Every record that cites q-12 already
  cites both paragraphs and cites them correctly: the review addendum,
  `src/questions-01.json`'s `_source`, q-12's own feedback, and
  `guide/01/03-credential-stuffing.md`. Nothing was corrected, because
  correcting a record that agrees with the source would have introduced the
  error the task was written to remove.
- **The source states the prohibition twice, in two paragraphs addressed to
  two different things, so a single section number is incomplete rather than
  wrong.** §3.1.1.1 (Password Authenticators), on what may be demanded when
  the subscriber chooses a password: "Other composition requirements for
  passwords SHALL NOT be imposed." §3.1.1.2 (Password Verifiers) item 5, on
  what a verifier may impose: "Verifiers and CSPs SHALL NOT impose other
  composition rules (e.g., requiring mixtures of different character types)
  for passwords."
- **The prohibition and q-12's answer are not the same paragraph, and the
  addendum now says so.** q-12's correct choice (c) — "verifiers shall not
  impose composition rules" — carries §3.1.1.2 item 5's wording and rests
  there. §3.1.1.1 states the same rule in the CSP's voice, which is what
  makes the feedback's "states it twice" true. Distractor (d) rests on
  §3.1.1.2 item 1, the 15/8-character split, which is a length rule and not a
  composition rule.
- **§3.1.1.2 item 6 was never a q-12 citation.** It is periodic change:
  "Verifiers and CSPs SHALL NOT require subscribers to change passwords
  periodically. However, verifiers SHALL force a change if there is evidence
  that the authenticator has been compromised." Where this document's entry
  15, the sec-03 record and the flag triage pair "items 5 and 6," they are
  naming the two points on which CISA-PHISH's SMB advice is superseded —
  composition rules and recycling — not two grounds for one question. Read
  that way the records never disagreed.
- **`src/questions-01.json` was left with a stale path rather than made
  consistent.** q-07's `_source` still says `drafts/SEC-01-review.md`. That
  file is inside the exported package, so the edit would change
  `content_hash` and re-ingest the course — which this feature forbids and
  which is not worth spending on a prose reference. Reported as a gap below.
  Rejected: editing it, and rejected: renaming the drafts back to match it.
- **`sources/sec/INDEX.md` was edited, narrowly.** Entry 15 records that it
  was deliberately left alone as the human's authority on source standing.
  That decision was about its content — which sources are authoritative, and
  its dead URL — not about a path that a rename in this repo turned dangling.
  Only the four `SEC-01` strings were rewritten.

**Known gaps**
- **The 2026 Statement extraction gap from entry 17 is closed, but not the
  way the feature document described it.** The document said the Statement is
  a zip of per-page text read by `unzip`; it is not. `docs/standards/`
  holds a genuine 31-page PDF and, beside it, a committed
  `2026-Statement.txt` extraction, and both sentences entry 17 lost read
  cleanly out of the `.txt`: 5.01.2.1's excluded subject is "'True or false'
  questions," and 6.01.2 prohibits forced choice responses "such as 'True or
  false' or 'yes or no' questions" on the qualified assessment outright.
  Neither mandates a three-choice floor, so `check-lessons.ts` rule 3 needs
  no change, and its comment — review questions get 3 because a two-choice
  review question is a true/false question that would not count — is now
  confirmed against the source rather than resting on an earlier reading.
- **q-07's `_source` inside the package still names
  `drafts/SEC-01-review.md`.** It is the one surviving `SEC-01` reference
  outside CHANGELOG entries 15–17, and it is a dangling path in a shipped
  file. Fixing it means a new `content_hash` and a re-ingest, so it waits for
  the next feature that rebuilds the package for a reason of its own.
- **CHANGELOG entries 15–17 read as if the course were SEC-01.** They are not
  rewritten. A reader who greps for the accuracy record from entry 15 will
  find a filename that no longer exists; the rename is recorded here.
- **`drafts/ATO-01-flag-triage.md` still says `meta.status` stays `"draft"`
  until the checklist is worked through.** `meta.status` has been `"checked"`
  since before this feature and was not touched. The sentence was stale
  before the rename and is stale after it; it was outside this feature's task
  list and only the review document's own rename note was corrected.
- **Nothing about the 4.01.1 review moved.** 41 `UNSOURCED` flags and eleven
  judgment items (J1–J11) remain open, none was resolved, reclassified or
  closed, and the course still has no clips. The 4.02 independent content
  review is superCPE's and nothing here evidences it.

## 19 — ATO-02: a case-study video lesson for course ATO
Shipped: 2026-09-10

**What changed**
- New video lesson `02`, package id `ATO-02`, "Anatomy of a Takeover: One
  Incident, Start to Finish", scaffolded with `npm run new -- --lesson 02
  --code ATO-02 --course-code ATO`, which placed it at position 2 of
  `COURSE_ATO`. Course `ATO` now holds a text lesson and a video lesson.
- 14 blocks: one Title sheet and 13 narrated, 1,503 narrated words. Slide
  types are Statement, Facts, List and Compare only — no Image, no bespoke
  component. Every block's `estimatedSeconds` falls inside the 40–75 s sheet
  window (48–58 s), so `check` reports no pacing warning.
- Two learning objectives, `lo-7` and `lo-8`, continuing past ATO-01's
  `lo-6`. Both are about applying the guide to an incident rather than
  restating it.
- `src/questions-02.json`: `q-13`..`q-16` — two review questions placed by
  `after_block` (6 and 11) and two assessment questions with no placement,
  one per objective, four choices each, none of them forced choice.
- `drafts/ATO-02-review.md` (1,097 lines): the beat-by-beat source map,
  written before any narration was drafted; per-block narration, reveal
  targets, sources with locators and flags; a per-block "what this block
  adds beyond the guide" line; the overlap report; and a six-item judgment
  list, J1–J6, all open.

**Task 0 answers, as `current-feature.md` asks**
1. **Lesson number 02** — the only registered id was `01`.
   `drafts/ATO-02-review.md` did not exist before this feature.
2. **Measured pace: none available; 130 wpm used.** There is no
   `src/audio-meta-*.json` in the tree at all and `public/audio/` is empty,
   so no block matches the current `ELEVENLABS_VOICE_ID` and the documented
   130 wpm default governs. For the record, the only measured audio this
   repo has ever held — the retired BALLOON-01 lesson, at commit `27be399^`
   — ran **165.5 wpm** over 824 words and 298.8 s. It does not qualify under
   the feature's own test: those entries predate the `voice`/`model` fields
   entirely, and `generate` treats an absent voice as a cache miss, which is
   the same rule applied here. It is reported because it is the only
   evidence of how this pipeline's TTS actually paces, and it is the reason
   for the sizing decision below.
3. **`after_block` counts narrated blocks only, 1-based; the Title block
   does not count.** `scripts/export.ts` builds both `video.blocks` and
   `video.narration_blocks` from `lesson.blocks.filter(b =>
   b.narration.trim().length > 0)`, and `scripts/validate-package.ts`
   range-checks `after_block` against `narration_blocks` as `[1,
   narration_blocks]`. `check-lessons.ts` uses the same filter. So block 1
   of the review record is `after_block: 1`, and the valid range here is
   1..13.

**Standards touched**
- **7.02.7** — A/V duration counts toward the word count formula only if the
  segments constitute additional learning for the participant, that is, not
  narration of the text. `meta.avIsAdditionalLearning` is `true`; the
  per-block case for that claim is in the accuracy record and is J4, open.
- **7.01** — Program length is measured by actual program length, 50 minutes
  to one CPE credit. The script was not padded to reach a runtime; where the
  incident had no sourced material it kept none.
- **5.01.2.1** — Review questions must be placed throughout the program in
  sufficient intervals, at least three with scored responses per CPE credit,
  and true/false questions do not count toward that number. At 1.6 credits
  the chart gives 5 (3 for the first credit, 2 for the 0.6). The course now
  carries 7, placed at blocks 6 and 11 here and across five sections in
  ATO-01.
- **5.01.2.2** — Feedback must be provided on review questions. Each of the
  four new questions names the right answer, the misunderstanding behind
  each distractor, and the sheet to re-watch.
- **6.01.2** — At least 5 qualified assessment questions per CPE credit; at
  1.6 the chart gives 9 (5 + 4). ATO-01 had 7, this lesson adds 2, so the
  course is at 9 exactly. Forced-choice responses are not permissible on the
  qualified assessment; none of the four is forced choice. Duplicate review
  and assessment questions are not allowed; no stem here duplicates an
  ATO-01 stem, and `check`'s rule 2 tests the same thing course-wide.
- **4.01.1** — Where technology is used in developing a program, the content
  developer is responsible for reviewing the content for accuracy.
  `meta.status` stays `"draft"` and `drafts/ATO-02-review.md` is where that
  check gets recorded. Nothing in this feature set the flag.
- **9.02.2(2)(ii)** — Supporting documentation for the data used in the word
  count formula. The accuracy record carries the source map and the flags
  behind every number this lesson will contribute.

**Decisions**
- **Sized at 1,503 words rather than the 1,300 that 600 s at 130 wpm
  implies.** The feature asks for about 600 s of projected runtime at the
  Task 0.2 pace, with 497 s the floor for 1.6 credits. At 130 wpm, 1,503
  words projects to **694 s**. At the 165.5 wpm this repo has actually
  measured, the same script is **545 s**. Sizing to exactly 600 s at 130 wpm
  would have projected to 471 s at the measured rate — under the floor. The
  larger number is the one that clears 497 s under both assumptions, and
  every added word carries incident material rather than padding (7.01). The
  spread between the two projections is J5, and it is a decision to take
  after `generate` against a measured number, not now.
- **The incident is composed, and unnamed where it can be.** No firm name,
  no product name, no surnames — only "Ruth", "Dev", "the mail provider",
  "the document store", "the sign-on service". A composed firm name was
  rejected because it creates an entity that can collide with a real one and
  the incident does not need one.
- **The video shows what the guide explains; the two never state the same
  thing in the same words.** Zero runs of 8 or more consecutive words are
  shared between the narration and any file in `guide/01/`. One 8-word run
  existed in the first draft of block 10 and the narration was rewritten to
  break it. Two 6-word runs survive deliberately: "one level below the
  public suffix" and "and activity resets the inactivity clock", both NIST's
  own phrasing of a defined requirement, where paraphrase would cost
  accuracy.
- **The three strongest additions beyond the guide, which are what
  `avIsAdditionalLearning` rests on.** Block 8 shows an attacker binding an
  authenticator to the account — the persistence step the guide's response
  section removes but never shows created. Block 10 shows a correct,
  on-time, standards-compliant account notification arriving in the mailbox
  the attacker is reading, which is what 63B-4 §4.6's two-address
  requirement is for. Block 6 freezes a completed takeover in which the
  password is still secret and MFA has just worked correctly.
- **Flag classes.** Only `illustration`, `framing`, `boundary only`,
  `descriptive`, `interpretive` and bare `UNSOURCED` are used.  `analogy`,
  `elaboration` and `judgment` are not used anywhere in this record, per
  `current-feature.md`.
- **Nothing was added to `sources/`.** The two CISA PDFs were read by
  extracting their text with a throwaway script in the session scratchpad,
  because `INDEX.md` names `.txt` extractions for both and neither exists on
  disk — the same finding ATO-01's record carries as its J2. No file under
  `sources/` was created, moved or modified, and the extraction is not
  committed.
- **Not run:** `npm run generate` without `--dry-run`, `render`, `export`,
  `npm run dev`. The feature authors the lesson and stops.

**Verification**
- `npm run typecheck` — clean.
- `npm run check` — **0 errors, 7 warnings.** ATO-01's findings are
  unchanged: 6 warnings before this feature and 6 after, the same
  `sec-02`, `sec-03`, `sec-04`, `sec-07`, `sec-10` and `sec-11`
  "body section carries no review question" warnings, and 0 errors either
  way. ATO-02 contributes exactly one warning, `meta` / `status is "draft"`,
  which is the 4.01.1 gate doing its job and is required to be there: the
  feature is forbidden to set the flag. No block-level finding of any kind
  fired on the new lesson.
- `npm run generate -- --lesson 02 --dry-run` — all 13 narrated blocks
  listed "no audio yet", nothing sent and nothing written. **8,465
  characters** across the 13 blocks (601–740 per block).
- Projected runtime: **694 s at 130 wpm** (the Task 0.2 pace), **545 s at
  the 165.5 wpm measured on the retired lesson**. Both clear the 497 s the
  course needs. The rendered file will be about 8 s longer than either,
  because the Title sheet is a fixed 8 s render constant that ffprobe will
  measure into `video.duration_seconds`.
- Course credit estimate, labelled as an estimate — superCPE computes the
  real one and rounds once, at course level:
  `(64.322 + 11.562 + 7.4) ÷ 50 ≈ 1.67` at 130 wpm, and
  `(64.322 + 9.082 + 7.4) ÷ 50 ≈ 1.62` at 165.5 wpm.

**Known gaps**
- **`meta.status` is `"draft"` and the six judgment items J1–J6 are all
  open.** Nothing in this feature resolved a flag or set a status, and it
  was not permitted to. Until Dane closes them, `export` refuses the lesson.
- **J1 is the one to read first.** Three `interpretive` sentences carry more
  weight than the rest: block 10's "a warning delivered to the wrong reader"
  (which q-14 is built on), block 2's claim that a registered lookalike
  domain passes its own DMARC, and block 5's bearer-token gloss. Each
  follows from a sourced mechanism; none is a sentence any source in
  `sources/sec/` writes.
- **J5: the runtime is a projection with a 149-second spread.** 694 s at the
  documented 130 wpm, 545 s at the only rate this repo has measured. If the
  real render comes in under 497 s the course lands at 1.4, not 1.6. The
  answer is a decision after `generate`, not more words now.
- **J2 is inherited and now affects two lessons.** `sources/sec/INDEX.md`
  still names `.txt` extractions beside both CISA PDFs and neither exists,
  so every CISA citation in ATO-01 and ATO-02 rests on an extraction nobody
  reading the records can reproduce. This feature could not fix it:
  `CLAUDE.md` allows adding to `sources/` only when `current-feature.md`
  says so, and it does not.
- **J3: block 13 cites WebAuthn §1 Introduction, where `INDEX.md` scopes use
  to §1.2 and §1.3.** It is the sentence those sections elaborate and the one
  `guide/01/09-phishing-resistant.md` already uses; no API surface is cited.
  Confirm the scope or move the citation to §1.3.
- **ATO-01's six review-coverage warnings are untouched.** They name
  `sec-02`, `sec-03`, `sec-04`, `sec-07`, `sec-10` and `sec-11`, they
  predate this feature, and editing `guide/01/` or
  `src/questions-01.json` was out of scope.
- **Nothing has been rendered or voiced.** `usingEstimates` is true, every
  duration in the module is an estimate, and no estimate may reach a credit
  calculation (7.02.7). The measured numbers arrive with `generate` and
  `render`, both of which are Dane's.

## 20 — ATO-02 narration pass: J1, J3, J4 and two consistency fixes
Shipped: 2026-09-11

**What changed**
- Applied Dane's rulings of 2026-09-11 on ATO-02's judgment list. Text only:
  no audio was generated, nothing was rendered, nothing was exported, and
  `meta.status` is still `"draft"`.
- **J4** — `meta.avIsAdditionalLearning` stays `true`, conditional on the
  edits below. Under the test Dane set, a sentence that explains a rule
  `guide/01/` already explains fails 7.02.7 even when reworded; a sentence
  that shows what happened in the incident passes. `block-04`, `block-05`,
  `block-07` and `block-12` had their narration replaced to keep the events
  and drop the rules. `block-12`'s `items` became the response clock
  (09:31 / 09:36 / 09:44) instead of a numbered list of the steps.
- **J1** — all three load-bearing `interpretive` sentences kept, so
  `block-02` and `block-10` are unchanged. The one exception is `block-05`'s
  bearer-token gloss, removed under J4; its `interpretive` flag is cleared.
- **J3** — `block-13`'s WebAuthn citation moved from
  `W3C REC-webauthn-3-20260825 §1` to `§1.3`, inside the scope
  `sources/sec/INDEX.md` sets. Its `boundary only` flag is cleared.
- Ran the J4 test on the four blocks and four guide files Dane's reviewer
  had not compared: `block-03` against `02-phishing.md`, `block-09` and
  `block-11` against `10-detection.md`, `block-13` against
  `09-phishing-resistant.md`. Found four rule restatements, one per block,
  and replaced each with what happened in the incident.
- Two consistency fixes. `block-02`'s spoken time was "twenty to five"
  against a sheet reading `Tue 16:41`; it is now "four forty-one in the
  afternoon". And the lesson counted three observable signals where the
  document store produced nothing — it is two now, in `block-09`'s
  narration, `block-11`'s narration, and `block-11`'s sheet line.
- Every changed block's `estimatedSeconds` recomputed as
  `Math.round(words / 130 * 60)` and its `reveals` re-estimated from each
  marker's word position. Marker counts are unchanged in every block, so no
  `reveals` length or figure element count moved. All thirteen estimates
  stay inside the 40–75 s sheet window (45–62 s).
- Narrated words: **1,464**, down from 1,503. 675.7 s at 130 wpm and 530.8 s
  at 165.5 wpm, both projections, neither a measurement.
  `npm run generate -- --lesson 02 --dry-run` lists 13 blocks and 8,245
  characters, and spent nothing.
- Appended "Rulings and narration pass — 2026-09-11" to
  `drafts/ATO-02-review.md`: the rulings, before and after text for all nine
  changed blocks, updated sources and flags per block, the sweep results,
  the question re-confirmation, a re-run overlap report, the new word total
  and five findings. 782 lines added, nothing above them edited.
- One `_source` note in `src/questions-02.json` updated, on `q-15`: it named
  `block-05`'s bearer-token gloss as an inherited flag and that sentence no
  longer exists. No stem, choice, correct answer or feedback text in any of
  `q-13`..`q-16` was changed.

**Standards touched**
- 7.02.7 — A/V duration counts toward credit only where the audio and video
  constitute additional learning for the participant rather than narration
  of the text; for an all-video program the formula uses actual video time
  and no word count. This is the whole content of J4.
- 4.01.1 — where technology is used in developing a program, the content
  developer is responsible for reviewing the content for accuracy. These
  rulings and the appended record are that review in progress;
  `meta.status` stays `"draft"` until Dane closes the rest.
- 7.01 — program length is measured in CPE credits at one 50-minute period
  per credit, which is why the projected runtime is recorded in the review
  record as a projection and is not allowed to become a number anyone types.

**Decisions**
- Confirmed each of `q-13`..`q-16` still has its correct answer supported
  after the rewrites, and updated nothing but one stale `_source` note.
  Rewriting a stem or an answer was out of scope and none needed it.
- Kept every block's `citation` as it stood, even where the J4 edits mean
  the narration no longer states the cited paragraph. In each case the
  paragraph is still what makes the block's sheet or the order of its events
  true. Rejected trimming them inside this feature: it would touch six
  blocks and is a separate decision, listed as finding 2 in the record.
- Left `block-07`'s `figure` alone. `current-feature.md` gave a replacement
  for its `narration` and not for its `figure`, and changing a figure it did
  not name was out of scope — so the sheet's two timeout rows now name
  clocks the narration no longer introduces. Reported as finding 1 rather
  than fixed.
- Did not add a session-duration figure anywhere, as instructed. The only
  durations in the lesson remain the composed incident clock and the
  pre-existing eleven-minute gap.
- Added no words to reach a length. The total landed at 1,464 against
  `current-feature.md`'s 1,400 floor on its own.

**Known gaps**
- **J2, J5 and J6 stay open, and `meta.status` is still `"draft"`**, so
  `export` still refuses the lesson. J2 — `sources/sec/INDEX.md` still names
  `.txt` extractions beside both CISA PDFs and neither exists; this feature
  did not add to `sources/`, because `current-feature.md` did not say to.
  J5 — the runtime is still projected, and the margin at 165.5 wpm over the
  497 s the record discusses is now about 34 s rather than about 48 s. J6 —
  this pass added composed detail on five blocks, all flagged
  `illustration`, so there is slightly more invention to confirm.
- **`block-07`'s sheet is ahead of its narration**, as above.
- **Six blocks cite a paragraph their narration no longer states**:
  `block-03`, `block-04`, `block-07`, `block-09`, `block-12` and
  `block-13`. Kept deliberately; see Decisions and finding 2.
- **`block-09`'s "carrying proof that a login had happened somewhere else"**
  is close to `guide/01/06-session-tokens.md`'s "They are presenting proof
  that an authentication already happened". Outside the file this block was
  directed to be swept against, and arguably incident rather than rule.
  Flagged in the record, not changed.
- **ATO-01's six review-coverage warnings are untouched** and name `sec-02`,
  `sec-03`, `sec-04`, `sec-07`, `sec-10` and `sec-11`: "body section carries
  no review question — 5.01.2.1 places questions throughout the program so
  the participant can find what needs re-studying, and this section is
  unchecked (rule 4)". They predate this feature and editing `guide/01/` or
  `src/questions-01.json` was out of scope.
- **Nothing is voiced.** `usingEstimates` is still true, every duration in
  the module is an estimate, and no estimate may reach a credit calculation
  (7.02.7). The measured numbers arrive with `generate` and `render`, both
  of which are Dane's.

## 21 — superCPE theme and logo
Shipped: 2026-09-13

**What changed**
- `src/theme.ts`: the palette is now the superCPE logo. Every existing
  token name is kept, so no slide component changed: `vellum` `#F7F9FC`,
  `vellumEdge` `#EAF0F8`, `graphite` `#032660` (logo navy), `slate`
  `#5B6B85`, `hairline` `#C9D3E0`, `flag` `#01B0A9` (logo teal),
  `flagWash` `#E3F5F4`. One new token, `accent` `#0166FC` (logo blue). The
  comment block above `theme` no longer explains drafting vellum and
  surveyor's flagging tape; it says the chrome persists from the drawing-set
  design because the numbered sequence and the citation are still real
  properties of the content, that `flag` marks the one thing under
  discussion, and that `accent` is chrome and never content.
- `accent` goes in exactly three places: `Eyebrow` in `src/slides.tsx`
  (was `slate`), the 60×2 rule on the Title sheet (was `flag` — the Title
  sheet has nothing under discussion yet, so `flag` was wrong there), and
  the SHEET cell's emphasis value in `src/Sheet.tsx` (was `graphite`). The
  `Cell` label color moved from `hairline` to `slate`; it was low-contrast
  on the old vellum and would have been worse on near-white.
- `src/Sheet.tsx`: the shield mark, `Img` of
  `staticFile("brand/supercpe-icon.png")` at height 44, `top: m + 10`,
  `left: m + 72`, inside the border and aligned to the content padding. It
  is chrome: no reveal, no animation, on screen from frame 0. `Sheet` takes
  an optional `hideMark?: boolean`. The doc comment no longer says "ASC
  paragraph"; the REFERENCE cell carries whatever `citation` the block gives
  it.
- `src/slides.tsx`: the full logo, `Img` of
  `staticFile("brand/supercpe-logo.png")` at height 96 with
  `marginBottom: 40`, above the eyebrow on the Title sheet, inside the
  eyebrow's `revealAt(frame, reveals[0])` wrapper so the two come up
  together. No fourth reveal was added.
- `src/Lesson.tsx`: one line, `hideMark={block.slide === "Title"}`, so the
  Title sheet shows the full logo and not the shield as well.
- `public/brand/supercpe-logo.png` (2079×756) and
  `public/brand/supercpe-icon.png` (1350×1350) are added as supplied,
  neither resized nor re-encoded. Committed source, like
  `public/images/<lesson id>/`.
- `README.md`: `public/brand/` is listed in the layout table and described
  under the Image-block paragraph — committed, and the only images that
  appear on every sheet. The Design notes paragraphs that described the
  pink palette were rewritten to match the theme comment, since they were
  now false; that is the one edit beyond the line the feature asked for.
- Verification. `npm run typecheck` clean. `npm run check` before and after:
  2 lessons, 0 errors, 12 warnings, and the two outputs are byte-identical.
  Stills at `out/still-title.png` (frame 60), `out/still-statement.png`
  (S-01, frame 800, `theme.size.display` text) and `out/still-compare.png`
  (S-03, frame 3260, two columns): the shield sits in the top band and no
  content reaches it. `npm run render -- --lesson 02` re-rendered and
  ffprobe reports 16,287 frames and 542.933 s at 30 fps, identical to the
  2026-09-11 render of the same lesson. `git status` shows nothing under
  `public/audio/` or `src/audio-meta-*.json`. `generate` was not run.

**Standards touched**
- None. This is render-side chrome; nothing here reaches a transcript, a
  word count, or a duration.

**Decisions**
- The feature spec titled itself "Feature 15" and asked for changelog
  entry 15. Entry 15 already exists (SEC-01 body prose) and the changelog
  numbers one past the last entry, so this is entry 21. Nothing in the
  spec's content depended on the number.
- `flag` stays the single marker and stays on the draft watermark. Teal
  "draft" at the bottom left is still visible and still blanks on
  `"checked"`; lesson 02 is checked, so the stills show no watermark.
- The Title sheet hides the chrome shield through a `Sheet` prop set from
  `Lesson.tsx`, as the spec proposed, rather than `Sheet` inspecting its
  children or the slide name. `Sheet` still knows nothing about which slide
  it wraps.
- `reveal.ts`, timing, animation, fonts, `scripts/`, and every lesson
  module are untouched.

**Known gaps**
- The stills and the new render are in gitignored `out/`, alongside
  `still-*.png` files this feature left there for review.
- The `Image` slide's doc comment still opens "The theme is a construction
  drawing set". It remains true in the sense the theme comment now gives the
  phrase, and it was not in the spec's rewrite list, so it was left alone.
- ATO-01's six review-coverage warnings and ATO-02's six sheet-window
  warnings predate this feature and are unchanged; see entry 20.

## 22 — GPT course, source index
Shipped: 2026-09-13

**What changed**
- New `drafts/GPT-source-index.md`. One section per file in `sources/gpt/`
  (ten files), each with the header, "What it is", "Claims supported",
  "Does not cover" and "Currency risk" parts the spec asked for. 94 claim
  entries in all, each a claim in the index's words over a verbatim quote of
  40 words or fewer with its PDF page, tagged with the learning objectives
  and planned lessons it bears on. A coverage table over the five working
  objectives and six planned lessons, a Gaps list, and a closing note on how
  the index was produced.
- Extraction. `pdftotext` is not installed on this machine, so the PDFs were
  extracted with `pypdf` 6.18.1 in a virtualenv in the session scratchpad,
  plain text mode with a page marker per page. Layout mode was tried first
  and crashed on a blank page of the Code. The extracted text stayed in the
  scratchpad; nothing was written under `sources/` or `out/`, and nothing
  was committed from it.
- Verification, as the spec's Verify list asks. A script in the scratchpad
  greps every quote against the extracted text of the page it cites, after
  collapsing whitespace, joining end-of-line hyphens and expanding the fi/fl
  ligatures: 94 quotes checked, 94 found, none over 40 words. Section
  headers match `ls sources/gpt/` one to one. `npm run typecheck` clean.
  `npm run check`: 2 lessons, 0 errors, 12 warnings, the same output as
  entry 21.

**Standards touched**
- 4.01.1 — if technology is used in the development of the program, the
  content developer is responsible for reviewing the content for accuracy.
  The index is built for that review: a sentence written from an entry is
  traceable before it is checked, and one without an entry is `UNSOURCED`
  from the start.
- 4.01 — courses in subjects that undergo frequent changes such as updates
  to codes, laws, rulings and interpretations must be reviewed at least once
  a year; other courses at least every two years. The per-source "Currency
  risk" line is there to set that cadence source by source.

**Decisions**
- Two files in `sources/gpt/` are the same bytes: the AICPA Code file and
  `nh-rsa-309-b-18-confidential-communications.pdf` (MD5
  `1ff43d51…`). Both are the complete AICPA Code of Professional Conduct,
  updated through July 2026; neither contains a New Hampshire statute. Both
  are indexed. The `nh-rsa` section states the fact and carries no claim
  entries, so the Code is not counted twice in the coverage table. Neither
  file was renamed, re-saved or replaced: `sources/` is evidence and the
  spec puts every change there out of scope.
- `sources/gpt/.DS_Store` exists. It is a Finder artifact, not a source; the
  index says so at the top and does not give it a section, so the headers
  still match a plain `ls` one to one.
- Page references are PDF page numbers. For the Code, whose printed numbers
  run six behind, entries give both. The verifier checks the PDF page.
- The coverage table's columns are numbered, with a key above the table,
  rather than carrying ten long filenames in a header row. The table itself
  was generated from the entry tags by the verifier script and pasted in
  unchanged, so it cannot disagree with the entries.
- `cpacom-build-vs-buy-ai-decision-framework.pdf` is indexed with four
  entries, all tagged "no LO", and a one-line note at the top says it is not
  this course, per Task 4. `cpacom-ai-solution-due-diligence-guide.pdf` is
  the softer case: five of its eight entries bear on an objective as
  practices a firm could adopt, and the note says that too.
- The index quotes the 2023 toolkit's statements that ChatGPT input "becomes
  public domain" and that public tools "often rely on user input" only in
  its Currency risk line, as claims the course must not make, because the
  2026 OpenAI pages in the same set say otherwise. That is a conflict
  between two sources in the set, not outside knowledge.
- No web research, per the spec. Where a source does not say something,
  the index says so; nothing was filled in.

**Known gaps**
- Lesson 05's state-law content has no source. The file meant to carry New
  Hampshire RSA 309-B:18 is a duplicate of the Code. Adding the real statute
  is a `sources/` change and its own feature.
- The enterprise privacy capture lost most of its FAQ answers (collapsed
  accordions); the questions about who can view chats and about retention
  are in the file without their answers. Re-capturing is a `sources/`
  change.
- "Team" appears in exactly one sentence of one source; the enterprise and
  data-use pages say "ChatGPT Business" and never "Team". The set cannot say
  whether they are the same plan. LO 2 as worded depends on it. Reported
  under Gaps; the objectives were not rewritten.
- LO 3's five-element prompt pattern and LO 1's account of how a model
  produces a response are not in any source; both are listed under Gaps.
- The verifier script and the extracted text are in the session scratchpad,
  not the repo, because the spec allows one new file. Re-running the check
  means re-extracting with `pypdf`; the index's last section records the
  method.
- `git status` is not "exactly two changes". Before this feature started the
  tree already carried uncommitted modifications to `CHANGELOG.md`,
  `README.md`, `current-feature.md`, `src/Lesson.tsx`, `src/Sheet.tsx`,
  `src/slides.tsx` and `src/theme.ts`, plus untracked `public/brand/` and
  `sources/gpt/`. None of those is this feature's; this feature's footprint
  is the new `drafts/GPT-source-index.md` and this entry. Nothing under
  `sources/` changed.
- ATO-01's six review-coverage warnings and ATO-02's six sheet-window
  warnings predate this feature and are unchanged; see entries 20 and 21.

## 23 — GPT source index, regenerated for the corrected source set
Shipped: 2026-09-13

**What changed**
- `drafts/GPT-source-index.md` overwritten. It supersedes entry 22's index,
  which was built over a set where the New Hampshire file was a second copy
  of the AICPA Code and nothing named the ChatGPT plans; both are fixed in
  `sources/gpt/` (committed before this feature ran, as the spec requires)
  and the index was regenerated whole rather than patched.
- Eleven sections, one per PDF in `ls sources/gpt/` order, each with the
  header, "What it is", "Claims supported", "Does not cover" and "Currency
  risk" parts. 117 claim entries. New sections for the statute
  (`nh-rsa-309-b-18-confidential-communications.pdf`, 11 entries, all LO 5)
  and the pricing page (`openai-chatgpt-pricing-2026-09-13.pdf`, 12
  entries). The AICPA section carries its new filename and a note that the
  bytes are unchanged. The nine sections whose files did not change were
  carried over and re-verified, with two edits: the AICPA "Does not cover"
  now points to the statute's own section, and the enterprise page's
  "Team" note now says the pricing page also says "Business".
- The pricing section answers the question the spec singles out: the page
  names a plan called "Business", does not name one called "Team" (the
  only "team" is the lowercase "Trusted by teams at" logo strip), and says
  nothing about one replacing the other.
- Coverage table regenerated over eleven columns from the entry tags by
  the verifier script and pasted unchanged. Gaps rewritten: LO 5's
  state-law gap is closed and replaced by a finding that the statute's
  exceptions list has no service-provider route where the Code has one;
  LO 2's "Team" gap stays open with the pricing page's evidence added.
- Extraction with `pypdf` 6.18.1 in a scratchpad virtualenv, plain text
  mode with a page marker per page; `pdftotext` is still not installed and
  no dependency was added to `package.json`. Nothing written under
  `sources/` or `out/`; nothing committed from the scratchpad.
- Verification, per the spec's Verify list: every quote grepped against
  the extracted text of its cited page after collapsing whitespace, joining
  end-of-line hyphens and expanding fi/fl ligatures — 117 checked, 117
  found, none over 40 words. Section headers match `ls sources/gpt/` one
  to one (`.DS_Store` excluded). `npm run typecheck` clean. `npm run
  check`: 2 lessons, 0 errors, 12 warnings, unchanged from entry 22.
  `git status` before starting was clean; after, exactly
  `drafts/GPT-source-index.md` and `CHANGELOG.md` are modified.

**Standards touched**
- 4.01.1 — if technology is used in the development of the program, the
  content developer is responsible for reviewing the content for accuracy.
  The index exists for that review: a lesson sentence written from an entry
  is traceable before it is checked.
- 4.01 — courses in subjects that undergo frequent changes such as updates
  to codes, laws, rulings and interpretations must be reviewed at least once
  a year; the per-source "Currency risk" line sets that cadence, and the
  statute joins the Code on the annual list.

**Decisions**
- The AICPA file's MD5 is unchanged from entry 22, so its 18 entries were
  reused and re-verified rather than re-selected. Regenerating "whole"
  was read as re-deriving the file from the current set and re-checking
  every quote, not as discarding entries that still hold.
- The pricing page's comparison grids extracted as row labels without
  their per-plan cells. Entries 10–12 quote the labels and say in the
  claim that the plan mapping did not survive extraction, rather than
  inferring which plan has which feature. The page is not cited for "plan
  X trains by default".
- The pricing page's context-window footnote is indexed under LO 1 as the
  set's only statement of what the model is working from during a
  conversation. It is a footnote on a price page, and the Gaps list says
  so; LO 1's mechanism is still reported as unsourced.
- The statute's silence on third-party providers is reported as a "Does
  not cover" bullet and a Gaps finding, not resolved. Whether the Code's
  contract route satisfies a New Hampshire licensee is a question for the
  author with counsel, and no source in the set answers it.
- No web research, per the spec. The "Team"/"Business" question is
  reported as still unsettled by the set; no outside knowledge was used to
  settle it.

**Known gaps**
- "Team" versus "Business" is still not decidable from the set. Three
  OpenAI pages say Business, one says Team, none connects them. LO 2 as
  worded names Team; rewording it is not this feature's decision.
- The enterprise privacy page's FAQ answers and the pricing page's grid
  cells and data-handling FAQ answers were collapsed at capture. The
  business-tier prices were not captured at all. Re-capturing is a
  `sources/` change and its own feature.
- LO 1's mechanism, LO 3's five-element pattern, and a form of record for
  LO 4's "document the verification" remain unsourced, as in entry 22.
- The verifier script and extracted text are in the session scratchpad,
  not the repo; the index's last section records the method so it can be
  re-run.
- ATO-01's six review-coverage warnings and ATO-02's six sheet-window
  warnings predate this feature and are unchanged; see entries 20 and 21.

## 24 — GPT source index, regenerated for the recaptured source set
Shipped: 2026-09-13

**What changed**
- `drafts/GPT-source-index.md` overwritten. It supersedes entry 23's index
  because that one was built over a pricing capture with its plan grid
  collapsed and an enterprise-privacy capture with its FAQ answers
  collapsed, so objective 2 could not be written from it; the set was
  recaptured (committed before this feature ran) and the index regenerated
  whole rather than patched. Entry 22 is not edited.
- Thirteen sections, one per PDF in `ls sources/gpt/` order, each with the
  header, "What it is", "Claims supported", "Does not cover" and "Currency
  risk" parts. 144 claim entries. Four sections written fresh from the
  recaptured files: `openai-chatgpt-business-2026-09-13.pdf` (2 entries,
  no LO), `openai-chatgpt-pricing-business-2026-09-13.pdf` (13),
  `openai-chatgpt-pricing-personal-2026-09-13.pdf` (12) and
  `openai-enterprise-privacy-2026-09-13.pdf` (23). The section for the
  removed collapsed pricing capture is dropped with the file. The nine
  sections whose files did not change were carried over and re-verified,
  with one edit to the AICPA note's wording about its unchanged bytes.
- The v3 questions answered per file. Plan names: the business pricing
  grid uses "Business" and "Enterprise" only; the enterprise-privacy page
  names ChatGPT Business, Enterprise, Healthcare, Edu, Teachers and the
  API Platform; the ChatGPT Business page's readable text names no plan;
  the personal grid uses Free, Go, Plus and Pro. "Team": no file in the set
  other than the Data Controls FAQ names it. Training: the enterprise page
  says twice that business data, ChatGPT Business and Enterprise by name,
  is not used for training by default, with explicit opt-in as the
  exception; neither pricing grid and the product page say anything about
  training.
- Coverage table regenerated over thirteen columns from the entry tags by
  the verifier script and pasted unchanged. Gaps rewritten: LO 2's
  training-controls gap is closed on both the consumer and business sides;
  the "Team" gap stays open; a new finding lists the facts the earlier
  captures carried that the recaptures dropped (the enterprise page's date
  and SAML SSO line, every price, the Privacy and Security & Administration
  row labels, the context-window footnote), which are now in git history
  only and not citable.
- Extraction with `pypdf` 6.18.1 in a scratchpad virtualenv, plain text
  mode with a page marker per page; `pdftotext` is still not installed and
  no dependency was added to `package.json`. Nothing written under
  `sources/` or `out/`; nothing committed from the scratchpad.
- Verification, per the spec's Verify list: every quote grepped against
  the extracted text of its cited page after collapsing whitespace, joining
  end-of-line hyphens and expanding fi/fl ligatures — 144 checked, 144
  found, none over 40 words. Section headers match `ls sources/gpt/` one
  to one (`.DS_Store` excluded). `npm run typecheck` clean. `npm run
  check`: 2 lessons, 0 errors, 12 warnings, unchanged from entry 23.

**Standards touched**
- 4.01.1 — if technology is used in the development of the program, the
  content developer is responsible for reviewing the content for accuracy.
  The index exists for that review: a lesson sentence written from an entry
  is traceable before it is checked.
- 4.01 — courses in subjects that undergo frequent changes such as updates
  to codes, laws, rulings and interpretations must be reviewed at least once
  a year; the per-source "Currency risk" line sets that cadence.

**Decisions**
- The tree was not clean when this feature started: `current-feature.md`
  was modified and `current-feature-022.md` and `current-feature-023.md`
  were deleted in the working tree, all of them the spec's own archival
  edits. `sources/gpt/` and `drafts/` were clean and the recapture was
  already committed, which is what the spec's clean-tree rule protects, so
  the feature ran rather than stopping. Reported here and in the session
  report rather than silently.
- The ChatGPT Business product page is a single embedded image with a
  147-word text layer of testimonials. It is indexed from that text with
  two no-LO entries and a note at the top saying it is not usable as a
  source in this capture, per Task 1's "index it from whatever text can be
  read"; no OCR was attempted, because that would add a dependency and
  the result would not be the file's own text.
- Grid cells are quoted exactly as extracted, including the repeated
  value in front of the `Plan:` label and the `V oice` split, because the
  verifier has to find them; the preamble explains the shape once.
- The enterprise-privacy section's entries are all new even where a claim
  survives from entry 23, because the re-saved page's text differs (FAQ
  answers present, question headings, intro bullets and the date line
  absent) and no old quote was assumed to still be on the page without
  being found there.
- No web research, per the spec. The "Team" question is reported as still
  unsettled by the set; no outside knowledge was used to settle it.

**Known gaps**
- "Team" versus "Business" is still not decidable from the set. LO 2 as
  worded names Team; rewording it is not this feature's decision.
- The recaptures dropped facts the earlier captures had — the enterprise
  page's date and SAML SSO line, all prices, the Privacy and Security &
  Administration rows, the context-window footnote — and the ChatGPT
  Business page is an image. Re-capturing is a `sources/` change and its
  own feature.
- LO 1's mechanism, LO 3's five-element pattern, and a form of record for
  LO 4's "document the verification" remain unsourced, as in entries 22
  and 23.
- The verifier script and extracted text are in the session scratchpad,
  not the repo; the index's last section records the method so it can be
  re-run.
- `git status` shows the two changes this feature made plus the three
  pre-existing spec-file changes noted under Decisions.
- ATO-01's six review-coverage warnings and ATO-02's six sheet-window
  warnings predate this feature and are unchanged; see entries 20 and 21.

## 25 — GPT source index, regenerated for the final source set
Shipped: 2026-09-13

**What changed**
- `drafts/GPT-source-index.md` overwritten. It supersedes entry 24's index
  because that one was built over a set whose enterprise-privacy re-save
  had lost the page's "Updated: January 8, 2026" date and its SAML SSO
  line, and whose ChatGPT Business product page was an image; commit
  8239c24 restored the print-layout enterprise-privacy capture as
  `openai-enterprise-privacy-print-2026-09-13.pdf` and removed the image
  page, and the index was regenerated whole over that set. Entry 22 is
  not edited.
- Thirteen sections, one per PDF in `ls sources/gpt/` order, each with the
  header, "What it is", "Claims supported", "Does not cover" and "Currency
  risk" parts. 155 claim entries. One section written fresh, for the
  print-layout capture: 13 entries, all LO 2 and L02, three also LO 5 and
  L05 — the date line, the SAML SSO line, the retention-control line that
  names Enterprise, Healthcare and Edu, the access-control and
  fine-grained-control commitments, the SOC 2 and encryption commitments,
  and six FAQ question headings each paired to the Reader-view entry that
  holds its answer. No claim the Reader-view section already carries is
  repeated, as the spec asks. The section for the removed product page is
  dropped with the file.
- Twelve sections carried over and re-verified. Two of them edited: the
  Reader-view enterprise-privacy section's "Date stated", "What it is",
  "Does not cover" and "Currency risk" now point to the print-layout
  capture instead of saying the date and SAML SSO line are in no file, and
  the business pricing section's Security & Administration bullet says
  the same for SSO. The preamble gains a "Two captures of one page"
  paragraph.
- The v3/v4 questions answered for the print-layout capture: plan names
  are ChatGPT Business, Enterprise, Healthcare, Edu, Teachers and the API
  Platform; "Team" appears only in lower case ("engineering teams", "for
  your team"); on training it carries the headline "We do not train our
  models on your data by default" and the FAQ question with its answer
  collapsed, and the section sends the author to the Reader-view entries
  for the citable statement. The other files' answers are unchanged from
  entry 24.
- Coverage table regenerated over thirteen columns from the entry tags by
  the verifier script and pasted unchanged. Gaps rewritten: the "dropped
  facts" finding now lists what file 11 restored (date, SSO, retention
  line) and what is still history-only (every price, the Privacy and
  Security & Administration row labels, the context-window footnote, the
  ads line); the image-page finding is replaced by one saying the product
  page is no longer in the set; a new finding says SAML SSO is sourced as
  a commitment, not as a feature of any named plan.
- Extraction with `pypdf` 6.18.1 in a scratchpad virtualenv, plain text
  mode with a page marker per page; `pdftotext` is still not installed and
  no dependency was added to `package.json`. Nothing written under
  `sources/` or `out/`; nothing committed from the scratchpad.
- Verification, per the spec's Verify list: every quote grepped against
  the extracted text of its cited page after collapsing whitespace, joining
  end-of-line hyphens and expanding fi/fl ligatures — 155 checked, 155
  found, none over 40 words. Section headers match `ls sources/gpt/` one
  to one (`.DS_Store` excluded). `npm run typecheck` clean. `npm run
  check`: 2 lessons, 0 errors, 12 warnings, unchanged from entry 24.

**Standards touched**
- 4.01.1 — if technology is used in the development of the program, the
  content developer is responsible for reviewing the content for accuracy.
  The index exists for that review: a lesson sentence written from an entry
  is traceable before it is checked.
- 4.01 — courses in subjects that undergo frequent changes such as updates
  to codes, laws, rulings and interpretations must be reviewed at least once
  a year; the per-source "Currency risk" line sets that cadence, and the
  print-layout capture is the one OpenAI page that carries a date to
  compare at the next review.

**Decisions**
- The tree was not clean when this feature started: `current-feature.md`
  was modified and `current-feature-024.md` was untracked, both the spec's
  own archival edits. `sources/gpt/` and `drafts/` were clean and commit
  8239c24 was already in, which is what the spec's clean-tree rule
  protects, so the feature ran rather than stopping. Reported here and in
  the session report.
- The restored print-layout file is not byte-identical to the blob at
  commit 20fee1e (MD5 `e05acbb9…` against `38e020e9…`), but its extracted
  text and PDF creation timestamp (2026-09-13 20:56:39 UTC) are identical
  to it. The section states that and tells the author to cite the file in
  the tree, not the history. The file was not touched.
- The print-layout section indexes FAQ question headings as entries. The
  Reader-view capture has the answers without the questions; the pairing
  is what lets a lesson cite a question and its answer to the same page,
  and each such entry names the Reader-view entry it pairs with.
- The headline "We do not train our models on your data by default" line
  is quoted in the print-layout section's "Does not cover", not as an
  entry, because the Reader-view section already carries that claim three
  times and the spec says not to repeat it.
- The two enterprise-privacy sections are adjacent by `ls` order, which is
  also the reading order the preamble describes; no reordering was needed.
- No web research, per the spec. The "Team" question is reported as still
  unsettled by the set; no outside knowledge was used to settle it.

**Known gaps**
- "Team" versus "Business" is still not decidable from the set. LO 2 as
  worded names Team; rewording it is not this feature's decision.
- Prices, the pricing page's Privacy and Security & Administration rows,
  its context-window footnote and the Go plan's ads line are still in git
  history only. SAML SSO is now sourced, but as a general commitment; no
  file says which plan has it.
- The ChatGPT Business product page is no longer in the set in any form;
  the enterprise page's Business FAQ answer is the set's description of
  the plan.
- LO 1's mechanism, LO 3's five-element pattern, and a form of record for
  LO 4's "document the verification" remain unsourced, as in entries 22
  through 24.
- The verifier script and extracted text are in the session scratchpad,
  not the repo; the index's last section records the method so it can be
  re-run.
- `git status` shows the two changes this feature made plus the two
  pre-existing spec-file changes noted under Decisions.
- ATO-01's six review-coverage warnings and ATO-02's six sheet-window
  warnings predate this feature and are unchanged; see entries 20 and 21.

## 26 — Course GPT registered, objectives set, GPT-01 section plan
Shipped: 2026-09-13

**What changed**
- `npm run new` six times: lessons 03–08, package ids GPT-01 … GPT-06,
  five text and one video, in course `GPT` — "Using ChatGPT in an
  Accounting Practice". The first run created `COURSE_GPT` in
  `src/course.ts`; the rest joined it at positions 2–6. `src/lessons.ts`
  and `src/questions.ts` were edited by the command, not by hand.
- `COURSE_GPT`'s three TODO descriptors filled: `nasbaFieldOfStudy`
  "Computer Software & Applications" (copied from `FIELDS_OF_STUDY` in
  `scripts/validate-package.ts`), `prerequisites` "None",
  `advancePreparation` "None". `knowledgeLevel` "Basic" and
  `deliveryMethod` "Self study" are what the scaffold wrote and what ATO
  uses. The record's doc comment was written.
- Every new module's `learningObjectives` carries the spec's objectives
  verbatim, ids `lo-1` … per lesson (3, 3, 4, 4, 4, 1). `sources` lists
  only the `sources/gpt/` files the index shows contributing at least one
  entry to that lesson's objectives, each cited by publisher, title as the
  index prints it, retrieval or publication date, and path. `author` is
  ATO-01's block, test-package sentinels included. `revision` "1",
  `revisionDate` 2026-09-13, `status` "draft". Lesson 08's display
  `fieldOfStudy` was set to the same string as the NASBA field; its
  `subtitle` is still the scaffold's TODO.
- Lesson 03 (`GPT-01`) has a section plan: seven `meta.sections`
  (front-matter, sec-01 … sec-05, glossary) and the matching files under
  `guide/03/`. Each body file is its heading, one `<!-- index: … -->`
  comment naming the entries it will draw on, and a `TODO prose` line; the
  glossary file is its heading and `TODO`; the front matter is the
  scaffold's "How this course works" template. The scaffold's `01-body.md`
  was replaced by the five planned files. `glossaryTerms` stays empty.
- `drafts/GPT-01-review.md` … `GPT-06-review.md`, created by the scaffold
  this feature, gained two things and nothing else: under "Learning
  objectives", each objective with its index references and a key from
  file number to filename; under "Sources still needed", the Gaps bullets
  from the index that bear on that lesson, copied verbatim.
- Verified: `npm run typecheck` clean. `npm run check` runs over eight
  lessons; see Known gaps for its result. `npm run generate -- --lesson 08
  --dry-run` reports one scaffold block with no audio and "Nothing sent,
  nothing written"; generate was not run without `--dry-run`. `git status`
  shows the files the spec lists plus `src/audio-meta-08.json`, which the
  scaffold writes for a video lesson, and the pre-existing uncommitted
  changes noted under Decisions. Nothing under `sources/`, nothing in
  `drafts/GPT-source-index.md`, nothing in lessons 01 or 02.

**Standards touched**
- 3.01 — learning activities must be based on relevant learning objectives
  and outcomes that clearly articulate the professional competence to be
  achieved, set with the knowledge level and prerequisites in view.
- 3.01.1 — the sponsor must specify knowledge level, content and learning
  objectives so a participant can judge fit; the levels are Basic,
  Intermediate, Advanced, Update and Overview. "Basic" is the level on
  every GPT lesson.
- 3.02.1 — for Basic and Overview programs, prerequisite education or
  experience and advance preparation are noted if applicable, otherwise
  stated as "none". Both are "None" on the course record every GPT lesson
  reads.
- 4.01.1 — if technology is used in developing the program, the content
  developer is responsible for reviewing the content for accuracy. The
  six accuracy records exist for that review and now say what each
  objective rests on.
- 6.01.2 — the qualified assessment; `check`'s rule 1 (every objective
  measured by at least one assessment question) fires on every GPT
  objective because no questions exist yet. See Known gaps.

**Decisions**
- The objectives are the spec's rewrite of the index's five working LOs to
  what the sources actually support. Dropped: LO 1's "describe how a large
  language model produces a response" (no source explains the mechanism;
  the nearest is "patterns in data it was trained on"), "instruction
  drift" (in no source), "Team" (a plan name only the Data Controls FAQ
  uses, and nothing in the set connects it to Business), and LO 3's
  five-element prompt pattern (no source names role, inputs, constraints
  or output format as elements). What replaced them is what the index
  cites: generated-not-computed, the four named failure modes, the
  calculation-via-code-tool limit, Business and Enterprise by name, and
  the prompting practices files 13 and 4 actually state.
- **Index numbering.** The spec cites the index "as the index numbers
  them", but it was written against the committed index (entry 24), whose
  file 6 was the ChatGPT Business product page that commit 8239c24
  removed. The working-tree index (entry 25, uncommitted when this feature
  started) renumbers: its files 6–11 are the spec's 7–11 shifted down by
  one, with the restored print-layout capture as its 11; files 1–5, 12 and
  13 are unchanged. Every reference was checked entry by entry against the
  working-tree index and matched under that translation (spec 10#1 is the
  "patterns in its training data" claim, which is file 9 entry 1 in the
  tree). The review records, the guide stubs' `<!-- index -->` comments and
  this entry all use the working-tree numbering, because that is the index
  a reader will open and the numbering its own Gaps bullets use. Each
  record states the translation and keys file numbers to filenames so the
  references survive another regeneration. The index itself was not
  edited.
- Every `sources` entry is `role: "primary"`. The distinction was
  considered and set aside: each listed file is the only source for at
  least one objective it is listed against, so none is merely supporting.
- Section ids on lesson 03 are the spec's (`front-matter`, `sec-01` …,
  `glossary`), not the scaffold's `sec-00`/`sec-90` pattern ATO-01 uses.
  Lessons 04–07 keep the scaffold's two sections and `01-body.md`; their
  plans wait for the previous lesson's prose, as the spec says.
- The tree was not clean when this feature started: `CHANGELOG.md`,
  `current-feature.md` and `drafts/GPT-source-index.md` were modified
  (entry 25's work, uncommitted) and `current-feature-024.md` and
  `-025.md` were untracked. None of them is touched by this feature except
  this append to the changelog. Reported here and in the session report.

**Known gaps**
- **`npm run check` exits 1.** 19 ERRORs, all rule 1 (6.01.2: "objective
  lo-N has no assessment question"), one per GPT objective across lessons
  03–08. They are entailed by the spec, which fills the objectives and
  writes no questions, and they are the same state entry 15 shipped in
  for ATO-01 before its questions came in entry 16. The spec expected
  "no questions" to surface as a WARN; it is an ERROR, and it names
  lessons this feature created, which CLAUDE.md's Workflow step 4 calls
  blocking. Nothing in scope can clear it: questions are the next
  feature, and downgrading rule 1 would be a change to a shared file the
  spec does not ask for. The entry is written over that red check
  deliberately and says so; whether that is acceptable is the human's
  call.
- The expected WARNs on GPT lessons, 21 in all: `glossaryTerms` empty on
  each of the five text lessons; `status` "draft" on all six; lesson 03's
  five body sections and lessons 04–07's one each carry no review
  question; lesson 08's scaffold block is outside the sheet window. The
  12 ATO warnings are unchanged. Total: 8 lessons, 19 errors, 33 warnings.
- The index's finding on lesson 05 (`GPT-05`) stands: the Confidential
  Client Information Rule and RSA 309-B:18 will both be applied to a
  chatbot that neither names. Whether typing client information into
  ChatGPT is a "disclosure" under the Code or a "voluntary disclosure"
  under the statute is the author's inference in both cases, and the
  prose must state it as a course position, not as what either rule says.
  The statute also has no service-provider clause, so the Code's contract
  route cannot be taught as sufficient for a New Hampshire licensee.
- Lesson 03's body sections hold five to seven words each — heading plus
  `TODO prose`. The estimated credit line prints 0.00 and means nothing
  until prose exists.
- Lesson 08's `subtitle`, its scaffold block and its narration are TODO;
  no clip, no audio, no `audio-meta-08.json` entry.
- `current-feature.md` remains modified in the tree from before this
  feature; the spec's own archival edits are not this feature's to commit.
