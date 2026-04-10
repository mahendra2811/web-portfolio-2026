import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://pooniya.com";

export const metadata: Metadata = {
  title: "Skills & Technologies",
  description:
    "Technical skills including React, Next.js, TypeScript, Node.js, Three.js, AI/ML, and modern web development tools.",
  alternates: { canonical: `${siteUrl}/skills` },
  openGraph: {
    title: "Skills & Technologies — Mahendra Singh Puniya",
    description: "Technical expertise in modern web development and AI.",
    url: `${siteUrl}/skills`,
    type: "website",
  },
};

export default function SkillsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
