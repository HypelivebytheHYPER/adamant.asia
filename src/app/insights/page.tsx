import type { Metadata } from "next";
import Link from "next/link";
import { BlurFade } from "@/components/animations/blur-fade";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-json-ld";
import { WebPageJsonLd } from "@/components/webpage-json-ld";
import { fetchNewsTopic, NEWS_TOPICS, type NewsArticle } from "@/lib/news";
import { InsightsFeed, type InsightsCardView, type InsightsSection } from "@/components/insights-feed";
import { SITE_URL } from "@/lib/site";
import { ArrowRight } from "lucide-react";

const META_DESCRIPTION =
  "Timely analysis of the events shaping counterparty verification — KYC, AML, due diligence — and AI automation across Southeast Asia.";

export const metadata: Metadata = {
  title: "Insights — Adamant",
  description: META_DESCRIPTION,
  alternates: { canonical: "/insights" },
  openGraph: {
    title: "Insights — Adamant",
    description: META_DESCRIPTION,
    url: `${SITE_URL}/insights`,
    images: [`${SITE_URL}/opengraph-image`],
  },
};

export const revalidate = 21600;

function relativeTime(iso: string): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "";
  const days = Math.round((Date.now() - then) / 86_400_000);
  if (days <= 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  if (days < 30) {
    const w = Math.round(days / 7);
    return `${w} week${w > 1 ? "s" : ""} ago`;
  }
  const m = Math.round(days / 30);
  return `${m} month${m > 1 ? "s" : ""} ago`;
}

function cleanAuthor(author?: string | null): string | null {
  const a = author?.trim();
  if (!a) return null;
  if (/^https?:\/\//i.test(a) || a.length > 48) return null;
  return a;
}

function initials(label: string): string {
  const parts = label
    .replace(/\.(com|net|org|io|co|gov|news)$/i, "")
    .split(/[\s.@/-]+/)
    .filter(Boolean);
  return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase() || "•";
}

function toView(a: NewsArticle): InsightsCardView {
  const author = cleanAuthor(a.author);
  const name = author ?? a.source.name;
  return {
    url: a.url,
    title: a.title,
    description: a.description ?? "",
    image: a.urlToImage ?? null,
    source: a.source.name,
    timeLabel: relativeTime(a.publishedAt),
    name,
    role: author ? a.source.name : null,
    avatar: initials(name),
  };
}

export default async function InsightsPage() {
  const results = await Promise.all(
    NEWS_TOPICS.map((topic) =>
      fetchNewsTopic(topic).then((r) => ({
        topic,
        // Live feed: only stories with a real preview image (every card gets a thumbnail).
        articles:
          r.source === "newsapi" ? r.articles.filter((a) => Boolean(a.urlToImage)) : r.articles,
        source: r.source,
      }))
    )
  );

  const isFallback = results.some((r) => r.source === "fallback");
  const sections: InsightsSection[] = results.map((r) => ({
    key: r.topic.key,
    label: r.topic.label,
    items: r.articles.map(toView),
  }));

  return (
    <>
      <WebPageJsonLd
        url={`${SITE_URL}/insights`}
        title="Insights — Adamant"
        description={META_DESCRIPTION}
        pageType="CollectionPage"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${SITE_URL}/` },
          { name: "Insights", url: `${SITE_URL}/insights` },
        ]}
      />
      <main className="min-h-screen bg-background text-foreground">
        <section className="section-pad">
          <div className="container max-w-7xl">
            <div className="lg:grid lg:grid-cols-[minmax(0,260px)_minmax(0,1fr)] lg:gap-16">
              {/* Left masthead */}
              <aside className="mb-12 lg:mb-0 lg:sticky lg:top-28 self-start">
                <BlurFade>
                  <h1 className="text-display text-foreground">Insights</h1>
                  <p className="mt-5 text-body text-stone leading-relaxed max-w-xs">
                    {META_DESCRIPTION}
                  </p>
                  <Link
                    href="/contact"
                    className="mt-6 inline-flex items-center gap-1.5 text-ui text-foreground hover:text-primary transition-colors underline underline-offset-4 decoration-border hover:decoration-primary"
                  >
                    Engage us
                    <ArrowRight size={14} strokeWidth={2} aria-hidden="true" />
                  </Link>
                  {isFallback && (
                    <p className="mt-6 text-label text-stone">
                      Showing featured insights. Set{" "}
                      <code className="text-foreground bg-surface px-1 py-0.5 rounded">
                        NEWS_API_KEY
                      </code>{" "}
                      to enable live aggregation.
                    </p>
                  )}
                </BlurFade>
              </aside>

              {/* Right feed (client: masonry + show-more pagination) */}
              <InsightsFeed sections={sections} />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
