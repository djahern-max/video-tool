# Current Feature

## Feature NN, the q-12 citation and the ATO-01 rename

> Confirm the last entry number in `CHANGELOG.md` before starting. Entry 17
> is the immediate predecessor; read it first.

## Goal

Two record corrections left behind by feature 17. Nothing about the shipped
package changes: `dist/ATO-01.zip` is already exported and is not rebuilt,
`src/questions-01.json` is not edited, and no question text moves.

---

## Task 1 — the q-12 citation disagrees with itself

Entry 17's summary table puts q-12 on NIST SP 800-63B-4 **§3.1.1.1**. Entry
17's decisions section, and `drafts/SEC-01-review.md`'s earlier sec-03
record, put the composition-rule prohibition at **§3.1.1.2**, items 5 and 6.
One of the two is wrong.

**The source decides, not the majority of the records.** Grep the committed
800-63B-4 `.txt` in `sources/sec/` for both section numbers, read what each
actually says, and determine which one carries the prohibition on composition
rules — and, separately, which one q-12's correct answer actually rests on.
They may not be the same paragraph, in which case say so rather than picking
one.

Then correct whichever records are wrong: `CHANGELOG.md` entry 17 and the
question addendum in `drafts/SEC-01-review.md`. Quote the governing sentence
from the source in the correction so the next reader does not have to
re-derive it.

Do not edit `src/questions-01.json`. If the question's own `_source` key is
wrong, report it and stop — that changes the package.

---

## Task 2 — finish the ATO-01 rename

`src/lesson-01.ts` carries `courseCode: "ATO-01"` and the course const is
`COURSE_ATO`, from an uncommitted rename. The package on production is
ATO-01, so **the value is already correct**. The job is making everything
else agree with it.

- **Do not touch `meta.courseCode` or the course const, in either
  direction.** Nothing in this task changes what the package ships as.
- `git mv drafts/SEC-01-review.md drafts/ATO-01-review.md` and
  `git mv drafts/SEC-01-flag-triage.md drafts/ATO-01-flag-triage.md`.
  `src/lesson-01.ts` already points at `drafts/ATO-01-review.md`, which is
  currently a dangling reference; the move resolves it.
- `rg -n 'SEC-01|COURSE_SEC' . --glob '!node_modules'` and fix every
  remaining reference in source, scripts and docs. **`CHANGELOG.md` entries
  15, 16 and 17 are the record and are not rewritten** — they describe what
  was true when they shipped. If an entry's reference is now confusing, that
  is a note in the new entry, not an edit to the old one.
- These files are 9.02.2(2)(ii) supporting documentation for a package that
  ships as ATO-01. Preserve their git history — use `git mv`, not delete and
  recreate.
- Commit the rename together with these corrections, so the shipped package's
  identity stops depending on uncommitted working-tree state.

---

## Verify

    npm run typecheck && npm run check

Expected, unchanged from entry 17: 0 errors, 6 rule-4 coverage WARNs
(sec-02, sec-03, sec-04, sec-07, sec-10, sec-11), no `[draft]` WARN. If any
of those move, stop and report — nothing here should reach `check`.

Do not run `export`. The zip is built and correct.

## Do not

- Rebuild, re-export, or re-hash the package
- Edit `src/questions-01.json`, any file under `guide/01/`, or `meta.status`
- Change `meta.courseCode`
- Rewrite CHANGELOG entries 15 or 16
- Resolve, reclassify or close any `UNSOURCED` flag or J item

## Acceptance

1. The q-12 citation is the same section number in `CHANGELOG.md` and
   `drafts/ATO-01-review.md`, and that number is the one the source supports,
   with the governing sentence quoted.
2. `drafts/ATO-01-review.md` and `drafts/ATO-01-flag-triage.md` exist with
   history preserved; no `SEC-01` filename remains under `drafts/`.
3. `rg 'SEC-01|COURSE_SEC'` returns only CHANGELOG entries 15–17.
4. `npm run typecheck` clean; `npm run check` identical to entry 17.
5. `git status` clean after commit, with the rename committed.

## When done

Append the entry. Under **Standards touched**: 9.02.2(2)(ii) — the word count
formula's supporting documentation must be retained, and the accuracy record
now carries the code the package ships under. Under **Decisions**: which
section number the source supported and which record was wrong. Under **Known
gaps**: the 2026 Statement extraction gap from entry 17 is closed — the file
is a zip of per-page text, not a PDF, and `unzip` reads both sentences
cleanly; 5.01.2.1's excluded subject is true/false questions and 6.01.2
prohibits forced-choice responses on the qualified assessment outright,
neither of which mandates a three-choice floor, so `check-lessons.ts` rule 3
needs no change.

Then stop. Do not upload.
