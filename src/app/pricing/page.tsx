import type { Metadata } from "next";
import { getPricingItems, getPricingCategories } from "@/lib/pricing";
import { PricingClient } from "@/components/pricing-client";
import { WebPageJsonLd } from "@/components/webpage-json-ld";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-json-ld";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pricing \u2014 Transparent Fees | Adamant",
  description:
    "Fixed-price SaaS builds, marketing systems & AI workflows. No hidden costs.",
  alternates: { canonical: "/pricing" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Pricing \u2014 Transparent Fees | Adamant",
    description:
      "Fixed-price SaaS builds, marketing systems & AI workflows.",
    type: "website",
    url: `${SITE_URL}/pricing`,
    images: [`${SITE_URL}/opengraph-image`],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing \u2014 Transparent Fees | Adamant",
    description:
      "Fixed-price SaaS builds, marketing systems & AI workflows.",
    images: [`${SITE_URL}/opengraph-image`],
  },
};

export default async function PricingPage() {
  const [items, categories] = await Promise.all([
    getPricingItems(),
    getPricingCategories(),
  ]);

  return (
    <>
      <WebPageJsonLd
        url={`${SITE_URL}/pricing`}
        title="Pricing — Transparent Fees | Adamant"
        description="Fixed-price SaaS builds, marketing systems & AI workflows. No hidden costs."
        pageType="WebPage"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${SITE_URL}/` },
          { name: "Pricing", url: `${SITE_URL}/pricing` },
        ]}
      />
      <main className="min-h-screen bg-background text-foreground">
        {/* SSR-visible H1 for SEO — PricingClient renders client-side only */}
        <h1 className="sr-only">Pricing — Transparent Fees for SaaS &amp; Marketing Systems | Adamant</h1>
        <PricingClient items={items} categories={categories} />
      </main>
    </>
  );
}
