# How to Add a New Project to This Portfolio

> Single source of truth for every project shown on `/projects` and on
> the home page is `src/data/projects.ts`. Add one entry there + drop
> images in `public/projects/<id>/` and you're done.
>
> This guide walks through the exact steps, every field, and the
> common pitfalls. Read once; copy-paste forever.

---

## TL;DR — minimum viable new project

1. Pick a slug (kebab-case, must be globally unique): e.g. `aurora-erp`.
2. Append a new object to the `projects` array in
   `src/data/projects.ts` using the **template in §3** below.
3. `mkdir public/projects/<your-slug>` and drop `hero.png` + a few
   gallery shots in it.
4. `npm run dev` → open `http://localhost:3000/projects/<your-slug>` →
   confirm it renders.
5. `git add` + commit + push.

That's it. Everything below is just the "why" and the optional fields.

---

## §1. Where things live

```
src/data/projects.ts            ← THE only data source for projects
public/projects/<slug>/         ← images for that project
public/projects/README.md       ← image-folder convention
PROJECT_PENDING_WORK.md         ← which projects still need images
src/app/projects/page.tsx       ← the /projects list page (no edit needed)
src/app/projects/[slug]/page.tsx ← the /projects/<slug> detail page (no edit needed)
```

You do **not** edit any of the page TSX files when adding a project.
The pages read from `projects.ts` and statically render every slug
automatically (`generateStaticParams`).

---

## §2. Pick a good slug

The slug becomes:

- the project's `id` in `projects.ts`
- the folder name in `public/projects/`
- the URL: `/projects/<slug>`
- the seed for picsum fallback images

**Rules:**

- Lowercase, kebab-case (`my-shiny-app`, not `MyShinyApp`).
- No spaces, no underscores, no special characters.
- Globally unique across `projects.ts`. (Search for `id: "..."` to
  check.)
- Short and memorable. `j-hunter` not `job-hunter-2026-final-final`.
- It will be visible in the URL — make it brandable.

---

## §3. The minimal template

Copy this and paste it inside the `projects: Project[] = [ ... ]`
array in `src/data/projects.ts` (the array literal that opens around
line 150 — paste **before** the closing `];`). Then fill in every
`__TODO__` placeholder.

```ts
  {
    id: "__SLUG__",
    title: "__Project Title — short sub-line__",
    shortDescription:
      "One sentence (~120 chars) — shows on the /projects list card.",
    longDescription:
      "Two-to-five sentences. Shown on the project detail page banner area. Be specific: what the product does, who it's for, what's interesting about the tech.",
    thumbnail: thumb("__SLUG__"),       // picsum until real hero.png exists
    images: gallery("__SLUG__", 4),     // picsum gallery; pick the real count
    techStack: [
      "Next.js 16",
      "TypeScript",
      "Tailwind",
      // …add everything notable; keep order roughly: framework, lang, ui, data, infra
    ],
    category: "Web / SaaS",             // see §4 for valid top-level categories
    featured: false,                    // set true to show in homepage Featured strip
    liveUrl: "https://example.com",     // use "#" if not yet live
    githubUrl: "https://github.com/mahendra2811/repo-name",  // or "#" if private
    status: "In Development",           // "Live" or "In Development"
    year: "2026",
    highlights: [
      "Three to seven bullets — what makes this project notable",
      "Each bullet ≤ 80 chars; punchy not paragraph",
    ],
    role: "Solo Developer (Self)",      // or "Lead Developer + Architect", etc.
    duration: "2026-04 to present",     // or "2025-09 → 2026-01"
    tags: ["nextjs", "saas", "indic"],  // free-form, lowercase, used for filtering later
    sourcePath: "path/inside/p_projet/",  // optional, where the repo lives locally
  },
```

That covers the **required** fields. Every optional field is
documented in §6 below.

---

## §4. Categories (`category` field)

The `category` value is split on `" / "`:

- The **part before `/`** becomes the filter tab on `/projects`
  (`Web`, `Mobile`, `SaaS`, `Full-stack`, `Android`).
- The **part after `/`** is the sub-tag (`Tourism`, `Productivity`,
  `Finance`, `Utility`, …) — free-form, just for nuance.

**Keep the top-level part to this fixed list** so the tabs stay clean:

| Top-level | Use it for |
|---|---|
| `Web` | Plain web products (Next.js, React, static sites) |
| `SaaS` | Multi-tenant or subscription web products |
| `Full-stack` | Has both client + server you built |
| `Mobile` | Cross-platform (React Native / Expo) apps |
| `Android` | Native Android (Kotlin / Compose) apps |

Inventing a new top-level is OK but make sure you actually want a new
filter tab — most things fit one of the five above.

---

## §5. Image setup (do this before opening the URL)

```bash
# 1. Create the folder (name must match the id EXACTLY)
mkdir public/projects/__SLUG__

# 2. Drop your screenshots in there. Naming convention:
#    hero.png            — banner / thumbnail (1200 × 800, 3:2)
#    01-<topic>.png      — gallery image 1
#    02-<topic>.png      — gallery image 2
#    ...
#    e.g. 01-home.png, 02-dashboard.png, 03-mobile.png

# 3. Compress before committing (anything > 500 KB hurts performance)
#    Either use squoosh.app (drag-and-drop) or:
#    cwebp -q 80 input.png -o output.webp
```

