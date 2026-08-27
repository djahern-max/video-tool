/**
 * Shared lesson-metadata types for the course-package exporter.
 *
 * `LessonMeta` in slides.tsx is what the sheet chrome renders and is left
 * alone. `PackageLessonMeta` extends it with everything the manifest in
 * docs/course-package.md needs, using the contract's field names in
 * camelCase. Two contract fields deliberately do NOT appear under their
 * contract names because `meta` already uses those names for something else:
 *
 *   - manifest `lesson_id` is `courseCode` ("HAZWASTE-01"). `meta.lessonId`
 *     ("01") is the module selector that drives --lesson, the audio
 *     directory, and the composition id — it is not globally unique.
 *   - manifest `field_of_study` is `nasbaFieldOfStudy`. `meta.fieldOfStudy`
 *     is the display string the title sheet renders ("ESG/Sustainability"),
 *     which is not a NASBA value.
 *
 * export.ts performs both mappings.
 */

import type { LessonMeta } from "./slides";

export type LearningObjective = { id: string; text: string };

export type Source = { citation: string; role: "primary" | "supporting" };

export type Author = {
  name: string;
  credentials: string;
  licenseJurisdiction: string;
  licenseNumber: string;
};

/**
 * Where the lesson stands with its reviewer. "draft" until the human has
 * worked through drafts/<lesson>-review.md, closed its judgment list, and
 * set "reviewed" by hand — nothing in the tooling sets it. Export refuses
 * "draft" (4.01.1, 4.02); `npm run check` warns on it.
 */
export type LessonStatus = "draft" | "reviewed";

/** 3.01.1's five levels, exactly as superCPE spells them. */
export type KnowledgeLevel =
  | "Basic"
  | "Intermediate"
  | "Advanced"
  | "Update"
  | "Overview";

/** One choice in a question, exactly the contract's shape. */
export type Choice = { id: string; text: string };

/** A question in questions.json, exactly the contract's shape. */
export type Question = {
  id: string;
  kind: "review" | "assessment";
  /** Review only: the narrated block (1-based) the question follows. */
  after_block?: number;
  stem: string;
  choices: Choice[];
  correct: string;
  feedback: string;
  objective_ids: string[];
};

export type PackageLessonMeta = LessonMeta & {
  /** Module selector ("01") — not the manifest lesson_id; see header. */
  lessonId: string;
  /** Narrows LessonMeta's string to the review-gate vocabulary. */
  status: LessonStatus;
  title: string;
  subtitle: string;
  eyebrow: string;

  learningObjectives: LearningObjective[];
  /**
   * The manifest's field_of_study: a value from docs/2024-Fields-of-Study,
   * or "" for a lesson that is not CPE-exportable (lesson 06's sentinel).
   */
  nasbaFieldOfStudy: string;
  knowledgeLevel: KnowledgeLevel;
  /** "" is not allowed on export; state "None" explicitly (3.02.1). */
  prerequisites: string;
  advancePreparation: string;
  sources: Source[];
  author: Author;
  /** Text a participant must read (7.02.5). 0 for an all-video lesson. */
  wordCount: number;
  /** True unless the audio merely reads the slides. */
  avIsAdditionalLearning: boolean;
};
