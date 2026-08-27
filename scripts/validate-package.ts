/**
 * Local mirror of superCPE's package validation, so video-tool can say "this
 * will be rejected" before the human uploads.
 *
 * AUTHORITATIVE COPY: superCPE's backend/app/services/packages.py. This file
 * is a maintained duplicate, by design — same numbered rules, same messages —
 * and must be kept in step with it. When the two disagree, packages.py wins.
 *
 * Differences from packages.py, both deliberate:
 *   - It validates a package DIRECTORY, not a zip. Rule 1's zip-structure
 *     checks become directory-content checks; export.ts zips afterwards with
 *     the directory as the single top-level entry, which is what rule 1
 *     enforces server-side.
 *   - It does not run ffprobe (rule 5's duration comparison). export.ts does
 *     that separately, because it needs the rendered file, not the package.
 */

import { createHash } from "node:crypto";
import { readdirSync, readFileSync } from "node:fs";
import { basename, join } from "node:path";

const PACKAGE_FILES = ["manifest.json", "video.mp4", "transcript.md", "questions.json"];

// Contract fields and their JSON types, named as Python names them so the
// messages match packages.py character for character.
const MANIFEST_FIELDS: Record<string, string> = {
  package_version: "int",
  lesson_id: "str",
  title: "str",
  content_hash: "str",
  video: "dict",
  learning_objectives: "list",
  field_of_study: "str",
  knowledge_level: "str",
  prerequisites: "str",
  advance_preparation: "str",
  sources: "list",
  author: "dict",
  word_count: "int",
  av_is_additional_learning: "bool",
};
const VIDEO_FIELDS: Record<string, string> = {
  duration_seconds: "int",
  duration_source: "str",
  measured_at: "str",
  narration_blocks: "int",
  tts_provider: "str",
  tts_voice_id: "str",
  tts_model: "str",
};
const AUTHOR_FIELDS: Record<string, string> = {
  name: "str",
  credentials: "str",
  license_jurisdiction: "str",
  license_number: "str",
};
const QUESTION_FIELDS: Record<string, string> = {
  id: "str",
  kind: "str",
  stem: "str",
  choices: "list",
  correct: "str",
  feedback: "str",
  objective_ids: "list",
};

const REVIEW_MIN_CHOICES = 2;
const ASSESSMENT_MIN_CHOICES = 3;

// Duplicates of superCPE's app/constants/fields_of_study.py and
// knowledge_levels.py; packages.py is authoritative for how they are used.
const FIELDS_OF_STUDY = new Set([
  "Accounting",
  "Accounting (Governmental)",
  "Auditing",
  "Auditing (Governmental)",
  "Business Law",
  "Economics",
  "Finance",
  "Information Technology",
  "Management Services",
  "Regulatory Ethics",
  "Specialized Knowledge",
  "Statistics",
  "Taxes",
  "Behavioral Ethics",
  "Business Management & Organization",
  "Communications and Marketing",
  "Computer Software & Applications",
  "Personal Development",
  "Personnel/Human Resources",
  "Production",
]);
const KNOWLEDGE_LEVELS = ["Basic", "Intermediate", "Advanced", "Update", "Overview"];
const LEVELS_REQUIRING_PREREQUISITES = ["Intermediate", "Advanced", "Update"];

/** Python's name for a parsed-JSON value's type, for message parity. */
const pyType = (value: unknown): string => {
  if (value === null) return "NoneType";
  if (typeof value === "boolean") return "bool";
  if (typeof value === "number") return Number.isInteger(value) ? "int" : "float";
  if (typeof value === "string") return "str";
  if (Array.isArray(value)) return "list";
  return "dict";
};

const hasType = (value: unknown, typ: string): boolean => {
  // bool is checked before int because True is an int in Python — here the
  // distinction is native, but keep bool out of int all the same.
  if (typ === "int") return typeof value === "number" && Number.isInteger(value);
  return pyType(value) === typ;
};

const isInt = (value: unknown): value is number => hasType(value, "int");

