/**
 * Lesson 02 — "Anatomy of a Takeover: One Incident, Start to Finish"
 *
 * Content is data. No React, no JSX, no timing logic in this file.
 *
 * A video lesson in course ATO, at position 2, beside the ATO-01 study
 * guide. It exists to do what the guide cannot: run one composed incident
 * on a clock, so that the participant sees the mechanisms the guide
 * explains arriving in an order, with the gaps between them, and sees which
 * signals a firm of this size could actually have read. Under 7.02.7 that
 * is the test `meta.avIsAdditionalLearning` claims — the video must add
 * learning the guide does not already give, not merely cover the same
 * topic. drafts/ATO-02-review.md carries the per-block argument for that
 * claim, and it is Dane's to accept or reject.
 *
 * The incident is invented: no real firm, client, person, product or
 * brand appears in the narration or on any sheet. Every timestamp is
 * composed and is flagged `illustration` in the accuracy record. Nothing
 * here generalises from one incident to what attackers commonly do; where
 * the narration describes behaviour it says "this attacker".
 *
 * SCAFFOLD FIELDS ARE FILLED. drafts/ATO-02-review.md is where the content
 * developer records the 4.01.1 accuracy check on this lesson's generated
 * content. Unvoiced until audio-meta-02.json is populated.
 *
 * Duration resolution order: audio-meta-02.json first, estimatedSeconds
 * second. `estimatedSeconds` is Math.round(wordCount / 130 * 60). It exists
 * only so a silent render has a length; it is discarded the moment audio
 * exists and must never reach a credit calculation (7.02.7).
 *
 * Reveal markers: [[r]] sits in `narration`, immediately before the WORD it
 * reveals. generate-audio.ts strips the markers, reads their real timestamps
 * out of the ElevenLabs alignment stream, and writes them to
 * audio-meta-02.json. `reveals` is a preview estimate, discarded the moment
 * audio exists. The number of [[r]] markers in a block MUST equal the length
 * of that block's `reveals` array — verify with `npm run check` and
 * `npm run generate -- --lesson 02 --dry-run` before spending any API credit.
 */

import audioMeta from "./audio-meta-02.json";
import { audioHashOf } from "./audio-identity";
import type { Block, BlockMeta } from "./blocks";
import { COURSE_ATO } from "./course";
import type { PackageLessonMeta } from "./types";

export type { Block, Figure } from "./blocks";

