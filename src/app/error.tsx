"use client";

import { Button } from "@/components/ui/Button";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="glass-card p-8 md:p-12 text-center max-w-md mx-4">
        <h1 className="text-4xl font-bold font-[family-name:var(--font-display)] text-red-400 mb-2">
          Oops!
        </h1>
        <h2 className="text-xl font-semibold mb-3">Something went wrong</h2>
        <p className="text-[var(--text-secondary)] mb-6">
          {error.message || "An unexpected error occurred."}
        </p>
        <Button variant="primary" onClick={reset}>
          Try Again
        </Button>
      </div>
    </div>
  );
}
