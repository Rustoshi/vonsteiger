import type { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";
import { personJsonLd, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About Julian von Steiger | Senior Partner & Lead Counsel",
  description:
    "Learn about Julian von Steiger, Senior Partner at Von Steiger & Associates — over 20 years of excellence in international litigation and asset recovery across 14 jurisdictions.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Julian von Steiger | Von Steiger & Associates",
    description:
      "Senior Partner with 20+ years in international litigation. Over €2.3 billion recovered.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", href: "/" },
              { name: "About", href: "/about" },
            ])
          ),
        }}
      />
      <AboutPageClient />
    </>
  );
}