export const meta = {
  lessonId: "02",
  // The manifest's lesson_id — the globally unique package code, not the
  // module selector above.
  courseCode: "ATO-02",
  courseTitle: COURSE_ATO.title,
  lessonTitle: "Anatomy of a Takeover: One Incident, Start to Finish",
  title: "Anatomy of a Takeover: One Incident, Start to Finish",
  subtitle: "One composed incident, from the lure to the response",
  eyebrow: "Lesson 02",
  // Display only. The manifest's position is read from COURSE_ATO.lessons
  // by export.ts; this is the string the title sheet renders.
  position: `Lesson 2 of ${COURSE_ATO.lessons.length}`,
  deliveryMethod: COURSE_ATO.deliveryMethod,
  fieldOfStudy: "Information Technology",
  revision: "A",
  revisionDate: "2026-09-10",
  // "draft" until the content developer works through
  // drafts/ATO-02-review.md, closes its judgment list, and sets "checked"
  // by hand. That is the 4.01.1 check: technology was used in developing
  // this content, so the developer is responsible for reviewing it for
  // accuracy. Nothing in the tooling sets it. The 4.02 content review is
  // superCPE's, by a licensed CPA against the ingested package, and this
  // flag does not evidence it.
  status: "draft",

  // Ids continue past ATO-01's highest (lo-6) and must not collide with it:
  // both lessons are attached to course ATO, and a question's objective_ids
  // are resolved against its own lesson's list.
  learningObjectives: [
    {
      id: "lo-7",
      text: "Trace a single account takeover incident from the lure to the attacker's use of the account, identifying the point after which the stolen password is no longer what the access rests on",
    },
    {
      id: "lo-8",
      text: "Determine what the response to a specific takeover must include beyond a password change, given how sessions and authenticators are bound to an account",
    },
  ],
  nasbaFieldOfStudy: COURSE_ATO.nasbaFieldOfStudy,
  knowledgeLevel: COURSE_ATO.knowledgeLevel,
  prerequisites: COURSE_ATO.prerequisites,
  advancePreparation: COURSE_ATO.advancePreparation,
  // One entry per sources/sec/ file this lesson actually cites. Full
  // standing and supersession notes are in sources/sec/INDEX.md; blocks
  // cite by section or printed page number. MITRE ATT&CK T1539 is cited on
  // block-05 and is listed here for the same reason ATO-01 lists it: the
  // technique ids are the citation, and no file is extracted for them.
  sources: [
    {
      citation:
        "NIST SP 800-63B-4, Digital Identity Guidelines: Authentication and Authenticator Management (July 2025)",
      role: "primary",
    },
    {
      citation:
        "CISA, NSA, FBI and MS-ISAC, Phishing Guidance: Stopping the Attack Cycle at Phase One (October 2023)",
      role: "primary",
    },
    {
      citation:
        "CISA, Implementing Phishing-Resistant MFA (fact sheet, October 2022)",
      role: "primary",
    },
    {
      citation:
        "W3C Recommendation REC-webauthn-3-20260825, Web Authentication: An API for accessing Public Key Credentials, Level 3 (25 August 2026)",
      role: "supporting",
    },
    {
      citation: "MITRE ATT&CK techniques T1539, T1555",
      role: "supporting",
    },
  ],
  // This block becomes manifest.author — the author/developer of record
  // under 9.02.2(4). superCPE holds the content reviewer separately, in
  // subject_matter_experts; no reviewer's name belongs here.
  //
  // TEST PACKAGE. The jurisdiction and licence fields carry an explicit
  // sentinel rather than a plausible-looking value, so that no manifest in
  // this repo's history can be mistaken for one naming a real licensee.
  // Both must be filled with real values before any course goes to the
  // Registry. Copied verbatim from src/lesson-01.ts, sentinels included.
  author: {
    name: "Dane Ahern",
    credentials: "Content developer",
    licenseJurisdiction: "N/A — test package",
    licenseNumber: "N/A — test package",
  },
  // Text a participant must read (7.02.5). 0 for an all-video lesson, and
  // it stays 0: this lesson ships video.mp4 and transcript.md, and the
  // transcript is the record of what was said, not reading matter.
  wordCount: 0,
  // True unless the audio merely reads the slides (7.02.7). The sheets here
  // carry the incident's facts — a timeline, an inventory, a comparison —
  // and the narration says what those facts mean; neither reads the other.
  // The stronger 7.02.7 test, because course ATO also holds a text lesson,
  // is whether this video adds learning guide/01/ does not already give.
  // The per-block case for that is in drafts/ATO-02-review.md, under
  // "What this block adds beyond the guide", and it is Dane's to accept.
  avIsAdditionalLearning: true,
} satisfies PackageLessonMeta;

