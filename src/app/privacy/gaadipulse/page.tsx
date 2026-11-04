import { SimplePrivacyPolicyPage } from "@/components/privacy/SimplePrivacyPolicyPage";
import { gaadiPulsePrivacy } from "@/data/gaadipulse-privacy";

export const metadata = {
  title: "GaadiPulse Privacy Policy",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <SimplePrivacyPolicyPage policy={gaadiPulsePrivacy} />;
}
