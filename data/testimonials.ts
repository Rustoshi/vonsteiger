export interface Testimonial {
  id: string;
  quote: string;
  clientName: string;
  clientTitle: string;
  rating: number;
  caseType: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    quote:
      "Von Steiger & Associates recovered assets we were told were unrecoverable. Their tenacity in cross-border litigation is unmatched. Julian personally oversaw every critical filing.",
    clientName: "Dr. Heinrich Müller",
    clientTitle: "CEO, Fortune 500 Conglomerate",
    rating: 5.0,
    caseType: "Asset Recovery",
  },
  {
    id: "2",
    quote:
      "In a complex multi-jurisdictional dispute involving five EU member states, Julian's team delivered a resolution in under 18 months — something our previous counsel said was impossible.",
    clientName: "Confidential Client",
    clientTitle: "Chairman, Global Luxury Group",
    rating: 5.0,
    caseType: "Cross-Border Litigation",
  },
  {
    id: "3",
    quote:
      "Their understanding of international corporate structures and regulatory frameworks is extraordinary. They don't just litigate — they architect winning strategies.",
    clientName: "Marie-Claire Dupont",
    clientTitle: "General Counsel, European Fashion House",
    rating: 4.9,
    caseType: "Corporate Law",
  },
  {
    id: "4",
    quote:
      "We engaged Von Steiger for a €340M asset recovery case that spanned three continents. The result exceeded every expectation. Absolute precision from start to finish.",
    clientName: "James Harrington",
    clientTitle: "Managing Director, Private Equity Firm",
    rating: 5.0,
    caseType: "Asset Recovery",
  },
  {
    id: "5",
    quote:
      "Julian von Steiger is, without exaggeration, the finest litigation strategist I have encountered in 30 years of business. His firm's work on our regulatory compliance restructuring saved us from catastrophic penalties.",
    clientName: "Prof. Takeshi Yamamoto",
    clientTitle: "President, Asia-Pacific Industrial Group",
    rating: 5.0,
    caseType: "Regulatory Compliance",
  },
  {
    id: "6",
    quote:
      "When our brand was under siege from counterfeit operations across seven markets, Von Steiger assembled a litigation task force that dismantled the entire network within months.",
    clientName: "Confidential Client",
    clientTitle: "VP Legal, Iconic Luxury Brand",
    rating: 4.9,
    caseType: "Brand Protection",
  },
  {
    id: "7",
    quote:
      "The level of discretion, professionalism, and sheer legal firepower is something you rarely find. They protected our interests during a hostile acquisition attempt worth €1.2B.",
    clientName: "Friedrich Bauer",
    clientTitle: "Board Member, German Industrial Corp",
    rating: 5.0,
    caseType: "Mergers & Disputes",
  },
  {
    id: "8",
    quote:
      "From initial consultation to final judgment, every interaction was marked by excellence. They transformed a seemingly hopeless case into a landmark victory.",
    clientName: "Elena Vasquez",
    clientTitle: "CEO, Latin American Holdings Group",
    rating: 5.0,
    caseType: "International Litigation",
  },
  {
    id: "9",
    quote:
      "Von Steiger's team navigated the most complex regulatory landscape I've seen — spanning EU, Swiss, and UK jurisdictions — with surgical precision and unwavering confidence.",
    clientName: "Sir Charles Whitfield",
    clientTitle: "Director, London-based Investment Trust",
    rating: 4.9,
    caseType: "Regulatory Compliance",
  },
  {
    id: "10",
    quote:
      "After two other firms failed to make progress, Julian's team took our case and secured a full recovery within nine months. The difference in caliber was immediately apparent.",
    clientName: "Confidential Client",
    clientTitle: "Family Office, UHNW Client",
    rating: 5.0,
    caseType: "Asset Recovery",
  },
];
