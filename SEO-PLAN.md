# Von Steiger & Associates — Industry-Grade SEO Plan

> Goal: Typing "Von Steiger & Associates" or "Julian von Steiger" on Google surfaces the website at **#1** with **sitelinks** (all pages visible beneath the main result).

---

## PHASE 1: Technical SEO (Code Changes)

### 1.1 Structured Data / JSON-LD Schema Markup

Add JSON-LD to every page so Google understands the entity type. This is the single most important factor for branded search + sitelinks.

**Root layout (`layout.tsx`)** — Add Organization schema:
```json
{
  "@context": "https://schema.org",
  "@type": "LegalService",
  "name": "Von Steiger & Associates",
  "alternateName": "Von Steiger and Associates",
  "url": "https://www.vonsteiger.law",
  "logo": "https://www.vonsteiger.law/logo.svg",
  "image": "https://www.vonsteiger.law/og-image.jpg",
  "description": "Prestigious international litigation firm specializing in corporate law, private asset recovery, and cross-border disputes.",
  "foundingDate": "2003",
  "founder": {
    "@type": "Person",
    "name": "Julian von Steiger"
  },
  "address": [
    {
      "@type": "PostalAddress",
      "streetAddress": "Neuer Wall 50",
      "addressLocality": "Hamburg",
      "postalCode": "20354",
      "addressCountry": "DE"
    },
    {
      "@type": "PostalAddress",
      "streetAddress": "Friedrichstraße 191",
      "addressLocality": "Berlin",
      "postalCode": "10117",
      "addressCountry": "DE"
    }
  ],
  "telephone": "+49-40-123456789",
  "email": "contact@vonsteiger.law",
  "sameAs": [
    "https://www.linkedin.com/company/vonsteiger",
    "https://twitter.com/vonsteigerlaw"
  ],
  "areaServed": "Worldwide",
  "priceRange": "€€€€",
  "numberOfEmployees": { "@type": "QuantitativeValue", "minValue": 10, "maxValue": 50 }
}
```

**About page** — Add Person schema for Julian von Steiger:
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Julian von Steiger",
  "jobTitle": "Senior Partner / Lead Counsel",
  "worksFor": {
    "@type": "LegalService",
    "name": "Von Steiger & Associates"
  },
  "alumniOf": [
    { "@type": "CollegeOrUniversity", "name": "University of Hamburg" },
    { "@type": "CollegeOrUniversity", "name": "London School of Economics" }
  ],
  "knowsAbout": ["International Litigation", "Asset Recovery", "Corporate Law"],
  "url": "https://www.vonsteiger.law/about"
}
```

**Each page** — Add BreadcrumbList schema:
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.vonsteiger.law" },
    { "@type": "ListItem", "position": 2, "name": "About", "item": "https://www.vonsteiger.law/about" }
  ]
}
```

**Contact page** — Add ContactPoint schema.

**Testimonials page** — Add Review/AggregateRating schema.

**Practice Areas page** — Add Service schema for each practice area.

---

### 1.2 Metadata Enhancements (Per-Page)

Every page needs unique, keyword-rich:
- `<title>` — max 60 chars, brand name at end
- `<meta name="description">` — max 155 chars, include primary keyword
- `og:title`, `og:description`, `og:image`, `og:url`
- `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`
- `canonical` URL

| Page | Title | Primary Keywords |
|------|-------|-----------------|
| Home | `Von Steiger & Associates \| International Litigation & Asset Recovery` | Von Steiger, law firm, litigation |
| About | `About Julian von Steiger \| Senior Partner \| Von Steiger & Associates` | Julian von Steiger, lawyer, partner |
| Practice Areas | `Practice Areas \| Corporate Law & Asset Recovery \| Von Steiger & Associates` | practice areas, corporate law |
| Results | `Case Results \| €2.3B+ Recovered \| Von Steiger & Associates` | case results, asset recovery |
| Testimonials | `Client Testimonials \| Von Steiger & Associates` | testimonials, reviews |
| Contact | `Contact Us \| Schedule a Consultation \| Von Steiger & Associates` | contact, consultation |
| Agreement | `Client Agreement & Payment Terms \| Von Steiger & Associates` | agreement, retainer |

---

### 1.3 Sitemap.xml (Auto-Generated)

Create `app/sitemap.ts` to auto-generate an XML sitemap:

