# ASC842-PCX-03 — Not Separating Lease and Nonlease Components — reviewer's document

This is the document a licensed CPA reads **before any narration audio is
generated**. Once a block is voiced, changing one sentence costs an ElevenLabs
regeneration and produces a different take — so every correction is nearly
free now and expensive later.

How to read it: for each block, the narration as drafted (reveal markers
`[[r]]` left in place), the sources relied on with the specific paragraph,
and what each reveal marker reveals. Then the same for each question. The
lesson data lives in `src/lesson-03.ts` and `src/questions-03.json`; edit
those files, not this one.

**Status, first draft (2026-08-27).** Unreviewed and unvoiced. This is the
thinnest-sourced lesson in the course: the only authoritative paragraph on
point in `sources/asc842` is `842-10-15-37.txt`, so the default-separation
mechanics and the lessor side carry **4 UNSOURCED flags** (blocks 1, 2, 6),
which questions q-01 and q-04 inherit. The open judgment list (J1–J9) and
the `Sources still needed` list are at the bottom. `meta.status` is
`"draft"`; export refuses it.

Learning objectives (from `src/lesson-03.ts`):

- **lo-1** — Identify the lease and nonlease components bundled into a single
  contract payment, and state the default requirement to separate them and
  allocate the consideration.
- **lo-2** — Apply the 842-10-15-37 election: account for each lease
  component and its associated nonlease components as a single lease
  component, by class of underlying asset.
- **lo-3** — Explain the election's measurement effect: a larger lease
  liability and right-of-use asset that include the nonlease payments, with
  total expense over the term unchanged.
- **lo-4** — Evaluate when the election is cost-effective for a lessee, and
  recognize that the lessor's election is separate and conditional.

---

## Block 1 — S-01 — Statement — "the problem"

**Narration as drafted**

> Back to the controller's office lease — the actual invoice this time. One
> payment a month, and inside it: rent for the space, [[r]]common area
> maintenance for the lobby she shares, utilities, and a service contract for
> the building's front desk. Under ASC eight forty-two, only one of those is
> a lease. The [[r]]space is the lease — the right to use an identified
> asset. The maintenance, the utilities, the staffed desk are [[r]]services:
> things the landlord does, not things she controls the use of. The standard
> calls them nonlease components, and every bundled contract raises the same
> question — what is this one payment actually buying? It matters because the
> lease part goes on the balance sheet, and the service part does not.

**Sources**
- `842-10-15-37.txt` — "nonlease components" and "lease components" as the
  operative terms.
- **UNSOURCED** — "the right to use an identified asset": this is
  842-10-15-3's lease definition, which is in `sources/` only as an
  unamended context paragraph reproduced inside `ASU_2023-01.txt`
  (amendment ¶4 prints 15-2 and 15-3 before the added 15-3A). Decide whether
  citing a context reproduction is acceptable, or fetch `842-10-15-3.txt`
  (J1; Sources still needed).
- The classification of CAM/utilities/front-desk as nonlease components is
  application; whether utilities are a nonlease component or a
  non-component (a cost that transfers no good or service) is a known
  practice nuance the block deliberately does not open (also J1).

**Reveals** (3 markers, 3 statement lines)
1. before "common area maintenance" → "One payment: rent + CAM + utilities + services"
2. before "space" → "The space is the lease component"
3. before "services" → "The services are nonlease components"

---

## Block 2 — S-02 — Statement — the default rule

**Narration as drafted**

> The default rule is separation. The election we are about to meet is
> written as a choice [[r]]not to separate — which tells you what the
> baseline is: a lessee identifies each lease component and each nonlease
> component and accounts for them apart. Separating takes an [[r]]allocation:
> the single payment is split across the components in proportion to their
> standalone prices — what the space alone would rent for, what the services
> alone would cost. Where observable prices do not exist, the lessee
> [[r]]estimates them. That is real work, on every bundled contract, for as
> long as the contracts keep changing. Keep the shape of that work in mind,
> because it is exactly what the election is priced against.

**Sources**
- `842-10-15-37.txt` (framing) — the paragraph offers a choice "not to
  separate nonlease components from lease components", which entails that
  separation is the default. Per the feature: the default is stated from
  15-37's own framing, since the 15-28 to 15-36 range is not in `sources/`.
- **UNSOURCED** — "split across the components in proportion to their
  standalone prices": believed ASC 842-10-15-33(a) (allocation on a relative
  standalone price basis). Verify the paragraph number and wording (J2).
- **UNSOURCED** — "Where observable prices do not exist, the lessee
  estimates them": believed ASC 842-10-15-33/-35 (estimate standalone
  prices, maximizing observable information). Verify (J3).

**Reveals** (3 markers, 3 statement lines)
1. before "not to separate" → "Default: separate lease from nonlease components"
2. before "allocation" → "Allocate the payment on relative standalone prices"
3. before "estimates" → "No observable price? Estimate one"

