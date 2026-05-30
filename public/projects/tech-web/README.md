# tech-web — Images

Drop screenshots here and wire them into `src/data/projects.ts` under `id: "tech-web"`.

## Required files

| File | Size | What to show |
|------|------|--------------|
| `hero.png` | 1200×800 | Homepage / hero of the old portfolio |
| `01-overview.png` | 1200×800 | Projects listing page |
| `02-dashboard.png` | 1200×800 | Admin panel — projects or services CRUD |
| `03-feature.png` | 1200×800 | Contact / email form |
| `04-mobile.png` | portrait ok | Site on mobile |

## How to wire in

```ts
thumbnail: "/projects/tech-web/hero.png",
images: [
  "/projects/tech-web/01-overview.png",
  "/projects/tech-web/02-dashboard.png",
  "/projects/tech-web/03-feature.png",
  "/projects/tech-web/04-mobile.png",
],
```

## Tips
- This is a v1 / archived project — one good hero + 2-3 feature shots is enough.
- The admin panel screenshot is a good technical differentiator.
