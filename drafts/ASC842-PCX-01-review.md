# ASC842-PCX-01 — The Short-Term Lease Exception — reviewer's document

This is the document a licensed CPA reads **before any narration audio is
generated**. Once a block is voiced, changing one sentence costs an ElevenLabs
regeneration and produces a different take — so every correction is nearly
free now and expensive later.

How to read it: for each block, the narration as drafted (reveal markers
`[[r]]` left in place), the sources relied on with the specific paragraph,
and what each reveal marker reveals. Then the same for each question. The
lesson data lives in `src/lesson-01.ts` and `src/questions-01.json`; edit
those files, not this one.

**Status, third pass (2026-08-27) — CPA review complete.** The reviewer
worked through the second pass's twelve judgment items (J1–J12): five were
resolved by narration edits applied in this pass (J1, J3, J4, J5, J11), and
seven were accepted as drafted (J2, J6, J7, J8, J9, J10, J12). The judgment
list at the bottom is **closed**; the Resolution log records every change.
Word counts, `estimatedSeconds`, and fallback `reveals` were recomputed for
the six edited blocks; `npm run check`: 0 errors, 0 warnings; lesson total
8m05s estimated. The remaining human steps are LESSON-RUNBOOK.md's: generate,
listen, render, export.

Earlier passes: the first draft carried 13 UNSOURCED flags; the source
directory was then completed (see `sources/asc842/INDEX.md`, including the
confirmed rename of the reassessment paragraph to `842-20-25-3.txt`) and the
second pass resolved every flag by citation or rewrite.

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

**Narration as drafted** (edited in the third pass — see Resolution log)

> Picture a controller with two leases on her desk. The first is a
> [[r]]two-year lease on a copier. The second is a [[r]]one-year lease on a
> delivery van, with three one-year renewal options the company always
> takes. Ask which one is a short lease and instinct says both — the copier
> feels temporary, and the van renews one year at a time. Under ASC eight
> forty-two, instinct is wrong at least once. The copier lease is not
> short-term, and the van might not be either. [[r]]Short-term is a defined
> term with a precise boundary, and an election hangs on it: the one
> exception that lets a lessee keep a lease off the balance sheet entirely.
> This lesson is about where that boundary actually sits.

**Sources**
- `glossary-short-term-lease.txt` — "The copier lease is not short-term": a
  two-year lease term exceeds "12 months or less" (application).
- `842-10-30-1.txt` (item (a)) / `842-10-30-2.txt` — "the van might not be
  either": renewal-option periods count toward the lease term when the
  lessee is reasonably certain to exercise them, and this company "always
  takes" them (application; taught in full in block 3).
- `842-20-25-2.txt` — the election exists and lifts the recognition
  requirements. "The one exception" accepted by the reviewer as shorthand
  for the only lessee recognition exemption in Topic 842 (J1 note below).
- ASU 2016-02 Section A, 842-20-25-1 as issued ("At the commencement date, a
  lessee shall recognize a right-of-use asset and a lease liability") — the
  recognition requirement 842-20-25-2 waives is the balance-sheet
  recognition, supporting "keep a lease off the balance sheet".

**Reveals** (3 markers, 3 statement lines)
1. before "two-year" → "A two-year copier lease: not short-term"
2. before "one-year" → "A one-year van lease with renewals: it depends"
3. before "Short-term" → "“Short” is a defined term, not a feeling"

---

## Block 2 — S-02 — Statement — the definition and the election

**Narration as drafted** (edited in the third pass — "bargain" removed)

> Start with the definition. A short-term lease is one that, at the
> [[r]]commencement date, has a lease term of twelve months or less — and
> that does not include an option to purchase the underlying asset that the
> lessee is [[r]]reasonably certain to exercise. Both parts matter. A
> nine-month lease with a purchase option the lessee fully intends to take
> is not short-term, no matter how short the term reads. For leases that
> qualify, the standard says: [[r]]a lessee may elect not to apply the
> recognition requirements in this Subtopic to short-term leases. That one
> sentence is the entire exception. Everything else in this lesson is about
> what it includes, and what it quietly leaves out.

**Sources**
- `glossary-short-term-lease.txt` — the definition, tracked nearly verbatim:
  "A lease that, at the commencement date, has a lease term of 12 months or
  less and does not include an option to purchase the underlying asset that
  the lessee is reasonably certain to exercise." The nine-month example is
  an application of the second clause; the reviewer removed "bargain" so the
  example turns on intent to exercise, matching the glossary, rather than on
  pricing.
- `842-20-25-2.txt`, first sentence — quoted. The narration's quote drops the
  sentence's opening "As an accounting policy," (the policy nature is taught
  in block 5). "That one sentence is the entire exception" accepted as
  drafted (J2).

