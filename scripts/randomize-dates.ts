#!/usr/bin/env npx tsx
/**
 * Randomize publishedAt dates for all Sanity blog posts.
 *
 * Spreads every post evenly across the last 6 months with a bit of jitter
 * so the blog UI shows realistic, varied publication dates instead of all
 * posts looking like they were published on the same day.
 *
 * Usage:
 *   npx tsx scripts/randomize-dates.ts            — apply updates
 *   npx tsx scripts/randomize-dates.ts --dry-run  — preview only
 */

import { createClient } from "@sanity/client";
import { existsSync, readFileSync, writeFileSync } from "fs";
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

const DRY_RUN = process.argv.includes("--dry-run");

// Range: last 6 months ending ~2 days before "today" so the newest post
// looks "2 days ago" rather than "just published".
const NOW = Date.now();
const DAY_MS = 24 * 60 * 60 * 1000;
const END = NOW - 2 * DAY_MS;
const START = NOW - 182 * DAY_MS; // ~6 months

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function generateDates(count: number): string[] {
  const span = END - START;
  const bucket = span / count;
  const dates: string[] = [];

  for (let i = 0; i < count; i++) {
    const bucketStart = START + i * bucket;
    // jitter within bucket, keep a small margin so adjacent buckets don't overlap visually
    const offset = Math.random() * bucket * 0.9;
    // randomize hour/minute too — looks more organic
    const ts = Math.floor(bucketStart + offset);
    dates.push(new Date(ts).toISOString());
  }
  return dates;
}

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt?: string;
}

async function main() {
  console.log(
    `\nRandomize publishedAt across the last 6 months\n` +
      `Range: ${new Date(START).toISOString()}  →  ${new Date(END).toISOString()}\n` +
      `Mode:  ${DRY_RUN ? "DRY RUN (no writes)" : "APPLY"}\n`,
  );

  const posts: Post[] = await client.fetch(
    `*[_type == "post" && !(_id in path("drafts.**"))]{ _id, title, slug, publishedAt }`,
  );

  if (!posts.length) {
    console.log("No posts found in Sanity.");
    return;
  }

  console.log(`Found ${posts.length} post(s).\n`);

  const dates = generateDates(posts.length);
  // shuffle assignment so order is independent of current publishedAt
  const shuffledPosts = shuffle(posts);

  const assignments = shuffledPosts.map((p, i) => ({
    post: p,
    newDate: dates[i],
  }));

  // Sort assignments by newDate desc just for nicer log output
  assignments.sort((a, b) => (a.newDate < b.newDate ? 1 : -1));

  // Preview
  for (const { post, newDate } of assignments.slice(0, 8)) {
    const old = post.publishedAt
      ? new Date(post.publishedAt).toISOString().slice(0, 10)
      : "(none)";
    console.log(
      `  ${old}  →  ${newDate.slice(0, 10)}  ${post.title.slice(0, 60)}`,
    );
  }
  if (assignments.length > 8) {
    console.log(`  ... and ${assignments.length - 8} more`);
  }

  if (DRY_RUN) {
    console.log("\nDry run complete. No changes written.");
    return;
  }

  console.log("\nApplying updates...\n");
  let ok = 0;
  let fail = 0;
  let tx = client.transaction();
  let pending = 0;

  for (const { post, newDate } of assignments) {
    tx = tx.patch(post._id, (p) => p.set({ publishedAt: newDate }));
    pending++;
    if (pending >= 50) {
      try {
        await tx.commit();
        ok += pending;
        console.log(`  committed ${ok}/${assignments.length}`);
      } catch (e) {
        fail += pending;
        console.error(`  batch failed: ${(e as Error).message}`);
      }
      pending = 0;
      tx = client.transaction();
    }
  }
  if (pending > 0) {
    try {
      await tx.commit();
      ok += pending;
      console.log(`  committed ${ok}/${assignments.length}`);
    } catch (e) {
      fail += pending;
      console.error(`  final batch failed: ${(e as Error).message}`);
    }
  }

  // Sync .published.json so the tracking file reflects the new dates
  const trackingFile = join(process.cwd(), "content", "blog", ".published.json");
  if (existsSync(trackingFile)) {
    const tracking = JSON.parse(readFileSync(trackingFile, "utf-8"));
    const byId = new Map(assignments.map((a) => [a.post._id, a.newDate]));
    let synced = 0;
    for (const file of Object.keys(tracking)) {
      const entry = tracking[file];
      const newDate = byId.get(entry.id);
      if (newDate) {
        entry.publishedAt = newDate;
        synced++;
      }
    }
    writeFileSync(trackingFile, JSON.stringify(tracking, null, 2));
    console.log(`\nSynced ${synced} entries in .published.json`);
  }

  console.log(`\nDone. ${ok} updated, ${fail} failed.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
