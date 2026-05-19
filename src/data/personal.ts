/**
 * Single source of truth for personal info, experience, education, achievements, stats.
 * Mirrors the resume PDF in /public/resume/mahendra_resume_fsd.pdf.
 *
 * To edit: update fields here. The /resume, /about, and homepage pages all hydrate from this file.
 */

export const personalInfo = {
  name: "Mahendra Singh Puniya",
  title: "Software Developer · AI-Assisted Engineering",
  tagline:
    "Architecting scalable end-to-end web platforms — multi-merchant e-commerce, healthcare booking, and AI-assisted developer workflows.",
  email: "mahendrapuniya92@gmail.com",
  phone: "+91-7568265755",
  location: "Gurugram, India",
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
      "Software Developer with around 2 years of production experience architecting scalable end-to-end web applications. Delivered multi-merchant e-commerce platforms and a healthcare booking platform.",
    long: "I'm Mahendra Singh Puniya — a Software Developer with around 2 years of production experience architecting scalable end-to-end web applications at Primathon. I started in April 2025 by owning end-to-end delivery of Care41, a multi-level healthcare-management SaaS — REST APIs, database schemas, authentication flows, role-based access, and pixel-perfect user + admin portals. From July 2025 onwards I've been a core contributor on Storefront-Builder, a multi-merchant Next.js e-commerce platform built on a BFF architecture with 29+ API endpoints, where I've onboarded and shipped end-to-end production storefronts for high-traffic D2C brands — Aqualogica, Wellversed, PlixKids, and currently Weryze. I drive API design, database modeling, observability (Sentry + Slack alerting, GA4, PostHog, Meta Pixel + server-side Conversions API), and AI-assisted engineering — pioneering Cursor, Roo Code, and Claude Code workflows on the team with custom skills, multi-agent pipelines (PM/coder/QA personas), and MCP servers. B.Tech in Computer Science from IIIT Dharwad (2020–2024). Solved 700+ DSA problems on LeetCode and earned NCC 'B' Certificate.",
  },
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
    role: "Associate Software Developer",
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
      { label: "D2C storefronts shipped", value: "3 + 1 in flight", icon: "Store" },
      { label: "API endpoints (BFF)", value: "29+", icon: "Server" },
      { label: "Healthcare SaaS delivered", value: "Care41", icon: "Briefcase" },
      { label: "Observability coverage", value: "FE + BE", icon: "Shield" },
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
    title: "Multi-Merchant E-commerce",
    description:
      "Shipped storefronts for Aqualogica, Wellversed, PlixKids — currently onboarding Weryze on the Storefront-Builder platform.",
    icon: "Store",
    link: null,
  },
] as const;

export const stats = [
  { label: "Years of Production Experience", value: "2", icon: "Calendar" },
  { label: "Projects Completed", value: "20+", icon: "Folder" },
  { label: "DSA Problems Solved", value: "700+", icon: "Code" },
  { label: "Technologies", value: "30+", icon: "Layers" },
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
