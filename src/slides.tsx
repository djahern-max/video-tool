import React from "react";
import { useCurrentFrame } from "remotion";
import { theme } from "./theme";
import { revealAt } from "./reveal";
import type { Figure } from "./blocks";

export type LessonMeta = {
  courseCode: string;
  courseTitle: string;
  lessonTitle: string;
  position: string;        // "Lesson 1 of 5" — course-relative, not the package id
  deliveryMethod: string;  // "Self study", "Group live"
  fieldOfStudy: string;
  revision: string;
  revisionDate: string;
  status: string;
};

type SlideProps = { reveals: number[]; figure?: Figure; meta?: LessonMeta };

/** A row/item without a marker of its own reveals with the last marked one. */
const revealTimeFor = (i: number, reveals: number[]) =>
  reveals[Math.min(i, reveals.length - 1)];

/* ------------------------------------------------------------------ */
/* Shared primitives                                                   */
/* ------------------------------------------------------------------ */

const Eyebrow: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      fontFamily: theme.font.mono,
      fontSize: theme.size.caption,
      letterSpacing: "0.16em",
      color: theme.color.slate,
      marginBottom: 28,
    }}
  >
    {children}
  </div>
);

const Panel: React.FC<{
  children: React.ReactNode;
  marked?: boolean;
  style?: React.CSSProperties;
}> = ({ children, marked, style }) => (
  <div
    style={{
      background: marked ? theme.color.flagWash : theme.color.vellumEdge,
      border: `1px solid ${marked ? theme.color.flag : theme.color.hairline}`,
      padding: "26px 30px",
      ...style,
    }}
  >
    {children}
  </div>
);

/* ------------------------------------------------------------------ */
/* S-00  Title                                                         */
/* ------------------------------------------------------------------ */

export const Title: React.FC<SlideProps> = ({ reveals, meta }) => {
  const frame = useCurrentFrame();
  const m = meta!;
  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%" }}>
      <div style={revealAt(frame, reveals[0])}>
        <Eyebrow>{m.courseTitle.toUpperCase()}</Eyebrow>
      </div>
      <div
        style={{
          ...revealAt(frame, reveals[1]),
          fontFamily: theme.font.display,
          fontSize: theme.size.display,
          fontWeight: 800,
          lineHeight: 1.04,
          letterSpacing: "-0.03em",
          color: theme.color.graphite,
          maxWidth: 1400,
        }}
      >
        {m.lessonTitle}
      </div>
      <div
        style={{
          ...revealAt(frame, reveals[2]),
          marginTop: 44,
          display: "flex",
          gap: 18,
          alignItems: "center",
          fontFamily: theme.font.mono,
          fontSize: theme.size.caption,
          color: theme.color.slate,
        }}
      >
        <span style={{ width: 60, height: 2, background: theme.color.flag }} />
        <span>
          {[m.position, m.deliveryMethod, m.fieldOfStudy]
            .join("\u00A0·\u00A0")
            .toUpperCase()}
        </span>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Generic, data-driven slides                                         */
/* ------------------------------------------------------------------ */

const EMPHASIS_COLOR = {
  right: theme.color.flag,
  wrong: theme.color.slate,
} as const;

export const Statement: React.FC<SlideProps> = ({ reveals, figure }) => {
  const frame = useCurrentFrame();
  if (!figure || figure.kind !== "statement") return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%" }}>
      {figure.lines.map((line, i) => (
        <div
          key={i}
          style={{
            ...revealAt(frame, revealTimeFor(i, reveals)),
            fontFamily: theme.font.display,
            fontSize: theme.size.display,
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            color: theme.color.graphite,
            marginBottom: 16,
          }}
        >
          {line}
        </div>
      ))}
    </div>
  );
};

