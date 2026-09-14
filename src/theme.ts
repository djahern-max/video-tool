import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadPlexMono } from "@remotion/google-fonts/IBMPlexMono";

const { fontFamily: inter } = loadInter("normal", {
  weights: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});
const { fontFamily: plexMono } = loadPlexMono("normal", {
  weights: ["500", "600"],
  subsets: ["latin"],
});

/**
 * Visual language: a page of the superCPE app, one sheet per block.
 *
 * Every slide is a "sheet": a white card on the app's light-grey page
 * ground, with the shield mark at the top left and a footer strip carrying
 * the course code, the citation under discussion, the revision, and the
 * sheet number. The chrome persists from the drawing-set design this
 * started as because the two things it encodes are still real properties
 * of the content: the sheets are a numbered sequence, and each one cites
 * the paragraph it rests on. Both need to be on screen anyway, and the
 * footer puts them there without a caption competing with the content.
 *
 * The surfaces are the app's own UI, not the logo: white card, grey page,
 * the app's border and muted-text values (frontend/src/styles/global.css
 * in superCPE). The three brand colours are the logo's. `ink` (navy) is
 * headings and primary type. `accent` (blue) is structural: eyebrows,
 * rules, list numbers, the sheet number. It is chrome and never marks
 * content. `flag` (teal) has exactly one role — it marks the thing
 * currently under discussion — and appears nowhere else. If it is on more
 * than two elements at once, something has gone wrong.
 *
 * One exception, from the GPT-06 feature (changelog entry 33): on the
 * Check and Sweep sheets a figure shown as wrong is marked in `accent`,
 * so that teal stays reserved for the corrected figure. That is the only
 * content role `accent` has, and it is confined to those two components.
 *
 * Type is a proportional sans throughout. `mono` remains only for figures
 * presented as typed — the Calc column — and, later, for literal prompts
 * and code. Sizes are set for the app's player, which shows the render at
 * roughly a third of its native width: body text must still read at half
 * width, which puts `body` at 40px on the 1920px sheet.
 */
export const theme = {
  color: {
    page: "#F5F7FB",     // the app's page ground, outside the sheet
    surface: "#FFFFFF",  // the sheet — the app's card white
    panel: "#F5F7FB",    // panel fills, one step back from the sheet
    ink: "#032660",      // headings and primary type — logo navy
    muted: "#51607A",    // secondary type, labels — the app's muted text
    border: "#D5DCEA",   // sheet border, rules, dividers — the app's border
    flag: "#01B0A9",     // the single emphasis role — logo teal
    flagWash: "#E6F7F6", // flag at low opacity, for fills behind the marked panel
    accent: "#0166FC",   // logo blue — eyebrows, rules, numbers, sheet number
  },
  font: {
    display: inter,
    body: inter,
    mono: plexMono,     // figures presented as typed, and nothing else
  },
  size: {
    display: 84,
    heading: 64,
    subhead: 48,
    body: 40,
    label: 32,
    caption: 28,
    chrome: 24,
    chromeLabel: 18,
  },
  leading: {
    display: 1.1,
    heading: 1.25,
    body: 1.4,
  },
  radius: 8,
  // Page ground around the sheet, in px on a 1920x1080 frame
  margin: 64,
  // Inside the sheet: the shield band above the content, the side inset, and
  // the footer strip below it.
  inset: {
    top: 96,
    side: 64,
    footer: 84,
  },
} as const;

export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;

export const seconds = (s: number) => Math.round(s * FPS);
