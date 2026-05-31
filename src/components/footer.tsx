import Image from "next/image";
import Link from "next/link";
import type { SectionContent, NavLinkContent } from "@/data/content";
import { CONTACT_EMAIL } from "@/lib/site";

interface FooterProps {
  content: SectionContent;
  navLinks: NavLinkContent[];
  year: number;
}

function FooterLink({ link }: { link: NavLinkContent }) {
  if (link.href.startsWith("#")) {
    return (
      <a href={link.href} className="hover:text-background transition-colors duration-300">
        {link.label}
      </a>
    );
  }
  return (
    <Link href={link.href} className="hover:text-background transition-colors duration-300">
      {link.label}
    </Link>
  );
}

export function Footer({ content, navLinks, year }: FooterProps) {
  return (
    <footer className="bg-foreground divider-dark relative overflow-hidden">
      <div className="container space-strip">
        {/* Row 1: Logo + Nav + Copyright */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logo.png"
              alt="Adamant"
              width={28}
              height={28}
              unoptimized
              className="h-6 w-auto object-contain rounded"
            />
            <span className="text-ui text-background">{content.headline}</span>
          </Link>

          <nav className="flex flex-wrap gap-6 text-ui text-inverse-weak">
            {navLinks.map((link) => (
              <FooterLink key={link.href} link={link} />
            ))}
          </nav>

          <p className="text-caption text-inverse-muted">
            &copy; {year} Adamant.
          </p>
        </div>

        {/* Row 2: Contact */}
        <div className="mt-4 pt-4 border-t border-background/10 flex flex-wrap items-center gap-x-6 gap-y-2 text-caption text-inverse-muted">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="hover:text-background transition-colors"
          >
            {CONTACT_EMAIL}
          </a>
          <a
            href="https://wa.me/6589211191"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-background transition-colors"
          >
            WhatsApp +65 8921 1191
          </a>
        </div>
      </div>
    </footer>
  );
}
