# techbuilder — Images

Screenshots available: none yet
Status: ❌ not wired | Drop screenshots here then update project-images.ts

---

## Banner Prompt (1200×800px) — generate from description

```
Create a portfolio banner for "techBuilder" — a multi-tenant construction 
SaaS for Indian SMBs. Monorepo with web (Next.js), mobile (Expo + PowerSync), 
and API (NestJS + Drizzle + BullMQ + Socket.io).

Canvas: 1200×800px | Style: Dark #0a0a0f, enterprise SaaS aesthetic

Composition:
- Center: Browser mockup showing a construction management dashboard:
  · Worker/task assignment table
  · Site progress tracker
  · Real-time activity feed (Socket.io indicator)
- Right: Phone mockup showing mobile app (offline-first indicator badge)
- Left: Architecture diagram card showing Web → API → Mobile stack
- Soft indigo/orange glow (construction industry)

Text: "techBuilder" | "Multi-tenant Construction SaaS · Monorepo"
Tags: "NestJS · Next.js 16 · Expo · PowerSync · Razorpay · In Dev"
Mood: Enterprise B2B SaaS — professional, data-rich, Indian market.

Output: 1200×800px, no white border.
```

---

## Wire-in (after dropping files)
```ts
techbuilder: {
  thumbnail: "/projects/techbuilder/thumbnail.png",
  banner: "/projects/techbuilder/banner.png",
  gallery: [],
},
```
