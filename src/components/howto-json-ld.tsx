/**
 * HowTo JSON-LD — Step-by-step process schema
 *
 * P1 for GEO: Helps AI engines answer "How do I..." queries
 * with structured step content.
 *
 * 2026 update: Add supply[] and tool[] for rich result eligibility.
 *
 * @see https://developers.google.com/search/docs/appearance/structured-data/how-to
 */

interface HowToStep {
  name: string;
  text: string;
  url?: string;
  image?: string;
}

interface HowToJsonLdProps {
  name: string;
  description: string;
  steps: HowToStep[];
  totalTime?: string; // ISO 8601 duration, e.g. "PT2W"
  supply?: string[];
  tool?: string[];
  estimatedCost?: {
    currency: string;
    value: string;
  };
}

export function HowToJsonLd({
  name,
  description,
  steps,
  totalTime,
  supply,
  tool,
  estimatedCost,
}: HowToJsonLdProps) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(step.url ? { url: step.url } : {}),
      ...(step.image
        ? {
            image: {
              "@type": "ImageObject",
              url: step.image,
            },
          }
        : {}),
    })),
  };

  if (totalTime) {
    schema.totalTime = totalTime;
  }

  if (supply && supply.length > 0) {
    schema.supply = supply.map((s) => ({
      "@type": "HowToSupply",
      name: s,
    }));
  }

  if (tool && tool.length > 0) {
    schema.tool = tool.map((t) => ({
      "@type": "HowToTool",
      name: t,
    }));
  }

  if (estimatedCost) {
    schema.estimatedCost = {
      "@type": "MonetaryAmount",
      currency: estimatedCost.currency,
      value: estimatedCost.value,
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
