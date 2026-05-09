import type { Metadata } from "next";
import { ResumeView } from "@/components/sections/ResumeView";
import { resumes } from "@/data/resumes";
import { personalInfo } from "@/data/personal";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://pooniya.com";
const resume = resumes.fsd;

export const metadata: Metadata = {
  title: resume.label,
  description: `${resume.description} — ${personalInfo.name}`,
  alternates: { canonical: `${siteUrl}/resume-fsd` },
  openGraph: {
    title: `${resume.label} — ${personalInfo.name}`,
    description: resume.description,
    url: `${siteUrl}/resume-fsd`,
    type: "profile",
  },
};

export default function ResumeFullStackPage() {
  return <ResumeView resume={resume} routeSlug="resume-fsd" />;
}
