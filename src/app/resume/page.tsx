import type { Metadata } from "next";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faEnvelope,
  faPhone,
  faLocationDot,
  faGraduationCap,
  faBriefcase,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { personalInfo, experience, education } from "@/data/personal";
import { skills } from "@/data/skills";
import { getTechIcon } from "@/lib/tech-icons";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://pooniya.com";

export const metadata: Metadata = {
  title: "Resume",
  description: `Resume of ${personalInfo.name} — ${personalInfo.title}. React, Next.js, TypeScript, AI/ML expertise.`,
  alternates: { canonical: `${siteUrl}/resume` },
  openGraph: {
    title: `Resume — ${personalInfo.name}`,
    description: `${personalInfo.title} — React, Next.js, TypeScript expertise.`,
    url: `${siteUrl}/resume`,
    type: "profile",
  },
};

export default function ResumePage() {
  const topSkills = Object.values(skills)
    .flatMap((cat) => [...cat.items])
    .sort((a, b) => b.level - a.level)
    .slice(0, 8);

  return (
    <Section title="Resume" subtitle="Download my resume or view highlights below">
      <div className="mb-10 flex justify-center">
        <Link href={personalInfo.resumeUrl} target="_blank">
          <Button variant="primary" size="lg">
            <FontAwesomeIcon icon={faDownload} className="h-5 w-5" style={{ color: "#FFFFFF" }} />{" "}
            Download Resume PDF
          </Button>
        </Link>
      </div>

      <div className="mx-auto max-w-3xl">
        <Card className="mb-8">
          <h2 className="mb-1 font-[family-name:var(--font-display)] text-2xl font-bold">
            {personalInfo.name}
          </h2>
          <p className="text-primary-400 mb-4 font-medium">{personalInfo.title}</p>
          <div className="flex flex-wrap gap-4 text-sm text-[var(--text-secondary)]">
            <span className="flex items-center gap-1.5">
              <FontAwesomeIcon icon={faEnvelope} className="h-4 w-4" style={{ color: "#F59E0B" }} />
              {personalInfo.email}
            </span>
            {/* <span className="flex items-center gap-1.5">
              <FontAwesomeIcon icon={faPhone} className="h-4 w-4" style={{ color: "#06B6D4" }} />
              {personalInfo.phone}
            </span> */}
            <span className="flex items-center gap-1.5">
              <FontAwesomeIcon
                icon={faLocationDot}
                className="h-4 w-4"
                style={{ color: "#E34F26" }}
              />
              {personalInfo.location}
            </span>
          </div>
          <div className="mt-3 flex gap-3">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 transition-colors hover:text-white"
            >
              <FontAwesomeIcon icon={faGithub} className="h-4 w-4" />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 transition-colors hover:text-white"
            >
              <FontAwesomeIcon
                icon={faLinkedinIn}
                className="h-4 w-4"
                style={{ color: "#0A66C2" }}
              />
            </a>
          </div>
        </Card>

        <div className="mb-8">
          <h3 className="mb-4 text-lg font-semibold">Top Skills</h3>
          <div className="flex flex-wrap gap-2">
            {topSkills.map((s) => {
              const { icon, color } = getTechIcon(s.name);
              return (
                <Badge key={s.name} variant="primary">
                  <FontAwesomeIcon icon={icon} className="mr-1.5 h-3 w-3" style={{ color }} />
                  {s.name}
                </Badge>
              );
            })}
          </div>
        </div>

        <div className="mb-8">
          <div className="mb-4 flex items-center gap-2">
            <FontAwesomeIcon icon={faBriefcase} className="h-4 w-4" style={{ color: "#06B6D4" }} />
            <h3 className="text-lg font-semibold">Experience</h3>
          </div>
          <div className="space-y-4">
            {experience.map((exp) => (
              <Card key={exp.id}>
                <h4 className="font-semibold">{exp.role}</h4>
                <p className="text-primary-400 text-sm">
                  {exp.company} &middot; {exp.type}
                </p>
                <p className="mb-2 text-xs text-[var(--text-secondary)]">{exp.duration}</p>
                <ul className="list-inside list-disc space-y-1 text-sm text-[var(--text-secondary)]">
                  {exp.responsibilities.slice(0, 4).map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-4 flex items-center gap-2">
            <FontAwesomeIcon
              icon={faGraduationCap}
              className="h-4 w-4"
              style={{ color: "#3B82F6" }}
            />
            <h3 className="text-lg font-semibold">Education</h3>
          </div>
          {education.map((edu) => (
            <Card key={edu.institution}>
              <h4 className="font-semibold">
                {edu.degree} in {edu.field}
              </h4>
              <p className="text-primary-400 text-sm">{edu.shortName}</p>
              <p className="text-xs text-[var(--text-secondary)]">
                {edu.duration} &middot; CPI: {edu.cpi}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}
