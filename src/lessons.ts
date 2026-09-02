

export const LESSONS = {

} as const;
export type LessonId = keyof typeof LESSONS;

/**
 * A `kind: "text"` module is a study guide: no blocks, no audio, no
 * Remotion composition. Everything that walks LESSONS — Root.tsx, render,
 * generate-audio, check, export — branches on this.
 */
export const isTextLesson = (id: LessonId): boolean =>
  (LESSONS[id].meta as { kind?: string }).kind === "text";
