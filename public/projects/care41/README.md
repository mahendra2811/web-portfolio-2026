# care41 — Images

Screenshots available: care41-web-1.png → care41-web-4.png  
Status: ✅ wired into project-images.ts

---

## Banner Prompt (1200×800px) — attach care41-web-1, care41-web-2, care41-web-3

```
I'm attaching real screenshots of "Care41" — an elderly care services 
platform with a public marketing site and internal admin dashboard.
Use these EXACT screenshots — do not invent any UI.

Canvas: 1200×800px
Background: Dark #0a0a0f, warm and trustworthy

Composition:
- Main (center-left): care41-web-1 inside a browser/laptop frame. 
  Large and sharp — this is the hero.
- Right: Two smaller floating panels (care41-web-2, care41-web-3) at 
  slight angles with glass-border drop shadow.
- Add a soft warm blue/teal radial glow behind the laptop (healthcare feel).

Text overlay (top-left):
- "Care41" — bold white, large
- "Elderly Care Services Platform · Next.js Monorepo" — subtitle
- Tag strip: "Marketing Site · Admin Dashboard · shadcn/ui · Tailwind CSS"

Rules:
- Use ONLY provided screenshots — no generated or fake UI
- Keep screenshot content sharp and legible
- Mood: Trustworthy healthcare platform — clean, calm, professional

Output: 1200×800px, no white border.
```

---

## Thumbnail Prompt (800×500px) — attach care41-web-1, care41-web-3

```
Using my attached screenshots of "Care41" elderly care platform,
create a thumbnail card.

Canvas: 800×500px
Background: Dark, soft warm blue glow center

Composition:
- Left 60%: Crop the marketing site hero/services section from 
  care41-web-1 in a browser frame.
- Right 40%: Smaller panel showing admin dashboard from care41-web-3, 
  angled 8°, with glass border.
- Bottom strip: "Care41 · Live · Healthcare Platform"

Use ONLY provided screenshots. Output: 800×500px.
```

---

## Wire-in (project-images.ts)
```ts
care41: {
  thumbnail: "/projects/care41/care41-web-1.png",
  banner: "/projects/care41/care41-web-1.png",
  gallery: [
    "/projects/care41/care41-web-1.png",
    "/projects/care41/care41-web-2.png",
    "/projects/care41/care41-web-3.png",
    "/projects/care41/care41-web-4.png",
  ],
},
```
