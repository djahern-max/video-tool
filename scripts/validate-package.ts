/**
 * Local mirror of superCPE's package validation, so video-tool can say "this
 * will be rejected" before the human uploads.
 *
 * AUTHORITATIVE COPY: superCPE's backend/app/services/packages.py. This file
 * is a maintained duplicate, by design — same numbered rules, same messages —
 * and must be kept in step with it. When the two disagree, packages.py wins.
 *
 * Differences from packages.py, all deliberate:
 *   - It validates a package DIRECTORY, not a zip. Rule 1's zip-structure
 *     checks become directory-content checks; export.ts zips afterwards with
 *     the directory as the single top-level entry, which is what rule 1
 *     enforces server-side.
 *   - It does not run ffprobe (rule 5's duration comparison, and the per-clip
 *     measurement of a text package's media). export.ts does that separately,
 *     because it needs the rendered files, not the package.
 *   - It returns errors only. packages.py's one warning (an empty
 *     glossary_terms list, refused later at the publish gate) is printed by
 *     export.ts and check-lessons.ts instead.
 *
 * Kinds (023): `manifest.kind` is "video" or "text"; absent means "video".
 * The kind is peeked before the layout rules are chosen, exactly as
 * packages.py does, so a broken package gets the video refusals it always
 * got.
 */

import { createHash } from "node:crypto";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { basename, join } from "node:path";

const PACKAGE_FILES = ["manifest.json", "video.mp4", "transcript.md", "questions.json"];

// A text package's two root files; everything else it carries lives under
// one of the two directories the contract names.
const TEXT_ROOT_FILES = ["manifest.json", "questions.json"];
const GUIDE_DIR = "guide/";
const MEDIA_DIR = "media/";

const SECTION_ROLES = ["front_matter", "body", "glossary", "appendix"];
// 7.02.5: the one role whose words enter the word count formula.
const COUNTED_ROLE = "body";

// 7.02.7's test, quoted into every refusal that turns on it so an author
// never has to go looking for why the export was rejected.
export const ADDITIONAL_LEARNING_SENTENCE =
  "7.02.7 admits audio/video duration into the credit formula only when " +
  "the segment constitutes additional learning for the participant, that " +
  "is, not narration of the text. If the video reads the guide aloud it " +
  "does not belong in a text package.";

