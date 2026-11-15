import type { SimplePrivacyPolicy } from "@/data/privacy-policy";

// Based on docs/privacy-policy.html and the in-app privacy summary in the Call Nest repository.
export const callNestPrivacy = {
  name: "Call Nest",
  lastUpdated: "July 22, 2026 (in-app privacy summary)",
  contactEmail: "mahendrapuniya92@gmail.com",
  identifier: { label: "Android package", value: "com.pooniya.callnest" },
  intro: "Call Nest is a local-first call management app. This policy describes information used on your device and information sent to services when you use connected features.",
  sections: [
    { id: "on-device", title: "Information on your device", paragraphs: ["The app reads call-log and contact information to list and identify calls. Notes, tags, follow-ups and lead scores are stored on the device. With your choice, it can save unsaved numbers to a contact group. The app does not record call audio."], bullets: ["Call-log and contact permissions support the app's core features.", "Phone state, notifications, overlay and biometric permissions support features such as call detection, reminders, the optional floating bubble and app lock."] },
    { id: "connected-features", title: "Connected features and service providers", paragraphs: ["When you sign in, Supabase processes your email and authentication information. A Firebase Cloud Messaging token may be stored against your account to deliver reminders.", "Crash reporting through Sentry and usage analytics through PostHog are optional and off by default. Call numbers, contact names, notes and call content are not sent in these events.", "If you enable Google Drive backup, an encrypted snapshot of app data is uploaded to your own Drive app-specific folder. Optional AI features may send relevant text directly to Anthropic when you provide and use your own API key. Each provider handles information under its own policies."] },
    { id: "sharing", title: "Sharing and exports", paragraphs: ["Call records, contacts and notes are not uploaded to the app operator's servers as part of the app’s ordinary operation. If you export data or enable a backup or AI feature, the information involved is handled by the destination you choose. The app does not sell or rent data or run advertising SDKs."] },
    { id: "retention", title: "Retention and deletion", paragraphs: ["Local app data remains until you remove it, clear app storage or uninstall. Copies in exports or your Google Drive are managed separately. To request account deletion, email the address below. Account information and linked push tokens are deleted within 30 days after a deletion request."] },
    { id: "choices", title: "Your choices", paragraphs: ["You can disable optional analytics in Settings, revoke permissions in Android settings, delete local notes or reset app data. You can export your data, sign out and request account deletion. Revoking permissions may limit features."] },
    { id: "security", title: "Security and changes", paragraphs: ["The app uses local storage protections and supports optional app lock. No security measure can guarantee complete protection. This policy may change as the app's practices change."] },
  ],
} satisfies SimplePrivacyPolicy;
