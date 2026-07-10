import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "@/lib/fontawesome";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { BackToTop } from "@/components/ui/BackToTop";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  GoogleTagManagerHead,
  GoogleTagManagerBody,
} from "@/components/analytics/GoogleTagManager";
import { Analytics } from "@/components/analytics/Analytics";
import { SmoothScrollProvider } from "@/components/providers/SmoothScroll";
import { DeferredVfx } from "@/components/vfx/DeferredVfx";
import { PortfolioLoader } from "@/components/brand/PortfolioLoader";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  // Only weights actually used with font-[family-name:var(--font-display)]
  // across the codebase (font-semibold/bold/extrabold) — audited via grep.
  weight: ["600", "700", "800"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://pooniya.com/"),
  title: {
    default: "Mahendra Singh Puniya | Full Stack Software Engineer",
    template: "%s | Mahendra Singh Puniya",
  },
  description:
    "Software Developer with 2 years of production experience | open to Software Engineer roles | building scalable products, production systems and AI-assisted engineering workflows.",
  keywords: [
    "Mahendra Singh Puniya",
    "Mahendra Singh Pooniya",
    "Mahendra Pooniya",
    "Pooniya.com",
    "Pooniya Jodphur",
    "Software Developer",
    "Software Engineer",
    "Full-Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Open to Work",
    "Hire",
    "Portfolio",
  ],
  authors: [{ name: "Mahendra Singh Puniya" }],
  creator: "Mahendra Singh Puniya",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pooniya.com/",
    siteName: "Mahendra Singh Puniya",
    title: "Mahendra Singh Puniya | Full Stack Software Engineer",
    description:
      "Full Stack Software Engineer building scalable products, production systems and AI-assisted engineering workflows.",
    images: [
      {
        url: "/brand/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mahendra Singh Puniya — Full Stack Software Engineer",
      },
      {
        url: "/brand/link-preview-square.jpg",
        width: 1200,
        height: 1200,
        alt: "Mahendra Singh Puniya — Full Stack Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mahendra Singh Puniya | Full Stack Software Engineer",
    description:
      "Full Stack Software Engineer building scalable products, production systems and AI-assisted engineering workflows.",
    images: ["/brand/og-image.jpg"],
  },
  robots: { index: true, follow: true },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || "https://pooniya.com",
  },
  icons: {
    icon: [
      { url: "/brand/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/brand/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/brand/favicon-48.png", sizes: "48x48", type: "image/png" },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${outfit.variable} ${jakarta.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <head>
        {/* Blocking script — runs before first paint to prevent FOUC:
            1) sets data-theme from localStorage
            2) sets data-loader so the CSS backdrop (see globals.css) covers the
               page instantly on a first visit, before PortfolioLoader hydrates —
               avoids a flash of unstyled/real content under the loader.
               Key must match STORAGE_KEY in components/brand/PortfolioLoader.tsx. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')document.documentElement.setAttribute('data-theme',t);}catch(e){}try{if(!sessionStorage.getItem('mp-loader-shown-v1')){document.documentElement.setAttribute('data-loader','1');setTimeout(function(){document.documentElement.removeAttribute('data-loader');},7000);}}catch(e){}})();`,
          }}
        />
        <JsonLd />
        <GoogleTagManagerHead />
        <link rel="manifest" href="/manifest.json" />
        <link rel="alternate" type="application/rss+xml" title="Blog RSS Feed" href="/feed.xml" />
        <meta name="theme-color" content="#6366F1" />
      </head>
      <body className="flex min-h-full flex-col bg-[var(--surface)] text-[var(--text-primary)]">
        <PortfolioLoader />
        <GoogleTagManagerBody />
        <DeferredVfx />
        <ScrollProgress />
        <SmoothScrollProvider>
          <Navbar />
          <main className="flex-1 pt-16">{children}</main>
          <Footer />
        </SmoothScrollProvider>
        <BackToTop />
        <Analytics />
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
      </body>
    </html>
  );
}
