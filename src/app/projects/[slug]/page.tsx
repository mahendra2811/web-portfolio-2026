import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faUpRightFromSquare,
  faCalendarDays,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { projects } from "@/data/projects";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Badge } from "@/components/ui/Badge";
import { TechTag } from "@/components/ui/TechTag";
import { Button } from "@/components/ui/Button";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: project.title,
    description: project.shortDescription,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);
  if (!project) notFound();

  const currentIndex = projects.findIndex((p) => p.id === slug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <PageWrapper className="py-section-sm lg:py-section">
      <Link
        href="/projects"
        className="mb-8 inline-flex items-center gap-2 text-[var(--text-secondary)] transition-colors hover:text-white"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="h-4 w-4" /> Back to Projects
      </Link>

      <div className="rounded-glass relative mb-8 h-64 overflow-hidden md:h-96">
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      </div>

      <div className="glass-card relative z-10 mx-4 -mt-20 p-6 md:mx-8 md:p-8">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <Badge variant={project.status === "Live" ? "success" : "warning"}>
            {project.status}
          </Badge>
          <Badge variant="default">
            <FontAwesomeIcon
              icon={faCalendarDays}
              className="mr-1.5 h-3 w-3"
              style={{ color: "#6366F1" }}
            />
            {project.year}
          </Badge>
          <Badge variant="primary">{project.category}</Badge>
        </div>

        <h1 className="mb-3 font-[family-name:var(--font-display)] text-[length:var(--text-h1)] font-bold">
          {project.title}
        </h1>
        <p className="mb-6 text-lg text-[var(--text-secondary)]">{project.longDescription}</p>

        <div className="mb-6 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <TechTag key={tech} name={tech} />
          ))}
        </div>

        <div className="flex gap-3">
          {project.liveUrl && String(project.liveUrl) !== "#" && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="primary">
                <FontAwesomeIcon icon={faUpRightFromSquare} className="h-4 w-4" /> Live Demo
              </Button>
            </a>
          )}
          {project.githubUrl && String(project.githubUrl) !== "#" && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="outline">
                <FontAwesomeIcon icon={faGithub} className="h-4 w-4" /> Source Code
              </Button>
            </a>
          )}
        </div>
      </div>

      {project.highlights.length > 0 && (
        <div className="mt-12">
          <h2 className="mb-6 font-[family-name:var(--font-display)] text-[length:var(--text-h3)] font-bold">
            Key Highlights
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {project.highlights.map((highlight) => (
              <div key={highlight} className="glass flex items-start gap-3 p-4">
                <FontAwesomeIcon
                  icon={faCheck}
                  className="mt-1 h-3.5 w-3.5 shrink-0"
                  style={{ color: "#10B981" }}
                />
                <p className="text-[var(--text-secondary)]">{highlight}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {project.images.length > 0 && (
        <div className="mt-12">
          <h2 className="mb-6 font-[family-name:var(--font-display)] text-[length:var(--text-h3)] font-bold">
            Gallery
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {project.images.map((img, i) => (
              <div key={i} className="glass-card overflow-hidden p-2">
                <Image
                  src={img}
                  alt={`${project.title} screenshot ${i + 1}`}
                  width={1200}
                  height={800}
                  className="rounded-card w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-12 flex justify-between border-t border-white/5 pt-8">
        {prevProject ? (
          <Link
            href={`/projects/${prevProject.id}`}
            className="flex items-center gap-2 text-[var(--text-secondary)] transition-colors hover:text-white"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="h-4 w-4" />
            <span className="text-sm">{prevProject.title}</span>
          </Link>
        ) : (
          <div />
        )}
        {nextProject ? (
          <Link
            href={`/projects/${nextProject.id}`}
            className="flex items-center gap-2 text-[var(--text-secondary)] transition-colors hover:text-white"
          >
            <span className="text-sm">{nextProject.title}</span>
            <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" />
          </Link>
        ) : (
          <div />
        )}
      </div>
    </PageWrapper>
  );
}
