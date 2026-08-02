import type { Metadata } from "next";

/**
 * Admin layout — blocks all admin pages from search engines.
 */
export const metadata: Metadata = {
  title: "Admin — Adamant",
  description: "Adamant internal admin dashboard. Not publicly indexed.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    noarchive: true,
    nosnippet: true,
    noimageindex: true,
  },
  openGraph: {
    title: "Admin — Adamant",
    description: "Internal diagnostics dashboard",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Admin — Adamant",
  },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
