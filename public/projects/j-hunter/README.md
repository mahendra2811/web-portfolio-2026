# j-hunter — Images

Screenshots available: none yet
Status: ❌ not wired | Drop screenshots here then update project-images.ts

---

## Banner Prompt (1200×800px) — generate from description

```
Create a professional portfolio banner for "job Hunter" — a self-hosted 
AI job-hunting agent that scrapes 11 job sources, scores with Claude AI,
and sends automated cold-email outreach.

Canvas: 1200×800px | Style: Dark #0a0a0f, techy/hacker aesthetic

Composition:
- Center-left: Browser/laptop mockup showing a dashboard with:
  · Job listings table (company, role, score %, match status)
  · Green/amber/red score badges per job
  · Live SSE feed indicator (pulsing dot: "Scraping…")
- Right panels (floating):
  · Top: Pipeline diagram — Scrape → Score → Email → Reply
  · Bottom: Email draft card with "Sending to: recruiter@…" label
- Background: Very subtle terminal/grid pattern

Text (top-left): "job Hunter" | "Self-Hosted Job Agent · AI-Powered"
Tags: "FastAPI · Celery · Playwright · Claude API · Next.js 14 · In Dev"
Mood: Dev tool / automation — think Linear meets a terminal.

Output: 1200×800px, no white border.
```

---

## Thumbnail Prompt (800×500px)

```
Create a thumbnail for "job Hunter" AI job-hunting agent.

Canvas: 800×500px | Style: Dark, green terminal aesthetic with indigo accents

Composition:
- Left: Job listings dashboard card showing 3 rows with score badges
- Right: Small email composer card with "Sending outreach…" status
- Top: "job Hunter" wordmark
- Strip: "11 Scrapers · Claude AI · Auto Outreach · In Dev"

Output: 800×500px.
```

---

## Wire-in (after dropping files)
```ts
"j-hunter": {
  thumbnail: "/projects/j-hunter/thumbnail.png",
  banner: "/projects/j-hunter/banner.png",
  gallery: [],
},
```
