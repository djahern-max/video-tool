# Lesson runbook

The only file in this repo you need to read to build a lesson.

Text lessons are the default. The video path is at the bottom and is the
same steps plus two.

---

## Pick two things first

- **Lesson number** — two digits. Just an id; it names the files
  (`src/lesson-01.ts`, `guide/01/`). Any unregistered number works.
- **Package id** — the permanent, globally unique code the package ships
  under (`ASC450-LC-01`). Reusing one means "new version of that lesson"
  downstream, not "new lesson." `new` refuses a code already in use.

Check `ls drafts/` before you pick a code. `retire` leaves review documents
behind, so a stale `drafts/<code>-review.md` can survive a retired lesson,
and `new` will leave it untouched rather than replace it.

---

## 1. Scaffold

    npm run new -- --lesson 01 --code ASC450-LC-01 --title "..." --kind text \
      --course-code ASC450-LC --course-title "Loss Contingencies Under ASC 450"

Writes:

    src/lesson-01.ts            the module: metadata, section list
    src/questions-01.json       []
    guide/01/00-front-matter.md
    guide/01/01-body.md
    drafts/ASC450-LC-01-review.md

and registers the lesson in `src/lessons.ts`, `src/questions.ts`, and
`src/course.ts`.

`--course-code` is what places the lesson in a course. It joins the record
with that code, or creates one when nothing matches — in which case
`--course-title` is required and the new record's `nasbaFieldOfStudy`,
`prerequisites` and `advancePreparation` land as `TODO:` strings you must
fill in before export. Passing `--course-title` for a course that already
exists under a different title is a refusal: one course code is one course.

Position is the next one in that course. A gap left by a retired lesson is
not reused — that number was that lesson's place in the sequence.

## 2. Name the course, or don't

Leave both course flags off and no course entry is written. That is still
deliberate: with no course named there is nothing to infer, and the command
refuses to guess rather than picking one for you.

Export refuses a lesson with no course entry — that record is where
`course_code` and `position` come from. `npm run check` warns until it's
there, and you either re-run `new` with `--course-code` or add the entry by
hand.

## 3. Fill in the module

Open `src/lesson-01.ts`. Every descriptor field is `TODO:`. Fill in
objectives, field of study, knowledge level, prerequisites, advance
preparation, author, sources, glossary terms.

The field that does the real work is `meta.sections`: your markdown files
and each one's `role`.

    front_matter    excluded from the word count. Required.
    body            counted. At least one required.
    glossary        excluded.
    appendix        excluded.

Put words in the right file and the roles handle the rest. Nothing is
counted or excluded by remembering to do it.

Two that will bite at publish time: a `front_matter` section is required,
and `glossary_terms` must not be empty.

## 4. Write the content

Plain markdown under `guide/01/`. Add as many files as you like; list each
one in `meta.sections`.

## 5. Write the questions

`src/questions-01.json`.

    review       carries "after_section": "sec-02". At least 2 choices.
    assessment   carries no placement. At least 3 choices.

Every question needs `objective_ids` pointing at real objective ids.

## 6. Check

    npm run typecheck && npm run check

`check` prints a per-section word count table marking each section counted
or excluded, then a credit estimate. This is the loop that matters — run it
after every content change. Exit code 1 on any ERROR.

`check` runs across all lessons, so a finding naming a different lesson is
not your problem.

## 7. Mark it reviewed

Work through `drafts/<code>-review.md`, then edit `meta.status` from
`"draft"` to `"reviewed"` by hand. Nothing in the tooling sets this and
nothing should.

## 8. Export

    npm run export -- --lesson 01

Produces `dist/<code>.zip`. On any refusal nothing is created under
`dist/` — there is no half-built package to clean up.

## 9. Upload

The zip goes to superCPE's admin packages page.

    FILL IN: the production URL and login. Local development was
    localhost:5173/admin/packages.

Re-uploading the identical zip is a no-op. A changed zip creates a new
version of the lesson.

---

## When export refuses

Each refusal names what is wrong. The common ones:

| Message mentions | Fix |
|---|---|
| lesson id not registered | wrong `--lesson` number |
| no COURSES entry | re-run `new` with `--course-code`; see step 2 |
| status "draft" | step 7 |
| an ERROR from check | run `npm run check` and read it |
| after_section is not a section id | review question points at a section that doesn't exist |
| assessment question must not carry after_section | remove the placement |
| section file does not exist | `meta.sections` names a file not on disk |
| media item file does not exist | render the clip first |

---

## The fast loop

Edit markdown → `npm run check` → `npm run export` → upload.

Seconds. No rendering, no audio, no waiting. Run it as often as you like.

---

## Video lessons

Same spine, two extra steps. Use `--kind video` (the default) at step 1.
Instead of `guide/` markdown you write narrated blocks in the module, then
between steps 7 and 8:

    npm run generate -- --lesson 01 --dry-run    free; lists what would change
    npm run generate -- --lesson 01              spends ElevenLabs credits
    npm run dev                                  Studio, to scrub the sheets
    npm run render -- --lesson 01                writes out/lesson-01.mp4

Export refuses while any narrated block lacks generated audio, and refuses
a render that is stale relative to the audio. Durations are measured off
the rendered file; nothing is ever typed.

Block rules that cause silent defects, so `check` enforces them: the number
of `[[r]]` markers in the narration must equal the length of `reveals`, and
a slide's `figure.kind` must match its `slide` type or the sheet renders
blank.

A block with `slide: "Image"` puts a real image on the sheet. Put the file
under `public/images/<lesson id>/` and set `figure.src` to its path relative
to `public/` — `"images/07/gum-line.png"`, not `"public/images/…"` and not an
absolute path. Commit it: like the narration MP3s these are source, not build
output. `check` errors on a `src` that is not there and on a blank `alt`, both
before you spend any narration credit. The image is reveal element 0 and the
optional `caption` element 1, so one marker brings up the image alone and two
bring up the image and then the caption. Clearing an image for use is yours,
not the tooling's: nothing here checks licensing.

---

## Deleting a lesson

    npm run retire -- --lesson 01 --dry-run
    npm run retire -- --lesson 01

Removes the module, questions, audio, guide, render, and dist artifacts,
and unwires all three registries. It refuses if the working tree is dirty
or if any audio file is untracked by git. It leaves `drafts/` and
`sources/` alone.
