"use client";

import { type ComponentPropsWithoutRef, type ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  className?: string;
}

interface BentoCardProps extends ComponentPropsWithoutRef<"div"> {
  name: string;
  className?: string;
  Icon: React.ElementType;
  description: string;
  href?: string;
  cta?: string;
  accent?: string;
  gradient?: string;
}

const BentoGrid = ({ children, className, ...props }: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[minmax(13rem,auto)] md:auto-rows-[minmax(15rem,auto)] grid-cols-1 md:grid-cols-3 gap-3 md:gap-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

/*
 * 3D Layered BentoCard — shadows use inline styles (guaranteed cross-browser).
 *
 * Visual layers (bottom → top):
 *   Layer 0: Deep cast shadow (box-shadow, 3 levels)
 *   Layer 1: Soft gradient wash (accent color, subtle)
 *   Layer 2: Frosted surface (bg-surface/90)
 *   Layer 3: Noise grain overlay (SVG fractalNoise, 2.5% opacity)
 *   Layer 4: Top bevel highlight (gradient line)
 *   Layer 5: Inner depth shadow (bottom-edge gradient)
 *   Layer 6: Border + hover glow
 *   Layer 7: Content (icon floats, CTA reveals)
 */
const BentoCard = ({
  name,
  className,
  Icon,
  description,
  href,
  cta,
  accent = "primary",
  gradient = "from-primary/5 to-transparent",
  ...props
}: BentoCardProps) => {
  const accentText = `text-${accent}`;
  const accentBg = `bg-${accent}/10`;

  return (
    <div
      className={cn(
        "group relative col-span-1 flex flex-col justify-between overflow-hidden rounded-xl",
        "[container-type:inline-size]",
        "transition-all duration-500 ease-smooth",
        /* Lift on hover */
        "hover:-translate-y-1.5 md:hover:-translate-y-2"
      )}
      style={{
        transformStyle: "preserve-3d",
        /* 3-level shadow: ambient + key + cast */
        boxShadow:
          "0 0 0 1px var(--shadow-border), 0 1px 2px var(--shadow-ambient), 0 4px 12px var(--shadow-cast)",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.boxShadow =
          "0 0 0 1px var(--shadow-hover-border), 0 2px 4px var(--shadow-hover-ambient), 0 8px 20px var(--shadow-cast), 0 24px 48px var(--shadow-cast)";
        el.style.transform = "translateY(-8px) rotateX(2deg) rotateY(-1deg)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.boxShadow =
          "0 0 0 1px var(--shadow-border), 0 1px 2px var(--shadow-ambient), 0 4px 12px var(--shadow-cast)";
        el.style.transform = "translateY(0) rotateX(0) rotateY(0)";
      }}
      {...props}
    >
      {/* ─── Layer 1: Soft gradient wash ─── */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-40 transition-opacity duration-500 group-hover:opacity-60",
          gradient
        )}
      />

      {/* ─── Layer 2: Frosted surface ─── */}
      <div className="absolute inset-0 bg-surface/90" />

      {/* ─── Layer 3: Noise grain overlay ─── */}
      <div
        className="absolute inset-0 opacity-[0.025] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ─── Layer 4: Top bevel highlight ─── */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/[0.08] to-transparent" />

      {/* ─── Layer 5: Inner depth shadow (bottom edge) ─── */}
      <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-foreground/[0.04] to-transparent pointer-events-none" />

      {/* ─── Layer 6: Border ring ─── */}
      <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-foreground/[0.06] group-hover:ring-primary/20 transition-all duration-500 pointer-events-none" />

      {/* ─── Layer 7: Content ─── */}
      <div className="relative z-10 p-5 md:p-6 flex flex-col h-full">
        {/* Icon — floating with ambient glow */}
        <div className="relative mb-3">
          {/* Ambient glow */}
          <div
            className={cn(
              "absolute -inset-3 rounded-full blur-xl opacity-0 transition-opacity duration-500 group-hover:opacity-50",
              accentBg
            )}
          />
          {/* Icon container */}
          <div
            className={cn(
              "relative flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-500",
              "group-hover:scale-110 group-hover:-translate-y-0.5",
              accentBg,
              accentText
            )}
          >
            <Icon className="h-[18px] w-[18px]" strokeWidth={1.5} />
          </div>
        </div>

        {/* Text block */}
        <div className="flex flex-col gap-1.5">
          <h3 className="text-headline text-foreground">{name}</h3>
          <p className="text-body text-stone max-w-[26ch] leading-relaxed">
            {description}
          </p>
        </div>

        {/* CTA — always visible on mobile, hover-reveal on desktop */}
        {href && cta && (
          <div className="mt-auto pt-4">
            <a
              href={href}
              className={cn(
                "inline-flex items-center gap-1.5 text-caption font-medium transition-all duration-300",
                accentText,
                "opacity-100 translate-y-0",
                "md:opacity-0 md:translate-y-2",
                "md:group-hover:opacity-100 md:group-hover:translate-y-0",
                "hover:underline underline-offset-2"
              )}
            >
              {cta}
              <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export { BentoCard, BentoGrid };
