"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { practiceAreas } from "@/data/practiceAreas";
import AnimatedSection from "@/components/sections/AnimatedSection";

export default function PracticeAreasPageClient() {
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
              Our Expertise
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold mt-3 mb-6">
              Practice Areas
            </h1>
            <p className="text-white/60 max-w-2xl text-lg">
              Comprehensive legal expertise across the most demanding areas of
              international corporate law and dispute resolution.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-navy">
        <div className="container-custom space-y-16">
          {practiceAreas.map((area, i) => {
            const Icon = area.icon;
            return (
              <AnimatedSection key={area.id} delay={i * 0.05}>
                <div
                  id={area.id}
                  className="glass-card p-8 sm:p-10 scroll-mt-24"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-14 h-14 rounded bg-gold/10 flex items-center justify-center shrink-0">
                      <Icon className="w-7 h-7 text-gold" />
                    </div>
                    <div>
                      <h2 className="font-heading text-2xl sm:text-3xl font-bold">
                        {area.title}
                      </h2>
                    </div>
                  </div>

                  <p className="text-white/70 leading-relaxed mb-8 max-w-4xl">
                    {area.fullDescription}
                  </p>

                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div>
                      <h3 className="text-gold text-sm font-semibold tracking-wider uppercase mb-4">
                        Key Cases
                      </h3>
                      <ul className="space-y-3">
                        {area.keyCases.map((c) => (
                          <li key={c} className="flex items-start gap-3">
                            <CheckCircle className="w-4 h-4 text-gold mt-1 shrink-0" />
                            <span className="text-white/60 text-sm">{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-gold text-sm font-semibold tracking-wider uppercase mb-4">
                        Industries Served
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {area.industries.map((ind) => (
                          <span
                            key={ind}
                            className="text-xs text-white/60 border border-white/10 px-3 py-1.5 rounded-sm"
                          >
                            {ind}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Link href="/contact">
                    <Button className="bg-gold hover:bg-gold-dark text-navy font-semibold rounded-sm">
                      Schedule a Consultation
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </section>
    </>
  );
}
