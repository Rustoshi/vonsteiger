import type { Metadata } from "next";
import ApplyPageClient from "./ApplyPageClient";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Asset Recovery Application | Begin Your Case",
  description:
    "Submit your asset recovery application to Von Steiger & Associates. Confidential case assessment for fraud recovery, embezzlement, cross-border asset tracing, and international litigation.",
  alternates: { canonical: "/apply" },
  openGraph: {
    title: "Asset Recovery Application | Von Steiger & Associates",
    description:
      "Begin your asset recovery case. Confidential assessment by senior associates with expertise across 14+ jurisdictions.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

export default function ApplyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", href: "/" },
              { name: "Asset Recovery Application", href: "/apply" },
            ])
          ),
        }}
      />
      <ApplyPageClient />
    </>
  );
}
