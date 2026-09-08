# Credential stuffing and password reuse

Credential stuffing does not break into anything. It is bookkeeping. An
attacker holds username and password pairs recovered from some earlier
breach, and tries them, automatically and at scale, against services that
were never breached themselves. MITRE ATT&CK catalogues it as technique
T1110.004, Credential Stuffing, a sub-technique of T1110, Brute Force. The
boundary of the technique is the point: the attacker is not guessing. The
attacker is replaying pairs that were correct somewhere, in the expectation
that a share of people used them in more than one place.

A practice can be compromised this way without any attacker ever having
touched it, without a single suspicious email arriving, and without anything
having gone wrong on any of its computers. The failure happened somewhere
else, and the reuse carried it home.

## What the current requirement actually says

This is the part of the course where working knowledge is most likely to be
out of date, so it is worth reading the requirement rather than paraphrasing
it. NIST SP 800-63B-4, published in July 2025, superseded SP 800-63B and its
syncable-authenticator supplement in their entirety, and it changed the
password guidance substantively.

**Length.** Section 3.1.1.2 requires verifiers to insist on a minimum of
15 characters for a password used as a single-factor authentication
mechanism. Passwords used only as part of a multi-factor process may be
allowed to be shorter, but a minimum of eight characters is still required.
Verifiers should permit a maximum length of at least 64 characters.

**Composition rules are prohibited.** Section 3.1.1.1 states that other
composition requirements for passwords shall not be imposed, and section
3.1.1.2 repeats it as a requirement on verifiers: they shall not impose
composition rules such as requiring mixtures of different character types.
Appendix A gives the reasoning. Users respond to composition rules in
predictable ways — someone who would have chosen "password" chooses
"Password1" when an uppercase letter and a digit are demanded, and
"Password1!" when a symbol is added — so the rule moves the password to a
place the attacker already looks.

**Scheduled expiry is prohibited.** Section 3.1.1.2 states that verifiers
shall not require subscribers to change passwords periodically. They shall
force a change if there is evidence the authenticator has been compromised.
Those two sentences sit together deliberately: the trigger for changing a
password is evidence, not the calendar.

**Blocklist screening is required.** When a password is established or
changed, the verifier shall compare the whole of it against a blocklist of
known commonly used, expected, or compromised passwords — a list that may
include passwords obtained from previous breach corpuses, dictionary words,
and context-specific words such as the name of the service or the username.
If the password is on the list, the subscriber must choose another and be
told why.

That last requirement is the direct answer to credential stuffing. The
attacker's advantage is a corpus of passwords that were real; blocklist
screening is the verifier consulting the same kind of corpus first.

**Password managers must be allowed.** Section 3.1.1.2 requires verifiers to
allow the use of password managers and autofill, and says they should permit
pasting into the password field. NIST notes that password managers have been
shown to increase the likelihood that subscribers choose stronger passwords,
particularly when they include a generator.

## A conflict worth knowing about

Guidance published before July 2025 is still in wide circulation, and some of
it recommends the opposite. The 2023 joint phishing guidance from CISA, NSA,
the FBI and MS-ISAC, in its recommendations for small and medium-sized
businesses, advises password policies requiring numbers, special characters
and case sensitivity, and prohibiting the recycling of previous passwords. On
authenticator requirements 800-63B-4 is the newer and more precise document
and governs. Where you meet older advice — in a checklist, a vendor default,
or a compliance template — check it against section 3.1.1.2 before adopting
it.

## What this section does not claim

Long, unique, screened passwords defeat stuffing and slow guessing. They do
nothing about the three attacks that follow. Section 3.1.1 says so in five
words: passwords are not phishing-resistant. Section 3.2.7 adds that they are
not replay-resistant either, because the same value is presented every time.
