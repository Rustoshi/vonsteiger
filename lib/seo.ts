const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.vonsteiger.law";

export const siteConfig = {
  name: "Von Steiger & Associates",
  url: SITE_URL,
  description:
    "Prestigious international litigation firm specializing in corporate law, private asset recovery, and cross-border disputes. Over €2.3 billion recovered across 14 jurisdictions.",
  logo: `${SITE_URL}/logo.svg`,
  ogImage: `${SITE_URL}/og-image.png`,
  founder: "Julian von Steiger",
  foundingDate: "2003",
  phone: "+49-40-123456789",
  email: "contact@vonsteiger.law",
  addresses: [
    {
      street: "Neuer Wall 50",
      city: "Hamburg",
      postal: "20354",
      country: "DE",
    },
    {
      street: "Friedrichstraße 191",
      city: "Berlin",
      postal: "10117",
      country: "DE",
    },
  ],
};

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: siteConfig.name,
    alternateName: "Von Steiger and Associates",
    url: siteConfig.url,
    logo: siteConfig.logo,
    image: siteConfig.ogImage,
    description: siteConfig.description,
    foundingDate: siteConfig.foundingDate,
    founder: {
      "@type": "Person",
      name: siteConfig.founder,
    },
    address: siteConfig.addresses.map((a) => ({
      "@type": "PostalAddress",
      streetAddress: a.street,
      addressLocality: a.city,
      postalCode: a.postal,
      addressCountry: a.country,
    })),
    telephone: siteConfig.phone,
    email: siteConfig.email,
    sameAs: [
      "https://www.linkedin.com/company/vonsteiger",
      "https://twitter.com/vonsteigerlaw",
    ],
    areaServed: "Worldwide",
    priceRange: "$$$$",
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      minValue: 10,
      maxValue: 50,
    },
  };
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Julian von Steiger",
    jobTitle: "Senior Partner / Lead Counsel",
    worksFor: {
      "@type": "LegalService",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "University of Hamburg" },
      { "@type": "CollegeOrUniversity", name: "London School of Economics" },
    ],
    knowsAbout: [
      "International Litigation",
      "Asset Recovery",
      "Corporate Law",
      "Cross-Border Disputes",
    ],
    url: `${siteConfig.url}/about`,
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80",
  };
}

export function breadcrumbJsonLd(
  items: { name: string; href: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteConfig.url}${item.href}`,
    })),
  };
}

export function serviceJsonLd(
  name: string,
  description: string,
  url: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: {
      "@type": "LegalService",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    url: `${siteConfig.url}${url}`,
    areaServed: "Worldwide",
  };
}

export function reviewJsonLd(
  reviews: { author: string; rating: number; text: string }[]
) {
  const avg =
    reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
  return {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: siteConfig.name,
    url: siteConfig.url,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: avg.toFixed(1),
      bestRating: "5",
      worstRating: "1",
      ratingCount: reviews.length,
    },
    review: reviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.author },
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.rating,
        bestRating: "5",
      },
      reviewBody: r.text,
    })),
  };
}

export function contactPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Von Steiger & Associates",
    url: `${siteConfig.url}/contact`,
    mainEntity: {
      "@type": "LegalService",
      name: siteConfig.name,
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: siteConfig.phone,
          email: siteConfig.email,
          contactType: "customer service",
          availableLanguage: ["English", "German"],
          areaServed: "Worldwide",
        },
      ],
    },
  };
}
