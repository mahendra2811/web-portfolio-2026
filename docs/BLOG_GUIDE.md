# Blog Guide — Mahendra Portfolio

## Quick Start

1. Open **http://localhost:3000/studio** (local) or **https://your-domain.com/studio** (production)
2. Log in with your Sanity account
3. Create categories (one-time setup)
4. Create blog posts
5. Hit **Publish** — posts appear on `/blog` within 60 seconds

---

## Accessing the Studio

| Environment      | URL                                                                  |
| ---------------- | -------------------------------------------------------------------- |
| Local            | http://localhost:3000/studio                                         |
| Production       | https://mahendra-portfolio.vercel.app/studio                         |
| Sanity Dashboard | https://www.sanity.io/manage/project/{NEXT_PUBLIC_SANITY_PROJECT_ID} |

---

## Creating Categories (One-Time Setup)

Before writing posts, create your blog categories:

1. Go to `/studio/structure/category`
2. Click **"+"** (create new)
3. Fill in:
   - **Title:** e.g. "Web Development"
   - **Slug:** click "Generate" (auto-creates from title)
   - **Description:** optional, e.g. "Articles about modern web development"
4. Click **Publish**

**Suggested categories:**

- Web Development
- React
- Next.js
- TypeScript
- DSA
- Career
- DevOps
- Mobile Development
- AI / ML

---

## Creating a Blog Post

1. Go to `/studio/structure/post`
2. Click **"+"** (create new)
3. Fill in the fields:

### Required Fields

| Field            | What to enter                                                    |
| ---------------- | ---------------------------------------------------------------- |
| **Title**        | Your blog post title                                             |
| **Slug**         | Click "Generate" — then shorten if needed (this becomes the URL) |
| **Excerpt**      | 1-2 sentence summary (shown on blog cards)                       |
| **Published At** | Set the date and time                                            |
| **Reading Time** | Estimated minutes to read (e.g. 5, 8, 12)                        |
| **Categories**   | Click "Add item" → search and select a category                  |

### Optional Fields

| Field           | What to enter                                |
| --------------- | -------------------------------------------- |
| **Cover Image** | Upload a thumbnail (recommended: 1200x630px) |
| **Body**        | Full blog content (rich text editor)         |

### Writing the Body

The body field is a **rich text editor**. Here's how to use it:

**Text formatting:**

- Click the dropdown (says "Normal") to switch between Normal, Heading 2, Heading 3, Blockquote
- Select text → click **B** for bold, **I** for italic
- Select text → click the link icon to add a hyperlink

**Adding elements:**

- **Code block:** Click "+" in the editor toolbar → select "Code" → choose language, paste code
- **Image:** Click "+" → select "Image" → upload or drag-and-drop
- **Lists:** Use the list icons in the toolbar for bullet/numbered lists

**Tips:**

- Use **Heading 2** for main sections
- Use **Heading 3** for sub-sections
- Keep paragraphs short (3-4 sentences max)
- Add a code block when showing code examples
- Add images between sections to break up text

4. Click **Publish** (green button, bottom right)

---

## Post URL Structure

Your blog posts are available at:

```
/blog/{slug}
```

**Examples:**

- Title: "React Performance Guide" → Slug: `react-performance-guide` → URL: `/blog/react-performance-guide`
- Title: "My DSA Journey" → Slug: `my-dsa-journey` → URL: `/blog/my-dsa-journey`

**Keep slugs short and readable.** You can edit the auto-generated slug before publishing.

---

## Editing a Post

1. Go to `/studio/structure/post`
2. Click the post you want to edit
3. Make changes
4. Click **Publish** to save

Changes appear on the live site within 60 seconds.

---

## Unpublishing / Deleting a Post

- **Unpublish:** Click the dropdown arrow next to "Publish" → select "Unpublish". The post stays in the studio as a draft but disappears from the website.
- **Delete:** Click the three-dot menu (top right) → "Delete". This is permanent.

---

## Content Guidelines

### Cover Images

- **Size:** 1200 x 630 pixels (same as Open Graph images)
- **Format:** JPG or PNG
- **Style:** Dark-themed images work best with the portfolio design
- **Free sources:** Unsplash, Pexels, or generate with AI tools

### Reading Time

Rough guide:

- 500 words → 2-3 min
- 1000 words → 4-5 min
- 2000 words → 8-10 min
- 3000+ words → 12-15 min

### SEO Tips

- Use descriptive titles (include keywords like "React", "Next.js", etc.)
- Write a compelling excerpt — it shows in search results and social shares
- Use headings (H2, H3) to structure content
- Keep slugs short and keyword-rich

---

## How It Works (Technical)

- **CMS:** Sanity.io (headless CMS)
- **Data fetching:** Server-side via `next-sanity` client
- **Caching:** ISR (Incremental Static Regeneration) — pages revalidate every 60 seconds
- **Rich text:** Rendered via `@portabletext/react`
- **Fallback:** When Sanity has no posts, placeholder posts from `src/data/blog-placeholder.ts` are shown
- **Studio:** Embedded at `/studio` using `next-sanity/studio`

---

## Troubleshooting

| Issue                    | Fix                                                                           |
| ------------------------ | ----------------------------------------------------------------------------- |
| Studio won't load        | Check CORS origins at sanity.io/manage → API → CORS Origins. Add your domain. |
| Posts not appearing      | Wait 60 seconds (ISR cache). Or restart dev server.                           |
| Images not loading       | Check that the Sanity CDN is not blocked. Images come from `cdn.sanity.io`.   |
| "Schema error" in studio | Run `npm run build` to check for config errors.                               |
| Can't log into studio    | Go to sanity.io and verify your account. Studio uses Sanity's own auth.       |
