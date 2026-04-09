#!/usr/bin/env npx tsx

/**
 * Sanity Blog Automation Script
 *
 * Commands:
 *   npx tsx scripts/blog.ts new "My Blog Title"                    — create from title
 *   npx tsx scripts/blog.ts new "My Title" --draft                 — create as draft
 *   npx tsx scripts/blog.ts publish content/blog/my-post.md        — publish one .md file
 *   npx tsx scripts/blog.ts batch                                  — publish ALL new .md files in content/blog/
 *   npx tsx scripts/blog.ts list                                   — list all posts in Sanity
 *   npx tsx scripts/blog.ts delete <document-id>                   — delete a post
 */

import { createClient } from "@sanity/client";
import { readFileSync, readdirSync, existsSync, writeFileSync, readFileSync as readF } from "fs";
import { join, resolve, basename } from "path";
import { randomUUID } from "crypto";

// ── Load .env manually (scripts don't get Next.js env loading) ───
function loadEnv() {
  const envPath = join(process.cwd(), ".env");
  const localPath = join(process.cwd(), ".env.local");
  const paths = [envPath, localPath].filter(existsSync);

  for (const p of paths) {
    const content = readF(p, "utf-8");
    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eqIndex = trimmed.indexOf("=");
      if (eqIndex === -1) continue;
      const k = trimmed.slice(0, eqIndex).trim();
      const v = trimmed.slice(eqIndex + 1).trim();
      if (!process.env[k]) {
        process.env[k] = v;
      }
    }
  }
}

loadEnv();

// ── Sanity Client ────────────────────────────────────────────────
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_TOKEN || process.env.NEXT_PUBLIC_SANITY_TOKEN_KEY;

if (!projectId) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID in .env");
  process.exit(1);
}
if (!token) {
  console.error("Missing SANITY_API_TOKEN (or NEXT_PUBLIC_SANITY_TOKEN_KEY) in .env");
  console.error("Get a write token from: https://sanity.io/manage → Project → API → Tokens (Editor role)");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

// ── Helpers ──────────────────────────────────────────────────────
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function estimateReadingTime(text: string): number {
  return Math.max(1, Math.ceil(text.split(/\s+/).length / 200));
}

interface Frontmatter {
  title?: string;
  excerpt?: string;
  categories?: string;
  coverImage?: string;
  publishedAt?: string;
  draft?: string;
}

function parseFrontmatter(content: string): { meta: Frontmatter; body: string } {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { meta: {}, body: content };

  const meta: Frontmatter = {};
  for (const line of match[1].split("\n")) {
    const eqIdx = line.indexOf(":");
    if (eqIdx === -1) continue;
    const k = line.slice(0, eqIdx).trim() as keyof Frontmatter;
    const v = line.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, "");
    (meta as Record<string, string>)[k] = v;
  }

  return { meta, body: match[2] };
}

