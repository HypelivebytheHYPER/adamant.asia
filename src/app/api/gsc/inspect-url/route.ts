/**
 * POST /api/gsc/inspect-url
 *
 * Inspect a URL's indexing status in Google Search Console.
 * Requires GSC credentials to be configured.
 *
 * Body: { url: string }
 * Response: { success: boolean, result: GscUrlInspection }
 */

import { NextRequest, NextResponse } from "next/server";
import { inspectUrl } from "@/lib/gsc-api";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const url = body.url;

    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { success: false, error: "Missing 'url' in request body" },
        { status: 400 }
      );
    }

    const result = await inspectUrl(url);
    return NextResponse.json({
      success: true,
      result,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