// Contract fields and their JSON types, named as Python names them so the
// messages match packages.py character for character.
const MANIFEST_FIELDS: Record<string, string> = {
  package_version: "int",
  lesson_id: "str",
  // Required since superCPE feature 004. course_code's match against the
  // course the lesson attaches to, and position's uniqueness within it,
  // need the course database and stay server-side, like rule 5's ffprobe
  // comparison; blankness and positivity are checked here (rule 2).
  course_code: "str",
  position: "int",
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
  blocks: "list",
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
const TEXT_MANIFEST_FIELDS: Record<string, string> = {
  package_version: "int",
  kind: "str",
  lesson_id: "str",
  course_code: "str",
  position: "int",
  title: "str",
  content_hash: "str",
  learning_objectives: "list",
  field_of_study: "str",
  knowledge_level: "str",
  prerequisites: "str",
  advance_preparation: "str",
  sources: "list",
  author: "dict",
  sections: "list",
  glossary_terms: "list",
};
const SECTION_FIELDS: Record<string, string> = { id: "str", file: "str", role: "str", title: "str" };
const MEDIA_FIELDS: Record<string, string> = { id: "str", file: "str", placement: "dict" };
const GLOSSARY_FIELDS: Record<string, string> = { term: "str", definition: "str" };

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

/**
 * Python's json.dumps(value, sort_keys=True, separators=(",", ":"),
 * ensure_ascii=False), byte for byte, for parsed-JSON values. Both repos
 * hash the parsed manifest through this canonical form (023a), so neither
 * side's indentation or key order can move the hash. JSON.stringify
 * already leaves non-ASCII as itself and prints numbers in shortest
 * round-trip form, matching Python for values that started as JSON.
 */
const canonicalJson = (value: unknown): string => {
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(",")}]`;
  return `{${Object.keys(value as Record<string, unknown>)
    .filter((k) => (value as Record<string, unknown>)[k] !== undefined)
    .sort()
    .map((k) => `${JSON.stringify(k)}:${canonicalJson((value as Record<string, unknown>)[k])}`)
    .join(",")}}`;
};

/**
 * The manifest's contribution to `content_hash`, for either kind (023a).
 * The hash cannot cover its own field, so `content_hash` is dropped
 * before serializing — which is also what lets the exporter compute the
 * digest first and write the finished manifest.json second.
 */
export const manifestHashBytes = (manifest: Record<string, unknown>): Buffer => {
  const withoutHash = Object.fromEntries(
    Object.entries(manifest).filter(([k]) => k !== "content_hash")
  );
  return Buffer.from(canonicalJson(withoutHash), "utf8");
};

/** The video package's hash: the manifest (canonical, without its own hash
 * field), then transcript.md, then questions.json, then video.mp4. */
export const computeContentHash = (
  manifest: Record<string, unknown>,
  transcript: Buffer,
  questions: Buffer,
  video: Buffer
): string =>
  createHash("sha256")
    .update(manifestHashBytes(manifest))
    .update(transcript)
    .update(questions)
    .update(video)
    .digest("hex");

/** The text package's hash: the manifest (canonical, without its own hash
 * field), then every section file in manifest order, then questions.json,
 * then every media file in manifest order. */
export const computeTextContentHash = (
  manifest: Record<string, unknown>,
  sections: Buffer[],
  questions: Buffer,
  media: Buffer[]
): string => {
  const digest = createHash("sha256").update(manifestHashBytes(manifest));
  for (const chunk of sections) digest.update(chunk);
  digest.update(questions);
  for (const chunk of media) digest.update(chunk);
  return digest.digest("hex");
};

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

/** Every regular file under dir, as "a/b.md" relative paths. */
const walkFiles = (dir: string, prefix = ""): string[] => {
  const files: string[] = [];
  for (const name of readdirSync(dir)) {
    if (name === ".DS_Store") continue;
    const path = join(dir, name);
    if (statSync(path).isDirectory()) {
      files.push(...walkFiles(path, `${prefix}${name}/`));
    } else {
      files.push(`${prefix}${name}`);
    }
  }
  return files;
};

/**
 * Read a package directory and return every contract violation, in the same
 * order packages.py reports them. Empty array means superCPE should accept
 * it (up to the server-side ffprobe checks, which export.ts covers).
 */
export function validatePackage(dir: string): string[] {
  const top = basename(dir);

  // Rule 1: package structure (directory form; the zip shape is export's job).
  let entries: string[];
  try {
    entries = readdirSync(dir).filter((n) => n !== ".DS_Store");
  } catch {
    return [`package: ${dir} is not a readable directory`];
  }
  const inner = new Set(walkFiles(dir));

  // The manifest names its own kind, so the layout rules cannot be chosen
  // until it has been read. A manifest that is missing or unreadable peeks
  // as `video`, which is also the contract's default for an absent `kind`
  // — so a broken package still gets the video package's refusals, word
  // for word, rather than a confusing complaint about a text layout it
  // never claimed.
  const kind = peekKind(dir, inner);
  if (kind === "text") {
    const layoutErrors = textLayoutErrors(top, inner);
    if (layoutErrors.length > 0) return layoutErrors;
    return validateTextPackage(dir, top, inner);
  }

  const errors: string[] = [];
  for (const f of PACKAGE_FILES) {
    if (!entries.includes(f)) errors.push(`package: missing required file ${top}/${f}`);
  }
  for (const f of entries.filter((n) => !PACKAGE_FILES.includes(n)).sort()) {
    errors.push(`package: unexpected file ${top}/${f}`);
  }
  if (errors.length > 0) return errors;
  return validateVideoPackage(dir);
}

/** The manifest's `kind`, or the contract's default when it cannot be read. */
function peekKind(dir: string, inner: Set<string>): string {
  if (!inner.has("manifest.json")) return "video";
  let manifest: unknown;
  try {
    manifest = JSON.parse(readFileSync(join(dir, "manifest.json"), "utf8"));
  } catch {
    return "video";
  }
  if (typeof manifest !== "object" || manifest === null || Array.isArray(manifest)) {
    return "video";
  }
  const kind = (manifest as Record<string, unknown>).kind ?? "video";
  return kind === "text" || kind === "video" ? (kind as string) : "video";
}

/** The text package's layout: two root files, markdown under guide/,
 * media under media/, nothing else. */
function textLayoutErrors(top: string, inner: Set<string>): string[] {
  const errors: string[] = [];
  for (const name of TEXT_ROOT_FILES) {
    if (!inner.has(name)) errors.push(`package: missing required file ${top}/${name}`);
  }
  const stray = [...inner]
    .filter(
      (name) =>
        !TEXT_ROOT_FILES.includes(name) &&
        !name.startsWith(GUIDE_DIR) &&
        !name.startsWith(MEDIA_DIR)
    )
    .sort();
  for (const name of stray) {
    errors.push(
      `package: unexpected file ${top}/${name}; a text package's files ` +
        `live in ${GUIDE_DIR} and ${MEDIA_DIR}`
    );
  }
  if (![...inner].some((name) => name.startsWith(GUIDE_DIR) && name.endsWith(".md"))) {
    errors.push(
      `package: a text package needs at least one markdown file in ` +
        `${top}/${GUIDE_DIR}; the guide is the program`
    );
  }
  return errors;
}

