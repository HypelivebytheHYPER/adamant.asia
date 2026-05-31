"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BlurFade } from "@/components/animations/blur-fade";
import { Plus, Minus } from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

interface FAQProps {
  items: FAQItem[];
}

export function FAQ({ items }: FAQProps) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="section-pad bg-background scroll-mt-16 cv-section">
      <div className="container">
        <BlurFade>
          <div className="max-w-2xl mx-auto text-center mb-10">
            <h2 className="text-display text-foreground mb-3">
              What you are actually buying.
            </h2>
            <p className="text-body text-stone">
              No surprises. No hidden fees. Just straight answers.
            </p>
          </div>
        </BlurFade>

        <div className="max-w-2xl mx-auto">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <BlurFade key={i} delay={i * 0.05}>
                <div className="border-b border-border last:border-0">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-start justify-between gap-4 py-5 text-left group"
                    aria-expanded={isOpen}
                  >
                    <span className="text-body text-foreground font-medium group-hover:text-primary transition-colors">
                      {item.q}
                    </span>
                    <span className="flex-shrink-0 mt-0.5 w-5 h-5 flex items-center justify-center rounded-full border border-border text-stone group-hover:border-primary group-hover:text-primary transition-colors">
                      {isOpen ? (
                        <Minus size={12} strokeWidth={2} />
                      ) : (
                        <Plus size={12} strokeWidth={2} />
                      )}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="text-body text-stone pb-5 leading-relaxed">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </BlurFade>
            );
          })}
        </div>
      </div>
    </section>
  );
}
