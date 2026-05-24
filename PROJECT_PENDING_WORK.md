# Project Pending Work — Image Wiring

> **Status snapshot:** 20 projects in `src/data/projects.ts`, **0 of them**
> are using real images today. Every project on `/projects` is currently
> showing `picsum.photos` placeholders. Wire real screenshots one project
> at a time using this doc.
>
> Last updated: 2026-05-24

---

## How this works

Each project entry in `src/data/projects.ts` has two image fields:

```ts
thumbnail?: string;   // banner / hero image
images?: string[];    // gallery
```

Right now every entry uses helper calls:

```ts
thumbnail: thumb("calc-master"),                 // → picsum.photos placeholder
images: gallery("calc-master", 3),               // → 3 picsum placeholders
```

To wire real images for a project you do **two** things:

1. **Drop image files** in `public/projects/<id>/` following the naming
   convention (`hero.png`, `01-<topic>.png`, `02-<topic>.png`, …).
2. **Edit the entry** in `src/data/projects.ts` — replace those two
   `thumb()` / `gallery()` lines with the real `/projects/<id>/...`
   paths. (Exact snippets are in §3 below — copy-paste, don't retype.)

Full convention reference: `public/projects/README.md`.

---

## §1. Headline numbers

| Metric | Count |
|---|---|
| Projects in `src/data/projects.ts` | **20** |
| Projects with real `hero.png` checked in | **0** |
| Projects with real gallery images | **0** |
| Hero banners pending | **20** |
| Gallery images pending | **83** |
| **Total image files pending** | **103** |

Storage budget reminder: keep each file under ~500 KB. Use `cwebp` or
[squoosh.app](https://squoosh.app) before committing.

---

## §2. Suggested priority order

### Tier 1 — Featured projects (5 projects, 29 images)
These show up largest on the homepage + `/projects` Featured filter.
Recruiters and clients see these first. **Do these first.**

| # | id | Hero | Gallery | Total |
|---|---|---|---|---|
| 1 | `j-hunter` | 1 | 4 | 5 |
| 2 | `invoiceforge` | 1 | 6 | 7 |
| 3 | `ai-banner` | 1 | 4 | 5 |
| 4 | `fixtools` | 1 | 6 | 7 |
| 5 | `portfolio-2026` | 1 | 4 | 5 |
| 6 | `pdfnest` *(new, featured)* | 1 | 6 | 7 |

> *Tier 1 actually has 6 entries now that `pdfnest` is added — it's
> `featured: true` because it's the flagship Android project.*

**Tier 1 subtotal: 36 images**

### Tier 2 — Public / live products (7 projects, 26 images)
Live products with real users that someone will Google.

| # | id | Hero | Gallery | Total |
|---|---|---|---|---|
| 7 | `callnest` | 1 | 3 | 4 |
| 8 | `tdp` *(thardesertphotography.com is live)* | 1 | 3 | 4 |
| 9 | `sanjivani-ngo` | 1 | 5 | 6 |
| 10 | `calc-master` | 1 | 3 | 4 |
| 11 | `bmi-calculator` | 1 | 3 | 4 |
| 12 | `unit-converter` | 1 | 3 | 4 |
| 13 | `moneynest` *(new)* | 1 | 4 | 5 |

**Tier 2 subtotal: 31 images**

### Tier 3 — Portfolio / client / learning work (7 projects, 32 images)

| # | id | Hero | Gallery | Total |
|---|---|---|---|---|
| 14 | `ddws-safari` | 1 | 4 | 5 |
| 15 | `dnp` | 1 | 3 | 4 |
| 16 | `tech-web` | 1 | 4 | 5 |
| 17 | `abhijeet-portfolio` | 1 | 4 | 5 |
| 18 | `food-delivery-app` | 1 | 4 | 5 |
| 19 | `todo-master-ai` | 1 | 3 | 4 |
| 20 | `techbuilder` | 1 | 3 | 4 |

**Tier 3 subtotal: 32 images**

---

## §3. Per-project checklist + ready-to-paste snippets

For each project: required files on the left, and the **exact lines to
paste** into `src/data/projects.ts` (replacing the current `thumb()` /
`gallery()` calls) on the right.

> **Pattern**: edit the matching `id: "<x>"` entry, find its
> `thumbnail:` and `images:` lines, replace them with the snippet
> below. Leave everything else (techStack, highlights, etc.) untouched.

---

### 3.1 `j-hunter` — Tier 1 ⭐

**Drop into** `public/projects/j-hunter/`:

- [ ] `hero.png`
- [ ] `01-overview.png`
- [ ] `02-dashboard.png`
- [ ] `03-applications.png`
- [ ] `04-pipeline.png`

**Replace in `src/data/projects.ts`:**

```ts
    thumbnail: "/projects/j-hunter/hero.png",
    images: [
      "/projects/j-hunter/01-overview.png",
      "/projects/j-hunter/02-dashboard.png",
      "/projects/j-hunter/03-applications.png",
      "/projects/j-hunter/04-pipeline.png",
    ],
```

---

### 3.2 `invoiceforge` — Tier 1 ⭐

**Drop into** `public/projects/invoiceforge/`:

- [ ] `hero.png`
- [ ] `01-overview.png`
- [ ] `02-create-invoice.png`
- [ ] `03-clients.png`
- [ ] `04-pdf-export.png`
- [ ] `05-mobile.png`
- [ ] `06-offline-pwa.png`

**Replace in `src/data/projects.ts`:**

```ts
    thumbnail: "/projects/invoiceforge/hero.png",
    images: [
      "/projects/invoiceforge/01-overview.png",
      "/projects/invoiceforge/02-create-invoice.png",
      "/projects/invoiceforge/03-clients.png",
      "/projects/invoiceforge/04-pdf-export.png",
      "/projects/invoiceforge/05-mobile.png",
      "/projects/invoiceforge/06-offline-pwa.png",
    ],
```

---

### 3.3 `ai-banner` — Tier 1 ⭐

**Drop into** `public/projects/ai-banner/`:

- [ ] `hero.png`
- [ ] `01-poster-editor.png`
- [ ] `02-banner-feed.png`
- [ ] `03-color-match.png`
- [ ] `04-share-whatsapp.png`

**Replace in `src/data/projects.ts`:**

```ts
    thumbnail: "/projects/ai-banner/hero.png",
    images: [
      "/projects/ai-banner/01-poster-editor.png",
      "/projects/ai-banner/02-banner-feed.png",
      "/projects/ai-banner/03-color-match.png",
      "/projects/ai-banner/04-share-whatsapp.png",
    ],
```

---

### 3.4 `fixtools` — Tier 1 ⭐

**Drop into** `public/projects/fixtools/`:

- [ ] `hero.png`
- [ ] `01-home.png`
- [ ] `02-pdf-tools.png`
- [ ] `03-image-tools.png`
- [ ] `04-calculators.png`
- [ ] `05-dev-tools.png`
- [ ] `06-mobile.png`

**Replace in `src/data/projects.ts`:**

```ts
    thumbnail: "/projects/fixtools/hero.png",
    images: [
      "/projects/fixtools/01-home.png",
      "/projects/fixtools/02-pdf-tools.png",
      "/projects/fixtools/03-image-tools.png",
      "/projects/fixtools/04-calculators.png",
      "/projects/fixtools/05-dev-tools.png",
      "/projects/fixtools/06-mobile.png",
    ],
```

---

### 3.5 `portfolio-2026` — Tier 1 ⭐

**Drop into** `public/projects/portfolio-2026/`:

- [ ] `hero.png`
- [ ] `01-home.png`
- [ ] `02-projects.png`
- [ ] `03-about.png`
- [ ] `04-blog.png`

**Replace in `src/data/projects.ts`:**

```ts
    thumbnail: "/projects/portfolio-2026/hero.png",
    images: [
      "/projects/portfolio-2026/01-home.png",
      "/projects/portfolio-2026/02-projects.png",
      "/projects/portfolio-2026/03-about.png",
      "/projects/portfolio-2026/04-blog.png",
    ],
```

---

### 3.6 `pdfnest` — Tier 1 ⭐ (new)

**Drop into** `public/projects/pdfnest/`:

- [ ] `hero.png`
- [ ] `01-home.png`
- [ ] `02-reader.png`
- [ ] `03-scan.png`
- [ ] `04-edit.png`
- [ ] `05-tools-hub.png`
- [ ] `06-vault.png`

**Replace in `src/data/projects.ts`:**

```ts
    thumbnail: "/projects/pdfnest/hero.png",
    images: [
      "/projects/pdfnest/01-home.png",
      "/projects/pdfnest/02-reader.png",
      "/projects/pdfnest/03-scan.png",
      "/projects/pdfnest/04-edit.png",
      "/projects/pdfnest/05-tools-hub.png",
      "/projects/pdfnest/06-vault.png",
    ],
```

---

### 3.7 `callnest` — Tier 2

**Drop into** `public/projects/callnest/`:

- [ ] `hero.png`
- [ ] `01-call-list.png`
- [ ] `02-call-bubble.png`
- [ ] `03-export.png`

**Replace in `src/data/projects.ts`:** *(callnest currently has no
`thumbnail:` / `images:` lines — the resolver falls back to picsum.
Add both fields right after `longDescription`.)*

```ts
    thumbnail: "/projects/callnest/hero.png",
    images: [
      "/projects/callnest/01-call-list.png",
      "/projects/callnest/02-call-bubble.png",
      "/projects/callnest/03-export.png",
    ],
```

---

### 3.8 `tdp` (Thar Desert Photography) — Tier 2

**Drop into** `public/projects/tdp/`:

- [ ] `hero.png`
- [ ] `01-landing.png`
- [ ] `02-gallery.png`
- [ ] `03-booking.png`

**Replace in `src/data/projects.ts`:** *(tdp currently has no
`thumbnail:` / `images:` lines — add both right after
`longDescription`.)*

```ts
    thumbnail: "/projects/tdp/hero.png",
    images: [
      "/projects/tdp/01-landing.png",
      "/projects/tdp/02-gallery.png",
      "/projects/tdp/03-booking.png",
    ],
```

---

### 3.9 `sanjivani-ngo` — Tier 2

**Drop into** `public/projects/sanjivani-ngo/`:

- [ ] `hero.png`
- [ ] `01-home.png`
- [ ] `02-programs.png`
- [ ] `03-donate.png`
- [ ] `04-volunteer.png`
- [ ] `05-impact.png`

**Replace in `src/data/projects.ts`:**

```ts
    thumbnail: "/projects/sanjivani-ngo/hero.png",
    images: [
      "/projects/sanjivani-ngo/01-home.png",
      "/projects/sanjivani-ngo/02-programs.png",
      "/projects/sanjivani-ngo/03-donate.png",
      "/projects/sanjivani-ngo/04-volunteer.png",
      "/projects/sanjivani-ngo/05-impact.png",
    ],
```

---

### 3.10 `calc-master` — Tier 2

**Drop into** `public/projects/calc-master/`:

- [ ] `hero.png`
- [ ] `01-home.png`
- [ ] `02-emi-calc.png`
- [ ] `03-history.png`

**Replace in `src/data/projects.ts`:**

```ts
    thumbnail: "/projects/calc-master/hero.png",
    images: [
      "/projects/calc-master/01-home.png",
      "/projects/calc-master/02-emi-calc.png",
      "/projects/calc-master/03-history.png",
    ],
```

---

### 3.11 `bmi-calculator` — Tier 2

**Drop into** `public/projects/bmi-calculator/`:

- [ ] `hero.png`
- [ ] `01-input.png`
- [ ] `02-result.png`
- [ ] `03-history-chart.png`

**Replace in `src/data/projects.ts`:**

```ts
    thumbnail: "/projects/bmi-calculator/hero.png",
    images: [
      "/projects/bmi-calculator/01-input.png",
      "/projects/bmi-calculator/02-result.png",
      "/projects/bmi-calculator/03-history-chart.png",
    ],
```

---

### 3.12 `unit-converter` — Tier 2

**Drop into** `public/projects/unit-converter/`:

- [ ] `hero.png`
- [ ] `01-categories.png`
- [ ] `02-length-conversion.png`
- [ ] `03-currency.png`

**Replace in `src/data/projects.ts`:**

```ts
    thumbnail: "/projects/unit-converter/hero.png",
    images: [
      "/projects/unit-converter/01-categories.png",
      "/projects/unit-converter/02-length-conversion.png",
      "/projects/unit-converter/03-currency.png",
    ],
```

---

### 3.13 `moneynest` — Tier 2 (new)

**Drop into** `public/projects/moneynest/`:

- [ ] `hero.png`
- [ ] `01-home.png`
- [ ] `02-add-expense.png`
- [ ] `03-voice-entry.png`
- [ ] `04-summary.png`

**Replace in `src/data/projects.ts`:**

```ts
    thumbnail: "/projects/moneynest/hero.png",
    images: [
      "/projects/moneynest/01-home.png",
      "/projects/moneynest/02-add-expense.png",
      "/projects/moneynest/03-voice-entry.png",
      "/projects/moneynest/04-summary.png",
    ],
```

---

### 3.14 `ddws-safari` — Tier 3

**Drop into** `public/projects/ddws-safari/`:

- [ ] `hero.png`
- [ ] `01-landing.png`
- [ ] `02-safaris.png`
- [ ] `03-booking.png`
- [ ] `04-gallery.png`

**Replace in `src/data/projects.ts`:**

```ts
    thumbnail: "/projects/ddws-safari/hero.png",
    images: [
      "/projects/ddws-safari/01-landing.png",
      "/projects/ddws-safari/02-safaris.png",
      "/projects/ddws-safari/03-booking.png",
      "/projects/ddws-safari/04-gallery.png",
    ],
```

---

### 3.15 `dnp` — Tier 3

**Drop into** `public/projects/dnp/`:

- [ ] `hero.png`
- [ ] `01-home.png`
- [ ] `02-tours.png`
- [ ] `03-contact.png`

**Replace in `src/data/projects.ts`:** *(no current `thumbnail:` /
`images:` lines — add both right after `longDescription`.)*

```ts
    thumbnail: "/projects/dnp/hero.png",
    images: [
      "/projects/dnp/01-home.png",
      "/projects/dnp/02-tours.png",
      "/projects/dnp/03-contact.png",
    ],
```

---

### 3.16 `tech-web` — Tier 3

**Drop into** `public/projects/tech-web/`:

- [ ] `hero.png`
- [ ] `01-home.png`
- [ ] `02-services.png`
- [ ] `03-portfolio.png`
- [ ] `04-contact.png`

**Replace in `src/data/projects.ts`:**

```ts
    thumbnail: "/projects/tech-web/hero.png",
    images: [
      "/projects/tech-web/01-home.png",
      "/projects/tech-web/02-services.png",
      "/projects/tech-web/03-portfolio.png",
      "/projects/tech-web/04-contact.png",
    ],
```

---

### 3.17 `abhijeet-portfolio` — Tier 3

**Drop into** `public/projects/abhijeet-portfolio/`:

- [ ] `hero.png`
- [ ] `01-home.png`
- [ ] `02-about.png`
- [ ] `03-projects.png`
- [ ] `04-contact.png`

**Replace in `src/data/projects.ts`:**

```ts
    thumbnail: "/projects/abhijeet-portfolio/hero.png",
    images: [
      "/projects/abhijeet-portfolio/01-home.png",
      "/projects/abhijeet-portfolio/02-about.png",
      "/projects/abhijeet-portfolio/03-projects.png",
      "/projects/abhijeet-portfolio/04-contact.png",
    ],
```

---

### 3.18 `food-delivery-app` — Tier 3

**Drop into** `public/projects/food-delivery-app/`:

- [ ] `hero.png`
- [ ] `01-home.png`
- [ ] `02-menu.png`
- [ ] `03-cart.png`
- [ ] `04-order-tracking.png`

**Replace in `src/data/projects.ts`:**

```ts
    thumbnail: "/projects/food-delivery-app/hero.png",
    images: [
      "/projects/food-delivery-app/01-home.png",
      "/projects/food-delivery-app/02-menu.png",
      "/projects/food-delivery-app/03-cart.png",
      "/projects/food-delivery-app/04-order-tracking.png",
    ],
```

---

### 3.19 `todo-master-ai` — Tier 3

**Drop into** `public/projects/todo-master-ai/`:

- [ ] `hero.png`
- [ ] `01-board.png`
- [ ] `02-ai-suggest.png`
- [ ] `03-mobile.png`

**Replace in `src/data/projects.ts`:**

```ts
    thumbnail: "/projects/todo-master-ai/hero.png",
    images: [
      "/projects/todo-master-ai/01-board.png",
      "/projects/todo-master-ai/02-ai-suggest.png",
      "/projects/todo-master-ai/03-mobile.png",
    ],
```

---

### 3.20 `techbuilder` — Tier 3

**Drop into** `public/projects/techbuilder/`:

- [ ] `hero.png`
- [ ] `01-architecture.png`
- [ ] `02-web-app.png`
- [ ] `03-mobile-app.png`

**Replace in `src/data/projects.ts`:**

```ts
    thumbnail: "/projects/techbuilder/hero.png",
    images: [
      "/projects/techbuilder/01-architecture.png",
      "/projects/techbuilder/02-web-app.png",
      "/projects/techbuilder/03-mobile-app.png",
    ],
```

---

## §4. Workflow recipe (do this per project)

```bash
# 1. Source your screenshots into the project folder (rename to the
#    exact names listed for that project in §3).
cp ~/screenshots/jhunter/*.png \
   "public/projects/j-hunter/"

# 2. Re-check what's actually there:
ls "public/projects/j-hunter/"

# 3. Open src/data/projects.ts, find the matching id, and paste the
#    snippet from §3 over the current thumb()/gallery() lines.

# 4. Verify the dev server picks them up:
npm run dev
# → open http://localhost:3000/projects/j-hunter

# 5. If everything looks right, commit only that project's files +
#    the projects.ts change:
git add public/projects/j-hunter/ src/data/projects.ts
git commit -m "feat(portfolio): wire real screenshots for j-hunter"
```

Repeat for each project. You don't have to do all 20 at once.

---

## §5. Filename conventions (quick reference)

| File | What it's for | Recommended size |
|---|---|---|
| `hero.png` | Banner / thumbnail. Shown on `/`, `/projects` list card, and the big banner on `/projects/<id>` | 1200 × 800 (3:2), ≤ 500 KB |
| `01-<topic>.png` | Gallery image #1 | 1200 × 800 (or 1080 × 1920 for mobile screenshots) |
| `02-<topic>.png` | Gallery image #2 | same |
| `0N-<topic>.png` | Gallery image #N | same |

- `<topic>` is free-form (`dashboard`, `mobile`, `signup-flow`,
  `home`, `result`, etc.). Just be consistent within a project.
- `.png` and `.webp` both work. `.webp` is smaller for photos.
- Mobile screenshots (tall) are fine — the gallery handles 9:16 too.

---

## §6. Common mistakes to avoid

1. **Don't include `public` in the URL.**
   - ✅ `/projects/j-hunter/hero.png`
   - ❌ `/public/projects/j-hunter/hero.png`

2. **Don't rename `hero.png` to something else** unless you also
   update the `thumbnail:` field in `projects.ts`.

3. **Don't forget to remove the helper call.** Leaving
   `thumbnail: thumb("j-hunter")` alongside real files means the
   helper still wins — it overwrites your intent.

4. **Don't upload 4 MB photos.** Run them through `cwebp` or
   squoosh.app first — anything over ~500 KB will tank your
   Lighthouse score.

5. **Don't forget `featured: true`.** If you want a project to show
   up in the homepage's Featured strip, that flag has to be `true`
   on its entry. Tier-1 projects in §2 already have it set.

---

## §7. After every wave of updates

Run a production build to catch broken paths early:

```bash
npm run build
```

A missing image file produces a 404 at runtime but the build still
succeeds — so manually open `/projects/<id>` in the browser to
confirm the real image is showing (and not a stretched picsum
fallback).
