# ASC842-PCX-01 — The Short-Term Lease Exception — reviewer's document

This is the document a licensed CPA reads **before any narration audio is
generated**. Once a block is voiced, changing one sentence costs an ElevenLabs
regeneration and produces a different take — so every correction is nearly
free now and expensive later.

How to read it: for each block, the narration as drafted (reveal markers
`[[r]]` left in place), the sources relied on, every sentence that is **not**
traceable to a file in `sources/asc842/` marked `UNSOURCED` with what to
verify, and what each reveal marker reveals. Then the same for each question.
The lesson data lives in `src/lesson-01.ts` and `src/questions-01.json`; edit
those files, not this one.

**A source-file problem found while drafting:** `sources/asc842/842-20-30-3.txt`
is mislabeled. Its content is the short-term lease **reassessment** guidance,
but ASU 2021-09 (in `sources/asc842/`, authoritative) amends and quotes
842-20-30-3 in full — it is the **discount rate** paragraph carrying the
risk-free rate election. current-feature.md attributes the reassessment text
to 842-20-25-3. Please confirm the paragraph number against the Codification
and rename the file; the lesson cites it on-screen only as "842-20
(reassessment)" until confirmed. The text itself reads as verbatim
Codification and is treated as authoritative content of unconfirmed number.

Learning objectives (from `src/lesson-01.ts`):

- **lo-1** — Determine whether a lease is short-term at commencement,
  including the effect of renewal options the lessee is reasonably certain to
  exercise.
- **lo-2** — Apply the short-term lease election: recognize lease payments
  straight-line with no right-of-use asset or lease liability, and identify
  the disclosure that remains.
- **lo-3** — Explain that the election is an accounting policy made by class
  of underlying asset and applied to every qualifying lease in the class.
- **lo-4** — Identify the changes in circumstances that end short-term
  treatment and the accounting that follows.

---

## Block 1 — S-01 — Statement — "the problem"

**Narration as drafted**

> Picture a controller with two leases on her desk. The first is a
> [[r]]two-year lease on a copier. The second is a [[r]]month-to-month
> storage unit the company has rented for years. Ask which one is a short
> lease and instinct says both — the copier feels temporary, and the storage
> unit renews thirty days at a time. Under ASC eight forty-two, instinct is
> wrong at least once. The copier lease is not short-term, and the storage
> unit might not be either. [[r]]Short-term is a defined term with a precise
> boundary, and an election hangs on it: the one exception that lets a
> private company keep a lease off the balance sheet entirely. This lesson is
> about where that boundary actually sits.

**Sources**
- `842-20-25-2.txt` — supports only that an election exists and that it is
  the recognition requirements it lifts.

**Flags**
- `UNSOURCED` — "The copier lease is not short-term" rests on the
  twelve-month definition, which is in the Master Glossary, not in
  `sources/`. Verify against the Glossary's "Short-term lease".
- `UNSOURCED` — "the storage unit might not be either" rests on lease-term
  guidance (renewals reasonably certain of exercise) not in `sources/`.
- `UNSOURCED` (interpretive) — "keep a lease off the balance sheet entirely"
  reads 842-20-25-2's "recognition requirements" as the right-of-use asset
  and lease liability. Standard reading, but confirm the phrasing does not
  overpromise (the lease still appears in disclosures — block 4 walks this
  back deliberately).
- "the one exception" — strictly, the only *recognition* exemption for
  lessees in Topic 842; confirm you are comfortable with the superlative.

**Reveals** (3 markers, 3 statement lines)
1. before "two-year" → "A two-year copier lease: not short-term"
2. before "month-to-month" → "A month-to-month storage unit: it depends"
3. before "Short-term" → "“Short” is a defined term, not a feeling"

---

## Block 2 — S-02 — Statement — the definition and the election

**Narration as drafted**

> Start with the definition. A short-term lease is one that, at the
> [[r]]commencement date, has a lease term of twelve months or less — and
> that does not include an option to purchase the underlying asset that the
> lessee is [[r]]reasonably certain to exercise. Both parts matter. A
> nine-month lease with a bargain purchase option the lessee fully intends to
> take is not short-term, no matter how short the term reads. For leases that
> qualify, the standard says: [[r]]a lessee may elect not to apply the
> recognition requirements in this Subtopic to short-term leases. That one
> sentence is the entire exception. Everything else in this lesson is about
> what it includes, and what it quietly leaves out.