// Inline markdown → Portable Text converter (imports would fail in script context)
function mdToPortableText(markdown: string): unknown[] {
  const blocks: unknown[] = [];
  const lines = markdown.split("\n");
  let i = 0;

  function k() {
    return randomUUID().slice(0, 12);
  }

  function span(text: string) {
    return { _type: "span", _key: k(), text, marks: [] as string[] };
  }

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim() === "") { i++; continue; }

    // Fenced code
    const codeMatch = line.match(/^```(\w*)/);
    if (codeMatch) {
      const lang = codeMatch[1] || "text";
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      i++;
      blocks.push({ _type: "code", _key: k(), language: lang, code: codeLines.join("\n") });
      continue;
    }

    // Headings
    const hMatch = line.match(/^(#{1,4})\s+(.+)/);
    if (hMatch) {
      blocks.push({
        _type: "block", _key: k(), style: `h${hMatch[1].length}`,
        markDefs: [], children: [span(hMatch[2])],
      });
      i++; continue;
    }

    // Blockquote
    if (line.startsWith("> ")) {
      blocks.push({
        _type: "block", _key: k(), style: "blockquote",
        markDefs: [], children: [span(line.slice(2))],
      });
      i++; continue;
    }

    // Bullet list
    const ulMatch = line.match(/^[-*+]\s+(.+)/);
    if (ulMatch) {
      blocks.push({
        _type: "block", _key: k(), style: "normal", listItem: "bullet", level: 1,
        markDefs: [], children: [span(ulMatch[1])],
      });
      i++; continue;
    }

    // Numbered list
    const olMatch = line.match(/^\d+\.\s+(.+)/);
    if (olMatch) {
      blocks.push({
        _type: "block", _key: k(), style: "normal", listItem: "number", level: 1,
        markDefs: [], children: [span(olMatch[1])],
      });
      i++; continue;
    }

    // HR — skip
    if (/^[-*_]{3,}$/.test(line.trim())) { i++; continue; }

    // Paragraph — handle inline bold/italic/code/links
    const markDefs: { _type: string; _key: string; href?: string }[] = [];
    const spans: { _type: string; _key: string; text: string; marks: string[] }[] = [];
    const inlineRegex = /(\*\*(.+?)\*\*)|(\*(.+?)\*)|(`(.+?)`)|(\[([^\]]+)\]\(([^)]+)\))/g;
    let last = 0;
    let m: RegExpExecArray | null;
    const text = line;

    while ((m = inlineRegex.exec(text)) !== null) {
      if (m.index > last) {
        spans.push({ _type: "span", _key: k(), text: text.slice(last, m.index), marks: [] });
      }
      if (m[2]) {
        spans.push({ _type: "span", _key: k(), text: m[2], marks: ["strong"] });
      } else if (m[4]) {
        spans.push({ _type: "span", _key: k(), text: m[4], marks: ["em"] });
      } else if (m[6]) {
        spans.push({ _type: "span", _key: k(), text: m[6], marks: ["code"] });
      } else if (m[8] && m[9]) {
        const lk = k();
        markDefs.push({ _type: "link", _key: lk, href: m[9] });
        spans.push({ _type: "span", _key: k(), text: m[8], marks: [lk] });
      }
      last = m.index + m[0].length;
    }
    if (last < text.length) {
      spans.push({ _type: "span", _key: k(), text: text.slice(last), marks: [] });
    }
    if (spans.length === 0) {
      spans.push(span(text));
    }

    blocks.push({ _type: "block", _key: k(), style: "normal", markDefs, children: spans });
    i++;
  }

  return blocks;
}

// ── Track which files have been published ────────────────────────
const TRACKING_FILE = join(process.cwd(), "content", "blog", ".published.json");

function getPublished(): Record<string, { id: string; slug: string; publishedAt: string }> {
  if (!existsSync(TRACKING_FILE)) return {};
  return JSON.parse(readFileSync(TRACKING_FILE, "utf-8"));
}

function trackPublished(filename: string, id: string, slug: string) {
  const data = getPublished();
  data[filename] = { id, slug, publishedAt: new Date().toISOString() };
  writeFileSync(TRACKING_FILE, JSON.stringify(data, null, 2));
}

// ── Find or create category ─────────────────────────────────────
async function getOrCreateCategory(name: string): Promise<string> {
  const trimmed = name.trim();
  const existing = await client.fetch(
    `*[_type == "category" && title == $title][0]{ _id }`,
    { title: trimmed }
  );
  if (existing) return existing._id;

  const created = await client.create({
    _type: "category",
    title: trimmed,
    slug: { _type: "slug", current: slugify(trimmed) },
  });
  console.log(`  + Created category: ${trimmed}`);
  return created._id;
}

// ── Upload cover image from URL to Sanity ───────────────────────
async function uploadImageFromUrl(imageUrl: string): Promise<{ _type: "image"; asset: { _type: "reference"; _ref: string } } | null> {
  try {
    const res = await fetch(imageUrl, { redirect: "follow" });
    if (!res.ok) {
      console.log(`  ⚠ Image fetch failed (${res.status}), skipping cover image`);
      return null;
    }
    const buffer = Buffer.from(await res.arrayBuffer());
    const contentType = res.headers.get("content-type") || "image/jpeg";
    const ext = contentType.includes("png") ? "png" : contentType.includes("webp") ? "webp" : "jpg";

    const asset = await client.assets.upload("image", buffer, {
      filename: `cover.${ext}`,
      contentType,
    });
    console.log(`  📷 Cover image uploaded`);
    return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.log(`  ⚠ Image upload failed: ${msg}, skipping`);
    return null;
  }
}

// ── Create post from markdown content ────────────────────────────
async function createPost(opts: {
  title: string;
  body: string;
  excerpt?: string;
  categories?: string[];
  coverImage?: string;
  publishedAt?: string;
  isDraft?: boolean;
}): Promise<{ _id: string; slug: string }> {
  const slug = slugify(opts.title);
  const portableText = mdToPortableText(opts.body);

  // Check duplicate
  const existing = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{ _id }`,
    { slug }
  );
  if (existing) {
    // Update instead
    await client
      .patch(existing._id)
      .set({
        title: opts.title,
        excerpt: opts.excerpt || opts.body.slice(0, 160).replace(/\n/g, " ").trim(),
        body: portableText,
        readingTime: estimateReadingTime(opts.body),
      })
      .commit();
    console.log(`  ~ Updated existing: "${opts.title}" (${existing._id})`);
    return { _id: existing._id, slug };
  }

  // Upload cover image if URL provided
  let coverImageRef: { _type: "image"; asset: { _type: "reference"; _ref: string } } | null = null;
  if (opts.coverImage) {
    coverImageRef = await uploadImageFromUrl(opts.coverImage);
  }

  // Category refs
  const catRefs: { _type: string; _ref: string; _key: string }[] = [];
  if (opts.categories?.length) {
    for (const cat of opts.categories) {
      const catId = await getOrCreateCategory(cat);
      catRefs.push({ _type: "reference", _ref: catId, _key: randomUUID().slice(0, 8) });
    }
  }

  const doc: Record<string, unknown> = {
    _type: "post",
    title: opts.title,
    slug: { _type: "slug", current: slug },
    excerpt: opts.excerpt || opts.body.slice(0, 160).replace(/\n/g, " ").trim(),
    body: portableText,
    publishedAt: opts.publishedAt || new Date().toISOString(),
    readingTime: estimateReadingTime(opts.body),
  };

  if (coverImageRef) doc.coverImage = coverImageRef;
  if (catRefs.length) doc.categories = catRefs;
  if (opts.isDraft) doc._id = `drafts.${randomUUID().slice(0, 8)}`;

  const result = await client.create(doc);
  return { _id: result._id, slug };
}

