# Real-time proxy phishing

The phishing page in section 02 collected a username, a password, and a
six-digit code, and the attacker used them. This section is about what
happens when the collecting and the using are the same event.

The attacker's site does not store what the victim types. It passes it
straight through to the real service, in real time, and passes the real
service's responses back. The victim is having a genuine conversation with
their bank or their mail provider — genuine in the sense that every prompt is
real and every answer reaches its destination — conducted entirely through
somebody else's hands. When the service issues a session at the end of it,
the attacker is holding it.

This is what the glossary calls an adversary-in-the-middle attack. NIST does
not use that name; earlier revisions of SP 800-63B described protocols
resistant to this class of attack as "strongly MitM-resistant," and the
current revision folds the whole class into the term *phishing*.

## Why the one-time code does not help

Section 3.2.7 of SP 800-63B-4 makes a distinction that is easy to lose and
that decides this section.

One-time-password authenticators **are** replay-resistant. NIST lists them as
examples: an authentication process resists replay if it is impractical to
succeed by recording and replaying a previous authentication message, and
protocols that use nonces or challenges to prove freshness achieve this,
because the verifier detects old messages. Passwords, by contrast, are not
replay-resistant, since the same value is presented every time.

So a captured code is useless tomorrow. That is a real property and it is
worth having.

It is also beside the point here, because the attacker is not using the code
tomorrow. They are using it now, inside the window in which it is valid,
while the victim is still looking at the loading spinner. Replay resistance
answers a question this attack never asks.

## The property that would help

Section 3.2.5 names the one that would. Phishing resistance is the ability of
the authentication protocol to prevent the disclosure of authentication
secrets and valid authenticator outputs to an impostor verifier — an attacker
fraudulently posing as the verifier — **without relying on the vigilance of
the claimant**. NIST adds that how the claimant was directed to the impostor
verifier is not relevant.

That clause about vigilance is the reason this is a design question and not a
training question. A defence that depends on the person noticing has already
conceded the case where they do not.

NIST then rules out an entire family of methods, and states the mechanism:

> Authenticators that involve the manual entry of an authenticator output
> (e.g., out-of-band and OTP authenticators) SHALL NOT be considered
> phishing-resistant because the manual entry does not bind the
> authenticator output to the specific session being authenticated. For
> example, an impostor verifier could relay an authenticator output to the
> verifier and successfully authenticate.

*The manual entry does not bind the output to the session.* A six-digit code
carries no information about which login it was meant for. Neither does a
password. Both are just values, and a value can be carried anywhere by
anyone.

## That this happens

The joint guidance from CISA, NSA, the FBI and MS-ISAC lists it among the
instances of weak MFA implementation that malicious actors exploit: an email
containing a link to a malicious website that mimics a company's legitimate
login portal, where the user submits their username, password and the
six-digit code, which the actors then receive in order to authenticate as the
user in the legitimate login portal. Four government agencies describing an
attack in a joint advisory is not a description of a laboratory result.

## What this settles

The fourth learning objective asks you to compare MFA methods by their
resistance to this attack, and this section is where that comparison becomes
possible.

"Do you have MFA enabled?" is not a question that distinguishes an account
this attack works against from one it does not. Both accounts have MFA. The
question that separates them is whether the method's output is bound to the
session it was produced for, or whether it is a value the person reads and
retypes. Section 09 is about the methods where it is bound.
