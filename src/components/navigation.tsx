"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const MotionLink = motion.create(Link);
import { ArrowRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { easeSpring } from "@/lib/animation";
import type { NavLinkContent } from "@/data/content";

interface NavigationProps {
  links: NavLinkContent[];
}

function NavItem({
  link,
  onClick,
  className,
}: {
  link: NavLinkContent;
  onClick?: () => void;
  className: string;
}) {
  if (link.href.startsWith("#")) {
    return (
      <a href={link.href} onClick={onClick} className={className}>
        {link.label}
      </a>
    );
  }
  return (
    <Link href={link.href} onClick={onClick} className={className}>
      {link.label}
    </Link>
  );
}

function DesktopDropdown({
  link,
  light = false,
}: {
  link: NavLinkContent;
  light?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex items-center gap-1 text-ui transition-colors duration-300",
          light
            ? "text-inverse/70 hover:text-inverse"
            : "text-stone hover:text-foreground"
        )}
      >
        {link.label}
        <ChevronDown
          size={13}
          strokeWidth={2}
          className={cn("transition-transform duration-200", open && "rotate-180")}
        />
      </button>
      <AnimatePresence>
        {open && link.children && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 w-52 rounded-xl border border-border bg-background shadow-lg py-2"
          >
            {link.children.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                onClick={() => setOpen(false)}
                className="block px-4 py-2 text-sm text-stone hover:text-foreground hover:bg-surface transition-colors"
              >
                {child.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Navigation({ links }: NavigationProps) {
  const pathname = usePathname();
  const isDarkHero = pathname === "/founder";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const light = isDarkHero && !scrolled;
  const logoColor = light ? "text-inverse" : "text-foreground";
  const linkColor = light
    ? "text-ui text-inverse/70 hover:text-inverse"
    : "text-ui text-stone hover:text-foreground";
  const ctaClasses = light
    ? "group hidden md:inline-flex items-center gap-1.5 rounded-full border border-inverse/40 bg-transparent px-3.5 py-1.5 text-ui text-inverse transition-all duration-300 hover:bg-inverse hover:text-foreground hover:border-inverse"
    : "group hidden md:inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-transparent px-3.5 py-1.5 text-ui text-foreground transition-all duration-300 hover:bg-foreground hover:text-background hover:border-foreground";
  const burgerColor = light ? "bg-inverse" : "bg-foreground";

  const cta = links[links.length - 1];
  const navLinks = links.slice(0, -1);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,box-shadow] duration-500 ease-smooth",
        scrolled ? "nav-solid" : "nav-transparent"
      )}
    >
      <div className="container flex items-center justify-between h-16">
        <Link href="/" className={cn("font-heading text-headline", logoColor)}>
          Adamant
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) =>
            link.children ? (
              <DesktopDropdown key={link.label} link={link} light={light} />
            ) : (
              <NavItem
                key={link.href}
                link={link}
                className={cn("transition-colors duration-300", linkColor)}
              />
            )
          )}
          <MotionLink
            href={cta.href}
            className={ctaClasses}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {cta.label}
            <ArrowRight
              size={13}
              strokeWidth={2}
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </MotionLink>
        </div>
        <button
          className="md:hidden p-2 touch-target-sm"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <div aria-hidden="true" className={cn("w-5 h-0.5 mb-1 transition-transform duration-300", burgerColor, mobileOpen && "translate-y-[3px] rotate-45")} />
          <div aria-hidden="true" className={cn("w-5 h-0.5 transition-transform duration-300", burgerColor, mobileOpen && "-translate-y-[3px] -rotate-45")} />
        </button>
      </div>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: easeSpring }}
            className="md:hidden bg-background border-b border-border"
          >
            <div className="container py-4 flex flex-col gap-4">
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.label}>
                    <button
                      onClick={() =>
                        setMobileExpanded((v) => (v === link.label ? null : link.label))
                      }
                      className="flex items-center justify-between w-full text-ui text-stone touch-target"
                    >
                      {link.label}
                      <ChevronDown
                        size={14}
                        className={cn(
                          "transition-transform duration-200",
                          mobileExpanded === link.label && "rotate-180"
                        )}
                      />
                    </button>
                    <AnimatePresence>
                      {mobileExpanded === link.label && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-4 mt-2 flex flex-col gap-3">
                            {link.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                onClick={closeMobile}
                                className={cn(
                                  "text-sm touch-target",
                                  light
                                    ? "text-inverse/70 hover:text-inverse"
                                    : "text-stone hover:text-foreground"
                                )}
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <NavItem
                    key={link.href}
                    link={link}
                    onClick={closeMobile}
                    className="text-ui text-stone hover:text-foreground touch-target"
                  />
                )
              )}
              <Link
                href={cta.href}
                onClick={closeMobile}
                className={cn(
                  "flex items-center gap-1.5 text-ui touch-target",
                  light ? "text-inverse" : "text-primary"
                )}
              >
                {cta.label}
                <ArrowRight size={13} strokeWidth={2} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
