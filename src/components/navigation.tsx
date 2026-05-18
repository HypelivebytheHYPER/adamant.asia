"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { easeSpring } from "@/lib/animation";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-smooth ${
        scrolled ? "nav-solid" : "nav-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-16">
        <Link href="/" className="font-heading text-headline text-foreground">
          Adamant
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#problem"
            className="text-ui text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            Problem
          </a>
          <a
            href="#process"
            className="text-ui text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            Process
          </a>
          <a
            href="#proof"
            className="text-ui text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            Proof
          </a>
          <a href="#partner" className="btn-primary text-caption py-2 px-4">
            Start a project
          </a>
        </div>
        <button
          className="md:hidden p-2 touch-target-sm"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <div className={cn("w-5 h-0.5 bg-foreground mb-1 transition-transform duration-300", mobileOpen && "translate-y-[3px] rotate-45")} />
          <div className={cn("w-5 h-0.5 bg-foreground transition-transform duration-300", mobileOpen && "-translate-y-[3px] -rotate-45")} />
        </button>
      </div>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: easeSpring }}
            className="md:hidden bg-background border-b border-border"
          >
            <div className="container py-4 flex flex-col gap-4">
              <a
                href="#problem"
                onClick={closeMobile}
                className="text-ui text-muted-foreground hover:text-foreground touch-target"
              >
                Problem
              </a>
              <a
                href="#process"
                onClick={closeMobile}
                className="text-ui text-muted-foreground hover:text-foreground touch-target"
              >
                Process
              </a>
              <a
                href="#proof"
                onClick={closeMobile}
                className="text-ui text-muted-foreground hover:text-foreground touch-target"
              >
                Proof
              </a>
              <a
                href="#partner"
                onClick={closeMobile}
                className="text-ui text-primary touch-target"
              >
                Start a project
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
