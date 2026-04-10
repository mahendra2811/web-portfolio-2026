import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCalendarDays, faClock, faUser } from "@fortawesome/free-solid-svg-icons";
import { getPostBySlug, getAllPosts } from "@/lib/sanity/queries";
import { placeholderPosts } from "@/data/blog-placeholder";
import { personalInfo } from "@/data/personal";
import { PostContent } from "@/components/blog/PostContent";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Badge } from "@/components/ui/Badge";
import { BlogAnalytics } from "@/components/analytics/BlogAnalytics";
import { BlogJsonLd } from "@/components/seo/BlogJsonLd";
import { formatDate } from "@/lib/utils";
import type { BlogPost } from "@/types";

interface Props {
  params: Promise<{ slug: string }>;
}

export const revalidate = 3600;

export async function generateStaticParams() {
  return placeholderPosts.map((p) => ({ slug: p.slug.current }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post Not Found" };

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://pooniya.com";
  const postUrl = `${siteUrl}/blog/${slug}`;

  return {
    title: post.title,
    description: `${post.excerpt} (${post.readingTime} min read)`,
    alternates: { canonical: postUrl },
    robots: { index: true, follow: true },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: postUrl,
      publishedTime: post.publishedAt,
      modifiedTime: post.publishedAt,
      authors: [personalInfo.name],
      tags: post.categories.map((c) => c.title),
      ...(post.coverImage && {
        images: [{ url: post.coverImage, width: 1200, height: 630, alt: post.title }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      ...(post.coverImage && { images: [post.coverImage] }),
    },
  };
}

async function getPost(slug: string): Promise<BlogPost | null> {
  const sanityPost = await getPostBySlug(slug);
  if (sanityPost) return sanityPost;
  const placeholder = placeholderPosts.find((p) => p.slug.current === slug);
  return placeholder || null;
}

async function getRelatedPosts(currentSlug: string, categories: { title: string }[]): Promise<BlogPost[]> {
  const allPosts = await getAllPosts();
  if (allPosts.length === 0) return [];

  const categoryNames = new Set(categories.map((c) => c.title));

  const scored = allPosts
    .filter((p) => p.slug.current !== currentSlug)
    .map((p) => {
      const overlap = p.categories.filter((c) => categoryNames.has(c.title)).length;
      return { post: p, score: overlap };
    })
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, 3).map((s) => s.post);
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return (
      <PageWrapper className="py-section-sm lg:py-section text-center">
        <h1 className="mb-4 text-2xl font-bold">Post Not Found</h1>
        <Link href="/blog" className="text-primary-400 hover:text-primary-300">
          Back to Blog
        </Link>
      </PageWrapper>
    );
  }

  const relatedPosts = await getRelatedPosts(slug, post.categories);

  return (
    <PageWrapper className="py-section-sm lg:py-section">
      <BlogJsonLd
        title={post.title}
        excerpt={post.excerpt}
        slug={slug}
        publishedAt={post.publishedAt}
        coverImage={post.coverImage}
        readingTime={post.readingTime}
        categories={post.categories}
      />
      <BlogAnalytics
        title={post.title}
        slug={slug}
        categories={post.categories.map((c) => c.title)}
        readingTime={post.readingTime}
        publishedAt={post.publishedAt}
      />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-[var(--text-secondary)]">
        <ol className="flex items-center gap-1.5" itemScope itemType="https://schema.org/BreadcrumbList">
          <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            <Link href="/" className="transition-colors hover:text-white" itemProp="item">
              <span itemProp="name">Home</span>
            </Link>
            <meta itemProp="position" content="1" />
          </li>
          <span>/</span>
          <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            <Link href="/blog" className="transition-colors hover:text-white" itemProp="item">
              <span itemProp="name">Blog</span>
            </Link>
            <meta itemProp="position" content="2" />
          </li>
          <span>/</span>
          <li
            className="line-clamp-1 text-white"
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            <span itemProp="name">{post.title}</span>
            <meta itemProp="position" content="3" />
          </li>
        </ol>
      </nav>

      {post.coverImage && (
        <div className="rounded-glass relative mb-8 h-64 overflow-hidden md:h-96">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
      )}

      <div className="mx-auto max-w-3xl">
        <div className="mb-4 flex flex-wrap gap-2">
          {post.categories.map((cat) => (
            <Badge key={cat.slug.current} variant="primary">
              {cat.title}
            </Badge>
          ))}
          {post.isPlaceholder && <Badge variant="warning">Coming Soon</Badge>}
        </div>

        <h1 className="mb-4 font-[family-name:var(--font-display)] text-[length:var(--text-h1)] font-bold">
          {post.title}
        </h1>

        {/* Author Byline + Meta */}
        <div className="mb-8 flex flex-wrap items-center gap-4 text-sm text-[var(--text-secondary)]">
          <span className="flex items-center gap-1.5">
            <FontAwesomeIcon icon={faUser} className="h-4 w-4" style={{ color: "#10B981" }} />
            {personalInfo.name}
          </span>
          <time dateTime={post.publishedAt} className="flex items-center gap-1.5">
            <FontAwesomeIcon icon={faCalendarDays} className="h-4 w-4" style={{ color: "#6366F1" }} />
            {formatDate(post.publishedAt)}
          </time>
          <span className="flex items-center gap-1.5">
            <FontAwesomeIcon icon={faClock} className="h-4 w-4" style={{ color: "#06B6D4" }} />
            {post.readingTime} min read
          </span>
        </div>

        <p className="mb-8 text-lg leading-relaxed text-[var(--text-secondary)]">{post.excerpt}</p>

        {/* Table of Contents */}
        <div className="mb-8">
          <TableOfContents />
        </div>

        <div className="border-t border-white/5 pt-8">
          <PostContent body={post.body} />
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-16 border-t border-white/5 pt-8">
            <h2 className="mb-6 text-xl font-semibold">Related Posts</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((related) => (
                <Link
                  key={related._id}
                  href={`/blog/${related.slug.current}`}
                  className="glass-card block rounded-xl p-4 transition-colors hover:border-white/10"
                >
                  <h3 className="mb-2 line-clamp-2 font-semibold">{related.title}</h3>
                  <p className="line-clamp-2 text-sm text-[var(--text-secondary)]">{related.excerpt}</p>
                  <time
                    dateTime={related.publishedAt}
                    className="mt-2 block text-xs text-[var(--text-secondary)]"
                  >
                    {formatDate(related.publishedAt)}
                  </time>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Back to Blog */}
        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="text-primary-400 hover:text-primary-300 inline-flex items-center gap-2 transition-colors"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="h-4 w-4" />
            Back to all posts
          </Link>
        </div>
      </div>
    </PageWrapper>
  );
}
