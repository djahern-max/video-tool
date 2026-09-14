/**
 * Lesson 06 — "Verifying the output"
 *
 * A text lesson: the content is markdown under guide/06/, not narrated
 * blocks. There is no Remotion composition, no audio, and no render for this
 * module unless it gains a supplemental clip. The sections below name the
 * files in reading order; export copies them into the package verbatim and
 * superCPE counts the body sections' words itself (7.02.5) — which is why
 * there is no wordCount field anywhere in this module.
 *
 * Every clip added to `media` must claim `avIsAdditionalLearning: true`:
 * if the video reads the guide aloud, it does not belong here (7.02.7).
 *
 * Review questions live in questions-06.json and are placed by
 * `after_section` (5.01.2.1), not `after_block`.
 *
 * drafts/GPT-04-review.md is where the content developer records the
 * 4.01.1 accuracy check on this lesson's generated content.
 */

import { COURSE_GPT } from "./course";
import type { TextLessonMeta } from "./types";

export const meta = {
  kind: "text",
  lessonId: "06",
  // The manifest's lesson_id — the globally unique package code.
  courseCode: "GPT-04",
  title: "Verifying the output",
  // "draft" until the content developer works through
  // drafts/GPT-04-review.md, closes its judgment list, and sets "checked"
  // by hand. That is the 4.01.1 check: technology was used in developing
  // this content, so the developer is responsible for reviewing it for
  // accuracy. Nothing in the tooling sets it. The 4.02 content review is
  // superCPE's, by a licensed CPA against the ingested package, and this
  // flag does not evidence it.
  status: "draft",

  sections: [
    { id: "front-matter", file: "00-front-matter.md", role: "front_matter", title: "How this course works" },
    { id: "sec-01", file: "01-a-first-draft.md", role: "body", title: "A first draft, not a final source" },
    { id: "sec-02", file: "02-what-is-always-verified.md", role: "body", title: "What is always verified" },
    { id: "sec-03", file: "03-search-backed-answers.md", role: "body", title: "Search-backed answers and the links" },
    { id: "sec-04", file: "04-the-general-standards-rule.md", role: "body", title: "The General Standards Rule" },
    { id: "sec-05", file: "05-the-human-review.md", role: "body", title: "The human review" },
    { id: "sec-06", file: "06-documenting-the-review.md", role: "body", title: "Documenting the review" },
    { id: "glossary", file: "90-glossary.md", role: "glossary", title: "Glossary" },
  ],

  // 4.05.3 item 3: superCPE refuses to publish a course whose guide has no
  // glossary. `npm run check` warns until this is written.
  //
  // Each definition traces to the OpenAI, AICPA and CPA.com documents
  // listed in `sources` below, or says that it cannot; see
  // drafts/GPT-04-review.md. Two entries — "Third-party service provider"
  // and "Verify" — carry a boundary the sources leave open and say so
  // (GPT-04 review, glossary flags).
  glossaryTerms: [
    {
      term: "Due professional care",
      definition:
        "One of the standards of the AICPA Code's General Standards Rule: exercise due professional care in the performance of professional services. The Rule does not mention artificial intelligence; relating it to verifying model output is this course's position. (AICPA Code of Professional Conduct, 1.300.)",
      sectionId: "glossary",
    },
    {
      term: "First draft",
      definition:
        "What OpenAI's help center says to use ChatGPT as, in contrast to a final source: a response that is checked before it is relied on. (OpenAI Help Center, \"Does ChatGPT tell the truth?\")",
      sectionId: "glossary",
    },
    {
      term: "General Standards Rule",
      definition:
        "The rule in section 1.300 of the AICPA Code of Professional Conduct requiring a member to comply with standards that include due professional care and sufficient relevant data. Beneath it the Code points to a nonauthoritative question and answer on using the output of technology, which the Code does not reproduce. (AICPA Code of Professional Conduct, 1.300.)",
      sectionId: "glossary",
    },
    {
      term: "Hallucination",
      definition:
        "OpenAI's term for a response that is not factually accurate. Among the forms the page names are incorrect definitions, dates, or facts, and fabricated quotes, studies, citations, or references to non-existent sources. (OpenAI Help Center, \"Does ChatGPT tell the truth?\")",
      sectionId: "glossary",
    },
    {
      term: "Human review",
      definition:
        "The CPA.com toolkit's practice: because generative AI output may include biases, errors, or hallucinations, a human reviews and ensures the appropriateness and accuracy of any content used in decision-making or shared with clients. (CPA.com, \"Generative AI Toolkit.\")",
      sectionId: "glossary",
    },
    {
      term: "Lack of access",
      definition:
        "A limitation OpenAI's page lists: the model may not be able to obtain relevant information from a given website because of technical issues, paywalls, or preferences set through robots.txt. (OpenAI Help Center, \"Does ChatGPT tell the truth?\")",
      sectionId: "glossary",
    },
    {
      term: "Search / Deep research",
      definition:
        "Tools OpenAI's page names under which the model can access and cite real-time web sources; without search, responses are based on what the model learned during training. The page's advice is to check the cited sources by visiting links directly. What each tool does beyond that, and which plans include them, is not stated in this lesson's sources. (OpenAI Help Center, \"Does ChatGPT tell the truth?\")",
      sectionId: "glossary",
    },
    {
      term: "Sufficient relevant data",
      definition:
        "One of the standards of the AICPA Code's General Standards Rule: obtain sufficient relevant data to afford a reasonable basis for conclusions or recommendations in relation to any professional services performed. That a verified source, and not a model's response, is what supplies it is this course's position. (AICPA Code of Professional Conduct, 1.300.)",
      sectionId: "glossary",
    },
    {
      term: "Third-party service provider",
      definition:
        "In the AICPA Code's definitions, an entity that the member does not control, individually or collectively with the member's firm or with members of the firm. The Code's interpretation on using one says the member must still obtain sufficient relevant data to support the work product. Whether a model vendor is one is a question the Code does not answer. (AICPA Code of Professional Conduct, 0.400 and 1.300.)",
      sectionId: "glossary",
    },
    {
      term: "Verify",
      definition:
        "OpenAI's word for what a user does with important information in a response: check it against reliable sources. The page does not define \"reliable source\"; in this lesson, verifying means finding the quote, figure, technical statement, or reference in the document it is said to come from. (OpenAI Help Center, \"Does ChatGPT tell the truth?\")",
      sectionId: "glossary",
    },
  ],

  learningObjectives: [
    {
      id: "lo-1",
      text:
        "Treat output as a first draft, and verify quotes, figures, technical content, and document references against a source before relying on them.",
    },
    {
      id: "lo-2",
      text:
        "Use search-backed answers by following the cited links to the source rather than relying on the summary.",
    },
    {
      id: "lo-3",
      text:
        "Relate verification to the General Standards Rule: due professional care and sufficient relevant data.",
    },
    {
      id: "lo-4",
      text:
        "Document the review of AI output as firm policy, with counsel deciding the form of the record.",
    },
  ],
  nasbaFieldOfStudy: COURSE_GPT.nasbaFieldOfStudy,
  knowledgeLevel: COURSE_GPT.knowledgeLevel,
  prerequisites: COURSE_GPT.prerequisites,
  advancePreparation: COURSE_GPT.advancePreparation,
  // Only the files in sources/gpt/ that drafts/GPT-source-index.md shows
  // contributing at least one entry to this lesson's objectives; the entry
  // numbers behind each objective are in drafts/GPT-04-review.md.
  sources: [
    {
      citation:
        "AICPA, The AICPA Code of Professional Conduct, \"Updated for all official releases through July 2026\" (sources/gpt/aicpa-code-1-700-001-confidential-client-information.pdf)",
      role: "primary",
    },
    {
      citation:
        "CPA.com, \"CPA.com Generative AI Toolkit\" (© 2023; sources/gpt/cpacom-genai-toolkit.pdf)",
      role: "primary",
    },
    {
      citation:
        "OpenAI Help Center, \"Does ChatGPT tell the truth?\" (retrieved 2026-09-13; sources/gpt/openai-does-chatgpt-tell-the-truth-2026-09-13.pdf)",
      role: "primary",
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
