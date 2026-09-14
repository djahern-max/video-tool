import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { theme } from "./theme";
import type { LessonMeta } from "./slides";

/**
 * The sheet chrome that every slide sits inside.
 *
 * A white card on the app's page ground, the superCPE shield mark at the
 * top left, and a footer strip along the bottom carrying the course code,
 * the citation under discussion, the revision, and the sheet number. The
 * REFERENCE cell shows whatever `citation` the block gives it — for
 * accounting lessons an ASC paragraph, a Code section, or a Standards
 * paragraph. It gives the participant a persistent, glanceable citation
 * without a caption competing with the content, and it tells them where
 * they are in the sequence.
 *
 * The shield is chrome: no reveal, no animation, on screen from frame 0. It
 * sits in the band above the content inset, so no slide can reach it.
 * `hideMark` is for the Title sheet, where the full logo is already on
 * screen and two shields is one too many.
 *
 * The draft stamp is the first cell of the footer strip and is absent once
 * the lesson's status is "checked".
 */

export const Sheet: React.FC<{
  sheet: string;
  citation: string;
  meta: LessonMeta;
  children: React.ReactNode;
  hideMark?: boolean;
}> = ({ sheet, citation, meta, children, hideMark }) => {
  const m = theme.margin;
  const { top, side, footer } = theme.inset;

  return (
    <AbsoluteFill style={{ background: theme.color.page }}>
      {/* The sheet: a card inset from the page ground */}
      <div
        style={{
          position: "absolute",
          left: m,
          top: m,
          right: m,
          bottom: m,
          background: theme.color.surface,
          border: `1px solid ${theme.color.border}`,
          borderRadius: theme.radius,
          overflow: "hidden",
        }}
      >
        {/* Shield mark, in the band above the content inset */}
        {hideMark ? null : (
          <Img
            src={staticFile("brand/supercpe-icon.png")}
            alt=""
            style={{
              position: "absolute",
              top: 24,
              left: side,
              height: 48,
              width: "auto",
            }}
          />
        )}

        {/* Content area, inset from the card edge and clear of the footer */}
        <AbsoluteFill
          style={{
            padding: `${top}px ${side}px ${footer + 32}px ${side}px`,
          }}
        >
          {children}
        </AbsoluteFill>

        {/* Footer strip */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: footer,
            display: "flex",
            alignItems: "center",
            gap: 48,
            padding: `0 ${side}px`,
            fontFamily: theme.font.body,
            borderTop: `1px solid ${theme.color.border}`,
            background: theme.color.panel,
          }}
        >
          {meta.status === "checked" ? null : (
            <Cell label="STATUS" value={meta.status} emphasis />
          )}
          <Cell label="COURSE" value={meta.courseCode} />
          <Cell label="REFERENCE" value={citation} grow />
          <Cell label="REV" value={meta.revision} />
          <Cell label="SHEET" value={sheet} emphasis />
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Cell: React.FC<{
  label: string;
  value: string;
  grow?: boolean;
  emphasis?: boolean;
}> = ({ label, value, grow, emphasis }) => (
  <div style={{ flex: grow ? "1 1 0" : "0 0 auto", minWidth: 0 }}>
    <div
      style={{
        fontSize: theme.size.chromeLabel,
        fontWeight: 600,
        letterSpacing: "0.12em",
        color: theme.color.muted,
        marginBottom: 4,
      }}
    >
      {label}
    </div>
    <div
      style={{
        fontSize: theme.size.chrome,
        fontWeight: emphasis ? 700 : 500,
        color: emphasis ? theme.color.accent : theme.color.ink,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}
    >
      {value}
    </div>
  </div>
);
