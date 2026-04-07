Pre-deploy verification:
1. `npm run build` — must pass with zero errors
2. `npx tsc --noEmit` — must pass
3. `npm run lint` — must pass
4. Verify .env.example exists and lists all required variables
5. Verify public/manifest.json has correct name, theme_color, icons
6. Verify middleware.ts correctly protects /admin/* routes
7. Verify vercel.json has correct configuration
8. Verify metadata (title, description, OG tags) on all page.tsx files
9. Verify next-sitemap.config.js has correct siteUrl
10. Output READY or list of blockers
