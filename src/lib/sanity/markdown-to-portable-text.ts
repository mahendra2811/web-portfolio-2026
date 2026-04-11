/**
 * Converts markdown string to Sanity Portable Text blocks.
 * Supports: headings, paragraphs, bold, italic, inline code, links,
 * blockquotes, bullet/number lists, fenced code blocks, images,
 * tables, callouts (> [!TIP]), dividers, highlights, collapsible sections.
 */

interface MarkDef {
  _type: string;
  _key: string;
  href?: string;
}

interface Span {
  _type: "span";
  _key: string;
  text: string;
  marks: string[];
}

interface Block {
  _type: "block";
  _key: string;
  style: string;
  markDefs: MarkDef[];
  children: Span[];
  level?: number;
  listItem?: "bullet" | "number";
}

interface CodeBlock {
  _type: "code";
  _key: string;
  language: string;
  code: string;
}

interface ImageBlock {
  _type: "image";
  _key: string;
  alt?: string;
  url?: string;
}

interface TableBlock {
  _type: "table";
  _key: string;
  headers: string[];
  alignments: ("left" | "center" | "right")[];
  rows: string[][];
}

interface DividerBlock {
  _type: "divider";
  _key: string;
  style: string;
}

interface CalloutBlock {
  _type: "callout";
  _key: string;
  calloutType: string;
  text: string;
}

interface HighlightBlock {
  _type: "highlight";
  _key: string;
  text: string;
}

interface CollapsibleBlock {
  _type: "collapsible";
  _key: string;
  summary: string;
  content: PortableTextBlock[];
}

type PortableTextBlock =
  | Block
  | CodeBlock
  | ImageBlock
  | TableBlock
  | DividerBlock
  | CalloutBlock
  | HighlightBlock
  | CollapsibleBlock;

let _counter = 0;
function key(): string {
  return `k${(++_counter).toString(36)}${Date.now().toString(36).slice(-4)}`;
}

function parseInlineMarks(text: string): { spans: Span[]; markDefs: MarkDef[] } {
  const spans: Span[] = [];
  const markDefs: MarkDef[] = [];

  const regex =
    /(\*\*(.+?)\*\*)|(\*(.+?)\*)|(`(.+?)`)|(\[([^\]]+)\]\(([^)]+)\))/g;
  let last = 0;
  let m: RegExpExecArray | null;

  while ((m = regex.exec(text)) !== null) {
    if (m.index > last) {
      spans.push({ _type: "span", _key: key(), text: text.slice(last, m.index), marks: [] });
    }

    if (m[2]) {
      spans.push({ _type: "span", _key: key(), text: m[2], marks: ["strong"] });
    } else if (m[4]) {
      spans.push({ _type: "span", _key: key(), text: m[4], marks: ["em"] });
    } else if (m[6]) {
      spans.push({ _type: "span", _key: key(), text: m[6], marks: ["code"] });
    } else if (m[8] && m[9]) {
      const linkKey = key();
      markDefs.push({ _type: "link", _key: linkKey, href: m[9] });
      spans.push({ _type: "span", _key: key(), text: m[8], marks: [linkKey] });
    }

    last = m.index + m[0].length;
  }

  if (last < text.length) {
    spans.push({ _type: "span", _key: key(), text: text.slice(last), marks: [] });
  }

  if (spans.length === 0) {
    spans.push({ _type: "span", _key: key(), text, marks: [] });
  }

  return { spans, markDefs };
}

function makeBlock(style: string, text: string, listItem?: "bullet" | "number", level?: number): Block {
  const { spans, markDefs } = parseInlineMarks(text);
  const block: Block = { _type: "block", _key: key(), style, markDefs, children: spans };
  if (listItem) block.listItem = listItem;
  if (level) block.level = level;
  return block;
}

// ── Table helpers ───────────────────────────────────────────────

function isTableRow(line: string): boolean {
  return /^\s*\|/.test(line) && /\|\s*$/.test(line.trim());
}

function isSeparatorRow(line: string): boolean {
  return /^\s*\|(\s*:?-+:?\s*\|)+\s*$/.test(line);
}

