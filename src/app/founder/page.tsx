import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-json-ld";
import { WebPageJsonLd } from "@/components/webpage-json-ld";
import { PersonJsonLd } from "@/components/person-json-ld";
import { BlurFade } from "@/components/animations/blur-fade";
import { EditorialImage } from "@/components/editorial-image";
import { ArrowRight } from "lucide-react";
import { getAllConfig } from "@/lib/site-config";
import { SITE_URL } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const cfg = await getAllConfig();
  const founderName = cfg.founder_name || "Samantha Tng";
  const founderTitle = cfg.founder_title || "Founder";
  const company = cfg.founder_company_name || "Adamant";
  const bio = cfg.founder_bio_short || `${founderName} is the ${founderTitle} of ${company}, an AI agency that builds real products — SaaS tools and marketing systems that ship in two weeks.`;
  const canonical = cfg.founder_canonical_url || "/founder";

  const title = `${founderName} — ${founderTitle}`;

  return {
    title,
    description: bio,
    alternates: { canonical },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description: `Why ${founderName} built ${company} and who we are.`,
      type: "article",
      url: `${SITE_URL}${canonical}`,
      images: [`${SITE_URL}/opengraph-image`],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: `Why ${founderName} built ${company} and who we are.`,
      images: [`${SITE_URL}/opengraph-image`],
    },
  };
}

