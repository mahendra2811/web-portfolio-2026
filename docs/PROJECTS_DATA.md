# Projects Data — Source of Truth & Missing-Info Report

**Single source of truth:** `src/data/projects.ts`
**Detail page:** `src/app/projects/[slug]/page.tsx` — auto-renders any optional fields that exist
**Listing page:** `src/app/projects/page.tsx` — tabs are derived from the part before " / " in `category`
**Featured carousel:** `src/components/sections/FeaturedProjects.tsx` — picks the first 3 with `featured: true`

## Variants — multiple versions of one project

When the same project ships in different stacks (e.g. v1 static HTML, v2 framework rebuild, v3 full-stack with admin), use `variants[]` instead of separate project entries. The detail page renders all variants as side-by-side cards under a **Versions** section.

```ts
{
  id: "tdp",
  title: "Thar Desert Photography",
  // parent project meta (shared across variants)…
  variants: [
    {
      label: "v3 — Next.js + Sanity rebuild",
      description: "Current build.",
      status: "In Development",
      year: "2026",
      techStack: ["Next.js", "Sanity CMS", "Three.js"],
      githubUrl: "#",
      liveUrl: "#",
      highlights: ["Sanity-driven content", "3D scenes with GPU detection"],
    },
    { label: "v2 — Full-stack", … },
    { label: "v1 — Static HTML/CSS", … },
  ],
}
```

The parent fields (`title`, `liveUrl`, `githubUrl`, `techStack`, `status`, `year`) point to the **current/primary** variant. The `variants[]` array carries per-version detail.

Currently merged into variants: `tdp` (3 versions), `dnp` (2 versions). `callnest` is also a merge (Android app + marketing site) but is kept as a flat entry because the two parts are different products that share a brand, not different versions of the same product.

## Display order — `priority`, `featured`, `status`

The `/projects` listing and the homepage carousel both use `getSortedProjects()` from `src/data/projects.ts`. The sort order is:

1. Items with `priority` (number) — **ascending**, so `priority: 1` is first.
2. Items without priority where `status: "Live"`.
3. Items without priority where `status: "In Development"`.
4. Anything else.

> Priority **always wins**. If you set `priority: 1` on an `In Development` project, it will appear before all `Live` projects.

### Pinning a project to the top

```ts
{
  id: "callnest-android",
  priority: 1,           // ← shown first on /projects
  // ...
}
```

### Homepage hero — top 4 featured projects

`<FeaturedProjects />` calls `getFeaturedProjects(4)`, which:

1. Takes everything with `featured: true`, sorted by the rules above.
2. If fewer than 4 are featured, fills the remaining slots from the next sorted projects.
3. Caps at 4.

To pin a project to the homepage:

```ts
{
  featured: true,
  priority: 1,           // optional — controls position among featured
}
```

Default priorities currently set:

| `priority` | Project                         |
| ---------- | ------------------------------- |
| 1          | callnest (App + marketing site) |
| 2          | invoiceforge                    |
| 3          | fixtools                        |
| 4          | j-hunter (job Hunter)           |

Edit, swap, or extend these by adding `priority: <n>` to any project entry. To remove a project's pinning, just delete the `priority` line.

## How to edit

| Action                    | What to do                                                                                                                                                                                                                                                                                    |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Edit a project            | Open `src/data/projects.ts` and update the matching object.                                                                                                                                                                                                                                   |
| Add a project             | Append a new object to the `projects` array. Required: `id, title, shortDescription, longDescription, thumbnail, images, techStack, category, featured, liveUrl, githubUrl, status, year, highlights`. Everything else (role, problem, solution, outcome, learnings, docs, tags) is optional. |
| Remove a project          | Delete the matching object.                                                                                                                                                                                                                                                                   |
| Replace placeholder image | Drop the file in `public/projects/<id>/thumb.jpg` and replace the `thumbnail`/`images[i]` strings with `/projects/<id>/thumb.jpg`.                                                                                                                                                            |
| Change tab grouping       | Update the part before `/` in `category` (the part after is shown as a Badge). Top-level options in use today: `Web`, `SaaS`, `Mobile`,`Full-stack`.                                                                                                                                          |

## Image strategy — three options per project

Both `thumbnail` and `images` are **optional** and accept any combination of:

| Source             | Example                                   | When to use                                                                                                                                                   |
| ------------------ | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Remote URL         | `"https://images.unsplash.com/photo-..."` | Hosted screenshots, CDN, Sanity, etc. Domain must be allowed in `next.config.ts` (`picsum.photos`, `cdn.sanity.io`, `images.unsplash.com` are allowed today). |
| Local public path  | `"/projects/callnest/hero.png"`           | Real screenshots committed to `public/projects/<id>/`. Best quality, fastest load.                                                                            |
| _(omit the field)_ | —                                         | Falls back to `https://picsum.photos/seed/<id>-<n>/1200/800` automatically.                                                                                   |

### Mixing remote + local

```ts
{
  id: "fixtools",
  thumbnail: "/projects/fixtools/hero.png",          // local
  images: [
    "/projects/fixtools/desktop.png",                // local
    "https://images.unsplash.com/photo-...?w=1200",  // remote
  ],
}
```

### Forcing the placeholder (debug/preview)

```ts
{ id: "...", forcePlaceholder: true }
```

Picsum seeds are derived from `id + index`, so the same project always gets the same placeholder image (deterministic). The resolver helpers are exported from `src/data/projects.ts`:

```ts
import { getProjectThumbnail, getProjectImages } from "@/data/projects";

getProjectThumbnail(project); // returns string
getProjectImages(project, 3); // returns string[]; fallbackCount = 3
```

