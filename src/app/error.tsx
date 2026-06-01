"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-headline text-foreground mb-3">
          Something went wrong
        </h1>
        <p className="text-body text-stone mb-6">
          An unexpected error occurred. Please try again.
        </p>

        {process.env.NODE_ENV === "development" && (
          <pre className="mt-4 text-xs text-red-500 font-mono whitespace-pre-wrap">
            {error.message}
          </pre>
        )}
        <div className="flex items-center justify-center gap-3">
          <button onClick={reset} className="btn-primary">
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex h-10 items-center justify-center rounded-md border border-border bg-transparent px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            Go home
          </Link>
        </div>
        {process.env.NODE_ENV === "development" && error.digest && (
          <p className="mt-6 text-xs text-stone/50 font-mono">
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}
