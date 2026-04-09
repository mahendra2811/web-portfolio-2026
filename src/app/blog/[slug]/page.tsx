import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCalendarDays, faClock } from "@fortawesome/free-solid-svg-icons";
import { getPostBySlug } from "@/lib/sanity/queries";
import { placeholderPosts } from "@/data/blog-placeholder";
import { PostContent } from "@/components/blog/PostContent";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Badge } from "@/components/ui/Badge";
import { BlogAnalytics } from "@/components/analytics/BlogAnalytics";
import { BlogJsonLd } from "@/components/seo/BlogJsonLd";
import { formatDate } from "@/lib/utils";
import type { BlogPost } from "@/types";

interface Props {
  params: Promise<{ slug: string }>;
}

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
    description: post.excerpt,
    alternates: { canonical: postUrl },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: postUrl,
      publishedTime: post.publishedAt,
      authors: ["Mahendra Singh Puniya"],
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
      <Link
        href="/blog"
        className="mb-8 inline-flex items-center gap-2 text-[var(--text-secondary)] transition-colors hover:text-white"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="h-4 w-4" /> Back to Blog
      </Link>

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

        <div className="mb-8 flex items-center gap-4 text-sm text-[var(--text-secondary)]">
          <span className="flex items-center gap-1.5">
            <FontAwesomeIcon
              icon={faCalendarDays}
              className="h-4 w-4"
              style={{ color: "#6366F1" }}
            />
            {formatDate(post.publishedAt)}
          </span>
          <span className="flex items-center gap-1.5">
            <FontAwesomeIcon icon={faClock} className="h-4 w-4" style={{ color: "#06B6D4" }} />
            {post.readingTime} min read
          </span>
        </div>

        <p className="mb-8 text-lg leading-relaxed text-[var(--text-secondary)]">{post.excerpt}</p>

        <div className="border-t border-white/5 pt-8">
          <PostContent body={post.body} />
        </div>
      </div>
    </PageWrapper>
  );
}
