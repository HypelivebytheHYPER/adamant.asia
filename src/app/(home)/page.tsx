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
import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-json-ld";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  openGraph: {
    url: SITE_URL,
  },
};

export default function Home() {
  const sc = siteContent;
  return (
    <>
      <JsonLd />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${SITE_URL}/` },
        ]}
      />
      <main className="min-h-screen bg-background text-foreground isolation-auto">
        <ScrollProgress />
        <Hero content={sc.sections.hero} />
        <TrustedPlatforms />
        <ShowcaseCards />
        <Problem content={sc.sections.problem} />
        <Solutions content={sc.sections.solutions} />
        <Process
          content={sc.sections.process}
          phases={sc.processPhases}
        />
        <Model content={sc.sections.model} />
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
