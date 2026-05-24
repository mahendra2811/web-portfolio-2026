import type { Metadata } from "next";
import {
  PrivacyPolicyPage,
  type PrivacyConfig,
} from "@/components/privacy/PrivacyPolicyPage";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://pooniya.com";

const config: PrivacyConfig = {
  app: {
    name: "BMI Calculator",
    packageOrDomain: "com.mahendra.bmicalculator",
    platform: "Android (Google Play Store)",
    distribution: "Google Play Store",
    minVersion: "Android 7.0 (API 24)",
    minVersionLabel: "Minimum Android Version",
    category: "Health &amp; Fitness",
    developer: "Mahendra Singh Puniya",
    developerCountry: "India",
    contactEmail: "mahendrapuniya92@gmail.com",
    policyUrl: `${SITE}/privacy/bmi-calculator`,
    effectiveDate: "2026-05-24",
    lastUpdated: "2026-05-24",
    policyVersion: "1.0",
  },
  intro: (
    <p className="prose prose-neutral dark:prose-invert">
      BMI Calculator is a free Android app that computes your Body Mass Index
      from the height, weight, age, and gender you enter. All calculations
      and history are stored on your device. <strong>The health information
      you enter (height, weight, age, gender) never leaves your device.</strong>
    </p>
  ),
  tldr: [
    <><strong>BMI is calculated on your device.</strong> Your weight, height, age, and gender are never sent to a server.</>,
    <><strong>No account, no login.</strong></>,
    <><strong>No ads.</strong> No AdMob, no advertising SDKs.</>,
    <><strong>History is stored locally</strong> on your device only.</>,
    <><strong>Limited anonymous diagnostics</strong> are sent to Firebase to help fix crashes and improve the App. No health data is included.</>,
    <><strong>This App is not a medical device</strong> and BMI is only one indicator. Consult a qualified health professional for medical advice.</>,
  ],
  notCollected: [
    <><strong>Health information you enter</strong> — height, weight, age, gender, target weight, or BMI history. These never leave your device.</>,
    <><strong>Personally identifiable information (PII)</strong> — name, email, phone number, address, government IDs. The App does not ask for any of these.</>,
    <><strong>Account credentials</strong> — there are no accounts to log into.</>,
    <><strong>Precise or coarse location data.</strong></>,
    <><strong>Contacts, SMS, calendar, call logs, microphone audio, camera, or photos.</strong></>,
    <><strong>Biometric data.</strong></>,
    <><strong>Advertising identifiers</strong> — no AdMob, no ad SDKs are integrated.</>,
  ],
  collectedAuto: [
    <><strong>Firebase installation ID</strong> — a random identifier, not linked to you, reset on reinstall.</>,
    <><strong>Approximate IP address</strong> (used by Firebase only for coarse country-level region).</>,
    <><strong>Device model, manufacturer, and Android OS version.</strong></>,
    <><strong>App version, build number, language/locale</strong> of the device.</>,
    <><strong>Screens visited within the App</strong>, time and date, and time spent.</>,
    <><strong>Feature events</strong> — anonymized counters such as &quot;BMI calculated&quot; or &quot;history viewed&quot;, <em>without</em> the values you entered.</>,
    <><strong>Crash reports and stack traces</strong> via Firebase Crashlytics.</>,
  ],
  permissions: [
    {
      name: "Internet (android.permission.INTERNET)",
      why: "used only to send Firebase analytics and crash reports. BMI computation works fully offline.",
    },
    {
      name: "Network State (android.permission.ACCESS_NETWORK_STATE)",
      why: "used by Firebase to decide whether to batch analytics events and retry later when the device is online.",
    },
  ],
  onDeviceStorage: [
    <><strong>AsyncStorage</strong> — your saved BMI entries (date, weight, height, BMI value).</>,
    <><strong>App preferences</strong> — units (metric/imperial), theme, language, and analytics opt-in choice.</>,
  ],
  thirdParties: [
    { name: "Google Firebase Analytics", purpose: "anonymized usage statistics", href: "https://firebase.google.com/support/privacy" },
    { name: "Google Firebase Crashlytics", purpose: "anonymized crash reports" },
    { name: "Expo / EAS (build pipeline only)", purpose: "used at build time by the developer; no runtime user data is sent to Expo", href: "https://expo.dev/privacy" },
  ],
  optOutControls: [
    <><strong>Turn off analytics:</strong> In-App Settings → Privacy → toggle &quot;Help improve BMI Calculator&quot; off (where available).</>,
    <><strong>Clear BMI history:</strong> Inside the App, go to History → Clear all. Or Android Settings → Apps → BMI Calculator → Storage → Clear data.</>,
    <><strong>Uninstall:</strong> Long-press the App icon and select Uninstall.</>,
  ],
  childrenNote: (
    <div className="prose prose-neutral dark:prose-invert">
      <p>
        Body Mass Index for children and teenagers is calculated differently
        from adult BMI and should not be assessed using this Application
        without a qualified pediatrician&apos;s interpretation. The App is
        intended for use by adults.
      </p>
      <p>
        We do not knowingly collect personal information from children under
        13. If you are under 18 in India (or under the age of digital consent
        in your country), you should obtain consent from a parent or legal
        guardian before installing.
      </p>
    </div>
  ),
};

export const metadata: Metadata = {
  title: `${config.app.name} — Privacy Policy`,
  description:
    "Privacy policy for the BMI Calculator Android app. Your health data never leaves your device. No ads. DPDP Act 2023 compliant.",
  alternates: { canonical: config.app.policyUrl },
  openGraph: {
    title: `${config.app.name} — Privacy Policy`,
    description: "Privacy policy for BMI Calculator — on-device calculation, no ads.",
    url: config.app.policyUrl,
    type: "article",
  },
  robots: { index: true, follow: true },
};

export default function Page() {
  return <PrivacyPolicyPage config={config} />;
}
