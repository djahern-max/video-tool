import React from "react";
import { AbsoluteFill, Sequence, Audio, staticFile } from "remotion";
import { LESSONS, type LessonId } from "./lessons";
import { Sheet } from "./Sheet";
import { SLIDES } from "./slides";
import { seconds } from "./theme";
import { CLOSING_HOLD_SECONDS, LEAD_IN_SECONDS, isTitle } from "./timing";

/**
 * Sequences the blocks of one lesson.
 *
 * Every block duration comes from the data file, so there is no timing
 * number in this component. When measured audio replaces the estimates, this
 * file does not change. The two constants it reads from `timing.ts` are the
 * lead-in and the closing hold, which are render-side by design.
 *
 * The timeline: the narrated blocks run back to back from `LEAD_IN_SECONDS`,
 * and the last one is held for `CLOSING_HOLD_SECONDS` past its audio. The
 * title sheet is a layer over the opening — on screen from frame 0 for its
 * own `estimatedSeconds`, rendered last so it sits on top — which is what
 * lets the voice begin while the title is still readable.
 *
 * Audio is optional per block. A block with no audio file renders silent,
 * which is what lets you judge the visuals before generating narration.
 */

export const Lesson: React.FC<{ lessonId: LessonId }> = ({ lessonId }) => {
  const mod = LESSONS[lessonId] as unknown as {
    blocks: {
      id: string;
      sheet: string;
      citation: string;
      slide: string;
      figure?: unknown;
    }[];
    meta: import("./slides").LessonMeta;
    durationOf: (b: never) => number;
    revealsOf: (b: never) => number[];
    hasAudio: (b: never) => boolean;
  };

  const sequenced = mod.blocks.filter((b) => !isTitle(b));
  const titles = mod.blocks.filter(isTitle);

  const sheetOf = (block: (typeof mod.blocks)[number]) => {
    const Slide = SLIDES[block.slide as keyof typeof SLIDES];
    // The Title and Closing sheets carry the full logo, so the shield in
    // the band above the content would be a second mark.
    const hideMark = block.slide === "Title" || block.slide === "Closing";
    return (
      <Sheet sheet={block.sheet} citation={block.citation} meta={mod.meta} hideMark={hideMark}>
        <Slide
          reveals={mod.revealsOf(block as never)}
          figure={block.figure as never}
          meta={mod.meta}
        />
      </Sheet>
    );
  };

  let cursor = seconds(LEAD_IN_SECONDS);

  return (
    <AbsoluteFill>
      {sequenced.map((block, i) => {
        const from = cursor;
        const last = i === sequenced.length - 1;
        const durationInFrames =
          seconds(mod.durationOf(block as never)) + (last ? seconds(CLOSING_HOLD_SECONDS) : 0);
        cursor += durationInFrames;

        return (
          <Sequence
            key={block.id}
            from={from}
            durationInFrames={durationInFrames}
            name={`${block.sheet} ${block.slide}`}
          >
            {sheetOf(block)}
            {mod.hasAudio(block as never) ? (
              <Audio src={staticFile(`audio/${lessonId}/${block.id}.mp3`)} />
            ) : null}
          </Sequence>
        );
      })}
      {titles.map((block) => (
        <Sequence
          key={block.id}
          from={0}
          durationInFrames={seconds(mod.durationOf(block as never))}
          name={`${block.sheet} ${block.slide}`}
        >
          {sheetOf(block)}
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
