import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { getBlogPosts } from "@/lib/sanity/queries";
import { Section } from "@/components/layout/Section";
import { BlogGrid, BlogGridSkeleton } from "@/components/blog/BlogGrid";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://pooniya.com";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const categoryName = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return {
    title: `${categoryName} Articles`,
    description: `Blog posts about ${categoryName} — tutorials, guides, and insights by Mahendra Singh Puniya.`,
    alternates: { canonical: `${siteUrl}/blog/category/${slug}` },
    openGraph: {
      title: `${categoryName} Articles — Mahendra Singh Puniya`,
      description: `Blog posts about ${categoryName}.`,
      url: `${siteUrl}/blog/category/${slug}`,
      type: "website",
    },
  };
}

export const revalidate = 3600;

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const allPosts = await getBlogPosts();

  const filteredPosts = allPosts.filter((post) =>
    post.categories.some((cat) => cat.slug.current === slug),
  );

  const categoryName =
    filteredPosts[0]?.categories.find((c) => c.slug.current === slug)?.title ||
    slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  // All categories (for filter chips)
  const allCategories = Array.from(
    new Map(
      allPosts.flatMap((p) => p.categories).map((c) => [c.slug.current, c]),
    ).values(),
  );

  return (
    <Section
      title={categoryName}
      subtitle={`${filteredPosts.length} article${filteredPosts.length !== 1 ? "s" : ""} in this category`}
    >
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-[var(--text-secondary)]">
        <ol className="flex items-center gap-1.5">
          <li>
            <Link href="/" className="transition-colors hover:text-white">Home</Link>
          </li>
          <span>/</span>
          <li>
            <Link href="/blog" className="transition-colors hover:text-white">Blog</Link>
          </li>
          <span>/</span>
          <li className="text-white">{categoryName}</li>
        </ol>
      </nav>

      {filteredPosts.length > 0 ? (
        <Suspense fallback={<BlogGridSkeleton />}>
          <BlogGrid posts={filteredPosts} categories={allCategories} activeCategory={slug} />
        </Suspense>
      ) : (
        <div className="py-12 text-center">
          <p className="text-[var(--text-secondary)]">No posts in this category yet.</p>
          <Link href="/blog" className="text-primary-400 hover:text-primary-300 mt-2 inline-block">
            View all posts
          </Link>
        </div>
      )}
    </Section>
  );
}
