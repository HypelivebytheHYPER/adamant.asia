import type { Metadata, Viewport } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SmoothScroll } from "@/components/smooth-scroll";
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
  metadataBase: new URL("https://adamant.asia"),
  title: "Adamant — Workflows for Small Teams in Southeast Asia",
  description:
    "We build systems that keep your business moving. Custom workflows, CRM setup, dashboards, and websites for small teams in Bangkok, Singapore, and across Southeast Asia. Built in 2 weeks.",
  keywords: [
    "workflow automation",
    "small business automation",
    "CRM setup",
    "Southeast Asia",
    "Bangkok",
    "Singapore",
    "LarkSuite",
    "LINE integration",
    "business workflow",
    "process automation",
  ],
  authors: [{ name: "Adamant" }],
  creator: "Adamant",
  publisher: "Adamant",
  robots: {
    index: true,
    follow: true,
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
    title: "Adamant — Workflows for Small Teams in Southeast Asia",
    description:
      "We build systems that keep your business moving. Built in 2 weeks. For teams in Bangkok, Singapore, and across SEA.",
    type: "website",
    locale: "en_US",
    url: "https://adamant.asia",
    siteName: "Adamant",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Adamant — Workflows for small teams in Southeast Asia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Adamant — Workflows for Small Teams in Southeast Asia",
    description:
      "We build systems that keep your business moving. Built in 2 weeks.",
    images: ["/og-image.svg"],
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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: TOKENS.color.background },
    { media: "(prefers-color-scheme: dark)", color: TOKENS.color.foreground },
  ],
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
