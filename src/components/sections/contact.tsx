"use client";

import { ScrollReveal } from "@/components/scroll-reveal";
import { BlurFade } from "@/components/blur-fade";
import { CornerPlus } from "@/components/ui/corner-plus";
import { ContactForm } from "@/components/contact-form";
import { ScrollParallax } from "@/components/scroll-parallax";
import { DottedMap } from "@/components/dotted-map";
import { Terminal, TypingAnimation, AnimatedSpan } from "@/components/terminal";
import { Mail, MapPin, Calendar, ArrowRight } from "lucide-react";

const markers = [
  { lat: 15.87, lng: 100.9925, size: 2.5, pulse: true },
  { lat: 1.3521, lng: 103.8198, size: 2.5, pulse: true },
];

function BookingTerminal() {
  return (
    <Terminal title="adamant-booking" className="mb-6">
      <div className="space-y-2">
        <TypingAnimation delay={300} duration={35}>
          $ adamant book --discovery
        </TypingAnimation>
        <AnimatedSpan delay={1000} className="text-primary/80">
          <Calendar size={12} className="inline mr-1.5" />
          Checking availability...
        </AnimatedSpan>
        <AnimatedSpan delay={1600} className="text-green-400/80">
          ✓ Next available: This Thursday, 2pm ICT
        </AnimatedSpan>
        <AnimatedSpan delay={2100} className="text-inverse-muted">
          — 45-minute workflow audit
        </AnimatedSpan>
        <AnimatedSpan delay={2400} className="text-inverse-muted">
          — Live problem mapping
        </AnimatedSpan>
        <AnimatedSpan delay={2700} className="text-inverse-muted">
          — Fixed-price proposal within 48h
        </AnimatedSpan>
        <TypingAnimation delay={3400} duration={30}>
          $ _
        </TypingAnimation>
      </div>
    </Terminal>
  );
}

export function Contact() {
  return (
    <section id="contact" className="section-pad bg-foreground relative overflow-hidden">
      <ScrollParallax offset={40} className="absolute inset-0 opacity-25" aria-hidden="true">
        <DottedMap markers={markers} className="w-full h-full" dotColor="var(--inverse-muted)" markerColor="var(--primary)" dotRadius={0.35} mapSamples={12000} pulse={true} />
      </ScrollParallax>

      <div className="absolute inset-0 opacity-2" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />

      <div className="absolute top-10 left-8 hidden md:block">
        <CornerPlus position="top-left" className="text-background/15" />
      </div>
      <div className="absolute bottom-10 right-8 hidden md:block">
        <CornerPlus position="bottom-right" className="text-background/15" />
      </div>

      <div className="relative container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div>
            <BlurFade delay={0.1}>
              <h2 className="text-display text-background mb-5">Fix your <em className="italic">workflow</em>.</h2>
            </BlurFade>
            <BlurFade delay={0.18}>
              <p className="text-body text-inverse-weak max-w-sm mb-8">What&apos;s broken? We&apos;ll map the fix and give you a timeline. No pitch.</p>
            </BlurFade>

            {/* CLI-style booking terminal */}
            <BlurFade delay={0.22}>
              <BookingTerminal />
            </BlurFade>

            <BlurFade delay={0.26}>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-background/10 flex items-center justify-center"><Mail size={16} className="text-background" strokeWidth={1.5} /></div>
                  <div>
                    <p className="text-caption text-inverse-muted">Email</p>
                    <a href="mailto:hello@adamant.asia" className="text-body text-background hover:text-primary transition-colors">hello@adamant.asia</a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-background/10 flex items-center justify-center"><MapPin size={16} className="text-background" strokeWidth={1.5} /></div>
                  <div>
                    <p className="text-caption text-inverse-muted">Based in</p>
                    <p className="text-body text-background">Bangkok & Singapore</p>
                  </div>
                </div>
              </div>
            </BlurFade>
          </div>

          <ScrollReveal delay={0.2}><ContactForm /></ScrollReveal>
        </div>
      </div>
    </section>
  );
}
