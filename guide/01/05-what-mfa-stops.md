# What multi-factor authentication does and does not stop

NIST defines multi-factor authentication as an authentication system that
requires more than one distinct *type* of authentication factor for
successful authentication, and it defines the three types: something you
know, something you have, and something you are. MFA may be achieved with a
single multi-factor authenticator, or by combining single-factor
authenticators that supply different types.

CISA states the practical benefit in its fact sheet on implementing
phishing-resistant MFA: with MFA enabled, if one factor such as a password
becomes compromised, an unauthorized user will be unable to access the
account if they cannot also provide the second factor, and this additional
layer stops some common techniques such as password spraying. CISA has
consistently urged organizations to implement MFA for all users and all
services, including email, file sharing, and financial account access.

Take that as settled. Everything below is about a narrower question — not
whether to have MFA, but which kind, and against what.

## What it stops

MFA defeats an attacker who holds only the password.

That covers the whole of the previous section on credential stuffing, and it
is not a small thing. A stuffing run replays pairs from a breach corpus
against a service; where the service demands a second factor the attacker
does not have, the correct password buys nothing. The same is true of
offline cracking, of guessing, and of a password disclosed in any way that
does not also put the attacker in front of the second factor at the moment
it is used.

## What it does not stop

The qualifier in that last sentence is the whole of the rest of this course.

MFA is a test applied at one moment. It establishes that whoever completed
the ceremony had the factors. It does not follow that the person who
completed it was the subscriber, and it does not follow that everything done
afterwards is being done by them.

Two failures follow from that, and NIST names both.

**The ceremony can be obtained in real time.** Section 3.2.5 of SP 800-63B-4
is direct: authenticators that involve the manual entry of an authenticator
output — out-of-band authenticators and one-time-password authenticators —
shall not be considered phishing-resistant, because manual entry does not
bind the authenticator output to the specific session being authenticated.
NIST then gives the attack in one sentence: an impostor verifier could relay
an authenticator output to the verifier and successfully authenticate.
Section 3.1.3 states the same conclusion plainly for out-of-band
authentication, and section 3.1.1 for passwords. Neither is
phishing-resistant.

Read that carefully, because it is easy to mistake for a claim about weak
implementations. It is not. It is a property of any method whose output the
person reads off one device and types into another. A six-digit code is a
number. Nothing about it says which login it belongs to.

**The session outlives the ceremony.** NIST defines a session as beginning
with an authentication event and continuing until a termination event,
carried by a session secret the service issues at the time of
authentication. The point of a session is that the subscriber does not have
to repeat the authentication event. An attacker holding the session secret
inherits that same convenience.

## Where this goes

The next three sections work through the three routes those two failures
open, in the order that builds:

- **Section 06** takes the session secret — the attack that needs no
  ceremony at all, because the ceremony already happened.
- **Section 07** relays the ceremony as it happens, so the code is captured
  and used inside its validity window.
- **Section 08** persuades the person to complete the ceremony on the
  attacker's behalf, by wearing them down or by asking.

The conclusion those three sections reach is not that MFA is theatre. It is
that "MFA" names a category containing methods with genuinely different
properties, and that the difference is not a matter of degree. CISA puts it
as a hierarchy: any form of MFA is better than none and reduces attack
surface, and phishing-resistant MFA is the gold standard. Section 09
explains what makes the top of that hierarchy categorically different from
the rest of it.
