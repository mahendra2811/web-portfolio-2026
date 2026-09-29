/** Public copy adapted from the app's PRIVACY_POLICY.md release draft. */
import type { SimplePrivacyPolicy } from "@/data/privacy-policy";

export const hinduCalendarPrivacy = {
  name: "Hindu Calendar — Panchang",
  identifier: { label: "Android package", value: "com.pooniya.hinducalendar" },
  lastUpdated: "28 September 2026",
  contactEmail: "mahendrapuniya92@gmail.com",
  intro:
    "Hindu Calendar is designed to work without an account. The app calculates Panchang on your device for the city you choose. It does not ask for GPS location.",
  contactText: "For questions about this app or its privacy practices, email",
  relatedLink: { href: "/projects/hindu-calender", label: "About Hindu Calendar" },
  sections: [
    {
      id: "device-storage",
      title: "Information saved on your device",
      paragraphs: [
        "The app stores your selected city, language, calendar preferences, reminders, notes, and local notification schedule in its app storage. Reminder titles and notes are not sent to a server by the app.",
        "Clearing the Panchang calculation cache does not delete reminders or notes. Uninstalling the app or clearing its app data can remove this local information.",
      ],
    },
    {
      id: "notifications",
      title: "Notifications",
      paragraphs: [
        "If you enable reminder alerts, the app asks Android for notification permission and schedules local notifications. Android controls whether and when these appear. Reminder titles may be visible on a lock screen depending on device settings. The app does not register for remote push notifications.",
      ],
    },
    {
      id: "network-and-third-parties",
      title: "Network and third parties",
      paragraphs: [
        "The current app design has no user account, advertising, analytics SDK, or online Panchang request. Panchang calculations use the MIT-licensed panchang-ts library bundled with the app. The app does not send your notes or reminders to that library's publisher.",
      ],
    },
    {
      id: "backups",
      title: "Device backups",
      paragraphs: [
        "The Android package is configured with allowBackup: false to request that Android exclude app data from standard backup. Device manufacturers and operating system features can behave differently, including some device-to-device transfers. Backup behavior should be checked against the final release manifest.",
      ],
    },
    {
      id: "choices",
      title: "Your choices",
      paragraphs: [
        "You can change city and language in Settings, disable notifications in the app or Android settings, and delete individual reminders and notes. You can clear calculated Panchang cache separately. The current version has no cloud export or recovery service.",
      ],
    },
  ],
} satisfies SimplePrivacyPolicy;
