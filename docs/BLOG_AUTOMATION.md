# Blog Automation Guide

> Your setup: **Claude Premium** + **Anthropic API** + **Free Sanity** + 10-15 blogs/day target.
> Best approach: **Claude generates markdown → batch script publishes to Sanity.**

---

## The Strategy

You have unlimited AI content generation (Claude Premium) but limited Sanity resources (free plan). The optimal pipeline separates content generation from publishing:

```
You (or Claude) write .md files → npm run blog:batch → Published in Sanity → Live on site
```

No Sanity AI credits needed. No Growth plan needed. No MCP writes needed. Just the free Mutation API.

### Why Not Sanity MCP / Agent Actions?

- MCP write tools (create, publish documents) consume **Sanity AI credits** — free plan has **zero**
- Agent Actions also require AI credits + Growth plan ($15/mo)
- Sanity Functions require Growth plan
- You already have Claude Premium which generates content for free — why pay Sanity for AI?

### Free Plan Limits That Matter at 10-15 Blogs/Day

| Resource | Free Limit | At 15 blogs/day |
|----------|-----------|-----------------|
| Documents | 10,000 | ~660 days (~1.8 years) |
| API Requests | ~500K/month | Each publish = ~3 requests. 450/month = ~1,350 req. Fine. |
| Datasets | 1 | Use `production` only |
| Webhooks | 1 | Use for ISR revalidation |

You're well within limits. Monitor at sanity.io/manage → Usage tab.

---

## How It Works (Already Implemented)

### Files Created

| File | Purpose |
|------|---------|
| `scripts/blog.ts` | CLI tool for all blog operations |
| `src/lib/sanity/markdown-to-portable-text.ts` | Converts markdown to Sanity's Portable Text |
| `content/blog/` | Drop your `.md` files here |
| `content/blog/.published.json` | Tracks which files have been published (auto-managed) |

### npm Scripts

```bash
npm run blog                  # Show help
npm run blog:new "Title"      # Create from title only
npm run blog:publish FILE.md  # Publish one markdown file
npm run blog:batch            # Publish ALL new .md files in content/blog/
npm run blog:list             # List all posts in Sanity
```

---

## Setup (One-Time)

### 1. Get a Write Token

Your current token is read-only. You need an **Editor** token:

1. Go to https://sanity.io/manage → your project
2. **API** → **Tokens** → **Add API Token**
3. Name: `blog-automation`
4. Permissions: **Editor**
5. Copy token

### 2. Add to .env

```bash
# Add this line (keep your existing NEXT_PUBLIC_SANITY_TOKEN_KEY for the frontend)
SANITY_API_TOKEN=skXxx...your-new-editor-token
```

### 3. Test

```bash
npm run blog:list              # Should show your existing posts
npm run blog:new "Test Post"   # Should create a post
npm run blog:list              # Should show the new post
```

---

## Daily Workflow: 10-15 Blogs/Day

### Option A: Ask Claude to Generate Markdown Files (Recommended)

In Claude Code, say:

> "Generate 5 blog posts as markdown files in content/blog/ about: React hooks, TypeScript generics, Next.js caching, Tailwind tips, and CSS Grid. Include frontmatter with title, excerpt, and categories."

Claude creates the `.md` files. Then run:

```bash
npm run blog:batch
```

All 5 posts are published in one command.

### Option B: Write Markdown Yourself

Create `content/blog/my-post.md`:

```markdown
---
title: "React Hooks Cheat Sheet"
excerpt: "A quick reference for all React hooks with practical examples."
categories: React, Hooks, Frontend
---

## useState

The most basic hook for managing local state.

```typescript
const [count, setCount] = useState(0);
```​

## useEffect

For side effects like data fetching and subscriptions.

```typescript
useEffect(() => {
  fetchData();
}, [dependency]);
```​
```

Then publish:

```bash
npm run blog:publish content/blog/my-post.md
```

### Option C: Just a Title (Placeholder Body)

```bash
npm run blog:new "React Performance Tips 2025"
```

Creates a post with placeholder text. Edit the body later in Studio or re-publish from a `.md` file.

### Option D: Bulk Generate + Batch Publish (Maximum Speed)

1. Create a topics list in a file or just tell Claude:

> "Create 15 detailed markdown blog posts in content/blog/ covering these DSA topics: arrays, linked lists, stacks, queues, trees, graphs, hash maps, binary search, sorting algorithms, dynamic programming, greedy algorithms, backtracking, trie, segment trees, and bit manipulation. Each should be 800-1200 words with code examples in TypeScript. Include frontmatter."

2. Claude generates all 15 files in `content/blog/`

3. One command publishes them all:
```bash
npm run blog:batch
```

4. Done. 15 blogs published.

---

## Markdown File Format

### Minimal (title only required)

```markdown
---
title: "My Blog Post"
---

Content here...
```

### Full Frontmatter

```markdown
---
title: "My Blog Post"
excerpt: "A short description for the blog card."
categories: React, TypeScript, Web Dev
draft: true
publishedAt: 2026-04-09T10:00:00Z
---

Content here...
```

### Supported Markdown

- Headings (# through ####)
- **Bold** and *italic*
- `inline code`
- Fenced code blocks with language (```typescript)
- Blockquotes (> text)
- Bullet lists (- item)
- Numbered lists (1. item)
- [Links](url)
- Horizontal rules (---)

### If No Frontmatter

The script infers the title from the filename:
- `react-hooks-guide.md` → title: "react hooks guide"
- First 160 chars become the excerpt

---

## Duplicate Handling

The script checks Sanity by slug before creating. If a post with the same slug exists:
- It **updates** the existing post instead of creating a duplicate
- This means you can edit a `.md` file and re-run `publish` to update it

To force a fresh batch, delete `content/blog/.published.json`:
```bash
rm content/blog/.published.json
npm run blog:batch
```

---

## After Publishing

### Cache Revalidation

Your site uses ISR. New posts appear after revalidation. You already have `/api/revalidate` set up. Configure a Sanity webhook for instant updates:

1. sanity.io/manage → your project → **API** → **Webhooks**
2. URL: `https://your-site.vercel.app/api/revalidate?secret=YOUR_REVALIDATION_SECRET`
3. Trigger on: Create, Update, Delete
4. Filter: `_type == "post"`

### Add Cover Images

The script doesn't upload images (saves your free plan asset quota). Options:
- Add images via Sanity Studio after publishing
- Use external image URLs (Unsplash, Picsum) in your markdown
- Host images in your repo's `public/images/blog/` folder

---

## Architecture Decision: Why This Approach Wins

| Approach | Cost | Speed | AI Quality | Complexity |
|----------|------|-------|------------|------------|
| Manual Studio | Free | Slow (5-10 min/post) | None | Low |
| Sanity MCP writes | $15/mo + AI credits | Fast | Sanity AI | Medium |
| **Claude + batch script** | **Free** | **Fast (30s for 15 posts)** | **Claude (best)** | **Low** |
| GitHub Actions | Free | Medium | Depends | High |

Claude generates better content than Sanity's AI (you're using Opus). The mutation API is free on all plans. This combination gives you the best AI quality at zero cost.

---

## Quick Reference

```bash
# One post from title
npm run blog:new "My Title"

# One post from file
npm run blog:publish content/blog/my-post.md

# Batch publish all new files
npm run blog:batch

# List all posts
npm run blog:list

# Delete a post (get ID from blog:list)
npm run blog -- delete <document-id>

# Re-publish all (reset tracking)
rm content/blog/.published.json && npm run blog:batch
```
