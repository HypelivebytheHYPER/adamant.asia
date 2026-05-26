"use client";

import type { SectionContent, NavLinkContent } from "@/data/content";

interface FooterProps {
  content: SectionContent;
  navLinks: NavLinkContent[];
}

export function Footer({ content, navLinks }: FooterProps) {
  return (
    <footer className="bg-foreground divider-dark relative overflow-hidden">
      <div className="container space-strip">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-background text-foreground text-caption font-normal">
              A
            </span>
            <span className="text-ui text-background">{content.headline}</span>
          </div>

          <nav className="flex flex-wrap gap-6 text-ui text-inverse-weak">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-background transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <p className="text-caption text-inverse-muted">
            &copy; {new Date().getFullYear()} Adamant.
          </p>
        </div>
      </div>
    </footer>
  );
}
