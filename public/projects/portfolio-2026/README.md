# portfolio-2026 — Images

Drop screenshots here and wire them into `src/data/projects.ts` under `id: "portfolio-2026"`.

## Required files

| File | Size | What to show |
|------|------|--------------|
| `hero.png` | 1200×800 | Hero section with 3D scene |
| `01-overview.png` | 1200×800 | Full homepage above the fold |
| `02-dashboard.png` | 1200×800 | Projects page or blog listing |
| `03-feature.png` | 1200×800 | Contact form or admin panel |
| `04-mobile.png` | portrait ok | Portfolio on mobile |

## How to wire in

```ts
thumbnail: "/projects/portfolio-2026/hero.png",
images: [
  "/projects/portfolio-2026/01-overview.png",
  "/projects/portfolio-2026/02-dashboard.png",
  "/projects/portfolio-2026/03-feature.png",
  "/projects/portfolio-2026/04-mobile.png",
],
```

## Tips
- Capture the 3D particle field / shader background for the hero.
- A dark-glassmorphism screenshot at full 1440px width looks best.
