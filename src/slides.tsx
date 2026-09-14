import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
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

const column: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  height: "100%",
  fontFamily: theme.font.body,
};

const Eyebrow: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      fontFamily: theme.font.body,
      fontSize: theme.size.caption,
      fontWeight: 600,
      letterSpacing: "0.1em",
      color: theme.color.accent,
      marginBottom: 32,
    }}
  >
    {children}
  </div>
);

/** The label above a value, in the muted colour. */
const Label: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({
  children,
  style,
}) => (
  <span
    style={{
      fontFamily: theme.font.body,
      fontSize: theme.size.label,
      fontWeight: 500,
      lineHeight: theme.leading.body,
      color: theme.color.muted,
      ...style,
    }}
  >
    {children}
  </span>
);

const Panel: React.FC<{
  children: React.ReactNode;
  marked?: boolean;
  style?: React.CSSProperties;
}> = ({ children, marked, style }) => (
  <div
    style={{
      background: marked ? theme.color.flagWash : theme.color.panel,
      border: `1px solid ${marked ? theme.color.flag : theme.color.border}`,
      borderRadius: theme.radius,
      padding: "36px 40px",
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
    <div style={column}>
      {/* The full logo shares the eyebrow's reveal so the two come up
          together. Title has three hand-set reveals and no markers, and the
          validator special-cases it on that basis — do not add a fourth. */}
      <div style={revealAt(frame, reveals[0])}>
        <Img
          src={staticFile("brand/supercpe-logo.png")}
          alt="superCPE"
          style={{ height: 104, width: "auto", display: "block", marginBottom: 44 }}
        />
        <Eyebrow>{m.courseTitle.toUpperCase()}</Eyebrow>
      </div>
      <div
        style={{
          ...revealAt(frame, reveals[1]),
          fontFamily: theme.font.display,
          fontSize: theme.size.display,
          fontWeight: 800,
          lineHeight: theme.leading.display,
          letterSpacing: "-0.025em",
          color: theme.color.ink,
          maxWidth: 1500,
        }}
      >
        {m.lessonTitle}
      </div>
      <div
        style={{
          ...revealAt(frame, reveals[2]),
          marginTop: 48,
          display: "flex",
          gap: 20,
          alignItems: "center",
          fontSize: theme.size.caption,
          fontWeight: 500,
          letterSpacing: "0.04em",
          color: theme.color.muted,
        }}
      >
        <span style={{ width: 60, height: 3, background: theme.color.accent }} />
        <span>
          {[m.position, m.deliveryMethod, m.fieldOfStudy]
            .join(" · ")
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
  wrong: theme.color.muted,
} as const;

export const Statement: React.FC<SlideProps> = ({ reveals, figure }) => {
  const frame = useCurrentFrame();
  if (!figure || figure.kind !== "statement") return null;

  return (
    <div style={column}>
      {figure.lines.map((line, i) => (
        <div
          key={i}
          style={{
            ...revealAt(frame, revealTimeFor(i, reveals)),
            fontFamily: theme.font.display,
            fontSize: theme.size.heading,
            fontWeight: 700,
            lineHeight: theme.leading.heading,
            letterSpacing: "-0.015em",
            color: theme.color.ink,
            padding: "22px 0",
            borderTop: i === 0 ? "none" : `1px solid ${theme.color.border}`,
          }}
        >
          {line}
        </div>
      ))}
    </div>
  );
};

/**
 * Label on the left, value on the right, each row one fact. The value
 * column takes the width: a fact's value is prose, and prose reads
 * left-aligned beside its label rather than ragged against the far edge.
 */
export const Facts: React.FC<SlideProps> = ({ reveals, figure }) => {
  const frame = useCurrentFrame();
  if (!figure || figure.kind !== "facts") return null;

  return (
    <div style={column}>
      {figure.rows.map((row, i) => (
        <div
          key={row.label}
          style={{
            ...revealAt(frame, revealTimeFor(i, reveals)),
            display: "grid",
            gridTemplateColumns: "460px 1fr",
            columnGap: 48,
            alignItems: "baseline",
            padding: "24px 0",
            borderTop: `1px solid ${theme.color.border}`,
          }}
        >
          <Label>{row.label}</Label>
          <span
            style={{
              fontSize: theme.size.body,
              fontWeight: 600,
              lineHeight: theme.leading.body,
              color: theme.color.ink,
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
 * A working calculation. Right-aligned figure column, left-aligned labels,
 * monospace for the figures so digits line up — this is the one slide where
 * the value is a figure presented as typed. `emphasis: "wrong"` renders in
 * the muted colour, not red — it is a working figure, not an error state.
 */
export const Calc: React.FC<SlideProps> = ({ reveals, figure }) => {
  const frame = useCurrentFrame();
  if (!figure || figure.kind !== "calc") return null;

  return (
    <div style={column}>
      {figure.rows.map((row, i) => (
        <div
          key={row.label}
          style={{
            ...revealAt(frame, revealTimeFor(i, reveals)),
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            gap: 48,
            padding: "16px 0",
            borderTop: row.rule ? `1px solid ${theme.color.border}` : "1px solid transparent",
          }}
        >
          <Label style={{ fontSize: theme.size.body }}>{row.label}</Label>
          <span
            style={{
              fontFamily: theme.font.mono,
              fontSize: theme.size.subhead,
              fontWeight: 600,
              textAlign: "right",
              whiteSpace: "nowrap",
              color: row.emphasis ? EMPHASIS_COLOR[row.emphasis] : theme.color.ink,
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
    <div style={column}>
      {figure.items.map((item, i) => (
        <div
          key={item}
          style={{
            ...revealAt(frame, revealTimeFor(i, reveals)),
            display: "flex",
            alignItems: "baseline",
            gap: 32,
            padding: "22px 0",
            borderTop: `1px solid ${theme.color.border}`,
          }}
        >
          <span
            style={{
              fontSize: theme.size.caption,
              fontWeight: 700,
              color: theme.color.accent,
              width: 56,
              flex: "0 0 auto",
            }}
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <span
            style={{
              fontSize: theme.size.body,
              fontWeight: 500,
              lineHeight: theme.leading.body,
              color: theme.color.ink,
            }}
          >
            {item}
          </span>
        </div>
      ))}
    </div>
  );
};

/**
 * Two (or more) panels side by side, equal widths, one gutter. Rows stack
 * the label above the value: a panel is half the sheet wide, and a value
 * that is a sentence does not fit beside its label at a readable size.
 */
export const Compare: React.FC<SlideProps> = ({ reveals, figure }) => {
  const frame = useCurrentFrame();
  if (!figure || figure.kind !== "compare") return null;

  return (
    <div style={column}>
      <div style={{ display: "flex", gap: 48 }}>
        {figure.columns.map((col, i) => (
          <div
            key={col.heading}
            style={{ ...revealAt(frame, revealTimeFor(i, reveals)), flex: "1 1 0", minWidth: 0 }}
          >
            <Panel marked={col.emphasis === "right"} style={{ height: "100%" }}>
              <div
                style={{
                  fontSize: theme.size.caption,
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  lineHeight: theme.leading.heading,
                  marginBottom: 20,
                  color: col.emphasis ? EMPHASIS_COLOR[col.emphasis] : theme.color.accent,
                }}
              >
                {col.heading.toUpperCase()}
              </div>
              {col.rows.map((row) => (
                <div
                  key={row.label}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                    padding: "18px 0",
                    borderTop: `1px solid ${theme.color.border}`,
                  }}
                >
                  <Label style={{ fontSize: theme.size.caption }}>{row.label}</Label>
                  <span
                    style={{
                      fontSize: 36,
                      fontWeight: 600,
                      lineHeight: theme.leading.heading,
                      color: col.emphasis ? EMPHASIS_COLOR[col.emphasis] : theme.color.ink,
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

/**
 * A photograph, diagram, or screenshot, one per sheet.
 *
 * The sheet is a page of the app and a full-bleed image fights it, so the
 * image sits inside the same `Panel` the Compare columns use and carries
 * the same border and panel fill. It is contained, never cropped: the panel
 * is capped by the sheet's content area and the image is capped by the
 * panel, so a wide screenshot and a tall photograph both land whole, each
 * in a panel that hugs it.
 *
 * `theme.color.flag` is deliberately absent. The flag marks the one thing
 * under discussion, and on this sheet that is the whole image.
 *
 * Reveals: the image is element 0 and the caption element 1, so one marker
 * brings up the image alone and two bring up the image and then the caption.
 * `revealTimeFor` means a block with one marker and a caption still renders
 * both, the way the row-based slides do.
 */
export const Image: React.FC<SlideProps> = ({ reveals, figure }) => {
  const frame = useCurrentFrame();
  if (!figure || figure.kind !== "image") return null;

  return (
    <div style={{ ...column, justifyContent: "flex-start" }}>
      <div
        style={{
          ...revealAt(frame, revealTimeFor(0, reveals)),
          display: "flex",
          flex: 1,
          minHeight: 0,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* The panel shrink-wraps the image rather than filling the sheet, so
            a portrait photograph does not sit in a wide band of panel fill.
            The caps are percentages of the row, which flex has already given a
            definite height — no dimension is typed here, the way no duration
            is typed anywhere else. */}
        <Panel style={{ maxWidth: "100%", height: "100%", display: "flex" }}>
          <Img
            src={staticFile(figure.src)}
            alt={figure.alt}
            style={{
              width: "auto",
              height: "auto",
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
              display: "block",
              margin: "auto",
            }}
          />
        </Panel>
      </div>
      {figure.caption ? (
        <div
          style={{
            ...revealAt(frame, revealTimeFor(1, reveals)),
            marginTop: 24,
            fontSize: theme.size.caption,
            fontWeight: 500,
            lineHeight: theme.leading.body,
            color: theme.color.muted,
          }}
        >
          {figure.caption}
        </div>
      ) : null}
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
  Image,
} as const;
