# tdp — Images

Drop screenshots here and wire them into `src/data/projects.ts` under `id: "tdp"`.

## Required files

| File | Size | What to show |
|------|------|--------------|
| `hero.png` | 1200×800 | Live production site (thardesertphotography.com) hero |
| `01-overview.png` | 1200×800 | Photography gallery / tour listing |
| `02-dashboard.png` | 1200×800 | v3 3D scene or Sanity CMS editor |
| `03-feature.png` | 1200×800 | Booking / contact form |
| `04-mobile.png` | portrait ok | Site on mobile |

## How to wire in

```ts
thumbnail: "/projects/tdp/hero.png",
images: [
  "/projects/tdp/01-overview.png",
  "/projects/tdp/02-dashboard.png",
  "/projects/tdp/03-feature.png",
  "/projects/tdp/04-mobile.png",
],
```

## Tips
- Hero should be the v1 live site — it's in production and looks great.
- Include a v3 3D-scene screenshot to show the tech leap across versions.
- Desert landscape photos in the gallery are visually strong.
