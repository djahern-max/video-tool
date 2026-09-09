# ATO-01 — UNSOURCED flag triage checklist

A working checklist for one sitting: all 41 `UNSOURCED` flags from
`drafts/ATO-01-review.md`, re-presented in the order that clears fastest.
`drafts/ATO-01-review.md` stays the accuracy record — this file decides nothing
and resolves nothing; `meta.status` stays `"draft"` until it is worked through.

---

## Confirm-fast — 8 flags

Composed scenarios, aphorisms, boundary statements and the audience claim.
Default on every one is to keep or confirm; the question is only whether it
reads honestly.

- [ ] **sec-00 · descriptive · front matter** — default: confirm
      > It is written for licensed CPAs in small firms, where there is no security
      > operations team and the person who notices the problem is usually the person
      > who has to act on it.
      Does this match how the course will be marketed and registered?
      `guide/01/00-front-matter.md`

- [ ] **sec-01 · framing · lo-1** — default: keep
      > The verifier never sees the person; it sees evidence.
      Restates App. D as an aphorism. True as stated? Does it oversell?
      `guide/01/01-why-credentials.md`

- [ ] **sec-05 · framing · lo-1, lo-4** — default: keep
      > MFA is a test applied at one moment. It establishes that whoever completed
      > the ceremony had the factors.
      The hinge the section turns on. True as stated? Does it oversell?
      `guide/01/05-what-mfa-stops.md`

- [ ] **sec-08 · illustration · lo-4** — default: keep
      > A person, at eleven at night, with a phone that will not stop buzzing, who
      > taps the thing that makes it stop.
      Composed scenario; needs no source. Fair?
      `guide/01/08-mfa-fatigue.md`

- [ ] **sec-08 · illustration · lo-4** — default: keep
      > A caller who sounds like the help desk, referring to a real ticket, asking
      > for the code that has just arrived, is running the section 07 attack with a
      > human being as the proxy.
      Composed scenario; its components are sourced. Fair and plausible?
      `guide/01/08-mfa-fatigue.md`

- [ ] **sec-08 · framing · lo-4** — default: keep
      > Every method whose security ends in a person deciding correctly can be
      > attacked by making the person decide incorrectly.
      Aphorism. True as stated? Does it oversell?
      `guide/01/08-mfa-fatigue.md`

- [ ] **sec-09 · framing · lo-4** — default: keep
      > The methods in sections 05 through 08 differ from each other in how hard they
      > are to attack. This one differs in whether the attack is available.
      Aphorism. True as stated? Does it oversell?
      `guide/01/09-phishing-resistant.md`

- [ ] **sec-90 · boundary only · glossary** — default: keep
      > Catalogued as MITRE ATT&CK T1110.004, a sub-technique of T1110, Brute Force.
      Does the entry say in its own text that no source defines the term?
      `guide/01/90-glossary.md`

---

## Confirm the inference — 18 flags

The premises are sourced in every one of these. The only question is whether
the conclusion follows.

- [ ] **sec-01 · interpretive · lo-1** — default: confirm inference
      > An attacker who compromises a machine has a machine. An attacker who compromises an
      > account has whatever that account can reach and whatever it can authorize — and can
      > often keep that access after the machine has been wiped and replaced.
      Second clause reasoned from 63B-4 §5.1; no source states it. Opening claim.
      `guide/01/01-why-credentials.md`

- [ ] **sec-02 · interpretive · lo-1, lo-2** — default: confirm inference
      > that is the fact the protocol itself binds to, and it is the fact a person can
      > read in the address bar.
      §3.2.5.2 sources the protocol half, not the read-it-yourself half. lo-2 rests here.
      `guide/01/02-phishing.md`

- [ ] **sec-02 · interpretive · lo-1, lo-2** — default: confirm inference
      > A connection indicator tells you the connection is protected. It does not tell
      > you who is on the other end of it.
      From §3.2.5.1. Confirm it cannot read as contradicting §6.2 Table 4's lock icon.
      `guide/01/02-phishing.md`

- [ ] **sec-03 · interpretive · lo-1** — default: confirm inference
      > That last requirement is the direct answer to credential stuffing.
      Blocklists may include breach corpuses; the connection to stuffing is the author's.
      `guide/01/03-credential-stuffing.md`

- [ ] **sec-03 · interpretive · lo-1** — default: confirm inference
      > A practice can be compromised this way without any attacker ever having touched
      > it, without a single suspicious email arriving, and without anything having gone
      > wrong on any of its computers.
      Follows from the technique's boundary; stated in no source. Does it follow?
      `guide/01/03-credential-stuffing.md`

