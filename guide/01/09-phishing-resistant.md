# Phishing-resistant authentication

Everything so far has been a variation on one theme: a secret that a person
hands over can be handed to the wrong recipient. This section is about
authentication that does not work that way, and about the single property
that makes the difference.

## The property

NIST's definition, in section 3.2.5 of SP 800-63B-4, is that phishing
resistance is the ability of the authentication protocol to prevent the
disclosure of authentication secrets and valid authenticator outputs to an
impostor verifier, without relying on the vigilance of the claimant.

Section 3.2.5 also states what it takes to achieve this: phishing resistance
requires single- or multi-factor **cryptographic** authentication. It cannot
be reached by a method whose output a person types, for the reason section 07
gave — manual entry does not bind the output to the session.

NIST recognises two ways of doing it.

**Channel binding** (section 3.2.5.1). The protocol establishes an
authenticated protected channel with the verifier, then irreversibly binds a
channel identifier from that channel into the authenticator output — for
instance by signing the two values together with a private key the claimant
controls. This prevents an impostor verifier, *even one holding a certificate
that represents the actual verifier*, from relaying that authentication on a
different channel. NIST's example is client-authenticated TLS; PIV and common
access cards work this way.

**Verifier name binding** (section 3.2.5.2). The authenticator output is
cryptographically bound to a verifier identifier that the protocol itself
authenticates. Where that identifier is a DNS name, it must be the verifier's
authenticated hostname or a parent domain at least one level below the public
suffix. NIST names WebAuthn — the standard used by authenticators implementing
FIDO2 — as an example, which achieves phishing resistance by choosing an
authenticator secret based on the authenticated domain name of the verifier.

Both satisfy the requirement. NIST considers channel binding the stronger of
the two, because it is not vulnerable to the misissuance or misappropriation
of verifier certificates.

## What the ceremony looks like

The W3C Web Authentication specification describes two ceremonies. In
**registration**, a public key credential is created on an authenticator and
scoped to a relying party, with the present user's account. In
**authentication**, the relying party is presented with an authentication
assertion proving the presence and consent of the user who registered that
credential.

The specification states the consequence directly in its introduction: once
created, the public key credential can only be accessed by origins belonging
to that relying party, and this scoping is enforced jointly by conforming user
agents and authenticators.

In the sample authentication flow, the authenticator shows the user the
credentials available along with information about the origin requesting
them, obtains a biometric or other authorisation gesture, and returns a
response. The server looks up the registered public key by credential
identifier and verifies the assertion signature.

Now put an attacker's site in the middle of that.

The proxy of section 07 can relay a password. It can relay a six-digit code.
It cannot relay this, because the credential the victim's authenticator would
need is scoped to the real relying party's origin, and the attacker's site is
not that origin. There is nothing for the user to get wrong. The check is not
"did the person notice the domain" — it is the protocol declining to produce
an output at all.

That is what "categorically different" means here, and it is the answer to
the fourth learning objective. The methods in sections 05 through 08 differ
from each other in how hard they are to attack. This one differs in whether
the attack is available.

## What is actually deployable

CISA identifies two approaches in its fact sheet, and is candid about their
availability.

**FIDO/WebAuthn** is, in CISA's words, the only widely available
phishing-resistant authentication. Support is built into major browsers,
operating systems and phones. Authenticators may be separate devices — a
security key connected by USB, NFC or Bluetooth — or built into a laptop or
phone.

**PKI-based MFA** is the less widely available form. CISA notes that it
provides strong security and suits large, complex organisations, but that
deploying it requires highly mature identity management practices and that it
is not as widely supported by commonly used services. Government PIV and CAC
cards are the familiar examples.

For a small firm, that hierarchy resolves quickly. CISA advises prioritising
phishing-resistant MFA for administrator and privileged accounts first, and
starting with the services that already support it — noting that most hosted
mail and single sign-on systems support FIDO, and that those are good
starting points because the data is valuable and the vendors are ready.
