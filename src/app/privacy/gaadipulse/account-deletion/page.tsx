import { SimplePrivacyPolicyPage } from "@/components/privacy/SimplePrivacyPolicyPage";
import { gaadiPulseAccountDeletion } from "@/data/gaadipulse-account-deletion";

export const metadata = {
  title: "GaadiPulse Account Deletion",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <SimplePrivacyPolicyPage policy={gaadiPulseAccountDeletion} />;
}
