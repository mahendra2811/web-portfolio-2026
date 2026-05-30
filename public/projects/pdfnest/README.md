# pdfnest — Images

Drop screenshots here and wire them into `src/data/projects.ts` under `id: "pdfnest"`.

## Required files

| File | Size | What to show |
|------|------|--------------|
| `hero.png` | portrait (9:16) | App home / flagships grid (Reader, Scan, Edit, Tools) |
| `01-overview.png` | portrait (9:16) | PDF Reader in action |
| `02-dashboard.png` | portrait (9:16) | Scan-to-PDF with ML Kit Document Scanner |
| `03-feature.png` | portrait (9:16) | Tools Hub — 23 tools grid |
| `04-vault.png` | portrait (9:16) | Biometric App-Lock or encrypted Vault screen |
| `05-ocr.png` | portrait (9:16) | Devanagari OCR result (optional extra) |

## How to wire in

```ts
thumbnail: "/projects/pdfnest/hero.png",
images: [
  "/projects/pdfnest/01-overview.png",
  "/projects/pdfnest/02-dashboard.png",
  "/projects/pdfnest/03-feature.png",
  "/projects/pdfnest/04-vault.png",
],
```

## Tips
- Portrait (9:16) Android screenshots — gallery handles them natively.
- The Vault / biometric screen is a strong privacy differentiator — include it.
- Export from Android Studio Device Manager for highest quality captures.
