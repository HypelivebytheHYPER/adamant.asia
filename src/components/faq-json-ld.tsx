/**
 * FAQPage JSON-LD — Structured Q&A for AI search citations.
 *
 * P0 for GEO: FAQ schema helps AI engines extract direct answers
 * from your content. Use on every page with Q&A content.
 *
 * 2026 update: Strip HTML from answers — schema must be plain text.
 *
 * @see https://developers.google.com/search/docs/appearance/structured-data/faqpage
 */

interface FaqItem {
  question: string;
  answer: string;
}

/** Strip HTML tags and decode basic entities for schema compliance */
function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

export function FaqJsonLd({ items }: { items: FaqItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: stripHtml(item.question),
      acceptedAnswer: {
        "@type": "Answer",
        text: stripHtml(item.answer),
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
