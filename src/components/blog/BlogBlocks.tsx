"use client";

import { PortableText } from "@portabletext/react";
import { Lightbulb, AlertTriangle, Info, BookOpen, ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

// ── Inline markdown parser for table cells ──────────────────────

function parseInlineMarkdown(text: string): ReactNode {
  const parts: ReactNode[] = [];
  const regex = /(\*\*(.+?)\*\*)|(\*(.+?)\*)|(`(.+?)`)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let idx = 0;

  while ((m = regex.exec(text)) !== null) {
    if (m.index > last) {
      parts.push(text.slice(last, m.index));
    }
    if (m[2]) {
      parts.push(<strong key={idx++} className="font-semibold text-white">{m[2]}</strong>);
    } else if (m[4]) {
      parts.push(<em key={idx++}>{m[4]}</em>);
    } else if (m[6]) {
      parts.push(
        <code key={idx++} className="rounded bg-white/10 px-1 py-0.5 font-[family-name:var(--font-mono)] text-xs text-[#e6edf3]">
          {m[6]}
        </code>
      );
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts.length === 1 ? parts[0] : <>{parts}</>;
}

// ── Table Renderer ──────────────────────────────────────────────

interface TableProps {
  headers?: string[];
  alignments?: string[];
  rows?: string[][];
}

export function TableRenderer({ headers, alignments, rows }: TableProps) {
  if (!headers?.length) return null;

  const getAlign = (i: number): "left" | "center" | "right" => {
    const a = alignments?.[i];
    if (a === "center" || a === "right") return a;
    return "left";
  };

  return (
    <div className="blog-table-wrapper my-6 overflow-x-auto rounded-lg border border-white/5">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-white/10 bg-white/[0.05]">
            {headers.map((h, i) => (
              <th
                key={i}
                style={{ textAlign: getAlign(i) }}
                className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white"
              >
                {parseInlineMarkdown(h)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows?.map((row, ri) => (
            <tr
              key={ri}
              className={`border-b border-white/5 transition-colors hover:bg-white/[0.03] ${ri % 2 === 1 ? "bg-white/[0.02]" : ""}`}
            >
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  style={{ textAlign: getAlign(ci) }}
                  className="px-4 py-2.5 text-[var(--text-secondary)]"
                >
                  {parseInlineMarkdown(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Callout Renderer ────────────────────────────────────────────

const calloutConfig: Record<string, { icon: typeof Info; color: string; label: string }> = {
  tip: { icon: Lightbulb, color: "#10B981", label: "Tip" },
  warning: { icon: AlertTriangle, color: "#F59E0B", label: "Warning" },
  caution: { icon: AlertTriangle, color: "#F59E0B", label: "Caution" },
  note: { icon: Info, color: "#3B82F6", label: "Note" },
  info: { icon: BookOpen, color: "#06B6D4", label: "Info" },
  important: { icon: Info, color: "#8B5CF6", label: "Important" },
};

interface CalloutProps {
  calloutType?: string;
  text?: string;
}

export function CalloutRenderer({ calloutType, text }: CalloutProps) {
  const config = calloutConfig[calloutType || "note"] || calloutConfig.note;
  const Icon = config.icon;

  return (
    <div
      className="my-6 rounded-lg border-l-4 bg-white/[0.03] p-4"
      style={{ borderLeftColor: config.color }}
    >
      <div className="flex items-start gap-3">
        <Icon className="mt-0.5 h-5 w-5 shrink-0" style={{ color: config.color }} />
        <div>
          <p
            className="mb-1 text-xs font-semibold uppercase tracking-wider"
            style={{ color: config.color }}
          >
            {config.label}
          </p>
          <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{text}</p>
        </div>
      </div>
    </div>
  );
}

// ── Divider Renderer ────────────────────────────────────────────

export function DividerRenderer() {
  return <hr className="metallic-divider my-8 border-0" />;
}

// ── Highlight Renderer ──────────────────────────────────────────

interface HighlightProps {
  text?: string;
}

export function HighlightRenderer({ text }: HighlightProps) {
  return (
    <div className="my-6 rounded-lg border border-indigo-500/20 bg-gradient-to-r from-indigo-500/5 to-cyan-500/5 p-5">
      <p className="text-base font-medium leading-relaxed text-white">{text}</p>
    </div>
  );
}

// ── Collapsible Renderer ────────────────────────────────────────

interface CollapsibleProps {
  summary?: string;
  content?: unknown;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  portableTextComponents?: any;
}

export function CollapsibleRenderer({ summary, content, portableTextComponents }: CollapsibleProps) {
  return (
    <details className="group my-6 rounded-lg border border-white/5 bg-white/[0.02]">
      <summary className="cursor-pointer list-none px-4 py-3 text-sm font-semibold text-white transition-colors hover:text-indigo-400 [&::-webkit-details-marker]:hidden">
        <span className="flex items-center gap-2">
          <ChevronRight className="h-4 w-4 shrink-0 transition-transform group-open:rotate-90" />
          {summary}
        </span>
      </summary>
      <div className="border-t border-white/5 px-4 py-4">
        {content ? (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          <PortableText value={content as any} components={portableTextComponents} />
        ) : null}
      </div>
    </details>
  );
}
