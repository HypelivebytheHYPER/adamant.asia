"use client";

import {
  LineLogo,
  LarkLogo,
  WhatsAppLogo,
  GoogleWorkspaceLogo,
  SlackLogo,
  NotionLogo,
  ShopifyLogo,
  StripeLogo,
} from "@/components/platform-logos";

/**
 * TrustedBy — Integration capability strip.
 * Shows the core platforms Adamant connects with.
 * Not social proof — this is a capabilities statement.
 */
const integrations = [
  { name: "LINE", Logo: LineLogo },
  { name: "Lark", Logo: LarkLogo },
  { name: "WhatsApp", Logo: WhatsAppLogo },
  { name: "Google Workspace", Logo: GoogleWorkspaceLogo },
  { name: "Slack", Logo: SlackLogo },
  { name: "Notion", Logo: NotionLogo },
  { name: "Shopify", Logo: ShopifyLogo },
  { name: "Stripe", Logo: StripeLogo },
];

export function TrustedBy() {
  return (
    <div className="space-strip bg-background border-y border-border/30">
      <div className="container">
        <p className="text-micro text-stone text-center mb-6">
          Integrates with the tools you already use
        </p>
        <div
          className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 opacity-60"
          aria-hidden="true"
        >
          {integrations.map(({ name, Logo }) => (
            <div
              key={name}
              className="flex items-center gap-2.5 text-stone select-none"
              title={name}
            >
              <Logo className="text-stone" />
              <span className="text-caption whitespace-nowrap">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
