import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { TimelineSection } from "@/components/sections/TimelineSection";

export const metadata: Metadata = {
  title: "Journey",
  description: "Follow my career journey from IIIT Dharwad to professional software development.",
};

export default function JourneyPage() {
  return (
    <Section title="My Journey" subtitle="A timeline of my career and growth as a developer">
      <TimelineSection />
    </Section>
  );
}