```ts
export default function sitemap() {
  const baseUrl = "https://www.vonsteiger.law";
  const pages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/practice-areas`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/results`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/testimonials`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.8 },
    { url: `${baseUrl}/agreement`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.4 },
  ];
  return pages;
}
```

---

### 1.4 Robots.txt

Create `app/robots.ts`:

```ts
export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: "https://www.vonsteiger.law/sitemap.xml",
  };
}
```

---

### 1.5 Open Graph Image

Create a branded `public/og-image.jpg` (1200×630) featuring the firm name, tagline, and logo on the navy/gold palette. Used as the default share image across all social platforms.

---

### 1.6 Canonical URLs

Add canonical URL to every page via Next.js metadata:
```ts
export const metadata = {
  alternates: { canonical: "https://www.vonsteiger.law/about" },
};
```

---

### 1.7 Semantic HTML & Accessibility

- [x] One `<h1>` per page (already done)
- [ ] Ensure heading hierarchy (h1 → h2 → h3, no skips)
- [x] `alt` text on all images (already done)
- [ ] Add `aria-label` to all interactive elements
- [ ] Ensure color contrast meets WCAG AA
- [ ] Add `lang="en"` to `<html>` (already done)

---

### 1.8 Performance Optimization

Google Core Web Vitals directly affect ranking:

- [ ] Add `loading="lazy"` to below-fold images (Next.js Image handles this)
- [ ] Ensure `priority` only on hero/above-fold images
- [ ] Minimize client-side JS — move purely static sections to Server Components
- [ ] Add `next/dynamic` for heavy client components (Framer Motion carousel)
- [ ] Optimize fonts: `display: "swap"` (already done), preload critical fonts
- [ ] Enable Next.js Image optimization (already configured)
- [ ] Consider adding `<link rel="preconnect" href="https://images.unsplash.com">` in layout

---

### 1.9 Internal Linking Strategy (Code)

- Every page links back to Home, Contact, and at least 2 other pages
- Footer links to all pages (already done)
- Practice Areas page links to Results (related cases)
- Results page links to Practice Areas (related expertise)
- CTA on every page links to Contact
- About page links to Practice Areas and Results
- Breadcrumbs on every sub-page (visible + schema)

---

## PHASE 2: Content SEO

### 2.1 Keyword Strategy

**Primary branded keywords (must rank #1):**
- "Von Steiger & Associates"
- "Von Steiger Associates"
- "Julian von Steiger"
- "Julian von Steiger lawyer"
- "Von Steiger law firm"

**Secondary keywords (target top 10):**
- "international litigation firm Germany"
- "asset recovery lawyer Hamburg"
- "cross-border dispute lawyer"
- "corporate litigation Germany"

### 2.2 Content Recommendations

- [ ] Add a **Blog/Insights** page with 2–4 articles per month on:
  - Legal industry news
  - Case study breakdowns (anonymized)
  - Jurisdiction-specific legal guides
  - Asset recovery strategies
- [ ] Each blog post targets a long-tail keyword
- [ ] Blog posts internally link to Practice Areas and Contact pages
- [ ] Add an **FAQ section** to the Contact or Practice Areas page (generates FAQ schema, appears in Google "People also ask")
- [ ] Ensure every page has **300+ words** of unique, indexable text content

---

## PHASE 3: Manual / Off-Page Requirements

### 3.1 Google Search Console (CRITICAL)

1. **Register** the domain at [search.google.com/search-console](https://search.google.com/search-console)
2. **Verify ownership** via DNS TXT record, HTML file, or meta tag
3. **Submit sitemap** (`https://www.vonsteiger.law/sitemap.xml`)
4. **Request indexing** for every page manually via URL Inspection tool
5. **Monitor** for crawl errors, index coverage issues, mobile usability
6. **Set preferred domain** (www vs non-www) via canonical tags

### 3.2 Google Business Profile (CRITICAL for sitelinks)

