# abhijeet-portfolio — Images

Drop screenshots here and wire them into `src/data/projects.ts` under `id: "abhijeet-portfolio"`.

## Required files

| File | Size | What to show |
|------|------|--------------|
| `hero.png` | 1200×800 | Hero / photo gallery section |
| `01-overview.png` | 1200×800 | Full landing page |
| `02-dashboard.png` | 1200×800 | Projects or work showcase section |
| `03-feature.png` | 1200×800 | Contact form with Sonner toast |
| `04-mobile.png` | portrait ok | Portfolio on mobile |

## How to wire in

```ts
thumbnail: "/projects/abhijeet-portfolio/hero.png",
images: [
  "/projects/abhijeet-portfolio/01-overview.png",
  "/projects/abhijeet-portfolio/02-dashboard.png",
  "/projects/abhijeet-portfolio/03-feature.png",
  "/projects/abhijeet-portfolio/04-mobile.png",
],
```

## Tips
- Photo-heavy hero gallery is the standout feature — make that the hero shot.
- Keep aspect ratio at 3:2 for the hero; gallery handles portrait shots fine.
