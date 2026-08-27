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

export const QUESTIONS: Record<LessonId, Question[]> = {
  "01": questions01 as Question[],
};

/** The file behind each entry, relative to src/. */
export const QUESTIONS_FILE: Record<LessonId, string> = {
  "01": "questions-01.json",
};
