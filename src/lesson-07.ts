/**
 * Lesson 07 — "Confidentiality and client data"
 *
 * A text lesson: the content is markdown under guide/07/, not narrated
 * blocks. There is no Remotion composition, no audio, and no render for this
 * module unless it gains a supplemental clip. The sections below name the
 * files in reading order; export copies them into the package verbatim and
 * superCPE counts the body sections' words itself (7.02.5) — which is why
 * there is no wordCount field anywhere in this module.
 *
 * Every clip added to `media` must claim `avIsAdditionalLearning: true`:
 * if the video reads the guide aloud, it does not belong here (7.02.7).
 *
 * Review questions live in questions-07.json and are placed by
 * `after_section` (5.01.2.1), not `after_block`.
 *
 * drafts/GPT-05-review.md is where the content developer records the
 * 4.01.1 accuracy check on this lesson's generated content.
 */

import { COURSE_GPT } from "./course";
import type { TextLessonMeta } from "./types";

export const meta = {
  kind: "text",
  lessonId: "07",
  // The manifest's lesson_id — the globally unique package code.
  courseCode: "GPT-05",
  title: "Confidentiality and client data",
  // "draft" until the content developer works through
  // drafts/GPT-05-review.md, closes its judgment list, and sets "checked"
  // by hand. That is the 4.01.1 check: technology was used in developing
  // this content, so the developer is responsible for reviewing it for
  // accuracy. Nothing in the tooling sets it. The 4.02 content review is
  // superCPE's, by a licensed CPA against the ingested package, and this
  // flag does not evidence it.
  status: "draft",

  sections: [
    { id: "front-matter", file: "00-front-matter.md", role: "front_matter", title: "How this course works" },
    { id: "sec-01", file: "01-the-confidential-client-information-rule.md", role: "body", title: "The Confidential Client Information Rule" },
    { id: "sec-02", file: "02-third-party-service-providers.md", role: "body", title: "Third-party service providers" },
    { id: "sec-03", file: "03-new-hampshire-rsa-309-b-18.md", role: "body", title: "State law: New Hampshire RSA 309-B:18" },
    { id: "sec-04", file: "04-this-courses-position.md", role: "body", title: "This course's position" },
    { id: "sec-05", file: "05-keeping-client-data-out.md", role: "body", title: "Keeping client data out of the tool" },
    { id: "sec-06", file: "06-consent-disclosure-and-the-policy.md", role: "body", title: "Consent, disclosure, and the shape of the policy" },
    { id: "glossary", file: "90-glossary.md", role: "glossary", title: "Glossary" },
  ],

  // 4.05.3 item 3: superCPE refuses to publish a course whose guide has no
  // glossary. `npm run check` warns until this is written.
  //
  // Each definition traces to the AICPA, New Hampshire and CPA.com
  // documents listed in `sources` below, or says that it cannot; see
  // drafts/GPT-05-review.md. Two entries — "Public LLM / public generative
  // AI tool" and "Third-party service provider" — carry a line the sources
  // leave undrawn and say it is the course's (GPT-05 review, glossary
  // flags).
  glossaryTerms: [
    {
      term: "Confidential client information",
      definition:
        "In the AICPA Code's definitions, any information obtained from the client that is not available to the public. \"Available to the public\" includes information on publicly accessible websites, databases, online discussion forums, or other electronic media by which members of the public can access it; unless the particular client information is available to the public, it should be considered confidential. (AICPA Code of Professional Conduct, 0.400 and 1.700.)",
      sectionId: "glossary",
    },
    {
      term: "Confidential Client Information Rule",
      definition:
        "The rule in section 1.700.001 of the AICPA Code of Professional Conduct: a member in public practice shall not disclose any confidential client information without the specific consent of the client. (AICPA Code of Professional Conduct, 1.700.001.)",
      sectionId: "glossary",
    },
    {
      term: "De-identify",
      definition:
        "The CPA.com toolkit's word, with \"sanitize\" as its gloss, for removing personal information before ingesting data into both internal AI systems and public tools; its sample use cases likewise require all identifiable information to be removed before any upload. The toolkit does not say what the removal consists of. (CPA.com, \"Generative AI Toolkit.\")",
      sectionId: "glossary",
    },
    {
      term: "Need to know",
      definition:
        "The basis on which RSA 309-B:18 allows disclosure to other persons active in the organization performing services for the client; the section separately allows disclosure to persons in a professional organization, peer review entity, or organization serving the client who need the information for the sole purpose of assuring quality control. (New Hampshire RSA 309-B:18.)",
      sectionId: "glossary",
    },
    {
      term: "Permission of the client",
      definition:
        "The one general release in RSA 309-B:18 from a licensee's duty not to voluntarily disclose client-communicated information: permission of the client for whom the licensee performs services, or of the client's heirs, successors, or personal representatives. The section does not say that the permission must be written, specific, or informed. (New Hampshire RSA 309-B:18.)",
      sectionId: "glossary",
    },
    {
      term: "Public LLM / public generative AI tool",
      definition:
        "The CPA.com toolkit's terms for the tools its general rule keeps client and business information out of. The toolkit defines neither term and names no OpenAI plan; reading an individual ChatGPT plan as a public tool in the toolkit's sense is this course's position. (CPA.com, \"Generative AI Toolkit.\")",
      sectionId: "glossary",
    },
    {
      term: "Reasonable assurance",
      definition:
        "In the AICPA Code's interpretation on third-party service providers, what a member obtains, alongside a contractual agreement to maintain confidentiality, that the provider has appropriate procedures in place. How much work it takes depends on factors including the extent of publicly available information on the provider's controls and procedures to safeguard confidential client information. (AICPA Code of Professional Conduct, 1.700.040.)",
      sectionId: "glossary",
    },
    {
      term: "RSA 309-B:18",
      definition:
        "Section 309-B:18, \"Confidential Communications\", of the New Hampshire Accountancy Act, RSA chapter 309-B, enacted in 1999 and last amended effective July 1, 2024. It bars a licensee, and everyone in the licensee's firm, from voluntarily disclosing information communicated by the client in connection with services rendered, except by the client's permission and in the cases its exceptions list. It does not define \"voluntarily disclose\" and never names technology, a vendor, or a computer system. (New Hampshire RSA 309-B:18.)",
      sectionId: "glossary",
    },
    {
      term: "Specific consent",
      definition:
        "What the Confidential Client Information Rule requires before a disclosure, and the AICPA Code's second route for disclosing to a third-party service provider. The Code's interpretation says the consent should specify the nature of the information that may be disclosed, the type of third party to whom it may be disclosed, and its intended use. (AICPA Code of Professional Conduct, 1.700.001 and 1.700.040.)",
      sectionId: "glossary",
    },
    {
      term: "Third-party service provider",
      definition:
        "In the AICPA Code's definitions, an entity that the member does not control, individually or collectively with the member's firm or with members of the firm. When a member uses one to assist in providing professional services, the Code says threats to compliance with the Confidential Client Information Rule may exist. Whether a model vendor is one is a question the Code does not answer; treating OpenAI as one is this course's position. (AICPA Code of Professional Conduct, 0.400 and 1.700.040.)",
      sectionId: "glossary",
    },
  ],

  learningObjectives: [
    {
      id: "lo-1",
      text:
        "Apply the Confidential Client Information Rule: information is confidential by default, public information is not, and a client's name alone can be confidential.",
    },
    {
      id: "lo-2",
      text:
        "Describe the Code's two routes for third-party service providers — a confidentiality contract with reasonable assurance, or the client's specific consent — and the member's continuing responsibility.",
    },
    {
      id: "lo-3",
      text:
        "Recognize that state law may be more restrictive, using New Hampshire RSA 309-B:18, whose only general release is client permission and whose exceptions contain no service-provider clause.",
    },
    {
      id: "lo-4",
      text:
        "Apply a firm policy that keeps client data out of individual-plan tools and de-identifies data before it enters any AI tool.",
    },
  ],
  nasbaFieldOfStudy: COURSE_GPT.nasbaFieldOfStudy,
  knowledgeLevel: COURSE_GPT.knowledgeLevel,
  prerequisites: COURSE_GPT.prerequisites,
  advancePreparation: COURSE_GPT.advancePreparation,
  // Only the files in sources/gpt/ that drafts/GPT-source-index.md shows
  // contributing at least one entry to this lesson's objectives; the entry
  // numbers behind each objective are in drafts/GPT-05-review.md.
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
        "New Hampshire General Court, \"Section 309-B:18 Confidential Communications.\", RSA chapter 309-B, New Hampshire Accountancy Act (as amended eff. July 1, 2024; retrieved 2026-09-13; sources/gpt/nh-rsa-309-b-18-confidential-communications.pdf)",
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
