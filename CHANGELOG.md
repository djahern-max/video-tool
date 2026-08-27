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
