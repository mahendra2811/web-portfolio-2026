/**
 * Single source of truth for all portfolio projects.
 *
 * To edit: open this file and update the matching project entry.
 * To add: append a new object to the `projects` array below.
 * To remove: delete the matching object.
 *
 * Category convention: `"TopLevel / Detail"` — the filter tabs on
 * `/projects` use the part before " / " (Web, SaaS, Mobile, Android,
 * Full-stack). Keep the top-level segment from that fixed list so the
 * tab grouping stays clean.
 *
 * Images: `thumbnail` and `images` are OPTIONAL. Each entry accepts
 *   - remote URLs (https://...) — domain must be in next.config.ts remotePatterns
 *   - local paths from /public (e.g. "/projects/callnest/hero.png")
 *   - mix of both
 * If a project has no `thumbnail` or empty `images`, the resolver
 * functions below fall back to https://picsum.photos/seed/<id>/<w>/<h>.
 * To swap placeholders for real screenshots: drop files in
 * public/projects/<id>/ and either add `thumbnail: "/projects/<id>/hero.png"`
 * to the project entry, or add `images: ["/projects/<id>/1.png", ...]`.
 *
 * Source-of-truth for full project intelligence:
 *   /home/primathon/Documents/p_projet/PROJECTS.md
 */

export type ProjectStatus = "Live" | "In Development";

export interface ProjectDocLink {
  label: string;
  /** Local file path or full URL (URLs become clickable). */
  path: string;
}

/**
 * A single iteration of a project. Use this when one project has multiple
 * versions in different stacks (e.g. v1 static HTML, v2 Next.js rebuild).
 * The detail page renders all variants as side-by-side cards under a
 * "Versions" section.
 */
export interface ProjectVariant {
  /** Short label, e.g. "v1 — Static HTML/CSS" or "v2 — Next.js". */
  label: string;
  /** One-line variant description. */
  description?: string;
  status?: ProjectStatus;
  year?: string;
  techStack?: string[];
  githubUrl?: string;
  liveUrl?: string;
  highlights?: string[];
}

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  /** Optional. Remote URL OR `/public`-relative path. Falls back to picsum. */
  thumbnail?: string;
  /** Optional. Mix of remote URLs and `/public`-relative paths. Falls back to picsum. */
  images?: string[];
  techStack: string[];
  category: string;
  featured: boolean;
  liveUrl: string;
  githubUrl: string;
  status: ProjectStatus;
  year: string;
  highlights: string[];

  // Case-study enrichment (all optional)
  role?: string;
  duration?: string;
  problem?: string;
  solution?: string;
  outcome?: string;
  learnings?: string[];
  metrics?: { label: string; value: string }[];

  // Discovery
  tags?: string[];

  // Extra links / docs (rendered as a list on the detail page)
  docs?: ProjectDocLink[];
  videoUrl?: string;
  caseStudyUrl?: string;

  /** Multiple versions of the same project (v1 static, v2 framework rebuild, …). */
  variants?: ProjectVariant[];

  // Source path on local disk (for editor-side reference only)
  sourcePath?: string;

  /** When true, force a picsum fallback even if `images`/`thumbnail` is set. */
  forcePlaceholder?: boolean;

  /**
   * Lower number = shown earlier. Projects with a priority appear before
   * everything else (regardless of status). Within the priority list,
   * items are sorted ascending — `priority: 1` is first, then `2`, etc.
   * Leave undefined to opt out of priority ordering (the project is then
   * grouped by status: Live → In Development → other).
   *
   * Set priority on the projects you want pinned to the top of /projects
   * and on the home page (top 4 by default, see `getFeaturedProjects`).
   */
  priority?: number;
}

// ---------- Image resolvers ----------

/** Picsum URL for a deterministic placeholder per project. */
const placeholder = (id: string, n = 0, w = 1200, h = 800) =>
  `https://picsum.photos/seed/${id}-${n}/${w}/${h}`;

/** Returns the project's thumbnail, or a picsum fallback if missing. */
export function getProjectThumbnail(project: Project, width = 1200, height = 800): string {
  if (!project.forcePlaceholder && project.thumbnail && project.thumbnail.trim().length > 0) {
    return project.thumbnail;
  }
  return placeholder(project.id, 0, width, height);
}

/**
 * Returns the project's gallery images, or a picsum fallback list if missing.
 * `fallbackCount` controls how many placeholder images are generated when
 * the project has no `images` defined.
 */
export function getProjectImages(
  project: Project,
  fallbackCount = 3,
  width = 1200,
  height = 800,
): string[] {
  if (!project.forcePlaceholder && project.images && project.images.length > 0) {
    return project.images;
  }
  return Array.from({ length: fallbackCount }, (_, i) =>
    placeholder(project.id, i + 1, width, height),
  );
}

// Internal helpers used by data entries below — kept for backward compat.
const seed = (id: string, n = 0) => `${id}-${n}`;
const thumb = (id: string) => `https://picsum.photos/seed/${seed(id, 0)}/1200/800`;
const gallery = (id: string, count: number) =>
  Array.from({ length: count }, (_, i) => `https://picsum.photos/seed/${seed(id, i + 1)}/1200/800`);

