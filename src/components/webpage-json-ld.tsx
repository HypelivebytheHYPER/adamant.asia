/**
 * WebPage JSON-LD — Base page schema for AEO/GEO 2026
 *
 * Every page should declare itself as a WebPage with @id = canonical URL.
 * This creates the entity anchor that all other schemas reference.
 *
 * Include on every page via layout or page component.
 *
 * @see https://schema.org/WebPage
 */

import { SITE_URL, SITE_NAME } from "@/lib/site";

interface WebPageJsonLdProps {
  url: string;
  title: string;
  description: string;
  datePublished?: string;
  dateModified?: string;
  /** Primary image for the page */
  image?: string;
  /** Page type: WebPage, AboutPage, ContactPage, CollectionPage, etc. */
  pageType?:
    | "WebPage"
    | "AboutPage"
    | "ContactPage"
    | "CollectionPage"
    | "ItemPage"
    | "SearchResultsPage";
  /** Whether this is the main entity of the page */
  mainEntity?: Record<string, unknown>;
}

export function WebPageJsonLd({
  url,
  title,
  description,
  datePublished,
  dateModified,
  image,
  pageType = "WebPage",
  mainEntity,
}: WebPageJsonLdProps) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": pageType,
    "@id": url,
    url,
    name: title,
    headline: title,
    description,
    inLanguage: "en",
    isPartOf: {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
    },
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified } : {}),
    ...(image
      ? {
          image: {
            "@type": "ImageObject",
            url: image,
          },
        }
      : {}),
    ...(mainEntity ? { mainEntity } : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