**Reveals** (3 markers, 3 statement lines)
1. before "commencement" → "Twelve months or less at commencement"
2. before "reasonably" → "No purchase option reasonably certain of exercise"
3. before "a lessee may elect" → the quoted line "“A lessee may elect not to
   apply the recognition requirements…”"

---

## Block 3 — S-03 — Facts — the lease-term trap

**Narration as drafted** (edited in the third pass — termination-option
sentence added, closing example replaced)

> Here is the trap. The twelve months are measured against the [[r]]lease
> term, and the lease term is not the stated term. It is the noncancellable
> period plus any renewal periods the lessee is reasonably certain to
> exercise. By the same logic, it includes periods after a termination
> option the lessee is reasonably certain not to take. So take a
> [[r]]one-year warehouse lease with four one-year renewal options. If the
> company has built racking into the space, has no alternative site, and
> expects to renew — those renewals are reasonably certain, and the lease
> term is [[r]]five years, at commencement, on day one. Reasonably certain
> is judged by the economic incentives to renew — contract-based,
> asset-based, entity-based, and market-based factors, considered together,
> with no single factor deciding it. The [[r]]delivery van from the opening
> is the same arithmetic: one year plus three renewals the company always
> takes is a four-year lease term, not a short one.

**Sources**
- `842-10-30-1.txt` — "the noncancellable period plus any renewal periods the
  lessee is reasonably certain to exercise" tracks the paragraph's stem and
  item (a); the new sentence "periods after a termination option the lessee
  is reasonably certain not to take" tracks item (b) ("[p]eriods covered by
  an option to terminate the lease if the lessee is reasonably certain not
  to exercise that option"). Item (c) (lessor-controlled options) remains
  untaught — accepted scope for lesson 1.
- `842-10-30-2.txt` — "at commencement" and the factor sentence: "having
  considered all relevant factors that create an economic incentive for the
  lessee (that is, contract-based, asset-based, entity-based, and
  market-based factors). Those factors shall be considered together, and the
  existence of any one factor does not necessarily signify…". The racking /
  no-alternative-site example illustrates asset-based and entity-based
  incentives (application).
- The delivery-van closing is an application of 30-1(a): one noncancellable
  year plus three reasonably certain one-year renewals is a four-year lease
  term.

**Reveals** (4 markers, 4 facts rows)
1. before "lease term" → row "Stated term: 1 year"
2. before "one-year" → row "Renewal options: 4 × 1 year"
3. before "five years" → row "Reasonably certain to renew?: Yes"
4. before "delivery van" → row "Lease term: 5 years — not short-term"

