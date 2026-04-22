"use client";

import { motion } from "framer-motion";
import { FileText, CreditCard, AlertTriangle, Scale, Clock, ShieldCheck } from "lucide-react";
import AnimatedSection from "@/components/sections/AnimatedSection";

const sections = [
  {
    id: "engagement",
    icon: FileText,
    title: "1. Engagement & Scope of Services",
    content: [
      "Von Steiger & Associates (hereinafter 'the Firm') agrees to provide legal services to the Client as described in the signed Letter of Engagement. The scope of representation is limited to the specific matter(s) outlined therein.",
      "Any expansion of the scope of services beyond the original engagement must be agreed upon in writing by both parties and may be subject to revised fee arrangements.",
      "The Firm reserves the right to decline or withdraw from representation if a conflict of interest arises, if the Client fails to cooperate, or if continued representation would violate applicable professional or ethical obligations.",
    ],
  },
  {
    id: "upfront-payment",
    icon: CreditCard,
    title: "2. Upfront Payment & Retainer",
    content: [
      "All new client engagements require an upfront retainer payment before the Firm commences any work on the matter. The retainer amount will be specified in the Letter of Engagement and is determined by the complexity, estimated scope, and jurisdiction of the matter.",
      "Standard retainer amounts are as follows:",
    ],
    table: [
      { type: "Corporate Litigation", retainer: "€25,000 – €75,000" },
      { type: "Private Asset Recovery", retainer: "€50,000 – €150,000" },
      { type: "Cross-Border Disputes", retainer: "€40,000 – €120,000" },
      { type: "Regulatory & Compliance", retainer: "€15,000 – €50,000" },
      { type: "Intellectual Property", retainer: "€20,000 – €60,000" },
      { type: "General Consultation", retainer: "€5,000 – €15,000" },
    ],
    contentAfter: [
      "The retainer is applied against hourly fees and disbursements as they are incurred. The Client will receive monthly invoices detailing all charges drawn against the retainer. When the retainer balance falls below 20% of the original amount, the Client will be required to replenish it to the full retainer amount before further work is undertaken.",
      "Retainer payments are non-refundable except where required by applicable law or regulation, or where the Firm terminates the engagement for reasons not attributable to the Client, in which case unused portions will be returned within 30 business days.",
      "For high-value matters exceeding €500,000 in estimated recovery, a bespoke fee structure may be arranged, including success-based or hybrid fee models, at the Firm's sole discretion.",
    ],
  },
  {
    id: "fee-structure",
    icon: Scale,
    title: "3. Fee Structure & Billing",
    content: [
      "The Firm's standard hourly rates are as follows: Senior Partners €650–€950/hour; Partners €450–€650/hour; Senior Associates €300–€450/hour; Associates €200–€300/hour. Rates are reviewed annually and may be adjusted with 30 days' written notice.",
      "Disbursements, including court filing fees, expert witness fees, travel expenses, translation costs, and third-party investigation services, are billed at cost and are not included in the hourly rate.",
      "Invoices are issued monthly and are payable within 14 calendar days of the invoice date. Late payments are subject to interest at the rate of 1.5% per month (or the maximum rate permitted by law, whichever is lower).",
      "The Firm reserves the right to suspend services if any invoice remains unpaid for more than 30 days. Resumption of services after suspension may require an additional retainer deposit.",
    ],
  },
  {
    id: "confidentiality",
    icon: ShieldCheck,
    title: "4. Confidentiality & Privilege",
    content: [
      "All information shared between the Client and the Firm is protected by attorney-client privilege and treated with the strictest confidentiality, in accordance with the German Federal Lawyers' Act (BRAO), EU General Data Protection Regulation (GDPR), and all applicable professional secrecy obligations.",
      "The Firm will not disclose any client information to third parties without the Client's express written consent, except where required by law, court order, or regulatory obligation.",
      "Confidentiality obligations survive the termination of the engagement and remain in effect indefinitely.",
    ],
  },
  {
    id: "termination",
    icon: Clock,
    title: "5. Termination of Engagement",
    content: [
      "Either party may terminate the engagement upon 30 days' written notice. Upon termination, the Client is responsible for payment of all fees and disbursements incurred up to the date of termination.",
      "The Firm will provide all client files and work product upon termination, subject to the Firm's right to retain copies for its records and any applicable lien for unpaid fees.",
      "In the event of termination, any unused retainer balance (less outstanding fees and disbursements) will be returned to the Client within 30 business days, except where the retainer is non-refundable as specified in the Letter of Engagement.",
    ],
  },
  {
    id: "liability",
    icon: AlertTriangle,
    title: "6. Limitation of Liability & Disclaimers",
    content: [
      "The Firm's total liability to the Client for any claim arising from the engagement shall not exceed the total fees paid by the Client for the specific matter in question, except in cases of gross negligence or willful misconduct.",
      "The Firm does not guarantee any particular outcome or result. All representations regarding likely outcomes are provided in good faith based on the Firm's professional judgment and experience but do not constitute a guarantee.",
      "The Client acknowledges that legal proceedings involve inherent risks and uncertainties, and that the Firm's past results (including the case results displayed on this website) do not guarantee similar outcomes in the Client's matter.",
      "This agreement shall be governed by and construed in accordance with the laws of the Federal Republic of Germany. Any disputes arising from this agreement shall be subject to the exclusive jurisdiction of the courts of Hamburg, Germany.",
    ],
  },
];

