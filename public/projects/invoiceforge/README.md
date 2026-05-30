# invoiceforge — Images

Drop screenshots here and wire them into `src/data/projects.ts` under `id: "invoiceforge"`.

## Required files

| File | Size | What to show |
|------|------|--------------|
| `hero.png` | 1200×800 | Invoice creation form or final PDF preview |
| `01-overview.png` | 1200×800 | Invoice list / home dashboard |
| `02-dashboard.png` | 1200×800 | GST invoice form with line items |
| `03-feature.png` | 1200×800 | UPI QR code + payment section |
| `04-mobile.png` | portrait ok | PWA installed on Android home screen |
| `05-pdf.png` | 1200×800 | Generated PDF preview (optional extra) |

## How to wire in

```ts
thumbnail: "/projects/invoiceforge/hero.png",
images: [
  "/projects/invoiceforge/01-overview.png",
  "/projects/invoiceforge/02-dashboard.png",
  "/projects/invoiceforge/03-feature.png",
  "/projects/invoiceforge/04-mobile.png",
],
```

## Tips
- Show the offline badge / PWA install prompt if possible.
- Hindi language toggle screenshot would be a strong feature shot.
- `.webp` preferred for photo-heavy shots.
