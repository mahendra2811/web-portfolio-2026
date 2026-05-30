# plixkids — Images

Screenshots available: plixkids-web-1.png → plixkids-web-7.png  
Status: ✅ wired into project-images.ts

---

## Banner Prompt (1200×800px) — attach plixkids-web-1, plixkids-web-2, plixkids-web-3

```
I'm attaching real screenshots of "Plixkids" — a kids products e-commerce 
storefront. Use these EXACT screenshots — do not invent any UI.

Canvas: 1200×800px
Background: Dark #0a0a0f, playful but professional

Composition:
- Main (center-left): plixkids-web-1 inside a browser/laptop frame — 
  the primary hero element. Sharp and large.
- Right: Two smaller panels (plixkids-web-2, plixkids-web-3) floating 
  at slight angles, glass-border drop shadows.
- Add a soft purple/indigo radial glow behind the laptop frame 
  (kids brand, slightly vibrant).

Text overlay (top-left):
- "Plixkids" — bold white, large
- "Kids E-commerce · Custom Backend · Next.js 14" — subtitle
- Tag strip: "GoKwik Checkout · Video PDP · A/B Testing · AWS EC2"

Rules:
- Use ONLY provided screenshots as UI content — no generated UI
- Keep all text in screenshots legible
- Mood: Modern e-commerce, not cartoonish — clean and premium

Output: 1200×800px, no white border.
```

---

## Thumbnail Prompt (800×500px) — attach plixkids-web-1, plixkids-web-4

```
Using my attached screenshots of "Plixkids" kids e-commerce site,
create a thumbnail card.

Canvas: 800×500px
Background: Dark, soft purple glow center

Composition:
- Left 65%: Crop product listing or homepage from plixkids-web-1 
  in a browser frame.
- Right 35%: Smaller floating panel from plixkids-web-4, angled 8°.
- Bottom strip: "Plixkids · In Development · Next.js 14"

Use ONLY provided screenshots. Output: 800×500px.
```

---

## Wire-in (project-images.ts)
```ts
plixkids: {
  thumbnail: "/projects/plixkids/plixkids-web-1.png",
  banner: "/projects/plixkids/plixkids-web-1.png",
  gallery: [
    "/projects/plixkids/plixkids-web-1.png",
    "/projects/plixkids/plixkids-web-2.png",
    "/projects/plixkids/plixkids-web-3.png",
    "/projects/plixkids/plixkids-web-4.png",
    "/projects/plixkids/plixkids-web-5.png",
    "/projects/plixkids/plixkids-web-6.png",
    "/projects/plixkids/plixkids-web-7.png",
  ],
},
```
