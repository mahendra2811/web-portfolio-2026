# aqualogica — Images

Screenshots available: aqua-web-1.png → aqua-web-6.png  
Status: ✅ wired into project-images.ts

---

## Banner Prompt (1200×800px) — attach aqua-web-1, aqua-web-2, aqua-web-3

```
I'm attaching real screenshots of "Aqualogica" — a premium Indian skincare 
e-commerce website. Use these EXACT screenshots — do not invent any UI.

Canvas: 1200×800px
Background: Very dark #0a0a0f, elegant and premium feel

Composition:
- Main (center-left): Place aqua-web-1 inside a realistic MacBook/browser 
  frame. This is the hero — make it large and sharp.
- Right: Two smaller floating panels (aqua-web-2, aqua-web-3) at slight 
  angles with glass-border drop shadow effect.
- Add a soft warm rose/gold radial glow behind the laptop (matching the 
  beauty brand's pink/nude palette from the screenshots).

Text overlay (top-left):
- "Aqualogica" — bold white, large
- "Headless E-commerce · Shopify · Next.js 15" — subtitle
- Tag strip: "GoKwik Checkout · Visual Page Builder · Redis Cache · AWS"

Rules:
- Use ONLY the provided screenshots as UI content
- Keep screenshots sharp and legible — no blur/distortion
- Mood: Premium skincare brand — think Minimalist, Dot & Key aesthetics

Output: 1200×800px, no white border.
```

---

## Thumbnail Prompt (800×500px) — attach aqua-web-1, aqua-web-4

```
Using my attached screenshots of "Aqualogica" beauty e-commerce site,
create a thumbnail card.

Canvas: 800×500px
Background: Dark #0a0a0f, soft rose/gold glow center

Composition:
- Left 60%: Crop the hero/product section from aqua-web-1 — show the 
  product listing or homepage hero. Place in a browser chrome frame.
- Right 40%: One smaller floating panel from aqua-web-4 or aqua-web-5,
  angled at 8°, with glass border.
- Bottom strip: "Aqualogica · Live · Shopify + Next.js 15"

Use ONLY provided screenshots. No fake products or generated UI.
Output: 800×500px.
```

---

## Wire-in (project-images.ts)
```ts
aqualogica: {
  thumbnail: "/projects/aqualogica/aqua-web-1.png",
  banner: "/projects/aqualogica/aqua-web-1.png",
  gallery: [
    "/projects/aqualogica/aqua-web-1.png",
    "/projects/aqualogica/aqua-web-2.png",
    "/projects/aqualogica/aqua-web-3.png",
    "/projects/aqualogica/aqua-web-4.png",
    "/projects/aqualogica/aqua-web-5.png",
    "/projects/aqualogica/aqua-web-6.png",
  ],
},
```
