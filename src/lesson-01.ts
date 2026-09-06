/**
 * Lesson 01 — "Account Takeover: How Credentials Are Stolen and How to Stop It"
 *
 * A text lesson: the content is markdown under guide/01/, not narrated
 * blocks. There is no Remotion composition, no audio, and no render for this
 * module unless it gains a supplemental clip. The sections below name the
 * files in reading order; export copies them into the package verbatim and
 * superCPE counts the body sections' words itself (7.02.5) — which is why
 * there is no wordCount field anywhere in this module.
 *
 * Every clip added to `media` must claim `avIsAdditionalLearning: true`:
 * if the video reads the guide aloud, it does not belong here (7.02.7).
 *
 * Review questions live in questions-01.json and are placed by
 * `after_section` (5.01.2.1), not `after_block`.
 *
 * SCAFFOLD — every field marked TODO is a human's to write, and
 * drafts/SEC-01-review.md is where the content developer records the
 * 4.01.1 accuracy check on this lesson's generated content.
 */

import { COURSE_SEC } from "./course";
import type { TextLessonMeta } from "./types";

export const meta = {
  kind: "text",
  lessonId: "01",
  // The manifest's lesson_id — the globally unique package code.
  courseCode: "SEC-01",
  title: "Account Takeover: How Credentials Are Stolen and How to Stop It",
  // "draft" until the content developer works through
  // drafts/SEC-01-review.md, closes its judgment list, and sets "checked"
  // by hand. That is the 4.01.1 check: technology was used in developing
  // this content, so the developer is responsible for reviewing it for
  // accuracy. Nothing in the tooling sets it. The 4.02 content review is
  // superCPE's, by a licensed CPA against the ingested package, and this
  // flag does not evidence it.
  status: "draft",

  sections: [
    { id: "sec-00", file: "00-front-matter.md", role: "front_matter", title: "How this course works" },
    { id: "sec-01", file: "01-why-credentials.md", role: "body", title: "Why credentials are the target" },
    { id: "sec-02", file: "02-phishing.md", role: "body", title: "Phishing: anatomy of a credential harvest" },
    { id: "sec-03", file: "03-credential-stuffing.md", role: "body", title: "Credential stuffing and password reuse" },
    { id: "sec-04", file: "04-infostealers.md", role: "body", title: "Infostealers and the browser credential store" },
    { id: "sec-05", file: "05-what-mfa-stops.md", role: "body", title: "What multi-factor authentication does and does not stop" },
    { id: "sec-06", file: "06-session-tokens.md", role: "body", title: "Session cookies and token theft" },
    { id: "sec-07", file: "07-proxy-phishing.md", role: "body", title: "Real-time proxy phishing" },
    { id: "sec-08", file: "08-mfa-fatigue.md", role: "body", title: "MFA fatigue and social engineering the second factor" },
    { id: "sec-09", file: "09-phishing-resistant.md", role: "body", title: "Phishing-resistant authentication" },
    { id: "sec-10", file: "10-detection.md", role: "body", title: "Detecting an account takeover" },
    { id: "sec-11", file: "11-response.md", role: "body", title: "Responding to a suspected takeover" },
    { id: "sec-90", file: "90-glossary.md", role: "glossary", title: "Glossary" },
    { id: "sec-91", file: "91-appendix-a.md", role: "appendix", title: "Appendix A — Reference material" },
  ],

  // 4.05.3 item 3: superCPE refuses to publish a course whose guide has no
  // glossary. `npm run check` warns until this is written.
  //
  // DRAFTED, NOT VERIFIED. Every definition below must be checked against
  // sources/sec/ before status moves to "checked" — 800-63B-4 defines most
  // of these terms itself, and where it does, its wording governs. Flag any
  // that survive unverified as UNSOURCED in drafts/SEC-01-review.md.
  glossaryTerms: [
    {
      term: "Authenticator",
      definition:
        "Something the claimant possesses and controls that is used to authenticate the claimant's identity.",
      sectionId: "sec-90",
    },
    {
      term: "Credential stuffing",
      definition:
        "An attack that replays username and password pairs obtained from one breach against unrelated services, succeeding wherever a user reused the pair.",
      sectionId: "sec-90",
    },
    {
      term: "Multi-factor authentication (MFA)",
      definition:
        "Authentication requiring two or more distinct factors — something you know, something you have, something you are.",
      sectionId: "sec-90",
    },
    {
      term: "Phishing-resistant authentication",
      definition:
        "Authentication in which the ceremony is bound cryptographically to the relying party's origin, so an assertion produced at an attacker's site cannot be replayed against the real one.",
      sectionId: "sec-90",
    },
    {
      term: "Session cookie",
      definition:
        "A token a service issues after successful authentication, presented on subsequent requests in place of re-authenticating.",
      sectionId: "sec-90",
    },
    {
      term: "Adversary-in-the-middle (AiTM)",
      definition:
        "An attack in which the attacker relays a victim's authentication to the real service in real time, capturing both the credential and the resulting session.",
      sectionId: "sec-90",
    },
    {
      term: "Infostealer",
      definition:
        "Malware whose purpose is to collect stored credentials, session tokens, and related data from an infected device.",
      sectionId: "sec-90",
    },
    {
      term: "Passkey",
      definition:
        "A public-key credential created and used through WebAuthn, where the private key never leaves the authenticator and never reaches the relying party.",
      sectionId: "sec-90",
    },
    {
      term: "Relying party",
      definition:
        "The service a user authenticates to, which relies on the authentication result to grant access.",
      sectionId: "sec-90",
    },
    {
      term: "Verifier impersonation resistance",
      definition:
        "The property of an authentication protocol that prevents an attacker posing as the verifier from obtaining anything usable against the real verifier.",
      sectionId: "sec-90",
    },
  ],

  learningObjectives: [
    {
      id: "lo-1",
      text: "Identify the primary techniques attackers use to obtain user credentials",
    },
    {
      id: "lo-2",
      text: "Distinguish a phishing login page from a legitimate one using observable indicators",
    },
    {
      id: "lo-3",
      text: "Explain how stolen session cookies allow an attacker to bypass multi-factor authentication",
    },
    {
      id: "lo-4",
      text: "Compare multi-factor authentication methods by their resistance to real-time proxy phishing",
    },
    {
      id: "lo-5",
      text: "Identify the indicators that suggest an account has been taken over",
    },
    {
      id: "lo-6",
      text: "Determine the response steps appropriate to a suspected account takeover",
    },
  ],
  nasbaFieldOfStudy: COURSE_SEC.nasbaFieldOfStudy,
  knowledgeLevel: COURSE_SEC.knowledgeLevel,
  prerequisites: COURSE_SEC.prerequisites,
  advancePreparation: COURSE_SEC.advancePreparation,
  // Full standing, supersession notes, and per-section mapping are in
  // sources/sec/INDEX.md. Cite by section number in the body text.
  sources: [
    {
      citation:
        "NIST SP 800-63B-4, Digital Identity Guidelines: Authentication and Authenticator Management (July 2025)",
      role: "primary",
    },
    {
      citation:
        "W3C Recommendation REC-webauthn-3-20260825, Web Authentication: An API for accessing Public Key Credentials, Level 3 (25 August 2026)",
      role: "primary",
    },
    {
      citation:
        "CISA, Implementing Phishing-Resistant MFA (fact sheet, October 2022)",
      role: "primary",
    },
    {
      citation:
        "CISA, NSA, FBI and MS-ISAC, Phishing Guidance: Stopping the Attack Cycle at Phase One (October 2023)",
      role: "primary",
    },
    {
      citation:
        "MITRE ATT&CK techniques T1110, T1110.004, T1539, T1555",
      role: "primary",
    },
  ],
  // This block becomes manifest.author — the author/developer of record
  // under 9.02.2(4). superCPE holds the content reviewer separately, in
  // subject_matter_experts; no reviewer's name belongs here.
  author: {
    name: "TODO: the author/developer of record",
    credentials: "TODO: credentials",
    licenseJurisdiction: "TODO: jurisdiction",
    licenseNumber: "TODO: license number",
  },
  deliveryMethod: COURSE_SEC.deliveryMethod,
  revision: "A",
  revisionDate: "2026-09-06",
} satisfies TextLessonMeta;