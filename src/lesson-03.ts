/**
 * Lesson 03 — "What the model gets wrong"
 *
 * A text lesson: the content is markdown under guide/03/, not narrated
 * blocks. There is no Remotion composition, no audio, and no render for this
 * module unless it gains a supplemental clip. The sections below name the
 * files in reading order; export copies them into the package verbatim and
 * superCPE counts the body sections' words itself (7.02.5) — which is why
 * there is no wordCount field anywhere in this module.
 *
 * Every clip added to `media` must claim `avIsAdditionalLearning: true`:
 * if the video reads the guide aloud, it does not belong here (7.02.7).
 *
 * Review questions live in questions-03.json and are placed by
 * `after_section` (5.01.2.1), not `after_block`.
 *
 * SCAFFOLD — every field marked TODO is a human's to write, and
 * drafts/GPT-01-review.md is where the content developer records the
 * 4.01.1 accuracy check on this lesson's generated content.
 */

import { COURSE_GPT } from "./course";
import type { TextLessonMeta } from "./types";

export const meta = {
  kind: "text",
  lessonId: "03",
  // The manifest's lesson_id — the globally unique package code.
  courseCode: "GPT-01",
  title: "What the model gets wrong",
  // "draft" until the content developer works through
  // drafts/GPT-01-review.md, closes its judgment list, and sets "checked"
  // by hand. That is the 4.01.1 check: technology was used in developing
  // this content, so the developer is responsible for reviewing it for
  // accuracy. Nothing in the tooling sets it. The 4.02 content review is
  // superCPE's, by a licensed CPA against the ingested package, and this
  // flag does not evidence it.
  status: "checked",

  sections: [
    { id: "front-matter", file: "00-front-matter.md", role: "front_matter", title: "How this course works" },
    { id: "sec-01", file: "01-generated-not-computed.md", role: "body", title: "Generated, not computed" },
    { id: "sec-02", file: "02-hallucination.md", role: "body", title: "Hallucination and fabricated citations" },
    { id: "sec-03", file: "03-knowledge-cutoff.md", role: "body", title: "The knowledge cutoff" },
    { id: "sec-04", file: "04-confidence.md", role: "body", title: "Confidence is not correctness" },
    { id: "sec-05", file: "05-calculation.md", role: "body", title: "When the model can calculate" },
    { id: "glossary", file: "90-glossary.md", role: "glossary", title: "Glossary" },
  ],

  // 4.05.3 item 3: superCPE refuses to publish a course whose guide has no
  // glossary. `npm run check` warns until this is written.
  //
  // Each definition traces to the OpenAI and CPA.com documents listed in
  // `sources` below, or says that it cannot; see drafts/GPT-01-review.md.
  // "Staleness" is the course's own word; "large language model" is used
  // by the accuracy page and the toolkit and defined by neither; "prompt"
  // is defined by OpenAI's prompt-engineering page, a supporting source.
  glossaryTerms: [
    {
      term: "Code interpreter / Data analysis",
      definition:
        "The ChatGPT tool that OpenAI's help page describes as enabling accurate calculations, data visualizations, and structured logic; the name is as the page prints it. The one case in this lesson in which a number from ChatGPT is computed rather than generated. (OpenAI Help Center, \"Does ChatGPT tell the truth?\")",
      sectionId: "glossary",
    },
    {
      term: "Hallucination",
      definition:
        "OpenAI's term for a response that is not factually accurate. The forms its help page names include fabricated quotes, studies, citations, or references to non-existent sources. (OpenAI Help Center, \"Does ChatGPT tell the truth?\")",
      sectionId: "glossary",
    },
    {
      term: "Knowledge cutoff",
      definition:
        "The point up to which a model's training data runs. Responses do not incorporate information about events beyond that point unless tools are used. (OpenAI Help Center, \"Does ChatGPT tell the truth?\")",
      sectionId: "glossary",
    },
    {
      term: "Large language model (LLM)",
      definition:
        "The kind of model behind ChatGPT. OpenAI's help page describes ChatGPT as a language model that produces responses from patterns in the data it was trained on; the CPA.com Generative AI Toolkit uses the abbreviation LLM. No source this course relies on defines the term further, and this entry does not either.",
      sectionId: "glossary",
    },
    {
      term: "Prompt",
      definition:
        "A text input that initiates a conversation or triggers a response from the model. (OpenAI Help Center, \"Prompt engineering best practices for ChatGPT.\")",
      sectionId: "glossary",
    },
    {
      term: "Staleness",
      definition:
        "This course's own word for a response that reflects the training data as of the knowledge cutoff and not what has happened since. Neither source this lesson relies on uses the word.",
      sectionId: "glossary",
    },
  ],

  learningObjectives: [
    {
      id: "lo-1",
      text:
        "Explain that ChatGPT produces responses from patterns in its training data, so output is generated rather than computed.",
    },
    {
      id: "lo-2",
      text:
        "Recognize the failure modes that matter in professional work: hallucination, fabricated citations, knowledge cutoff, and confidence that does not track correctness.",
    },
    {
      id: "lo-3",
      text:
        "Identify the code tool as the feature OpenAI ties accurate calculation to, and treat ordinary responses as unverified arithmetic.",
    },
  ],
  nasbaFieldOfStudy: COURSE_GPT.nasbaFieldOfStudy,
  knowledgeLevel: COURSE_GPT.knowledgeLevel,
  prerequisites: COURSE_GPT.prerequisites,
  advancePreparation: COURSE_GPT.advancePreparation,
  // The files in sources/gpt/ that drafts/GPT-source-index.md shows
  // contributing at least one entry to this lesson's objectives, plus the
  // one the glossary's "prompt" entry is defined from (13#1, supporting);
  // the entry numbers behind each objective are in drafts/GPT-01-review.md.
  sources: [
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
    {
      citation:
        "OpenAI Help Center, \"Prompt engineering best practices for ChatGPT\" (retrieved 2026-09-13; sources/gpt/openai-prompt-engineering-best-practices-2026-09-13.pdf)",
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
    name: "Daniel J Ahern",
    credentials: "CPA",
    licenseJurisdiction: "NH",
    licenseNumber: "07308",
  },
  deliveryMethod: COURSE_GPT.deliveryMethod,
  revision: "1",
  revisionDate: "2026-09-13",
} satisfies TextLessonMeta;
