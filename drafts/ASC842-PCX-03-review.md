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

**Status, fourth pass (2026-08-29) — judgment list CLOSED.** The reviewer
worked through J1, J4–J7, and J9, and accepted block 6's third-pass
restored wording as reviewed. Two text changes came out of it — J1's
utilities swap in block 1 and J7's softening in block 5 — both applied
with timing recomputed; the rest closed by confirmation or blessing.
Dispositions are recorded against each item below and in the fourth-pass
Resolution log. No judgment items remain. The one step left is the
human's alone: set `meta.status: "reviewed"` by hand in
`src/lesson-03.ts` (it is still `"draft"`, and export refuses it until
then). Voicing comes after that.

**Status, third pass (2026-08-29).** Codification copies of 842-10-15-3,
15-33, 15-35, and 15-42A arrived in `sources/asc842/` (and `INDEX.md`). The
block 1 and block 2 citations they cover are upgraded to text of record —
each confirmed word for word against Section A as issued — and J10 is
decided: block 6's lessor-election sentence is restored, citing 15-42A for
the election and both of its conditions, with lo-4, q-04, and q-09
restored to their fuller forms. The third-pass Resolution log below
records every change, including exactly what was restored versus the
first draft's original wording. The open judgment list is J1, J4–J7, and
J9 — all CPA calls, no lookups left. Still unvoiced; `meta.status` is
`"draft"`; export refuses it.

**Status, second pass (2026-08-27) — 0 UNSOURCED flags.** Unreviewed and
unvoiced. The source set is complete: `ASU_2016-02_Section_A.pdf` supplies
842-10-15-28 through 15-42 as issued (the separation and allocation
guidance the first draft could not cite), and all four first-draft
UNSOURCED flags are resolved — three by citation (block 1's lease
definition, block 2's two allocation claims) and one by rewrite (block 6,
whose lessor-election conditions came from 842-10-15-42A, a paragraph
added by ASU 2018-11 that exists in **no** file in `sources/`; the block
now teaches only the sourced contrast — the election is written for a
lessee, and the lessor allocates under 842-10-15-38). The Resolution log
below the judgment list records every change, including what was removed.
The open judgment list (J1, J4–J7, J9, and the new J10) is at the bottom;
J2, J3, and J8 are closed. `meta.status` is `"draft"`; export refuses it.

Citation caveat for the reviewer (updated at third pass): 842-10-15-3 and
15-33 now cite their Codification `.txt` copies as text of record, each
confirmed word for word against Section A as issued (so neither was ever
amended in the cited wording); 15-42A exists only as a Codification copy
(added by ASU 2018-11 — there is no as-issued text in `sources/` to
compare, and none is needed: the Codification file IS the text of
record). The remaining Section A citations are 842-10-15-31 (block 2, the
default-separation sentence) and 15-38 (block 6, the lessor allocation
rule) — still the ASU 2016-02 text **as issued**, with no Codification
cross-check in `sources/`; their copies stay listed under `Sources still
needed` as optional upgrades, not blockers.

**Status, first draft (2026-08-27).** The only authoritative paragraph on
point was `842-10-15-37.txt`, so the default-separation mechanics and the
lessor side carried 4 UNSOURCED flags (blocks 1, 2, 6), inherited by q-01
and q-04.

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
  recognize that the lessor allocates under its own requirements and has
  its own separate, conditional combination election. *(Restored to its
  fuller form at third pass, now that `842-10-15-42A.txt` sources the
  lessor election — the first draft said "the lessor's election is separate
  and conditional"; the second pass had dropped the election clause; the
  third pass carries both the allocation rule and the election.)*

---

## Block 1 — S-01 — Statement — "the problem"

**Narration as drafted**

> Back to the controller's office lease — the actual invoice this time. One
> payment a month, and inside it: rent for the space, [[r]]common area
> maintenance for the lobby she shares, and a service contract for
> the building's front desk. Under ASC eight forty-two, only one of those is
> a lease. The [[r]]space is the lease — the right to use an identified
> asset. The maintenance and the staffed desk are [[r]]services:
> things the landlord does, not things she controls the use of. The standard
> calls them nonlease components, and every bundled contract raises the same
> question — what is this one payment actually buying? It matters because the
> lease part goes on the balance sheet, and the service part does not.