/** Rule 2: the package version and where the lesson belongs. Shared by
 * both kinds — a text package is placed into a course by the same
 * `course_code` and `position` a video package is. */
function validateIdentity(manifest: Record<string, unknown>, errors: string[]): void {
  const version = manifest.package_version;
  if (isInt(version) && version !== 1) {
    errors.push(`manifest.package_version: expected 1, received ${version}`);
  }
  if (hasType(manifest.course_code, "str") && (manifest.course_code as string).trim() === "") {
    errors.push("manifest.course_code: must be a non-blank string");
  }
  if (isInt(manifest.position) && (manifest.position as number) < 1) {
    errors.push(`manifest.position: must be a positive integer, got ${manifest.position}`);
  }
}

/** Rules 8-12: the facts 3.01.1, 3.02.1, and 8.01 make a participant able
 * to read before enrolling, plus the learning objectives every question
 * must map to. Identical for both package kinds. Returns the objective
 * ids. */
function validateDescriptors(
  manifest: Record<string, unknown>,
  errors: string[]
): Set<string> {
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

  return objectiveIds;
}

function validateVideoPackage(dir: string): string[] {
  const errors: string[] = [];

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

  // Rule 2.
  validateIdentity(manifest, errors);

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

    // Rule 18: measured block timings, so review questions can be placed
    // throughout the program at measured points (5.01.2.1). One entry per
    // narrated block, in playback order, ids matching transcript.md's
    // `## <block id>` headings, contiguous, ending at duration_seconds
    // within 1 second. "Values come from measured audio" is an attestation
    // carried by duration_source (rule 4); what is checkable here is the
    // structure. The first entry's start being the title sheet's duration
    // is video-tool's obligation and is not checkable from the package.
    const blocks = video.blocks;
    if (Array.isArray(blocks)) {
      const headings = transcriptBytes
        .toString("utf8")
        .split("\n")
        .filter((line) => line.startsWith("## "))
        .map((line) => line.slice(3).trim());
      if (blocks.length !== headings.length) {
        errors.push(
          `manifest.video.blocks: ${blocks.length} entries but transcript.md ` +
            `has ${headings.length} block headings; one entry per narrated block`
        );
      }
      if (isInt(video.narration_blocks) && blocks.length !== video.narration_blocks) {
        errors.push(
          `manifest.video.blocks: ${blocks.length} entries does not equal ` +
            `narration_blocks (${video.narration_blocks})`
        );
      }
      const isSeconds = (v: unknown): v is number =>
        typeof v === "number" && Number.isFinite(v);
      let prevEnd: number | null = null;
      blocks.forEach((entry, i) => {
        const label = `manifest.video.blocks[${i}]`;
        if (!hasType(entry, "dict")) {
          errors.push(`${label}: expected an object with id, start_seconds, end_seconds`);
          prevEnd = null;
          return;
        }
        const block = entry as Record<string, unknown>;
        const id = block.id;
        if (typeof id !== "string" || id.trim() === "") {
          errors.push(`${label}.id: must be a non-blank string`);
        } else if (blocks.length === headings.length && id !== headings[i]) {
          errors.push(
            `${label}.id: "${id}" does not match transcript.md heading ` +
              `"${headings[i]}" — entries are in playback order`
          );
        }
        const start = block.start_seconds;
        const end = block.end_seconds;
        if (!isSeconds(start)) {
          errors.push(`${label}.start_seconds: expected a number, got ${pyType(start)}`);
        }
        if (!isSeconds(end)) {
          errors.push(`${label}.end_seconds: expected a number, got ${pyType(end)}`);
        }
        if (!isSeconds(start) || !isSeconds(end)) {
          prevEnd = null;
          return;
        }
        if (start < 0) {
          errors.push(`${label}.start_seconds: must be >= 0, got ${start}`);
        }
        if (end <= start) {
          errors.push(
            `${label}: end_seconds (${end}) must be greater than start_seconds (${start})`
          );
        }
        if (prevEnd !== null && start !== prevEnd) {
          errors.push(
            `${label}.start_seconds: ${start} does not equal the previous ` +
              `entry's end_seconds (${prevEnd}); blocks are contiguous`
          );
        }
        prevEnd = end;
      });
      if (prevEnd !== null && isInt(video.duration_seconds)) {
        const drift = Math.abs((video.duration_seconds as number) - prevEnd);
        if (drift > 1) {
          errors.push(
            `manifest.video.blocks: last end_seconds (${prevEnd}) is ` +
              `${drift.toFixed(2)}s from duration_seconds ` +
              `(${video.duration_seconds}); they must agree within 1 second`
          );
        }
      }
    }
  }

  // Rule 6: content hash over the manifest + transcript + questions +
  // video bytes, in order.
  let videoBytes: Buffer;
  try {
    videoBytes = readFileSync(videoPath);
  } catch {
    videoBytes = Buffer.alloc(0);
  }
  const computedHash = computeContentHash(manifest, transcriptBytes, questionsBytes, videoBytes);
  const declaredHash = manifest.content_hash;
  if (typeof declaredHash === "string" && declaredHash.toLowerCase() !== computedHash) {
    errors.push(
      "manifest.content_hash: does not match sha256 over manifest.json + " +
        `transcript.md + questions.json + video.mp4 bytes; manifest says ` +
        `${declaredHash}, computed ${computedHash}. Package contents ` +
        "changed after export."
    );
  }

  // Rule 7.
  const wordCount = manifest.word_count;
  if (isInt(wordCount) && wordCount < 0) {
    errors.push(`manifest.word_count: must be >= 0, got ${wordCount}`);
  }

  // Rules 8-12.
  const objectiveIds = validateDescriptors(manifest, errors);

  // Rules 13-17: questions.
  if (questions !== null) {
    validateQuestions(questions, objectiveIds, video, errors, null);
  }

  return errors;
}

