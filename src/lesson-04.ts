/**
 * Lesson 04 — "Setting up for professional use"
 *
 * A text lesson: the content is markdown under guide/04/, not narrated
 * blocks. There is no Remotion composition, no audio, and no render for this
 * module unless it gains a supplemental clip. The sections below name the
 * files in reading order; export copies them into the package verbatim and
 * superCPE counts the body sections' words itself (7.02.5) — which is why
 * there is no wordCount field anywhere in this module.
 *
 * Every clip added to `media` must claim `avIsAdditionalLearning: true`:
 * if the video reads the guide aloud, it does not belong here (7.02.7).
 *
 * Review questions live in questions-04.json and are placed by
 * `after_section` (5.01.2.1), not `after_block`.
 *
 * drafts/GPT-02-review.md is where the content developer records the
 * 4.01.1 accuracy check on this lesson's generated content.
 */

import { COURSE_GPT } from "./course";
import type { TextLessonMeta } from "./types";

export const meta = {
  kind: "text",
  lessonId: "04",
  // The manifest's lesson_id — the globally unique package code.
  courseCode: "GPT-02",
  title: "Setting up for professional use",
  // "draft" until the content developer works through
  // drafts/GPT-02-review.md, closes its judgment list, and sets "checked"
  // by hand. That is the 4.01.1 check: technology was used in developing
  // this content, so the developer is responsible for reviewing it for
  // accuracy. Nothing in the tooling sets it. The 4.02 content review is
  // superCPE's, by a licensed CPA against the ingested package, and this
  // flag does not evidence it.
  status: "draft",

  sections: [
    { id: "front-matter", file: "00-front-matter.md", role: "front_matter", title: "How this course works" },
    { id: "sec-01", file: "01-two-kinds-of-service.md", role: "body", title: "Two kinds of service" },
    { id: "sec-02", file: "02-turning-training-off.md", role: "body", title: "Turning training off on an individual plan" },
    { id: "sec-03", file: "03-what-the-setting-does.md", role: "body", title: "What the setting does and does not do" },
    { id: "sec-04", file: "04-the-business-default.md", role: "body", title: "The business default and its one exception" },
    { id: "sec-05", file: "05-who-can-see-conversations.md", role: "body", title: "Who can see a workspace's conversations" },
    { id: "sec-06", file: "06-retention-addendum-audit.md", role: "body", title: "Retention, the addendum, and the audit" },
    { id: "glossary", file: "90-glossary.md", role: "glossary", title: "Glossary" },
  ],

  // 4.05.3 item 3: superCPE refuses to publish a course whose guide has no
  // glossary. `npm run check` warns until this is written.
  //
  // Each definition traces to the OpenAI documents listed in `sources`
  // below, or says that it cannot; see drafts/GPT-02-review.md. "SOC 2
  // Type 2" draws its one descriptive line from the print-layout capture
  // of the enterprise privacy page (index 11#6), listed as supporting for
  // that reason. The switch label "Improve the model for everyone" is as
  // the Data Controls FAQ prints it (GPT-02 review, J1).
  glossaryTerms: [
    {
      term: "Business data",
      definition:
        "OpenAI's term, on its enterprise privacy page, for inputs and outputs from ChatGPT Business, ChatGPT Enterprise, ChatGPT for Healthcare, ChatGPT Edu, ChatGPT for Teachers, and its API Platform. The page's commitments, including the training default, attach to it. (OpenAI, \"Enterprise privacy at OpenAI.\")",
      sectionId: "glossary",
    },
    {
      term: "Data Controls",
      definition:
        "The settings in ChatGPT that OpenAI's help center says let you decide how ChatGPT uses your conversations and interactions, and specifically whether your conversations help improve OpenAI's models. (OpenAI Help Center, \"Data Controls FAQ.\")",
      sectionId: "glossary",
    },
    {
      term: "Data Processing Addendum (DPA)",
      definition:
        "An addendum OpenAI says it is able to execute with customers for their use of ChatGPT Business, ChatGPT Enterprise, and the API. (OpenAI, \"Enterprise privacy at OpenAI.\")",
      sectionId: "glossary",
    },
    {
      term: "Enterprise Compliance API",
      definition:
        "The route through which, on ChatGPT Enterprise, workspace admins can access an audit log of conversations and GPTs. (OpenAI, \"Enterprise privacy at OpenAI.\")",
      sectionId: "glossary",
    },
    {
      term: "\"Improve the model for everyone\"",
      definition:
        "The label on the training switch under Settings → Data Controls on an individual ChatGPT plan. Turning it off stops your conversations from being used to train ChatGPT; they still appear in your chat history. (OpenAI Help Center, \"Data Controls FAQ.\")",
      sectionId: "glossary",
    },
    {
      term: "Privacy portal",
      definition:
        "The second place OpenAI provides for opting out of training on an individual plan, by selecting \"Do not train on my content\"; either it or the switch in ChatGPT is sufficient on its own. (OpenAI Help Center, \"Data Controls FAQ\"; \"How your data is used to improve model performance.\")",
      sectionId: "glossary",
    },
    {
      term: "SOC 2 Type 2",
      definition:
        "An audit that OpenAI's enterprise privacy page says ChatGPT Business and ChatGPT Enterprise have each successfully completed. The same page describes its SOC 2 audit as confirming that its controls align with industry standards for security and confidentiality. (OpenAI, \"Enterprise privacy at OpenAI\", both captures.)",
      sectionId: "glossary",
    },
    {
      term: "Temporary Chat",
      definition:
        "A chat that OpenAI says will not appear in history, will not use or create memories, and will not be used to train its models; it is deleted from OpenAI's systems after 30 days and may be reviewed only to monitor for abuse. (OpenAI Help Center, \"How your data is used to improve model performance\"; \"Data Controls FAQ.\")",
      sectionId: "glossary",
    },
    {
      term: "Training (on conversations)",
      definition:
        "OpenAI's word for the use of conversations to improve its models: its help center says ChatGPT improves by further training on the conversations people have with it, unless you opt out. What training does with a conversation technically is not described on either help-center page. (OpenAI Help Center, \"How your data is used to improve model performance.\")",
      sectionId: "glossary",
    },
    {
      term: "Workspace admin",
      definition:
        "The role that OpenAI's enterprise privacy page gives control over a ChatGPT Business or ChatGPT Enterprise workspace: on Business, able to view, access, export, and delete end user conversations; on Enterprise, able to access an audit log of conversations and GPTs; on both, in control of how long data is retained. The page uses the term without defining it. (OpenAI, \"Enterprise privacy at OpenAI.\")",
      sectionId: "glossary",
    },
  ],

  learningObjectives: [
    {
      id: "lo-1",
      text:
        "Distinguish the training defaults: individual plans train on conversations unless the user opts out; Business and Enterprise do not train by default, with explicit opt-in as the only exception.",
    },
    {
      id: "lo-2",
      text:
        "Locate and set the training control on an individual plan, and state what it does and does not do: account-wide, prospective, does not clear history, and feedback can override it.",
    },
    {
      id: "lo-3",
      text:
        "Describe the controls a Business or Enterprise workspace adds: admin access to conversations, retention settings, a Data Processing Addendum, and SOC 2 Type 2.",
    },
  ],
  nasbaFieldOfStudy: COURSE_GPT.nasbaFieldOfStudy,
  knowledgeLevel: COURSE_GPT.knowledgeLevel,
  prerequisites: COURSE_GPT.prerequisites,
  advancePreparation: COURSE_GPT.advancePreparation,
  // The files in sources/gpt/ that drafts/GPT-source-index.md shows
  // contributing at least one entry to this lesson's objectives, plus the
  // print-layout capture of the enterprise privacy page, which the
  // glossary's "SOC 2 Type 2" entry is defined from (11#6, supporting);
  // the entry numbers behind each objective are in drafts/GPT-02-review.md.
  sources: [
    {
      citation:
        "OpenAI Help Center, \"Data Controls FAQ\" (retrieved 2026-09-13; sources/gpt/openai-data-controls-faq-2026-09-13.pdf)",
      role: "primary",
    },
    {
      citation:
        "OpenAI, \"Enterprise privacy at OpenAI\", openai.com/enterprise-privacy, Reader-view capture (retrieved 2026-09-13; sources/gpt/openai-enterprise-privacy-2026-09-13.pdf)",
      role: "primary",
    },
    {
      citation:
        "OpenAI Help Center, \"How your data is used to improve model performance\" (retrieved 2026-09-13; sources/gpt/openai-how-your-data-is-used-2026-09-13.pdf)",
      role: "primary",
    },
    {
      citation:
        "OpenAI, \"Enterprise privacy at OpenAI\", openai.com/enterprise-privacy, print-layout capture, \"Updated: January 8, 2026\" (retrieved 2026-09-13; sources/gpt/openai-enterprise-privacy-print-2026-09-13.pdf)",
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
  // Registry.
  author: {
    name: "Dane Ahern",
    credentials: "Content developer",
    licenseJurisdiction: "N/A — test package",
    licenseNumber: "N/A — test package",
  },
  deliveryMethod: COURSE_GPT.deliveryMethod,
  revision: "1",
  revisionDate: "2026-09-13",
} satisfies TextLessonMeta;
