"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Award, Users, BookOpen, Scale } from "lucide-react";
import AnimatedSection from "@/components/sections/AnimatedSection";

const milestones = [
  { year: "2003", title: "Firm Founded", desc: "Julian von Steiger establishes the firm in Hamburg, focusing on international corporate disputes." },
  { year: "2007", title: "Berlin Office Opens", desc: "Expansion to Berlin to serve clients requiring proximity to Germany's political center." },
  { year: "2010", title: "€500M Milestone", desc: "Total recovered assets surpass €500 million across 6 jurisdictions." },
  { year: "2014", title: "Chanel EU Engagement", desc: "Appointed as legal representative for Chanel's EU Division for brand protection and litigation matters." },
  { year: "2018", title: "€1.5B Recovered", desc: "Cumulative asset recovery crosses €1.5 billion with landmark wins in Switzerland and Singapore." },
  { year: "2021", title: "Record Year", desc: "Firm achieves its largest single recovery of €840M for an EU luxury conglomerate." },
  { year: "2023", title: "€2.3B Total Recovery", desc: "Total recovered assets exceed €2.3 billion across 14 jurisdictions worldwide." },
];

const awards = [
  "Chambers & Partners — Band 1, International Litigation",
  "Legal 500 — Leading Firm, Asset Recovery",
  "Best Lawyers — Lawyer of the Year, Cross-Border Disputes",
  "IFLR1000 — Highly Regarded, Corporate Law",
  "Global Arbitration Review — Top 30 Arbitration Practices",
  "Financial Times — Innovative Lawyer Award",
];

export default function AboutPageClient() {
  return (
    <>
      <section className="relative pt-32 pb-20 bg-navy">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80"
            alt="Modern office interior"
            fill
            className="object-cover opacity-20"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/60 to-navy" />
        </div>
        <div className="relative container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-gold text-sm font-semibold tracking-[0.2em] uppercase">
              About the Firm
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold mt-3 mb-6">
              Excellence in Every{" "}
              <span className="text-gold-gradient">Jurisdiction</span>
            </h1>
            <p className="text-white/60 max-w-2xl text-lg">
              For over two decades, Von Steiger & Associates has set the standard
              for international litigation and asset recovery.
            </p>
          </motion.div>
        </div>
      </section>

      <AnimatedSection className="section-padding bg-navy">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="relative aspect-[3/4] max-w-lg rounded-sm overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80"
                  alt="Julian von Steiger — Senior Partner"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
            <div>
              <h2 className="font-heading text-3xl font-bold mb-2">
                Julian von Steiger
              </h2>
              <p className="text-gold text-sm uppercase tracking-wider mb-6">
                Senior Partner / Lead Counsel
              </p>
              <div className="space-y-4 text-white/70 leading-relaxed">
                <p>
                  Julian von Steiger is one of Europe&apos;s foremost litigation
                  strategists, with over 20 years of experience in cross-border
                  corporate disputes, private asset tracing, and high-stakes
                  litigation for Fortune 500 clients and luxury conglomerates.
                </p>
                <p>
                  Born and educated in Hamburg, Julian studied law at the
                  University of Hamburg and completed his LL.M. at the London
                  School of Economics. He was admitted to the German Bar in 2002
                  and founded Von Steiger & Associates the following year.
                </p>
                <p>
                  Known for recovering over €2.3 billion in withheld assets
                  across 14 jurisdictions, Julian has built a reputation for
                  taking on cases that others consider impossible. His approach
                  combines meticulous legal analysis with bold strategic thinking.
                </p>
                <p>
                  Julian currently serves as legal representative for
                  Chanel&apos;s EU Division, overseeing litigation and recovery
                  of withheld assets. His work spans every major European
                  jurisdiction, as well as key financial centers in Asia and the
                  Middle East.
                </p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="section-padding bg-charcoal">
        <div className="container-custom">
          <div className="text-center mb-14">
            <span className="text-gold text-sm font-semibold tracking-[0.2em] uppercase">
              Our Philosophy
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold mt-3">
              Firm History & Values
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              { icon: Scale, title: "Uncompromising Integrity", desc: "Every action guided by the highest ethical standards and unwavering commitment to our clients' interests." },
              { icon: Award, title: "Relentless Excellence", desc: "We pursue the best possible outcome with the tenacity and precision that defines our firm." },
              { icon: BookOpen, title: "Deep Expertise", desc: "Decades of specialization in the most complex areas of international law and dispute resolution." },
              { icon: Users, title: "Client First", desc: "Every engagement begins and ends with one question: what is the best outcome for our client?" },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card p-6 text-center"
              >
                <div className="w-12 h-12 rounded bg-gold/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-gold" />
                </div>
                <h3 className="font-heading text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-white/60 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="section-padding bg-navy">
        <div className="container-custom">
          <div className="text-center mb-14">
            <span className="text-gold text-sm font-semibold tracking-[0.2em] uppercase">
              Our Journey
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold mt-3">
              Major Milestones
            </h2>
          </div>
          <div className="max-w-3xl mx-auto">
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-6 mb-8 last:mb-0"
              >
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center shrink-0">
                    <span className="text-gold text-xs font-bold">{m.year}</span>
                  </div>
                  {i < milestones.length - 1 && (
                    <div className="w-px h-full bg-gold/20 mt-2" />
                  )}
                </div>
                <div className="pb-8">
                  <h3 className="font-heading text-lg font-semibold">{m.title}</h3>
                  <p className="text-white/60 text-sm mt-1">{m.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="section-padding bg-charcoal">
        <div className="container-custom">
          <div className="text-center mb-14">
            <span className="text-gold text-sm font-semibold tracking-[0.2em] uppercase">
              Our Team
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold mt-3">
              Leadership
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { name: "Julian von Steiger", role: "Senior Partner / Lead Counsel", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80" },
              { name: "Dr. Katarina Vogt", role: "Partner — Asset Recovery", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80" },
              { name: "Marcus Brandt", role: "Partner — Cross-Border Litigation", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80" },
            ].map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="relative aspect-[3/4] rounded-sm overflow-hidden mb-4">
                  <Image
                    src={member.img}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent" />
                </div>
                <h3 className="font-heading text-lg font-semibold">{member.name}</h3>
                <p className="text-gold/80 text-sm">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="section-padding bg-navy-dark">
        <div className="container-custom">
          <div className="text-center mb-14">
            <span className="text-gold text-sm font-semibold tracking-[0.2em] uppercase">
              Recognition
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold mt-3">
              Awards & Rankings
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {awards.map((award, i) => (
              <motion.div
                key={award}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="glass-card p-5 flex items-center gap-3"
              >
                <Award className="w-5 h-5 text-gold shrink-0" />
                <span className="text-white/80 text-sm">{award}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </>
  );
}
