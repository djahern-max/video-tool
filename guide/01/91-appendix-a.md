# Appendix A — Reference material

Supplementary reference material, excluded from the word count under 7.02.5.
Nothing here is required for any learning objective; the body sections carry
everything the objectives are assessed on. This appendix exists so that a
reader who wants to check a statement against its source can find it without
searching.

## Sources

**NIST Special Publication 800-63B-4, *Digital Identity Guidelines:
Authentication and Authenticator Management*.** National Institute of
Standards and Technology, July 2025.
<https://doi.org/10.6028/NIST.SP.800-63B-4>

The primary source for this course. It supersedes, in their entirety,
SP 800-63B, *Digital Identity Guidelines: Authentication and Lifecycle
Management* (June 2017, updated March 2020) and SP 800-63Bsup1,
*Incorporating Syncable Authenticators Into NIST SP 800-63B* (April 2024).
Both are withdrawn and neither should be cited. Note the changed title:
anything citing "Authentication and Lifecycle Management" is citing the
withdrawn document. Because the supplement was folded in, the guidance on
syncable authenticators — passkeys — is in this document, at Appendix B.

**W3C Recommendation REC-webauthn-3-20260825, *Web Authentication: An API for
accessing Public Key Credentials, Level 3*.** World Wide Web Consortium,
25 August 2026.
<https://www.w3.org/TR/2026/REC-webauthn-3-20260825/>

Used in this course for mechanism only — how the registration and
authentication ceremonies bind a credential to an origin — and only from its
introduction and §1.2 and §1.3. The remainder of the document specifies the
programming interface and is not course material. Level 3 supersedes Level 2
(April 2021), which superseded Level 1 (March 2019). Level 3 adds no phishing
resistance over Level 2.

**Cybersecurity and Infrastructure Security Agency, *Implementing
Phishing-Resistant MFA* (fact sheet).** October 2022.
<https://www.cisa.gov/sites/default/files/publications/fact-sheet-implementing-phishing-resistant-mfa-508c.pdf>

Agency guidance, used here for the practical hierarchy of MFA methods and for
the deployment advice in section 09. It predates SP 800-63B-4 by nearly three
years; where the two differ on authenticator requirements, 800-63B-4 governs.

**CISA, NSA, FBI and MS-ISAC, *Phishing Guidance: Stopping the Attack Cycle
at Phase One*.** October 2023.
<https://www.cisa.gov/resources-tools/resources/phishing-guidance-stopping-attack-cycle-phase-one>

Joint agency guidance. Its section addressed to small and medium-sized
organisations with limited resources is the closest thing in the source set
to guidance written for this course's audience. Also predates SP 800-63B-4;
the same precedence rule applies, and section 03 flags one place where the
two give opposite advice on password policy.

**MITRE ATT&CK.** <https://attack.mitre.org>

A maintained web database rather than a document, cited by technique
identifier. The techniques this course refers to:

| ID | Name | Section |
|---|---|---|
| T1110 | Brute Force | 03 |
| T1110.004 | Credential Stuffing | 03 |
| T1539 | Steal Web Session Cookie | 04, 06 |
| T1555 | Credentials from Password Stores | 04 |

ATT&CK is used here for the name and boundary of a technique — not for
statistics, prevalence, or claims about what attackers commonly do.

## Where to look in SP 800-63B-4

Pointers by section number, for readers who want the requirement itself
rather than this guide's summary of it.

| Section | Subject | Guide section |
|---|---|---|
| 3.1.1 | Passwords — including the statement that passwords are not phishing-resistant | 03 |
| 3.1.1.1 | Password authenticators; the prohibition on composition requirements | 03 |
| 3.1.1.2 | Password verifiers: minimum length, prohibited composition rules, prohibited periodic change, blocklist screening, password managers | 03, 11 |
| 3.1.3 | Out-of-band devices; the disallowed compare-and-approve method and authentication fatigue | 08 |
| 3.2.2 | Rate limiting (throttling) | 03 |
| 3.2.5 | Phishing resistance — the definition, and why manually entered outputs cannot achieve it | 05, 07, 09 |
| 3.2.5.1 | Channel binding | 09 |
| 3.2.5.2 | Verifier name binding; WebAuthn as the example | 09 |
| 3.2.7 | Replay resistance, and how it differs from phishing resistance | 03, 07 |
| 3.2.8 | Authentication intent | 04 |
| 3.2.13 | Exportability of authentication keys | 04, 09 |
| 4.3 | Loss, theft, damage and compromise of authenticators | 10, 11 |
| 4.5 | Invalidation, and why acting on suspicion is preferred | 11 |
| 4.6 | Account notifications, and their role in helping a subscriber detect fraud | 10 |
| 5 | Session management — why sessions exist | 06 |
| 5.1 | Session bindings; session secrets as bearer tokens | 04, 06 |
| 5.1.1 | Browser cookies | 06 |
| 5.2 | Reauthentication; independent session termination across providers | 06, 11 |
| 5.3 | Session monitoring, and the characteristics that may be evaluated | 10 |
| 6.1 | Authenticator threats | 04 |
| 6.2 | Threat mitigation strategies | 04 |
| 6.4 | Session attacks | 06 |
| Appendix A | Strength of passwords — the reasoning behind the length and composition rules | 03 |
| Appendix B | Syncable authenticators | 09 |
| Appendix D | Glossary | 01, 90 |
| Appendix E | Change log — what revision 4 changed | 03, 08 |

## A note on currency

Under 4.01, a course of this kind is reviewed and revised as necessary at
least every two years. When that review comes, the first thing to check is
whether any source above has been superseded. Two of the documents in this
set had already been superseded when it was assembled, one of them in its
entirety.
