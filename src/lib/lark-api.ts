/**
 * lark-api.ts — Lark Base REST API client
 *
 * Uses native fetch(). No lark-cli binary dependency.
 * Supports both tenant_access_token (app_id/app_secret) and user_access_token modes.
 *
 * Environment:
 *   LARK_APP_ID + LARK_APP_SECRET → auto-obtains tenant_access_token
 *   LARK_USER_ACCESS_TOKEN        → uses directly (from lark-cli auth or OAuth)
 */

const BASE_URL = "https://open.larksuite.com/open-apis";

interface LarkAuth {
  type: "tenant" | "user";
  token: string;
  expiresAt?: number;
}

export interface LarkRecord {
  record_id: string;
  fields: Record<string, unknown>;
  created_time?: number;
  updated_time?: number;
}

export interface LarkField {
  field_id: string;
  field_name: string;
  type: number;
}

class LarkAPIError extends Error {
  constructor(public code: number, public msg: string, public logId?: string) {
    super(`Lark API ${code}: ${msg}`);
    this.name = "LarkAPIError";
  }
}

async function larkFetch<T>(path: string, init?: RequestInit, auth?: LarkAuth): Promise<T> {
  const token = auth?.token || "";
  const res = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  const body = (await res.json()) as { code: number; msg: string; data?: T; error?: { log_id?: string } };
  if (body.code !== 0) {
    throw new LarkAPIError(body.code, body.msg, body.error?.log_id);
  }
  return body.data as T;
}

/** Get tenant_access_token from app credentials */
export async function getTenantToken(appId: string, appSecret: string): Promise<LarkAuth> {
  const data = await larkFetch<{ tenant_access_token: string; expire: number }>(
    "/auth/v3/tenant_access_token/internal",
    {
      method: "POST",
      body: JSON.stringify({ app_id: appId, app_secret: appSecret }),
    }
  );
  return {
    type: "tenant",
    token: data.tenant_access_token,
    expiresAt: Date.now() + data.expire * 1000,
  };
}

/** Lark Base (Bitable) client */
export class BitableClient {
  private auth: LarkAuth;

  constructor(auth: LarkAuth) {
    this.auth = auth;
  }

  /** List all records in a table (auto-paginated) */
  async listRecords(appToken: string, tableId: string): Promise<LarkRecord[]> {
    const records: LarkRecord[] = [];
    let pageToken: string | undefined;

    do {
      const params = new URLSearchParams({ page_size: "500" });
      if (pageToken) params.set("page_token", pageToken);

      const data = await larkFetch<{
        items: LarkRecord[];
        has_more: boolean;
        page_token?: string;
        total: number;
      }>(
        `/bitable/v1/apps/${appToken}/tables/${tableId}/records?${params.toString()}`,
        { method: "GET" },
        this.auth
      );

      records.push(...data.items);
      pageToken = data.has_more ? data.page_token : undefined;
    } while (pageToken);

    return records;
  }

  /** List all fields in a table */
  async listFields(appToken: string, tableId: string): Promise<LarkField[]> {
    const data = await larkFetch<{ items: LarkField[] }>(
      `/bitable/v1/apps/${appToken}/tables/${tableId}/fields`,
      { method: "GET" },
      this.auth
    );
    return data.items;
  }

  /** Batch create records */
  async batchCreateRecords(
    appToken: string,
    tableId: string,
    records: Array<{ fields: Record<string, unknown> }>
  ): Promise<LarkRecord[]> {
    const data = await larkFetch<{ records: LarkRecord[] }>(
      `/bitable/v1/apps/${appToken}/tables/${tableId}/records/batch_create`,
      {
        method: "POST",
        body: JSON.stringify({ records }),
      },
      this.auth
    );
    return data.records;
  }

  /** Batch update records */
  async batchUpdateRecords(
    appToken: string,
    tableId: string,
    records: Array<{ record_id: string; fields: Record<string, unknown> }>
  ): Promise<LarkRecord[]> {
    const data = await larkFetch<{ records: LarkRecord[] }>(
      `/bitable/v1/apps/${appToken}/tables/${tableId}/records/batch_update`,
      {
        method: "POST",
        body: JSON.stringify({ records }),
      },
      this.auth
    );
    return data.records;
  }
}

/** Convenience: build auth from environment variables */
export async function authFromEnv(): Promise<LarkAuth> {
  const userToken = process.env.LARK_USER_ACCESS_TOKEN;
  if (userToken) {
    return { type: "user", token: userToken };
  }

  const appId = process.env.LARK_APP_ID;
  const appSecret = process.env.LARK_APP_SECRET;
  if (appId && appSecret) {
    return getTenantToken(appId, appSecret);
  }

  throw new Error(
    "Missing Lark auth. Set either LARK_USER_ACCESS_TOKEN or both LARK_APP_ID + LARK_APP_SECRET"
  );
}