**Sources**
- `842-10-15-37.txt` — "nonlease components" and "lease components" as the
  operative terms.
- `842-10-15-3.txt` — "the right to control the use of identified property,
  plant, or equipment (an identified asset)", behind "the right to use an
  identified asset". The Codification copy is the text of record (upgraded
  at third pass from the Section A p. 13 citation; confirmed word for word
  against Section A as issued, and `ASU_2023-01.txt` reproduces the same
  text as unamended context). *(Resolved the first draft's UNSOURCED
  flag.)*
- The classification of CAM/front-desk as nonlease components is
  application. **Utilities came out of the example at fourth pass (J1
  closed, reviewer's call):** under 842-10-15-30 (Section A pp. 18–19), a
  payment that merely reimburses the lessor's costs "does not transfer a
  good or service to the lessee" and receives no allocation at all — a
  non-component, which is what office-lease utilities often are in
  practice. The example now names only CAM and the front-desk service,
  both of which transfer services. See the fourth-pass Resolution log.

**Reveals** (3 markers, 3 statement lines; reveal 3 recomputed 34 → 33 and
estimatedSeconds 57 → 56 for the removed words)
1. before "common area maintenance" → "One payment: rent + CAM + services"
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
> alone would cost. Where observable prices are not readily available, the
> lessee [[r]]estimates them. That is real work, on every bundled contract, for as
> long as the contracts keep changing. Keep the shape of that work in mind,
> because it is exactly what the election is priced against.

**Sources**
- ASC 842-10-15-31, as issued in `ASU_2016-02_Section_A.pdf` p. 19 — "An
  entity shall account for each separate lease component separately from
  the nonlease components of the contract (that is, unless a lessee makes
  the accounting policy election described in paragraph 842-10-15-37)" —
  the default rule stated directly, no longer inferred from 15-37's
  framing. The sheet citation is now `842-10-15-31; 15-33`.
- `842-10-15-33.txt` item (b) — "allocate the consideration in the contract
  on a relative standalone price basis", behind "split across the
  components in proportion to their standalone prices". The Codification
  copy is the text of record (upgraded at third pass from the Section A
  p. 19 citation; confirmed word for word against Section A as issued,
  parenthetical, items (a)–(b), and the initial-direct-costs sentence
  included). *(Resolved the first draft's UNSOURCED flag; closes J2.)*
- `842-10-15-33.txt` item (a) — "If observable standalone prices are not
  readily available, the lessee shall estimate the standalone prices,
  maximizing the use of observable information", behind the estimation
  sentence. The narration was tightened in the second pass: "Where
  observable prices do not exist" → "Where observable prices are not
  readily available", matching the paragraph's actual trigger. *(Resolved
  the flag; closes J3 — the estimation language is 15-33(a), not 15-35,
  which defines what the consideration in the contract includes — a
  determination `842-10-15-35.txt`, now in `sources/`, confirms: it lists
  the payments in the consideration and carries no estimation language.)*
- `842-10-15-37.txt` — the election that switches the default off.

**Reveals** (3 markers, 3 statement lines; reveal 3 recomputed to 39s for
the two added words)
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
> often not worth what it costs. The election is by class, so a lessee can hold
> both positions: elect where services are trivial, separate where they are
> the point.

**Sources**
- Cost-benefit reasoning applied to the mechanics established in blocks 2–4;
  no Basis for Conclusions for ASU 2016-02 is in `sources/` (Section A has
  none), so nothing here quotes the Board. The claims are framed as
  reasoning, not as reported practice. Softened at fourth pass (J7
  closed): "the saved work is rarely worth what it costs" → "often not
  worth what it costs" — a tendency, not a frequency claim. The phrase
  sits after the block's last reveal marker, so reveals are unchanged and
  the one added word leaves estimatedSeconds at 66.
- "The election is by class, so a lessee can hold both positions" —
  `842-10-15-37.txt` (by class of underlying asset).

**Reveals** (3 markers, 3 statement lines)
1. before "allocation" → "The alternative: allocation work, repeated"
2. before "sliver" → "Small service slice: elect — little liability cost"
3. before "large" → "Large service slice: the liability cost gets real"

---

## Block 6 — S-06 — Statement — the lessor is not a mirror

**Narration as restored (third pass)**

> One caution before the arithmetic: the lessor side of the same contract is
> [[r]]not a mirror. The election you just read is written for a lessee —
> the paragraph says a lessee may. The lessor's own paragraphs send
> [[r]]allocation a different way entirely: a lessor allocates the
> consideration under the revenue standard's requirements. Lessors have
> their own version of this election, and it is [[r]]conditional: available
> only when the timing and pattern of transfer of the lease component and
> its associated nonlease components are the same, and when the lease
> component, on its own, would classify as an operating lease. A different
> rule and a different test, applied by the other party, that can reach a
> [[r]]different answer. So a tenant that combines and a landlord that
> separates can both be right about the identical payment. This course
> teaches the lessee election; if you sit on the lessor side, read the
> lessor paragraphs before borrowing any of it.

**Sources**
- `842-10-15-37.txt` — "a **lessee** may, as an accounting policy election"
  — the election's own words confine it to the lessee, behind "written for
  a lessee".
- ASC 842-10-15-38, as issued in `ASU_2016-02_Section_A.pdf` p. 20 — "A
  lessor shall allocate the consideration in the contract to the separate
  lease components and the nonlease components using the requirements in
  paragraphs 606-10-32-28 through 32-41" (Topic 606, revenue from contracts
  with customers — named in 15-39 on the same page), behind the allocation
  sentence. Still Section A as issued — no Codification copy of 15-38 is
  in `sources/`.
