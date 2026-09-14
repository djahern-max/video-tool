import { interpolate, spring } from "remotion";
import { FPS } from "./theme";

/**
 * Reveal timing.
 *
 * Content appears when the narrator reaches it, not on a decorative schedule.
 * The `reveals` array on each block holds seconds from block start; these
 * helpers turn one of those into an opacity and a small vertical offset.
 *
 * Deliberately understated. A participant is listening to a technical
 * explanation for eight minutes; slides that slide, bounce, or fade at length
 * compete with the narration instead of supporting it. 12 frames, 10px, done.
 */

export const revealAt = (frame: number, atSeconds: number) => {
  const start = atSeconds * FPS;
  const progress = interpolate(frame, [start, start + 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return {
    opacity: progress,
    transform: `translateY(${(1 - progress) * 10}px)`,
  };
};

/**
 * Characters of a typed string visible at this frame. A prompt in the
 * Session pane appears as if typed from its reveal, at a fixed rate; the
 * rate is an animation constant like the 12-frame fade above, not a
 * narration timing, and nothing measured depends on it. The whole string
 * is visible once typing is done, whatever the block's remaining length.
 */
export const TYPED_CHARS_PER_SECOND = 60;
export const typedChars = (frame: number, atSeconds: number, length: number) => {
  const elapsed = frame - atSeconds * FPS;
  if (elapsed < 0) return 0;
  return Math.min(length, Math.floor((elapsed / FPS) * TYPED_CHARS_PER_SECOND));
};

/**
 * Which row a sweeping highlight sits on at this frame, or `rows` once it
 * has passed the last one. The Sweep sheet moves a highlight down a
 * table one row at a time from its reveal, then settles on the corrected
 * cell; the dwell per row is an animation constant of the same kind as
 * the typing rate.
 */
export const SWEEP_SECONDS_PER_ROW = 0.45;
export const sweepRow = (frame: number, atSeconds: number, rows: number) => {
  const elapsed = frame - atSeconds * FPS;
  if (elapsed < 0) return -1;
  return Math.min(rows, Math.floor(elapsed / FPS / SWEEP_SECONDS_PER_ROW));
};

/** Has this reveal happened yet? For state changes rather than fades. */
export const isRevealed = (frame: number, atSeconds: number) =>
  frame >= atSeconds * FPS;

/** One springy moment, used exactly once — the AND gate closing on sheet S-05. */
export const springAt = (frame: number, atSeconds: number) =>
  spring({
    frame: frame - atSeconds * FPS,
    fps: FPS,
    config: { damping: 200, mass: 0.6 },
  });
