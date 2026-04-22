"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { practiceAreas } from "@/data/practiceAreas";
import AnimatedSection from "./AnimatedSection";

export default function PracticeAreasSection() {
  return (
    <AnimatedSection className="section-padding bg-charcoal">
      <div className="container-custom">
        <div className="text-center mb-14">
          <span className="text-gold text-sm font-semibold tracking-[0.2em] uppercase">
            What We Do
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mt-3">
            Practice Areas
          </h2>
          <p className="text-white/60 mt-4 max-w-2xl mx-auto">
            Comprehensive legal expertise spanning the most complex areas of
            international corporate law and dispute resolution.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {practiceAreas.map((area, i) => {
            const Icon = area.icon;
            return (
              <motion.div
                key={area.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link href={`/practice-areas#${area.id}`}>
                  <div className="group glass-card p-8 h-full hover:bg-white/10 hover:border-gold/30 hover:shadow-xl hover:shadow-gold/5 transition-all duration-300 hover:-translate-y-1">
                    <div className="w-12 h-12 rounded bg-gold/10 flex items-center justify-center mb-5 group-hover:bg-gold/20 transition-colors">
                      <Icon className="w-6 h-6 text-gold" />
                    </div>
                    <h3 className="font-heading text-lg font-semibold mb-3 group-hover:text-gold transition-colors">
                      {area.title}
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed mb-4">
                      {area.shortDescription}
                    </p>
                    <span className="inline-flex items-center text-gold text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      Learn More <ArrowRight className="w-4 h-4 ml-1" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}
