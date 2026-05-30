# wellversed — Images

Screenshots available: wellversed-web-1.png → wellversed-web-6.png  
Status: ✅ wired into project-images.ts

---

## Banner Prompt (1200×800px) — attach wellversed-web-1, wellversed-web-2, wellversed-web-3

```
I'm attaching real screenshots of "Wellversed" — a multi-merchant headless 
e-commerce storefront platform. Use these EXACT screenshots — do not invent UI.

Canvas: 1200×800px
Background: Dark #0a0a0f, clean and techy

Composition:
- Main (center-left): wellversed-web-1 inside a browser/laptop frame — 
  the primary hero element. Sharp and large.
- Right: Two smaller floating panels (wellversed-web-2, wellversed-web-3) 
  at slight angles with glass-border drop shadow.
- Add a soft cyan/teal radial glow behind the laptop (commerce platform feel).

Text overlay (top-left):
- "Wellversed" — bold white, large
- "Multi-Merchant Headless Storefront · Shopify Hydrogen" — subtitle
- Tag strip: "Visual Editor · Section Templates · Next.js 14 · Redis"

Rules:
- Use ONLY provided screenshots — no generated or fake UI
- Keep all screenshot content sharp and legible
- Mood: SaaS platform / headless commerce — think Vercel or Shopify 
  partner showcase

Output: 1200×800px, no white border.
```

---

## Thumbnail Prompt (800×500px) — attach wellversed-web-1, wellversed-web-4

```
Using my attached screenshots of "Wellversed" storefront platform,
create a thumbnail card.

Canvas: 800×500px
Background: Dark, soft cyan/teal glow center

Composition:
- Left 65%: Crop storefront/editor view from wellversed-web-1 in a 
  browser frame.
- Right 35%: Smaller floating panel from wellversed-web-4, angled 8°.
- Bottom strip: "Wellversed · In Development · Shopify + Next.js 14"

Use ONLY provided screenshots. Output: 800×500px.
```

---

## Wire-in (project-images.ts)
```ts
wellversed: {
  thumbnail: "/projects/wellversed/wellversed-web-1.png",
  banner: "/projects/wellversed/wellversed-web-1.png",
  gallery: [
    "/projects/wellversed/wellversed-web-1.png",
    "/projects/wellversed/wellversed-web-2.png",
    "/projects/wellversed/wellversed-web-3.png",
    "/projects/wellversed/wellversed-web-4.png",
    "/projects/wellversed/wellversed-web-5.png",
    "/projects/wellversed/wellversed-web-6.png",
  ],
},
```