**Sources**
- `842-20-25-2.txt`, first sentence — quoted. The narration's quote drops the
  sentence's opening "As an accounting policy," (the policy nature is taught
  in block 5). Source reads: "As an accounting policy, a lessee may elect not
  to apply the recognition requirements in this Subtopic to short-term
  leases."

**Flags**
- `UNSOURCED` — the definition itself (twelve months or less at
  commencement; no purchase option reasonably certain of exercise) is
  drafted from general knowledge of the Master Glossary's "Short-term
  lease", which is not in `sources/`. **Verify the wording against the
  Glossary before generation** — in particular that the definition measures
  the *lease term* at the *commencement date* and that the purchase-option
  clause is part of the definition, not separate guidance.
- `UNSOURCED` — the nine-month bargain-purchase-option example is an
  application of that definition, not sourced text.
- "That one sentence is the entire exception" — rhetorical; the election
  also carries the straight-line recognition sentence (block 4). Accept or
  soften.

**Reveals** (3 markers, 3 statement lines)
1. before "commencement" → "Twelve months or less at commencement"
2. before "reasonably" → "No purchase option reasonably certain of exercise"
3. before "a lessee may elect" → the quoted line "“A lessee may elect not to
   apply the recognition requirements…”"

---

## Block 3 — S-03 — Facts — the lease-term trap

**Narration as drafted**

> Here is the trap. The twelve months are measured against the [[r]]lease
> term, and the lease term is not the stated term. It includes any renewal
> periods the lessee is reasonably certain to exercise. So take a
> [[r]]one-year warehouse lease with four one-year renewal options. If the
> company has built racking into the space, has no alternative site, and
> expects to renew — those renewals are reasonably certain, and the lease
> term is [[r]]five years, at commencement, on day one. Reasonably certain is
> a high threshold, and it considers the economic factors that make renewal
> effectively compelled. The [[r]]month-to-month storage unit from the
> opening is the same question in miniature: rolling renewals the company
> always takes may add up to a term well past twelve months.

**Sources**
- None in `sources/asc842/` cover the lease-term guidance. The whole block is
  drafted from general knowledge, per current-feature.md's instruction not to
  silently skip the topic.

**Flags**
- `UNSOURCED` — the entire block. Fetch the lease-term guidance (believed
  842-10-30-1 through 30-2 and the "reasonably certain" discussion; the
  on-screen citation says "Glossary: Lease Term" and should
  be corrected to whatever the fetched paragraphs support). Verify
  especially: (a) that renewal periods count only when reasonably certain of
  exercise, (b) that the assessment is made at commencement, (c) "high
  threshold" and "economic factors" as fair characterizations, and (d) the
  month-to-month claim — for a true rolling month-to-month with no
  enforceable renewal right the analysis runs through enforceable period /
  economic compulsion, which is subtler than the narration lets on. Soften
  or support before voicing.

**Reveals** (4 markers, 4 facts rows)
1. before "lease term" → row "Stated term: 1 year"
2. before "one-year" → row "Renewal options: 4 × 1 year"
3. before "five years" → row "Reasonably certain to renew?: Yes"
4. before "month-to-month" → row "Lease term: 5 years — not short-term"

