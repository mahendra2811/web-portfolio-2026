/**
 * Single source of truth for all project photos.
 *
 * To add photos for a project:
 *   1. Drop the files into public/projects/<project-id>/
 *   2. Fill in thumbnail, banner, and gallery below for that project.
 *   3. No other file needs to change.
 *
 * Fields:
 *   thumbnail — shown on the /projects card grid (overview shot)
 *   banner    — full-width image at the top of the detail page
 *   gallery   — all screenshots shown in the gallery section
 */

export interface ProjectImageSet {
  thumbnail?: string;
  banner?: string;
  gallery?: string[];
}

export const projectImages: Record<string, ProjectImageSet> = {
  // ── Priority projects ──────────────────────────────────────────────────────

  callnest: {},

  invoiceforge: {},

  fixtools: {
    thumbnail: "/projects/fixtools/web-1-desktop.png",
    banner: "/projects/fixtools/banner.png",
    gallery: [
      "/projects/fixtools/web-1-desktop.png",
      "/projects/fixtools/web-2-desktop.png",
      "/projects/fixtools/web-3-desktop.png",
      "/projects/fixtools/web-4-desktop.png",
      "/projects/fixtools/web-5-desktop.png",
      "/projects/fixtools/web-6-desktop.png",
      "/projects/fixtools/web-7-desktop.png",
      "/projects/fixtools/web-8-desktop.png",
      "/projects/fixtools/web-9-desktop.png",
      "/projects/fixtools/web-10-desktop.png",
      "/projects/fixtools/web-11-desktop.png",
      "/projects/fixtools/web-12-desktop.png",
      "/projects/fixtools/web-13-desktop.png",
      "/projects/fixtools/dark_web-1.png",
      "/projects/fixtools/dark_web-2.png",
      "/projects/fixtools/dark_web-3.png",
      "/projects/fixtools/dark_web-4.png",
      "/projects/fixtools/mobile1.png",
      "/projects/fixtools/mobile2.png",
    ],
  },

  "j-hunter": {},

  // ── Other projects (fill in as you add screenshots) ───────────────────────

  "ai-banner": {},

  "ddws-safari": {},

  tdp: {},

  dnp: {},

  "portfolio-2026": {},

  "tech-web": {},

  "abhijeet-portfolio": {},

  "sanjivani-ngo": {},

  "food-delivery-app": {},

  "todo-master-ai": {},

  "calc-master": {},

  "bmi-calculator": {},

  "unit-converter": {},

  techbuilder: {},

  pdfnest: {},

  moneynest: {},
};
