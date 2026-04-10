import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { TimelineSection } from "@/components/sections/TimelineSection";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://pooniya.com";

export const metadata: Metadata = {
  title: "Journey",
  description: "Follow my career journey from IIIT Dharwad to professional software development.",
  alternates: { canonical: `${siteUrl}/journey` },
  openGraph: {
    title: "Career Journey — Mahendra Singh Puniya",
    description: "A timeline of career growth from IIIT Dharwad to professional software development.",
    url: `${siteUrl}/journey`,
    type: "website",
  },
};

export default function JourneyPage() {
  return (
    <Section title="My Journey" subtitle="A timeline of my career and growth as a developer">
      <TimelineSection />
    </Section>
  );
}
