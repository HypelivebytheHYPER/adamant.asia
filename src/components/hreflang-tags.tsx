"use client";

import { SITE_URL } from "@/lib/site";

/**
 * HreflangTags — Manual hreflang implementation for SG/TH targeting.
 *
 * Next.js metadata alternates.languages deduplicates entries that point
 * to the same URL. Since adamant.asia is English-only but targets both
 * Singapore and Thailand, we render these tags manually.
 *
 * Place this component inside <head> or let it render <link> tags.
 */
export function HreflangTags() {
  return (
    <>
      <link rel="alternate" hrefLang="en-SG" href={`${SITE_URL}/`} />
      <link rel="alternate" hrefLang="en-TH" href={`${SITE_URL}/`} />
      <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}/`} />
    </>
  );
}
