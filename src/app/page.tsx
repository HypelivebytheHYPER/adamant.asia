import { Navigation } from "@/components/navigation";
import { ScrollProgress } from "@/components/scroll-progress";
import { Marquee, MarqueeText } from "@/components/marquee";
import { TrustedBy } from "@/components/trusted-by";
import { JsonLd } from "@/components/json-ld";
import { Hero } from "@/components/sections/hero";
import { Problem } from "@/components/sections/problem";
import { Process } from "@/components/sections/process";
import { Progress } from "@/components/sections/progress";
import { Proof } from "@/components/sections/proof";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <JsonLd />
      <main id="main" className="min-h-screen bg-background text-foreground isolation-auto">
        <ScrollProgress />
        <Navigation />
        <Hero />
        <TrustedBy />
        <Problem />
        <Process />
        <Progress />
        <Proof />
        <Contact />

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

        <Footer />
      </main>
    </>
  );
}
