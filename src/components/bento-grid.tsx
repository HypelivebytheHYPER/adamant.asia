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
  background?: ReactNode;
  Icon: React.ElementType;
  description: string;
  href?: string;
  cta?: string;
}

const BentoGrid = ({ children, className, ...props }: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[minmax(14rem,auto)] grid-cols-1 md:grid-cols-3 gap-3",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  ...props
}: BentoCardProps) => (
  <div
    className={cn(
      "group relative col-span-1 flex flex-col justify-between overflow-hidden rounded-xl",
      "bg-surface border border-border shadow-rest",
      "transition-all duration-500 hover:shadow-hover hover:border-primary/20",
      className
    )}
    {...props}
  >
    {background && <div className="absolute inset-0">{background}</div>}

    <div className="relative z-10 p-5 flex flex-col h-full">
      {/* Icon + title block — shifts up on hover to reveal CTA */}
      <div className="flex transform-gpu flex-col gap-2 transition-all duration-500 md:group-hover:-translate-y-2">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Icon className="h-4 w-4" strokeWidth={1.5} />
          </div>
        </div>
        <h3 className="text-headline text-foreground mt-1">{name}</h3>
        <p className="text-caption text-stone max-w-xs leading-relaxed">{description}</p>
      </div>

      {/* CTA — hidden on desktop until hover */}
      {href && cta && (
        <div className="mt-auto pt-3">
          <a
            href={href}
            className="inline-flex items-center gap-1 text-caption text-primary hover:underline transition-all duration-300 opacity-100 md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0"
          >
            {cta}
            <ArrowRight className="h-3 w-3" />
          </a>
        </div>
      )}
    </div>

    {/* Subtle hover overlay */}
    <div className="pointer-events-none absolute inset-0 transition-all duration-500 group-hover:bg-primary/[0.02]" />
  </div>
);

export { BentoCard, BentoGrid };
