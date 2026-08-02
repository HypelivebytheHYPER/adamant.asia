import { ScrollProgress } from "@/components/scroll-progress";

import { JsonLd } from "@/components/json-ld";
import {
  Contact,
  FAQ,
  Hero,
  HomePractices,
  Reviews,
  ShowcaseCards,
} from "@/sections";
import { TrustedPlatforms } from "@/sections/trusted-platforms";
import { siteContent } from "@/data/content";
import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-json-ld";
import { FaqJsonLd } from "@/components/faq-json-ld";
import { WebPageJsonLd } from "@/components/webpage-json-ld";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Adamant \u2014 Verification Intelligence & AI Solutions in Singapore",
  description:
    "Adamant is a Singapore advisory house: Adamant Verify (KYC/KYB, AML screening, due diligence) and Adamant AI (custom SaaS, marketing systems, automation).",
  keywords: [
    "KYC verification Singapore",
    "KYB verification",
    "AML screening",
    "due diligence Southeast Asia",
    "counterparty verification",
    "AI business solutions Singapore",
    "custom SaaS development",
    "AI workflow automation",
    "marketing system",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Adamant \u2014 Verification Intelligence & AI Solutions in Singapore",
    description:
      "Two practices, one advisory house: Adamant Verify (KYC/KYB, AML, due diligence) and Adamant AI (custom SaaS & automation). Singapore \u00b7 Southeast Asia.",
    type: "website",
    url: SITE_URL,
    images: [`${SITE_URL}/opengraph-image`],
  },
  twitter: {
    card: "summary_large_image",
    title: "Adamant \u2014 Verification Intelligence & AI Solutions in Singapore",
    description:
      "Two practices, one advisory house: Adamant Verify (KYC/KYB, AML, due diligence) and Adamant AI (custom SaaS & automation). Singapore \u00b7 Southeast Asia.",
    images: [`${SITE_URL}/opengraph-image`],
  },
};

export default function Home() {
  const sc = siteContent;
  return (
    <>
      <JsonLd />
      <WebPageJsonLd
        url={SITE_URL}
        title="Adamant — Verification Intelligence & AI Solutions in Singapore"
        description="Adamant is a Singapore advisory house: Adamant Verify (KYC/KYB, AML screening, due diligence) and Adamant AI (custom SaaS, marketing systems, automation)."
        pageType="WebPage"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${SITE_URL}/` },
        ]}
      />
      <FaqJsonLd
        items={sc.faq.map((item) => ({
          question: item.q,
          answer: item.a,
        }))}
      />
      <main className="min-h-screen bg-background text-foreground isolation-auto">
        <ScrollProgress />
        <Hero content={sc.sections.hero} />
        <HomePractices practices={sc.homePractices} />
        <TrustedPlatforms />
        <ShowcaseCards />
        <Reviews
          content={sc.sections.proof}
          testimonials={sc.testimonials}
        />
        <FAQ items={sc.faq} />
        <Contact
          content={sc.sections.contact}
          contactInfo={sc.contactInfo}
        />
      </main>
    </>
  );
}
