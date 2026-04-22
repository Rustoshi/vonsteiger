import type { Metadata } from "next";
import ResultsPageClient from "./ResultsPageClient";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Case Results | €2.3B+ Recovered Across 14 Jurisdictions",
  description:
    "Von Steiger & Associates case results: Over €2.3 billion recovered across 14 jurisdictions in asset recovery, corporate litigation, and regulatory defense.",
  alternates: { canonical: "/results" },
  openGraph: {
    title: "Case Results | Von Steiger & Associates",
    description: "Over €2.3B recovered. View our proven track record in international litigation.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

export default function ResultsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", href: "/" },
              { name: "Case Results", href: "/results" },
            ])
          ),
        }}
      />
      <ResultsPageClient />
    </>
  );
}
