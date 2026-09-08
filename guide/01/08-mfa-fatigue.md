# MFA fatigue and social engineering the second factor

The two attacks in the last two sections took the second factor without the
subscriber's cooperation. This one asks for it.

## Push bombing

CISA describes the technique in its fact sheet on implementing
phishing-resistant MFA: threat actors bombard a user with push notifications
until the user presses accept, which gives the actor access. The joint
guidance from CISA, NSA, the FBI and MS-ISAC describes the same thing among
its instances of weak MFA implementation — actors send a multitude of approve
or deny push requests until the user accepts one, often by accident or in
frustration.

Note what is being exploited. Not a protocol flaw. A person, at eleven at
night, with a phone that will not stop buzzing, who taps the thing that makes
it stop.

## Number matching, and exactly what it fixes

Number matching adds a step. Instead of a bare approve-or-deny prompt, the
user is required to enter numbers shown by the identity platform into the
authenticator application in order to approve the request.

CISA's hierarchy of MFA forms rates mobile push with number matching as
**resistant to push bombing** and **vulnerable to phishing attacks**. Both
halves are the point. CISA's recommendation follows from them: an
organisation using push-based MFA that cannot yet implement
phishing-resistant MFA should use number matching to mitigate MFA fatigue —
as an interim control, not as an answer.

An attacker cannot get a number-matching prompt approved by nagging, because
the user has nothing to nag *with*; there is a value to be entered, and the
attacker does not have it to give. But the moment the attacker is running the
proxy of section 07, they do have it, because the real service is showing it
to them. Number matching is a defence against volume. It is not a defence
against relay.

## Where NIST now goes further

Anyone applying the 2022 fact sheet should read section 3.1.3 of
SP 800-63B-4 alongside it, because the 2025 revision tightened this.

NIST permits two out-of-band arrangements: the claimant transfers a secret
received on the out-of-band device into the primary channel, or transfers a
secret shown on the primary channel to the out-of-band device. It then rules
out a third — comparing the secrets received on the two channels and
requesting approval on the secondary channel — stating that this is no longer
considered acceptable because it increases the likelihood that the subscriber
approves without actually comparing, as has been observed in authentication
fatigue attacks. NIST's change log records the change: section 3.1.3
disallows the comparison of secrets from primary and secondary channels.

NIST adds one more line that matters when you are looking at a real product:
presenting the claimant with a list of secrets to choose between is not
sufficient, because the list is short enough to guess.

So the test to apply is whether the user **enters** the value or merely
**picks or approves** it. A prompt that asks you to type the number
transfers a secret, and NIST allows it. A prompt that shows you three numbers
to tap does not, and NIST does not.

## Simply asking

The last variant needs no technology at all. The joint guidance records that
actors impersonate supervisors, trusted colleagues or IT personnel, and use
voice over IP to spoof caller identification — which, it notes, exploits
public trust in the security of phone services. A caller who sounds like the
help desk, referring to a real ticket, asking for the code that has just
arrived, is running the section 07 attack with a human being as the proxy.

CISA's fact sheet lists SIM swap in the same family: convincing a cellular
carrier's representative to transfer control of a user's phone number, after
which SMS and voice codes arrive at the attacker. That one does not require
deceiving the subscriber at all — only somebody at the carrier.

The common thread across all four sections is now visible. Every method whose
security ends in a person deciding correctly can be attacked by making the
person decide incorrectly. The next section is about the methods where there
is no such decision.
