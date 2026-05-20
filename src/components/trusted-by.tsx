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
import { OrbitingCircles, OrbitHub } from "@/components/orbiting-circles";
import { BlurFade } from "@/components/blur-fade";

/**
 * TrustedBy — Integration capability showcase.
 * Uses OrbitingCircles to show tools orbiting a central Adamant hub.
 * Much more visually engaging than a static logo row.
 */
const innerOrbit = [
  { name: "LINE", Logo: LineLogo },
  { name: "Lark", Logo: LarkLogo },
  { name: "WhatsApp", Logo: WhatsAppLogo },
  { name: "Slack", Logo: SlackLogo },
];

const outerOrbit = [
  { name: "Google", Logo: GoogleWorkspaceLogo },
  { name: "Notion", Logo: NotionLogo },
  { name: "Shopify", Logo: ShopifyLogo },
  { name: "Stripe", Logo: StripeLogo },
];

export function TrustedBy() {
  return (
    <div className="space-strip bg-background border-y border-border/30 overflow-hidden">
      <div className="container">
        <BlurFade>
          <p className="text-micro text-stone text-center mb-8">
            Integrates with the tools you already use
          </p>
        </BlurFade>

        <BlurFade delay={0.15} className="flex justify-center">
          <div className="relative flex items-center justify-center" style={{ height: 420 }}>
            {/* Outer orbit — larger, slower, reverse */}
            <div className="absolute">
              <OrbitingCircles
                radius={180}
                duration={35}
                reverse
                path
                className="opacity-70"
              >
                {outerOrbit.map(({ name, Logo }) => (
                  <div
                    key={name}
                    className="flex items-center justify-center w-11 h-11 rounded-xl bg-surface border border-border shadow-sm text-stone hover:text-foreground transition-colors"
                    title={name}
                  >
                    <Logo />
                  </div>
                ))}
              </OrbitingCircles>
            </div>

            {/* Inner orbit — smaller, faster */}
            <div className="absolute">
              <OrbitingCircles
                radius={110}
                duration={22}
                path
                className="opacity-90"
              >
                {innerOrbit.map(({ name, Logo }) => (
                  <div
                    key={name}
                    className="flex items-center justify-center w-10 h-10 rounded-lg bg-surface border border-border shadow-sm text-stone hover:text-foreground transition-colors"
                    title={name}
                  >
                    <Logo />
                  </div>
                ))}
              </OrbitingCircles>
            </div>

            {/* Center hub */}
            <OrbitHub className="w-16 h-16 text-lg font-medium">
              A
            </OrbitHub>
          </div>
        </BlurFade>
      </div>
    </div>
  );
}