- [ ] **sec-03 · interpretive · lo-1** — default: confirm inference
      > Long, unique, screened passwords defeat stuffing and slow guessing.
      *Unique* is user advice; 63B-4 binds verifiers and never addresses reuse.
      `guide/01/03-credential-stuffing.md`

- [ ] **sec-04 · interpretive · lo-1, lo-3** — default: confirm inference
      > Malware running with the user's privileges can read the first and cannot read
      > the second.
      Conclusion follows §3.2.13's stated intent; the privilege framing is unsourced.
      `guide/01/04-infostealers.md`

- [ ] **sec-04 · interpretive · lo-1, lo-3** — default: confirm inference
      > They do not need the password, because the password's job is finished. They do
      > not need the second factor, because the second factor's job is finished too.
      Follows from §5.1; stated as rhetoric. Does it follow?
      `guide/01/04-infostealers.md`

- [ ] **sec-05 · interpretive · lo-1, lo-4** — default: confirm inference
      > A six-digit code is a number. Nothing about it says which login it belongs to.
      Paraphrase of §3.2.5's binding sentence. Is the paraphrase faithful?
      `guide/01/05-what-mfa-stops.md`

- [ ] **sec-06 · interpretive · lo-3** — default: confirm inference
      > A bearer token authorises whoever bears it. There is no further test of who
      > that is.
      §5.1 uses "bearer tokens" without defining it. lo-3 rests on this gloss.
      `guide/01/06-session-tokens.md`

- [ ] **sec-06 · interpretive · lo-3** — default: confirm inference
      > There is no point in the flow at which the service has a reason to ask for a
      > second factor, because from the service's side nothing anomalous is happening.
      Follows from §5.1's continuity requirement. Does it follow?
      `guide/01/06-session-tokens.md`

- [ ] **sec-07 · interpretive · lo-3, lo-4** — default: confirm inference
      > Replay resistance answers a question this attack never asks.
      §3.2.7 and §3.2.5 are each sourced; setting them side by side is the author's.
      `guide/01/07-proxy-phishing.md`

- [ ] **sec-08 · interpretive · lo-4** — default: confirm inference
      > An attacker cannot get a number-matching prompt approved by nagging, because the
      > user has nothing to nag *with*; there is a value to be entered, and the attacker
      > does not have it to give.
      Follows CISA's "resistant to push bombing" rating; the mechanism is the author's.
      `guide/01/08-mfa-fatigue.md`

- [ ] **sec-09 · interpretive · lo-4** — default: confirm inference
      > There is nothing for the user to get wrong. The check is not "did the person
      > notice the domain" — it is the protocol declining to produce an output at all.
      WebAuthn §1 scoping plus §3.2.5's vigilance clause. lo-4's payoff sentence.
      `guide/01/09-phishing-resistant.md`

- [ ] **sec-10 · interpretive · lo-5** — default: confirm inference
      > Velocity and geolocation together are why a sign-in from another continent
      > minutes after one from your office is treated as suspicious.
      §5.3 lists the characteristics; it does not describe impossible travel.
      `guide/01/10-detection.md`

- [ ] **sec-10 · interpretive · lo-5** — default: confirm inference
      > Repeated MFA prompts that nobody initiated are the push-bombing attack of
      > section 08, visible in the logs while it is still failing.
      Bridges CISA's alerting advice to section 08's attack. Does it follow?
      `guide/01/10-detection.md`

- [ ] **sec-11 · interpretive · lo-6** — default: confirm inference
      > Remove every authenticator you do not recognise.
      §4.3 and §4.5 place the obligation on the CSP, not the subscriber.
      `guide/01/11-response.md`

- [ ] **sec-11 · interpretive · lo-6** — default: confirm inference
      > A password change on its own leaves the stolen session alive, and the stolen
      > session is the access.
      Compression of section 06's sourced mechanism. Does it follow?
      `guide/01/11-response.md`

---

## Needs a decision — 12 flags

Bare `UNSOURCED`: nothing in `sources/sec/` supports these. Source it, reword
it, or cut it.

- [ ] **sec-02 · bare · lo-1, lo-2** — default: decide
      > Nothing about the visual design of that page is evidence of anything. A logo is
      > a copied image. Layout is copied markup.
      True and uncontroversial, but stated on no authority.
      `guide/01/02-phishing.md`

- [ ] **sec-02 · bare · lo-1, lo-2** — default: decide
      > A well-built harvest page forwards the victim to the genuine service afterwards,
      > so the visible outcome is an ordinary, if slightly odd, sign-in.
      Nothing in the source set describes post-harvest forwarding.
      `guide/01/02-phishing.md`

