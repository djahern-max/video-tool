/**
 * The composition's two render-side timing constants, and the one function
 * that turns a lesson's blocks into the runtime they produce.
 *
 * Every narrated duration is measured (`audio-meta-NN.json`, rule 2). The two
 * numbers here are the only stretches of a render that are not narration:
 *
 * - `LEAD_IN_SECONDS` — how long after the first frame the first narrated
 *   block begins. The title sheet is a layer over the opening: it is on
 *   screen from frame 0 for its own `estimatedSeconds`, and the first
 *   narrated block's sheet and audio start underneath it at the lead-in.
 *   The voice therefore begins about a second in, while the title is still
 *   up, and the title lifts on its own hold to show the first sheet with
 *   whatever has already been revealed. The hold is the title block's
 *   `estimatedSeconds`, per lesson; the lead-in is this one constant.
 *
 * - `CLOSING_HOLD_SECONDS` — how long the final sheet stays after the last
 *   block's audio (which already carries `generate`'s 0.6 s tail) has ended,
 *   so the viewer can tell the program has ended rather than stopped.
 *
 * Both are part of the measured runtime: the rendered file is this long,
 * ffprobe measures it so, and `export` packages that measurement. They are
 * constants rather than silence appended to any MP3 (which is committed
 * source that cannot be regenerated identically) and rather than a number
 * typed in a component (rule 2). Neither is narration, and the accuracy
 * record for a lesson notes them as non-narration time.
 *
 * This module imports nothing so that the lesson modules and the scripts
 * can use it without pulling in the theme's font loading.
 */

export const LEAD_IN_SECONDS = 1;
export const CLOSING_HOLD_SECONDS = 3;

/**
 * The title sheet is the overlay; every other block is sequenced. A block
 * is told apart by its slide, not by whether it has narration, so that a
 * non-title block that has lost its narration still occupies its time
 * (silently) instead of vanishing from the timeline — `check` reports that
 * state as an ERROR either way.
 */
export const isTitle = (b: { slide: string }): boolean => b.slide === "Title";

/**
 * The runtime in seconds: the lead-in, then every sequenced block's duration
 * back to back, then the closing hold. Root.tsx sums the same terms in
 * frames; export.ts compares ffprobe's measurement of the render against
 * this; generate-audio.ts prints it. One definition, four readers.
 */
export const runtimeSeconds = <B extends { slide: string }>(
  blocks: readonly B[],
  durationOf: (b: B) => number
): number =>
  LEAD_IN_SECONDS +
  blocks.filter((b) => !isTitle(b)).reduce((sum, b) => sum + durationOf(b), 0) +
  CLOSING_HOLD_SECONDS;
