import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  id?: string;
  title?: string;
  subtitle?: string;
  className?: string;
}

export function Section({ children, id, title, subtitle, className }: SectionProps) {
  return (
    <section id={id} className={cn("py-section-sm lg:py-section", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {(title || subtitle) && (
          <div className="mb-12 text-center">
            {title && (
              <h2 className="font-[family-name:var(--font-display)] text-[length:var(--text-h2)] font-bold">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mx-auto mt-3 max-w-2xl text-lg text-[var(--text-secondary)]">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
