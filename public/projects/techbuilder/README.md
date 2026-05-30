# techbuilder — Images

Drop screenshots here and wire them into `src/data/projects.ts` under `id: "techbuilder"`.

## Required files

| File | Size | What to show |
|------|------|--------------|
| `hero.png` | 1200×800 | Architecture diagram or web dashboard |
| `01-overview.png` | 1200×800 | Web app (Next.js) — main dashboard |
| `02-dashboard.png` | 1200×800 | Mobile app (Expo) — worker view |
| `03-feature.png` | 1200×800 | Role hierarchy chart or monorepo structure |

## How to wire in

```ts
thumbnail: "/projects/techbuilder/hero.png",
images: [
  "/projects/techbuilder/01-overview.png",
  "/projects/techbuilder/02-dashboard.png",
  "/projects/techbuilder/03-feature.png",
],
```

## Tips
- Architecture phase project — a clean architecture diagram or ERD is a
  perfectly valid screenshot here.
- Export the Mermaid diagram or the docx architecture image as `hero.png`.
