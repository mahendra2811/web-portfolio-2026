# callnest — Images

Drop screenshots here and wire them into `src/data/projects.ts` under `id: "callnest"`.

## Required files

| File | Size | What to show |
|------|------|--------------|
| `hero.png` | 1200×800 | App home screen or marketing site hero |
| `01-overview.png` | 1200×800 | Lead pipeline list / call log view |
| `02-dashboard.png` | 1200×800 | Lead detail or follow-up screen |
| `03-feature.png` | 1200×800 | Excel/CSV/PDF export or in-call bubble |
| `04-mobile.png` | portrait ok | Marketing site (callnest.pooniya.com) on mobile |

## How to wire in

```ts
thumbnail: "/projects/callnest/hero.png",
images: [
  "/projects/callnest/01-overview.png",
  "/projects/callnest/02-dashboard.png",
  "/projects/callnest/03-feature.png",
  "/projects/callnest/04-mobile.png",
],
```

## Tips
- Android screenshots → portrait (9:16) is fine, gallery handles it.
- Use `.webp` instead of `.png` for photo-heavy shots to cut file size.
- Marketing-site screenshots should be 16:9 or 3:2.
