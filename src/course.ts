/**
 * The course records and their lesson outlines.
 *
 * Course-level metadata lives here once; lesson modules import these fields
 * into their `meta` rather than repeating them, so the course cannot drift
 * across lessons. The manifest's `course_code` and `position` are read from
 * here (scripts/export.ts).
 *
 * `knowledgeLevel` uses the contract's spelling ("Basic", "Intermediate",
 * "Advanced" — 3.01.1); the manifest validator rejects any other casing.
 *
 * The commands own this file's structure and the human owns one field: it
 * is written by `npm run new` and `npm run retire`, not by hand, except for
 * each entry's `status`, which mirrors that lesson module's `meta.status`
 * and is set by the same hand edit in the same commit. `npm run check`
 * warns when the two files disagree.
 * `new --course-code` appends a lesson to a course, or creates the course
 * record when nothing matches; `retire` removes the entry and drops the
 * record when it loses its last lesson. Both edit this file line by line, so
 * the shape below is a contract: a course record is an optional `/** *\/`
 * doc comment, then `export const NAME = {` through `} as const;`, and its
 * outline is either `lessons: [] as CourseLesson[],` on one line or entries
 * of exactly the form written here.
 */

import type { KnowledgeLevel, LessonStatus } from "./types";

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

/**
 * One course record. Named for the same reason `CourseLesson` is: `COURSES`
 * is now reachable at length zero — `npm run retire --all` empties it — and
 * an inline `[] as const` would type its elements `never`, breaking every
 * consumer that maps over it. The annotation on `COURSES` below is what
 * keeps a courseless repo compiling; leaving a placeholder record behind
 * would be the wrong fix.
 */
export type Course = {
  courseCode: string;
  title: string;
  nasbaFieldOfStudy: string;
  knowledgeLevel: KnowledgeLevel;
  prerequisites: string;
  advancePreparation: string;
  deliveryMethod: string;
  lessons: CourseLesson[];
};

// Each outline entry's `status` mirrors that lesson module's `meta.status` —
// the module is authoritative (it gates export); this copy exists so the
// course outline can be read without loading every module. `npm run check`
// warns when the two disagree (scripts/check-lessons.ts).

/**
 * TODO: one line saying what BALLOON is and who it is for.
 */
export const COURSE_BALLOON = {
  courseCode: "BALLOON",
  title: "Back-of-the-Envelope Physics",
  nasbaFieldOfStudy: "TODO: a value from docs/2024-Fields-of-Study",
  knowledgeLevel: "Basic",
  prerequisites: "TODO: what a participant must already know — 3.02.1 wants None stated, not blank",
  advancePreparation: "TODO: what a participant must do beforehand, or None",
  deliveryMethod: "Self study",
  lessons: [
    {
      position: 1,
      lessonId: "BALLOON-01",
      title: "How Many Helium Balloons Would It Take to Lift an Excavator?",
      status: "draft",
    },
  ] as CourseLesson[],
} as const;

/**
 * Every course this repo exports for. export.ts and check-lessons.ts look
 * a lesson's package id up across all of them; lesson modules import their
 * own course const directly, as before.
 */
export const COURSES: readonly Course[] = [COURSE_BALLOON];
