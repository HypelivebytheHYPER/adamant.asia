import type { Metadata, Viewport } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SmoothScroll } from "@/components/animations/smooth-scroll";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { VoiceAgentProvider } from "@/components/voice-agent-provider";
import { VoiceAgentController } from "@/components/voice-agent-controller";
import { FloatingVoiceWidget } from "@/components/floating-voice-widget";
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
    default: `${SITE_NAME} \u2014 AI Agency for SaaS Mini Build & Marketing Systems`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Custom SaaS tools and marketing systems built in two weeks. AI-powered workflows, campaign dashboards, and automation that your team actually uses.",
  keywords: [
    "SaaS mini build",
    "custom SaaS tools",
    "marketing systems",
    "AI workflow automation",
    "campaign dashboard",
    "business operations",
    "workflow design",
    "process automation",
    "internal tools",
    "CRM setup",
    "campaign tracking",
    "team productivity",
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
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${SITE_NAME} \u2014 AI Agency for SaaS Mini Build & Marketing Systems`,
    description:
      "Custom SaaS tools and marketing systems built in two weeks. Working code, not prototypes.",
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} \u2014 AI Agency for SaaS Mini Build & Marketing Systems`,
    description:
      "Custom SaaS tools and marketing systems built in two weeks. Working code, not prototypes.",
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
      <body className="bg-background text-foreground">
        <a href="#main" className="skip-link">Skip to content</a>
        <Navigation links={sc.navLinks} />
        <VoiceAgentProvider>
          <VoiceAgentController>
            <SmoothScroll>
              <div id="main" tabIndex={-1}>{children}</div>
            </SmoothScroll>
            <Footer
              content={sc.sections.footer}
              navLinks={sc.footerNavLinks}
              year={new Date().getFullYear()}
            />
            <FloatingVoiceWidget />
          </VoiceAgentController>
        </VoiceAgentProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
