/**
 * Counting the words of a study guide section (7.02.5, 7.02.6).
 *
 * AUTHORITATIVE COPY: superCPE's backend/app/services/word_count.py. This
 * file is a maintained duplicate, by design — the same strip rules in the
 * same order — and must be kept in step with it. When the two disagree,
 * word_count.py wins: superCPE's computation is what reaches the credit
 * formula, and the export preview exists so the author sees that number
 * before uploading, not a different one.
 *
 * The rules, as the contract spells them out: fenced code blocks, HTML
 * comments, and images are removed entirely; links keep their text and
 * lose their URL, and link reference definitions are removed; HTML tags,
 * heading marks, emphasis marks, blockquote marks, list markers, table
 * pipes, and horizontal rules are removed with the words around them
 * kept; inline code keeps its content minus the backticks. What remains
 * is split on whitespace, and a token counts as a word if it contains at
 * least one letter or digit.
 *
 * Ports of Python regexes, one comment per divergence risk:
 *   - re.M is the m flag; re.S becomes [\s\S] (JS has no dotall need here).
 *   - \Z (absolute end of input) becomes (?![\s\S]).
 *   - (?P=fence) becomes \1.
 *   - [^\W_] under re.UNICODE (a letter or digit) becomes [\p{L}\p{N}] with
 *     the u flag — JS \w is ASCII-only even under u, so the class is spelled
 *     out in properties instead.
 */

// Fenced code blocks, both fence characters, with any info string. Code is
// not prose the participant reads at 180 words a minute.
const FENCED_CODE = /^(```+|~~~+)[\s\S]*?(?:\n\1[^\n]*$|(?![\s\S]))/gm;
const HTML_COMMENT = /<!--[\s\S]*?-->/g;
// Images carry a URL and an alt string that is a caption, not body prose.
const IMAGE = /!\[[^\]]*\]\([^)]*\)/g;
const IMAGE_REF = /!\[[^\]]*\]\[[^\]]*\]/g;
// Links keep their text and lose their target.
const INLINE_LINK = /\[([^\]]*)\]\([^)]*\)/g;
const REF_LINK = /\[([^\]]*)\]\[[^\]]*\]/g;
// `[ref]: https://example.com "title"` on its own line.
const LINK_DEFINITION = /^[ \t]*\[[^\]]+\]:[^\n]*$/gm;
const AUTOLINK = /<https?:\/\/[^>]*>/gi;
const HTML_TAG = /<\/?[A-Za-z][^>]*>/g;
// Setext underlines and horizontal rules: rows of -, =, *, _ alone.
const RULE_LINE = /^[ \t]*(?:[-=*_][ \t]*){3,}$/gm;
// Table delimiter rows: | --- | :--: |
const TABLE_DELIMITER =
  /^[ \t]*\|?[ \t]*:?-{2,}:?[ \t]*(?:\|[ \t]*:?-{2,}:?[ \t]*)*\|?[ \t]*$/gm;
const LEADING_MARKS = /^[ \t]*(?:[>#]+[ \t]*|[-+*][ \t]+|\d+[.)][ \t]+)+/gm;
// Emphasis, strikethrough, inline-code backticks, and table pipes. The
// words between them are kept; only the marks go.
const INLINE_MARKS = /[*_~`|]/g;
// A token is a word if it contains a letter or a digit — so "—", "|", and
// a bare "..." do not inflate a count, and "ASC" and "842-10-15" do.
const HAS_ALNUM = /[\p{L}\p{N}]/u;

/** The prose of a markdown section, with the machinery removed. */
export const stripMarkdown = (markdown: string): string => {
  let text = markdown.replace(HTML_COMMENT, " ");
  text = text.replace(FENCED_CODE, " ");
  text = text.replace(LINK_DEFINITION, " ");
  text = text.replace(IMAGE, " ");
  text = text.replace(IMAGE_REF, " ");
  text = text.replace(INLINE_LINK, "$1");
  text = text.replace(REF_LINK, "$1");
  text = text.replace(AUTOLINK, " ");
  text = text.replace(HTML_TAG, " ");
  text = text.replace(RULE_LINE, " ");
  text = text.replace(TABLE_DELIMITER, " ");
  text = text.replace(LEADING_MARKS, "");
  text = text.replace(INLINE_MARKS, " ");
  return text;
};

/** Words in one section's shipped markdown. */
export const countWords = (markdown: string): number =>
  stripMarkdown(markdown)
    .split(/\s+/)
    .filter((token) => token.length > 0 && HAS_ALNUM.test(token)).length;
