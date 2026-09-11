# ATO-02 — Anatomy of a Takeover: One Incident, Start to Finish — accuracy record

This is where the content developer records checking the drafted
narration for accuracy (4.01.1), **before any narration audio is
generated**. Once a block is voiced, changing one sentence costs an
ElevenLabs regeneration and produces a different take — so every correction
is nearly free now and expensive later.

How to read it: for each block, the narration as drafted (reveal markers
`[[r]]` left in place), the sources relied on with the specific paragraph,
and what each reveal marker reveals. Then the same for each question. The
lesson data lives in `src/lesson-02.ts` and `src/questions-02.json`; edit
those files, not this one.

**Status, first draft (2026-09-10).** Unchecked and unvoiced.
`meta.status` is `"draft"`; export refuses it. The 4.02 independent content
review happens in superCPE, against the ingested package — not in this file.

Learning objectives (from `src/lesson-02.ts`):

- **lo-7** — Trace a single account takeover incident from the lure to the
  attacker's use of the account, identifying the point after which the
  stolen password is no longer what the access rests on.
- **lo-8** — Determine what a response to a specific takeover must include
  beyond a password change, given how sessions and authenticators are bound
  to an account.

Ids continue past ATO-01's highest (`lo-6`). Nothing in this lesson reuses
an ATO-01 objective id.

Short forms used below, matching `drafts/ATO-01-review.md`: **63B-4** = NIST
SP 800-63B-4 (July 2025); **CISA-MFA** = CISA, *Implementing
Phishing-Resistant MFA* (Oct 2022); **CISA-PHISH** = CISA/NSA/FBI/MS-ISAC,
*Phishing Guidance: Stopping the Attack Cycle at Phase One* (Oct 2023);
**WebAuthn** = W3C REC-webauthn-3-20260825; **ATT&CK** = MITRE ATT&CK
technique ids, which `sources/sec/INDEX.md` records as referenced rather
than extracted.

Flag classes used, and only these: `illustration`, `framing`,
`boundary only`, `descriptive`, `interpretive`, bare `UNSOURCED`. The
classes `analogy`, `elaboration` and `judgment` are **not** used here —
`current-feature.md` records them as awaiting Dane's ruling.

---

## How the CISA sources were read

`sources/sec/INDEX.md` names `.txt` extractions beside both CISA PDFs.
Neither exists — the same finding `drafts/ATO-01-review.md` records under
its J2, still open. This machine has no `pdftotext`, `mutool`, `qpdf` or
Python PDF library, so both PDFs were read for this feature by extracting
their text with a throwaway script written to the session scratchpad. The
script is not committed, the extraction is not committed, and nothing under
`sources/` was created, moved or modified. Page numbers cited below are the
document's own printed page numbers, recovered from the page furniture in
the extracted text. See **J2** on this record's judgment list.

---

## The incident is composed

Everything narrative in this lesson is invented for it. There is no real
firm, no real client, no real person, no real product and no real brand
anywhere in the narration or on any sheet:

- **The firm** — a four-partner tax and audit practice. Unnamed throughout,
  deliberately: naming it would create a composed entity that could collide
  with a real one, and the incident does not need a name to run.
- **The people** — **Ruth**, a tax partner, and **Dev**, the firm
  administrator who is also the firm's only IT contact. First names only,
  for the same reason.
- **The services** — "the mail provider", "the document store", "the
  sign-on service". Generic role nouns, never products.
- **The clock** — every timestamp (Tuesday 4:41 p.m. through Friday
  morning) is invented to give the incident an order and a duration. The
  order of the *mechanism* is sourced; the wall-clock times are not, and
  are flagged `illustration` wherever they carry weight.

Composed detail is flagged `illustration` throughout and is never phrased
as a claim about what attackers commonly do. Where the narration would
otherwise generalise from one invented incident, it says "this attacker"
and not "attackers".

---

## Source map — beat by beat

Written before any narration was drafted, as `current-feature.md` requires.
Each beat lists the facts it rests on and the file and locator that carries
each one. A beat with no source is either cut or kept as story detail and
flagged; none was carried as an unflagged claim.

### Beat 0 — the setting: what the account reaches

| Fact | Source | Locator |
|---|---|---|
| Attackers target email systems, file servers and remote access systems to reach an organisation's data, and identity servers that would let them create or take over accounts | CISA-MFA | "Areas of Focus for Implementing Phishing-Resistant MFA" → "Prioritizing Implementation Phases", p. 4 |
| Every organisation has a small number of accounts carrying additional access or privileges, especially valuable to threat actors | CISA-MFA | same, p. 4 |
| A session begins with an authentication event and is carried by a session secret issued by the session host at that moment | 63B-4 | §5.1 |

Story detail, no source: the firm's size, its two partners' names, the fact
that the administrator is also the IT contact. `illustration`.

### Beat 1 — the lure

| Fact | Source | Locator |
|---|---|---|
| Actors impersonate supervisors, trusted colleagues or IT personnel in targeted emails to deceive employees into providing login credentials | CISA-PHISH | "Phishing to Obtain Login Credentials" → "Example Techniques", p. 4 |
| Organisations in hybrid environments have fewer face-to-face interactions and more frequent virtual exchanges; users there are more likely to be deceived by social engineering tailored to the platforms they use | CISA-PHISH | same note, p. 4 |
| DMARC, with SPF and DKIM, verifies the sending server of received email against published rules; mail that fails the check is deemed spoofed and is quarantined and reported | CISA-PHISH | "Mitigations" → "Protecting Login Credentials", p. 6 |

**Not sourced, and carried with a flag.** That a domain the attacker
*registered* — as opposed to one they spoofed — passes its own published
DMARC records is an inference from the mechanism CISA describes, not a
sentence any source in the set states. Flagged `interpretive`; see the
block flags and **J1**.

Story detail, no source: the message arriving inside a live client thread
at the end of a working day. `illustration`.

### Beat 2 — the page

| Fact | Source | Locator |
|---|---|---|
| For DNS identifiers, the verifier identifier is the authenticated hostname of the verifier, or a parent domain at least one level below the public suffix | 63B-4 | §3.2.5.2 |
| How the claimant was directed to the impostor verifier is not relevant; a search result and an emailed link are the same attack | 63B-4 | §3.2.5 |

Story detail, no source: the particular shape of the hostname on screen.
`illustration`. It is written as one attacker's construction, not as a
pattern attackers are said to favour.

### Beat 3 — the code

| Fact | Source | Locator |
|---|---|---|
| Authenticators involving the manual entry of an authenticator output are not phishing-resistant, because manual entry does not bind the output to the specific session being authenticated; an impostor verifier could relay the output and successfully authenticate | 63B-4 | §3.2.5 |
| The user submits their username, password and the six-digit code, which the actors then receive in order to authenticate as the user in the legitimate login portal | CISA-PHISH | p. 4 |
| One-time-password authenticators are replay-resistant: it is impractical to succeed by recording and replaying a previous authentication message | 63B-4 | §3.2.7 |

Story detail, no source: the eleven seconds between the code reaching
Ruth's phone and the relay completing, and the four clock times on the
sheet. `illustration`. The narration says the relay happens inside the
code's validity window, which is the sourced claim; the number of seconds
is invented and is presented as this incident's, not as a measurement.

### Beat 4 — the session

| Fact | Source | Locator |
|---|---|---|
| The continuity of authenticated sessions is based on possession of a session secret issued by the session host at the time of authentication | 63B-4 | §5.1 |
| Session secrets are used as bearer tokens for session management | 63B-4 | §5.1 |
| Browser cookies are the predominant mechanism by which a session is created and tracked; cookies are not authenticators but short-term secrets suitable for the duration of a session | 63B-4 | §5.1.1 |
| Theft of the cookies that mark a session as already authenticated | ATT&CK | T1539, Steal Web Session Cookie |

**Not sourced, and carried with a flag.** That the service cannot
distinguish the attacker's presentation of the secret from the
subscriber's follows from bearer-token semantics but is not a sentence
63B-4 states. Flagged `interpretive`; see **J1**.

### Beat 5 — what the attacker does with the access

| Fact | Source | Locator |
|---|---|---|
| Actors target email systems, file servers and identity servers that would let them create new accounts or take control of user accounts | CISA-MFA | p. 4 |
| SSO gives IT an audit trail to examine, proactively or retroactively, after a suspected or confirmed breach | CISA-PHISH | p. 7 |
| An overall timeout limits a session's duration since authentication; an inactivity timeout ends a quiet session; session activity resets the inactivity timeout | 63B-4 | §5.2 |
| The binding of an authenticator is an account event requiring notification | 63B-4 | §4.6 |
| Obtaining credentials from the places credentials are kept | ATT&CK | T1555, Credentials from Password Stores |

Story detail, no source: that this attacker read for two days before acting,
and what they searched the mailbox for. `illustration`. Phrased as what this
attacker did. No prevalence or frequency claim is made anywhere in the
lesson; `sources/sec/INDEX.md` records that none is sourced.

### Beat 6 — the signals

| Fact | Source | Locator |
|---|---|---|
| Certain subscriber account events — the binding of an authenticator, account recovery — require the subscriber, **or someone designated by them**, to be independently notified; these notifications help the subscriber detect possible fraud | 63B-4 | §4.6 |
| CSPs shall support at least two notification addresses per subscriber account, and should encourage subscribers to maintain multiple ones | 63B-4 | §4.6 |
| The notification shall provide clear instructions, including contact information, in case the recipient repudiates the event | 63B-4 | §4.6 |
| Session characteristics that may be evaluated include usage patterns, velocity and timing; device and browser characteristics; geolocation; and IP address characteristics such as whether the address is in a block known for abuse | 63B-4 | §5.3 |
| Review MFA lockout and alert settings and track denied or attempted MFA logins; lock the account out when unusual activity or ongoing malicious login attempts are occurring | CISA-PHISH | p. 7 |
| Monitoring internal mail and messaging is essential, as users may be phished from outside the network or without the security team's knowledge | CISA-PHISH | p. 6 |

**Not sourced, and carried with a flag.** That a notification delivered to
the compromised mailbox reaches the attacker before it reaches the
subscriber is this incident's own observation. 63B-4 requires two addresses
and permits a designee; it nowhere states this consequence. Flagged
`interpretive` — it is the lesson's strongest single addition beyond the
guide, and it is an inference, so it is flagged rather than asserted. See
**J1**.

Story detail, no source: that the alarm was finally raised by a client's
telephone call rather than by any log. `illustration`.

### Beat 7 — the response

