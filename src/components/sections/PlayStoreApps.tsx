import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { getPlayStoreProjects, getProjectLogo } from "@/data/projects";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { TextReveal } from "@/components/motion/TextReveal";

export function PlayStoreApps() {
  const apps = getPlayStoreProjects();

  return (
    <section id="play-store-apps" className="relative overflow-hidden py-section-sm lg:py-section">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(34,197,94,0.09),transparent_58%)]" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-10">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-400/20 bg-green-400/5 px-3 py-1.5 text-xs font-semibold tracking-[0.16em] text-green-300 uppercase">
            <GooglePlayMark className="h-3.5 w-3.5" /> Available on Google Play
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

        <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto overflow-y-visible px-4 py-3 [scrollbar-width:thin] [scrollbar-color:rgba(74,222,128,0.35)_transparent] sm:mx-0 sm:gap-4 sm:px-3 lg:gap-5 lg:px-4">
          {apps.map((app, index) => {
            const logo = getProjectLogo(app);
            return (
              <ScrollReveal key={app.id} delay={index * 0.08} className="h-full w-[264px] shrink-0 snap-start sm:w-[300px] lg:w-[calc((100%-4rem)/5)]">
                <article className="group relative h-full">
                  <Link href={`/projects/${app.id}`} aria-label={`View ${app.title} project details`} className="absolute inset-0 z-0 rounded-2xl border border-white/10 bg-white/[0.035] shadow-[0_18px_60px_-35px_rgba(0,0,0,0.9)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-green-300/30 hover:bg-white/[0.055] hover:shadow-[0_24px_70px_-35px_rgba(34,197,94,0.28)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-300 sm:rounded-3xl" />
                  <div className="pointer-events-none relative z-10 flex h-full flex-col p-3.5 sm:p-4 lg:p-4">
                  <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-green-300/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-black/20 shadow-lg shadow-black/20 sm:h-14 sm:w-14 sm:rounded-2xl">
                      {logo ? (
                        <Image src={logo} alt={`${app.title} app icon`} fill sizes="56px" className="object-cover" />
                      ) : (
                        <div className="grid h-full place-items-center text-xl font-bold text-white">{app.title[0]}</div>
                      )}
                    </div>
                    <h3 className="min-w-0 text-base leading-tight font-semibold text-[var(--text-primary)] sm:text-lg">{app.title.split(" — ")[0]}</h3>
                  </div>

                  <p className="mt-3 line-clamp-2 min-h-10 text-xs leading-relaxed text-[var(--text-secondary)] sm:mt-4 sm:text-sm">{app.shortDescription}</p>

                  <div className="mt-4 sm:mt-5">
                    <a
                      href={app.playStoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/play pointer-events-auto relative z-20 inline-flex min-h-9 w-full items-center justify-center gap-1.5 overflow-hidden rounded-lg bg-[#22c55e] px-2 text-xs font-semibold text-[#07140b] shadow-[0_8px_24px_-10px_rgba(34,197,94,0.8)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#4ade80] hover:shadow-[0_12px_30px_-10px_rgba(34,197,94,0.9)] active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-300 sm:min-h-10 sm:gap-2 sm:rounded-xl sm:px-3 sm:text-sm"
                      aria-label={`Download ${app.title} from Google Play`}
                    >
                      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover/play:translate-x-full" />
                      <GooglePlayMark className="relative h-4 w-4" />
                      <span className="relative">Get app</span>
                      <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="relative h-3 w-3 opacity-65" />
                    </a>
                  </div>
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

function GooglePlayMark({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none">
      <path d="M3.6 2.8c-.4.4-.6 1-.6 1.8v14.8c0 .8.2 1.4.6 1.8L13 12 3.6 2.8Z" fill="#34A853" />
      <path d="m16.2 15.2-3.2-3.2 3.2-3.2 3.9 2.2c1.2.7 1.2 1.3 0 2l-3.9 2.2Z" fill="#FBBC04" />
      <path d="M3.6 2.8 13 12l3.2-3.2-9.8-5.5c-1.1-.6-2.1-.8-2.8-.5Z" fill="#4285F4" />
      <path d="M3.6 21.2 13 12l3.2 3.2-9.8 5.5c-1.1.6-2.1.8-2.8.5Z" fill="#EA4335" />
    </svg>
  );
}
