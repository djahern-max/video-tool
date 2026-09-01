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
  /** Review in a video lesson: the narrated block (1-based) it follows. */
  after_block?: number;
  /** Review in a text lesson: the id of the section it follows. */
  after_section?: string;
  stem: string;
  choices: Choice[];
  correct: string;
  feedback: string;
  objective_ids: string[];
};

/** The contract's four section roles. Only `body` enters the word count
 * (7.02.5); the exclusion list is structural, never author honesty. */
export type SectionRole = "front_matter" | "body" | "glossary" | "appendix";

/**
 * One guide section of a text lesson. `file` is the bare filename inside
 * this lesson's authoring directory, guide/<meta.lessonId>/; export copies
 * it to the package as guide/<file> and writes that path in the manifest.
 */
export type TextSection = {
  id: string;
  file: string;
  role: SectionRole;
  title: string;
};

/** Exported to the manifest's glossary_terms (4.05.3 item 3). */
export type GlossaryTerm = {
  term: string;
  definition: string;
  /** The section holding the definition — normally the glossary section. */
  sectionId?: string;
};

/**
 * One optional supplemental clip, produced by the existing video pipeline.
 * `file` is a path relative to the repo root (a rendered artifact, e.g.
 * "out/clip-….mp4"); export ffprobes it, copies it to media/<basename>,
 * and writes that path in the manifest.
 */
export type MediaItem = {
  id: string;
  file: string;
  placement: { afterSection: string };
  /**
   * Must be true on every item — 7.02.7's test: a clip that narrates the
   * text does not belong in a text package. Export refuses otherwise.
   */
  avIsAdditionalLearning: boolean;
};

/**
 * The `meta` of a `kind: "text"` lesson module. A text lesson is a study
 * guide: markdown sections under guide/<lessonId>/ are the program, and
 * there are no blocks, no narration, and no Remotion composition — a text
 * lesson with no clips never touches Remotion, ElevenLabs, or ffprobe of
 * a render. The descriptor fields carry exactly the meanings they carry
 * on PackageLessonMeta.
 */
export type TextLessonMeta = {
  kind: "text";
  /** Module selector ("05") — also the guide/<lessonId>/ directory. */
  lessonId: string;
  /** The manifest lesson_id — the globally unique package code. */
  courseCode: string;
  status: LessonStatus;
  title: string;

  sections: TextSection[];
  glossaryTerms: GlossaryTerm[];
  /** Optional supplemental clips; absent or empty is the common case. */
  media?: MediaItem[];

  learningObjectives: LearningObjective[];
  nasbaFieldOfStudy: string;
  knowledgeLevel: KnowledgeLevel;
  prerequisites: string;
  advancePreparation: string;
  sources: Source[];
  author: Author;
  deliveryMethod: string;
  revision: string;
  revisionDate: string;
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
