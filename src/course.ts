/**
 * The course records and their lesson outlines.
 *
 * Course-level metadata lives here once; lesson modules import these fields
 * into their `meta` rather than repeating them, so the course cannot drift
 * across lessons. superCPE feature 004 formalizes the course side.
 *
 * `knowledgeLevel` uses the contract's spelling ("Intermediate", 3.01.1) —
 * the manifest validator rejects any other casing.
 *
 * `npm run retire` removes a lesson's entry from the `lessons` array of
 * whichever course claims its package id, and leaves the remaining
 * `position` values alone. `npm run new` writes no entry here at all:
 * which course a lesson belongs to, and where in it, is an authoring
 * decision.
 */

import type { LessonStatus } from "./types";

/**
 * One lesson's place in a course outline. Named rather than inferred so the
 * array survives being empty: under `as const` an inline `[]` types its
 * elements as `never`, and everything that maps over `course.lessons` stops
 * compiling the moment the last lesson is retired.
 */
export type CourseLesson = {
  position: number;
  lessonId: string;
  title: string;
  status: LessonStatus;
};

// Each entry's `status` mirrors that lesson module's `meta.status` — the
// module is authoritative (it gates export); this copy exists so the course
// outline can be read without loading every module. `npm run check` warns
// when the two disagree (scripts/check-lessons.ts).
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
  lessons: [] as CourseLesson[],
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
  lessons: [] as CourseLesson[],
} as const;

/**
 * Every course this repo exports for. export.ts and check-lessons.ts look
 * a lesson's package id up across all of them; lesson modules import their
 * own course const directly, as before.
 */
export const COURSES = [COURSE, COURSE_ASC450] as const;
