import {
  Globe,
  Search,
  Scale,
  ShieldCheck,
  Handshake,
  Crown,
} from "lucide-react";

export interface PracticeArea {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: typeof Globe;
  keyCases: string[];
  industries: string[];
}

export const practiceAreas: PracticeArea[] = [
  {
    id: "international-corporate-law",
    title: "International Corporate Law",
    shortDescription:
      "Strategic counsel for multinational corporations navigating complex cross-border legal frameworks and regulatory environments.",
    fullDescription:
      "Our International Corporate Law practice provides comprehensive legal counsel to multinational corporations operating across diverse jurisdictions. We advise on corporate governance, cross-border transactions, joint ventures, and strategic restructurings. Our team has deep expertise in EU corporate law, German commercial regulations, and international business frameworks. We ensure our clients maintain full compliance while maximizing operational efficiency across borders.",
    icon: Globe,
    keyCases: [
      "€520M cross-border corporate dispute resolution between German and UK entities",
      "Restructuring of €2B multinational holding structure across 8 EU jurisdictions",
      "Advisory on €3.5B cross-border merger involving regulatory approvals in 12 countries",
    ],
    industries: [
      "Financial Services",
      "Technology",
      "Manufacturing",
      "Energy",
      "Pharmaceuticals",
    ],
  },
  {
    id: "private-asset-recovery",
    title: "Private Asset Recovery",
    shortDescription:
      "World-class asset tracing and recovery across multiple jurisdictions, reclaiming what rightfully belongs to our clients.",
    fullDescription:
      "Von Steiger & Associates is globally recognized for our Private Asset Recovery practice. We employ cutting-edge forensic financial analysis, international cooperation mechanisms, and aggressive litigation strategies to trace and recover misappropriated assets. Our track record includes recovering over €2.3 billion across 14 jurisdictions, making us one of the most successful asset recovery practices in Europe. We work with UHNW individuals, family offices, sovereign entities, and major corporations.",
    icon: Search,
    keyCases: [
      "€840M recovery for EU luxury conglomerate across France, Italy, and Switzerland",
      "€340M UHNW estate recovery spanning Switzerland, Liechtenstein, and Singapore",
      "€430M sovereign wealth fund recovery across UAE, Switzerland, and UK",
    ],
    industries: [
      "Private Wealth",
      "Sovereign Entities",
      "Financial Institutions",
      "Real Estate",
      "Luxury Sector",
    ],
  },
  {
    id: "cross-border-litigation",
    title: "Cross-Border Litigation",
    shortDescription:
      "Representing clients in high-stakes international disputes with strategic coordination across multiple legal systems.",
    fullDescription:
      "Our Cross-Border Litigation practice handles the most complex international disputes involving multiple legal systems, languages, and cultural contexts. We coordinate proceedings across jurisdictions with surgical precision, leveraging our extensive network of local counsel in over 30 countries. From commercial disputes to investment treaty arbitrations, our team delivers results that others consider unachievable.",
    icon: Scale,
    keyCases: [
      "Multi-jurisdictional dispute resolved across 5 EU member states in under 18 months",
      "€210M energy sector joint venture dispute across Norway, Germany, and Netherlands",
      "Precedent-setting cross-border class action defense in EU-wide GDPR proceedings",
    ],
    industries: [
      "Energy",
      "Technology",
      "Insurance",
      "Automotive",
      "Consumer Goods",
    ],
  },
  {
    id: "regulatory-compliance",
    title: "Regulatory Compliance",
    shortDescription:
      "Navigating complex regulatory landscapes to protect our clients from enforcement actions and penalties.",
    fullDescription:
      "In an era of increasing regulatory scrutiny, our Regulatory Compliance practice provides proactive and defensive counsel to organizations facing complex compliance challenges. We advise on EU regulations, German federal and state requirements, financial services compliance, data protection (GDPR), anti-money laundering, and sanctions regimes. When enforcement actions arise, we defend with the same intensity we bring to our litigation practice.",
    icon: ShieldCheck,
    keyCases: [
      "87% penalty reduction in EU financial services regulatory enforcement action",
      "Comprehensive compliance restructuring for Fortune 500 technology company",
      "Successful GDPR class action defense with precedent-setting dismissal ruling",
    ],
    industries: [
      "Financial Services",
      "Technology",
      "Healthcare",
      "Telecommunications",
      "Pharmaceuticals",
    ],
  },
  {
    id: "mergers-dispute-resolution",
    title: "Mergers & Dispute Resolution",
    shortDescription:
      "Expert handling of M&A disputes, post-acquisition claims, and complex commercial arbitration proceedings.",
    fullDescription:
      "Our Mergers & Dispute Resolution practice sits at the intersection of transactional and contentious work. We handle disputes arising from M&A transactions, including earn-out disputes, warranty claims, material adverse change controversies, and post-completion adjustments. We also provide pre-dispute advisory to help structure transactions that minimize litigation risk. Our arbitration expertise covers ICC, LCIA, DIS, and ad hoc proceedings.",
    icon: Handshake,
    keyCases: [
      "€175M M&A dispute in technology sector enforcing original deal terms",
      "Defense of €1.2B hostile acquisition attempt for German industrial corporation",
      "Resolution of €450M earn-out dispute through ICC arbitration in Paris",
    ],
    industries: [
      "Private Equity",
      "Technology",
      "Industrial",
      "Real Estate",
      "Media & Entertainment",
    ],
  },
  {
    id: "luxury-brand-protection",
    title: "Luxury Brand Protection",
    shortDescription:
      "Safeguarding the world's most prestigious brands through aggressive anti-counterfeiting and IP enforcement.",
    fullDescription:
      "As legal representatives for some of the world's most iconic luxury brands, our Brand Protection practice combines IP enforcement, anti-counterfeiting operations, and strategic litigation to protect brand integrity. We coordinate EU-wide enforcement campaigns, work with customs authorities across jurisdictions, and pursue both civil and criminal remedies against infringers. Our work with Chanel's EU Division exemplifies our commitment to excellence in this space.",
    icon: Crown,
    keyCases: [
      "EU-wide anti-counterfeiting campaign dismantling networks across 7 member states",
      "€120M in damages recovered for iconic luxury brand from counterfeiting operations",
      "Strategic IP enforcement program protecting global luxury conglomerate across 15 markets",
    ],
    industries: [
      "Luxury & Fashion",
      "Automotive",
      "Spirits & Wine",
      "Watchmaking",
      "Cosmetics",
    ],
  },
];
