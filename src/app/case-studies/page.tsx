import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BlurFade } from "@/components/animations/blur-fade";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-json-ld";
import { WebPageJsonLd } from "@/components/webpage-json-ld";
import { caseStudies, type CaseStudy } from "@/data/case-studies";
import { SITE_URL } from "@/lib/site";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Case Studies — Adamant AI",
  description:
    "See how Adamant builds AI business solutions: KOL leaderboards, AI workflows, SaaS mini builds, and marketing systems delivered in two weeks.",
  alternates: {
    canonical: "/case-studies",
  },
  openGraph: {
    title: "Case Studies — Adamant AI",
    description:
      "See how Adamant builds AI business solutions: KOL leaderboards, AI workflows, SaaS mini builds, and marketing systems delivered in two weeks.",
    url: `${SITE_URL}/case-studies`,
    images: [`${SITE_URL}/opengraph-image`],
  },
};

// On-brand: case studies are all Adamant AI work, so the teal `primary` token.
const SERVICE_TAG = "bg-primary/10 text-primary border-primary/20";
/** Gradient used for the visual when no hero image is wired yet. */
const SERVICE_GRADIENT = "from-primary/15 via-surface to-background";

function StudyVisual({ study }: { study: CaseStudy }) {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border">
      {study.image ? (
        <>
          <Image
            src={study.image}
            alt={study.imageAlt ?? study.headline}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent" />
        </>
      ) : (
        <div className={cn("absolute inset-0 bg-gradient-to-br", SERVICE_GRADIENT)} />
      )}

      {/* Metric badge */}
      <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
        <p
          className={cn(
            "text-hero leading-none",
            study.image ? "text-background" : "text-foreground"
          )}
        >
          {study.metric}
        </p>
        <p
          className={cn(
            "mt-2 text-caption font-medium",
            study.image ? "text-background/85" : "text-stone"
          )}
        >
          {study.metricLabel}
        </p>
      </div>
    </div>
  );
}

export default function CaseStudiesPage() {
  return (
    <>
      <WebPageJsonLd
        url={`${SITE_URL}/case-studies`}
        title="Case Studies — Adamant AI"
        description="See how Adamant builds AI business solutions: KOL leaderboards, AI workflows, SaaS mini builds, and marketing systems delivered in two weeks."
        pageType="CollectionPage"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${SITE_URL}/` },
          { name: "Case Studies", url: `${SITE_URL}/case-studies` },
        ]}
      />
      <main className="min-h-screen bg-background text-foreground">
        <section className="section-pad border-b border-border">
          <div className="container max-w-4xl">
            <BlurFade>
              <p className="text-caption text-stone uppercase tracking-wider font-medium mb-6">
                Case Studies
              </p>
              <h1 className="text-hero text-foreground font-serif mb-6">
                AI solutions we have built.
              </h1>
              <p className="text-lead text-stone max-w-2xl leading-relaxed">
                A selection of recent builds across SaaS mini builds, AI workflow automation,
                marketing systems, and KOL leaderboards. Each project shipped in two weeks or less.
              </p>
            </BlurFade>
          </div>
        </section>

        <section className="section-pad">
          <div className="container max-w-6xl">
            <div className="space-y-20 md:space-y-28">
              {caseStudies.map((study, i) => {
                const imageFirst = i % 2 === 0;
                return (
                  <BlurFade key={study.id} delay={0.05}>
                    <article className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
                      {/* Visual */}
                      <div className={cn(imageFirst ? "lg:order-1" : "lg:order-2")}>
                        <StudyVisual study={study} />
                      </div>

                      {/* Copy */}
                      <div className={cn(imageFirst ? "lg:order-2" : "lg:order-1")}>
                        <div className="flex flex-wrap items-center gap-3 mb-5">
                          <span
                            className={cn(
                              "px-2.5 py-0.5 rounded-full text-micro border",
                              SERVICE_TAG
                            )}
                          >
                            {study.service}
                          </span>
                          <span className="text-caption text-stone">
                            {study.client} · {study.industry}
                          </span>
                        </div>

                        <h2 className="text-headline text-foreground font-serif mb-7 leading-snug">
                          {study.headline}
                        </h2>

                        <dl className="space-y-5 mb-8">
                          {(
                            [
                              ["Challenge", study.challenge],
                              ["Solution", study.solution],
                              ["Outcome", study.outcome],
                            ] as const
                          ).map(([label, body]) => (
                            <div key={label} className="grid grid-cols-[88px_1fr] gap-4">
                              <dt className="text-caption text-foreground/50 font-medium uppercase tracking-wider pt-0.5">
                                {label}
                              </dt>
                              <dd className="text-body text-stone leading-relaxed">{body}</dd>
                            </div>
                          ))}
                        </dl>

                        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-border">
                          <div className="flex flex-wrap gap-2">
                            {study.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-label text-stone bg-foreground/[0.03] border border-border/60 rounded-full px-2.5 py-1"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <Link
                            href="/contact"
                            className="inline-flex items-center gap-1.5 text-caption text-primary hover:underline underline-offset-4 whitespace-nowrap"
                          >
                            Discuss a similar build <ArrowRight size={14} />
                          </Link>
                        </div>
                      </div>
                    </article>
                  </BlurFade>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
