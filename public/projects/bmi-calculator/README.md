# bmi-calculator — Images

Drop screenshots here and wire them into `src/data/projects.ts` under `id: "bmi-calculator"`.

## Required files

| File | Size | What to show |
|------|------|--------------|
| `hero.png` | portrait (9:16) | BMI result screen with gradient background |
| `01-overview.png` | portrait (9:16) | Input screen (height + weight fields) |
| `02-dashboard.png` | portrait (9:16) | History chart (chart-kit graph) |
| `03-feature.png` | portrait (9:16) | Shareable BMI card (view-shot output) |

## How to wire in

```ts
thumbnail: "/projects/bmi-calculator/hero.png",
images: [
  "/projects/bmi-calculator/01-overview.png",
  "/projects/bmi-calculator/02-dashboard.png",
  "/projects/bmi-calculator/03-feature.png",
],
```

## Tips
- The expo-linear-gradient result screen is very photogenic — use it as hero.
- The chart history screen shows real technical depth.
- Portrait (9:16) is natural shape; no cropping needed.
