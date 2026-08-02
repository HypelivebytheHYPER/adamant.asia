/**
 * fraud-watch.tsx — live editorial feed of data-fraud coverage.
 *
 * Server component. Reads NEWS_API_KEY server-side only; the key never
 * reaches the browser. Deliberately typographic rather than thumbnail-driven:
 * NewsAPI image URLs point at arbitrary publisher CDNs, and whitelisting `**`
 * in next.config remotePatterns would turn the image optimizer into an open
 * proxy for any host on the internet.
 *
 * Composable on purpose — drop <FraudWatch /> into the homepage or any page.
 */

import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { fetchNewsArticlesSafe, type NewsArticle } from "@/lib/news";

/** Relative age, e.g. "3d ago". Recency is the whole point of this section. */
function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const hours = Math.floor(diff / 3_600_000);
  if (hours < 1) return "just now";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
}

function ArticleRow({ article, index }: { article: NewsArticle; index: number }) {
  return (
    <li className="group border-b border-border last:border-b-0">
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="grid grid-cols-[2.5rem_1fr] gap-4 py-6 transition-colors hover:bg-muted/40 md:grid-cols-[3.5rem_1fr] md:gap-6 md:py-8"
      >
        <span
          aria-hidden
          className="pt-1 font-mono text-sm tabular-nums text-dim transition-colors group-hover:text-amber"
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="min-w-0 space-y-2">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <Badge variant="secondary" className="font-mono text-[0.7rem] uppercase tracking-wide">
              {article.source}
            </Badge>
            <time
              dateTime={article.publishedAt}
              className="font-mono text-xs tabular-nums text-dim"
            >
              {timeAgo(article.publishedAt)}
            </time>
          </div>

          <h3 className="text-balance font-serif text-xl leading-snug text-foreground transition-colors group-hover:text-amber md:text-2xl">
            {article.title}
            <ArrowUpRight
              aria-hidden
              className="ml-1.5 inline-block h-4 w-4 shrink-0 -translate-y-0.5 opacity-0 transition-opacity group-hover:opacity-100"
            />
          </h3>

          {article.description && (
            <p className="line-clamp-2 max-w-2xl text-sm leading-relaxed text-stone">
              {article.description}
            </p>
          )}
        </div>
      </a>
    </li>
  );
}

export async function FraudWatch({ limit = 12 }: { limit?: number }) {
  const { articles, error } = await fetchNewsArticlesSafe(process.env.NEWS_API_KEY, {
    limit,
    revalidate: 3600,
  });

  return (
    <section id="fraud-watch" className="relative bg-background scroll-mt-16 cv-section">
      <div className="container relative py-24 md:py-32">
        <div className="mx-auto max-w-3xl">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-amber" />
              </span>
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-dim">
                Fraud Watch
              </span>
            </div>

            <h2 className="text-balance font-serif text-3xl leading-tight text-foreground md:text-5xl">
              What the industry is reporting about data fraud
            </h2>

            <p className="max-w-xl text-base leading-relaxed text-stone">
              Ad fraud, bot traffic, and attribution gaps — pulled from the last two
              weeks of reporting. Headlines link to the original publisher.
            </p>
          </div>

          {/* Feed */}
          {articles.length > 0 ? (
            <ol className="mt-12 border-t border-border md:mt-16">
              {articles.map((article, i) => (
                <ArticleRow key={article.url} article={article} index={i} />
              ))}
            </ol>
          ) : (
            <div className="mt-12 rounded-lg border border-dashed border-border px-6 py-14 text-center md:mt-16">
              <p className="font-serif text-lg text-foreground">
                The feed is quiet right now.
              </p>
              <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-stone">
                {error
                  ? "We couldn't reach the news service. It'll refill on the next refresh."
                  : "No new coverage matched in the last two weeks."}
              </p>
            </div>
          )}

          {articles.length > 0 && (
            <p className="mt-8 font-mono text-xs text-dim">
              {articles.length} stories · refreshed hourly · sourced via NewsAPI
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
