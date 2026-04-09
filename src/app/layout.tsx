import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "@/lib/fontawesome";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { BackToTop } from "@/components/ui/BackToTop";
import { DynamicCursor } from "@/components/ui/DynamicCursor";
import { JsonLd } from "@/components/seo/JsonLd";
import { SmoothScrollProvider } from "@/components/providers/SmoothScroll";
import { NoiseOverlay } from "@/components/vfx/NoiseOverlay";
import { CursorGlow } from "@/components/vfx/CursorGlow";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
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
    default: "Mahendra Singh Puniya — Senior Frontend Developer",
    template: "%s | Mahendra Singh Puniya",
  },
  description: "Full-stack developer specializing in React, Next.js, and modern web technologies.",
  keywords: [
    "Mahendra Singh Puniya",
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "Portfolio",
  ],
  authors: [{ name: "Mahendra Singh Puniya" }],
  creator: "Mahendra Singh Puniya",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pooniya.com/",
    siteName: "Mahendra Singh Puniya",
    title: "Mahendra Singh Puniya — Senior Frontend Developer",
    description: "Full-stack developer building performant, beautiful web experiences.",
    images: [
      { url: "/og-image.png", width: 1200, height: 630, alt: "Mahendra Singh Puniya Portfolio" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mahendra Singh Puniya — Senior Frontend Developer",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${jakarta.variable} ${jetbrains.variable} h-full antialiased`}
      style={{ colorScheme: "dark" }}
    >
      <head>
        <JsonLd />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#6366F1" />
      </head>
      <body className="flex min-h-full flex-col bg-[var(--surface)] text-[var(--text-primary)]">
        <NoiseOverlay />
        <CursorGlow />
        <ScrollProgress />
        <DynamicCursor />
        <SmoothScrollProvider>
          <Navbar />
          <main className="flex-1 pt-16">{children}</main>
          <Footer />
        </SmoothScrollProvider>
        <BackToTop />
      </body>
    </html>
  );
}