Note rows 3 and 4 reveal one beat after the words that name them ("five
years" lands while row 3 appears); scrub the silent render and re-place the
markers if the pairing reads wrong on screen.

---

## Block 4 — S-04 — Statement — what the election gets you

**Narration as drafted**

> So what does the election actually buy. A lessee that elects it
> [[r]]recognizes no right-of-use asset and no lease liability for its
> short-term leases. Instead, the standard says, the lessee recognizes the
> lease payments in profit or loss on a [[r]]straight-line basis over the
> lease term, with variable payments expensed in the period the obligation is
> incurred. For most private companies that is the old, familiar
> operating-lease accounting: rent expense, evenly spread. What the election
> does not buy is silence. [[r]]Short-term lease cost still has to be
> disclosed, so the reader of the financial statements can see the expense
> that never touched the balance sheet. Off the balance sheet is not off the
> books.

**Sources**
- `842-20-25-2.txt`, second sentence — paraphrased closely ("may recognize
  the lease payments in profit or loss on a straight-line basis over the
  lease term and variable lease payments in the period in which the
  obligation for those payments is incurred"), introduced with "the standard
  says".

**Flags**
- `UNSOURCED` (interpretive) — "recognizes no right-of-use asset and no
  lease liability" is the standard reading of "not to apply the recognition
  requirements in this Subtopic"; confirm.
- `UNSOURCED` — "Short-term lease cost still has to be disclosed": the
  disclosure requirement (believed the short-term lease cost line in
  842-20-50, expected 842-20-50-4) is not in `sources/`. **Fetch the
  paragraph**; also verify the carve-out for leases of one month or less, if
  any, does not deserve a mention here.
- "the old, familiar operating-lease accounting" — editorial framing
  (pre-842 ASC 840 operating treatment); accept or cut.

**Reveals** (3 markers, 3 statement lines)
1. before "recognizes" → "No right-of-use asset. No lease liability."
2. before "straight-line" → "Straight-line expense over the lease term"
3. before "Short-term lease cost" → "The disclosure does not go away"

---

## Block 5 — S-05 — Facts — election by class

**Narration as drafted**

> The election is not made lease by lease. The standard says the accounting
> policy election shall be made by [[r]]class of underlying asset to which
> the right of use relates. A class is a grouping of assets with a similar
> nature and use in the business — [[r]]vehicles, say, or office equipment,
> or real estate. Electing for a class is an [[r]]accounting policy, which
> means consistency: within that class, every lease that qualifies as
> short-term gets the election, and every lease that does not qualify goes on
> the balance sheet. What you cannot do is [[r]]pick favorites — take the
> election for the delivery van you would rather not capitalize, while
> recognizing the identical van leased by another branch.

**Sources**
- `842-20-25-2.txt`, third sentence — quoted nearly verbatim ("The
  accounting policy election for short-term leases shall be made by class of
  underlying asset to which the right of use relates."), introduced with
  "the standard says".
- `ASU_2021-09.txt`, Basis for Conclusions — supports treating "real estate"
  and lower-value asset groupings as examples of asset classes (the BC
  discussion of the by-class risk-free rate election), i.e. weak support for
  the examples, not for a definition.

**Flags**
- `UNSOURCED` — "a grouping of assets with a similar nature and use in the
  business": Topic 842 does not define "class" in the provided sources.
  Verify the characterization (the phrase echoes the disclosure guidance's
  by-class language) or soften to "the standard leaves class to judgment".
- `UNSOURCED` (interpretive) — the all-or-nothing consequence ("every lease
  that qualifies... gets the election") is inferred from "accounting policy
  election... by class"; it is the accepted reading but no sourced sentence
  states it. The "pick favorites" example is illustration.

**Reveals** (4 markers, 4 facts rows)
1. before "class" → row "Election made by: Class of underlying asset"
2. before "vehicles" → row "Kind of election: Accounting policy"
3. before "accounting policy" → row "Within a class: Every qualifying lease, or none"
4. before "pick favorites" → row "Example classes: Vehicles · Equipment · Real estate"

Note the row order and the marker order intentionally differ (the row list
reads as a table, the narration as an argument); rows 2–4 therefore reveal
slightly out of step with the words. If that bothers the eye in the silent
render, reorder the rows to: class · examples · policy · every-or-none.

---

## Block 6 — S-06 — Statement — when the facts change

**Narration as drafted**

> Short-term status is not permanent. Two changes end it. If the [[r]]lease
> term changes so that it now extends more than twelve months past the end of
> the previously determined term — the six-month lease that gets an
> eighteen-month extension — the lease no longer meets the definition. And if
> a [[r]]purchase option the lessee holds becomes reasonably certain of
> exercise, same result. When either happens, the guidance sends you back to
> the beginning: the lessee applies the rest of the Topic [[r]]as if the date
> of the change in circumstances were the commencement date. In practice that
> means measuring and recognizing a right-of-use asset and lease liability on
> that date, using the facts as they stand then. The election defers the
> accounting; it cannot outrun the facts.

**Sources**
- `842-20-30-3.txt` (**mislabeled — see the note at the top**): the
  reassessment text, paraphrased closely. Source: "If the lease term or the
  assessment of a lessee option to purchase the underlying asset changes such
  that, after the change, the remaining lease term extends more than 12
  months from the end of the previously determined lease term or the lessee
  is reasonably certain to exercise its option to purchase the underlying
  asset, the lease no longer meets the definition of a short-term lease and
  the lessee shall apply the remainder of the guidance in this Topic as if
  the date of the change in circumstances is the commencement date."

**Flags**
- **Confirm the paragraph number** (expected 842-20-25-3 per
  current-feature.md) and rename the source file; then set this block's
  on-screen citation (currently "842-20 (reassessment)") to the real
  number.
- `UNSOURCED` (interpretive) — "measuring and recognizing a right-of-use
  asset and lease liability on that date, using the facts as they stand
  then" spells out what "apply the remainder of the guidance... as if the
  date of the change... is the commencement date" means in practice. Confirm.
- The six-month/eighteen-month example is illustration; check it against the
  source's trigger (remaining term extending more than twelve months past
  the end of the *previously determined* term — the example clears it, but
  confirm the phrasing "extends more than twelve months past the end of the
  previously determined term" matches how you read the paragraph).

**Reveals** (3 markers, 3 statement lines)
1. before "lease term" → "Extended past twelve months → no longer short-term"
2. before "purchase option" → "Purchase option becomes reasonably certain → same result"
3. before "as if" → "Account as if the change date were commencement"

---

## Block 7 — S-07 — Calc — the worked example

**Narration as drafted**

> Now the same lease, both ways. A [[r]]forklift, leased for twelve months at
> two thousand dollars a month — twenty-four thousand dollars over the term,
> no renewal options, no purchase option. [[r]]With the election, the balance
> sheet shows nothing, and rent expense runs two thousand dollars a month,
> straight-line. [[r]]Without the election, the company discounts the
> payments — at, say, five percent, roughly twenty-three thousand four
> hundred dollars — and records that amount as both a lease liability and a
> right-of-use asset, which then unwind over the year. Here is the part worth
> remembering: for an operating lease, [[r]]total expense is twenty-four
> thousand dollars either way, and even the monthly pattern matches. The
> election does not change earnings. It spares a private company the
> discounting, the schedules, and the balance-sheet gross-up for a lease that
> will be gone in a year.

**Sources**
- `842-20-25-2.txt` — the elected side (straight-line expense).
- The unelected side is general Topic 842 lessee measurement, not in
  `sources/`.

**Flags**
- `UNSOURCED` (arithmetic) — the present value: 12 monthly payments of
  $2,000 in arrears at 5% annual (0.41667% monthly) ≈ $23,362, narrated as
  "roughly twenty-three thousand four hundred" and shown as "≈ $23,400".
  **Check the arithmetic and the payment-timing assumption**; payments in
  advance give ≈ $23,459. The figure is deliberately approximate on screen.
- `UNSOURCED` — "even the monthly pattern matches": rests on the operating
  lease single straight-line lease cost model (interest-plus-amortization
  presented as one straight-line lease cost). True for an operating lease,
  **not** for a finance lease — the narration pins it to "for an operating
  lease", but verify the supporting paragraph and that no simplification
  here misleads.
- "It spares a private company the discounting…" — editorial; the same is
  true of public companies, the course frame is private-company practice.
  Accept or generalize.

**Reveals** (4 markers, 8 calc rows — rows without their own marker appear
with the last marked one)
1. before "forklift" → rows "Forklift lease: 12 months × $2,000" and "Total
   payments: $24,000"
2. before "With the election" → rows "Elected — balance sheet: $0" and
   "Elected — monthly expense: $2,000 straight-line"
3. before "Without the election" → rows "Not elected — lease liability:
   ≈ $23,400 (PV at 5%)" and "Not elected — ROU asset: ≈ $23,400"
4. before "total expense" → rows "Not elected — monthly lease cost: $2,000"
   and "Total expense, either way: $24,000" (flag-pink emphasis)

---

## Block 8 — S-08 — List — three things to check

**Narration as drafted**

> Three things to check before calling a lease short-term. [[r]]First, the
> lease term: twelve months or less at commencement — counting every renewal
> period the lessee is reasonably certain to exercise, which is where the
> month-to-month arrangements and the optioned warehouses fail. [[r]]Second,
> purchase options: if the lessee is reasonably certain to buy the asset, the
> lease is not short-term at any length. [[r]]Third, the election itself: it
> is a policy, made by class of underlying asset, and it carries every
> qualifying lease in the class with it. Check all three at commencement, and
> keep watching afterward — because an extension or a change of heart about
> an option ends the exception, and the balance sheet catches up on the day
> the facts change.

**Sources**
- Summary of blocks 2, 3, 5, and 6; per-claim sourcing as flagged there
  (`842-20-25-2.txt` for the election and by-class points; the definition,
  lease-term, and reassessment points inherit the earlier flags).

**Flags**
- Inherits every unresolved flag from blocks 2, 3, and 6. Nothing new is
  asserted here; if an earlier block's claim changes at review, re-read this
  block for consistency.

**Reveals** (3 markers, 3 list items)
1. before "First" → item "Lease term ≤ 12 months at commencement — renewals included"
2. before "Second" → item "No purchase option reasonably certain of exercise"
3. before "Third" → item "Election covers the whole class of underlying asset"

---

# Questions

Shape notes: five review questions (each placed after the narrated block it
tests, `after_block` counted over narrated blocks 1–8) and three assessment
questions (four choices each, no true/false framing). Feedback follows
5.01.2.2: why the right answer is right, what misunderstanding each wrong
answer reflects, and — for review questions — the block to re-study. Each
question in `src/questions-01.json` carries a `_source` comment key; the
validator tolerates unknown keys (feature 01).

**q-01 · review · after block 2 · tests lo-1.** Nine-month lease with a
bargain purchase option → not short-term. Source: the two-part definition
(`UNSOURCED` — Master Glossary, same flag as block 2) plus
`842-20-25-2.txt` for the election's existence. Distractor (a) is the
term-only shortcut, (c) confuses classification with the short-term test,
(d) is a category error.

**q-02 · review · after block 3 · tests lo-1.** One-year lease, four
renewals reasonably certain → five-year lease term. Source: `UNSOURCED` —
the lease-term guidance, same flag as block 3; verify with the fetched
paragraphs before generation. Distractor (c) tests
commencement-vs-retrospective, which the fetched text must actually support.

**q-03 · review · after block 4 · tests lo-2.** Straight-line expense plus
disclosure. Source: `842-20-25-2.txt` for recognition; `UNSOURCED` — the
disclosure half, same flag as block 4.

**q-04 · review · after block 5 · tests lo-3.** By class, not lease-by-lease
and not entity-wide. Source: `842-20-25-2.txt` final sentence. Distractor (d)
(entity-wide) is the overshoot the by-class language rules out.

**q-05 · review · after block 6 · tests lo-4.** Mid-term two-year extension →
apply guidance as if the change date were commencement. Source:
`842-20-30-3.txt` content (paragraph number to confirm — same flag as block
6). Distractor (c) (restatement) turns on the prospective reading — confirm
it against the fetched paragraph.

**q-06 · assessment · tests lo-1.** Six months plus a reasonably certain
six-month renewal = twelve months, which still qualifies ("twelve months or
less"). Sources: the boundary is the Glossary definition (`UNSOURCED`, block
2 flag); renewal counting is the lease-term guidance (`UNSOURCED`, block 3
flag). **Note:** this question's correct answer depends on "or less" being
inclusive of exactly twelve months — verify the Glossary wording before
generation, since the definition is not in `sources/`.

**q-07 · assessment · tests lo-2.** The election changes the balance sheet,
not total expense or the straight-line pattern, for an operating lease.
Sources: `842-20-25-2.txt` for the elected side; the pattern-matching claim
inherits block 7's `UNSOURCED` flag (operating-lease single lease cost).

**q-08 · assessment · tests lo-4.** Purchase option becoming reasonably
certain ends short-term treatment; variable-payment changes, lessor changes,
and policy widening do not. Source: `842-20-30-3.txt` content (paragraph
number to confirm). The variable-payments distractor also leans on
`842-20-25-2.txt`'s variable-payment sentence.

---

## Sources still needed

1. **ASC 842 Master Glossary, "Short-term lease"** — the definition itself
   (twelve months or less at commencement; purchase option clause). Blocks
   1, 2, 8; questions q-01, q-06 (including whether exactly twelve months
   qualifies).
2. **Lease term guidance** (believed 842-10-30-1 through 30-2 — verify
   numbers) — renewal periods reasonably certain of exercise, assessed at
   commencement; the "reasonably certain" threshold and its economic
   factors. Blocks 3, 8; questions q-02, q-06.
3. **The short-term lease cost disclosure paragraph in 842-20-50** (expected
   842-20-50-4). Block 4; question q-03. Also check whether a
   one-month-or-less nuance deserves mention.
4. **Confirmation of the reassessment paragraph number** (expected
   842-20-25-3; text currently in the mislabeled `842-20-30-3.txt`) — then
   rename the file, fix `sources/asc842/INDEX.md`, and put the real number in
   block 6's citation and `meta.sources`. Block 6; questions q-05, q-08.
5. **Operating lease single straight-line lease cost** (the
   subsequent-measurement paragraph behind block 7's "the monthly pattern
   matches") — needed to keep the worked example honest.
6. **Any definitional support for "class of underlying asset"** — or soften
   block 5's "similar nature and use" line to explicit judgment.
