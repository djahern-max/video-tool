# ATO-01 — Account Takeover: How Credentials Are Stolen and How to Stop It — accuracy record

This is where the content developer records reading the guide for accuracy
before the lesson ships (4.01.1 — technology was used in developing it).
Corrections to a text lesson stay nearly free, but what has to be checked
does not change: that the 7.02.5 role assignments are honest (nothing
excluded smuggled into `body`) and that any clips are additional learning,
not narration.

How to read it: for each section, the file, its role (which decides whether
its words are counted), and the sources relied on, claim by claim; then every
sentence that is **not** traceable to a file in `sources/sec/` marked
`UNSOURCED` with what a human must verify. The lesson data lives in
`src/lesson-01.ts`, `src/questions-01.json`, and `guide/01/*.md`; edit those
files, not this one.

**One departure from the video-lesson format.** The ASC842 records quoted
each block's narration in full, because narration is not otherwise readable
as prose. A text lesson's prose is on disk and is the thing you are reading;
reproducing 7,582 words here would make this document harder to use, not
easier. So each section below gives the *claims* and their sources, and
quotes verbatim only the sentences that carry a flag. Read the guide with
this open beside it.

**Status, first draft (2026-09-06).** Unchecked. `meta.status` is `"draft"`;
export refuses it. The 4.02 independent content review happens in superCPE,
against the ingested package — not in this file.

---

## Two problems in the source set, found while drafting

**1. `CISA-Phishing-Guidance-Stopping-the-Attack-Cycle.pdf` was not the
document.** The file in `sources/sec/` was 475 bytes: an Akamai
"Access Denied" HTML error page saved under a `.pdf` name. The download that
produced it had returned HTTP 403 and the failure was never noticed. This is
the source `INDEX.md` assigns to body sections 02, 10 and 11 — three of the
eleven, including two it already flags as thinly sourced.

The real document was retrieved and now sits at that path (872,842 bytes,
sha256 `4ab4fdd2794575a0839793dcd646c3b7f7f53351193ff9009136d2b6065597f8`).
Every citation to it in this record is against the retrieved document.

**The URL in `INDEX.md` no longer resolves.** `INDEX.md` cites
`https://media.defense.gov/2023/Oct/18/2003322402/-1/-1/1/CSI-PHISHING-GUIDANCE.PDF`,
which returns 403. The copy that resolves is
`https://www.cisa.gov/sites/default/files/2025-03/Phishing%20Guidance%20-%20Stopping%20the%20Attack%20Cycle%20at%20Phase%20One%20508.pdf`,
linked from
`https://www.cisa.gov/resources-tools/resources/phishing-guidance-stopping-attack-cycle-phase-one`.
`INDEX.md` was **not** edited — it is the human's authority on standing, and
correcting a citation in it is the human's call. See J1. Appendix A of the
guide cites the CISA landing page, which is stable.

**2. `INDEX.md` names `.txt` extractions for both CISA PDFs. Neither
exists.** Only `NIST-SP-800-63B-4.txt` and `WebAuthn-L3.txt` are present. The
CISA documents were read for this feature by extracting their text with a
throwaway script, because this machine has no `pdftotext`, `mutool`, `qpdf`
or Python PDF library installed. That extraction is not committed and is not
reproducible by anyone reading this record. See J2.

---

Learning objectives (from `src/lesson-01.ts`):

- **lo-1** — Identify the primary techniques attackers use to obtain user
  credentials.
- **lo-2** — Distinguish a phishing login page from a legitimate one using
  observable indicators.
- **lo-3** — Explain how stolen session cookies allow an attacker to bypass
  multi-factor authentication.
- **lo-4** — Compare multi-factor authentication methods by their resistance
  to real-time proxy phishing.
- **lo-5** — Identify the indicators that suggest an account has been taken
  over.
- **lo-6** — Determine the response steps appropriate to a suspected account
  takeover.

Short forms used below: **63B-4** = NIST SP 800-63B-4 (July 2025);
**CISA-MFA** = CISA, *Implementing Phishing-Resistant MFA* (Oct 2022);
**CISA-PHISH** = CISA/NSA/FBI/MS-ISAC, *Phishing Guidance: Stopping the
Attack Cycle at Phase One* (Oct 2023); **WebAuthn** = W3C
REC-webauthn-3-20260825.

---

## Sections

### sec-00 — `00-front-matter.md` — role `front_matter` — excluded

The "How this course works" block is the template from the end of
`docs/course-package.md`, unmodified (4.05.3 item 4). The opening paragraph
describing scope and audience was written for this feature.

**Flags**
- `UNSOURCED` (descriptive) — "It is written for licensed CPAs in small
  firms, where there is no security operations team and the person who
  notices the problem is usually the person who has to act on it." This is
  the audience statement from `current-feature.md`, not a claim from a
  source. Confirm it matches how the course will actually be marketed and
  registered.
- The paragraph states field of study Information Technology and knowledge
  level Basic. `src/course.ts` still carries `nasbaFieldOfStudy: "TODO: ..."`.
  These must agree before export. See J3.

### sec-01 — `01-why-credentials.md` — role `body` — counted — 662 words — lo-1

**Sources**
- 63B-4 Appendix D — the definitions of *subscriber*, *claimant*,
  *authenticator*, *verifier*, *relying party*, *authentication*. All six are
  used in NIST's wording, lightly reworded only to run as prose.
- CISA-MFA, "Areas of Focus for Implementing Phishing-Resistant MFA" —
  "What resources do I want to protect from compromise?" (email systems, file
  servers, remote access systems, identity servers such as Active Directory)
  and "Which users are high-value targets?" (a small number of accounts with
  additional access or privileges; attorneys with e-discovery permissions; HR
  staff with access to personnel records).
- The four-technique list is a table of contents for the guide; each entry is
  sourced in its own section.

**Flags**
- `UNSOURCED` (interpretive) — "An attacker who compromises a machine has a
  machine. An attacker who compromises an account has whatever that account
  can reach and whatever it can authorize — and can often keep that access
  after the machine has been wiped and replaced." The second clause follows
  from 63B-4 §5.1 (a session rests on a secret the attacker now holds) but no
  source states it. Verify you are comfortable with it as an opening claim.
- `UNSOURCED` (framing) — "The verifier never sees the person; it sees
  evidence." A restatement of the Appendix D definitions, not a quotation.
- `UNSOURCED` (analogy) — the whole "An accounting practice is built the same
  way" paragraph. CISA names attorneys and HR staff as high-value targets;
  extending that to a CPA practice's mailbox, document store and professional
  standing is the author's reasoning. It is the paragraph that makes the
  course relevant to its audience, so it deserves a deliberate look rather
  than a nod.
- "three of those four work against someone who already has multi-factor
  authentication switched on" — not flagged: sourced compositionally by
  §§05–08. Confirm the arithmetic reads correctly (credential stuffing is the
  one MFA does stop).

### sec-02 — `02-phishing.md` — role `body` — counted — 720 words — lo-1, lo-2

