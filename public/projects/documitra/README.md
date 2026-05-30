# documitra — Images

Screenshots available: web-1-documitra.png → web-5-documitra.png  
Status: ✅ wired into project-images.ts

---

## Banner Prompt (1200×800px) — attach web-1-documitra, web-2-documitra, web-3-documitra

```
I'm attaching real screenshots of "DocuMitra" — a full-stack document 
management and form processing web app for Indian SMBs.
Use these EXACT screenshots — do not invent any UI.

Canvas: 1200×800px
Background: Dark #0a0a0f, professional and clean

Composition:
- Main (center-left): web-1-documitra inside a browser/laptop frame. 
  Large and sharp — this is the hero.
- Right: Two smaller floating panels (web-2-documitra, web-3-documitra) 
  at slight angles with glass-border drop shadow.
- Add a soft indigo/blue radial glow behind the laptop.

Text overlay (top-left):
- "DocuMitra" — bold white, large (मित्र = friend in Hindi)
- "Document Management · Form Processing · Full-stack" — subtitle
- Tag strip: "Next.js 15 · React 19 · MongoDB · Cloudinary · Firebase"

Rules:
- Use ONLY provided screenshots — no generated or fake UI
- Keep all screenshot text legible
- Mood: Clean SaaS productivity tool — think Notion or DocuSign 
  but simpler and India-focused

Output: 1200×800px, no white border.
```

---

## Thumbnail Prompt (800×500px) — attach web-1-documitra, web-4-documitra

```
Using my attached screenshots of "DocuMitra" document management platform,
create a thumbnail card.

Canvas: 800×500px
Background: Dark, soft indigo glow center

Composition:
- Left 60%: Crop dashboard/form list from web-1-documitra in a browser frame.
- Right 40%: Smaller panel from web-4-documitra (PDF viewer or upload UI), 
  angled 8°, glass border.
- Bottom strip: "DocuMitra · In Development · Full-stack"

Use ONLY provided screenshots. Output: 800×500px.
```

---

## Wire-in (project-images.ts)
```ts
documitra: {
  thumbnail: "/projects/documitra/web-1-documitra.png",
  banner: "/projects/documitra/web-1-documitra.png",
  gallery: [
    "/projects/documitra/web-1-documitra.png",
    "/projects/documitra/web-2-documitra.png",
    "/projects/documitra/web-3-documitra.png",
    "/projects/documitra/web-4-documitra.png",
    "/projects/documitra/web-5-documitra.png",
  ],
},
```
