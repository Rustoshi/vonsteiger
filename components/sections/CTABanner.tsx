"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CTABanner() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={ref} className="relative overflow-hidden py-24 sm:py-32">
      <motion.div style={{ y }} className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1920&q=80"
          alt="Legal library with law books"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>
      <div className="absolute inset-0 bg-navy/85" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy to-transparent" />

      <div className="relative z-10 container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Your Assets.{" "}
            <span className="text-gold-gradient">Our Mission.</span>
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-xl">
            When billions are at stake, experience and precision matter. Schedule
            a confidential consultation with our senior partners today.
          </p>
          <Link href="/contact">
            <Button
              size="lg"
              className="bg-gold hover:bg-gold-dark text-navy font-semibold px-8 py-6 text-base rounded-sm"
            >
              Schedule a Consultation
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
