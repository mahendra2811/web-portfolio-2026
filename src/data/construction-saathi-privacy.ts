import type { SimplePrivacyPolicy } from "@/data/privacy-policy";

// Based on the Construction Saathi legal content in techBuilder/web/src/content/legal/en.ts.
export const constructionSaathiPrivacy = {
  name: "Construction Saathi",
  lastUpdated: "Not specified in the source policy",
  contactEmail: "mahendrapuniya92@gmail.com",
  identifier: { label: "Android package", value: "com.pooniya.constructionsaathi" },
  intro: "Construction Saathi is a site diary and management service for construction companies. This policy explains the information used to operate it.",
  sections: [
    { id: "information", title: "Information collected", bullets: ["Company name and organisation ID, staff names, mobile numbers and roles used to set up access.", "Work records such as attendance, site progress, materials, fuel and vehicles, and money records such as expenses, cash, salaries and vendor accounts.", "Basic usage information used to operate and diagnose the service."] },
    { id: "access", title: "Who can access information", paragraphs: ["People within your company can access information according to their roles and site permissions. The service team may access information as needed to run the service and provide support. Company data is isolated at the database level and is not sold."] },
    { id: "storage", title: "Storage and retention", paragraphs: ["Records are stored on managed cloud servers with backups. They are retained while your company uses the service and for a period afterwards so an export can be requested. Contact the service for current retention details."] },
    { id: "choices", title: "Your choices and deletion", paragraphs: ["Ask to export records in Excel, correct a record, deactivate a login or delete company data after the company stops using the service. To request account deletion, email the contact below with your name, registered mobile number and company name. The service may verify that you are authorised before acting."] },
    { id: "cookies", title: "Website cookies", paragraphs: ["The service website uses sign-in and language preferences. The service does not use advertising cookies or cross-site tracking."] },
  ],
} satisfies SimplePrivacyPolicy;
