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

  callnest: {
    thumbnail: "/projects/callnest/web-0-callnest.png",
    banner: "/projects/callnest/web-0-callnest.png",
    gallery: [
      "/projects/callnest/web-0-callnest.png",
      "/projects/callnest/web-1-callnest.png",
      "/projects/callnest/web-2-callnest.png",
      "/projects/callnest/web-3-callnest.png",
      "/projects/callnest/web-4-callnest.png",
      "/projects/callnest/mobile-1-callnest.png",
      "/projects/callnest/mobile-2-callnest.png",
      "/projects/callnest/mobile-3-callnest.png",
    ],
  },

  invoiceforge: {},

  fixtools: {
    thumbnail: "/projects/fixtools/web-light-1-fixtools.png",
    banner: "/projects/fixtools/web-light-1-fixtools.png",
    gallery: [
      "/projects/fixtools/web-light-1-fixtools.png",
      "/projects/fixtools/web-light-2-fixtools.png",
      "/projects/fixtools/web-light-3-fixtools.png",
      "/projects/fixtools/web-light-4-fixtools.png",
      "/projects/fixtools/web-light-5-fixtools.png",
      "/projects/fixtools/web-light-6-fixtools.png",
      "/projects/fixtools/web-light-7-fixtools.png",
      "/projects/fixtools/web-light-8-fixtools.png",
      "/projects/fixtools/web-light-9-fixtools.png",
      "/projects/fixtools/web-light-10-fixtools.png",
      "/projects/fixtools/web-light-11-fixtools.png",
      "/projects/fixtools/web-dark-1-fixtools.png.png",
      "/projects/fixtools/web-dark-2-fixtools.png.png",
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

  "calc-master": {
    thumbnail: "/projects/calc-master/web-1-desktop.png",
    banner: "/projects/calc-master/banner.png",
    gallery: [
      "/projects/calc-master/web-1-desktop.png",
      "/projects/calc-master/web-2-desktop.png",
      "/projects/calc-master/web-3-desktop.png",
      "/projects/calc-master/web-4-desktop.png",
      "/projects/calc-master/web-5-desktop.png",
      "/projects/calc-master/web-6-desktop.png",
      "/projects/calc-master/web-7-desktop.png",
      "/projects/calc-master/web-8-desktop.png",
      "/projects/calc-master/web-9-desktop.png",
      "/projects/calc-master/web-10-desktop.png",
      "/projects/calc-master/web-11-desktop.png",
      "/projects/calc-master/web-12-desktop.png",
      "/projects/calc-master/web-13-desktop.png",
      "/projects/calc-master/dark_web-1.png",
      "/projects/calc-master/dark_web-2.png",
      "/projects/calc-master/dark_web-3.png",
      "/projects/calc-master/dark_web-4.png",
      "/projects/calc-master/mobile1.png",
      "/projects/calc-master/mobile2.png",
    ],
  },

  "bmi-calculator": {},

  "unit-converter": {},

  techbuilder: {},

  pdfnest: {},

  moneynest: {},
};
