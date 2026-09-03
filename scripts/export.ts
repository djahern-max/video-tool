#!/usr/bin/env node
/**
 * Export one lesson as a course package for superCPE to ingest.
 *
 *   npm run export -- --lesson 01
 *
 * Produces dist/<lesson_id>.zip in exactly the shape docs/course-package.md
 * describes, refusing — with the reason — anything superCPE would reject:
 * an unreviewed lesson, estimated durations, a stale render, an ERROR from
 * check-lessons.ts's authoring rules, or any contract violation
 * validate-package.ts can see.
 *
 * Two branches on `meta.kind` (023): a video lesson packages its rendered
 * mp4, transcript, and questions as always; a `kind: "text"` lesson
 * packages manifest.json + guide/*.md + optional media/* + questions.json,
 * prints the 7.02.5 word-count preview and the credit estimate, and never
 * touches Remotion or a render. In every refusal case nothing is created
 * under dist/: the named refusals all run before the package directory is
 * built, and a validate-package failure removes what was built.
 *
 * content_hash (023a, both kinds): the manifest is hashed first, in
 * canonical form with the content_hash key absent, so the digest is
 * computed before the finished manifest.json is written.
 *
 * The zip is written by the minimal writer at the bottom of this file
 * (node:zlib deflate + a hand-assembled PKZIP container) rather than a
 * dependency: the format is three record types, and every package is
 * round-trip-checked by validatePackage before zipping anyway.
 */

import { execFileSync } from "node:child_process";
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { deflateRawSync } from "node:zlib";

import { COURSES } from "../src/course";
import { isTextLesson, LESSONS, type LessonId } from "../src/lessons";
import type { PackageLessonMeta, Question, TextLessonMeta } from "../src/types";
import { QUESTIONS_FILE } from "../src/questions";
import {
  checkCourseQuestions,
  checkLessonById,
  courseScopeOf,
  type Finding,
} from "./check-lessons";
import { MODEL_ID, TTS_PROVIDER } from "./generate-audio";
import { printTextPreview, sectionWordCounts } from "./text-preview";
import {
  ADDITIONAL_LEARNING_SENTENCE,
  computeContentHash,
  computeTextContentHash,
  validatePackage,
} from "./validate-package";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

type Block = {
  id: string;
  sheet: string;
  narration: string;
};

type LessonModule = {
  meta: PackageLessonMeta;
  blocks: Block[];
  transcriptOf: (b: Block) => string;
  hasAudio: (b: Block) => boolean;
  durationOf: (b: Block) => number;
  usingEstimates: boolean;
  totalSeconds: number;
};

const refuse = (message: string): never => {
  console.error(`\n  export refused: ${message}\n`);
  process.exit(1);
};

/**
 * `npm run check`'s rules, run as an export gate.
 *
 * Until this existed, export never called check-lessons.ts, so a lesson could
 * fail `npm run check` and still export a clean-looking package — the gate
 * that would otherwise catch a defective package before it reached a NASBA
 * Registry application. ERROR refuses; WARN prints and ships.
 *
 * WARN levels were calibrated for a script an author ran voluntarily, where
 * "look at this" was the whole meaning. At a gate, WARN means "we shipped it."
 * No level was changed here; the reassessment is a separate decision.
 */
const gateOnLessonChecks = (lessonId: LessonId): void => {
  // The course-wide question rules run over every registered lesson —
  // duplicate stems are cross-lesson and cannot be checked from one package.
  // Export acts only on the findings naming this lesson: a collision
  // involving it names it, so it still fires, while an unrelated draft
  // lesson's breakage does not block a finished one. Course-wide check,
  // lesson-scoped action.
  //
  // A finding's lesson is `Finding.lessons`, an explicit field on the finding
  // itself. `Finding.block` is a display label — "b-03 S-02", "meta",
  // "01 q-07" — and matching a prefix against it would be guessing.
  const findings: Finding[] = [
    ...checkLessonById(lessonId),
    ...checkCourseQuestions(courseScopeOf(lessonId)),
  ].filter((f) => f.lessons.includes(lessonId));

  for (const f of findings.filter((f) => f.level === "WARN")) {
    console.warn(`  warn  ${f.block}  ${f.message}`);
  }

  const errors = findings.filter((f) => f.level === "ERROR");
  if (errors.length > 0) {
    console.error(
      `\n  export refused: lesson ${lessonId} fails ${errors.length} authoring ` +
        `check(s) — the same rules \`npm run check\` runs:\n`
    );
    for (const f of errors) console.error(`    ${f.block}  ${f.message}`);
    console.error("");
    process.exit(1);
  }
};