export default function AgreementPageClient() {
  return (
    <>
      <section className="relative pt-32 pb-20 bg-navy">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-gold text-sm font-semibold tracking-[0.2em] uppercase">
              Legal Terms
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold mt-3 mb-6">
              Client Agreement
            </h1>
            <p className="text-white/60 max-w-2xl text-lg">
              Please review the following terms and conditions governing our
              engagement. All new client matters are subject to these terms and
              the signed Letter of Engagement.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-navy-dark border-y border-white/5">
        <div className="container-custom">
          <div className="flex items-center gap-4 p-5 rounded-sm bg-gold/10 border border-gold/20">
            <CreditCard className="w-6 h-6 text-gold shrink-0" />
            <div>
              <p className="text-white font-semibold text-sm">
                Upfront Payment Required
              </p>
              <p className="text-white/60 text-sm">
                All new engagements require a retainer payment before the Firm
                begins work. See Section 2 below for details and retainer
                schedules by practice area.
              </p>
            </div>
          </div>
        </div>
      </section>

      <AnimatedSection className="section-padding bg-navy">
        <div className="container-custom max-w-4xl">
          <nav className="glass-card p-6 mb-12">
            <p className="text-gold text-xs font-semibold tracking-wider uppercase mb-4">
              Table of Contents
            </p>
            <ol className="space-y-2">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="text-white/70 text-sm hover:text-gold transition-colors"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="space-y-14">
            {sections.map((section, i) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={section.id}
                  id={section.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="scroll-mt-24"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded bg-gold/10 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-gold" />
                    </div>
                    <h2 className="font-heading text-xl sm:text-2xl font-bold">
                      {section.title}
                    </h2>
                  </div>

                  <div className="space-y-4 pl-[52px]">
                    {section.content.map((p, j) => (
                      <p
                        key={j}
                        className="text-white/70 text-sm leading-relaxed"
                      >
                        {p}
                      </p>
                    ))}

                    {section.table && (
                      <div className="overflow-x-auto my-6">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-gold/20">
                              <th className="text-left text-gold py-3 pr-4 font-semibold">
                                Practice Area
                              </th>
                              <th className="text-left text-gold py-3 font-semibold">
                                Retainer Range
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {section.table.map((row) => (
                              <tr
                                key={row.type}
                                className="border-b border-white/5"
                              >
                                <td className="py-3 pr-4 text-white/80">
                                  {row.type}
                                </td>
                                <td className="py-3 text-gold font-semibold">
                                  {row.retainer}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {section.contentAfter?.map((p, j) => (
                      <p
                        key={`after-${j}`}
                        className="text-white/70 text-sm leading-relaxed"
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-16 glass-card p-8 text-center">
            <p className="text-white/50 text-sm leading-relaxed">
              This Client Agreement is effective as of the date of signing the
              Letter of Engagement. By engaging Von Steiger & Associates, the
              Client acknowledges that they have read, understood, and agreed to
              all terms set forth herein.
            </p>
            <p className="text-white/30 text-xs mt-4">
              Last updated: January 2026 &middot; Von Steiger & Associates,
              Neuer Wall 50, 20354 Hamburg, Germany
            </p>
          </div>
        </div>
      </AnimatedSection>
    </>
  );
}
