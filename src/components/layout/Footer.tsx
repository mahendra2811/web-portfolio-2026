import Link from "next/link";
import { personalInfo } from "@/data/personal";
import { navigation } from "@/data/navigation";
import { SocialLinks } from "@/components/ui/SocialLinks";

export function Footer() {
  return (
    <footer className="mt-section relative border-t border-white/5">
      <div className="via-primary-500/50 absolute top-0 right-0 left-0 h-px bg-gradient-to-r from-transparent to-transparent" />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="from-primary-400 to-accent-400 mb-3 bg-gradient-to-r bg-clip-text font-[family-name:var(--font-display)] text-lg font-bold text-transparent">
              {personalInfo.name}
            </h3>
            <p className="max-w-xs text-sm text-[var(--text-secondary)]">
              {personalInfo.bio.short}
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-white">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-[var(--text-secondary)] transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-white">Connect</h4>
            <SocialLinks />
            <p className="mt-3 text-sm text-[var(--text-secondary)]">{personalInfo.email}</p>
          </div>
        </div>

        <div className="mt-8 border-t border-white/5 pt-8 text-center text-sm text-[var(--text-secondary)]">
          &copy; {new Date().getFullYear()} {personalInfo.name}. Built with Next.js & Three.js.
        </div>
      </div>
    </footer>
  );
}