/**
 * Everything downstream of the layout for a text package (023), mirroring
 * packages.py's _validate_text minus ffprobe: media files are checked for
 * existence and placement here, measured by export.ts.
 */
function validateTextPackage(dir: string, top: string, inner: Set<string>): string[] {
  const errors: string[] = [];

  const questionsBytes = readFileSync(join(dir, "questions.json"));
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
  checkFields(manifest, TEXT_MANIFEST_FIELDS, "manifest", errors);
  if (hasType(manifest.author, "dict")) {
    checkFields(manifest.author as Record<string, unknown>, AUTHOR_FIELDS, "manifest.author", errors);
  }
  if ("media" in manifest && !Array.isArray(manifest.media)) {
    errors.push(`manifest.media: expected list, got ${pyType(manifest.media)}`);
    manifest.media = [];
  }

  // 7.02.5, structurally: superCPE counts the shipped body text, so a
  // declared count could only ever contradict it.
  if ("word_count" in manifest) {
    errors.push(
      "manifest.word_count: text packages must not declare a word " +
        "count; superCPE computes it from the body sections' markdown " +
        "(7.02.5). Remove the field."
    );
  }
  if ("av_is_additional_learning" in manifest) {
    errors.push(
      "manifest.av_is_additional_learning: belongs on each media " +
        "item in a text package, not on the manifest"
    );
  }
  if ("video" in manifest) {
    errors.push(
      "manifest.video: a text package has no video.mp4; supplemental " +
        `clips are listed in manifest.media and live in ${MEDIA_DIR}`
    );
  }

  // Rule 2.
  validateIdentity(manifest, errors);
  // Rules 8-12.
  const objectiveIds = validateDescriptors(manifest, errors);

  const { sectionKeys, sectionFiles, sectionBytes } = validateSections(
    manifest, dir, inner, errors
  );
  const mediaFiles = validateMedia(manifest, inner, sectionKeys, errors);
  validateGlossary(manifest, sectionKeys, errors);

  // Rules 13-17: questions, with rule 15's placement switched from
  // after_block to after_section.
  if (questions !== null) {
    validateQuestions(questions, objectiveIds, undefined, errors, sectionKeys);
  }

  // Every file in the package is named by the manifest: an unlisted
  // markdown file is either forgotten reading or a section quietly dropped
  // from the count, and neither should ingest silently.
  const named = new Set([...sectionFiles, ...mediaFiles]);
  const orphans = [...inner]
    .filter(
      (name) =>
        (name.startsWith(GUIDE_DIR) || name.startsWith(MEDIA_DIR)) && !named.has(name)
    )
    .sort();
  for (const name of orphans) {
    errors.push(
      `package: ${name} is in the zip but not listed in the manifest; ` +
        "every guide and media file must be named by a section or a " +
        "media item"
    );
  }

  // Rule 6, text form: content hash over the manifest + the section files
  // in manifest order + questions.json + the media files in manifest order.
  const mediaBytes = mediaFiles
    .filter((name) => inner.has(name))
    .map((name) => readFileSync(join(dir, name)));
  const computedHash = computeTextContentHash(manifest, sectionBytes, questionsBytes, mediaBytes);
  const declaredHash = manifest.content_hash;
  if (typeof declaredHash === "string" && declaredHash.toLowerCase() !== computedHash) {
    errors.push(
      "manifest.content_hash: does not match sha256 over manifest.json + " +
        "the section files in manifest order + questions.json + the media " +
        `files in manifest order; manifest says ${declaredHash}, computed ` +
        `${computedHash}. Package contents changed after export.`
    );
  }

  return errors;
}

