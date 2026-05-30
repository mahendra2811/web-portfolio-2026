# dnp — Images

Drop screenshots here and wire them into `src/data/projects.ts` under `id: "dnp"`.

## Required files

| File | Size | What to show |
|------|------|--------------|
| `hero.png` | 1200×800 | Landing / hero of the DNP Next.js site |
| `01-overview.png` | 1200×800 | Safari tours / packages listing |
| `02-dashboard.png` | 1200×800 | Photo gallery |
| `03-feature.png` | 1200×800 | Booking or contact section |
| `04-mobile.png` | portrait ok | Site on mobile |

## How to wire in

```ts
thumbnail: "/projects/dnp/hero.png",
images: [
  "/projects/dnp/01-overview.png",
  "/projects/dnp/02-dashboard.png",
  "/projects/dnp/03-feature.png",
  "/projects/dnp/04-mobile.png",
],
```

## Tips
- v1 (static) vs v2 (Next.js) side-by-side is a good story if you have both.
- Desert / wildlife imagery from the shared image library makes a strong hero.
