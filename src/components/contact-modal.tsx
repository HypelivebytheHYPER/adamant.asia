"use client";

import { useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { ContactForm } from "./contact-form";
import { WhatsAppIcon, TelegramIcon } from "./chat-icons";
import { WHATSAPP_CHAT_URL, TELEGRAM_CHAT_URL } from "@/lib/site";

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
}

export function ContactModal({ open, onClose }: ContactModalProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (!open) return;
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [open, handleEscape]);

  return (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Contact form"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Card */}
          <motion.div
            ref={containerRef}
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
            className="relative w-full max-w-md rounded-2xl border border-border bg-card shadow-xl"
          >
            {/* Header */}
            <div className="flex items-start justify-between px-6 pt-6 pb-4">
              <div>
                <h3
                  className="text-foreground"
                  style={{
                    fontFamily: "var(--font-newsreader)",
                    fontSize: "1.5rem",
                    lineHeight: 1.2,
                    fontWeight: 400,
                  }}
                >
                  Start building
                </h3>
                <p className="text-xs text-stone mt-1">
                  Tell us what&apos;s broken. We&apos;ll map the fix.
                </p>
              </div>
              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background text-stone transition-colors hover:text-foreground hover:bg-muted"
                aria-label="Close contact form"
              >
                <X size={14} />
              </button>
            </div>

            {/* Form */}
            <div className="px-6 pb-4">
              <ContactForm inline onSuccess={onClose} />
            </div>

            {/* Quick contact alternatives */}
            <div className="px-6 pb-5">
              <div className="flex items-center gap-2 justify-center text-xs text-stone">
                <span>or chat on</span>
                <a
                  href={WHATSAPP_CHAT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-emerald-600 transition-colors"
                  aria-label="WhatsApp"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                </a>
                <a
                  href={TELEGRAM_CHAT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-sky-500 transition-colors"
                  aria-label="Telegram"
                >
                  <TelegramIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
