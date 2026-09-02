/**
 * The shape of a narrated block, and of the figures the slide components
 * render from it.
 *
 * These two types used to live in `src/lesson-01.ts`, and every other lesson
 * re-exported them from there — which made lesson 01 undeletable: retiring it
 * took `slides.tsx` and every sibling lesson with it. They are the render
 * side's contract, not any one lesson's content, so they live here now and
 * `npm run retire -- --all` can empty the registry without breaking a
 * compile. Content is still data (rule 1): nothing here knows a lesson.
 */

export type Figure =
  | { kind: "statement"; lines: string[] }
  | { kind: "facts"; rows: { label: string; value: string }[] }
  | {
      kind: "calc";
      rows: {
        label: string;
        value: string;
        emphasis?: "wrong" | "right";
        rule?: boolean;
      }[];
    }
  | { kind: "list"; items: string[] }
  | {
      kind: "compare";
      columns: {
        heading: string;
        rows: { label: string; value: string }[];
        emphasis?: "wrong" | "right";
      }[];
    };

export type Block = {
  id: string;
  sheet: string;
  citation: string;
  slide: "Title" | "Statement" | "Facts" | "Calc" | "List" | "Compare";
  figure?: Figure;
  narration: string; // transcript of record, may contain [[r]] markers
  reveals: number[]; // fallback seconds from block start, used until measured
  estimatedSeconds: number;
  speech?: string; // overrides narration for TTS only; rarely needed
};

/** What `audio-meta-NN.json` holds for one generated block. */
export type BlockMeta = {
  durationSeconds: number;
  reveals: number[];
  hash: string;
};
