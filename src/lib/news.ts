/**
 * news.ts — topic source for the auto-blog generator.
 *
 * Uses NewsAPI.org (`NEWS_API_KEY`). Override the search with `NEWS_QUERY`.
 * Failures throw rather than degrade: a post generated with no source material
 * is worse than no post at all.
 */

export const DEFAULT_NEWS_QUERY =
  '("data fraud" OR "ad fraud" OR "click fraud" OR "attribution fraud" OR "bot traffic" OR "marketing analytics fraud")';

export interface NewsArticle {
  title: string;
  description: string;
  url: string;
  source: string;
  publishedAt: string;
}

/**
 * Same fetch, but never throws — the Fraud Watch page must still render when
 * NewsAPI is down, rate-limited, or the key is a development-only key. Returns
 * an empty list plus the reason, and the UI shows its empty state.
 */
export async function fetchNewsArticlesSafe(
  apiKey: string | undefined,
  opts?: {
    query?: string;
    days?: number;
    limit?: number;
    revalidate?: number | false;
  }
): Promise<{ articles: NewsArticle[]; error: string | null }> {
  if (!apiKey) {
    return { articles: [], error: "NEWS_API_KEY is not configured" };
  }
  try {
    return { articles: await fetchNewsArticles(apiKey, opts), error: null };
  } catch (err) {
    const message =
      err instanceof NewsError ? err.message : `News fetch failed: ${String(err)}`;
    console.error(`[fraud-watch] ${message}`);
    return { articles: [], error: message };
  }
}

export class NewsError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly body: string
  ) {
    super(message);
    this.name = "NewsError";
  }
}

/** Fetch recent articles, newest first. Throws NewsError on failure. */
export async function fetchNewsArticles(
  apiKey: string,
  {
    query = process.env.NEWS_QUERY || DEFAULT_NEWS_QUERY,
    days = 14,
    limit = 12,
    /**
     * Seconds to cache the upstream response. `false` disables caching — the
     * cron wants genuinely fresh topics; the Fraud Watch page wants ISR, and
     * `no-store` there would force the whole route dynamic.
     */
    revalidate = false as number | false,
  } = {}
): Promise<NewsArticle[]> {
  const from = new Date(Date.now() - days * 24 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 10);

  const url = new URL("https://newsapi.org/v2/everything");
  url.searchParams.set("q", query);
  url.searchParams.set("from", from);
  url.searchParams.set("language", "en");
  url.searchParams.set("sortBy", "publishedAt");
  url.searchParams.set("pageSize", String(limit));

  const res = await fetch(url, {
    headers: { "X-Api-Key": apiKey, "User-Agent": "adamant.asia-blog-cron" },
    ...(revalidate === false
      ? { cache: "no-store" as const }
      : { next: { revalidate } }),
  });

  const body = await res.text();
  if (!res.ok) {
    throw new NewsError(`NewsAPI request failed (${res.status})`, res.status, body);
  }

  const data = JSON.parse(body) as {
    status: string;
    message?: string;
    articles?: Array<{
      title: string | null;
      description: string | null;
      url: string;
      source: { name: string | null };
      publishedAt: string;
    }>;
  };

  if (data.status !== "ok") {
    throw new NewsError(`NewsAPI returned status "${data.status}"`, res.status, body);
  }

  const articles = (data.articles ?? [])
    .filter((a) => a.title && a.title !== "[Removed]")
    .map((a) => ({
      title: a.title as string,
      description: a.description ?? "",
      url: a.url,
      source: a.source.name ?? "unknown",
      publishedAt: a.publishedAt,
    }));

  if (articles.length === 0) {
    throw new NewsError(`NewsAPI returned no usable articles for "${query}"`, 200, body);
  }

  return articles;
}
