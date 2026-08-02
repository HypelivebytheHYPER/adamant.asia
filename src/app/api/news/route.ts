import { NextResponse } from "next/server";
import { fetchNews } from "@/lib/news";

export const dynamic = "force-dynamic";

export async function GET() {
  const result = await fetchNews();

  return NextResponse.json(
    {
      ok: result.ok,
      articles: result.articles,
      source: result.source,
      error: result.error,
      updatedAt: new Date().toISOString(),
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=21600, stale-while-revalidate=86400",
      },
    }
  );
}
