# ASC842-PCX-04 — Common Control Arrangements — reviewer's document

This is the document a licensed CPA reads **before any narration audio is
generated**. Once a block is voiced, changing one sentence costs an ElevenLabs
regeneration and produces a different take — so every correction is nearly
free now and expensive later.

How to read it: for each block, the narration as drafted (reveal markers
`[[r]]` left in place), the sources relied on with the specific paragraph,
and what each reveal marker reveals. Then the same for each question. The
lesson data lives in `src/lesson-04.ts` and `src/questions-04.json`; edit
those files, not this one.

**Status, first draft (2026-08-27).** Unreviewed and unvoiced. **0 UNSOURCED
flags** — every claim traces to `842-10-15-3A.txt`, `842-20-35-12A.txt`, or
`ASU_2023-01.txt` (all authoritative; quote from the PDF where exact wording
matters, per `INDEX.md`) — but the open judgment list (J1–J8) includes two
quote-compression calls the reviewer should weigh. `meta.status` is
`"draft"`; export refuses it.

Learning objectives (from `src/lesson-04.ts`):

- **lo-1** — Determine whether an entity is eligible for the practical
  expedient in 842-10-15-3A and apply written terms and conditions to decide
  whether a common control arrangement is or contains a lease.
- **lo-2** — Apply the expedient's limits: the practical rather than
  enforceable right to control, the arrangement-by-arrangement election, and
  the consequence of having no written terms.
- **lo-3** — Apply 842-20-35-12A: amortize leasehold improvements in a
  common control lease over their useful life to the common control group
  while the lessee controls the use of the underlying asset, for any entity.
- **lo-4** — Determine the accounting when the lessee no longer controls the
  underlying asset — a transfer through an adjustment to equity — and the
  disclosures required while useful life exceeds the lease term.

---

## Block 1 — S-01 — Statement — "the problem"

**Narration as drafted**

> Last lesson, and the most family-shaped problem in the course. The owner of
> a company also owns an [[r]]LLC, the LLC owns the building, and the
> operating company uses it — on a handshake, the way related parties
> actually deal. The operating company has also just spent real money on
> [[r]]leasehold improvements: a new roof, a built-out shop floor. Two
> questions follow, and the old guidance answered both badly. [[r]]Is this
> arrangement even a lease — when the terms live in a conversation, and the
> one owner on both sides could change them tomorrow? And if it is, over what
> life do those improvements depreciate — the paper lease term, or the years
> the group will actually use them? A twenty twenty-three amendment answers
> both, and this lesson closes the course with it.

**Sources**
- `ASU_2023-01.txt` Summary — the two issues, verbatim in structure: terms
  and conditions to be considered (Issue 1), accounting for leasehold
  improvements (Issue 2).
- BC13–BC14 — "the arrangements are generally controlled entirely by one
  party", terms "often are unwritten or lack sufficient detail", the common
  owner "typically can amend the terms and conditions of an arrangement at
  any time": behind "terms live in a conversation" and "could change them
  tomorrow".
- BC24 — short common control lease terms with improvements whose useful
  life "far exceeds the lease term": behind the second question.
- "the old guidance answered both badly" is editorial framing of the
  stakeholder concerns the ASU records; confirm tone (J6).

**Reveals** (3 markers, 3 statement lines)
1. before "LLC" → "One owner, two entities, one building"
2. before "leasehold improvements" → "Real money in leasehold improvements"
3. before "Is this arrangement" → "Is it a lease — and over what life do improvements amortize?"

---

## Block 2 — S-02 — Statement — Issue 1: the written-terms expedient

**Narration as drafted**

