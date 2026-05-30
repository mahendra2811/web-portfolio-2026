# ai-banner — Images

Screenshots available: none yet
Status: ❌ not wired | Drop screenshots here then update project-images.ts

---

## Banner Prompt (1200×800px) — no screenshots, generate from description

```
Create a professional portfolio banner for "AI Banner" — a web app that 
generates WhatsApp-ready event posters in 30 seconds for Indian users 
(politicians, SMBs, social workers).

Canvas: 1200×800px | Style: Dark #0a0a0f, glassmorphism, Blue + Orange palette

Composition:
- Center: A realistic browser mockup showing the poster editor with:
  · Left panel: Template gallery with festival/event poster thumbnails
  · Center: Canvas showing a colorful event poster in progress
  · Right panel: Profile photo upload + branding section
- Right floating: A WhatsApp mockup showing the final poster shared in chat
- Top-right: "30 seconds" timer badge

Text (top-left): "AI Banner" | "Event Poster Generator · India-first"
Tags: "Fabric.js · Next.js 15 · Supabase · Hindi + English · In Dev"
Mood: Vibrant Indian market tool — think Canva but for WhatsApp posters.

Output: 1200×800px, no white border.
```

---

## Thumbnail Prompt (800×500px)

```
Create a thumbnail for "AI Banner" poster generator app.

Canvas: 800×500px | Style: Dark, blue + orange glassmorphism

Composition:
- Left 55%: 3×2 grid of colorful event poster thumbnails 
  (Diwali, Republic Day, business event, political rally, etc.)
- Right 45%: Phone mockup showing one poster shared on WhatsApp
- Top: "AI Banner" wordmark
- Strip: "30-sec Posters · WhatsApp Ready · In Dev"

Output: 800×500px.
```

---

## Wire-in (after dropping files)
```ts
"ai-banner": {
  thumbnail: "/projects/ai-banner/thumbnail.png",
  banner: "/projects/ai-banner/banner.png",
  gallery: [],
},
```
