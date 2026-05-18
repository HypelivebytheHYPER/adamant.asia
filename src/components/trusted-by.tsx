"use client";

import { Marquee } from "@/components/marquee";
import {
  LineLogo,
  LarkLogo,
  WhatsAppLogo,
  GmailLogo,
  GoogleWorkspaceLogo,
  SlackLogo,
  NotionLogo,
  AirtableLogo,
  ZapierLogo,
  MakeLogo,
  ShopifyLogo,
  StripeLogo,
  HubSpotLogo,
  MetaLogo,
  TikTokLogo,
  InstagramLogo,
  FacebookLogo,
  GoogleSheetsLogo,
  OpenAILogo,
} from "@/components/platform-logos";

/**
 * TrustedBy — Platform integration logo strip between Hero and Problem.
 * Shows the tools and platforms Adamant connects and works with.
 * All logos are clean monochrome SVG components.
 */
const platforms = [
  { name: "LINE", Logo: LineLogo },
  { name: "Lark", Logo: LarkLogo },
  { name: "WhatsApp", Logo: WhatsAppLogo },
  { name: "Gmail", Logo: GmailLogo },
  { name: "Google Workspace", Logo: GoogleWorkspaceLogo },
  { name: "Slack", Logo: SlackLogo },
  { name: "Notion", Logo: NotionLogo },
  { name: "Airtable", Logo: AirtableLogo },
  { name: "Zapier", Logo: ZapierLogo },
  { name: "Make", Logo: MakeLogo },
  { name: "Shopify", Logo: ShopifyLogo },
  { name: "Stripe", Logo: StripeLogo },
  { name: "HubSpot", Logo: HubSpotLogo },
  { name: "Meta", Logo: MetaLogo },
  { name: "TikTok", Logo: TikTokLogo },
  { name: "Instagram", Logo: InstagramLogo },
  { name: "Facebook", Logo: FacebookLogo },
  { name: "Google Sheets", Logo: GoogleSheetsLogo },
  { name: "OpenAI", Logo: OpenAILogo },
];

export function TrustedBy() {
  return (
    <div className="py-6 md:py-8 bg-background border-y border-border/30">
      <div className="container mb-4">
        <p className="text-micro text-dim text-center">
          Connects with the tools you already use
        </p>
      </div>
      <Marquee speed={40} gap={48} className="opacity-70">
        {platforms.map(({ name, Logo }) => (
          <div
            key={name}
            className="flex items-center gap-2.5 text-stone select-none"
            title={name}
          >
            <Logo className="text-stone" />
            <span className="text-caption whitespace-nowrap">{name}</span>
          </div>
        ))}
      </Marquee>
    </div>
  );
}
