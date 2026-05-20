"use client";

import { ScrollReveal } from "@/components/scroll-reveal";
import { BlurFade } from "@/components/blur-fade";
import { FlickeringGrid } from "@/components/flickering-grid";
import { Text3DFlip } from "@/components/text-3d-flip";

const transformations = [
  {
    who: "Thida",
    industry: "Manufacturing",
    location: "Bangkok",
    before: "Answering 20 questions a day.",
    after: "Team finds answers without asking.",
    quote: "I stopped answering questions and started building again.",
  },
  {
    who: "Min",
    industry: "Retail",
    location: "Chiang Mai",
    before: "Three months. No working system.",
    after: "Dashboard live in three days.",
    quote: "We had a working prototype in three days. Not three months.",
  },
  {
    who: "Sarin",
    industry: "Education",
    location: "Phuket",
    before: "$15,000 quote. Mostly unused.",
    after: "One handoff fixed in one week.",
    quote: "They fixed what was actually broken. Nothing more.",
  },
  {
    who: "Ploy",
    industry: "F&B",
    location: "Bangkok",
    before: "Orders in three notebooks.",
    after: "One LINE + Lark workflow.",
    quote: "No more lost orders.",
  },
];

const stats = [
  { value: "2 weeks", label: "average to first system" },
  { value: "47", label: "teams unblocked" },
  { value: "4", label: "countries" },
  { value: "30 days", label: "support after handover" },
];

export function Proof() {
  return (
    <section id="proof" className="section-pad bg-background relative overflow-hidden">
      <div className="container relative">
        <div className="max-w-2xl space-block-sm">
          <BlurFade delay={0.08}>
            <h2 className="text-display text-foreground mb-4">
              Built for how <em className="italic">you</em> work.
            </h2>
          </BlurFade>
          <BlurFade delay={0.14}>
            <p className="text-body text-stone max-w-md">
              Nothing added that you do not need.
            </p>
          </BlurFade>
        </div>

        <ScrollReveal className="space-block">
          <div className="grid md:grid-cols-2 gap-3">
            {transformations.map((t) => (
              <div
                key={t.who}
                className="group relative rounded-xl bg-surface border border-border overflow-hidden transition-all duration-500 hover:border-primary/20"
              >
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-primary/30 via-accent/20 to-transparent" />
                <div className="p-5 md:p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-foreground text-inverse text-micro font-medium">
                      {t.who[0]}
                    </span>
                    <div>
                      <p className="text-caption text-foreground font-medium">{t.who}</p>
                      <p className="text-micro text-stone">{t.industry}, {t.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-caption text-stone flex-1">{t.before}</span>
                    <span className="text-caption text-primary flex-shrink-0">→</span>
                    <span className="text-caption text-foreground flex-1">{t.after}</span>
                  </div>

                  <blockquote className="border-l-2 border-primary/30 pl-3">
                    <p className="text-body italic text-foreground/90">&ldquo;{t.quote}&rdquo;</p>
                  </blockquote>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal className="space-block relative">
          <div className="absolute -inset-4 -z-10 opacity-40 pointer-events-none overflow-hidden rounded-2xl">
            <FlickeringGrid
              squareSize={3}
              gridGap={4}
              color="var(--primary)"
              maxOpacity={0.1}
              flickerChance={0.12}
            />
          </div>
          <div className="rounded-xl bg-surface border border-border p-5 md:p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((s) => (
                <div key={s.value}>
                  <p className="text-headline text-primary mb-0.5">{s.value}</p>
                  <p className="text-caption text-stone">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="grid md:grid-cols-3 gap-3">
            {transformations.slice(0, 3).map((t) => (
              <div key={t.who} className="rounded-xl bg-surface border border-border p-5">
                <Text3DFlip
                  as="p"
                  className="text-body text-foreground italic mb-2 cursor-pointer"
                  textClassName="text-foreground"
                  flipTextClassName="text-primary"
                  rotateDirection="right"
                  staggerFrom="center"
                >
                  {t.quote}
                </Text3DFlip>
                <p className="text-caption text-stone">
                  {t.who}, {t.industry.toLowerCase()}, {t.location}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