const checkFields = (
  obj: Record<string, unknown>,
  fields: Record<string, string>,
  prefix: string,
  errors: string[]
): boolean => {
  let ok = true;
  for (const [name, typ] of Object.entries(fields)) {
    if (!(name in obj)) {
      errors.push(`${prefix}.${name}: missing required field`);
      ok = false;
    } else if (!hasType(obj[name], typ)) {
      errors.push(`${prefix}.${name}: expected ${typ}, got ${pyType(obj[name])}`);
      ok = false;
    }
  }
  return ok;
};

export const computeContentHash = (
  transcript: Buffer,
  questions: Buffer,
  video: Buffer
): string =>
  createHash("sha256").update(transcript).update(questions).update(video).digest("hex");

/** Python repr() of a string, for message parity with packages.py. */
const repr = (value: unknown): string =>
  typeof value === "string" ? `'${value.replace(/\\/g, "\\\\").replace(/'/g, "\\'")}'` : String(value);

/**
 * ISO 8601 acceptance matching Python 3.13's datetime.fromisoformat closely
 * enough for the manifest's own output. Returns "no-tz" for a parseable
 * timestamp without an offset, "ok" with one, "bad" otherwise.
 */
const isoTimestamp = (value: string): "ok" | "no-tz" | "bad" => {
  const m = value.match(
    /^\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}(:\d{2}(\.\d{1,6})?)?(Z|[+-]\d{2}:?\d{2}(:\d{2})?)?$/
  );
  if (!m || Number.isNaN(Date.parse(value))) return "bad";
  return m[3] ? "ok" : "no-tz";
};

/**
 * Read a package directory and return every contract violation, in the same
 * order packages.py reports them. Empty array means superCPE should accept
 * it (up to rule 5's server-side ffprobe check, which export.ts covers).
 */
