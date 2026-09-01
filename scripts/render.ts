#!/usr/bin/env node
/**
 * Render one lesson's composition to out/lesson-<id>.mp4.
 *
 *   npm run render -- --lesson 01
 *
 * A thin wrapper over `remotion render Lesson<id>`, replacing the per-lesson
 * npm scripts. Rendering is free and repeatable; the MP4 is reproducible from
 * what is committed and lives in gitignored out/.
 */

import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { isTextLesson, LESSONS, type LessonId } from "../src/lessons";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const args = process.argv.slice(2);
const at = args.indexOf("--lesson");
const lessonId = at !== -1 ? args[at + 1] : undefined;

if (!lessonId || !(lessonId in LESSONS)) {
  console.error(
    `\n  Usage: npm run render -- --lesson <id>` +
      `\n  Ids: ${Object.keys(LESSONS).sort().join(", ")}\n`
  );
  process.exit(1);
}

if (isTextLesson(lessonId as LessonId)) {
  console.error(
    `\n  Lesson ${lessonId} is a text lesson — a study guide with no ` +
      `composition to render. Export it directly: npm run export -- --lesson ${lessonId}\n`
  );
  process.exit(1);
}

const outPath = join("out", `lesson-${lessonId}.mp4`);
const result = spawnSync("npx", ["remotion", "render", `Lesson${lessonId}`, outPath], {
  cwd: root,
  stdio: "inherit",
});

process.exit(result.status ?? 1);
