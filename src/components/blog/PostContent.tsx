"use client";

import { PortableText } from "@portabletext/react";

interface PostContentProps {
  body: unknown;
}

const components = {
  block: {
    h1: ({ children }: { children?: React.ReactNode }) => (
      <h1 className="mt-8 mb-4 text-3xl font-bold">{children}</h1>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="mt-8 mb-3 text-2xl font-bold">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="mt-6 mb-2 text-xl font-semibold">{children}</h3>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="mb-4 leading-relaxed text-[var(--text-secondary)]">{children}</p>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-primary-500 my-4 border-l-2 pl-4 text-[var(--text-secondary)] italic">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }: { children?: React.ReactNode; value?: { href: string } }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary-400 hover:text-primary-300 underline"
      >
        {children}
      </a>
    ),
    code: ({ children }: { children?: React.ReactNode }) => (
      <code className="bg-surface-muted rounded px-1.5 py-0.5 font-[family-name:var(--font-mono)] text-sm">
        {children}
      </code>
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