| Fact | Source | Locator |
|---|---|---|
| Re-provision suspected or confirmed compromised user accounts to prevent malicious actors from maintaining continued access to the environment (step 1) | CISA-PHISH | "Incident Response", p. 11 |
| Audit account access following a confirmed phishing incident to ensure actors no longer have access (step 2) | CISA-PHISH | p. 11 |
| The termination of a subscriber's sessions at an IdP and at an RP are independent of each other, and sessions at multiple RPs are established and terminated independently | 63B-4 | §5.2 |
| Verifiers shall force a password change if there is evidence that the authenticator has been compromised (and shall not require periodic change) | 63B-4 | §3.1.1.2, item 6 |
| Compromised authenticators include those with activation factors no longer in the subscriber's control; the CSP shall suspend, invalidate or destroy them promptly following compromise detection | 63B-4 | §4.3 |
| Invalidation is the removal of the binding between the authenticator and the subscriber account | 63B-4 | §4.5 |
| "The consequences of not invalidating a compromised authenticator are usually more significant than the denial-of-service potential of invalidating one in error" | 63B-4 | §4.5 |
| Report phishing incidents promptly — CISA, the FBI's IC3, MS-ISAC for SLTT entities | CISA-PHISH | "Reporting", p. 12 |

Story detail, no source: the particular list of four places this firm had
to sign out of, and which one was missed. `illustration`. The principle that
the list is not one item is 63B-4 §5.2.

### Beat 8 — the counterfactual

| Fact | Source | Locator |
|---|---|---|
| Phishing resistance is the ability of the protocol to prevent disclosure of authentication secrets and valid authenticator outputs to an impostor verifier, without relying on the vigilance of the claimant; it requires cryptographic authentication | 63B-4 | §3.2.5 |
| Verifier name binding: the authenticator output is cryptographically bound to a verifier identifier authenticated as part of the protocol; WebAuthn is the named example, choosing an authenticator secret based on the authenticated domain name of the verifier | 63B-4 | §3.2.5.2 |
| A public key credential can only be accessed by origins belonging to the relying party it was scoped to, enforced jointly by conforming user agents and authenticators | WebAuthn | §1 Introduction |
| FIDO/WebAuthn is the only widely available phishing-resistant authentication; support is included in major browsers, operating systems and smartphones | CISA-MFA | "Phishing-Resistant MFA Implementations", p. 3 |
| Focus first on the services that do support it — most hosted mail and SSO systems support FIDO, and those are good starting points because the data is valuable | CISA-MFA | "Common Issues and Paths Forward", p. 4 |
| Prioritise phishing-resistant MFA for administrator and privileged user accounts | CISA-PHISH | p. 7 |

**Boundary note.** `sources/sec/INDEX.md` directs that WebAuthn be used for
§1.2 and §1.3 only. The origin-scoping sentence relied on here is in §1
Introduction, one level up — the paragraph those two sections elaborate,
and the same sentence `guide/01/09-phishing-resistant.md` already rests on.
Flagged `boundary only`; see **J3**. No API surface is cited anywhere in
this lesson, which is what the INDEX instruction exists to prevent.

Story detail, no source: the counterfactual framing itself — replaying the
same clock with a different authenticator on the account. Flagged
`framing`. It is a presentation device, not a claim.

---

## Blocks

Fourteen blocks: one Title sheet, which carries no narration by design, and
thirteen narrated. 1,503 narrated words in total. The title block is not
counted in `after_block` numbering — `scripts/export.ts` builds
`video.blocks` and `narration_blocks` from the narrated blocks only, and
`scripts/validate-package.ts` range-checks `after_block` against
`narration_blocks` — so block 1 below is `after_block: 1`.

Each block gives the narration as drafted with `[[r]]` in place, what each
marker brings up, the sources with their locators, the flags, and one line
on what the block adds beyond `guide/01/`. Those last lines are what Dane
reads to judge 7.02.7; `current-feature.md` is explicit that they are not a
pass/fail gate.

---

### Block 1 — `block-01` — S-01 — Statement — 105 words, est. 48s

**Narration as drafted** (markers in place):

> [[r]]Before anything happens, look at what one account in a four-partner
> practice actually reaches. Ruth is a tax partner. Her mailbox holds the
> client correspondence and the files attached to it. [[r]]The same login
> opens the document store, where the returns and the workpapers live.
> [[r]]And the account carries one thing no inventory lists: when a
> message arrives from it, the client acts on it. That is the target, all
> of it. Nothing in the ten minutes that follow involves breaking
> anything, and at no point does the attacker need to hold on to Ruth's
> laptop. Watch the inventory. The machine is not the story.

**Reveals** — 3 marker(s), 3 entries in `reveals`, 3 figure element(s):

1. `0.5s` — on “Before anything happens, look at…” — brings up: the mailbox line
2. `14.2s` — on “The same login opens the…” — brings up: the document-store line
3. `20.6s` — on “And the account carries one…” — brings up: the standing line — the one no inventory holds

**Sources**

- CISA-MFA p. 4 — actors target email systems, file servers and remote
  access systems to reach an organisation's data; every organisation has a
  small number of accounts carrying additional access or privileges.
- 63B-4 §5.1 — the session vocabulary the rest of the lesson uses is set
  up here without being named yet.

**Flags**

- `illustration` — the firm's size, Ruth's role, and the fact that the
  practice has no IT function. Composed. Nothing turns on the numbers.
- `interpretive` — “when a message arrives from it, the client acts on
  it.” CISA's categories cover the mailbox and the file server; the
  *standing* of a partner's account with a client is not in any source in
  the set. It is the incident's own framing of why this account is worth
  taking, and it is stated as a property of this firm rather than as a
  general finding.

**What this block adds beyond the guide**

The guide's section 01 argues that credentials are the target. This block
does not argue anything: it puts one specific account's reach on screen as
an inventory, so that beats 5 to 7 can be read as the attacker walking
through it item by item. The guide has no inventory and no single account
to walk.

### Block 2 — `block-02` — S-02 — Facts — 115 words, est. 53s

**Narration as drafted** (markers in place):

> [[r]]Tuesday, twenty to five. A message lands in Ruth's mailbox, and it
> is not a cold approach — it is a reply inside a thread that has been
> running all week, about an engagement letter she is genuinely waiting
> on. [[r]]The sending domain is not the client's. It is one character
> away from the client's, and the attacker registered it himself. That
> distinction decides what the firm's mail defences do next. [[r]]The firm
> publishes DMARC and enforces it, so a forged sender would have been
> quarantined before Ruth ever saw it. But nothing here was forged. The
> attacker's own domain publishes its own records, and its own records
> check out. The message is delivered clean.

**Reveals** — 3 marker(s), 3 entries in `reveals`, 3 figure element(s):

1. `0.5s` — on “Tuesday, twenty to five. A…” — brings up: the timestamp row
2. `18.4s` — on “The sending domain is not…” — brings up: the sender row — registered, not spoofed
3. `32.7s` — on “The firm publishes DMARC and…” — brings up: the DMARC row — pass

**Sources**

- CISA-PHISH p. 4 — actors impersonate supervisors, trusted colleagues or
  IT personnel in targeted emails to obtain login credentials; users in
  hybrid environments are more likely to be deceived by social engineering
  tailored to the platforms they use.
- CISA-PHISH p. 6 — DMARC, with SPF and DKIM, verifies the sending server
  of a received message against published rules; mail that fails is deemed
  spoofed and is quarantined and reported.

**Flags**

- `interpretive` — “The attacker's own domain publishes its own records,
  and its own records check out.” No source states that a registered
  lookalike domain passes DMARC. It follows from the mechanism CISA
  describes — the check is against the sending domain's published rules, and
  the attacker controls those rules for a domain they own — but CISA does
  not say it, and this is the sentence in the lesson most likely to be read
  as an authority claim. See J1.
- `illustration` — the reply arriving inside a week-old engagement-letter
  thread at twenty to five. Composed timing and pretext.

**What this block adds beyond the guide**

The guide names DMARC as the control that catches spoofed senders (section
02). It never says what DMARC does not catch, because it is describing a
control rather than following an attack past it. This block shows a
message that defeats the control by not triggering it, which is a
different fact and the one that explains why the lure reached a partner
who works in a firm that did the right thing.

### Block 3 — `block-03` — S-03 — Compare — 119 words, est. 55s

**Narration as drafted** (markers in place):

> [[r]]Two minutes later Ruth is looking at her mail provider's sign-in
> page. It is the right page in every respect she can check quickly: the
> layout, the wordmark, the connection indicator, and — the first thing
> she looked at — her provider's name in the address bar. [[r]]Now look at
> what her provider's name was doing in that address bar. It was a label
> near the front of a much longer hostname. NIST identifies a verifier by
> its authenticated hostname, or by a parent domain one level below the
> public suffix, and that part sat at the far right, past the point where
> Ruth stopped reading. It belonged to the attacker. Everything to the
> left of it was decoration.

**Reveals** — 2 marker(s), 2 entries in `reveals`, 2 figure element(s):

1. `0.5s` — on “Two minutes later Ruth is…” — brings up: the left column — what Ruth checked
2. `21.7s` — on “Now look at what her…” — brings up: the right column — what actually names the verifier

**Sources**

- 63B-4 §3.2.5.2 — for DNS identifiers the verifier identifier is the
  authenticated hostname of the verifier, or a parent domain at least one
  level below the public suffix.
- 63B-4 §3.2.5 — how the claimant was directed to the impostor verifier is
  not relevant.

**Flags**

- `illustration` — that the provider's name sat “near the front” of the
  attacker's hostname. One attacker's construction, invented for this
  incident. It is deliberately not phrased as a pattern attackers are said
  to prefer, and no source in the set describes hostname construction.

**What this block adds beyond the guide**

The guide (section 02, step two) tells the reader that the origin is the
thing to read. It does not say where in a hostname the origin is, and
“read the address bar” is advice a person can follow correctly and still
lose, by reading left to right and stopping when they find what they
expected. This block puts the two readings side by side on one sheet. That
is a distinction the guide's prose cannot make without a picture of a
string.

### Block 4 — `block-04` — S-04 — List — 116 words, est. 54s

**Narration as drafted** (markers in place):

> [[r]]The page asks for the six-digit code. Her phone has one. She types
> it in. [[r]]What she cannot see is that her keystrokes are not being
> stored anywhere. They are being forwarded, right then, to the real
> provider, by a machine sitting between the two. NIST states this as a
> property of the method rather than a flaw in any product: a code typed
> in by hand is tied to no particular sign-in. It is a number. It does not
> know which login it was made for. [[r]]And yes, the code is single-use,
> and that is a real protection — against somebody replaying it tomorrow.
> This attacker used it eleven seconds after it reached her phone.

**Reveals** — 3 marker(s), 3 entries in `reveals`, 4 figure element(s):

1. `0.5s` — on “The page asks for the…” — brings up: the prompt
2. `7.0s` — on “What she cannot see is…” — brings up: the code on her phone
3. `40.5s` — on “And yes, the code is…” — brings up: the forwarded code

**Sources**

