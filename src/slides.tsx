import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import { theme } from "./theme";
import { isRevealed, revealAt, sweepRow, typedChars } from "./reveal";
import type { CellRef, Figure, Table as TableData, Turn } from "./blocks";

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

/* ------------------------------------------------------------------ */
/* GPT-06: Session, Check, Sweep                                       */
/* ------------------------------------------------------------------ */

/**
 * The one content role `accent` has: a figure shown as wrong, on the Check
 * and Sweep sheets. Teal stays reserved for the corrected figure. See the
 * note in theme.ts.
 */
const CELL_ROLE = {
  wrong: { color: theme.color.accent, border: theme.color.accent, fill: theme.color.surface },
  right: { color: theme.color.flag, border: theme.color.flag, fill: theme.color.flagWash },
} as const;

/**
 * A small figures table. Row labels in the body face, figures in Plex Mono
 * so digits line up — the same rule the Calc column follows. `marks` paints
 * individual cells in a role; `sweepAt` paints one whole row in the neutral
 * panel colour, which is what the moving highlight on the Sweep sheet is.
 */
const FiguresTable: React.FC<{
  table: TableData;
  marks?: (CellRef & { role: "wrong" | "right"; tag?: string })[];
  sweepAt?: number;
  compact?: boolean;
}> = ({ table, marks = [], sweepAt = -1, compact }) => {
  const size = compact ? theme.size.chrome : theme.size.label;
  const cell: React.CSSProperties = {
    padding: compact ? "6px 18px" : "16px 24px",
    borderTop: `1px solid ${theme.color.border}`,
    fontSize: size,
    lineHeight: theme.leading.heading,
    whiteSpace: "nowrap",
  };
  return (
    <table style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <tr>
          <th style={{ ...cell, borderTop: "none", textAlign: "left" }} />
          {table.columns.map((c) => (
            <th
              key={c}
              style={{
                ...cell,
                borderTop: "none",
                textAlign: "right",
                fontWeight: 600,
                letterSpacing: "0.06em",
                fontSize: compact ? theme.size.chromeLabel : theme.size.caption,
                color: theme.color.muted,
              }}
            >
              {c.toUpperCase()}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {table.rows.map((row, r) => (
          <tr key={row.label} style={{ background: sweepAt === r ? theme.color.panel : "transparent" }}>
            <td style={{ ...cell, textAlign: "left", fontWeight: 500, color: theme.color.muted }}>
              {row.label}
            </td>
            {row.cells.map((value, c) => {
              const mark = marks.find((m) => m.row === r && m.col === c);
              const role = mark ? CELL_ROLE[mark.role] : null;
              return (
                <td
                  key={c}
                  style={{
                    ...cell,
                    textAlign: "right",
                    fontFamily: theme.font.mono,
                    fontWeight: 600,
                    color: role ? role.color : theme.color.ink,
                    background: role ? role.fill : undefined,
                    boxShadow: role ? `inset 0 0 0 3px ${role.border}` : undefined,
                  }}
                >
                  {value}
                  {mark?.tag ? (
                    <span
                      style={{
                        display: "block",
                        fontFamily: theme.font.body,
                        fontSize: theme.size.chromeLabel,
                        fontWeight: 700,
                        letterSpacing: "0.12em",
                        color: role!.color,
                        marginTop: 2,
                      }}
                    >
                      {mark.tag.toUpperCase()}
                    </span>
                  ) : null}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const TurnLabel: React.FC<{ children: React.ReactNode; muted?: boolean }> = ({ children, muted }) => (
  <div
    style={{
      fontSize: theme.size.chromeLabel,
      fontWeight: 700,
      letterSpacing: "0.12em",
      color: muted ? theme.color.muted : theme.color.accent,
      marginBottom: 8,
    }}
  >
    {children}
  </div>
);

/**
 * A chat pane. The prompt is a literal — it is what was sent — so it is set
 * in Plex Mono, the face reserved for figures and text presented as typed.
 * A user turn types in from its reveal; an assistant turn fades in. `prior`
 * turns are the conversation so far, on screen from frame 0 at caption size.
 *
 * The pane's header says on every sheet that the session is composed. The
 * narration says so once; the header keeps saying it, because a still of
 * any one sheet must not read as a screenshot.
 */
export const Session: React.FC<SlideProps> = ({ reveals, figure }) => {
  const frame = useCurrentFrame();
  if (!figure || figure.kind !== "session") return null;

  const renderTurn = (t: Turn, i: number, prior: boolean) => {
    const at = prior ? 0 : revealTimeFor(i, reveals);
    const size = prior ? theme.size.caption : theme.size.label;
    if (t.role === "user") {
      const shown = prior ? t.text.length : typedChars(frame, at, t.text.length);
      const typing = !prior && shown < t.text.length;
      return (
        <div key={`${prior ? "p" : "t"}-${i}`} style={{ ...(prior ? {} : { opacity: isRevealed(frame, at) ? 1 : 0 }), marginBottom: 28 }}>
          <TurnLabel muted={prior}>PROMPT</TurnLabel>
          <div
            style={{
              fontFamily: theme.font.mono,
              fontSize: size,
              fontWeight: 500,
              lineHeight: theme.leading.body,
              color: prior ? theme.color.muted : theme.color.ink,
              whiteSpace: "pre-wrap",
            }}
          >
            {t.text.slice(0, shown)}
            {typing ? <span style={{ color: theme.color.accent }}>▍</span> : null}
          </div>
        </div>
      );
    }
    return (
      <div key={`${prior ? "p" : "t"}-${i}`} style={{ ...(prior ? {} : revealAt(frame, at)), marginBottom: 28 }}>
        <TurnLabel muted={prior}>RESPONSE</TurnLabel>
        {t.text ? (
          <div
            style={{
              fontFamily: theme.font.mono,
              fontSize: size,
              fontWeight: 500,
              lineHeight: theme.leading.body,
              color: prior ? theme.color.muted : theme.color.ink,
              whiteSpace: "pre-wrap",
              marginBottom: t.table ? 20 : 0,
            }}
          >
            {t.text}
          </div>
        ) : null}
        {t.table ? (
          <div style={{ maxWidth: prior ? 760 : 1100 }}>
            <FiguresTable
              table={t.table}
              compact={prior}
              marks={t.mark && isRevealed(frame, at) ? [{ ...t.mark, tag: t.mark.role }] : []}
            />
          </div>
        ) : null}
      </div>
    );
  };

  return (
    <div style={{ ...column, justifyContent: "flex-start" }}>
      <Panel style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", padding: "28px 40px" }}>
        <div
          style={{
            fontSize: theme.size.chromeLabel,
            fontWeight: 600,
            letterSpacing: "0.12em",
            color: theme.color.muted,
            paddingBottom: 16,
            marginBottom: 24,
            borderBottom: `1px solid ${theme.color.border}`,
          }}
        >
          COMPOSED SESSION — WRITTEN FOR THIS COURSE, NOT A RECORDING
        </div>
        {(figure.prior ?? []).map((t, i) => renderTurn(t, i, true))}
        {figure.turns.map((t, i) => renderTurn(t, i, false))}
      </Panel>
    </div>
  );
};

/**
 * The response's table on the left, the participant's own arithmetic on
 * the right, one numbered line per reveal. The line that carries `against`
 * is the comparison: when it reveals, the named cell in the table is marked
 * wrong (accent) and the line's figure with it. Nothing on this sheet is
 * teal — the corrected figure has not arrived yet.
 */
export const Check: React.FC<SlideProps> = ({ reveals, figure }) => {
  const frame = useCurrentFrame();
  if (!figure || figure.kind !== "check") return null;

  const marks = figure.rows.flatMap((row, i) =>
    row.against && isRevealed(frame, revealTimeFor(i, reveals))
      ? [{ ...row.against, role: "wrong" as const, tag: "wrong" }]
      : []
  );

  return (
    <div style={column}>
      <div style={{ display: "flex", gap: 48, alignItems: "stretch" }}>
        <div style={{ flex: "0 0 760px", minWidth: 0 }}>
          <Panel style={{ height: "100%" }}>
            <TurnLabel muted>RESPONSE, AS RECEIVED</TurnLabel>
            <FiguresTable table={figure.table} marks={marks} />
          </Panel>
        </div>
        <div style={{ flex: "1 1 0", minWidth: 0 }}>
          <Eyebrow>{figure.heading.toUpperCase()}</Eyebrow>
          {figure.rows.map((row, i) => {
            const role = row.emphasis ? CELL_ROLE[row.emphasis] : null;
            return (
              <div
                key={row.label}
                style={{
                  ...revealAt(frame, revealTimeFor(i, reveals)),
                  display: "flex",
                  alignItems: "baseline",
                  gap: 28,
                  padding: "12px 0",
                  borderTop: `1px solid ${theme.color.border}`,
                }}
              >
                <span
                  style={{
                    fontSize: theme.size.chrome,
                    fontWeight: 700,
                    color: theme.color.accent,
                    width: 48,
                    flex: "0 0 auto",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <Label style={{ flex: "1 1 0", fontSize: theme.size.label, color: role ? role.color : theme.color.muted }}>
                  {row.label}
                </Label>
                <span
                  style={{
                    fontFamily: theme.font.mono,
                    fontSize: theme.size.label,
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                    color: role ? role.color : theme.color.ink,
                  }}
                >
                  {row.value}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

/**
 * The corrected table arriving. From the first reveal a neutral highlight
 * moves down the rows, one per `SWEEP_SECONDS_PER_ROW`, and once past the
 * last row the `settle` cell is marked right (teal). The comparison lines
 * on the right are elements 1..n and reveal on their own markers.
 */
export const Sweep: React.FC<SlideProps> = ({ reveals, figure }) => {
  const frame = useCurrentFrame();
  if (!figure || figure.kind !== "sweep") return null;

  const at = revealTimeFor(0, reveals);
  const row = sweepRow(frame, at, figure.table.rows.length);
  const settled = row >= figure.table.rows.length;

  return (
    <div style={column}>
      <div style={{ display: "flex", gap: 48, alignItems: "stretch" }}>
        <div style={{ flex: "0 0 900px", minWidth: 0, ...revealAt(frame, at) }}>
          <Panel marked={settled} style={{ height: "100%" }}>
            <TurnLabel muted>{figure.heading.toUpperCase()}</TurnLabel>
            <FiguresTable
              table={figure.table}
              sweepAt={settled ? -1 : row}
              marks={settled ? [{ ...figure.settle, role: "right", tag: "right" }] : []}
            />
          </Panel>
        </div>
        <div style={{ flex: "1 1 0", minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          {figure.lines.map((line, i) => {
            const role = line.emphasis ? CELL_ROLE[line.emphasis] : null;
            return (
              <div
                key={line.label}
                style={{
                  ...revealAt(frame, revealTimeFor(i + 1, reveals)),
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                  padding: "18px 0",
                  borderTop: `1px solid ${theme.color.border}`,
                }}
              >
                <Label style={{ fontSize: theme.size.caption }}>{line.label}</Label>
                <span
                  style={{
                    fontFamily: theme.font.mono,
                    fontSize: theme.size.subhead,
                    fontWeight: 600,
                    color: role ? role.color : theme.color.ink,
                  }}
                >
                  {line.value}
                  {line.emphasis ? (
                    <span
                      style={{
                        fontFamily: theme.font.body,
                        fontSize: theme.size.chromeLabel,
                        fontWeight: 700,
                        letterSpacing: "0.12em",
                        marginLeft: 20,
                        verticalAlign: "middle",
                      }}
                    >
                      {line.emphasis.toUpperCase()}
                    </span>
                  ) : null}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Closing                                                             */
/* ------------------------------------------------------------------ */

/**
 * The Title sheet's bookend: the full logo and the course title, the
 * course's one rule as a single line, and an end line built from
 * `meta.position`. Same faces and sizes as Title, one step down for the
 * rule so that a sentence fits on one line where a lesson title would not.
 * The block's narration says the lesson has ended; this sheet is what it
 * ends on, and the closing hold in `timing.ts` keeps it up after the audio.
 *
 * Elements are positional, as on the Title sheet: 0 the logo and course
 * title, 1 the rule, 2 the end line. Three markers bring them up in turn.
 */
export const Closing: React.FC<SlideProps> = ({ reveals, figure, meta }) => {
  const frame = useCurrentFrame();
  if (!figure || figure.kind !== "closing") return null;
  const m = meta!;
  return (
    <div style={column}>
      <div style={revealAt(frame, revealTimeFor(0, reveals))}>
        <Img
          src={staticFile("brand/supercpe-logo.png")}
          alt="superCPE"
          style={{ height: 104, width: "auto", display: "block", marginBottom: 44 }}
        />
        <Eyebrow>{m.courseTitle.toUpperCase()}</Eyebrow>
      </div>
      <div
        style={{
          ...revealAt(frame, revealTimeFor(1, reveals)),
          fontFamily: theme.font.display,
          fontSize: theme.size.heading,
          fontWeight: 800,
          lineHeight: theme.leading.display,
          letterSpacing: "-0.025em",
          color: theme.color.ink,
          whiteSpace: "nowrap",
        }}
      >
        {figure.rule}
      </div>
      <div
        style={{
          ...revealAt(frame, revealTimeFor(2, reveals)),
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
        <span>{`End of lesson · ${m.position}`.toUpperCase()}</span>
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
  Image,
  Session,
  Check,
  Sweep,
  Closing,
} as const;
