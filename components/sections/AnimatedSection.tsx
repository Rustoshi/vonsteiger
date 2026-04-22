"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { useHydrated } from "@/lib/useHydrated";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function AnimatedSection({
  children,
  className = "",
  delay = 0,
}: AnimatedSectionProps) {
  const mounted = useHydrated();

  return (
    <motion.section
      initial={mounted ? { opacity: 0, y: 40 } : false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.section>
  );
}