// ── Commands ─────────────────────────────────────────────────────

async function cmdNew(args: string[]) {
  const isDraft = args.includes("--draft");
  const title = args.filter((a) => !a.startsWith("--"))[0];

  if (!title) {
    console.error("Usage: npx tsx scripts/blog.ts new \"My Blog Title\" [--draft]");
    process.exit(1);
  }

  console.log(`\nCreating: "${title}" ${isDraft ? "(DRAFT)" : "(PUBLISHED)"}`);

  const result = await createPost({
    title,
    body: `This is a new blog post about ${title}. Edit the content in Sanity Studio or update the markdown file.`,
    isDraft,
  });

  console.log(`  ID:   ${result._id}`);
  console.log(`  Slug: ${result.slug}`);
  console.log(`  URL:  /blog/${result.slug}`);
}

async function cmdPublish(args: string[]) {
  const filePath = args[0];
  if (!filePath || !existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
  }

  const isDraft = args.includes("--draft");
  const content = readFileSync(filePath, "utf-8");
  const { meta, body } = parseFrontmatter(content);

  const title = meta.title || basename(filePath, ".md").replace(/-/g, " ");
  const categories = meta.categories?.split(",").map((c) => c.trim()).filter(Boolean);

  console.log(`\nPublishing: "${title}" from ${filePath}`);

  const result = await createPost({
    title,
    body,
    excerpt: meta.excerpt,
    categories,
    coverImage: meta.coverImage,
    publishedAt: meta.publishedAt,
    isDraft: isDraft || meta.draft === "true",
  });

  trackPublished(basename(filePath), result._id, result.slug);

  console.log(`  ID:   ${result._id}`);
  console.log(`  Slug: ${result.slug}`);
  console.log(`  URL:  /blog/${result.slug}`);
}

