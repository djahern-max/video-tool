# SEC-01 — Account Takeover: How Credentials Are Stolen and How to Stop It — accuracy record

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

None. `src/questions-01.json` is `[]` and questions are feature 16, which
depends on this prose existing. `npm run check` therefore reports six rule-1
ERRORs — one per objective with no assessment question — and eleven rule-4
WARNs, one per body section with no review question. Both are expected at
this point and are not defects in this feature.

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
