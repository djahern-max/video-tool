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
