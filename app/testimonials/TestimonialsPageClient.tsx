"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { testimonials } from "@/data/testimonials";
import AnimatedSection from "@/components/sections/AnimatedSection";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < Math.floor(rating)
              ? "text-gold fill-gold"
              : i < rating
                ? "text-gold fill-gold/50"
                : "text-white/20"
          }`}
        />
      ))}
    </div>
  );
}

export default function TestimonialsPageClient() {
  const avgRating = (
    testimonials.reduce((s, t) => s + t.rating, 0) / testimonials.length
  ).toFixed(1);

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
              Client Feedback
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold mt-3 mb-6">
              Testimonials
            </h1>
            <p className="text-white/60 max-w-2xl text-lg">
              Hear directly from the clients we have represented in some of the
              most complex litigation and asset recovery matters worldwide.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-navy-dark border-y border-white/5">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-center">
            <div>
              <div className="font-heading text-5xl font-bold text-gold">
                {avgRating}
              </div>
              <div className="text-white/50 text-sm mt-1">Average Rating</div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-white/10" />
            <div>
              <div className="flex gap-1 justify-center mb-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-gold fill-gold" />
                ))}
              </div>
              <div className="text-white/50 text-sm">from 200+ clients</div>
            </div>
          </div>
        </div>
      </section>

      <AnimatedSection className="section-padding bg-navy">
        <div className="container-custom">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="glass-card p-6 hover:border-gold/30 transition-all duration-300 flex flex-col"
              >
                <StarRating rating={t.rating} />
                <blockquote className="text-white/80 text-sm leading-relaxed mt-4 mb-6 flex-1">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="border-t border-white/5 pt-4">
                  <p className="font-semibold text-white text-sm">
                    {t.clientName}
                  </p>
                  <p className="text-white/50 text-xs">{t.clientTitle}</p>
                  <Badge
                    variant="outline"
                    className="text-gold border-gold/30 text-xs mt-2"
                  >
                    {t.caseType}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </>
  );
}