export const projects: Project[] = [
  {
    // Combined: Android product + its marketing/distribution site (callnest.pooniya.com).
    // The Android app is the product; the marketing site is the platform that
    // hosts the APK, changelog, FAQ, and download flow. Treated as one project.
    id: "callnest",
    priority: 1,
    title: "callNest — Call-log Lead Pipeline (App + web)",
    shortDescription:
      "Local-first Android app that turns inquiry calls into a structured lead pipeline. Distributed via the static callnest marketing site.",
    longDescription:
      "Full callNest stack — the product is an Android app for Indian SMBs that captures every inquiry call from CallLog.Calls and turns it into a tagged, scored, follow-up-ready lead with Excel/CSV/PDF export, a floating in-call bubble, and a post-call popup. Distributed outside Play Store via the static Next.js 15 marketing site at callnest.pooniya.com, which hosts the signed APK, changelog, FAQ, permissions explainer, privacy/terms, and download CTAs. The two repos are linked through a release pipeline (`npm run sync-release`) that auto-patches versions-stable.json + releases.ts + sha256. App: 13 sprints shipped, 245+ Kotlin files. Site: 12 routes, Cloudflare Pages auto-deploy on push to main.",
    techStack: [
      // App
      "Kotlin 2.0.21",
      "Android 8.0+ (API 26+)",
      "Jetpack Compose",
      "Material 3",
      "Hilt",
      "Room 2.6.1 + FTS",
      "WorkManager",
      "DataStore",
      "kotlinx-coroutines",
      "libphonenumber",
      "Apache POI",
      "iText",
      "Coil",
      "Vico charts",
      "Tink",
      "Supabase Auth",
      "PostHog",
      "FCM",
      "Timber",
      // Marketing site
      "Next.js 15 (static export)",
      "TypeScript",
      "Tailwind v3",
      "Framer Motion",
      "lucide-react",
      "Cloudflare Pages",
    ],
    category: "Mobile / Learning",
    featured: false,
    liveUrl: "https://callnest.pooniya.com",
    githubUrl: "https://github.com/mahendra2811/app_callVault",
    status: "Live",
    year: "2026",
    highlights: [
      // App
      "Local-first: SQLite (Room) + zero telemetry by default",
      "Floating in-call bubble + post-call popup",
      "0–100 lead-scoring algorithm",
      "Excel / CSV / PDF export",
      "13 sprints, 245+ Kotlin files, 15 in-app docs articles",
      "Self-update via hosted versions.json (no Play Store)",
      "Sideloadable APK signed in-house",
      // Marketing-site (the platform that ships the app)
      "callnest.pooniya.com static site: 12 routes (/changelog, /faq, /permissions, /privacy, /terms, etc.)",
      "APK release pipeline (npm run sync-release) auto-patches version metadata + sha256",
      "Cloudflare Pages auto-deploy on push to main; prefers-reduced-motion respected throughout",
    ],
    role: "Solo Developer (Product + Architecture + Code, both repos)",
    duration: "2026-Q1 → ongoing",
    problem:
      "Indian SMBs lose leads because every inquiry call vanishes after the device-native call log rolls over. Existing CRMs are too heavy and require manual data entry. And sideloaded apps need a trusted download page + signed-APK distribution outside Play Store.",
    solution:
      "Android app: background sync of CallLog.Calls → enriched lead records → tag/note/follow-up workflow → exports. Marketing site: static Next.js page with deterministic release sync from the Android repo, hosting the signed APK download.",
    outcome:
      "Production v1.0.0 build flow working; APK distributed via the callnest.pooniya.com release pipeline.",
    learnings: [
      "Compose state-flow patterns at scale",
      "OEM battery-restriction quirks",
      "libphonenumber caveats for Indian numbers",
      "Static export + cross-repo automated release sync",
    ],
    tags: [
      "android",
      "kotlin",
      "compose",
      "lead-management",
      "local-first",
      "india-msme",
      "nextjs",
      "static-export",
      "apk-distribution",
      "marketing-site",
    ],
    docs: [
      // Android app (the product)
      { label: "App README", path: "a_APP/4. callVault/README.md" },
      { label: "App product spec / Claude memory", path: "a_APP/4. callVault/CLAUDE.md" },
      { label: "App decisions log", path: "a_APP/4. callVault/DECISIONS.md" },
      { label: "App release plan", path: "a_APP/4. callVault/RELEASE-PLAN.md" },
      { label: "App changelog", path: "a_APP/4. callVault/CHANGELOG.md" },
      { label: "App mega-prompt source", path: "a_APP/callvault_mega_prompt.md" },
      { label: "App GitHub repo", path: "https://github.com/mahendra2811/app_callVault" },
      // Marketing platform (callnest.pooniya.com)
      { label: "Marketing site (live)", path: "https://callnest.pooniya.com" },
      {
        label: "Marketing site GitHub repo",
        path: "https://github.com/mahendra2811/web_callNest_marketing",
      },
      { label: "Marketing site README", path: "a_web/callNest-web/README.md" },
      { label: "Marketing site Claude memory", path: "a_web/callNest-web/CLAUDE.md" },
    ],
    sourcePath: "a_APP/4. callVault/  +  a_web/callNest-web/",
  },

  {
    id: "j-hunter",
    priority: 4,
    title: "job Hunter — Self-Hosted Job Agent",
    shortDescription:
      "Self-hosted personal job-hunting agent. Scrapes 11 sources, scores with Claude, runs cold-email outreach.",
    longDescription:
      "One-user, one-box automation. FastAPI backend + Celery workers scrape 11 sources (RemoteOK, LinkedIn, Naukri, Wellfound, Twitter, Greenhouse/Lever/Ashby ATS, etc.), Claude analyses + scores each posting, Hunter.io discovers recruiter emails, Gmail SMTP sends outreach, IMAP watches replies — all surfaced through a Next.js 14 dashboard with live SSE updates. Playwright-stealth + per-platform BrowserContexts. 49 pytest tests, Postgres 16 + Redis 7, Alembic migrations.",
    thumbnail: thumb("j-hunter"),
    images: gallery("job hunter", 4),
    techStack: [
      "FastAPI",
      "async SQLAlchemy 2",
      "Pydantic v2",
      "Celery 5",
      "PostgreSQL 16",
      "Redis 7",
      "Playwright + stealth",
      "Anthropic Claude API",
      "Hunter.io",
      "Gmail SMTP/IMAP",
      "SerpAPI",
      "Next.js 14",
      "TypeScript",
      "Tailwind",
      "shadcn/ui",
      "TanStack Query/Table",
      "@dnd-kit",
      "Recharts",
      "SSE",
      "Alembic",
      "docker-compose",
    ],
    category: "Full-stack / AI Automation",
    featured: true,
    liveUrl: "#",
    githubUrl: "https://github.com/mahendra2811/j_hunter",
    status: "In Development",
    year: "2026",
    highlights: [
      "11 scrapers (4 API + 4 ATS + 4 Playwright) with dry_run for CI",
      "Single Chromium with isolated BrowserContext per platform",
      "SSE live feed (/api/stream) — real-time dashboard updates",
      "Claude JSON-mode with parse-or-retry strategy",
      "7-service docker stack: backend / worker / beat / flower / postgres / redis / frontend",
      "49 pytest tests, auto-skip when DB unreachable",
    ],
    role: "Solo Developer",
    duration: "4-prompt build, ongoing since 2026-04",
    problem: "Job hunt is 80% repetitive scraping/cold-email work that LLMs can do.",
    solution: "Pipeline that produces ranked jobs + drafted outreach + reply detection in one box.",
    tags: ["fastapi", "celery", "playwright", "anthropic", "nextjs", "automation", "self-hosted"],
    docs: [
      { label: "Quick start README", path: "J_hunter/jobhunter/README.md" },
      { label: "Architecture deep-dive", path: "J_hunter/jobhunter/PROJECT_BRIEF.md" },
      { label: "Run/build guide", path: "J_hunter/jobhunter/RUN_AND_BUILD_GUIDE.md" },
      { label: "Claude memory", path: "J_hunter/jobhunter/CLAUDE.md" },
      { label: "Setup guides", path: "J_hunter/jobhunter/docs/" },
    ],
    sourcePath: "J_hunter/jobhunter/",
  },

  {
    id: "invoiceforge",
    priority: 2,
    title: "InvoiceForge — GST Invoice PWA",
    shortDescription:
      "Offline-first GST invoice generator for Indian businesses. PWA, multi-language.",
    longDescription:
      "Next.js 15 PWA invoice generator. Offline-first with Dexie (IndexedDB) primary + Supabase cloud sync secondary — every operation works offline and syncs when connected. Bulk-importable estimates → invoices, UPI QR generation, PDF export via @react-pdf/renderer, signature canvas, multi-language via next-intl, Sentry crash monitoring, PostHog analytics.",
    thumbnail: thumb("invoiceforge"),
    images: gallery("invoiceforge", 6),
    techStack: [
      "Next.js 15",
      "React 19",
      "TypeScript 5.7",
      "Tailwind v4",
      "Zustand",
      "Dexie (IndexedDB)",
      "Supabase",
      "@react-pdf/renderer",
      "next-intl v4",
      "next-pwa",
      "TanStack Query",
      "react-hook-form + zod",
      "@dnd-kit",
      "shadcn/ui",
      "html2canvas",
      "jspdf",
      "qrcode + upiqrcode",
      "react-signature-canvas",
      "Recharts",
      "@vercel/og",
      "Sentry",
      "PostHog",
      "Three.js + R3F",
    ],
    category: "SaaS / PWA",
    featured: true,
    liveUrl: "#",
    githubUrl: "https://github.com/mahendra2811/InvoiceGenerator",
    status: "In Development",
    year: "2026",
    highlights: [
      "True offline-first: works fully without network, syncs when online",
      "GST-compliant invoice templates",
      "UPI QR + barcode + signature support",
      "i18n: English / Hindi (next-intl v4)",
      "PWA installable on mobile",
      "3D animated marketing scenes (R3F)",
    ],
    role: "Solo Developer",
    duration: "2026-04 → ongoing",
    problem:
      "Indian SMBs need GST invoices but desktop apps are heavy + cloud-only SaaS fails offline.",
    solution: "Local-first PWA with optional cloud backup; full GST + UPI support.",
    tags: ["nextjs", "pwa", "offline-first", "supabase", "indexeddb", "gst", "india-msme", "i18n"],
    docs: [
      { label: "Quick start", path: "Invoice generator/QUICK_START.md" },
      { label: "Claude memory", path: "Invoice generator/CLAUDE.md" },
      { label: "Seed data guide", path: "Invoice generator/SEED_DATA_README.md" },
      { label: "Supabase DB plan", path: "Invoice generator/supabase/db-plan/README.md" },
      { label: "Internal docs", path: "Invoice generator/docs/" },
    ],
    sourcePath: "Invoice generator/",
  },

  {
    id: "ai-banner",
    title: "AI Banner — Event Poster Generator",
    shortDescription:
      "India-first event-based poster generation platform. 30-second posters for festivals, politics, business.",
    longDescription:
      "Web app that lets users (politicians, small business owners, social workers) generate WhatsApp-ready event posters in 30 seconds. Two-part poster system (main event area + branded bottom banner), dual profile mode (Person + Company), religion-based template feed, 30+ universal banners with auto-color-match. Fabric.js client-side rendering, glassmorphism design, Hindi+English from day 1, browse without login, 5 free downloads/day then watermark.",
    thumbnail: thumb("ai-banner"),
    images: gallery("ai-banner", 4),
    techStack: [
      "Next.js 15",
      "TypeScript",
      "Tailwind v4",
      "Fabric.js v6",
      "shadcn/ui",
      "Zustand",
      "TanStack Query",
      "Framer Motion",
      "next-intl",
      "Sonner",
      "react-easy-crop",
      "Supabase",
      "PostHog",
      "Vercel",
    ],
    category: "SaaS / AI",
    featured: true,
    liveUrl: "#",
    githubUrl: "https://github.com/mahendra2811/posterBanao",
    status: "In Development",
    year: "2026",
    highlights: [
      "Two-part poster system (main + 30 universal bottom banners)",
      "Religion-based personalization (6 religions + Universal)",
      "Dual profile mode: Person + Company",
      "Auto color-matching banner from main poster",
      "Real-time Fabric.js canvas preview",
      "5 free downloads/day → watermark gate",
      "Glassmorphism design (Blue + Orange palette)",
      "Built in 3-day Claude-Code autonomous mode",
    ],
    role: "Solo Developer",
    duration: "3-day autonomous build (2026-04)",
    problem:
      "63M+ Indian MSMEs + 3M+ politicians need daily WhatsApp posters; existing apps (Brands.live, Festival Post) are ad-spammy with watermarks.",
    solution:
      "No watermark on basic templates, no ads, browseable without login, religion-aware feed.",
    tags: [
      "nextjs",
      "fabricjs",
      "supabase",
      "i18n",
      "india-market",
      "poster-generator",
      "ai-assembled-templates",
    ],
    docs: [
      { label: "Product blueprint (docx)", path: "PosterBanao/PosterBanao_Product_Blueprint.docx" },
      { label: "Project intelligence", path: "PosterBanao/posterbanao/CLAUDE.md" },
      { label: "AI Banner config", path: "PosterBanao/ai-banner-config/" },
      {
        label: "Component patterns",
        path: "PosterBanao/posterbanao/.claude/rules/component-patterns.md",
      },
    ],
    sourcePath: "PosterBanao/posterbanao/",
  },

  {
    id: "fixtools",
    priority: 3,
    title: "FixTools — Free Online Image & PDF Toolkit",
    shortDescription:
      "Privacy-first browser-based PDF/image utilities. Files never leave the device.",
    longDescription:
      "Free PDF + image toolkit where 100% of processing happens client-side (Canvas API + Web Workers). 12 launch tools: image compress/resize/crop/convert/to-PDF, exam photo resizer (20 Indian exam presets), PDF merge/split/compress/rotate/watermark/reorder. SEO-first architecture: every tool = own page at /tools/[slug], JSON-LD, sitemap auto-generated from registry.",
    thumbnail: thumb("fixtools"),
    images: gallery("fixtools", 6),
    techStack: [
      "Next.js 15",
      "TypeScript strict",
      "Tailwind v4",
      "shadcn/ui",
      "browser-image-compression",
      "react-easy-crop",
      "pdf-lib",
      "pdfjs-dist",
      "jsPDF",
      "JSZip",
      "file-saver",
      "Framer Motion",
      "next-themes",
      "@imgly/background-removal",
      "html2pdf.js",
      "heic2any",
      "exif-js",
      "qrcode + jsbarcode",
      "Vercel Analytics",
      "Web Workers",
    ],
    category: "Web / Utility",
    featured: true,
    liveUrl: "#",
    githubUrl: "https://github.com/mahendra2811/freefixtools",
    status: "Live",
    year: "2026",
    highlights: [
      "Zero server, zero API calls — 100% client-side",
      "12 tools at launch (6 image + 6 PDF)",
      "20 Indian exam-photo presets (UPSC, SSC, IBPS, NEET, JEE, etc.)",
      "SEO-first: per-tool meta, JSON-LD WebApplication schema",
      "Web Workers for any processing >100ms",
      "Dark mode default + light toggle",
    ],
    role: "Solo Developer",
    duration: "2026-04",
    problem:
      "Most online image/PDF tools upload your file to a server. Privacy is compromised and processing is slow.",
    solution: "100% in-browser processing using Canvas + Web Workers + pdf-lib.",
    tags: [
      "nextjs",
      "client-side",
      "privacy",
      "pdf-tools",
      "image-tools",
      "exam-photo",
      "india-students",
      "seo",
    ],
    docs: [
      { label: "Project intelligence", path: "ImagePdf-master/imagepdf-project/CLAUDE.md" },
      { label: "Code style", path: "ImagePdf-master/imagepdf-project/.claude/rules/code-style.md" },
      {
        label: "Component patterns",
        path: "ImagePdf-master/imagepdf-project/.claude/rules/component-patterns.md",
      },
      {
        label: "SEO conventions",
        path: "ImagePdf-master/imagepdf-project/.claude/rules/seo-conventions.md",
      },
    ],
    sourcePath: "ImagePdf-master/imagepdf-project/",
  },

  {
    id: "ddws-safari",
    title: "DDWS — Desert Wildlife Safari",
    shortDescription: "Booking & info site for Desert Wildlife Safari (Sharvan ji client).",
    longDescription:
      "Next.js marketing/booking site for DDWS — wildlife safari business in the Thar desert. Replaced 'Wildlife Sanctuary' branding with 'Wildlife Safari' across the codebase, integrated team member profiles + contact forms.",
    thumbnail: thumb("ddws-safari"),
    images: gallery("ddws-safari", 4),
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind",
      "shadcn/ui",
      "Framer Motion",
      "react-hook-form + zod",
      "axios",
      "lucide-react",
    ],
    category: "Web / Tourism",
    featured: false,
    liveUrl: "#",
    githubUrl: "https://github.com/mahendra2811/ddws_next",
    status: "Live",
    year: "2025",
    highlights: [
      "Brand refactor: Sanctuary → Safari project-wide",
      "Team member profiles",
      "Contact + booking forms with zod validation",
      "Wildlife gallery with optimized images",
    ],
    role: "Freelance Developer (client: Sharvan ji)",
    duration: "2025",
    tags: ["nextjs", "tourism", "freelance", "wildlife"],
    docs: [{ label: "README", path: "c_sharvan_ji/ddws/README.md" }],
    sourcePath: "c_sharvan_ji/ddws/",
  },

  {
    id: "tdp",
    title: "Thar Desert Photography — Premium Tourism Site",
    shortDescription:
      "Premium photography & desert tourism site for thardesertphotography.com. Three iterations: original static site, full-stack admin attempt, and Sanity-CMS Next.js rebuild.",
    longDescription:
      "Long-running freelance project for Sharvan-ji's Thar Desert Photography brand. The original static HTML/CSS site (v1) is currently live in production at thardesertphotography.com. A full-stack v2 was attempted with a Node/Express+MongoDB backend and admin CMS for booking/lead/join-team forms and a planned blog editor. The current build (v3) is a Next.js + Sanity CMS rebuild with Three.js/R3F 3D scenes, GSAP, react-leaflet maps, lightbox gallery, next-intl i18n, Resend email, and Supabase auth. See the Versions section for tech and repos per variant.",
    category: "Web / Tourism",
    featured: false,
    liveUrl: "https://thardesertphotography.com",
    githubUrl: "https://github.com/mahendra2811/Thar_desert_photography",
    status: "In Development",
    year: "2026",
    techStack: [
      // v3 — current rebuild
      "Next.js",
      "TypeScript",
      "Tailwind",
      "Sanity CMS",
      "Three.js + R3F + drei + postprocessing",
      "GSAP",
      "Framer Motion",
      "react-leaflet",
      "next-intl",
      "Supabase",
      "Resend",
      "react-hook-form + zod",
      "Google Maps",
      "yet-another-react-lightbox",
      // v2 — full-stack attempt
      "Express",
      "MongoDB (Mongoose)",
      "Firebase",
      "JWT",
      "bcrypt",
      "Nodemailer",
      "shadcn/ui",
      // v1 — static
      "HTML5",
      "CSS3",
      "Vanilla JS",
      "@vercel/analytics",
    ],
    highlights: [
      "Three-version evolution: static → full-stack admin → Sanity-CMS Next.js",
      "v1 still serving production traffic at thardesertphotography.com",
      "v3 features 3D scenes with GPU detection fallback + lightbox gallery",
      "v3 supports i18n via next-intl and Sanity-driven content",
      "v2 explored admin-managed dynamic redirects + 3 form pipelines",
    ],
    role: "Freelance Developer (client: Sharvan-ji / TDP)",
    duration: "2025 → 2026 (ongoing)",
    tags: [
      "nextjs",
      "sanity",
      "threejs",
      "photography",
      "tourism",
      "i18n",
      "html-css",
      "fullstack",
      "mongodb",
      "freelance",
      "rebuild",
    ],
    variants: [
      {
        label: "v3 — Next.js + Sanity CMS rebuild",
        description: "Current build. 3D scenes, GSAP, Sanity CMS, i18n, lightbox.",
        status: "In Development",
        year: "2026",
        techStack: [
          "Next.js",
          "TypeScript",
          "Tailwind",
          "Sanity CMS",
          "Three.js + R3F",
          "GSAP",
          "Framer Motion",
          "react-leaflet",
          "next-intl",
          "Supabase",
          "Resend",
          "yet-another-react-lightbox",
          "detect-gpu",
        ],
        githubUrl: "#",
        liveUrl: "#",
        highlights: [
          "Sanity CMS-driven content",
          "3D scenes with GPU detection fallback",
          "i18n via next-intl",
          "Leaflet maps for tour destinations",
          "Lightbox photo gallery",
        ],
      },
      {
        label: "v2 — Full-stack (Next.js + Node + MongoDB)",
        description:
          "Mid attempt with admin CMS. Two-repo split (frontend + Express backend), JWT auth, 3 form pipelines, planned blog editor with media embeds.",
        status: "In Development",
        year: "2025",
        techStack: [
          "Next.js",
          "TypeScript",
          "Tailwind",
          "shadcn/ui",
          "MongoDB",
          "Firebase",
          "Express",
          "Mongoose",
          "JWT",
          "bcrypt",
          "Nodemailer",
        ],
        githubUrl: "https://github.com/mahendra2811/tdp_next_js",
        liveUrl: "#",
        highlights: [
          "Admin-managed dynamic redirects (/whatsapp-group → live group link)",
          "3 form pipelines (booking, lead, join-team)",
          "Phase 2 blog editor with rich-text + media embeds (planned)",
          "JWT auth + role-based admin",
        ],
      },
      {
        label: "v1 — Static HTML/CSS",
        description: "Original release. Currently live at thardesertphotography.com.",
        status: "Live",
        year: "2025",
        techStack: ["HTML5", "CSS3", "Vanilla JS", "@vercel/analytics", "@vercel/speed-insights"],
        githubUrl: "https://github.com/mahendra2811/Thar_desert_photography",
        liveUrl: "https://thardesertphotography.com",
        highlights: [
          "Pure static — zero build, zero JS framework",
          "Vercel Analytics + Speed Insights integrated",
          "Optimized desert photo gallery",
        ],
      },
    ],
    docs: [
      // v3 — Sanity rebuild
      { label: "v3 source folder", path: "c_sharvan_ji/TDP/thar-desert-photography/" },
      // v2 — full-stack attempt
      { label: "v2 phase plan", path: "b__old/old full stack -tdp/readme.md" },
      { label: "v2 frontend README", path: "b__old/old full stack -tdp/frontend_tdp/README.md" },
      { label: "v2 backend README", path: "b__old/old full stack -tdp/backend_tdp/README.md" },
      { label: "v2 frontend repo", path: "https://github.com/mahendra2811/tdp_next_js" },
      { label: "v2 backend repo", path: "https://github.com/mahendra2811/tdp_backend" },
      // v1 — static
      { label: "v1 GitHub repo", path: "https://github.com/mahendra2811/Thar_desert_photography" },
      { label: "v1 (live)", path: "https://thardesertphotography.com" },
    ],
    sourcePath:
      "c_sharvan_ji/TDP/thar-desert-photography/  +  c_sharvan_ji/TDP/tdp-html-css/  +  b__old/old full stack -tdp/",
  },

  {
    id: "dnp",
    title: "Desert National Park — Safari Site",
    shortDescription:
      "Marketing & booking site for Desert National Park safari, Jaisalmer. Shipped twice — first as static HTML/CSS, then rebuilt on Next.js.",
    longDescription:
      "Freelance project for Radheshyam-ji's DNP safari business in Jaisalmer. The current production site is the Next.js rebuild (multi-page tour + gallery routes, sharp + next/image optimization, react-icons). The original v1 was a pure HTML/CSS/JS static site — the full image library carried over into the Next.js version. See the Versions section for tech and repo per variant.",
    category: "Web / Tourism",
    featured: false,
    liveUrl: "#",
    githubUrl: "https://github.com/mahendra2811/dnp_next",
    status: "Live",
    year: "2025",
    techStack: ["Next.js", "React", "react-icons", "sharp", "HTML5", "CSS3", "Vanilla JS"],
    highlights: [
      "Two-version evolution: pure static → Next.js rebuild",
      "Shared image library reused across both versions",
      "SEO-friendly multi-page structure in the Next.js rebuild",
      "Image optimization via sharp + next/image",
    ],
    role: "Freelance Developer (client: Radheshyam-ji)",
    duration: "2025",
    tags: ["nextjs", "html-css", "tourism", "freelance", "jaisalmer", "rebuild"],
    variants: [
      {
        label: "v2 — Next.js rebuild",
        description: "Current production version. SEO + image optimization.",
        status: "Live",
        year: "2025",
        techStack: ["Next.js", "React", "react-icons", "sharp"],
        githubUrl: "https://github.com/mahendra2811/dnp_next",
        liveUrl: "#",
        highlights: [
          "Next.js multi-page tour + gallery routes",
          "Image optimization via sharp + next/image",
          "react-icons throughout",
        ],
      },
      {
        label: "v1 — Static HTML/CSS",
        description: "Original release. Pure static — zero framework, zero build.",
        status: "Live",
        year: "2025",
        techStack: ["HTML5", "CSS3", "Vanilla JS"],
        githubUrl: "https://github.com/mahendra2811/Desert-national-park",
        liveUrl: "#",
        highlights: [
          "Pure static — zero build pipeline",
          "Custom hero gallery",
          "Full image library carried into v2",
        ],
      },
    ],
    sourcePath:
      "c_Radheshyam/dnp_next/desert-national-park-nextjs/  +  c_Radheshyam/Desert-national-park/",
  },

  {
    id: "portfolio-2026",
    title: "Portfolio Website",
    shortDescription:
      "Personal portfolio with 3D scenes, Sanity CMS-driven projects, and motion-rich UX.",
    longDescription:
      "Next.js portfolio with R3F 3D backgrounds, GSAP + Lenis smooth scrolling, Sanity CMS for projects/blog, Resend contact form, hCaptcha protection, Supabase, Zustand state. Custom shaders + Troika 3D text.",
    thumbnail: thumb("portfolio-2026"),
    images: gallery("portfolio-2026", 4),
    techStack: [
      "Next.js 16",
      "TypeScript",
      "Tailwind",
      "Three.js + R3F + drei + postprocessing",
      "three-custom-shader-material",
      "troika-three-text",
      "GSAP",
      "Lenis",
      "Framer Motion",
      "Sanity CMS",
      "Supabase",
      "Resend",
      "@hcaptcha/react-hcaptcha",
      "Zustand",
      "FontAwesome",
      "next-sitemap",
    ],
    category: "Web / Personal",
    featured: true,
    liveUrl: "#",
    githubUrl: "https://github.com/mahendra2811/web-portfolio-2026",
    status: "In Development",
    year: "2026",
    highlights: [
      "3D hero with custom shader material",
      "Smooth scroll via Lenis + GSAP",
      "Sanity CMS for projects, blog, case studies",
      "hCaptcha-gated contact form (Resend)",
      "i18n-ready (locale folder present)",
      "Sitemap auto-generation",
    ],
    role: "Solo Developer (Self)",
    duration: "2026-04 → ongoing",
    tags: ["nextjs", "threejs", "gsap", "sanity", "portfolio", "shaders"],
    docs: [
      { label: "README", path: "mahendra portfolio new/mahendra-portfolio/README.md" },
      { label: "Docs folder", path: "mahendra portfolio new/docs/README.md" },
    ],
    sourcePath: "mahendra portfolio new/mahendra-portfolio/",
  },

  {
    id: "tech-web",
    title: "My-Website — Tech Site (MERN)",
    shortDescription:
      "Earlier full-stack version of my personal site with admin CMS for projects + services.",
    longDescription:
      "Pre-2026 portfolio. Two-repo split — Next.js frontend (axios, framer-motion, react-hook-form, resend) + Node/Express backend (Mongoose, JWT, bcrypt, multer, winston, helmet, rate-limit, mailer). Admin can CRUD projects + services. Replaced by portfolio-2026 but kept as reference.",
    thumbnail: thumb("tech-web"),
    images: gallery("tech-web", 4),
    techStack: [
      "Next.js",
      "React",
      "Tailwind",
      "axios",
      "react-hook-form + zod",
      "Framer Motion",
      "Resend",
      "date-fns",
      "Express",
      "MongoDB (Mongoose)",
      "JWT",
      "bcryptjs",
      "express-rate-limit",
      "express-validator",
      "helmet",
      "morgan",
      "compression",
      "multer",
      "nodemailer",
      "slugify",
      "winston",
    ],
    category: "Full-stack / Personal",
    featured: false,
    liveUrl: "#",
    githubUrl: "https://github.com/mahendra2811/tech-web",
    status: "In Development",
    year: "2025",
    highlights: [
      "Admin pages: projects + services management",
      "Hardened backend (helmet, rate-limit, compression, winston)",
      "JWT auth + role-based access",
      "Resend transactional email",
    ],
    role: "Solo Developer (Self)",
    duration: "2025",
    tags: ["mern", "admin-cms", "portfolio-v1"],
    docs: [
      {
        label: "Frontend README",
        path: "b__old/my-website-old-fulll-stack/frontend/README.md",
      },
      { label: "Backend README", path: "b__old/my-website-old-fulll-stack/backend/README.md" },
      { label: "Backend repo", path: "https://github.com/mahendra2811/tech-web-backend" },
    ],
    sourcePath: "b__old/my-website-old-fulll-stack/",
  },

  {
    id: "abhijeet-portfolio",
    title: "Infuncer Portfolio",
    shortDescription: "Personal portfolio site built for client Abhijeet.",
    longDescription:
      "Next.js portfolio with shadcn/ui, Framer Motion, Sonner toast, Radix dialog. Photo-heavy hero + project gallery.",
    thumbnail: thumb("abhijeet-portfolio"),
    images: gallery("abhijeet-portfolio", 4),
    techStack: [
      "Next.js",
      "React",
      "Tailwind",
      "@radix-ui/react-dialog",
      "class-variance-authority",
      "Framer Motion",
      "lucide-react",
      "Sonner",
    ],
    category: "Web / Personal",
    featured: false,
    liveUrl: "#",
    githubUrl: "https://github.com/mahendra2811/web-abhi-portfolio",
    status: "Live",
    year: "2026",
    highlights: [
      "10+ photo hero gallery",
      "shadcn-style component primitives",
      "Sonner toasts for contact form",
    ],
    role: "Freelance Developer",
    duration: "2026-Q1",
    tags: ["nextjs", "portfolio", "freelance"],
    docs: [{ label: "README", path: "b__old/portfolo/README.md" }],
    sourcePath: "b__old/portfolo/",
  },

  {
    id: "sanjivani-ngo",
    title: "The Sanjivani NGO",
    shortDescription:
      "Donation + admin platform for Sanjivani NGO. React frontend + Node/Express + Razorpay.",
    longDescription:
      "Full-stack NGO platform. Donation form integrated with Razorpay, admin login + user management, animated 3D carousel (react-spring + react-spring-3d-carousel), email verification flow, donation receipts via Nodemailer. Two repos: React frontend (Bootstrap + react-router-dom + Redux Toolkit + sweetalert2) and Node backend (Mongoose + Razorpay + JWT + bcryptjs).",
    thumbnail: thumb("sanjivani-ngo"),
    images: gallery("sanjivani-ngo", 5),
    techStack: [
      "React (CRA)",
      "Bootstrap",
      "Redux Toolkit",
      "react-router-dom",
      "axios",
      "react-spring + 3d-carousel",
      "sweetalert2",
      "Express",
      "Mongoose",
      "JWT",
      "bcryptjs",
      "express-validator",
      "Nodemailer",
      "Razorpay",
    ],
    category: "Full-stack / Non-profit",
    featured: false,
    liveUrl: "#",
    githubUrl: "https://github.com/mahendra2811/ngo",
    status: "In Development",
    year: "2025",
    highlights: [
      "Razorpay donation pipeline + email receipts",
      "Email-verification on signup",
      "Role-based admin (User/Admin)",
      "3D carousel of NGO events/initiatives",
      "Donation tracking dashboard",
    ],
    role: "Solo Developer (volunteer/client)",
    duration: "2025",
    tags: ["react", "express", "mongodb", "razorpay", "ngo", "donations"],
    docs: [
      { label: "Frontend README", path: "ngo/ngo-frontend/README.md" },
      { label: "Backend README", path: "ngo/ngo-backend/README.md" },
    ],
    sourcePath: "ngo/",
  },

  {
    id: "food-delivery-app",
    title: "Food Delivery App (Expo + NativeWind)",
    shortDescription: "Learning project — React Native food-delivery app.",
    longDescription:
      "Expo Router + NativeWind food delivery clone (YouTube tutorial follow-along). Tab navigation, deep linking, SVG icons, image optimization, web-view fallback.",
    thumbnail: thumb("food-delivery-app"),
    images: gallery("food-delivery-app", 4),
    techStack: [
      "Expo SDK",
      "Expo Router",
      "React Native",
      "NativeWind",
      "Tailwind",
      "@react-navigation/bottom-tabs",
      "expo-blur + haptics + image + linking",
      "react-native-gesture-handler",
      "react-native-reanimated",
      "react-native-safe-area-context",
      "react-native-webview",
    ],
    category: "Mobile / Learning",
    featured: false,
    liveUrl: "#",
    githubUrl: "https://github.com/mahendra2811/food_delivery_app_yt",
    status: "In Development",
    year: "2025",
    highlights: [
      "Expo Router (file-based mobile routing)",
      "NativeWind (Tailwind for React Native)",
      "Tab + stack navigation",
      "Animated UI with reanimated",
    ],
    role: "Solo Developer (learning)",
    duration: "2025-08",
    tags: ["expo", "react-native", "nativewind", "learning"],
    sourcePath: "a_web/food_delivery_app/",
  },

  {
    id: "todo-master-ai",
    title: "TodoMaster AI — Supabase Todo",
    shortDescription: "Drag-and-drop todo app with Supabase auth + cloud sync.",
    longDescription:
      "Next.js 16 todo manager with @dnd-kit drag-and-drop ordering, Supabase Auth + database, Zustand client state, zod validation, Sonner toasts, date-fns for due-date logic.",
    thumbnail: thumb("todo-master-ai"),
    images: gallery("todo-master-ai", 3),
    techStack: [
      "Next.js 16",
      "TypeScript",
      "Tailwind",
      "@dnd-kit",
      "Supabase",
      "Zustand",
      "zod",
      "date-fns",
      "Sonner",
      "tailwind-merge",
    ],
    category: "Web / Productivity",
    featured: false,
    liveUrl: "#",
    githubUrl: "https://github.com/mahendra2811/web-todo-master",
    status: "Live",
    year: "2026",
    highlights: [
      "Drag-and-drop reordering (@dnd-kit)",
      "Supabase Auth (cookie-based SSR)",
      "Cloud-synced todos",
      "Optimistic UI updates with React 19 + Zustand",
    ],
    role: "Solo Developer (Self)",
    duration: "2026-04",
    tags: ["nextjs", "supabase", "todo", "dnd-kit"],
    docs: [
      { label: "README", path: "a_web/learn-todo-web/supatodo/README.md" },
      { label: "Agents memory", path: "a_web/learn-todo-web/supatodo/AGENTS.md" },
      { label: "Claude memory", path: "a_web/learn-todo-web/supatodo/CLAUDE.md" },
    ],
    sourcePath: "a_web/learn-todo-web/supatodo/",
  },

  {
    id: "calc-master",
    title: "CalcMaster — Multi-Calculator",
    shortDescription:
      "Expo-based multi-calculator mobile app with i18n and localized number formats.",
    longDescription:
      "React Native (Expo) calculator suite with i18n-js + expo-localization, NativeWind styling, AsyncStorage history, haptics, deep links, and uuid-based session IDs.",
    thumbnail: thumb("calc-master"),
    images: gallery("calc-master", 3),
    techStack: [
      "Expo SDK",
      "Expo Router",
      "React Native",
      "NativeWind",
      "AsyncStorage",
      "i18n-js + expo-localization",
      "expo-haptics",
      "react-native-reanimated",
      "react-native-worklets",
      "uuid",
    ],
    category: "Mobile / Utility",
    featured: false,
    liveUrl: "#",
    githubUrl: "https://github.com/mahendra2811/app-calc-master",
    status: "Live",
    year: "2026",
    highlights: [
      "Multi-calculator in one app",
      "i18n + localized number formatting",
      "AsyncStorage history persistence",
      "Native haptics",
    ],
    role: "Solo Developer (Self)",
    duration: "2026-03",
    tags: ["expo", "react-native", "calculator", "i18n"],
    sourcePath: "a_APP/3. multi calculator/CalcMaster/",
  },

  {
    id: "bmi-calculator",
    title: "BMI Calculator",
    shortDescription: "Expo BMI calculator with charts, share & history.",
    longDescription:
      "React Native BMI calculator with react-native-chart-kit history charts, react-native-svg, expo-linear-gradient theming, expo-sharing for results, expo-symbols icons, view-shot for sharable BMI cards.",
    thumbnail: thumb("bmi-calculator"),
    images: gallery("bmi-calculator", 3),
    techStack: [
      "Expo SDK",
      "Expo Router",
      "React Native",
      "NativeWind",
      "AsyncStorage",
      "expo-linear-gradient",
      "expo-haptics",
      "expo-sharing",
      "expo-symbols",
      "react-native-chart-kit",
      "react-native-svg",
      "react-native-view-shot",
      "react-native-reanimated",
      "date-fns",
    ],
    category: "Mobile / Utility",
    featured: false,
    liveUrl: "#",
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

  {
    id: "unit-converter",
    title: "Unit Converter",
    shortDescription: "Cross-platform unit converter mobile app (Expo + EAS).",
    longDescription:
      "Expo-based unit converter (length, weight, temperature, etc.) with bottom-tab navigation, expo-clipboard for copy-to-clipboard, EAS-CLI for production builds, NativeWind styling.",
    thumbnail: thumb("unit-converter"),
    images: gallery("unit-converter", 3),
    techStack: [
      "Expo SDK",
      "Expo Router",
      "React Native",
      "NativeWind",
      "@react-navigation/bottom-tabs",
      "expo-clipboard",
      "expo-haptics",
      "expo-symbols",
      "eas-cli",
      "react-native-gesture-handler",
      "react-native-reanimated",
    ],
    category: "Mobile / Utility",
    featured: false,
    liveUrl: "#",
    githubUrl: "https://github.com/mahendra2811/app-unit-coverter",
    status: "Live",
    year: "2026",
    highlights: [
      "Bottom-tab navigation",
      "Copy-to-clipboard via expo-clipboard",
      "EAS production build pipeline configured",
      "iOS-specific assets bundled",
    ],
    role: "Solo Developer (Self)",
    duration: "2026-03",
    tags: ["expo", "react-native", "utility", "eas"],
    docs: [{ label: "README", path: "a_APP/1. unitConverter/unit-converter/README.md" }],
    sourcePath: "a_APP/1. unitConverter/unit-converter/",
  },

  {
    id: "techbuilder",
    title: "techBuilder — Multi-tenant Construction SaaS",
    shortDescription:
      "Multi-tenant construction SaaS for Indian SMBs. Web + Mobile + API monorepo.",
    longDescription:
      "Architecture/scaffolding stage. Monorepo with apps for web (Next.js 16 + shadcn), mobile (Expo SDK 55 + PowerSync offline-first), API (NestJS + Drizzle + Postgres + BullMQ + Socket.io). Roles: Admin, Manager, Sub-Manager, Worker Head, Worker, Driver. Integrations: Razorpay, MSG91 OTP, FCM, Mapbox. Hosting: Vercel (web) + EAS (mobile) + Docker (API) + Cloudflare R2.",
    thumbnail: thumb("techbuilder"),
    images: gallery("techbuilder", 3),
    techStack: [
      "Next.js 16",
      "TypeScript",
      "Tailwind",
      "shadcn/ui",
      "Zustand",
      "TanStack Query/Table",
      "react-day-picker",
      "react-hook-form + zod",
      "next-intl",
      "Recharts",
      "Expo SDK 55",
      "NativeWind",
      "PowerSync",
      "NestJS",
      "PostgreSQL + Drizzle",
      "BullMQ",
      "Socket.io",
      "Razorpay",
      "MSG91 OTP",
      "FCM",
      "Mapbox",
      "Cloudflare R2",
    ],
    category: "SaaS / Construction",
    featured: false,
    liveUrl: "#",
    githubUrl: "#",
    status: "In Development",
    year: "2026",
    highlights: [
      "Monorepo: web / mobile / api / shared packages",
      "Offline-first mobile with PowerSync",
      "Six role hierarchy (Admin → Driver)",
      "Real-time via Socket.io",
      "Background jobs with BullMQ",
    ],
    role: "Solo Developer (Self) + Architect",
    duration: "2026-Q1 (architecture phase)",
    tags: ["nestjs", "nextjs", "expo", "monorepo", "construction-tech", "powersync", "saas"],
    docs: [
      {
        label: "2026 tech-stack research",
        path: "techBuilder/The Definitive 2026 Tech Stack for techBuilder.pdf",
      },
      { label: "Architecture (docx)", path: "techBuilder/techbuilder-architecture.docx" },
      {
        label: "Architecture phase-2",
        path: "techBuilder/techbuilder-architecture-fullStack_phase-2.pdf",
      },
      { label: "Frontend guide (docx)", path: "techBuilder/techbuilder-frontend-guide.docx" },
      { label: "Web AGENTS", path: "techBuilder/proj/apps/web/AGENTS.md" },
      { label: "Web Claude memory", path: "techBuilder/proj/apps/web/CLAUDE.md" },
    ],
    sourcePath: "techBuilder/",
  },
];

