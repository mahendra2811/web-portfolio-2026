#!/usr/bin/env npx tsx
/**
 * One-off: upload new cover images and patch the 4 posts that had 404'd covers.
 */

import { createClient } from "@sanity/client";
import { existsSync, readFileSync } from "fs";
import { join } from "path";

function loadEnv() {
  const paths = [".env", ".env.local"]
    .map((p) => join(process.cwd(), p))
    .filter(existsSync);
  for (const p of paths) {
    for (const line of readFileSync(p, "utf-8").split("\n")) {
      const t = line.trim();
      if (!t || t.startsWith("#")) continue;
      const eq = t.indexOf("=");
      if (eq === -1) continue;
      const k = t.slice(0, eq).trim();
      const v = t.slice(eq + 1).trim();
      if (!process.env[k]) process.env[k] = v;
    }
  }
}
loadEnv();

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN || process.env.NEXT_PUBLIC_SANITY_TOKEN_KEY,
  useCdn: false,
});

const updates: Array<{ slug: string; imageUrl: string }> = [
  {
    slug: "agentic-browsers-comet-dia-and-arc-are-eating-chrome",
    imageUrl: "https://images.unsplash.com/photo-1573164574572-cb89e39749b4?w=1200&h=630&fit=crop&auto=format",
  },
  {
    slug: "ai-cost-optimization-12-patterns-that-cut-my-bill-73",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=630&fit=crop&auto=format",
  },
  {
    slug: "ai-debugging-letting-claude-find-bugs-you-missed",
    imageUrl: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=1200&h=630&fit=crop&auto=format",
  },
  {
    slug: "llama-4-self-hosting-was-it-worth-12000",
    imageUrl: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=1200&h=630&fit=crop&auto=format",
  },
];

async function patchOne(slug: string, imageUrl: string) {
  const post = await client.fetch<{ _id: string; title: string } | null>(
    `*[_type == "post" && slug.current == $slug][0]{ _id, title }`,
    { slug }
  );
  if (!post) {
    console.log(`  ✗ Post not found: ${slug}`);
    return false;
  }

  const res = await fetch(imageUrl, { redirect: "follow" });
  if (!res.ok) {
    console.log(`  ✗ Image fetch ${res.status}: ${imageUrl}`);
    return false;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  const ct = res.headers.get("content-type") || "image/jpeg";
  const ext = ct.includes("png") ? "png" : ct.includes("webp") ? "webp" : "jpg";

  const asset = await client.assets.upload("image", buf, {
    filename: `cover.${ext}`,
    contentType: ct,
  });

  await client
    .patch(post._id)
    .set({
      coverImage: { _type: "image", asset: { _type: "reference", _ref: asset._id } },
    })
    .commit();

  console.log(`  ✓ ${post.title}`);
  return true;
}

async function main() {
  console.log(`\nPatching cover images for ${updates.length} posts...\n`);
  let ok = 0;
  for (const u of updates) {
    const success = await patchOne(u.slug, u.imageUrl);
    if (success) ok++;
  }
  console.log(`\nDone. ${ok}/${updates.length} updated.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
