# Responding to a suspected takeover

The order is the lesson.

Most people's instinct on suspecting a compromised account is to change the
password. Doing that first is not wrong so much as insufficient, and section
06 explains why: the attacker's access does not rest on the password. It
rests on a session secret that was issued when an authentication succeeded,
and that session goes on until it is terminated or times out. A new password
governs the next authentication event. It does not, by itself, end a session
that is already running.

So the sequence below puts termination first.

## 1. Terminate the sessions

Sign out everywhere the account offers it, and revoke active sessions and
connected applications.

Remember section 06's warning about scope. NIST notes that where an identity
provider and a relying party manage sessions separately, terminating a
session at one does not terminate it at the other, and that sessions at
different relying parties are established and terminated independently. A
single "sign out" is not a global act. Work through the account's own
sign-out-everywhere control, and then through the individual services that
maintain their own sessions.

CISA, NSA, the FBI and MS-ISAC put the same objective first in their incident
response steps: re-provision suspected or confirmed compromised user
accounts, in order to prevent malicious actors from maintaining continued
access to the environment. *Continued access* is the thing being cut.

## 2. Change the password

Now the password, and now it is meaningful, because the attacker cannot ride
an existing session past it.

Section 3.1.1.2 of SP 800-63B-4 is the requirement behind this step: verifiers
shall force a password change where there is evidence that the authenticator
has been compromised. That is the same section that prohibits scheduled
expiry — evidence is the trigger, and this is the evidence.

Follow section 03's rules for the replacement: long, unique to this service,
not a variation on the old one.

## 3. Re-enrol the authenticators

Then deal with the second factors, because a compromised account may have
acquired one you did not add.

NIST's section 4.3 treats an authenticator as compromised when it has been
lost, stolen, duplicated, or has activation factors no longer in the
subscriber's control, and requires providers to suspend, invalidate or
destroy compromised authenticators promptly once compromise is detected.
Section 4.5 defines invalidation as removing the binding between an
authenticator and the account.

Section 4.5 also settles the question people hesitate over — whether to act
on a suspicion that might be wrong:

> The consequences of not invalidating a compromised authenticator are
> usually more significant than the denial-of-service potential of
> invalidating one in error.

Remove every authenticator you do not recognise. Re-enrol the ones you do.
This is the natural moment to move the account to a phishing-resistant
method, for the reasons section 09 gives.

## 4. Deal with the device, if malware is in question

If the compromise came from a malicious attachment or download rather than a
login page, the account work is not enough. The joint guidance's remaining
steps are about the machine: isolate the affected workstation after detecting
the attack, so executed malware does not spread further into the network;
have the malware analysed by specialists, which it notes may require
outsourcing to third-party consultants; eradicate the malware; and restore
systems to normal operation, confirming they function properly.

## 5. Audit, and report

Audit account access following a confirmed incident, to confirm the actor no
longer has access to the account that was hit.

Then report it. CISA urges organisations to report phishing incidents
promptly, and gives the channels: CISA itself, the FBI's Internet Crime
Complaint Center for phishing and spoofing, and MS-ISAC for state, local,
tribal and territorial entities. CISA also recommends having a documented
incident response plan in place, which is a thing to write before it is
needed rather than during.

## The one-line version

Revoke, then change, then re-enrol. A password change on its own leaves the
stolen session alive, and the stolen session is the access.
