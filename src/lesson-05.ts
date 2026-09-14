/**
 * Lesson 05 — "Prompting for accounting tasks"
 *
 * A text lesson: the content is markdown under guide/05/, not narrated
 * blocks. There is no Remotion composition, no audio, and no render for this
 * module unless it gains a supplemental clip. The sections below name the
 * files in reading order; export copies them into the package verbatim and
 * superCPE counts the body sections' words itself (7.02.5) — which is why
 * there is no wordCount field anywhere in this module.
 *
 * Every clip added to `media` must claim `avIsAdditionalLearning: true`:
 * if the video reads the guide aloud, it does not belong here (7.02.7).
 *
 * Review questions live in questions-05.json and are placed by
 * `after_section` (5.01.2.1), not `after_block`.
 *
 * drafts/GPT-03-review.md is where the content developer records the
 * 4.01.1 accuracy check on this lesson's generated content.
 */

import { COURSE_GPT } from "./course";
import type { TextLessonMeta } from "./types";

export const meta = {
  kind: "text",
  lessonId: "05",
  // The manifest's lesson_id — the globally unique package code.
  courseCode: "GPT-03",
  title: "Prompting for accounting tasks",
  // "draft" until the content developer works through
  // drafts/GPT-03-review.md, closes its judgment list, and sets "checked"
  // by hand. That is the 4.01.1 check: technology was used in developing
  // this content, so the developer is responsible for reviewing it for
  // accuracy. Nothing in the tooling sets it. The 4.02 content review is
  // superCPE's, by a licensed CPA against the ingested package, and this
  // flag does not evidence it.
  status: "draft",

  sections: [
    { id: "front-matter", file: "00-front-matter.md", role: "front_matter", title: "How this course works" },
    { id: "sec-01", file: "01-what-a-prompt-is.md", role: "body", title: "What a prompt is" },
    { id: "sec-02", file: "02-clear-specific-in-context.md", role: "body", title: "Clear, specific, and in context" },
    { id: "sec-03", file: "03-tone-and-examples.md", role: "body", title: "Tone and examples" },
    { id: "sec-04", file: "04-refining-by-iteration.md", role: "body", title: "Refining by iteration" },
    { id: "sec-05", file: "05-asking-for-verbatim-excerpts.md", role: "body", title: "Asking for verbatim excerpts" },
    { id: "sec-06", file: "06-how-much-can-go-in.md", role: "body", title: "How much can go in" },
    { id: "glossary", file: "90-glossary.md", role: "glossary", title: "Glossary" },
  ],

  // 4.05.3 item 3: superCPE refuses to publish a course whose guide has no
  // glossary. `npm run check` warns until this is written.
  //
  // Each definition traces to the OpenAI and CPA.com documents listed in
  // `sources` below, or says that it cannot; see drafts/GPT-03-review.md.
  // Three terms — context window, GPT Instant / GPT Reasoning, and input
  // maximum — are row labels on the pricing grid, which gives figures and
  // defines nothing; their entries say so (GPT-03 review, glossary flags).
  glossaryTerms: [
    {
      term: "Context window",
      definition:
        "A row of OpenAI's pricing grid, given for each plan and each of two models as a number followed by K; the captured grid ranges from 27K to 256K. The grid does not say what the figure counts or what K stands for. (OpenAI, \"Pricing\", personal and business tabs.)",
      sectionId: "glossary",
    },
    {
      term: "Examples (in a prompt)",
      definition:
        "Sample answers supplied with a request. The CPA.com toolkit says that providing the model with examples helps get a better output. (CPA.com, \"Generative AI Toolkit.\")",
      sectionId: "glossary",
    },
    {
      term: "File uploads",
      definition:
        "A row of OpenAI's pricing grid. Included on ChatGPT Business; on the personal tab, limited on Free and included from Go up. What \"limited\" means is not stated in the grid. (OpenAI, \"Pricing\", personal and business tabs.)",
      sectionId: "glossary",
    },
    {
      term: "GPT Instant / GPT Reasoning",
      definition:
        "The two model names under which OpenAI's pricing grid gives a context window and an input maximum for each plan. The grid gives figures for each and describes neither. (OpenAI, \"Pricing\", personal and business tabs.)",
      sectionId: "glossary",
    },
    {
      term: "Input maximum",
      definition:
        "A row of OpenAI's pricing grid, given in pages of text for each plan and each model: about 12 pages for the Instant model on Free, about 40 on Business, about 320 for the Reasoning model on both business plans, and about 680 on Pro. The row points to a footnote that is not in the captured page. (OpenAI, \"Pricing\", personal and business tabs.)",
      sectionId: "glossary",
    },
    {
      term: "Iterative refinement",
      definition:
        "OpenAI's practice of starting with an initial prompt, reviewing the response, and refining the prompt based on the output. (OpenAI Help Center, \"Prompt engineering best practices for ChatGPT.\")",
      sectionId: "glossary",
    },
    {
      term: "Prompt",
      definition:
        "A text input that initiates a conversation or triggers a response from the model; it can also take other forms, such as an image or audio. (OpenAI Help Center, \"Prompt engineering best practices for ChatGPT.\")",
      sectionId: "glossary",
    },
    {
      term: "Prompt engineering",
      definition:
        "The process of designing and optimizing input prompts to effectively guide a language model's responses. (OpenAI Help Center, \"Prompt engineering best practices for ChatGPT.\")",
      sectionId: "glossary",
    },
    {
      term: "Tone",
      definition:
        "Set in a prompt with descriptive adjectives; OpenAI's page lists formal, informal, friendly, professional, humorous, and serious as words that help guide the model. (OpenAI Help Center, \"Prompt engineering best practices for ChatGPT.\")",
      sectionId: "glossary",
    },
    {
      term: "Verbatim excerpt",
      definition:
        "A passage returned in the document's own words rather than the model's. The CPA.com toolkit says that prompting the model to return verbatim excerpts mimics the way a human researcher gathers information in order to reach conclusions. (CPA.com, \"Generative AI Toolkit.\")",
      sectionId: "glossary",
    },
  ],

  learningObjectives: [
    {
      id: "lo-1",
      text:
        "Write a prompt that is clear, specific, gives context, sets tone, and includes examples.",
    },
    {
      id: "lo-2",
      text:
        "Refine a prompt iteratively by reviewing the output and adjusting the input.",
    },
    {
      id: "lo-3",
      text:
        "Ask for verbatim excerpts with citations when the answer will be checked against a source.",
    },
    {
      id: "lo-4",
      text:
        "Recognize that input length is bounded and that the bound differs by plan and model.",
    },
  ],
  nasbaFieldOfStudy: COURSE_GPT.nasbaFieldOfStudy,
  knowledgeLevel: COURSE_GPT.knowledgeLevel,
  prerequisites: COURSE_GPT.prerequisites,
  advancePreparation: COURSE_GPT.advancePreparation,
  // Only the files in sources/gpt/ that drafts/GPT-source-index.md shows
  // contributing at least one entry to this lesson's objectives; the entry
  // numbers behind each objective are in drafts/GPT-03-review.md.
  sources: [
    {
      citation:
        "CPA.com, \"CPA.com Generative AI Toolkit\" (© 2023; sources/gpt/cpacom-genai-toolkit.pdf)",
      role: "primary",
    },
    {
      citation:
        "OpenAI, \"Pricing\", Business & Enterprise tab, chatgpt.com/pricing (retrieved 2026-09-13; sources/gpt/openai-chatgpt-pricing-business-2026-09-13.pdf)",
      role: "primary",
    },
    {
      citation:
        "OpenAI, \"Pricing\", Personal tab, chatgpt.com/pricing (retrieved 2026-09-13; sources/gpt/openai-chatgpt-pricing-personal-2026-09-13.pdf)",
      role: "primary",
    },
    {
      citation:
        "OpenAI Help Center, \"Prompt engineering best practices for ChatGPT\" (retrieved 2026-09-13; sources/gpt/openai-prompt-engineering-best-practices-2026-09-13.pdf)",
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
