import { SimplePrivacyPolicyPage } from "@/components/privacy/SimplePrivacyPolicyPage";
import { hinduCalendarPrivacy } from "@/data/hindu-calendar-privacy";
import { createPrivacyMetadata } from "@/lib/privacy-metadata";

export const metadata = createPrivacyMetadata(
  hinduCalendarPrivacy,
  "/privacy/hindu-calender",
  "How the Hindu Calendar — Panchang Android app handles local calendar preferences, notes, reminders, notifications, and backups.",
);

export default function Page() {
  return <SimplePrivacyPolicyPage policy={hinduCalendarPrivacy} />;
}
