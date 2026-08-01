/**
 * Article JSON-LD — Google article rich result support
 * https://developers.google.com/search/docs/appearance/structured-data/article
 */

import { SITE_URL, SITE_NAME } from "@/lib/site";

interface ArticleAuthor {
  name: string;
  url?: string;
  knowsAbout?: string[];
}

interface ArticleJsonLdProps {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  modifiedAt?: string;
  author: ArticleAuthor;
  image: string;
  imageWidth?: number;
  imageHeight?: number;
  keywords?: string[];
  schemaType?: "Article" | "BlogPosting" | "NewsArticle";
  /** CSS selector marking the passage eligible for voice/speakable results */
  speakableSelector?: string;
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
  imageWidth,
  imageHeight,
  keywords = [],
  schemaType = "Article",
  speakableSelector,
  wordCount,
}: ArticleJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": schemaType,
    headline: title,
    description,
    url,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    datePublished: publishedAt,
    dateModified: modifiedAt || publishedAt,
    author: {
      "@type": "Person",
      name: author.name,
      ...(author.url && { url: author.url, "@id": `${author.url}#person` }),
      ...(author.knowsAbout?.length && { knowsAbout: author.knowsAbout }),
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/favicon.svg`,
      },
    },
    image: {
      "@type": "ImageObject",
      url: image,
      ...(imageWidth && { width: imageWidth }),
      ...(imageHeight && { height: imageHeight }),
    },
    ...(keywords.length > 0 && { keywords: keywords.join(", ") }),
    ...(wordCount && { wordCount }),
    ...(speakableSelector && {
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: [speakableSelector],
      },
    }),
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
