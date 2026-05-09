import type { Metadata } from "next";
import { ResumeView } from "@/components/sections/ResumeView";
import { resumes } from "@/data/resumes";
import { personalInfo } from "@/data/personal";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://pooniya.com";
const resume = resumes.fd;

export const metadata: Metadata = {
  title: resume.label,
  description: `${resume.description} — ${personalInfo.name}`,
  alternates: { canonical: `${siteUrl}/resume-fd` },
  openGraph: {
    title: `${resume.label} — ${personalInfo.name}`,
    description: resume.description,
    url: `${siteUrl}/resume-fd`,
    type: "profile",
  },
};

export default function ResumeFrontendPage() {
  return <ResumeView resume={resume} routeSlug="resume-fd" />;
}
