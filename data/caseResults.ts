export interface CaseResult {
  id: string;
  title: string;
  amount: string;
  amountNum: number;
  jurisdiction: string;
  caseType: string;
  description: string;
  outcome: string;
  year: number;
  featured: boolean;
}

export const caseResults: CaseResult[] = [
  {
    id: "1",
    title: "EU Luxury Conglomerate Asset Recovery",
    amount: "€840M",
    amountNum: 840,
    jurisdiction: "France, Italy, Switzerland",
    caseType: "Asset Recovery",
    description:
      "Represented a major EU luxury conglomerate in recovering assets frozen across three jurisdictions following a complex corporate fraud scheme involving offshore shell companies.",
    outcome: "Full recovery achieved within 14 months through coordinated litigation across French, Italian, and Swiss courts.",
    year: 2023,
    featured: true,
  },
  {
    id: "2",
    title: "Cross-Border Corporate Dispute Resolution",
    amount: "€520M",
    amountNum: 520,
    jurisdiction: "Germany, United Kingdom",
    caseType: "Corporate Litigation",
    description:
      "Defended a German industrial group against hostile acquisition claims brought by a UK-based private equity firm seeking to undervalue and forcibly acquire strategic assets.",
    outcome: "Successfully blocked the hostile acquisition and secured a €520M settlement in favor of our client.",
    year: 2023,
    featured: true,
  },
  {
    id: "3",
    title: "Private Asset Tracing — UHNW Estate",
    amount: "€340M",
    amountNum: 340,
    jurisdiction: "Switzerland, Liechtenstein, Singapore",
    caseType: "Asset Recovery",
    description:
      "Engaged by a UHNW family office to trace and recover assets misappropriated by a former fiduciary across multiple offshore jurisdictions.",
    outcome: "Complete asset recovery achieved through strategic litigation and international cooperation orders.",
    year: 2022,
    featured: true,
  },
  {
    id: "4",
    title: "Pharmaceutical Patent Dispute",
    amount: "€280M",
    amountNum: 280,
    jurisdiction: "Germany, Netherlands",
    caseType: "Corporate Litigation",
    description:
      "Represented a leading pharmaceutical company in a high-stakes patent infringement case against a competing manufacturer operating across EU markets.",
    outcome: "Landmark ruling in favor of our client with €280M in damages awarded plus permanent injunctive relief.",
    year: 2022,
    featured: false,
  },
  {
    id: "5",
    title: "Regulatory Defense — Financial Services",
    amount: "€95M",
    amountNum: 95,
    jurisdiction: "Germany, Luxembourg",
    caseType: "Regulatory Compliance",
    description:
      "Defended a multinational financial services firm against regulatory enforcement actions by EU authorities alleging systemic compliance failures.",
    outcome: "Penalties reduced by 87% through strategic regulatory negotiations and comprehensive compliance restructuring.",
    year: 2021,
    featured: false,
  },
  {
    id: "6",
    title: "Luxury Brand Anti-Counterfeiting Campaign",
    amount: "€120M",
    amountNum: 120,
    jurisdiction: "EU-wide (7 member states)",
    caseType: "Brand Protection",
    description:
      "Led an EU-wide litigation campaign to dismantle a sophisticated counterfeiting network targeting iconic luxury brands across seven member states.",
    outcome: "Complete network dismantlement, criminal referrals in 4 jurisdictions, and €120M in damages recovered.",
    year: 2023,
    featured: false,
  },
  {
    id: "7",
    title: "M&A Dispute — Technology Sector",
    amount: "€175M",
    amountNum: 175,
    jurisdiction: "Germany, United States",
    caseType: "Mergers & Disputes",
    description:
      "Represented the seller in a disputed technology acquisition where the buyer attempted to invoke material adverse change clauses to renegotiate a €2B deal.",
    outcome: "Enforced the original deal terms and secured an additional €175M in breakage fees and damages.",
    year: 2021,
    featured: false,
  },
  {
    id: "8",
    title: "Sovereign Wealth Fund Recovery",
    amount: "€430M",
    amountNum: 430,
    jurisdiction: "UAE, Switzerland, UK",
    caseType: "Asset Recovery",
    description:
      "Acted for a sovereign wealth fund in recovering misappropriated investment proceeds channeled through a web of corporate vehicles across three continents.",
    outcome: "Successful freezing orders and eventual recovery of €430M through coordinated international proceedings.",
    year: 2020,
    featured: false,
  },
  {
    id: "9",
    title: "Energy Sector Joint Venture Dispute",
    amount: "€210M",
    amountNum: 210,
    jurisdiction: "Norway, Germany, Netherlands",
    caseType: "Corporate Litigation",
    description:
      "Represented the minority partner in a North Sea energy joint venture dispute involving allegations of fraudulent accounting and profit siphoning.",
    outcome: "Full vindication with €210M in recovered profits and restructured governance terms.",
    year: 2020,
    featured: false,
  },
  {
    id: "10",
    title: "Real Estate Investment Fraud",
    amount: "€155M",
    amountNum: 155,
    jurisdiction: "Germany, Spain, Cyprus",
    caseType: "Asset Recovery",
    description:
      "Traced and recovered assets for a consortium of institutional investors defrauded through a complex European real estate investment scheme.",
    outcome: "Recovery of €155M through asset freezing orders and settlements across three jurisdictions.",
    year: 2019,
    featured: false,
  },
  {
    id: "11",
    title: "Insurance Coverage Dispute",
    amount: "€88M",
    amountNum: 88,
    jurisdiction: "Germany, UK",
    caseType: "Corporate Litigation",
    description:
      "Represented a major insurer in defending against an €88M coverage claim arising from a complex professional indemnity policy dispute.",
    outcome: "Successfully defended the claim in full, with costs awarded in favor of our client.",
    year: 2021,
    featured: false,
  },
  {
    id: "12",
    title: "Data Privacy Class Action Defense",
    amount: "€65M",
    amountNum: 65,
    jurisdiction: "Germany, EU-wide",
    caseType: "Regulatory Compliance",
    description:
      "Defended a global technology company against a €65M GDPR-related class action brought by a consumer advocacy group across multiple EU jurisdictions.",
    outcome: "Case dismissed on procedural grounds; precedent-setting ruling on cross-border class action standing.",
    year: 2022,
    featured: false,
  },
];