- `842-10-15-42A.txt` — the lessor's combination election (added by ASU
  2018-11; the Codification copy is its only text in `sources/`, and the
  text of record). Behind "their own version of this election" (practical
  expedient, accounting policy election, by class of underlying asset) and
  both conditions: (a) "The timing and pattern of transfer for the lease
  component and nonlease components associated with that lease component
  are the same"; (b) "The lease component, if accounted for separately,
  would be classified as an operating lease". The paragraph's scope gate —
  the nonlease components would otherwise be accounted for under Topic 606
  — is not narrated; the allocation sentence before it already places the
  lessor in revenue-standard territory. **J10 closed by restoration** (J8
  stays closed — the second pass's removal was correct for the sources
  then on hand; the third pass restores from the acquired source, with two
  wording corrections recorded in the Resolution log).

**Reveals** (4 markers, 4 statement lines; recomputed for the restored
text — [6, 22, 38] → [6, 18, 30, 54]; estimatedSeconds 58 → 73, under the
75s sheet cap after two trims recorded in the Resolution log)
1. before "not a mirror" → "The lessee election stops at the lessee"
2. before "allocation" → "Lessors: allocate under the revenue standard"
3. before "conditional" → "Lessor election: same timing and pattern, operating lease"
4. before "different answer" → "Same contract, two right answers"

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
- Block 2's default (allocation) on the separated side — carried by
  842-10-15-31 (Section A p. 19) and `842-10-15-33.txt` (the Codification
  copy, since the third pass); the inherited UNSOURCED status is resolved
  with block 2's.
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
  block's source — the default-allocation line now rides on block 2's
  842-10-15-31/15-33 citations, and the closing "the landlord plays by a
  different rule — the lessee election stops at the lessee" on block 6's
  15-37/15-38. No narration change was needed: the summary's landlord
  sentence never claimed the lessor election, so the block 6 rewrite leaves
  it accurate as drafted.

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
default → separate and allocate on relative standalone prices. Sources:
842-10-15-31 (Section A p. 19) and `842-10-15-33.txt` (Codification copy
since the third pass); the feedback's estimation trigger aligned to
15-33(a)'s "not readily available". *(Inherited flag resolved with
block 2's.)*

**q-02 · review · after block 3 · tests lo-2.** How the election is made →
policy by class, associated components combined. Source:
`842-10-15-37.txt`. Distractor (d) (notify the lessor) reinforces block 6.

**q-03 · review · after block 4 · tests lo-3.** Effect: larger liability and
ROU asset, total expense unchanged. Sources: `842-10-15-37.txt`,
`842-20-25-6.txt` item (a); feedback avoids the interim-pattern nuance,
matching the block (J6).

