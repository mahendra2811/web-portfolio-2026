import type { Metadata } from "next";
import {
  PrivacyPolicyPage,
  type PrivacyConfig,
} from "@/components/privacy/PrivacyPolicyPage";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://pooniya.com";

const config: PrivacyConfig = {
  app: {
    name: "Unit Converter",
    packageOrDomain: "com.mahi0092.unitconverter",
    platform: "Android (Google Play Store)",
    distribution: "Google Play Store",
    minVersion: "Android 7.0 (API 24)",
    minVersionLabel: "Minimum Android Version",
    category: "Tools / Productivity",
    developer: "Mahendra Singh Puniya",
    developerCountry: "India",
    contactEmail: "mahendrapuniya92@gmail.com",
    policyUrl: `${SITE}/privacy/unit-converter`,
    effectiveDate: "2026-05-24",
    lastUpdated: "2026-05-24",
    policyVersion: "1.0",
  },
  intro: (
    <p className="prose prose-neutral dark:prose-invert">
      Unit Converter is a free, offline Android app that converts values
      between units across categories such as length, weight, temperature,
      currency rates, area, volume, time, and more. All conversions are
      performed on your device. <strong>The values you enter and your
      conversion history never leave your device.</strong>
    </p>
  ),
  tldr: [
    <><strong>100% offline conversions.</strong> The conversion math runs on your device.</>,
    <><strong>No account, no login.</strong></>,
    <><strong>No ads.</strong> No AdMob, no advertising SDKs.</>,
    <><strong>History stored locally</strong> on your device only.</>,
    <><strong>Limited anonymous diagnostics</strong> are sent to Firebase to help fix crashes and improve the App.</>,
    <><strong>No precise location.</strong> Ever.</>,
  ],
  collectedAuto: [
    <><strong>Firebase installation ID</strong> — a random identifier, not linked to you, reset on reinstall.</>,
    <><strong>Approximate IP address</strong> (used by Firebase only for coarse country-level region).</>,
    <><strong>Device model, manufacturer, and Android OS version.</strong></>,
    <><strong>App version, build number, language/locale</strong> of the device.</>,
    <><strong>Screens visited within the App</strong>, time and date, and time spent.</>,
    <><strong>Feature events</strong> — anonymized counters such as &quot;length conversion used&quot; or &quot;favorite added&quot;, without the values you entered.</>,
    <><strong>Crash reports and stack traces</strong> via Firebase Crashlytics.</>,
  ],
  permissions: [
    {
      name: "Internet (android.permission.INTERNET)",
      why: "used to send Firebase analytics and crash reports. Optionally used to fetch live currency exchange rates from a public rate provider if you use the Currency conversion feature.",
    },
    {
      name: "Network State (android.permission.ACCESS_NETWORK_STATE)",
      why: "used by Firebase to batch analytics events when offline and retry later.",
    },
  ],
  onDeviceStorage: [
    <><strong>AsyncStorage</strong> — your recent conversions and favorited units.</>,
    <><strong>App preferences</strong> — selected category, theme, decimal precision, and analytics opt-in choice.</>,
    <><strong>Cached exchange rates</strong> (if you use Currency conversion) — refreshed periodically; not linked to your identity.</>,
  ],
  thirdParties: [
    { name: "Google Firebase Analytics", purpose: "anonymized usage statistics", href: "https://firebase.google.com/support/privacy" },
    { name: "Google Firebase Crashlytics", purpose: "anonymized crash reports" },
    { name: "Public currency exchange API (when Currency conversion is used)", purpose: "fetches reference rates; no personal data is sent" },
    { name: "Expo / EAS (build pipeline only)", purpose: "used at build time by the developer; no runtime user data is sent to Expo", href: "https://expo.dev/privacy" },
  ],
  optOutControls: [
    <><strong>Turn off analytics:</strong> In-App Settings → Privacy → toggle &quot;Help improve Unit Converter&quot; off (where available).</>,
    <><strong>Clear history and favorites:</strong> Inside the App, go to History → Clear all. Or Android Settings → Apps → Unit Converter → Storage → Clear data.</>,
    <><strong>Avoid the currency API:</strong> Simply do not open the Currency category.</>,
    <><strong>Uninstall:</strong> Long-press the App icon and select Uninstall.</>,
  ],
};

export const metadata: Metadata = {
  title: `${config.app.name} — Privacy Policy`,
  description:
    "Privacy policy for the Unit Converter Android app. 100% offline conversions. No ads. DPDP Act 2023 compliant.",
  alternates: { canonical: config.app.policyUrl },
  openGraph: {
    title: `${config.app.name} — Privacy Policy`,
    description: "Privacy policy for Unit Converter — on-device conversions, no ads.",
    url: config.app.policyUrl,
    type: "article",
  },
  robots: { index: true, follow: true },
};

export default function Page() {
  return <PrivacyPolicyPage config={config} />;
}
