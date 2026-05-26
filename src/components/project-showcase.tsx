"use client";

import { motion } from "framer-motion";
import { Lens } from "@/components/ui/lens";
import { easeSpring } from "@/lib/animation";

interface ProjectShowcaseProps {
  imageUrl: string;
  title: string;
  description?: string;
}

export function ProjectShowcase({
  imageUrl,
  title,
  description = "Campaign dashboard with live submissions, approvals, and rankings.",
}: ProjectShowcaseProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: easeSpring }}
      className="w-full"
    >
      <div className="rounded-2xl border border-border/60 bg-surface overflow-hidden shadow-lg">
        {/* Image with lens zoom */}
        <Lens
          zoomFactor={2}
          lensSize={140}
          isStatic={false}
          ariaLabel="Project preview zoom"
          className="w-full"
        >
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-auto object-cover aspect-[16/10]"
            loading="eager"
          />
        </Lens>

        {/* Card info */}
        <div className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-medium text-primary uppercase tracking-wider">
              Case Study
            </span>
            <span className="inline-flex items-center rounded-full bg-accent/10 px-2.5 py-0.5 text-[10px] font-medium text-accent uppercase tracking-wider">
              Live
            </span>
          </div>
          <h3 className="text-headline text-foreground font-medium mb-1">
            {title}
          </h3>
          <p className="text-caption text-stone leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
