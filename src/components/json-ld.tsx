"use client";

import { SITE_URL, CONTACT_EMAIL, SOCIAL_PROFILES } from "@/lib/site";

/**
 * JSON-LD Structured Data for E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness)
 * 2026 SEO best practice: Organization + WebSite schema
 */

export function JsonLd() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Adamant",
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.svg`,
    description:
      "Custom SaaS tools and marketing systems built in two weeks. AI-powered workflows, campaign dashboards, and automation for teams that need to move faster.",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: CONTACT_EMAIL,
      availableLanguage: ["English"],
    },
    sameAs: [SOCIAL_PROFILES.linkedin],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Adamant",
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "SaaS Mini Build and Marketing System Design",
    provider: {
      "@type": "Organization",
      name: "Adamant",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Business Systems",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "SaaS Mini Build",
            description: "Custom internal tools and lightweight apps shipped in two weeks.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Marketing System",
            description: "Campaign dashboards, influencer tracking, and content operations.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "AI Workflow Automation",
            description: "Automated pipelines connecting the tools your team already uses.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "KOL Leaderboard",
            description: "Real-time creator performance tracking and campaign analytics.",
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
