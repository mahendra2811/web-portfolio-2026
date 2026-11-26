import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { faGooglePlay } from "@fortawesome/free-brands-svg-icons";
import { getPlayStoreProjects, getProjectLogo } from "@/data/projects";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { TextReveal } from "@/components/motion/TextReveal";

export function PlayStoreApps() {
  const apps = getPlayStoreProjects();

  return (
    <section id="play-store-apps" className="relative overflow-hidden py-section-sm lg:py-section">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(34,197,94,0.09),transparent_58%)]" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-400/20 bg-green-400/5 px-3 py-1.5 text-xs font-semibold tracking-[0.16em] text-green-300 uppercase">
            <FontAwesomeIcon icon={faGooglePlay} className="h-3 w-3" /> Available on Google Play
          </span>
          <TextReveal
            text="Apps, made for everyday life"
            as="h2"
            className="justify-center font-[family-name:var(--font-display)] text-[length:var(--text-h2)] font-bold"
          />
          <p className="mt-3 text-[var(--text-secondary)]">
            Explore the Android apps I’ve designed, built, and brought to Google Play.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {apps.map((app, index) => {
            const logo = getProjectLogo(app);
            return (
              <ScrollReveal key={app.id} delay={index * 0.08} className="h-full">
                <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] p-5 shadow-[0_18px_60px_-35px_rgba(0,0,0,0.9)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-green-300/30 hover:bg-white/[0.055] hover:shadow-[0_24px_70px_-35px_rgba(34,197,94,0.28)] sm:p-6">
                  <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-green-300/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="flex items-start gap-4">
                    <div className="relative h-[4.5rem] w-[4.5rem] shrink-0 overflow-hidden rounded-[1.25rem] border border-white/10 bg-black/20 shadow-lg shadow-black/20">
                      {logo ? (
                        <Image src={logo} alt={`${app.title} app icon`} fill sizes="72px" className="object-cover" />
                      ) : (
                        <div className="grid h-full place-items-center text-xl font-bold text-white">{app.title[0]}</div>
                      )}
                    </div>
                    <div className="min-w-0 pt-1">
                      <span className="text-[10px] font-semibold tracking-[0.16em] text-green-300/80 uppercase">Android app</span>
                      <h3 className="mt-1 text-lg leading-tight font-semibold text-[var(--text-primary)]">{app.title.split(" — ")[0]}</h3>
                      <span className="mt-2 inline-flex items-center gap-1.5 text-xs text-white/45">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
                        On Google Play
                      </span>
                    </div>
                  </div>

                  <p className="mt-5 min-h-[3.5rem] text-sm leading-relaxed text-[var(--text-secondary)]">{app.shortDescription}</p>

                  <div className="mt-6 grid grid-cols-2 gap-2.5">
                    <a
                      href={app.playStoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/play relative inline-flex min-h-11 items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#22c55e] px-3 text-sm font-semibold text-[#07140b] shadow-[0_8px_24px_-10px_rgba(34,197,94,0.8)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#4ade80] hover:shadow-[0_12px_30px_-10px_rgba(34,197,94,0.9)] active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-300"
                      aria-label={`Download ${app.title} from Google Play`}
                    >
                      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover/play:translate-x-full" />
                      <FontAwesomeIcon icon={faGooglePlay} className="relative h-4 w-4" />
                      <span className="relative">Get app</span>
                      <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="relative h-3 w-3 opacity-65" />
                    </a>
                    <Link
                      href={`/projects/${app.id}`}
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.035] px-3 text-sm font-medium text-[var(--text-primary)] transition hover:border-white/20 hover:bg-white/[0.08] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50"
                    >
                      Details <FontAwesomeIcon icon={faArrowRight} className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
