"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { caseResults } from "@/data/caseResults";
import AnimatedSection from "./AnimatedSection";

export default function CaseResultsSection() {
  const featured = caseResults.filter((r) => r.featured);

  return (
    <AnimatedSection className="section-padding bg-navy-dark relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25% 25%, #C9A84C 0%, transparent 50%)",
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="text-center mb-14">
          <span className="text-gold text-sm font-semibold tracking-[0.2em] uppercase">
            Proven Track Record
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mt-3">
            Case Results
          </h2>
          <p className="text-white/60 mt-4 max-w-2xl mx-auto">
            A selection of our most significant case outcomes demonstrating our
            commitment to delivering extraordinary results.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {featured.map((result, i) => (
            <motion.div
              key={result.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative group"
            >
              <div className="bg-gradient-to-br from-navy-light to-charcoal border border-gold/20 rounded-sm p-8 h-full hover:border-gold/40 transition-all duration-300">
                <div className="text-gold font-heading text-4xl sm:text-5xl font-bold mb-2">
                  {result.amount}
                </div>
                <div className="text-gold/60 text-xs uppercase tracking-wider mb-4">
                  {result.caseType}
                </div>
                <h3 className="font-heading text-lg font-semibold mb-3">
                  {result.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed mb-4">
                  {result.description.slice(0, 150)}...
                </p>
                <div className="flex items-center gap-2 text-white/40 text-xs">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-gold/60" />
                  {result.jurisdiction}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/results">
            <Button
              variant="outline"
              className="border-gold/30 text-gold hover:bg-gold/10 rounded-sm px-8"
            >
              View All Results
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </AnimatedSection>
  );
}
