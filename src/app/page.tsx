import { Navigation } from "@/components/navigation";
import { ScrollProgress } from "@/components/scroll-progress";
import { Marquee, MarqueeText } from "@/components/marquee";
import { TrustedBy } from "@/components/trusted-by";
import { Hero } from "@/components/sections/hero";
import { Problem } from "@/components/sections/problem";
import { Process } from "@/components/sections/process";
import { Progress } from "@/components/sections/progress";
import { Proof } from "@/components/sections/proof";
import { Partner } from "@/components/sections/partner";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <ScrollProgress />
      <Navigation />
      <Hero />
      <TrustedBy />
      <Problem />
      <Process />
      <Progress />
      <Proof />

      <Marquee className="py-6 md:py-8 bg-foreground" speed={50} gap={48}>
        <MarqueeText text="Workflows for the determined." className="text-dim/[0.25]" />
        <span className="text-dim/[0.15] text-headline">•</span>
        <MarqueeText text="Small teams. Big vision." className="text-dim/[0.25]" />
        <span className="text-dim/[0.15] text-headline">•</span>
        <MarqueeText text="Southeast Asia." className="text-dim/[0.25]" />
        <span className="text-dim/[0.15] text-headline">•</span>
        <MarqueeText text="Show us the mess." className="text-dim/[0.25]" />
        <span className="text-dim/[0.15] text-headline">•</span>
      </Marquee>

      <Partner />
      <Footer />
    </main>
  );
}
