# Feature — Reset to an empty workspace

## Goal

Remove every lesson, course, draft, source, audio file, render, package, and
archived spec from this repo, so the next thing built here is the first real
course. The tool itself stays exactly as it is: scripts, components, theme,
types, the contract, the Standards extracts, and the rules in `CLAUDE.md`.

Nothing is backed up, copied, archived, or moved aside. Delete means delete.

## This is the human's decision

`CLAUDE.md` says automation never deletes `drafts/` or `sources/`, and that
deleting them is "a human decision made by hand." This spec **is** that
decision, made by the content developer, for this run only. All of it is
pre-launch practice material; no participant or reviewer record exists.

The rule stays in `CLAUDE.md` unchanged. It protects the real course that
comes next. Do not weaken or remove it.

## Do not

- Run `npm run generate` without `--dry-run` (spends ElevenLabs credits).
- Change any script's behavior, the Boundary section, rule 2 (timing is
  measured), the 7.02.7 section, the evidence-directory rule, or voice/model
  settings.
- Touch `docs/course-package.md`, `docs/standards/`, `.env`, or `node_modules/`.
- Rewrite git history or push anything other than the normal commit below.

## Tasks

### 1. Inventory (report, then continue without stopping)

List what exists under: `src/lesson-*.ts`, `src/questions-*.json`,
`src/audio-meta-*.json`, `guide/`, `public/audio/`, `public/images/`,
`drafts/`, `sources/`, `out/`, `dist/`, and every `current-feature-NNN.md`.
Also list any lesson or questions file that exists but is **not** registered
in `src/lessons.ts` (sandbox lessons such as BALLOON).

In `public/`, identify which files the components load (e.g. logo/shield used
by the theme via `staticFile`). Those are tool assets and stay.

### 2. Retire every registered lesson

    npm run retire -- --all --force

If it refuses on untracked MP3s, delete those MP3s by hand and run it again.
That refusal protects audio that cannot be recovered; losing it is the choice
this spec makes. The audio-meta invariant still holds because every
`audio-meta-NN.json` goes in the same run.

### 3. Delete what retire leaves behind

- Everything inside `drafts/` and `sources/`. Keep the two directories, each
  with an empty `.gitkeep`, since `CLAUDE.md`'s layout names them.
- Everything inside `guide/`, `public/audio/`, `public/images/` (keep the
  directories with `.gitkeep`). Keep the tool assets found in task 1.
- Any unregistered `src/lesson-*.ts`, `src/questions-*.json`,
  `src/audio-meta-*.json` from task 1.
- `out/` and `dist/` contents.
- Every `current-feature-NNN.md`.

### 4. Confirm the empty state

`src/lessons.ts` REGISTRY empty, `src/questions.ts` maps empty,
`src/course.ts` `COURSES` is `[]` with no course records. These empty shapes
are already supported (see the comments in those files).

### 5. Scrub course-specific text from the docs

In `CLAUDE.md`, `README.md`, `LESSON-RUNBOOK.md`, and `docs/developer-read.md`,
remove or genericize references to specific courses and lessons: ATO, SEC,
SEC-01, GPT, BALLOON, ASC842, lesson numbers, `sources/sec/` (delete the
paragraph explaining why it wasn't renamed), and `drafts/GPT-NN-review.md`
(becomes `drafts/<code>-review.md`, which is what `npm run new` writes).

Change wording only. Every rule must say the same thing after as before. If a
sentence can't be genericized without changing a rule, leave it and list it
in the report.

Leave code comments in `scripts/` and `src/` alone unless they break the
build. If `typecheck` or `check` fails because code hardcodes a course or
lesson, make the smallest fix and report it.

### 6. Replace `CHANGELOG.md`

Replace the file with a fresh one. Its only entry, numbered 1, titled
"Reset to an empty workspace", states in a few lines: what was removed, that
nothing was kept, that the tool's rules and contract were not changed, and
the verification results below. Keep the entry format the old file used.

### 7. Verify

1. `npm run typecheck` clean.
2. `npm run check`: 0 lessons, 0 errors, 0 warnings.
3. `npm run dev` starts Studio with no compositions and no errors; stop it.
4. Round trip, no credits, no render:
   `npm run new -- --lesson 01 --code TEST-01 --title "T"` → typecheck →
   check → `npm run generate -- --lesson 01 --dry-run` → `npm run export --
   --lesson 01` refuses on status → `npm run retire -- --lesson 01 --force`.
   Repeat with `--kind text`. Then delete the `drafts/TEST-01-review.md` each
   scaffold left.
5. `git grep -n -i -E "ATO|SEC-01|GPT-0|BALLOON|ASC842|sources/sec"` — report
   every remaining hit and why it stayed.
6. `git status` shows only this feature's deletions and edits.

### 8. Commit

One commit on `main`: `Reset to an empty workspace`. Then delete this
`current-feature.md` contents and leave the file empty for the next feature.

## Report

Short: counts removed per task-1 location, any hand-deleted MP3s, doc
sentences left unchanged and why, any code fix, and the task-7 results.
