# Detecting an account takeover

A firm with no security operations team is not going to detect an account
takeover by watching traffic. It will detect one by noticing something, or by
being told. This section is about which signals are actually available at
that scale — and it is deliberately shorter and more cautious than the
sections before it, because the authoritative sources say much less about
detection than they do about mechanism.

## The signal the standard builds in

The strongest indicator available to an individual subscriber is one that
exists specifically to be an indicator.

Section 4.6 of SP 800-63B-4 requires that certain subscriber account events —
NIST's examples are the binding of an authenticator and account recovery —
cause the subscriber, or someone they designate, to be independently
notified. NIST states the purpose outright: these notifications help the
subscriber detect possible fraud associated with their account. Providers
must support at least two notification addresses, and the notification must
carry clear instructions, including contact information, for a recipient who
repudiates the event it describes.

So an unexpected message saying a new authenticator was added, or that
account recovery was started, is not routine noise. It is the mechanism the
standard put there for exactly this moment, and it is addressed to you
because you are the person who can say "that was not me."

Section 4.3 is the matching obligation on the other side: an authenticator
whose activation factors are no longer in the subscriber's control counts as
compromised, and providers should offer a way to report loss, theft or
compromise using a backup or alternate authenticator.

## What the service is watching, and what it will show you

NIST's section 5.3 describes session monitoring — the ongoing evaluation of
session characteristics to detect possible fraud *during* a session. The
characteristics it lists as ones that may be evaluated are worth knowing,
because they are the vocabulary a provider's security page uses: usage
patterns, velocity and timing; device and browser characteristics;
geolocation; and characteristics of the IP address, such as whether it falls
in a block known for abuse.

Velocity and geolocation together are why a sign-in from another continent
minutes after one from your office is treated as suspicious. NIST also notes
that most of these characteristics carry privacy implications and must be
covered by a provider's privacy risk assessment — which is part of why what
you can see of them varies from provider to provider.

## What a small firm can do deliberately

The joint guidance from CISA, NSA, the FBI and MS-ISAC gives practical
measures that do not require a dedicated team:

- **Review MFA lockout and alert settings, and track denied or attempted MFA
  logins.** Repeated MFA prompts that nobody initiated are the push-bombing
  attack of section 08, visible in the logs while it is still failing.
- **Lock the account out when unusual activity or ongoing malicious login
  attempts are occurring**, to prevent actors from bypassing MFA.
- **Use single sign-on.** Beyond reducing the number of places a credential
  can be phished, CISA notes that SSO gives an audit trail to examine, either
  proactively or after a suspected or confirmed breach. For a small practice,
  one place to look is the difference between looking and not.
- **Monitor internal mail and messaging.** CISA calls this essential, because
  users may be phished from outside the network or without the security
  team's knowledge, and advises establishing a baseline of normal traffic and
  scrutinising deviations.

## Two indicators this course flags rather than asserts

Two things commonly cited as takeover indicators are not supported by any
source in this course's source set, and are stated here as things to check
rather than as findings:

- **Mail rules created without the user's knowledge** — a forwarding or
  auto-delete rule appearing in a mailbox the user did not configure.
- **A list of unfamiliar active sessions or devices** on the account's own
  security page, which not every provider exposes to the user.

Both are worth looking at. Neither is claimed here on authority, and the
accuracy record for this lesson flags both for verification.
