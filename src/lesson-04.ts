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
 * SCAFFOLD — every field marked TODO is a human's to write, and
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
  // Only the files in sources/gpt/ that drafts/GPT-source-index.md shows
  // contributing at least one entry to this lesson's objectives; the entry
  // numbers behind each objective are in drafts/GPT-02-review.md.
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
