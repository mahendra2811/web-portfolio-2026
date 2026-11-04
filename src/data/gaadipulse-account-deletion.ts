import type { SimplePrivacyPolicy } from "@/data/privacy-policy";

export const gaadiPulseAccountDeletion = {
  name: "Delete your GaadiPulse account",
  pageLabel: "Account deletion",
  lastUpdated: "Not yet approved",
  contactEmail: "mahendrapuniya92@gmail.com",
  intro:
    "You can request deletion of your GaadiPulse account and associated data even if you no longer have the app installed.",
  notice:
    "Draft — do not publish until the deletion process is implemented, tested and operating. Replace the bracketed details before publication.",
  relatedLink: {
    href: "/privacy/gaadipulse",
    label: "GaadiPulse privacy policy draft",
  },
  sections: [
    {
      id: "request",
      title: "Deletion request",
      paragraphs: [
        "Email mahendrapuniya92@gmail.com with the subject GaadiPulse account deletion request from the email address associated with your account. Tell us that you want to delete your GaadiPulse account. Do not include your password or verification code in your email. We may contact you to verify that you own the account before processing the request.",
        "[ADD THE WORKING IN-APP DELETION PATH AND ANY NECESSARY STEPS, INCLUDING WHAT HAPPENS TO VEHICLES YOU ADMINISTER.]",
        "[DESCRIBE THE EXACT DATA DELETED, HOW SHARED VEHICLE RECORDS ARE RETAINED WITHOUT THE DEPARTING USER'S IDENTITY, ANY DATA RETAINED FOR A LEGITIMATE REASON, AND THE TIMING FOR DELETION FROM ACTIVE SYSTEMS AND BACKUPS. THESE MUST MATCH THE IMPLEMENTED PROCESS.]",
      ],
    },
  ],
} satisfies SimplePrivacyPolicy;
