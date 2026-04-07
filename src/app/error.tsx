"use client";

import { Button } from "@/components/ui/Button";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="glass-card mx-4 max-w-md p-8 text-center md:p-12">
        <h1 className="mb-2 font-[family-name:var(--font-display)] text-4xl font-bold text-red-400">
          Oops!
        </h1>
        <h2 className="mb-3 text-xl font-semibold">Something went wrong</h2>
        <p className="mb-6 text-[var(--text-secondary)]">
          {error.message || "An unexpected error occurred."}
        </p>
        <Button variant="primary" onClick={reset}>
          Try Again
        </Button>
      </div>
    </div>
  );
}
