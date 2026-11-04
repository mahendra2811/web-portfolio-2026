import type { SimplePrivacyPolicy } from "@/data/privacy-policy";

export const gaadiPulsePrivacy = {
  "name": "GaadiPulse",
  "lastUpdated": "4 November 2026",
  "contactEmail": "mahendrapuniya92@gmail.com",
  "intro": "Mahendra Singh (“we”, “us” or “our”) operates GaadiPulse, a vehicle management app. This policy explains how we handle information when you use the app or contact us.",
  "sections": [
    {
      "id": "information-we-collect",
      "title": "Information we collect",
      "bullets": [
        "Account information: Your email address, account identifier, profile information you choose to provide, and information needed to authenticate your account. Sign-in methods supported by the app include a password, an email verification code and Google sign-in. If you use Google, we may receive account information made available for sign-in, such as your verified email address and profile details.",
        "Vehicle and activity records: Information you enter, such as vehicle category, make, model, nickname, registration number, fuel or energy type, meter readings, fuel purchases, expenses, amounts, dates, vendors, payment methods and notes. Vehicle registration numbers and free-text entries may identify you or other people. Please avoid entering sensitive information that is not needed for your records.",
        "Access and operational information: Account and vehicle identifiers, membership and permission settings, timestamps, and records of relevant changes or access actions. Service providers may process technical information such as IP addresses and service logs.",
        "Support communications: Information you send us, including your email address and the contents of your message."
      ]
    },
    {
      "id": "how-we-use-information",
      "title": "How we use information",
      "paragraphs": [
        "We use information to create and authenticate accounts; store and display vehicle records; show fuel, expense and meter history; calculate summaries; apply access permissions; maintain and secure the service; investigate problems and abuse; respond to requests; and meet applicable legal obligations. We use email to deliver authentication and account-related communications."
      ]
    },
    {
      "id": "sharing-and-service-providers",
      "title": "Sharing and service providers",
      "paragraphs": [
        "We use Supabase for services including authentication and hosted data storage. Google processes information under its own policies when you choose Google sign-in. Email delivery and other service providers used by the production configuration also process information to provide their services. The final production provider configuration is not yet confirmed.",
        "When vehicle sharing is available, people granted access may see or enter information according to their roles and permissions. Access is tied to a verified account. Information shared with another user may remain in that user's possession or in shared records. Please provide another person's information only when you have an appropriate reason to do so.",
        "We may disclose information when required by applicable law or where reasonably necessary to protect rights, safety or the security of the service. GaadiPulse does not include an advertising SDK in the current app configuration."
      ]
    },
    {
      "id": "device-storage-and-permissions",
      "title": "Device storage and permissions",
      "paragraphs": [
        "The current vehicle-record features require an internet connection. Authentication session information and certain preferences may be stored on your device. Data from an older version may remain on your device; the current version does not automatically upload old offline drafts.",
        "The current app does not offer GPS tracking or photo or file uploads. Optional device notifications and other features may be offered in a later release. We will update this policy and provide any disclosures required by law or platform rules if our practices change."
      ]
    },
    {
      "id": "retention",
      "title": "Retention",
      "paragraphs": [
        "We retain account, vehicle and operational information in the service while it is needed to operate GaadiPulse. Shared records and audit information may remain after access is revoked. Specific retention periods for account information, shared records, logs and backups have not yet been established for the production service. We will update this section when those periods and the deletion process are confirmed."
      ]
    },
    {
      "id": "your-choices-and-account-deletion",
      "title": "Your choices and account deletion",
      "paragraphs": [
        "You may review and update available profile and vehicle information in the app, subject to your role and permissions, and you can sign out on your device.",
        "To request account deletion without reinstalling the app, email mahendrapuniya92@gmail.com with the subject GaadiPulse account deletion request from the email address associated with your account. Do not include your password or verification code. We may need to verify your identity before acting on your request.",
        "The app contains an account deletion request option under Settings → Security and data → Request account deletion. The existing request process requires a primary administrator to archive the vehicles they administer first. The automated deletion and anonymization process has not yet been deployed or verified, and submitting a request does not immediately delete your account or server records. Deleting the app alone also does not delete them. For help with a request, contact us at the email address above.",
        "The intended approach for shared vehicle records is to retain those records for other members while removing the departing user's identity. The implementation, treatment of personal data within shared records, retention exceptions and deletion timeframes still need to be finalized and verified."
      ]
    },
    {
      "id": "security",
      "title": "Security",
      "paragraphs": [
        "We use measures intended to protect information, including account authentication and access controls. No method of storage or transmission can be guaranteed completely secure."
      ]
    },
    {
      "id": "international-processing",
      "title": "International processing",
      "paragraphs": [
        "Service providers may process information in countries other than the one where you live. The hosting region and any applicable transfer arrangements depend on the final production configuration and have not yet been confirmed."
      ]
    },
    {
      "id": "changes-to-this-policy",
      "title": "Changes to this policy",
      "paragraphs": [
        "We may update this policy as the app or our practices change. We will update the date above and provide any notice required by applicable law."
      ]
    }
  ]
} satisfies SimplePrivacyPolicy;
