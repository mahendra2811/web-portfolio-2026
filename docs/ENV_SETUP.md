# Environment Variables Setup

Copy `.env.example` to `.env.local` and fill in values.

| Variable | Source | Required | What breaks without it |
|----------|--------|----------|----------------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Dashboard → Settings → API | Optional | Contact form won't save to DB, admin contacts page empty |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Dashboard → Settings → API | Optional | Same as above |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Dashboard → Settings → API | Optional | Not used in current code |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity Dashboard → Project Settings | Optional | Blog shows placeholder posts |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity (default: production) | Optional | Blog shows placeholder posts |
| `SANITY_API_TOKEN` | Sanity Dashboard → API → Tokens | Optional | Not used in current code |
| `RESEND_API_KEY` | resend.com Dashboard | Optional | Contact form won't send email (still saves to DB) |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics | Optional | No analytics tracking |
| `NEXT_PUBLIC_SITE_URL` | Your deployed URL | Optional | Metadata uses default URL |
| `REVALIDATION_SECRET` | Generate random string | Optional | ISR webhook won't work |

**Nothing breaks without env vars** — all services have graceful fallbacks.
