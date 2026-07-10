import type { Metadata } from "next";
import Image from "next/image";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { Section } from "@/components/layout/Section";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://pooniya.com";

export const metadata: Metadata = {
  title: "Brand Assets",
  description: "Logo system, favicons, and brand marks for Mahendra Singh Puniya.",
  alternates: { canonical: `${SITE}/brand` },
  robots: { index: false, follow: false },
};

interface AssetCardProps {
  label: string;
  src: string;
  alt: string;
  dark?: boolean;
  aspect?: string;
}

function AssetCard({ label, src, alt, dark = true, aspect = "aspect-[4/3]" }: AssetCardProps) {
  return (
    <div className="glass-card overflow-hidden rounded-2xl">
      <div
        className={`relative flex ${aspect} items-center justify-center p-8 ${dark ? "bg-[#080B10]" : "bg-white"}`}
      >
        <Image src={src} alt={alt} fill className="object-contain p-4" sizes="(max-width: 768px) 100vw, 33vw" />
      </div>
      <p className="border-t border-white/5 px-4 py-3 text-sm font-medium text-white/70">{label}</p>
    </div>
  );
}

const ASSETS: AssetCardProps[] = [
  { label: "Primary Logo", src: "/brand/logo-primary.png", alt: "Primary lockup — icon and full wordmark" },
  { label: "Navbar Icon", src: "/brand/logo-navbar.png", alt: "Navbar monogram icon" },
  { label: "App Icon / PWA Icon", src: "/brand/icon-512.png", alt: "App icon tile, 512×512" },
  { label: "Favicon (512×512)", src: "/brand/favicon-512.png", alt: "Favicon source tile" },
  {
    label: "Open Graph / Social Share",
    src: "/brand/og-image.jpg",
    alt: "Open Graph share card",
    aspect: "aspect-[1200/630]",
  },
  { label: "Square Link Preview", src: "/brand/link-preview-square.jpg", alt: "Square social link preview" },
  {
    label: "Loader Storyboard (reference only)",
    src: "/brand/loader-storyboard.png",
    alt: "Particle-to-monogram brand reveal storyboard",
    aspect: "aspect-[1672/941]",
  },
  {
    label: "Email / Recruiter Brand Mark",
    src: "/brand/email-brand-mark.png",
    alt: "Email signature brand mark",
    dark: false,
    aspect: "aspect-[16/9]",
  },
];

export default function BrandPage() {
  return (
    <div className="pb-24">
      <Section className="pt-20 text-center">
        <div className="mb-6 flex justify-center">
          <BrandLogo variant="primary" />
        </div>
        <h1 className="font-[family-name:var(--font-display)] text-[length:var(--text-h1)] font-bold">
          Brand Assets
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-[var(--text-secondary)]">
          The complete MP monogram system — logo lockups, favicons, app icons, and social
          preview cards used across pooniya.com.
        </p>
      </Section>

      <Section title="Asset Library">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ASSETS.map((asset) => (
            <AssetCard key={asset.src} {...asset} />
          ))}
        </div>
      </Section>
    </div>
  );
}
