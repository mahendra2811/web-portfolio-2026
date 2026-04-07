# AGENTS.md

## Next.js Version Warning

This project uses **Next.js 16.2.2** with React 19 and Tailwind CSS 4. APIs, conventions, and file structure may differ from your training data. Before writing code that touches Next.js internals, routing, or config — check `node_modules/next/dist/docs/` for current docs. Heed deprecation notices.

## Code Rules

- TypeScript strict mode, no `any` types
- Server Components by default; `"use client"` only when required
- `cn()` for all dynamic class merging
- `next/image` for all images, `next/link` for navigation, `next/font/google` for fonts
- Framer Motion for all animations — use motion wrappers from `src/components/motion/`
- All data files in `src/data/` — never hardcode content in components
- Max 200 lines per component file
- Named exports for components, default exports for pages
- All external services must gracefully degrade when env vars are missing

## Component Patterns

- Glass effects: use `.glass`, `.glass-card`, `.glass-button` classes from `globals.css`
- Animations: wrap content with ScrollReveal, StaggerList, or TextReveal — don't write raw motion.div variants inline
- Three.js: lazy load with `next/dynamic` and `ssr: false`; provide gradient-mesh fallback for mobile (`useMediaQuery`)
- Forms: include validation, loading state, toast feedback, and graceful fallback if backend services are unavailable
