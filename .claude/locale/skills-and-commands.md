# Available Skills & Commands

## Blog Commands
```bash
npm run blog                  # Show help
npm run blog:new "Title"      # Create post from title (placeholder body)
npm run blog:publish FILE.md  # Publish one markdown file to Sanity
npm run blog:batch            # Publish ALL new .md files in content/blog/
npm run blog:list             # List all posts in Sanity
npm run blog -- delete <id>   # Delete a post by document ID
```

## Dev Commands
```bash
npm run dev          # Start dev server (Turbopack)
npm run build        # Production build + sitemap generation
npm run start        # Start production server
npm run lint         # ESLint
npx tsc --noEmit     # TypeScript strict check
npm run format       # Prettier format
```

## Slash Commands (Claude Code)
- `/fix` — Run `npm run build` and fix ALL errors iteratively until clean. Then `npx tsc --noEmit`.
- `/review` — Full review checklist: lint, types, imports, responsiveness, animations, images.
- `/deploy-check` — Pre-deploy verification: build, types, env vars, sitemap, analytics.

## Blog Workflow (One-Shot)
When user says "create a blog about X":
1. Generate .md file in content/blog/ with frontmatter
2. Run `npx tsx scripts/blog.ts publish content/blog/<filename>.md`
3. Report the URL

When user says "create N blogs about topics":
1. Generate all .md files
2. Run `npm run blog:batch`
3. Report count and URLs

## Markdown File Format
```markdown
---
title: "Blog Title Here"
excerpt: "1-2 sentence summary for cards and SEO."
categories: Category1, Category2, Category3
coverImage: https://images.unsplash.com/photo-xxx?w=1200&h=630&fit=crop&auto=format
---

Blog content in markdown...
```

## File Structure
```
content/blog/          — Markdown blog files (source of truth)
scripts/blog.ts        — Blog automation CLI
src/app/               — Next.js App Router pages
src/components/        — React components (ui/, motion/, blog/, seo/, analytics/, three/, layout/, sections/, vfx/)
src/data/              — Static data files
src/lib/               — Utilities (sanity/, utils.ts, motion.ts, fontawesome.ts)
src/types/             — TypeScript types
sanity/schemas/        — Sanity document schemas
docs/                  — Setup guides (ENV, SANITY, ANALYTICS, BLOG_AUTOMATION, etc.)
```
