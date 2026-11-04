import type { SimplePrivacyPolicy } from "@/data/privacy-policy";

export const gaadiPulsePrivacy = {
  name: "GaadiPulse",
  lastUpdated: "November 4, 2026",
  contactEmail: "mahendrapuniya92@gmail.com",
  intro:
    "Mahendra Singh (“we”, “us” or “our”) operates GaadiPulse, a vehicle management app. This policy explains how we handle information when you use the app and contact us.",
  relatedLink: {
    href: "/privacy/gaadipulse/account-deletion",
    label: "GaadiPulse account deletion",
  },
  sections: [
    {
      id: "information-we-collect",
      title: "Information we collect",
      bullets: [
        "Account information: Your email address, account identifier, profile information you choose to provide, and information needed to authenticate your account. Depending on the sign-in method you choose, authentication may use a password, an email verification code or Google sign-in. If you use Google, we receive account information that Google makes available to us for sign-in, such as your verified email address and potentially your name or profile information.",
        "Vehicle and activity records: Information you enter, such as vehicle category, make, model, nickname, registration number, fuel or energy type, meter readings, fuel purchases, expenses, amounts, dates, vendors, payment method and notes. Vehicle registration and free-text entries may identify you or other people, depending on what you enter. Please avoid entering sensitive information that is not needed for your records.",
        "Access and operational information: Account and vehicle identifiers, membership and permission settings, timestamps, and records of relevant changes or access actions needed to operate and protect the service. Our service providers may process technical information such as IP addresses and service logs; the exact information and retention depend on their configuration.",
        "Support communications: Information you send us when you contact us, including your email address and message.",
      ],
    },
    {
      id: "how-we-use-information",
      title: "How we use information",
      paragraphs: [
        "We use information to create and authenticate accounts; provide and save vehicle records; show fuel, expense and meter history; calculate summaries; apply access permissions; maintain and secure the service; investigate problems and abuse; respond to requests; and meet applicable legal obligations. We use email to deliver authentication and account-related communications.",
      ],
    },
    {
      id: "sharing-and-service-providers",
      title: "Sharing and service providers",
      paragraphs: [
        "We use Supabase for services including authentication and hosted data storage. Google processes information under its own policies when you choose Google sign-in. These providers process information to provide their services to us or to you. Their handling and locations depend on the services and configurations we use.",
        "If you use vehicle sharing when available, people who have been granted access to a vehicle may see or enter information according to their assigned role and permissions. An owner can grant access using an email address; access is tied to a verified account. Do not enter another person's email or other personal information unless you have an appropriate reason to do so. Information you share with another user may remain in that user's possession or in shared records, subject to our deletion and retention practices below.",
        "We may disclose information when required by applicable law or where reasonably necessary to protect rights, safety or the security of the service.",
      ],
    },
    {
      id: "device-storage-and-permissions",
      title: "Device storage and permissions",
      paragraphs: [
        "GaadiPulse requires an internet connection for its current vehicle-record features. Authentication session information and certain preferences may be stored on your device.",
        "If device permissions or features change, we will update this policy and provide any disclosures required by law or platform rules.",
      ],
    },
    {
      id: "retention",
      title: "Retention",
      paragraphs: [
        "We keep information for as long as necessary for the purposes described above, including operating the service, resolving disputes, maintaining security and meeting applicable legal obligations. Retention may vary for shared records, service provider logs and backups depending on operational and legal requirements.",
      ],
    },
    {
      id: "your-choices-and-account-deletion",
      title: "Your choices and account deletion",
      paragraphs: [
        "You may review and update available profile and vehicle information in the app, subject to your role and permissions. You can sign out on your device. For privacy questions or requests to access, correct or delete your information, contact mahendrapuniya92@gmail.com. We may need to verify your identity before acting on a request.",
        "To request account deletion, email mahendrapuniya92@gmail.com from the address associated with your account. We may need to verify your identity and discuss any shared records or other information that must be retained. We will handle requests in accordance with applicable law. Deleting the app alone does not delete your account or server data.",
      ],
    },
    {
      id: "security",
      title: "Security",
      paragraphs: [
        "We use measures intended to protect information, including account authentication and access controls. No method of storage or transmission can be guaranteed completely secure.",
      ],
    },
    {
      id: "international-processing",
      title: "International processing",
      paragraphs: [
        "Our service providers may process information in locations outside your country. Where applicable, we will take steps required by law to protect information transferred across borders.",
      ],
    },
    {
      id: "changes-to-this-policy",
      title: "Changes to this policy",
      paragraphs: [
        "We may update this policy as the app or our practices change. We will update the date above and provide any notice required by applicable law.",
      ],
    },
  ],
} satisfies SimplePrivacyPolicy;
