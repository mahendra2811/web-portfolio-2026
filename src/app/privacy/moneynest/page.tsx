import type { Metadata } from "next";
import {
  PrivacyPolicyPage,
  type PrivacyConfig,
} from "@/components/privacy/PrivacyPolicyPage";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://pooniya.com";

const config: PrivacyConfig = {
  app: {
    name: "moneyNest",
    packageOrDomain: "com.pooniya.moneynest",
    platform: "Android (Google Play Store)",
    distribution: "Google Play Store",
    minVersion: "Android 8.0 (API 26)",
    minVersionLabel: "Minimum Android Version",
    category: "Finance",
    developer: "Mahendra Singh Puniya",
    developerCountry: "India",
    contactEmail: "mahendrapuniya92@gmail.com",
    policyUrl: `${SITE}/privacy/moneynest`,
    effectiveDate: "2026-05-24",
    lastUpdated: "2026-05-24",
    policyVersion: "1.0",
  },
  intro: (
    <p className="prose prose-neutral dark:prose-invert">
      moneyNest is a free, privacy-first, on-device-only personal expense
      tracker for Indian users. It deliberately does less, on purpose. No
      login, no ads, no cloud, no syncing. Voice-based expense entry runs
      entirely on your device. <strong>Your transactions, accounts,
      categories, and voice audio never leave your device.</strong>
    </p>
  ),
  tldr: [
    <><strong>Your finance data never leaves your device.</strong> Every transaction, account, and category lives only on your phone.</>,
    <><strong>No account, no login, no cloud sync.</strong></>,
    <><strong>No ads.</strong> No AdMob, no advertising SDKs.</>,
    <><strong>Voice expense entry runs on-device.</strong> Speech recognition is performed by the Android system, not streamed to a cloud transcription service.</>,
    <><strong>Optional App Lock</strong> protects your finance data behind your fingerprint or face.</>,
    <><strong>Limited anonymous diagnostics</strong> are sent to Firebase to fix crashes and improve the App. No transaction data is ever included.</>,
  ],
  notCollected: [
    <><strong>Your financial data</strong> — transactions, amounts, categories, accounts, balances, notes, or attached receipts. None of this is ever transmitted off your device.</>,
    <><strong>Voice recordings</strong> — when you use voice expense entry, the audio is processed on your device by the Android speech-recognition system. The audio is not uploaded by the App.</>,
    <><strong>Biometric data</strong> — App Lock uses your device&apos;s biometric system; the App never sees the biometric template.</>,
    <><strong>Personally identifiable information (PII)</strong> — name, email, phone number, address, government IDs, bank account numbers.</>,
    <><strong>Account credentials</strong> — there are no accounts to log into.</>,
    <><strong>Precise or coarse location data.</strong></>,
    <><strong>Contacts, SMS, calendar, call logs, photos outside what you explicitly attach.</strong></>,
    <><strong>Advertising identifiers</strong> — no AdMob, no ad SDKs.</>,
  ],
  collectedAuto: [
    <><strong>Firebase installation ID</strong> — a random identifier, not linked to you, reset on reinstall.</>,
    <><strong>Approximate IP address</strong> (used by Firebase only for coarse country-level region).</>,
    <><strong>Device model, manufacturer, and Android OS version.</strong></>,
    <><strong>App version, build number, language/locale</strong> of the device.</>,
    <><strong>Screens visited within the App</strong>, time and date, and time spent.</>,
    <><strong>Feature events</strong> — anonymized counters such as &quot;transaction added&quot; or &quot;voice entry used&quot; — without amounts, categories, or any of your financial detail.</>,
    <><strong>Crash reports and stack traces</strong> via Firebase Crashlytics.</>,
  ],
  permissions: [
    {
      name: "Microphone (android.permission.RECORD_AUDIO)",
      why: "required only when you tap the voice-entry button. The microphone is opened solely during a voice expense entry session and stopped immediately after.",
      scope: "Audio is processed by the Android system speech recognizer. The audio is not uploaded by the App, and we do not retain raw audio after the transcription is complete.",
      dataLeaves: false,
    },
    {
      name: "Biometric (USE_BIOMETRIC, USE_FINGERPRINT)",
      why: "optional App Lock feature for fingerprint or face authentication.",
      scope: "All biometric verification is performed by the Android BiometricPrompt API. The App receives only a success/failure result — never the biometric template.",
      dataLeaves: false,
    },
    {
      name: "Internet (android.permission.INTERNET)",
      why: "used only to send Firebase analytics and crash reports. No transaction or finance feature uses the internet.",
    },
    {
      name: "Notifications (android.permission.POST_NOTIFICATIONS)",
      why: "optional — used for reminders to log expenses, monthly summaries, and update notices.",
    },
  ],
  onDeviceStorage: [
    <><strong>Local database (SQLite via expo-sqlite or AsyncStorage)</strong> — your transactions, accounts, categories, budgets, and notes.</>,
    <><strong>Expo SecureStore</strong> — App Lock PIN and any sensitive preference, encrypted at rest using AndroidKeyStore-backed keys.</>,
    <><strong>App preferences</strong> — selected currency, language, theme, reminder schedule, and analytics opt-in choice.</>,
  ],
  thirdParties: [
    { name: "Google Firebase Analytics", purpose: "anonymized usage statistics", href: "https://firebase.google.com/support/privacy" },
    { name: "Google Firebase Crashlytics", purpose: "anonymized crash reports" },
    { name: "Android System Services", purpose: "BiometricPrompt and on-device speech recognition — provided by your operating system" },
    { name: "Expo / EAS (build pipeline only)", purpose: "used at build time by the developer; no runtime user data is sent to Expo", href: "https://expo.dev/privacy" },
  ],
  optOutControls: [
    <><strong>Turn off analytics:</strong> In-App Settings → Privacy → toggle &quot;Help improve moneyNest&quot; off.</>,
    <><strong>Skip voice entry:</strong> Voice is never on by default; simply do not tap the voice button. You can also revoke Microphone via Android Settings → Apps → moneyNest → Permissions.</>,
    <><strong>Disable App Lock:</strong> In-App Settings → Security → App Lock → off.</>,
    <><strong>Clear all financial data:</strong> Inside the App, Settings → Data → Erase everything. Or Android Settings → Apps → moneyNest → Storage → Clear data.</>,
    <><strong>Uninstall:</strong> Long-press the App icon and select Uninstall. Because everything is on-device, uninstalling deletes all your data immediately.</>,
  ],
  securityNotes: [
    <>Your financial data never leaves your device, so there is no server-side copy to be breached.</>,
    <>App Lock PIN and sensitive preferences are stored in Expo SecureStore, which on Android is backed by the hardware-backed Android Keystore.</>,
    <>All Firebase network traffic uses HTTPS / TLS 1.2 or higher.</>,
    <>Despite our efforts, no method of transmission over the Internet or method of electronic storage is 100% secure.</>,
  ],
  backupNote: (
    <p className="prose prose-neutral dark:prose-invert">
      moneyNest does <strong>not</strong> run any cloud backup or sync. If
      you choose to use the manual Export feature, it produces a JSON or CSV
      file on your device which you can share to a destination of your
      choice (Google Drive, email, SD card). That destination is governed by
      its own provider&apos;s policy. Android&apos;s system-level auto-backup
      is <strong>disabled</strong> by this App so your finance data is not
      uploaded to Google Drive without your consent.
    </p>
  ),
};

export const metadata: Metadata = {
  title: `${config.app.name} — Privacy Policy`,
  description:
    "Privacy policy for the moneyNest Android expense tracker. On-device only. No cloud. Voice runs on-device. DPDP Act 2023 compliant.",
  alternates: { canonical: config.app.policyUrl },
  openGraph: {
    title: `${config.app.name} — Privacy Policy`,
    description: "Privacy policy for moneyNest — on-device finance, no cloud, no ads.",
    url: config.app.policyUrl,
    type: "article",
  },
  robots: { index: true, follow: true },
};

export default function Page() {
  return <PrivacyPolicyPage config={config} />;
}
