import type { Metadata } from "next";
import Link from "next/link";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://pooniya.com";

type AppEntry = {
  slug: string;
  name: string;
  identifier: string;
  identifierLabel: string;
  platform: string;
  tagline: string;
};

const apps: AppEntry[] = [
  {
    slug: "pdfnest",
    name: "pdfNest",
    identifier: "com.pooniya.pdfnest",
    identifierLabel: "Android · Play Store",
    platform: "Android",
    tagline:
      "Free, on-device PDF reader, scanner, editor, and 23 utility tools. Your files never leave your device.",
  },
  {
    slug: "callnest",
    name: "callNest",
    identifier: "com.callvault.app",
    identifierLabel: "Android · Sideload + Play Store",
    platform: "Android",
    tagline:
      "Call CRM for Indian small-business owners. Tags, notes, follow-ups, and exports — all on-device.",
  },
  {
    slug: "calcmaster",
    name: "CalcMaster",
    identifier: "com.calcmaster.app",
    identifierLabel: "Android · Play Store",
    platform: "Android",
    tagline:
      "36 offline calculators across Finance and Math, English + Hindi. No ads, no login.",
  },
  {
    slug: "bmi-calculator",
    name: "BMI Calculator",
    identifier: "com.mahendra.bmicalculator",
    identifierLabel: "Android · Play Store",
    platform: "Android",
    tagline:
      "Free BMI calculator with on-device history. Your health data never leaves your phone.",
  },
  {
    slug: "unit-converter",
    name: "Unit Converter",
    identifier: "com.mahi0092.unitconverter",
    identifierLabel: "Android · Play Store",
    platform: "Android",
    tagline:
      "Offline unit conversions across length, weight, temperature, currency, and more.",
  },
  {
    slug: "moneynest",
    name: "moneyNest",
    identifier: "com.pooniya.moneynest",
    identifierLabel: "Android · Play Store",
    platform: "Android",
    tagline:
      "On-device-only expense tracker for Indian users. Voice entry runs on-device. No cloud.",
  },
  {
    slug: "fixtools",
    name: "FixTools (Web)",
    identifier: "freefixtools.pooniya.com",
    identifierLabel: "Web",
    platform: "Web",
    tagline:
      "~100 PDF, image, calculator, and developer utilities — all client-side. Files never uploaded.",
  },
  {
    slug: "fixtools-twa",
    name: "FixTools (Android)",
    identifier: "com.freefixtools.app",
    identifierLabel: "Android · Play Store (TWA)",
    platform: "Android",
    tagline:
      "Android Trusted Web Activity wrapper around the FixTools website.",
  },
];

export const metadata: Metadata = {
  title: "Privacy Policies — Mahendra Singh Puniya",
  description:
    "Privacy policies for all apps and websites by Mahendra Singh Puniya: pdfNest, callNest, CalcMaster, BMI Calculator, Unit Converter, moneyNest, and FixTools.",
  alternates: { canonical: `${SITE}/privacy` },
  openGraph: {
    title: "Privacy Policies — Mahendra Singh Puniya",
    description:
      "Privacy policies for all apps by Mahendra Singh Puniya. On-device first. No ads. DPDP Act 2023 compliant.",
    url: `${SITE}/privacy`,
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function PrivacyIndexPage() {
  return (
    <main className="min-h-screen bg-white py-16 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <div className="mx-auto max-w-3xl px-6">
        <header className="mb-12">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Legal
          </p>
          <h1 className="mb-4 text-4xl font-bold tracking-tight">
            Privacy Policies
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-300">
            Privacy policies for every app and website built by{" "}
            <strong>Mahendra Singh Puniya</strong>. Every product follows the
            same principle: your data stays on your device whenever
            technically possible, and we collect only the minimum
            diagnostics needed to keep the apps fast and stable.
          </p>
          <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
            All policies are designed to comply with the Digital Personal
            Data Protection Act, 2023 (DPDP Act), Google Play Developer
            Program Policies, and applicable GDPR provisions.
          </p>
        </header>

        <ul className="space-y-3">
          {apps.map((app) => (
            <li key={app.slug}>
              <Link
                href={`/privacy/${app.slug}`}
                className="block rounded-2xl border border-neutral-200 bg-white p-5 transition hover:border-indigo-400 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-indigo-500"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h2 className="text-xl font-semibold text-neutral-900 group-hover:text-indigo-600 dark:text-neutral-50">
                    {app.name}
                  </h2>
                  <span className="shrink-0 rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
                    {app.identifierLabel}
                  </span>
                </div>
                <p className="mt-1 font-mono text-xs text-neutral-500 dark:text-neutral-400">
                  {app.identifier}
                </p>
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
                  {app.tagline}
                </p>
                <p className="mt-3 text-sm font-medium text-indigo-600 dark:text-indigo-400">
                  Read privacy policy →
                </p>
              </Link>
            </li>
          ))}
        </ul>

        <footer className="mt-12 border-t border-neutral-200 pt-6 dark:border-neutral-800">
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Have a question about any of these policies? Email{" "}
            <a
              href="mailto:mahendrapuniya92@gmail.com"
              className="text-indigo-600 hover:underline dark:text-indigo-400"
            >
              mahendrapuniya92@gmail.com
            </a>
            .
          </p>
        </footer>
      </div>
    </main>
  );
}