export const blocks: Block[] = [
  {
    id: "title",
    sheet: "S-00",
    citation: "",
    slide: "Title",
    narration: "",
    reveals: [0.5, 1.5, 2.5],
    estimatedSeconds: 8,
  },

  {
    id: "block-01",
    sheet: "S-01",
    citation:
      "CISA, Implementing Phishing-Resistant MFA (Oct 2022), \"Areas of Focus\", " +
      "p. 4; NIST SP 800-63B-4 §5.1",
    slide: "Statement",
    figure: {
      kind: "statement",
      lines: [
        "Mailbox — client correspondence, and every file attached to it",
        "Document store — the returns and the workpapers, behind the same login",
        "The account itself — a message from it is a message the client acts on",
      ],
    },
    narration:
      "[[r]]Before anything happens, look at what one account in a four-partner " +
      "practice actually reaches. Ruth is a tax partner. Her mailbox holds the " +
      "client correspondence and the files attached to it. [[r]]The same login " +
      "opens the document store, where the returns and the workpapers live. " +
      "[[r]]And the account carries one thing no inventory lists: when a " +
      "message arrives from it, the client acts on it. That is the target, all " +
      "of it. Nothing in the ten minutes that follow involves breaking " +
      "anything, and at no point does the attacker need to hold on to Ruth's " +
      "laptop. Watch the inventory. The machine is not the story.",
    reveals: [0.5, 14.2, 20.6],
    estimatedSeconds: 48,
  },

  {
    id: "block-02",
    sheet: "S-02",
    citation:
      "CISA/NSA/FBI/MS-ISAC, Phishing Guidance (Oct 2023), pp. 4, 6",
    slide: "Facts",
    figure: {
      kind: "facts",
      rows: [
        {
          label: "Tue 16:41",
          value: "Reply inside a live engagement-letter thread",
        },
        {
          label: "Sender",
          value: "A domain registered by the attacker, not a spoof of the client's",
        },
        {
          label: "DMARC",
          value: "Pass — the attacker's own domain, the attacker's own records",
        },
      ],
    },
    narration:
      "[[r]]Tuesday, twenty to five. A message lands in Ruth's mailbox, and it " +
      "is not a cold approach — it is a reply inside a thread that has been " +
      "running all week, about an engagement letter she is genuinely waiting " +
      "on. [[r]]The sending domain is not the client's. It is one character " +
      "away from the client's, and the attacker registered it himself. That " +
      "distinction decides what the firm's mail defences do next. [[r]]The firm " +
      "publishes DMARC and enforces it, so a forged sender would have been " +
      "quarantined before Ruth ever saw it. But nothing here was forged. The " +
      "attacker's own domain publishes its own records, and its own records " +
      "check out. The message is delivered clean.",
    reveals: [0.5, 18.4, 32.7],
    estimatedSeconds: 53,
  },

  {
    id: "block-03",
    sheet: "S-03",
    citation:
      "NIST SP 800-63B-4 §3.2.5, §3.2.5.2",
    slide: "Compare",
    figure: {
      kind: "compare",
      columns: [
        {
          heading: "What Ruth checked",
          emphasis: "wrong",
          rows: [
            {
              label: "Layout and wordmark",
              value: "Correct",
            },
            {
              label: "Connection indicator",
              value: "Present",
            },
            {
              label: "Provider name",
              value: "Read first, near the front of the hostname",
            },
          ],
        },
        {
          heading: "What names the verifier",
          emphasis: "right",
          rows: [
            {
              label: "Authenticated hostname",
              value: "Or a parent domain one level below the public suffix",
            },
            {
              label: "Where it sits",
              value: "At the far right, past where she stopped",
            },
            {
              label: "Whose it was",
              value: "The attacker's",
            },
          ],
        },
      ],
    },
    narration:
      "[[r]]Two minutes later Ruth is looking at her mail provider's sign-in " +
      "page. It is the right page in every respect she can check quickly: the " +
      "layout, the wordmark, the connection indicator, and — the first thing " +
      "she looked at — her provider's name in the address bar. [[r]]Now look at " +
      "what her provider's name was doing in that address bar. It was a label " +
      "near the front of a much longer hostname. NIST identifies a verifier by " +
      "its authenticated hostname, or by a parent domain one level below the " +
      "public suffix, and that part sat at the far right, past the point where " +
      "Ruth stopped reading. It belonged to the attacker. Everything to the " +
      "left of it was decoration.",
    reveals: [0.5, 21.7],
    estimatedSeconds: 55,
  },

  {
    id: "block-04",
    sheet: "S-04",
    citation:
      "NIST SP 800-63B-4 §3.2.5, §3.2.7; CISA/NSA/FBI/MS-ISAC, Phishing " +
      "Guidance (Oct 2023), p. 4",
    slide: "List",
    figure: {
      kind: "list",
      items: [
        "16:43:09 — the page asks for the six-digit code",
        "16:43:14 — Ruth's phone shows one",
        "16:43:20 — she types it; the proxy forwards it, unchanged",
        "16:43:25 — the real provider accepts it, well inside its window",
      ],
    },
    narration:
      "[[r]]The page asks for the six-digit code. Her phone has one. She types " +
      "it in. [[r]]What she cannot see is that her keystrokes are not being " +
      "stored anywhere. They are being forwarded, right then, to the real " +
      "provider, by a machine sitting between the two. NIST states this as a " +
      "property of the method rather than a flaw in any product: a code typed " +
      "in by hand is tied to no particular sign-in. It is a number. It does not " +
      "know which login it was made for. [[r]]And yes, the code is single-use, " +
      "and that is a real protection — against somebody replaying it tomorrow. " +
      "This attacker used it eleven seconds after it reached her phone.",
    reveals: [0.5, 7.0, 40.5],
    estimatedSeconds: 54,
  },

  {
    id: "block-05",
    sheet: "S-05",
    citation:
      "NIST SP 800-63B-4 §5.1, §5.1.1; MITRE ATT&CK T1539",
    slide: "List",
    figure: {
      kind: "list",
      items: [
        "16:43:35 — a session secret is issued",
        "It goes to the machine that finished the sign-in",
        "That machine is the attacker's",
        "16:43:36 — Ruth's mailbox opens",
      ],
    },
    narration:
      "[[r]]The sign-in succeeds, and the provider does what it does after " +
      "every successful sign-in: it issues a session secret. That secret is " +
      "what keeps somebody signed in, and it goes to whichever machine " +
      "completed the ceremony. [[r]]That machine was the attacker's. From here " +
      "the account has an occupant who never has to authenticate again, because " +
      "authenticating is the part that is over. NIST calls a session secret a " +
      "bearer token, and the phrase is exact: the service asks what is being " +
      "presented, not who is presenting it. [[r]]And Ruth's mailbox opens " +
      "normally. That is the part worth sitting with. The visible outcome of a " +
      "finished takeover is a sign-in that worked.",
    reveals: [0.5, 16.5, 40.0],
    estimatedSeconds: 51,
  },

  {
    id: "block-06",
    sheet: "S-06",
    citation:
      "NIST SP 800-63B-4 §5.1; CISA, Implementing Phishing-Resistant MFA (Oct " +
      "2022), \"Overview\", p. 1",
    slide: "Facts",
    figure: {
      kind: "facts",
      rows: [
        {
          label: "Password",
          value: "Unchanged, and still known only to Ruth",
        },
        {
          label: "Multi-factor authentication",
          value: "On, and it ran correctly",
        },
        {
          label: "Attacker holds",
          value: "A session secret",
        },
        {
          label: "Ruth believes",
          value: "She signed in",
        },
      ],
    },
    narration:
      "[[r]]Freeze it at 4:44 and take the inventory again, because every line " +
      "of it is going to matter on Friday. Ruth's password is unchanged, " +
      "uncompromised in the ordinary sense, and still known only to her. " +
      "[[r]]Multi-factor authentication is switched on, and it did not fail. It " +
      "ran, correctly, and delivered exactly the assurance it is built to " +
      "deliver — that somebody holding both factors completed a sign-in. " +
      "Somebody did. [[r]]And the attacker is holding a session secret, which " +
      "is not a credential, not an authenticator, and not anything Ruth chose " +
      "or could be asked to remember. Every control this firm pays for is " +
      "working to specification. Not one of them has an opinion about a " +
      "session.",
    reveals: [0.5, 16.3, 32.1],
    estimatedSeconds: 54,
  },

  {
    id: "block-07",
    sheet: "S-07",
    citation:
      "NIST SP 800-63B-4 §5.2; CISA/NSA/FBI/MS-ISAC, Phishing Guidance (Oct " +
      "2023), p. 7",
    slide: "Facts",
    figure: {
      kind: "facts",
      rows: [
        {
          label: "Wed, all day",
          value: "Reading. Nothing sent, nothing deleted",
        },
        {
          label: "Inactivity timeout",
          value: "Reset by every page he opens",
        },
        {
          label: "Overall timeout",
          value: "The only clock still running against him",
        },
        {
          label: "Failed logins to alert on",
          value: "None. There were never any",
        },
      ],
    },
    narration:
      "[[r]]For the next two days this attacker sends nothing and deletes " +
      "nothing. He reads. That is a decision, and it is the decision that keeps " +
      "him inside. [[r]]NIST's session rules run two clocks, an overall one and " +
      "an inactivity one, and activity resets the inactivity clock. Somebody " +
      "quietly paging through a mailbox is generating activity. The timeout " +
      "built to close an abandoned session never gets its chance. " +
      "[[r]]Meanwhile every ordinary safeguard in the building is pointed the " +
      "wrong way. There is no failed login to lock out, no denied prompt to " +
      "raise an alert, and nothing on Ruth's laptop for anti-virus to find, " +
      "because nothing was ever put on it.",
    reveals: [0.5, 12.5, 31.1],
    estimatedSeconds: 51,
  },

  {
    id: "block-08",
    sheet: "S-08",
    citation:
      "CISA, Implementing Phishing-Resistant MFA (Oct 2022), p. 4; NIST SP " +
      "800-63B-4 §4.6",
    slide: "Facts",
    figure: {
      kind: "facts",
      rows: [
        {
          label: "Thu 10:12",
          value: "Through the sign-on service into the document store",
        },
        {
          label: "Thu 10:40",
          value: "A second sign-in method added to Ruth's account",
        },
        {
          label: "What that is",
          value: "An authenticator bound to her account and held by him",
        },
        {
          label: "What it outlives",
          value: "A revoked session, and a changed password",
        },
      ],
    },
    narration:
      "[[r]]Thursday morning he stops reading and starts moving. The mailbox " +
      "was never the destination — the sign-on service standing in front of it " +
      "opens the document store too, and the document store is where the " +
      "returns and the workpapers are. [[r]]Then he does the thing that makes " +
      "this expensive. He adds a sign-in method of his own to Ruth's account: a " +
      "second authenticator, bound to her account and held by him. [[r]]Notice " +
      "what that buys him. A session can be revoked and a password can be " +
      "changed. An authenticator bound to the account is a way back in that " +
      "outlives both, and it is still there next week unless a person goes and " +
      "removes it.",
    reveals: [0.5, 18.4, 32.7],
    estimatedSeconds: 53,
  },

  {
    id: "block-09",
    sheet: "S-09",
    citation:
      "NIST SP 800-63B-4 §5.3; CISA/NSA/FBI/MS-ISAC, Phishing Guidance (Oct " +
      "2023), pp. 6-7",
    slide: "Facts",
    figure: {
      kind: "facts",
      rows: [
        {
          label: "Sign-in from an unused range",
          value: "In the provider's console — which nobody had open",
        },
        {
          label: "New sign-in method added",
          value: "Notified, correctly — see the next sheet",
        },
        {
          label: "Document store",
          value: "Silent. Nobody logged in; a session arrived",
        },
      ],
    },
    narration:
      "[[r]]So what could this firm actually have seen? Three things happened " +
      "that were observable, and it is worth being exact about who was in a " +
      "position to observe each one. The provider had been evaluating the " +
      "session all along — NIST lists what those checks weigh, among them " +
      "geolocation, timing, and the reputation of the address — and Tuesday's " +
      "sign-in arrived from a range this firm has never once used. [[r]]It sat " +
      "in a console nobody had open. [[r]]The document store, for its part, " +
      "produced nothing at all, and that is not a hole in its logging. Nobody " +
      "logged in to it. A session simply arrived, carrying proof that a login " +
      "had happened somewhere else.",
    reveals: [0.5, 32.3, 35.9],
    estimatedSeconds: 53,
  },

  {
    id: "block-10",
    sheet: "S-10",
    citation:
      "NIST SP 800-63B-4 §4.6",
    slide: "Compare",
    figure: {
      kind: "compare",
      columns: [
        {
          heading: "What §4.6 requires",
          emphasis: "right",
          rows: [
            {
              label: "Notify on",
              value: "The binding of an authenticator, so fraud can be detected",
            },
            {
              label: "Addresses",
              value: "Two at minimum, per subscriber account",
            },
            {
              label: "Recipient",
              value: "The subscriber, or someone they designate",
            },
          ],
        },
        {
          heading: "What this account had",
          emphasis: "wrong",
          rows: [
            {
              label: "Notify on",
              value: "Sent within the minute, exactly as required",
            },
            {
              label: "Addresses",
              value: "One — the mailbox",
            },
            {
              label: "Recipient",
              value: "Whoever was reading the mailbox",
            },
          ],
        },
      ],
    },
    narration:
      "[[r]]The second signal is the one the standard put there deliberately. " +
      "Binding a new authenticator is an event a provider is required to notify " +
      "about, and NIST says outright why: so that the subscriber can detect " +
      "fraud on their own account. The notification went out, correctly, within " +
      "the minute. [[r]]It went to the mailbox the attacker was sitting in. " +
      "Read that same paragraph again and there is a clause most people skim " +
      "past — a provider has to carry two notification addresses at minimum, " +
      "and the notice may go to somebody the subscriber designates instead. " +
      "This incident is what that clause is for. One address, on the account " +
      "under attack, is a warning delivered to the wrong reader.",
    reveals: [0.5, 22.4],
    estimatedSeconds: 54,
  },

  {
    id: "block-11",
    sheet: "S-11",
    citation:
      "CISA/NSA/FBI/MS-ISAC, Phishing Guidance (Oct 2023), pp. 6-7",
    slide: "Statement",
    figure: {
      kind: "statement",
      lines: [
        "Fri 09:20 — a client telephones about a message Ruth did not send",
        "Elapsed since 16:43 Tuesday: sixty-four hours",
        "Signals available: three. Signals read by a person: none",
      ],
    },
    narration:
      "[[r]]Friday morning a client telephones the firm about an instruction " +
      "they had received from Ruth. Ruth had sent nothing. That is what raised " +
      "the alarm — not a log, not an alert, not a console, but a phone call " +
      "from outside the firm, sixty-four hours after the fact. [[r]]All three " +
      "signals were real and all three were available. Not one of them was read " +
      "by a person, because reading them was nobody's job on any particular " +
      "morning. [[r]]That is the ordinary case in a practice this size, and it " +
      "is why CISA's advice to small organisations is mostly about arranging to " +
      "be told: turn the alerting on, watch the internal mail, and keep a trail " +
      "somebody can go back through.",
    reveals: [0.5, 22.0, 35.3],
    estimatedSeconds: 55,
  },

  {
    id: "block-12",
    sheet: "S-12",
    citation:
      "CISA/NSA/FBI/MS-ISAC, Phishing Guidance (Oct 2023), p. 11; NIST SP " +
      "800-63B-4 §3.1.1.2, §4.3, §4.5, §5.2",
    slide: "List",
    figure: {
      kind: "list",
      items: [
        "1 — Terminate the sessions, at every service that keeps its own",
        "2 — Change the password; there is now evidence, which is the trigger",
        "3 — Invalidate the authenticator he bound, and re-enrol the ones she knows",
        "4 — Audit what the account reached, then report it",
        "Missed for eleven minutes: the document store's own session",
      ],
    },
    narration:
      "[[r]]Dev works the response, and the order is not the instinctive one. " +
      "Terminate first. A password governs the next sign-in and does nothing " +
      "whatever to a session already running, and a session already running is " +
      "the entire access. [[r]]Then the password, and only now is it the right " +
      "move: NIST forbids changing passwords on a schedule but requires a " +
      "change on evidence of compromise, and this week is evidence. [[r]]Then " +
      "the authenticator he bound, which nothing earlier in the sequence " +
      "touches. NIST is unusually blunt about hesitating here — removing one in " +
      "error costs less than leaving a compromised one in place. [[r]]And one " +
      "thing went wrong. Signing out at the sign-on service did not close the " +
      "document store, which ran on for another eleven minutes.",
    reveals: [0.5, 17.5, 31.8, 47.0],
    estimatedSeconds: 58,
  },

  {
    id: "block-13",
    sheet: "S-13",
    citation:
      "NIST SP 800-63B-4 §3.2.5, §3.2.5.2; W3C REC-webauthn-3-20260825 §1; " +
      "CISA, Implementing Phishing-Resistant MFA (Oct 2022), p. 3",
    slide: "Compare",
    figure: {
      kind: "compare",
      columns: [
        {
          heading: "Tuesday 16:43:20, as it ran",
          emphasis: "wrong",
          rows: [
            {
              label: "The code",
              value: "Typed, forwarded, accepted",
            },
            {
              label: "16:43:35",
              value: "Session issued to the attacker",
            },
            {
              label: "After that",
              value: "64 hours, two services, one authenticator he owns",
            },
          ],
        },
        {
          heading: "Tuesday 16:43:20, with a passkey",
          emphasis: "right",
          rows: [
            {
              label: "The origin asked for",
              value: "Not her provider's",
            },
            {
              label: "16:43:20",
              value: "No output is produced. It ends here",
            },
            {
              label: "After that",
              value: "Nothing. There is no rest of the story",
            },
          ],
        },
      ],
    },
    narration:
      "[[r]]Now run that same Tuesday again and change exactly one thing: the " +
      "second factor on the account is a passkey. Ruth still gets the message. " +
      "She still clicks it. She still lands on the attacker's page, and she " +
      "still does not read the far end of the hostname. [[r]]And it ends at " +
      "4:43:20, because her authenticator is asked to sign for an origin that " +
      "is not her provider's, and the credential it holds can only be reached " +
      "by her provider's origin. There is no output to relay. Nothing at all " +
      "depends on Ruth noticing anything, which is the test NIST actually sets, " +
      "and it is the only line in this story that was ever going to hold.",
    reveals: [0.5, 22.2],
    estimatedSeconds: 54,
  },
];

