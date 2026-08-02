/**
 * Article / BlogPosting JSON-LD — AEO/GEO optimized 2026
 *
 * Uses BlogPosting for blog content, Article for guides.
 * Includes speakable for AI citation extraction,
 * ImageObject with dimensions for rich results,
 * and full Person author with sameAs for E-E-A-T.
 *
 * @see https://developers.google.com/search/docs/appearance/structured-data/article
 */

import { SITE_URL, SITE_NAME, SOCIAL_PROFILES } from "@/lib/site";

interface ArticleJsonLdProps {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  modifiedAt?: string;
  author: {
    name: string;
    url: string;
    sameAs?: string[];
    knowsAbout?: string[];
  };
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  keywords?: string[];
  /** Use "BlogPosting" for blog posts, "Article" for evergreen guides */
  schemaType?: "BlogPosting" | "Article";
  /** CSS selector for the speakable (direct answer) section */
  speakableSelector?: string;
  /** Word count for reading time estimation */
  wordCount?: number;
}

export function ArticleJsonLd({
  title,
  description,
  url,
  publishedAt,
  modifiedAt,
  author,
  image,
  imageWidth = 1200,
  imageHeight = 630,
  keywords,
  schemaType = "BlogPosting",
  speakableSelector = "#direct-answer",
  wordCount,
}: ArticleJsonLdProps) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": schemaType,
    "@id": `${url}#${schemaType.toLowerCase()}`,
    headline: title,
    description,
    image: {
      "@type": "ImageObject",
      url: image || `${SITE_URL}/opengraph-image`,
      width: imageWidth,
      height: imageHeight,
      caption: title,
    },
    datePublished: publishedAt,
    dateModified: modifiedAt || publishedAt,
    author: {
      "@type": "Person",
      "@id": author.url,
      name: author.name,
      url: author.url,
      sameAs: [
        SOCIAL_PROFILES.linkedin,
        ...(author.sameAs || []),
      ],
      knowsAbout: author.knowsAbout || [
        "SaaS Development",
        "AI Workflow Automation",
        "Marketing Systems",
      ],
      worksFor: {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
      },
    },
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        "@id": `${SITE_URL}/#logo`,
        url: `${SITE_URL}/logo.png`,
        width: 512,
        height: 512,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    url,
    inLanguage: "en",
    isAccessibleForFree: true,
    ...(keywords?.length ? { keywords: keywords.join(", ") } : {}),
    ...(wordCount ? { wordCount } : {}),
  };

  /* speakable: helps AI engines identify the direct answer passage */
  schema.speakable = {
    "@type": "SpeakableSpecification",
    cssSelector: [speakableSelector, "h1", "article h2"],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
