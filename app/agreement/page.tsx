import type { Metadata } from "next";
import AgreementPageClient from "./AgreementPageClient";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Client Agreement & Payment Terms",
  description:
    "Von Steiger & Associates client engagement agreement, upfront retainer payment terms, fee structure, and billing policies.",
  alternates: { canonical: "/agreement" },
  openGraph: {
    title: "Client Agreement | Von Steiger & Associates",
    description: "Engagement terms, retainer requirements, and billing policies.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

export default function AgreementPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", href: "/" },
              { name: "Client Agreement", href: "/agreement" },
            ])
          ),
        }}
      />
      <AgreementPageClient />
    </>
  );
}
