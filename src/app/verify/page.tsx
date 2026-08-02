import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BlurFade } from "@/components/animations/blur-fade";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-json-ld";
import { WebPageJsonLd } from "@/components/webpage-json-ld";
import { Contact, VerifyDark, VerifyProcess } from "@/sections";
import { siteContent } from "@/data/content";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Adamant Verify Singapore — KYC/KYB, AML Screening & Due Diligence",
  description:
    "Singapore-based KYC, KYB, AML screening and due diligence services for businesses operating across Southeast Asia. Named, concierge verification engagement.",
  alternates: {
    canonical: "/verify",
  },
  openGraph: {
    title: "Adamant Verify Singapore — KYC/KYB, AML Screening & Due Diligence",
    description:
      "Singapore-based KYC, KYB, AML screening and due diligence services for Southeast Asia. Named, concierge verification. PDPA-compliant.",
    type: "website",
    url: `${SITE_URL}/verify`,
    images: [`${SITE_URL}/opengraph-image`],
  },
  twitter: {
    card: "summary_large_image",
    title: "Adamant Verify Singapore — KYC/KYB, AML Screening & Due Diligence",
    description:
      "Singapore-based KYC, KYB, AML screening and due diligence services for Southeast Asia. Named, concierge verification.",
    images: [`${SITE_URL}/opengraph-image`],
  },
};

export default function VerifyPage() {
  const sc = siteContent;
  const intro = sc.homePractices.verify;

  return (
    <>
      <WebPageJsonLd
        url={`${SITE_URL}/verify`}
        title="Adamant Verify Singapore — KYC/KYB, AML Screening & Due Diligence"
        description="Singapore-based KYC, KYB, AML screening and due diligence services for businesses operating across Southeast Asia. Named, concierge verification engagement."
        pageType="WebPage"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${SITE_URL}/` },
          { name: "Adamant Verify", url: `${SITE_URL}/verify` },
        ]}
      />
      <main className="min-h-screen bg-background text-foreground">
        {/* Intro hero */}
        <section className="section-pad border-b border-border">
          <div className="container max-w-4xl">
            <BlurFade>
              <p className="text-caption text-accent uppercase tracking-wider font-medium mb-6">
                {intro.tag}
              </p>
              <h1 className="text-hero text-foreground font-serif mb-6 text-pretty">
                {intro.headline}
              </h1>
              <p className="text-lead text-stone max-w-2xl leading-relaxed">{intro.body}</p>
            </BlurFade>
            <BlurFade delay={0.1}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                {intro.tags.map((t) => (
                  <span
                    key={t}
                    className="text-label text-stone bg-foreground/[0.03] border border-border/60 rounded-full px-2.5 py-1"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </BlurFade>
            <BlurFade delay={0.15}>
              <Link href="/contact" className="btn-primary inline-flex items-center gap-2 mt-8">
                Request a Consultation
                <ArrowRight size={14} strokeWidth={2} aria-hidden="true" />
              </Link>
            </BlurFade>
          </div>
        </section>

        <VerifyDark content={sc.verifyDark} />
        <VerifyProcess content={sc.verifyProcess} />
        <Contact content={sc.sections.contact} contactInfo={sc.contactInfo} />
      </main>
    </>
  );
}
