import type { Metadata } from "next";
import {
  PrivacyPolicyPage,
  type PrivacyConfig,
} from "@/components/privacy/PrivacyPolicyPage";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://pooniya.com";

const config: PrivacyConfig = {
  app: {
    name: "CalcMaster",
    packageOrDomain: "com.calcmaster.app",
    platform: "Android (Google Play Store)",
    distribution: "Google Play Store",
    minVersion: "Android 7.0 (API 24)",
    minVersionLabel: "Minimum Android Version",
    category: "Tools / Calculators",
    developer: "Mahendra Singh Puniya",
    developerCountry: "India",
    contactEmail: "mahendrapuniya92@gmail.com",
    policyUrl: `${SITE}/privacy/calcmaster`,
    effectiveDate: "2026-05-24",
    lastUpdated: "2026-05-24",
    policyVersion: "1.0",
  },
  intro: (
    <p className="prose prose-neutral dark:prose-invert">
      CalcMaster is a free, fully-offline Android calculator app with 36
      calculators across Finance (24) and Math (12) categories. It is
      bilingual (English + Hindi) and stores all history locally on your
      device. <strong>Your calculation inputs and history never leave your
      device.</strong>
    </p>
  ),
  tldr: [
    <><strong>100% offline calculations.</strong> Every calculation runs on your device. No network call is made when you compute.</>,
    <><strong>No account, no login.</strong></>,
    <><strong>No ads.</strong> No AdMob, no advertising SDKs.</>,
    <><strong>History is stored locally</strong> in AsyncStorage on your device only.</>,
    <><strong>Limited anonymous diagnostics</strong> are sent to Firebase to fix bugs and improve the App.</>,
    <><strong>No precise location.</strong> Ever.</>,
  ],
  collectedAuto: [
    <><strong>Firebase installation ID</strong> — a random identifier, not linked to you, reset on reinstall.</>,
    <><strong>Approximate IP address</strong> (used by Firebase only for coarse country-level region).</>,
    <><strong>Device model, manufacturer, and Android OS version.</strong></>,
    <><strong>App version, build number, language/locale</strong> of the device.</>,
    <><strong>Screens visited within the App</strong>, time and date, and time spent.</>,
    <><strong>Feature events</strong> — anonymized counters such as &quot;EMI calculator opened&quot; or &quot;converter used&quot;, without your actual input values.</>,
    <><strong>Crash reports and stack traces</strong> via Firebase Crashlytics.</>,
  ],
  permissions: [
    {
      name: "Internet (android.permission.INTERNET)",
      why: "used only to send Firebase analytics and crash reports. No calculation requires the internet.",
    },
    {
      name: "Notifications (android.permission.POST_NOTIFICATIONS, Android 13+)",
      why: "optional — used to surface tips and update notices. You can deny this permission and the App will work normally.",
    },
  ],
  onDeviceStorage: [
    <><strong>AsyncStorage</strong> — your calculation history and saved entries.</>,
    <><strong>App preferences</strong> — selected language (EN/Hindi), theme (light/dark), and analytics opt-in choice.</>,
  ],
  thirdParties: [
    { name: "Google Firebase Analytics", purpose: "anonymized usage statistics", href: "https://firebase.google.com/support/privacy" },
    { name: "Google Firebase Crashlytics", purpose: "anonymized crash reports" },
    { name: "Expo / EAS (build pipeline only)", purpose: "used at build time by the developer; no runtime user data is sent to Expo", href: "https://expo.dev/privacy" },
  ],
  optOutControls: [
    <><strong>Turn off analytics:</strong> In-App Settings → Privacy → toggle &quot;Help improve CalcMaster&quot; off (where available).</>,
    <><strong>Turn off notifications:</strong> Android Settings → Apps → CalcMaster → Notifications.</>,
    <><strong>Clear local history:</strong> Inside the App, go to History → Clear all. Or Android Settings → Apps → CalcMaster → Storage → Clear data.</>,
    <><strong>Uninstall:</strong> Long-press the App icon and select Uninstall.</>,
  ],
};

export const metadata: Metadata = {
  title: `${config.app.name} — Privacy Policy`,
  description:
    "Privacy policy for the CalcMaster Android calculator app. 100% offline calculations. No ads. DPDP Act 2023 compliant.",
  alternates: { canonical: config.app.policyUrl },
  openGraph: {
    title: `${config.app.name} — Privacy Policy`,
    description: "Privacy policy for CalcMaster — 36 offline calculators, no ads.",
    url: config.app.policyUrl,
    type: "article",
  },
  robots: { index: true, follow: true },
};

export default function Page() {
  return <PrivacyPolicyPage config={config} />;
}
