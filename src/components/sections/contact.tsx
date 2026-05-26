"use client";

import { ScrollReveal } from "@/components/scroll-reveal";
import { BlurFade } from "@/components/blur-fade";
import { ContactForm } from "@/components/contact-form";
import { Mail } from "lucide-react";
import type { SectionContent, ContactInfoContent } from "@/data/content";

interface ContactProps {
  content: SectionContent;
  contactInfo: ContactInfoContent;
}

export function Contact({ content, contactInfo }: ContactProps) {
  return (
    <section id="contact" className="section-pad bg-foreground relative overflow-hidden">
      <div className="relative container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div>
            <BlurFade delay={0.1}>
              <h2 className="text-display text-background mb-5">{content.headline}</h2>
            </BlurFade>
            <BlurFade delay={0.18}>
              <p className="text-body text-inverse-weak max-w-sm mb-8">{content.subheadline}</p>
            </BlurFade>

            <BlurFade delay={0.26}>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-background/10 flex items-center justify-center">
                    <Mail size={16} className="text-background" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-caption text-inverse-muted">Email</p>
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="text-body text-background hover:text-primary transition-colors"
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                </div>
              </div>
            </BlurFade>
          </div>

          <ScrollReveal delay={0.2}>
            <ContactForm />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
