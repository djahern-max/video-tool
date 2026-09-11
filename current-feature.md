# Feature 20 — ATO-02 narration pass: J1, J3, J4 and two consistency fixes

## Goal

Apply Dane's rulings on ATO-02's judgment list, plus the edits that make
`avIsAdditionalLearning: true` honest, before any audio is generated. This
feature edits text only.

## Rulings (Dane, 2026-09-11)

- **J1 — keep** all three interpretive sentences. The one exception is
  block 5's bearer-token gloss, which is removed below for J4 reasons. That
  removal supersedes the keep for that sentence.
- **J3 — move** block 13's WebAuthn citation from `§1` to `§1.3`.
- **J4 — the flag stays `true`**, on the condition that the edits below are
  made. The test is whether the video adds learning the guide does not already
  give. Sentences that *explain a rule the guide already explains* fail that
  test, even when reworded. Sentences that *show what happened in this
  incident* pass it. Blocks 4, 5, 7 and 12 contained guide rules restated;
  their replacements below keep the events and drop the lectures.

## Edits to `src/lesson-02.ts`

Replace the `narration` (and the `items` where given) exactly as written.
Recompute `estimatedSeconds` with the template's formula, and re-estimate
`reveals`. Marker counts are unchanged from the current blocks.

### block-02: the time matches the sheet (16:41)

Change `"Tuesday, twenty to five."` to `"Tuesday, four forty-one in the afternoon."`

### block-04: narration

    [[r]]The page asks for the six-digit code. Her phone has one. She types it in. [[r]]The instant she presses enter, the same six digits go on to her real provider. Ruth did not send them there. The attacker's machine did — the machine that has been sitting between her and the provider since the page loaded, passing every screen she saw through from the real one, and every answer she gave straight on. [[r]]The provider checks the code, and it is right: correct, unused, and inside its window. By every test the provider applies, this is Ruth signing in, eleven seconds after the code reached her phone.

### block-05: narration

    [[r]]The sign-in succeeds, and the provider does what it does after every successful sign-in: it issues a session secret, and hands it to whichever machine finished the sign-in. [[r]]That machine was the attacker's. Ruth sees nothing unusual — no second prompt, no error, no warning, not even a delay long enough to notice. From 4:43 and thirty-five seconds, two people are using the same account, and only one of them knows there are two. [[r]]And Ruth's mailbox opens normally. That is the part worth sitting with. The visible outcome of a finished takeover is a sign-in that worked.

### block-07: narration

This also removes the six-word run "activity resets the inactivity clock",
which appears verbatim in `guide/01/06-session-tokens.md`, not only in NIST.

    [[r]]For the next two days this attacker sends nothing and deletes nothing. He reads. That is a decision, and it is the decision that keeps him inside. [[r]]Every message he opens is activity on Ruth's account, so to the provider it looks like exactly what it is: an account in use. He reads the engagement letters, the fee discussions, and which clients pay by bank transfer, and into which accounts. [[r]]Meanwhile every ordinary safeguard in the building is pointed the wrong way. There is no failed login to lock out, no denied prompt to raise an alert, and nothing on Ruth's laptop for anti-virus to find, because nothing was ever put on it.

Do not add a session-duration figure anywhere in the lesson.

### block-09: narration

Change `"Three things happened that were observable"` to
`"Two things happened that were observable"`. The document store produced
nothing, as the block itself says, so it is not a signal.

### block-11: sheet and narration

- Sheet line 3 becomes `"Signals available: two. Signals read by a person: none"`.
- In the narration, change
  `"All three signals were real and all three were available. Not one of them was read by a person"`
  to
  `"Both signals were real and both were available. Neither was read by a person"`.

### block-12: narration and items

    [[r]]Dev works the response, and he works it in an order that feels backwards. At nine thirty-one he ends every session on Ruth's account, before he touches anything else. [[r]]At nine thirty-six, he changes the password. [[r]]At nine forty-four he opens the list of Ruth's sign-in methods and finds one she has never seen, added on Thursday at ten forty. He removes it, and re-enrols the ones she recognises. Then he pulls the record of everything the account opened that week, and reports the incident. [[r]]And one thing went wrong. Signing out at the sign-on service did not close the document store, which stayed open for another eleven minutes.

`items`:

    "09:31 — Every session on the account ended"
    "09:36 — Password changed"
    "09:44 — An unknown sign-in method found and removed; the known ones re-enrolled"
    "Then — Access audited, incident reported"
    "Missed for eleven minutes: the document store's own session"

### block-13: citation

Change `W3C REC-webauthn-3-20260825 §1` to `§1.3`.

## Check the blocks I could not

Dane's reviewer (Claude, in chat) compared blocks 4, 5, 7 and 12 against
`guide/01/06`, `07` and `11`. Apply the same test to the remaining blocks
against the guide files that were not compared:

- block 3 against `guide/01/02-phishing.md`
- blocks 9 and 11 against `guide/01/10-detection.md`
- block 13 against `guide/01/09-phishing-resistant.md`

Any sentence that explains a rule the guide file already explains gets
replaced with what happened in the incident, flagged `illustration`. Report
every such change with before and after. If you find none, say so.

## Questions

Confirm that each of `q-13`..`q-16` still has its correct answer supported,
by the narration or by `guide/01/`. Update feedback's re-watch pointers if the
supporting sentence moved. If an answer is no longer supported, stop and
report; do not rewrite stems or answers.

## Records

Dane authorises **appending** to `drafts/ATO-02-review.md`, an existing
record. Do not edit any prior content in it. Append a dated section,
"Rulings and narration pass — 2026-09-11", containing:

- the rulings above
- each block changed, with its before and after text
- updated sources and flags for the new sentences
- a re-run overlap report (zero 8-word runs against `guide/01/`, and list any
  6-word runs)
- the new narrated word total

Leave J2, J5 and J6 open.

## Size

Report the new narrated word total and projected runtime at 130 wpm and at
165.5 wpm. If the total falls below **1,400** words, stop and report before
adding anything. Do not pad.

## Out of scope

- `generate` without `--dry-run`, `render`, `export`
- Setting `meta.status`
- Editing `guide/01/`, `sources/` or ATO-01 files
- Changing any block not named above, except as the "Check the blocks I could
  not" section directs

## Acceptance

1. `npm run typecheck` is clean.
2. `npm run check` reports no ERROR naming ATO-02, and ATO-01's findings are
   unchanged.
3. `npm run generate -- --lesson 02 --dry-run` lists 13 blocks and spends
   nothing. Report the character total.
4. The review-record section above is appended, and changelog entry 20 is
   written.
