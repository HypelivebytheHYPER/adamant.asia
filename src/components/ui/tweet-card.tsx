"use client";

import { cn } from "@/lib/utils";
import { Heart, Repeat2, Eye, BadgeCheck } from "lucide-react";
import type { TestimonialContent } from "@/data/content";

interface MagicTweetProps {
  tweet?: Partial<TestimonialContent>;
  className?: string;
}

function formatDate() {
  return "Apr 16";
}

export function MagicTweet({ tweet, className }: MagicTweetProps) {
  const text = tweet?.quote ?? "";
  const name = tweet?.name ?? "User";
  const handle = tweet?.industry ?? "";
  const initial = name[0]?.toUpperCase() ?? "U";

  const before = tweet?.before;
  const after = tweet?.after;
  const hasBadge = before && after;

  const seed = name.length;
  const likes = (seed * 7 + 12).toLocaleString();
  const retweets = Math.floor(seed * 1.5 + 3).toLocaleString();
  const views = `${(seed * 0.3 + 0.8).toFixed(1)}k`;

  return (
    <article
      className={cn(
        "relative flex w-full flex-col gap-2 rounded-xl border border-border bg-card p-4 shadow-sm transition-[box-shadow,border-color,transform] duration-300 hover:shadow-md hover:border-primary/20",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/60 text-primary-foreground text-xs font-bold ring-1 ring-border flex-shrink-0">
          {initial}
        </div>

        <div className="flex flex-col min-w-0">
          <span className="flex items-center gap-1 text-sm font-bold text-foreground truncate leading-tight">
            {name}
            <BadgeCheck className="h-3 w-3 text-sky-500 flex-shrink-0" />
          </span>
          {handle && (
            <span className="text-xs text-stone truncate leading-tight">
              {handle}
            </span>
          )}
        </div>

        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="ml-auto h-3.5 w-3.5 text-stone/40 flex-shrink-0"
          fill="currentColor"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </div>

      {/* Body — 2 lines, rhythm derived from leading */}
      <p className="text-xs text-foreground/85 line-clamp-2 min-h-10 leading-5">
        {text}
      </p>

      {/* Before → After badge */}
      {hasBadge && (
        <div className="inline-flex items-center gap-1 self-start rounded-full bg-muted/60 px-2 py-0.5 text-xs border border-border/40">
          <span className="text-stone line-through decoration-red-400/50">{before}</span>
          <span className="text-primary font-semibold">→</span>
          <span className="font-semibold text-emerald-600">{after}</span>
        </div>
      )}

      {/* Engagement bar */}
      <div className="flex items-center gap-4 pt-0.5 text-stone text-xs">
        <span className="flex items-center gap-1">
          <Heart className="h-3 w-3 text-rose-400 fill-rose-400/20" />
          <span className="tabular-nums">{likes}</span>
        </span>
        <span className="flex items-center gap-1">
          <Repeat2 className="h-3 w-3 text-emerald-500" />
          <span className="tabular-nums">{retweets}</span>
        </span>
        <span className="flex items-center gap-1">
          <Eye className="h-3 w-3 text-sky-400" />
          <span className="tabular-nums">{views}</span>
        </span>
        <span className="ml-auto opacity-40">{formatDate()}</span>
      </div>
    </article>
  );
}

export function TweetNotFound({ error }: { error?: string }) {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border border-border bg-card p-6 text-center text-sm text-stone">
      <p className="font-semibold text-foreground">Tweet not found</p>
      {error && <p className="text-xs">{String(error)}</p>}
    </div>
  );
}

export function TweetSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex w-full flex-col gap-2 rounded-xl border border-border bg-card p-4 animate-pulse",
        className
      )}
    >
      <div className="flex items-center gap-2.5">
        <div className="h-8 w-8 rounded-full bg-muted" />
        <div className="flex flex-col gap-1">
          <div className="h-3 w-20 rounded bg-muted" />
          <div className="h-2 w-14 rounded bg-muted" />
        </div>
      </div>
      <div className="h-3.5 w-full rounded bg-muted" />
      <div className="h-3.5 w-4/5 rounded bg-muted" />
      <div className="h-2.5 w-16 rounded bg-muted" />
    </div>
  );
}
