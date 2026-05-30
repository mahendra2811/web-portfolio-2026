# food-delivery-app — Images

Drop screenshots here and wire them into `src/data/projects.ts` under `id: "food-delivery-app"`.

## Required files

| File | Size | What to show |
|------|------|--------------|
| `hero.png` | portrait (9:16) | App home / food listing screen |
| `01-overview.png` | portrait (9:16) | Tab navigation + home feed |
| `02-dashboard.png` | portrait (9:16) | Food item detail screen |
| `03-feature.png` | portrait (9:16) | Cart or order screen |
| `04-mobile.png` | portrait (9:16) | Another tab or settings screen |

## How to wire in

```ts
thumbnail: "/projects/food-delivery-app/hero.png",
images: [
  "/projects/food-delivery-app/01-overview.png",
  "/projects/food-delivery-app/02-dashboard.png",
  "/projects/food-delivery-app/03-feature.png",
  "/projects/food-delivery-app/04-mobile.png",
],
```

## Tips
- Use the Android emulator or Expo Go to take screenshots.
- Portrait (9:16) is the natural shape — gallery component handles it.
- Rename to `.webp` if you export from Android Studio for smaller file size.
