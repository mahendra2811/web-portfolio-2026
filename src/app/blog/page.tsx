import type { Metadata } from "next";
import { getBlogPosts } from "@/lib/sanity/queries";
import { Section } from "@/components/layout/Section";
import { PostCard } from "@/components/blog/PostCard";

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts on web development, React, Next.js, and software engineering.",
};

export const revalidate = 60;

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <Section title="Blog" subtitle="Thoughts, tutorials, and insights on web development">
      {posts.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <div className="py-12 text-center">
          <p className="text-[var(--text-secondary)]">No posts yet. Check back soon!</p>
        </div>
      )}
    </Section>
  );
}
