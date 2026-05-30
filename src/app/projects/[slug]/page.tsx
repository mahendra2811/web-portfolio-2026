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
  faUser,
  faClock,
  faBookOpen,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { projects, getProjectBanner, getProjectThumbnail, getProjectImages } from "@/data/projects";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Badge } from "@/components/ui/Badge";
import { TechTag } from "@/components/ui/TechTag";
import { Button } from "@/components/ui/Button";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.filter((p) => p.visible !== false).map((p) => ({ slug: p.id }));
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
  const project = projects.find((p) => p.id === slug && p.visible !== false);
  if (!project) notFound();

  const currentIndex = projects.findIndex((p) => p.id === slug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;
  const bannerImage = getProjectBanner(project);
  const galleryImages = getProjectImages(project);

  return (
    <PageWrapper className="py-section-sm lg:py-section">
      <Link
        href="/projects"
        className="mb-8 inline-flex items-center gap-2 text-[var(--text-secondary)] transition-colors hover:text-white"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="h-4 w-4" /> Back to Projects
      </Link>

      <div className="rounded-glass relative mb-8 h-64 overflow-hidden md:h-96">
        {bannerImage ? (
          <Image
            src={bannerImage}
            alt={project.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-linear-to-br from-indigo-900/60 via-cyan-900/30 to-slate-900" />
        )}
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

      {(project.role || project.duration) && (
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {project.role && (
            <div className="glass flex items-center gap-3 p-4">
              <FontAwesomeIcon icon={faUser} className="h-4 w-4" style={{ color: "#06B6D4" }} />
              <div>
                <p className="text-xs text-[var(--text-secondary)]">Role</p>
                <p className="font-medium">{project.role}</p>
              </div>
            </div>
          )}
          {project.duration && (
            <div className="glass flex items-center gap-3 p-4">
              <FontAwesomeIcon icon={faClock} className="h-4 w-4" style={{ color: "#6366F1" }} />
              <div>
                <p className="text-xs text-[var(--text-secondary)]">Duration</p>
                <p className="font-medium">{project.duration}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {(project.problem || project.solution || project.outcome) && (
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {project.problem && (
            <div className="glass-card p-6">
              <h3 className="mb-2 text-sm font-semibold tracking-wider text-[var(--text-secondary)] uppercase">
                Problem
              </h3>
              <p className="text-[var(--text-primary)]">{project.problem}</p>
            </div>
          )}
          {project.solution && (
            <div className="glass-card p-6">
              <h3 className="mb-2 text-sm font-semibold tracking-wider text-[var(--text-secondary)] uppercase">
                Solution
              </h3>
              <p className="text-[var(--text-primary)]">{project.solution}</p>
            </div>
          )}
          {project.outcome && (
            <div className="glass-card p-6">
              <h3 className="mb-2 text-sm font-semibold tracking-wider text-[var(--text-secondary)] uppercase">
                Outcome
              </h3>
              <p className="text-[var(--text-primary)]">{project.outcome}</p>
            </div>
          )}
        </div>
      )}

      {project.variants && project.variants.length > 0 && (
        <div className="mt-12">
          <h2 className="mb-6 font-[family-name:var(--font-display)] text-[length:var(--text-h3)] font-bold">
            Versions
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {project.variants.map((v) => (
              <div key={v.label} className="glass-card flex h-full flex-col p-6">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  {v.status && (
                    <Badge variant={v.status === "Live" ? "success" : "warning"}>{v.status}</Badge>
                  )}
                  {v.year && (
                    <Badge variant="default">
                      <FontAwesomeIcon
                        icon={faCalendarDays}
                        className="mr-1.5 h-3 w-3"
                        style={{ color: "#6366F1" }}
                      />
                      {v.year}
                    </Badge>
                  )}
                </div>

                <h3 className="mb-2 text-lg font-semibold">{v.label}</h3>
                {v.description && (
                  <p className="mb-4 text-sm text-[var(--text-secondary)]">{v.description}</p>
                )}

                {v.techStack && v.techStack.length > 0 && (
                  <div className="mb-4 flex flex-wrap gap-1.5">
                    {v.techStack.slice(0, 8).map((tech) => (
                      <TechTag key={tech} name={tech} />
                    ))}
                  </div>
                )}

                {v.highlights && v.highlights.length > 0 && (
                  <ul className="mb-4 space-y-1.5">
                    {v.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex items-start gap-2 text-sm text-[var(--text-secondary)]"
                      >
                        <FontAwesomeIcon
                          icon={faCheck}
                          className="mt-1 h-3 w-3 shrink-0"
                          style={{ color: "#10B981" }}
                        />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-auto flex items-center gap-3 border-t border-white/5 pt-4">
                  {v.liveUrl && v.liveUrl !== "#" && (
                    <a
                      href={v.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-400 hover:text-primary-300 inline-flex items-center gap-1.5 text-sm font-medium"
                    >
                      <FontAwesomeIcon icon={faUpRightFromSquare} className="h-3.5 w-3.5" /> Live
                    </a>
                  )}
                  {v.githubUrl && v.githubUrl !== "#" && (
                    <a
                      href={v.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--text-secondary)] transition-colors hover:text-white"
                    >
                      <FontAwesomeIcon icon={faGithub} className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

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

      {project.learnings && project.learnings.length > 0 && (
        <div className="mt-12">
          <h2 className="mb-6 font-[family-name:var(--font-display)] text-[length:var(--text-h3)] font-bold">
            Learnings
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {project.learnings.map((item) => (
              <li key={item} className="glass flex items-start gap-3 p-4">
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: "#06B6D4" }}
                />
                <p className="text-[var(--text-secondary)]">{item}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* {project.docs && project.docs.length > 0 && (
        <div className="mt-12">
          <h2 className="mb-6 font-[family-name:var(--font-display)] text-[length:var(--text-h3)] font-bold">
            Reference Docs
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {project.docs.map((doc) => {
              const isUrl = doc.path.startsWith("http://") || doc.path.startsWith("https://");
              const content = (
                <>
                  <FontAwesomeIcon
                    icon={faBookOpen}
                    className="h-4 w-4 shrink-0"
                    style={{ color: "#6366F1" }}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">{doc.label}</p>
                    <p className="truncate font-mono text-xs text-[var(--text-secondary)]">
                      {doc.path}
                    </p>
                  </div>
                </>
              );
              return (
                <li key={doc.path}>
                  {isUrl ? (
                    <a
                      href={doc.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass flex items-start gap-3 p-4 transition-colors hover:bg-white/5"
                    >
                      {content}
                    </a>
                  ) : (
                    <div className="glass flex items-start gap-3 p-4">{content}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )} */}

      {galleryImages.length > 0 && (
        <div className="mt-12">
          <h2 className="mb-6 font-[family-name:var(--font-display)] text-[length:var(--text-h3)] font-bold">
            Gallery
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {galleryImages.map((img, i) => (
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
