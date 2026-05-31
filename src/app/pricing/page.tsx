import type { Metadata } from "next";
import { getPricingItems, getPricingCategories } from "@/lib/pricing";
import { PricingClient } from "@/components/pricing-client";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pricing \u2014 Transparent Fees for SaaS & Marketing Systems",
  description:
    "View Adamant's indicative fees. SaaS Mini Build, Marketing Systems, AI Workflow Automation, and Retainers \u2014 all with transparent, fixed-price proposals.",
  alternates: { canonical: "/pricing" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Pricing \u2014 Transparent Fees | Adamant",
    description:
      "SaaS Mini Build, Marketing Systems, AI Automation \u2014 fixed-price proposals with no hidden costs.",
    type: "website",
    url: `${SITE_URL}/pricing`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing \u2014 Transparent Fees | Adamant",
    description:
      "SaaS Mini Build, Marketing Systems, AI Automation \u2014 fixed-price proposals with no hidden costs.",
  },
};

export default async function PricingPage() {
  const [items, categories] = await Promise.all([
    getPricingItems(),
    getPricingCategories(),
  ]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <PricingClient items={items} categories={categories} />
    </main>
  );
}
