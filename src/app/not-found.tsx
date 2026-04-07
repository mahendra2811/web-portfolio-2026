import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="glass-card p-8 md:p-12 text-center max-w-md mx-4">
        <h1 className="text-[length:var(--text-display)] font-bold font-[family-name:var(--font-display)] bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
          404
        </h1>
        <h2 className="text-xl font-semibold mt-2 mb-3">Page Not Found</h2>
        <p className="text-[var(--text-secondary)] mb-6">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/">
          <Button variant="primary">Back to Home</Button>
        </Link>
      </div>
    </div>
  );
}
