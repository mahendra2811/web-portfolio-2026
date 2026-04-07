/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://mahendra-portfolio.vercel.app",
  generateRobotsTxt: true,
  exclude: ["/admin/*", "/studio/*", "/api/*"],
  robotsTxtOptions: {
    additionalSitemaps: [],
    policies: [{ userAgent: "*", allow: "/", disallow: ["/admin", "/api"] }],
  },
};
