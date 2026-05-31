"use client";

import { Marquee } from "@/components/marquee";
import { BlurFade } from "@/components/animations/blur-fade";

interface LogoItem {
  name: string;
  url: string;
}

const platforms: LogoItem[] = [
  { name: "Google",    url: "https://cdn.magicui.design/companies/Google.svg" },
  { name: "Meta",      url: "https://cdn.magicui.design/companies/Meta.svg" },
  { name: "Shopify",   url: "https://cdn.magicui.design/companies/Shopify.svg" },
  { name: "Stripe",    url: "https://cdn.magicui.design/companies/Stripe.svg" },
  { name: "Slack",     url: "https://cdn.magicui.design/companies/Slack.svg" },
  { name: "Notion",    url: "https://cdn.magicui.design/companies/Notion.svg" },
  { name: "Asana",     url: "https://cdn.magicui.design/companies/Asana.svg" },
  { name: "Microsoft", url: "https://cdn.magicui.design/companies/Microsoft.svg" },
  { name: "Zapier",    url: "https://cdn.magicui.design/companies/Zapier.svg" },
  { name: "Airtable",  url: "https://cdn.magicui.design/companies/Airtable.svg" },
  { name: "HubSpot",   url: "https://cdn.magicui.design/companies/Hubspot.svg" },
  { name: "Mailchimp", url: "https://cdn.magicui.design/companies/Mailchimp.svg" },
  { name: "Hotjar",    url: "https://cdn.magicui.design/companies/Hotjar.svg" },
  { name: "Grammarly", url: "https://cdn.magicui.design/companies/Grammarly.svg" },
  { name: "Calendly",  url: "https://cdn.magicui.design/companies/Calendly.svg" },
  { name: "Intercom",  url: "https://cdn.magicui.design/companies/Intercom.svg" },
  { name: "GitHub",    url: "https://cdn.magicui.design/companies/GitHub.svg" },
  { name: "Docker",    url: "https://cdn.magicui.design/companies/Docker.svg" },
  { name: "Figma",     url: "https://cdn.magicui.design/companies/Figma.svg" },
  { name: "Canva",     url: "https://cdn.magicui.design/companies/Canva.svg" },
  { name: "Adobe",     url: "https://cdn.magicui.design/companies/Adobe.svg" },
  { name: "Freshworks", url: "https://cdn.magicui.design/companies/Freshworks.svg" },
  { name: "Postman",   url: "https://cdn.magicui.design/companies/Postman.svg" },
];

export function TrustedPlatforms() {
  return (
    <section id="platforms" className="relative border-y border-border/50 bg-background overflow-hidden">
      <div className="container py-14 md:py-20">
        <BlurFade>
          <h2 className="text-center text-display text-foreground font-serif mb-10 md:mb-14">
            Connects with the platforms you already use.
          </h2>
        </BlurFade>

        <div className="relative">
          <Marquee speed={55} gap={12} pauseOnHover>
            {platforms.map((item) => (
              <div
                key={item.name}
                className="group flex shrink-0 items-center justify-center rounded-lg border border-border/40 bg-foreground/[0.02] px-5 py-3 transition-all duration-300 hover:border-border hover:bg-foreground/[0.04]"
                title={item.name}
              >
                <img
                  src={item.url}
                  alt={item.name}
                  className="h-6 w-auto object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-background to-transparent md:w-20" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-background to-transparent md:w-20" />
        </div>

        <BlurFade delay={0.15}>
          <p className="text-center text-caption text-stone mt-10 max-w-md mx-auto leading-relaxed">
            We manage the APIs so you do not have to think about them.
          </p>
        </BlurFade>
      </div>
    </section>
  );
}
