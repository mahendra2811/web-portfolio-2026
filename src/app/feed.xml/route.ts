import { getAllPosts } from "@/lib/sanity/queries";
import { personalInfo } from "@/data/personal";

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://pooniya.com";
  const posts = await getAllPosts();

  const items = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${siteUrl}/blog/${post.slug.current}</link>
      <guid isPermaLink="true">${siteUrl}/blog/${post.slug.current}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      ${post.categories.map((c) => `<category>${c.title}</category>`).join("\n      ")}
    </item>`
    )
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${personalInfo.name} — Blog</title>
    <link>${siteUrl}/blog</link>
    <description>Articles on AI, web development, React, Next.js, and software engineering by ${personalInfo.name}.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <managingEditor>${personalInfo.email} (${personalInfo.name})</managingEditor>
    <webMaster>${personalInfo.email} (${personalInfo.name})</webMaster>
    ${items}
  </channel>
</rss>`;

  return new Response(rss.trim(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