/** The guide. Roles decide what 7.02.5 counts, so every one of them is
 * checked against the contract's four and at least one `body` section is
 * required — a text package with nothing to read is not a program. */
function validateSections(
  manifest: Record<string, unknown>,
  dir: string,
  inner: Set<string>,
  errors: string[]
): { sectionKeys: Set<string>; sectionFiles: string[]; sectionBytes: Buffer[] } {
  const sectionKeys = new Set<string>();
  const sectionFiles: string[] = [];
  const sectionBytes: Buffer[] = [];
  const roles: string[] = [];
  const raw = manifest.sections;
  if (!Array.isArray(raw)) return { sectionKeys, sectionFiles, sectionBytes };
  if (raw.length === 0) {
    errors.push("manifest.sections: must not be empty");
    return { sectionKeys, sectionFiles, sectionBytes };
  }

  raw.forEach((entry, i) => {
    const label = `manifest.sections[${i}]`;
    if (!hasType(entry, "dict")) {
      errors.push(`${label}: expected an object with id, file, role, title`);
      return;
    }
    const section = entry as Record<string, unknown>;
    if (!checkFields(section, SECTION_FIELDS, label, errors)) return;
    const key = section.id as string;
    if (key.trim() === "") {
      errors.push(`${label}.id: must be a non-blank string`);
      return;
    }
    if (sectionKeys.has(key)) {
      errors.push(`${label}.id: duplicate section id "${key}"`);
      return;
    }
    sectionKeys.add(key);
    if ((section.title as string).trim() === "") {
      errors.push(`${label}.title: must be a non-blank string`);
    }
    if (!SECTION_ROLES.includes(section.role as string)) {
      errors.push(
        `${label}.role: "${section.role}" is not one of ` +
          `${SECTION_ROLES.join(", ")}; only '${COUNTED_ROLE}' sections ` +
          "enter the word count (7.02.5)"
      );
    }
    const name = section.file as string;
    if (!name.startsWith(GUIDE_DIR)) {
      errors.push(`${label}.file: "${name}" must live under ${GUIDE_DIR}`);
      return;
    }
    if (!inner.has(name)) {
      errors.push(`${label}.file: "${name}" is not in the package`);
      return;
    }
    const data = readFileSync(join(dir, name));
    let markdown: string;
    try {
      markdown = new TextDecoder("utf-8", { fatal: true }).decode(data);
    } catch {
      errors.push(`${name}: not valid UTF-8`);
      return;
    }
    if (markdown.trim() === "") {
      errors.push(`${name}: is blank; a section must have content`);
      return;
    }
    sectionBytes.push(data);
    sectionFiles.push(name);
    roles.push(section.role as string);
  });

  if (roles.length > 0 && !roles.includes(COUNTED_ROLE)) {
    errors.push(
      `manifest.sections: at least one '${COUNTED_ROLE}' section is ` +
        "required; only body sections are counted as required reading " +
        "(7.02.5), so a package without one measures zero words"
    );
  }
  return { sectionKeys, sectionFiles, sectionBytes };
}

