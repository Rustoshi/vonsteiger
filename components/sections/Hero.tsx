"use client";

import { motion } from "framer-motion";
import { useHydrated } from "@/lib/useHydrated";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

export default function Hero() {
  const mounted = useHydrated();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80"
        alt="Corporate skyline at dusk"
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/70 to-navy" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy/50 to-transparent" />

      <motion.div
        variants={containerVariants}
        initial={mounted ? "hidden" : false}
        animate="visible"
        className="relative z-10 container-custom text-center max-w-5xl py-32"
      >
        <motion.div variants={itemVariants} className="mb-6">
          <span className="inline-block text-gold text-sm font-semibold tracking-[0.3em] uppercase border border-gold/30 px-4 py-2 rounded-sm">
            International Litigation &amp; Asset Recovery
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
        >
          Relentless Pursuit of Justice.{" "}
          <span className="text-gold-gradient">Unmatched Results.</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          Over €2.3 billion recovered across 14 jurisdictions. Von Steiger &
          Associates delivers world-class litigation and private asset recovery
          for the world&apos;s most demanding clients.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/contact">
            <Button
              size="lg"
              className="bg-gold hover:bg-gold-dark text-navy font-semibold px-8 py-6 text-base rounded-sm"
            >
              Schedule a Consultation
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <Link href="/results">
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-base rounded-sm"
            >
              <BarChart3 className="w-5 h-5 mr-2" />
              View Our Results
            </Button>
          </Link>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-16 flex flex-wrap justify-center gap-8 sm:gap-12"
        >
          {[
            { value: "€2.3B+", label: "Assets Recovered" },
            { value: "98%", label: "Success Rate" },
            { value: "14+", label: "Jurisdictions" },
            { value: "20+", label: "Years Experience" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-gold font-heading text-2xl sm:text-3xl font-bold">
                {stat.value}
              </div>
              <div className="text-white/50 text-xs sm:text-sm mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        initial={mounted ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2"
        >
          <div className="w-1 h-2 bg-gold rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