> Issue one: what counts as a lease between related parties. The standard
> says: as a practical expedient, an entity may use the [[r]]written terms
> and conditions of a related party arrangement between entities under common
> control to determine whether that arrangement is or contains a lease — and,
> if it does, classify and account for it on the basis of those written
> terms. The eligible entities are the private ones: [[r]]not public business
> entities, not conduit bond obligor not-for-profits, and not employee
> benefit plans that file with the S-E-C. What the expedient removes is
> [[r]]enforceability: the question becomes whether the written terms convey
> the practical — as opposed to enforceable — right to control the use of an
> identified asset. No legal opinion. It is elected [[r]]arrangement by
> arrangement — the one election in this course that is not by class. And the
> operative word is written. No written terms, no expedient.

**Sources**
- `842-10-15-3A.txt` — the "the standard says" quotation **compresses the
  paragraph**: the paragraph's three-part eligibility list ("an entity that
  is not a public business entity; a not-for-profit entity that has issued
  or is a conduit bond obligor…; or an employee benefit plan that files…")
  is replaced with "an entity", and eligibility is then taught in the next
  sentence. Every retained word is the paragraph's. Confirm the compression
  is acceptable under the one-quote discipline (J1).
- `842-10-15-3A.txt` — "the practical (as opposed to enforceable) right to
  control the use of an identified asset", "shall classify and account for
  that lease on the basis of those written terms and conditions", "may elect
  the practical expedient on an arrangement-by-arrangement basis".
- `ASU_2023-01.txt` Summary — "available to entities that are not: 1. Public
  business entities 2. Not-for-profit conduit bond obligors 3. Employee
  benefit plans that file or furnish financial statements with or to the
  … SEC". The .txt extraction of 15-3A itself reads ambiguously (the "not"
  and the semicolon list); the Summary's numbered list is the reading
  drafted. Confirm against the PDF (J2).
- `ASU_2023-01.txt` ¶4, 842-10-15-3B — "If no written terms or conditions
  exist, an entity shall not apply the practical expedient": behind "No
  written terms, no expedient."
- "the one election in this course that is not by class" — cross-course
  observation, accurate against lessons 1–3's by-class elections; confirm
  the sentence's absoluteness (J3).

**Reveals** (4 markers, 4 statement lines)
1. before "written terms" → "Use the written terms to find — and account for — the lease"
2. before "not public business entities" → "Eligible: not a PBE, NFP conduit obligor, or SEC-filing EBP"
3. before "enforceability" → "Practical — not enforceable — right to control"
4. before "arrangement by arrangement" → "Arrangement by arrangement; written terms required"

---

## Block 3 — S-03 — Statement — why the Board did it

**Narration as drafted**

> Why did the Board allow this? Because between entities under common
> control, legal enforceability was [[r]]costly to assess and rarely
> meaningful. Stakeholders told the Board that pinning down the enforceable
> terms of a family arrangement could mean a formal [[r]]legal opinion — hard
> and expensive precisely because of the common control — while the common
> owner could amend the terms at any time, or simply choose [[r]]not to
> enforce them. An arrangement controlled entirely by one party makes
> enforceability a strange question to build accounting on. The Board also
> noted the practical footnote: when entities did identify unwritten terms,
> auditors usually wanted them [[r]]written down anyway. So the expedient
> follows the paper: write the terms, use the terms. And at transition, the
> Board explicitly allowed entities to document existing handshakes in
> writing before their first statements under the expedient were issued.

**Sources**
- `ASU_2023-01.txt` BC14 — "determining the enforceable terms and conditions
  could necessitate obtaining a formal legal opinion, which is challenging
  and costly because of the common control nature of the arrangement (even
  for written arrangements)".
- BC13 — "a common owner or owners typically can amend the terms and
  conditions of an arrangement at any time. Similarly, a common owner or
  owners typically can choose not to enforce the terms and conditions"; "the
  arrangements are generally controlled entirely by one party".
- BC15 — "practitioners often require that those terms and conditions be
  written to satisfy audit requirements": behind "auditors usually wanted
  them written down anyway".
