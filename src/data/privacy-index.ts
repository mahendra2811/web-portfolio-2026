export interface PrivacyIndexEntry {
  slug: string;
  name: string;
  identifier: string;
  identifierLabel: string;
  tagline: string;
}

/** Add each new public policy here so it appears on /privacy. */
export const privacyIndex: PrivacyIndexEntry[] = [
  {
    slug: "gaadipulse",
    name: "GaadiPulse",
    identifier: "com.pooniya.gaadipulse",
    identifierLabel: "Android",
    tagline: "Vehicle records, account information, sharing, retention and account deletion.",
  },
  {
    slug: "construction-saathi",
    name: "Construction Saathi",
    identifier: "com.pooniya.constructionsaathi",
    identifierLabel: "Android",
    tagline: "Company, staff and site records, access controls, cloud storage and deletion requests.",
  },
  {
    slug: "jrh-estates",
    name: "JRH Estates",
    identifier: "Real estate website",
    identifierLabel: "Web",
    tagline: "WhatsApp enquiries, optional website analytics and your choices.",
  },
  {
    slug: "formulanest",
    name: "Formula Nest",
    identifier: "com.pooniya.formulanestapp",
    identifierLabel: "Android",
    tagline:
      "Formulas, revision notes, and practice tests with learning history stored locally. No account, ads, or analytics.",
  },
  {
    slug: "hindu-calender",
    name: "Hindu Calendar — Panchang",
    identifier: "com.pooniya.hinducalendar",
    identifierLabel: "Android",
    tagline:
      "Offline city-based Panchang and calendar with local notes and reminders. No account or GPS request.",
  },
  {
    slug: "pdfnest",
    name: "pdfNest",
    identifier: "com.pooniya.pdfnest",
    identifierLabel: "Android · Play Store",
    tagline:
      "Free, on-device PDF reader, scanner, editor, and 23 utility tools. Your files never leave your device.",
  },
  {
    slug: "callnest",
    name: "callNest",
    identifier: "com.pooniya.callnest",
    identifierLabel: "Android · Sideload + Play Store",
    tagline:
      "Call management with local records, optional connected services and backups.",
  },
  {
    slug: "calcmaster",
    name: "CalcMaster",
    identifier: "com.calcmaster.app",
    identifierLabel: "Android · Play Store",
    tagline: "36 offline calculators across Finance and Math, English + Hindi. No ads, no login.",
  },
  {
    slug: "bmi-calculator",
    name: "BMI Calculator",
    identifier: "com.mahendra.bmicalculator",
    identifierLabel: "Android · Play Store",
    tagline:
      "Free BMI calculator with on-device history. Your health data never leaves your phone.",
  },
  {
    slug: "unit-converter",
    name: "Unit Converter",
    identifier: "com.mahi0092.unitconverter",
    identifierLabel: "Android · Play Store",
    tagline: "Offline unit conversions across length, weight, temperature, currency, and more.",
  },
  {
    slug: "moneynest",
    name: "moneyNest",
    identifier: "com.pooniya.moneynest",
    identifierLabel: "Android · Play Store",
    tagline:
      "On-device-only expense tracker for Indian users. Voice entry runs on-device. No cloud.",
  },
  {
    slug: "fixtools",
    name: "FixTools (Web)",
    identifier: "freefixtools.pooniya.com",
    identifierLabel: "Web",
    tagline:
      "~100 PDF, image, calculator, and developer utilities — all client-side. Files never uploaded.",
  },
  {
    slug: "fixtools-twa",
    name: "FixTools (Android)",
    identifier: "com.freefixtools.app",
    identifierLabel: "Android · Play Store (TWA)",
    tagline: "Android Trusted Web Activity wrapper around the FixTools website.",
  },
];
