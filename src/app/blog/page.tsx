import type { Metadata } from "next";
import Link from "next/link";
import { getBlogPosts } from "@/lib/sanity/queries";
import { Section } from "@/components/layout/Section";
import { BlogGrid } from "@/components/blog/BlogGrid";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://pooniya.com";
const POSTS_PER_PAGE = 9;

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

interface Props {
  searchParams: Promise<{ page?: string }>;
}

export default async function BlogPage({ searchParams }: Props) {
  const params = await searchParams;
  const currentPage = Math.max(1, Number(params.page) || 1);
  const allPosts = await getBlogPosts();

  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const posts = allPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  // Get unique categories for filter links
  const categories = Array.from(
    new Map(
      allPosts
        .flatMap((p) => p.categories)
        .map((c) => [c.slug.current, c])
    ).values()
  );

  return (
    <Section title="Blog" subtitle="Thoughts, tutorials, and insights on web development">
      {/* Category filter links */}
      {categories.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-2">
          <Link
            href="/blog"
            className="rounded-full border border-white/10 px-3 py-1 text-sm text-white transition-colors hover:border-white/20 hover:bg-white/5"
          >
            All Posts
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.slug.current}
              href={`/blog/category/${cat.slug.current}`}
              className="rounded-full border border-white/10 px-3 py-1 text-sm text-[var(--text-secondary)] transition-colors hover:border-white/20 hover:bg-white/5 hover:text-white"
            >
              {cat.title}
            </Link>
          ))}
        </div>
      )}

      {posts.length > 0 ? (
        <BlogGrid posts={posts} />
      ) : (
        <div className="py-12 text-center">
          <p className="text-[var(--text-secondary)]">No posts yet. Check back soon!</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <nav aria-label="Blog pagination" className="mt-12 flex items-center justify-center gap-2">
          {currentPage > 1 && (
            <Link
              href={currentPage === 2 ? "/blog" : `/blog?page=${currentPage - 1}`}
              className="rounded-lg border border-white/10 px-4 py-2 text-sm transition-colors hover:border-white/20 hover:bg-white/5"
              rel="prev"
            >
              Previous
            </Link>
          )}

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Link
              key={page}
              href={page === 1 ? "/blog" : `/blog?page=${page}`}
              className={`rounded-lg border px-3 py-2 text-sm transition-colors ${
                page === currentPage
                  ? "border-primary-500 bg-primary-500/10 text-primary-400"
                  : "border-white/10 hover:border-white/20 hover:bg-white/5"
              }`}
              aria-current={page === currentPage ? "page" : undefined}
            >
              {page}
            </Link>
          ))}

          {currentPage < totalPages && (
            <Link
              href={`/blog?page=${currentPage + 1}`}
              className="rounded-lg border border-white/10 px-4 py-2 text-sm transition-colors hover:border-white/20 hover:bg-white/5"
              rel="next"
            >
              Next
            </Link>
          )}
        </nav>
      )}

      {/* Post count */}
      <p className="mt-6 text-center text-sm text-[var(--text-secondary)]">
        Showing {startIndex + 1}–{Math.min(startIndex + POSTS_PER_PAGE, allPosts.length)} of{" "}
        {allPosts.length} posts
      </p>
    </Section>
  );
}
