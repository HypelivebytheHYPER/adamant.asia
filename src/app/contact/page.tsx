import type { Metadata } from "next";
import { Contact } from "@/sections";
import { siteContent } from "@/data/content";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-json-ld";
import { WebPageJsonLd } from "@/components/webpage-json-ld";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Engage Us — Adamant",
  description:
    "Engage Adamant Verify or Adamant AI. Tell us which practice you need — all enquiries handled in strict confidence, with a reply within 24 hours.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Engage Us — Adamant",
    description:
      "Engage Adamant Verify or Adamant AI. Tell us which practice you need — all enquiries handled in strict confidence, with a reply within 24 hours.",
    url: `${SITE_URL}/contact`,
    images: [`${SITE_URL}/opengraph-image`],
  },
};

export default function ContactPage() {
  const sc = siteContent;
  return (
    <>
      <WebPageJsonLd
        url={`${SITE_URL}/contact`}
        title="Contact — Adamant"
        description="Get in touch with Adamant. Book a free intro call or send us a message. We reply within 24 hours."
        pageType="ContactPage"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${SITE_URL}/` },
          { name: "Contact", url: `${SITE_URL}/contact` },
        ]}
      />
      <main className="min-h-screen bg-background text-foreground">
        <section className="pt-32 pb-12 border-b border-border">
          <div className="container max-w-4xl">
            <p className="text-caption text-stone uppercase tracking-wider font-medium mb-4">
              Engage Us
            </p>
            <h1 className="text-hero text-foreground font-serif">
              Engage Adamant Verify or Adamant AI.
            </h1>
          </div>
        </section>
        <Contact content={sc.sections.contact} contactInfo={sc.contactInfo} />
      </main>
    </>
  );
}