---

## Block 3 — S-03 — Statement — the election, quoted

**Narration as drafted**

> Here is the election. The standard says: as a practical expedient, a lessee
> may, as an accounting policy election [[r]]by class of underlying asset,
> choose not to separate nonlease components from lease components and
> instead to account for each separate lease component and the nonlease
> components [[r]]associated with that lease component as a single lease
> component. Read it twice, because every phrase carries weight. It is an
> accounting policy, made by class — the same machinery as lessons one and
> two, with the same consistency: [[r]]every contract in an elected class
> follows it. And it merges each lease component with the nonlease components
> associated with it — the maintenance that rides on the office — not with
> unrelated services that happen to share a counterparty.

**Sources**
- `842-10-15-37.txt` — quoted in full, verbatim, introduced with "the
  standard says". This is the lesson's one long quotation.
- "every contract in an elected class follows it" — the all-or-nothing
  reading of a by-class policy election, parallel to lesson 1's
  reviewer-confirmed J7; needs its own confirmation here (J4).
- "not with unrelated services that happen to share a counterparty" — an
  interpretation of "associated with that lease component"; confirm (J5).

**Reveals** (3 markers, 3 statement lines)
1. before "by class" → "An accounting policy, by class of underlying asset"
2. before "associated" → "Lease + associated nonlease = one lease component"
3. before "every contract" → "Within a class: every contract, consistently"

---

## Block 4 — S-04 — Facts — what electing does

**Narration as drafted**

> What does electing actually do to the numbers? The whole payment becomes a
> lease payment. So the [[r]]lease liability is bigger — it now includes the
> present value of the maintenance and service money, dollars that would
> otherwise never have touched the balance sheet — and the [[r]]right-of-use
> asset grows with it. What does not change is [[r]]total expense. For an
> operating lease, the standard's single lease cost spreads the cost of the
> lease straight-line over the term, and that cost now simply includes the
> service dollars; separated, the same dollars arrive as service expense as
> the services are consumed. [[r]]Either way the income statement ends the
> term in the same place. The election moves the balance sheet, not earnings.

**Sources**
- `842-10-15-37.txt` — "a single lease component": the mechanism that turns
  nonlease payments into lease payments.
- `842-20-25-6.txt` item (a) — the single lease cost "allocated over the
  remaining lease term on a straight-line basis", behind "the standard's
  single lease cost spreads the cost of the lease straight-line".
- "total expense … unchanged" is exact for the term as a whole (total
  consideration is what it is) and exact period by period for level
  payments; for uneven service consumption the interim pattern can differ
  between the two treatments. The block says "ends the term in the same
  place", which is the claim that is always true. Confirm the
  simplification, parallel to lesson 1's J9 (J6).

**Reveals** (4 markers, 4 facts rows)
1. before "lease liability" → row "Lease liability: Larger — includes nonlease payments"
2. before "right-of-use" → row "Right-of-use asset: Larger, to match"
3. before "total expense" → row "Total expense over the term: Unchanged"
4. before "Either way" → row "What moves: Balance sheet, not earnings"

Note row 4 reveals on "Either way", one beat before the words "balance
sheet, not earnings" land; scrub the silent render and re-place if the
pairing reads wrong on screen.

---

## Block 5 — S-05 — Statement — why lessees elect

**Narration as drafted**

> Why would a lessee take a bigger liability on purpose? Because the
> alternative is the [[r]]allocation, forever. Standalone prices for the
> space, the maintenance, the desk; estimates where no observable price
> exists; the whole exercise redone when the contract changes. For an office
> lease where the services are a [[r]]sliver of the payment, that work buys
> almost nothing: the liability barely moves, and the allocation cost repeats
> while the election's cost is a slightly larger number, once. The calculus
> flips when the services are [[r]]large. A payment that is one-third
> building and two-thirds staffed services would put real service money on
> the balance sheet as a debt-like liability — and there, the saved work is
> rarely worth what it costs. The election is by class, so a lessee can hold
> both positions: elect where services are trivial, separate where they are
> the point.

**Sources**
- Cost-benefit reasoning applied to the mechanics established in blocks 2–4;
  no Basis for Conclusions for ASU 2016-02 is in `sources/` (Section A has
  none), so nothing here quotes the Board. The claims are framed as
  reasoning, not as reported practice, but "the saved work is rarely worth
  what it costs" edges toward a practice claim — accept or soften (J7).
- "The election is by class, so a lessee can hold both positions" —
  `842-10-15-37.txt` (by class of underlying asset).

**Reveals** (3 markers, 3 statement lines)
1. before "allocation" → "The alternative: allocation work, repeated"
2. before "sliver" → "Small service slice: elect — little liability cost"
3. before "large" → "Large service slice: the liability cost gets real"

