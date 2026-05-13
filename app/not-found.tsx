import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-navy px-4">
      <div className="text-center max-w-md">
        <div className="text-gold font-heading text-8xl sm:text-9xl font-bold mb-4 opacity-30">
          404
        </div>

        <h1 className="font-heading text-2xl sm:text-3xl font-bold mb-3">
          Page Not Found
        </h1>
        <p className="text-white/60 text-sm leading-relaxed mb-8">
          The page you are looking for does not exist or has been moved.
          Please check the URL or return to the homepage.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/">
            <Button className="bg-gold hover:bg-gold-dark text-navy font-semibold rounded-sm px-6">
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Button>
          </Link>
          <Link href="/contact">
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 rounded-sm px-6 w-full"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
