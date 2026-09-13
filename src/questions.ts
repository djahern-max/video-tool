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

import questions01 from "./questions-01.json";
import questions02 from "./questions-02.json";
import questions03 from "./questions-03.json";
import questions04 from "./questions-04.json";
import questions05 from "./questions-05.json";
import questions06 from "./questions-06.json";
import questions07 from "./questions-07.json";
import questions08 from "./questions-08.json";

const BY_ID = {
  "01": questions01 as Question[],
  "02": questions02 as Question[],
  "03": questions03 as Question[],
  "04": questions04 as Question[],
  "05": questions05 as Question[],
  "06": questions06 as Question[],
  "07": questions07 as Question[],
  "08": questions08 as Question[],
} satisfies Record<LessonId, Question[]>;

const FILE_BY_ID = {
  "01": "questions-01.json",
  "02": "questions-02.json",
  "03": "questions-03.json",
  "04": "questions-04.json",
  "05": "questions-05.json",
  "06": "questions-06.json",
  "07": "questions-07.json",
  "08": "questions-08.json",
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