Note rows 3 and 4 reveal one beat after the words that name them ("five
years" lands while row 3 appears); scrub the silent render and re-place the
markers if the pairing reads wrong on screen.

---

## Block 4 — S-04 — Statement — what the election gets you

**Narration as drafted** (edited in the third pass — one-month carve-out
added)

> So what does the election actually buy. A lessee that elects it
> [[r]]recognizes no right-of-use asset and no lease liability for its
> short-term leases. Instead, the standard says, the lessee recognizes the
> lease payments in profit or loss on a [[r]]straight-line basis over the
> lease term, with variable payments expensed in the period the obligation is
> incurred. For most private companies that is the old, familiar
> operating-lease accounting: rent expense, evenly spread. What the election
> does not buy is silence. [[r]]Short-term lease cost still has to be
> disclosed — leases of a month or less aside — so the reader of the
> financial statements can see the expense that never touched the balance
> sheet. Off the balance sheet is not off the books.

**Sources**
- `842-20-25-2.txt`, second sentence — paraphrased closely ("may recognize
  the lease payments in profit or loss on a straight-line basis over the
  lease term and variable lease payments in the period in which the
  obligation for those payments is incurred"), introduced with "the standard
  says".
- ASU 2016-02 Section A, 842-20-25-1 as issued — the "recognition
  requirements in this Subtopic" that 25-2 waives are the commencement-date
  recognition of a right-of-use asset and a lease liability; 25-1 immediately
  precedes 25-2 in the same recognition section. Supports "recognizes no
  right-of-use asset and no lease liability".
- `842-20-50-4.txt`, item (c) — "Short-term lease cost, excluding expenses
  relating to leases with a lease term of one month or less, determined in
  accordance with paragraph 842-20-25-2." Supports both the disclosure claim
  and the new "leases of a month or less aside" carve-out.
- "the old, familiar operating-lease accounting" accepted as drafted (J6).

**Reveals** (3 markers, 3 statement lines)
1. before "recognizes" → "No right-of-use asset. No lease liability."
2. before "straight-line" → "Straight-line expense over the lease term"
3. before "Short-term lease cost" → "The disclosure does not go away"

---

## Block 5 — S-05 — Facts — election by class

**Narration as drafted** (unchanged in the third pass)

> The election is not made lease by lease. The standard says the accounting
> policy election shall be made by [[r]]class of underlying asset to which
> the right of use relates. Class itself is not defined, so it is read at
> face value — assets of a similar nature and use: [[r]]vehicles, say, or
> office equipment, or real estate. Electing for a class is an
> [[r]]accounting policy, which means consistency: within that class, every
> lease that qualifies as short-term gets the election, and every lease that
> does not qualify goes on the balance sheet. What you cannot do is
> [[r]]pick favorites — take the election for the delivery van you would
> rather not capitalize, while recognizing the identical van leased by
> another branch.

**Sources**
- `842-20-25-2.txt`, third sentence — quoted nearly verbatim ("The accounting
  policy election for short-term leases shall be made by class of underlying
  asset to which the right of use relates."), introduced with "the standard
  says".
- "Class itself is not defined, so it is read at face value — assets of a
  similar nature and use" — per `INDEX.md`'s note: the phrase has no glossary
  entry, and the narration says so instead of promising a definition.
- `ASU_2021-09.txt`, Basis for Conclusions — treats "real estate" and
  lower-value asset groupings as example asset classes in its by-class
  discussion; weak support for the vehicles / equipment / real estate
  examples.
- The all-or-nothing reading of a by-class policy election ("every lease
  that qualifies… gets the election") confirmed by the reviewer (J7).

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

**Narration as drafted** (unchanged in the third pass)

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
- `842-20-25-3.txt` — paraphrased closely; both triggers and the
  as-if-commencement consequence come straight from the paragraph. The
  six-month/eighteen-month example is an application of the "remaining lease
  term extends more than 12 months from the end of the previously determined
  lease term" trigger.
- ASU 2016-02 Section A, 842-20-25-1 as issued — "measuring and recognizing a
  right-of-use asset and lease liability on that date" is what applying the
  Topic from a new commencement date entails; reading confirmed by the
  reviewer (J8).

**Reveals** (3 markers, 3 statement lines)
1. before "lease term" → "Extended past twelve months → no longer short-term"
2. before "purchase option" → "Purchase option becomes reasonably certain → same result"
3. before "as if" → "Account as if the change date were commencement"

---

## Block 7 — S-07 — Calc — the worked example

**Narration as drafted** (edited in the third pass — "a private company" →
"a lessee")

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
> election does not change earnings. It spares a lessee the discounting, the
> schedules, and the balance-sheet gross-up for a lease that will be gone in
> a year.

**Sources**
- `842-20-25-2.txt` — the elected side (straight-line expense).
- ASU 2016-02 Section A, 842-20-25-1 as issued — the unelected side's
  recognition of a lease liability and right-of-use asset.
- `842-20-30-3.txt` — "the company discounts the payments": implicit rate if
  readily determinable, else incremental borrowing rate, with the risk-free
  rate election available to non-PBEs (the 5% here is illustrative; the
  paragraph is lesson 2's subject).
- `842-20-25-6.txt`, item (a) — "even the monthly pattern matches": the
  unelected operating lease recognizes a single lease cost allocated over the
  lease term on a straight-line basis, so both sides show $2,000 a month.
  Reliance on the default straight-line basis (carve-outs don't bite on this
  plain fact pattern) confirmed by the reviewer (J9).
- The illustrative arithmetic — ≈$23,362 at 5% annual in arrears, shown and
  narrated as "≈ $23,400" — blessed by the reviewer (J10).

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

**Narration as drafted** (edited in the third pass — example swap)

> Three things to check before calling a lease short-term. [[r]]First, the
> lease term: twelve months or less at commencement — counting every renewal
> period the lessee is reasonably certain to exercise, which is where the
> delivery van and the optioned warehouse fail. [[r]]Second, purchase
> options: if the lessee is reasonably certain to buy the asset, the lease
> is not short-term at any length. [[r]]Third, the election itself: it is a
> policy, made by class of underlying asset, and it carries every qualifying
> lease in the class with it. Check all three at commencement, and keep
> watching afterward — because an extension or a change of heart about an
> option ends the exception, and the balance sheet catches up on the day the
> facts change.

**Sources**
- Summary block; every claim restates an earlier block and carries that
  block's source: the definition (`glossary-short-term-lease.txt`, block 2),
  renewal counting and the van/warehouse examples (`842-10-30-1.txt` /
  `842-10-30-2.txt`, blocks 1 and 3), the by-class policy
  (`842-20-25-2.txt`, block 5), and the two reassessment triggers
  (`842-20-25-3.txt`, block 6).

**Reveals** (3 markers, 3 list items)
1. before "First" → item "Lease term ≤ 12 months at commencement — renewals included"
2. before "Second" → item "No purchase option reasonably certain of exercise"
3. before "Third" → item "Election covers the whole class of underlying asset"

---

# Questions

Shape notes: five review questions (each placed after the narrated block it
tests, `after_block` counted over narrated blocks 1–8) and three assessment
questions (four choices each, no true/false framing). Feedback follows
5.01.2.2. Each question in `src/questions-01.json` carries a `_source`
comment key naming its files; the validator tolerates unknown keys
(feature 01). No question used the retired storage-unit example, so none
changed in the third pass. (q-01's scenario keeps "at a bargain price" as a
reason the lessee intends to exercise — the definition turns on intent, and
the stem states the intent explicitly.)

**q-01 · review · after block 2 · tests lo-1.** Nine-month lease with a
purchase option the company intends to exercise → not short-term. Sources:
`glossary-short-term-lease.txt` (both parts of the definition),
`842-20-25-2.txt`. Distractor (a) is the term-only shortcut, (c) confuses
classification with the short-term test, (d) is a category error.

**q-02 · review · after block 3 · tests lo-1.** One-year lease, four
renewals reasonably certain → five-year lease term. Sources:
`842-10-30-1.txt` (renewal periods count when reasonably certain),
`842-10-30-2.txt` ("At the commencement date" — supports rejecting
distractor (c)'s reassess-later reading).

**q-03 · review · after block 4 · tests lo-2.** Straight-line expense plus
disclosure. Sources: `842-20-25-2.txt` (recognition), `842-20-50-4.txt`
item (c) (disclosure).

**q-04 · review · after block 5 · tests lo-3.** By class, not lease-by-lease
and not entity-wide. Source: `842-20-25-2.txt` final sentence; the "every
qualifying lease in the class" phrasing is the by-class policy reading the
reviewer confirmed (J7).

**q-05 · review · after block 6 · tests lo-4.** Mid-term two-year extension →
apply guidance as if the change date were commencement. Source:
`842-20-25-3.txt`. Distractor (c) (restatement) turns on the paragraph's
prospective "as if… commencement date" language.

**q-06 · assessment · tests lo-1.** Six months plus a reasonably certain
six-month renewal = twelve months, which still qualifies. Sources:
`glossary-short-term-lease.txt` — "12 months **or less**", so exactly twelve
qualifies; `842-10-30-1.txt` for counting the renewal.

**q-07 · assessment · tests lo-2.** The election changes the balance sheet,
not total expense or the straight-line pattern, for an operating lease.
Sources: `842-20-25-2.txt` (elected side), `842-20-25-6.txt` item (a)
(single straight-line lease cost when not elected). The dollar figures are
the blessed illustrative arithmetic (J10).

**q-08 · assessment · tests lo-4.** Purchase option becoming reasonably
certain ends short-term treatment; variable-payment changes, lessor changes,
and policy widening do not. Sources: `842-20-25-3.txt` (the two triggers);
`842-20-25-2.txt` (variable payments expensed as incurred, behind
distractor (b)).

---

## Resolution log

**Third pass (2026-08-27) — CPA review.** Six blocks edited on the
reviewer's instructions; timings recomputed (block 1: 124 words/57s,
block 2: 116/54, block 3: 156/72, block 4: 123/57, block 7: 140/65,
block 8: 124/57; lesson total 8m05s estimated). `npm run check`: 0 errors,
0 warnings.

- **J1 / J11 (blocks 1, 7):** "a private company" → "a lessee" in both
  spots — the exception and its relief are not private-company-specific,
  though the course frame is.
- **Block 2:** "a bargain purchase option" → "a purchase option" — the
  glossary turns on reasonably certain exercise, not pricing.
- **J3 (block 3):** added "By the same logic, it includes periods after a
  termination option the lessee is reasonably certain not to take."
  (842-10-30-1(b)). Lessor-controlled options (item (c)) stay out of scope.
- **J4 (blocks 1, 3, 8):** the month-to-month storage unit example was
  retired as wrong on the reviewer's analysis: under 842-10-30-1 a true
  month-to-month that either party can end without penalty has a one-month
  noncancellable lease term — it IS short-term — so the example undercut the
  point. Replaced with a delivery van on a one-year lease with three
  one-year renewal options the company always takes (a four-year lease term
  under 30-1(a)). Block 1's second slide line is now "A one-year van lease
  with renewals: it depends"; markers stay on each example's first word.
- **J5 (block 4):** the disclosure sentence now carries the 50-4(c)
  carve-out: "— leases of a month or less aside —".
- **Accepted as drafted:** J2 ("the entire exception" rhetoric), J6
  ("old, familiar operating-lease accounting"), J7 (all-or-nothing by-class
  reading), J8 (as-if-commencement means recognizing the ROU asset and
  liability that day), J9 (default straight-line basis in the worked
  example), J10 ("≈ $23,400" blessed), J12 (voice and examples).

**Second pass (2026-08-27).** All 13 first-draft UNSOURCED flags resolved
against the completed source set — citation where a paragraph supports the
sentence, rewrite where none did:

- **Block 3, removed:** "Reasonably certain is a high threshold, and it
  considers the economic factors that make renewal effectively compelled."
  (Basis-for-Conclusions language, not in `sources/`.) Replaced with the
  842-10-30-2 factor language; "It includes any renewal periods…" tightened
  to "It is the noncancellable period plus any renewal periods…" per
  842-10-30-1.
- **Block 5, replaced:** "A class is a grouping of assets with a similar
  nature and use in the business" promised a definition the Codification
  does not give (per `INDEX.md`). Now: "Class itself is not defined, so it
  is read at face value — assets of a similar nature and use."
- **Citations** moved to the real paragraph numbers throughout (block 6 →
  842-20-25-3 after the reviewer's file-rename confirmation); `meta.sources`
  lists all seven citations; question `_source` keys point at the actual
  files.

## Judgment list — CLOSED

All twelve items (J1–J12) were dispositioned by the reviewer on 2026-08-27:
J1, J3, J4, J5, and J11 resolved by the third-pass edits above; J2, J6, J7,
J8, J9, J10, and J12 accepted as drafted. Nothing on this lesson awaits a
source lookup or a judgment call. Next steps are the runbook's: dry-run,
silent scrub, then `npm run generate -- --lesson 01` (human step — spends
credits), listen, render, export.

---

## Third addendum (2026-08-27) — q-09, the fourth assessment question

Feature 04 applies course-level question rules that superCPE 007 will
enforce, the first of which requires **four assessment questions per lesson,
each mapped to a different objective**, so every objective is measured. This
lesson's three assessment questions covered lo-1 (q-06), lo-2 (q-07), and
lo-4 (q-08); **lo-3 — the by-class policy objective — was unmeasured.**
q-09 closes the gap. Nothing else changed: no narration, no slides, no audio
— `questions-01.json` alone, so export produces a new content hash (version
3 on upload) over the identical video. `meta.status` stays `"reviewed"`; the
CPA's pass over this addendum is the review of the one new question.

**q-09 · assessment · tests lo-3.** A lessee elects short-term for its
office-equipment class but not its real-estate class; within the elected
class the election applies to every lease that meets the short-term
definition. Sources: `842-20-25-2.txt` final sentence (accounting policy by
class); the "every qualifying lease in the class" reading is the
reviewer-confirmed J7 interpretation. Distractor (b) is the lease-by-lease
designation error, (c) forgets the election never reaches leases outside
the definition, (d) inflates by-class into entity-wide. Feedback names
block 5 (S-05) for re-study, per 5.01.2.2.

Stem-duplication note (course rule 2): q-04 (review) also tests lo-3, from
the pick-favorites-within-a-class angle; q-09 asks from the
class-versus-class angle with a different fact pattern and different
wording. `npm run check`'s course-wide duplicate-stem check (lowercased,
whitespace collapsed, trailing punctuation stripped) passes.

### Judgment item — OPEN

- **J13 (q-09).** Confirm the new question: (a) that its correct answer's
  phrasing "every office-equipment lease that meets the short-term
  definition" cannot be read as making the election mandatory rather than a
  policy the lessee has already made; (b) that distractor (c) is cleanly
  wrong (the election "applying" to an over-twelve-month lease is
  impossible, not merely disfavored); and (c) that q-09 and q-04 are far
  enough apart to satisfy the ask-it-differently rule in substance, not just
  after normalization. J1–J12 remain closed; J13 is the only open item on
  this lesson.
