/**
 * LessonId -> that lesson's questions, alongside the LESSONS map in
 * lessons.ts. One file per lesson, in exactly the questions.json shape from
 * docs/course-package.md; export.ts copies the file's bytes into the package
 * verbatim (the content hash is over raw bytes), so the parsed values here
 * are for validation and tooling, never re-serialization.
 */

import type { LessonId } from "./lessons";
import type { Question } from "./types";

import questions01 from "./questions-01.json";
import questions02 from "./questions-02.json";
import questions03 from "./questions-03.json";
import questions04 from "./questions-04.json";
import questions05 from "./questions-05.json";

export const QUESTIONS: Record<LessonId, Question[]> = {
  "01": questions01 as Question[],
  "02": questions02 as Question[],
  "03": questions03 as Question[],
  "04": questions04 as Question[],
  "05": questions05 as Question[],
};

/** The file behind each entry, relative to src/. */
export const QUESTIONS_FILE: Record<LessonId, string> = {
  "01": "questions-01.json",
  "02": "questions-02.json",
  "03": "questions-03.json",
  "04": "questions-04.json",
  "05": "questions-05.json",
};
