# Glossary

Reference material. Nothing here is required reading, and none of it counts
toward the course's word count (7.02.5).

Where NIST Special Publication 800-63B-4 defines a term, its wording governs
and the citation is given. Two entries — adversary-in-the-middle and
infostealer — are in common use but are defined by none of this course's
authoritative sources; both say so.

---

**Adversary-in-the-middle (AiTM)**
The common name for an attack in which the attacker relays a victim's
authentication to the real service in real time, capturing both the
credential and the resulting session. SP 800-63B-4 does not use this term. It
treats the attack as phishing, and describes the mechanism as an impostor
verifier relaying an authenticator output to the verifier in order to
authenticate successfully (§3.2.5). *Discussed in section 07.*

**Authenticator**
Something that the subscriber possesses and controls (e.g., a cryptographic
module or password) and that is used to authenticate a claimant's identity.
(SP 800-63B-4, Appendix D.) *Section 01.*

**Credential stuffing**
An attack that replays username and password pairs obtained from one breach
against unrelated services, succeeding wherever a user reused the pair.
Catalogued as MITRE ATT&CK T1110.004, a sub-technique of T1110, Brute Force.
*Section 03.*

**Infostealer**
Malware whose purpose is to collect stored credentials, session cookies and
related data from an infected device. The term is not defined by any source
this course relies on; the underlying techniques are catalogued as MITRE
ATT&CK T1555, Credentials from Password Stores, and T1539, Steal Web Session
Cookie. *Section 04.*

**Multi-factor authentication (MFA)**
An authentication system that requires more than one distinct type of
authentication factor for successful authentication. MFA can be performed
using a multi-factor authenticator or by combining single-factor
authenticators that provide different types of factors. The three factor
types are something you know, something you have, and something you are.
(SP 800-63B-4, Appendix D.) *Section 05.*

**Passkey**
A public key credential created and used through WebAuthn, scoped so that it
can only be accessed by origins belonging to the relying party it was
registered with. WebAuthn distinguishes multi-device credentials (commonly
called synced passkeys) from single-device credentials (device-bound
passkeys). Note that SP 800-63B-4 treats the authentication keys of syncable
authenticators as inherently exportable (§3.2.13, Appendix B) — a synced
passkey's private key does leave the device it was created on, by design.
*Section 09.*

**Phishing-resistant authentication**
Authentication whose protocol prevents the disclosure of authentication
secrets and valid authenticator outputs to an impostor verifier, without
relying on the vigilance of the claimant. It requires cryptographic
authentication, and is achieved either by channel binding or by verifier name
binding. (SP 800-63B-4, §3.2.5 and Appendix D.) *Section 09.*

**Relying party**
An entity that relies on a verifier's assertion of a subscriber's identity,
typically to process a transaction or grant access to information or a
system. (SP 800-63B-4, Appendix D.) *Section 01.*

**Session cookie**
The browser cookie that carries the session secret binding a subscriber's
software to a service after an authentication event, so that subsequent
requests need not repeat it. Cookies are not authenticators; they are
short-term secrets suitable for the duration of a session. (SP 800-63B-4,
§5.1 and §5.1.1.) *Section 06.*

**Verifier impersonation resistance**
The name used in revisions of SP 800-63B before revision 4 for what is now
called phishing resistance; the glossary of SP 800-63B-4 redirects "verifier
impersonation" to "phishing." Older revisions also described such protocols
as "strongly MitM-resistant." (SP 800-63B-4, §3.2.5 and Appendix D.)
*Section 07.*

---

## Other terms used in this guide

These are supporting vocabulary rather than course terms, given here so the
body sections can use them precisely. All are from SP 800-63B-4, Appendix D.

**Authentication** — The process by which a claimant proves possession and
control of one or more authenticators bound to a subscriber account to
demonstrate that they are the subscriber associated with that account.

**Authentication factor** — The three types of authentication factors are
something you know, something you have, and something you are. Every
authenticator has one or more authentication factors.

**Claimant** — A subject whose identity is to be verified using one or more
authentication protocols.

**Phishing** — An attack in which the subscriber is lured (usually through an
email) to interact with a counterfeit verifier/RP and tricked into revealing
information that can be used to masquerade as that subscriber to the real
verifier/RP.

**Session** — A persistent interaction between a subscriber and an endpoint,
either an RP or a CSP. A session begins with an authentication event and ends
with a session termination event. A session is bound by the use of a session
secret that the subscriber's software can present to the RP to prove
association of the session with the authentication event.

**Session hijack attack** — An attack in which the attacker is able to insert
themselves between a claimant and a verifier after a successful
authentication exchange between the latter two parties.

**Subscriber** — An individual enrolled in the credential service provider's
identity service.

**Syncable authenticators** — Software or hardware cryptographic
authenticators that allow authentication keys to be cloned and exported to
other storage to sync those keys to other authenticators (i.e., devices).

**Verifier** — An entity that confirms the claimant's identity by verifying
the claimant's possession and control of one or more authenticators using an
authentication protocol.
