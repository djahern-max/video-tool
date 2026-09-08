# Session cookies and token theft

Authentication happens once. The session goes on.

NIST puts the reason plainly at the head of section 5 of SP 800-63B-4: once
an authentication event has occurred, it is often desirable to let the
subscriber keep using the application across subsequent interactions without
repeating that event. Nobody would use a service that demanded a password
and a security key on every click. So a session is started in response to
the authentication event and continues until it is terminated.

This section is about what that session actually is, because the third
learning objective — explaining how a stolen session lets an attacker bypass
multi-factor authentication — is answered entirely by the mechanism, and the
mechanism is not complicated once it is said out loud.

## What a session is made of

A session, in NIST's definition, is a persistent interaction between a
subscriber and a relying party that begins with an authentication event and
ends with a termination event, and it is bound by a session secret that the
subscriber's software presents to prove the session's association with that
authentication event.

Section 5.1 sets the requirement: the continuity of authenticated sessions
shall be based on possession of a session secret issued by the session host
at the time of authentication. Section 5.1.1 identifies the usual carrier —
browser cookies are the predominant mechanism by which a session is created
and tracked — and draws a distinction that is easy to skate past. Cookies are
*not* authenticators. They are short-term secrets, suitable for the duration
of a session.

NIST also names the property that makes theft matter: these session secrets
are used as **bearer tokens**. A bearer token authorises whoever bears it.
There is no further test of who that is.

MITRE ATT&CK catalogues the theft as technique T1539, Steal Web Session
Cookie: adversaries taking the cookies that mark a session as already
authenticated, in order to use those sessions.

## Why no second factor is requested

Put the two facts together.

The second factor is presented during the authentication event. The session
secret is issued *because* that event succeeded. An attacker who obtains the
session secret — from a browser store, as in the previous section, or by
relaying it, as in the next one — is not attempting to authenticate. They are
presenting proof that an authentication already happened.

There is no point in the flow at which the service has a reason to ask for a
second factor, because from the service's side nothing anomalous is
happening. A valid session secret arrived on a request. That is what a valid
session secret is for.

This is why "we have MFA" is not by itself an answer to a stolen session.
Multi-factor authentication is a control on the authentication event, and
the attack takes place after it.

## What limits the damage

Three things, none of them the second factor.

**Timeouts.** Section 5.2 requires periodic reauthentication to confirm the
subscriber's continued presence. Two timeouts run: an overall timeout
limiting the session's duration since authentication, and an inactivity
timeout. When either expires the session shall be terminated. A stolen
session secret is therefore not permanent — but it is good for its window,
and activity resets the inactivity clock, so an attacker who is *using* the
session keeps it alive.

**Invalidation.** Section 5.1 requires that session secrets be erased or
invalidated by the session subject when the subscriber logs out, and that
they time out and not be accepted afterwards.

**Binding the secret to the device.** Section 5.1 notes emerging
device-bound approaches that mitigate the risk of session-secret theft by
proving possession of the secret cryptographically rather than passing it as
a bearer token, and that may additionally hold it in a protected keystore to
reduce exfiltration by malware. This is the same argument as exportability in
the previous section, applied one layer further along.

## One warning for section 11

Sessions are not centrally cancelled. Section 5.2 observes that where an
identity provider and a relying party manage sessions separately, terminating
the subscriber's session at one does not terminate it at the other, and
sessions at multiple relying parties are established and terminated
independently of one another.

Signing out in one place does not sign you out everywhere. Remember that
when the guide reaches the response steps.
