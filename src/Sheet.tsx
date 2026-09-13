import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { theme, WIDTH, HEIGHT } from "./theme";
import type { LessonMeta } from "./slides";

/**
 * The sheet chrome that every slide sits inside.
 *
 * This is the signature element. A border with corner registration ticks,
 * the superCPE shield mark at the top left, and a title block in the lower
 * right carrying the sheet number, the citation under discussion, and the
 * revision. The REFERENCE cell shows whatever `citation` the block gives it —
 * for accounting lessons an ASC paragraph, a Code section, or a Standards
 * paragraph. It gives the participant a persistent, glanceable citation
 * without a caption competing with the content, and it tells them where they
 * are in the sequence.
 *
 * The shield is chrome: no reveal, no animation, on screen from frame 0. It
 * sits in the band above the content padding, so no slide can reach it.
 * `hideMark` is for the Title sheet, where the full logo is already on
 * screen and two shields is one too many.
 */

const Tick: React.FC<{ x: number; y: number; rx: number; ry: number }> = ({
  x,
  y,
  rx,
  ry,
}) => (
  <>
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 26 * rx > 0 ? 26 : 26,
        height: 1,
        background: theme.color.hairline,
        transform: `translateX(${rx < 0 ? -26 : 0}px)`,
      }}
    />
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 1,
        height: 26,
        background: theme.color.hairline,
        transform: `translateY(${ry < 0 ? -26 : 0}px)`,
      }}
    />
  </>
);

export const Sheet: React.FC<{
  sheet: string;
  citation: string;
  meta: LessonMeta;
  children: React.ReactNode;
  hideMark?: boolean;
}> = ({ sheet, citation, meta, children, hideMark }) => {
  const m = theme.margin;

  return (
    <AbsoluteFill style={{ background: theme.color.vellum }}>
      {/* Sheet border */}
      <div
        style={{
          position: "absolute",
          left: m,
          top: m,
          right: m,
          bottom: m,
          border: `1px solid ${theme.color.hairline}`,
        }}
      />

      {/* Corner registration ticks, sitting just outside the border */}
      <Tick x={m} y={m} rx={-1} ry={-1} />
      <Tick x={WIDTH - m} y={m} rx={1} ry={-1} />
      <Tick x={m} y={HEIGHT - m} rx={-1} ry={1} />
      <Tick x={WIDTH - m} y={HEIGHT - m} rx={1} ry={1} />

      {/* Shield mark, inside the border at the top left, aligned to the
          content padding. It lives in the `m + 64` band the content area
          pads from the top, so it cannot collide with a slide. */}
      {hideMark ? null : (
        <Img
          src={staticFile("brand/supercpe-icon.png")}
          alt=""
          style={{
            position: "absolute",
            top: m + 10,
            left: m + 72,
            height: 44,
            width: "auto",
          }}
        />
      )}

      {/* Content area, inset from the border */}
      <AbsoluteFill
        style={{
          padding: `${m + 64}px ${m + 72}px ${m + 150}px ${m + 72}px`,
        }}
      >
        {children}
      </AbsoluteFill>

      {/* Title block, lower right, inside the border */}
      <div
        style={{
          position: "absolute",
          right: m,
          bottom: m,
          display: "flex",
          fontFamily: theme.font.mono,
          fontSize: theme.size.titleBlock,
          color: theme.color.slate,
          borderTop: `1px solid ${theme.color.hairline}`,
          borderLeft: `1px solid ${theme.color.hairline}`,
          background: theme.color.vellum,
        }}
      >
        <Cell label="COURSE" value={meta.courseCode} width={240} />
        <Cell label="REFERENCE" value={citation} width={360} />
        <Cell label="REV" value={meta.revision} width={90} />
        <Cell label="SHEET" value={sheet} width={140} emphasis />
      </div>

      {/* Draft watermark. Blank once the lesson's status is "checked". */}
      <div
        style={{
          position: "absolute",
          left: m,
          bottom: m,
          padding: "10px 18px",
          borderTop: `1px solid ${theme.color.hairline}`,
          borderRight: `1px solid ${theme.color.hairline}`,
          fontFamily: theme.font.mono,
          fontSize: theme.size.titleBlock,
          letterSpacing: "0.08em",
          color: theme.color.flag,
        }}
      >
        {meta.status === "checked" ? "" : meta.status}
      </div>
    </AbsoluteFill>
  );
};

const Cell: React.FC<{
  label: string;
  value: string;
  width: number;
  emphasis?: boolean;
}> = ({ label, value, width, emphasis }) => (
  <div
    style={{
      width,
      padding: "10px 18px",
      borderRight: `1px solid ${theme.color.hairline}`,
    }}
  >
    <div
      style={{
        fontSize: 15,
        letterSpacing: "0.14em",
        color: theme.color.slate,
        marginBottom: 4,
      }}
    >
      {label}
    </div>
    <div
      style={{
        color: emphasis ? theme.color.accent : theme.color.slate,
        fontWeight: emphasis ? 600 : 400,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}
    >
      {value}
    </div>
  </div>
);