**q-04 · review · after block 6 · tests lo-4.** Lessor accounting does not
follow the tenant's election. Restored with its block at third pass:
choice (a) ("the lessor has its own conditional election, and each party
decides independently") and distractor (d) ("lessors are prohibited from
ever combining") are the first draft's, verbatim, now that
`842-10-15-42A.txt` sources them; the feedback keeps the second pass's
15-37/15-38 grounding and adds the 15-42A conditions stated per the
paragraph. Sources: `842-10-15-37.txt`; 15-38 (Section A p. 20);
`842-10-15-42A.txt`.

**q-05 · review · after block 7 · tests lo-3.** Which figure the worked
example changed → the liability/asset, by ≈ $33,400. Illustrative
arithmetic (J9-arith, see judgment list).

**q-06 · assessment · tests lo-1.** Clinic building bundle → janitorial and
monitoring are the nonlease components. Application of block 1's framing;
the identified-asset language cites `842-10-15-3.txt` (Codification copy
since the third pass; matches Section A as issued and `ASU_2023-01.txt`
word for word). The utilities nuance of J1 does not touch this question —
janitorial and monitoring transfer services.

**q-07 · assessment · tests lo-2.** Elected vehicle class, van plus
maintenance plan → single lease component; no contract-by-contract choice.
Source: `842-10-15-37.txt` (and the J4 consistency reading).

**q-08 · assessment · tests lo-3.** Balance sheet grows, total expense over
the term does not. Sources: `842-10-15-37.txt`; `842-20-25-6.txt` item (a).
Distinct framing from review q-03 (rule 2 checked by `npm run check`).

**q-09 · assessment · tests lo-4.** Most cost-effective where services are a
small slice and standalone prices would need estimating. The cost-benefit
reasoning is block 5's (J7). Second pass had replaced distractor (d) with
a consent-based stand-in because the original referenced the unsourced
lessor election; third pass restores the first draft's (d) ("A class the
lessor has also elected to combine") and its feedback line, now that the
lesson teaches and `842-10-15-42A.txt` sources that election.

---

## Judgment list — CLOSED (fourth pass, 2026-08-29)

Every lookup item from the first draft (J2, J3, J8, and J1's sourcing
half) closed in the second-pass Resolution log; J10 decided and closed at
third pass; the remaining CPA calls disposed by the reviewer at fourth
pass:

- **J1 (block 1) — utilities SWAPPED OUT.** The example's nonlease
  components are now common area maintenance and the front-desk service —
  both transfer services; utilities, often a 842-10-15-30 non-component
  in practice, no longer appear. Applied to the narration and the S-01
  sheet line; q-06 never named utilities and is untouched. See the
  fourth-pass Resolution log.
- **J4 (block 3, q-07) — CONFIRMED.** The by-class consistency reading
  ("every contract in an elected class follows it") transfers to 15-37.
- **J5 (block 3) — CONFIRMED.** "Associated with that lease component"
  read as excluding unrelated same-counterparty services.
- **J6 (blocks 4, 7; q-03) — CONFIRMED.** The "ends the term in the same
  place" phrasing stands for the total-expense simplification.
- **J7 (block 5, q-09) — SOFTENED.** "The saved work is rarely worth what
  it costs" → "often not worth what it costs"; the cost-benefit framing
  otherwise accepted. See the fourth-pass Resolution log.
- **J9 (block 7; q-05) — VERIFIED and blessed.** ≈ $166,800 / ≈ $200,200 /
  ≈ $33,400 (36 × $5,000 and $6,000, monthly in arrears at 5%), the
  $216,000 total, the invented 5% rate, and the $5,000/$1,000 standalone
  split.
- **Block 6 (third-pass restoration) — ACCEPTED as reviewed.** The
  restored lessor-election wording, including its two corrections against
  `842-10-15-42A.txt`, stands.
## Resolution log — second pass (2026-08-27)

All four first-draft UNSOURCED flags resolved against the completed source
set — citation where a paragraph supports the sentence, rewrite where none
did:

- **Block 1, cited:** "the right to use an identified asset" →
  842-10-15-3, as issued in `ASU_2016-02_Section_A.pdf` p. 13 and
  reproduced word-for-word (unamended) in `ASU_2023-01.txt`. No narration
  change. J1's sourcing half closed; its utilities half stays open above.
- **Block 2, cited:** allocation "in proportion to their standalone prices"
  → 842-10-15-33(b) (relative standalone price basis); estimation →
  842-10-15-33(a). J2 and J3 closed — and J3's open question answered: the
  estimation language is 15-33(a); 15-35 defines the consideration in the
  contract, not estimation. One narration edit: "Where observable prices do
  not exist" → "Where observable prices are not readily available"
  (15-33(a)'s trigger). Sheet citation `842-10-15-37` → `842-10-15-31;
  15-33`; reveal 3 recomputed 38 → 39.
- **Block 6, rewritten (J8 closed):** 842-10-15-42A post-dates every ASU in
  `sources/` (added by ASU 2018-11; Section A as issued runs 15-42 →
  15-43). **Removed:** "Lessors have their own version of this election";
  that it is conditional; the timing-and-pattern-of-transfer condition; the
  operating-lease-outcome condition. **Replaced with** the sourced
  contrast: 15-37 is written for "a lessee", and 15-38 sends the lessor's
  allocation to Topic 606. Slide lines 1–2, sheet citation, reveals
  ([6, 17, 32] → [6, 22, 38]), and estimatedSeconds (51 → 58) updated; the
  "same contract, two right answers" close survives on the new footing.
- **Ripples:** lo-4 reworded (no longer claims a conditional lessor
  election); q-04 choice (a), distractor (d), feedback, and `_source`
  rewritten; q-09 distractor (d) and feedback reworded; q-01 and q-06
  `_source` keys point at the real paragraphs; `meta.sources` lists 15-3,
  15-31/15-33, and 15-38 as supporting citations; lesson total re-estimated
  7m50s → 7m57s (`npm run check`).

## Resolution log — third pass (2026-08-29)

Codification copies of 842-10-15-3, 15-33, 15-35, and 15-42A arrived in
`sources/asc842/` and `INDEX.md` on 2026-08-29; the interim citations are
upgraded and J10's decided restoration is carried out against them:

- **Blocks 1 and 2, citations upgraded to text of record:** block 1's
  lease definition → `842-10-15-3.txt`; block 2's allocation and
  estimation claims → `842-10-15-33.txt` items (b) and (a). Both copies
  were verified word for word against Section A as issued (pypdf
  extraction of pp. 13 and 19; 15-33's parenthetical, both lettered items,
  and the initial-direct-costs sentence all match), so the cited wording
  is confirmed unamended and no narration moves. Block 7's inherited
  default-side sourcing and the q-01/q-06 `_source` keys ride along.
  15-31 and 15-38 stay cited from Section A as issued — no Codification
  copies of those arrived. `842-10-15-35.txt` also arrived and is cited
  nowhere; it confirms J3's second-pass determination (it defines what the
  consideration includes and carries no estimation language).
- **Block 6, lessor election restored (J10 closed).** What was restored
  versus the first draft's original wording, exactly:
  - First draft: "Lessors have their own version of this election, and it
    is conditional — broadly, it is available only when the timing and
    pattern of transfer of the combined components line up, and the
    combination has to produce an operating lease".
  - Restored as: "Lessors have their own version of this election, and it
    is conditional: available only when the timing and pattern of transfer
    of the lease component and its associated nonlease components are the
    same, and when the lease component, on its own, would classify as an
    operating lease."
  - Two corrections against `842-10-15-42A.txt`, now that the paragraph
    can be read: "the combined components line up" → the paragraph's own
    objects ("the lease component and nonlease components associated with
    that lease component … are the same"), and — the substantive one —
    the first draft's "the combination has to produce an operating lease"
    misstated condition (b): it is the **lease component, if accounted for
    separately**, that must classify as an operating lease, not the
    combined component. "Broadly" was dropped; with the conditions stated
    per the paragraph there is nothing left to hedge.
  - The second pass's sentences are kept (the restoration is additive),
    with two trims to stay under the 75-second sheet cap: "— and nothing
    in it reaches across the table" and ", the same machinery it uses for
    contracts with customers" came out; without them the block estimates
    at 73s (it would have been 77s). "A different rule, applied by the
    other party" became "A different rule and a different test, applied by
    the other party", recovering the first draft's "a different test".
  - Not restored: nothing else was removed at second pass. The 15-42A
    scope gate (nonlease components otherwise under Topic 606) was never
    in the first draft and stays un-narrated. The first draft's slide
    lines 1–2 ("The lessor election is separate" / "Different test: timing
    and pattern of transfer") stay retired: the second pass's lines 1–2
    survive, and a new line 3 — "Lessor election: same timing and pattern,
    operating lease" — carries both conditions, revealed at
    "conditional". Sheet citation `842-10-15-37; 15-38` → `842-10-15-37;
    15-38; 15-42A`; reveals [6, 22, 38] → [6, 18, 30, 54];
    estimatedSeconds 58 → 73.
- **Ripples:** lo-4 restored to its fuller form, merging both passes
  (first draft: "…the lessor's election is separate and conditional";
  second pass: "…the lessor allocates under its own requirements,
  unaffected by the lessee's election"; now: "…the lessor allocates under
  its own requirements and has its own separate, conditional combination
  election"). q-04 choice (a) and distractor (d) restored verbatim from
  the first draft; its feedback merges the second pass's 15-38 allocation
  grounding with the first draft's conditions, restated per 15-42A (the
  first-draft feedback's "an operating-lease outcome" carried the same
  condition-(b) misstatement and was not restored as written); `_source`
  adds `842-10-15-42A.txt`. q-09 distractor (d) restored verbatim ("A
  class the lessor has also elected to combine") and its feedback line
  restored with "each party decides independently" appended; the
  consent-based stand-ins retire. `meta.sources` adds ASC 842-10-15-42A
  as a supporting citation; the lesson file's header comment now
  describes the third pass; lesson total re-estimated 7m57s → 8m12s
  (`npm run check`).

## Resolution log — fourth pass (2026-08-29, the reviewer's dispositions)

The CPA worked through the remaining judgment items (J1, J4–J7, J9) and
accepted block 6's restored wording as reviewed. Four items closed with
no text change (J4, J5, J6, J9 — dispositions in the judgment list
above). Two narration edits:

- **Block 1, utilities swapped out (J1 closed):** "rent for the space,
  common area maintenance for the lobby she shares, utilities, and a
  service contract for the building's front desk" → "…she shares, and a
  service contract…"; "The maintenance, the utilities, the staffed desk
  are services" → "The maintenance and the staffed desk are services";
  S-01 sheet line 1 "One payment: rent + CAM + utilities + services" →
  "One payment: rent + CAM + services". The example now names only
  components that transfer services, sidestepping 842-10-15-30's
  non-component treatment of pass-through utilities. Both removals sit
  before or between the reveal markers: reveals [11, 24, 34] →
  [11, 24, 33] (words 124 → 122), estimatedSeconds 57 → 56. "Utilities"
  appears nowhere in `src/questions-03.json` — q-01 and q-06 never named
  it, so no question changed.
- **Block 5, softened (J7 closed):** "the saved work is rarely worth what
  it costs" → "the saved work is often not worth what it costs" — a
  tendency in place of a frequency claim. The phrase sits after the
  block's last marker: reveals stay [7, 23, 39], and the one added word
  (143 → 144) leaves estimatedSeconds at 66.

Lesson total re-estimated 8m12s → 8m11s (`npm run check`, 0 errors). The
judgment list is closed. What remains is the human step this document
cannot take: setting `meta.status: "reviewed"` in `src/lesson-03.ts`,
then generating audio (`npm run generate -- --lesson 03` — spends
ElevenLabs credits, the human's step).

## Sources still needed

None block the review — every claim in the lesson traces to an
authoritative file. Optional upgrades: Codification copies of
842-10-15-31 and 15-38 (`.txt`) — cited today from ASU 2016-02 Section A
**as issued**; the Codification files would be the text of record per
`INDEX.md` and would confirm no post-2016 amendment touched the cited
wording. (15-3 and 15-33 have that confirmation since the third pass;
15-42A exists only as its Codification copy.)
