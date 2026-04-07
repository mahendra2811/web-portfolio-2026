import { personalInfo } from "@/data/personal";

export function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: personalInfo.name,
    url: personalInfo.portfolio,
    jobTitle: personalInfo.title,
    worksFor: {
      "@type": "Organization",
      name: "Primathon",
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Indian Institute of Information Technology, Dharwad",
    },
    sameAs: [personalInfo.github, personalInfo.linkedin],
    email: personalInfo.email,
    description: personalInfo.bio.short,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
