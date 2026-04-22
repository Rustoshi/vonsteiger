"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { caseResults } from "@/data/caseResults";
import AnimatedSection from "@/components/sections/AnimatedSection";

const caseTypes = [
  "All",
  ...Array.from(new Set(caseResults.map((r) => r.caseType))),
];

export default function ResultsPageClient() {
  const [filter, setFilter] = useState("All");

  const filtered =
    filter === "All"
      ? caseResults
      : caseResults.filter((r) => r.caseType === filter);

  const totalRecovered = caseResults.reduce((s, r) => s + r.amountNum, 0);

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
              Track Record
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold mt-3 mb-6">
              Case Results
            </h1>
            <p className="text-white/60 max-w-2xl text-lg">
              A comprehensive view of our most significant outcomes across
              international litigation, asset recovery, and regulatory defense.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-navy-dark border-y border-white/5">
        <div className="container-custom">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="font-heading text-3xl sm:text-4xl font-bold text-gold">
                €{(totalRecovered / 1000).toFixed(1)}B+
              </div>
              <div className="text-white/50 text-sm mt-1">Total Recovered</div>
            </div>
            <div>
              <div className="font-heading text-3xl sm:text-4xl font-bold text-gold">
                {caseResults.length}+
              </div>
              <div className="text-white/50 text-sm mt-1">Cases Won</div>
            </div>
            <div>
              <div className="font-heading text-3xl sm:text-4xl font-bold text-gold">
                14+
              </div>
              <div className="text-white/50 text-sm mt-1">Jurisdictions</div>
            </div>
          </div>
        </div>
      </section>

      <AnimatedSection className="section-padding bg-navy">
        <div className="container-custom">
          <div className="flex flex-wrap gap-3 mb-10">
            {caseTypes.map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`text-sm px-4 py-2 rounded-sm border transition-all ${
                  filter === type
                    ? "bg-gold text-navy border-gold font-semibold"
                    : "border-white/10 text-white/60 hover:border-gold/30 hover:text-gold"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((result, i) => (
              <motion.div
                key={result.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="glass-card p-6 hover:border-gold/30 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <Badge
                    variant="outline"
                    className="text-gold border-gold/30 text-xs"
                  >
                    {result.caseType}
                  </Badge>
                  <span className="text-white/40 text-xs">{result.year}</span>
                </div>
                <div className="font-heading text-3xl font-bold text-gold mb-2">
                  {result.amount}
                </div>
                <h3 className="font-heading text-base font-semibold mb-2">
                  {result.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed mb-4">
                  {result.description.slice(0, 120)}...
                </p>
                <div className="border-t border-white/5 pt-3">
                  <p className="text-white/40 text-xs mb-2">
                    <span className="text-gold/60">Jurisdiction:</span>{" "}
                    {result.jurisdiction}
                  </p>
                  <p className="text-white/60 text-xs">
                    <span className="text-gold/60">Outcome:</span>{" "}
                    {result.outcome.slice(0, 100)}...
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </>
  );
}
