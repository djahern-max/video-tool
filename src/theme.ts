import { loadFont as loadArchivo } from "@remotion/google-fonts/Archivo";
import { loadFont as loadPlexMono } from "@remotion/google-fonts/IBMPlexMono";

const { fontFamily: archivo } = loadArchivo();
const { fontFamily: plexMono } = loadPlexMono();

/**
 * Visual language: a numbered sheet set in superCPE's colors.
 *
 * Every slide is a "sheet" carrying a title block, the way a drawing sheet
 * does. The chrome persists from the drawing-set design this started as
 * because the two things it encodes are still real properties of the
 * content: the sheets are a numbered sequence, and each one cites the
 * paragraph it rests on. Both need to be on screen anyway, and the title
 * block puts them there without a caption competing with the content.
 *
 * The palette is the superCPE logo: navy for type, blue for chrome, teal for
 * the marker. `flag` (the logo's teal checkmark) marks the one thing currently
 * under discussion and appears nowhere else — if it is on more than two
 * elements at once, something has gone wrong. `accent` (the logo's blue) is
 * structural: eyebrows, the Title rule, the sheet number. It is chrome and
 * never marks content.
 */
export const theme = {
  color: {
    vellum: "#F7F9FC",      // sheet background — near-white with a cool cast
    vellumEdge: "#EAF0F8",  // panel fills, table banding
    graphite: "#032660",    // primary type — logo navy
    slate: "#5B6B85",       // secondary type, rules
    hairline: "#C9D3E0",    // sheet border, dividers
    flag: "#01B0A9",        // the marker — logo teal, used sparingly
    flagWash: "#E3F5F4",    // flag at low opacity, for fills behind marked items
    accent: "#0166FC",      // logo blue — eyebrows, the Title rule, sheet number
  },
  font: {
    display: archivo,   // grotesque with an engineered squareness
    body: archivo,
    mono: plexMono,     // title block, sheet numbers, citations
  },
  size: {
    display: 84,
    heading: 62,
    subhead: 44,
    body: 36,
    caption: 26,
    titleBlock: 22,
  },
  // Sheet border inset, in px on a 1920x1080 sheet
  margin: 84,
} as const;

export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;

export const seconds = (s: number) => Math.round(s * FPS);