- 63B-4 §3.2.5 — authenticators involving the manual entry of an
  authenticator output are not phishing-resistant, because manual entry does
  not bind the output to the specific session being authenticated; an
  impostor verifier could relay the output and successfully authenticate.
- 63B-4 §3.2.7 — one-time-password authenticators are replay-resistant.
- CISA-PHISH p. 4 — the user submits their username, password and the six-
  digit code, which the actors then receive in order to authenticate as the
  user in the legitimate login portal.

**Flags**

- `illustration` — “eleven seconds after it reached her phone,” and the
  four clock times on the sheet. Invented. The sourced claim is that the
  relay happens inside the code's validity window; the number of seconds is
  the incident's, not a measurement, and nothing in the lesson depends on
  it.

**What this block adds beyond the guide**

The guide's section 07 establishes that replay resistance is beside the
point against a relay. It makes that argument in the abstract, as a
property comparison. This block makes it as a clock: four timestamps
within sixteen seconds, so the participant sees that “used later” and
“used now” are not two speeds of the same thing but two different attacks,
only one of which the property addresses.

### Block 5 — `block-05` — S-05 — List — 111 words, est. 51s

**Narration as drafted** (markers in place):

> [[r]]The sign-in succeeds, and the provider does what it does after
> every successful sign-in: it issues a session secret. That secret is
> what keeps somebody signed in, and it goes to whichever machine
> completed the ceremony. [[r]]That machine was the attacker's. From here
> the account has an occupant who never has to authenticate again, because
> authenticating is the part that is over. NIST calls a session secret a
> bearer token, and the phrase is exact: the service asks what is being
> presented, not who is presenting it. [[r]]And Ruth's mailbox opens
> normally. That is the part worth sitting with. The visible outcome of a
> finished takeover is a sign-in that worked.

**Reveals** — 3 marker(s), 3 entries in `reveals`, 4 figure element(s):

1. `0.5s` — on “The sign-in succeeds, and the…” — brings up: the secret being issued
2. `16.5s` — on “That machine was the attacker's.…” — brings up: the machine it went to
3. `40.0s` — on “And Ruth's mailbox opens normally.…” — brings up: the mailbox opening

**Sources**

- 63B-4 §5.1 — the continuity of authenticated sessions is based on
  possession of a session secret issued by the session host at the time of
  authentication; such secrets are used as bearer tokens.
- 63B-4 §5.1.1 — browser cookies are the predominant mechanism by which a
  session is created and tracked; cookies are not authenticators.
- ATT&CK T1539 — Steal Web Session Cookie, for the name and boundary of
  the technique.

**Flags**

- `interpretive` — “the service asks what is being presented, not who is
  presenting it.” A gloss on bearer-token semantics. NIST calls session
  secrets bearer tokens; it does not write this sentence. See J1.
- `illustration` — the two timestamps on the sheet.

**What this block adds beyond the guide**

The guide's section 06 explains what a session is and why no second factor
is asked for. This block adds the fact that decides how a participant will
*feel* about the incident: the sign-in visibly worked. The guide never has
occasion to say that, because it is not following anyone through a sign-
in. It is the observation the first review question turns on.

### Block 6 — `block-06` — S-06 — Facts — 116 words, est. 54s

**Narration as drafted** (markers in place):

> [[r]]Freeze it at 4:44 and take the inventory again, because every line
> of it is going to matter on Friday. Ruth's password is unchanged,
> uncompromised in the ordinary sense, and still known only to her.
> [[r]]Multi-factor authentication is switched on, and it did not fail. It
> ran, correctly, and delivered exactly the assurance it is built to
> deliver — that somebody holding both factors completed a sign-in.
> Somebody did. [[r]]And the attacker is holding a session secret, which
> is not a credential, not an authenticator, and not anything Ruth chose
> or could be asked to remember. Every control this firm pays for is
> working to specification. Not one of them has an opinion about a
> session.

**Reveals** — 3 marker(s), 3 entries in `reveals`, 4 figure element(s):

1. `0.5s` — on “Freeze it at 4:44 and…” — brings up: the password row
2. `16.3s` — on “Multi-factor authentication is switched on,…” — brings up: the MFA row
3. `32.1s` — on “And the attacker is holding…” — brings up: the session-secret row

**Sources**

- 63B-4 §5.1 — the session secret, and what it is not.
- CISA-MFA p. 1 — with MFA enabled, if one factor such as a password is
  compromised, an unauthorised user will be unable to access the account if
  they cannot also supply the second factor.

**Flags**

- `interpretive` — “Every control this firm pays for is working to
  specification. Not one of them has an opinion about a session.” The first
  sentence is a summary of the four rows above it; the second is the
  lesson's own formulation. Neither is a claim about any product.

**What this block adds beyond the guide**

A freeze-frame inventory of a compromised account in which nothing is
broken. The guide states in several places that MFA is a control on the
authentication event; it never has a single moment at which to show a
password that is still secret, an MFA deployment that has just worked
correctly, and a takeover that is complete, all at once. This sheet is the
lesson's centre and the reason it earns its place beside the guide.

### Block 7 — `block-07` — S-07 — Facts — 110 words, est. 51s

**Narration as drafted** (markers in place):

> [[r]]For the next two days this attacker sends nothing and deletes
> nothing. He reads. That is a decision, and it is the decision that keeps
> him inside. [[r]]NIST's session rules run two clocks, an overall one and
> an inactivity one, and activity resets the inactivity clock. Somebody
> quietly paging through a mailbox is generating activity. The timeout
> built to close an abandoned session never gets its chance.
> [[r]]Meanwhile every ordinary safeguard in the building is pointed the
> wrong way. There is no failed login to lock out, no denied prompt to
> raise an alert, and nothing on Ruth's laptop for anti-virus to find,
> because nothing was ever put on it.

**Reveals** — 3 marker(s), 3 entries in `reveals`, 4 figure element(s):

1. `0.5s` — on “For the next two days…” — brings up: the reading row
2. `12.5s` — on “NIST's session rules run two…” — brings up: the inactivity-timeout row
3. `31.1s` — on “Meanwhile every ordinary safeguard in…” — brings up: the failed-logins row

**Sources**

- 63B-4 §5.2 — an overall timeout limits a session's duration since
  authentication, an inactivity timeout ends a session without subscriber
  activity, and session activity resets the inactivity timeout.
- CISA-PHISH p. 7 — review MFA lockout and alert settings and track denied
  or attempted MFA logins; lock the account out when unusual activity or
  ongoing malicious login attempts are occurring.

**Flags**

- `illustration` — that this attacker read for two days and sent nothing.
  Composed. It is written as this attacker's choice; no claim is made about
  what attackers commonly do, and no prevalence figure appears anywhere in
  the lesson.
- `interpretive` — “every ordinary safeguard in the building is pointed
  the wrong way.” The three specifics under it are sourced (no failed login
  to lock out; no denied prompt; nothing installed on the endpoint). The
  summary is the lesson's.

**What this block adds beyond the guide**

The guide gives the two timeouts as a limit on the damage (section 06,
“What limits the damage”). This block turns that same paragraph around and
shows it working for the attacker: quiet reading is activity, so the
timeout meant to close an abandoned session is the one clock the attacker
is safe from. The guide states both facts and never puts them together,
because it is answering “what limits the damage”, not “what does the
attacker do with the time”.

### Block 8 — `block-08` — S-08 — Facts — 115 words, est. 53s

**Narration as drafted** (markers in place):

> [[r]]Thursday morning he stops reading and starts moving. The mailbox
> was never the destination — the sign-on service standing in front of it
> opens the document store too, and the document store is where the
> returns and the workpapers are. [[r]]Then he does the thing that makes
> this expensive. He adds a sign-in method of his own to Ruth's account: a
> second authenticator, bound to her account and held by him. [[r]]Notice
> what that buys him. A session can be revoked and a password can be
> changed. An authenticator bound to the account is a way back in that
> outlives both, and it is still there next week unless a person goes and
> removes it.

**Reveals** — 3 marker(s), 3 entries in `reveals`, 4 figure element(s):

1. `0.5s` — on “Thursday morning he stops reading…” — brings up: the move into the document store
2. `18.4s` — on “Then he does the thing…” — brings up: the added sign-in method
3. `32.7s` — on “Notice what that buys him.…” — brings up: what it outlives

**Sources**

- CISA-MFA p. 4 — actors target email systems, file servers, and identity
  servers that would let them create new accounts or take control of
  existing ones.
- 63B-4 §4.6 — the binding of an authenticator is an account event
  requiring notification.
- CISA-PHISH p. 7 — SSO gives IT an audit trail to examine, proactively or
  retroactively, after a suspected or confirmed breach.

**Flags**

- `illustration` — the two Thursday timestamps, and the order of the two
  moves.
- `interpretive` — “An authenticator bound to the account is a way back in
  that outlives both.” 63B-4 §4.3 and §4.5 establish that a bound
  authenticator is removed only by invalidation, and §5.1 that a session
  secret is separate from it; the consequence stated here follows from those
  two but is not written in either.

**What this block adds beyond the guide**

Persistence is the one part of this course the guide does not cover. Guide
section 11 has the participant re-enrol authenticators as step 3 of the
response, but nothing in the guide shows an attacker *creating* the thing
that step exists to remove. Without this block, step 3 reads as hygiene;
with it, it is the step that decides whether the attacker is still there
next week. This is the strongest single argument for
`avIsAdditionalLearning`.

### Block 9 — `block-09` — S-09 — Facts — 115 words, est. 53s

**Narration as drafted** (markers in place):

> [[r]]So what could this firm actually have seen? Three things happened
> that were observable, and it is worth being exact about who was in a
> position to observe each one. The provider had been evaluating the
> session all along — NIST lists what those checks weigh, among them
> geolocation, timing, and the reputation of the address — and Tuesday's
> sign-in arrived from a range this firm has never once used. [[r]]It sat
> in a console nobody had open. [[r]]The document store, for its part,
> produced nothing at all, and that is not a hole in its logging. Nobody
> logged in to it. A session simply arrived, carrying proof that a login
> had happened somewhere else.

**Reveals** — 3 marker(s), 3 entries in `reveals`, 3 figure element(s):

1. `0.5s` — on “So what could this firm…” — brings up: the sign-in row
2. `32.3s` — on “It sat in a console…” — brings up: the console nobody had open
3. `35.9s` — on “The document store, for its…” — brings up: the silent document store

**Sources**

- 63B-4 §5.3 — session characteristics that may be evaluated include usage
  patterns, velocity and timing; device and browser characteristics;
  geolocation; and IP address characteristics such as whether the address is
  in a block known for abuse.
- CISA-PHISH pp. 6-7 — monitoring internal mail and messaging is
  essential, as users may be phished without the security team's knowledge;
  review MFA lockout and alert settings.

**Flags**

- `illustration` — that the sign-in came from a range the firm has never
  used, and that nobody had the console open. Composed.
