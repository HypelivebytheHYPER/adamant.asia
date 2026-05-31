"use client";

import { BlurFade } from "@/components/animations/blur-fade";
import { TextReveal } from "@/registry/magicui/text-reveal";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Eye } from "lucide-react";

const MotionLink = motion(Link);
import type { ServicePageContent, TestimonialContent } from "@/data/content";

interface ServicePageProps {
  service: ServicePageContent;
  allTestimonials: TestimonialContent[];
}

export function ServicePage({ service, allTestimonials }: ServicePageProps) {
  const testimonials = service.testimonialIds.map((id) => allTestimonials[id]).filter(Boolean);

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="relative pt-28 pb-16 md:pt-32 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero pointer-events-none" />
        <div className="container relative z-10">
          <div className="max-w-2xl">
            <BlurFade>
              <span className="text-caption text-stone uppercase tracking-wider font-medium">
                Solutions
              </span>
            </BlurFade>
            <BlurFade delay={0.05}>
              <h1 className="text-hero text-foreground font-serif mt-3">
                {service.headline}
              </h1>
            </BlurFade>
            <BlurFade delay={0.1}>
              <p className="text-headline text-foreground/90 font-serif mt-4 leading-snug">
                {service.hook}
              </p>
            </BlurFade>
            <BlurFade delay={0.15}>
              <p className="text-lead text-stone mt-5 max-w-lg leading-relaxed">
                {service.body}
              </p>
            </BlurFade>
            <BlurFade delay={0.2}>
              <MotionLink
                href="/#contact"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary mt-7 inline-flex items-center gap-2"
              >
                Book a free scope call
                <ArrowRight size={14} strokeWidth={2} />
              </MotionLink>
            </BlurFade>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="section-pad bg-surface/30">
        <div className="container">
          <BlurFade>
            <h2 className="text-display text-foreground mb-8">
              What we build.
            </h2>
          </BlurFade>
          <div className="grid md:grid-cols-3 gap-6">
            {service.useCases.map((uc, i) => (
              <BlurFade key={i} delay={i * 0.08}>
                <div className="rounded-xl border border-border bg-background p-6 h-full">
                  <span className="text-xs text-stone font-medium uppercase tracking-wider">
                    0{i + 1}
                  </span>
                  <h3 className="text-body text-foreground font-medium mt-3 mb-2">
                    {uc.title}
                  </h3>
                  <p className="text-caption text-stone leading-relaxed">
                    {uc.description}
                  </p>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="section-pad bg-background scroll-mt-16">
        <div className="container">
          <BlurFade>
            <h2 className="text-display text-foreground mb-8">
              How it works.
            </h2>
          </BlurFade>
          <div className="max-w-2xl space-y-0">
            {service.process.map((p, i) => (
              <BlurFade key={i} delay={i * 0.08}>
                <div className="flex gap-5 pb-8 last:pb-0">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center">
                      <span className="text-xs text-primary font-medium">{p.num}</span>
                    </div>
                  </div>
                  <div className="pt-1.5">
                    <p className="text-body text-foreground font-medium mb-1">
                      {p.title}
                    </p>
                    <p className="text-caption text-stone leading-snug">
                      {p.detail}
                    </p>
                  </div>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="section-pad bg-surface/30">
          <div className="container">
            <BlurFade>
              <h2 className="text-display text-foreground mb-8">
                What changed.
              </h2>
            </BlurFade>
            <div className="grid md:grid-cols-2 gap-6">
              {testimonials.map((t, i) => (
                <BlurFade key={i} delay={i * 0.08}>
                  <div className="rounded-xl border border-border bg-background p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground text-inverse text-xs font-medium">
                        {t.name[0]}
                      </div>
                      <div>
                        <p className="text-caption text-foreground font-medium leading-tight">
                          {t.name}
                        </p>
                        <p className="text-[10px] text-stone leading-tight">{t.industry}</p>
                      </div>
                    </div>
                    <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-foreground/[0.03] border border-border/50 px-2.5 py-1">
                      <span className="text-[10px] text-stone line-through decoration-accent/40">
                        {t.before}
                      </span>
                      <span className="text-[10px] text-primary">→</span>
                      <span className="text-[10px] text-foreground font-medium">{t.after}</span>
                    </div>
                    <p className="text-body text-foreground/80 leading-relaxed italic">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="section-pad bg-background">
        <div className="container">
          <BlurFade>
            <h2 className="text-display text-foreground mb-8">
              Straight answers.
            </h2>
          </BlurFade>
          <div className="max-w-2xl">
            {service.faq.map((item, i) => (
              <BlurFade key={i} delay={i * 0.05}>
                <div className="border-b border-border last:border-0 py-5">
                  <p className="text-body text-foreground font-medium mb-2">
                    {item.q}
                  </p>
                  <p className="text-caption text-stone leading-relaxed">
                    {item.a}
                  </p>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing — with TextReveal */}
      <section className="section-pad bg-surface/30">
        <div className="container">
          <div className="max-w-3xl">
            <BlurFade>
              <span className="text-caption text-stone uppercase tracking-wider font-medium block mb-6">
                Pricing
              </span>
            </BlurFade>

            <TextReveal
              as="h2"
              className="text-display text-foreground font-serif leading-tight"
              speed={0.05}
            >
              Adamant builds AI workflows, marketing systems, and SaaS tools with transparent pricing.
            </TextReveal>

            <BlurFade delay={0.2}>
              <p className="text-lead text-stone mt-6 leading-relaxed max-w-xl">
                View our indicative fees. Every project starts with a fixed-price proposal.
                No hourly surprises. No scope creep. What we quote is what you pay.
              </p>
            </BlurFade>

            <BlurFade delay={0.35}>
              <MotionLink
                href="/pricing"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary mt-8 inline-flex items-center gap-2"
              >
                <Eye size={14} strokeWidth={2} />
                View our indicative fees
              </MotionLink>
            </BlurFade>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="section-pad bg-foreground">
        <div className="container">
          <div className="max-w-xl">
            <BlurFade>
              <h2 className="text-display text-background mb-4">
                Book your free scope call.
              </h2>
            </BlurFade>
            <BlurFade delay={0.1}>
              <p className="text-body text-inverse-weak mb-8">
                45 minutes. We map your workflow and show you what is possible. No pitch. No pressure.
              </p>
            </BlurFade>
            <BlurFade delay={0.15}>
              <motion.a
                href="mailto:sam@adamant.asia"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 rounded-full bg-background px-5 py-2.5 text-ui text-foreground font-medium transition-all hover:bg-background/90"
              >
                Get in touch
                <ArrowRight size={13} strokeWidth={2} />
              </motion.a>
            </BlurFade>
          </div>
        </div>
      </section>
    </main>
  );
}
