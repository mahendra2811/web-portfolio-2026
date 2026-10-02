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
    slug: "formulanest",
    name: "FormulaNest",
    identifier: "Offline educational app",
    identifierLabel: "Education",
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
    identifier: "com.callvault.app",
    identifierLabel: "Android · Sideload + Play Store",
    tagline:
      "Call CRM for Indian small-business owners. Tags, notes, follow-ups, and exports — all on-device.",
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
