# Analytics & SEO Setup Guide

> Complete setup for Google Analytics 4, Google Tag Manager, Google Search Console, and blog-specific tracking for the Mahendra Portfolio.

---

## Table of Contents

1. [Google Analytics 4 (GA4)](#1-google-analytics-4-ga4)
2. [Google Tag Manager (GTM)](#2-google-tag-manager-gtm)
3. [Google Search Console (GSC)](#3-google-search-console-gsc)
4. [Blog-Specific Tracking](#4-blog-specific-tracking)
5. [Bing Webmaster Tools (Bonus)](#5-bing-webmaster-tools)
6. [Environment Variables Summary](#6-environment-variables-summary)
7. [What Data You'll See](#7-what-data-youll-see)
8. [SEO Features Already Implemented](#8-seo-features-implemented)

---

## 1. Google Analytics 4 (GA4)

### Step 1: Create a GA4 Property

1. Go to [analytics.google.com](https://analytics.google.com)
2. Click **Admin** (gear icon, bottom-left)
3. Click **+ Create Property**
4. Property name: `Mahendra Portfolio`
5. Reporting time zone: India (GMT+5:30)
6. Currency: INR
7. Click **Next**
8. Business size: Small
9. Business objectives: Select **Examine user behavior** + **Generate leads**
10. Click **Create**

### Step 2: Set Up a Web Data Stream

1. Choose platform: **Web**
2. Website URL: `https://pooniya.com` (your domain)
3. Stream name: `Mahendra Portfolio - Web`
4. Enable **Enhanced Measurement** (auto-tracks page views, scrolls, outbound clicks, site search, video, file downloads)
5. Click **Create Stream**
6. Copy the **Measurement ID** (starts with `G-`)

### Step 3: Add to Your Project

Add to `.env`:
```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

That's it. The code is already wired up. Deploy and data starts flowing.

### Step 4: Configure GA4 for Blog Tracking

After data starts flowing (give it 24-48 hours):

1. Go to **Admin** → **Data Display** → **Events**
2. You'll see these custom events auto-appearing:
   - `blog_view` — when someone opens a blog post
   - `blog_scroll_depth` — when reader scrolls 25%, 50%, 75%, 100%
   - `blog_time_spent` — time spent on each blog post
3. Click any event → **Mark as conversion** for the important ones (`blog_view` at minimum)

### Step 5: Create a Blog Performance Report

1. Go to **Explore** → **+ New Exploration**
2. Choose **Free Form**
3. Dimensions: Add `page_title`, `blog_slug`, `blog_categories`
4. Metrics: Add `event_count`, `active_users`, `average_session_duration`
5. Filter: Event name = `blog_view`
6. This gives you a table of which blogs get the most traffic

---

## 2. Google Tag Manager (GTM)

> GTM is **optional if you only need GA4**. Use GTM when you want to manage multiple tags (GA4, Facebook Pixel, Hotjar, etc.) from one dashboard without code changes.

### Step 1: Create a GTM Account

1. Go to [tagmanager.google.com](https://tagmanager.google.com)
2. Click **Create Account**
3. Account name: `Mahendra Portfolio`
4. Country: India
5. Container name: `pooniya.com`
6. Target platform: **Web**
7. Click **Create** → Accept Terms

### Step 2: Get Your GTM ID

After creation, you'll see your **Container ID** (starts with `GTM-`).

### Step 3: Add to Your Project

Add to `.env`:
```
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

The code is already wired up (both head script and body noscript fallback).

### Step 4: Connect GA4 via GTM (Optional)

If using GTM to manage GA4 (instead of direct integration):

1. In GTM → **Tags** → **New**
2. Tag Type: **Google Analytics: GA4 Configuration**
3. Measurement ID: Your `G-XXXXXXXXXX`
4. Trigger: **All Pages**
5. Save → **Submit** → **Publish**

> Note: If you use both direct GA4 AND GTM with GA4, you'll get **double-counted pageviews**. Pick one approach:
> - **Simple (recommended):** Just use `NEXT_PUBLIC_GA_MEASUREMENT_ID` without GTM
> - **Advanced:** Use GTM to manage GA4 + other tags. Remove `NEXT_PUBLIC_GA_MEASUREMENT_ID` and configure GA4 inside GTM.

---

## 3. Google Search Console (GSC)

### Step 1: Add Your Property

1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Click **Add Property**
3. Choose **URL prefix**: `https://pooniya.com`
4. Click **Continue**

### Step 2: Verify Ownership

Choose **HTML tag** method:
1. GSC gives you a meta tag: `<meta name="google-site-verification" content="xxxxx" />`
2. Copy just the `content` value
3. Add to `.env`:
   ```
   NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=xxxxx
   ```
4. Deploy your site
5. Come back to GSC and click **Verify**

Alternative: If your domain is on Cloudflare/Vercel, you can verify via DNS TXT record:
1. Choose **Domain** verification method
2. Add TXT record to your DNS: `google-site-verification=xxxxx`

### Step 3: Submit Your Sitemap

1. In GSC → **Sitemaps** (left sidebar)
2. Enter: `sitemap.xml`
3. Click **Submit**
4. Your sitemap is auto-generated at `https://pooniya.com/sitemap.xml` by `next-sitemap`

### Step 4: Request Indexing for Blog Posts

After publishing new blogs:
1. Go to GSC → **URL Inspection** (top search bar)
2. Enter the full blog URL: `https://pooniya.com/blog/your-blog-slug`
3. Click **Request Indexing**
4. Google will crawl and index the page within 24-48 hours

> Pro tip: Do this for every new blog post to get indexed faster. You can also use the GSC API to automate this.

### Step 5: Monitor Blog Performance

After 1-2 weeks of data:
1. Go to **Performance** → **Search Results**
2. Filter by page → `/blog/` to see only blog pages
3. Key metrics:
   - **Clicks** — people clicking your blog from Google
   - **Impressions** — how many times your blog appeared in search
   - **CTR** — click-through rate (good = >3%)
   - **Position** — average ranking position (goal: under 10)

---

## 4. Blog-Specific Tracking

The following custom events are automatically tracked on every blog post:

### Events Sent to GA4

| Event | When It Fires | Custom Parameters |
|-------|--------------|-------------------|
| `blog_view` | Page load | `blog_slug`, `blog_categories`, `blog_reading_time`, `blog_published_date` |
| `blog_scroll_depth` | At 25%, 50%, 75%, 100% scroll | `blog_slug`, `scroll_depth` |
| `blog_time_spent` | When reader leaves page | `blog_slug`, `time_spent_seconds`, `reading_completion_percent`, `max_scroll_depth` |

### What You Can Measure

| Question | How to Answer |
|----------|--------------|
| Which blog gets the most views? | GA4 → Events → `blog_view` → sort by count |
| Do people actually read the full post? | `blog_scroll_depth` at 100% / total `blog_view` |
| How long do readers spend? | `blog_time_spent` → `time_spent_seconds` |
| Which category performs best? | Group `blog_view` by `blog_categories` |
| Is my reading time estimate accurate? | Compare `reading_completion_percent` across posts |
| Which blog brings organic traffic? | GSC → Performance → filter by `/blog/` pages |
| Which blog ranks highest on Google? | GSC → Performance → sort by Position |

### Creating a Blog Dashboard in GA4

1. Go to **Reports** → **Library** → **Create New Report**
2. Or use **Explore** → **Free Form**:
   - Rows: `page_title`
   - Values: `event_count` (filter: `blog_view`), `active_users`, `average_session_duration`
   - Filter: Page path contains `/blog/`

---

## 5. Bing Webmaster Tools (Bonus)

Don't skip Bing — it also powers DuckDuckGo, Yahoo, and Ecosia search.

1. Go to [bing.com/webmasters](https://www.bing.com/webmasters)
2. Sign in with Microsoft account
3. **Import from GSC** — easiest method, auto-imports everything
4. Or manually add: `https://pooniya.com`
5. Submit sitemap: `https://pooniya.com/sitemap.xml`

No code changes needed — Bing reads the same sitemap and structured data.

---

## 6. Environment Variables Summary

Add these to your `.env` (and Vercel Environment Variables for production):

```bash
# Google Analytics 4 (REQUIRED for analytics)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Google Tag Manager (OPTIONAL — use if you want GTM to manage tags)
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX

# Google Search Console verification (REQUIRED for GSC)
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your-verification-string

# Already set
NEXT_PUBLIC_SITE_URL=https://pooniya.com
```

### On Vercel

1. Go to your Vercel project → **Settings** → **Environment Variables**
2. Add each variable above for **Production** environment
3. Redeploy for changes to take effect

---

## 7. What Data You'll See

### After 24 Hours
- Real-time visitor count
- Page views per page
- Blog view events
- Geographic data (countries, cities)

### After 1 Week
- Traffic trends
- Top blog posts by views
- Scroll depth and reading time data
- Bounce rate per blog
- Device breakdown (mobile vs desktop)

### After 1 Month
- Search Console data (impressions, clicks, CTR, position)
- Which blog posts rank on Google
- Keyword data (what people search to find your blog)
- Traffic growth trends
- Content performance comparison

### After 3 Months
- SEO trend analysis
- Content strategy insights (which topics perform)
- Seasonal patterns
- Backlink growth (via GSC → Links report)

---

## 8. SEO Features Already Implemented

The following SEO optimizations are already in the codebase:

### Structured Data (JSON-LD)
- **Person schema** on all pages (root layout)
- **BlogPosting schema** on every blog post (includes author, publishedDate, readingTime, wordCount)
- **BreadcrumbList schema** on blog posts (Home → Blog → Post Title)

### Meta Tags
- **Open Graph** tags on all pages (type, title, description, image)
- **Twitter Cards** (summary_large_image) on all pages
- **Canonical URLs** on all pages (prevents duplicate content)
- **Article-specific OG tags** on blog posts (publishedTime, authors, tags)

### Technical SEO
- **Sitemap** auto-generated at `/sitemap.xml` with priority weighting (blog = 0.8-0.9, home = 1.0)
- **Robots.txt** auto-generated (allows all, blocks /admin, /api, /studio)
- **Dynamic metadata** per page (title, description)
- **ISR** for blog posts (revalidates every 60 seconds)
- **Image optimization** via `next/image` (WebP, lazy loading, responsive)

### Performance (Affects SEO)
- **Turbopack** build
- **Font optimization** via `next/font` (no layout shift)
- **Package import optimization** for smaller bundles

---

## Quick Checklist

- [ ] Create GA4 property and get Measurement ID
- [ ] Add `NEXT_PUBLIC_GA_MEASUREMENT_ID` to `.env` and Vercel
- [ ] (Optional) Create GTM container and add `NEXT_PUBLIC_GTM_ID`
- [ ] Add site to Google Search Console
- [ ] Verify ownership via meta tag (`NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`)
- [ ] Submit sitemap in GSC: `sitemap.xml`
- [ ] Request indexing for your top blog posts
- [ ] (Optional) Import to Bing Webmaster Tools
- [ ] Deploy and wait 24-48 hours for data
- [ ] Set up a Blog Performance report in GA4 Explore
- [ ] Check GSC Performance weekly for ranking insights