async function cmdBatch() {
  const blogDir = join(process.cwd(), "content", "blog");
  if (!existsSync(blogDir)) {
    console.error("content/blog/ directory not found");
    process.exit(1);
  }

  const files = readdirSync(blogDir).filter((f) => f.endsWith(".md"));
  const published = getPublished();

  const newFiles = files.filter((f) => !published[f]);

  if (newFiles.length === 0) {
    console.log("\nNo new .md files to publish.");
    console.log(`Already published: ${files.length} files`);
    console.log("To re-publish, delete content/blog/.published.json");
    return;
  }

  console.log(`\nBatch publishing ${newFiles.length} new file(s)...\n`);

  let success = 0;
  let failed = 0;

  for (const file of newFiles) {
    try {
      const filePath = join(blogDir, file);
      const content = readFileSync(filePath, "utf-8");
      const { meta, body } = parseFrontmatter(content);

      const title = meta.title || file.replace(/\.md$/, "").replace(/-/g, " ");
      const categories = meta.categories?.split(",").map((c) => c.trim()).filter(Boolean);

      console.log(`[${success + failed + 1}/${newFiles.length}] "${title}"`);

      const result = await createPost({
        title,
        body,
        excerpt: meta.excerpt,
        categories,
        coverImage: meta.coverImage,
        publishedAt: meta.publishedAt,
        isDraft: meta.draft === "true",
      });

      trackPublished(file, result._id, result.slug);
      console.log(`  OK → /blog/${result.slug}`);
      success++;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`  FAILED: ${msg}`);
      failed++;
    }
  }

  console.log(`\nDone! ${success} published, ${failed} failed.`);
}

async function cmdList() {
  const posts = await client.fetch(
    `*[_type == "post"] | order(publishedAt desc) { _id, title, "slug": slug.current, publishedAt, readingTime }`
  );

  if (!posts.length) {
    console.log("\nNo blog posts found in Sanity.");
    return;
  }

  console.log(`\n${posts.length} blog post(s) in Sanity:\n`);
  for (const p of posts) {
    const date = p.publishedAt ? new Date(p.publishedAt).toLocaleDateString() : "no date";
    const draft = p._id.startsWith("drafts.") ? " [DRAFT]" : "";
    console.log(`  ${date}  ${p.title}${draft}`);
    console.log(`          /blog/${p.slug}  (${p._id})`);
  }
}

async function cmdDelete(args: string[]) {
  const docId = args[0];
  if (!docId) {
    console.error("Usage: npx tsx scripts/blog.ts delete <document-id>");
    process.exit(1);
  }

  const doc = await client.fetch(`*[_id == $id][0]{ _id, title }`, { id: docId });
  if (!doc) {
    console.error(`Document not found: ${docId}`);
    process.exit(1);
  }

  await client.delete(docId);
  console.log(`Deleted: "${doc.title}" (${docId})`);
}

// ── Main ─────────────────────────────────────────────────────────
const [command, ...args] = process.argv.slice(2);

const commands: Record<string, (args: string[]) => Promise<void>> = {
  new: cmdNew,
  publish: cmdPublish,
  batch: cmdBatch,
  list: cmdList,
  delete: cmdDelete,
};

if (!command || !commands[command]) {
  console.log(`
Sanity Blog Automation
━━━━━━━━━━━━━━━━━━━━━

Commands:
  new "Title" [--draft]       Create a post from just a title
  publish file.md [--draft]   Publish a markdown file to Sanity
  batch                       Publish ALL new .md files in content/blog/
  list                        List all posts in Sanity
  delete <id>                 Delete a post by document ID

Examples:
  npx tsx scripts/blog.ts new "React Tips for 2025"
  npx tsx scripts/blog.ts publish content/blog/react-tips.md
  npx tsx scripts/blog.ts batch
  npx tsx scripts/blog.ts list
`);
  process.exit(0);
}

commands[command](args).catch((err) => {
  console.error(`\nError: ${err.message}`);
  process.exit(1);
});