While you don't have real screenshots yet, **leave the helper calls**
in `thumbnail` and `images` — `thumb("__SLUG__")` and
`gallery("__SLUG__", N)` produce stable picsum placeholders seeded by
your slug, so the page works.

Once your screenshots are in `public/projects/<slug>/`, **replace the
helper lines** in `projects.ts` with explicit paths:

```ts
thumbnail: "/projects/__SLUG__/hero.png",
images: [
  "/projects/__SLUG__/01-home.png",
  "/projects/__SLUG__/02-dashboard.png",
  "/projects/__SLUG__/03-mobile.png",
],
```

**Don't include `public` in the URL** — paths are `/public`-relative.
Full reference: `public/projects/README.md`.

---

## §6. Every field, explained

### Required

| Field | Type | Notes |
|---|---|---|
| `id` | `string` | Slug. See §2. |
| `title` | `string` | Headline. Sub-line after em-dash is encouraged. |
| `shortDescription` | `string` | One sentence (~120 chars). Card/list. |
| `longDescription` | `string` | 2–5 sentences. Detail page banner. |
| `techStack` | `string[]` | All notable libraries/frameworks. |
| `category` | `string` | `"TopLevel / Detail"`. See §4. |
| `featured` | `boolean` | `true` → homepage Featured strip. |
| `liveUrl` | `string` | Use `"#"` if not live yet. |
| `githubUrl` | `string` | Use `"#"` if private. |
| `status` | `"Live" \| "In Development"` | Drives sort order + badge. |
| `year` | `string` | `"2026"` or `"2025"` etc. |
| `highlights` | `string[]` | 3–7 bullet points. Each ≤ 80 chars. |

### Optional (use when relevant)

| Field | Type | What it does |
|---|---|---|
| `thumbnail` | `string` | Override the picsum fallback. Path or URL. |
| `images` | `string[]` | Gallery. Paths or URLs. |
| `priority` | `number` | Force sort order. `1` is first. Use sparingly. |
| `role` | `string` | "Solo Developer", "Lead", "Architect", etc. |
| `duration` | `string` | "2026-04 to present" or "2025-09 → 2026-01". |
| `problem` | `string` | Case study — the user pain. |
| `solution` | `string` | Case study — how you solved it. |
| `outcome` | `string` | Case study — measured result. |
| `learnings` | `string[]` | Case study — what you took away. |
| `metrics` | `{ label, value }[]` | KPIs ("50k DAU", "<2s cold start"). |
| `tags` | `string[]` | Lowercase tags. Search/filter later. |
| `docs` | `{ label, path }[]` | Links to local PDFs / docx / READMEs. |
| `liveDownload` | `string` | Direct APK / app-store URL. |
| `sourcePath` | `string` | Where the repo lives locally (for your reference). |
| `variants` | `ProjectVariant[]` | Multiple iterations (v1 static, v2 Next.js). Renders side-by-side. |
| `forcePlaceholder` | `boolean` | Force picsum even when `thumbnail` is set. Useful while testing. |

### `ProjectVariant` shape (only if you use `variants`)

```ts
variants: [
  {
    label: "v1 — Static HTML/CSS",
    description: "Original launch site.",
    status: "Live",
    year: "2024",
    techStack: ["HTML", "CSS", "jQuery"],
    githubUrl: "https://github.com/...",
    liveUrl: "https://...",
    highlights: ["Live in prod since 2024", "Hand-rolled SEO"],
  },
  {
    label: "v2 — Next.js + Sanity",
    // ...same shape
  },
],
```

`variants` is for the rare case where one product has had multiple
distinct rebuilds. See `tdp` (Thar Desert Photography) for an
in-repo example.

---

## §7. `priority` and sort order — when to use it

`getProjectsSorted()` (in `projects.ts`) sorts the array like this:

1. Entries **with** `priority` — ascending (`1` first).
2. Entries **without** `priority` AND `status: "Live"`.
3. Entries **without** `priority` AND `status: "In Development"`.
4. Everything else.

**Use `priority` sparingly.** Only set it when you specifically want
to override the natural Live → In Development ordering. Setting
`priority: 1` on a project pins it to the top of every list, so
reserve it for your headline project.

Current pinned project: `callnest` (`priority: 1`).

---

## §8. Quick checklist when adding a new project

```
[ ] Picked a unique kebab-case slug
[ ] Added a new object inside `projects: Project[] = [ ... ]`
[ ] Filled every required field (no __TODO__ placeholders left)
[ ] Picked a category whose top-level matches one of the 5 in §4
[ ] Set `featured: true` only if it should be on the homepage strip
[ ] Set `status` honestly (don't claim Live before it's actually live)
[ ] Created `public/projects/<slug>/` directory
[ ] Dropped real `hero.png` + gallery images (or left picsum helpers
    in place if you don't have screenshots yet — see PROJECT_PENDING_WORK.md)
[ ] Compressed any image > 500 KB
[ ] Ran `npm run dev` and opened `/projects/<slug>` to confirm
[ ] Ran `npm run build` to confirm the static route generates cleanly
[ ] Committed: src/data/projects.ts + public/projects/<slug>/
[ ] Pushed
```

