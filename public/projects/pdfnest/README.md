# pdfnest — Images

Screenshots available: none yet
Status: ❌ not wired | Drop screenshots here then update project-images.ts

---

## Banner Prompt (1200×800px) — generate from description

```
Create a professional portfolio banner for "pdfNest" — a native Android 
PDF hub app with 23 utility tools (merge, split, compress, OCR, scanner).
100% on-device. No ads, no account, no upload. Made for Indian users.

Canvas: 1200×800px | Style: Dark #0a0a0f, premium Android app aesthetic

Composition:
- Center: Large phone mockup showing the tools hub — a grid of 
  6 PDF tool cards (Merge, Split, Compress, Scan, OCR, Rotate)
- Left phone: PDF reader screen showing a document open (tilted left)
- Right phone: Scanner/OCR screen with camera overlay (tilted right)
- Small badge: "🔒 Files never leave your phone"
- Soft indigo/red glow behind center phone

Text: "pdfNest" | "Native Android PDF Hub · 23 Tools"
Tags: "Kotlin · Jetpack Compose · ML Kit · PDFBox · Biometric Vault · In Dev"
Mood: Privacy-first productivity — made in India, for India.

Output: 1200×800px, no white border.
```

---

## Thumbnail Prompt (800×500px)

```
Create a thumbnail for "pdfNest" Android PDF hub.

Canvas: 800×500px | Style: Dark, indigo glow

Composition:
- Left: 3×2 grid of tool icon cards (Merge, Split, Compress, Scan, OCR, Rotate)
- Right: Phone mockup showing tools hub screen
- Privacy badge: "🔒 On-device · No Upload"
- Strip: "pdfNest · 23 Tools · In Dev"

Output: 800×500px.
```

---

## Wire-in (after dropping files)
```ts
pdfnest: {
  thumbnail: "/projects/pdfnest/thumbnail.png",
  banner: "/projects/pdfnest/banner.png",
  gallery: [],
},
```
