# Phishing: anatomy of a credential harvest

NIST defines phishing as an attack in which the subscriber is lured, usually
through email, into interacting with a counterfeit verifier or relying party
and tricked into revealing information that can be used to masquerade as
that subscriber to the real one. CISA, NSA, the FBI and MS-ISAC put it in
operational terms: malicious actors pose as trustworthy sources — colleagues,
acquaintances, organizations — to lure victims into providing their login
credentials, which are then used to reach enterprise networks or protected
resources such as email accounts.

This section follows one such attack through its four steps and asks, at
each step, the question the second learning objective turns on: what can the
person being phished actually observe?

## Step one: the lure

The joint guidance lists the techniques most often used to obtain
credentials. Attackers impersonate supervisors, trusted colleagues, or IT
personnel in targeted emails. They send text messages, or chats in platforms
such as Slack, Teams, Signal, WhatsApp or Facebook Messenger. They use voice
over IP to spoof caller identification, which the guidance describes as
taking advantage of public trust in the security of phone services,
especially landlines.

Two observations in that guidance matter for a small practice. First,
organizations working in hybrid arrangements have fewer face-to-face
interactions and more frequent virtual exchanges, and users in those
environments are more likely to be deceived by social engineering tailored to
the platforms they use daily. Second, on messaging platforms it can be
difficult for a user to detect a malicious link at all, because the
constrained interface does not show them much of it.

**Observable at this step:** tone, timing, and the plausibility of the
request — all of them judgment calls, and all of them things a competent
attacker is deliberately managing. The sender address can be inspected, but
an organization's mail system, not its users, is where spoofed senders are
supposed to be caught. That is what DMARC, together with SPF and DKIM, is
for: they verify the sending server of a received message against published
rules, and mail that fails the check is treated as spoofed.

## Step two: the landing page

The lure delivers the victim to a site the attacker controls that mimics a
legitimate login portal. Nothing about the visual design of that page is
evidence of anything. A logo is a copied image. Layout is copied markup.

NIST is explicit that the route matters no more than the appearance: in
defining phishing resistance it notes that how the claimant is directed to
the impostor verifier is not relevant — an email lure and a poisoned search
result are the same attack.

**Observable at this step:** the origin. In phishing-resistant
authentication, the identity of the verifier is its authenticated hostname,
or a parent domain at least one level below the public suffix; that is the
fact the protocol itself binds to, and it is the fact a person can read in
the address bar. Note the limit on the transport indicator: NIST prefers
channel binding to verifier name binding precisely because channel binding is
not vulnerable to the misissuance or misappropriation of verifier
certificates, and observes that an impostor verifier may hold a certificate
representing the real one. A connection indicator tells you the connection is
protected. It does not tell you who is on the other end of it.

## Step three: the capture

The victim types a username and a password into the attacker's page. If the
account is protected by a one-time code, the page asks for that too. The
joint guidance describes exactly this: the user submits their username,
password, and the six-digit code, which the actors then receive.

**Observable at this step:** very little. A well-built harvest page forwards
the victim to the genuine service afterwards, so the visible outcome is an
ordinary, if slightly odd, sign-in.

## Step four: the use

The credentials are then used against the real service. The guidance is
plain that a one-time code captured this way is used by the actor to
authenticate as the user in the legitimate login portal.

That is the sentence to carry into the next sections. Phishing does not
break the second factor. It borrows it, in the moment, from the person who
holds it — and everything about the attack is designed so that person cannot
tell the difference.
