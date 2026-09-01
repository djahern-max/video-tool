/**
 * Lesson 05 — "Recognizing, Measuring, and Disclosing Loss Contingencies"
 * Course: Loss Contingencies Under ASC 450 (ASC450-LC)
 *
 * The first text lesson (feature 05). Content is data, as ever — but here
 * the content is markdown under guide/05/, not narrated blocks. There is
 * no Remotion composition, no audio, and no render for this module; a text
 * lesson with no clips never touches Remotion, ElevenLabs, or ffprobe of a
 * render. The sections below name the files in reading order; export
 * copies them into the package verbatim and superCPE counts the body
 * sections' words itself (7.02.5) — which is why there is no wordCount
 * field anywhere in this module.
 *
 * Review questions live in questions-05.json and are placed by
 * `after_section` (5.01.2.1), not `after_block`.
 */

import { COURSE_ASC450 } from "./course";
import type { TextLessonMeta } from "./types";

export const meta = {
  kind: "text",
  lessonId: "05",
  courseCode: COURSE_ASC450.lessons[0].lessonId,
  title: COURSE_ASC450.lessons[0].title,
  // Not yet worked through drafts/ASC450-LC-01-review.md; export refuses
  // until the human closes the judgment list and sets "reviewed" by hand.
  status: "draft",

  sections: [
    { id: "sec-00", file: "00-front-matter.md", role: "front_matter", title: "How this course works" },
    { id: "sec-01", file: "01-likelihood.md", role: "body", title: "The Likelihood Scale" },
    { id: "sec-02", file: "02-recognition.md", role: "body", title: "When a Loss Is Accrued" },
    { id: "sec-03", file: "03-measurement.md", role: "body", title: "Measuring Within a Range" },
    { id: "sec-04", file: "04-disclosure.md", role: "body", title: "What Must Be Disclosed" },
    { id: "sec-05", file: "05-gain-contingencies.md", role: "body", title: "Gain Contingencies Wait" },
    { id: "sec-90", file: "90-glossary.md", role: "glossary", title: "Glossary" },
    { id: "sec-91", file: "91-appendix-a.md", role: "appendix", title: "Appendix A — ASC 450-20-25-2 in Full" },
  ],

  glossaryTerms: [
    {
      term: "Contingency",
      definition:
        "An existing condition, situation, or set of circumstances involving " +
        "uncertainty as to possible gain or loss to an entity that will " +
        "ultimately be resolved when one or more future events occur or fail " +
        "to occur.",
      sectionId: "sec-90",
    },
    {
      term: "Probable",
      definition: "The future event or events are likely to occur.",
      sectionId: "sec-90",
    },
    {
      term: "Reasonably possible",
      definition:
        "The chance of the future event or events occurring is more than " +
        "remote but less than likely.",
      sectionId: "sec-90",
    },
    {
      term: "Remote",
      definition: "The chance of the future event or events occurring is slight.",
      sectionId: "sec-90",
    },
    {
      term: "Gain contingency",
      definition:
        "An existing condition, situation, or set of circumstances involving " +
        "uncertainty as to possible gain to an entity that will ultimately be " +
        "resolved when one or more future events occur or fail to occur.",
      sectionId: "sec-90",
    },
  ],

  learningObjectives: [
    { id: "lo-1", text: "Classify the likelihood of a loss contingency as probable, reasonably possible, or remote using the ASC 450 definitions." },
    { id: "lo-2", text: "Determine whether a loss contingency must be accrued under the two conditions of ASC 450-20-25-2." },
    { id: "lo-3", text: "Measure an accrued loss contingency when the estimate is a range, including when no amount in the range is a better estimate than any other." },
    { id: "lo-4", text: "Identify the disclosures required for loss contingencies that are not accrued or exceed the accrual, and explain why gain contingencies are not recognized before realization." },
  ],
  nasbaFieldOfStudy: COURSE_ASC450.nasbaFieldOfStudy,
  knowledgeLevel: COURSE_ASC450.knowledgeLevel,
  prerequisites: COURSE_ASC450.prerequisites,
  advancePreparation: COURSE_ASC450.advancePreparation,
  sources: [
    { citation: "ASC 450-20-25-2", role: "primary" },
    { citation: "ASC 450-20-30-1", role: "primary" },
    { citation: "ASC 450-20-50-3 through 50-4", role: "primary" },
    { citation: "ASC 450-30-25-1", role: "primary" },
    { citation: "ASC 450-30-50-1", role: "supporting" },
    { citation: "ASC 450 Master Glossary — Contingency, Probable, Reasonably Possible, Remote", role: "supporting" },
  ],
  author: {
    name: "Daniel J. Ahern",
    credentials: "CPA",
    licenseJurisdiction: "New Hampshire",
    licenseNumber: "07308",
  },
  deliveryMethod: COURSE_ASC450.deliveryMethod,
  revision: "A",
  revisionDate: "2026-09-01",
} satisfies TextLessonMeta;
