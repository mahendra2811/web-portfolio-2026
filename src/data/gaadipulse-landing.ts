export const gaadiPulseFeatures = [
  {
    number: "01",
    title: "Your garage, in one view",
    description:
      "Keep cars, bikes and work vehicles together. Give each vehicle its own fuel type, meter mode, timezone and records.",
    image: "/projects/gaadipulse/garage.jpg",
    alt: "GaadiPulse vehicle garage screen",
    tag: "GARAGE",
  },
  {
    number: "02",
    title: "Fuel entries that add up",
    description:
      "Record full or partial fills, quantity, price and payment details. Mileage appears only when valid full-to-full readings support it.",
    image: "/projects/gaadipulse/fuel.jpg",
    alt: "GaadiPulse fuel and charging screen",
    tag: "FUEL & CHARGING",
  },
  {
    number: "03",
    title: "Track the cost of keeping moving",
    description:
      "Log service, repairs, insurance, EMI, tolls and everyday vehicle expenses. Separate operating costs from cash outflow.",
    image: "/projects/gaadipulse/expenses.jpg",
    alt: "GaadiPulse expense and service screen",
    tag: "EXPENSES",
  },
  {
    number: "04",
    title: "Share a vehicle with your team",
    description:
      "Owners can grant vehicle-specific access to Pilots. Permissions determine which records and actions each member can use.",
    image: "/projects/gaadipulse/collaboration.jpg",
    alt: "GaadiPulse owner and pilot collaboration screen",
    tag: "OWNER + PILOT",
  },
  {
    number: "05",
    title: "See the records behind the numbers",
    description:
      "Review vehicle activity and available reports. Measured meter intervals stay distinct from estimates, so totals don’t pretend to be more precise than the data.",
    image: "/projects/gaadipulse/reports.webp",
    alt: "GaadiPulse reports screen",
    tag: "REPORTS",
  },
  {
    number: "06",
    title: "Keep important dates in sight",
    description:
      "Add document details and set reminders around dates or meter readings. Document uploads and file storage are not available yet.",
    image: "/projects/gaadipulse/reminders.webp",
    alt: "GaadiPulse reminder and progress visual",
    tag: "DOCUMENTS & REMINDERS",
  },
] as const;

export const gaadiPulseFaq = [
  [
    "What is GaadiPulse?",
    "GaadiPulse is an Android-first vehicle record app for organising a garage, fuel and charging entries, non-fuel expenses, document details, reminders and shared vehicle access.",
  ],
  [
    "Which vehicles can I add?",
    "GaadiPulse is designed for two-wheelers, cars, commercial vehicles and machinery. The app is now publicly available on Google Play; supported vehicle types may vary by release.",
  ],
  [
    "Can I install it from Google Play?",
    "Yes. GaadiPulse has completed testing and is published on Google Play, where it is now available to everyone. Use the Google Play button to view the listing and install the app.",
  ],
  [
    "Can I download an APK from Google Drive?",
    "The official download is through Google Play. Use the listing linked on this page for installation and app updates.",
  ],
  [
    "Does GaadiPulse track my location or drive automatically?",
    "No. Automatic GPS tracking and telematics are not part of the current release. Records are entered by the user.",
  ],
  [
    "Can I upload receipts or vehicle documents?",
    "Not currently. You can record document details and expiry information, but attaching photos or files is a planned feature and is not advertised as available.",
  ],
  [
    "Does it work offline?",
    "The current focused release requires an internet connection for vehicle records. It does not queue offline entries for automatic upload.",
  ],
  [
    "Is GaadiPulse free?",
    "The app is currently free. There are no subscriptions or ads in the stated product scope.",
  ],
  [
    "How do I contact the developer or request account deletion?",
    "Email mahendrapuniya92@gmail.com. For deletion instructions, see the account deletion page linked below.",
  ],
] as const;
