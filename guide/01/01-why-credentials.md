# Why credentials are the target

An attacker who compromises a machine has a machine. An attacker who
compromises an account has whatever that account can reach and whatever it
can authorize — and can often keep that access after the machine has been
wiped and replaced. That difference sets the shape of this course. The
subject is not malware cleanup. It is the credential standing in front of
the account: how it is taken, and what makes one way of proving identity
harder to take than another.

## The words this course uses

Authentication has a precise vocabulary, and using it precisely is what
keeps the rest of this guide from turning into slogans. The definitions
below are those of NIST Special Publication 800-63B-4, *Digital Identity
Guidelines: Authentication and Authenticator Management*, which is the
authority this course rests on for authentication requirements.

A **subscriber** is an individual enrolled in an identity service. When
that person is in the act of signing in, they are a **claimant** — a
subject whose identity is to be verified using one or more authentication
protocols. An **authenticator** is something the subscriber possesses and
controls, such as a password or a cryptographic module, that is used to
authenticate a claimant's identity. The **verifier** is the entity that
confirms the claimant's identity by verifying their possession and control
of one or more authenticators. The **relying party** is the entity that
relies on the verifier's assertion of identity, typically to process a
transaction or grant access to information or a system. **Authentication**
itself is the process by which a claimant proves possession and control of
one or more authenticators bound to a subscriber account, thereby
demonstrating that they are the subscriber associated with that account.

Two things follow from those definitions and are worth noticing now. The
verifier never sees the person; it sees evidence. And the whole arrangement
assumes the claimant can tell a real verifier from a fake one — an
assumption that several of the attacks in this course exist to break.

## What the account is worth

CISA, in its guidance on implementing phishing-resistant multi-factor
authentication, frames the defender's first question as which resources
need protecting, and observes that attackers commonly target email systems,
file servers, and remote access systems in order to reach an organization's
data, along with identity servers that would let them create new accounts
or take over existing ones. Its second question is which users are
high-value targets: every organization has a small number of accounts
carrying additional access or privileges. CISA's own examples are attorneys
with e-discovery permissions to read staff email, and human resources staff
with access to personnel records.

An accounting practice is built the same way. The mailbox holds client
correspondence and the documents attached to it. The document store holds
returns, workpapers, and financial statements. The account itself carries
the practitioner's standing with clients, which is precisely what makes a
message sent from it persuasive. None of that requires the attacker to keep
a foothold on any particular computer.

## The four techniques

This course covers four routes to that account, in the order that builds
best:

- **Phishing**, in which the claimant is lured to a counterfeit verifier
  and enters credentials into it.
- **Credential stuffing**, in which pairs of usernames and passwords taken
  from one breach are replayed automatically against unrelated services.
- **Infostealers**, in which malware on the device takes what the browser
  has stored, including the secret that keeps a session alive.
- **Attacks on the second factor**, in which the additional authentication
  factor is relayed, socially engineered, or simply worn down.

Three of those four work against someone who already has multi-factor
authentication switched on.
Multi-factor authentication is worth having and CISA urges every
organization to deploy it. It is not, on its own, an answer to the question
this course asks, because the strength of the protection depends on which
method is deployed and on whether the attack is aimed at the credential or
at the session that follows it.
