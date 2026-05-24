# Mahendra Portfolio 2026 — AI Project Context

> **Purpose of this file**: Give any AI (Claude, ChatGPT, Gemini) or human reader a complete understanding of this project in one read. Also serves as my personal interview-prep cheat sheet.

---

## 1. Quick Snapshot (TL;DR)

- **Project ID**: `portfolio-2026`
- **Title**: Mahendra Portfolio 2026 — Personal Site
- **Category**: Web · Personal Portfolio
- **Status**: In Development
- **Year**: 2026
- **Role**: Solo Developer (Self)
- **Duration**: 2026-04 → ongoing
- **Local path**: `mahendra portfolio new/mahendra-portfolio/`
- **GitHub**: https://github.com/mahendra2811/web-portfolio-2026
- **Featured**: Yes

## 2. One-Sentence Description
My personal portfolio v2 — Next.js + R3F 3D backgrounds with custom shaders, GSAP + Lenis smooth scroll, Sanity CMS for projects/blog, Resend contact form gated by hCaptcha, Supabase, Zustand state, and Troika 3D text. The successor to `tech-web` (MERN v1).

## 3. Long Description
The "showcase" portfolio. Built to demonstrate everything I've learned across the other 25 projects in this directory. Three.js + R3F for 3D hero with custom shader material (`three-custom-shader-material`) and Troika 3D text for embedded animated typography. GSAP + `@gsap/react` for animation timelines + Lenis for buttery smooth scroll (replacing the older native scroll feel). Sanity CMS drives projects (data sourced from `PROJECTS.md`), blog posts, and case studies. PortableText (`@portabletext/react`) renders Sanity's rich-text. Resend handles the contact form, gated by hCaptcha (`@hcaptcha/react-hcaptcha`) to prevent spam. Supabase + `@supabase/ssr` for any auth/data needs (e.g., admin previews). Zustand for client-side UI state. next-sitemap for auto sitemap generation. i18n-ready (locale folder present).

## 4. Tech Stack
- **Framework**: Next.js + TypeScript
- **Styling**: Tailwind
- **3D**: Three.js + `@react-three/fiber` + `@react-three/drei` + postprocessing
- **Custom shaders**: `three-custom-shader-material`
- **3D text**: `troika-three-text`
- **Animation**: GSAP + `@gsap/react`
- **Smooth scroll**: Lenis
- **Page transitions**: Framer Motion
- **CMS**: Sanity (`next-sanity`)
- **Rich-text**: `@portabletext/react`
- **Auth/DB**: Supabase + `@supabase/ssr`
- **Email**: Resend
- **Spam protection**: `@hcaptcha/react-hcaptcha`
- **State**: Zustand
- **Icons**: FontAwesome
- **SEO**: next-sitemap

## 5. Key Highlights
- **3D hero with custom shader material** (Troika 3D text + R3F)
- **Smooth scroll via Lenis + GSAP** orchestration
- **Sanity CMS** for projects, blog, case studies
- **hCaptcha-gated contact form** (Resend backend)
- **i18n-ready** (locale folder present)
- **Sitemap auto-generation** via next-sitemap
- **Postprocessing** for visual polish
- **Successor to `tech-web`** (MERN v1, two-repo) — single Next.js codebase

## 6. Problem → Solution
- **Problem**: My old portfolio (`tech-web`) was a two-repo MERN with admin CMS — overkill for a personal site. Wanted a single-app architecture, with CMS handled by Sanity instead of custom admin.
- **Solution**: Single Next.js app. Sanity Studio embedded for content editing. Resend + hCaptcha for contact. R3F + Lenis for the premium "designer-developer" feel that signals depth.

## 7. Architecture
```
mahendra-portfolio/
├── app/
│   ├── (marketing)/        # home, about, projects, blog, contact
│   ├── (studio)/           # embedded Sanity Studio
│   └── api/                # Resend handler + hCaptcha verify
├── components/
│   ├── three/              # 3D hero scene + shader + text
│   ├── motion/             # GSAP + Lenis orchestration
│   ├── sanity/             # PortableText custom components
│   └── ui/
├── sanity/                 # schemas (project, post, case-study, author)
├── lib/
│   ├── sanity.ts           # next-sanity client
│   ├── supabase.ts
│   └── lenis.ts
└── public/
    ├── og-image.png
    └── images/profile.jpg, profile-portrait.png, profile-working.png, logo.png
```

## 8. Important File Paths
- README: `mahendra portfolio new/mahendra-portfolio/README.md`
- Docs folder: `mahendra portfolio new/docs/README.md`
- OG image: `mahendra-portfolio/public/og-image.png`
- Profile images: `public/images/profile.jpg`, `profile-portrait.png`, `profile-working.png`, `logo.png`

## 9. Tags
`nextjs`, `threejs`, `r3f`, `custom-shaders`, `troika-text`, `gsap`, `lenis`, `sanity`, `portfolio`, `hcaptcha`, `resend`, `supabase`, `zustand`

