"use client";

import { PortableText } from "@portabletext/react";
import { useState } from "react";
import {
  TableRenderer,
  CalloutRenderer,
  DividerRenderer,
  HighlightRenderer,
  CollapsibleRenderer,
} from "./BlogBlocks";

interface PostContentProps {
  body: unknown;
}

function slugifyHeading(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function CodeBlock({ code, language }: { code?: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (code) {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="group relative my-6 overflow-hidden rounded-lg border border-white/5">
      <div className="flex items-center justify-between bg-white/5 px-4 py-2 text-xs text-[var(--text-secondary)]">
        <span className="font-[family-name:var(--font-mono)] uppercase">{language || "code"}</span>
        <button
          onClick={handleCopy}
          className="rounded px-2 py-1 transition-colors hover:bg-white/10 hover:text-white"
          aria-label="Copy code"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto bg-[#0d1117] p-4 text-sm leading-relaxed">
        <code className="font-[family-name:var(--font-mono)] text-[#e6edf3]">{code}</code>
      </pre>
    </div>
  );
}

const components = {
  block: {
    h1: ({ children }: { children?: React.ReactNode }) => {
      const text = typeof children === "string" ? children : String(children);
      const id = slugifyHeading(text);
      return <h1 id={id} className="mt-10 mb-4 scroll-mt-24 text-3xl font-bold">{children}</h1>;
    },
    h2: ({ children }: { children?: React.ReactNode }) => {
      const text = typeof children === "string" ? children : String(children);
      const id = slugifyHeading(text);
      return <h2 id={id} className="mt-10 mb-3 scroll-mt-24 text-2xl font-bold">{children}</h2>;
    },
    h3: ({ children }: { children?: React.ReactNode }) => {
      const text = typeof children === "string" ? children : String(children);
      const id = slugifyHeading(text);
      return <h3 id={id} className="mt-8 mb-2 scroll-mt-24 text-xl font-semibold">{children}</h3>;
    },
    h4: ({ children }: { children?: React.ReactNode }) => (
      <h4 className="mt-6 mb-2 text-lg font-semibold">{children}</h4>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="mb-4 leading-relaxed text-[var(--text-secondary)]">{children}</p>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-primary-500 my-6 rounded-r-lg border-l-2 bg-white/[0.02] py-3 pl-4 pr-4 text-[var(--text-secondary)] italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="mb-4 list-disc space-y-1 pl-6 text-[var(--text-secondary)]">{children}</ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="mb-4 list-decimal space-y-1 pl-6 text-[var(--text-secondary)]">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <li className="leading-relaxed">{children}</li>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <li className="leading-relaxed">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-semibold text-white">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em>{children}</em>
    ),
    link: ({ children, value }: { children?: React.ReactNode; value?: { href: string } }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary-400 hover:text-primary-300 underline decoration-primary-400/30 underline-offset-2 transition-colors"
      >
        {children}
      </a>
    ),
    code: ({ children }: { children?: React.ReactNode }) => (
      <code className="rounded bg-white/10 px-1.5 py-0.5 font-[family-name:var(--font-mono)] text-sm text-[#e6edf3]">
        {children}
      </code>
    ),
  },
  types: {
    code: ({ value }: { value: { code?: string; language?: string } }) => (
      <CodeBlock code={value.code} language={value.language} />
    ),
    image: ({ value }: { value: { alt?: string; url?: string } }) => {
      if (!value.url) return null;
      return (
        <figure className="my-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value.url}
            alt={value.alt || ""}
            className="w-full rounded-lg"
            loading="lazy"
          />
          {value.alt && (
            <figcaption className="mt-2 text-center text-sm text-[var(--text-secondary)]">
              {value.alt}
            </figcaption>
          )}
        </figure>
      );
    },
    table: ({ value }: { value: { headers?: string[]; alignments?: string[]; rows?: string[][] } }) => (
      <TableRenderer headers={value.headers} alignments={value.alignments} rows={value.rows} />
    ),
    callout: ({ value }: { value: { calloutType?: string; text?: string } }) => (
      <CalloutRenderer calloutType={value.calloutType} text={value.text} />
    ),
    divider: () => <DividerRenderer />,
    highlight: ({ value }: { value: { text?: string } }) => (
      <HighlightRenderer text={value.text} />
    ),
    collapsible: ({ value }: { value: { summary?: string; content?: unknown } }) => (
      <CollapsibleRenderer summary={value.summary} content={value.content} portableTextComponents={components} />
    ),
  },
};

export function PostContent({ body }: PostContentProps) {
  if (!body) {
    return (
      <div className="py-12 text-center text-[var(--text-secondary)]">
        <p>This article is coming soon. Check back later!</p>
      </div>
    );
  }

  return (
    <div className="prose-invert max-w-none">
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <PortableText value={body as any} components={components} />
    </div>
  );
}
