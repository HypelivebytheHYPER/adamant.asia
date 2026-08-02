import type { Metadata } from "next";
import { ScrollProgress } from "@/components/scroll-progress";
import { JsonLd } from "@/components/json-ld";
import {
  Contact,
  FAQ,
  Hero,
  Model,
  Problem,
  Process,
  Reviews,
  Solutions,
  ShowcaseCards,
} from "@/sections";
import { TrustedPlatforms } from "@/sections/trusted-platforms";
import { siteContent } from "@/data/content";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-json-ld";
import { FaqJsonLd } from "@/components/faq-json-ld";
import { HowToJsonLd } from "@/components/howto-json-ld";
import { WebPageJsonLd } from "@/components/webpage-json-ld";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Adamant AI Singapore — SaaS Build, Marketing Systems & AI Agency",
  description:
    "Singapore AI agency building custom SaaS tools, marketing systems and AI workflow automation. Working systems delivered in two weeks with full source code.",
  alternates: {
    canonical: "/ai",
  },
  openGraph: {
    title: "Adamant AI Singapore — SaaS Build, Marketing Systems & AI Agency",
    description:
      "Singapore AI agency building custom SaaS tools, marketing systems and AI workflow automation. Working systems delivered in two weeks.",
    type: "website",
    url: `${SITE_URL}/ai`,
    images: [`${SITE_URL}/opengraph-image`],
  },
  twitter: {
    card: "summary_large_image",
    title: "Adamant AI Singapore — SaaS Build, Marketing Systems & AI Agency",
    description:
      "Singapore AI agency building custom SaaS tools, marketing systems and AI workflow automation. Working systems delivered in two weeks.",
    images: [`${SITE_URL}/opengraph-image`],
  },
};

export default function AiPage() {
  const sc = siteContent;
  return (
    <>
      <JsonLd />
      <WebPageJsonLd
        url={`${SITE_URL}/ai`}
        title="Adamant AI Singapore — SaaS Build, Marketing Systems & AI Agency"
        description="Singapore AI agency building custom SaaS tools, marketing systems and AI workflow automation. Working systems delivered in two weeks with full source code."
        pageType="WebPage"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${SITE_URL}/` },
          { name: "Adamant AI", url: `${SITE_URL}/ai` },
        ]}
      />
      <FaqJsonLd
        items={sc.faq.map((item) => ({
          question: item.q,
          answer: item.a,
        }))}
      />
      <HowToJsonLd
        name="The Adamant 2-Week Build Method"
        description="From first call to live system in two weeks."
        totalTime="P2W"
        supply={["Project requirements document", "API credentials", "User access list"]}
        tool={["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "AI-assisted development"]}
        estimatedCost={{ currency: "USD", value: "3000-8000" }}
        steps={[
          {
            name: "45-minute intro call",
            text: "Map your pain points and see what is possible.",
          },
          {
            name: "Paid discovery",
            text: "Fixed-scope plan with clear deliverables, timeline, and cost.",
          },
          {
            name: "Build + tweak",
            text: "Two-week sprint. Daily updates. Weekly demos.",
          },
          {
            name: "Deploy",
            text: "System goes live. Team trained. 30 days of support included.",
          },
        ]}
      />
      <main className="min-h-screen bg-background text-foreground isolation-auto">
        <ScrollProgress />
        <Hero content={sc.sections.aiHero} />
        <TrustedPlatforms />
        <ShowcaseCards />
        <Problem content={sc.sections.problem} />
        <Solutions content={sc.sections.solutions} solutions={sc.solutions} />
        <Process content={sc.sections.process} phases={sc.processPhases} />
        <Model content={sc.sections.model} />
        <Reviews content={sc.sections.proof} testimonials={sc.testimonials} />
        <FAQ items={sc.faq} />
        <Contact content={sc.sections.contact} contactInfo={sc.contactInfo} />
      </main>
    </>
  );
}
