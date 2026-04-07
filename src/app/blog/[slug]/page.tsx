import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { getPostBySlug } from "@/lib/sanity/queries";
import { placeholderPosts } from "@/data/blog-placeholder";
import { PostContent } from "@/components/blog/PostContent";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Badge } from "@/components/ui/Badge";
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
  return {
    title: post.title,
    description: post.excerpt,
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
        <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
        <Link href="/blog" className="text-primary-400 hover:text-primary-300">Back to Blog</Link>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper className="py-section-sm lg:py-section">
      <Link href="/blog" className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-white mb-8 transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to Blog
      </Link>

      {post.coverImage && (
        <div className="relative h-64 md:h-96 rounded-glass overflow-hidden mb-8">
          <Image src={post.coverImage} alt={post.title} fill className="object-cover" sizes="100vw" priority />
        </div>
      )}

      <div className="max-w-3xl mx-auto">
        <div className="flex flex-wrap gap-2 mb-4">
          {post.categories.map((cat) => (
            <Badge key={cat.slug.current} variant="primary">{cat.title}</Badge>
          ))}
          {post.isPlaceholder && <Badge variant="warning">Coming Soon</Badge>}
        </div>

        <h1 className="text-[length:var(--text-h1)] font-bold font-[family-name:var(--font-display)] mb-4">
          {post.title}
        </h1>

        <div className="flex items-center gap-4 text-sm text-[var(--text-secondary)] mb-8">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" /> {formatDate(post.publishedAt)}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" /> {post.readingTime} min read
          </span>
        </div>

        <p className="text-lg text-[var(--text-secondary)] mb-8 leading-relaxed">{post.excerpt}</p>

        <div className="border-t border-white/5 pt-8">
          <PostContent body={post.body} />
        </div>
      </div>
    </PageWrapper>
  );
}
