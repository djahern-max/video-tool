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
    }
  /**
   * A real image on the sheet, rather than typeset data.
   *
   * `src` is a path relative to `public/`, loaded with Remotion's
   * `staticFile()`. `alt` is required rather than optional: it is the only
   * description of the image that survives into the transcript of record,
   * and it is what a reviewer reads when they are not watching the render.
   */
  | { kind: "image"; src: string; alt: string; caption?: string };

export type Block = {
  id: string;
  sheet: string;
  citation: string;
  slide: "Title" | "Statement" | "Facts" | "Calc" | "List" | "Compare" | "Image";
  figure?: Figure;
  narration: string; // transcript of record, may contain [[r]] markers
  reveals: number[]; // fallback seconds from block start, used until measured
  estimatedSeconds: number;
  speech?: string; // overrides narration for TTS only; rarely needed
};

/**
 * What `audio-meta-NN.json` holds for one generated block.
 *
 * `hash` is the identity of the audio, not a note about it. It is the hash of
 * the exact text that was spoken (`audioHashOf` in `src/audio-identity.ts`),
 * and every lesson module's accessors compare it against the block's current
 * narration before returning a measured duration or a measured reveal. An
 * entry whose hash does not match describes different words, whatever id it
 * is filed under, and is treated as no entry at all.
 *
 * `voice` and `model` record the configuration the file was generated under.
 * They are optional because entries written before they existed do not carry
 * them; `generate` treats an absent value as a miss, which is what makes a
 * voice change regenerate rather than silently reuse the old narrator.
 */
export type BlockMeta = {
  durationSeconds: number;
  reveals: number[];
  hash: string;
  voice?: string;
  model?: string;
};
