/**
 * Single source of truth for personal info, experience, education, achievements, stats.
 * Mirrors the resume PDF in /public/resume/mahendra_resume_fsd.pdf.
 *
 * To edit: update fields here. The /resume, /about, and homepage pages all hydrate from this file.
 */

export const personalInfo = {
  name: "Mahendra Singh",
  title: "Software Developer · AI-Assisted Engineering",
  tagline:
    "Architecting scalable end-to-end web platforms — multi-merchant e-commerce, healthcare booking, and AI-assisted developer workflows.",
  email: "mahendrapuniya92@gmail.com",
  phone: "+91-7568265755",
  location: "Delhi, India",
  linkedin: "https://linkedin.com/in/pooniyamahendra",
  github: "https://github.com/mahendra2811",
  leetcode: "https://leetcode.com/u/mahendra92",
  geeksforgeeks: "https://www.geeksforgeeks.org/user/mr_hatke",
  portfolio: "https://pooniya.com/",
  resumeUrl: "/resume/mahendra_resume_fsd.pdf",
  profilePhoto: "/images/profile-portrait.png",
  profilePhotoCasual: "/images/profile.jpg",
  profilePhotoWorking: "/images/profile-working.png",
  bio: {
    short:
      "Software Developer with around 2 years of production experience architecting scalable end-to-end web applications. Delivered multi-merchant e-commerce platforms, a healthcare booking platform, and — independently — a bilingual wholesale storefront and a Hindi-first multi-tenant construction-ops portal.",
    long: "I'm Mahendra Singh  — a Software Developer with around 2 years of production experience architecting scalable end-to-end web applications at Primathon. I started in April 2025 by owning end-to-end delivery of Care41, a multi-level healthcare-management SaaS — REST APIs, database schemas, authentication flows, role-based access, and pixel-perfect user + admin portals. From July 2025 onwards I've been a core contributor on Storefront-Builder, a multi-merchant Next.js e-commerce platform built on a BFF architecture with 29+ API endpoints, where I've onboarded and shipped end-to-end production storefronts for high-traffic D2C brands — Aqualogica, Wellversed, PlixKids, and currently Weryze. I drive API design, database modeling, observability (Sentry + Slack alerting, GA4, PostHog, Meta Pixel + server-side Conversions API), and AI-assisted engineering — pioneering Cursor, Roo Code, and Claude Code workflows on the team with custom skills, multi-agent pipelines (PM/coder/QA personas), and MCP servers. Alongside that, I build and ship production software independently: Ammedi (hawanproducts.com), a bilingual English/हिन्दी wholesale storefront for a 20-year-old Jodhpur manufacturer, and Construction Saathi (techbuilder.pooniya.com), a Hindi-first multi-tenant field-operations portal for Indian construction SMBs — NestJS + PostgreSQL with row-level security, a Next.js portal, an Android TWA, self-hosted on EC2 and operated by me end to end. B.Tech in Computer Science from IIIT Dharwad (2020–2024). Solved 700+ DSA problems on LeetCode and earned NCC 'B' Certificate.",
  },
} as const;

export const jobSearch = {
  openToWork: true,
  currentRole: "Software Developer 1",
  currentCompany: "Primathon",
  targetRoles: ["Software Engineer"],
  experienceYears: "2",
  availability: "Immediately",
  workSetup: ["Remote", "Hybrid", "On-site"] as string[],
  location: "India / Remote (Open to relocation)",
  education: "B.Tech · CSE · IIIT Dharwad ",
  coreStack: [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "PostgreSQL",
    "AI-Assisted Dev",
  ] as string[],
} as const;

export const education = [
  {
    institution: "Indian Institute of Information Technology, Dharwad",
    shortName: "IIIT Dharwad",
    degree: "Bachelor of Technology",
    field: "Computer Science and Engineering",
    duration: "2020 – 2024",
    cpi: "7.0",
    coursework: [
      "Data Structures & Algorithms",
      "Database Management Systems",
      "Operating Systems",
      "Artificial Intelligence",
      "Machine Learning",
      "Computer Networks",
    ],
  },
] as const;

