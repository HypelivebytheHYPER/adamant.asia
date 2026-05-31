"use client";

import { useEffect } from "react";

export default function HomeError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Error logged silently — monitor via Sentry or Vercel logs
  }, [error]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center max-w-md px-4">
        <h1 className="text-headline text-foreground mb-3">Something went wrong</h1>
        <p className="text-body text-stone mb-6">
          We couldn&apos;t load this page. Try refreshing or come back later.
        </p>
        <button
          onClick={reset}
          className="btn-primary"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
