# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Cinematic developer portfolio for Mahendra Singh Puniya. Dark-theme glassmorphism design, built with Next.js 16 App Router, React 19, Tailwind CSS 4, Framer Motion, and Three.js.

## Commands

```bash
npm run dev          # Start dev server (Turbopack)
npm run build        # Production build — must pass with zero errors
npm run lint         # ESLint
npx tsc --noEmit     # TypeScript strict check (no `any` allowed)
```

No test runner is configured. Verify changes with `npm run build && npx tsc --noEmit`.

## Architecture

### Rendering Model
- All components are **Server Components by default**
- Add `"use client"` only when the component uses browser APIs, hooks, or event handlers
- Three.js components (`src/components/three/`) must be lazy-loaded with `next/dynamic` and `ssr: false`; mobile devices get a CSS gradient-mesh fallback instead

### Layout & Routing
- `src/app/layout.tsx` — root layout with Navbar, Footer, ScrollProgress, DynamicCursor, BackToTop, and JSON-LD
- Pages: `/`, `/about`, `/skills`, `/projects`, `/projects/[slug]`, `/journey`, `/blog`, `/blog/[slug]`, `/resume`, `/contact`
- `/admin/*` routes are protected by Supabase auth middleware (`middleware.ts`); `/admin/login` is excluded
- If Supabase env vars are missing, middleware allows admin access (dev mode)

### Component Organization
- `src/components/ui/` — reusable primitives (Button, Card, Badge, Input, Tabs, Toast, etc.)
- `src/components/motion/` — animation wrappers (ScrollReveal, StaggerList, TextReveal, PageTransition, ParallaxSection, MagneticButton)
- `src/components/sections/` — page sections (HeroSection, StatsSection, FeaturedProjects, etc.)
- `src/components/three/` — Three.js scenes (HeroScene, ParticleField)
- `src/components/layout/` — Navbar, Footer
- `src/components/seo/` — JsonLd
- `src/components/blog/` — blog-specific components

### Data Layer
- **Static data** lives in `src/data/` (personal.ts, projects.ts, skills.ts, timeline.ts, navigation.ts, blog-placeholder.ts) — all exported as `const` objects
- **Blog posts** come from Sanity CMS (`src/lib/sanity/`); falls back to `blog-placeholder.ts` when Sanity is not configured
- **Contact form** submits via `/api/contact` using Resend for email delivery
- **Auth** via Supabase (`src/lib/supabase/`) — `client.ts` for browser, `server.ts` for SSR
- **State** managed with Zustand (`src/store/theme.ts`)

### External Services (all graceful-fallback — app works with zero env vars)
- **Supabase** — auth + admin panel data
- **Sanity** — blog CMS (schemas in `sanity/schemas/`)
- **Resend** — contact form email
- **Google Analytics** — via `@next/third-parties`

### Key Patterns
- `cn()` from `src/lib/utils.ts` — Tailwind class merging (clsx + tailwind-merge)
- Animation presets in `src/lib/motion.ts` (fadeInUp, staggerContainer, scaleIn, slideInLeft/Right)
- Glassmorphism via CSS classes in `globals.css`: `.glass`, `.glass-card`, `.glass-button`
- Custom hooks: `useIntersection`, `useMediaQuery`, `useScrollDirection`, `useTheme`
- Typography: Outfit (display/`--font-outfit`), Plus Jakarta Sans (body/`--font-jakarta`), JetBrains Mono (code/`--font-jetbrains`) — all via `next/font/google`
- Named exports for components, default exports for page components

### Design System
- Colors: `primary` (indigo), `accent` (cyan), `surface` (dark backgrounds)
- Typography scale uses CSS `clamp()` custom properties (`--text-display` through `--text-caption`)
- All images use `next/image`, all links use `next/link`
- Responsive: mobile-first with Tailwind breakpoints

## Slash Commands

- `/fix` — iterative build + type-check until zero errors
- `/review` — full review: lint, types, imports, responsiveness, animations, images
- `/deploy-check` — pre-deploy verification checklist

## Setup Docs

Detailed setup guides in `docs/`: `ENV_SETUP.md`, `SUPABASE_SETUP.md`, `SANITY_SETUP.md`, `DEPLOYMENT.md`, `PLACEHOLDER_ASSETS.md`.

@AGENTS.md
