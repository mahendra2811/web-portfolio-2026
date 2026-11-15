import { SimplePrivacyPolicyPage } from "@/components/privacy/SimplePrivacyPolicyPage";
import { constructionSaathiPrivacy } from "@/data/construction-saathi-privacy";
import { createPrivacyMetadata } from "@/lib/privacy-metadata";

export const metadata = createPrivacyMetadata(constructionSaathiPrivacy, "/privacy/construction-saathi", "Construction Saathi privacy policy for company, staff and site records.");
export default function Page() {
  return <SimplePrivacyPolicyPage policy={constructionSaathiPrivacy} />;
}