export function validatePackage(dir: string): string[] {
  const errors: string[] = [];
  const top = basename(dir);

  // Rule 1: package structure (directory form; the zip shape is export's job).
  let entries: string[];
  try {
    entries = readdirSync(dir).filter((n) => n !== ".DS_Store");
  } catch {
    return [`package: ${dir} is not a readable directory`];
  }
  for (const f of PACKAGE_FILES) {
    if (!entries.includes(f)) errors.push(`package: missing required file ${top}/${f}`);
  }
  for (const f of entries.filter((n) => !PACKAGE_FILES.includes(n)).sort()) {
    errors.push(`package: unexpected file ${top}/${f}`);
  }
  if (errors.length > 0) return errors;

  const transcriptBytes = readFileSync(join(dir, "transcript.md"));
  const questionsBytes = readFileSync(join(dir, "questions.json"));
  const videoPath = join(dir, "video.mp4");

  try {
    new TextDecoder("utf-8", { fatal: true }).decode(transcriptBytes);
  } catch {
    errors.push("transcript.md: not valid UTF-8");
  }
  let manifest: Record<string, unknown> | null = null;
  try {
    const parsed = JSON.parse(readFileSync(join(dir, "manifest.json"), "utf8"));
    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
      errors.push("manifest.json: must be a JSON object");
    } else {
      manifest = parsed;
    }
  } catch (exc) {
    errors.push(`manifest.json: not valid JSON (${(exc as Error).message})`);
  }
  let questions: unknown[] | null = null;
  try {
    const parsed = JSON.parse(questionsBytes.toString("utf8"));
    if (!Array.isArray(parsed)) {
      errors.push("questions.json: must be a JSON array");
    } else {
      questions = parsed;
    }
  } catch (exc) {
    errors.push(`questions.json: not valid JSON (${(exc as Error).message})`);
  }
  if (errors.length > 0 || manifest === null) return errors;

  // Rule 3: required fields with correct types.
  checkFields(manifest, MANIFEST_FIELDS, "manifest", errors);
  const video = manifest.video as Record<string, unknown> | undefined;
  const videoOk =
    hasType(video, "dict") &&
    checkFields(video as Record<string, unknown>, VIDEO_FIELDS, "manifest.video", errors);
  if (hasType(manifest.author, "dict")) {
    checkFields(manifest.author as Record<string, unknown>, AUTHOR_FIELDS, "manifest.author", errors);
  }

  // Rule 2: package_version.
  const version = manifest.package_version;
  if (isInt(version) && version !== 1) {
    errors.push(`manifest.package_version: expected 1, received ${version}`);
  }

  if (videoOk && video) {
    // Rule 4: measured durations only.
    if (video.duration_source !== "measured") {
      errors.push(
        `manifest.video.duration_source: "${video.duration_source}" is ` +
          "refused; 7.02.7 credits actual audio/video duration time, so " +
          "estimated durations are refused. video-tool must export with " +
          "measured audio."
      );
    }
    // Rule 5's ffprobe comparison runs in export.ts, not here. The rest of
    // rule 5's checks stay:
    const measuredAt = video.measured_at as string;
    const iso = isoTimestamp(measuredAt);
    if (iso === "bad") {
      errors.push(
        `manifest.video.measured_at: not an ISO 8601 timestamp, got ${repr(measuredAt)}`
      );
    } else if (iso === "no-tz") {
      errors.push("manifest.video.measured_at: timestamp must include a timezone offset");
    }
    if (isInt(video.narration_blocks) && (video.narration_blocks as number) < 1) {
      errors.push(
        `manifest.video.narration_blocks: must be at least 1, got ${video.narration_blocks}`
      );
    }
  }

  // Rule 6: content hash over transcript + questions + video bytes, in order.
  let videoBytes: Buffer;
  try {
    videoBytes = readFileSync(videoPath);
  } catch {
    videoBytes = Buffer.alloc(0);
  }
  const computedHash = computeContentHash(transcriptBytes, questionsBytes, videoBytes);
  const declaredHash = manifest.content_hash;
  if (typeof declaredHash === "string" && declaredHash.toLowerCase() !== computedHash) {
    errors.push(
      "manifest.content_hash: does not match sha256 over transcript.md + " +
        `questions.json + video.mp4 bytes; manifest says ${declaredHash}, ` +
        `computed ${computedHash}. Package contents changed after export.`
    );
  }

  // Rule 7.
  const wordCount = manifest.word_count;
  if (isInt(wordCount) && wordCount < 0) {
    errors.push(`manifest.word_count: must be >= 0, got ${wordCount}`);
  }

  // Rule 8.
  const fieldOfStudy = manifest.field_of_study;
  if (typeof fieldOfStudy === "string" && !FIELDS_OF_STUDY.has(fieldOfStudy)) {
    errors.push(
      `manifest.field_of_study: "${fieldOfStudy}" is not a NASBA field ` +
        "of study (docs/2024-Fields-of-Study.pdf)"
    );
  }

  // Rule 9.
  const knowledgeLevel = manifest.knowledge_level;
  if (typeof knowledgeLevel === "string" && !KNOWLEDGE_LEVELS.includes(knowledgeLevel)) {
    errors.push(
      `manifest.knowledge_level: "${knowledgeLevel}" is not one of ` +
        `${KNOWLEDGE_LEVELS.join(", ")} (3.01.1)`
    );
  }

  // Rule 10: prerequisites and advance preparation per 3.02.1.
  if (LEVELS_REQUIRING_PREREQUISITES.includes(knowledgeLevel as string)) {
    for (const [name, value] of [
      ["prerequisites", manifest.prerequisites],
      ["advance_preparation", manifest.advance_preparation],
    ] as const) {
      if (typeof value === "string" && value.trim() === "") {
        errors.push(`manifest.${name}: must be stated for ${knowledgeLevel} programs (3.02.1)`);
      }
    }
  }

  // Rule 11: learning objectives.
  const objectiveIds = new Set<string>();
  const objectives = manifest.learning_objectives;
  if (Array.isArray(objectives)) {
    if (objectives.length === 0) {
      errors.push("manifest.learning_objectives: must not be empty");
    }
    objectives.forEach((obj, i) => {
      const label = `manifest.learning_objectives[${i}]`;
      if (!hasType(obj, "dict")) {
        errors.push(`${label}: expected an object with id and text`);
        return;
      }
      const objId = (obj as Record<string, unknown>).id;
      if (typeof objId !== "string" || objId.trim() === "") {
        errors.push(`${label}.id: must be a non-blank string`);
      } else if (objectiveIds.has(objId)) {
        errors.push(`${label}.id: duplicate objective id "${objId}"`);
      } else {
        objectiveIds.add(objId);
      }
      const text = (obj as Record<string, unknown>).text;
      if (typeof text !== "string" || text.trim() === "") {
        errors.push(`${label}.text: must be a non-blank string`);
      }
    });
  }

  // Rule 12.
  const sources = manifest.sources;
  if (Array.isArray(sources) && sources.length === 0) {
    errors.push(
      "manifest.sources: must not be empty; a lesson with no cited " +
        "authority is not a CPE lesson"
    );
  }

  // Rules 13-17: questions.
  if (questions !== null) {
    validateQuestions(questions, objectiveIds, video, errors);
  }

  return errors;
}