1. Create a **Google Business Profile** at [business.google.com](https://business.google.com)
2. Business name: **Von Steiger & Associates**
3. Category: **Law Firm** / **Lawyer**
4. Add both Hamburg and Berlin office addresses
5. Add phone, email, website URL, business hours
6. Upload logo, office photos, team photos
7. **Verify** via postcard, phone, or email
8. Add **services** (each practice area as a service)
9. Post **updates** weekly (news, case results, legal insights)
10. Encourage clients to leave **Google Reviews** (directly impacts ranking)

### 3.3 Domain & Hosting

- [ ] Register `vonsteiger.law` (a `.law` TLD signals legal authority to users)
- [ ] Also register `vonsteiger.de`, `vonsteiger.com` and redirect to `.law`
- [ ] Enable **HTTPS** (SSL certificate — required for ranking)
- [ ] Use a **fast hosting provider** (Vercel recommended for Next.js — global CDN)
- [ ] Set up **www → non-www** redirect (or vice versa, pick one canonical)

### 3.4 Bing Webmaster Tools

1. Register at [bing.com/webmasters](https://www.bing.com/webmasters)
2. Submit sitemap
3. Bing powers Yahoo, DuckDuckGo, and Alexa results

### 3.5 Directory Listings & Citations (NAP Consistency)

Ensure **Name, Address, Phone (NAP)** is identical everywhere:

| Directory | URL |
|-----------|-----|
| Google Business Profile | business.google.com |
| LinkedIn Company Page | linkedin.com/company/vonsteiger |
| Martindale-Hubbell | martindale.com |
| Chambers & Partners | chambers.com |
| Legal 500 | legal500.com |
| JUVE (German legal) | juve.de |
| Anwalt.de | anwalt.de |
| Apple Maps | mapsconnect.apple.com |
| Yelp | yelp.com |
| Yellow Pages Germany | gelbeseiten.de |

### 3.6 Backlink Strategy

- [ ] Get listed on all legal directories above (high-authority backlinks)
- [ ] Publish guest articles on legal news sites (e.g., Law.com, Legal Cheek, Handelsblatt)
- [ ] Issue **press releases** for major case wins
- [ ] Sponsor or speak at legal conferences (generates .edu and .org backlinks)
- [ ] Ensure LinkedIn, Twitter/X profiles link back to the website
- [ ] Partner with legal industry associations for backlinks

### 3.7 Social Signals

- [ ] Create and maintain active **LinkedIn** company page
- [ ] Create **X (Twitter)** account
- [ ] Post firm updates, legal insights, team news regularly
- [ ] Share every blog post on social channels
- [ ] Add Open Graph tags to all pages (already done via metadata)

---

## PHASE 4: Monitoring & Iteration

### 4.1 Tools to Set Up

| Tool | Purpose |
|------|---------|
| Google Search Console | Index status, queries, crawl health |
| Google Analytics 4 | Traffic, user behavior, conversions |
| Google Business Profile | Local ranking, reviews, visibility |
| Ahrefs or SEMrush | Backlink monitoring, keyword tracking |
| PageSpeed Insights | Core Web Vitals monitoring |
| Schema Markup Validator | Validate JSON-LD structured data |

### 4.2 KPIs to Track

- **Position 1** for "Von Steiger & Associates" (branded)
- **Position 1** for "Julian von Steiger" (personal brand)
- **Sitelinks** appearing (Google shows 2–6 sub-page links beneath main result)
- **Core Web Vitals** all green (LCP < 2.5s, FID < 100ms, CLS < 0.1)
- **100% index coverage** (all 7 pages indexed)
- **Click-through rate** > 50% for branded queries
- **Domain Authority** growth over time

### 4.3 Timeline

| Week | Action |
|------|--------|
| 1 | Implement all Phase 1 code changes |
| 1 | Register domain, deploy to production |
| 1 | Set up Google Search Console + submit sitemap |
| 1 | Create Google Business Profile |
| 2 | Submit to all legal directories |
| 2 | Set up Google Analytics 4 |
| 2 | Create LinkedIn + X profiles |
| 3 | Publish first 2 blog posts |
| 3 | Request manual indexing of all pages |
| 4 | Monitor Search Console for issues |
| 4+ | Ongoing: blog content, reviews, backlinks |

---

## Summary: What Gets You Sitelinks

Google grants **sitelinks** (multiple pages shown under the main result) when:

1. **Brand is the dominant result** for the query — no competing sites use the same name
2. **Clear site structure** — sitemap, breadcrumbs, internal linking
3. **Structured data** — Organization + BreadcrumbList schema on every page
4. **Google Search Console** — site is verified and all pages indexed
5. **Google Business Profile** — verified, complete, with reviews
6. **Unique, descriptive page titles** — Google picks sitelinks from your best pages
7. **Domain age + authority** — typically appears 4–8 weeks after launch for branded queries with no competition

**You cannot manually select sitelinks.** Google generates them automatically. But all the above actions maximize the likelihood they appear quickly.
