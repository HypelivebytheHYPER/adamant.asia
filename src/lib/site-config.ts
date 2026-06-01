/**
 * site-config.ts — Fetches site configuration from Lark Base Config table.
 *
 * Single source of truth for values that should be editable in Base
 * without code changes (founder info, contact details, etc.).
 *
 * Auth priority:
 *   1. LARK_USER_ACCESS_TOKEN env var
 *   2. LARK_APP_ID + LARK_APP_SECRET env vars → tenant token
 *   3. (Local dev fallback) lark-cli subprocess if binary is available
 *
 * Falls back to defaults if Base is unreachable.
 */

import { BitableClient, authFromEnv } from "./lark-api";
import { execFileSync } from "child_process";

const CONFIG_TABLE_ID = "tblyBVeyrV6ttqNd";

function isLarkCLIAuthError(err: unknown): boolean {
  return (
    err instanceof Error &&
    /Missing Lark auth|Lark API.*99991663|invalid.*token/i.test(err.message)
  );
}

/** Fetch config records via Lark REST API (needs LARK_APP_ID / LARK_APP_SECRET). */
async function fetchViaApi(): Promise<Record<string, string>> {
  const auth = await authFromEnv();
  const client = new BitableClient(auth);
  const appToken =
    process.env.LARK_BASE_APP_TOKEN || process.env.LARK_BASE_TOKEN;
  if (!appToken) {
    throw new Error("No LARK_BASE_APP_TOKEN or LARK_BASE_TOKEN set");
  }
  const records = await client.listRecords(appToken, CONFIG_TABLE_ID);
  const map: Record<string, string> = {};
  for (const rec of records) {
    const key = String(rec.fields.Key || "");
    const value = String(rec.fields.Value || "");
    if (key) map[key] = value;
  }
  return map;
}

/**
 * Local-dev fallback: shell out to lark-cli binary.
 * Works when lark-cli is authenticated but REST API creds are not set.
 */
function fetchViaCLI(): Record<string, string> {
  const baseToken =
    process.env.LARK_BASE_APP_TOKEN || process.env.LARK_BASE_TOKEN;
  if (!baseToken) {
    throw new Error("No LARK_BASE_APP_TOKEN or LARK_BASE_TOKEN set");
  }
  const out = execFileSync(
    "lark-cli",
    [
      "base",
      "+record-list",
      "--base-token",
      baseToken,
      "--table-id",
      CONFIG_TABLE_ID,
      "--limit",
      "500",
      "--format",
      "json",
    ],
    { encoding: "utf-8", stdio: ["pipe", "pipe", "pipe"] },
  );
  const body = JSON.parse(out) as {
    data?: {
      data: string[][];
      fields: string[];
      has_more?: boolean;
    };
  };
  const rows = body.data?.data ?? [];
  const fields = body.data?.fields ?? [];
  const keyIdx = fields.indexOf("Key");
  const valIdx = fields.indexOf("Value");
  if (keyIdx === -1 || valIdx === -1) {
    throw new Error("Config table missing Key or Value column");
  }
  const map: Record<string, string> = {};
  for (const row of rows) {
    const key = row[keyIdx];
    const value = row[valIdx];
    if (key) map[key] = value ?? "";
  }
  return map;
}

/** Fetch all key/value records from the Config table. */
async function fetchConfigRecords(): Promise<Record<string, string>> {
  try {
    return await fetchViaApi();
  } catch (err) {
    if (isLarkCLIAuthError(err)) {
      try {
        return fetchViaCLI();
      } catch (cliErr) {
        console.warn("[site-config] CLI fallback also failed:", cliErr);
      }
    }
    console.warn("[site-config] Failed to fetch config from Base:", err);
    return {};
  }
}

/** Mutable store for config cache across a single request lifecycle. */
let _requestCache: Record<string, string> | null = null;

/**
 * Get a config value by key.
 * - At build time: fetches from Lark Base (cached for the request).
 * - Falls back to `defaultValue` if the key is missing or Base is unreachable.
 */
export async function getConfig(
  key: string,
  defaultValue?: string,
): Promise<string> {
  if (_requestCache === null) {
    _requestCache = await fetchConfigRecords();
  }
  return _requestCache[key] ?? defaultValue ?? "";
}

/** Get all config values as a plain object. */
export async function getAllConfig(): Promise<Record<string, string>> {
  if (_requestCache === null) {
    _requestCache = await fetchConfigRecords();
  }
  return { ..._requestCache };
}

/**
 * Reset the request cache. Used mainly for testing.
 * Next.js isolates requests, so this is safe in Server Components.
 */
export function resetConfigCache(): void {
  _requestCache = null;
}
