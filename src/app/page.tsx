import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { SkillsOverview } from "@/components/sections/SkillsOverview";
import { CTASection } from "@/components/sections/CTASection";
import { MetallicDivider } from "@/components/vfx/MetallicDivider";

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

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MetallicDivider />
      <StatsSection />
      <MetallicDivider />
      <FeaturedProjects />
      <MetallicDivider />
      {/* here create a Blog section make it more best according to project . other section align with theme , here it shows only 3 best / high viewes or hihgly rated blogs and that shoud be technincal+ ai related blogs  */}
      <SkillsOverview />
      <MetallicDivider />
      <CTASection />
    </>
  );
}
