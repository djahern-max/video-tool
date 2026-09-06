# sources/sec — INDEX

Authority for SEC-01, "Account Takeover: How Credentials Are Stolen and How
to Stop It." Field of study: Information Technology. Knowledge level: Basic.

**Why this file states standing per entry.** Accounting lessons have the
Codification: one authoritative text, and a paragraph number either supports a
sentence or it does not. Security has no equivalent. NIST, CISA and W3C are
authoritative in different ways and over different things; vendor research and
breach reports are evidence you attribute, not authority you rest on. Every
entry below says which it is, because `drafts/SEC-01-review.md` has to
distinguish them sentence by sentence.

**Currency.** 4.01 requires courses that are not about codes, laws, rulings or
interpretations to be reviewed and revised as necessary at least every two
years. This is such a course. When that review comes, re-check every entry
below for supersession first — two of these documents had already been
superseded when the source set was assembled, and one of them was superseded
in its entirety.

---

## NIST-SP-800-63B-4.pdf / .txt

**AUTHORITATIVE.** Primary source for the course.

> NIST Special Publication 800-63B-4, *Digital Identity Guidelines:
> Authentication and Authenticator Management*, July 2025.
> https://doi.org/10.6028/NIST.SP.800-63B-4

Cite by section number.

Supersedes, in their entirety and as of 2025-08-01:

- SP 800-63B, *Digital Identity Guidelines: Authentication and Lifecycle
  Management* (June 2017, updated 2020-03-02) — **withdrawn**
- SP 800-63Bsup1, *Incorporating Syncable Authenticators Into NIST SP
  800-63B* (April 2024) — **withdrawn**

Two traps, both of which have already caught someone:

1. The title changed. Rev 4 is "Authentication and **Authenticator**
   Management," not "Lifecycle Management." Anything citing the old title is
   citing the withdrawn document.
2. Rev 4 changed the password guidance substantively — a minimum length
   requirement where a password is the sole authenticator, and a prohibition
   on arbitrary composition rules where the 2017 text merely advised against
   them. Any password sentence written from pre-2025 knowledge is wrong.
   Verify each one against this file, by section, before it goes in a body
   section.

Also note: because Bsup1 was folded in, the syncable-authenticator (passkey)
guidance is in this document. Do not go looking for the supplement.

Feeds body sections: 05 (what MFA does and does not stop), 07 (real-time
proxy phishing), 09 (phishing-resistant authentication). Also the password
material in 01 and 03.

## WebAuthn-L3.html / .txt

**AUTHORITATIVE for mechanism.** Not a requirements source.

> W3C Recommendation REC-webauthn-3-20260825, *Web Authentication: An API
> for accessing Public Key Credentials, Level 3*, 25 August 2026.
> https://www.w3.org/TR/2026/REC-webauthn-3-20260825/

The dated URL is the citation, not `/TR/webauthn-3/` — the dated one is frozen
and will still say this in two years.

Supersedes Level 2 (REC-webauthn-2-20210408, 8 April 2021), which superseded
Level 1 (REC-webauthn-1-20190304).

**Use §1.2 and §1.3 only.** Those describe registration and authentication and
how the ceremony binds a credential to an origin — which is the mechanism that
makes a passkey unphishable, and the one thing this document is needed for.
Section 5 onward is API surface: interfaces, dictionaries, internal methods.
None of it belongs in a Basic-level course for CPAs. If a draft sentence cites
a `PublicKeyCredential` member, the section has drifted out of scope.

Level 3 adds no phishing resistance over Level 2 — PRF key derivation, Related
Origin Requests, the Signal API, `getClientCapabilities()`, JSON helpers and
conditional create are what is new. None of it is course content. Do not
present Level 3's features as a security improvement.

Feeds body section 09, mechanism only. Requirement language comes from
800-63B-4.

## CISA-Implementing-Phishing-Resistant-MFA.pdf / .txt

**AUTHORITATIVE as agency guidance.** Secondary to 800-63B-4 on technical
requirements.

> Cybersecurity and Infrastructure Security Agency, *Implementing
> Phishing-Resistant MFA* (fact sheet), October 2022.
> https://www.cisa.gov/sites/default/files/publications/fact-sheet-implementing-phishing-resistant-mfa-508c.pdf

**Dated 2022 — three years before 800-63B-4.** Where the two differ on
authenticator requirements, 800-63B-4 is newer and more precise and governs.
Use CISA for the practical hierarchy (which methods are phishing-resistant,
what to do when you cannot deploy them yet) and for the framing that number
matching mitigates push fatigue without being phishing-resistant. Do not use
it to state a requirement 800-63B-4 states differently.

Feeds body sections 05, 08 (MFA fatigue), 09.

## CISA-Phishing-Guidance-Stopping-the-Attack-Cycle.pdf / .txt

**AUTHORITATIVE as joint agency guidance.**

> CISA, NSA, FBI and MS-ISAC, *Phishing Guidance: Stopping the Attack Cycle
> at Phase One*, October 2023.
> https://media.defense.gov/2023/Oct/18/2003322402/-1/-1/1/CSI-PHISHING-GUIDANCE.PDF

Carries a section addressed to small and medium organizations with limited
resources, which is this course's audience. Best available source for the
practical-controls material.

Feeds body sections 02 (phishing anatomy), 10 (detection), 11 (response).

## MITRE ATT&CK — referenced, not extracted

**AUTHORITATIVE as a taxonomy.** No file in this directory.

ATT&CK is a maintained web database, not a document. A saved snapshot is stale
the day it is taken, so nothing is extracted here; the technique IDs are the
citation and the pages at https://attack.mitre.org are permanent.

    T1110        Brute Force                            section 03
    T1110.004    Credential Stuffing                    section 03
    T1539        Steal Web Session Cookie               sections 04, 06
    T1555        Credentials from Password Stores       section 04

Cite as, e.g., "MITRE ATT&CK T1539, Steal Web Session Cookie." Use it for the
name and boundaries of a technique — not for statistics, prevalence, or claims
about what attackers commonly do.

---

## Not yet sourced

Claims the course will need that no file above supports. Each one is either
sourced before it reaches a body section, or the sentence is rewritten, or it
carries an `UNSOURCED` flag into `drafts/SEC-01-review.md` for the 4.01.1
accuracy check. Nothing ships on the third option silently.

- **Infostealer malware behaviour (body section 04)** — what is actually
  taken from a browser credential store, and in what form. T1555 names the
  technique but does not describe the artifact. Needs a published technical
  analysis; note whether the source found is vendor research (attribute, do
  not treat as authority).
- **Real-time proxy phishing toolkits (body section 07)** — that AiTM
  proxying of the full authentication ceremony is a deployed technique and
  not a theoretical one. CISA's 2022 fact sheet gestures at it; something
  more specific is needed to state it plainly.
- **Detection indicators (body section 10)** — impossible-travel signals,
  anomalous session reuse, and what a firm can actually observe without an
  enterprise SOC. No source yet.
- **Any prevalence or frequency statistic.** None is currently sourced and
  none should be written from memory. Prefer durable mechanism claims: a
  percentage dated to one year's breach report is what will make this course
  read as stale at the two-year 4.01 review.

## Not used, and why

- **SP 800-63-4, 800-63A-4, 800-63C-4** — the other three volumes of the
  suite: framework, enrollment and identity proofing, and federation and
  assertions. No learning objective in SEC-01 touches identity proofing or
  federated assertions. B-4 is the authenticator volume and is the one this
  course needs.
- **Vendor whitepapers and IAM product marketing** — surfaced heavily when
  searching for this material. Not authoritative, and not cited.
