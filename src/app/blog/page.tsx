import type { Metadata } from "next";
import { Suspense } from "react";
import { getBlogPosts } from "@/lib/sanity/queries";
import { Section } from "@/components/layout/Section";
import { BlogGrid, BlogGridSkeleton } from "@/components/blog/BlogGrid";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://pooniya.com";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articles on AI, web development, React, Next.js, LLMs, prompt engineering, and software engineering by Mahendra Singh Puniya.",
  alternates: { canonical: `${siteUrl}/blog` },
  openGraph: {
    title: "Blog — Mahendra Singh Puniya",
    description: "Articles on AI, web development, and software engineering.",
    url: `${siteUrl}/blog`,
    type: "website",
  },
};

export const revalidate = 60;

export default async function BlogPage() {
  const allPosts = await getBlogPosts();

  // Extract unique categories from all posts
  const categories = Array.from(
    new Map(
      allPosts.flatMap((p) => p.categories).map((c) => [c.slug.current, c]),
    ).values(),
  );

  return (
    <Section title="Blog" subtitle="Thoughts, tutorials, and insights on web development">
      {allPosts.length > 0 ? (
        <Suspense fallback={<BlogGridSkeleton />}>
          <BlogGrid posts={allPosts} categories={categories} />
        </Suspense>
      ) : (
        <div className="py-12 text-center">
          <p className="text-[var(--text-secondary)]">No posts yet. Check back soon!</p>
        </div>
      )}
    </Section>
  );
}
