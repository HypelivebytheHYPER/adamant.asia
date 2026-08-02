/**
 * Service JSON-LD — For solution/service pages
 *
 * Service pages should use Service schema, NOT Article/BlogPosting.
 * Mismatched schema types confuse AI engines and hurt citation rates.
 *
 * 2026 AEO/GEO: Include provider, areaServed, hasOfferCatalog,
 * and aggregateRating if available.
 *
 * @see https://schema.org/Service
 */

import { SITE_URL, SITE_NAME } from "@/lib/site";

interface ServiceJsonLdProps {
  name: string;
  description: string;
  url: string;
  image?: string;
  /** Service categories for topical matching */
  serviceType?: string;
  /** Areas served — SG, TH, etc. */
  areaServed?: string[];
  /** Price range indicator: $, $$, $$$, $$$$ */
  priceRange?: string;
  /** Estimated cost with currency */
  estimatedCost?: {
    currency: string;
    value: string;
  };
  /** FAQ items for this service */
  faq?: { question: string; answer: string }[];
  /** Related services as references */
  isRelatedTo?: string[];
}

export function ServiceJsonLd({
  name,
  description,
  url,
  image,
  serviceType,
  areaServed = ["SG", "TH", "MY"],
  priceRange = "$$",
  estimatedCost,
  faq,
  isRelatedTo,
}: ServiceJsonLdProps) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name,
    description,
    url,
    provider: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
    },
    ...(serviceType ? { serviceType } : {}),
    areaServed: areaServed.map((code) => ({
      "@type": "Country",
      name: code === "SG" ? "Singapore" : code === "TH" ? "Thailand" : code === "MY" ? "Malaysia" : code,
      identifier: code,
    })),
    priceRange,
    ...(image
      ? {
          image: {
            "@type": "ImageObject",
            url: image,
          },
        }
      : {}),
    ...(estimatedCost
      ? {
          estimatedCost: {
            "@type": "MonetaryAmount",
            currency: estimatedCost.currency,
            value: estimatedCost.value,
          },
        }
      : {}),
    ...(isRelatedTo?.length
      ? {
          isRelatedTo: isRelatedTo.map((relatedUrl) => ({
            "@type": "Service",
            url: relatedUrl,
          })),
        }
      : {}),
  };

  /* If FAQ provided, wrap in @graph with FAQPage */
  if (faq && faq.length > 0) {
    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              schema,
              {
                "@type": "FAQPage",
                mainEntity: faq.map((item) => ({
                  "@type": "Question",
                  name: item.question,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: item.answer,
                  },
                })),
              },
            ],
          }),
        }}
      />
    );
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
