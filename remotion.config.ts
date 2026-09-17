import { Config } from "@remotion/cli/config";

// Every encode setting is stated here rather than left to Remotion's
// defaults, so a Remotion upgrade cannot quietly change how sheets look.
// None of them touches width, height, fps or any timing: the frame count and
// the measured duration are the same whatever these say.

// PNG frame capture, not Remotion's default JPEG. JPEG rings and smears
// high-contrast text edges before H.264 ever sees the frame; PNG hands the
// encoder the page exactly as the browser drew it.
Config.setVideoImageFormat("png");

// H.264 in an MP4, which is what superCPE's player and every browser plays.
Config.setCodec("h264");

// yuv420p, not yuv444p: 4:4:4 H.264 does not play in every browser. Dark
// text on a white sheet is almost all luma, which 4:2:0 keeps at full
// resolution; only the colour planes are halved. Stating it also moves the
// file off the full-range yuvj420p that JPEG capture produced.
Config.setPixelFormat("yuv420p");

// CRF 16 (was 18). Sheets are mostly static, so the extra bits go to the
// few frames that change and the size cost is small; type artefacts are the
// first thing a participant notices.
Config.setCrf(16);

Config.setOverwriteOutput(true);
