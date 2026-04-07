# Sanity CMS Setup Guide

## 1. Install Sanity CLI
```bash
npm install -g @sanity/cli
```

## 2. Create Project
```bash
sanity init --project-name "mahendra-portfolio-blog"
```
- Select: Create new project
- Dataset: `production`
- Template: Blog (schema)

## 3. Get Project ID
- Go to [sanity.io/manage](https://sanity.io/manage)
- Copy your **Project ID** → `NEXT_PUBLIC_SANITY_PROJECT_ID`

## 4. Create API Token
- Project Settings → API → Tokens → Add API Token
- Name: `portfolio-read`
- Permissions: Editor
- Copy token → `SANITY_API_TOKEN`

## 5. Configure CORS
- Project Settings → API → CORS Origins
- Add: `http://localhost:3000`
- Add: `https://your-vercel-domain.vercel.app`
- Allow credentials: Yes

## 6. Update Environment
```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
```

## 7. Add Content
Use Sanity Studio to create blog posts. The portfolio fetches posts via GROQ queries and falls back to placeholder data when Sanity is not configured.

## 8. ISR Webhook (Optional)
- Project Settings → API → Webhooks
- URL: `https://your-site.vercel.app/api/revalidate?secret=YOUR_SECRET`
- Trigger on: Create, Update, Delete
- Filter: `_type == "post"`