---

## Block 6 — S-06 — Statement — the lessor is not a mirror

**Narration as drafted**

> One caution before the arithmetic: the lessor side of the same contract is
> [[r]]not a mirror. Lessors have their own version of this election, and it
> is conditional — broadly, it is available only when the [[r]]timing and
> pattern of transfer of the combined components line up, and the combination
> has to produce an operating lease — a different test, run by the other
> party, that can reach a [[r]]different answer. So a tenant that combines
> and a landlord that separates can both be right about the identical
> payment. This course teaches the lessee election; if you sit on the lessor
> side, read the lessor paragraphs before borrowing any of it.

**Sources**
- **UNSOURCED — the whole block's substance.** The lessor election and its
  conditions (timing and pattern of transfer; operating-lease outcome) are
  believed ASC 842-10-15-42A, which is not in `sources/`. Per the feature,
  the lessor side gets one substantive claim and a flag; the block hedges
  with "broadly" and sends lessors to the paragraphs rather than teaching
  them. Verify 15-42A's number and conditions before generation, or cut the
  conditions sentence to pure "different, conditional election" (J8).
- Sheet citation reads "842-10 (lessor)" — deliberately un-numbered until
  the paragraph is confirmed, following lesson 1's "842-20 (reassessment)"
  precedent.

**Reveals** (3 markers, 3 statement lines)
1. before "not a mirror" → "The lessor election is separate"
2. before "timing" → "Different test: timing and pattern of transfer"
3. before "different answer" → "Same contract, two right answers"

---

## Block 7 — S-07 — Calc — the worked example

**Narration as drafted**

> Now the invoice, both ways. A [[r]]three-year office lease at six thousand
> dollars a month, all-in; standalone prices would split it five thousand for
> the space and one thousand for maintenance and services. [[r]]Separated,
> the lessee discounts only the five thousand — at, say, five percent,
> roughly one hundred sixty-six thousand eight hundred dollars of liability —
> and the service thousand is expensed month by month as plain operating
> cost. [[r]]Elected as a single lease component, the full six thousand
> discounts to roughly two hundred thousand two hundred dollars — about
> thirty-three thousand four hundred dollars more liability, and the same
> again on the asset side. And [[r]]either way, profit and loss carries six
> thousand dollars a month, two hundred sixteen thousand dollars over the
> term. Choose which statement takes the difference, because one of them
> must.

**Sources**
- `842-10-15-37.txt` — the elected side (single lease component).
- Blocks 2's default (allocation) on the separated side — inherits block 2's
  UNSOURCED status for the allocation mechanics (J2).
- The arithmetic is illustrative: $5,000 and $6,000 × 36 monthly in arrears
  at 5%/12 → ≈ $166,824 and ≈ $200,188 (narrated "roughly $166,800" /
  "roughly $200,200"), difference ≈ $33,364 (narrated "about $33,400");
  totals $216,000. Needs the reviewer's blessing (J9 arithmetic under J7's
  numbering — see judgment list).
- "profit and loss carries six thousand dollars a month" under both
  treatments assumes level payments and straight-line service consumption —
  the block-4 simplification again (J6).

**Reveals** (4 markers, 7 calc rows — rows without their own marker appear
with the last marked one)
1. before "three-year" → rows "Office lease, all-in: 36 months × $6,000" and
   "Standalone split: $5,000 space · $1,000 services"
2. before "Separated" → rows "Separated — lease liability: ≈ $166,800 (PV of
   $5,000 at 5%)" and "Separated — services: $1,000/month, expensed as incurred"
3. before "Elected" → rows "Combined — lease liability: ≈ $200,200 (PV of
   $6,000 at 5%)" and "Extra liability from electing: ≈ $33,400"
4. before "either way" → row "Expense over the term, either way: $216,000"
   (flag-pink emphasis)

---

## Block 8 — S-08 — List — summary

**Narration as drafted**

> The nonlease election in three lines. [[r]]First, know the default:
> components separate, and the payment allocates on standalone prices — work
> that repeats for as long as the contracts do. [[r]]Second, know the price
> of skipping it: elect by class and the whole payment becomes a lease
> payment, so the liability and the asset grow by the present value of the
> services, while total expense does not move. [[r]]Third, choose class by
> class: where service money is small, the election trades a rounding error
> on the balance sheet for the end of the allocation work; where service
> money is large, the trade runs the other way. And remember the landlord
> plays by a different rule — the lessee election stops at the lessee.

**Sources**
- Summary block; every claim restates an earlier block and carries that
  block's source (and, for the default-allocation line, block 2's UNSOURCED
  flags).

**Reveals** (3 markers, 3 list items)
1. before "First" → item "Default: separate, and allocate on standalone prices"
2. before "Second" → item "Elect: bigger liability and asset, same total expense"
3. before "Third" → item "Decide class by class — services small: elect; large: separate"

