"use client";

/**
 * JSON-LD Structured Data for E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness)
 * 2026 SEO best practice: Organization + LocalBusiness + WebSite schema
 */

export function JsonLd() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Adamant",
    alternateName: "Adamant Asia",
    url: "https://adamant.asia",
    logo: "https://adamant.asia/favicon.svg",
    description:
      "We build systems that keep your business moving. Custom workflows, CRM setup, dashboards, and websites for small teams in Southeast Asia.",
    foundingDate: "2024",
    areaServed: {
      "@type": "Place",
      name: "Southeast Asia",
      containsPlace: [
        { "@type": "City", name: "Bangkok", address: { "@type": "PostalAddress", addressCountry: "TH" } },
        { "@type": "City", name: "Singapore", address: { "@type": "PostalAddress", addressCountry: "SG" } },
      ],
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "hello@adamant.asia",
      availableLanguage: ["English", "Thai"],
    },
    sameAs: [],
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Adamant",
    image: "https://adamant.asia/og-image.svg",
    url: "https://adamant.asia",
    telephone: "",
    email: "hello@adamant.asia",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bangkok",
      addressCountry: "TH",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 13.7563,
      longitude: 100.5018,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    serviceType: [
      "Workflow Automation",
      "CRM Setup",
      "Business Process Design",
      "Dashboard Development",
      "Website Development",
    ],
    areaServed: {
      "@type": "Place",
      name: "Southeast Asia",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Adamant",
    url: "https://adamant.asia",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://adamant.asia/?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Workflow Design and Automation",
    provider: {
      "@type": "Organization",
      name: "Adamant",
    },
    areaServed: {
      "@type": "Place",
      name: "Southeast Asia",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Workflow Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Workflow & CRM",
            description: "Connect LINE, Lark, Gmail. Automate repeated work.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Website & Launch",
            description: "Brief to live site in days.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "AI Marketing",
            description: "Autopost tuned to your voice.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Growth Dashboard",
            description: "Real-time numbers. See what works.",
          },
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />
    </>
  );
}
