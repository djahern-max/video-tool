/**
 * The course records and their lesson outlines.
 *
 * Course-level metadata lives here once; lesson modules import these fields
 * into their `meta` rather than repeating them, so the course cannot drift
 * across lessons. superCPE feature 004 formalizes the course side.
 *
 * `knowledgeLevel` uses the contract's spelling ("Intermediate", 3.01.1) —
 * the manifest validator rejects any other casing.
 */

export const COURSE = {
  courseCode: "ASC842-PCX",
  title: "ASC 842 for Private Companies: The Practical Expedients",
  nasbaFieldOfStudy: "Accounting",
  knowledgeLevel: "Intermediate",
  prerequisites:
    "Basic familiarity with ASC 842: identifying a lease, classifying it, " +
    "and recognizing a right-of-use asset and lease liability.",
  advancePreparation: "None",
  deliveryMethod: "Self study",
  // Each entry's `status` mirrors that lesson module's `meta.status` — the
  // module is authoritative (it gates export); this copy exists so the course
  // outline can be read without loading every module. `npm run check` warns
  // when the two disagree (scripts/check-lessons.ts).
  lessons: [
    {
      position: 1,
      lessonId: "ASC842-PCX-01",
      title: "The Short-Term Lease Exception",
      status: "reviewed",
    },
    {
      position: 2,
      lessonId: "ASC842-PCX-02",
      title: "The Risk-Free Rate Election",
      status: "reviewed",
    },
    {
      position: 3,
      lessonId: "ASC842-PCX-03",
      title: "Not Separating Lease and Nonlease Components",
      status: "reviewed",
    },
    {
      position: 4,
      lessonId: "ASC842-PCX-04",
      title: "Common Control Arrangements",
      status: "reviewed",
    },
  ],
} as const;

/**
 * The first text-first course (video-tool feature 05; strategy in
 * supercpe's docs/decisions/2026-09-01-text-first.md). One minimal but
 * genuine lesson, authored as the round-trip proof of the text-package
 * pipeline.
 */
export const COURSE_ASC450 = {
  courseCode: "ASC450-LC",
  title: "Loss Contingencies Under ASC 450",
  nasbaFieldOfStudy: "Accounting",
  knowledgeLevel: "Intermediate",
  prerequisites:
    "Basic familiarity with accrual accounting and the recognition of " +
    "liabilities under U.S. GAAP.",
  advancePreparation: "None",
  deliveryMethod: "Self study",
  lessons: [
    {
      position: 1,
      lessonId: "ASC450-LC-01",
      title: "Recognizing, Measuring, and Disclosing Loss Contingencies",
      status: "draft",
    },
  ],
} as const;

/**
 * Every course this repo exports for. export.ts and check-lessons.ts look
 * a lesson's package id up across all of them; lesson modules import their
 * own course const directly, as before.
 */
export const COURSES = [COURSE, COURSE_ASC450] as const;
