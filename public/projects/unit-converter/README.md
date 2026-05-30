# unit-converter — Images

Drop screenshots here and wire them into `src/data/projects.ts` under `id: "unit-converter"`.

## Required files

| File | Size | What to show |
|------|------|--------------|
| `hero.png` | portrait (9:16) | App home / conversion screen |
| `01-overview.png` | portrait (9:16) | Bottom-tab navigation visible |
| `02-dashboard.png` | portrait (9:16) | A unit conversion in action |
| `03-feature.png` | portrait (9:16) | Copy-to-clipboard toast or result |

## How to wire in

```ts
thumbnail: "/projects/unit-converter/hero.png",
images: [
  "/projects/unit-converter/01-overview.png",
  "/projects/unit-converter/02-dashboard.png",
  "/projects/unit-converter/03-feature.png",
],
```

## Tips
- Portrait (9:16) screenshots work best for mobile-only apps.
- Show at least 2 different unit types to convey the "multi" aspect.
