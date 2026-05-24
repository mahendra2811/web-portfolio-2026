import type { Metadata } from "next";
import {
  PrivacyPolicyPage,
  type PrivacyConfig,
} from "@/components/privacy/PrivacyPolicyPage";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://pooniya.com";

const config: PrivacyConfig = {
  app: {
    name: "FixTools (Android)",
    packageOrDomain: "com.freefixtools.app",
    platform: "Android (Google Play Store) — Trusted Web Activity (TWA)",
    distribution: "Google Play Store",
    minVersion: "Android 7.0 (API 24)",
    minVersionLabel: "Minimum Android Version",
    category: "Productivity / Tools",
    developer: "Mahendra Singh Puniya",
    developerCountry: "India",
    contactEmail: "mahendrapuniya92@gmail.com",
    policyUrl: `${SITE}/privacy/fixtools-twa`,
    effectiveDate: "2026-05-24",
    lastUpdated: "2026-05-24",
    policyVersion: "1.0",
  },
  intro: (
    <p className="prose prose-neutral dark:prose-invert">
      FixTools (Android) is a <strong>Trusted Web Activity (TWA)</strong> —
      a thin Android app that opens the website{" "}
      <a href="https://freefixtools.pooniya.com" target="_blank" rel="noreferrer">
        freefixtools.pooniya.com
      </a>{" "}
      inside an in-app browser tab powered by Chrome on your device. The App
      itself contains no business logic and no native data collection. All
      tools and processing happen in the embedded browser, on your device.
      <strong> Your files never leave your device.</strong>
    </p>
  ),
  tldr: [
    <><strong>It&apos;s a wrapper around our website.</strong> Everything that happens inside the App is exactly what happens on <a href="https://freefixtools.pooniya.com" target="_blank" rel="noreferrer">freefixtools.pooniya.com</a> — see also the <a href={`${SITE}/privacy/fixtools`}>FixTools web privacy policy</a>.</>,
    <><strong>Your files never leave your device.</strong> All PDF/image processing runs inside the embedded browser using JavaScript and WebAssembly.</>,
    <><strong>No account, no login.</strong></>,
    <><strong>No ads, no AdMob, no ad networks.</strong></>,
    <><strong>Anonymous web analytics</strong> (Google Analytics 4) run inside the embedded site. You can opt out by clearing site data from Android Settings.</>,
    <><strong>No precise location collected.</strong></>,
  ],
  notCollected: [
    <><strong>Your files</strong> — PDFs, images, documents, or any file you process with the tools. These never leave your device.</>,
    <><strong>Native Android telemetry</strong> — the App does not integrate Firebase Analytics, Crashlytics, AdMob, or any other native Android SDK that collects user data.</>,
    <><strong>Personally identifiable information (PII).</strong></>,
    <><strong>Precise or coarse location data.</strong></>,
    <><strong>Contacts, SMS, calendar, call logs, microphone audio.</strong></>,
    <><strong>Advertising identifiers</strong> — no ad SDKs are integrated.</>,
  ],
  collectedAuto: [
    <><strong>All automatic collection happens inside the embedded website</strong>, not in the native Android wrapper. The wrapper itself does not collect anything.</>,
    <><strong>Inside the embedded site, Google Analytics 4 collects:</strong> pages visited, time on page, browser and device info (user-agent, screen size), approximate country from IP, and anonymized event counts.</>,
    <><strong>Standard Android system logs</strong> — when the App is launched, the Android system logs the launch event for its own purposes (battery, foreground tracking). We do not access these logs.</>,
  ],
  permissions: [
    {
      name: "Internet (android.permission.INTERNET)",
      why: "required so the App can load the embedded website over HTTPS.",
    },
    {
      name: "Network State (android.permission.ACCESS_NETWORK_STATE)",
      why: "lets the embedded browser detect when the device is offline and show a friendly message.",
    },
  ],
  onDeviceStorage: [
    <><strong>Chrome Custom Tabs storage</strong> — the embedded browser may store cookies, localStorage, and a Service Worker cache for the embedded website on your device. This data belongs to the Chrome runtime, not to the App.</>,
    <><strong>Analytics cookies</strong> set by Google Analytics 4 (`_ga`, `_ga_*`) inside the embedded browser session.</>,
    <><strong>The App itself stores nothing</strong> — no databases, no shared preferences with user data.</>,
  ],
  thirdParties: [
    { name: "Google Analytics 4 (GA4) / Google Tag Manager", purpose: "anonymous web analytics inside the embedded site", href: "https://policies.google.com/privacy" },
    { name: "Vercel (hosts the embedded site)", purpose: "serves the website; may log standard request metadata", href: "https://vercel.com/legal/privacy-policy" },
    { name: "Google Chrome (Trusted Web Activity runtime)", purpose: "renders the website inside the App; uses the Chrome installed on your device", href: "https://policies.google.com/privacy" },
  ],
  internationalTransfers: (
    <p className="prose prose-neutral dark:prose-invert">
      The third-party services listed in §9 (Google Analytics, Vercel) may
      process the limited request metadata described in §5 on servers
      located outside India, including in the United States and the European
      Union. These providers maintain contractual safeguards (Standard
      Contractual Clauses) where applicable.
    </p>
  ),
  optOutControls: [
    <><strong>Block Google Analytics inside the embedded site</strong> by installing the official <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noreferrer">Google Analytics Opt-out Browser Add-on</a> in Chrome on your device.</>,
    <><strong>Clear embedded site data:</strong> Android Settings → Apps → Chrome → Storage → Site Settings → All sites → freefixtools.pooniya.com → Clear data.</>,
    <><strong>Clear App data:</strong> Android Settings → Apps → FixTools → Storage → Clear data.</>,
    <><strong>Uninstall:</strong> Long-press the App icon and select Uninstall.</>,
  ],
  securityNotes: [
    <>All embedded site traffic uses HTTPS (TLS 1.2+).</>,
    <>The TWA uses Digital Asset Links to verify that the App is genuinely associated with the embedded site, preventing impersonation.</>,
    <>The App itself has no privileged access to your device beyond loading a URL in a Chrome Custom Tab.</>,
    <>Despite our efforts, no method of transmission over the Internet or method of electronic storage is 100% secure.</>,
  ],
  backupNote: (
    <p className="prose prose-neutral dark:prose-invert">
      The App stores no user data of its own, so there is nothing to back up
      from the App. Embedded site data (cookies, cache) is governed by
      Chrome&apos;s own backup behaviour on your device.
    </p>
  ),
};

export const metadata: Metadata = {
  title: `${config.app.name} — Privacy Policy`,
  description:
    "Privacy policy for the FixTools Android app (Trusted Web Activity). Wraps freefixtools.pooniya.com. Your files never leave your device.",
  alternates: { canonical: config.app.policyUrl },
  openGraph: {
    title: `${config.app.name} — Privacy Policy`,
    description: "Privacy policy for FixTools Android TWA — wraps the website.",
    url: config.app.policyUrl,
    type: "article",
  },
  robots: { index: true, follow: true },
};

export default function Page() {
  return <PrivacyPolicyPage config={config} />;
}
