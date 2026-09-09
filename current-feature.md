# Feature — SEC-01 flag triage checklist

Produce `drafts/SEC-01-flag-triage.md`: a single scannable checklist that lets
the content developer work through all 41 `UNSOURCED` flags in
`drafts/SEC-01-review.md` in one sitting.

**This feature decides nothing.** It re-presents flags that already exist, in
an order and a format that makes them fast to confirm. The 4.01.1 accuracy
review is the human's; a checklist that pre-answers it defeats the purpose of
having raised the flags. See "Out of scope."

## Inputs

- `drafts/SEC-01-review.md` — the authority for what the flags are
- `guide/01/*.md` — the source of the verbatim sentence text
- `src/lesson-01.ts` — section ids, files, roles, objectives
- `CHANGELOG.md` entry 15, "Known gaps" — the per-section flag counts to
  reconcile against

## Tasks

### 1. Extract every flag

Read every `**Flags**` block in `drafts/SEC-01-review.md`. For each flag record:

- section id and file
- the class, taken from the parenthetical the review doc already uses:
  `illustration`, `framing`, `interpretive`, `descriptive`, `boundary only`,
  or **none** where the flag is written as a bare `UNSOURCED`
- the flagged sentence, **verbatim from the guide file**, not from the review
  doc's rendering of it
- the review doc's own note on what a human must verify, condensed to one line
- the objective the section serves

If a flagged sentence cannot be located verbatim in its guide file, do not
paraphrase or approximate it. Record it as `TEXT NOT FOUND` with the review
doc's quotation, and list it in the reconciliation report.

### 2. Reconcile the count

The per-section totals must match entry 15's Known gaps list exactly:

    sec-00 1  sec-01 3  sec-02 5  sec-03 3  sec-04 3  sec-05 2  sec-06 2
    sec-07 4  sec-08 4  sec-09 2  sec-10 5  sec-11 5  sec-90 2     total 41

If they do not, **stop and report the discrepancy**. Do not adjust either
number to make them agree, and do not add or drop a flag to reach 41.

### 3. Assign a default by class, mechanically

The default is a function of the class the review doc already assigned. Apply
the table; do not exercise judgment about the content of any individual flag.

| Class | Default | The question the human is answering |
|---|---|---|
| `illustration` | **Keep** | Is this composed scenario fair and plausible? It needs no source. |
| `framing` | **Keep** | Is this aphorism true as stated, and does it oversell? |
| `boundary only` | **Keep** | Does the entry say in its own text that no source defines the term? |
| `descriptive` | **Confirm** | Does this match how the course will be marketed and registered? |
| `interpretive` | **Confirm inference** | The premises are sourced; does the conclusion follow? |
| *(bare)* | **Decide** | Nothing supports this. Source it, reword it, or cut it. |

### 4. Write the checklist

`drafts/SEC-01-flag-triage.md`, in this order:

1. A four-line header: what this file is, that it is a working document for one
   sitting, that `drafts/SEC-01-review.md` remains the record, and that
   `meta.status` stays `"draft"` until it is worked through.
2. **Confirm-fast** — every `illustration`, `framing`, `boundary only` and
   `descriptive` flag. These are the majority; put them first so the sitting
   starts with momentum.
3. **Confirm the inference** — every `interpretive` flag.
4. **Needs a decision** — every bare `UNSOURCED` flag.
5. **Judgment items** — J4, J5, J7, J8 only, each restated in two or three
   lines with the decision framed and *not* made. The other six J items are
   mechanical or already settled and do not belong here.

Within each group, order by section id.

Each flag is one entry, in this shape:

```
- [ ] **sec-08 · illustration · lo-4** — default: keep
      > a person, at eleven at night, with a phone that will not stop
      > buzzing, who taps the thing that makes it stop.
      Composed scenario; needs no source. Fair?
      `guide/01/08-mfa-fatigue.md`
```

Requirements on the format:

- The checkbox is first so the file can be worked down the left margin.
- The verbatim sentence is blockquoted so it is visually distinct from the ask.
- The guide file path is on every entry, because acting on a flag means opening
  that file.
- No entry is longer than six lines.
- Section headers carry a running count (`Confirm-fast — 21 flags`).

### 5. Append a reconciliation report

At the foot of the file: per-section counts as extracted, the entry 15 counts,
whether they agree, and any `TEXT NOT FOUND` entries. If step 2 stopped, this
report is the deliverable and the checklist is not written.

## Out of scope — do not do these

- **Do not resolve any flag.** No sentence is added, cut, reworded or sourced.
- **Do not edit `guide/01/*.md`, `src/lesson-01.ts`, `src/course.ts`,
  `sources/sec/INDEX.md`, or `drafts/SEC-01-review.md`.** This feature creates
  exactly one new file.
- **Do not touch `meta.status`.**
- **Do not search for sources** for the bare `UNSOURCED` flags, and do not
  suggest candidate sources. Naming a plausible source is the first half of
  deciding, and the decision is J7's and the human's.
- **Do not write, draft or sketch any question.** Questions are feature 16 and
  lo-6's is blocked on J8.
- Do not reorder or renumber the J items.

## Acceptance

- `drafts/SEC-01-flag-triage.md` exists and holds 41 checklist entries plus the
  four judgment items.
- Every entry's blockquoted sentence appears verbatim in the guide file it
  names — spot-check five across five different sections and say which.
- Group counts sum to 41 and the per-section reconciliation agrees with entry
  15, or the run stopped at step 2 and said why.
- `git status` shows exactly one new file and no modifications.
- `npm run typecheck` clean. `npm run check` reports the same six rule-1
  ERRORs, eleven rule-4 WARNs and one `[draft]` WARN as before — unchanged,
  because nothing this feature touches is read by `check`.
