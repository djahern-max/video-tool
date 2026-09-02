/**
 * The export-time word-count preview and credit estimate for a text
 * lesson (feature 05, task 5), shared by export.ts and check-lessons.ts.
 *
 * The counting is scripts/word-count.ts's — the maintained duplicate of
 * superCPE's rules — and the table exists so the author sees, before
 * uploading, exactly the per-section accounting superCPE's package
 * summary will show: every section's real size ("shipped"), and whether
 * its words enter the 7.02.5 count ("counted") or are excluded by role.
 *
 * The estimate line applies 7.02.6's formula shape —
 * (counted words ÷ 180 + clip minutes + questions × 1.85) ÷ 50 —
 * and is labelled an estimate: superCPE's computation is authoritative,
 * and rounding is course-level (7.01), not lesson-level, so no rounding
 * happens here.
 */

import { readFileSync } from "node:fs";
import { join } from "node:path";

import type { TextLessonMeta } from "../src/types";
import { countWords } from "./word-count";

// 7.02.6's constants, named as superCPE names them; never inline elsewhere.
const WORDS_PER_MINUTE = 180;
const MINUTES_PER_QUESTION = 1.85;
const MINUTES_PER_CREDIT = 50;

export type SectionWords = {
  id: string;
  file: string;
  role: string;
  title: string;
  words: number;
  counted: boolean;
};

/** Per-section word counts, read from the authored guide files. */
export const sectionWordCounts = (
  meta: TextLessonMeta,
  guideDir: string
): SectionWords[] =>
  meta.sections.map((s) => ({
    id: s.id,
    file: s.file,
    role: s.role,
    title: s.title,
    words: countWords(readFileSync(join(guideDir, s.file), "utf8")),
    counted: s.role === "body",
  }));

/** Prints the table and the estimate line; returns the counted total. */
export function printTextPreview(
  rows: SectionWords[],
  questionCount: number,
  clipSeconds: number
): number {
  const wide = Math.max(...rows.map((r) => r.file.length), 4);
  console.log(`\n  section  ${"file".padEnd(wide)}  role          words  7.02.5`);
  for (const r of rows) {
    console.log(
      `  ${r.id.padEnd(7)}  ${r.file.padEnd(wide)}  ${r.role.padEnd(12)}  ` +
        `${String(r.words).padStart(5)}  ${r.counted ? "counted" : "excluded"}`
    );
  }
  const shipped = rows.reduce((sum, r) => sum + r.words, 0);
  const counted = rows.reduce((sum, r) => sum + (r.counted ? r.words : 0), 0);
  console.log(`  ${"".padEnd(9 + wide + 14)}  -----`);
  console.log(
    `  shipped ${shipped} · counted ${counted} ` +
      `(body sections only; the difference is what 7.02.5 excludes)`
  );

  const clipMinutes = clipSeconds / 60;
  const estimate =
    (counted / WORDS_PER_MINUTE + clipMinutes + questionCount * MINUTES_PER_QUESTION) /
    MINUTES_PER_CREDIT;
  console.log(
    `\n  estimated credit: (${counted} words ÷ ${WORDS_PER_MINUTE} + ` +
      `${clipMinutes.toFixed(1)} clip min + ${questionCount} questions × ` +
      `${MINUTES_PER_QUESTION}) ÷ ${MINUTES_PER_CREDIT} ≈ ${estimate.toFixed(2)}` +
      `\n  (an estimate — superCPE's computation is authoritative, and ` +
      `rounding is course-level (7.01), not lesson-level)`
  );
  return counted;
}
