import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faArrowUpRightFromSquare,
  faTriangleExclamation,
  faFilePdf,
} from "@fortawesome/free-solid-svg-icons";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { resumes, updatingSoonNotice, type ResumeRole, type ResumeEntry } from "@/data/resumes";

interface ResumeViewProps {
  resume: ResumeEntry;
  routeSlug: string;
}

export function ResumeView({ resume, routeSlug }: ResumeViewProps) {
  const otherRoles = (Object.keys(resumes) as ResumeRole[]).filter((r) => r !== resume.role);

  return (
    <Section title={resume.label} subtitle={resume.description}>
      {/* {resume.updatingSoon && (
        <ScrollReveal>
          <Card className="mb-8 border-amber-500/30 bg-amber-500/5">
            <div className="flex items-start gap-4">
              <div className="glass rounded-card p-2">
                <FontAwesomeIcon
                  icon={faTriangleExclamation}
                  className="h-5 w-5"
                  style={{ color: "#F59E0B" }}
                />
              </div>
              <div>
                <h3 className="font-semibold text-amber-200">{updatingSoonNotice.title}</h3>
                <p className="mt-1 text-sm text-[var(--text-secondary)]">
                  {updatingSoonNotice.body}
                </p>
              </div>
            </div>
          </Card>
        </ScrollReveal>
      )} */}

      {/* <ScrollReveal>
        <Card className="mb-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <div className="glass rounded-card p-3">
                <FontAwesomeIcon
                  icon={faFilePdf}
                  className="h-6 w-6"
                  style={{ color: "#84e593" }}
                />
              </div>
              <div>
                <p className="font-semibold">{resume.downloadName}</p>
                <p className="text-xs text-[var(--text-secondary)]">
                  Route: <code className="font-[family-name:var(--font-mono)]">/{routeSlug}</code>
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href={resume.file} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="md">
                  <FontAwesomeIcon
                    icon={faArrowUpRightFromSquare}
                    className="h-4 w-4"
                    style={{ color: "#FFFFFF" }}
                  />
                  Open in new tab
                </Button>
              </Link>
              <Link href={resume.file} download={resume.downloadName}>
                <Button variant="primary" size="md">
                  <FontAwesomeIcon
                    icon={faDownload}
                    className="h-4 w-4"
                    style={{ color: "#FFFFFF" }}
                  />
                  Download PDF
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </ScrollReveal> */}

      <ScrollReveal>
        <Card className="overflow-hidden p-0">
          <object
            data={`${resume.file}#view=FitH`}
            type="application/pdf"
            className="h-[80vh] w-full"
            aria-label={resume.label}
          >
            <div className="p-8 text-center">
              <p className="mb-4 text-[var(--text-secondary)]">
                Your browser can&apos;t preview PDFs inline.
              </p>
              <Link href={resume.file} target="_blank" rel="noopener noreferrer">
                <Button variant="primary" size="md">
                  <FontAwesomeIcon
                    icon={faArrowUpRightFromSquare}
                    className="h-4 w-4"
                    style={{ color: "#FFFFFF" }}
                  />
                  Open PDF
                </Button>
              </Link>
            </div>
          </object>
        </Card>
      </ScrollReveal>
    </Section>
  );
}
