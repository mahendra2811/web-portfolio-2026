"use client";

import { PortableText } from "@portabletext/react";

interface PostContentProps {
  body: unknown;
}

const components = {
  block: {
    h1: ({ children }: { children?: React.ReactNode }) => <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>,
    h2: ({ children }: { children?: React.ReactNode }) => <h2 className="text-2xl font-bold mt-8 mb-3">{children}</h2>,
    h3: ({ children }: { children?: React.ReactNode }) => <h3 className="text-xl font-semibold mt-6 mb-2">{children}</h3>,
    normal: ({ children }: { children?: React.ReactNode }) => <p className="mb-4 text-[var(--text-secondary)] leading-relaxed">{children}</p>,
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-2 border-primary-500 pl-4 my-4 italic text-[var(--text-secondary)]">{children}</blockquote>
    ),
  },
  marks: {
    link: ({ children, value }: { children?: React.ReactNode; value?: { href: string } }) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300 underline">
        {children}
      </a>
    ),
    code: ({ children }: { children?: React.ReactNode }) => (
      <code className="bg-surface-muted px-1.5 py-0.5 rounded text-sm font-[family-name:var(--font-mono)]">{children}</code>
    ),
  },
};

export function PostContent({ body }: PostContentProps) {
  if (!body) {
    return (
      <div className="text-center py-12 text-[var(--text-secondary)]">
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
