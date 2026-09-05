/**
 * LessonId -> lesson module. The one place that imports a lesson by name.
 *
 * `npm run new` adds an import and an entry here; `npm run retire` removes
 * them. Both edit this file as text, so keep the two blocks below in the
 * shape they are in: one `import * as lessonNN from "./lesson-NN";` per line,
 * and one `"NN": lessonNN,` per line inside REGISTRY.
 */

import * as lesson01 from "./lesson-01";

const REGISTRY = {
  "01": lesson01,
} as const;

export type LessonId = keyof typeof REGISTRY;

/**
 * What every lesson module exposes, video or text. `meta` is left open
 * because its shape follows `meta.kind`: `PackageLessonMeta` for a video
 * lesson, `TextLessonMeta` for a study guide. Callers narrow it themselves,
 * as they already did through `as unknown as` casts.
 */
type LessonModuleShape = { meta: Record<string, unknown> };

/**
 * The registry as everything else sees it.
 *
 * Typed through a string index rather than `Record<LessonId, …>` on purpose:
 * an empty registry is a supported state (`npm run retire -- --all`), and
 * with it `LessonId` narrows to `never`, which would make `LESSONS[id]`
 * itself `never` and stop every caller that reads `.meta` from compiling.
 * `LessonId` still comes from REGISTRY, so `--lesson` stays checked.
 */
export const LESSONS: Record<string, LessonModuleShape> = REGISTRY;

/**
 * A `kind: "text"` module is a study guide: no blocks, no audio, no
 * Remotion composition. Everything that walks LESSONS — Root.tsx, render,
 * generate-audio, check, export — branches on this.
 */
export const isTextLesson = (id: LessonId): boolean =>
  (LESSONS[id].meta as { kind?: string }).kind === "text";
