# ASC842-PCX-02 — The Risk-Free Rate Election — reviewer's document

This is the document a licensed CPA reads **before any narration audio is
generated**. Once a block is voiced, changing one sentence costs an ElevenLabs
regeneration and produces a different take — so every correction is nearly
free now and expensive later.

How to read it: for each block, the narration as drafted (reveal markers
`[[r]]` left in place), the sources relied on with the specific paragraph,
and what each reveal marker reveals. Then the same for each question. The
lesson data lives in `src/lesson-02.ts` and `src/questions-02.json`; edit
those files, not this one.

**Status, third pass (2026-08-29) — judgment list CLOSED.** The reviewer
worked through J2–J7 and disposed of every item (J1 closed at second
pass): five confirmations and one softening, J4, which is the pass's only
text change — word-count-neutral, so no timing moved. Dispositions are
recorded against each item below and in the third-pass Resolution log.
Nothing is UNSOURCED, no sources are outstanding, and no judgment items
remain. The one step left is the human's alone: set `meta.status:
"reviewed"` by hand in `src/lesson-02.ts` (it is still `"draft"`, and
export refuses it until then). Voicing comes after that.

**Status, second pass (2026-08-29).** Both `Sources still needed` items are
now in `sources/asc842/` and cited; the block 1 UNSOURCED flag is resolved
(J1 closed, with one narration edit) and the disclosure citation is upgraded
to the Codification file. The Resolution log below the judgment list records
every change. The open judgment list is J2–J7. Still unvoiced;
`meta.status` is `"draft"`; export refuses it.

**Status, first draft (2026-08-27).** Unreviewed and unvoiced. One UNSOURCED
flag (block 1); the open judgment list (J1–J7) is at the bottom, with a
`Sources still needed` list. `meta.status` is `"draft"`; export refuses it.

Primary source: `842-20-30-3.txt` (the paragraph as amended by ASU 2021-09 —
the Codification file is the text of record). `ASU_2021-09.txt` /
`ASU_2021-09.pdf` supply the Basis for Conclusions (BC paragraphs cited
below; quote from the PDF where exact wording matters, per `INDEX.md`).

Learning objectives (from `src/lesson-02.ts`):

- **lo-1** — Determine the discount rate for a lessee's lease under
  842-20-30-3: the rate implicit in the lease whenever it is readily
  determinable, otherwise the incremental borrowing rate or an elected
  risk-free rate.
- **lo-2** — Apply the risk-free rate election: identify the lessees eligible
  to elect, select a risk-free rate for a period comparable with the lease
  term, and state the disclosure the election requires.
- **lo-3** — Explain why ASU 2021-09 changed the election from entity-wide to
  by class of underlying asset, and what the change lets a lessee do.
- **lo-4** — Compute the effect of a lower discount rate on the initial lease
  liability and right-of-use asset, and weigh it against the cost of
  determining an incremental borrowing rate.

---

## Block 1 — S-01 — Statement — "the problem"

**Narration as drafted**

> Same controller, new problem. Her company signs a five-year office lease,
> and this one goes on the balance sheet — which means discounting the
> payments, which means picking a rate. The standard's default is the
> company's incremental borrowing rate: roughly, what it would pay to borrow
> a similar amount, on a secured basis, over a similar term. But the company
> has [[r]]no bank debt, no rated paper, no borrowing history — nothing to
> read a rate from.
> When the Board asked, preparers said building and defending an incremental
> borrowing rate was [[r]]costly and complex, that private companies rarely
> have treasury functions or quoted credit spreads, and that some were hiring
> valuation experts to produce this one input. [[r]]All of that, for a single
> number in a present value formula. This lesson is about the way out.

**Sources**
- `ASU_2021-09.txt` BC7 — "the processes for determining and substantiating a
  lessee's incremental borrowing rate were both costly and complex to
  implement"; non-PBEs "may not have sophisticated treasury functions or
  readily available information (such as quoted or comparable credit
  spreads)"; "an even greater need … to engage external valuation experts".
  Supports the whole middle of the block nearly clause for clause.
- `glossary-incremental-borrowing-rate.txt` — "roughly, what it would pay to
  borrow a similar amount, on a secured basis, over a similar term" tracks
  the definition element for element: the rate "to borrow on a collateralized
  basis over a similar term an amount equal to the lease payments". "On a
  secured basis" was added at second pass to carry the definition's
  "collateralized"; "roughly" still hedges what the gloss compresses (the
  amount is "an amount equal to the lease payments", and the definition's
  "in a similar economic environment" is not narrated). J1 closed — see the
  Resolution log.
- "The standard's default is the company's incremental borrowing rate" —
  `842-20-30-3.txt` second sentence (taught fully in block 2).

**Reveals** (3 markers, 3 statement lines; all three recomputed for the new
text — [26, 40, 52] → [28, 42, 54]; estimatedSeconds 61 → 63)
1. before "no bank debt" → "Nothing to read a borrowing rate from"
2. before "costly" → "Building an IBR: costly, complex, often outsourced"
3. before "All of that" → "All that work for one number"

---

## Block 2 — S-02 — Statement — the paragraph's three sentences

**Narration as drafted**

> The discount rate paragraph answers her in three sentences. First: a lessee
> uses the [[r]]rate implicit in the lease whenever that rate is readily
> determinable — and practice reads readily determinable as a high bar, so
> in practice the first sentence rarely applies. Second: when the implicit rate
> is not readily determinable, the lessee uses its [[r]]incremental borrowing
> rate. That is the default the controller was dreading. Third, the relief.
> The standard says: a lessee that is not a public business entity is
> permitted to use a [[r]]risk-free discount rate for the lease instead of
> its incremental borrowing rate, determined using a period comparable with
> that of the lease term, as an accounting policy election made by class of
> underlying asset. Who may elect, what rate, and how the election is made —
> the rest of this lesson takes those in turn.

**Sources**
- `842-20-30-3.txt` — all three sentences track the paragraph in order; the
  "the standard says" quotation is the third sentence nearly verbatim (the
  narration inserts "the lease" reading exactly as the file does; confirm
  against the Codification, J6).
- `ASU_2021-09.txt` BC18 — "practice has consistently interpreted the
  'readily determinable' threshold as a high bar". The follow-on was
  softened at the reviewer's direction (J4): "so most lessees never clear
  the first sentence" (a frequency claim about lessees) → "so in practice
  the first sentence rarely applies" (a claim about practice, squarely
  BC18's). Same word count — reveals and estimatedSeconds unchanged.

**Reveals** (3 markers, 3 statement lines)
1. before "rate implicit" → "Implicit rate — whenever readily determinable"
2. before "incremental" → "Otherwise: the incremental borrowing rate"
3. before "risk-free" → "Non-PBE lessees: a risk-free rate, by class"

---

## Block 3 — S-03 — Facts — what the rate is

**Narration as drafted**

> So what is the company actually electing to use? A [[r]]risk-free rate,
> determined — the paragraph's words — using a period comparable with that of
> the lease term. The standard never names a source, but the Board's
> discussion does: the working example is a [[r]]U.S. Treasury rate, publicly
> published by a reliable source, at maturities that line up with lease
> terms. That is the whole appeal. No model, no credit spread, no valuation
> report: for a [[r]]five-year office lease, a five-year Treasury yield, read
> off a public curve when the lease commences. And the [[r]]matching is the
> one discipline the election keeps: a comparable period means the five-year
> lease does not get the overnight rate because it is lower, or the ten-year
> because it is handy.

**Sources**
- `842-20-30-3.txt` — "determined using a period comparable with that of the
  lease term" (quoted with attribution "the paragraph's words").
- `ASU_2021-09.txt` BC8 ("a risk-free rate (for example, a U.S. Treasury
  rate)") and BC22 ("publicly published by a reliable source and available
  for differing maturities (lease terms)") — the Treasury example and its
  virtues.
- `ASU_2021-09.txt` BC5 — "afterwards it is determined at the commencement
  date of the lease": supports "when the lease commences".
- The overnight/ten-year closing is an application of the
  comparable-period requirement, not a quotation.

**Reveals** (4 markers, 4 facts rows)
1. before "risk-free rate" → row "The rate: Risk-free, for a comparable period"
2. before "U.S. Treasury" → row "Practical source: U.S. Treasury yields"
3. before "five-year office lease" → row "A five-year lease: The five-year yield"
4. before "matching" → row "The discipline: Match the term, at commencement"

---

## Block 4 — S-04 — Statement — the history: all-or-nothing to by-class

**Narration as drafted**

> The by-class part is the new part, and the history explains the election
> better than the rule does. As issued in twenty sixteen, the election was
> [[r]]all or nothing: elect the risk-free rate and it applied to every lease
> the company had. Companies would not take that deal. A risk-free rate is
> [[r]]low, and a lower rate discounts less, so electing everywhere grossed
> up the balance sheet most on the leases that mattered most — real estate
> first. What preparers told the Board they wanted was the simple rate for
> the [[r]]small classes — high-volume, low-dollar office equipment — and a
> real borrowing rate for the big ones. In twenty twenty-one the Board agreed
> and remade the election [[r]]by class of underlying asset. Not a new rate;
> permission to draw the line where the cost sits.

**Sources**
- `ASU_2021-09.txt` BC6 — the original election ("use a risk-free rate as the
  discount rate for all leases") and its 2016 origin.
- BC8 — the reluctance: a risk-free rate "is low compared with the average
  incremental borrowing rate", producing "lease liabilities and right-of-use
  assets that are greater".
- BC9 and BC15 — the by-class request and the Board's framing: incremental
  borrowing rate for "material asset classes (such as real estate)", risk-free
  for "asset classes that have lower values or greater volumes of leases
  (such as office equipment)"; "eliminating the 'all or nothing' nature of
  the election".
- This block is the feature's named teaching moment (the Basis for
  Conclusions' reason for the change).

**Reveals** (4 markers, 4 statement lines)
1. before "all or nothing" → "As issued: one election, every lease"
2. before "low" → "A lower rate means a larger liability"
3. before "small classes" → "Wanted: the simple rate for the small classes"
4. before "by class" → "ASU 2021-09: elect by class of underlying asset"

---

## Block 5 — S-05 — Calc — the trade, in dollars

**Narration as drafted**

> Now the trade, in dollars. One office lease, both rates: [[r]]sixty monthly
> payments of five thousand dollars — three hundred thousand dollars over the
> term. Suppose the incremental borrowing rate, if the company built one,
> would land near [[r]]seven percent: the payments discount to roughly two
> hundred fifty-two thousand five hundred dollars of lease liability, with a
> matching right-of-use asset. Elect the risk-free rate instead — say
> [[r]]four percent for a comparable five-year period — and the same payments
> discount to roughly two hundred seventy-one thousand five hundred dollars.
> [[r]]Nineteen thousand dollars more balance sheet, both sides, for the
> identical lease. That is the price of the shortcut. A risk-free rate sits
> below any real borrowing rate, a lower rate leaves more of the payments
> undiscounted, and what discounting does not remove, the balance sheet
> keeps.

**Sources**
- `ASU_2021-09.txt` BC8 — direction of the effect: the risk-free rate
  election results "in recognizing lease liabilities and right-of-use assets
  that are greater than those recognized using the lessee's incremental
  borrowing rate".
- The arithmetic is illustrative: $5,000 × 60 monthly in arrears; PV at
  7%/12 ≈ $252,505 (narrated "roughly $252,500"); PV at 4%/12 ≈ $271,465
  (narrated "roughly $271,500"); difference ≈ $18,960 (narrated "nineteen
  thousand"). Needs the reviewer's blessing, as lesson 1's ≈$23,400 got (J3).
- The 7% IBR and 4% risk-free rate are invented plausible figures, not
  sourced rates (also J3).

**Reveals** (4 markers, 7 calc rows — rows without their own marker appear
with the last marked one)
1. before "sixty monthly" → rows "Office lease: 60 months × $5,000" and
   "Total payments: $300,000"
2. before "seven percent" → rows "At a 7% IBR — lease liability: ≈ $252,500"
   and "At a 7% IBR — ROU asset: ≈ $252,500"
3. before "four percent" → rows "At a 4% risk-free — lease liability:
   ≈ $271,500" and "At a 4% risk-free — ROU asset: ≈ $271,500"
4. before "Nineteen thousand" → row "Extra balance sheet, same lease:
   ≈ $19,000" (flag-pink emphasis)

---

## Block 6 — S-06 — Statement — the exception inside the election

**Narration as drafted**

> One exception sits inside the election, and the Board put it there
> deliberately. The paragraph's first sentence never stops applying: the
> standard says, a lessee should use the rate implicit in the lease
> [[r]]whenever that rate is readily determinable. Whenever — election or no
> election. So if the company elects the risk-free rate for its
> [[r]]equipment class, and for one equipment lease the lessor's pricing
> makes the implicit rate readily determinable, that one lease is discounted
> at the implicit rate — not the elected risk-free rate, and not an
> incremental borrowing rate. That fact pattern is the Board's own example in
> the Basis for Conclusions. In practice the exception [[r]]rarely bites —
> readily determinable stays a high bar, and the Board expects little effort
> spent proving a rate cannot be found — but where it bites, it outranks the
> election.

**Sources**
- `842-20-30-3.txt` first sentence — quoted with "the standard says".
- `ASU_2021-09.txt` Summary ("require that when the rate implicit in the
  lease is readily determinable for any individual lease, the lessee use
  that rate … regardless of whether it has made the risk-free rate
  election") and BC17–BC19 — the two rejected interpretations and the
  Board's decision.
- BC18 — the equipment-class example, nearly verbatim; also "the Board does
  not expect that an entity would have to expend much effort substantiating
  that it cannot readily determine the rate implicit in the lease", behind
  "little effort spent proving a rate cannot be found".

**Reveals** (3 markers, 3 statement lines)
1. before "whenever" → "“…whenever that rate is readily determinable”"
2. before "equipment class" → "One lease's implicit rate beats the elected class rate"
3. before "rarely bites" → "A high bar — rare, but it outranks the election"

---

## Block 7 — S-07 — Facts — who gets it, and the disclosure

**Narration as drafted**

> Who gets the election? The standard draws exactly one line: a lessee that
> is [[r]]not a public business entity. Public companies are out; everyone
> else is in. And the Board spelled out how wide everyone else runs:
> [[r]]not-for-profit entities — whether or not they are conduit bond
> obligors — and employee benefit plans are not public business entities, so
> they may elect. Keep that scope separate from lesson four's common control
> expedient, which does carve out conduit bond obligors; the two lists are
> close enough to mix up and different enough to matter. One string comes
> attached. A lessee that elects must [[r]]disclose the election, and the
> class or classes of underlying assets it applies to. The relief is in the
> measurement, never in the telling.

**Sources**
- `842-20-30-3.txt` — "A lessee that is not a public business entity is
  permitted…": the single scope line.
- `ASU_2021-09.txt` Summary ("affect lessees that are not public business
  entities, including all not-for-profit entities (whether or not they are
  conduit bond obligors) and employee benefit plans") and BC13 (the same,
  from the PBE definition).
- `842-20-50-10.txt` — "shall disclose its election and the class or classes
  of underlying assets to which the election has been applied". The
  Codification copy is the text of record per `INDEX.md` (upgraded at second
  pass from the ASU 2021-09 amendment ¶3 text that added the paragraph; the
  two match word for word).
- **Note for the reviewer (J2):** the planning arc for this block said PBEs
  *and NFP conduit bond obligors* cannot use the election. The sources say
  otherwise — conduit bond obligors are expressly in scope for ASU 2021-09
  (they are excluded from the ASU 2023-01 expedient, lesson 4). The block is
  drafted per the sources and teaches the contrast explicitly. Confirm.

**Reveals** (3 markers, 3 facts rows)
1. before "not a public business entity" → row "Excluded: Public business entities"
2. before "not-for-profit entities" → row "Eligible: All other lessees — NFPs
   (even conduit bond obligors), EBPs"
3. before "disclose" → row "Required disclosure: The election, and the
   classes it covers"

---

## Block 8 — S-08 — List — three questions before electing

**Narration as drafted**

> Three questions before electing the risk-free rate. [[r]]First, where does
> the cost fall? The election is by class, so weigh it class by class:
> high-volume, low-dollar classes are where incremental borrowing rate work
> costs the most and informs the least. [[r]]Second, can the balance sheet
> carry it? The risk-free rate runs below any real borrowing rate, so the
> liability and asset start larger — and the Board noted a larger present
> value can even tip a lease from operating into finance classification.
> [[r]]Third, is any lease's implicit rate readily determinable? If so, that
> lease uses it, election or not. Answer those three, elect by class,
> disclose the election and its classes — and the company that has never
> borrowed never has to invent the rate at which it would.

**Sources**
- Summary block; each question restates an earlier block and carries that
  block's source: by-class weighing (BC9/BC15, block 4), the larger balance
  sheet (BC8, block 5), the implicit-rate exception (842-20-30-3 first
  sentence and BC17–19, block 6), the disclosure (`842-20-50-10.txt`,
  block 7).
- BC8 — "It also could cause leases that otherwise would be classified as
  operating leases to be classified as finance leases": the classification
  sentence, new in this block (J5).

**Reveals** (3 markers, 3 list items)
1. before "First" → item "Where does the IBR cost fall? Weigh it class by class"
2. before "Second" → item "A lower rate grows the liability — and can tip classification"
3. before "Third" → item "A readily determinable implicit rate always wins"

---

# Questions

Shape notes: five review questions (each placed after the narrated block it
tests, `after_block` counted over narrated blocks 1–8, no two on the same
block) and four assessment questions (four choices each, one per learning
objective, so all four objectives are measured — course rule 1). Feedback
follows 5.01.2.2. Each question carries a `_source` comment key; the
validator tolerates unknown keys.

**q-01 · review · after block 2 · tests lo-1.** No implicit rate, no
election → incremental borrowing rate. Source: `842-20-30-3.txt`.
Distractor (b) is the election-as-default error, (c) the
estimable-equals-readily-determinable error, (d) hierarchy-as-choice.

**q-02 · review · after block 3 · tests lo-2.** Four-year vehicle lease
under the election → risk-free rate for a comparable four-year period.
Sources: `842-20-30-3.txt` (comparable period); BC22 (Treasury example).
Distractors (b)/(d) drop the term matching in opposite directions.

**q-03 · review · after block 4 · tests lo-3.** Pre-2021-09 reluctance: the
all-or-nothing election inflated the liabilities that mattered most.
Sources: BC6, BC8–BC9, BC15.

**q-04 · review · after block 5 · tests lo-4.** Lower rate → larger initial
liability and ROU asset. Source: BC8; the 7%/4% figures are the block's
illustrative arithmetic (J3). Distractor (b) is the interest-intuition
inversion. Assessment q-09 tests the same direction with a decision framing;
the stems differ (course rule 2 checked by `npm run check`).

**q-05 · review · after block 7 · tests lo-2.** Only a public business
entity is prohibited; the conduit-bond-obligor and EBP distractors are the
lesson-4 scope confusion, and the feedback says so. Sources:
`842-20-30-3.txt`; ASU 2021-09 Summary/BC13 (J2).

**q-06 · assessment · tests lo-1.** Elected equipment class, one lease with
a readily determinable implicit rate → implicit rate. Sources:
`842-20-30-3.txt` first sentence; BC17–BC19 (the Board's own example).

**q-07 · assessment · tests lo-2.** Mechanics: policy election by class,
rate for a comparable period. Source: `842-20-30-3.txt` final sentence.
Distractor (b) is the pre-amendment entity-wide rule.

**q-08 · assessment · tests lo-3.** What ASU 2021-09 changed: by-class
instead of entity-wide, plus the implicit-rate requirement. Sources: ASU
Summary; BC6 (against "created it"); BC21–BC23 (corporate bond rate
rejected — distractor (c)).

**q-09 · assessment · tests lo-4.** Electing 4% over a 7% IBR → larger
liability and ROU asset, in exchange for skipping the IBR work. Sources:
BC7, BC8; figures are the block-5 arithmetic (J3).

---

## Judgment list — CLOSED (third pass, 2026-08-29)

J1 closed at second pass — see the second-pass Resolution log. J2–J7
disposed by the reviewer at third pass:

- **J2 (block 7, q-05) — CONFIRMED as drafted.** The scope correction
  stands: NFP conduit bond obligors are in scope for the ASU 2021-09
  election (they are excluded only from lesson 4's ASU 2023-01 expedient),
  and the cross-lesson contrast sentence stays.
- **J3 (block 5, q-04, q-09) — VERIFIED and blessed.** The arithmetic
  (≈ $252,500 at 7%, ≈ $271,500 at 4%, monthly in arrears, 60 × $5,000,
  ≈ $19,000 difference) and the invented 7%/4% rates themselves.
- **J4 (block 2) — SOFTENED.** "so most lessees never clear the first
  sentence" → "so in practice the first sentence rarely applies". The
  pass's only text change; see the Resolution log.
- **J5 (block 8) — CONFIRMED.** The operating-to-finance classification
  warning stays in the summary block, attributed as "the Board noted"
  (BC8).
- **J6 (blocks 2, 6) — CONFIRMED against the Codification.**
  `842-20-30-3.txt` matches the live paragraph as amended; both "the
  standard says" quotations stand.
- **J7 (block 1, voice) — CONFIRMED.** The recurring-controller frame
  matches lesson 1's tone; "no rated paper" and the second pass's "on a
  secured basis" both stay as drafted.

## Resolution log — second pass (2026-08-29)

Both `Sources still needed` items arrived in `sources/asc842/` (and
`INDEX.md`) on 2026-08-29; the first-draft UNSOURCED flag and the interim
citation are resolved against them:

- **Block 1, cited and edited (J1 closed):** the incremental-borrowing-rate
  gloss → `glossary-incremental-borrowing-rate.txt`. The glossary confirmed
  what the flag suspected: the definition reads "on a collateralized basis"
  and the gloss omitted it, so per J1's standing question, "secured" went
  in. One narration edit: "borrow a similar amount over a similar term" →
  "borrow a similar amount, on a secured basis, over a similar term".
  Sheet citation `ASU 2021-09 BC7` → `ASU 2021-09 BC7; Glossary`; reveals
  recomputed [26, 40, 52] → [28, 42, 54] (all three markers sit after the
  inserted words); estimatedSeconds 61 → 63; `meta.sources` adds the
  glossary as a supporting citation. "Roughly" stays — the gloss still
  compresses "an amount equal to the lease payments" and drops "in a
  similar economic environment".
- **Blocks 7 and 8, citation upgraded:** the disclosure sentence →
  `842-20-50-10.txt`, the text of record per `INDEX.md`, replacing the ASU
  2021-09 amendment ¶3 text that added the paragraph. The two match word
  for word, so nothing in the narration, sheets, or questions moves; the
  lesson's on-screen citations ("842-20-30-3; 50-10" on S-07) already
  pointed at the Codification number.

## Resolution log — third pass (2026-08-29, the reviewer's dispositions)

The CPA worked through J2–J7. Five items closed by confirmation with no
text change (J2, J3, J5, J6, J7 — dispositions recorded in the judgment
list above). One narration edit:

- **Block 2, softened (J4 closed):** "so most lessees never clear the
  first sentence" → "so in practice the first sentence rarely applies" —
  a claim about lessees becomes a claim about practice, which is what
  BC18 actually supports ("practice has consistently interpreted the
  'readily determinable' threshold as a high bar"). The replacement is
  word-for-word the same length: word count 142 either way, so reveals
  stay [6, 26, 40] and estimatedSeconds stays 66 (recomputed and
  confirmed; `npm run check` clean, 0 errors).

The judgment list is closed. What remains is the human step this document
cannot take: setting `meta.status: "reviewed"` in `src/lesson-02.ts`,
then generating audio (`npm run generate -- --lesson 02` — spends
ElevenLabs credits, the human's step).

## Sources still needed

None — every claim in the lesson now traces to an authoritative file in
`sources/asc842/`.
