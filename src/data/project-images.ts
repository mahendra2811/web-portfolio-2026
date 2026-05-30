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
    ],
  },

  invoiceforge: {},

  fixtools: {
    thumbnail: "/projects/fixtools/web-light-1-fixtools.png",
    banner: "/projects/fixtools/web-light-1-fixtools.png",
    gallery: [
      // "/projects/fixtools/web-light-1-fixtools.png",
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

  "ddws-safari": {
    thumbnail: "/projects/ddws-safari/web-1-ddws.png",
    banner: "/projects/ddws-safari/web-1-ddws.png",
    gallery: [
      "/projects/ddws-safari/web-1-ddws.png",
      "/projects/ddws-safari/web-2-ddws.png",
      "/projects/ddws-safari/web-3-ddws.png",
      "/projects/ddws-safari/web-4-ddws.png",
      "/projects/ddws-safari/web-5-ddws.png",
      "/projects/ddws-safari/web-6-ddws.png",
      "/projects/ddws-safari/web-7-ddws.png",
      "/projects/ddws-safari/web-8-ddws.png",
      "/projects/ddws-safari/web-9-ddws.png",
      "/projects/ddws-safari/web-10-ddws.png",
    ],
  },

  tdp: {},

  dnp: {
    thumbnail: "/projects/dnp/web-1-radhe.png",
    banner: "/projects/dnp/web-1-radhe.png",
    gallery: [
      "/projects/dnp/web-1-radhe.png",
      "/projects/dnp/web-2-radhe.png",
      "/projects/dnp/web-3-radhe.png",
      "/projects/dnp/web-4-radhe.png",
    ],
  },

  "portfolio-2026": {},

  "tech-web": {},

  "abhijeet-portfolio": {},

  "sanjivani-ngo": {},

  "food-delivery-app": {},

  "todo-master-ai": {
    thumbnail: "/projects/todo-master-ai/web-1-todoMasterAI.png",
    banner: "/projects/todo-master-ai/web-1-todoMasterAI.png",
    gallery: [
      "/projects/todo-master-ai/web-1-todoMasterAI.png",
      "/projects/todo-master-ai/web-2-todoMasterAI.png",
      "/projects/todo-master-ai/web-3-todoMasterAI.png",
      "/projects/todo-master-ai/web-4-todoMasterAI.png",
      "/projects/todo-master-ai/web-5-todoMasterAI.png",
      "/projects/todo-master-ai/web-6-todoMasterAI.png",
      "/projects/todo-master-ai/web-7-todoMasterAI.png",
    ],
  },

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

  "bmi-calculator": {
    thumbnail: "/projects/bmi-calculator/mobile-1-bmiCalculator.jpg",
    banner: "/projects/bmi-calculator/mobile-1-bmiCalculator.jpg",
    gallery: [
      "/projects/bmi-calculator/mobile-1-bmiCalculator.jpg",
      "/projects/bmi-calculator/mobile-2-bmiCalculator.jpg",
      "/projects/bmi-calculator/mobile-3-bmiCalculator.jpg",
      "/projects/bmi-calculator/mobile-4-bmiCalculator.jpg",
    ],
  },

  "unit-converter": {},

  techbuilder: {},

  pdfnest: {},

  moneynest: {},

  // ── Primathon professional projects ───────────────────────────────────────

  aqualogica: {
    thumbnail: "/projects/aqualogica/aqua-web-1.png",
    banner: "/projects/aqualogica/aqua-web-1.png",
    gallery: [
      "/projects/aqualogica/aqua-web-1.png",
      "/projects/aqualogica/aqua-web-2.png",
      "/projects/aqualogica/aqua-web-3.png",
      "/projects/aqualogica/aqua-web-4.png",
      "/projects/aqualogica/aqua-web-5.png",
      "/projects/aqualogica/aqua-web-6.png",
    ],
  },

  plixkids: {
    thumbnail: "/projects/plixkids/plixkids-web-1.png",
    banner: "/projects/plixkids/plixkids-web-1.png",
    gallery: [
      "/projects/plixkids/plixkids-web-1.png",
      "/projects/plixkids/plixkids-web-2.png",
      "/projects/plixkids/plixkids-web-3.png",
      "/projects/plixkids/plixkids-web-4.png",
      "/projects/plixkids/plixkids-web-5.png",
      "/projects/plixkids/plixkids-web-6.png",
      "/projects/plixkids/plixkids-web-7.png",
    ],
  },

  wellversed: {
    thumbnail: "/projects/wellversed/wellversed-web-1.png",
    banner: "/projects/wellversed/wellversed-web-1.png",
    gallery: [
      "/projects/wellversed/wellversed-web-1.png",
      "/projects/wellversed/wellversed-web-2.png",
      "/projects/wellversed/wellversed-web-3.png",
      "/projects/wellversed/wellversed-web-4.png",
      "/projects/wellversed/wellversed-web-5.png",
      "/projects/wellversed/wellversed-web-6.png",
    ],
  },

  care41: {
    thumbnail: "/projects/care41/care41-web-1.png",
    banner: "/projects/care41/care41-web-1.png",
    gallery: [
      "/projects/care41/care41-web-1.png",
      "/projects/care41/care41-web-2.png",
      "/projects/care41/care41-web-3.png",
      "/projects/care41/care41-web-4.png",
    ],
  },

  documitra: {
    thumbnail: "/projects/documitra/web-1-documitra.png",
    banner: "/projects/documitra/web-1-documitra.png",
    gallery: [
      "/projects/documitra/web-1-documitra.png",
      "/projects/documitra/web-2-documitra.png",
      "/projects/documitra/web-3-documitra.png",
      "/projects/documitra/web-4-documitra.png",
      "/projects/documitra/web-5-documitra.png",
    ],
  },
};
