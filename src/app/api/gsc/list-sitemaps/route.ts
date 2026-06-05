/**
 * GET /api/gsc/list-sitemaps
 *
 * List all sitemaps currently in Google Search Console.
 * Requires GSC credentials to be configured.
 *
 * Response: { success: boolean, sitemaps: GscSitemap[] }
 */

import { NextResponse } from "next/server";
import { listSitemaps } from "@/lib/gsc-api";

export async function GET() {
  try {
    const sitemaps = await listSitemaps();
    return NextResponse.json({
      success: true,
      sitemaps,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
