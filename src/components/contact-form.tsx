"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Check, Loader2 } from "lucide-react";
import { easeSmooth } from "@/lib/animation";

interface ContactFormProps {
  /** Render without outer card styling — used inside ContactModal */
  inline?: boolean;
  /** Dark background variant — white text, translucent inputs */
  variant?: "light" | "dark";
  /** Called after successful submission */
  onSuccess?: () => void;
}

export function ContactForm({ inline, onSuccess, variant = "light" }: ContactFormProps) {
  const isDark = variant === "dark";
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const update = (key: string, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("/api/pricing-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          company: form.company.trim(),
          phone: form.phone.trim(),
          message: form.message.trim(),
          source: "Contact Section",
        }),
      });
      const result = await res.json();
      if (!result.ok) console.warn("[contact] Lark recording failed:", result.error);
    } catch (err) {
      console.warn("[contact] Submission error:", err);
    }
    setStatus("success");
    onSuccess?.();
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: easeSmooth }}
        className="text-center py-6"
      >
        <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${isDark ? "bg-primary/20" : "bg-primary/10"}`}>
          <Check size={20} className="text-primary" />
        </div>
        <h4 className={`text-body font-medium mb-1 ${isDark ? "text-background" : "text-foreground"}`}>Message sent</h4>
        <p className={`text-xs ${isDark ? "text-inverse-muted" : "text-stone"}`}>
          We will reply within 24 hours. Usually sooner.
        </p>
      </motion.div>
    );
  }

  const labelClass = isDark
    ? "text-xs text-inverse-muted block mb-1.5"
    : "text-xs text-stone block mb-1.5";

  const inputClass = isDark
    ? "w-full rounded-lg border border-background/15 bg-background/[0.07] px-4 py-2.5 text-sm text-background placeholder:text-inverse-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-colors"
    : "w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-stone/60 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors";

  const btnClass = isDark
    ? "btn-primary w-full inline-flex items-center justify-center gap-2 disabled:opacity-40 mt-2"
    : "btn-primary w-full inline-flex items-center justify-center gap-2 disabled:opacity-40 disabled:pointer-events-none mt-2";

  return (
    <form onSubmit={submit} className={inline ? "" : "space-y-5"}>
      <div className="space-y-4">
        <div>
          <label htmlFor="cf-name" className={labelClass}>
            Your name
          </label>
          <input
            id="cf-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="Thida, Min, Sarin…"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="cf-email" className={labelClass}>
            Email
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            spellCheck={false}
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="you@company.com"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="cf-company" className={labelClass}>
            Company or project name
          </label>
          <input
            id="cf-company"
            name="company"
            type="text"
            autoComplete="organization"
            value={form.company}
            onChange={(e) => update("company", e.target.value)}
            placeholder="Optional"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="cf-phone" className={labelClass}>
            WhatsApp or phone
          </label>
          <input
            id="cf-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="Optional — so we can reach you faster"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="cf-message" className={labelClass}>
            What do you need?
          </label>
          <textarea
            id="cf-message"
            name="message"
            required
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            placeholder="e.g. We track everything on WhatsApp and it's a mess."
            rows={3}
            className={`${inputClass} resize-none`}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className={btnClass}
      >
        {status === "submitting" ? (
          <>
            <Loader2 size={14} className="animate-spin" />
            Sending…
          </>
        ) : (
          <>
            <Send size={14} />
            Send message
          </>
        )}
      </button>
    </form>
  );
}
