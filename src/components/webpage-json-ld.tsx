/**
 * WebPage JSON-LD — page-level entity for AboutPage / ItemPage
 * https://schema.org/WebPage
 */

import { SITE_URL, SITE_NAME } from "@/lib/site";

interface WebPageJsonLdProps {
  url: string;
  title: string;
  description: string;
  /** Narrows the schema type — defaults to a plain WebPage */
  pageType?: "WebPage" | "AboutPage" | "ItemPage" | "CollectionPage";
  datePublished?: string;
  dateModified?: string;
  image?: string;
}

export function WebPageJsonLd({
  url,
  title,
  description,
  pageType = "WebPage",
  datePublished,
  dateModified,
  image,
}: WebPageJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": pageType,
    "@id": url,
    url,
    name: title,
    description,
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
    ...(datePublished && { datePublished }),
    ...(dateModified && { dateModified }),
    ...(image && { primaryImageOfPage: { "@type": "ImageObject", url: image } }),
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
