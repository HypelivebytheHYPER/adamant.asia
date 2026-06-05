/**
 * gsc-api.ts — Google Search Console API client
 *
 * Requires:
 *   1. Google Cloud project with Search Console API enabled
 *   2. OAuth2 credentials (service account or OAuth client)
 *   3. Site ownership verified in GSC
 *   4. Service account added as Owner in GSC (if using service account)
 *
 * Env vars (set in .env.local or Vercel dashboard):
 *   GSC_CREDENTIALS_JSON — Full service account JSON (base64-encoded) OR
 *   GSC_CLIENT_ID + GSC_CLIENT_SECRET + GSC_REFRESH_TOKEN — OAuth2 flow
 *
 * @see https://developers.google.com/webmaster-tools/v3
 */

import { google } from "googleapis";

// ─── Environment Validation ────────────────────────────────────────────────

const GSC_CREDENTIALS_JSON = process.env.GSC_CREDENTIALS_JSON ?? "";
const GSC_CLIENT_ID = process.env.GSC_CLIENT_ID ?? "";
const GSC_CLIENT_SECRET = process.env.GSC_CLIENT_SECRET ?? "";
const GSC_REFRESH_TOKEN = process.env.GSC_REFRESH_TOKEN ?? "";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://adamant.asia";

function getAuth() {
  // Service account (recommended for server-to-server)
  if (GSC_CREDENTIALS_JSON) {
    let credentials: Record<string, unknown>;
    try {
      const decoded = Buffer.from(GSC_CREDENTIALS_JSON, "base64").toString("utf-8");
      credentials = JSON.parse(decoded);
    } catch {
      // Not base64 — try raw JSON
      try {
        credentials = JSON.parse(GSC_CREDENTIALS_JSON);
      } catch {
        throw new Error(
          "GSC_CREDENTIALS_JSON is not valid JSON or base64-encoded JSON"
        );
      }
    }

    return new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/webmasters"],
    });
  }

  // OAuth2 (requires refresh token from manual auth flow)
  if (GSC_CLIENT_ID && GSC_CLIENT_SECRET && GSC_REFRESH_TOKEN) {
    const oauth2 = new google.auth.OAuth2(GSC_CLIENT_ID, GSC_CLIENT_SECRET);
    oauth2.setCredentials({ refresh_token: GSC_REFRESH_TOKEN });
    return oauth2;
  }

  throw new Error(
    "Missing GSC credentials. Set either:\n" +
      "  - GSC_CREDENTIALS_JSON (service account JSON, base64-encoded)\n" +
      "  - GSC_CLIENT_ID + GSC_CLIENT_SECRET + GSC_REFRESH_TOKEN (OAuth2)"
  );
}

// ─── Client Factory ────────────────────────────────────────────────────────

/** Webmasters v3 client (sitemaps, searchanalytics, sites) */
function getWebmastersClient() {
  const auth = getAuth();
  return google.webmasters({ version: "v3", auth });
}

/** Search Console v1 client (urlInspection) */
function getSearchConsoleClient() {
  const auth = getAuth();
  return google.searchconsole({ version: "v1", auth });
}

// ─── Types ─────────────────────────────────────────────────────────────────

export interface GscSitemap {
  path: string;
  lastSubmitted?: string;
  lastDownloaded?: string;
  isPending?: boolean;
  isSitemapsIndex?: boolean;
  type?: string;
  errors?: number;
  warnings?: number;
}

export interface GscUrlInspection {
  inspectionResult?: {
    indexStatusResult?: {
      verdict?: string | null;
      coverageState?: string | null;
      lastCrawlTime?: string | null;
      pageFetchState?: string | null;
      robotsTxtState?: string | null;
      indexingState?: string | null;
    };
    mobileUsabilityResult?: {
      verdict?: string | null;
    };
    richResultsResult?: {
      verdict?: string | null;
    };
  };
}

// ─── API Methods ───────────────────────────────────────────────────────────

/**
 * List all sitemaps submitted to GSC for the site.
 */
export async function listSitemaps(): Promise<GscSitemap[]> {
  const client = getWebmastersClient();
  const res = await client.sitemaps.list({ siteUrl: SITE_URL });
  return (res.data.sitemap ?? []).map((s) => ({
    path: s.path ?? "",
    lastSubmitted: s.lastSubmitted ?? undefined,
    lastDownloaded: s.lastDownloaded ?? undefined,
    isPending: s.isPending ?? false,
    isSitemapsIndex: s.isSitemapsIndex ?? false,
    type: s.type ?? undefined,
    errors: typeof s.errors === "string" ? parseInt(s.errors, 10) || 0 : (s.errors ?? 0),
    warnings: typeof s.warnings === "string" ? parseInt(s.warnings, 10) || 0 : (s.warnings ?? 0),
  }));
}

/**
 * Submit a sitemap URL to GSC.
 */
export async function submitSitemap(sitemapUrl: string): Promise<void> {
  const client = getWebmastersClient();
  await client.sitemaps.submit({
    siteUrl: SITE_URL,
    feedpath: sitemapUrl,
  });
}

/**
 * Delete a sitemap from GSC.
 */
export async function deleteSitemap(sitemapUrl: string): Promise<void> {
  const client = getWebmastersClient();
  await client.sitemaps.delete({
    siteUrl: SITE_URL,
    feedpath: sitemapUrl,
  });
}

/**
 * Inspect a URL's indexing status in GSC.
 */
export async function inspectUrl(
  url: string,
  languageCode = "en-US"
): Promise<GscUrlInspection> {
  const client = getSearchConsoleClient();
  const res = await client.urlInspection.index.inspect({
    requestBody: {
      inspectionUrl: url,
      siteUrl: SITE_URL,
      languageCode,
    },
  });
  return res.data;
}

/**
 * Get search analytics data (clicks, impressions, CTR, position).
 */
export async function getSearchAnalytics(
  startDate: string,
  endDate: string,
  dimensions: ("query" | "page" | "country" | "device" | "searchAppearance")[] = ["query"],
  rowLimit = 10
): Promise<unknown[]> {
  const client = getWebmastersClient();
  const res = await client.searchanalytics.query({
    siteUrl: SITE_URL,
    requestBody: {
      startDate,
      endDate,
      dimensions,
      rowLimit,
    },
  });
  return res.data.rows ?? [];
}

// ─── Convenience ───────────────────────────────────────────────────────────

/**
 * Re-submit the primary sitemap (convenience wrapper).
 */
export async function resubmitPrimarySitemap(): Promise<void> {
  const sitemapUrl = `${SITE_URL}/sitemap.xml`;
  await submitSitemap(sitemapUrl);
}

/**
 * Check if a specific sitemap is in GSC.
 */
export async function hasSitemap(sitemapUrl: string): Promise<boolean> {
  const sitemaps = await listSitemaps();
  return sitemaps.some((s) => s.path === sitemapUrl);
}
