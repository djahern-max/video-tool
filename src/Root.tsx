import React from "react";
import { Composition } from "remotion";
import { Lesson } from "./Lesson";
import { isTextLesson, LESSONS, LessonId } from "./lessons";
import { FPS, WIDTH, HEIGHT, seconds } from "./theme";
import { CLOSING_HOLD_SECONDS, LEAD_IN_SECONDS, isTitle, runtimeSeconds } from "./timing";

// Sum the frames the same way Lesson.tsx does, so a composition's length can
// never drift from its content: the lead-in, every sequenced block, the
// closing hold. The title sheet is a layer over the opening and adds no
// frames of its own. The credit calculation depends on this number being the
// real runtime, which is why it is derived rather than typed in.
const framesFor = (
  blocks: { id: string; slide: string }[],
  durationOf: (b: never) => number
) =>
  seconds(LEAD_IN_SECONDS) +
  blocks
    .filter((b) => !isTitle(b))
    .reduce((sum, b) => sum + seconds(durationOf(b as never)), 0) +
  seconds(CLOSING_HOLD_SECONDS);

const warnIfEstimated = (
  label: string,
  usingEstimates: boolean,
  totalSeconds: number
) => {
  if (!usingEstimates) return;
  console.warn(
    `\n[abacadaba] ${label}: Rendering with ESTIMATED block durations.\n` +
      `  Runtime: ${Math.floor(totalSeconds / 60)}m ${Math.round(totalSeconds % 60)}s (estimated)\n` +
      `  Do not use this figure for the CPE credit calculation.\n` +
      `  Run \`npm run generate -- --lesson <id>\` to produce narration audio, then re-render.\n`
  );
};

// A text lesson is a study guide with no composition to register; only
// video lessons reach Remotion at all.
type VideoLessonModule = {
  blocks: { id: string; slide: string }[];
  durationOf: (b: never) => number;
  usingEstimates: boolean;
};
const IDS = (Object.keys(LESSONS) as LessonId[]).filter((id) => !isTextLesson(id));
const videoLesson = (id: LessonId) => LESSONS[id] as unknown as VideoLessonModule;

IDS.forEach((id) => {
  const lesson = videoLesson(id);
  warnIfEstimated(
    `Lesson${id}`,
    lesson.usingEstimates,
    runtimeSeconds(lesson.blocks, lesson.durationOf as never)
  );
});

export const RemotionRoot: React.FC = () => (
  <>
    {IDS.map((id) => {
      const lesson = videoLesson(id);
      return (
        <Composition
          key={id}
          id={`Lesson${id}`}
          component={Lesson}
          defaultProps={{ lessonId: id }}
          durationInFrames={framesFor(lesson.blocks, lesson.durationOf as never)}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
      );
    })}
  </>
);