/** ELEVENLABS_VOICE_ID from .env (same file generate-audio.ts reads). */
const voiceIdFromEnv = (): string => {
  const envPath = join(root, ".env");
  if (existsSync(envPath)) {
    for (const line of readFileSync(envPath, "utf8").split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      if (!process.env[key]) {
        process.env[key] = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
      }
    }
  }
  const voiceId = process.env.ELEVENLABS_VOICE_ID;
  if (!voiceId) {
    refuse(
      "ELEVENLABS_VOICE_ID is not set (in .env or the environment). The " +
        "manifest's tts_voice_id must record the voice the narration was " +
        "generated with."
    );
  }
  return voiceId!;
};

const ffprobeSeconds = (path: string): number => {
  let output: string;
  try {
    output = execFileSync(
      "ffprobe",
      ["-v", "error", "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", path],
      { encoding: "utf8" }
    );
  } catch (error) {
    return refuse(
      `ffprobe failed on ${path}: ${(error as Error).message}. ffprobe (system ` +
        "ffmpeg) is required at export; the duration must be measured off the artifact."
    );
  }
  const parsed = Number.parseFloat(output.trim());
  if (!Number.isFinite(parsed)) {
    return refuse(`ffprobe returned no duration for ${path} (got ${JSON.stringify(output.trim())})`);
  }
  return parsed;
};

/** The course record holding this package id, and the lesson's row in it. */
const courseFor = (packageId: string) => {
  for (const course of COURSES) {
    const courseLesson = course.lessons.find((l) => l.lessonId === packageId);
    if (courseLesson) return { course, courseLesson };
  }
  return refuse(
    `lesson_id ${packageId} has no entry in any COURSES record (src/course.ts). ` +
      `The manifest's course_code and position are read from the course record.`
  );
};

