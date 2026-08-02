import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// AEO: we WANT to be cited by AI answer engines, so explicitly welcome their
// crawlers (search/citation + training + AI-Overview grounding). They're allowed
// by default under "*", but the explicit rule documents the conscious decision
// and future-proofs against default changes. Private paths stay disallowed.
const PRIVATE_PATHS = ["/api/", "/dashboard/", "/admin/"];

const AI_CRAWLERS = [
  "GPTBot", "OAI-SearchBot", "ChatGPT-User", // OpenAI (training, search, user fetch)
  "ClaudeBot", "anthropic-ai", "Claude-Web", // Anthropic
  "PerplexityBot", "Perplexity-User", // Perplexity
  "Google-Extended", // Gemini / Google AI Overviews grounding
  "Applebot-Extended", // Apple Intelligence
  "CCBot", // Common Crawl (feeds many LLMs)
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: PRIVATE_PATHS },
      { userAgent: AI_CRAWLERS, allow: "/", disallow: PRIVATE_PATHS },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
