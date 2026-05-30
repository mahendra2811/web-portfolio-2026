# dnp — Images

Screenshots available: web-1-radhe.png → web-4-radhe.png
Status: ✅ wired into project-images.ts

---

## Banner Prompt (1200×800px) — attach web-1-radhe, web-2-radhe, web-3-radhe

```
I'm attaching real screenshots of "Desert National Park — Safari Site" — 
a booking and marketing site for a safari business in Jaisalmer, India.
Use these EXACT screenshots only.

Canvas: 1200×800px | Background: Dark sandy brown or #0a0a0f

Composition:
- Main (center-left): web-1-radhe in a browser/laptop frame. Large and sharp.
- Right: Two floating panels (web-2-radhe, web-3-radhe) at slight angles,
  glass-border drop shadow.
- Warm golden/amber radial glow behind laptop.

Text (top-left): "Desert National Park" | "Safari Booking · Jaisalmer · Next.js"
Tags: "Tourism · Freelance · 2 Versions · Image Optimized · Live"
Mood: Desert tourism — warm, natural, adventurous.
Use ONLY provided screenshots. Output: 1200×800px, no white border.
```

---

## Thumbnail Prompt (800×500px) — attach web-1-radhe, web-3-radhe

```
Canvas: 800×500px | Background: Dark sandy, warm amber glow
- Left 65%: Crop hero/gallery from web-1-radhe in browser frame.
- Right 35%: Panel from web-3-radhe, angled 8°, glass border.
- Strip: "DNP · Live · Tourism · Next.js"
Use ONLY provided screenshots. Output: 800×500px.
```

---

## Wire-in (project-images.ts)
```ts
dnp: {
  thumbnail: "/projects/dnp/web-1-radhe.png",
  banner: "/projects/dnp/web-1-radhe.png",
  gallery: [
    "/projects/dnp/web-1-radhe.png",
    "/projects/dnp/web-2-radhe.png",
    "/projects/dnp/web-3-radhe.png",
    "/projects/dnp/web-4-radhe.png",
  ],
},
```
