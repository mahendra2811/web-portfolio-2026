# Learnings from Conversations

## Session 1: Blog Automation Setup
- Sanity token must be created at PROJECT level (sanity.io/manage → project → API → Tokens), NOT organization level. Wrong token gives "project user not found" error.
- Env var is SANITY_API_TOKEN for write operations. NEXT_PUBLIC_SANITY_TOKEN_KEY is the read-only one.
- Free Sanity plan: 10K docs, no AI credits, no Functions. Mutation API works fine.
- scripts/blog.ts loads .env manually since scripts don't get Next.js env loading.
- Blog script uses `client.create()` which needs `any` type assertion due to strict Sanity client types.
- Unsplash image URLs sometimes 404 — the script handles this gracefully with a fallback (no cover image).
- `content/blog/.published.json` tracks which .md files have been published to prevent duplicates.

## Session 2: Analytics & SEO
- `next-sitemap` was installed but the `postbuild` step was missing. Fixed by changing build script to `next build && next-sitemap`.
- Sitemap needs to fetch Sanity posts at build time via HTTP API (not client import) since next-sitemap runs outside Next.js context.
- Client-component pages (projects, skills, contact) can't export metadata — use layout.tsx in the same directory instead.
- EffectComposer children in R3F can't be conditional booleans (type error) — use separate EffectComposer blocks per tier instead.
- FontAwesome global library.add() prevents tree-shaking. Removed it — components already import icons directly.

## Session 3: Architecture Improvements
- Blog pagination uses searchParams (`?page=2`) for server-side pagination
- Category pages at /blog/category/[slug] filter by category slug
- BlogGrid component handles device-specific layouts: compact list on mobile, 2-col tablet, 3-col desktop
- Lazy loading via IntersectionObserver — loads 6 posts at a time as user scrolls
- Three.js performance tiers detect device capability via devicePixelRatio, hardwareConcurrency, deviceMemory
- RSS feed is a Next.js route handler at src/app/feed.xml/route.ts

## Key Gotchas
- Always run `npm run build` after adding blog posts to regenerate sitemap
- Don't use `library.add()` for FontAwesome — breaks tree-shaking
- Blog post [slug]/page.tsx needs `revalidate = 3600` for ISR
- PostContent headings need IDs (slugified) for TableOfContents to work
- Sanity free plan: avoid uploading images (use external URLs), avoid creating drafts (waste document quota)
