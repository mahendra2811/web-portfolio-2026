import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { FeaturedBlog } from "@/components/sections/FeaturedBlog";
import { SkillsOverview } from "@/components/sections/SkillsOverview";
import { CTASection } from "@/components/sections/CTASection";
import { MetallicDivider } from "@/components/vfx/MetallicDivider";
import { getBlogPosts } from "@/lib/sanity/queries";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://pooniya.com";

export const metadata: Metadata = {
  title: "Mahendra Singh Puniya — Senior Frontend Developer & AI Enthusiast",
  description:
    "Full-stack developer specializing in React, Next.js, TypeScript, and AI-powered web applications. Building performant, accessible digital experiences.",
  alternates: { canonical: siteUrl },
  openGraph: {
    title: "Mahendra Singh Puniya — Senior Frontend Developer",
    description: "Full-stack developer building performant, beautiful web experiences with AI.",
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
      return AI_KEYWORDS.some(
        (kw) => cats.some((c) => c.includes(kw)) || title.includes(kw),
      );
    })
    .slice(0, 3);

  const featuredPosts = aiFeatured.length >= 3 ? aiFeatured : allPosts.slice(0, 3);

  return (
    <>
      <HeroSection />
      <MetallicDivider />
      <StatsSection />
      <MetallicDivider />
      <FeaturedProjects />
      <MetallicDivider />
      <FeaturedBlog posts={featuredPosts} />
      <MetallicDivider />
      <SkillsOverview />
      <MetallicDivider />
      <CTASection />
    </>
  );
}