- [ ] **sec-04 · bare · lo-1, lo-3** — default: decide
      > A password in a browser store is software-readable by design; it has to be,
      > because the browser has to fill it in.
      The gap `INDEX.md` names, and the section's central mechanism claim.
      `guide/01/04-infostealers.md`

- [ ] **sec-07 · bare · lo-3, lo-4** — default: decide
      > This is what the glossary calls an adversary-in-the-middle attack.
      The term appears in none of the four sources. Should the course carry it at all?
      `guide/01/07-proxy-phishing.md`

- [ ] **sec-07 · bare · lo-3, lo-4** — default: decide
      NO SENTENCE — this flag is on an absence, not on text. It reserves the
      claim that automated proxy toolkits relay the full ceremony without a
      human operator. The guide does not make it. Decide only if someone
      proposes adding it; it would need a source this set does not have.
      `guide/01/07-proxy-phishing.md`

- [ ] **sec-10 · bare · lo-5** — default: decide
      > **Mail rules created without the user's knowledge** — a forwarding or auto-delete
      > rule appearing in a mailbox the user did not configure.
      Named unsupported in the guide's own text. Source it or leave the flag. See J7.
      `guide/01/10-detection.md`

- [ ] **sec-10 · bare · lo-5** — default: decide
      > **A list of unfamiliar active sessions or devices** on the account's own
      > security page, which not every provider exposes to the user.
      Named unsupported in the guide. sec-11 step 1 depends on it. See J7.
      `guide/01/10-detection.md`

- [ ] **sec-10 · bare · lo-5** — default: decide
      > which is part of why what you can see of them varies from provider to provider.
      §5.3's privacy-assessment requirement does not establish provider variation.
      `guide/01/10-detection.md`

- [ ] **sec-11 · bare · lo-6** — default: decide
      > Revoke, then change, then re-enrol.
      The ordering itself — the spine of the section. lo-6 is assessed on it. See J8.
      `guide/01/11-response.md`

- [ ] **sec-11 · bare · lo-6** — default: decide
      > Sign out everywhere the account offers it, and revoke active sessions and
      > connected applications.
      Presumes a user-facing revocation control exists. Same gap as sec-10. See J7.
      `guide/01/11-response.md`

- [ ] **sec-11 · bare · lo-6** — default: decide
      > long, unique to this service, not a variation on the old one.
      63B-4 binds verifiers, not subscribers; "unique to this service" is unaddressed.
      `guide/01/11-response.md`

- [ ] **sec-90 · bare · glossary** — default: decide
      > Two entries — adversary-in-the-middle and infostealer — are in common use but are
      > defined by none of this course's authoritative sources; both say so.
      No source defines either term. One flag, two entries.
      `guide/01/90-glossary.md`

---

## Class not in the triage table — 3 flags

`drafts/ATO-01-review.md` assigns these three flags classes the triage table
does not list: `analogy`, `judgment`, `elaboration`. Assigning them a default
would mean choosing a mapping, which is a judgment this checklist is not
allowed to make. They are recorded with their real class and no default. See
the reconciliation report.

- [ ] **sec-01 · analogy · lo-1** — default: none assigned
      > An accounting practice is built the same way.
      (the flag covers the whole paragraph that sentence opens)
      CISA names attorneys and HR staff; extending that to a CPA practice's mailbox,
      document store and professional standing is the author's reasoning.
      `guide/01/01-why-credentials.md`

- [ ] **sec-02 · judgment · lo-1, lo-2** — default: none assigned
      > **Observable at this step:** tone, timing, and the plausibility of the request —
      > all of them judgment calls, and all of them things a competent attacker is
      > deliberately managing.
      `guide/01/02-phishing.md`

- [ ] **sec-07 · elaboration · lo-3, lo-4** — default: none assigned
      > It passes it straight through to the real service, in real time, and passes the
      > real service's responses back
      > … while the victim is still looking at the loading spinner
      Mechanism is §3.2.5's relay; the step-by-step narration and the spinner are not.
      `guide/01/07-proxy-phishing.md`

---

## Judgment items

Four of the ten in `drafts/ATO-01-review.md`. The other six are mechanical or
already settled. Numbering is the review document's and is unchanged.

- [ ] **J4 — the guide contradicts a CISA recommendation in print.**
      Section 03 states that CISA-PHISH's SMB password advice is superseded by
      63B-4 §3.1.1.2 items 5 and 6. Decide whether to publish a course that tells
      CPAs a CISA recommendation is out of date, and whether the paragraph reads as
      "newer guidance governs" rather than "CISA is wrong."

