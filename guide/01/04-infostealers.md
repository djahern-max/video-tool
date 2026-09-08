# Infostealers and the browser credential store

The first two attacks in this course reach the credential without touching
the victim's computer. This one starts there.

An infostealer is malware whose purpose is collection rather than damage.
The joint phishing guidance from CISA, NSA, the FBI and MS-ISAC lists
information stealing among the outcomes of the malware that phishing
delivers, alongside initial access, disruption, and privilege escalation —
which places this technique at the end of the same lure described two
sections ago. The delivery is familiar. What it delivers is not a
ransom note but a copy of things.

## What it collects

MITRE ATT&CK gives the two relevant techniques their names and boundaries.
T1555, Credentials from Password Stores, covers adversaries obtaining
credentials from the places where credentials are kept — which, for most
people most of the time, means the password store built into the browser.
T1539, Steal Web Session Cookie, covers the theft of the cookies that mark
a web session as already authenticated.

Those are two different kinds of loss and it is worth being careful about
the difference. Both are catalogued as distinct techniques because they are
distinct: one takes what you would type, and the other takes the thing the
service issued you *because* you typed it.

A note on the limits of this section. ATT&CK names these techniques and
draws their boundaries; it does not describe the artifacts themselves — the
file formats, the storage mechanisms, or how a particular family of malware
reads them. This guide therefore stops where the taxonomy stops, and does
not describe what is taken beyond "the stored credential" and "the session
cookie." That is a deliberate limit, not an omission.

## Why storage is the weakness

NIST's threat discussion in section 6.1 of SP 800-63B-4 sets out the general
shape. Something you know may be disclosed to an attacker who installs
malicious software on the endpoint to capture the secret. Something you have
may be cloned: an attacker who gains access to the owner's computer may copy
a software authenticator. Section 6.2 lists the mitigations for endpoint
compromise, and both are about where secrets live — use hardware
authenticators that require physical action by the claimant, and maintain
software-based keys in storage with restricted access.

Section 3.2.13 makes the underlying property explicit. NIST calls it
exportability. Authentication keys are considered exportable unless the
authenticator generates, stores and uses them in a protected hardware
environment that prevents software from reading them — a security
coprocessor or a dedicated device. The stated intent is to prevent software
on the endpoint from copying or leaking the authentication secret.

That is the whole argument in one sentence. A password in a browser store is
software-readable by design; it has to be, because the browser has to fill
it in. A key held in hardware that refuses to export it is not. Malware
running with the user's privileges can read the first and cannot read the
second.

## The hinge

Now the part the rest of this course turns on.

The session cookie is not a credential the user chose, so none of the advice
in the previous section touches it. NIST defines a session as a persistent
interaction that begins with an authentication event and ends with a
termination event, bound by a session secret that the browser presents to
prove the session's association with that authentication event. The secret is
issued by the service at the moment authentication succeeds.

An attacker who copies that secret is holding proof that an authentication
already happened. They do not need the password, because the password's job
is finished. They do not need the second factor, because the second factor's
job is finished too.

The next two sections are about what that means: first for multi-factor
authentication in general, then for the session in particular.