export default async function FounderPage() {
  const cfg = await getAllConfig();

  const founderName = cfg.founder_name || "Samantha Tng";
  const founderTitle = cfg.founder_title || "Founder";
  const linkedIn = cfg.founder_linkedin_url || "https://www.linkedin.com/in/sstng";
  const company = cfg.founder_company_name || "Adamant";
  const bio = cfg.founder_bio_short || `${founderName} is the ${founderTitle} of ${company}, an AI agency that builds real products — SaaS tools and marketing systems that ship in two weeks.`;
  const heroHeadline = cfg.founder_hero_headline || "We started this because we were tired of watching good teams drown.";
  const heroKicker = cfg.founder_hero_kicker || `Behind ${company}`;
  const canonical = cfg.founder_canonical_url || "/founder";

  const founderUrl = `${SITE_URL}${canonical}`;

  return (
    <>
      <WebPageJsonLd
        url={founderUrl}
        title={`${founderName} — ${founderTitle}`}
        description={bio}
        pageType="AboutPage"
      />
      <PersonJsonLd
        name={founderName}
        jobTitle={founderTitle}
        description={bio}
        url={founderUrl}
        image={`${SITE_URL}/opengraph-image`}
        sameAs={linkedIn ? [linkedIn] : []}
        knowsAbout={[
          "SaaS Development",
          "AI Workflow Automation",
          "Marketing Systems",
          "Business Process Automation",
        ]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${SITE_URL}/` },
          { name: "Founder", url: founderUrl },
        ]}
      />
      <main className="min-h-screen bg-background text-foreground">
        {/* ── HERO ── full-bleed editorial with image ── */}
        <section className="relative min-h-[80dvh] flex items-end overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
              alt="Workshop with warm natural light"
              fill
              sizes="100vw"
              unoptimized
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          </div>
          <div className="container relative z-10 pb-16 md:pb-24">
            <BlurFade>
              <span
                className="text-stone uppercase tracking-[0.2em] text-xs"
                style={{ fontFamily: "var(--font-geist-sans)" }}
              >
                {heroKicker}
              </span>
            </BlurFade>
            <BlurFade delay={0.08}>
              <h1 className="mt-5 text-hero text-foreground max-w-3xl">
                {heroHeadline}
              </h1>
            </BlurFade>
            <BlurFade delay={0.12}>
              <p className="mt-6 text-sm text-stone uppercase tracking-[0.15em]" style={{ fontFamily: "var(--font-geist-sans)" }}>
                <a
                  href={linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors duration-200 underline underline-offset-4 decoration-border hover:decoration-primary"
                >
                  {founderName}
                </a>
                , {founderTitle}
              </p>
            </BlurFade>
          </div>
        </section>

        {/* ── OPENING CHAPTER ── centered, editorial body text ── */}
        <section className="section-pad bg-background">
          <div className="container">
            <div className="max-w-2xl mx-auto">
              <BlurFade>
                <p
                  className="text-foreground leading-[1.65]"
                  style={{
                    fontFamily: "var(--font-newsreader)",
                    fontSize: "clamp(1.25rem, 1.5vw + 0.5rem, 1.5rem)",
                    fontWeight: 400,
                  }}
                >
                  Before {company}, we spent years inside teams that were talented, driven, and completely underwater.
                </p>
              </BlurFade>
              <BlurFade delay={0.08}>
                <p className="mt-6 text-body text-stone leading-[1.8]">
                  Marketing teams running campaigns through WhatsApp threads. Operations teams tracking orders in three different notebooks. Founders who could not take a day off because the whole thing would fall apart without them.
                </p>
              </BlurFade>
              <BlurFade delay={0.12}>
                <p className="mt-4 text-body text-stone leading-[1.8]">
                  We watched companies spend $15,000 on systems that nobody used. Agencies deliver beautiful decks that changed nothing. Smart people spending half their day on work a machine should do.
                </p>
              </BlurFade>
            </div>
          </div>
        </section>

        {/* ── IMAGE BREAK ── full width with caption ── */}
        <section className="py-12 md:py-20 bg-background">
          <div className="container">
            <div className="max-w-5xl mx-auto">
              <EditorialImage
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
                alt="A team at work in a modern workspace"
                caption="The teams we work with are not broken. Their systems are."
                reveal="clip"
                parallax
              />
            </div>
          </div>
        </section>

        {/* ── CHAPTER 2 ── asymmetric layout image left text right ── */}
        <section className="section-pad bg-background">
          <div className="container">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              <div className="lg:col-span-5 lg:col-start-1">
                <EditorialImage
                  src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop"
                  alt="Whiteboard planning session"
                  caption="Every system starts with understanding the human workflow."
                  reveal="clip"
                  aspect="portrait"
                  parallax
                />
              </div>
              <div className="lg:col-span-5 lg:col-start-7 pt-4 lg:pt-24">
                <BlurFade>
                  <h2
                    className="text-foreground mb-6"
                    style={{
                      fontFamily: "var(--font-newsreader)",
                      fontSize: "clamp(1.75rem, 2vw + 0.5rem, 2.5rem)",
                      lineHeight: 1.15,
                      fontWeight: 400,
                    }}
                  >
                    So we built something different.
                  </h2>
                </BlurFade>
                <BlurFade delay={0.08}>
                  <p className="text-body text-stone leading-[1.8]">
                    Not another agency that disappears after the invoice. Not another SaaS product that forces you to change how you work. Something in between.
                  </p>
                </BlurFade>
                <BlurFade delay={0.12}>
                  <p className="mt-4 text-body text-stone leading-[1.8]">
                    A partner that builds the system, trains your team, and leaves you with something that runs. Custom enough to fit your workflow. Simple enough to use without a manual.
                  </p>
                </BlurFade>
              </div>
            </div>
          </div>
        </section>

        {/* ── PULL QUOTE ── large, centered ── */}
        <section className="py-20 md:py-28 bg-surface/30">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <BlurFade>
                <blockquote
                  className="text-foreground"
                  style={{
                    fontFamily: "var(--font-newsreader)",
                    fontSize: "clamp(1.75rem, 3vw, 2.75rem)",
                    lineHeight: 1.25,
                    fontStyle: "italic",
                    fontWeight: 400,
                  }}
                >
                  &ldquo;The best thing we can build is a system that works when you are not there. That is the whole point.&rdquo;
                </blockquote>
              </BlurFade>
              <BlurFade delay={0.1}>
                <p
                  className="mt-6 text-stone uppercase tracking-[0.15em] text-xs"
                  style={{ fontFamily: "var(--font-geist-sans)" }}
                >
                  — The {company} principle
                </p>
              </BlurFade>
            </div>
          </div>
        </section>

        {/* ── CHAPTER 3 ── text left image right ── */}
        <section className="section-pad bg-background">
          <div className="container">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              <div className="lg:col-span-5 lg:col-start-2 order-2 lg:order-1 pt-4 lg:pt-16">
                <BlurFade>
                  <h2
                    className="text-foreground mb-6"
                    style={{
                      fontFamily: "var(--font-newsreader)",
                      fontSize: "clamp(1.75rem, 2vw + 0.5rem, 2.5rem)",
                      lineHeight: 1.15,
                      fontWeight: 400,
                    }}
                  >
                    What we believe
                  </h2>
                </BlurFade>
                <div className="space-y-5">
                  {[
                    {
                      num: "01",
                      text: "Clarity beats complexity. Every time. A simple system that gets used is infinitely better than a perfect one that gathers dust.",
                    },
                    {
                      num: "02",
                      text: "Two weeks of focused work beats three months of meetings. Speed is not recklessness — it is respect for your time.",
                    },
                    {
                      num: "03",
                      text: "The best tool is the one your team already knows. We connect what you use, not force you to adopt something new.",
                    },
                    {
                      num: "04",
                      text: "You should not need us forever. We build to hand off. If the system still needs us after 30 days, we did something wrong.",
                    },
                  ].map((item, i) => (
                    <BlurFade key={i} delay={0.08 + i * 0.05}>
                      <div className="flex gap-4">
                        <span
                          className="flex-shrink-0 text-stone text-xs mt-1"
                          style={{ fontFamily: "var(--font-geist-sans)", fontVariantNumeric: "tabular-nums" }}
                        >
                          {item.num}
                        </span>
                        <p className="text-body text-stone leading-[1.7]">
                          {item.text}
                        </p>
                      </div>
                    </BlurFade>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-5 lg:col-start-7 order-1 lg:order-2">
                <EditorialImage
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop"
                  alt="Clean desk with notebook and coffee"
                  caption="Simplicity is not the absence of effort. It is the distillation of it."
                  reveal="clip"
                  aspect="portrait"
                  parallax
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── FULL-BLEED IMAGE ── emotional beat ── */}
        <section className="py-12 bg-background">
          <EditorialImage
            src="https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=2068&auto=format&fit=crop"
            alt="Hands on a keyboard in warm light"
            reveal="clip"
            parallax={false}
            className="max-w-6xl mx-auto px-4 md:px-8"
          />
        </section>

        {/* ── HOW WE WORK — Process section ── */}
        <section id="process" className="section-pad bg-background scroll-mt-16">
          <div className="container">
            <div className="max-w-2xl mx-auto">
              <BlurFade>
                <h2
                  className="text-foreground mb-6"
                  style={{
                    fontFamily: "var(--font-newsreader)",
                    fontSize: "clamp(1.75rem, 2vw + 0.5rem, 2.5rem)",
                    lineHeight: 1.15,
                    fontWeight: 400,
                  }}
                >
                  How we work
                </h2>
              </BlurFade>
              <div className="space-y-6">
                {[
                  {
                    num: "01",
                    title: "We start with what is broken.",
                    body: "Not a generic audit. Not a survey. We look at the exact moment your team gets stuck and build backwards from there.",
                  },
                  {
                    num: "02",
                    title: "We map the system before we build it.",
                    body: "Every workflow, every integration, every edge case. You see the plan before we write a single line of code.",
                  },
                  {
                    num: "03",
                    title: "We build in two-week sprints.",
                    body: "One sprint. One working system. You get daily updates and a demo every Friday. No surprises.",
                  },
                  {
                    num: "04",
                    title: "We train your team and leave.",
                    body: "Documentation, walkthroughs, and a solid handoff. The system works without us. That is the whole point.",
                  },
                ].map((step, i) => (
                  <BlurFade key={i} delay={0.08 + i * 0.06}>
                    <div className="flex gap-4">
                      <span
                        className="flex-shrink-0 text-stone text-xs mt-1"
                        style={{ fontFamily: "var(--font-geist-sans)", fontVariantNumeric: "tabular-nums" }}
                      >
                        {step.num}
                      </span>
                      <div>
                        <h3 className="text-foreground font-medium leading-snug">{step.title}</h3>
                        <p className="mt-1 text-body text-stone leading-[1.7]">{step.body}</p>
                      </div>
                    </div>
                  </BlurFade>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="section-pad bg-background">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <BlurFade>
                <h2
                  className="text-foreground"
                  style={{
                    fontFamily: "var(--font-newsreader)",
                    fontSize: "clamp(1.75rem, 2vw + 0.5rem, 2.5rem)",
                    lineHeight: 1.15,
                    fontWeight: 400,
                  }}
                >
                  Let us fix the thing that is slowing you down.
                </h2>
              </BlurFade>
              <BlurFade delay={0.08}>
                <p className="mt-4 text-body text-stone">
                  No pitch. No pressure. Just a conversation about what is broken and what we can build.
                </p>
              </BlurFade>
              <BlurFade delay={0.12}>
                <Link
                  href="/#contact"
                  className="mt-8 inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors duration-200 underline underline-offset-4 decoration-border hover:decoration-primary"
                >
                  Book a free intro call
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </BlurFade>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
