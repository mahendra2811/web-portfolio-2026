import Link from "next/link";
import { personalInfo } from "@/data/personal";
import { navigation } from "@/data/navigation";
import { SocialLinks } from "@/components/ui/SocialLinks";

export function Footer() {
  return (
    <footer className="relative mt-section border-t border-white/5">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold font-[family-name:var(--font-display)] bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent mb-3">
              {personalInfo.name}
            </h3>
            <p className="text-sm text-[var(--text-secondary)] max-w-xs">
              {personalInfo.bio.short}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-[var(--text-secondary)] hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Connect</h4>
            <SocialLinks />
            <p className="mt-3 text-sm text-[var(--text-secondary)]">
              {personalInfo.email}
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/5 text-center text-sm text-[var(--text-secondary)]">
          &copy; {new Date().getFullYear()} {personalInfo.name}. Built with Next.js & Three.js.
        </div>
      </div>
    </footer>
  );
}
