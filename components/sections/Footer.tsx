"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const quickLinks = [
  { href: "/about", label: "About Us" },
  { href: "/practice-areas", label: "Practice Areas" },
  { href: "/results", label: "Case Results" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/contact", label: "Contact" },
  { href: "/agreement", label: "Client Agreement" },
];

const practiceLinks = [
  { href: "/practice-areas#international-corporate-law", label: "International Corporate Law" },
  { href: "/practice-areas#private-asset-recovery", label: "Private Asset Recovery" },
  { href: "/practice-areas#cross-border-litigation", label: "Cross-Border Litigation" },
  { href: "/practice-areas#regulatory-compliance", label: "Regulatory Compliance" },
  { href: "/practice-areas#mergers-dispute-resolution", label: "Mergers & Dispute Resolution" },
  { href: "/practice-areas#luxury-brand-protection", label: "Luxury Brand Protection" },
];

export default function Footer() {
  return (
    <footer className="bg-navy-dark border-t border-white/10">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/logo.svg"
                alt="Von Steiger & Associates"
                width={180}
                height={45}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Prestigious international litigation firm specializing in
              corporate law, private asset recovery, and cross-border disputes.
            </p>
            <div className="flex gap-3">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded bg-white/5 flex items-center justify-center hover:bg-gold/20 hover:text-gold transition-all"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded bg-white/5 flex items-center justify-center hover:bg-gold/20 hover:text-gold transition-all"
                aria-label="X (Twitter)"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-heading text-base font-semibold text-gold mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 text-sm hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-base font-semibold text-gold mb-6">
              Practice Areas
            </h4>
            <ul className="space-y-3">
              {practiceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 text-sm hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-base font-semibold text-gold mb-6">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold mt-1 shrink-0" />
                <div>
                  <p className="text-white/80 text-sm font-medium">Hamburg Office</p>
                  <p className="text-white/50 text-sm">
                    Neuer Wall 50, 20354 Hamburg, Germany
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold mt-1 shrink-0" />
                <div>
                  <p className="text-white/80 text-sm font-medium">Berlin Office</p>
                  <p className="text-white/50 text-sm">
                    Friedrichstraße 191, 10117 Berlin, Germany
                  </p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <a
                  href="tel:+4940123456789"
                  className="text-white/60 text-sm hover:text-gold transition-colors"
                >
                  +49 (40) 123 456 789
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <a
                  href="mailto:info@vonsteiger.org"
                  className="text-white/60 text-sm hover:text-gold transition-colors"
                >
                  info@vonsteiger.org
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-10 bg-white/10" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-xs">
            © {new Date().getFullYear()} Von Steiger & Associates. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="text-white/40 text-xs hover:text-gold transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-white/40 text-xs hover:text-gold transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/imprint"
              className="text-white/40 text-xs hover:text-gold transition-colors"
            >
              Imprint
            </Link>
          </div>
        </div>

        <p className="text-white/20 text-[10px] mt-6 text-center">
          Disclaimer: This website is for informational purposes only and does not constitute legal advice.
          Past results do not guarantee future outcomes. Attorney advertising.
        </p>
      </div>
    </footer>
  );
}
