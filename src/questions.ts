/**
 * LessonId -> that lesson's questions, alongside the LESSONS map in
 * lessons.ts. One file per lesson, in exactly the questions.json shape from
 * docs/course-package.md; export.ts copies the file's bytes into the package
 * verbatim (the content hash is over raw bytes), so the parsed values here
 * are for validation and tooling, never re-serialization.
 *
 * `npm run new` adds the import and both entries; `npm run retire` removes
 * them. Both edit this file as text, so keep one import and one entry per
 * line, in the shape they are in.
 */

import type { LessonId } from "./lessons";
import type { Question } from "./types";

import questions91 from "./questions-91.json";

const BY_ID = {
  "91": questions91 as Question[],
} satisfies Record<LessonId, Question[]>;

const FILE_BY_ID = {
  "91": "questions-91.json",
} satisfies Record<LessonId, string>;

/**
 * Both maps are declared through a string index for the same reason
 * `LESSONS` is (see lessons.ts): with no lesson registered `LessonId` is
 * `never` and a `Record<LessonId, …>` lookup types as `never`. The
 * `satisfies` above keeps the exhaustiveness check — every registered
 * lesson has an entry, and no entry names an unregistered lesson.
 */
export const QUESTIONS: Record<string, Question[]> = BY_ID;

/** The file behind each entry, relative to src/. */
export const QUESTIONS_FILE: Record<string, string> = FILE_BY_ID;
