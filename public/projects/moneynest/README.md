# moneynest — Images

Drop screenshots here and wire them into `src/data/projects.ts` under `id: "moneynest"`.

## Required files

| File | Size | What to show |
|------|------|--------------|
| `hero.png` | portrait (9:16) | Dashboard — account balances + recent transactions |
| `01-overview.png` | portrait (9:16) | Add expense screen |
| `02-dashboard.png` | portrait (9:16) | Voice expense entry in action |
| `03-feature.png` | portrait (9:16) | App-Lock / biometric prompt screen |
| `04-export.png` | portrait (9:16) | JSON/CSV export via Android share sheet (optional) |

## How to wire in

```ts
thumbnail: "/projects/moneynest/hero.png",
images: [
  "/projects/moneynest/01-overview.png",
  "/projects/moneynest/02-dashboard.png",
  "/projects/moneynest/03-feature.png",
  "/projects/moneynest/04-export.png",
],
```

## Tips
- Portrait (9:16) Android screenshots — gallery handles them natively.
- The voice-entry and biometric screens are the strongest differentiators — include both.
- Export from Android Studio Device Manager for highest quality captures.
