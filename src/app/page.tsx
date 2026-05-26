import { Navigation } from "@/components/navigation";
import { ScrollProgress } from "@/components/scroll-progress";
import { Marquee, MarqueeText } from "@/components/marquee";
import { JsonLd } from "@/components/json-ld";
import { StatsBar } from "@/components/stats-bar";
import { Hero } from "@/components/sections/hero";
import { Problem } from "@/components/sections/problem";
import { Solutions } from "@/components/sections/solutions";
import { Process } from "@/components/sections/process";
import { Proof } from "@/components/sections/proof";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { siteContent } from "@/data/content";

/** ISR: Rebuild every 1 hour, or on-demand via /api/deploy */
export const revalidate = 3600;

export default function Home() {
  const sc = siteContent;
  return (
    <>
      <JsonLd />
      <main id="main" className="min-h-screen bg-background text-foreground isolation-auto">
        <ScrollProgress />
        <Navigation links={sc.navLinks} />
        <Hero content={sc.sections.hero} />
        <Problem content={sc.sections.problem} />
        <Solutions content={sc.sections.solutions} solutions={sc.solutions} />
        <Process
          content={sc.sections.process}
          phases={sc.processPhases}
          pipelineNodes={sc.pipelineNodes}
        />
        <StatsBar stats={sc.stats} />
        <Proof
          content={sc.sections.proof}
          testimonials={sc.testimonials}
          stats={sc.stats}
        />
        <Contact
          content={sc.sections.contact}
          contactInfo={sc.contactInfo}
        />

        <Marquee className="space-strip bg-foreground" speed={50} gap={48}>
          <MarqueeText text="Build once. Run forever." className="text-inverse/[0.25]" />
          <span className="text-inverse/[0.15] text-headline">•</span>
          <MarqueeText text="Systems, not slogans." className="text-inverse/[0.25]" />
          <span className="text-inverse/[0.15] text-headline">•</span>
          <MarqueeText text="Your team should not need you for everything." className="text-inverse/[0.25]" />
          <span className="text-inverse/[0.15] text-headline">•</span>
          <MarqueeText text="Fix the workflow. Free the founder." className="text-inverse/[0.25]" />
          <span className="text-inverse/[0.15] text-headline">•</span>
        </Marquee>

        <Footer
          content={sc.sections.footer}
          navLinks={sc.footerNavLinks}
        />
      </main>
    </>
  );
}
