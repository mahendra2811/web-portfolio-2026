import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { OpenToWork } from "@/components/sections/OpenToWork";
import { StatsSection } from "@/components/sections/StatsSection";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { FeaturedBlog } from "@/components/sections/FeaturedBlog";
import { SkillsOverview } from "@/components/sections/SkillsOverview";
import { CTASection } from "@/components/sections/CTASection";
import { MetallicDivider } from "@/components/vfx/MetallicDivider";
import { getBlogPosts } from "@/lib/sanity/queries";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://pooniya.com";

export const metadata: Metadata = {
  title: "Mahendra Singh Puniya — Software Developer (Open to Work)",
  description:
    "Software Developer (SDE-1) with 2+ years of production experience in React, Next.js, TypeScript & Node.js. Open to Software Developer & Software Engineer roles — résumé, projects, and contact all here.",
  alternates: { canonical: siteUrl },
  openGraph: {
    title: "Mahendra Singh Puniya — Software Developer (Open to Work)",
    description:
      "2 yrs building production web platforms. Open to Software Developer & Software Engineer roles — résumé, projects & contact one click away.",
    url: siteUrl,
    type: "website",
  },
};

const AI_KEYWORDS = ["ai", "llm", "claude", "gpt", "agent", "prompt", "rag", "mcp", "multimodal"];

export default async function HomePage() {
  const allPosts = await getBlogPosts();

  const aiFeatured = allPosts
    .filter((post) => {
      const cats = post.categories.map((c) => c.title.toLowerCase());
      const title = post.title.toLowerCase();
      return AI_KEYWORDS.some((kw) => cats.some((c) => c.includes(kw)) || title.includes(kw));
    })
    .slice(0, 3);

  const featuredPosts = aiFeatured.length >= 3 ? aiFeatured : allPosts.slice(0, 3);

  return (
    <>
      <HeroSection />
      <MetallicDivider />
      <OpenToWork />
      <MetallicDivider />
      {/* <StatsSection /> */}
      <SkillsOverview />
      <MetallicDivider />
      <FeaturedProjects />
      <MetallicDivider />
      <CTASection />
      <MetallicDivider />
      <FeaturedBlog posts={featuredPosts} />
      <MetallicDivider />
    </>
  );
}