---

## §9. Common pitfalls

1. **Duplicate slug.** Two entries with the same `id` will silently
   break sorting. Always `grep '^  id:' src/data/projects.ts | sort
   -u` to confirm uniqueness.

2. **Forgot to update `category`.** If you put `category: "Mobile /
   X"` but no other project uses `Mobile`, you'll create a new filter
   tab. Verify the top-level part matches an existing tab (§4).

3. **Trailing comma missing.** TypeScript object literals tolerate
   trailing commas — but **missing** a comma between two object
   entries throws a parse error. The end of every entry should look
   like `},` (closing brace + comma).

4. **Forgot to set `featured`.** Leaving it off makes TypeScript
   complain (it's a required field). Default to `false`.

5. **`liveUrl` / `githubUrl` left blank.** TypeScript requires them.
   Use `"#"` if there's no URL yet.

6. **Image path includes `/public/`.** Wrong. Paths are
   `/projects/<slug>/...`, not `/public/projects/<slug>/...`. The
   `/public` prefix is implicit.

7. **Image dimensions way off.** Tiny images get upscaled and look
   blurry; huge images tank Lighthouse. Stick to **1200 × 800** for
   landscape and **1080 × 1920** for mobile screenshots.

8. **Markdown in `longDescription`.** It's plain text — no markdown
   parsing. Use sentences and punctuation, not `**bold**`.

9. **`status: "Live"` when it isn't.** Don't lie to the sort. Use
   `"In Development"` until there's a working public URL.

10. **Forgot to update `PROJECT_PENDING_WORK.md`.** When you add a
    new project, also append it to the tier table in
    `PROJECT_PENDING_WORK.md` so the image-wiring backlog stays
    accurate.

---

## §10. Worked example — full entry from a real project

Here's the in-repo `bmi-calculator` entry, annotated:

```ts
{
  id: "bmi-calculator",                          // slug (§2)
  title: "BMI Calculator",                        // headline
  shortDescription:
    "Expo BMI calculator with charts, share & history.",  // one-line
  longDescription:
    "React Native BMI calculator with react-native-chart-kit history charts, react-native-svg, expo-linear-gradient theming, expo-sharing for results, expo-symbols icons, view-shot for sharable BMI cards.",
  thumbnail: thumb("bmi-calculator"),             // picsum until real hero
  images: gallery("bmi-calculator", 3),           // picsum × 3
  techStack: [
    "Expo SDK", "Expo Router", "React Native",
    "NativeWind", "AsyncStorage",
    "expo-linear-gradient", "expo-haptics",
    "expo-sharing", "expo-symbols",
    "react-native-chart-kit", "react-native-svg",
    "react-native-view-shot", "react-native-reanimated",
    "date-fns",
  ],
  category: "Mobile / Utility",                   // §4: top-level "Mobile"
  featured: false,                                // not on homepage strip
  liveUrl: "#",                                   // not on Play Store yet
  githubUrl: "https://github.com/mahendra2811/app-bmi-calculator",
  status: "Live",
  year: "2026",
  highlights: [
    "History chart (chart-kit)",
    "Share BMI card image (view-shot)",
    "Linear-gradient themed UI",
    "Localized symbols",
  ],
  role: "Solo Developer (Self)",
  duration: "2026-03",
  tags: ["expo", "react-native", "health", "bmi"],
  sourcePath: "a_APP/2. BMI calculator /bmi-calculator/",
},
```

That's the shape of a clean, minimal entry. Anything more elaborate
(case-study fields, variants, metrics) is opt-in.

---

## §11. After committing

Once the change is merged on `master`:

1. Vercel auto-deploys (~60–90 sec).
2. Open `https://pooniya.com/projects/<slug>` — confirm it's live.
3. If the project also needs a privacy policy (any app that ships to
   users), add a matching page under `src/app/privacy/<slug>/` —
   follow the pattern already established for `pdfnest`, `moneynest`,
   `callnest`, etc.
4. If the project is going on the Play Store, link the
   `pooniya.com/privacy/<slug>` URL in Play Console → App content →
   Privacy policy.

---

## §12. Things that **don't** need changes when you add a project

You should NOT have to touch any of these:

- `src/app/projects/page.tsx` — reads from `projects.ts` automatically
- `src/app/projects/[slug]/page.tsx` — generates static params from `projects.ts`
- `src/app/page.tsx` (homepage) — pulls Featured + Live from `projects.ts`
- `next-sitemap.config.js` — picks up new routes after the next build
- `next.config.ts` — only needed if you start hosting images on a new external CDN

If you find yourself editing any of those, stop and figure out
whether you're solving the wrong problem. The data file is the
seam — everything else flows from it.
