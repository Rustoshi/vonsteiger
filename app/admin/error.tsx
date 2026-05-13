"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, LayoutDashboard } from "lucide-react";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Admin error:", error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center">
          <AlertTriangle className="w-6 h-6 text-red-400" />
        </div>

        <h1 className="font-heading text-2xl font-bold mb-3">
          Something went wrong
        </h1>
        <p className="text-white/50 text-sm leading-relaxed mb-8">
          An error occurred while loading this page. Please try again.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold bg-white/10 hover:bg-white/15 border border-white/10 rounded-sm transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Try Again
          </button>
          <Link
            href="/admin"
            className="flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold bg-white/5 hover:bg-white/10 border border-white/10 rounded-sm transition-colors"
          >
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