- Summary / 842-10-65-7(d) / BC47 — an entity "is permitted to document any
  existing unwritten terms and conditions … before the date on which the
  entity's first interim (if applicable) or annual financial statements are
  available to be issued": the transition documentation sentence. Note it is
  a **transition** allowance, not an ongoing one — the narration ties it to
  "at transition"; confirm the brevity is not misleading (J4).

**Reveals** (4 markers, 4 statement lines)
1. before "costly to assess" → "Enforceability: costly to assess, rarely meaningful"
2. before "legal opinion" → "Could require a formal legal opinion"
3. before "not to enforce" → "The common owner can amend — or not enforce — at will"
4. before "written down" → "Auditors wanted written terms anyway"

---

## Block 4 — S-04 — Statement — Issue 2: the useful-life rule

**Narration as drafted**

> Issue two: the roof. Ordinarily, leasehold improvements amortize over the
> [[r]]shorter of their useful life and the remaining lease term — a
> five-year lease turns a fifteen-year roof into a five-year expense. Between
> entities under common control, the Board decided that answer misstated the
> economics, and wrote a different one. The standard says: leasehold
> improvements associated with a lease between entities under common control
> shall be amortized over the [[r]]useful life of those improvements to the
> common control group — as long as the lessee [[r]]controls the use of the
> underlying asset through a lease. Not the lease term: the group's useful
> life. The reasoning is the family dynamic itself: the renewal decision
> belongs to the one owner on both sides, and improvements that outlast the
> lease do not leave the family. And note the reach: this half of the
> amendment applies to [[r]]every entity, public companies included. Only the
> written-terms expedient is private-company relief.

**Sources**
- `ASU_2023-01.txt` ¶9, 842-20-35-12 as amended — "amortized over the
  shorter of the useful life of those leasehold improvements and the
  remaining lease term": the general rule.
