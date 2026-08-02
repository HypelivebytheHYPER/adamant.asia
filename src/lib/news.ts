import { z } from "zod";

export const newsArticleSchema = z.object({
  source: z.object({
    id: z.string().nullable().optional(),
    name: z.string(),
  }),
  author: z.string().nullable().optional(),
  title: z.string(),
  description: z.string().nullable().optional(),
  url: z.string().url(),
  urlToImage: z.string().url().nullable().optional(),
  publishedAt: z.string().datetime(),
  content: z.string().nullable().optional(),
});

export const newsApiResponseSchema = z.object({
  status: z.string(),
  totalResults: z.number().int().nonnegative(),
  articles: z.array(newsArticleSchema),
});

export type NewsArticle = z.infer<typeof newsArticleSchema>;
export type NewsApiResponse = z.infer<typeof newsApiResponseSchema>;

const NEWS_API_BASE = "https://newsapi.org/v2/everything";

const DEFAULT_QUERY =
  '("KYC" OR "AML" OR "identity verification" OR "due diligence" OR "RegTech" OR "AI automation" OR "workflow automation" OR "AI agents") AND (compliance OR fintech OR business OR enterprise OR financial)';

/** A topical news section. `match` post-filters NewsAPI results to genuinely on-topic stories. */
export interface NewsTopic {
  key: "kyc" | "ai";
  label: string;
  blurb: string;
  query: string;
  match: RegExp;
}

export const NEWS_TOPICS: NewsTopic[] = [
  {
    key: "kyc",
    label: "KYC & Verification",
    blurb: "Counterparty checks, AML, due diligence and identity verification.",
    query:
      '("KYC" OR "KYB" OR "know your customer" OR "AML" OR "anti-money laundering" OR "identity verification" OR "customer due diligence" OR "sanctions screening" OR "beneficial ownership" OR "RegTech") AND (compliance OR fintech OR bank OR financial OR regulation OR fraud OR onboarding)',
    match:
      /\b(kyc|kyb|know your customer|aml|anti[- ]money laundering|money laundering|identity verification|due diligence|sanctions|beneficial ownership|regtech|financial crime|onboarding|compliance|fraud)\b/i,
  },
  {
    key: "ai",
    label: "AI & Automation",
    blurb: "AI agents, workflow automation and software that runs the busywork.",
    query:
      '("AI automation" OR "workflow automation" OR "business automation" OR "AI agents" OR "generative AI" OR "marketing automation" OR "SaaS") AND (business OR enterprise OR SME OR startup OR operations OR productivity)',
    match: /\b(ai|artificial intelligence|automation|workflow|saas|agent|machine learning|generative|llm)\b/i,
  },
];

export interface FetchNewsOptions {
  query?: string;
  pageSize?: number;
  apiKey?: string;
}

export interface FetchNewsResult {
  ok: boolean;
  articles: NewsArticle[];
  error?: string;
  source: "newsapi" | "fallback";
}

/**
 * Fetch relevant news articles from NewsAPI.
 * Falls back to placeholder articles if no API key is configured or the request fails.
 */
export async function fetchNews(options: FetchNewsOptions = {}): Promise<FetchNewsResult> {
  const { query = DEFAULT_QUERY, pageSize = 50, apiKey = process.env.NEWS_API_KEY } = options;

  if (!apiKey) {
    return {
      ok: true,
      articles: placeholderArticles(),
      source: "fallback",
    };
  }

  const params = new URLSearchParams({
    q: query,
    language: "en",
    sortBy: "publishedAt",
    pageSize: String(pageSize),
    apiKey,
  });

  try {
    const res = await fetch(`${NEWS_API_BASE}?${params.toString()}`, {
      next: { revalidate: 21600 }, // 6 hours
    });

    if (!res.ok) {
      const text = await res.text();
      return {
        ok: false,
        articles: placeholderArticles(),
        error: `NewsAPI HTTP ${res.status}: ${text}`,
        source: "fallback",
      };
    }

    const raw = await res.json();
    const parsed = newsApiResponseSchema.safeParse(raw);

    if (!parsed.success) {
      return {
        ok: false,
        articles: placeholderArticles(),
        error: `Zod validation failed: ${parsed.error.message}`,
        source: "fallback",
      };
    }

    const articles = parsed.data.articles.filter(
      (a) => a.title && a.title !== "[Removed]" && a.url
    );

    return {
      ok: true,
      articles,
      source: "newsapi",
    };
  } catch (err) {
    return {
      ok: false,
      articles: placeholderArticles(),
      error: err instanceof Error ? err.message : String(err),
      source: "fallback",
    };
  }
}

