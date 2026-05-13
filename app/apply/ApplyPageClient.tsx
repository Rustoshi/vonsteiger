"use client";

import { motion } from "framer-motion";
import { Shield, Clock, Globe, Scale } from "lucide-react";
import { useHydrated } from "@/lib/useHydrated";
import AnimatedSection from "@/components/sections/AnimatedSection";
import AssetRecoveryForm from "./AssetRecoveryForm";

const highlights = [
  {
    icon: Shield,
    title: "Strict Confidentiality",
    desc: "All submissions are protected by attorney-client privilege under German and EU law.",
  },
  {
    icon: Clock,
    title: "48-Hour Review",
    desc: "A senior associate will review your case and respond within 48 business hours.",
  },
  {
    icon: Globe,
    title: "14+ Jurisdictions",
    desc: "Cross-border recovery expertise spanning Europe, Asia, the Americas, and offshore centres.",
  },
  {
    icon: Scale,
    title: "€2.3B+ Recovered",
    desc: "Proven track record in high-value asset recovery and international litigation.",
  },
];

export default function ApplyPageClient() {
  const mounted = useHydrated();

  return (
    <>
      <section className="relative pt-32 pb-20 bg-navy">
        <div className="container-custom">
          <motion.div
            initial={mounted ? { opacity: 0, y: 30 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-gold text-sm font-semibold tracking-[0.2em] uppercase">
              Asset Recovery
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold mt-3 mb-6">
              Client Application
            </h1>
            <p className="text-white/60 max-w-2xl text-lg">
              Begin your asset recovery case by providing the details below. Our
              team will conduct a preliminary assessment and contact you to
              discuss the next steps.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-navy-dark border-y border-white/5">
        <div className="container-custom">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={mounted ? { opacity: 0, y: 20 } : false}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * i }}
                  className="flex items-start gap-3"
                >
                  <div className="w-9 h-9 rounded bg-gold/10 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-gold" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">
                      {item.title}
                    </p>
                    <p className="text-white/50 text-xs mt-0.5">{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <AnimatedSection className="section-padding bg-navy">
        <div className="container-custom max-w-3xl">
          <div className="glass-card p-4 sm:p-8 md:p-10">
            <h2 className="font-heading text-2xl font-bold mb-2">
              Asset Recovery Application
            </h2>
            <p className="text-white/50 text-sm mb-8">
              Complete all required fields below. The more detail you provide,
              the faster we can assess your case.
            </p>
            <AssetRecoveryForm />
          </div>
        </div>
      </AnimatedSection>

    </>
  );
}
