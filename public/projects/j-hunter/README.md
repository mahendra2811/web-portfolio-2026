# j-hunter — Images

Drop screenshots here and wire them into `src/data/projects.ts` under `id: "j-hunter"`.

## Required files

| File | Size | What to show |
|------|------|--------------|
| `hero.png` | 1200×800 | Dashboard overview / job list |
| `01-overview.png` | 1200×800 | Live SSE feed or scraper status |
| `02-dashboard.png` | 1200×800 | Job detail + Claude scoring breakdown |
| `03-feature.png` | 1200×800 | Cold-email outreach / reply tracking |
| `04-mobile.png` | optional | Mobile responsive view of dashboard |

## How to wire in

```ts
thumbnail: "/projects/j-hunter/hero.png",
images: [
  "/projects/j-hunter/01-overview.png",
  "/projects/j-hunter/02-dashboard.png",
  "/projects/j-hunter/03-feature.png",
  "/projects/j-hunter/04-mobile.png",
],
```

## Tips
- Dark terminal/dashboard screenshots work well here.
- Include the Flower (Celery monitor) UI if you have it.
- `.webp` preferred for photo-heavy shots.
