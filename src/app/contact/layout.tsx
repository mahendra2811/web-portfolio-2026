import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://pooniya.com";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Mahendra Singh Puniya for web development projects, collaborations, or opportunities.",
  alternates: { canonical: `${siteUrl}/contact` },
  openGraph: {
    title: "Contact — Mahendra Singh Puniya",
    description: "Get in touch for web development projects and collaborations.",
    url: `${siteUrl}/contact`,
    type: "website",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
