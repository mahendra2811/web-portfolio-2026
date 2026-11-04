import type { SimplePrivacyPolicy } from "@/data/privacy-policy";

export const gaadiPulseAccountDeletion = {
  name: "Delete your GaadiPulse account",
  pageLabel: "Account deletion",
  lastUpdated: "November 4, 2026",
  contactEmail: "mahendrapuniya92@gmail.com",
  intro:
    "You can request deletion of your GaadiPulse account and associated data even if you no longer have the app installed.",
  relatedLink: {
    href: "/privacy/gaadipulse",
    label: "GaadiPulse privacy policy",
  },
  sections: [
    {
      id: "request",
      title: "Deletion request",
      paragraphs: [
        "Email mahendrapuniya92@gmail.com with the subject GaadiPulse account deletion request from the email address associated with your account. Tell us that you want to delete your GaadiPulse account. Do not include your password or verification code in your email. We may contact you to verify that you own the account before processing the request.",
        "We may need to discuss vehicles you administer or shared records before completing your request. Some information may need to be retained for operational or legal reasons, including information in backups. We will handle requests in accordance with applicable law.",
      ],
    },
  ],
} satisfies SimplePrivacyPolicy;
