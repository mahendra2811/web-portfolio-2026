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

export async function getAllPosts(): Promise<BlogPost[]> {
  if (!sanityClient) return [];
  return sanityClient.fetch(postsQuery);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!sanityClient) return null;
  return sanityClient.fetch(postBySlugQuery, { slug });
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const posts = await getAllPosts();
    return posts.length > 0 ? posts : placeholderPosts;
  } catch {
    return placeholderPosts;
  }
}
