"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-foreground border-t border-border/10">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-background text-foreground text-caption font-normal">
              A
            </span>
            <span className="text-ui text-background">
              adamant
            </span>
          </div>

          <nav className="flex flex-wrap gap-6 text-ui text-dim">
            <Link
              href="/"
              className="hover:text-background transition-colors duration-300"
            >
              Home
            </Link>
            <a
              href="#problem"
              className="hover:text-background transition-colors duration-300"
            >
              Problem
            </a>
            <a
              href="#process"
              className="hover:text-background transition-colors duration-300"
            >
              Process
            </a>
            <a
              href="#proof"
              className="hover:text-background transition-colors duration-300"
            >
              Work
            </a>
            <a
              href="#partner"
              className="hover:text-background transition-colors duration-300"
            >
              Contact
            </a>
          </nav>

          <p className="text-caption text-stone">
            &copy; {new Date().getFullYear()} Adamant. Built from human mess.
          </p>
        </div>
      </div>
    </footer>
  );
}
