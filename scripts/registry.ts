/**
 * The registry edits that `npm run new` and `npm run retire` share.
 *
 * Registering a lesson means four things in three files: an import and a map
 * entry in `src/lessons.ts`, an import and two map entries in
 * `src/questions.ts`, and — for a lesson that has been placed in a course —
 * an outline entry in `src/course.ts`, plus the course record itself when
 * the lesson is the first of a new course. Doing that by hand has been done
 * twice and got a different one of them wrong each time, which is the whole
 * reason these commands exist. Both commands go through this file so they
 * cannot disagree about the shape of what they write and remove.
 *
 * These are line-oriented text edits, not an AST rewrite: the files are
 * hand-written and hand-read, and preserving their comments and spacing
 * exactly matters more than tolerating arbitrary formatting. The two
 * registry files carry a comment saying to keep one import and one entry per
 * line; that comment is this module's contract. `src/course.ts` states the
 * equivalent contract in its own header: a course record is an optional doc
 * comment, then `export const NAME = {` through `} as const;`.
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

/**
 * One course record as it stands in the file: what it is called, what it
 * says, and which lessons its outline holds. Read-only — `npm run retire`
 * needs this before it changes anything, so `--dry-run` can name the course
 * records it would drop.
 */
export type CourseRecord = {
  /** The `export const NAME = {` this record is declared as. */
  constName: string;
  courseCode: string;
  title: string;
  /** The outline's `lessonId` values, in file order. */
  lessonIds: string[];
  /** The outline's `position` values, in file order. */
  positions: number[];
};