- `interpretive` — “that is not a hole in its logging.” The point that a
  relying party sees no authentication event because the session arrives
  already authenticated follows from §5.1 and §5.2; no source states it as
  an observation about logging.

**What this block adds beyond the guide**

Guide section 10 lists what is observable and is candid that its sources
say little about detection. This block asks a question the guide does not:
for each signal, who was in a position to read it. The third row — a
service that produced no evidence because there was nothing for it to
record — is not in the guide at all, and it is the one that explains why a
firm can look at its logs after an incident and find nothing wrong in
them.

### Block 10 — `block-10` — S-10 — Compare — 118 words, est. 54s

**Narration as drafted** (markers in place):

> [[r]]The second signal is the one the standard put there deliberately.
> Binding a new authenticator is an event a provider is required to notify
> about, and NIST says outright why: so that the subscriber can detect
> fraud on their own account. The notification went out, correctly, within
> the minute. [[r]]It went to the mailbox the attacker was sitting in.
> Read that same paragraph again and there is a clause most people skim
> past — a provider has to carry two notification addresses at minimum,
> and the notice may go to somebody the subscriber designates instead.
> This incident is what that clause is for. One address, on the account
> under attack, is a warning delivered to the wrong reader.

**Reveals** — 2 marker(s), 2 entries in `reveals`, 2 figure element(s):

1. `0.5s` — on “The second signal is the…” — brings up: the requirement column
2. `22.4s` — on “It went to the mailbox…” — brings up: the account column

**Sources**

- 63B-4 §4.6 — certain subscriber account events (the binding of an
  authenticator, account recovery) require the subscriber, or someone
  designated by them, to be independently notified; these notifications help
  the subscriber detect possible fraud; CSPs shall support at least two
  notification addresses per subscriber account; the notification shall
  provide clear instructions, including contact information, in case the
  recipient repudiates the event.

**Flags**

- `interpretive` — “One address, on the account under attack, is a warning
  delivered to the wrong reader.” 63B-4 requires two addresses and permits a
  designee. It nowhere states this consequence, and the whole force of the
  block is in the consequence. This is the lesson's most load-bearing
  inference and the first thing to check. See J1.

**What this block adds beyond the guide**

Guide section 10 quotes the same paragraph, including the two-address
requirement, and treats it as a requirement on providers. This block shows
the requirement as a defence with a failure mode: a correctly sent,
correctly timed, standards-compliant notification that reaches the
attacker. The guide has no way to make that point, because it is not
narrating anyone reading anyone's mailbox. It is also the only place in
either lesson where a participant is given something to go and change on
their own account this afternoon.

### Block 11 — `block-11` — S-11 — Statement — 120 words, est. 55s

**Narration as drafted** (markers in place):

> [[r]]Friday morning a client telephones the firm about an instruction
> they had received from Ruth. Ruth had sent nothing. That is what raised
> the alarm — not a log, not an alert, not a console, but a phone call
> from outside the firm, sixty-four hours after the fact. [[r]]All three
> signals were real and all three were available. Not one of them was read
> by a person, because reading them was nobody's job on any particular
> morning. [[r]]That is the ordinary case in a practice this size, and it
> is why CISA's advice to small organisations is mostly about arranging to
> be told: turn the alerting on, watch the internal mail, and keep a trail
> somebody can go back through.

**Reveals** — 3 marker(s), 3 entries in `reveals`, 3 figure element(s):

1. `0.5s` — on “Friday morning a client telephones…” — brings up: the phone call
2. `22.0s` — on “All three signals were real…” — brings up: the elapsed time
3. `35.3s` — on “That is the ordinary case…” — brings up: the signals-read count

**Sources**

- CISA-PHISH p. 6 — monitoring internal mail and messaging is essential,
  because users may be phished from outside the network or without the
  knowledge of the security team; establish a baseline and scrutinise
  deviations.
- CISA-PHISH p. 7 — SSO provides an audit trail to examine proactively or
  retroactively; review MFA lockout and alert settings; develop a documented
  incident response plan.

**Flags**

- `illustration` — the client's telephone call, the Friday timestamp and
  the sixty-four-hour figure. All composed. The sixty-four hours is
  arithmetic on invented timestamps, not a claim about dwell time in real
  incidents, and it is not compared to any published figure.
- `framing` — “reading them was nobody's job on any particular morning.”
  The lesson's characterisation of a small practice, not a sourced finding.

**What this block adds beyond the guide**

The guide's detection section is written from the defender's side: here is
what you could look at. This block is written from the incident's side:
here is what nobody looked at, and here is what actually happened instead.
The gap between “available” and “read” is the practical content of
detection at this firm size and the guide does not have a place to put it.

### Block 12 — `block-12` — S-12 — List — 126 words, est. 58s

**Narration as drafted** (markers in place):

> [[r]]Dev works the response, and the order is not the instinctive one.
> Terminate first. A password governs the next sign-in and does nothing
> whatever to a session already running, and a session already running is
> the entire access. [[r]]Then the password, and only now is it the right
> move: NIST forbids changing passwords on a schedule but requires a
> change on evidence of compromise, and this week is evidence. [[r]]Then
> the authenticator he bound, which nothing earlier in the sequence
> touches. NIST is unusually blunt about hesitating here — removing one in
> error costs less than leaving a compromised one in place. [[r]]And one
> thing went wrong. Signing out at the sign-on service did not close the
> document store, which ran on for another eleven minutes.

**Reveals** — 4 marker(s), 4 entries in `reveals`, 5 figure element(s):

1. `0.5s` — on “Dev works the response, and…” — brings up: step 1, terminate
2. `17.5s` — on “Then the password, and only…” — brings up: step 2, the password
3. `31.8s` — on “Then the authenticator he bound,…” — brings up: step 3, the authenticator
4. `47.0s` — on “And one thing went wrong.…” — brings up: the missed session

**Sources**

- CISA-PHISH p. 11 — re-provision suspected or confirmed compromised user
  accounts to prevent malicious actors from maintaining continued access
  (step 1); audit account access following a confirmed incident (step 2).
- 63B-4 §3.1.1.2 item 6 — verifiers shall not require periodic password
  changes but shall force a change if there is evidence that the
  authenticator has been compromised.
- 63B-4 §4.3 — the CSP shall suspend, invalidate or destroy compromised
  authenticators promptly following compromise detection.
- 63B-4 §4.5 — invalidation is the removal of the binding between an
  authenticator and a subscriber account; the consequences of not
  invalidating a compromised authenticator are usually more significant than
  the denial-of-service potential of invalidating one in error.
- 63B-4 §5.2 — the termination of a subscriber's sessions at an IdP and at
  an RP are independent of each other, and sessions at multiple RPs are
  established and terminated independently.
- CISA-PHISH p. 12 — report promptly; CISA, the FBI's IC3, and MS-ISAC for
  SLTT entities.

**Flags**

- `illustration` — the eleven-minute gap, and the fact that it was the
  document store specifically that was missed. Composed. The principle that
  the list of sessions is longer than one is §5.2; the enumeration is this
  firm's.

**What this block adds beyond the guide**

The guide gives the response as an ordered list and warns that one sign-
out is not a global act. This block runs the same list against a real
account set and shows the warning coming true — an administrator following
the correct order and still leaving a session up for eleven minutes. A
warning that a participant has watched fail is a different thing from a
warning they have read, and the miss is the part the guide has no room
for.

### Block 13 — `block-13` — S-13 — Compare — 117 words, est. 54s

**Narration as drafted** (markers in place):

> [[r]]Now run that same Tuesday again and change exactly one thing: the
> second factor on the account is a passkey. Ruth still gets the message.
> She still clicks it. She still lands on the attacker's page, and she
> still does not read the far end of the hostname. [[r]]And it ends at
> 4:43:20, because her authenticator is asked to sign for an origin that
> is not her provider's, and the credential it holds can only be reached
> by her provider's origin. There is no output to relay. Nothing at all
> depends on Ruth noticing anything, which is the test NIST actually sets,
> and it is the only line in this story that was ever going to hold.

**Reveals** — 2 marker(s), 2 entries in `reveals`, 2 figure element(s):

1. `0.5s` — on “Now run that same Tuesday…” — brings up: the as-it-ran column
2. `22.2s` — on “And it ends at 4:43:20,…” — brings up: the with-a-passkey column

**Sources**

- 63B-4 §3.2.5 — phishing resistance is the ability of the protocol to
  prevent disclosure of authentication secrets and valid authenticator
  outputs to an impostor verifier, without relying on the vigilance of the
  claimant; it requires cryptographic authentication.
- 63B-4 §3.2.5.2 — verifier name binding; WebAuthn is the named example,
  choosing an authenticator secret based on the authenticated domain name of
  the verifier.
- WebAuthn §1 Introduction — a public key credential can only be accessed
  by origins belonging to the relying party it was scoped to, enforced
  jointly by conforming user agents and authenticators.
- CISA-MFA p. 3 — FIDO/WebAuthn is the only widely available phishing-
  resistant authentication, with support in major browsers, operating
  systems and smartphones.

**Flags**

- `framing` — the counterfactual itself: replaying the same clock with one
  thing changed. A presentation device, not a claim.
- `boundary only` — the WebAuthn sentence is from §1 Introduction, where
  `sources/sec/INDEX.md` directs use of §1.2 and §1.3. It is the paragraph
  those sections elaborate and the same sentence guide/01/09 already rests
  on. No API surface is cited. See J3.

**What this block adds beyond the guide**

Guide section 09 explains why a passkey defeats a relay. This block does
not re-explain it; it re-runs the incident's own clock and marks where it
stops, so the mechanism is expressed as a time — 16:43:20 — and as the
absence of the twelve blocks that came before. The transferable output is
not “passkeys are better” but “here is the exact second at which this
incident would not have continued”, which is what a partner deciding where
to spend an afternoon actually needs.

---

## Questions

Four: two review, placed by `after_block` (5.01.2.1), and two assessment
with no placement, one per objective (6.01.2's coverage floor — one per
objective gives 100 per cent). Every stem was checked against
`src/questions-01.json`; none duplicates an ATO-01 stem, and `npm run check`
runs the same test across the course as its rule 2.

Ids continue past ATO-01's `q-12`. Each question's `_source` field in
`src/questions-02.json` carries its locators and the flags it inherits, in
the format ATO-01 uses; they are not repeated here.

### q-13 — review — `after_block: 6`

**Placement.** Block 6 of 13 is the incident's midpoint, and it is the sheet
that freezes the account at 4:44 with everything visible at once. The
question is the decision Ruth faces that evening.

