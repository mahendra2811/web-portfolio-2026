import type { Metadata } from "next";
import { ResumeView } from "@/components/sections/ResumeView";
import { resumes, defaultResumeRole } from "@/data/resumes";
import { personalInfo } from "@/data/personal";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://pooniya.com";
const resume = resumes[defaultResumeRole];

export const metadata: Metadata = {
  title: `Resume — ${resume.shortLabel}`,
  description: `${resume.description} — ${personalInfo.name}`,
  alternates: { canonical: `${siteUrl}/resume-pdf` },
  openGraph: {
    title: `Resume — ${personalInfo.name}`,
    description: resume.description,
    url: `${siteUrl}/resume-pdf`,
    type: "profile",
  },
};

export default function ResumePdfPage() {
  return <ResumeView resume={resume} routeSlug="resume-pdf" />;
}
