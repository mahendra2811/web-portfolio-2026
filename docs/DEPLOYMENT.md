# Deployment Guide

## Pre-Deploy Checklist
- [ ] `npm run build` — zero errors
- [ ] `npx tsc --noEmit` — TypeScript passes
- [ ] `npm run lint` — no lint errors
- [ ] `.env.example` is up to date
- [ ] `vercel.json` configured
- [ ] `public/manifest.json` correct

## Deploy to Vercel

### Option A: Git Integration (Recommended)
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) → Import Project
3. Select your repository
4. Framework: Next.js (auto-detected)
5. Add environment variables from `.env.example`
6. Deploy

### Option B: Vercel CLI
```bash
npm i -g vercel
vercel login
vercel --prod
```

## Environment Variables on Vercel
Go to Project Settings → Environment Variables. Add all variables from `.env.example`.

## Custom Domain
1. Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. SSL is automatic

## Post-Deploy Verification
- [ ] Home page loads with animations
- [ ] All navigation links work
- [ ] Contact form submits successfully
- [ ] Blog page shows posts (placeholder or Sanity)
- [ ] Projects pages load correctly
- [ ] Mobile responsive on all pages
- [ ] Dark/Light theme toggle works
- [ ] OG image shows when sharing URL
