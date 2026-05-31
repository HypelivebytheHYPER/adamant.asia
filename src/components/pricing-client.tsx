"use client";

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import type { PricingItem } from "@/lib/pricing";
import {
  ChevronDown,
  Clock,
  Target,
  MessageSquare,
  Mail,
  Check,
  ArrowRight,
  Lock,
  Sparkles,
  Eye,
} from "lucide-react";

interface PricingClientProps {
  items: PricingItem[];
  categories: string[];
}

const CATEGORY_ORDER = ["Intro call", "Discovery", "Build", "Systems", "Retainer"];
const STORAGE_KEY = "adamant:pricing:unlock";

interface UnlockData {
  name: string;
  email: string;
  company: string;
  phone?: string;
  message?: string;
  unlockedAt: string;
}

function sortCategories(cats: string[]): string[] {
  return [...cats].sort(
    (a, b) => CATEGORY_ORDER.indexOf(a) - CATEGORY_ORDER.indexOf(b)
  );
}

function classForCategory(cat: string): string {
  const map: Record<string, string> = {
    "Intro call": "bg-emerald-50 text-emerald-700 border-emerald-200",
    Discovery: "bg-blue-50 text-blue-700 border-blue-200",
    Build: "bg-orange-50 text-orange-700 border-orange-200",
    Systems: "bg-purple-50 text-purple-700 border-purple-200",
    Retainer: "bg-stone-100 text-stone-700 border-stone-200",
  };
  return map[cat] || "bg-muted text-stone border-border";
}

function getStoredUnlock(): UnlockData | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as UnlockData) : null;
  } catch {
    return null;
  }
}

function setStoredUnlock(data: UnlockData) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

/** Inline icons for WhatsApp, Telegram, Email */
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
    </svg>
  );
}

