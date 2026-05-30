# callnest — Images

Screenshots available: banner-callnest.png, web-0 → web-4-callnest.png
Status: ✅ wired into project-images.ts | banner-callnest.png already generated

---

## Banner already exists: banner-callnest.png ✅ — skip unless regenerating

## Banner Prompt (if regenerating, 1200×800px) — attach web-0, web-1, web-2-callnest

```
I'm attaching real screenshots of "callNest" — an Android lead-pipeline app 
and marketing website for Indian SMBs. Use these EXACT screenshots only.

Canvas: 1200×800px | Background: Dark #0a0a0f

Composition:
- Left: Large Android phone mockup showing web-0-callnest (lead list screen).
- Center-right: Browser/laptop mockup showing web-2 or web-3-callnest 
  (marketing site).
- Small floating card: "Excel / CSV / PDF export" label with icon.
- Soft indigo/cyan glow center.

Text: "callNest" | "Call-log Lead Pipeline · Android + Web"
Tags: "Kotlin · Jetpack Compose · Next.js · Cloudflare Pages · Live"
Use ONLY provided screenshots. Output: 1200×800px.
```

---

## Thumbnail Prompt (800×500px) — attach web-0, web-2-callnest

```
Canvas: 800×500px | Background: Dark, indigo glow
- Left: Phone mockup (web-0-callnest — app screen).
- Right: Smaller browser frame (web-2-callnest — marketing site).
- Strip: "callNest · Live · Android + Web"
Use ONLY provided screenshots. Output: 800×500px.
```

---

## Wire-in (project-images.ts) — update banner to use generated banner
```ts
callnest: {
  thumbnail: "/projects/callnest/web-0-callnest.png",
  banner: "/projects/callnest/banner-callnest.png",
  gallery: [
    "/projects/callnest/web-0-callnest.png",
    "/projects/callnest/web-1-callnest.png",
    "/projects/callnest/web-2-callnest.png",
    "/projects/callnest/web-3-callnest.png",
    "/projects/callnest/web-4-callnest.png",
  ],
},
```
