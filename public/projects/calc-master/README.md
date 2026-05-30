# calc-master — Images

Drop screenshots here and wire them into `src/data/projects.ts` under `id: "calc-master"`.

## Required files

| File | Size | What to show |
|------|------|--------------|
| `hero.png` | portrait (9:16) | Calculator home / main screen |
| `01-overview.png` | portrait (9:16) | Calc type selector / multi-calculator list |
| `02-dashboard.png` | portrait (9:16) | A specific calculator in use |
| `03-feature.png` | portrait (9:16) | History or i18n locale switch |

## How to wire in

```ts
thumbnail: "/projects/calc-master/hero.png",
images: [
  "/projects/calc-master/01-overview.png",
  "/projects/calc-master/02-dashboard.png",
  "/projects/calc-master/03-feature.png",
],
```

## Tips
- Portrait (9:16) Android screenshots — gallery handles them natively.
- Show the Hindi / localized number format if possible (strong differentiator).
