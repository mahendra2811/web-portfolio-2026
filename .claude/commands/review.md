Run full review checklist:
1. `npm run lint` — fix all lint errors
2. `npx tsc --noEmit` — fix all type errors
3. Verify all pages import correctly and render (check src/app/*/page.tsx)
4. Check for broken imports across components
5. Check for hardcoded strings that should come from src/data/
6. Verify responsive Tailwind classes on key components
7. Verify animation wrappers use ScrollReveal/StaggerList/TextReveal (not raw motion.div)
8. Verify all images use next/image
9. Verify all links use next/link
10. Output summary table of findings
