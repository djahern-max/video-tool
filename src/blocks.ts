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
  | { kind: "image"; src: string; alt: string; caption?: string }
  /**
   * A chat pane: a composed prompt-and-response exchange. Each turn is one
   * reveal element. A `user` turn types in from its reveal; an `assistant`
   * turn fades in and may carry text, a table, or both. `prior` turns are
   * on screen from frame 0 — the conversation so far — and are not
   * revealable, so they do not count toward the marker check.
   */
  | { kind: "session"; turns: Turn[]; prior?: Turn[] }
  /**
   * A table beside the participant's own arithmetic. Each row is one
   * reveal element. A row carrying `against` names the table cell it is
   * compared with; when that row reveals, the cell is highlighted in the
   * "wrong" role. Every table figure not marked wrong is computed in the
   * lesson module, never typed (rule 2's spirit applied to arithmetic).
   */
  | {
      kind: "check";
      heading: string;
      table: Table;
      rows: CheckRow[];
    }
  /**
   * A corrected table arriving: a highlight sweeps down the rows from the
   * first reveal and settles on `settle` in the "right" role. The table
   * and its sweep are element 0; each of `lines` is a further element.
   */
  | {
      kind: "sweep";
      heading: string;
      table: Table;
      settle: CellRef;
      lines: { label: string; value: string; emphasis?: "wrong" | "right" }[];
    }
  /**
   * The Title sheet's bookend: a sign-off that carries the course title
   * (from meta, as Title does) and the course's one rule in a single line.
   * Its elements are positional, like an image's: the logo and course title
   * are 0, the rule is 1, and the end line (built from meta.position) is 2.
   */
  | { kind: "closing"; rule: string };

/** A small table: one row-label column, then `columns`. */
export type Table = {
  columns: string[];
  rows: { label: string; cells: string[] }[];
};

/** A cell of a Table: 0-based row, 0-based index into that row's `cells`. */
export type CellRef = { row: number; col: number };

export type Turn =
  | { role: "user"; text: string }
  | {
      role: "assistant";
      text?: string;
      table?: Table;
      /** Highlight one cell in the named role, from the turn's reveal. */
      mark?: CellRef & { role: "wrong" | "right" };
    };

export type CheckRow = {
  label: string;
  value: string;
  emphasis?: "wrong" | "right";
  /** The table cell this row's figure is compared against. */
  against?: CellRef;
};

export type Block = {
  id: string;
  sheet: string;
  citation: string;
  slide:
    | "Title"
    | "Statement"
    | "Facts"
    | "Calc"
    | "List"
    | "Compare"
    | "Image"
    | "Session"
    | "Check"
    | "Sweep"
    | "Closing";
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