export const Facts: React.FC<SlideProps> = ({ reveals, figure }) => {
  const frame = useCurrentFrame();
  if (!figure || figure.kind !== "facts") return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%" }}>
      {figure.rows.map((row, i) => (
        <div
          key={row.label}
          style={{
            ...revealAt(frame, revealTimeFor(i, reveals)),
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            gap: 40,
            padding: "22px 0",
            borderTop: `1px solid ${theme.color.hairline}`,
          }}
        >
          <span style={{ fontFamily: theme.font.body, fontSize: theme.size.body, color: theme.color.slate }}>
            {row.label}
          </span>
          <span
            style={{
              fontFamily: theme.font.mono,
              fontSize: theme.size.subhead,
              fontWeight: 600,
              color: theme.color.graphite,
            }}
          >
            {row.value}
          </span>
        </div>
      ))}
    </div>
  );
};

/**
 * Right-aligned figure column, left-aligned labels, monospace for the
 * numbers so digits line up. `emphasis: "wrong"` renders in slate, not red —
 * this is a working calculation, not an error state.
 */
export const Calc: React.FC<SlideProps> = ({ reveals, figure }) => {
  const frame = useCurrentFrame();
  if (!figure || figure.kind !== "calc") return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%" }}>
      {figure.rows.map((row, i) => (
        <div
          key={row.label}
          style={{
            ...revealAt(frame, revealTimeFor(i, reveals)),
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            gap: 40,
            padding: "14px 0",
            borderTop: row.rule ? `1px solid ${theme.color.hairline}` : "1px solid transparent",
          }}
        >
          <span style={{ fontFamily: theme.font.body, fontSize: theme.size.body, color: theme.color.slate }}>
            {row.label}
          </span>
          <span
            style={{
              fontFamily: theme.font.mono,
              fontSize: theme.size.subhead,
              fontWeight: 600,
              textAlign: "right",
              color: row.emphasis ? EMPHASIS_COLOR[row.emphasis] : theme.color.graphite,
            }}
          >
            {row.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export const List: React.FC<SlideProps> = ({ reveals, figure }) => {
  const frame = useCurrentFrame();
  if (!figure || figure.kind !== "list") return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%" }}>
      {figure.items.map((item, i) => (
        <div
          key={item}
          style={{
            ...revealAt(frame, revealTimeFor(i, reveals)),
            display: "flex",
            alignItems: "baseline",
            gap: 30,
            padding: "18px 0",
            borderTop: `1px solid ${theme.color.hairline}`,
          }}
        >
          <span style={{ fontFamily: theme.font.mono, fontSize: theme.size.caption, color: theme.color.slate, width: 40 }}>
            {String(i + 1).padStart(2, "0")}
          </span>
          <span style={{ fontFamily: theme.font.body, fontSize: theme.size.body, color: theme.color.graphite }}>
            {item}
          </span>
        </div>
      ))}
    </div>
  );
};

export const Compare: React.FC<SlideProps> = ({ reveals, figure }) => {
  const frame = useCurrentFrame();
  if (!figure || figure.kind !== "compare") return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%" }}>
      <div style={{ display: "flex", gap: 32 }}>
        {figure.columns.map((col, i) => (
          <div key={col.heading} style={{ ...revealAt(frame, revealTimeFor(i, reveals)), flex: 1 }}>
            <Panel marked={col.emphasis === "right"} style={{ height: "100%" }}>
              <div
                style={{
                  fontFamily: theme.font.mono,
                  fontSize: theme.size.caption,
                  letterSpacing: "0.14em",
                  marginBottom: 20,
                  color: col.emphasis ? EMPHASIS_COLOR[col.emphasis] : theme.color.slate,
                }}
              >
                {col.heading.toUpperCase()}
              </div>
              {col.rows.map((row) => (
                <div
                  key={row.label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "12px 0",
                    borderTop: `1px solid ${theme.color.hairline}`,
                  }}
                >
                  <span style={{ fontFamily: theme.font.body, fontSize: 26, color: theme.color.slate }}>
                    {row.label}
                  </span>
                  <span
                    style={{
                      fontFamily: theme.font.mono,
                      fontSize: 30,
                      fontWeight: 600,
                      color: col.emphasis ? EMPHASIS_COLOR[col.emphasis] : theme.color.graphite,
                    }}
                  >
                    {row.value}
                  </span>
                </div>
              ))}
            </Panel>
          </div>
        ))}
      </div>
    </div>
  );
};

export const SLIDES = {
  Title,
  Statement,
  Facts,
  Calc,
  List,
  Compare,
} as const;