- `842-20-35-12A.txt` item (a) — the quotation, lightly compressed
  ("shall be: aAmortized over the useful life of those improvements to the
  common control group as long as the lessee controls the use of the
  underlying asset through a lease"); the cap when the lessor leases the
  asset from outside the group (item (a)'s second sentence) is **not
  taught** — accepted scope for this lesson, noted for the reviewer (J7).
- `ASU_2023-01.txt` BC24 — "the decision for that continued use often is
  controlled by a single party in the control group"; "the leasehold
  improvements will benefit another party within the common control group":
  behind the family-dynamic reasoning. "misstated the economics" tracks
  BC24's "may result in financial reporting that does not faithfully
  represent the economics".
- Summary ("Issue 2 … amendments apply to all entities (that is, public
  business entities, private companies, not-for-profit entities, and
  employee benefit plans)") and BC29 — the all-entities reach.

**Reveals** (4 markers, 4 statement lines)
1. before "shorter" → "General rule: shorter of useful life and lease term"
2. before "useful life" → "Common control: useful life to the group"
3. before "controls the use" → "…as long as the lessee controls the use, through a lease"
4. before "every entity" → "This half applies to all entities — even public"

---

## Block 5 — S-05 — Statement — when control ends

**Narration as drafted**

> What happens when the music stops? The longer life is conditioned on
> control: the lessee amortizes over the group's useful life only [[r]]as
> long as it controls the use of the asset through a lease. The day it no
> longer does — the lease ends and is not renewed, the space is handed back —
> the remaining balance does not run through earnings as a loss. The standard
> says the improvements are [[r]]accounted for as a transfer between entities
> under common control, through an [[r]]adjustment to equity. The books treat
> it the way the family treats it: value moved from one pocket to another.
> Along the way, the improvements stay subject to ordinary [[r]]impairment
> testing under the property, plant, and equipment guidance — the longer life
> is not a shield for an asset that has stopped earning its keep.

**Sources**
- `842-20-35-12A.txt` item (b) — "Accounted for as a transfer between
  entities under common control through an adjustment to equity (net assets
  for a not-for-profit entity) when the lessee no longer controls the use of
  the underlying asset" — quoted with "the standard says" (the
  not-for-profit parenthetical is omitted in narration; it is on no slide
  either — accepted scope).
- `ASU_2023-01.txt` BC34 — the transfer "faithfully represents the
  economics" and reflects value benefiting "another party within the common
  control group": behind "one pocket to another".
- `ASU_2023-01.txt` ¶9, 842-20-35-12B — impairment under Topic 360
  (paragraph 360-10-40-4, "considering the useful life to the common control
  group"): behind the impairment sentence and the slide's "(Topic 360)".
- "not run through earnings as a loss" — the contrast the equity-adjustment
  mechanism entails; BC38–BC39 record the Board rejecting
  earnings-protective alternatives. Confirm the phrasing (J6, voice).

**Reveals** (4 markers, 4 statement lines)
1. before "as long as" → "The condition: control through a lease"
2. before "accounted for" → "Control ends → transfer within the group"
3. before "adjustment to equity" → "Through an adjustment to equity — not a P&L loss"
4. before "impairment" → "Impairment testing still applies (Topic 360)"

---

## Block 6 — S-06 — Facts — disclosure and transition, briefly

**Narration as drafted**

> Two housekeeping items, briefly, both from the same amendment. Disclosure
> first: when the group's useful life runs [[r]]past the lease term — which
> is every case this lesson cares about — the lessee discloses three numbers:
> the [[r]]unamortized balance of the improvements, their remaining useful
> life to the group, and the remaining lease term. The reader gets to see the
> mismatch the accounting is deliberately carrying. Transition second: the
> amendments took effect for fiscal years beginning after [[r]]December
> fifteenth, twenty twenty-three, with early adoption allowed. Entities
> already on ASC eight forty-two could apply them [[r]]prospectively — to new
> improvements, or to new and existing ones — or reach back retrospectively.
> And at adoption, an entity was allowed to put its unwritten arrangements in
> writing, and use the expedient from there forward.

**Sources**
- `ASU_2023-01.txt` ¶10, 842-20-50-7A — the three disclosures when "the
  useful life of leasehold improvements to the common control group …
  exceeds the related lease term": unamortized balance, remaining useful
  life to the group, remaining lease term. Also BC37.
- Summary ("effective for fiscal years beginning after December 15, 2023,
  including interim periods … Early adoption is permitted") and 842-10-65-8
  — the effective date.
- 842-10-65-8(c)(1)–(3) — the two prospective methods (new improvements
  only; new and existing, remaining balance over remaining group life) and
  the retrospective method with a cumulative-effect adjustment. The block
  compresses three methods into "prospectively — to new improvements, or to
  new and existing ones — or reach back retrospectively"; confirm the
  compression (J4).
- 842-10-65-7(d) — documenting unwritten terms at adoption (Issue 1's
  transition), behind the closing sentence.

**Reveals** (4 markers, 4 facts rows)
1. before "past the lease term" → row "Disclose when: Useful life exceeds the lease term"
2. before "unamortized balance" → row "The three numbers: Unamortized balance · remaining life · lease term"
3. before "December fifteenth" → row "Effective: Fiscal years beginning after 12/15/2023"
4. before "prospectively" → row "Transition: Prospective options, or retrospective"

---

## Block 7 — S-07 — Calc — the roof, in dollars

**Narration as drafted**

> Now the roof, in dollars. A [[r]]five-year written lease between the LLC
> and the operating company, and a new roof: one hundred fifty thousand
> dollars, with a useful life to the group of fifteen years. [[r]]Under the
> general rule, the roof amortizes over the shorter period: thirty thousand
> dollars a year for five years — a fifteen-year asset expensed three times
> too fast. [[r]]Under the common control rule, it amortizes over the group's
> fifteen: ten thousand dollars a year, for as long as the lessee keeps
> controlling the building through a lease. Now suppose at the end of year
> five the group moves the operating company out. [[r]]One hundred thousand
> dollars is still on the books — and it leaves as a transfer through equity,
> not as a loss through earnings. Same roof, same dollars. The difference is
> whether the accounting tells the story of a lease term, or of a family.

**Sources**
- `ASU_2023-01.txt` ¶9, 842-20-35-12 as amended — the shorter-of side.
- `842-20-35-12A.txt` items (a) and (b) — the group-life side and the equity
  transfer.
- The arithmetic is illustrative and deliberately trivial: $150,000
  straight-line over 5 years = $30,000/yr; over 15 years = $10,000/yr; after
  five years at $10,000, $100,000 remains. Straight-line with no salvage is
  assumed and unstated. Needs the reviewer's blessing (J5).
- "expensed three times too fast" is arithmetic commentary (15 ÷ 5), not a
  sourced characterization; confirm tone (J6).

**Reveals** (4 markers, 6 calc rows — rows without their own marker appear
with the last marked one)
1. before "five-year written lease" → rows "Written lease: 5 years, LLC →
   operating company" and "New roof: $150,000 · 15-year life to the group"
2. before "Under the general rule" → row "General rule (35-12): $30,000/year over 5 years"
3. before "Under the common control rule" → row "Common control (35-12A): $10,000/year over 15 years"
4. before "One hundred thousand" → rows "Lease ends at year 5: $100,000
   still unamortized" and "It leaves as: Equity transfer — not a P&L loss"
   (flag-pink emphasis)

---

## Block 8 — S-08 — List — the course close

**Narration as drafted**

> The course close. Four lessons, four elections: [[r]]short-term leases kept
> off the balance sheet, a [[r]]risk-free rate instead of an invented
> borrowing rate, [[r]]service payments folded into the lease instead of
> allocated out of it, and [[r]]written terms taken at their word between
> entities under common control. One theme underneath all four. Each time,
> the Board looked at a precision the standard demanded — a measured rate, an
> allocated payment, a proven enforceability — and asked what it cost and
> what it bought. Where it bought little, and it bought least for private
> companies, the Board let lessees trade the precision for the cost. That is
> what a practical expedient is. Know the boundary of each election, write
> down what you have elected, and spend the precision where it still buys
> something.

**Sources**
- Summary of the course; each clause restates its lesson's primary source
  (842-20-25-2; 842-20-30-3; 842-10-15-37; 842-10-15-3A).
- The theme sentence is drafted carefully around scope: lessons 1 and 3's
  elections are available to all lessees, lessons 2 and 4's to private
  entities only — hence "it bought least for private companies" rather than
  "only private companies could skip it". Confirm the generalization earns
  its place as the course's closing claim (J8).

**Reveals** (4 markers, 4 list items)
1. before "short-term" → item "Lesson 1 — short-term leases: off the balance sheet"
2. before "risk-free rate" → item "Lesson 2 — a risk-free rate, by class"
3. before "service payments" → item "Lesson 3 — one payment, one lease component"
4. before "written terms" → item "Lesson 4 — written terms, and the group's useful life"

---

# Questions

Shape notes: five review questions (after blocks 2, 3, 4, 5, 7 — no two on
the same block) and four assessment questions (four choices each, one per
learning objective — course rule 1). Feedback follows 5.01.2.2. Each
question carries a `_source` comment key.

**q-01 · review · after block 2 · tests lo-1.** Eligible private
manufacturer, written common control lease → expedient available, no
enforceability assessment. Sources: `842-10-15-3A.txt`; ASU Summary.

**q-02 · review · after block 3 · tests lo-2.** Why enforceability was a
poor basis → legal opinions plus the common owner's power to amend or not
enforce. Source: BC13–BC16.

**q-03 · review · after block 4 · tests lo-3.** Twelve-year group life,
four-year lease → twelve years while control through a lease persists.
Sources: `842-20-35-12A.txt`; ASU ¶9 (35-12 as amended, distractors (b)/(c)).

**q-04 · review · after block 5 · tests lo-4.** Control ceases with
unamortized balance → equity transfer, not a loss. Sources:
`842-20-35-12A.txt` item (b); BC34.

**q-05 · review · after block 7 · tests lo-2.** Entirely unwritten sibling
arrangement → no expedient; general enforceable-terms guidance (transition
documentation window noted in feedback). Sources: ASU ¶4 (15-3B);
Summary/BC47.

**q-06 · assessment · tests lo-1.** Who may NOT elect → the NFP conduit
bond obligor; feedback names the lesson-2 scope contrast explicitly (the
counterpart of lesson 2's q-05, asked from the opposite side — stems
distinct, course rule 2 checked by `npm run check`). Sources:
`842-10-15-3A.txt`; ASU Summary.

**q-07 · assessment · tests lo-2.** What written terms must convey → the
practical (as opposed to enforceable) right to control the use of an
identified asset. Source: `842-10-15-3A.txt`.

**q-08 · assessment · tests lo-3.** The 35-12A accounting applies to all
entities and is not gated on the expedient election. Sources: ASU Summary
(Issue 2 scope); `842-20-35-12A.txt`; ASU ¶9 (35-12B, distractor (d)).

**q-09 · assessment · tests lo-4.** The 50-7A disclosure triple. Sources:
ASU ¶10; BC37.

---

## Judgment list — OPEN

- **J1 (block 2).** The 15-3A quotation replaces the paragraph's three-part
  eligibility list with "an entity" (eligibility taught in the next
  sentence). Confirm the compression is acceptable inside a "the standard
  says" framing, or restructure to paraphrase-then-quote-less.
- **J2 (block 2, q-01, q-06).** The 15-3A `.txt` extraction's eligibility
  list is ambiguous as extracted; the drafted reading (excluded: PBEs, NFP
  conduit bond obligors, SEC-filing EBPs) follows the ASU Summary's
  numbered list. Confirm against the PDF.
- **J3 (block 2).** "The one election in this course that is not by class" —
  confirm the cross-course absolute.
- **J4 (blocks 3, 6).** Two compressions: the transition-documentation
  allowance is tied to "at transition"/"at adoption" (65-7(d) is a
  transition provision, not ongoing relief), and 65-8(c)'s three transition
  methods are compressed to "prospectively — to new improvements, or to new
  and existing ones — or reach back retrospectively". Confirm neither
  misleads at this altitude.
- **J5 (block 7, and the figures on S-07).** Bless the illustrative
  arithmetic: $150,000, 15-year group life, 5-year lease; $30,000 vs
  $10,000 a year; $100,000 unamortized at year five; straight-line, no
  salvage, both unstated.
- **J6 (voice, blocks 1, 5, 7).** The family framing ("family-shaped",
  "the way the family treats it", "one pocket to another", "expensed three
  times too fast", "when the music stops") — confirm tone matches the
  course.
- **J7 (block 4).** Accepted scope: 35-12A(a)'s cap when the lessor holds
  the asset under a lease from outside the common control group is not
  taught, and 15-3C (an arrangement that stops being common control) is not
  taught. Confirm both omissions for an intermediate lesson.
- **J8 (block 8).** The closing theme sentence ("Where it bought little, and
  it bought least for private companies…") — confirm it as the course's
  summary claim, given lessons 1 and 3 are not private-only elections.

## Sources still needed

None required — every claim traces to `842-10-15-3A.txt`,
`842-20-35-12A.txt`, or `ASU_2023-01.txt` (with the PDF for exact wording).
Optional upgrades, not blockers: Codification copies of 842-10-15-3B–3C,
842-20-35-12B–12C, and 842-20-50-7A would raise those citations from
ASU-as-added to text-of-record per `INDEX.md`'s convention.