export const experience = [
  {
    id: "primathon-asd",
    company: "Primathon Software Pvt. Ltd.",
    role: "Software Developer (SDE-1)",
    type: "Full-time" as const,
    duration: "January 2025 – Present",
    location: "Gurugram, India",
    description:
      "Architecting scalable end-to-end production web platforms — multi-merchant e-commerce, healthcare booking, observability, and AI-assisted engineering workflows.",
    responsibilities: [
      "Owned end-to-end delivery of Care41 (Apr 2025), a multi-level healthcare-management SaaS — REST API endpoints, database schemas, authentication flows, and pixel-perfect user + admin portals with CMS-driven lead capture, multi-stage booking management, and role-based access control.",
      "Core contributor on Storefront-Builder (Jul 2025 → present) — a multi-merchant Next.js e-commerce platform built on a BFF architecture with 29+ API endpoints. Onboarded and shipped end-to-end production storefronts (frontend, backend, and database layers) for D2C brands Aqualogica, Wellversed, PlixKids, and currently Weryze.",
      "Designed and built reusable frontend components and backend services across the multi-merchant platform — product APIs, cart orchestration, checkout flow, and search — accelerating merchant onboarding.",
      "Implemented end-to-end e-commerce analytics across merchant storefronts — GA4, PostHog, Meta Pixel + server-side Conversions API — with dual client/server tracking, event deduplication, and full-funnel instrumentation.",
      "Pioneered AI-assisted development on the team using Cursor, Roo Code, and Claude Code — created automation pipelines with custom skills, task-specific agents (PM/coder/QA personas), and plugins for project scaffolding, code review, and test generation.",
      "Designed AI-assisted full-stack replication workflows and reusable prompt patterns — converting production websites into pixel-accurate Next.js implementations with backend integrations, raising team AI productivity.",
      "Integrated Sentry with Slack alerting across frontend and backend layers of production storefronts — real-time error tracking, source-map-aware stack traces, priority-based Slack routing, release tracking, and per-merchant segregation — reducing MTTR.",
    ],
    techStack: [
      "Next.js (App Router)",
      "React.js",
      "TypeScript",
      "Node.js",
      "Express",
      "BFF Pattern",
      "PostgreSQL",
      "MongoDB",
      "Drizzle ORM",
      "Tailwind CSS",
      "shadcn/ui",
      "Sentry",
      "GA4",
      "PostHog",
      "Meta Pixel + Conversions API",
      "Claude Code",
      "Cursor",
      "Roo Code",
      "MCP Servers",
      "GitHub Actions",
      "Vercel",
    ],
    metrics: [
      { label: "D2C storefronts shipped", value: "3+1 in flight", icon: "Store" },
      { label: "API endpoints (BFF)", value: "29+", icon: "Server" },
      { label: "Healthcare SaaS delivered", value: "Care41", icon: "Briefcase" },
      { label: "Observability coverage", value: "FE + BE", icon: "Shield" },
    ],
  },
  {
    id: "independent-client-work",
    company: "Independent / Freelance",
    role: "Full-Stack Developer — Client & Product Work",
    type: "Freelance" as const,
    duration: "2026 – Present",
    location: "Remote · India",
    description:
      "Designing, building, deploying and maintaining production web platforms end to end for small Indian businesses — from the data model and backend to the storefront, the Android wrapper and the server it runs on.",
    responsibilities: [
      "Delivered Ammedi (hawanproducts.com) for Ganga Agro Industries, Jodhpur — a bilingual (English + हिन्दी) wholesale storefront with a 100-product catalogue, tiered bulk pricing, enquiry-based checkout, QR-coded product pages for white-labelled packaging, and PWA install.",
      "Built and shipped Construction Saathi (techbuilder.pooniya.com) — a Hindi-first, multi-tenant field-operations portal for Indian construction SMBs: NestJS + Drizzle + PostgreSQL with row-level security, a Next.js App Router portal with httpOnly-cookie auth, 5 roles behind a frozen RBAC matrix, and an Android TWA build.",
      "Architected a 3-workspace monorepo around versioned, frozen Zod contracts compiled by both backend and frontend, so an API change fails the build rather than production.",
      "Owned deployment and operations end to end — self-hosted on AWS EC2 (ap-south-1) with local PostgreSQL 18, nginx, pm2 and Cloudflare, plus migrations, RLS setup, and backup/recovery runbooks.",
      "Engineered every third-party integration to be env-gated and degrade silently, so both apps build and run with a completely empty .env.",
      "Worked directly with non-technical business owners — translating how they already sell (phone calls, IndiaMART, paper diaries) into product decisions like enquiry-first checkout and Hindi-first UI.",
    ],
    techStack: [
      "Next.js 16 (App Router)",
      "React 19",
      "TypeScript",
      "NestJS",
      "Drizzle ORM",
      "PostgreSQL + RLS",
      "Zod",
      "TanStack Query",
      "Tailwind CSS 4",
      "shadcn/ui",
      "next-intl",
      "Zustand",
      "Framer Motion",
      "react-three-fiber",
      "Serwist / PWA",
      "Android TWA",
      "AWS EC2 + nginx + pm2",
      "Vitest",
    ],
    metrics: [
      { label: "Production apps shipped", value: "2", icon: "Rocket" },
      { label: "Roles in RBAC matrix", value: "5", icon: "Shield" },
      { label: "Products in catalogue", value: "100", icon: "Store" },
      { label: "Languages supported", value: "EN + हिन्दी", icon: "Languages" },
    ],
  },
  // {
  //   id: "primathon-intern-2024-h2",
  //   company: "Primathon Software Pvt. Ltd.",
  //   role: "Software Developer Intern",
  //   type: "Internship" as const,
  //   duration: "July 2024 – December 2024",
  //   location: "Gurugram, India",
  //   description:
  //     "Post-graduation internship — production-grade applications, JWT and Firebase authentication, REST APIs with MongoDB and PostgreSQL, and CI/CD pipelines.",
  //   responsibilities: [
  //     "Built production features in React.js and Next.js with TypeScript",
  //     "Implemented JWT and Firebase authentication flows",
  //     "Contributed to API development with MongoDB and PostgreSQL backends",
  //     "Set up CI/CD pipelines using GitHub Actions and Vercel",
  //     "Wrote integration and unit tests for shipping features",
  //   ],
  //   techStack: [
  //     "React.js",
  //     "Next.js",
  //     "TypeScript",
  //     "MongoDB",
  //     "PostgreSQL",
  //     "JWT",
  //     "Firebase Auth",
  //     "GitHub Actions",
  //     "Vercel",
  //   ],
  //   metrics: [],
  // },
  // {
  //   id: "primathon-intern-2024-h1",
  //   company: "Primathon Software Pvt. Ltd.",
  //   role: "Software Developer Intern",
  //   type: "Internship" as const,
  //   duration: "January 2024 – March 2024",
  //   location: "Gurugram, India",
  //   description:
  //     "First professional role — built responsive UI components, interactive data visualizations, and worked in an Agile sprint environment.",
  //   responsibilities: [
  //     "Developed responsive UI components using React.js and Tailwind CSS",
  //     "Created interactive data visualizations using Chart.js",
  //     "Participated in Agile sprint ceremonies and code reviews",
  //     "Collaborated with design and backend teams for feature delivery",
  //   ],
  //   techStack: ["React.js", "Tailwind CSS", "Chart.js", "JavaScript", "Git"],
  //   metrics: [],
  // },
] as const;

