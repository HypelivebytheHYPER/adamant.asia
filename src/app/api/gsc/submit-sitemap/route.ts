/**
 * POST /api/gsc/submit-sitemap
 *
 * Submit adamant.asia/sitemap.xml to Google Search Console.
 * Requires GSC credentials to be configured.
 *
 * Body: none (uses configured SITE_URL)
 * Response: { success: boolean, message: string }
 */

import { NextRequest, NextResponse } from "next/server";
import { resubmitPrimarySitemap } from "@/lib/gsc-api";

export async function POST(_req: NextRequest) {
  try {
    await resubmitPrimarySitemap();
    return NextResponse.json({
      success: true,
      message: "Sitemap submitted successfully",
      url: "https://adamant.asia/sitemap.xml",
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
