import type { Metadata, Viewport } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SmoothScroll } from "@/components/animations/smooth-scroll";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { VoiceAgentProvider } from "@/components/voice-agent-provider";
import { VoiceAgentController } from "@/components/voice-agent-controller";
import { DeferredVoiceWidget } from "@/components/deferred-voice-widget";
import { GoogleAnalytics } from "@/components/google-analytics";
import { HreflangTags } from "@/components/hreflang-tags";
import { TOKENS } from "@/lib/tokens";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import { siteContent } from "@/data/content";
import { SITE_URL, SITE_NAME } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} \u2014 Verification Intelligence & AI Solutions`,
    template: `%s`,
  },
  description:
    "Adamant is a Singapore advisory house: Adamant Verify (KYC/KYB, AML screening, due diligence) and Adamant AI (custom SaaS, marketing systems, automation).",
  keywords: [
    "KYC verification Singapore",
    "KYB verification",
    "AML screening",
    "sanctions screening",
    "due diligence Southeast Asia",
    "counterparty verification",
    "adverse media screening",
    "ongoing monitoring compliance",
    /* ── Pillar 1: SaaS Mini Build ── */
    "SaaS mini build",
    "custom SaaS development",
    "build SaaS in 2 weeks",
    "rapid SaaS prototyping",
    "internal tool development",
    "custom dashboard builder",
    "workflow tool development",
    "SaaS product agency",
    /* ── Pillar 2: Marketing System Solution ── */
    "marketing automation system",
    "campaign management platform",
    "influencer marketing tools",
    "KOL leaderboard platform",
    "campaign tracking system",
    "performance marketing dashboard",
    "content pipeline automation",
    "marketing operations system",
    /* ── Pillar 3: AI Agency ── */
    "AI agency",
    "AI agency Singapore",
    "AI workflow automation",
    "AI business solutions",
    "enterprise AI implementation",
    "AI process automation",
    "AI integration services",
    /* ── Cross-pillar / Long-tail ── */
    "AI-powered SaaS",
    "AI marketing system",
    "fixed price SaaS development",
    "no-code low-code agency",
  ],
  authors: [{ name: "Adamant" }],
  creator: "Adamant",
  publisher: "Adamant",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "YYewbbczakgTRNwsuHktshHKKZPyLQDTaVI90rTukpE",
  },
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": `${SITE_URL}/rss.xml`,
    },
  },
  openGraph: {
    title: `${SITE_NAME} \u2014 Verification Intelligence & AI Solutions`,
    description:
      "Two practices, one advisory house: Adamant Verify (KYC/KYB, AML, due diligence) and Adamant AI (custom SaaS & automation). Singapore \u00b7 Southeast Asia.",
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [`${SITE_URL}/opengraph-image`],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} \u2014 Verification Intelligence & AI Solutions`,
    description:
      "Two practices, one advisory house: Adamant Verify (KYC/KYB, AML, due diligence) and Adamant AI (custom SaaS & automation). Singapore \u00b7 Southeast Asia.",
    images: [`${SITE_URL}/opengraph-image`],
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  manifest: "/manifest.json",
  category: "business",
  classification: "Business Services",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: TOKENS.color.background,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sc = siteContent;
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable} antialiased`}
    >
      <head>
        <HreflangTags />
      </head>
      <body className="bg-background text-foreground">
        <GoogleAnalytics />
        {/* GTM noscript fallback */}
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
              title="GTM"
            />
          </noscript>
        )}
        <a href="#main" className="skip-link">Skip to content</a>
        <Navigation links={sc.navLinks} />
        <VoiceAgentProvider>
          <VoiceAgentController>
            <SmoothScroll>
              <div id="main" tabIndex={-1}>{children}</div>
            </SmoothScroll>
            <Footer
              content={sc.sections.footer}
              navLinks={sc.navLinks}
              year={new Date().getFullYear()}
            />
            <DeferredVoiceWidget />
          </VoiceAgentController>
        </VoiceAgentProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