**Sources**
- 63B-4 App. D — definition of *phishing*.
- 63B-4 §3.2.5 — "How the claimant is directed to the impostor verifier is
  not relevant."
- 63B-4 §3.2.5.1 — channel binding preferred because it "is not vulnerable to
  the misissuance or misappropriation of verifier certificates"; an impostor
  verifier may have "obtained a certificate that represents the actual
  verifier."
- 63B-4 §3.2.5.2 — the verifier identifier for DNS identifiers is "the
  authenticated hostname of the verifier or a parent domain that is at least
  one level below the public suffix."
- CISA-PHISH, "Phishing to Obtain Login Credentials" — the definition; the
  example techniques (impersonating supervisors, colleagues or IT personnel;
  SMS and chat platforms; VoIP caller-ID spoofing "takes advantage of public
  trust in the security of phone services"); the hybrid-environment note; the
  six-digit-code capture and its use "to authenticate as the user in the
  legitimate login portal."
- CISA-PHISH, "Malware-Based Phishing" — "It can be difficult for a user to
  detect malicious URLs on these small platforms, as they use constrained
  user interfaces."
- CISA-PHISH, mitigations — DMARC with SPF and DKIM "verify the sending
  server of received emails by checking published rules."

**Flags**
- `UNSOURCED` (judgment) — "**Observable at this step:** tone, timing, and the
  plausibility of the request — all of them judgment calls, and all of them
  things a competent attacker is deliberately managing."
- `UNSOURCED` — "Nothing about the visual design of that page is evidence of
  anything. A logo is a copied image. Layout is copied markup." True and
  uncontroversial, but stated on no authority.
- `UNSOURCED` (interpretive) — **this is lo-2's load-bearing sentence and the
  most important flag in the section.** The guide says the origin is
  "the fact the protocol itself binds to, and it is the fact a person can
  read in the address bar." §3.2.5.2 establishes the first half — the
  protocol binds to the authenticated hostname. It says nothing about a
  person reading an address bar. The step from "this is what the protocol
  authenticates" to "this is what you should check" is the author's, and it
  is the practical advice the objective is assessed on. Verify deliberately.
- `UNSOURCED` (interpretive) — "A connection indicator tells you the
  connection is protected. It does not tell you who is on the other end of
  it." Reasoned from §3.2.5.1's acknowledgement that an impostor verifier may
  hold a certificate representing the real one. No source discusses browser
  padlock indicators. Note that 63B-4 §6.2 Table 4 *recommends* observing the
  lock icon — as a mitigation for eavesdropping, not for phishing. If this
  sentence is kept, confirm it cannot be read as contradicting that.
- `UNSOURCED` — "A well-built harvest page forwards the victim to the genuine
  service afterwards, so the visible outcome is an ordinary, if slightly odd,
  sign-in."

### sec-03 — `03-credential-stuffing.md` — role `body` — counted — 693 words — lo-1

**Sources**
- MITRE ATT&CK T1110.004 (Credential Stuffing), a sub-technique of T1110
  (Brute Force) — used for the name and boundary of the technique only, per
  `INDEX.md`. No ATT&CK prose is quoted; no file exists to quote.
- 63B-4 §3.1.1.1 — "Other composition requirements for passwords SHALL NOT be
  imposed."
- 63B-4 §3.1.1.2 — item 1 (15-character minimum as a single factor; 8 as part
  of MFA), item 2 (maximum of at least 64), item 5 (no composition rules),
  item 6 (no periodic change; forced change on evidence of compromise),
  the blocklist requirement and its example contents ("passwords obtained
  from previous breach corpuses," dictionary words, context-specific words),
  and the password-manager and paste requirements.
- 63B-4 Appendix A.3 — the "password" → "Password1" → "Password1!" reasoning,
  quoted closely.
- 63B-4 §3.1.1 — "Passwords are not phishing-resistant."
- 63B-4 §3.2.7 — passwords are not replay-resistant "because the same
  authenticator output (i.e., the password itself) is provided for each
  authentication."
- CISA-PHISH, "Small- and Medium-Sized Businesses (SMBs) or Organizations" —
  "Implement strong password policies … which requires minimum character
  length, numbers, special characters, and case sensitivity, along with
  prohibiting users from recycling previously used passwords."

**Notes**
- Every password requirement in this section was read out of the file rather
  than written from working knowledge, per the `INDEX.md` trap. The section
  numbers in the guide text are the real ones and can be checked directly.
- The conflict paragraph is deliberate. CISA-PHISH's SMB advice contradicts
  63B-4 §3.1.1.2 items 5 and 6 on two points (composition rules; recycling,
  which implies scheduled change). `INDEX.md`'s precedence rule — 63B-4 is
  newer and more precise on authenticator requirements and governs — is
  applied and stated in the guide. This is worth the reviewer's attention
  because the guide contradicts a CISA recommendation in print. See J4.

**Flags**
- `UNSOURCED` (interpretive) — "That last requirement is the direct answer to
  credential stuffing." Well founded (the blocklist explicitly may include
  breach corpuses, which is the attacker's own input) but it is the author's
  connection.
- `UNSOURCED` (interpretive) — "A practice can be compromised this way
  without any attacker ever having touched it …" Follows from the technique's
  boundary; not stated anywhere.
- `UNSOURCED` (interpretive) — "Long, unique, screened passwords defeat
  stuffing." *Unique* is user advice; 63B-4 states requirements on verifiers
  and does not address reuse across services. The link to reuse comes from
  the definition of the technique, not from NIST.

### sec-04 — `04-infostealers.md` — role `body` — counted — 632 words — lo-1, lo-3

`INDEX.md` flags this section as under-sourced: T1555 names the technique but
does not describe the artifact. **No published technical analysis was added.**
The section is written at the level the ATT&CK pages support and says so in
the text, in the paragraph beginning "A note on the limits of this section."
That paragraph is the mitigation; if it is edited out, the section
overclaims.

**Sources**
- MITRE ATT&CK T1555 (Credentials from Password Stores) and T1539 (Steal Web
  Session Cookie) — names and boundaries only.
- CISA-PHISH, "Malware-Based Phishing" — malicious links and attachments
  "facilitating initial access, information stealing, damage or disruption to
  systems or services, and/or the escalation of account privileges."
- 63B-4 §6.1 — "something you know" disclosed via malicious software
  installed to capture the secret; "something you have" cloned by "an
  attacker who gains access to the owner's computer."
- 63B-4 §6.2 Table 4, Endpoint Compromise — "Use hardware authenticators that
  require physical action by the claimant"; "Maintain software-based keys in
  storage with restricted access."
- 63B-4 §3.2.13 — exportability; keys are exportable unless generated, stored
  and used in a protected hardware environment, "intended to prevent software
  on the endpoint from copying or leaking the authentication secret."
- 63B-4 §5.1 and App. D — the definition of a session and of the session
  secret issued at the time of authentication.

**Flags**
- `UNSOURCED` — "A password in a browser store is software-readable by
  design; it has to be, because the browser has to fill it in." This is the
  gap `INDEX.md` names. It is almost certainly true and it is the section's
  central mechanism claim. Nothing in `sources/sec/` supports it.
- `UNSOURCED` (interpretive) — "Malware running with the user's privileges
  can read the first and cannot read the second." The conclusion follows from
  §3.2.13's stated intent; the framing in terms of user privileges does not
  appear in any source.
- `UNSOURCED` (interpretive) — "They do not need the password, because the
  password's job is finished. They do not need the second factor, because the
  second factor's job is finished too." Follows from §5.1; stated as
  rhetoric.

### sec-05 — `05-what-mfa-stops.md` — role `body` — counted — 690 words — lo-1, lo-4

**Sources**
- 63B-4 App. D — *multi-factor authentication* and *authentication factor*,
  in NIST's wording.
- 63B-4 §3.2.5 — the block on manually entered authenticator outputs, quoted
  closely: manual entry "does not bind the authenticator output to the
  specific session being authenticated," and "an impostor verifier could
  relay an authenticator output to the verifier and successfully
  authenticate."
- 63B-4 §3.1.3 — "Out-of-band authentication is not phishing-resistant."
- 63B-4 §3.1.1 — "Passwords are not phishing-resistant."
- 63B-4 §5 and §5.1 — sessions exist so the authentication event need not be
  repeated; continuity rests on a session secret issued at authentication.
- CISA-MFA, Overview — the definition of MFA; "With MFA enabled, if one
  factor, such as a password, becomes compromised, unauthorized users will be
  unable to access the account if they cannot also provide the second
  factor," stopping techniques "such as password spraying"; the urging to
  implement MFA "for all users and for all services, including email, file
  sharing, and financial account access"; "any form of MFA is better than no
  MFA and will reduce attack surface, phishing-resistant MFA is the gold
  standard."

**Flags**
- `UNSOURCED` (framing) — "MFA is a test applied at one moment. It
  establishes that whoever completed the ceremony had the factors." A
  restatement of the definitions, and the hinge the section turns on.
- `UNSOURCED` (interpretive) — "A six-digit code is a number. Nothing about it
  says which login it belongs to." A plain-language paraphrase of §3.2.5's
  binding sentence. Confirm the paraphrase is faithful.
- The section was checked against the instruction not to become a case
  against MFA: it opens with CISA's endorsement, states the endorsement is
  settled, and closes on method choice. Confirm it reads that way to you.

### sec-06 — `06-session-tokens.md` — role `body` — counted — 712 words — lo-3

This section carries lo-3 alone and sec-11's ordering depends on it.

**Sources**
- 63B-4 §5 — the opening rationale for sessions.
- 63B-4 App. D — the definition of *session*.
- 63B-4 §5.1 — continuity "SHALL be based on the possession of a session
  secret that is issued by the session host at the time of authentication";
  "Session secrets that are used as bearer tokens…"; erasure or invalidation
  on logout; timeouts; device-bound session credentials that prove possession
  rather than acting as bearer tokens and may be held "in protected keystores
  to reduce the risk of exfiltration by malware."
- 63B-4 §5.1.1 — "Browser cookies are the predominant mechanism by which a
  session is created and tracked"; "Cookies are not authenticators but are
  suitable as short-term secrets for the duration of a session."
- 63B-4 §5.2 — the two timeouts; "Session activity SHALL reset the inactivity
  timeout"; and the federation paragraph establishing that sessions at an IdP
  and an RP, and at multiple RPs, are terminated independently.
- MITRE ATT&CK T1539 — name and boundary.

**Flags**
- `UNSOURCED` (interpretive) — "A bearer token authorises whoever bears it.
  There is no further test of who that is." 63B-4 §5.1 uses the term "bearer
  tokens" without defining it. The gloss is standard and is the sentence lo-3
  rests on; it is still a gloss.
- `UNSOURCED` (interpretive) — "There is no point in the flow at which the
  service has a reason to ask for a second factor, because from the service's
  side nothing anomalous is happening." Follows from §5.1's continuity
  requirement.

### sec-07 — `07-proxy-phishing.md` — role `body` — counted — 700 words — lo-3, lo-4

`INDEX.md` flags this section as under-sourced for the claim that real-time
proxying is deployed rather than theoretical. **That gap is now substantially
closed**, by the retrieved CISA-PHISH: it lists, among instances of weak MFA
implementation that malicious actors exploit, an email link to a site that
mimics a legitimate login portal where "the user submits their username,
password, and the 6-digit code MFA, which the actors then receive to
authenticate as the user in the legitimate login portal." Four agencies
describing the technique in a joint advisory is the evidence the gap asked
for. **The gap is not fully closed**: see the flag below.

**Sources**
- 63B-4 §3.2.5 — the definition of phishing resistance ("without relying on
  the vigilance of the claimant"); the note that earlier revisions used
  "verifier impersonation" and "strongly MitM-resistant"; the block quotation
  on manual entry, reproduced verbatim in the guide.
- 63B-4 §3.2.7 — OTP authenticators are replay-resistant; nonces and
  challenges prove freshness; passwords are not replay-resistant.
- CISA-PHISH, "Phishing to Obtain Login Credentials" — as above.

**Flags**
- `UNSOURCED` — the term *adversary-in-the-middle (AiTM)* appears in none of
  the four source documents. The guide says so in the text and gives NIST's
  vocabulary instead. Confirm the course should carry the term at all; it is
  also a glossary entry.
- `UNSOURCED` — that **automated proxy toolkits** exist which relay the full
  ceremony without a human operator. The guide does **not** claim this;
  CISA-PHISH describes the relay of credentials and a code, not tooling. If
  anyone adds a sentence about toolkits, it needs a source that does not yet
  exist in this set.
- `UNSOURCED` (elaboration) — "It passes it straight through to the real
  service, in real time, and passes the real service's responses back," and
  "while the victim is still looking at the loading spinner." The mechanism
  is 63B-4 §3.2.5's relay; the step-by-step narration and the spinner are the
  author's illustration.
- `UNSOURCED` (interpretive) — "Replay resistance answers a question this
  attack never asks." The distinction between replay resistance (§3.2.7) and
  phishing resistance (§3.2.5) is sourced; putting them side by side to show
  that one does not imply the other is the author's argument. It is also the
  sharpest teaching point in the section, so check it carefully.

### sec-08 — `08-mfa-fatigue.md` — role `body` — counted — 684 words — lo-4

**Sources**
- CISA-MFA, "Cyber threat actors have used multiple methods…" — push bombing
  ("also known as push fatigue"); SS7 exploitation; SIM Swap
  ("convince cellular carrier representatives to transfer control of a user's
  phone number").
- CISA-MFA, Table 1 — mobile push notification **with** number matching:
  "Vulnerable to phishing attacks" and "Resistant to push bombing"; the
  description of number matching as the user entering "numbers from the
  identity platform into the application"; push **without** number matching:
  "Vulnerable to push bombing attacks as well as user error."
- CISA-PHISH, mitigations — "If an organization that uses mobile
  push-notification based MFA is unable to implement phishing-resistant MFA,
  use number matching to mitigate MFA fatigue"; and the weak-MFA instance
  "Malicious actors can send a multitude of approve or deny 'push requests'
  until a user either accepts the request, often by accident or in
  frustration."
- CISA-PHISH, example techniques — impersonating supervisors, colleagues or
  IT personnel; VoIP caller-ID spoofing.
- 63B-4 §3.1.3 — the two permitted out-of-band arrangements (transfer in
  either direction); the third method, "compares the secrets received from
  the primary and secondary channels and requests approval on the secondary
  channel," which "is no longer considered acceptable"; the authentication
  fatigue rationale; and "Presenting the claimant with a list of secrets to
  compare is not sufficient to meet this requirement."
- 63B-4 Appendix E — "Section 3.1.3: Disallows the comparison of secrets from
  primary and secondary channel for out-of-band authentication."
- 63B-4 §6.2 Table 4, Authentication Fatigue — "Require the transfer of an
  authentication secret for OOB authentication rather than approval."

**Notes — read this one carefully**
This is the section where CISA and 63B-4 come closest to being read as
contradicting each other, and where a careless reading produces a wrong
statement. They do not contradict. The distinction is:

- CISA's *number matching* has the user **type** a value shown by the
  identity platform into the authenticator app. In 63B-4's terms that is a
  **transfer** of the secret from the primary channel to the out-of-band
  device — the second of the two arrangements §3.1.3 permits.
- What §3.1.3 disallows is **compare-and-approve**: the user is shown values
  on both channels and taps to approve. NIST adds that choosing from a
  presented list is also insufficient.

The guide draws exactly this line ("whether the user **enters** the value or
merely **picks or approves** it"). Confirm it, because an edit in either
direction turns it into a false statement — either "NIST bans number
matching" (it does not) or "number matching is phishing-resistant" (CISA
says it is not). See J5.

**Flags**
- `UNSOURCED` (illustration) — "a person, at eleven at night, with a phone
  that will not stop buzzing, who taps the thing that makes it stop."
- `UNSOURCED` (illustration) — "A caller who sounds like the help desk,
  referring to a real ticket, asking for the code that has just arrived."
  The components (impersonating IT personnel, VoIP caller-ID spoofing) are
  sourced; this specific scenario is composed.
- `UNSOURCED` (interpretive) — "An attacker cannot get a number-matching
  prompt approved by nagging, because the user has nothing to nag *with*."
  Follows from CISA's "resistant to push bombing" rating; the mechanism is
  the author's.
- `UNSOURCED` (framing) — "Every method whose security ends in a person
  deciding correctly can be attacked by making the person decide
  incorrectly." Grounded in §3.2.5's vigilance clause; stated as an aphorism.

### sec-09 — `09-phishing-resistant.md` — role `body` — counted — 762 words — lo-4

**Sources**
- 63B-4 §3.2.5 — the definition; "Phishing resistance requires single- or
  multi-factor cryptographic authentication."
- 63B-4 §3.2.5.1 — channel binding; binding a channel identifier into the
  authenticator output; prevention of relay by an impostor verifier "even one
  that has obtained a certificate that represents the actual verifier";
  client-authenticated TLS; PIV and CAC.
- 63B-4 §3.2.5.2 — verifier name binding; the DNS identifier rule; WebAuthn
  named as the example, "by choosing an authenticator secret based on the
  authenticated domain name of the verifier"; and the statement that channel
  binding is considered more secure because it is not vulnerable to
  certificate misissuance or misappropriation.
- WebAuthn §1 (Introduction) — "the public key credential can only be
  accessed by origins belonging to that Relying Party. This scoping is
  enforced jointly by conforming User Agents and authenticators"; the two
  ceremonies, Registration and Authentication; platform and roaming
  authenticators over USB, BLE or NFC.
- WebAuthn §1.3.3 — the authentication flow: the authenticator shows the user
  the acceptable credentials "along with some information on the origin that
  is requesting these keys," obtains an authorization gesture, and the server
  verifies the assertion signature against the registered public key.
- CISA-MFA, "Phishing-Resistant MFA Implementations" — "The only widely
  available phishing-resistant authentication is FIDO/WebAuthn
  authentication"; WebAuthn support in major browsers, operating systems and
  smart phones; PKI-based MFA "requires highly mature identity management
  practices" and "is also not as widely supported by commonly used services";
  PIV and CAC as examples.
- CISA-MFA, "Areas of Focus" and "Common Issues and Paths Forward" —
  prioritising phishing-resistant MFA for administrator and privileged
  accounts; focusing first on services that support it, since "most hosted
  mail and SSO systems support FIDO."

**Flags**
- **Scope note, not an error.** `INDEX.md` says to use WebAuthn §1.2 and §1.3
  only. The origin-scoping sentence the section turns on is in §1's
  introduction, immediately before §1.1, and is the only place the
  specification states the property plainly. It is mechanism, not API
  surface, so it is within the spirit of the restriction — but it is outside
  its letter, and it is recorded here rather than glossed over. See J6.
- No `PublicKeyCredential` member, interface, dictionary or internal method
  is named anywhere in the section, and nothing from §5 onward is cited.
  Level 3's additions are not presented as a security improvement; they are
  not mentioned at all. Both `INDEX.md` traps were checked against the
  finished text.
- `UNSOURCED` (interpretive) — "There is nothing for the user to get wrong.
  The check is not 'did the person notice the domain' — it is the protocol
  declining to produce an output at all." This is the payoff sentence for
  lo-4. It follows from WebAuthn §1's scoping plus §3.2.5's vigilance clause,
  but no source says it in one breath.
- `UNSOURCED` (framing) — "The methods in sections 05 through 08 differ from
  each other in how hard they are to attack. This one differs in whether the
  attack is available."

### sec-10 — `10-detection.md` — role `body` — counted — 671 words — lo-5

`INDEX.md` flags this section as having **no source at all**. That turned out
to be too pessimistic — 63B-4 §4.6 and §5.3 and CISA-PHISH's mitigations
carry real weight — but it is still the thinnest section in the guide, and
the two indicators most people would expect are the two that are not
supported. The section names them as unsupported in its own text rather than
asserting them. **If that closing subsection is edited out, the section
becomes dishonest**, not merely incomplete.

**Sources**
- 63B-4 §4.6 — certain events require the subscriber to be independently
  notified; "These notifications help the subscriber detect possible fraud
  associated with their subscriber account"; at least two notification
  addresses; the notification "SHALL provide clear instructions, including
  contact information, in case the recipient repudiates the event."
- 63B-4 §4.3 — compromised authenticators include those "that have activation
  factors that are no longer in the subscriber's control"; providers should
  provide a method to report loss, theft, damage or compromise using a backup
  or alternate authenticator.
- 63B-4 §5.3 — session monitoring; the list of characteristics that may be
  evaluated (usage patterns, velocity and timing; behavioural biometrics;
  device and browser characteristics; geolocation; IP address
  characteristics, "e.g., whether the IP address is in a block known for
  abuse"); and the privacy-risk-assessment requirement.
- CISA-PHISH, mitigations — "Review MFA lockout and alert settings and track
  denied (or attempted) MFA logins"; "Perform an account lockout when unusual
  activity or ongoing malicious login attempts are occurring to prevent
  malicious actors from bypassing MFA"; SSO "provides IT professionals an
  audit trail to examine, either proactively or retroactively, after a
  suspected or confirmed security breach"; "Implement internal mail and
  messaging monitoring… Establish a baseline of normal network traffic and
  scrutinize any deviations."

**Flags**
- `UNSOURCED` — **mail rules created without the user's knowledge.** Named in
  the guide as unsupported. This is the single most commonly cited account
  takeover indicator in practice and the source set does not support it.
  Either find a source or leave the flag in place; do not quietly promote it.
- `UNSOURCED` — **a list of unfamiliar active sessions or devices on the
  account's own security page.** Also named in the guide as unsupported. No
  source establishes that providers expose such a list to users. Note that
  sec-11 step 1 tells the reader to use exactly this surface, so the two
  sections stand or fall together. See J7.
- `UNSOURCED` (interpretive) — "Velocity and geolocation together are why a
  sign-in from another continent minutes after one from your office is
  treated as suspicious." §5.3 lists velocity and geolocation as
  characteristics that may be evaluated; it does not describe impossible
  travel or say what a provider concludes from them.
- `UNSOURCED` — "which is part of why what you can see of them varies from
  provider to provider."
- `UNSOURCED` (interpretive) — "Repeated MFA prompts that nobody initiated
  are the push-bombing attack of section 08, visible in the logs while it is
  still failing."
- 63B-4 §5.3 describes what a *relying party* does, not what a subscriber
  sees. The guide says the §5.3 list is "the vocabulary a provider's security
  page uses," which is a bridge the source does not build. Verify.

### sec-11 — `11-response.md` — role `body` — counted — 656 words — lo-6

**Sources**
- CISA-PHISH, "Incident Response" — all six steps, in NIST-free wording:
  re-provisioning compromised accounts "to prevent malicious actors from
  maintaining continued access to the environment"; auditing account access;
  isolating the affected workstation; analysing the malware (which "may
  require outsourcing to expert third-party consultants"); eradicating it;
  restoring systems and confirming they function properly.
- CISA-PHISH, "Reporting" — reporting to CISA, to the FBI's Internet Crime
  Complaint Center, and to MS-ISAC for SLTT entities; and, from the
  mitigations, "Develop a documented incident response plan."
- 63B-4 §5.2 — sessions at an IdP and an RP terminate independently, and
  sessions at multiple RPs are established and terminated independently.
- 63B-4 §3.1.1.2 item 6 — "verifiers SHALL force a change if there is
  evidence that the authenticator has been compromised."
- 63B-4 §4.3 — compromised authenticators; prompt suspension, invalidation or
  destruction following compromise detection.
- 63B-4 §4.5 — invalidation as removal of the binding; and the sentence
  quoted verbatim in the guide: "The consequences of not invalidating a
  compromised authenticator are usually more significant than the
  denial-of-service potential of invalidating one in error."

**Flags**
- `UNSOURCED` — **the ordering itself.** "Revoke, then change, then re-enrol"
  is the spine of the section and of lo-6, and **no source states it.** Its
  two halves are sourced — a session rests on a secret independent of the
  next authentication event (§5.1, §5.2), and CISA's first response step is
  to cut continued access — but the imperative sequence is the author's
  synthesis. This is the most consequential judgment call in the lesson;
  lo-6 is assessed on it. See J8.
- `UNSOURCED` — "Sign out everywhere the account offers it, and revoke active
  sessions and connected applications." Assumes a user-facing session-revocation
  control exists. Same unsupported assumption as sec-10's second flag.
- `UNSOURCED` — "long, unique to this service, not a variation on the old
  one." 63B-4 states requirements on verifiers, not advice to subscribers.
  "Not a variation on the old one" is supported in spirit by Appendix A.3's
  discussion of trivial modifications; "unique to this service" is not
  addressed by 63B-4 at all.
- `UNSOURCED` (interpretive) — "Remove every authenticator you do not
  recognise." Derived from §4.3 and §4.5, which place the obligation on the
  CSP, not on the subscriber.
- `UNSOURCED` (interpretive) — "A password change on its own leaves the
  stolen session alive, and the stolen session is the access." The mechanism
  is sec-06's and is sourced; this compression of it is the author's.

### sec-90 — `90-glossary.md` — role `glossary` — excluded

Renders the ten terms in `meta.glossaryTerms`, plus a supporting-vocabulary
block of nine further 63B-4 Appendix D definitions used in the body sections.

**Definitions corrected in both the module and this file.** All ten were
checked against 63B-4 Appendix D; where NIST defines the term, NIST's wording
now governs.

| Term | What was wrong | Now |
|---|---|---|
| Authenticator | Said "the claimant possesses and controls" | App. D: "the **subscriber** possesses and controls … used to authenticate a **claimant's** identity" |
| Multi-factor authentication | Home-grown wording | App. D wording, plus the factor-type list from *authentication factor* |
| Relying party | Home-grown wording | App. D wording |
| Phishing-resistant authentication | Described only origin binding, i.e. one of NIST's two methods | §3.2.5 definition, naming both channel binding and verifier name binding |
| Session cookie | "A token a service issues…" | §5.1/§5.1.1, including "cookies are not authenticators" |
| Passkey | **Factually wrong**: "the private key never leaves the authenticator" | §3.2.13 and App. B: syncable authenticators' keys are inherently exportable. Synced passkeys' keys *do* leave the device by design |
| Verifier impersonation resistance | Presented as a current term | App. D redirects "verifier impersonation" to "phishing"; §3.2.5 records the rename |
| Credential stuffing | — | Unchanged; ATT&CK T1110.004 boundary added |
| Adversary-in-the-middle | — | Kept; now says NIST does not use the term |
| Infostealer | — | Kept; now says no source defines it, and cites T1555/T1539 |

The Passkey correction is the one to look at hardest: the old definition
would have taught a factual error about the most-recommended authentication
method in the course.

**Flags**
- `UNSOURCED` — *Adversary-in-the-middle (AiTM)* and *Infostealer* are
  defined by no source in the set. Both entries say so in their own text.
- `UNSOURCED` (boundary only) — *Credential stuffing* rests on ATT&CK
  T1110.004's technique boundary; no ATT&CK text is quoted because no file
  exists.

### sec-91 — `91-appendix-a.md` — role `appendix` — excluded

Full citations for the five sources, the supersession notes, the ATT&CK
technique table, a section-by-section index into 63B-4, and the 4.01
currency note. Nothing critical to a learning objective is here; every
objective is carried by `body` sections. All section pointers in the index
table were taken from citations actually made in the guide.

**Flags**
- The CISA-PHISH entry cites the CISA landing page rather than the
  `media.defense.gov` URL in `INDEX.md`, because the latter returns 403. See
  J1.

---

## 7.02.5 role check

| Role | Sections | Counted |
|---|---|---|
| `front_matter` | sec-00 | no |
| `body` | sec-01 … sec-11 | yes |
| `glossary` | sec-90 | no |
| `appendix` | sec-91 | no |

Nothing excluded has been smuggled into a `body` section. The course
introduction, the "How this course works" block and the audience statement
are all in `front_matter`. The glossary is a `glossary` section. The source
citations, the supersession history and the index into 800-63B-4 are in the
`appendix`, where 7.02.5 puts supplementary reference material — and they are
genuinely supplementary: the body sections cite their sources inline by
section number and do not depend on the appendix being read.

The counted total is 7,582 words against a budget of 6,615. No section was
padded to reach its budget; every section came in over it on source material
alone.

## Media check (7.02.7)

`meta.media` is absent. No clips exist yet. `current-feature.md` anticipates
`vid-01`, `vid-02`, `vid-04`, `vid-05` and `vid-06` landing in sections 02,
03, 06, 07 and 09, and the course's credit arithmetic assumes about thirty
minutes of them. When they are added, each must claim
`avIsAdditionalLearning: true`, and that claim has to be true: if a clip
narrates the guide text it does not belong in a text package. Nothing in this
feature makes that attestation, because there is nothing yet to attest.

## Questions

**Corrected. The paragraph this section used to carry was written before any
question existed and is no longer true; it is replaced rather than deleted,
and the correction is recorded in `CHANGELOG.md`.** It said
`src/questions-01.json` was `[]`, that questions were a later feature, and
that `npm run check` therefore reported six rule-1 ERRORs and eleven rule-4
WARNs.

`src/questions-01.json` now holds **twelve** questions:

- **Seven assessment questions.** Six (q-01 … q-06) shipped in the feature
  that also set `meta.status` to `"checked"` and produced the ingested
  package; they measure lo-1 … lo-6, one each, so every objective is
  measured. The seventh (q-12) was added by the review-question feature and
  is recorded in the addendum below.
- **Five review questions** (q-07 … q-11), placed by `after_section` on
  sec-01, sec-05, sec-06, sec-08 and sec-09. Also in the addendum below.

`npm run check` now reports **0 ERRORs** and **6 rule-4 coverage WARNs** —
one for each of the six body sections that carries no review question
(sec-02, sec-03, sec-04, sec-07, sec-10, sec-11). Those WARNs are expected
and are not defects: 5.01.2.1 constrains spacing across the program, not
per-section density, and a section the assessment covers instead is a
judgment call. They must not be silenced by adding review questions.

---

## Still needs judgment

**J1 — the `INDEX.md` citation for CISA-PHISH is dead.** The
`media.defense.gov` URL returns 403; the document is at
`cisa.gov/sites/default/files/2025-03/…`, linked from the CISA landing page.
The file in `sources/sec/` has been replaced with the real document, but
`INDEX.md` was deliberately not edited — it is your authority on standing.
Decide whether to update the URL there, and whether to record the retrieved
file's hash alongside it.

**J2 — the CISA `.txt` extractions `INDEX.md` promises do not exist,** and
this machine has no PDF text tooling. Both CISA PDFs were read via a
throwaway extraction script that is not committed. Decide whether the source
set should carry committed `.txt` extractions for the CISA documents the way
it does for NIST and WebAuthn, so that the next person to check a citation
can grep rather than re-derive.

**J3 — `src/course.ts` still carries three `TODO:` fields**:
`nasbaFieldOfStudy`, `prerequisites` and `advancePreparation`, plus the
course record's doc comment. `current-feature.md` states the field of study
is Information Technology and the knowledge level Basic, and
`00-front-matter.md` now says so in the participant-facing text. These were
outside this feature's task list and were left alone. They must be filled in
before export, and the front matter and the course record must agree.

**J4 — the guide contradicts a CISA recommendation in print.** Section 03
states that CISA-PHISH's SMB password advice (composition rules; prohibiting
recycling) is superseded by 63B-4 §3.1.1.2 items 5 and 6. That follows
`INDEX.md`'s precedence rule and is, as far as this record can tell, correct.
Confirm you are willing to publish a course that tells CPAs a CISA
recommendation is out of date, and that the paragraph is worded so it reads
as "newer guidance governs" rather than "CISA is wrong."

**J5 — the number-matching distinction in section 08 is subtle and easy to
break.** CISA's number matching (the user *types* a value) is a permitted
transfer under 63B-4 §3.1.3; what §3.1.3 disallows is compare-and-approve,
including choose-from-a-list. Confirm the section draws that line correctly.
An edit in either direction produces a false statement.

**J6 — WebAuthn §1 introduction was cited, where `INDEX.md` says §1.2 and
§1.3 only.** The origin-scoping sentence section 09 depends on is in the
introduction and nowhere else in the permitted range. Decide whether to widen
`INDEX.md`'s guidance to "§1 through §1.3, mechanism only" or to rework the
section to rest on §1.2's "phishing-resistant sign in using multi-device
credentials" and §1.3.3's origin-display step instead.

**J7 — two detection indicators are unsupported, and section 11 depends on
one of them.** Section 10 flags mail rules and the account's active-session
list as unsupported. Section 11's first response step tells the reader to
revoke active sessions, which presumes that surface exists. Either source
both, or accept that the most practically useful advice in the last two
sections rests on common knowledge rather than on this source set.

**J8 — the response ordering in section 11 is unsourced and lo-6 is assessed
on it.** "Revoke, then change, then re-enrol" is a synthesis: the mechanism
under it is sourced, the sequence is not. This is the largest single piece of
authorial judgment in the lesson. If you are confident in it, say so here and
it becomes the record. If you are not, the section needs either a source or a
softer framing — and feature 16's assessment question for lo-6 must not be
written until this is settled.

**J9 — no statistic, prevalence claim or percentage appears anywhere in the
guide.** This was checked deliberately against the `INDEX.md` instruction.
Confirm on your read that none crept in, since a single dated figure is what
would make the course read as stale at the two-year 4.01 review.

**J10 — the whole guide was drafted by a language model from the files in
`sources/sec/`.** That is what 4.01.1 is about, and it is why this document
exists. Every section above lists what it rests on; the flags mark where it
rests on nothing. Working through them is the check. Nothing in the tooling
sets `meta.status`, and it should stay `"draft"` until this list is closed.

**J11 — the six new questions (2026-09-09), and the objective tags on two of
them.** The addendum below records the source behind each one. Three things
need your eye rather than a nod:

(a) **Objective fit on q-07 and q-12.** Both are tagged `lo-1`, because this
document maps sec-01 → lo-1 and sec-03 → lo-1 and the feature's rule was to
take the objective from the section rather than re-decide it. But lo-1 reads
"identify the primary techniques attackers use to obtain user credentials,"
and neither question is about a technique: q-07 tests the App. D vocabulary
and q-12 tests the composition-rule prohibition. The tags are defensible at
section granularity and indefensible at question granularity. Decide whether
that is the right granularity, or whether lo-1's text should widen.

(b) **q-08's distractor (a) treats a numeric PIN as a password.** That is
63B-4 §3.1.1's own parenthesis and the question rests on it, but a
participant who thinks of a device unlock PIN — which §3.1.1 calls an
activation secret and puts in a different bucket — could read (a) as
arguably correct. Confirm the wording "a numeric PIN the subscriber chose
for the same account" closes that off.

(c) **q-11 rests on CISA's 2022 deployability judgment, not on a
requirement.** "The only widely available phishing-resistant authentication"
is a statement about the market in October 2022 and is the kind of claim
that goes stale. Confirm you are willing to grade a participant on it, or
reword the stem to ask what CISA says rather than what is true.

J1–J10 are unchanged.

## Sources still needed

Carried forward from `INDEX.md`'s "Not yet sourced," with what changed:

- **Infostealer behaviour (section 04)** — *still open.* No published
  technical analysis was added. The section is written at the level ATT&CK
  T1555 and T1539 support and states that limit in its own text. One flag
  remains on the browser-store mechanism claim.
- **Real-time proxy phishing is deployed, not theoretical (section 07)** —
  *substantially closed* by CISA-PHISH, which lists the credential-plus-code
  relay among techniques malicious actors use. Still open for automated
  proxy toolkits, which the guide does not claim.
- **Detection indicators (section 10)** — *partly closed.* 63B-4 §4.6
  (account notifications, explicitly there to help subscribers detect fraud),
  §4.3 and §5.3 (session monitoring characteristics), and CISA-PHISH's
  alerting, SSO audit-trail and baseline advice all apply. Still open for mail
  rules and for user-visible active-session lists.
- **Any prevalence or frequency statistic** — *not needed.* None was written.
  See J9.

---

## Addendum (2026-09-09) — the five review questions and the seventh assessment question

This lesson had six assessment questions and no review questions. At six
assessment questions superCPE computed the course at 1.0 credit, where
5.01.2.1 requires three review questions and 6.01.2 requires five assessment
questions — so the course was held by a `review_minimum` block. Twelve
questions carry the computation to 1.2 credit, where the minimums are three
review and seven assessment. Nothing else changed: no guide prose was
edited, no source was re-read for the body sections, no clip was added,
`meta.status` was not touched, and `revision` stays `"A"` on the author's
decision that the change is not significant under 4.01.

**The seventh assessment question was bought for credit, not for coverage.**
6.01.2's representative-number test is 75 percent of the learning
objectives; q-01 … q-06 already cover six of six. q-12 exists because ten
questions reach 1.2 credit and nine do not.

**The author chose to ship twelve, not the floor of ten** — two spare review
questions above the minimum. At 1.2 credit the band runs from ten questions
to fifteen, so the two spares mean the 4.01.1 pass can cut two questions
before the course falls back to 1.0. See the changelog entry.

**Sourcing rule applied.** Every question below rests on a claim quoted from
`sources/sec/`, and none rests on a claim carrying a bare `UNSOURCED` flag in
this document. **No new flag was created.** The three sections carrying bare
flags on the claims a question would have tested — sec-02, sec-04, sec-07,
sec-10 and sec-11 — were passed over for that reason, which is why the
review questions cluster where they do.

### Placement

Review questions sit on sec-01, sec-05, sec-06, sec-08 and sec-09. The three
the minimum requires are sec-01, sec-08 and sec-09 — one from each third of
the eleven body sections. The two spares are sec-05 and sec-06. No section
carries more than one question, so no single cut in the 4.01.1 pass can take
two questions with it.

### q-07 · review · after_section `sec-01` · lo-1

Which system is the verifier and which the relying party, in a single
sign-on plus document store arrangement. **Source:** `NIST-SP-800-63B-4.txt`
App. D, the glossary entries for *verifier* ("confirms the claimant's
identity by verifying the claimant's possession and control of one or more
authenticators") and *relying party* ("relies on a verifier's assertion of a
subscriber's identity, typically to process a transaction or grant access to
information or a system"), both of which sec-01 quotes in NIST's wording;
§5.2 for the pairing of an IdP that authenticates with an RP that does not.
**Objective:** lo-1, from this document's sec-01 mapping — see J11(a).
**Flag inherited:** none. sec-01's three flags are the opening
machine-versus-account claim, the "verifier never sees the person" framing,
and the accounting-practice analogy; the question rests on none of them.
Distractor (a) reverses the roles, (c) confuses being signed in with
checking authenticators, (d) makes the RP's defining property into a reason
it is not one.

### q-08 · review · after_section `sec-05` · lo-1, lo-4

Which arrangement satisfies NIST's definition of multi-factor
authentication. **Source:** App. D (*multi-factor authentication* — "more
than one distinct type of authentication factor"; *authentication factor* —
"the three types … are something you know, something you have, and something
you are"), both quoted in sec-05; §3.1.1 ("A password (sometimes referred to
as a passphrase or, if numeric, a personal identification number [PIN]) … A
password is 'something you know.'") for distractor (a); §3.1.3 ("An
out-of-band authenticator is 'something you have.'") for the correct answer;
§3.1.1.2 item 8 (no KBA or security questions) for distractor (c).
**Objective:** lo-1, lo-4, this document's sec-05 mapping. **Flag
inherited:** none — sec-05's two flags are the "test applied at one moment"
framing and the six-digit-code paraphrase. See J11(b).

### q-09 · review · after_section `sec-06` · lo-3

What bounds the useful life of a stolen session cookie. **Source:**
`NIST-SP-800-63B-4.txt` §5.2 — the two timeouts, "When either timeout
expires, the session SHALL be terminated," and "Session activity SHALL reset
the inactivity timeout," which together give the correct answer and the
reason the attacker's own activity is what makes the overall timeout the
operative one; §5.1 for logout invalidation, behind distractor (c).
**Objective:** lo-3. **Flag inherited:** none — sec-06's two flags are the
bearer-token gloss and the "no point in the flow" sentence. Distractor (d)
is q-03's misunderstanding restated as a session-lifetime claim, which is
deliberate: it is the same error seen from the other side.

### q-10 · review · after_section `sec-08` · lo-4

The test that separates the out-of-band arrangements §3.1.3 permits from the
one it no longer accepts. **Source:** `NIST-SP-800-63B-4.txt` §3.1.3 — the
two permitted transfer arrangements in both directions, the note that the
third method "compares the secrets received from the primary and secondary
channels and requests approval on the secondary channel" and "is no longer
considered acceptable because it increases the likelihood that the
subscriber would approve an authentication request without actually
comparing the secrets," the authentication-fatigue sentence, and the
limited-size-of-the-list line quoted in the feedback; App. E change log.
**Objective:** lo-4. **Flag inherited:** none — sec-08's four flags are the
two composed scenarios, the nagging-mechanism inference and the closing
aphorism, and the question rests on the NIST text directly. Distractor (a)
is the direction error J5 warns about: transfer is permitted **either** way.

### q-11 · review · after_section `sec-09` · lo-4

Which phishing-resistant implementation CISA identifies as realistic for a
small practice. **Source:**
`CISA-Implementing-Phishing-Resistant-MFA.pdf`, "Phishing-Resistant MFA
Implementations" — "The only widely available phishing-resistant
authentication is FIDO/WebAuthn authentication," and, on PKI-based MFA,
"successfully deploying PKI-based MFA requires highly mature identity
management practices. It is also not as widely supported by commonly used
services and infrastructure"; "Areas of Focus" for the prioritisation advice
behind distractor (d). Verified against the PDF, not against this
document's rendering of it. **Objective:** lo-4. **Flag inherited:** none —
sec-09's two flags are the lo-4 payoff sentence and the closing aphorism.
See J11(c).

### q-12 · assessment · no placement · lo-1

The standing of a checklist requirement that passwords mix character types.
**Source:** `NIST-SP-800-63B-4.txt` §3.1.1.1 ("Other composition
requirements for passwords SHALL NOT be imposed."); §3.1.1.2 item 5
("Verifiers and CSPs SHALL NOT impose other composition rules (e.g.,
requiring mixtures of different character types) for passwords."); item 1
(the 15-character single-factor / 8-character multi-factor split, which is
what distractor (d) misapplies); App. A.3 for the reasoning quoted in the
feedback — "a user who might have chosen 'password' … would be relatively
likely to choose 'Password1' … or 'Password1!' if a symbol is also
required." **Objective:** lo-1, from this document's sec-03 mapping — see
J11(a). **Flag inherited:** none. sec-03's three flags are all interpretive
and sit on the stuffing-blocklist connection, the untouched-practice claim
and the word *unique*; none is this question's ground. This question was
placed on lo-1 rather than lo-4 because lo-1's five sections hold the
largest pool of material carrying no bare flag (sec-01, sec-03, sec-05), and
because sec-03 carried no review question, so the assessment question spreads
the exposure instead of stacking a third question on sec-08 or sec-09. lo-4
in fact carries fewer bare flags overall — two, both in sec-07 — but its
clean sections are the ones the review questions already use.

### q-12's citation, checked against the source

The composition-rule prohibition was re-read in
`sources/sec/NIST-SP-800-63B-4.txt` to settle which paragraph q-12 rests on.
**It is stated twice, in two paragraphs, addressed to two things**, so a
citation naming only one of them is incomplete rather than wrong:

- **§3.1.1.1 Password Authenticators**, on what may be demanded of a password
  when the subscriber chooses one: *"Other composition requirements for
  passwords SHALL NOT be imposed. A rationale for this is presented in
  Appendix A, Strength of Passwords."*
- **§3.1.1.2 Password Verifiers, item 5**, on what a verifier may impose:
  *"Verifiers and CSPs SHALL NOT impose other composition rules (e.g.,
  requiring mixtures of different character types) for passwords."*

q-12's correct answer, choice (c) — "Prohibited — verifiers shall not impose
composition rules" — rests on **§3.1.1.2 item 5**, whose wording it carries.
§3.1.1.1 states the same prohibition in the CSP's voice and is what makes the
feedback's "states it twice" true, but it is not the sentence choice (c)
tracks. Distractor (d)'s single-factor/multi-factor split is **§3.1.1.2 item
1**, not a composition rule at all. So the answer and the prohibition are not
one paragraph: the prohibition is in both, the answer is in §3.1.1.2 item 5.

**§3.1.1.2 item 6 is not a composition rule** and never was one of q-12's
grounds: *"Verifiers and CSPs SHALL NOT require subscribers to change
passwords periodically. However, verifiers SHALL force a change if there is
evidence that the authenticator has been compromised."* Where this document
and CHANGELOG entry 15 pair "items 5 and 6" they are naming the **two**
points on which CISA-PHISH's SMB advice is superseded — composition rules
(item 5) and recycling, which implies scheduled change (item 6) — not two
citations for q-12. Read that way, no record disagrees with another.

### Stem uniqueness (course rule 2, and 6.01.2's prohibition)

All twelve stems were compared against each other by hand and then under
rule 2's normalization (lowercased, whitespace collapsed, trailing
punctuation stripped). All twelve are distinct, and distinct in substance,
not only after normalization. The two closest pairs, and why they are far
enough apart:

- **q-05 (assessment) and q-12 (assessment).** q-05's distractor (c) is
  scheduled password expiry and its feedback explains that §3.1.1.2 now
  prohibits it. q-12 tests the composition-rule prohibition in the same
  subsection. Different items of §3.1.1.2 (item 6 versus item 5), different
  facts, and in q-05 the password rule is only a distractor while the stem
  is about §4.6 notifications. A participant who answered q-05 has not been
  handed q-12.
- **q-03 (assessment) and q-09 (review).** Both concern a stolen session.
  q-03 asks why no second factor is requested — the mechanism. q-09 asks
  what bounds the session's life — §5.2's timeouts, which q-03 does not
  touch. q-09's distractor (d) restates q-03's misunderstanding, which
  reinforces rather than reveals: a participant who picks it has not learned
  q-03's answer from it.

### The file name now matches the package code — corrected

This file was `drafts/SEC-01-review.md` when the addendum above was written,
and the flag triage checklist was `drafts/SEC-01-flag-triage.md`. Both were
renamed with `git mv` to `drafts/ATO-01-review.md` and
`drafts/ATO-01-flag-triage.md`, so the accuracy record carries the code the
package ships under and `src/lesson-01.ts`'s doc comment resolves. History is
preserved; these files are 9.02.2(2)(ii) supporting documentation and are not
deleted and recreated.

`meta.courseCode` was not touched in either direction. It has been `"ATO-01"`
since before the rename, and the exported `dist/ATO-01.zip` is what production
holds.

The superseded paragraph, kept rather than dropped:

> **One thing this file's name no longer matches.** `src/lesson-01.ts`
> carries `courseCode: "ATO-01"` and its doc comment points at
> `drafts/ATO-01-review.md`. This file is still `drafts/SEC-01-review.md`,
> and so is the flag triage checklist. The rename was the author's and was
> outside this feature's scope, so nothing here was renamed. This is the
> accuracy record `src/lesson-01.ts` means.

One reference to the old name survives deliberately and is **not** a
loose end this document can close: `src/questions-01.json` q-07's `_source`
says "drafts/SEC-01-review.md records no UNSOURCED flag on sec-01's
definitions." That file is inside the exported package, so editing it changes
`content_hash` and re-ingests the course. It is left as it stands and recorded
as a known gap in the changelog instead.
