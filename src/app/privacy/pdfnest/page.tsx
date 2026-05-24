import type { Metadata } from "next";
import {
  PrivacyPolicyPage,
  type PrivacyConfig,
} from "@/components/privacy/PrivacyPolicyPage";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://pooniya.com";

const config: PrivacyConfig = {
  app: {
    name: "pdfNest",
    packageOrDomain: "com.pooniya.pdfnest",
    platform: "Android (Google Play Store)",
    distribution: "Google Play Store",
    minVersion: "Android 7.0 (API 24)",
    minVersionLabel: "Minimum Android Version",
    category: "Productivity / Tools",
    developer: "Mahendra Singh Puniya",
    developerCountry: "India",
    contactEmail: "mahendrapuniya92@gmail.com",
    policyUrl: `${SITE}/privacy/pdfnest`,
    effectiveDate: "2026-05-24",
    lastUpdated: "2026-05-24",
    policyVersion: "1.0",
  },
  intro: (
    <p className="prose prose-neutral dark:prose-invert">
      pdfNest is a free, on-device Android PDF hub. It bundles a PDF reader,
      document scanner, PDF editor, OCR, and 23 utility tools (merge, split,
      compress, convert, etc.). The defining promise: every operation runs
      entirely on your phone. <strong>Your files, scans, and document text
      never leave your device.</strong>
    </p>
  ),
  tldr: [
    <><strong>Your files never leave your device.</strong> All PDF viewing, editing, merging, splitting, scanning, OCR, compression, and conversion happen entirely offline.</>,
    <><strong>No account, no login, no email required</strong> to use any feature.</>,
    <><strong>No ads.</strong> No advertising SDKs, no tracking pixels, no AdMob.</>,
    <><strong>No selling of data, ever.</strong></>,
    <><strong>Limited anonymous diagnostics</strong> via Firebase. You can turn these off at <em>Settings → Privacy → Help improve pdfNest</em>.</>,
    <><strong>No precise location.</strong> Ever.</>,
  ],
  collectedAuto: [
    <><strong>Firebase installation ID</strong> — a random App-generated identifier not linked to your identity; reset when you reinstall.</>,
    <><strong>Approximate IP address</strong> (used by Firebase only for coarse country-level region).</>,
    <><strong>Device model, manufacturer, and Android OS version.</strong></>,
    <><strong>App version, build number, language/locale</strong> of the device.</>,
    <><strong>Screens visited within the App</strong>, time and date, and time spent.</>,
    <><strong>Feature events</strong> — anonymized counters such as &quot;PDF merged&quot;, &quot;document scanned&quot; — without document content or file names.</>,
    <><strong>Crash reports and stack traces</strong> via Firebase Crashlytics.</>,
    <><strong>Performance metrics</strong> — start time, screen render time, network response times for our own Firebase traffic.</>,
  ],
  permissions: [
    {
      name: "Storage / Files (Storage Access Framework)",
      why: "to open PDFs and images you choose, and to save the PDFs you create/edit back to your storage.",
      scope: "The App uses the Android Storage Access Framework (SAF) wherever possible — you pick each file or folder via the system picker. The App never scans your entire storage.",
      dataLeaves: false,
    },
    {
      name: "Camera (android.permission.CAMERA)",
      why: "required only by the Scan to PDF feature; the camera is opened only while you are inside the Scan screen.",
      scope: "Uses Google ML Kit Document Scanner — image processing happens on-device.",
      dataLeaves: false,
    },
    {
      name: "Notifications (android.permission.POST_NOTIFICATIONS)",
      why: "to show progress notifications for long operations (e.g. compressing a large PDF), to inform you when a batch job is complete, and to optionally surface tips. Notification channels: Operation Status, Progress, Updates, Re-engagement, Tips.",
    },
    {
      name: "Biometric (USE_BIOMETRIC)",
      why: "optional App Lock feature for fingerprint or face authentication.",
      scope: "All biometric verification is performed by the Android BiometricPrompt API. The App receives only a success/failure result — never the biometric template.",
      dataLeaves: false,
    },
    {
      name: "Internet (android.permission.INTERNET)",
      why: "used only to send Firebase diagnostics, receive Firebase Remote Config flags, and receive FCM push notifications. No file operation requires the internet.",
    },
  ],
  onDeviceStorage: [
    <><strong>Room database</strong> with references to opened documents, bookmarks, reading progress, folder structure, and search index.</>,
    <><strong>DataStore preferences</strong> — settings, theme, language, and analytics opt-in choice.</>,
    <><strong>Cached page renders and thumbnails</strong> for faster opening of recent PDFs.</>,
    <><strong>Encrypted vault</strong> — files moved into the optional Vault are encrypted at rest with AndroidKeyStore-backed keys that never leave your device.</>,
    <><strong>Temporary working files</strong> created during PDF operations, deleted immediately after the operation completes.</>,
  ],
  thirdParties: [
    { name: "Google Firebase Analytics", purpose: "anonymized usage statistics", href: "https://firebase.google.com/support/privacy" },
    { name: "Google Firebase Crashlytics", purpose: "anonymized crash reports" },
    { name: "Google Firebase Performance Monitoring", purpose: "App performance metrics" },
    { name: "Google Firebase Cloud Messaging (FCM)", purpose: "push notifications for App updates and tips", href: "https://policies.google.com/privacy" },
    { name: "Google Firebase Remote Config", purpose: "feature flag delivery" },
    { name: "Google Firebase In-App Messaging", purpose: "in-app announcements" },
    { name: "Google ML Kit (on-device)", purpose: "Document Scanner and Text Recognition (OCR); runs entirely on your device", href: "https://developers.google.com/ml-kit/terms" },
    { name: "Android System Services", purpose: "BiometricPrompt, Storage Access Framework, Print Service, Share Sheet — provided by your operating system" },
  ],
  optOutControls: [
    <><strong>Turn off analytics:</strong> Open the App → <em>Settings → Privacy → Help improve pdfNest</em> → toggle off.</>,
    <><strong>Turn off crash reporting:</strong> Same screen — toggle <em>Send crash reports</em> off.</>,
    <><strong>Turn off push notifications:</strong> Android Settings → Apps → pdfNest → Notifications.</>,
    <><strong>Revoke a permission:</strong> Android Settings → Apps → pdfNest → Permissions.</>,
    <><strong>Clear local data:</strong> Android Settings → Apps → pdfNest → Storage → Clear data.</>,
    <><strong>Uninstall:</strong> Long-press the App icon and select Uninstall.</>,
  ],
  securityNotes: [
    <>The strongest security guarantee comes from the App&apos;s architecture: your document content never leaves your device, so there is no server-side copy to be breached.</>,
    <>Data in the encrypted Vault is protected using keys generated and stored in the hardware-backed Android Keystore on your device.</>,
    <>App Lock leverages your device&apos;s biometric and PIN authentication; the App never sees the raw secret.</>,
    <>All Firebase network traffic uses HTTPS / TLS 1.2 or higher.</>,
    <>Despite our efforts, no method of transmission over the Internet or method of electronic storage is 100% secure.</>,
  ],
  backupNote: (
    <p className="prose prose-neutral dark:prose-invert">
      The Application does <strong>not</strong> run any automatic cloud
      backup or sync. If you use the in-app &quot;Backup&quot; feature, it
      uses the Storage Access Framework to copy files to a location you
      select (Google Drive, OneDrive, SD card). That destination is governed
      by its own provider&apos;s policy. Android&apos;s system-level backup
      may include the App&apos;s private storage; you can disable this in
      Android Settings → System → Backup.
    </p>
  ),
};

export const metadata: Metadata = {
  title: `${config.app.name} — Privacy Policy`,
  description:
    "Privacy policy for the pdfNest Android app. 100% on-device. Files never leave your device. DPDP Act 2023 compliant.",
  alternates: { canonical: config.app.policyUrl },
  openGraph: {
    title: `${config.app.name} — Privacy Policy`,
    description: "Privacy policy for the pdfNest Android app — 100% on-device.",
    url: config.app.policyUrl,
    type: "article",
  },
  robots: { index: true, follow: true },
};

export default function Page() {
  return <PrivacyPolicyPage config={config} />;
}