const main = () => {
  const args = process.argv.slice(2);
  const at = args.indexOf("--lesson");
  const lessonId = (at !== -1 ? args[at + 1] : undefined) as LessonId | undefined;

  if (!lessonId || !(lessonId in LESSONS)) {
    console.error(
      `\n  Usage: npm run export -- --lesson <id>` +
        `\n  Ids: ${Object.keys(LESSONS).sort().join(", ")}\n`
    );
    process.exit(1);
  }

  const questionsPath = join(root, "src", QUESTIONS_FILE[lessonId]);
  const questionsBytes = readFileSync(questionsPath);
  const questions = JSON.parse(questionsBytes.toString("utf8")) as Question[];

  if (isTextLesson(lessonId)) {
    exportTextLesson(lessonId, questionsBytes, questions);
    return;
  }

  // 1. The lesson module and its questions.
  const lesson = LESSONS[lessonId] as unknown as LessonModule;
  const meta = lesson.meta;

  // 2. meta.status is the single authority on whether a lesson may ship.
  if (meta.status !== "reviewed") {
    refuse(
      `lesson ${lessonId}'s meta.status is "${meta.status}". Only "reviewed" ` +
        `exports (4.01.1, 4.02): work through drafts/${meta.courseCode}-review.md, ` +
        `then set status: "reviewed" by hand — LESSON-RUNBOOK.md step 6. ` +
        `Nothing in the tooling sets it.`
    );
  }

  // 3. Measured narration only (7.02.7).
  if (lesson.usingEstimates) {
    const missing = lesson.blocks
      .filter((b) => b.narration.trim().length > 0 && !lesson.hasAudio(b))
      .map((b) => `${b.id} (${b.sheet})`);
    refuse(
      `lesson ${lessonId} is still using estimated durations; blocks without ` +
        `generated audio: ${missing.join(", ")}. Export requires measured ` +
        `narration under 7.02.7 — the credit formula's runtime must be real. ` +
        `Generating audio spends ElevenLabs credits and is the human's step.`
    );
  }

  // 4. The authoring checks, before the author is told to go and render:
  // being sent back to Remotion only to be told the questions are wrong is
  // the wrong order to learn it in.
  gateOnLessonChecks(lessonId);

  // 5. The render must exist and agree with the audio metadata.
  const videoSource = join(root, "out", `lesson-${lessonId}.mp4`);
  if (!existsSync(videoSource)) {
    refuse(
      `${videoSource} does not exist. Run \`npm run render -- --lesson ` +
        `${lessonId}\` first; export packages the rendered artifact, not the source.`
    );
  }
  const measuredSeconds = ffprobeSeconds(videoSource);
  if (Math.abs(measuredSeconds - lesson.totalSeconds) > 1) {
    refuse(
      `out/lesson-${lessonId}.mp4 measures ${measuredSeconds.toFixed(2)}s but the ` +
        `audio metadata totals ${lesson.totalSeconds.toFixed(2)}s — the render is ` +
        `stale relative to the audio metadata. Re-run \`npm run render -- ` +
        `--lesson ${lessonId}\`.`
    );
  }

  // 6. Build dist/<lesson_id>/. The manifest lesson_id is meta.courseCode —
  // the globally unique code — not meta.lessonId, the module selector.
  const packageId = meta.courseCode;
  const { course, courseLesson } = courseFor(packageId);
  const packageDir = join(root, "dist", packageId);
  rmSync(packageDir, { recursive: true, force: true });
  mkdirSync(packageDir, { recursive: true });

  copyFileSync(videoSource, join(packageDir, "video.mp4"));

  const narrated = lesson.blocks.filter((b) => b.narration.trim().length > 0);
  const transcript =
    narrated.map((b) => `## ${b.id}\n\n${lesson.transcriptOf(b)}`).join("\n\n") + "\n";
  writeFileSync(join(packageDir, "transcript.md"), transcript);

  // Verbatim bytes: the content hash is over the file, not a re-serialization.
  writeFileSync(join(packageDir, "questions.json"), questionsBytes);

  const audioDir = join(root, "public", "audio", lessonId);
  const measuredAtMs = Math.max(
    ...readdirSync(audioDir)
      .filter((f) => f.endsWith(".mp3"))
      .map((f) => statSync(join(audioDir, f)).mtimeMs)
  );
  const measuredAt = new Date(measuredAtMs).toISOString().replace(/\.\d{3}Z$/, "Z");

  // Where each narrated block starts and ends, measured, so superCPE can
  // pause the video for review questions at the right second. The cursor
  // walks every block in playback order; the title sheet (the only
  // unnarrated block) contributes only its offset. Its length is a fixed
  // render constant, not an estimate of speech, so it is not subject to the
  // 7.02.7 measured-durations rule; every narrated duration here is
  // measured, because step 3 refused the export otherwise.
  const round3 = (seconds: number) => Math.round(seconds * 1000) / 1000;
  const blockTimings: { id: string; start_seconds: number; end_seconds: number }[] = [];
  let cursor = 0;
  for (const b of lesson.blocks) {
    const start = round3(cursor);
    cursor += lesson.durationOf(b);
    if (b.narration.trim().length > 0) {
      blockTimings.push({ id: b.id, start_seconds: start, end_seconds: round3(cursor) });
    }
  }

  // The hash cannot cover its own field (023a): the manifest is built
  // first, hashed in canonical form with content_hash absent, and the
  // finished manifest.json is written second. The placeholder below is
  // dropped by manifestHashBytes before hashing either way.
  const manifest = {
    package_version: 1,
    lesson_id: packageId,
    title: meta.title,
    content_hash: "",

    video: {
      duration_seconds: Math.round(measuredSeconds),
      duration_source: "measured",
      measured_at: measuredAt,
      narration_blocks: narrated.length,
      tts_provider: TTS_PROVIDER,
      tts_voice_id: voiceIdFromEnv(),
      tts_model: MODEL_ID,
      blocks: blockTimings,
    },

    learning_objectives: meta.learningObjectives,
    field_of_study: meta.nasbaFieldOfStudy,
    knowledge_level: meta.knowledgeLevel,
    prerequisites: meta.prerequisites,
    advance_preparation: meta.advancePreparation,
    sources: meta.sources,
    author: {
      name: meta.author.name,
      credentials: meta.author.credentials,
      license_jurisdiction: meta.author.licenseJurisdiction,
      license_number: meta.author.licenseNumber,
    },
    word_count: meta.wordCount,
    av_is_additional_learning: meta.avIsAdditionalLearning,

    // course_code and position are contract fields since superCPE feature
    // 004 formalized them: the course's code and the lesson's integer order
    // within it, both read from the course record — not meta.courseCode
    // (which is this lesson's package id) and not meta.position (a display
    // string). delivery_method and revision are not (yet) in the contract:
    // packages.py rule 3 checks required fields only and tolerates unknown
    // keys, so they ride along under their eventual names.
    course_code: course.courseCode,
    position: courseLesson.position,
    delivery_method: meta.deliveryMethod,
    revision: meta.revision,
  };
  manifest.content_hash = computeContentHash(
    manifest,
    Buffer.from(transcript),
    questionsBytes,
    readFileSync(join(packageDir, "video.mp4"))
  );
  writeFileSync(join(packageDir, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");

  // 7. The same rules superCPE will run, before anything leaves this machine.
  const violations = validatePackage(packageDir);
  if (violations.length > 0) {
    console.error(`\n  export refused: the package fails ${violations.length} contract rule(s):\n`);
    for (const message of violations) console.error(`    ${message}`);
    console.error("");
    rmSync(packageDir, { recursive: true, force: true });
    process.exit(1);
  }

  // 8. Zip, with the package directory as the single top-level entry.
  const zipPath = join(root, "dist", `${packageId}.zip`);
  const files = ["manifest.json", "video.mp4", "transcript.md", "questions.json"];
  writeZip(
    zipPath,
    files.map((name) => ({
      name: `${packageId}/${name}`,
      data: readFileSync(join(packageDir, name)),
    }))
  );

  const minutes = Math.floor(measuredSeconds / 60);
  const seconds = Math.round(measuredSeconds % 60);
  console.log(`\n  ${zipPath}`);
  console.log(
    `  ${packageId} · ${minutes}m ${String(seconds).padStart(2, "0")}s measured · ` +
      `${narrated.length} narrated blocks · ${questions.length} questions\n`
  );
};

/* ------------------------------------------------------------------ */
/* Text packages (023)                                                 */
/* ------------------------------------------------------------------ */

/**
 * Export a `kind: "text"` lesson: manifest.json + guide/*.md + optional
 * media/* + questions.json. Every refusal below runs before anything is
 * created under dist/; the post-build validatePackage pass removes the
 * directory if it fails, exactly as the video branch does.
 */
function exportTextLesson(
  lessonId: LessonId,
  questionsBytes: Buffer,
  questions: Question[]
): void {
  const meta = LESSONS[lessonId].meta as TextLessonMeta;
  const packageId = meta.courseCode;
  const guideDir = join(root, "guide", lessonId);

  // meta.status keeps its authority, same as the video branch (step 2).
  if (meta.status !== "reviewed") {
    refuse(
      `lesson ${lessonId}'s meta.status is "${meta.status}". Only "reviewed" ` +
        `exports (4.01.1, 4.02): work through drafts/${meta.courseCode}-review.md, ` +
        `then set status: "reviewed" by hand — LESSON-RUNBOOK.md step 6. ` +
        `Nothing in the tooling sets it.`
    );
  }

  gateOnLessonChecks(lessonId);

  // The contract forbids word_count on a text package: superCPE computes
  // it from the shipped body sections (7.02.5). A module that smuggles one
  // in is asking for a trusted number where a computed one is the point.
  if ("wordCount" in meta) {
    refuse(
      `lesson ${lessonId} carries a wordCount, and a text package's manifest ` +
        `must not declare word_count — superCPE computes it from the body ` +
        `sections' markdown (7.02.5). Remove the field from meta.`
    );
  }

  // 7.02.5's structure: a guide with nothing to read is not a program, and
  // 4.05.3 item 4 requires the front-matter block.
  const roles = meta.sections.map((s) => s.role);
  if (!roles.includes("body")) {
    refuse(
      `lesson ${lessonId} has no "body" section. Only body sections are ` +
        `counted as required reading (7.02.5); a text package without one ` +
        `measures zero words and superCPE will not publish it.`
    );
  }
  if (!roles.includes("front_matter")) {
    refuse(
      `lesson ${lessonId} has no "front_matter" section. 4.05.3 item 4 ` +
        `requires the "How this course works" block; start from the template ` +
        `in docs/course-package.md and list the file with role "front_matter".`
    );
  }

  // 7.02.7's test, per clip, before anything is measured or copied.
  const media = meta.media ?? [];
  for (const item of media) {
    if (item.avIsAdditionalLearning !== true) {
      refuse(
        `media item ${item.id} does not claim avIsAdditionalLearning: true. ` +
          ADDITIONAL_LEARNING_SENTENCE
      );
    }
  }
  const sectionIds = new Set(meta.sections.map((s) => s.id));
  for (const item of media) {
    if (!sectionIds.has(item.placement.afterSection)) {
      refuse(
        `media item ${item.id} is placed after_section "${item.placement.afterSection}", ` +
          `which is not a section id of lesson ${lessonId}.`
      );
    }
  }

  // Review placement (5.01.2.1): every after_section must name a real
  // section. Assessment questions carry no placement.
  for (const q of questions) {
    if (q.kind === "review") {
      if (!q.after_section || !sectionIds.has(q.after_section)) {
        refuse(
          `question ${q.id} is placed after_section ` +
            `${JSON.stringify(q.after_section ?? null)}, which is not a section id of ` +
            `lesson ${lessonId}. Review questions in a text lesson are placed ` +
            `on real sections (5.01.2.1).`
        );
      }
    } else if (q.after_section !== undefined) {
      refuse(`question ${q.id} is an assessment question and must not carry after_section.`);
    }
  }

  // The authored files, before any dist/ write.
  const sectionBytes: Buffer[] = [];
  for (const s of meta.sections) {
    const path = join(guideDir, s.file);
    if (!existsSync(path)) {
      refuse(
        `section ${s.id}'s file ${path} does not exist. A text lesson's ` +
          `sections live under guide/${lessonId}/ as plain markdown.`
      );
    }
    sectionBytes.push(readFileSync(path));
  }

  // Clips are rendered artifacts; ffprobe each one, truncating down so a
  // term of the formula may understate, never overstate (7.02.6).
  const measuredMedia = media.map((item) => {
    const sourcePath = join(root, item.file);
    if (!existsSync(sourcePath)) {
      refuse(
        `media item ${item.id}'s file ${sourcePath} does not exist. Clips are ` +
          `produced by the existing pipeline and referenced from the repo root.`
      );
    }
    const seconds = Math.trunc(ffprobeSeconds(sourcePath));
    if (seconds < 1) {
      refuse(
        `media item ${item.id}: ffprobe measured under one second; a ` +
          `supplemental clip that short contributes no countable ` +
          `audio/video duration time (7.02.7).`
      );
    }
    return { item, sourcePath, seconds };
  });

  const { course, courseLesson } = courseFor(packageId);

  // The manifest, hashed with content_hash absent (023a), written after.
  const manifest: Record<string, unknown> = {
    package_version: 1,
    kind: "text",
    lesson_id: packageId,
    title: meta.title,
    content_hash: "",

    learning_objectives: meta.learningObjectives,
    field_of_study: meta.nasbaFieldOfStudy,
    knowledge_level: meta.knowledgeLevel,
    prerequisites: meta.prerequisites,
    advance_preparation: meta.advancePreparation,

    sections: meta.sections.map((s) => ({
      id: s.id,
      file: `guide/${s.file}`,
      role: s.role,
      title: s.title,
    })),
    media: measuredMedia.map(({ item, seconds }) => ({
      id: item.id,
      file: `media/${basename(item.file)}`,
      placement: { after_section: item.placement.afterSection },
      av_is_additional_learning: true,
      duration_seconds: seconds,
    })),
    glossary_terms: meta.glossaryTerms.map((t) => ({
      term: t.term,
      definition: t.definition,
      ...(t.sectionId !== undefined ? { section_id: t.sectionId } : {}),
    })),

    sources: meta.sources,
    author: {
      name: meta.author.name,
      credentials: meta.author.credentials,
      license_jurisdiction: meta.author.licenseJurisdiction,
      license_number: meta.author.licenseNumber,
    },
    course_code: course.courseCode,
    position: courseLesson.position,
    delivery_method: meta.deliveryMethod,
    revision: meta.revision,
  };
  manifest.content_hash = computeTextContentHash(
    manifest,
    sectionBytes,
    questionsBytes,
    measuredMedia.map(({ sourcePath }) => readFileSync(sourcePath))
  );

  // Nothing above wrote a byte; everything below builds dist/<packageId>/.
  const packageDir = join(root, "dist", packageId);
  rmSync(packageDir, { recursive: true, force: true });
  mkdirSync(join(packageDir, "guide"), { recursive: true });
  writeFileSync(join(packageDir, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
  meta.sections.forEach((s, i) => {
    writeFileSync(join(packageDir, "guide", s.file), sectionBytes[i]);
  });
  // Verbatim bytes: the content hash is over the file, not a re-serialization.
  writeFileSync(join(packageDir, "questions.json"), questionsBytes);
  if (measuredMedia.length > 0) {
    mkdirSync(join(packageDir, "media"), { recursive: true });
    for (const { item, sourcePath } of measuredMedia) {
      copyFileSync(sourcePath, join(packageDir, "media", basename(item.file)));
    }
  }

  // The same rules superCPE will run, before anything leaves this machine.
  const violations = validatePackage(packageDir);
  if (violations.length > 0) {
    console.error(`\n  export refused: the package fails ${violations.length} contract rule(s):\n`);
    for (const message of violations) console.error(`    ${message}`);
    console.error("");
    rmSync(packageDir, { recursive: true, force: true });
    process.exit(1);
  }
  if (meta.glossaryTerms.length === 0) {
    // packages.py's one ingest warning; the publish gate refuses (4.05.3).
    console.warn(
      "\n  warning: glossary_terms is empty — superCPE ingests with a warning " +
        "and refuses to publish a course whose text lessons define no key terms (4.05.3)."
    );
  }

  // Task 5: the per-section 7.02.5 accounting and the credit estimate.
  const clipSeconds = measuredMedia.reduce((sum, m) => sum + m.seconds, 0);
  printTextPreview(sectionWordCounts(meta, guideDir), questions.length, clipSeconds);

  // Zip, with the package directory as the single top-level entry.
  const zipPath = join(root, "dist", `${packageId}.zip`);
  const files = [
    "manifest.json",
    ...meta.sections.map((s) => `guide/${s.file}`),
    "questions.json",
    ...measuredMedia.map(({ item }) => `media/${basename(item.file)}`),
  ];
  writeZip(
    zipPath,
    files.map((name) => ({
      name: `${packageId}/${name}`,
      data: readFileSync(join(packageDir, name)),
    }))
  );

  console.log(`\n  ${zipPath}`);
  console.log(
    `  ${packageId} · text · ${meta.sections.length} sections · ` +
      `${measuredMedia.length} clip(s) · ${questions.length} questions\n`
  );
}

/* ------------------------------------------------------------------ */
/* Minimal PKZIP writer                                                */
/* ------------------------------------------------------------------ */

const CRC_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c >>> 0;
  }
  return table;
})();

const crc32 = (buf: Buffer): number => {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
};

const dosDateTime = (date: Date): { time: number; date: number } => ({
  time: (date.getHours() << 11) | (date.getMinutes() << 5) | (date.getSeconds() >> 1),
  date: ((date.getFullYear() - 1980) << 9) | ((date.getMonth() + 1) << 5) | date.getDate(),
});

/** Store when deflate does not help (video.mp4), deflate otherwise. */
function writeZip(zipPath: string, entries: { name: string; data: Buffer }[]): void {
  const now = dosDateTime(new Date());
  const chunks: Buffer[] = [];
  const central: Buffer[] = [];
  let offset = 0;

  for (const { name, data } of entries) {
    const deflated = deflateRawSync(data, { level: 9 });
    const useDeflate = deflated.length < data.length;
    const stored = useDeflate ? deflated : data;
    const method = useDeflate ? 8 : 0;
    const crc = crc32(data);
    const nameBytes = Buffer.from(name, "utf8");

    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4); // version needed
    local.writeUInt16LE(0, 6); // flags
    local.writeUInt16LE(method, 8);
    local.writeUInt16LE(now.time, 10);
    local.writeUInt16LE(now.date, 12);
    local.writeUInt32LE(crc, 14);
    local.writeUInt32LE(stored.length, 18);
    local.writeUInt32LE(data.length, 22);
    local.writeUInt16LE(nameBytes.length, 26);
    local.writeUInt16LE(0, 28); // extra length
    chunks.push(local, nameBytes, stored);

    const dir = Buffer.alloc(46);
    dir.writeUInt32LE(0x02014b50, 0);
    dir.writeUInt16LE(20, 4); // version made by
    dir.writeUInt16LE(20, 6); // version needed
    dir.writeUInt16LE(0, 8); // flags
    dir.writeUInt16LE(method, 10);
    dir.writeUInt16LE(now.time, 12);
    dir.writeUInt16LE(now.date, 14);
    dir.writeUInt32LE(crc, 16);
    dir.writeUInt32LE(stored.length, 20);
    dir.writeUInt32LE(data.length, 24);
    dir.writeUInt16LE(nameBytes.length, 28);
    // extra, comment, disk, internal attrs, external attrs: all zero.
    dir.writeUInt32LE(offset, 42);
    central.push(Buffer.concat([dir, nameBytes]));

    offset += local.length + nameBytes.length + stored.length;
  }

  const centralBytes = Buffer.concat(central);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(entries.length, 8);
  end.writeUInt16LE(entries.length, 10);
  end.writeUInt32LE(centralBytes.length, 12);
  end.writeUInt32LE(offset, 16);
  writeFileSync(zipPath, Buffer.concat([...chunks, centralBytes, end]));
}

main();