/**
 * Fetch one topical section: query NewsAPI for the topic, then post-filter to
 * stories that genuinely mention the topic in their title/description (NewsAPI's
 * boolean matching is loose, so this guarantees on-topic results).
 */
export async function fetchNewsTopic(
  topic: NewsTopic,
  options: { apiKey?: string } = {}
): Promise<FetchNewsResult> {
  const result = await fetchNews({ query: topic.query, apiKey: options.apiKey });
  const articles = result.articles.filter((a) =>
    topic.match.test(`${a.title} ${a.description ?? ""}`)
  );
  return { ...result, articles };
}

function placeholderArticles(): NewsArticle[] {
  return [
    {
      source: { name: "Adamant Insights" },
      author: "Adamant Editorial",
      title: "How KYC and KYB requirements are tightening across Southeast Asia",
      description:
        "Regulators in Singapore, Thailand, and Malaysia are raising the bar on customer and business verification. Here is what it means for cross-border deals.",
      url: "https://adamant.asia/verify",
      urlToImage: null,
      publishedAt: new Date().toISOString(),
      content:
        "Know-your-customer and know-your-business checks are no longer a box-ticking exercise. Across Southeast Asia, regulators now expect ongoing verification...",
    },
    {
      source: { name: "Adamant Insights" },
      author: "Adamant Editorial",
      title: "AML screening: why ongoing monitoring beats a one-time check",
      description:
        "A counterparty that was clean at onboarding can appear on a sanctions or adverse-media list months later. Continuous monitoring closes that gap.",
      url: "https://adamant.asia/verify",
      urlToImage: null,
      publishedAt: new Date(Date.now() - 86400000).toISOString(),
      content:
        "Anti-money-laundering risk is not static. Periodic re-screening against sanctions and adverse-media sources catches changes a one-time check would miss...",
    },
    {
      source: { name: "Adamant Insights" },
      author: "Adamant Editorial",
      title: "Beneficial ownership and due diligence in cross-border deals",
      description:
        "Knowing who ultimately owns and controls a counterparty is the hardest part of due diligence — and the most important before you commit capital.",
      url: "https://adamant.asia/verify",
      urlToImage: null,
      publishedAt: new Date(Date.now() - 172800000).toISOString(),
      content:
        "Layered ownership structures can hide the real parties behind a transaction. Establishing ultimate beneficial ownership is central to credible due diligence...",
    },
    {
      source: { name: "Adamant Insights" },
      author: "Adamant Editorial",
      title: "AI agents and workflow automation are reshaping back-office operations",
      description:
        "From inbox triage to report generation, AI workflows are quietly removing the repetitive tasks that slow teams down.",
      url: "https://adamant.asia/ai",
      urlToImage: null,
      publishedAt: new Date(Date.now() - 259200000).toISOString(),
      content:
        "Business automation has moved beyond rules engines. AI agents now handle routing, drafting and follow-up across the tools teams already use...",
    },
    {
      source: { name: "Adamant Insights" },
      author: "Adamant Editorial",
      title: "Why two-week SaaS builds beat six-month roadmaps for SMEs",
      description:
        "Short, scoped build cycles keep software aligned with how a business actually works — and ship before requirements change.",
      url: "https://adamant.asia/ai",
      urlToImage: null,
      publishedAt: new Date(Date.now() - 345600000).toISOString(),
      content:
        "The six-month roadmap is breaking down for small and mid-sized teams. Focused two-week builds deliver working software while the need is still fresh...",
    },
  ];
}
