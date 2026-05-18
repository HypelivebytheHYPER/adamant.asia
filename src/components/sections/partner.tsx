"use client";

import { ScrollReveal } from "@/components/scroll-reveal";
import { ContactForm } from "@/components/contact-form";
import { ScrollParallax } from "@/components/scroll-parallax";
import { DottedMap } from "@/components/dotted-map";
import { Mail, MapPin } from "lucide-react";

const markers = [
  { lat: 15.87, lng: 100.9925, size: 2.5, pulse: true },
  { lat: 1.3521, lng: 103.8198, size: 2.5, pulse: true },
];

export function Partner() {
  return (
    <section id="partner" className="section-pad bg-foreground relative overflow-hidden">
      <ScrollParallax offset={40} className="absolute inset-0 opacity-25">
        <DottedMap markers={markers} className="w-full h-full" dotColor="var(--dim)" markerColor="var(--primary)" dotRadius={0.15} pulse={true} />
      </ScrollParallax>

      <div className="absolute inset-0 opacity-2" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />

      <div className="relative container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div>
            <ScrollReveal delay={0.1}>
              <h2 className="text-display text-background mb-5">Start your <em className="italic">project</em>.</h2>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <p className="text-body text-dim max-w-sm mb-8">Tell us what you are building. We will show you how to get there — and how long it takes. No pitch. No pressure.</p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-background/10 flex items-center justify-center"><Mail size={16} className="text-background" strokeWidth={1.5} /></div>
                  <div>
                    <p className="text-caption text-dim">Email</p>
                    <a href="mailto:hello@adamant.asia" className="text-body text-background hover:text-primary transition-colors">hello@adamant.asia</a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-background/10 flex items-center justify-center"><MapPin size={16} className="text-background" strokeWidth={1.5} /></div>
                  <div>
                    <p className="text-caption text-dim">Based in</p>
                    <p className="text-body text-background">Bangkok & Singapore</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.2}><ContactForm /></ScrollReveal>
        </div>
      </div>
    </section>
  );
}
