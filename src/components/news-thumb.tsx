"use client";

import { useState } from "react";
import { Newspaper } from "lucide-react";

interface NewsThumbProps {
  url?: string | null;
  source: string;
}

/**
 * Article thumbnail for the Insights feed.
 *
 * NewsAPI returns `urlToImage` from arbitrary publisher hosts, so we use a
 * plain <img> (next/image would require per-host remotePatterns). When the
 * image is missing or fails to load, we fall back to a branded gradient tile
 * carrying the source name — no broken-image icons.
 */
export function NewsThumb({ url, source }: NewsThumbProps) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(url) && !failed;

  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-foreground/[0.04]">
      {showImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={url as string}
          alt={`${source} article thumbnail`}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-primary/15 via-surface to-foreground/[0.06]">
          <Newspaper size={22} className="text-primary/70" strokeWidth={1.5} />
          <span className="px-4 text-center text-caption font-medium text-stone line-clamp-1">
            {source}
          </span>
        </div>
      )}
    </div>
  );
}
