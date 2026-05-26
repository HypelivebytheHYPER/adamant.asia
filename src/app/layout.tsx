import type { Metadata, Viewport } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SmoothScroll } from "@/components/animations/smooth-scroll";
import { TOKENS } from "@/lib/tokens";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
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
  metadataBase: new URL("https://adamantasia.vercel.app"),
  title: {
    default: "Adamant — Systems for Teams That Move Fast",
    template: "%s | Adamant",
  },
  description:
    "We build systems that keep your business moving. Custom workflows, dashboards, and automations for teams that need to move fast. Built in 2 weeks.",
  keywords: [
    "workflow automation",
    "small business automation",
    "CRM setup",
    "LarkSuite",
    "LINE integration",
    "business workflow",
    "process automation",
    "internal tools",
    "dashboard",
  ],
  authors: [{ name: "Adamant" }],
  creator: "Adamant",
  publisher: "Adamant",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Adamant — Systems for Teams That Move Fast",
    description:
      "We build systems that keep your business moving. Built in 2 weeks.",
    type: "website",
    locale: "en_SG",
    url: "https://adamantasia.vercel.app",
    siteName: "Adamant",
  },
  twitter: {
    card: "summary_large_image",
    title: "Adamant — Systems for Teams That Move Fast",
    description:
      "We build systems that keep your business moving. Built in 2 weeks.",
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
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable} antialiased`}
    >
      <body className="min-h-screen bg-background text-foreground">
        <a href="#main" className="skip-link">Skip to content</a>
        <SmoothScroll>{children}</SmoothScroll>
        <SpeedInsights />
      </body>
    </html>
  );
}