---

# Questions

Shape notes: five review questions (each placed after the narrated block it
tests, no two on the same block — blocks 2, 3, 4, 6, 7) and four assessment
questions (four choices each, one per learning objective — course rule 1).
Feedback follows 5.01.2.2. Each question carries a `_source` comment key.

**q-01 · review · after block 2 · tests lo-1.** Bundled payment under the
default → separate and allocate on relative standalone prices. Inherits
block 2's UNSOURCED allocation mechanics (J2) — the `_source` key says so.

**q-02 · review · after block 3 · tests lo-2.** How the election is made →
policy by class, associated components combined. Source:
`842-10-15-37.txt`. Distractor (d) (notify the lessor) reinforces block 6.

**q-03 · review · after block 4 · tests lo-3.** Effect: larger liability and
ROU asset, total expense unchanged. Sources: `842-10-15-37.txt`,
`842-20-25-6.txt` item (a); feedback avoids the interim-pattern nuance,
matching the block (J6).

**q-04 · review · after block 6 · tests lo-4.** Lessor accounting does not
follow the tenant's election. UNSOURCED like its block (J8); `_source` says
so explicitly.

**q-05 · review · after block 7 · tests lo-3.** Which figure the worked
example changed → the liability/asset, by ≈ $33,400. Illustrative
arithmetic (J9-arith, see judgment list).

**q-06 · assessment · tests lo-1.** Clinic building bundle → janitorial and
monitoring are the nonlease components. Application of block 1's framing —
inherits J1's identified-asset sourcing caveat.

**q-07 · assessment · tests lo-2.** Elected vehicle class, van plus
maintenance plan → single lease component; no contract-by-contract choice.
Source: `842-10-15-37.txt` (and the J4 consistency reading).

**q-08 · assessment · tests lo-3.** Balance sheet grows, total expense over
the term does not. Sources: `842-10-15-37.txt`; `842-20-25-6.txt` item (a).
Distinct framing from review q-03 (rule 2 checked by `npm run check`).

**q-09 · assessment · tests lo-4.** Most cost-effective where services are a
small slice and standalone prices would need estimating. The cost-benefit
reasoning is block 5's (J7).

---

## Judgment list — OPEN

- **J1 (block 1, q-06).** "The right to use an identified asset" cites
  842-10-15-3 only as reproduced context inside `ASU_2023-01.txt`. Decide
  whether that suffices or fetch `842-10-15-3.txt`. Also: utilities are
  presented as a nonlease component; in practice utilities are often a
  non-component (no transferred good or service). Confirm or swap the
  example.
- **J2 (blocks 2, 7; q-01).** Allocation "in proportion to their standalone
  prices" — believed 842-10-15-33(a), not in `sources/`. Verify and cite.
- **J3 (block 2).** "Where observable prices do not exist, the lessee
  estimates them" — believed 842-10-15-33/-35. Verify and cite.
- **J4 (block 3, q-07).** The by-class consistency reading ("every contract
  in an elected class follows it") — the same interpretation lesson 1's
  reviewer confirmed as J7 there; confirm it transfers to 15-37.
- **J5 (block 3).** "Associated with that lease component" read as excluding
  unrelated same-counterparty services. Confirm.
- **J6 (blocks 4, 7; q-03).** The total-expense-unchanged simplification:
  exact over the term, and period-by-period only for level payments and
  straight-line service consumption. Accept the "ends the term in the same
  place" phrasing or tighten.
- **J7 (block 5, q-09).** "The saved work is rarely worth what it costs" and
  the general cost-benefit framing — reasoning, not sourced practice.
  Accept or soften.
- **J8 (block 6, q-04).** The lessor election's conditions are UNSOURCED
  (believed 842-10-15-42A). Verify the paragraph before generation, or trim
  the conditions sentence.
- **J9 (arithmetic, blocks 7; q-05).** Bless ≈ $166,800 / ≈ $200,200 /
  ≈ $33,400 (36 × $5,000 and $6,000, monthly in arrears at 5%) and the
  $216,000 total, plus the invented 5% rate and the $5,000/$1,000 standalone
  split.

## Sources still needed

- ASC 842-10-15-33 (allocation of consideration on a relative standalone
  price basis) — behind blocks 2 and 7 and q-01 (J2).
- ASC 842-10-15-35 (estimating standalone prices where observable prices
  are unavailable) — behind block 2 (J3); confirm which of 15-33/15-35
  carries the estimation language.
- ASC 842-10-15-42A (the lessor's conditional election) — behind block 6 and
  q-04 (J8).
- ASC 842-10-15-3 as its own Codification copy (`842-10-15-3.txt`) — behind
  block 1's "identified asset" gloss (J1); currently only reproduced as
  context inside `ASU_2023-01.txt`.
