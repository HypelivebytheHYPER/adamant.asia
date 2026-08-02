/**
 * Person JSON-LD — Author entity for E-E-A-T
 *
 * P0 for GEO: AI engines need to verify the person behind the content.
 * Same name, same bio, same photo everywhere = entity consolidation.
 *
 * 2026 update: Add knowsAbout, alumniOf, hasCredential for
 * expertise verification in AI citations.
 *
 * @see https://developers.google.com/search/docs/appearance/structured-data/person
 */

import { SITE_URL, SOCIAL_PROFILES } from "@/lib/site";

interface PersonJsonLdProps {
  name: string;
  jobTitle: string;
  description: string;
  url: string;
  image?: string;
  sameAs?: string[];
  knowsAbout?: string[];
  alumniOf?: string;
  hasCredential?: string;
}

export function PersonJsonLd({
  name,
  jobTitle,
  description,
  url,
  image,
  sameAs,
  knowsAbout,
  alumniOf,
  hasCredential,
}: PersonJsonLdProps) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": url,
    name,
    jobTitle,
    description,
    url,
    ...(image ? { image } : {}),
    sameAs: [
      SOCIAL_PROFILES.linkedin,
      ...(sameAs || []),
    ],
    knowsAbout: knowsAbout || [
      "SaaS Development",
      "AI Workflow Automation",
      "Marketing Systems",
      "Campaign Management",
      "Business Process Automation",
    ],
    worksFor: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Adamant",
      url: SITE_URL,
    },
  };

  if (alumniOf) {
    schema.alumniOf = {
      "@type": "Organization",
      name: alumniOf,
    };
  }

  if (hasCredential) {
    schema.hasCredential = {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: hasCredential,
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
