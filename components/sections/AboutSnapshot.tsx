"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

function CountUp({ end, suffix = "", duration = 2 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const increment = end / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [inView, end, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

const stats = [
  { value: 20, suffix: "+", label: "Years Experience" },
  { value: 2.3, suffix: "B+", label: "Euros Recovered", prefix: "€" },
  { value: 14, suffix: "+", label: "Jurisdictions" },
  { value: 98, suffix: "%", label: "Success Rate" },
];

export default function AboutSnapshot() {
  return (
    <AnimatedSection className="section-padding bg-navy">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative aspect-[3/4] max-w-md mx-auto lg:mx-0 rounded-sm overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80"
                alt="Julian von Steiger — Senior Partner"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-4 -right-4 lg:right-auto lg:-left-4 bg-gold text-navy p-6 rounded-sm">
              <div className="font-heading text-3xl font-bold">20+</div>
              <div className="text-sm font-semibold">Years of Excellence</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <span className="text-gold text-sm font-semibold tracking-[0.2em] uppercase">
              About the Firm
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold mt-3 mb-6">
              Julian von Steiger
            </h2>
            <p className="text-white/60 text-sm uppercase tracking-wider mb-4">
              Senior Partner / Lead Counsel
            </p>
            <p className="text-white/70 leading-relaxed mb-8">
              Over 20 years of experience in cross-border corporate disputes,
              private asset tracing, and high-stakes litigation for Fortune 500
              clients and luxury conglomerates. Known for recovering over €2.3
              billion in withheld assets across 14 jurisdictions. Currently
              serving as legal representative for Chanel&apos;s EU Division.
            </p>

            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="glass-card p-4 text-center"
                >
                  <div className="font-heading text-2xl sm:text-3xl font-bold text-gold">
                    {stat.prefix || ""}
                    <CountUp
                      end={stat.value}
                      suffix={stat.suffix}
                    />
                  </div>
                  <div className="text-white/50 text-xs mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}
