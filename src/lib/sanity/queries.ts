import { sanityClient } from "./client";
import { placeholderPosts } from "@/data/blog-placeholder";
import type { BlogPost } from "@/types";

const postsQuery = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  "coverImage": coverImage.asset->url,
  publishedAt,
  readingTime,
  categories[]->{ title, slug },
  body
}`;

const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  excerpt,
  "coverImage": coverImage.asset->url,
  publishedAt,
  readingTime,
  categories[]->{ title, slug },
  body
}`;

function sanitizePost(post: BlogPost): BlogPost {
  return {
    ...post,
    categories: post.categories ?? [],
    excerpt: post.excerpt ?? "",
    readingTime: post.readingTime ?? 5,
    coverImage: post.coverImage ?? null,
  };
}

export async function getAllPosts(): Promise<BlogPost[]> {
  if (!sanityClient) return [];
  const posts: BlogPost[] = await sanityClient.fetch(postsQuery);
  return posts.map(sanitizePost);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!sanityClient) return null;
  const post: BlogPost | null = await sanityClient.fetch(postBySlugQuery, { slug });
  return post ? sanitizePost(post) : null;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const posts = await getAllPosts();
    return posts.length > 0 ? posts : placeholderPosts;
  } catch {
    return placeholderPosts;
  }
}
