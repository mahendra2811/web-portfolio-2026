/**
 * Career + project journey, in chronological order (oldest first).
 *
 * To add a new milestone:
 *   1. Append a new object to the `timeline` array below.
 *   2. Pick an `icon` from the keys supported by TimelineSection.tsx iconMap.
 *   3. Pick a `type`: "education" | "work" | "milestone" | "project" | "freelance".
 *   4. Optionally set `background` for type-specific accent colors.
 *
 * The /journey page renders these as a vertical timeline. Source documents:
 *   - /public/resume/mahendra_resume_fsd.pdf
 *   - /home/primathon/Documents/p_projet/PROJECTS.md
 */

export type TimelineType = "education" | "work" | "milestone" | "project" | "freelance";
export type TimelineBackground = "education" | "internship" | "fulltime" | "project" | "freelance";

export interface TimelineEntry {
  year: string;
  title: string;
  description: string;
  /** Icon name — must match a key in TimelineSection.tsx iconMap. */
  icon: string;
  type: TimelineType;
  background?: TimelineBackground;
}

export const timeline: TimelineEntry[] = [
  // ---------- 2020: Foundation ----------
  {
    year: "2020 – 2024",
    title: "B.Tech at IIIT Dharwad",
    description:
      "Bachelor of Technology in Computer Science and Engineering — CPI 7.0. Coursework: DSA, DBMS, Operating Systems, AI, ML, Computer Networks.",
    icon: "GraduationCap",
    type: "education",
    background: "education",
  },
  {
    year: "2020",
    title: "Joined NSS (National Service Scheme)",
    description:
      "Started contributing to social service initiatives — community development programs, blood donation drives, and social awareness campaigns.",
    icon: "Heart",
    type: "milestone",
  },

  // ---------- 2021: Web + NCC ----------
  {
    year: "2021",
    title: "Deep Dive into Web Development",
    description:
      "Mastered HTML, CSS, JavaScript and started building projects. Began competitive programming on LeetCode and GeeksForGeeks.",
    icon: "Code",
    type: "milestone",
  },
  {
    year: "2021",
    title: "Joined NCC (National Cadet Corps)",
    description:
      "Enrolled as NCC Cadet — leadership, discipline, and teamwork through military training and national service activities.",
    icon: "Shield",
    type: "milestone",
  },
  {
    year: "2021",
    title: "First static portfolio site",
    description:
      "Built and deployed the first version of my personal portfolio with vanilla HTML, CSS, and JavaScript on Netlify. The deploy-on-push workflow hooked me on web development.",
    icon: "Globe",
    type: "milestone",
  },
  {
    year: "2021",
    title: "First 100 LeetCode problems",
    description:
      "Crossed the 100-problem milestone on LeetCode — built a daily DSA practice habit that has since carried into 700+ solved problems.",
    icon: "Bullseye",
    type: "milestone",
  },

  // ---------- 2022: React + Hackathons ----------
  {
    year: "2022",
    title: "React & Modern Frontend Mastery",
    description:
      "Fell in love with the React ecosystem. Built multiple projects, learned state management, hooks, and explored the modern frontend landscape deeply.",
    icon: "Rocket",
    type: "milestone",
  },
  {
    year: "2022",
    title: "First Hackathon Win",
    description:
      "Built an innovative web app at a college hackathon. Learned the value of rapid prototyping and teamwork under pressure.",
    icon: "Trophy",
    type: "milestone",
  },
  {
    year: "2022",
    title: "Machine Learning Fundamentals",
    description:
      "Explored ML algorithms, supervised + unsupervised learning. Implemented Linear Regression, Decision Trees, and K-Means.",
    icon: "Brain",
    type: "milestone",
  },
  {
    year: "2022",
    title: "Open-source habit + first GitHub streak",
    description:
      "Set up a meaningful GitHub presence and maintained a contribution streak. Switched IDE to VS Code with deep-customised settings, snippets, and keybindings.",
    icon: "Code",
    type: "milestone",
  },
  {
    year: "2022",
    title: "DSA — 200+ problems solved",
    description:
      "Crossed the 200-problem mark across LeetCode and GeeksforGeeks. Got comfortable with arrays, strings, two-pointer, sliding-window, and recursion patterns.",
    icon: "Bullseye",
    type: "milestone",
  },

  // ---------- 2023: Full-Stack + AI ----------
  {
    year: "2023",
    title: "Full-Stack Expansion",
    description:
      "Expanded into backend with Node.js, Express, MongoDB, PostgreSQL, and DevOps fundamentals. Crossed 300+ DSA problems.",
    icon: "Database",
    type: "milestone",
  },
  {
    year: "2023",
    title: "AI & Deep Learning Projects",
    description:
      "Worked on Neural Networks, CNNs, and NLP. Built image classification and sentiment analysis systems with TensorFlow and PyTorch.",
    icon: "Brain",
    type: "milestone",
  },
  {
    year: "2023",
    title: "Tech Fest Organizer & Speaker",
    description:
      "Organized college technical fest, conducted workshops on React.js and modern web development. Mentored juniors in competitive programming.",
    icon: "Users",
    type: "milestone",
  },
  {
    year: "2023",
    title: "First production deploy — Trendy Timber",
    description:
      "Built and deployed a furniture e-commerce storefront with Vue.js, Bootstrap, and Vite on Netlify. First time owning a project all the way to a live URL.",
    icon: "Rocket",
    type: "project",
    background: "project",
  },
  {
    year: "2023",
    title: "DSA — 500+ problems milestone",
    description:
      "Crossed 500 problems on LeetCode (mahendra92). Mastered DP, graphs, segment trees, and started reading editorial-level solutions.",
    icon: "Bullseye",
    type: "milestone",
  },
  {
    year: "2023",
    title: "First TypeScript codebase",
    description:
      "Migrated a side project from JavaScript to TypeScript and never looked back. Adopted strict mode, generics, and zod-based runtime validation.",
    icon: "Code",
    type: "milestone",
  },

  // ---------- 2024: First job + graduation ----------
  // {
  //   year: "Jan 2024 – Mar 2024",
  //   title: "Software Developer Intern @ Primathon",
  //   description:
  //     "First professional role — built responsive UIs with React.js and Tailwind CSS, created interactive data visualizations with Chart.js, and worked in an Agile team environment.",
  //   icon: "Briefcase",
  //   type: "work",
  //   background: "internship",
  // },
  {
    year: "2024",
    title: "Earned NCC 'B' Certificate",
    description:
      "Completed three years of NCC training (2021–2024) and earned the prestigious 'B' Certificate — leadership, discipline, and commitment to national service.",
    icon: "Award",
    type: "milestone",
  },
  {
    year: "2024",
    title: "NSS Volunteer Completion",
    description:
      "Completed four years of dedicated service with NSS (2020–2024) — contributing to social welfare programs, blood donation drives, and community development.",
    icon: "Heart",
    type: "milestone",
  },
  {
    year: "May 2024",
    title: "Graduated from IIIT Dharwad",
    description:
      "Completed B.Tech in Computer Science and Engineering — CPI 7.0. Strong theoretical foundation in full-stack development, AI/ML, and problem-solving.",
    icon: "GraduationCap",
    type: "education",
    background: "education",
  },
  
  {
    year: "2024",
    title: "First Three.js / R3F scene shipped",
    description:
      "Built my first @react-three/fiber scene with custom shaders for the portfolio rebuild. Picked up GLSL fundamentals + GPU detection fallback.",
    icon: "Sparkles",
    type: "milestone",
  },
  {
    year: "2024",
    title: "First MCP server experiment",
    description:
      "Spun up my first Model-Context-Protocol server to wire custom tools into Claude Code. Started thinking of agentic workflows as a primary engineering surface.",
    icon: "Robot",
    type: "milestone",
  },
  {
    year: "Jul 2024 – Dec 2024",
    title: "Software Developer Intern @ Coding blocks",
    description:
      "internship — production-grade applications, JWT + Firebase authentication, API development with MongoDB and PostgreSQL, and CI/CD pipelines.",
    icon: "Code",
    type: "work",
    background: "internship",
  },

  // ---------- 2025: Promotion → Care41 → Storefront-Builder → freelance ----------
  {
    year: "Jan 2025",
    title: "Joined Primathon Software Developer @ Primathon",
    description:
      "Stepped up to a full-time architect/builder role — owning end-to-end delivery of production platforms, API design, database modeling, and observability.",
    icon: "TrendingUp",
    type: "work",
    background: "fulltime",
  },
  {
    year: "Apr 2025",
    title: "Started Care41 — Healthcare Management SaaS",
    description:
      "First major full-stack ownership at Primathon. Built a multi-level healthcare booking platform end-to-end — REST API endpoints, database schemas, authentication flows, and pixel-perfect user + admin portals with CMS-driven lead capture, multi-stage booking management, and role-based access control.",
    icon: "Briefcase",
    type: "work",
    background: "fulltime",
  },
  {
    year: "Apr–Jun 2025",
    title: "Care41 shipped to production",
    description:
      "Delivered the full healthcare SaaS — APIs, DB schemas, auth flows, user + admin portals — driving observability and AI-assisted engineering practices into the codebase.",
    icon: "Rocket",
    type: "work",
    background: "fulltime",
  },
  {
    year: "Jul 2025",
    title: "Started Storefront-Builder — multi-merchant Next.js platform",
    description:
      "Joined as a core contributor on Primathon's multi-merchant Next.js e-commerce platform built on a BFF architecture with 29+ API endpoints. Designed reusable frontend components and backend services across product APIs, cart orchestration, checkout flow, and search — accelerating merchant onboarding.",
    icon: "Store",
    type: "work",
    background: "fulltime",
  },
  {
    year: "2025",
    title: "Shipped D2C storefront — aqualogica.in",
    description:
      "Onboarded and delivered the end-to-end production storefront (frontend, backend, and database layers) for D2C skincare brand Aqualogica on the Storefront-Builder platform.",
    icon: "Rocket",
    type: "work",
    background: "fulltime",
  },
  {
    year: "2025",
    title: "Shipped D2C storefront — Wellversed",
    description:
      "Second high-traffic Storefront-Builder merchant onboarded. Reused the BFF + analytics + Sentry stack to compress merchant onboarding time.",
    icon: "Rocket",
    type: "work",
    background: "fulltime",
  },
  {
    year: "2025",
    title: "Shipped D2C storefront — PlixKids",
    description:
      "Third merchant on the Storefront-Builder platform — kids-focused D2C brand. Continued accelerating merchant onboarding through reusable components and shared services.",
    icon: "Rocket",
    type: "work",
    background: "fulltime",
  },
  {
    year: "2025 – Present",
    title: "Shipping D2C storefront — Weryze",
    description:
      "Fourth merchant currently being onboarded on the Storefront-Builder platform. Continuing to drive multi-merchant scale, observability rollouts, and AI-assisted development workflows.",
    icon: "Store",
    type: "work",
    background: "fulltime",
  },
  {
    year: "2025",
    title: "End-to-End E-commerce Analytics",
    description:
      "Implemented GA4 + PostHog + Meta Pixel + server-side Conversions API across merchant storefronts — dual client/server tracking, event deduplication, full-funnel instrumentation.",
    icon: "ChartLine",
    type: "work",
    background: "fulltime",
  },
  {
    year: "2025",
    title: "Sentry + Slack alerting across the stack",
    description:
      "Integrated Sentry across frontend and backend production storefronts — real-time error tracking, source-map-aware stack traces, priority-based Slack routing, release tracking, and per-merchant segregation. Reduced MTTR.",
    icon: "Shield",
    type: "work",
    background: "fulltime",
  },
  {
    year: "2025",
    title: "Pioneered AI-Assisted Development on the team",
    description:
      "Cursor + Roo Code + Claude Code workflows — custom skills, task-specific agents (PM/coder/QA personas), and plugins for project scaffolding, code review, test generation. Designed reusable prompt patterns for full-stack replication that produce pixel-accurate Next.js implementations from production sites.",
    icon: "Sparkles",
    type: "milestone",
  },

  // 2025 freelance / personal projects (parallel to full-time work)
  {
    year: "2025",
    title: "Freelance: Desert National Park (DNP) safari site",
    description:
      "Two-version freelance project for client Radheshyam-ji in Jaisalmer — original static HTML/CSS site, then Next.js rebuild with sharp + react-icons.",
    icon: "Globe",
    type: "freelance",
    background: "freelance",
  },
  {
    year: "2025",
    title: "Freelance: DDWS — Desert Wildlife Safari",
    description:
      "Next.js marketing + booking site for Sharvan-ji's wildlife safari business in the Thar desert. Brand refactor (Sanctuary → Safari), team profiles, contact + booking forms with zod validation.",
    icon: "Globe",
    type: "freelance",
    background: "freelance",
  },
  {
    year: "2025",
    title: "Thar Desert Photography — v1 + v2 attempts",
    description:
      "v1 static HTML/CSS site live at thardesertphotography.com; v2 full-stack attempt with Next.js + Node + MongoDB admin CMS for booking/lead/join-team forms.",
    icon: "Globe",
    type: "freelance",
    background: "freelance",
  },
  {
    year: "2025",
    title: "Sanjivani NGO platform",
    description:
      "Full-stack NGO platform — donations via Razorpay, email-verification on signup, role-based admin (User/Admin), 3D events carousel, donation tracking dashboard.",
    icon: "Heart",
    type: "project",
    background: "project",
  },
  {
    year: "2025",
    title: "Food Delivery (Expo + NativeWind) — learning",
    description:
      "Expo Router + NativeWind food-delivery follow-along to deepen React Native + mobile routing fundamentals.",
    icon: "Mobile",
    type: "project",
    background: "project",
  },
  {
    year: "2025",
    title: "tech-web — Personal site v1 (MERN)",
    description:
      "First full-stack version of my personal site — Next.js frontend + Node/Express + MongoDB backend, hardened with helmet/rate-limit, JWT auth, admin CRUD for projects + services.",
    icon: "Code",
    type: "project",
    background: "project",
  },

  // ---------- 2026: Indie SaaS + apps ----------
  {
    year: "2026-Q1",
    title: "techBuilder — Construction SaaS architecture",
    description:
      "Started architecting a multi-tenant construction SaaS for Indian SMBs — monorepo (web + mobile + API), Next.js 16, NestJS, Drizzle, PowerSync offline-first mobile, BullMQ, Socket.io, six-role hierarchy.",
    icon: "Server",
    type: "project",
    background: "project",
  },
  {
    year: "2026-Q1",
    title: "callNest — Android development started",
    description:
      "Began the callNest Android app — local-first Compose app for Indian SMBs that turns inquiry calls into a structured lead pipeline. Hilt + Room + WorkManager + libphonenumber. 13 sprints planned.",
    icon: "Mobile",
    type: "project",
    background: "project",
  },
  {
    year: "Mar 2026",
    title: "Three Expo apps shipped: Unit Converter, BMI, CalcMaster",
    description:
      "Shipped three React Native (Expo) apps — Unit Converter (EAS pipeline), BMI Calculator (chart-kit + view-shot share), CalcMaster (multi-calculator with i18n + AsyncStorage history).",
    icon: "Mobile",
    type: "project",
    background: "project",
  },
  {
    year: "Apr 2026",
    title: "FixTools — 12-tool privacy-first PDF/image toolkit",
    description:
      "Built a 100% client-side PDF + image toolkit (Canvas + Web Workers + pdf-lib). 12 launch tools incl. 20 Indian exam-photo presets (UPSC, SSC, IBPS, NEET, JEE). SEO-first per-tool routing.",
    icon: "Image",
    type: "project",
    background: "project",
  },
  {
    year: "Apr 2026",
    title: "PosterBanao",
    description:
      "Built an India-first event-based poster generator in . Fabric.js canvas, religion-based templates, dual profile mode, glassmorphism design.",
    icon: "Palette",
    type: "project",
    background: "project",
  },
  {
    year: "Apr 2026",
    title: "TodoMaster AI — drag-and-drop todo with Supabase",
    description:
      "Next.js 16 todo manager — @dnd-kit reordering, Supabase Auth (cookie-based SSR), cloud-synced todos, optimistic UI with React 19 + Zustand.",
    icon: "Bullseye",
    type: "project",
    background: "project",
  },
  {
    year: "Apr 2026",
    title: "j_Hunter — self-hosted job-hunting agent (in dev)",
    description:
      "FastAPI + Celery scrape 11 sources (LinkedIn, Naukri, Wellfound, ATSes, Twitter), Claude scores postings, Hunter.io finds emails, Gmail SMTP/IMAP runs outreach + reply detection. Next.js 14 dashboard with SSE.",
    icon: "Robot",
    type: "project",
    background: "project",
  },
  {
    year: "Apr 2026",
    title: "InvoiceForge — offline-first GST invoice PWA (in dev)",
    description:
      "Next.js 15 PWA invoice generator — Dexie (IndexedDB) primary + Supabase cloud sync, GST templates, UPI QR + barcode + signature, next-intl en/hi, Sentry + PostHog, R3F 3D marketing scenes.",
    icon: "FileInvoice",
    type: "project",
    background: "project",
  },
  {
    year: "Apr 2026",
    title: "TDP v3 — Next.js + Sanity rebuild (in dev)",
    description:
      "Third iteration of Thar Desert Photography — Next.js + Sanity CMS, Three.js / R3F 3D scenes, GSAP, react-leaflet, lightbox gallery, next-intl, Resend email, Supabase auth.",
    icon: "Globe",
    type: "freelance",
    background: "freelance",
  },
  {
    year: "Apr 2026",
    title: "portfolio-2026 — this very site",
    description:
      "Cinematic developer portfolio — Next.js 16, React 19, Tailwind v4, Three.js + R3F + drei + custom shaders, GSAP + Lenis smooth scroll, Sanity CMS for blog, hCaptcha-gated Resend contact form.",
    icon: "Code",
    type: "project",
    background: "project",
  },
  {
    year: "2026-Q1",
    title: "callNest — v1.0.0 Android app shipped",
    description:
      "13 sprints, 245+ Kotlin files, 15 in-app docs articles. Floating in-call bubble, post-call popup, 0–100 lead-scoring algorithm, Excel/CSV/PDF export, self-update via versions.json (no Play Store).",
    icon: "Mobile",
    type: "project",
    background: "project",
  },
  {
    year: "2026-Q2",
    title: "callNest marketing site — callnest.app live",
    description:
      "Static Next.js 15 marketing site for callNest — 12 routes, Cloudflare Pages auto-deploy, APK release pipeline (npm run sync-release) auto-patches version metadata + sha256.",
    icon: "Globe",
    type: "project",
    background: "project",
  },

  // ---------- Ongoing milestones ----------
  {
    year: "2026",
    title: "700+ DSA problems milestone (LeetCode mahendra92)",
    description:
      "Crossed 700+ problems on LeetCode — strengthened algorithmic problem-solving and time-complexity analysis. Active on GeeksforGeeks (mr_hatke).",
    icon: "Target",
    type: "milestone",
  },
  {
    year: "2026",
    title: "Researching the frontier of AI-assisted engineering",
    description:
      "Prototyping with Claude Code, MCP servers, custom slash commands, and multi-agent coding pipelines. Documenting learnings and sharing patterns internally + publishing on the blog.",
    icon: "Sparkles",
    type: "milestone",
  },
  {
    year: "2026",
    title: "Blog launch — 80+ posts published",
    description:
      "Started writing technical posts on AI-assisted engineering, Next.js patterns, and full-stack architecture. Crossed 80+ posts across the blog and internal team docs.",
    icon: "Lightbulb",
    type: "milestone",
  },
  {
    year: "2026 – Present",
    title: "Currently shipping at Primathon",
    description:
      "Continuing to ship Storefront-Builder merchant launches (currently Weryze), evolving the AI-assisted dev pipeline, and shipping indie SaaS projects in parallel — callNest, FixTools, InvoiceForge, j_Hunter, techBuilder.",
    icon: "Zap",
    type: "work",
    background: "fulltime",
  },
];
