"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import ContactForm from "@/components/sections/ContactForm";
import AnimatedSection from "@/components/sections/AnimatedSection";

export default function ContactPageClient() {
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
              Get in Touch
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold mt-3 mb-6">
              Contact Us
            </h1>
            <p className="text-white/60 max-w-2xl text-lg">
              Schedule a confidential consultation with our senior partners.
              All communications are treated with the utmost discretion.
            </p>
          </motion.div>
        </div>
      </section>

      <AnimatedSection className="section-padding bg-navy">
        <div className="container-custom">
          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3">
              <div className="glass-card p-8 sm:p-10">
                <h2 className="font-heading text-2xl font-bold mb-2">
                  Send a Message
                </h2>
                <p className="text-white/50 text-sm mb-8">
                  Complete the form below and a member of our team will respond
                  within 24 hours.
                </p>
                <ContactForm />
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <div className="glass-card p-6">
                <h3 className="font-heading text-lg font-semibold mb-4 text-gold">
                  Hamburg Office
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-gold mt-1 shrink-0" />
                    <span className="text-white/70 text-sm">
                      Neuer Wall 50, 20354 Hamburg, Germany
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-gold shrink-0" />
                    <a
                      href="tel:+4940123456789"
                      className="text-white/70 text-sm hover:text-gold transition-colors"
                    >
                      +49 (40) 123 456 789
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-gold shrink-0" />
                    <a
                      href="mailto:hamburg@vonsteiger.law"
                      className="text-white/70 text-sm hover:text-gold transition-colors"
                    >
                      hamburg@vonsteiger.law
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-gold shrink-0" />
                    <span className="text-white/70 text-sm">
                      Mon–Fri: 08:00–18:00 CET
                    </span>
                  </li>
                </ul>
              </div>

              <div className="glass-card p-6">
                <h3 className="font-heading text-lg font-semibold mb-4 text-gold">
                  Berlin Office
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-gold mt-1 shrink-0" />
                    <span className="text-white/70 text-sm">
                      Friedrichstraße 191, 10117 Berlin, Germany
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-gold shrink-0" />
                    <a
                      href="tel:+4930987654321"
                      className="text-white/70 text-sm hover:text-gold transition-colors"
                    >
                      +49 (30) 987 654 321
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-gold shrink-0" />
                    <a
                      href="mailto:berlin@vonsteiger.law"
                      className="text-white/70 text-sm hover:text-gold transition-colors"
                    >
                      berlin@vonsteiger.law
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-gold shrink-0" />
                    <span className="text-white/70 text-sm">
                      Mon–Fri: 08:00–18:00 CET
                    </span>
                  </li>
                </ul>
              </div>

              <div className="glass-card p-6">
                <h3 className="font-heading text-lg font-semibold mb-4 text-gold">
                  General Inquiries
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-gold shrink-0" />
                    <a
                      href="mailto:contact@vonsteiger.law"
                      className="text-white/70 text-sm hover:text-gold transition-colors"
                    >
                      contact@vonsteiger.law
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-gold shrink-0" />
                    <a
                      href="tel:+4940123456789"
                      className="text-white/70 text-sm hover:text-gold transition-colors"
                    >
                      +49 (40) 123 456 789
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="bg-charcoal">
        <div className="w-full h-[400px] relative">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2369.8!2d9.99!3d53.555!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTPCsDMzJzE4LjAiTiA5wrA1OSczNC4wIkU!5e0!3m2!1sen!2sde!4v1"
            width="100%"
            height="100%"
            style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) saturate(0.3)" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Von Steiger & Associates — Hamburg Office"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent pointer-events-none" />
        </div>
      </AnimatedSection>
    </>
  );
}
