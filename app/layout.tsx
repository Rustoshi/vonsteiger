import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import PublicShell from "@/components/sections/PublicShell";
import { organizationJsonLd, siteConfig } from "@/lib/seo";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Von Steiger & Associates | International Litigation & Asset Recovery",
    template: "%s | Von Steiger & Associates",
  },
  description: siteConfig.description,
  keywords: [
    "Von Steiger & Associates",
    "Von Steiger Associates",
    "Julian von Steiger",
    "international litigation",
    "asset recovery",
    "corporate law firm Germany",
    "cross-border disputes",
    "Hamburg law firm",
    "Berlin law firm",
  ],
  authors: [{ name: "Von Steiger & Associates", url: siteConfig.url }],
  creator: "Von Steiger & Associates",
  publisher: "Von Steiger & Associates",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Von Steiger & Associates | International Litigation & Asset Recovery",
    description:
      "Prestigious international litigation firm specializing in corporate law, private asset recovery, and cross-border disputes. Over €2.3 billion recovered.",
    type: "website",
    locale: "en_US",
    siteName: "Von Steiger & Associates",
    url: siteConfig.url,
  },
  twitter: {
    card: "summary_large_image",
    title: "Von Steiger & Associates",
    description:
      "International litigation & asset recovery. Over €2.3 billion recovered across 14 jurisdictions.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "REPLACE_WITH_GOOGLE_VERIFICATION_CODE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return <></>
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
      </head>
      <body className="font-sans antialiased bg-navy text-white">
        <PublicShell>{children}</PublicShell>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#0F1D32",
              color: "#FFFFFF",
              border: "1px solid rgba(201, 168, 76, 0.3)",
            },
          }}
        />
      </body>
    </html>
  );
}
