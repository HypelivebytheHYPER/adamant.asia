"use client";

import Link from "next/link";
import { CornerPlus } from "@/components/ui/corner-plus";

export function Footer() {
  return (
    <footer className="bg-foreground divider-dark relative overflow-hidden">
      <div className="absolute top-0 right-8 hidden md:block">
        <CornerPlus position="top-right" className="text-background/15" />
      </div>
      <div className="container space-strip">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-background text-foreground text-caption font-normal">
              A
            </span>
            <span className="text-ui text-background">
              adamant
            </span>
          </div>

          <nav className="flex flex-wrap gap-6 text-ui text-inverse-weak">
            <a
              href="#main"
              className="hover:text-background transition-colors duration-300"
            >
              Home
            </a>
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
              Proof
            </a>
            <a
              href="#contact"
              className="hover:text-background transition-colors duration-300"
            >
              Contact
            </a>
          </nav>

          <p className="text-caption text-inverse-muted">
            &copy; {new Date().getFullYear()} Adamant. Systems built from real human mess.
          </p>
        </div>
      </div>
    </footer>
  );
}