function parseTableRow(line: string): string[] {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

function parseAlignments(separatorLine: string): ("left" | "center" | "right")[] {
  return parseTableRow(separatorLine).map((cell) => {
    const trimmed = cell.trim();
    if (trimmed.startsWith(":") && trimmed.endsWith(":")) return "center";
    if (trimmed.endsWith(":")) return "right";
    return "left";
  });
}

// ── Callout helpers ─────────────────────────────────────────────

const CALLOUT_TYPES = ["tip", "warning", "note", "info", "important", "caution"];

function isCalloutStart(line: string): string | null {
  const match = line.match(/^>\s*\[!(TIP|WARNING|NOTE|INFO|IMPORTANT|CAUTION)\]\s*$/i);
  return match ? match[1].toLowerCase() : null;
}

// ── Main parser ─────────────────────────────────────────────────

export function markdownToPortableText(markdown: string): PortableTextBlock[] {
  _counter = 0;
  const blocks: PortableTextBlock[] = [];
  const lines = markdown.split("\n");
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Empty line — skip
    if (line.trim() === "") {
      i++;
      continue;
    }

    // Fenced code block
    const codeMatch = line.match(/^```(\w*)/);
    if (codeMatch) {
      const lang = codeMatch[1] || "text";
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```
      blocks.push({ _type: "code", _key: key(), language: lang, code: codeLines.join("\n") });
      continue;
    }

    // ── Table ───────────────────────────────────────────────────
    if (isTableRow(line)) {
      const tableLines: string[] = [];
      let j = i;
      while (j < lines.length && isTableRow(lines[j])) {
        tableLines.push(lines[j]);
        j++;
      }
      // Need at least 2 lines (header + separator) to be a valid table
      if (tableLines.length >= 2) {
        const sepIdx = tableLines.findIndex((l) => isSeparatorRow(l));
        if (sepIdx >= 0) {
          const headerRows = tableLines.slice(0, sepIdx);
          const headers = headerRows.length > 0 ? parseTableRow(headerRows[headerRows.length - 1]) : [];
          const alignments = parseAlignments(tableLines[sepIdx]);
          const bodyRows = tableLines.slice(sepIdx + 1).map((l) => parseTableRow(l));

          blocks.push({
            _type: "table",
            _key: key(),
            headers,
            alignments,
            rows: bodyRows,
          });
          i = j;
          continue;
        }
      }
      // Not a valid table — fall through to paragraph
    }

    // ── Collapsible (<details>) ─────────────────────────────────
    if (line.trim() === "<details>") {
      i++;
      let summary = "Details";
      // Look for <summary>
      if (i < lines.length) {
        const sumMatch = lines[i].match(/<summary>(.*?)<\/summary>/);
        if (sumMatch) {
          summary = sumMatch[1].trim();
          i++;
        }
      }
      // Collect inner content until </details>
      const innerLines: string[] = [];
      while (i < lines.length && lines[i].trim() !== "</details>") {
        innerLines.push(lines[i]);
        i++;
      }
      i++; // skip </details>

      const content = markdownToPortableText(innerLines.join("\n"));
      blocks.push({
        _type: "collapsible",
        _key: key(),
        summary,
        content,
      });
      continue;
    }

    // Headings
    const hMatch = line.match(/^(#{1,6})\s+(.+)/);
    if (hMatch) {
      const level = Math.min(hMatch[1].length, 4);
      blocks.push(makeBlock(`h${level}`, hMatch[2]));
      i++;
      continue;
    }

    // ── Callout (> [!TIP], > [!WARNING], etc.) ──────────────────
    const calloutType = isCalloutStart(line);
    if (calloutType) {
      i++;
      const bodyLines: string[] = [];
      while (i < lines.length && lines[i].startsWith("> ")) {
        bodyLines.push(lines[i].slice(2));
        i++;
      }
      blocks.push({
        _type: "callout",
        _key: key(),
        calloutType,
        text: bodyLines.join("\n"),
      });
      continue;
    }

    // ── Highlight (> **HIGHLIGHT:** text) ───────────────────────
    const highlightMatch = line.match(/^>\s*\*\*HIGHLIGHT:\*\*\s*(.+)/);
    if (highlightMatch) {
      blocks.push({
        _type: "highlight",
        _key: key(),
        text: highlightMatch[1].trim(),
      });
      i++;
      continue;
    }

    // Blockquote
    if (line.startsWith("> ")) {
      blocks.push(makeBlock("blockquote", line.slice(2)));
      i++;
      continue;
    }

    // Unordered list
    const ulMatch = line.match(/^(\s*)[-*+]\s+(.+)/);
    if (ulMatch) {
      const indent = Math.floor(ulMatch[1].length / 2) + 1;
      blocks.push(makeBlock("normal", ulMatch[2], "bullet", indent));
      i++;
      continue;
    }

    // Ordered list
    const olMatch = line.match(/^(\s*)\d+\.\s+(.+)/);
    if (olMatch) {
      const indent = Math.floor(olMatch[1].length / 2) + 1;
      blocks.push(makeBlock("normal", olMatch[2], "number", indent));
      i++;
      continue;
    }

    // ── Divider (---) ───────────────────────────────────────────
    if (/^(\s*[-*_]){3,}\s*$/.test(line)) {
      blocks.push({ _type: "divider", _key: key(), style: "default" });
      i++;
      continue;
    }

    // Image  ![alt](url)
    const imgMatch = line.match(/^!\[([^\]]*)\]\(([^)]+)\)/);
    if (imgMatch) {
      blocks.push({ _type: "image", _key: key(), alt: imgMatch[1], url: imgMatch[2] });
      i++;
      continue;
    }

    // Regular paragraph
    blocks.push(makeBlock("normal", line));
    i++;
  }

  return blocks;
}

export function portableTextToPlainText(blocks: PortableTextBlock[]): string {
  return blocks
    .filter((b): b is Block => b._type === "block")
    .map((b) => b.children.map((c) => c.text).join(""))
    .join(" ");
}
