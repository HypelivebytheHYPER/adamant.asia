"use client";

import { BlurFade } from "@/components/animations/blur-fade";
import { ContactForm } from "@/components/contact-form";
import { WhatsAppIcon } from "@/components/chat-icons";
import { Mail } from "lucide-react";
import { trackEmailClick } from "@/lib/analytics";
import { WHATSAPP_CHAT_URL, TELEGRAM_CHAT_URL } from "@/lib/site";
import type { SectionContent, ContactInfoContent } from "@/data/content";

interface ContactProps {
  content: SectionContent;
  contactInfo: ContactInfoContent;
}

export function Contact({ content, contactInfo }: ContactProps) {
  return (
    <section id="contact" className="section-pad bg-foreground relative overflow-hidden scroll-mt-16">
      <div className="relative container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Copy + contact methods */}
          <div>
            <BlurFade delay={0.1}>
              <h2 className="text-display text-background mb-5">{content.headline}</h2>
            </BlurFade>
            <BlurFade delay={0.18}>
              <p className="text-body text-inverse-weak max-w-md mb-8">{content.subheadline}</p>
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
                      onClick={() => trackEmailClick("contact_section")}
                      className="text-body text-background hover:text-primary transition-colors"
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-background/10 flex items-center justify-center">
                    <WhatsAppIcon className="w-[18px] h-[18px] text-background" />
                  </div>
                  <div>
                    <p className="text-caption text-inverse-muted">Chat</p>
                    <div className="flex items-center gap-3">
                      <a
                        href={WHATSAPP_CHAT_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-body text-background hover:text-primary transition-colors"
                        aria-label="WhatsApp"
                      >
                        WhatsApp
                      </a>
                      <span className="text-inverse-muted">·</span>
                      <a
                        href={TELEGRAM_CHAT_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-body text-background hover:text-primary transition-colors"
                        aria-label="Telegram"
                      >
                        Telegram
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </BlurFade>
          </div>

          {/* Right: Shared ContactForm */}
          <BlurFade delay={0.34}>
            <div className="rounded-xl border border-background/15 bg-background/[0.07] p-6 lg:p-8">
              <ContactForm variant="dark" />
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