function validateQuestions(
  questions: unknown[],
  objectiveIds: Set<string>,
  video: Record<string, unknown> | undefined,
  errors: string[]
): void {
  // Rule 13.
  if (questions.length === 0) {
    errors.push("questions: must not be empty");
  }
  const seenIds = new Set<string>();
  const narrationBlocks = hasType(video, "dict")
    ? (video as Record<string, unknown>).narration_blocks
    : null;
  questions.forEach((q, i) => {
    const qid = hasType(q, "dict") ? (q as Record<string, unknown>).id : null;
    const label =
      typeof qid === "string" && qid.trim() !== "" ? `questions[${qid}]` : `questions[${i}]`;
    if (!hasType(q, "dict")) {
      errors.push(`${label}: expected an object`);
      return;
    }
    const question = q as Record<string, unknown>;
    const fieldsOk = checkFields(question, QUESTION_FIELDS, label, errors);
    if (typeof qid === "string") {
      if (seenIds.has(qid)) {
        errors.push(`${label}.id: duplicate question id "${qid}"`);
      }
      seenIds.add(qid);
    }
    if (!fieldsOk) return;

    const kind = question.kind;
    if (kind !== "review" && kind !== "assessment") {
      errors.push(`${label}.kind: must be "review" or "assessment", got "${kind}"`);
      return;
    }

    // Rule 14.
    const choices = question.choices as unknown[];
    const choiceIds = choices
      .filter((c) => hasType(c, "dict"))
      .map((c) => (c as Record<string, unknown>).id);
    if (!choiceIds.includes(question.correct)) {
      errors.push(`${label}.correct: "${question.correct}" is not the id of any choice`);
    }

    // Rule 15.
    if (kind === "review") {
      if (choices.length < REVIEW_MIN_CHOICES) {
        errors.push(
          `${label}.choices: review questions need at least ` +
            `${REVIEW_MIN_CHOICES} choices, got ${choices.length}`
        );
      }
      const afterBlock = question.after_block;
      if (!isInt(afterBlock)) {
        errors.push(`${label}.after_block: review questions require an integer after_block`);
      } else if (isInt(narrationBlocks) && !(1 <= afterBlock && afterBlock <= narrationBlocks)) {
        errors.push(
          `${label}.after_block: ${afterBlock} is outside ` +
            `[1, ${narrationBlocks}] (narration_blocks)`
        );
      }
    } else {
      if (choices.length < ASSESSMENT_MIN_CHOICES) {
        errors.push(
          `${label}.choices: assessment questions need at least ` +
            `${ASSESSMENT_MIN_CHOICES} choices (6.01.2 forced-choice ` +
            `prohibition), got ${choices.length}`
        );
      }
      if ("after_block" in question) {
        errors.push(`${label}.after_block: assessment questions must not have after_block`);
      }
    }

    // Rule 16.
    const questionObjectives = question.objective_ids as unknown[];
    if (questionObjectives.length === 0) {
      errors.push(
        `${label}.objective_ids: every question must map to at least one learning objective`
      );
    }
    for (const oid of questionObjectives) {
      if (!objectiveIds.has(oid as string)) {
        errors.push(
          `${label}.objective_ids: "${oid}" is not a learning objective id in the manifest`
        );
      }
    }

    // Rule 17.
    if ((question.feedback as string).trim() === "") {
      errors.push(`${label}.feedback: must not be blank`);
    }
  });
}
