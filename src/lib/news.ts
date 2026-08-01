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
  { query = process.env.NEWS_QUERY || DEFAULT_NEWS_QUERY, days = 14, limit = 12 } = {}
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
    cache: "no-store",
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
