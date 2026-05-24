import type { Metadata } from "next";
import {
  PrivacyPolicyPage,
  type PrivacyConfig,
} from "@/components/privacy/PrivacyPolicyPage";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://pooniya.com";

const config: PrivacyConfig = {
  app: {
    name: "FixTools",
    packageOrDomain: "freefixtools.pooniya.com",
    packageLabel: "Website",
    platform: "Web (any modern browser)",
    distribution: "Web — open the site in any browser",
    minVersion: "Chrome 100+ / Firefox 100+ / Safari 16+ (modern browsers)",
    minVersionLabel: "Supported Browsers",
    category: "Productivity / Web Tools",
    developer: "Mahendra Singh Puniya",
    developerCountry: "India",
    contactEmail: "mahendrapuniya92@gmail.com",
    policyUrl: `${SITE}/privacy/fixtools`,
    effectiveDate: "2026-05-24",
    lastUpdated: "2026-05-24",
    policyVersion: "1.0",
  },
  intro: (
    <p className="prose prose-neutral dark:prose-invert">
      FixTools (<a href="https://freefixtools.pooniya.com" target="_blank" rel="noreferrer">freefixtools.pooniya.com</a>)
      is a free, privacy-first, browser-based platform offering ~100 PDF,
      image, calculator, developer, and text utilities. <strong>All file
      processing happens entirely in your browser — your files NEVER leave
      your device.</strong> No upload to any server, ever.
    </p>
  ),
  tldr: [
    <><strong>Your files never leave your browser.</strong> Every PDF merge, image resize, format conversion, and utility runs client-side in your browser tab using JavaScript and WebAssembly.</>,
    <><strong>No account, no login, no email required.</strong></>,
    <><strong>No ads, no AdMob, no ad networks.</strong></>,
    <><strong>Anonymous web analytics</strong> (Google Analytics 4) are used to understand which tools people use. You can opt out via your browser&apos;s Do Not Track signal or by blocking analytics with a browser extension.</>,
    <><strong>No precise location collected.</strong> Only coarse country-level region from Google Analytics.</>,
    <><strong>For the Android version</strong> of FixTools (a TWA wrapper around this site), see the separate <a href={`${SITE}/privacy/fixtools-twa`}>FixTools Android privacy policy</a>.</>,
  ],
  notCollected: [
    <><strong>Your files</strong> — PDFs, images, documents, or any file you process with the tools. These never leave your browser.</>,
    <><strong>Your file output</strong> — converted, merged, resized, or otherwise processed results. Downloaded directly from your browser.</>,
    <><strong>Personally identifiable information (PII)</strong> — name, email, phone number, address. The Site does not have signup or login.</>,
    <><strong>Precise location data.</strong></>,
    <><strong>Form input from the calculator/utility tools</strong> — the values you enter into calculators are processed entirely in your browser.</>,
    <><strong>Advertising identifiers</strong> — no ad networks are integrated.</>,
  ],
  collectedAuto: [
    <><strong>Pages you visit</strong> on the Site (page URL, referrer, time on page) — collected by Google Analytics 4.</>,
    <><strong>Approximate location</strong> derived from your IP (country / region level only).</>,
    <><strong>Browser and device information</strong> — user-agent string, screen size, language, operating system.</>,
    <><strong>Anonymized event counts</strong> such as &quot;PDF merge clicked&quot; or &quot;image resized&quot;, without your file content.</>,
    <><strong>A first-party analytics cookie</strong> (set by Google Analytics) used to count returning vs new visitors.</>,
  ],
  onDeviceStorage: [
    <><strong>Browser localStorage</strong> — your preference settings (theme, language, recently-used tools list). Stored only in your browser.</>,
    <><strong>Analytics cookie</strong> set by Google Analytics 4 (`_ga`, `_ga_*`), typically with a 2-year expiry. You can delete this in your browser settings.</>,
    <><strong>Service Worker cache</strong> (if your browser caches the Site) so the Site loads faster on repeat visits. Contains only the Site&apos;s code, not your files.</>,
  ],
  thirdParties: [
    { name: "Google Analytics 4 (GA4) / Google Tag Manager", purpose: "anonymous web analytics — page views, referrers, device categories. IP anonymization is enabled.", href: "https://policies.google.com/privacy" },
    { name: "Vercel (hosting provider)", purpose: "serves the static Site assets; may log standard request metadata (IP, user-agent, status code) for security and operations", href: "https://vercel.com/legal/privacy-policy" },
    { name: "Cloudflare / Vercel Edge Network", purpose: "CDN and DDoS protection at the network edge" },
  ],
  internationalTransfers: (
    <p className="prose prose-neutral dark:prose-invert">
      The third-party services listed in §9 (Google Analytics, Vercel) may
      process the limited request metadata described in §5 on servers
      located outside India, including in the United States and the European
      Union. These providers maintain contractual safeguards (Standard
      Contractual Clauses) where applicable. By continuing to use the Site,
      you consent to this processing.
    </p>
  ),
  optOutControls: [
    <><strong>Block Google Analytics</strong> by enabling Do Not Track in your browser, by installing a content blocker such as uBlock Origin, or by installing the official <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noreferrer">Google Analytics Opt-out Browser Add-on</a>.</>,
    <><strong>Clear cookies and storage</strong> via your browser&apos;s site settings — Settings → Privacy → Site settings → All sites → freefixtools.pooniya.com → Clear data.</>,
    <><strong>Use private/incognito mode</strong> — analytics cookies will be discarded when the window is closed.</>,
    <><strong>Stop using the Site.</strong> Closing the tab ends all data collection by us.</>,
  ],
  securityNotes: [
    <>The Site is served exclusively over HTTPS (TLS 1.2+).</>,
    <>Because every tool runs in your browser, there is no server-side copy of your files that could be breached.</>,
    <>Standard web security headers (Content-Security-Policy, X-Frame-Options, etc.) are configured at the hosting layer.</>,
    <>Despite our efforts, no method of transmission over the Internet or method of electronic storage is 100% secure.</>,
  ],
  backupNote: (
    <p className="prose prose-neutral dark:prose-invert">
      The Site does not store or back up any user-provided files anywhere.
      Processed file output is generated in your browser and offered to you
      as a direct download. We never have a copy of what you process.
    </p>
  ),
};

export const metadata: Metadata = {
  title: `${config.app.name} — Privacy Policy`,
  description:
    "Privacy policy for FixTools (freefixtools.pooniya.com). 100% client-side processing — your files never leave your browser. No ads.",
  alternates: { canonical: config.app.policyUrl },
  openGraph: {
    title: `${config.app.name} — Privacy Policy`,
    description: "FixTools privacy policy — client-side PDF/image tools, no upload.",
    url: config.app.policyUrl,
    type: "article",
  },
  robots: { index: true, follow: true },
};

export default function Page() {
  return <PrivacyPolicyPage config={config} />;
}
