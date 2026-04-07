import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ExternalLink, Calendar } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
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
      <Link href="/projects" className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-white mb-8 transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to Projects
      </Link>

      <div className="relative h-64 md:h-96 rounded-glass overflow-hidden mb-8">
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

      <div className="glass-card p-6 md:p-8 -mt-20 relative z-10 mx-4 md:mx-8">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <Badge variant={project.status === "Live" ? "success" : "warning"}>{project.status}</Badge>
          <Badge variant="default"><Calendar className="h-3 w-3 mr-1 inline" />{project.year}</Badge>
          <Badge variant="primary">{project.category}</Badge>
        </div>

        <h1 className="text-[length:var(--text-h1)] font-bold font-[family-name:var(--font-display)] mb-3">
          {project.title}
        </h1>
        <p className="text-[var(--text-secondary)] text-lg mb-6">{project.longDescription}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.techStack.map((tech) => (
            <TechTag key={tech} name={tech} />
          ))}
        </div>

        <div className="flex gap-3">
          {project.liveUrl && String(project.liveUrl) !== "#" && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="primary"><ExternalLink className="h-4 w-4" /> Live Demo</Button>
            </a>
          )}
          {project.githubUrl && String(project.githubUrl) !== "#" && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="outline"><GithubIcon className="h-4 w-4" size={16} /> Source Code</Button>
            </a>
          )}
        </div>
      </div>

      {project.highlights.length > 0 && (
        <div className="mt-12">
          <h2 className="text-[length:var(--text-h3)] font-bold font-[family-name:var(--font-display)] mb-6">Key Highlights</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {project.highlights.map((highlight) => (
              <div key={highlight} className="glass p-4 flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary-400 mt-2 shrink-0" />
                <p className="text-[var(--text-secondary)]">{highlight}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {project.images.length > 0 && (
        <div className="mt-12">
          <h2 className="text-[length:var(--text-h3)] font-bold font-[family-name:var(--font-display)] mb-6">Gallery</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {project.images.map((img, i) => (
              <div key={i} className="glass-card p-2 overflow-hidden">
                <Image
                  src={img}
                  alt={`${project.title} screenshot ${i + 1}`}
                  width={1200}
                  height={800}
                  className="rounded-card object-cover w-full"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-between mt-12 pt-8 border-t border-white/5">
        {prevProject ? (
          <Link href={`/projects/${prevProject.id}`} className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">{prevProject.title}</span>
          </Link>
        ) : <div />}
        {nextProject ? (
          <Link href={`/projects/${nextProject.id}`} className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-white transition-colors">
            <span className="text-sm">{nextProject.title}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        ) : <div />}
      </div>
    </PageWrapper>
  );
}