export function PricingClient({ items, categories }: PricingClientProps) {
  const [mounted, setMounted] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const currencyLabel = "USD"; // single global currency display
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [unlocked, setUnlocked] = useState(false);
  const [unlockData, setUnlockData] = useState<UnlockData | null>(null);

  const nameRef = useRef<HTMLInputElement>(null);
  const companyRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", message: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [touched, setTouched] = useState({ name: false, company: false, email: false });
  const [shake, setShake] = useState(false);

  // Autofocus first input after mount + animation settles
  useEffect(() => {
    setMounted(true);
    const stored = getStoredUnlock();
    if (stored) {
      setUnlocked(true);
      setUnlockData(stored);
      return;
    }
    const timer = setTimeout(() => nameRef.current?.focus(), 700);
    return () => clearTimeout(timer);
  }, []);

  const sortedCategories = useMemo(() => sortCategories(categories), [categories]);
  const tabs = ["All", ...sortedCategories];

  const filtered = useMemo(() => {
    if (activeCategory === "All") return items;
    return items.filter((i) => i.category === activeCategory);
  }, [items, activeCategory]);

  const triggerShake = useCallback(() => {
    setShake(true);
    setTimeout(() => setShake(false), 400);
  }, []);

  const submitForm = async (e?: React.FormEvent | React.KeyboardEvent) => {
    e?.preventDefault();
    if (formStatus === "submitting" || formStatus === "success") return;

    // Validate
    if (!form.name.trim() || !form.email.trim()) {
      setTouched({ name: true, company: true, email: true });
      triggerShake();
      return;
    }

    setFormStatus("submitting");
    setErrorMsg("");

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
          source: "Pricing Page",
        }),
      });
      const result = await res.json();
      if (!result.ok) console.warn("[pricing] Lark recording failed:", result.error);
    } catch (err) {
      console.warn("[pricing] Lead submission error:", err);
    }

    const data: UnlockData = {
      name: form.name.trim(),
      email: form.email.trim(),
      company: form.company.trim(),
      phone: form.phone.trim(),
      message: form.message.trim(),
      unlockedAt: new Date().toISOString(),
    };
    setStoredUnlock(data);
    setUnlockData(data);
    setFormStatus("success");
    setTimeout(() => setUnlocked(true), 800);
  };

  const isFree = (item: PricingItem) => item.priceValue === 0;

  if (!mounted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {!unlocked ? (
          /* ═══════════════════════════════════════════════
              LOCKED STATE — GATE
             ═══════════════════════════════════════════════ */
          <motion.div
            key="gate"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.5 }}
          >
            {/* Hero */}
            <section className="pt-24 pb-10 md:pt-32 md:pb-14">
              <div className="container max-w-2xl mx-auto text-center">
                <motion.span
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  className="text-caption text-stone uppercase tracking-wider font-medium"
                >
                  Adamant
                </motion.span>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="text-hero text-foreground font-serif mt-4"
                >
                  View our indicative fees.
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-lead text-stone mt-5 max-w-md mx-auto leading-relaxed"
                >
                  Leave your details and we&apos;ll unlock pricing instantly. No waiting.
                  No sales calls unless you want one.
                </motion.p>
              </div>
            </section>

            {/* Unlock form */}
            <section className="pb-24">
              <div className="container max-w-md mx-auto">
                <motion.form
                  onSubmit={submitForm}
                  className={cn("space-y-5", shake && "animate-[shake_0.35s_ease-in-out]")}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  {/* Name */}
                  <div>
                    <label className="text-xs text-stone block mb-1.5">
                      Your name
                      <span className="text-red-400 ml-0.5">*</span>
                    </label>
                    <input
                      ref={nameRef}
                      required
                      autoComplete="name"
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          companyRef.current?.focus();
                        }
                      }}
                      placeholder="e.g. Samantha"
                      disabled={formStatus === "submitting"}
                      className={cn(
                        "input-tactile w-full rounded-lg border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-stone/50 focus:outline-none",
                        touched.name && !form.name.trim() && "border-red-300 ring-1 ring-red-200"
                      )}
                    />
                    {touched.name && !form.name.trim() && (
                      <p className="text-[10px] text-red-400 mt-1">Please enter your name</p>
                    )}
                  </div>

                  {/* Company */}
                  <div>
                    <label className="text-xs text-stone block mb-1.5">
                      Company / project
                    </label>
                    <input
                      ref={companyRef}
                      autoComplete="organization"
                      value={form.company}
                      onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                      onBlur={() => setTouched((t) => ({ ...t, company: true }))}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          emailRef.current?.focus();
                        }
                      }}
                      placeholder="e.g. Acme Brand TH"
                      disabled={formStatus === "submitting"}
                      className="input-tactile w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-stone/50 focus:outline-none"
                    />
                  </div>

                  {/* Preferred contact channel */}
                  <div>
                    <label className="text-xs text-stone block mb-1.5">
                      Preferred contact channel
                      <span className="text-red-400 ml-0.5">*</span>
                    </label>
                    <div
                      className={cn(
                        "input-tactile rounded-lg border bg-background px-4 py-2.5",
                        touched.email && !form.email.trim() && "border-red-300 ring-1 ring-red-200"
                      )}
                    >
                      <label className="text-[11px] text-stone/60 block mb-1">Email</label>
                      <input
                        ref={emailRef}
                        required
                        type="email"
                        autoComplete="email"
                        value={form.email}
                        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                        onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            submitForm(e);
                          }
                        }}
                        placeholder="your@email.com"
                        disabled={formStatus === "submitting"}
                        className="w-full text-sm text-foreground placeholder:text-stone/50 bg-transparent focus:outline-none"
                      />
                    </div>
                    {touched.email && !form.email.trim() && (
                      <p className="text-[10px] text-red-400 mt-1">Please enter your email</p>
                    )}
                    <p className="text-[10px] text-stone/50 mt-1">
                      We&apos;ll follow up here after you view pricing.
                    </p>
                  </div>

                  {/* WhatsApp / Phone (optional) */}
                  <div>
                    <label className="text-xs text-stone block mb-1.5">
                      WhatsApp or phone
                    </label>
                    <input
                      type="tel"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                      placeholder="Optional — so we can reach you faster"
                      disabled={formStatus === "submitting"}
                      className="input-tactile w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-stone/50 focus:outline-none"
                    />
                  </div>

                  {/* What do you need? */}
                  <div>
                    <label className="text-xs text-stone block mb-1.5">
                      What do you need?
                    </label>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      placeholder="e.g. SaaS mini build for our sales team"
                      rows={3}
                      disabled={formStatus === "submitting"}
                      className="input-tactile w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-stone/50 focus:outline-none resize-none"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={formStatus === "submitting" || formStatus === "success"}
                    className="btn-primary w-full inline-flex items-center justify-center gap-2 disabled:opacity-60 disabled:pointer-events-none select-none"
                  >
                    {formStatus === "submitting" ? (
                      <>
                        <div className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                        <span className="animate-pulse">Unlocking…</span>
                      </>
                    ) : formStatus === "success" ? (
                      <>
                        <Check size={14} />
                        Pricing unlocked
                      </>
                    ) : (
                      <>
                        Unlock pricing
                        <ArrowRight size={14} />
                      </>
                    )}
                  </button>

                  {/* Or connect directly */}
                  <div className="pt-2">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-px bg-border" />
                      <span className="text-[11px] text-stone/60">or connect directly</span>
                      <div className="flex-1 h-px bg-border" />
                    </div>
                    <div className="flex items-center justify-center gap-3 mt-4">
                      <a
                        href="https://wa.me/6589211191"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full border border-border bg-surface flex items-center justify-center text-stone hover:text-emerald-600 hover:border-emerald-200 hover:bg-emerald-50 transition-colors"
                        title="WhatsApp"
                      >
                        <WhatsAppIcon className="w-4 h-4" />
                      </a>
                      <a
                        href="https://t.me/modcho"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full border border-border bg-surface flex items-center justify-center text-stone hover:text-sky-500 hover:border-sky-200 hover:bg-sky-50 transition-colors"
                        title="Telegram"
                      >
                        <TelegramIcon className="w-4 h-4" />
                      </a>
                      <a
                        href="mailto:sam@adamant.asia"
                        className="w-10 h-10 rounded-full border border-border bg-surface flex items-center justify-center text-stone hover:text-foreground hover:border-primary/30 transition-colors"
                        title="Email"
                      >
                        <Mail size={16} />
                      </a>
                    </div>
                  </div>

                  {/* Footer trust */}
                  <p className="text-[10px] text-stone/50 text-center leading-relaxed pt-2">
                    Your details are used only to follow up on your enquiry.
                    We do not share or sell your information.
                  </p>
                </motion.form>
              </div>
            </section>
          </motion.div>
        ) : (
          /* ═══════════════════════════════════════════════
              UNLOCKED STATE — PRICING REVEAL
             ═══════════════════════════════════════════════ */
          <motion.div
            key="pricing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Welcome banner */}
            {unlockData && (
              <motion.section
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="pt-24 pb-6 md:pt-28"
              >
                <div className="container max-w-5xl mx-auto">
                  <div className="rounded-xl border border-border bg-card px-5 py-4 flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Check size={14} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-body text-foreground font-medium">
                          Welcome back{unlockData.name ? `, ${unlockData.name.split(" ")[0]}` : ""}
                        </p>
                        <p className="text-caption text-stone">
                          Pricing unlocked.
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        localStorage.removeItem(STORAGE_KEY);
                        setUnlocked(false);
                        setUnlockData(null);
                        setForm({ name: "", company: "", email: "", phone: "", message: "" });
                        setFormStatus("idle");
                      }}
                      className="text-caption text-stone hover:text-foreground underline underline-offset-2 transition-colors"
                    >
                      Lock pricing
                    </button>
                  </div>
                </div>
              </motion.section>
            )}

            {/* Hero recap */}
            <section className="pt-6 pb-10 md:pb-14">
              <div className="container max-w-3xl mx-auto text-center">
                <span className="text-caption text-stone uppercase tracking-wider font-medium">
                  Adamant
                </span>
                <h1 className="text-hero text-foreground font-serif mt-4">
                  Indicative fees.
                </h1>
                <p className="text-lead text-stone mt-4 max-w-lg mx-auto leading-relaxed">
                  Fixed-price builds, transparent retainers. No hourly rates. No surprise invoices.
                </p>
              </div>
            </section>

            {/* Pricing grid */}
            <section className="pb-20">
              <div className="container max-w-5xl mx-auto">
                {/* Filters */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                  <div className="flex flex-wrap gap-2">
                    {tabs.map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveCategory(tab)}
                        className={cn(
                          "px-3.5 py-1.5 rounded-full text-caption font-medium transition-all",
                          activeCategory === tab
                            ? "bg-foreground text-background"
                            : "bg-surface text-stone hover:text-foreground border border-border"
                        )}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  <span className="text-caption text-stone font-medium">
                    {currencyLabel}
                  </span>
                </div>

                {/* Cards */}
                <div className="space-y-4">
                  <AnimatePresence mode="popLayout">
                    {filtered.map((item) => {
                      const isOpen = expandedId === item.id;
                      const price = item.price;
                      const free = isFree(item);

                      return (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.98 }}
                          transition={{ duration: 0.3 }}
                          className={cn(
                            "rounded-xl border bg-card overflow-hidden transition-shadow",
                            isOpen ? "shadow-md border-primary/20" : "border-border shadow-sm hover:shadow-md"
                          )}
                        >
                          <button
                            onClick={() => setExpandedId(isOpen ? null : item.id)}
                            className="w-full flex items-start gap-4 p-5 text-left"
                          >
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1.5">
                                <span
                                  className={cn(
                                    "px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-medium border",
                                    classForCategory(item.category)
                                  )}
                                >
                                  {item.category}
                                </span>
                                {free && (
                                  <span className="px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                                    Free
                                  </span>
                                )}
                              </div>
                              <h3 className="text-body text-foreground font-medium">
                                {item.scope}
                              </h3>
                              <p className="text-caption text-stone mt-1 line-clamp-1">
                                {item.description}
                              </p>
                              <div className="flex items-center gap-4 mt-2 text-[10px] text-stone">
                                <span className="flex items-center gap-1">
                                  <Clock size={10} />
                                  {item.timeline}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Target size={10} />
                                  {item.bestFor}
                                </span>
                              </div>
                            </div>

                            <div className="text-right flex-shrink-0">
                              <p className="text-headline text-foreground font-serif">
                                {free ? "Free" : price}
                              </p>
                              {item.priceRangeNotes && !free && (
                                <p className="text-[10px] text-stone/70 mt-0.5 whitespace-pre-line">
                                  {item.priceRangeNotes}
                                </p>
                              )}
                            </div>

                            <ChevronDown
                              size={16}
                              className={cn(
                                "text-stone mt-1 transition-transform flex-shrink-0",
                                isOpen && "rotate-180"
                              )}
                            />
                          </button>

                          <AnimatePresence>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25 }}
                                className="overflow-hidden"
                              >
                                <div className="px-5 pb-5 pt-0 border-t border-border/50">
                                  <div className="grid md:grid-cols-2 gap-6 mt-4">
                                    <div>
                                      <h4 className="text-caption text-foreground font-medium mb-2">
                                        What&apos;s included
                                      </h4>
                                      <ul className="space-y-1.5">
                                        {item.whatIncluded
                                          .split("\n")
                                          .filter(Boolean)
                                          .map((line, i) => (
                                            <li
                                              key={i}
                                              className="flex items-start gap-2 text-caption text-stone"
                                            >
                                              <span className="mt-1.5 w-1 h-1 rounded-full bg-primary flex-shrink-0" />
                                              {line}
                                            </li>
                                          ))}
                                      </ul>
                                    </div>
                                    <div className="space-y-3">
                                      <div className="flex items-start gap-2">
                                        <Clock size={14} className="text-stone mt-0.5 flex-shrink-0" />
                                        <div>
                                          <p className="text-caption text-foreground font-medium">Timeline</p>
                                          <p className="text-caption text-stone">{item.timeline}</p>
                                        </div>
                                      </div>
                                      <div className="flex items-start gap-2">
                                        <Target size={14} className="text-stone mt-0.5 flex-shrink-0" />
                                        <div>
                                          <p className="text-caption text-foreground font-medium">Best for</p>
                                          <p className="text-caption text-stone">{item.bestFor}</p>
                                        </div>
                                      </div>
                                      {!free && (
                                        <div className="flex items-start gap-2">
                                          <MessageSquare size={14} className="text-stone mt-0.5 flex-shrink-0" />
                                          <div>
                                            <p className="text-caption text-foreground font-medium">Price</p>
                                            <p className="text-caption text-stone">
                                              {price}
                                              {item.priceRangeNotes && (
                                                <span className="block text-[10px] text-stone/60 mt-0.5">
                                                  {item.priceRangeNotes}
                                                </span>
                                              )}
                                            </p>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>

                {/* Footer */}
                <div className="mt-14 space-y-6 text-center">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="rounded-xl border border-border bg-surface p-6 text-left">
                      <h3 className="text-body text-foreground font-medium mb-2">Payment terms</h3>
                      <p className="text-caption text-stone leading-relaxed">
                        50% upfront, 50% on delivery. Retainers billed monthly in advance.
                        Invoiced in your local currency as agreed.
                      </p>
                    </div>
                    <div className="rounded-xl border border-border bg-surface p-6 text-left">
                      <h3 className="text-body text-foreground font-medium mb-2">What&apos;s always included</h3>
                      <p className="text-caption text-stone leading-relaxed">
                        Source code ownership transfers on final payment. No vendor lock-in.
                        30-day support on builds, 60-day on full systems.
                      </p>
                    </div>
                  </div>
                  <div className="pt-4">
                    <p className="text-caption text-stone mb-3">Ready to talk?</p>
                    <a href="mailto:sam@adamant.asia" className="btn-primary inline-flex items-center gap-2">
                      <Mail size={14} />
                      Book your free intro call
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
