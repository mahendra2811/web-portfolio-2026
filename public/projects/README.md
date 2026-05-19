# Project Images — Folder Convention

This folder hosts every project's screenshots. Each subfolder name **must
exactly match** the `id` field of the matching project in
`src/data/projects.ts`. That's how the wiring connects.

Look at `_sample/` for a fully-named example.

---

## Folder structure

```
public/projects/
├── README.md                ← (this file)
├── _sample/                 ← reference structure — copy this layout
│   ├── hero.png
│   ├── 01-overview.png
│   ├── 02-dashboard.png
│   ├── 03-feature.png
│   └── 04-mobile.png
│
├── callnest/                ← project id: "callnest"
├── j-hunter/                ← project id: "j-hunter"
├── invoiceforge/            ← project id: "invoiceforge"
├── ai-banner/               ← project id: "ai-banner"
├── fixtools/                ← project id: "fixtools"
├── ddws-safari/             ← project id: "ddws-safari"
├── tdp/                     ← project id: "tdp"
├── dnp/                     ← project id: "dnp"
├── portfolio-2026/          ← project id: "portfolio-2026"
├── tech-web/                ← project id: "tech-web"
├── abhijeet-portfolio/      ← project id: "abhijeet-portfolio"
├── sanjivani-ngo/           ← project id: "sanjivani-ngo"
├── food-delivery-app/       ← project id: "food-delivery-app"
├── todo-master-ai/          ← project id: "todo-master-ai"
├── calc-master/             ← project id: "calc-master"
├── bmi-calculator/          ← project id: "bmi-calculator"
├── unit-converter/          ← project id: "unit-converter"
└── techbuilder/             ← project id: "techbuilder"
```

---

## File-naming convention (inside each project folder)

| File | Purpose | Used by |
|---|---|---|
| `hero.png` | **Featured / thumbnail photo.** Shown on home-page card, /projects list card, and the big banner at the top of /projects/[slug]. | `thumbnail` field |
| `01-<topic>.png` | Gallery image #1 | `images[0]` |
| `02-<topic>.png` | Gallery image #2 | `images[1]` |
| `03-<topic>.png` | Gallery image #3 | `images[2]` |
| `04-<topic>.png` | Gallery image #4 (optional) | `images[3]` |
| …                 | Add as many as you like | … |

- The numeric prefix (`01-`, `02-`, …) keeps gallery order obvious.
- The `<topic>` part is free-form — `dashboard`, `mobile`, `signup-flow`, etc.
- Extensions: `.png`, `.jpg`, `.jpeg`, `.webp` all work. Prefer `.webp` for
  photos (smaller) and `.png` for UI screenshots.

---

## Recommended dimensions

| File | Aspect | Pixels |
|---|---|---|
| `hero.png` | 3:2 | **1200 × 800** (matches `getProjectThumbnail` default) |
| Gallery images | 3:2 | **1200 × 800** or wider |
| Mobile screenshots | 9:16 or 9:19.5 | up to **1080 × 1920** — the gallery handles tall images |

Keep each file **under ~500 KB** when possible. Use a tool like `squoosh.app`
or `cwebp` to compress.

---

## How to wire a project's images

Open `src/data/projects.ts`, find the project entry by `id`, and add /
update these two fields:

```ts
{
  id: "callnest",
  // ...
  thumbnail: "/projects/callnest/hero.png",
  images: [
    "/projects/callnest/01-overview.png",
    "/projects/callnest/02-call-bubble.png",
    "/projects/callnest/03-export.png",
  ],
  // ...
}
```

Notes:
- Paths are **`/public`-relative** — start with `/projects/...`, never
  include `public` in the URL.
- Drop `thumbnail` or leave `images: []` to fall back to picsum placeholders.
- Set `forcePlaceholder: true` on a project to ignore real files and force
  picsum (useful while testing layouts).
- Both fields are optional — projects with no images render picsum
  placeholders seeded by `id`.

---

## Adding a new remote host (e.g. your CDN)

If you want to host images on an external CDN instead of `/public`, add
the hostname to `next.config.ts → images.remotePatterns`:

```ts
{ protocol: "https", hostname: "your-cdn.com", pathname: "/**" },
```

Then restart `npm run dev`. Already allowed hosts:
- `picsum.photos`
- `cdn.sanity.io`
- `images.unsplash.com`
