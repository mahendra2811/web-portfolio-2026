# ai-banner — Images

Drop screenshots here and wire them into `src/data/projects.ts` under `id: "ai-banner"`.

## Required files

| File | Size | What to show |
|------|------|--------------|
| `hero.png` | 1200×800 | A finished poster (main + bottom banner) |
| `01-overview.png` | 1200×800 | Template browse / feed |
| `02-dashboard.png` | 1200×800 | Fabric.js canvas editor with live preview |
| `03-feature.png` | 1200×800 | Profile mode or religion-based template feed |
| `04-mobile.png` | portrait ok | Mobile poster editor view |

## How to wire in

```ts
thumbnail: "/projects/ai-banner/hero.png",
images: [
  "/projects/ai-banner/01-overview.png",
  "/projects/ai-banner/02-dashboard.png",
  "/projects/ai-banner/03-feature.png",
  "/projects/ai-banner/04-mobile.png",
],
```

## Tips
- The hero should be a vivid finished poster — most visually striking shot.
- Glassmorphism UI screenshots look great at full width.
- Portrait posters (9:16) are fine in gallery; crop hero to 3:2.
