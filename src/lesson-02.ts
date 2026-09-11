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
  status: "checked",

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
      "[[r]]Tuesday, four forty-one in the afternoon. A message lands in Ruth's " +
      "mailbox, and it is not a cold approach — it is a reply inside a thread " +
      "that has been running all week, about an engagement letter she is " +
      "genuinely waiting on. [[r]]The sending domain is not the client's. It is " +
      "one character away from the client's, and the attacker registered it " +
      "himself. That distinction decides what the firm's mail defences do next. " +
      "[[r]]The firm publishes DMARC and enforces it, so a forged sender would " +
      "have been quarantined before Ruth ever saw it. But nothing here was " +
      "forged. The attacker's own domain publishes its own records, and its own " +
      "records check out. The message is delivered clean.",
    reveals: [0.5, 19.4, 33.7],
    estimatedSeconds: 54,
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
      "near the front of a much longer hostname. The part of that hostname that " +
      "actually named a verifier sat at the far right, past the point where " +
      "Ruth stopped reading. It belonged to the attacker. Everything to the " +
      "left of it was decoration.",
    reveals: [0.5, 21.5],
    estimatedSeconds: 49,
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
      "it in. [[r]]The instant she presses enter, the same six digits go on to " +
      "her real provider. Ruth did not send them there. The attacker's machine " +
      "did — the machine that has been sitting between her and the provider " +
      "since the page loaded, passing every screen she saw through from the " +
      "real one, and every answer she gave straight on. [[r]]The provider " +
      "checks the code, and it is right: correct, unused, and inside its " +
      "window. By every test the provider applies, this is Ruth signing in, " +
      "eleven seconds after the code reached her phone.",
    reveals: [0.5, 6.9, 33.4],
    estimatedSeconds: 49,
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
      "every successful sign-in: it issues a session secret, and hands it to " +
      "whichever machine finished the sign-in. [[r]]That machine was the " +
      "attacker's. Ruth sees nothing unusual — no second prompt, no error, no " +
      "warning, not even a delay long enough to notice. From 4:43 and " +
      "thirty-five seconds, two people are using the same account, and only one " +
      "of them knows there are two. [[r]]And Ruth's mailbox opens normally. " +
      "That is the part worth sitting with. The visible outcome of a finished " +
      "takeover is a sign-in that worked.",
    reveals: [0.5, 12.9, 34.0],
    estimatedSeconds: 45,
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
          label: "What he reads",
          value: "Engagement letters, fee discussions, who pays by transfer",
        },
        {
          label: "To the provider",
          value: "An account in use",
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
      "him inside. [[r]]Every message he opens is activity on Ruth's account, " +
      "so to the provider it looks like exactly what it is: an account in use. " +
      "He reads the engagement letters, the fee discussions, and which clients " +
      "pay by bank transfer, and into which accounts. [[r]]Meanwhile every " +
      "ordinary safeguard in the building is pointed the wrong way. There is no " +
      "failed login to lock out, no denied prompt to raise an alert, and " +
      "nothing on Ruth's laptop for anti-virus to find, because nothing was " +
      "ever put on it.",
    reveals: [0.5, 12.4, 32.2],
    estimatedSeconds: 52,
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
      "[[r]]So what could this firm actually have seen? Two things happened " +
      "that were observable, and it is worth being exact about who was in a " +
      "position to observe each one. The provider's own record of Tuesday's " +
      "sign-in carried the address it came from, and it was a range this firm " +
      "has never once used. [[r]]It sat in a console nobody had open. [[r]]The " +
      "document store, for its part, produced nothing at all, and that is not a " +
      "hole in its logging. Nobody logged in to it. A session simply arrived, " +
      "carrying proof that a login had happened somewhere else.",
    reveals: [0.5, 25.1, 28.8],
    estimatedSeconds: 46,
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
        "Signals available: two. Signals read by a person: none",
      ],
    },
    narration:
      "[[r]]Friday morning a client telephones the firm about an instruction " +
      "they had received from Ruth. Ruth had sent nothing. That is what raised " +
      "the alarm — not a log, not an alert, not a console, but a phone call " +
      "from outside the firm, sixty-four hours after the fact. [[r]]Both " +
      "signals were real and both were available. Neither was read by a person, " +
      "because reading them was nobody's job on any particular morning. [[r]]At " +
      "this firm nobody was told, because nobody had arranged to be told. The " +
      "alerting on the mailbox was never switched on. Nobody read the firm's " +
      "own internal mail for anything out of place. And the trail the sign-on " +
      "service had been keeping all week was not opened by anyone until Dev " +
      "went looking for it on Friday morning, after the telephone call.",
    reveals: [0.5, 22.0, 33.1],
    estimatedSeconds: 62,
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
        "09:31 — Every session on the account ended",
        "09:36 — Password changed",
        "09:44 — An unknown sign-in method found and removed; the known ones re-enrolled",
        "Then — Access audited, incident reported",
        "Missed for eleven minutes: the document store's own session",
      ],
    },
    narration:
      "[[r]]Dev works the response, and he works it in an order that feels " +
      "backwards. At nine thirty-one he ends every session on Ruth's account, " +
      "before he touches anything else. [[r]]At nine thirty-six, he changes the " +
      "password. [[r]]At nine forty-four he opens the list of Ruth's sign-in " +
      "methods and finds one she has never seen, added on Thursday at ten " +
      "forty. He removes it, and re-enrols the ones she recognises. Then he " +
      "pulls the record of everything the account opened that week, and reports " +
      "the incident. [[r]]And one thing went wrong. Signing out at the sign-on " +
      "service did not close the document store, which stayed open for another " +
      "eleven minutes.",
    reveals: [0.5, 13.3, 16.5, 39.0],
    estimatedSeconds: 50,
  },

  {
    id: "block-13",
    sheet: "S-13",
    citation:
      "NIST SP 800-63B-4 §3.2.5, §3.2.5.2; W3C REC-webauthn-3-20260825 §1.3; " +
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
      "still does not read the far end of the hostname. [[r]]And the incident " +
      "ends at 4:43:20. Her authenticator is asked for an origin that is not " +
      "her provider's, and it produces nothing to relay. There is no 4:43:35, " +
      "and no session for the provider to issue. Thursday's second sign-in " +
      "method is never added. The client's telephone call on Friday is never " +
      "made. Every one of the twelve sheets before this one sits downstream of " +
      "one second on Tuesday afternoon, and that is the second where it stops.",
    reveals: [0.5, 22.3],
    estimatedSeconds: 58,
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
