export const projects = [
  {
    id: "ai-banner",
    title: "AI Banner — Event Poster Generator",
    shortDescription: "India-first AI-powered event poster generation platform for local politicians and businesses",
    longDescription: "A comprehensive SaaS platform that enables local Indian politicians and small business owners to generate personalized event posters with religion-based templates, dual profile modes, and a two-part poster system. Built with Next.js 15, Fabric.js for canvas manipulation, and Supabase for backend.",
    thumbnail: "https://picsum.photos/seed/aibanner/800/600",
    images: ["https://picsum.photos/seed/aibanner1/1200/800", "https://picsum.photos/seed/aibanner2/1200/800", "https://picsum.photos/seed/aibanner3/1200/800"],
    techStack: ["Next.js 15", "TypeScript", "Fabric.js", "Supabase", "Tailwind CSS", "Vercel"],
    category: "SaaS / AI",
    featured: true,
    liveUrl: "#",
    githubUrl: "https://github.com/mahendra2811/ai-banner",
    status: "In Development",
    year: "2025",
    highlights: ["Religion-based template personalization engine", "Dual profile modes (Political / Business)", "Two-part poster system with Fabric.js canvas", "Supabase backend with Row Level Security"]
  },
  {
    id: "techbuilder",
    title: "techBuilder — Construction Management SaaS",
    shortDescription: "Multi-tenant construction management platform with 6 distinct user roles and 170+ features",
    longDescription: "A comprehensive construction industry SaaS serving Workers, Drivers, Mistris, Sub-Managers, Managers, and Admins. Features offline-first architecture with PowerSync, UPI AutoPay via Razorpay, real-time tracking, and a monorepo setup with Turborepo.",
    thumbnail: "https://picsum.photos/seed/techbuilder/800/600",
    images: ["https://picsum.photos/seed/techbuilder1/1200/800", "https://picsum.photos/seed/techbuilder2/1200/800"],
    techStack: ["Next.js 16", "React Native", "Expo SDK 55", "NestJS", "PostgreSQL", "Turborepo"],
    category: "SaaS / Construction",
    featured: true,
    liveUrl: "#",
    githubUrl: "https://github.com/mahendra2811/techbuilder",
    status: "In Development",
    year: "2025",
    highlights: ["6 distinct user roles with custom dashboards", "170+ features across MVP and future phases", "Offline-first with PowerSync integration", "Turborepo monorepo (web + mobile + API)"]
  },
  {
    id: "furniture-ecommerce",
    title: "Trendy Timber — Furniture E-Commerce",
    shortDescription: "Modern furniture e-commerce storefront with sleek UI and responsive design",
    longDescription: "A responsive e-commerce platform for furniture shopping, built with Vue.js and Bootstrap. Features product browsing, filtering, cart management, and a clean modern UI deployed on Netlify.",
    thumbnail: "https://picsum.photos/seed/furniture/800/600",
    images: ["https://picsum.photos/seed/furniture1/1200/800", "https://picsum.photos/seed/furniture2/1200/800"],
    techStack: ["Vue.js", "Bootstrap", "Vite", "JavaScript", "Netlify"],
    category: "E-Commerce",
    featured: true,
    liveUrl: "https://trendy-timber-online-store.netlify.app",
    githubUrl: "https://github.com/mahendra2811/furniture-ecommerce",
    status: "Live",
    year: "2024",
    highlights: ["Responsive product grid with filtering", "Cart management system", "Deployed on Netlify with CI/CD", "Clean Vue.js component architecture"]
  },
  {
    id: "calcmaster",
    title: "CalcMaster — All-in-One Calculator App",
    shortDescription: "React Native calculator app with 36 calculators spanning Finance and Mathematics",
    longDescription: "A fully offline mobile calculator application built with React Native and Expo SDK 55. Features 36 specialized calculators across Finance and Mathematics categories, with Hindi/English language support and NativeWind styling.",
    thumbnail: "https://picsum.photos/seed/calcmaster/800/600",
    images: ["https://picsum.photos/seed/calcmaster1/1200/800"],
    techStack: ["React Native", "Expo SDK 55", "TypeScript", "NativeWind", "Expo Router"],
    category: "Mobile App",
    featured: false,
    liveUrl: "#",
    githubUrl: "https://github.com/mahendra2811/calcmaster",
    status: "In Development",
    year: "2025",
    highlights: ["36 specialized calculators (Finance + Math)", "Fully offline architecture", "Hindi/English bilingual support", "AdMob + Firebase Analytics (env-gated)"]
  }
] as const;

export type Project = (typeof projects)[number];
