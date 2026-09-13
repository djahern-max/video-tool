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
 * SCAFFOLD — every field marked TODO is a human's to write, and
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
    { id: "sec-00", file: "00-front-matter.md", role: "front_matter", title: "How this course works" },
    { id: "sec-01", file: "01-body.md", role: "body", title: "TODO: the first body section" },
  ],

  // 4.05.3 item 3: superCPE refuses to publish a course whose guide has no
  // glossary. `npm run check` warns until this is written.
  glossaryTerms: [],

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
