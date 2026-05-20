"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Check, Loader2 } from "lucide-react";
import { easeSmooth } from "@/lib/animation";

const services = [
  "Workflow & CRM",
  "Website & launch",
  "AI marketing",
  "Influencer tracking",
  "Dashboard",
  "LarkSuite",
  "Not sure",
];

const teamSizes = [
  "Solo",
  "2–5",
  "6–20",
  "20+",
];

export function ContactForm() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    teamSize: "",
    service: "",
    problem: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const update = (key: string, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  const submit = async () => {
    setStatus("submitting");
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));
    setStatus("success");
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: easeSmooth }}
        className="rounded-2xl bg-surface border border-border p-8 md:p-12 text-center"
      >
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <Check size={24} className="text-primary" />
        </div>
        <h3 className="text-headline text-foreground mb-3">Message sent</h3>
        <p className="text-body text-stone">
          We will read every word and reply within 24 hours. Usually sooner.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="rounded-2xl bg-surface border border-border p-6 md:p-10">
      {/* Progress */}
      <div className="flex items-center gap-2 mb-8">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`h-1 rounded-full transition-all duration-500 ${
              i <= step ? "w-8 bg-primary" : "w-4 bg-border"
            }`}
          />
        ))}
        <span className="text-micro text-stone ml-2">
          Step {step + 1} of 3
        </span>
      </div>

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="step0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: easeSmooth }}
          >
            <p className="text-micro text-accent mb-5">First, tell us about you</p>
            <div className="space-y-4">
              <div>
                <label className="text-caption text-stone block mb-2">Your name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="Thida, Min, Sarin..."
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 text-body text-foreground placeholder:text-stone focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="text-caption text-stone block mb-2">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="you@company.com"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 text-body text-foreground placeholder:text-stone focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="text-caption text-stone block mb-2">Company or project name</label>
                <input
                  type="text"
                  value={form.company}
                  onChange={(e) => update("company", e.target.value)}
                  placeholder="Optional"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 text-body text-foreground placeholder:text-stone focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>
            <button
              onClick={() => setStep(1)}
              disabled={!form.name || !form.email}
              className="btn-primary mt-6 w-full disabled:opacity-40 disabled:pointer-events-none"
            >
              Continue
            </button>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: easeSmooth }}
          >
            <p className="text-micro text-accent mb-5">What are you building?</p>
            <div className="mb-4">
              <label className="text-caption text-stone block mb-2">Team size</label>
              <div className="flex flex-wrap gap-2">
                {teamSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => update("teamSize", size)}
                    className={`rounded-lg px-3.5 py-2 text-caption transition-all duration-300 border ${
                      form.teamSize === size
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background text-stone border-border hover:border-primary/30"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-caption text-stone block mb-2">What do you need?</label>
              <div className="flex flex-wrap gap-2">
                {services.map((svc) => (
                  <button
                    key={svc}
                    onClick={() => update("service", svc)}
                    className={`rounded-lg px-3.5 py-2 text-caption transition-all duration-300 border ${
                      form.service === svc
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background text-stone border-border hover:border-primary/30"
                    }`}
                  >
                    {svc}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setStep(0)} className="btn-secondary flex-1">
                Back
              </button>
              <button
                onClick={() => setStep(2)}
                disabled={!form.service}
                className="btn-primary flex-1 disabled:opacity-40 disabled:pointer-events-none"
              >
                Continue
              </button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: easeSmooth }}
          >
            <p className="text-micro text-accent mb-5">Describe the mess</p>
            <div>
              <label className="text-caption text-stone block mb-1.5">
                Your biggest pain right now?
              </label>
              <textarea
                value={form.problem}
                onChange={(e) => update("problem", e.target.value)}
                placeholder="e.g. Everything is on WhatsApp."
                rows={3}
                className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-body text-foreground placeholder:text-stone focus:outline-none focus:border-primary transition-colors resize-none"
              />
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setStep(1)} className="btn-secondary flex-1">
                Back
              </button>
              <button
                onClick={submit}
                disabled={status === "submitting"}
                className="btn-primary flex-1 inline-flex items-center justify-center gap-2"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Send message
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
