"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Page error:", error);
  }, [error]);

  return (
    <section className="min-h-screen flex items-center justify-center bg-navy px-4">
      <div className="text-center max-w-md">
        <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center">
          <AlertTriangle className="w-6 h-6 text-gold" />
        </div>

        <h1 className="font-heading text-2xl sm:text-3xl font-bold mb-3">
          Something went wrong
        </h1>
        <p className="text-white/60 text-sm leading-relaxed mb-8">
          We apologize for the inconvenience. An unexpected error has occurred.
          Please try again or return to the homepage.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={reset}
            className="bg-gold hover:bg-gold-dark text-navy font-semibold rounded-sm px-6"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
          <Link href="/">
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 rounded-sm px-6 w-full"
            >
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
