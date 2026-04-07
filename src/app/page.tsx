import { HeroSection } from "@/components/sections/HeroSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { SkillsOverview } from "@/components/sections/SkillsOverview";
import { CTASection } from "@/components/sections/CTASection";
import { MetallicDivider } from "@/components/vfx/MetallicDivider";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MetallicDivider />
      <StatsSection />
      <MetallicDivider />
      <FeaturedProjects />
      <MetallicDivider />
      <SkillsOverview />
      <MetallicDivider />
      <CTASection />
    </>
  );
}
