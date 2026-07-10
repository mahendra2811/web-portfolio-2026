import Link from "next/link";
import {
  Briefcase,
  Clock,
  MapPin,
  Laptop,
  GraduationCap,
  CalendarClock,
  Download,
  Mail,
  Phone,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { GlowOrb } from "@/components/vfx/GlowOrb";
import { GithubIcon, LinkedinIcon, LeetCodeIcon } from "@/components/ui/Icons";
import { personalInfo, jobSearch } from "@/data/personal";

const { bio } = personalInfo;

type Fact = { icon: LucideIcon; label: string; value: string };

const facts: Fact[] = [
  {
    icon: Briefcase,
    label: "Currently",
    value: `${jobSearch.currentRole}`,
  },
  {
    icon: CalendarClock,
    label: "Experience",
    value: `${jobSearch.experienceYears} years `,
  },
  // { icon: Clock, label: "Availability", value: jobSearch.availability },
  // { icon: Laptop, label: "Work setup", value: jobSearch.workSetup.join(" · ") },
  // { icon: MapPin, label: "Location", value: jobSearch.location },
  { icon: GraduationCap, label: "Education", value: jobSearch.education },
];

export function OpenToWork() {
  if (!jobSearch.openToWork) return null;

  return (
    <section className="py-section-sm lg:py-section relative overflow-hidden">
      <GlowOrb
        color="rgba(16, 185, 129, 0.10)"
        size={480}
        className="top-0 left-1/2 -translate-x-1/2"
      />
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div
            className="glass-card-vfx liquid-metal-border relative overflow-hidden p-6 sm:p-8 md:p-10"
            data-reveal
          >
            {/* Header: status + location */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <span className="rounded-tag inline-flex items-center gap-2 border border-emerald-500/30 bg-emerald-500/15 px-3 py-1.5 text-xs font-semibold tracking-wide text-emerald-300 uppercase">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </span>
                Open to Work
              </span>
              <span className="inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)]">
                <MapPin size={15} className="text-accent-400" />
                {jobSearch.location}
              </span>
            </div>

            {/* Headline */}
            <h2 className="mb-3 font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-tight font-bold">
              Open to{" "}
              <span className="from-primary-400 to-accent-400 text-glow bg-gradient-to-r bg-clip-text text-transparent">
                {jobSearch.targetRoles.join(" & ")}
              </span>{" "}
              roles
            </h2>
            <p className="mb-8 max-w-2xl text-[var(--text-secondary)]">{bio.short}</p>

            {/* Fact grid — the recruiter scan */}
            <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {facts.map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="glass rounded-card flex items-start gap-3 border border-white/5 p-4"
                >
                  <span className="bg-primary-500/15 text-primary-300 mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl">
                    <Icon size={17} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs tracking-wide text-[var(--text-secondary)]/70 uppercase">
                      {label}
                    </p>
                    <p className="text-sm font-medium text-[var(--text-primary)]">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Core stack */}
            {/* <div className="mb-8">
              <p className="mb-3 text-xs tracking-wide text-[var(--text-secondary)]/70 uppercase">
                Core stack
              </p>
              <div className="flex flex-wrap gap-2">
                {jobSearch.coreStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-tag border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-[var(--text-secondary)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div> */}

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3">
              {/* <a
                href={personalInfo.resumeUrl}
                download
                className="chrome-button glass-button bg-primary-500/20 border-primary-500/30 hover:bg-primary-500/30 hover:shadow-glow-primary rounded-button inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white transition-all duration-300"
              >
                <Download size={17} />
                Download Resume
              </a> */}
              {/* phone */}
              <a
                href={`tel:${personalInfo.phone}`}
                aria-label="Call"
                className="glass-button rounded-button inline-flex items-center gap-2 border-white/15 px-5 py-3 text-sm font-medium text-white/80 transition-all duration-300 hover:text-white"
              >
                <Phone size={16} />
                {personalInfo.phone}
              </a>
              {/* email */}
              <a
                href={`mailto:${personalInfo.email}`}
                className="glass-button rounded-button inline-flex items-center gap-2 border-white/15 px-5 py-3 text-sm font-medium text-white/80 transition-all duration-300 hover:text-white"
              >
                <Mail size={16} />
                {personalInfo.email}
              </a>
              {/* LinkedIn */}
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="glass-button rounded-button inline-flex items-center gap-2 border-white/15 px-5 py-3 text-sm font-medium text-white/80 transition-all duration-300 hover:text-white"
              >
                <LinkedinIcon size={16} />
                @mahendrapuniya
              </a>
              {/* github */}
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="glass-button rounded-button inline-flex items-center gap-2 border-white/15 px-5 py-3 text-sm font-medium text-white/80 transition-all duration-300 hover:text-white"
              >
                <GithubIcon size={16} />
                @mahendra2811
              </a>
              {/* leetcode */}
              {/* <a
                href={personalInfo.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LeetCode"
                className="glass-button rounded-button inline-flex items-center gap-2 border-white/15 px-5 py-3 text-sm font-medium text-white/80 transition-all duration-300 hover:text-white"
              >
                <LeetCodeIcon size={16} />
                @mahendra92
              </a> */}
              <Link
                href="/contact"
                className="text-accent-300 hover:text-accent-200 inline-flex items-center gap-1.5 px-2 py-3 text-sm font-medium transition-colors"
              >
                Contact form
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