These already wire into `/projects`, `/projects/[slug]`, and `<FeaturedProjects />`.

---

## Missing-info checklist (per project)

> Status legend: 🟢 Complete · 🟡 Partial · 🔴 Stub

### 🟢 callnest — callNest (Android app + callnest.pooniya.com marketing site)

> Merged: Android app (`a_APP/4. callVault/`) + marketing site (`a_web/callNest-web/`) under one entry. Single `id: callnest`.

- [ ] Real APK download link confirmation (`liveUrl: https://callnest.pooniya.com`)
- [ ] On-device app screenshots into `public/projects/callnest/`
- [ ] Marketing page screenshots into `public/projects/callnest/`
- [ ] Live metrics (active users, leads tracked) for the `metrics` field

### 🟡 j-hunter — j_Hunter

- [ ] Self-hosted demo URL (or `null` if always private)
- [ ] **Dashboard screenshots** (`/jobs`, `/contacts`, `/outreach`, `/pipeline`) — none captured yet
- [ ] Outcome / metric (e.g. "X jobs scored / Y emails sent")

### 🟡 invoiceforge — InvoiceForge

- [ ] **Live URL** (deployed but URL TBD)
- [ ] Real screenshots into `public/projects/invoiceforge/` (8+ already exist in source `Invoice generator/data/`)

### 🔴 ai-banner — AI Banner / PosterBanao

- [ ] **Live URL** (pre-launch)
- [ ] Editor + gallery screenshots — none captured yet
- [ ] Launch outcome / first metrics

### 🟡 fixtools — FixTools

- [ ] **Live URL** (deployed on Vercel — confirm)
- [ ] Real screenshots into `public/projects/fixtools/` (13+ already exist in source `ImagePdf-master/`)

### 🟡 ddws-safari — DDWS

- [ ] **Live URL** (client-owned)
- [ ] Real wildlife / hero gallery into `public/projects/ddws-safari/`

### 🟡 tdp — Thar Desert Photography (3 variants)

> Merged: v3 Next.js + Sanity rebuild, v2 full-stack attempt, v1 static HTML/CSS — all under one `id: tdp` with `variants[]`.

- [ ] Confirm `https://thardesertphotography.com` is live and currently serving v1
- [ ] Push v3 (`c_sharvan_ji/TDP/thar-desert-photography/`) to GitHub — no remote yet
- [ ] Live URL for v3 once deployed
- [ ] Real desert / wildlife / hero photos into `public/projects/tdp/`
- [ ] v2 admin CMS screenshots

### 🟡 dnp — Desert National Park (2 variants)

> Merged: v2 Next.js rebuild + v1 static HTML/CSS — under one `id: dnp` with `variants[]`.

- [ ] **Live URL** for both variants
- [ ] Real DNP gallery into `public/projects/dnp/`

### 🟡 portfolio-2026 — This Portfolio

- [ ] **Live URL** when deployed
- [ ] Hero / about / projects screenshots once UI is final

### 🟡 tech-web — My-Website (MERN)

- [ ] **Live URL** (or mark archived)
- [ ] Admin panel screenshots
- [ ] Decide whether to keep listed (status: superseded by portfolio-2026)

### 🔴 abhijeet-portfolio — Abhijeet Portfolio

- [ ] **Live URL**
- [ ] Real photo gallery (10+ photos exist in source `b__old/portfolo/public/images/`)

### 🟡 sanjivani-ngo — Sanjivani NGO

- [ ] **Live URL** (in dev)
- [ ] Donation flow screenshots
- [ ] Donation totals / event metrics

### 🟢 food-delivery-app — Food Delivery (Expo)

- [ ] Demo video / screen recording (learning project)

### 🔴 todo-master-ai — TodoMaster AI

- [ ] **Live URL** (deployed but URL TBD)
- [ ] **Screenshots** — none committed yet

### 🟢 calc-master — CalcMaster

- [ ] Play Store URL once published
- [ ] On-device screenshots into `public/projects/calc-master/`

### 🟢 bmi-calculator — BMI Calculator

- [ ] Play Store URL once published
- [ ] On-device screenshots

### 🟢 unit-converter — Unit Converter

- [ ] Play Store URL once published
- [ ] On-device screenshots

### 🔴 techbuilder — techBuilder

- [ ] **GitHub remote** — local monorepo, not pushed yet
- [ ] **Live URL** (architecture phase, no UI)
- [ ] First UI screenshots once web/mobile apps are built

---

## Quick reference: top-level category buckets

The `/projects` page tab filter splits `category` on `/` and uses the first segment.

| Top-level      | Projects                                                                                                  |
| -------------- | --------------------------------------------------------------------------------------------------------- |
| **Web**        | fixtools, ddws-safari, tdp (variants), dnp (variants), portfolio-2026, abhijeet-portfolio, todo-master-ai |
| **SaaS**       | invoiceforge, ai-banner, techbuilder                                                                      |
| **Mobile**     | food-delivery-app, calc-master, bmi-calculator, unit-converter                                            |
| **Android**    | callnest (Android app + marketing site combined)                                                          |
| **Full-stack** | j-hunter, tech-web, sanjivani-ngo                                                                         |

If you want a different grouping, just edit the `category` field in `projects.ts`.

---

## Optional fields available (use them per project)

```ts
role?: string;
duration?: string;
problem?: string;
solution?: string;
outcome?: string;
learnings?: string[];
metrics?: { label: string; value: string }[];
tags?: string[];
docs?: { label: string; path: string }[];
videoUrl?: string;
caseStudyUrl?: string;
sourcePath?: string;
```

The detail page (`/projects/[slug]`) only renders sections for fields that are present, so you can add them gradually.
