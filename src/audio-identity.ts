/**
 * The identity of a block's audio: what was spoken, and what hash names it.
 *
 * This lives in `src/` rather than `scripts/` because both sides need it.
 * `scripts/generate-audio.ts` writes the hash into `audio-meta-NN.json`, and
 * every lesson module's accessors read it back to decide whether the metadata
 * under a block's id actually describes that block. A hash computed two ways
 * is a defect waiting for a whitespace change, so there is one function here
 * and two importers.
 *
 * SHA-256 is implemented in plain TypeScript instead of `node:crypto` for the
 * same reason. Lesson modules are compiled into the Remotion bundle and run in
 * a browser, where `node:crypto` does not exist; webpack 5 does not polyfill
 * it. The digest is byte-identical to `createHash("sha256")`, so hashes
 * written by earlier runs stay valid — this file changed where the hash is
 * computed, never what it computes.
 */

/* ------------------------------------------------------------------ */
/* Markers                                                             */
/* ------------------------------------------------------------------ */

const MARKER = /\[\[r\]\]/g;

/**
 * Split narration into the text actually sent to the API and the character
 * offsets at which reveals should fire.
 *
 * The offsets are into the stripped text, because that is what ElevenLabs'
 * alignment data describes.
 */
export const parseMarkers = (narration: string) => {
  let text = "";
  let cursor = 0;
  const offsets: number[] = [];

  MARKER.lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = MARKER.exec(narration)) !== null) {
    text += narration.slice(cursor, match.index);
    // Collapse whitespace that surrounded the marker so the sent text reads
    // naturally. The marker is punctuation for us, not for the model.
    text = text.replace(/\s+$/, "");
    if (text.length > 0) text += " ";
    offsets.push(text.length);
    cursor = match.index + match[0].length;
    while (narration[cursor] === " ") cursor += 1;
  }
  text += narration.slice(cursor);

  return { text: text.trim(), offsets };
};

/** The exact string sent to the TTS API: markers stripped, nothing else. */
export const spokenTextOf = (speech: string): string => parseMarkers(speech).text;

/* ------------------------------------------------------------------ */
/* SHA-256                                                             */
/* ------------------------------------------------------------------ */

const K = new Uint32Array([
  0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1,
  0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
  0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786,
  0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
  0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147,
  0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
  0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b,
  0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
  0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a,
  0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
  0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
]);

const rotr = (x: number, n: number) => (x >>> n) | (x << (32 - n));

const sha256Hex = (input: string): string => {
  const bytes = new TextEncoder().encode(input);
  const blocks = Math.ceil((bytes.length + 9) / 64);
  const padded = new Uint8Array(blocks * 64);
  padded.set(bytes);
  padded[bytes.length] = 0x80;

  const view = new DataView(padded.buffer);
  const bits = bytes.length * 8;
  view.setUint32(padded.length - 8, Math.floor(bits / 0x100000000));
  view.setUint32(padded.length - 4, bits >>> 0);

  const H = new Uint32Array([
    0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
    0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19,
  ]);
  const w = new Uint32Array(64);

  for (let i = 0; i < blocks; i += 1) {
    const off = i * 64;
    for (let t = 0; t < 16; t += 1) w[t] = view.getUint32(off + t * 4);
    for (let t = 16; t < 64; t += 1) {
      const a15 = w[t - 15];
      const a2 = w[t - 2];
      const s0 = rotr(a15, 7) ^ rotr(a15, 18) ^ (a15 >>> 3);
      const s1 = rotr(a2, 17) ^ rotr(a2, 19) ^ (a2 >>> 10);
      w[t] = (w[t - 16] + s0 + w[t - 7] + s1) >>> 0;
    }

    let a = H[0], b = H[1], c = H[2], d = H[3];
    let e = H[4], f = H[5], g = H[6], h = H[7];

    for (let t = 0; t < 64; t += 1) {
      const S1 = rotr(e, 6) ^ rotr(e, 11) ^ rotr(e, 25);
      const ch = (e & f) ^ (~e & g);
      const t1 = (h + S1 + ch + K[t] + w[t]) >>> 0;
      const S0 = rotr(a, 2) ^ rotr(a, 13) ^ rotr(a, 22);
      const maj = (a & b) ^ (a & c) ^ (b & c);
      const t2 = (S0 + maj) >>> 0;

      h = g; g = f; f = e;
      e = (d + t1) >>> 0;
      d = c; c = b; b = a;
      a = (t1 + t2) >>> 0;
    }

    H[0] = (H[0] + a) >>> 0; H[1] = (H[1] + b) >>> 0;
    H[2] = (H[2] + c) >>> 0; H[3] = (H[3] + d) >>> 0;
    H[4] = (H[4] + e) >>> 0; H[5] = (H[5] + f) >>> 0;
    H[6] = (H[6] + g) >>> 0; H[7] = (H[7] + h) >>> 0;
  }

  let hex = "";
  for (let i = 0; i < 8; i += 1) hex += H[i].toString(16).padStart(8, "0");
  return hex;
};

/* ------------------------------------------------------------------ */
/* The hash                                                            */
/* ------------------------------------------------------------------ */

/** The stored form: the first 12 hex characters of the SHA-256 digest. */
export const hashOf = (text: string) => sha256Hex(text).slice(0, 12);

/**
 * The hash recorded in `audio-meta-NN.json` for one block, over the exact
 * text that was spoken. `durationOf` and `revealsOf` call this on every read,
 * so it is memoised: a Remotion render asks for the same block's duration
 * once per frame.
 */
const cache = new Map<string, string>();

export const audioHashOf = (speech: string): string => {
  const hit = cache.get(speech);
  if (hit !== undefined) return hit;
  const hash = hashOf(spokenTextOf(speech));
  cache.set(speech, hash);
  return hash;
};