/** Supplemental clips. Every one must claim additional learning; the
 * ffprobe measurement packages.py performs here runs in export.ts. */
function validateMedia(
  manifest: Record<string, unknown>,
  inner: Set<string>,
  sectionKeys: Set<string>,
  errors: string[]
): string[] {
  const files: string[] = [];
  const raw = (manifest.media ?? []) as unknown;
  if (!Array.isArray(raw)) return files;

  const seen = new Set<string>();
  raw.forEach((entry, i) => {
    const label = `manifest.media[${i}]`;
    if (!hasType(entry, "dict")) {
      errors.push(
        `${label}: expected an object with id, file, placement, av_is_additional_learning`
      );
      return;
    }
    const item = entry as Record<string, unknown>;
    if (!checkFields(item, MEDIA_FIELDS, label, errors)) return;
    const key = item.id as string;
    if (key.trim() === "") {
      errors.push(`${label}.id: must be a non-blank string`);
      return;
    }
    if (seen.has(key)) {
      errors.push(`${label}.id: duplicate media id "${key}"`);
      return;
    }
    seen.add(key);

    if (item.av_is_additional_learning !== true) {
      errors.push(
        `${label}.av_is_additional_learning: must be true. ` + ADDITIONAL_LEARNING_SENTENCE
      );
    }

    // packages.py drops an item with an invalid placement before hashing
    // its bytes; mirror that so the hash covers the same files.
    let placementOk = true;
    const afterSection = (item.placement as Record<string, unknown>).after_section;
    if (typeof afterSection !== "string" || afterSection.trim() === "") {
      errors.push(
        `${label}.placement.after_section: must name the section this clip plays after`
      );
      placementOk = false;
    } else if (!sectionKeys.has(afterSection)) {
      errors.push(
        `${label}.placement.after_section: "${afterSection}" is not ` +
          "a section id in this manifest"
      );
      placementOk = false;
    }

    const name = item.file as string;
    if (!name.startsWith(MEDIA_DIR)) {
      errors.push(`${label}.file: "${name}" must live under ${MEDIA_DIR}`);
      return;
    }
    if (!inner.has(name)) {
      errors.push(`${label}.file: "${name}" is not in the package`);
      return;
    }
    const declared = item.duration_seconds;
    if (declared !== undefined && declared !== null && !isInt(declared)) {
      errors.push(
        `${label}.duration_seconds: expected int or null, got ${pyType(declared)}`
      );
    }
    if (placementOk) files.push(name);
  });
  return files;
}