const audio = audioMeta as Record<string, BlockMeta>;

/** The transcript of record: markers stripped, nothing else changed. */
export const transcriptOf = (b: Block): string =>
  b.narration.replace(/\s*\[\[r\]\]\s*/g, " ").replace(/\s+/g, " ").trim();

/** What gets sent to ElevenLabs. Markers intact; the script strips them. */
export const speechOf = (b: Block): string => b.speech ?? b.narration;

/**
 * The metadata for this block, or undefined if there is none that describes it.
 *
 * A block id is not an identity. Ids get reused: renumbering a lesson under
 * revision leaves `block-03` naming entirely different narration, and a lookup
 * by id alone happily returns the old measured duration and the old measured
 * reveal seconds for it. The stored `hash` is the identity — it is over the
 * exact text that was spoken — so an entry whose hash does not match this
 * block's current narration is treated as no entry at all, and the block falls
 * back to its estimates until it is regenerated.
 */
const audioFor = (b: Block): BlockMeta | undefined => {
  const entry = audio[b.id];
  return entry && entry.hash === audioHashOf(speechOf(b)) ? entry : undefined;
};

export const hasAudio = (b: Block): boolean => audioFor(b) !== undefined;

export const durationOf = (b: Block): number =>
  audioFor(b)?.durationSeconds ?? b.estimatedSeconds;

/** Measured reveals when we have them, hand-written estimates when we do not. */
export const revealsOf = (b: Block): number[] =>
  audioFor(b)?.reveals ?? b.reveals;

/**
 * Blocks with empty narration have no audio by design — the title sheet is the
 * only one. Counting it here would make this permanently true and the warning
 * in Root.tsx permanently useless.
 */
export const usingEstimates = blocks.some(
  (b) => b.narration.trim().length > 0 && !hasAudio(b)
);

export const totalSeconds = blocks.reduce((sum, b) => sum + durationOf(b), 0);
