"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Menu, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/practice-areas", label: "Practice Areas" },
  { href: "/results", label: "Results" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-navy/95 backdrop-blur-md border-b border-white/10 shadow-2xl"
          : "bg-transparent"
      }`}
    >
      <div className="container-custom">
        <nav className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center group">
            <Image
              src="/logo.svg"
              alt="Von Steiger & Associates"
              width={200}
              height={50}
              className="h-10 w-auto"
              priority
            />
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium tracking-wide transition-colors hover:text-gold ${
                  pathname === link.href ? "text-gold" : "text-white/80"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <Link href="/contact">
              <Button className="bg-gold hover:bg-gold-dark text-navy font-semibold px-6 rounded-sm">
                <Phone className="w-4 h-4 mr-2" />
                Free Consultation
              </Button>
            </Link>
          </div>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className="lg:hidden inline-flex items-center justify-center rounded-md text-white hover:bg-white/10 h-10 w-10 transition-colors"
            >
              <Menu className="w-6 h-6" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-navy border-l border-white/10 w-80"
            >
              <SheetTitle className="mb-8 mt-4">
                <Image
                  src="/logo.svg"
                  alt="Von Steiger & Associates"
                  width={180}
                  height={45}
                  className="h-9 w-auto"
                />
              </SheetTitle>
              <nav className="flex flex-col gap-4">
                <AnimatePresence>
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className={`block text-lg font-medium py-2 px-4 rounded transition-colors ${
                          pathname === link.href
                            ? "text-gold bg-white/5"
                            : "text-white/80 hover:text-gold hover:bg-white/5"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </AnimatePresence>
                <div className="mt-6 px-4">
                  <Link href="/contact" onClick={() => setOpen(false)}>
                    <Button className="w-full bg-gold hover:bg-gold-dark text-navy font-semibold rounded-sm">
                      <Phone className="w-4 h-4 mr-2" />
                      Free Consultation
                    </Button>
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </motion.header>
  );
}
