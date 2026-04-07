import type { Metadata } from "next";
import Link from "next/link";
import { Download, Mail, Phone, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { personalInfo, experience, education } from "@/data/personal";
import { skills } from "@/data/skills";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Resume",
  description: `Resume of ${personalInfo.name} — ${personalInfo.title}`,
};

export default function ResumePage() {
  const topSkills = Object.values(skills)
    .flatMap((cat) => [...cat.items])
    .sort((a, b) => b.level - a.level)
    .slice(0, 8);

  return (
    <Section title="Resume" subtitle="Download my resume or view highlights below">
      <div className="flex justify-center mb-10">
        <Link href={personalInfo.resumeUrl} target="_blank">
          <Button variant="primary" size="lg">
            <Download className="h-5 w-5" /> Download Resume PDF
          </Button>
        </Link>
      </div>

      <div className="max-w-3xl mx-auto">
        <Card className="mb-8">
          <h2 className="text-2xl font-bold font-[family-name:var(--font-display)] mb-1">{personalInfo.name}</h2>
          <p className="text-primary-400 font-medium mb-4">{personalInfo.title}</p>
          <div className="flex flex-wrap gap-4 text-sm text-[var(--text-secondary)]">
            <span className="flex items-center gap-1.5"><Mail className="h-4 w-4" />{personalInfo.email}</span>
            <span className="flex items-center gap-1.5"><Phone className="h-4 w-4" />{personalInfo.phone}</span>
            <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" />{personalInfo.location}</span>
          </div>
          <div className="flex gap-3 mt-3">
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white">
              <GithubIcon className="h-4 w-4" size={16} />
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white">
              <LinkedinIcon className="h-4 w-4" size={16} />
            </a>
          </div>
        </Card>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Top Skills</h3>
          <div className="flex flex-wrap gap-2">
            {topSkills.map((s) => (
              <Badge key={s.name} variant="primary">{s.name}</Badge>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Experience</h3>
          <div className="space-y-4">
            {experience.map((exp) => (
              <Card key={exp.id}>
                <h4 className="font-semibold">{exp.role}</h4>
                <p className="text-sm text-primary-400">{exp.company} &middot; {exp.type}</p>
                <p className="text-xs text-[var(--text-secondary)] mb-2">{exp.duration}</p>
                <ul className="list-disc list-inside text-sm text-[var(--text-secondary)] space-y-1">
                  {exp.responsibilities.slice(0, 4).map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Education</h3>
          {education.map((edu) => (
            <Card key={edu.institution}>
              <h4 className="font-semibold">{edu.degree} in {edu.field}</h4>
              <p className="text-sm text-primary-400">{edu.shortName}</p>
              <p className="text-xs text-[var(--text-secondary)]">{edu.duration} &middot; CPI: {edu.cpi}</p>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}
