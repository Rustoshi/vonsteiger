import type { Metadata } from "next";
import TestimonialsPageClient from "./TestimonialsPageClient";
import { breadcrumbJsonLd, reviewJsonLd } from "@/lib/seo";
import { testimonials } from "@/data/testimonials";

export const metadata: Metadata = {
  title: "Client Testimonials | 4.9/5.0 Average Rating",
  description:
    "Read what our clients say about Von Steiger & Associates. 4.9/5.0 average rating from 200+ clients worldwide in corporate litigation and asset recovery.",
  alternates: { canonical: "/testimonials" },
  openGraph: {
    title: "Client Testimonials | Von Steiger & Associates",
    description: "4.9/5.0 average rating from 200+ clients worldwide.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

export default function TestimonialsPage() {
  const reviewsLd = reviewJsonLd(
    testimonials.map((t) => ({
      author: t.clientName,
      rating: t.rating,
      text: t.quote,
    }))
  );
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", href: "/" },
              { name: "Testimonials", href: "/testimonials" },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsLd) }}
      />
      <TestimonialsPageClient />
    </>
  );
}
