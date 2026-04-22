import type { Metadata } from "next";
import PracticeAreasPageClient from "./PracticeAreasPageClient";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/seo";
import { practiceAreas } from "@/data/practiceAreas";

export const metadata: Metadata = {
  title: "Practice Areas | Corporate Law, Asset Recovery & Litigation",
  description:
    "Von Steiger & Associates practice areas: International Corporate Law, Private Asset Recovery, Cross-Border Litigation, Regulatory Compliance, M&A Disputes, and Luxury Brand Protection.",
  alternates: { canonical: "/practice-areas" },
  openGraph: {
    title: "Practice Areas | Von Steiger & Associates",
    description:
      "Comprehensive legal expertise in corporate law, asset recovery, and international dispute resolution.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

export default function PracticeAreasPage() {
  const servicesLd = practiceAreas.map((a) =>
    serviceJsonLd(a.title, a.shortDescription, `/practice-areas#${a.id}`)
  );
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", href: "/" },
              { name: "Practice Areas", href: "/practice-areas" },
            ])
          ),
        }}
      />
      {servicesLd.map((ld, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
        />
      ))}
      <PracticeAreasPageClient />
    </>
  );
}
