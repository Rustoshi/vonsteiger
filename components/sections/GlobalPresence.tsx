"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const offices = [
  {
    city: "Hamburg",
    address: "Neuer Wall 50, 20354 Hamburg, Germany",
    phone: "+49 (40) 123 456 789",
    email: "hamburg@vonsteiger.law",
    description: "Our flagship office in Hamburg's prestigious Neuer Wall district serves as the firm's international headquarters.",
  },
  {
    city: "Berlin",
    address: "Friedrichstraße 191, 10117 Berlin, Germany",
    phone: "+49 (30) 987 654 321",
    email: "berlin@vonsteiger.law",
    description: "Our Berlin office provides strategic access to Germany's political and regulatory landscape.",
  },
];

export default function GlobalPresence() {
  return (
    <AnimatedSection className="section-padding bg-charcoal">
      <div className="container-custom">
        <div className="text-center mb-14">
          <span className="text-gold text-sm font-semibold tracking-[0.2em] uppercase">
            Our Offices
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mt-3">
            Global Presence
          </h2>
          <p className="text-white/60 mt-4 max-w-2xl mx-auto">
            Strategically located in Germany&apos;s most important business cities,
            with a network spanning over 30 countries.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {offices.map((office, i) => (
            <motion.div
              key={office.city}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="glass-card p-8 hover:border-gold/30 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded bg-gold/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-gold" />
                </div>
                <h3 className="font-heading text-2xl font-bold">{office.city}</h3>
              </div>
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                {office.description}
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="w-4 h-4 text-gold/60 shrink-0" />
                  <span className="text-white/70">{office.address}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-gold/60 shrink-0" />
                  <span className="text-white/70">{office.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-gold/60 shrink-0" />
                  <span className="text-white/70">{office.email}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
