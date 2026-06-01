import { NextResponse } from "next/server";

/**
 * GET /api/health
 * Health check endpoint for monitoring and load balancers.
 */
export async function GET() {
  return NextResponse.json(
    {
      ok: true,
      status: "healthy",
      timestamp: new Date().toISOString(),
    },
    { status: 200 },
  );
}
