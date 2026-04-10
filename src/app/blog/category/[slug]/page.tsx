import type { Metadata } from "next";
import Link from "next/link";
import { getBlogPosts } from "@/lib/sanity/queries";
import { Section } from "@/components/layout/Section";
import { PostCard } from "@/components/blog/PostCard";

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
    post.categories.some((cat) => cat.slug.current === slug)
  );

  const categoryName = filteredPosts[0]?.categories.find((c) => c.slug.current === slug)?.title ||
    slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  // All categories for sidebar navigation
  const allCategories = Array.from(
    new Map(
      allPosts.flatMap((p) => p.categories).map((c) => [c.slug.current, c])
    ).values()
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

      {/* Category filter */}
      <div className="mb-8 flex flex-wrap gap-2">
        <Link
          href="/blog"
          className="rounded-full border border-white/10 px-3 py-1 text-sm text-[var(--text-secondary)] transition-colors hover:border-white/20 hover:bg-white/5 hover:text-white"
        >
          All Posts
        </Link>
        {allCategories.map((cat) => (
          <Link
            key={cat.slug.current}
            href={`/blog/category/${cat.slug.current}`}
            className={`rounded-full border px-3 py-1 text-sm transition-colors ${
              cat.slug.current === slug
                ? "border-primary-500 bg-primary-500/10 text-primary-400"
                : "border-white/10 text-[var(--text-secondary)] hover:border-white/20 hover:bg-white/5 hover:text-white"
            }`}
          >
            {cat.title}
          </Link>
        ))}
      </div>

      {filteredPosts.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
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
