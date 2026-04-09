/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://pooniya.com/",
  generateRobotsTxt: true,
  changefreq: "weekly",
  priority: 0.7,
  exclude: ["/admin", "/admin/*", "/studio", "/studio/*", "/api/*"],
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/", disallow: ["/admin", "/api", "/studio"] },
    ],
  },
  additionalPaths: async (config) => {
    // Fetch all blog slugs from Sanity at build time
    const paths = [];
    try {
      const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
      const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
      if (projectId) {
        const query = encodeURIComponent(
          '*[_type == "post"]{ "slug": slug.current, publishedAt }'
        );
        const url = `https://${projectId}.api.sanity.io/v2024-01-01/data/query/${dataset}?query=${query}`;
        const res = await fetch(url);
        const data = await res.json();
        if (data.result) {
          for (const post of data.result) {
            paths.push({
              loc: `/blog/${post.slug}`,
              lastmod: post.publishedAt || new Date().toISOString(),
              changefreq: "monthly",
              priority: 0.8,
            });
          }
        }
      }
    } catch {
      // Silently fail — static pages still get sitemap entries
    }
    return paths;
  },
  transform: async (config, path) => {
    if (path === "/") {
      return { loc: path, changefreq: "weekly", priority: 1.0, lastmod: new Date().toISOString() };
    }
    if (path === "/blog") {
      return { loc: path, changefreq: "daily", priority: 0.9, lastmod: new Date().toISOString() };
    }
    if (path.startsWith("/blog/")) {
      return { loc: path, changefreq: "monthly", priority: 0.8, lastmod: new Date().toISOString() };
    }
    return { loc: path, changefreq: config.changefreq, priority: config.priority, lastmod: new Date().toISOString() };
  },
};
