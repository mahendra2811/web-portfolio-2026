import Image from "next/image";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  variant?: "navbar" | "primary" | "icon";
  showSubtitle?: boolean;
  className?: string;
}

const ICON_SIZE: Record<NonNullable<BrandLogoProps["variant"]>, string> = {
  navbar: "h-8 w-auto sm:h-9",
  primary: "h-14 w-auto sm:h-20",
  icon: "h-8 w-auto",
};

/**
 * Core brand mark: MP monogram icon + wordmark, composed from the
 * transparent icon asset in /public/brand plus real (accessible, i18n-ready)
 * HTML text — never baked into a flattened image.
 */
export function BrandLogo({ variant = "navbar", showSubtitle = true, className }: BrandLogoProps) {
  const isNavbar = variant === "navbar";
  const isPrimary = variant === "primary";

  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <Image
        src="/brand/logo-navbar.png"
        alt="Mahendra Singh Puniya — MP monogram logo"
        width={220}
        height={190}
        priority={variant !== "icon"}
        className={cn(
          "object-contain drop-shadow-[0_0_10px_rgba(59,130,246,0.4)]",
          ICON_SIZE[variant],
        )}
      />

      {variant !== "icon" && (
        <span
          className={cn(
            "flex-col leading-none",
            isNavbar ? "hidden sm:flex" : "flex",
          )}
        >
          <span
            className={cn(
              "font-[family-name:var(--font-display)] font-bold text-white",
              isPrimary ? "text-2xl sm:text-4xl" : "text-base sm:text-lg",
            )}
          >
            {isPrimary ? "Mahendra Singh Puniya" : "Mahendra"}
          </span>
          {showSubtitle && (
            <span
              className={cn(
                "font-mono tracking-widest text-[#3B82F6] uppercase",
                isPrimary ? "mt-1 text-xs sm:text-sm" : "hidden text-[10px] md:inline",
              )}
            >
              Software Engineer
            </span>
          )}
        </span>
      )}
    </span>
  );
}
