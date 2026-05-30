# fixtools — Images

Drop screenshots here and wire them into `src/data/projects.ts` under `id: "fixtools"`.

## Required files

| File | Size | What to show |
|------|------|--------------|
| `hero.png` | 1200×800 | Tools home page / all-tools grid |
| `01-overview.png` | 1200×800 | Image compress or resize tool in action |
| `02-dashboard.png` | 1200×800 | PDF merge or split tool |
| `03-feature.png` | 1200×800 | Exam photo resizer (UPSC/NEET preset) |
| `04-mobile.png` | portrait ok | Any tool on mobile screen |
| `05-dark.png` | 1200×800 | Dark mode view (optional extra) |

## How to wire in

```ts
thumbnail: "/projects/fixtools/hero.png",
images: [
  "/projects/fixtools/01-overview.png",
  "/projects/fixtools/02-dashboard.png",
  "/projects/fixtools/03-feature.png",
  "/projects/fixtools/04-mobile.png",
],
```

## Tips
- Emphasise the "zero upload, 100% in-browser" angle in screenshot captions.
- Dark mode default — screenshot in dark mode for the hero.
