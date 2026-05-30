# sanjivani-ngo — Images

Drop screenshots here and wire them into `src/data/projects.ts` under `id: "sanjivani-ngo"`.

## Required files

| File | Size | What to show |
|------|------|--------------|
| `hero.png` | 1200×800 | Landing / NGO homepage |
| `01-overview.png` | 1200×800 | Donation form with Razorpay |
| `02-dashboard.png` | 1200×800 | Admin dashboard — donation tracking |
| `03-feature.png` | 1200×800 | 3D carousel of NGO events |
| `04-mobile.png` | portrait ok | Donation page on mobile |

## How to wire in

```ts
thumbnail: "/projects/sanjivani-ngo/hero.png",
images: [
  "/projects/sanjivani-ngo/01-overview.png",
  "/projects/sanjivani-ngo/02-dashboard.png",
  "/projects/sanjivani-ngo/03-feature.png",
  "/projects/sanjivani-ngo/04-mobile.png",
],
```

## Tips
- The Razorpay payment modal screenshot is a strong feature differentiator.
- Show the email receipt / verification flow if you have it.
