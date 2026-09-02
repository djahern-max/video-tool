/**
 * The three registry edits that `npm run new` and `npm run retire` share.
 *
 * Registering a lesson means four things in three files: an import and a map
 * entry in `src/lessons.ts`, an import and two map entries in
 * `src/questions.ts`, and — for a lesson that has been placed in a course —
 * an outline entry in `src/course.ts`. Doing that by hand has been done
 * twice and got a different one of them wrong each time, which is the whole
 * reason these commands exist. Both commands go through this file so they
 * cannot disagree about the shape of what they write and remove.
 *
 * These are line-oriented text edits, not an AST rewrite: the files are
 * hand-written and hand-read, and preserving their comments and spacing
 * exactly matters more than tolerating arbitrary formatting. The two
 * registry files carry a comment saying to keep one import and one entry per
 * line; that comment is this module's contract.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

export const LESSONS_TS = "src/lessons.ts";
export const QUESTIONS_TS = "src/questions.ts";
export const COURSE_TS = "src/course.ts";

const read = (root: string, rel: string) => readFileSync(join(root, rel), "utf8");
const write = (root: string, rel: string, lines: string[]) =>
  writeFileSync(join(root, rel), tidy(lines).join("\n"), "utf8");

/* ------------------------------------------------------------------ */
/* Object-literal blocks                                               */
/* ------------------------------------------------------------------ */

type Block = { open: number; close: number };

/** The line range of `const <name> = {` … its closing brace at column 0. */
const blockOf = (lines: string[], name: string, rel: string): Block => {
  const open = lines.findIndex((l) => l.startsWith(`const ${name} = {`));
  if (open === -1) throw new Error(`${rel}: no \`const ${name} = {\` line`);
  const close = lines.findIndex((l, i) => i > open && l.startsWith("}"));
  if (close === -1) throw new Error(`${rel}: \`${name}\` has no closing brace`);
  return { open, close };
};

/** The entry lines of a block, ignoring the blank line an empty one holds. */
const entriesOf = (lines: string[], block: Block) =>
  lines.slice(block.open + 1, block.close).filter((l) => l.trim().length > 0);

const keyOf = (line: string) => line.trim().match(/^"([^"]+)":/)?.[1];

/** Rewrite a block's body to exactly `entries`, sorted by key. */
const setEntries = (lines: string[], block: Block, entries: string[]) => {
  const sorted = [...entries].sort((a, b) =>
    (keyOf(a) ?? "").localeCompare(keyOf(b) ?? "")
  );
  const body = sorted.length > 0 ? sorted : [""];
  return [...lines.slice(0, block.open + 1), ...body, ...lines.slice(block.close)];
};

const addEntry = (lines: string[], name: string, rel: string, entry: string) => {
  const block = blockOf(lines, name, rel);
  return setEntries(lines, block, [...entriesOf(lines, block), entry]);
};

const dropEntry = (lines: string[], name: string, rel: string, id: string) => {
  const block = blockOf(lines, name, rel);
  const kept = entriesOf(lines, block).filter((l) => keyOf(l) !== id);
  return setEntries(lines, block, kept);
};

/* ------------------------------------------------------------------ */
/* Import lines                                                        */
/* ------------------------------------------------------------------ */

/**
 * Insert `line` among the sibling imports matching `pattern`, keeping them
 * sorted. With no siblings yet, it goes directly above `anchor` — the line
 * opening the map the imports feed — with a blank line between.
 */
const addImport = (
  lines: string[],
  pattern: RegExp,
  line: string,
  anchor: string
) => {
  const siblings = lines
    .map((l, i) => (pattern.test(l) ? i : -1))
    .filter((i) => i !== -1);

  if (siblings.length === 0) {
    const at = lines.findIndex((l) => l.startsWith(anchor));
    if (at === -1) throw new Error(`no anchor line \`${anchor}\``);
    return [...lines.slice(0, at), line, "", ...lines.slice(at)];
  }

  const at = siblings.find((i) => lines[i].localeCompare(line) > 0);
  const insertAt = at ?? siblings[siblings.length - 1] + 1;
  return [...lines.slice(0, insertAt), line, ...lines.slice(insertAt)];
};

const dropImport = (lines: string[], line: RegExp) =>
  lines.filter((l) => !line.test(l));

/**
 * Collapse the runs of blank lines that adding or removing the last import
 * in a group leaves behind. Neither registry file has a deliberate double
 * blank line, so this is safe, and it keeps a retire's diff down to what it
 * actually removed.
 */
const tidy = (lines: string[]) =>
  lines.filter((l, i) => l.trim().length > 0 || (lines[i - 1] ?? "x").trim().length > 0);

/* ------------------------------------------------------------------ */
/* src/lessons.ts                                                      */
/* ------------------------------------------------------------------ */

const lessonImport = (id: string) => `import * as lesson${id} from "./lesson-${id}";`;
const LESSON_IMPORTS = /^import \* as lesson\w+ from "\.\/lesson-[\w-]+";$/;

