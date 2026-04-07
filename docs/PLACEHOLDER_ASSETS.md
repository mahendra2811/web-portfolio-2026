# Placeholder Assets Replacement Guide

| Asset | Current Source | Location | Specs | How to Replace |
|-------|---------------|----------|-------|---------------|
| Profile Photo | picsum.photos | `public/images/profile.jpg` | 500x600px, JPEG/WebP | Replace file, keep same name |
| OG Image | Missing | `public/og-image.png` | 1200x630px, PNG | Create with your branding |
| Favicon | Default Next.js | `public/favicon.ico` | 32x32, ICO | Replace with your icon |
| PWA Icon 192 | Missing | `public/icons/icon-192.png` | 192x192px, PNG | Create matching your brand |
| PWA Icon 512 | Missing | `public/icons/icon-512.png` | 512x512px, PNG | Create matching your brand |
| Resume PDF | Missing | `public/resume/Mahendra_Singh_Puniya_Resume.pdf` | PDF | Add your resume |
| Project Thumbnails | picsum.photos URLs | Used in `src/data/projects.ts` | 800x600px | Update URLs or move to public/ |
| Project Screenshots | picsum.photos URLs | Used in `src/data/projects.ts` | 1200x800px | Update URLs or move to public/ |

## Steps to Replace
1. Prepare your assets at the correct dimensions
2. Place them in the correct `public/` subdirectory
3. For project images in `src/data/projects.ts`, update the URLs
4. Run `npm run build` to verify all images resolve
