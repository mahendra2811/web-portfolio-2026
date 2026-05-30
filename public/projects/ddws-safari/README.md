# ddws-safari — Images

Drop screenshots here and wire them into `src/data/projects.ts` under `id: "ddws-safari"`.

## Required files

| File | Size | What to show |
|------|------|--------------|
| `hero.png` | 1200×800 | Landing / hero section of the site |
| `01-overview.png` | 1200×800 | Safari packages or tours listing |
| `02-dashboard.png` | 1200×800 | Booking / contact form |
| `03-feature.png` | 1200×800 | Wildlife gallery or team section |
| `04-mobile.png` | portrait ok | Site on mobile |

## How to wire in

```ts
thumbnail: "/projects/ddws-safari/hero.png",
images: [
  "/projects/ddws-safari/01-overview.png",
  "/projects/ddws-safari/02-dashboard.png",
  "/projects/ddws-safari/03-feature.png",
  "/projects/ddws-safari/04-mobile.png",
],
```

## Tips
- Use the live site URL to take high-quality screenshots.
- Desert/wildlife photos in the gallery make excellent hero material.
