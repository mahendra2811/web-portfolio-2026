import { personalInfo } from "@/data/personal";

interface BlogJsonLdProps {
  title: string;
  excerpt: string;
  slug: string;
  publishedAt: string;
  coverImage: string | null;
  readingTime: number;
  categories: { title: string }[];
}

export function BlogJsonLd({
  title,
  excerpt,
  slug,
  publishedAt,
  coverImage,
  readingTime,
  categories,
}: BlogJsonLdProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://pooniya.com";
  const postUrl = `${siteUrl}/blog/${slug}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: excerpt,
    url: postUrl,
    inLanguage: "en-US",
    datePublished: publishedAt,
    dateModified: publishedAt,
    timeRequired: `PT${readingTime}M`,
    wordCount: readingTime * 200,
    author: {
      "@type": "Person",
      name: personalInfo.name,
      url: personalInfo.portfolio,
      jobTitle: personalInfo.title,
      email: personalInfo.email,
      sameAs: [personalInfo.github, personalInfo.linkedin],
    },
    publisher: {
      "@type": "Person",
      name: personalInfo.name,
      url: personalInfo.portfolio,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    isAccessibleForFree: true,
    ...(coverImage && {
      image: {
        "@type": "ImageObject",
        url: coverImage,
        width: 1200,
        height: 630,
      },
    }),
    ...(categories.length > 0 && {
      keywords: categories.map((c) => c.title).join(", "),
      articleSection: categories[0].title,
    }),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}/blog` },
      { "@type": "ListItem", position: 3, name: title, item: postUrl },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
