"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface EditorialImageProps {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  parallax?: boolean;
  reveal?: "clip" | "fade" | "scale";
  aspect?: "portrait" | "landscape" | "square";
}

/** Parallax offset in px. Kept low for smooth, jank-free scrolling. */
const PARALLAX_OFFSET = 18;

export function EditorialImage({
  src,
  alt,
  caption,
  className,
  parallax = true,
  reveal = "clip",
  aspect = "landscape",
}: EditorialImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    parallax && !reducedMotion ? [PARALLAX_OFFSET, -PARALLAX_OFFSET] : [0, 0]
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    reveal === "scale" ? [1.1, 1, 1.05] : [1, 1, 1]
  );

  const aspectClass = {
    portrait: "aspect-[3/4]",
    landscape: "aspect-[16/10]",
    square: "aspect-square",
  }[aspect];

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div
        style={{ y, scale }}
        className="relative w-full h-full will-change-transform motion-reduce:will-change-auto"
      >
        <div className={cn("relative overflow-hidden", aspectClass)}>
          <motion.img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
            initial={
              reveal === "clip"
                ? { clipPath: "inset(100% 0 0 0)", opacity: 1 }
                : reveal === "fade"
                  ? { opacity: 0, y: 20 }
                  : { scale: 1.15, opacity: 0 }
            }
            whileInView={
              reveal === "clip"
                ? { clipPath: "inset(0% 0 0 0)" }
                : reveal === "fade"
                  ? { opacity: 1, y: 0 }
                  : { scale: 1, opacity: 1 }
            }
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: reveal === "clip" ? 1.2 : 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        </div>
      </motion.div>
      {caption && (
        <motion.p
          className="text-[10px] text-stone/60 mt-2 tracking-wide uppercase"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {caption}
        </motion.p>
      )}
    </div>
  );
}