/** `const NAME = {` … its closing `} as const;`, for every course record. */
const courseBlocks = (lines: string[]) => {
  const out: { constName: string; open: number; close: number }[] = [];
  lines.forEach((l, i) => {
    const name = l.match(/^export const (\w+) = \{$/)?.[1];
    if (!name) return;
    const close = lines.findIndex((c, j) => j > i && c.startsWith("}"));
    if (close === -1) throw new Error(`${COURSE_TS}: \`${name}\` has no closing brace`);
    out.push({ constName: name, open: i, close });
  });
  return out;
};

const field = (body: string[], key: string) =>
  body.map((l) => l.match(new RegExp(`^  ${key}: "(.*)",$`))?.[1]).find((v) => v !== undefined);

const positionOf = (line: string) =>
  Number(line.trim().match(/^position: (\d+),$/)?.[1]);

/** Every course record in `src/course.ts`, in file order. */
export const readCourses = (root: string): CourseRecord[] => {
  const lines = read(root, COURSE_TS).split("\n");
  return courseBlocks(lines).map(({ constName, open, close }) => {
    const body = lines.slice(open + 1, close);
    return {
      constName,
      courseCode: field(body, "courseCode") ?? "",
      title: field(body, "title") ?? "",
      lessonIds: body
        .map((l) => l.trim().match(/^lessonId: "(.*)",$/)?.[1])
        .filter((v): v is string => v !== undefined),
      positions: body.map(positionOf).filter((n) => !Number.isNaN(n)),
    };
  });
};

/**
 * The TypeScript identifier a course code is declared under. Derived rather
 * than asked for, because two names for one course is a drift the file
 * cannot survive: `retire` finds the record by walking back to the nearest
 * `export const`, so the name must be recoverable from the code alone.
 */
export const courseConstName = (courseCode: string) =>
  `COURSE_${courseCode.toUpperCase().replace(/[^A-Z0-9]/g, "_")}`;

/** The `[A, B]` of `export const COURSES: readonly Course[] = [...];`. */
const coursesLine = (lines: string[]) => {
  const at = lines.findIndex((l) => l.startsWith("export const COURSES"));
  if (at === -1) throw new Error(`${COURSE_TS}: no \`export const COURSES\` line`);
  // Anchored on ` = [`, not the first `[`: the annotation `readonly Course[]`
  // sits to the left of it on the same line.
  const names = lines[at].match(/ = \[(.*)\];$/)?.[1] ?? "";
  return { at, names: names.split(",").map((n) => n.trim()).filter(Boolean) };
};

const setCourses = (lines: string[], names: string[]) => {
  const { at } = coursesLine(lines);
  const next = [...lines];
  next[at] = lines[at].replace(/ = \[.*\];$/, ` = [${names.join(", ")}];`);
  return next;
};

/** The outline entry, written in exactly the form `readCourses` parses. */
const outlineEntry = (l: { position: number; lessonId: string; title: string }) => [
  "    {",
  `      position: ${l.position},`,
  `      lessonId: "${l.lessonId}",`,
  `      title: "${l.title}",`,
  `      status: "draft",`,
  "    },",
];

export type CourseEntryAddition = {
  courseConst: string;
  position: number;
  /** True when this lesson brought the course record into existence. */
  created: boolean;
};

/**
 * Place a lesson in a course: append its outline entry, creating the course
 * record and its `COURSES` entry first when nothing declares `courseCode`.
 *
 * `position` is the highest in the course plus one — never the lowest unused
 * integer. `unregisterCourseLesson` deliberately leaves a gap when a lesson
 * is retired from the middle of a course, because superCPE ordered the
 * course by those numbers; filling that gap with an unrelated new lesson
 * would silently claim the retired lesson's place in the sequence.
 *
 * The caller is responsible for refusing a title that disagrees with an
 * existing record's — this writes, it does not adjudicate.
 */
export const registerCourseLesson = (
  root: string,
  course: { courseCode: string; title: string },
  lesson: { lessonId: string; title: string }
): CourseEntryAddition => {
  let lines = read(root, COURSE_TS).split("\n");
  const constName = courseConstName(course.courseCode);
  const existing = readCourses(root).find((c) => c.constName === constName);
  const created = existing === undefined;

  if (created) {
    // A new record goes directly above the `COURSES` doc comment, so the
    // records stay in one run and `COURSES` stays last.
    const { at } = coursesLine(lines);
    let insertAt = at;
    while (insertAt > 0 && lines[insertAt - 1].trim().length > 0) insertAt--;

    lines = [
      ...lines.slice(0, insertAt),
      "/**",
      ` * TODO: one line saying what ${course.courseCode} is and who it is for.`,
      " */",
      `export const ${constName} = {`,
      `  courseCode: "${course.courseCode}",`,
      `  title: "${course.title}",`,
      `  nasbaFieldOfStudy: "TODO: a value from docs/2024-Fields-of-Study",`,
      `  knowledgeLevel: "Basic",`,
      `  prerequisites: "TODO: what a participant must already know — 3.02.1 wants None stated, not blank",`,
      `  advancePreparation: "TODO: what a participant must do beforehand, or None",`,
      `  deliveryMethod: "Self study",`,
      `  lessons: [] as CourseLesson[],`,
      "} as const;",
      "",
      ...lines.slice(insertAt),
    ];
    lines = setCourses(lines, [...coursesLine(lines).names, constName]);
  }

  const position = Math.max(0, ...(existing?.positions ?? [])) + 1;
  const entry = outlineEntry({ position, lessonId: lesson.lessonId, title: lesson.title });

  // Two outline forms to insert into: the one-line empty array the file
  // ships with, and an array that already has entries.
  const empty = lines.findIndex(
    (l, i) => l === "  lessons: [] as CourseLesson[]," && withinCourse(lines, i, constName)
  );
  if (empty !== -1) {
    lines = [
      ...lines.slice(0, empty),
      "  lessons: [",
      ...entry,
      "  ] as CourseLesson[],",
      ...lines.slice(empty + 1),
    ];
  } else {
    const close = lines.findIndex(
      (l, i) => l === "  ] as CourseLesson[]," && withinCourse(lines, i, constName)
    );
    if (close === -1) {
      throw new Error(`${COURSE_TS}: \`${constName}\` has no \`lessons\` array to append to`);
    }
    lines = [...lines.slice(0, close), ...entry, ...lines.slice(close)];
  }

  write(root, COURSE_TS, lines);
  return { courseConst: constName, position, created };
};

/** Whether line `i` falls inside the block of course const `constName`. */
const withinCourse = (lines: string[], i: number, constName: string) => {
  const block = courseBlocks(lines).find((b) => b.constName === constName);
  return block !== undefined && i > block.open && i < block.close;
};

/**
 * Remove a course record entirely: its doc comment, its const block, and its
 * name in `COURSES`. Called when the record loses its last lesson — an empty
 * course record is not a course, and leaving one behind is the hand cleanup
 * this command exists to remove.
 */
export const unregisterCourse = (root: string, constName: string): boolean => {
  let lines = read(root, COURSE_TS).split("\n");
  const block = courseBlocks(lines).find((b) => b.constName === constName);
  if (!block) return false;

  // The record's own doc comment, when the line above it closes one. The
  // file's shared notes are `//` lines and are deliberately not swept up.
  let open = block.open;
  if (lines[open - 1]?.trim() === "*/") {
    while (open > 0 && !lines[open - 1].trim().startsWith("/**")) open--;
    open--;
  }

  let close = block.close;
  if (lines[close + 1]?.trim() === "") close++;

  lines = [...lines.slice(0, open), ...lines.slice(close + 1)];
  lines = setCourses(lines, coursesLine(lines).names.filter((n) => n !== constName));
  write(root, COURSE_TS, lines);
  return true;
};

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
