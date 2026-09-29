import type { Metadata } from "next";
import type { SimplePrivacyPolicy } from "@/data/privacy-policy";

export function createPrivacyMetadata(
  policy: SimplePrivacyPolicy,
  canonicalPath: string,
  description: string,
): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://pooniya.com";
  const canonical = new URL(canonicalPath, siteUrl).toString();
  const title = `${policy.name} | Privacy Policy`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, type: "article" },
    robots: { index: true, follow: true },
  };
}
