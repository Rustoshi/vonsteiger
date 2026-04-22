import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";
import { breadcrumbJsonLd, contactPageJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact Us | Schedule a Confidential Consultation",
  description:
    "Schedule a confidential consultation with Von Steiger & Associates. Offices in Hamburg and Berlin, Germany. Contact us by phone, email, or our secure online form.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact | Von Steiger & Associates",
    description: "Schedule a confidential consultation. Hamburg & Berlin offices.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", href: "/" },
              { name: "Contact", href: "/contact" },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageJsonLd()) }}
      />
      <ContactPageClient />
    </>
  );
}
