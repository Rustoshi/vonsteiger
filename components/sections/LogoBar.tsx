"use client";

import AnimatedSection from "./AnimatedSection";

const logos = [
  "CHANEL",
  "LVMH",
  "Deutsche Bank",
  "Siemens",
  "Porsche",
  "Hermès",
  "Allianz",
  "SAP",
];

export default function LogoBar() {
  return (
    <AnimatedSection className="py-12 bg-navy-light border-y border-white/5">
      <div className="container-custom mb-6">
        <p className="text-center text-white/40 text-xs tracking-[0.25em] uppercase font-semibold">
          Trusted by industry leaders worldwide
        </p>
      </div>
      <div className="overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...logos, ...logos].map((logo, i) => (
            <div
              key={`${logo}-${i}`}
              className="flex items-center justify-center mx-12 shrink-0"
            >
              <span className="text-white/20 font-heading text-xl sm:text-2xl font-bold tracking-wider">
                {logo}
              </span>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