---

## 10. Interview Questions I Should Be Ready For

### Three.js / R3F / Shaders
1. What does R3F (`@react-three/fiber`) give you over vanilla Three.js?
2. What is `@react-three/drei` and what's your favorite helper from it?
3. Walk me through `three-custom-shader-material` — when do you reach for it?
4. What does the custom shader on your hero actually compute? (Vertex displacement? Color noise?)
5. How do you use Troika 3D text? How does it differ from sprite-based text in Three.js?
6. How do you pause render when offscreen? (`useFrame` gated by `useInView`)
7. How do you handle SSR with R3F? (`dynamic({ ssr: false })` for the Canvas)

### GSAP + Lenis
8. Why GSAP over Framer Motion?
9. How does `@gsap/react` differ from raw GSAP?
10. What does Lenis do that browser-native scroll doesn't?
11. How does Lenis hook into GSAP's ScrollTrigger?
12. How do you avoid jank when Lenis + GSAP + R3F all run?
13. How do you respect `prefers-reduced-motion` with Lenis?

### Sanity CMS
14. How is Sanity Studio embedded into a Next.js route?
15. How does GROQ differ from GraphQL?
16. How does `@portabletext/react` render rich text? How do you customize a block (e.g., embed YouTube)?
17. How do you do live preview from Sanity Studio?

### Contact Form Security
18. How does hCaptcha differ from reCAPTCHA? Why hCaptcha here?
19. How is the hCaptcha token verified on the server?
20. How would you add rate-limit to the Resend handler?
21. What happens if Resend is down — do you queue or fail?

### Performance
22. With R3F + GSAP + Lenis + Sanity + Supabase + Three.js shaders — how do you keep LCP reasonable?
23. How do you code-split the 3D scene from the rest of the app?
24. How do you handle weak-GPU users gracefully? (`detect-gpu` + 2D fallback)
25. How would you optimize for Lighthouse despite heavy 3D?

### SEO
26. How does next-sitemap auto-generate the sitemap?
27. How do you generate per-route OG images? (`@vercel/og` route handlers)
28. What structured data fits a portfolio? (`Person`, `WebSite`, `BreadcrumbList`)

### Architecture
29. Why is this single-app Next.js a better fit than the old MERN `tech-web`?
30. How does Sanity Studio embedded in `/studio` work for SSO?
31. How would you ship to production (Vercel) and connect the custom domain?

---

## 11. Extra Talking Points (Bring Up Voluntarily)

- **This is the "showcase" project**: It's the polished proof of skill before recruiters look at the other 25 repos.
- **Why a 3D hero**: A static portfolio looks identical to thousands. A custom-shader 3D hero signals depth in <2 seconds.
- **Lenis was a revelation**: GSAP ScrollTrigger + Lenis = scroll-driven storytelling. Once you feel it, native scroll feels broken.
- **Sanity over MDX**: MDX is great for me but I wanted to add posts from phone. Sanity Studio = mobile-friendly editing.
- **Why hCaptcha**: Privacy-friendly, no Google tracking, free tier generous. reCAPTCHA = Google cookies = privacy banner.
- **Carries forward from `tech-web`**: Resend pipeline + the content (projects, services). Backend (Express + Mongo) didn't.
- **Lessons learned**:
  - Custom shaders are addictive — easy to go overboard. Restraint matters.
  - Troika 3D text is heavy; use sparingly on hero only.
  - Sanity has a learning curve (schemas + GROQ + previews) but pays off for content velocity.
- **Future**:
  - Case studies per project (long-form, image-heavy)
  - Newsletter signup (Resend audiences API)
  - Speaker/podcast-appearance section
  - Resume PDF download (Sanity-backed so always fresh)

---

## 12. If I Need to Revisit This Project Later
Read in this order:
1. `README.md` — quick start
2. `docs/README.md` — fuller docs
3. `sanity/schemas/` — content shape
4. `app/(studio)/studio/[[...index]]/page.tsx` — Sanity Studio embed
5. `components/three/HeroScene.tsx` — 3D hero
6. `lib/lenis.ts` — Lenis init
7. `app/api/contact/route.ts` — Resend + hCaptcha handler

To run locally:
```bash
cd "mahendra portfolio new/mahendra-portfolio"
npm install
cp .env.example .env.local   # SANITY_PROJECT_ID, RESEND_API_KEY, HCAPTCHA_KEY, SUPABASE keys
npm run dev
# Studio at /studio
```

GSAP + Lenis init (reusable):
```ts
// lib/lenis.ts
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initSmoothScroll() {
  const lenis = new Lenis();
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  return lenis;
}
```

hCaptcha verify (reusable):
```ts
async function verify(token: string) {
  const r = await fetch("https://hcaptcha.com/siteverify", {
    method: "POST",
    body: new URLSearchParams({ secret: process.env.HCAPTCHA_SECRET!, response: token }),
  });
  const json = await r.json();
  return json.success === true;
}
```
