# ddws-safari — Images

Screenshots available: web-1-ddws.png → web-10-ddws.png
Status: ✅ wired into project-images.ts

---

## Banner Prompt (1200×800px) — attach web-1-ddws, web-2-ddws, web-3-ddws

```
I'm attaching real screenshots of "DDWS — Desert Wildlife Safari" — a booking 
and info site for a wildlife safari business in Thar desert, India.
Use these EXACT screenshots only.

Canvas: 1200×800px | Background: Deep dark #0a0a0f or dark earthy brown

Composition:
- Main (center-left): web-1-ddws in a browser/laptop frame. Large and sharp.
- Right: Two smaller floating panels (web-2-ddws, web-3-ddws) at slight 
  angles, glass-border drop shadow.
- Warm amber/orange radial glow behind laptop (desert theme).

Text (top-left): "DDWS — Desert Wildlife Safari" | "Tourism Booking · Freelance · Next.js"
Tags: "Thar Desert · Booking Forms · Wildlife Gallery · Framer Motion · Live"
Mood: Nature tourism — warm, adventurous, professional.
Use ONLY provided screenshots. Output: 1200×800px, no white border.
```

---

## Thumbnail Prompt (800×500px) — attach web-1-ddws, web-5-ddws

```
Canvas: 800×500px | Background: Dark earthy, warm amber glow
- Left 65%: Crop hero/gallery from web-1-ddws in browser frame.
- Right 35%: Panel from web-5-ddws, angled 8°, glass border.
- Strip: "DDWS · Live · Tourism · Next.js"
Use ONLY provided screenshots. Output: 800×500px.
```

---

## Wire-in (project-images.ts)
```ts
"ddws-safari": {
  thumbnail: "/projects/ddws-safari/web-1-ddws.png",
  banner: "/projects/ddws-safari/web-1-ddws.png",
  gallery: [
    "/projects/ddws-safari/web-1-ddws.png",
    "/projects/ddws-safari/web-2-ddws.png",
    "/projects/ddws-safari/web-3-ddws.png",
    "/projects/ddws-safari/web-4-ddws.png",
    "/projects/ddws-safari/web-5-ddws.png",
    "/projects/ddws-safari/web-6-ddws.png",
    "/projects/ddws-safari/web-7-ddws.png",
    "/projects/ddws-safari/web-8-ddws.png",
    "/projects/ddws-safari/web-9-ddws.png",
    "/projects/ddws-safari/web-10-ddws.png",
  ],
},
```