export const achievements = [
  {
    title: "700+ DSA Problems",
    description:
      "Solved on LeetCode (mahendra92) — algorithmic problem-solving and time-complexity analysis.",
    icon: "Code",
    link: "https://leetcode.com/u/mahendra92",
  },
  {
    title: "NCC 'B' Certificate",
    description: "National Cadet Corps — leadership, discipline, and team coordination.",
    icon: "Award",
    link: null,
  },
  {
    title: "AI-Assisted Engineering Pioneer",
    description:
      "Researching the frontier of multi-agent coding pipelines, MCP servers, and custom Claude Code skills.",
    icon: "Sparkles",
    link: null,
  },
  {
    title: "Shipped & Operated in Production, Solo",
    description:
      "Ammedi (hawanproducts.com) and Construction Saathi (techbuilder.pooniya.com) — architecture, backend, frontend, Android TWA, and the server they run on.",
    icon: "Rocket",
    link: "https://techbuilder.pooniya.com",
  },
  {
    title: "Multi-Merchant E-commerce",
    description:
      "Shipped storefronts for Aqualogica, Wellversed, PlixKids — currently onboarding Weryze on the Storefront-Builder platform.",
    icon: "Store",
    link: null,
  },
] as const;

export const stats = [
  { label: "Years of Production Experience", value: "2", icon: "Calendar" },
  { label: "Projects Completed", value: "23+", icon: "Folder" },
  { label: "DSA Problems Solved", value: "700+", icon: "Code" },
  { label: "Technologies", value: "35+", icon: "Layers" },
] as const;

export const profileLinks = [
  { label: "GitHub (mahendra2811)", url: "https://github.com/mahendra2811", icon: "github" },
  { label: "LeetCode (mahendra92)", url: "https://leetcode.com/u/mahendra92", icon: "code" },
  {
    label: "GeeksforGeeks (mr_hatke)",
    url: "https://www.geeksforgeeks.org/user/mr_hatke",
    icon: "code",
  },
  { label: "LinkedIn", url: "https://linkedin.com/in/pooniyamahendra", icon: "linkedin" },
] as const;
