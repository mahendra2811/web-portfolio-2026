import type { Metadata } from "next";
import {
  PrivacyPolicyPage,
  type PrivacyConfig,
} from "@/components/privacy/PrivacyPolicyPage";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://pooniya.com";

const config: PrivacyConfig = {
  app: {
    name: "callNest",
    packageOrDomain: "com.callvault.app",
    platform: "Android (sideload + Google Play Store)",
    distribution: "Direct download (sideload) and Google Play Store",
    minVersion: "Android 8.0 (API 26)",
    minVersionLabel: "Minimum Android Version",
    category: "Business / Productivity",
    developer: "Mahendra Singh Puniya",
    developerCountry: "India",
    contactEmail: "mahendrapuniya92@gmail.com",
    policyUrl: `${SITE}/privacy/callnest`,
    effectiveDate: "2026-05-24",
    lastUpdated: "2026-05-24",
    policyVersion: "1.0",
  },
  intro: (
    <p className="prose prose-neutral dark:prose-invert">
      callNest is an Android app for Indian small-business owners who handle
      20–100 daily inquiry calls. It reads your phone&apos;s call log, helps
      you auto-save unsaved inquiry numbers into a dedicated contact group,
      lets you tag/note/bookmark each call, computes a 0–100 lead score, and
      exports your data to Excel/CSV/PDF. <strong>All of this processing
      happens on your device. Your call log, contacts, and notes never leave
      your phone.</strong>
    </p>
  ),
  tldr: [
    <><strong>Call log and contacts stay on your device.</strong> callNest does not upload your call history, contact list, or any inquiry notes to any server.</>,
    <><strong>The App requires sensitive permissions</strong> (call log, contacts, phone state, overlay) to do its job. Each permission, what it is used for, and whether data leaves your device is explained in §7 below.</>,
    <><strong>No account, no login.</strong></>,
    <><strong>No ads, no AdMob, no ad networks.</strong></>,
    <><strong>Self-update is via a hosted manifest</strong>, not via Play Store auto-updates (for the sideload distribution). The update check is the only outbound network call required by core features.</>,
    <><strong>Limited anonymous diagnostics</strong> (crash reports, App version pings) may be sent to Firebase. No call log content, contact data, or notes are ever included.</>,
    <><strong>You can export your data anytime</strong> to Excel, CSV, or PDF — the export file is created on your device and shared via the Android share sheet to a destination you choose.</>,
  ],
  notCollected: [
    <><strong>Your call log</strong> — the contents of `CallLog.Calls`, including phone numbers, call types, timestamps, durations. callNest reads this only on your device and never transmits it.</>,
    <><strong>Your contacts</strong> — names, numbers, the inquiry contact group, or any other contact data.</>,
    <><strong>Your notes, tags, bookmarks, and follow-ups</strong> attached to calls.</>,
    <><strong>Your lead scores or any business intelligence</strong> the App computes from your call history.</>,
    <><strong>Audio of calls</strong> — the App does not record or access call audio.</>,
    <><strong>Personally identifiable information (PII)</strong> beyond what is in your own call log (which you already have).</>,
    <><strong>Precise or coarse location data.</strong></>,
    <><strong>Microphone, camera, SMS, calendar, or your photos.</strong></>,
    <><strong>Advertising identifiers</strong> — no AdMob, no ad SDKs.</>,
  ],
  collectedAuto: [
    <><strong>Firebase installation ID</strong> — a random identifier, not linked to you, reset on reinstall.</>,
    <><strong>Approximate IP address</strong> (used by Firebase only for coarse country-level region).</>,
    <><strong>Device model, manufacturer, and Android OS version.</strong></>,
    <><strong>App version and build number.</strong></>,
    <><strong>Crash reports and stack traces</strong> via Firebase Crashlytics if the App crashes.</>,
    <><strong>Self-update version check</strong> — when the App launches it may fetch a small JSON manifest from our hosted endpoint to see if a newer version is available. Only the App version and basic device info are sent.</>,
    <><strong>Anonymized feature counters</strong> such as &quot;call tagged&quot; or &quot;export generated&quot;, without any of your actual call data.</>,
  ],
  permissions: [
    {
      name: "READ_CALL_LOG",
      why: "to read your phone&apos;s call history so the App can show your calls, let you tag/note/follow-up on them, and compute the lead score. This is the core function of the App.",
      scope: "The call log is read locally on your device. It is never transmitted, uploaded, or shared with any third party.",
      dataLeaves: false,
    },
    {
      name: "READ_CONTACTS",
      why: "to identify which calls came from saved contacts vs unsaved inquiry numbers, and to display contact names alongside numbers.",
      scope: "Read locally on your device only.",
      dataLeaves: false,
    },
    {
      name: "WRITE_CONTACTS",
      why: "to optionally auto-save unsaved inquiry numbers into a dedicated contact group of your choice. You control which numbers are saved and to which group.",
      scope: "Writes happen locally on your device.",
      dataLeaves: false,
    },
    {
      name: "READ_PHONE_STATE",
      why: "to detect when a call starts and ends in real time so the App can show the floating in-call bubble and the post-call popup.",
      scope: "Phone state is observed locally; no call audio, content, or metadata is uploaded.",
      dataLeaves: false,
    },
    {
      name: "POST_NOTIFICATIONS (Android 13+)",
      why: "to show post-call popups, daily follow-up reminders, and background export progress.",
    },
    {
      name: "SYSTEM_ALERT_WINDOW (display over other apps)",
      why: "to render the floating in-call bubble that lets you tag and note a call while it is in progress.",
      scope: "Used only during active calls; no data displayed in the overlay is sent off the device.",
      dataLeaves: false,
    },
    {
      name: "SCHEDULE_EXACT_ALARM / USE_EXACT_ALARM",
      why: "to fire follow-up reminders at the exact time you set.",
    },
    {
      name: "RECEIVE_BOOT_COMPLETED",
      why: "to re-register call detection and scheduled reminders after a device reboot. No data is sent at boot.",
    },
    {
      name: "FOREGROUND_SERVICE / FOREGROUND_SERVICE_DATA_SYNC / FOREGROUND_SERVICE_SPECIAL_USE",
      why: "to keep the call-detection service alive while you are on a call, and to allow long-running local operations (like generating a multi-thousand-row export) to complete reliably.",
    },
    {
      name: "REQUEST_INSTALL_PACKAGES",
      why: "used only by the self-update flow (for the sideload distribution) to install a newly-downloaded App update package. You are prompted to confirm before installation.",
    },
    {
      name: "WAKE_LOCK / VIBRATE",
      why: "WAKE_LOCK keeps long-running export jobs going; VIBRATE provides haptic feedback on actions like tagging a call.",
    },
    {
      name: "Internet (android.permission.INTERNET) / ACCESS_NETWORK_STATE",
      why: "used only for (a) the self-update version check, (b) Firebase diagnostics, and (c) downloading the update package when you confirm an update. No business data is sent.",
    },
  ],
  onDeviceStorage: [
    <><strong>Room database</strong> — your tagged calls, notes, bookmarks, follow-ups, lead scores, and call groupings. Encrypted at rest using AndroidKeyStore-backed keys.</>,
    <><strong>DataStore preferences</strong> — App settings, theme, the contact group you chose for auto-save, follow-up reminder schedules.</>,
    <><strong>Generated exports</strong> — Excel, CSV, and PDF files you generate are written to your chosen output directory on your device.</>,
    <><strong>WorkManager job database</strong> — schedules background exports and follow-up reminders.</>,
  ],
  thirdParties: [
    { name: "Google Firebase Crashlytics", purpose: "anonymized crash reports", href: "https://firebase.google.com/support/privacy" },
    { name: "Google Firebase Analytics (optional, anonymized)", purpose: "anonymized feature event counters; can be disabled in Settings" },
    { name: "Self-update endpoint (pooniya.com)", purpose: "hosts the versions.json manifest and update APKs for the sideload distribution. Only App version and basic device info are sent in the version check." },
    { name: "Android System Services", purpose: "TelephonyManager, CallLog provider, Contacts provider, BiometricPrompt — provided by your operating system" },
  ],
  optOutControls: [
    <><strong>Revoke any sensitive permission</strong> — Android Settings → Apps → callNest → Permissions. Note that revoking call log or contacts access will prevent the App from functioning.</>,
    <><strong>Turn off the floating in-call bubble:</strong> In-App Settings → In-Call → Floating bubble → off (or revoke &quot;Display over other apps&quot;).</>,
    <><strong>Turn off the post-call popup:</strong> In-App Settings → Post-call → off.</>,
    <><strong>Turn off analytics:</strong> In-App Settings → Privacy → toggle &quot;Help improve callNest&quot; off.</>,
    <><strong>Disable self-update:</strong> In-App Settings → Updates → Check for updates → off.</>,
    <><strong>Clear all data inside the App:</strong> In-App Settings → Data → Erase everything. Or Android Settings → Apps → callNest → Storage → Clear data.</>,
    <><strong>Uninstall:</strong> Long-press the App icon and select Uninstall. All locally stored data is removed immediately.</>,
  ],
  securityNotes: [
    <>Your call log, contacts, and notes never leave your device, so there is no server-side copy to be breached.</>,
    <>The Room database that stores your tagged calls and notes is encrypted at rest using keys generated and stored in the hardware-backed Android Keystore on your device.</>,
    <>Optional App Lock can require biometric or PIN authentication before the App opens.</>,
    <>All outbound network traffic (self-update check, Firebase) uses HTTPS / TLS 1.2 or higher.</>,
    <>The self-update package is verified against a SHA-256 hash published in the manifest before installation; this prevents tampered update files from being installed.</>,
    <>Despite our efforts, no method of transmission over the Internet or method of electronic storage is 100% secure.</>,
  ],
  backupNote: (
    <p className="prose prose-neutral dark:prose-invert">
      callNest does <strong>not</strong> run any automatic cloud backup or
      sync. If you use the in-app Export feature, the export file is created
      on your device and shared via the Android share sheet to a destination
      you choose (Google Drive, email, WhatsApp, etc.). That destination is
      governed by its own provider&apos;s policy. Android&apos;s system-level
      auto-backup is <strong>disabled</strong> by this App so your sensitive
      call data is not uploaded to Google Drive without your consent.
    </p>
  ),
};

export const metadata: Metadata = {
  title: `${config.app.name} — Privacy Policy`,
  description:
    "Privacy policy for the callNest Android app. Your call log, contacts, and notes never leave your device. DPDP Act 2023 compliant.",
  alternates: { canonical: config.app.policyUrl },
  openGraph: {
    title: `${config.app.name} — Privacy Policy`,
    description: "Privacy policy for callNest — on-device call CRM, no cloud upload.",
    url: config.app.policyUrl,
    type: "article",
  },
  robots: { index: true, follow: true },
};

export default function Page() {
  return <PrivacyPolicyPage config={config} />;
}