export const projectCategories: string[] = [
  "All",
  ...Array.from(new Set(projects.map((p) => p.category.split(" / ")[0]))),
];

// ---------- Sorting & home-page selection ----------

/**
 * Returns the canonical display order for projects:
 *
 *   1. Items with `priority` (ascending — `priority: 1` is first).
 *   2. Items WITHOUT priority that are `status: "Live"`.
 *   3. Items WITHOUT priority that are `status: "In Development"`.
 *   4. Anything else (future statuses).
 *
 * Use this everywhere you list projects (the /projects page, the
 * homepage carousel, etc.) so the order is consistent.
 *
 * Within each bucket, the original array order is preserved (stable sort).
 */
export function getSortedProjects(list: Project[] = projects): Project[] {
  const withPriority = list
    .filter((p) => typeof p.priority === "number")
    .slice()
    .sort(
      (a, b) => (a.priority ?? Number.POSITIVE_INFINITY) - (b.priority ?? Number.POSITIVE_INFINITY),
    );

  const withoutPriority = list.filter((p) => typeof p.priority !== "number");
  const live = withoutPriority.filter((p) => p.status === "Live");
  const dev = withoutPriority.filter((p) => p.status === "In Development");
  const rest = withoutPriority.filter((p) => p.status !== "Live" && p.status !== "In Development");

  return [...withPriority, ...live, ...dev, ...rest];
}

/**
 * Returns the projects for the home page hero carousel.
 *
 * Selection rules:
 *   1. Prefer `featured: true` projects, in sorted order.
 *   2. If fewer than `limit`, fill from the next sorted projects.
 *   3. Always returns at most `limit` items.
 *
 * To pin a project to the home page:
 *   - Set `featured: true` on the project.
 *   - Optionally set `priority: <n>` to control its position among
 *     the featured ones (lowest n first).
 */
export function getFeaturedProjects(limit = 4): Project[] {
  const sorted = getSortedProjects();
  const featured = sorted.filter((p) => p.featured);
  if (featured.length >= limit) return featured.slice(0, limit);
  const fillers = sorted.filter((p) => !p.featured);
  return [...featured, ...fillers].slice(0, limit);
}
