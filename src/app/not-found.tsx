import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="glass-card mx-4 max-w-md p-8 text-center md:p-12">
        <h1 className="from-primary-400 to-accent-400 bg-gradient-to-r bg-clip-text font-[family-name:var(--font-display)] text-[length:var(--text-display)] font-bold text-transparent">
          404
        </h1>
        <h2 className="mt-2 mb-3 text-xl font-semibold">Page Not Found</h2>
        <p className="mb-6 text-[var(--text-secondary)]">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/">
          <Button variant="primary">Back to Home</Button>
        </Link>
      </div>
    </div>
  );
}
