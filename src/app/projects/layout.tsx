import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://pooniya.com";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore my portfolio of web development projects built with React, Next.js, TypeScript, Three.js, and AI technologies.",
  alternates: { canonical: `${siteUrl}/projects` },
  openGraph: {
    title: "Projects — Mahendra Singh Puniya",
    description: "Web development projects built with modern technologies.",
    url: `${siteUrl}/projects`,
    type: "website",
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
