"use client";

import { useState } from "react";
import { NewsThumb } from "@/components/news-thumb";

/** Serializable card view model — time/author are precomputed on the server. */
export interface InsightsCardView {
  url: string;
  title: string;
  description: string;
  image: string | null;
  source: string;
  timeLabel: string;
  name: string;
  role: string | null;
  avatar: string;
}

export interface InsightsSection {
  key: string;
  label: string;
  items: InsightsCardView[];
}

/** Cards revealed per "Show more" click (and initially). */
const PAGE = 6;

function Card({ v }: { v: InsightsCardView }) {
  return (
    <a
      href={v.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group mb-12 block break-inside-avoid"
    >
      <p className="text-caption text-stone mb-3">
        <span className="font-medium text-foreground/70" translate="no">
          {v.source}
        </span>
        <span className="px-1.5 text-stone/60">·</span>
        {v.timeLabel}
      </p>

      <h3 className="mb-3 text-headline text-foreground line-clamp-3 group-hover:text-primary transition-colors">
        {v.title}
      </h3>

      {v.description && (
        <p className="mb-5 text-body text-stone leading-relaxed line-clamp-3">{v.description}</p>
      )}

      <NewsThumb url={v.image} source={v.source} />

      <div className="mt-5 flex items-center gap-3">
        <span
          aria-hidden="true"
          className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-border bg-surface text-micro text-stone"
        >
          {v.avatar}
        </span>
        <div className="min-w-0">
          <p className="truncate text-caption font-medium text-foreground">{v.name}</p>
          {v.role && <p className="truncate text-label text-stone">{v.role}</p>}
        </div>
      </div>
    </a>
  );
}

export function InsightsFeed({ sections }: { sections: InsightsSection[] }) {
  const [counts, setCounts] = useState<Record<string, number>>(() =>
    Object.fromEntries(sections.map((s) => [s.key, PAGE]))
  );

  const visibleSections = sections.filter((s) => s.items.length > 0);
  if (visibleSections.length === 0) {
    return (
      <p className="text-body text-stone">No insights available right now. Check back soon.</p>
    );
  }

  return (
    <div className="space-y-16">
      {visibleSections.map((s) => {
        const shown = counts[s.key] ?? PAGE;
        const visible = s.items.slice(0, shown);
        const remaining = s.items.length - shown;
        return (
          <section key={s.key}>
            <h2 className="mb-8 text-caption uppercase tracking-wider font-medium text-foreground">
              {s.label}
            </h2>
            <div className="columns-1 sm:columns-2 xl:columns-3 gap-8">
              {visible.map((v, i) => (
                <Card key={`${v.url}-${i}`} v={v} />
              ))}
            </div>
            {remaining > 0 && (
              <button
                type="button"
                onClick={() => setCounts((c) => ({ ...c, [s.key]: shown + PAGE }))}
                className="mt-2 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-2 text-ui text-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                Show {Math.min(remaining, PAGE)} more
              </button>
            )}
          </section>
        );
      })}
    </div>
  );
}
