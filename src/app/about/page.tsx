import type { Metadata } from "next";
import { BlurFade } from "@/components/animations/blur-fade";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-json-ld";
import { WebPageJsonLd } from "@/components/webpage-json-ld";
import { SITE_URL } from "@/lib/site";
import { MapPin, Mail, Users, Shield, Clock, Globe, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — Adamant",
  description:
    "Adamant is a professional advisory team based in Singapore. We build AI business solutions and deliver verification intelligence across Southeast Asia.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About — Adamant",
    description:
      "Adamant is a professional advisory team based in Singapore. We build AI business solutions and deliver verification intelligence across Southeast Asia.",
    url: `${SITE_URL}/about`,
    images: [`${SITE_URL}/opengraph-image`],
  },
};

const values = [
  {
    icon: Shield,
    title: "Discretion",
    body: "Every engagement is handled in strict confidence. We do not share client information, and our operations are PDPA-compliant by design.",
  },
  {
    icon: Users,
    title: "Partnership",
    body: "You work with a named relationship manager, not a ticketing system. We stay close enough to understand context and move fast enough to matter.",
  },
  {
    icon: Clock,
    title: "Speed",
    body: "AI solutions are scoped in one call and built in two weeks. Verification reports are delivered against clear deadlines with no surprise delays.",
  },
  {
    icon: Globe,
    title: "Regional focus",
    body: "Headquartered in Singapore, we operate across Southeast Asia with local context and cross-border coverage.",
  },
];

export default function AboutPage() {
  return (
    <>
      <WebPageJsonLd
        url={`${SITE_URL}/about`}
        title="About — Adamant"
        description="Adamant is a professional advisory team based in Singapore. We build AI business solutions and deliver verification intelligence across Southeast Asia."
        pageType="AboutPage"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${SITE_URL}/` },
          { name: "About", url: `${SITE_URL}/about` },
        ]}
      />
      <main className="min-h-screen bg-background text-foreground">
        {/* Hero */}
        <section className="section-pad border-b border-border">
          <div className="container max-w-4xl">
            <BlurFade>
              <p className="text-caption text-stone uppercase tracking-wider font-medium mb-6">
                About Adamant
              </p>
              <h1 className="text-hero text-foreground font-serif mb-8">
                A professional team based in Singapore, working across Southeast Asia.
              </h1>
              <p className="text-lead text-stone max-w-2xl leading-relaxed">
                Adamant is an advisory house with two practices. Adamant Verify gives you certainty
                before you commit capital or sign contracts. Adamant AI eliminates the manual work
                that slows your team down — with custom SaaS tools, marketing systems, and workflow
                automation built in two weeks.
              </p>
            </BlurFade>
            <BlurFade delay={0.1}>
              <Link
                href="/founder"
                className="mt-8 inline-flex items-center gap-2 text-body text-foreground hover:text-primary transition-colors underline underline-offset-4 decoration-border hover:decoration-primary"
              >
                Meet the founder
                <ArrowRight size={16} />
              </Link>
            </BlurFade>
          </div>
        </section>

        {/* Two practices */}
        <section className="section-pad border-b border-border">
          <div className="container max-w-5xl">
            <div className="grid md:grid-cols-2 gap-12 md:gap-16">
              <BlurFade delay={0.05}>
                <div className="rounded-xl border border-border bg-surface p-8 md:p-10">
                  <p className="text-caption text-accent uppercase tracking-wider font-medium mb-4">
                    Adamant Verify
                  </p>
                  <h2 className="text-headline text-foreground font-serif mb-4">
                    Certainty before commitment.
                  </h2>
                  <p className="text-body text-stone leading-relaxed">
                    Background checks, KYC/KYB, AML screening, and ongoing monitoring for businesses
                    operating in high-growth Southeast Asian markets. Delivered as a named,
                    concierge engagement.
                  </p>
                </div>
              </BlurFade>

              <BlurFade delay={0.1}>
                <div className="rounded-xl border border-border bg-surface p-8 md:p-10">
                  <p className="text-caption text-primary uppercase tracking-wider font-medium mb-4">
                    Adamant AI
                  </p>
                  <h2 className="text-headline text-foreground font-serif mb-4">
                    Real working AI systems.
                  </h2>
                  <p className="text-body text-stone leading-relaxed">
                    Custom SaaS mini builds, marketing systems, and AI workflow automation. Scoped
                    in one call, built in one sprint, handed over with full source code and
                    documentation.
                  </p>
                </div>
              </BlurFade>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="section-pad border-b border-border">
          <div className="container max-w-5xl">
            <BlurFade>
              <h2 className="text-display text-foreground font-serif mb-12">How we work.</h2>
            </BlurFade>
            <div className="grid sm:grid-cols-2 gap-8 md:gap-12">
              {values.map((v, i) => (
                <BlurFade key={v.title} delay={0.05 * (i + 1)}>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full border border-border bg-surface flex items-center justify-center flex-shrink-0">
                      <v.icon size={18} className="text-foreground" />
                    </div>
                    <div>
                      <h3 className="text-body text-foreground font-medium mb-2">{v.title}</h3>
                      <p className="text-body text-stone leading-relaxed">{v.body}</p>
                    </div>
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>

        {/* Singapore presence */}
        <section className="section-pad">
          <div className="container max-w-4xl">
            <BlurFade>
              <div className="rounded-xl border border-border bg-surface p-8 md:p-12">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-10 h-10 rounded-full border border-border bg-background flex items-center justify-center flex-shrink-0">
                    <MapPin size={18} className="text-foreground" />
                  </div>
                  <div>
                    <h2 className="text-headline text-foreground font-serif mb-2">
                      Singapore headquarters
                    </h2>
                    <p className="text-body text-stone leading-relaxed">
                      7 Temasek Boulevard, #12-07, Suntec Tower One, Singapore 038987
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-border">
                  <a
                    href="mailto:hello@adamant.asia"
                    className="inline-flex items-center gap-2 text-body text-foreground hover:text-primary transition-colors"
                  >
                    <Mail size={16} />
                    hello@adamant.asia
                  </a>
                  <Link
                    href="/contact"
                    className="btn-primary inline-flex items-center gap-2"
                  >
                    Get in touch
                  </Link>
                </div>
              </div>
            </BlurFade>
          </div>
        </section>
      </main>
    </>
  );
}