/** glossary_terms (4.05.3 item 3). An empty list is packages.py's one
 * warning, not an error; export.ts and check-lessons.ts print it. */
function validateGlossary(
  manifest: Record<string, unknown>,
  sectionKeys: Set<string>,
  errors: string[]
): void {
  const raw = manifest.glossary_terms;
  if (!Array.isArray(raw) || raw.length === 0) return;
  const seen = new Set<string>();
  raw.forEach((entry, i) => {
    const label = `manifest.glossary_terms[${i}]`;
    if (!hasType(entry, "dict")) {
      errors.push(`${label}: expected an object with term and definition`);
      return;
    }
    const item = entry as Record<string, unknown>;
    if (!checkFields(item, GLOSSARY_FIELDS, label, errors)) return;
    const term = (item.term as string).trim();
    if (term === "") {
      errors.push(`${label}.term: must be a non-blank string`);
      return;
    }
    if (seen.has(term)) {
      errors.push(`${label}.term: duplicate term "${term}"`);
    }
    seen.add(term);
    if ((item.definition as string).trim() === "") {
      errors.push(`${label}.definition: must be a non-blank string`);
    }
    const sectionId = item.section_id;
    if (sectionId !== undefined && sectionId !== null && !sectionKeys.has(sectionId as string)) {
      errors.push(
        `${label}.section_id: "${sectionId}" is not a section id in this manifest`
      );
    }
  });
}

/** Rules 13-17. `sectionKeys` is given for a text package and switches
 * rule 15's placement from `after_block` to `after_section`: the same
 * 5.01.2.1 requirement — review questions "placed throughout the program
 * in sufficient intervals" — expressed in the two media. */
function validateQuestions(
  questions: unknown[],
  objectiveIds: Set<string>,
  video: Record<string, unknown> | undefined,
  errors: string[],
  sectionKeys: Set<string> | null
): void {
  // Rule 13.
  if (questions.length === 0) {
    errors.push("questions: must not be empty");
  }
  const seenIds = new Set<string>();
  const narrationBlocks =
    video !== undefined && hasType(video, "dict")
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
      if (sectionKeys === null) {
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
        const afterSection = question.after_section;
        if (typeof afterSection !== "string" || afterSection.trim() === "") {
          errors.push(
            `${label}.after_section: review questions in a text ` +
              "package require the id of the section they follow"
          );
        } else if (!sectionKeys.has(afterSection)) {
          errors.push(
            `${label}.after_section: "${afterSection}" is not a ` +
              "section id in this manifest"
          );
        }
        if ("after_block" in question) {
          errors.push(
            `${label}.after_block: a text package places review ` +
              "questions by after_section, not after_block"
          );
        }
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
      if ("after_section" in question) {
        errors.push(
          `${label}.after_section: assessment questions must not have after_section`
        );
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