**It is a decision, not a recall.** The stem gives her a new fact (the
sender's domain) and an old one (the sign-in worked) and asks what to
conclude and do. The wrong answers are the three readings a competent person
actually reaches: it worked so it was fine; the code is single-use so the
damage is spent; it is a password problem so change the password.

**Objective:** `lo-7`. **Choices:** 4. **Correct:** (b).

### q-14 — review — `after_block: 11`

**Placement.** Block 11 of 13 closes the signals beat — 85 per cent of the
way through the narrated run, which is the "near the end" the feature asks
for. Placing it after block 12 or 13 would have put it inside the response,
where the second assessment question already sits.

**It is a decision, not a recall.** The stem states what happened to the
notification and asks what to change about the account. The distractors are
two forms of "make the signal quieter" and one calendar rule that 63B-4
prohibits.

**Objective:** `lo-8`. **Choices:** 4. **Correct:** (b).

**Note for Dane.** This question is the practical output of the whole
signals beat and rests on block 10, whose consequence sentence is flagged
`interpretive`. The question itself is answerable from §4.6's requirement
alone, which is why it survives if J1 goes against block 10's phrasing.

### q-15 — assessment — no placement

Measures `lo-7`. Asks for the moment on the incident's own clock after which
a password change could not, by itself, have ended the access.

**Not a duplicate of ATO-01.** `q-03` asks why a service does not request a
second factor when a stolen cookie is presented — a mechanism question, in
the abstract. This one asks a participant to locate a moment in a timeline
they have watched. Different task, different evidence.

**Choices:** 4, none of them true/false. **Correct:** (b).

### q-16 — assessment — no placement

Measures `lo-8`. Gives a response that is half done and asks what remains.

**Not a duplicate of ATO-01.** `q-06` asks which response action comes
*first* and why. This one asks what the response must *include* — the bound
authenticator and the independently managed sessions — which is
completeness, not order, and is the pair of facts blocks 8 and 12 exist to
establish.

**Choices:** 4, none of them true/false. **Correct:** (c).

---

## Overlap with `guide/01/`

Checked with a throwaway script over all fourteen files in `guide/01/`,
comparing normalised word sequences from every block's `narration` with
markers stripped. The script is not committed.

**Runs of 8 or more consecutive words shared with any guide file: zero.**

One 8-word run existed in the first draft of block 10 — "support at least
two notification addresses and the", against `10-detection.md`, which quotes
the same §4.6 sentence — and the narration was rewritten to break it. Both
files still state the requirement; neither states it in the other's words.

Lowering the threshold to 6 words leaves two runs, both of them NIST's own
vocabulary rather than the guide's prose, and both kept deliberately because
paraphrasing a defined term would make the lesson less accurate:

- "one level below the public suffix" — block 3, against `02-phishing.md`
  and `09-phishing-resistant.md`. It is 63B-4 §3.2.5.2's phrasing.
- "and activity resets the inactivity clock" — block 7, against
  `06-session-tokens.md`. It is §5.2's requirement in six words.

There are no shared runs at any length that carry an argument rather than a
term of art.

---

## Judgment list — OPEN

Nothing in this feature resolved any of these. They are Dane's, and
`meta.status` stays `"draft"` until they are closed.

**J1 — the three load-bearing `interpretive` sentences.** Ranked by how much
of the lesson rests on each:

1. **Block 10** — "One address, on the account under attack, is a warning
   delivered to the wrong reader." 63B-4 §4.6 requires two notification
   addresses and permits a designee; it does not state this consequence.
   The whole force of block 10 and of q-14 is in the consequence. If the
   inference is sound, say so here and it can stand as written; if it is
   not, block 10 has to be rewritten as a requirement rather than as a
   failure.
2. **Block 2** — "The attacker's own domain publishes its own records, and
   its own records check out." That a registered lookalike passes DMARC
   follows from the mechanism CISA describes on p. 6 but is not stated
   there. This is the sentence most likely to be read as an authority claim
   by a reviewer who knows the area.
3. **Block 5** — "the service asks what is being presented, not who is
   presenting it." A gloss on bearer-token semantics. Lower stakes: §5.1
   carries the same point in its own words if this one has to go.

The smaller `interpretive` flags on blocks 1, 6, 7, 8 and 9 are listed in
their block entries and are summarising sentences rather than new claims.

**J2 — the CISA `.txt` extractions still do not exist.** Inherited from
`drafts/ATO-01-review.md`'s J2 and unchanged by this feature: `INDEX.md`
names a `.txt` beside each CISA PDF and neither is on disk, so every CISA
citation in both lessons rests on an extraction that is not reproducible by
anyone reading this record. This feature did not add the files, because
`current-feature.md` did not say to and `CLAUDE.md` forbids adding to
`sources/` otherwise. It is now the second lesson to depend on it.

**J3 — the WebAuthn citation is one section outside the INDEX's scope.**
Block 13 cites §1 Introduction; `INDEX.md` says use §1.2 and §1.3 only. The
sentence is the one §1.2 and §1.3 elaborate, no API surface is cited, and
`guide/01/09-phishing-resistant.md` already rests on the same sentence.
Either confirm that §1 is inside the intended scope, or move the citation
to §1.3, where the sample authentication flow makes the same point at
greater length.

**J4 — 7.02.7, and it is the decision that matters most.**
`meta.avIsAdditionalLearning` is `true`. Because course ATO also holds a
text lesson, the test is not whether the sheets read themselves aloud — they
do not — but whether this video adds learning `guide/01/` does not already
give. The per-block case is in the "adds beyond the guide" lines above; the
three strongest are block 8 (an attacker binding an authenticator, which
the guide never shows), block 10 (a correct notification reaching the wrong
reader) and block 6 (a complete takeover in which no control has failed).
If Dane judges the video to restate the guide, the flag becomes `false`,
superCPE records the lesson as narrating the text, and its minutes stop
counting. That is a content judgment and nothing in this repo can make it.

**J5 — the runtime is projected, not measured, and the projection is
uncertain.** There is no generated audio anywhere in this repo for the
current voice, so the pace used is the documented 130 wpm default. 1,503
narrated words is 694 s at that rate. The only measured pace this repo has
ever recorded — a retired lesson, in a different voice, whose
`audio-meta` entries predate voice tracking — was 165.5 wpm, which would put
the same script at 545 s. Both clear the 497 s the course needs to reach
1.6 credits, which is why the script was sized at 1,503 words rather than
the 1,300 that 600 s at 130 wpm implies. If the real measured duration comes
in under 497 s, the course lands at 1.4 rather than 1.6. That is a decision
to take after `generate` against the measured number, not a reason to add
words now (7.01).

**J6 — the composed incident.** Every person, timestamp and service in this
lesson is invented, and the "The incident is composed" section above lists
what. Confirm that the level of invention is acceptable for a CPE program
and that nothing in it reads as a claim about a real event.

---

## Sources still needed

None for this lesson. Every factual beat in the source map is carried by a
file already in `sources/sec/`, and no beat was cut for want of a source.
Everything not carried by a source is composed incident detail, flagged
`illustration` or `framing` in its block entry.

Two of `INDEX.md`'s standing "Not yet sourced" items are deliberately
untouched here, because this lesson does not need them and inventing a
source for them would be worse than leaving them open:

- **Real-time proxy phishing toolkits as a deployed technique.** Blocks 2
  to 5 narrate one composed instance and cite CISA-PHISH p. 4 for the
  attack's shape. Nothing in the lesson claims the technique is widespread.
- **Detection indicators.** Block 9 uses only 63B-4 §5.3's list of session
  characteristics and CISA-PHISH's practical measures. It does not use
  impossible-travel language, mail-rule creation, or the active-sessions
  list — the two indicators `guide/01/10-detection.md` already flags rather
  than asserts.

No prevalence or frequency statistic appears anywhere in this lesson, per
`INDEX.md`'s standing instruction.

---

## Rulings and narration pass — 2026-09-11

Dane ruled on J1, J3 and J4 on 2026-09-11 and authorised this appended
section. Nothing above this line was edited: the first-draft record of
2026-09-10 stands as written, including the block quotations, which are now
the *before* text of the edits below. Where a block entry above and this
section disagree about what the narration says, this section is the later
record and `src/lesson-02.ts` is the authority.

This pass edited text only. No audio was generated, nothing was rendered,
nothing was exported, and `meta.status` is still `"draft"`.

### The rulings as given

**J1 — keep all three load-bearing `interpretive` sentences.** Block 10's
"a warning delivered to the wrong reader", block 2's claim that a registered
lookalike domain passes its own DMARC, and block 5's bearer-token gloss all
stand as sound inferences. The one exception is block 5's gloss, which J4
removes for a different reason; that removal supersedes the keep for that
sentence only. Blocks 10 and 2 are unchanged by this pass.

**J3 — move the WebAuthn citation from §1 to §1.3.** Done on block 13. The
`boundary only` flag that block 13's entry above carries is **cleared**: the
citation is now inside the scope `sources/sec/INDEX.md` sets, and after the
J4 edit below the narration no longer states the specification's scoping
sentence at all. J3 is closed.

**J4 — `meta.avIsAdditionalLearning` stays `true`, on the condition that the
edits below are made.** The test Dane set is narrower than the one the first
draft argued: a sentence that *explains a rule `guide/01/` already explains*
fails 7.02.7 even when it is reworded, because the participant gets no
learning from it that the guide has not already given. A sentence that *shows
what happened in this incident* passes, because the incident is not in the
guide. Blocks 4, 5, 7 and 12 contained guide rules restated; their
replacements keep the events and drop the lectures. J4 is closed on that
condition, and the condition is met.

**J2, J5 and J6 stay open.** J2 (the missing CISA `.txt` extractions) is
untouched — this feature did not add to `sources/`. J5 (the projected
runtime) is re-stated with the new word total under "Size after the pass"
below, and is still a decision to take after `generate`. J6 (the level of
invention in the composed incident) is untouched; this pass added composed
detail on blocks 4, 5, 7, 11 and 12, all of it flagged `illustration`, so
there is slightly more of it to confirm than there was.

### What changed, block by block

Nine blocks changed. Marker counts are unchanged in every one of them, so no
block's `reveals` length or figure element count moved. Every changed block's
`estimatedSeconds` was recomputed as `Math.round(words / 130 * 60)` and its
`reveals` re-estimated from the word position of each marker; the estimates
are preview values and are discarded the moment audio exists.

| Block | Words before → after | est. s before → after | Why it changed |
|---|---|---|---|
| `block-02` | 115 → 117 | 53 → 54 | spoken time did not match the sheet |
| `block-03` | 119 → 107 | 55 → 49 | J4 sweep against `02-phishing.md` |
| `block-04` | 116 → 107 | 54 → 49 | J4 |
| `block-05` | 111 → 98 | 51 → 45 | J4, and J1's one exception |
| `block-07` | 110 → 113 | 51 → 52 | J4, and a verbatim six-word run |
| `block-09` | 115 → 99 | 53 → 46 | signal count, and J4 sweep |
| `block-11` | 120 → 135 | 55 → 62 | signal count, sheet line, J4 sweep |
| `block-12` | 126 → 109 | 58 → 50 | J4, and the `items` are now the clock |
| `block-13` | 117 → 125 | 54 → 58 | J3, and J4 sweep |

---

#### `block-02` — the spoken time now matches the sheet

The sheet's first row reads `Tue 16:41`; the narration said "twenty to
five", which is 16:40. Narration is the transcript of record, so the two
cannot disagree. Nothing else in the block moved.
**Before**

> [[r]]Tuesday, twenty to five. A message lands in Ruth's mailbox, and
> it is not a cold approach — it is a reply inside a thread that has
> been running all week, about an engagement letter she is genuinely
> waiting on. [[r]]The sending domain is not the client's. It is one
> character away from the client's, and the attacker registered it
> himself. That distinction decides what the firm's mail defences do
> next. [[r]]The firm publishes DMARC and enforces it, so a forged
> sender would have been quarantined before Ruth ever saw it. But
> nothing here was forged. The attacker's own domain publishes its own
> records, and its own records check out. The message is delivered
> clean.

**After**

> [[r]]Tuesday, four forty-one in the afternoon. A message lands in
> Ruth's mailbox, and it is not a cold approach — it is a reply inside a
> thread that has been running all week, about an engagement letter she
> is genuinely waiting on. [[r]]The sending domain is not the client's.
> It is one character away from the client's, and the attacker
> registered it himself. That distinction decides what the firm's mail
> defences do next. [[r]]The firm publishes DMARC and enforces it, so a
> forged sender would have been quarantined before Ruth ever saw it. But
> nothing here was forged. The attacker's own domain publishes its own
> records, and its own records check out. The message is delivered
> clean.

**Sources after the change** — unchanged: CISA-PHISH pp. 4, 6.

**Flags after the change** — unchanged. The `illustration` on the Tuesday
timestamp now covers the spoken form of it as well as the sheet's.

---

#### `block-03` — J4 sweep: the §3.2.5.2 rule removed from the narration

`guide/01/02-phishing.md`, step two, already states it: "the identity of the
verifier is its authenticated hostname, or a parent domain at least one level
below the public suffix; that is the fact the protocol itself binds to, and
it is the fact a person can read in the address bar." The narration stated
the same rule in NIST's name. Under J4 that is a lecture the guide has
already given, so it is replaced with where the thing actually sat in this
attacker's hostname. The **sheet is unchanged and still carries the rule** —
its right column reads "Authenticated hostname / Or a parent domain one level
below the public suffix" — so the participant still sees the definition; the
narration no longer recites it.

This also removes the first of the two six-word runs the overlap report
above records, "one level below the public suffix".
**Before**

> [[r]]Two minutes later Ruth is looking at her mail provider's sign-in
> page. It is the right page in every respect she can check quickly: the
> layout, the wordmark, the connection indicator, and — the first thing
> she looked at — her provider's name in the address bar. [[r]]Now look
> at what her provider's name was doing in that address bar. It was a
> label near the front of a much longer hostname. NIST identifies a
> verifier by its authenticated hostname, or by a parent domain one
> level below the public suffix, and that part sat at the far right,
> past the point where Ruth stopped reading. It belonged to the
> attacker. Everything to the left of it was decoration.

**After**

> [[r]]Two minutes later Ruth is looking at her mail provider's sign-in
> page. It is the right page in every respect she can check quickly: the
> layout, the wordmark, the connection indicator, and — the first thing
> she looked at — her provider's name in the address bar. [[r]]Now look
> at what her provider's name was doing in that address bar. It was a
> label near the front of a much longer hostname. The part of that
> hostname that actually named a verifier sat at the far right, past the
> point where Ruth stopped reading. It belonged to the attacker.
> Everything to the left of it was decoration.

**Sources after the change** — citation unchanged (63B-4 §3.2.5, §3.2.5.2).
§3.2.5.2 is now carried by the sheet's right column rather than by a
sentence. §3.2.5 ("how the claimant was directed to the impostor verifier is
not relevant") is no longer stated anywhere in the block. See the citation
finding at the end of this section.

**Flags after the change**

- `illustration` — retained, and now also covers "The part of that hostname
  that actually named a verifier sat at the far right". Where each part of
  this attacker's hostname sat is composed; no source in the set describes
  hostname construction.

---

#### `block-04` — J4: the relay shown, the rule dropped

Three sentences stated rules `guide/01/07-proxy-phishing.md` already
explains at length — "NIST states this as a property of the method rather
than a flaw in any product: a code typed in by hand is tied to no particular
sign-in. It is a number. It does not know which login it was made for", and
"the code is single-use, and that is a real protection — against somebody
replaying it tomorrow". The guide's section 07 carries both: the block quote
of §3.2.5's manual-entry sentence, and the whole subsection "Why the one-time
code does not help". The replacement narrates the relay as it ran — who sent
the digits on, what the machine in the middle had been doing since the page
loaded, and what the provider saw when it checked the code.
**Before**

> [[r]]The page asks for the six-digit code. Her phone has one. She
> types it in. [[r]]What she cannot see is that her keystrokes are not
> being stored anywhere. They are being forwarded, right then, to the
> real provider, by a machine sitting between the two. NIST states this
> as a property of the method rather than a flaw in any product: a code
> typed in by hand is tied to no particular sign-in. It is a number. It
> does not know which login it was made for. [[r]]And yes, the code is
> single-use, and that is a real protection — against somebody replaying
> it tomorrow. This attacker used it eleven seconds after it reached her
> phone.

**After**

> [[r]]The page asks for the six-digit code. Her phone has one. She
> types it in. [[r]]The instant she presses enter, the same six digits
> go on to her real provider. Ruth did not send them there. The
> attacker's machine did — the machine that has been sitting between her
> and the provider since the page loaded, passing every screen she saw
> through from the real one, and every answer she gave straight on.
> [[r]]The provider checks the code, and it is right: correct, unused,
> and inside its window. By every test the provider applies, this is
> Ruth signing in, eleven seconds after the code reached her phone.

**Sources after the change**

- CISA-PHISH p. 4 — the user submits username, password and the six-digit
  code, which the actors then receive in order to authenticate as the user in
  the legitimate login portal. This is what "passing every screen she saw
  through from the real one, and every answer she gave straight on" narrates.
- 63B-4 §3.2.7 — OTP authenticators are replay-resistant; the verifier
  detects a message that is not fresh. This is what "correct, unused, and
  inside its window" rests on.
- 63B-4 §3.2.5 — no longer stated by any sentence. It remains the reason the
  sheet's third row is true ("she types it; the proxy forwards it,
  unchanged"), so the citation stays. See the citation finding below.

**Flags after the change**

- `illustration` — "The instant she presses enter"; "since the page loaded";
  "eleven seconds after the code reached her phone". Composed timing, as
  before. The eleven-second figure survives the rewrite, which is what
  `q-13`'s inherited-flag note refers to.
- `interpretive` — "By every test the provider applies, this is Ruth signing
  in." The provider applying its tests and finding nothing wrong follows from
  §3.2.7 and §5.1; no source states it as a sentence about what the provider
  concludes.
- `descriptive` — "The provider checks the code, and it is right: correct,
  unused, and inside its window", against §3.2.7.

---

#### `block-05` — J4, and J1's one exception

Two sentences went. "From here the account has an occupant who never has to
authenticate again, because authenticating is the part that is over" is
`guide/01/06-session-tokens.md`'s subsection "Why no second factor is
requested" in one line. And the bearer-token gloss — "NIST calls a session
secret a bearer token, and the phrase is exact: the service asks what is
being presented, not who is presenting it" — is the guide's "A bearer token
authorises whoever bears it. There is no further test of who that is."
J1 would have kept that sentence; J4 removes it, and J1 records the
exception. What replaces them is what Ruth experienced at that second and
what was true of the account from then on.
**Before**

> [[r]]The sign-in succeeds, and the provider does what it does after
> every successful sign-in: it issues a session secret. That secret is
> what keeps somebody signed in, and it goes to whichever machine
> completed the ceremony. [[r]]That machine was the attacker's. From
> here the account has an occupant who never has to authenticate again,
> because authenticating is the part that is over. NIST calls a session
> secret a bearer token, and the phrase is exact: the service asks what
> is being presented, not who is presenting it. [[r]]And Ruth's mailbox
> opens normally. That is the part worth sitting with. The visible
> outcome of a finished takeover is a sign-in that worked.

**After**

> [[r]]The sign-in succeeds, and the provider does what it does after
> every successful sign-in: it issues a session secret, and hands it to
> whichever machine finished the sign-in. [[r]]That machine was the
> attacker's. Ruth sees nothing unusual — no second prompt, no error, no
> warning, not even a delay long enough to notice. From 4:43 and
> thirty-five seconds, two people are using the same account, and only
> one of them knows there are two. [[r]]And Ruth's mailbox opens
> normally. That is the part worth sitting with. The visible outcome of
> a finished takeover is a sign-in that worked.

**Sources after the change**

- 63B-4 §5.1 — the continuity of an authenticated session rests on
  possession of a session secret issued by the session host at the time of
  authentication. "It issues a session secret, and hands it to whichever
  machine finished the sign-in" is that requirement as an event.
- ATT&CK T1539 — unchanged, and still carried by the sheet's middle rows.

**Flags after the change**

- `illustration` — "Ruth sees nothing unusual — no second prompt, no error,
  no warning, not even a delay long enough to notice"; "From 4:43 and
  thirty-five seconds". Composed.
- `framing` — "two people are using the same account, and only one of them
  knows there are two." The lesson's way of putting the state of the account;
  not a claim any source makes.
- The `interpretive` flag this block's entry above carries for the
  bearer-token gloss is **cleared**, the sentence being gone. `q-15`'s
  `_source` note was updated in `src/questions-02.json` to say so; the
  question rested on §5.1's text, not on the gloss, and is unaffected.

---

#### `block-07` — J4, and the verbatim six-word run

"NIST's session rules run two clocks, an overall one and an inactivity one,
and activity resets the inactivity clock. Somebody quietly paging through a
mailbox is generating activity. The timeout built to close an abandoned
session never gets its chance" is `guide/01/06-session-tokens.md`'s "What
limits the damage", and the clause "activity resets the inactivity clock"
appears in that file word for word — the second of the two six-word runs the
overlap report above records, and the reason it is now zero. What replaces it
is what this attacker read over two days, and what the provider saw while he
read it. No session-duration figure was added anywhere in the lesson.
**Before**

> [[r]]For the next two days this attacker sends nothing and deletes
> nothing. He reads. That is a decision, and it is the decision that
> keeps him inside. [[r]]NIST's session rules run two clocks, an overall
> one and an inactivity one, and activity resets the inactivity clock.
> Somebody quietly paging through a mailbox is generating activity. The
> timeout built to close an abandoned session never gets its chance.
> [[r]]Meanwhile every ordinary safeguard in the building is pointed the
> wrong way. There is no failed login to lock out, no denied prompt to
> raise an alert, and nothing on Ruth's laptop for anti-virus to find,
> because nothing was ever put on it.

**After**

> [[r]]For the next two days this attacker sends nothing and deletes
> nothing. He reads. That is a decision, and it is the decision that
> keeps him inside. [[r]]Every message he opens is activity on Ruth's
> account, so to the provider it looks like exactly what it is: an
> account in use. He reads the engagement letters, the fee discussions,
> and which clients pay by bank transfer, and into which accounts.
> [[r]]Meanwhile every ordinary safeguard in the building is pointed the
> wrong way. There is no failed login to lock out, no denied prompt to
> raise an alert, and nothing on Ruth's laptop for anti-virus to find,
> because nothing was ever put on it.

**Sources after the change**

- CISA-PHISH p. 7 — review MFA lockout and alert settings; track denied or
  attempted MFA logins. This is what "no failed login to lock out, no denied
  prompt to raise an alert" rests on, as before.
- 63B-4 §5.2 — no longer stated by any sentence. It is still what the
  sheet's two timeout rows rest on. **This is the one place where the sheet
  is now ahead of the narration**: rows 2 and 3 name an inactivity timeout
  and an overall timeout that the narration no longer introduces. See the
  findings below — `current-feature.md` gave a replacement for this block's
  `narration` and not for its `figure`, and changing a figure it did not name
  was out of scope.

**Flags after the change**

- `illustration` — "the engagement letters, the fee discussions, and which
  clients pay by bank transfer, and into which accounts". Composed; this is
  what the composed mailbox held.
- `interpretive` — "so to the provider it looks like exactly what it is: an
  account in use." What the provider makes of the reading follows from §5.2
  and §5.3; no source states it.

---

#### `block-09` — two signals, not three, and the §5.3 list removed

Two changes. The count: the block itself says the document store "produced
nothing at all", so it is not a signal, and the narration should not have
counted it. Three became two here, on `block-11`'s sheet, and in
`block-11`'s narration. `block-10`'s "The second signal" is unaffected —
the notification is still the second of the two.

The J4 sweep: "NIST lists what those checks weigh, among them geolocation,
timing, and the reputation of the address" is `guide/01/10-detection.md`'s
"What the service is watching, and what it will show you", which lists the
same §5.3 characteristics and says outright that they are worth knowing
because they are the vocabulary a provider's security page uses. Replaced
with what the provider's record of this sign-in actually carried.
**Before**

> [[r]]So what could this firm actually have seen? Three things happened
> that were observable, and it is worth being exact about who was in a
> position to observe each one. The provider had been evaluating the
> session all along — NIST lists what those checks weigh, among them
> geolocation, timing, and the reputation of the address — and Tuesday's
> sign-in arrived from a range this firm has never once used. [[r]]It
> sat in a console nobody had open. [[r]]The document store, for its
> part, produced nothing at all, and that is not a hole in its logging.
> Nobody logged in to it. A session simply arrived, carrying proof that
> a login had happened somewhere else.

**After**

> [[r]]So what could this firm actually have seen? Two things happened
> that were observable, and it is worth being exact about who was in a
> position to observe each one. The provider's own record of Tuesday's
> sign-in carried the address it came from, and it was a range this firm
> has never once used. [[r]]It sat in a console nobody had open.
> [[r]]The document store, for its part, produced nothing at all, and
> that is not a hole in its logging. Nobody logged in to it. A session
> simply arrived, carrying proof that a login had happened somewhere
> else.

**Sources after the change**

- 63B-4 §5.3 — no longer stated as a list. Still what the sheet's first row
  rests on: the address a sign-in arrived from is among the characteristics a
  provider evaluates, which is why it is in the console at all.
- CISA-PHISH pp. 6-7 — unchanged.

**Flags after the change**

- `illustration` — "The provider's own record of Tuesday's sign-in carried
  the address it came from, and it was a range this firm has never once
  used"; "It sat in a console nobody had open". Composed, as before.
- `interpretive` — "that is not a hole in its logging", retained unchanged.
  J1 keeps it and `guide/01/10-detection.md` does not state it.

**One borderline left as written.** "A session simply arrived, carrying proof
that a login had happened somewhere else" is close to
`guide/01/06-session-tokens.md`'s "They are presenting proof that an
authentication already happened." `current-feature.md` directed the sweep of
this block against `10-detection.md`, which does not contain that sentence,
and the block's version is a statement about what this document store saw
rather than a rule. It is left as written and flagged here so Dane can
overrule it.

---

#### `block-11` — the count, the sheet line, and J4

Sheet line 3 now reads "Signals available: two. Signals read by a person:
none", and the narration's "All three signals ... all three were available.
Not one of them" becomes "Both signals ... both were available. Neither".

The J4 sweep: "it is why CISA's advice to small organisations is mostly about
arranging to be told: turn the alerting on, watch the internal mail, and keep
a trail somebody can go back through" is a three-item summary of
`guide/01/10-detection.md`'s "What a small firm can do deliberately", which
gives the same three measures and two more. Replaced with what this firm had
not arranged, which is the incident's side of the same page.
**Before**

> [[r]]Friday morning a client telephones the firm about an instruction
> they had received from Ruth. Ruth had sent nothing. That is what
> raised the alarm — not a log, not an alert, not a console, but a phone
> call from outside the firm, sixty-four hours after the fact. [[r]]All
> three signals were real and all three were available. Not one of them
> was read by a person, because reading them was nobody's job on any
> particular morning. [[r]]That is the ordinary case in a practice this
> size, and it is why CISA's advice to small organisations is mostly
> about arranging to be told: turn the alerting on, watch the internal
> mail, and keep a trail somebody can go back through.

**After**

> [[r]]Friday morning a client telephones the firm about an instruction
> they had received from Ruth. Ruth had sent nothing. That is what
> raised the alarm — not a log, not an alert, not a console, but a phone
> call from outside the firm, sixty-four hours after the fact. [[r]]Both
> signals were real and both were available. Neither was read by a
> person, because reading them was nobody's job on any particular
> morning. [[r]]At this firm nobody was told, because nobody had
> arranged to be told. The alerting on the mailbox was never switched
> on. Nobody read the firm's own internal mail for anything out of
> place. And the trail the sign-on service had been keeping all week was
> not opened by anyone until Dev went looking for it on Friday morning,
> after the telephone call.

**Sources after the change**

- CISA-PHISH pp. 6-7 — unchanged, and now carried as the measures this firm
  did not have rather than as advice restated. Monitoring internal mail is
  CISA's; "Nobody read the firm's own internal mail for anything out of
  place" is this firm failing to do it. SSO's audit trail is CISA's; "the
  trail the sign-on service had been keeping all week" is this firm's copy of
  it, unopened.

**Flags after the change**

- `illustration` — the whole third movement: the alerting never switched on,
  nobody reading internal mail, and the trail unopened until Dev went looking
  for it on Friday morning. All composed, and consistent with `block-12`,
  where Dev's first action is at 09:31 and the audit comes after 09:44.
- `framing` — "reading them was nobody's job on any particular morning",
  retained unchanged.
- The sixty-four-hour figure and the Friday telephone call keep their
  `illustration` flags from the entry above.

---

#### `block-12` — J4: the response performed, not explained

Three rule statements went, and all three are in
`guide/01/11-response.md`, which is built on exactly them: "A password
governs the next sign-in and does nothing whatever to a session already
running" is the guide's opening paragraph; "NIST forbids changing passwords
on a schedule but requires a change on evidence of compromise" is its step 2;
"removing one in error costs less than leaving a compromised one in place" is
its step 3, which quotes §4.5's sentence in full. The order is still the
lesson — it is now shown as a clock rather than argued, and the `items` are
the clock too.
**Before**

> [[r]]Dev works the response, and the order is not the instinctive one.
> Terminate first. A password governs the next sign-in and does nothing
> whatever to a session already running, and a session already running
> is the entire access. [[r]]Then the password, and only now is it the
> right move: NIST forbids changing passwords on a schedule but requires
> a change on evidence of compromise, and this week is evidence.
> [[r]]Then the authenticator he bound, which nothing earlier in the
> sequence touches. NIST is unusually blunt about hesitating here —
> removing one in error costs less than leaving a compromised one in
> place. [[r]]And one thing went wrong. Signing out at the sign-on
> service did not close the document store, which ran on for another
> eleven minutes.

**After**

> [[r]]Dev works the response, and he works it in an order that feels
> backwards. At nine thirty-one he ends every session on Ruth's account,
> before he touches anything else. [[r]]At nine thirty-six, he changes
> the password. [[r]]At nine forty-four he opens the list of Ruth's
> sign-in methods and finds one she has never seen, added on Thursday at
> ten forty. He removes it, and re-enrols the ones she recognises. Then
> he pulls the record of everything the account opened that week, and
> reports the incident. [[r]]And one thing went wrong. Signing out at
> the sign-on service did not close the document store, which stayed
> open for another eleven minutes.

**`items` before and after**

Before:

    "1 — Terminate the sessions, at every service that keeps its own"
    "2 — Change the password; there is now evidence, which is the trigger"
    "3 — Invalidate the authenticator he bound, and re-enrol the ones she knows"
    "4 — Audit what the account reached, then report it"
    "Missed for eleven minutes: the document store's own session"

After:

    "09:31 — Every session on the account ended"
    "09:36 — Password changed"
    "09:44 — An unknown sign-in method found and removed; the known ones re-enrolled"
    "Then — Access audited, incident reported"
    "Missed for eleven minutes: the document store's own session"

Five items and four reveals, as before.

**Sources after the change**

- CISA-PHISH p. 11 — re-provision compromised accounts first, to prevent
  continued access; audit account access afterwards; report. The sequence the
  clock runs is this one.
- 63B-4 §5.2 — terminating at an identity provider does not terminate at a
  relying party. This is what the last line reports as an event: signing out
  at the sign-on service did not close the document store.
- 63B-4 §3.1.1.2, §4.3, §4.5 — no longer stated. They remain the reason
  09:36 and 09:44 are the right moves in the right order, which is the whole
  point of the block, so the citation stays. See the citation finding below.

**Flags after the change**

- `illustration` — 09:31, 09:36, 09:44, and "added on Thursday at ten
  forty", which matches `block-08`'s sheet row `Thu 10:40`. The eleven-minute
  gap keeps its `illustration` flag; `q-16`'s inherited-flag note still
  holds.
- `framing` — "he works it in an order that feels backwards". The lesson's
  characterisation of the order, not a claim about what responders usually do.

---

#### `block-13` — J3, and J4

The citation moves from `W3C REC-webauthn-3-20260825 §1` to `§1.3`, which is
inside the scope `sources/sec/INDEX.md` sets. The `boundary only` flag is
cleared.

The J4 sweep: "because her authenticator is asked to sign for an origin that
is not her provider's, and the credential it holds can only be reached by her
provider's origin. There is no output to relay. Nothing at all depends on
Ruth noticing anything, which is the test NIST actually sets" is
`guide/01/09-phishing-resistant.md` twice over — "It cannot relay this,
because the credential the victim's authenticator would need is scoped to the
real relying party's origin, and the attacker's site is not that origin",
and "The check is not 'did the person notice the domain' — it is the protocol
declining to produce an output at all." This is the most consequential of the
four sweep edits, because the removed sentences were the lesson's stated
payoff. What replaces them is the payoff as the incident: the twelve sheets
that came before, named and cancelled one at a time.
**Before**

> [[r]]Now run that same Tuesday again and change exactly one thing: the
> second factor on the account is a passkey. Ruth still gets the
> message. She still clicks it. She still lands on the attacker's page,
> and she still does not read the far end of the hostname. [[r]]And it
> ends at 4:43:20, because her authenticator is asked to sign for an
> origin that is not her provider's, and the credential it holds can
> only be reached by her provider's origin. There is no output to relay.
> Nothing at all depends on Ruth noticing anything, which is the test
> NIST actually sets, and it is the only line in this story that was
> ever going to hold.

**After**

> [[r]]Now run that same Tuesday again and change exactly one thing: the
> second factor on the account is a passkey. Ruth still gets the
> message. She still clicks it. She still lands on the attacker's page,
> and she still does not read the far end of the hostname. [[r]]And the
> incident ends at 4:43:20. Her authenticator is asked for an origin
> that is not her provider's, and it produces nothing to relay. There is
> no 4:43:35, and no session for the provider to issue. Thursday's
> second sign-in method is never added. The client's telephone call on
> Friday is never made. Every one of the twelve sheets before this one
> sits downstream of one second on Tuesday afternoon, and that is the
> second where it stops.

**Sources after the change**

- 63B-4 §3.2.5, §3.2.5.2 — no longer stated. Carried by the sheet's right
  column, "The origin asked for / Not her provider's".
- WebAuthn §1.3 — the sample authentication flow: the authenticator is shown
  the origin requesting a credential. This is what "Her authenticator is
  asked for an origin that is not her provider's" reports, and §1.3 is now
  the locator.
- CISA-MFA p. 3 — unchanged; it is what licenses the word "passkey" as a
  deployable thing.

**Flags after the change**

- `framing` — the counterfactual itself, retained.
- `illustration` — 4:43:20 and 4:43:35, and the cancelled Thursday and
  Friday events. Composed, and consistent with the clock above.
- `boundary only` — **cleared** (J3).

### The sweep Dane's reviewer could not run

`current-feature.md` directed the J4 test at four blocks that had not been
compared, against the four guide files that had not been used:

| Block | Guide file | Found | Result |
|---|---|---|---|
| `block-03` | `02-phishing.md` | 1 sentence | replaced, see above |
| `block-09` | `10-detection.md` | 1 clause | replaced, see above |
| `block-11` | `10-detection.md` | 1 sentence | replaced, see above |
| `block-13` | `09-phishing-resistant.md` | 1 passage | replaced, see above |

So: not none. Four, one in each block swept, each one a rule the matching
guide file already explains, and each one replaced with what happened in the
incident and flagged `illustration` where the replacement is composed. The
before and after text of all four is in the block entries above. One
borderline in `block-09` is flagged there and left as written.

Three sentences in the swept blocks were examined and **kept**, because they
report what Ruth or the firm did rather than stating a rule:

- `block-03`, "It is the right page in every respect she can check quickly:
  the layout, the wordmark, the connection indicator" — `02-phishing.md`
  states the *rule* that none of those is evidence; this sentence states that
  Ruth checked them.
- `block-09`, "It sat in a console nobody had open" — not in the guide in any
  form.
- `block-11`, "not a log, not an alert, not a console, but a phone call from
  outside the firm" — `10-detection.md` says a small firm will detect a
  takeover "by noticing something, or by being told", which is close, but
  this sentence is the particular telling that happened here.

### Questions — re-confirmed after the pass

`current-feature.md` required confirming that each of `q-13`..`q-16` still
has its correct answer supported, and updating feedback's re-watch pointers
if a supporting sentence moved. No stem, choice, correct answer or feedback
text needed changing, and none was changed.

- **`q-13`** (`after_block: 6`, correct `b`). Supported, and better than
  before: the new `block-04` ends "By every test the provider applies, this
  is Ruth signing in", and the new `block-05` adds "Ruth sees nothing
  unusual — no second prompt, no error, no warning" before keeping "The
  visible outcome of a finished takeover is a sign-in that worked." The
  feedback's distractor note for choice (c) — that the code is single-use and
  was used inside its window — is still supported: `block-04` now says
  "correct, unused, and inside its window", and
  `guide/01/07-proxy-phishing.md` carries the replay-resistance property in
  full. Re-watch pointer "S-04 and S-05, blocks 4 and 5, then ... S-06" is
  still correct; both supporting sentences are still in blocks 4 and 5.
- **`q-14`** (`after_block: 11`, correct `b`). `block-10` was not touched by
  this pass. Re-watch pointer "S-10, block 10" unchanged and correct.
- **`q-15`** (assessment, correct `b`). The pivot sentence survives: the new
  `block-05` still says the provider "issues a session secret, and hands it
  to whichever machine finished the sign-in". The feedback's closing line —
  "the response in the final blocks terminates before it changes anything" —
  is still true of the new `block-12`, where 09:31 ends the sessions and
  09:36 changes the password. **One `_source` note updated**: it referred to
  `block-05`'s bearer-token gloss as an inherited flag, and that sentence no
  longer exists, so the note now records its removal under J4 and that the
  question rested on §5.1's text rather than on the gloss. No stem, choice,
  answer or feedback text was touched.
- **`q-16`** (assessment, correct `c`). Both surviving routes are still
  narrated: `block-08` is untouched for the bound authenticator, and the new
  `block-12` both removes it at 09:44 and reports the document store staying
  open for eleven minutes. The feedback's "which is why the document store
  kept running here after the sign-on service had been signed out" still
  matches the narration. `block-12`'s `items` now name 09:44 and keep the
  eleven-minute line.

No answer became unsupported, so there was nothing to stop and report.

### Overlap with `guide/01/` — re-run

Re-run after the edits with a throwaway script over all fourteen files in
`guide/01/`, comparing normalised word sequences (lower-cased, punctuation
stripped) from every block's `narration` with markers stripped. The script is
not committed.

**Runs of 8 or more consecutive words shared with any guide file: zero.**

**Runs of 6 words: zero.** Both of the runs the first-draft report kept
deliberately are gone, each removed by a J4 edit rather than by paraphrase:

- "one level below the public suffix" — was `block-03`, against
  `02-phishing.md` and `09-phishing-resistant.md`. The sentence that carried
  it was the §3.2.5.2 rule the guide already states, and it was replaced. The
  phrase still appears on `block-03`'s sheet, which is not narration and not
  in the transcript of record.
- "activity resets the inactivity clock" — was `block-07`, against
  `06-session-tokens.md`, where it appears word for word. The sentence that
  carried it was removed.

**Runs of 5 words: two**, both function words carrying no content: "and it is
not a" (`block-02`, against `05-what-mfa-stops.md`) and "and it is worth
being" (`block-09`, against `04-infostealers.md`). Neither is a term of art
and neither carries an argument.

### Size after the pass

**New narrated word total: 1,464 words**, across thirteen narrated blocks,
down 39 from the first draft's 1,503. Counted the way `scripts/check-lessons.ts`
counts — whitespace-separated tokens of `transcriptOf(b)`, markers stripped —
so an em dash counts as a token, as it does in the first-draft figures above.

Projected runtime of the narration, which is a projection and not a
measurement (7.02.7: no estimate may reach a credit calculation):

| Rate | Narration | Plus the 8 s Title sheet |
|---|---|---|
| 130 wpm (the documented default) | 675.7 s — 11m 16s | 683.7 s — 11m 24s |
| 165.5 wpm (the only pace this repo has ever measured) | 530.8 s — 8m 51s | 538.8 s — 8m 59s |

`npm run check` reports 11m 22s, which is the sum of the thirteen recomputed
`estimatedSeconds` values plus the Title sheet's 8 s; it differs from 683.7 s
only because each block's estimate is rounded to a whole second before being
summed.

The total is above `current-feature.md`'s 1,400-word floor, so nothing was
added and nothing was padded. **J5 is unchanged in kind and slightly tighter
in degree**: at 165.5 wpm the margin over the 497 s J5 records is now about
34 s rather than about 48 s. Both projections still clear it, and it is still
a decision to take after `generate` against the measured number, not a reason
to add words now (7.01).

Character total sent to the API if `generate` is run for all thirteen blocks,
from `npm run generate -- --lesson 02 --dry-run`: **8,245 characters**.

### Findings from this pass, for Dane

1. **`block-07`'s sheet is now ahead of its narration.** Rows 2 and 3 name an
   inactivity timeout and an overall timeout that the narration no longer
   introduces, because the sentence that introduced them was the guide rule
   J4 removed. `current-feature.md` replaced this block's `narration` and did
   not give a `figure`, and changing a figure it did not name was out of
   scope. The two rows are still true of the incident; they are simply
   unexplained on screen now. A one-line fix would be to replace them with
   what the attacker's reading did rather than what the clocks are.
2. **Six blocks now cite a paragraph the narration no longer states.**
   `block-03` (§3.2.5), `block-04` (§3.2.5), `block-07` (§5.2), `block-09`
   (§5.3), `block-12` (§3.1.1.2, §4.3, §4.5) and `block-13` (§3.2.5,
   §3.2.5.2, and CISA-MFA p. 3). In each case the paragraph is still what
   makes the block's sheet or its order true, which is why the citations were
   kept. If Dane would rather a `citation` name only what the narration
   itself says, that is a trim across those six blocks and a separate
   decision.
3. **`block-09`'s "carrying proof that a login had happened somewhere
   else"** is close to `guide/01/06-session-tokens.md`'s "They are presenting
   proof that an authentication already happened." Outside the file this
   block was directed to be swept against, and arguably incident rather than
   rule. Flagged, not changed.
4. **J6 has slightly more to confirm.** This pass added composed detail on
   blocks 4, 5, 7, 11 and 12 — the page-load moment, Ruth seeing no delay,
   what the mailbox held, what the firm had not switched on, and Dev's three
   timestamps. All of it is flagged `illustration` above, and none of it is
   phrased as a claim about what attackers or firms generally do.
5. **Nothing is voiced and nothing is rendered.** `usingEstimates` is still
   true, every duration in the module is still an estimate, and
   `meta.status` is still `"draft"`, so `export` still refuses the lesson.