export const registerLesson = (root: string, id: string) => {
  let lines = read(root, LESSONS_TS).split("\n");
  lines = addImport(lines, LESSON_IMPORTS, lessonImport(id), "const REGISTRY = {");
  lines = addEntry(lines, "REGISTRY", LESSONS_TS, `  "${id}": lesson${id},`);
  write(root, LESSONS_TS, lines);
};

export const unregisterLesson = (root: string, id: string) => {
  let lines = read(root, LESSONS_TS).split("\n");
  lines = dropImport(lines, new RegExp(`^${escapeRe(lessonImport(id))}$`));
  lines = dropEntry(lines, "REGISTRY", LESSONS_TS, id);
  write(root, LESSONS_TS, lines);
};

/* ------------------------------------------------------------------ */
/* src/questions.ts                                                    */
/* ------------------------------------------------------------------ */

const questionsImport = (id: string) =>
  `import questions${id} from "./questions-${id}.json";`;
const QUESTION_IMPORTS = /^import questions\w+ from "\.\/questions-[\w-]+\.json";$/;

export const registerQuestions = (root: string, id: string) => {
  let lines = read(root, QUESTIONS_TS).split("\n");
  lines = addImport(lines, QUESTION_IMPORTS, questionsImport(id), "const BY_ID = {");
  lines = addEntry(
    lines,
    "BY_ID",
    QUESTIONS_TS,
    `  "${id}": questions${id} as Question[],`
  );
  lines = addEntry(
    lines,
    "FILE_BY_ID",
    QUESTIONS_TS,
    `  "${id}": "questions-${id}.json",`
  );
  write(root, QUESTIONS_TS, lines);
};

export const unregisterQuestions = (root: string, id: string) => {
  let lines = read(root, QUESTIONS_TS).split("\n");
  lines = dropImport(lines, new RegExp(`^${escapeRe(questionsImport(id))}$`));
  lines = dropEntry(lines, "BY_ID", QUESTIONS_TS, id);
  lines = dropEntry(lines, "FILE_BY_ID", QUESTIONS_TS, id);
  write(root, QUESTIONS_TS, lines);
};

/* ------------------------------------------------------------------ */
/* src/course.ts                                                       */
/* ------------------------------------------------------------------ */

export type CourseEntryRemoval = {
  /** The `export const NAME = {` the entry was found under. */
  courseConst: string;
  /** The entry's `position`, and the positions still there after it went. */
  position: number;
  remaining: number[];
};

/**
 * Remove the `{ … lessonId: "<packageId>" … }` entry from whichever course
 * outline holds it. Returns null when no course claims the package id — a
 * lesson that was never placed in a course, which is what `npm run new`
 * leaves behind and is not an error here.
 *
 * `position` on the surviving entries is deliberately left alone; the caller
 * prints the gap. superCPE ordered the course by those numbers, so closing a
 * gap is a content decision, not a cleanup.
 */
export const unregisterCourseLesson = (
  root: string,
  packageId: string
): CourseEntryRemoval | null => {
  const lines = read(root, COURSE_TS).split("\n");

  const at = lines.findIndex((l) => l.trim() === `lessonId: "${packageId}",`);
  if (at === -1) return null;

  // The entry runs from the `{` above to the `},` below, both at the
  // indentation the course records are written with.
  let open = at;
  while (open > 0 && lines[open].trim() !== "{") open--;
  let close = at;
  while (close < lines.length - 1 && lines[close].trim() !== "},") close++;

  const courseConst =
    lines
      .slice(0, open)
      .reverse()
      .find((l) => l.startsWith("export const "))
      ?.match(/^export const (\w+)/)?.[1] ?? "(unknown)";

  const positionOf = (line: string) =>
    Number(line.trim().match(/^position: (\d+),$/)?.[1]);
  const position = lines
    .slice(open, close + 1)
    .map(positionOf)
    .find((n) => !Number.isNaN(n)) as number;

  let kept = [...lines.slice(0, open), ...lines.slice(close + 1)];

  // Collapse the outline back to the one-line empty form the file ships
  // with, rather than leaving `lessons: [\n  ] as CourseLesson[],` behind.
  kept = kept.flatMap((l, i) =>
    l.trimEnd() === "  lessons: [" && kept[i + 1]?.trim() === "] as CourseLesson[],"
      ? ["  lessons: [] as CourseLesson[],"]
      : l.trim() === "] as CourseLesson[]," && kept[i - 1]?.trimEnd() === "  lessons: ["
        ? []
        : [l]
  );

  // The block of the course const this entry lived in, so the remaining
  // positions reported are that course's and not the whole file's.
  const constAt = kept.findIndex((l) => l.startsWith(`export const ${courseConst} = {`));
  const constEnd = kept.findIndex((l, i) => i > constAt && l.startsWith("}"));
  const remaining = kept
    .slice(constAt, constEnd === -1 ? kept.length : constEnd)
    .map(positionOf)
    .filter((n) => !Number.isNaN(n));

  write(root, COURSE_TS, kept);
  return { courseConst, position, remaining };
};

function escapeRe(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
