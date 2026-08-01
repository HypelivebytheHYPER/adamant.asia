/**
 * Person JSON-LD — author/founder entity for E-E-A-T signals
 * https://developers.google.com/search/docs/appearance/structured-data/article#author
 */

import { SITE_URL, SITE_NAME } from "@/lib/site";

interface PersonJsonLdProps {
  name: string;
  jobTitle?: string;
  description?: string;
  url: string;
  image?: string;
  /** Profile URLs that corroborate the identity (LinkedIn, X, …) */
  sameAs?: string[];
  /** Topical expertise — feeds E-E-A-T evaluation */
  knowsAbout?: string[];
}

export function PersonJsonLd({
  name,
  jobTitle,
  description,
  url,
  image,
  sameAs = [],
  knowsAbout = [],
}: PersonJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${url}#person`,
    name,
    url,
    ...(jobTitle && { jobTitle }),
    ...(description && { description }),
    ...(image && { image }),
    ...(sameAs.length > 0 && { sameAs }),
    ...(knowsAbout.length > 0 && { knowsAbout }),
    worksFor: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}
