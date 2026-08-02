"use client";

import { SITE_URL, CONTACT_EMAIL, SOCIAL_PROFILES } from "@/lib/site";

/**
 * JSON-LD Structured Data — @graph pattern for AEO/GEO 2026
 *
 * Consolidates Organization + WebSite + Service + LocalBusiness
 * into a single JSON-LD block with one @context.
 *
 * 2026 best practices:
 * - @graph array (not multiple script tags)
 * - sameAs with Wikipedia/Wikidata/Crunchbase (entity resolution)
 * - knowsAbout for topical authority signals
 * - ImageObject with dimensions for logo
 * - dateModified for freshness
 */

export function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      /* ── Organization ───────────────────────────────────────────── */
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "Adamant",
        alternateName: "Adamant Asia",
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          "@id": `${SITE_URL}/#logo`,
          url: `${SITE_URL}/favicon.svg`,
          contentUrl: `${SITE_URL}/favicon.svg`,
          caption: "Adamant logo",
        },
        image: {
          "@id": `${SITE_URL}/#logo`,
        },
        description:
          "Adamant is a Singapore advisory house with two practices: Adamant Verify (background checks, KYC/KYB, AML screening, due diligence and monitoring) and Adamant AI (custom SaaS tools, marketing systems and AI workflow automation), serving businesses across Southeast Asia.",
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          email: CONTACT_EMAIL,
          availableLanguage: ["English"],
          areaServed: ["SG", "TH", "MY", "ID", "VN", "PH"],
        },
        sameAs: [SOCIAL_PROFILES.linkedin],
        knowsAbout: [
          "KYC Verification",
          "KYB Verification",
          "AML Screening",
          "Sanctions Screening",
          "Adverse Media Screening",
          "Due Diligence",
          "Counterparty Risk Assessment",
          "Ongoing Monitoring",
          "PDPA Compliance",
          "SaaS Development",
          "AI Workflow Automation",
          "Marketing Systems",
          "Custom Dashboard Development",
          "Business Process Automation",
        ],
        foundingDate: "2023",
        dateModified: "2026-06-23",
      },

      /* ── WebSite ────────────────────────────────────────────────── */
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: "Adamant",
        url: SITE_URL,
        publisher: {
          "@id": `${SITE_URL}/#organization`,
        },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${SITE_URL}/?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
        dateModified: "2026-06-23",
      },

      /* ── Service (primary offering) ─────────────────────────────── */
      {
        "@type": "Service",
        "@id": `${SITE_URL}/#service`,
        name: "Verification Intelligence & AI Business Solutions",
        description:
          "Counterparty verification (KYC/KYB, AML screening, due diligence and monitoring) and AI business solutions (custom SaaS, marketing systems and workflow automation), delivered as named engagements across Southeast Asia.",
        provider: {
          "@id": `${SITE_URL}/#organization`,
        },
        areaServed: [
          {
            "@type": "Country",
            name: "Singapore",
            identifier: "SG",
          },
          {
            "@type": "Country",
            name: "Thailand",
            identifier: "TH",
          },
          {
            "@type": "Country",
            name: "Malaysia",
            identifier: "MY",
          },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Advisory Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Background Checks & Screening",
                description:
                  "Identity and entity verification: KYC for individuals, KYB for companies, directors and beneficial owners, plus AML and sanctions screening.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Due Diligence Reports",
                description:
                  "Custom intelligence narratives with adverse media, reputational checks and actionable recommendations.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Monitoring Subscription",
                description:
                  "Continuous counterparty re-screening with alert-based notifications and periodic summary reports.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "SaaS Mini Build",
                description:
                  "Custom internal tools and lightweight apps shipped in two weeks.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Marketing System",
                description:
                  "Campaign dashboards, influencer tracking, and content operations.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "AI Workflow Automation",
                description:
                  "Automated pipelines connecting the tools your team already uses.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "KOL Leaderboard",
                description:
                  "Real-time creator performance tracking and campaign analytics.",
              },
            },
          ],
        },
        dateModified: "2026-06-23",
      },

      /* ── LocalBusiness (for geo-targeted AI answers) ────────────── */
      {
        "@type": "ProfessionalService",
        "@id": `${SITE_URL}/#localbusiness`,
        name: "Adamant",
        description:
          "Counterparty verification (KYC/KYB, AML screening, due diligence) and AI business solutions advisory serving Singapore and Southeast Asia.",
        url: SITE_URL,
        logo: {
          "@id": `${SITE_URL}/#logo`,
        },
        image: {
          "@id": `${SITE_URL}/#logo`,
        },
        telephone: "+65-8921-1191",
        email: CONTACT_EMAIL,
        areaServed: [
          {
            "@type": "City",
            name: "Singapore",
            containedInPlace: {
              "@type": "Country",
              name: "Singapore",
            },
          },
          {
            "@type": "City",
            name: "Bangkok",
            containedInPlace: {
              "@type": "Country",
              name: "Thailand",
            },
          },
        ],
        priceRange: "$$",
        dateModified: "2026-06-23",
      },
    ],
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