- [ ] **J5 — the number-matching distinction in section 08.**
      CISA's number matching (the user *types* a value) is a permitted transfer under
      §3.1.3; what §3.1.3 disallows is compare-and-approve, including choose-from-a-list.
      Decide whether section 08 draws that line correctly. An edit in either direction
      produces a false statement.

- [ ] **J7 — two detection indicators are unsupported, and section 11 depends on one.**
      Section 10 flags mail rules and the account's active-session list; section 11's
      first response step presumes the session list exists. Decide: source both, or
      accept that the most practically useful advice in the last two sections rests on
      common knowledge rather than on this source set.

- [ ] **J8 — the response ordering in section 11 is unsourced and lo-6 is assessed on it.**
      "Revoke, then change, then re-enrol" is a synthesis: the mechanism under it is
      sourced, the sequence is not. Decide whether you are confident in it as the record,
      or whether the section needs a source or a softer framing. Feature 16's assessment
      question for lo-6 is blocked until this is settled.

---

## Reconciliation report

### Per-section counts

| Section | Extracted | CHANGELOG entry 15 | Agree |
|---|---|---|---|
| sec-00 | 1 | 1 | yes |
| sec-01 | 3 | 3 | yes |
| sec-02 | 5 | 5 | yes |
| sec-03 | 3 | 3 | yes |
| sec-04 | 3 | 3 | yes |
| sec-05 | 2 | 2 | yes |
| sec-06 | 2 | 2 | yes |
| sec-07 | 4 | 4 | yes |
| sec-08 | 4 | 4 | yes |
| sec-09 | 2 | 2 | yes |
| sec-10 | 5 | 5 | yes |
| sec-11 | 5 | 5 | yes |
| sec-90 | 2 | 2 | yes |
| **Total** | **41** | **41** | **yes** |

The counts agree exactly. No flag was added, dropped or adjusted.

Bullets in `**Flags**` blocks that carry no `UNSOURCED` marker were not counted
as flags: sec-00's `src/course.ts` note, sec-01's "not flagged" arithmetic note,
sec-05's case-against-MFA note, sec-09's two scope notes, sec-10's §5.3 bridge
note, and sec-91's citation note. Counting any of them would have exceeded 41.

### Group counts

| Group | Flags |
|---|---|
| Confirm-fast | 8 |
| Confirm the inference | 18 |
| Needs a decision | 12 |
| Class not in the triage table | 3 |
| **Total** | **41** |

### Three classes the triage table does not cover

`drafts/ATO-01-review.md` uses three classes the feature's table has no row
for: `analogy` (sec-01), `judgment` (sec-02) and `elaboration` (sec-07). The
instruction was to take the class from the parenthetical the review doc already
uses and to apply the table mechanically without exercising judgment about any
individual flag. Those two instructions cannot both be followed for these three,
so they are grouped separately with no default assigned rather than being mapped
onto a neighbouring row. Assigning them a default is a two-minute decision for
whoever works this file: each needs only a row in the table, not a re-reading.

### Confirm-fast is not the majority

The feature anticipated a Confirm-fast group of about 21 — the majority — and
put it first for momentum. It is 8. The largest group is Confirm the inference
at 18, and Needs a decision is 12. Section order was left as specified, but the
sitting is 30 flags of real reasoning, not 8 quick ones plus a tail. Budget for
that.

### TEXT NOT FOUND

None. Every flagged sentence was located verbatim in the guide file its section
names, with one entry that has no sentence to locate:

- **sec-07, automated proxy toolkits.** The flag is on an absence — a claim the
  guide deliberately does not make — so there is no text to quote. Recorded in
  the checklist as `NO SENTENCE` rather than as `TEXT NOT FOUND`.

### Three quotations in the review document are truncated

In three places `drafts/ATO-01-review.md` renders a flag as a sentence ending in
a full stop where the guide's sentence continues. The checklist uses the guide's
text, per the instruction to quote the file and not the review document's
rendering. The review document is not edited; this is recorded so the difference
is not read as a discrepancy:

| Section | Review document renders | Guide continues |
|---|---|---|
| sec-03 | "Long, unique, screened passwords defeat stuffing." | "…defeat stuffing and slow guessing." |
| sec-08 | "…the user has nothing to nag *with*." | "…nothing to nag *with*; there is a value to be entered, and the attacker does not have it to give." |
| sec-08 | "…asking for the code that has just arrived." | "…that has just arrived, is running the section 07 attack with a human being as the proxy." |
