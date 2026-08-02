import { CampaignHubDemo } from "@/components/campaign-hub-demo";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-json-ld";
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Marketing System Demo | Adamant",
  description:
    "Interactive preview of a KOL campaign dashboard \u2014 influencer roster, pipeline tracking, activity feed, and approval queue.",
  alternates: {
    canonical: "/demo",
  },
  robots: { index: true, follow: true },
  openGraph: {
    url: `${SITE_URL}/demo`,
    title: "Campaign Hub \u2014 Demo | Adamant",
    description:
      "See what a working campaign system looks like. No spreadsheets, no chasing.",
    type: "article",
    images: [`${SITE_URL}/opengraph-image`],
  },
  twitter: {
    card: "summary_large_image",
    title: "Campaign Hub \u2014 Demo | Adamant",
    description: "See what a working campaign system looks like.",
    images: [`${SITE_URL}/opengraph-image`],
  },
};

export default function DemoPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${SITE_URL}/` },
          { name: "Demo", url: `${SITE_URL}/demo` },
        ]}
      />
      <main className="bg-background flex flex-col items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-4xl space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-display text-foreground">
              What a working system looks like
            </h1>
            <p className="text-body text-stone max-w-md mx-auto">
              This is a live preview \u2014 no spreadsheets, no chasing. Everything flows in one place.
            </p>
          </div>

          <CampaignHubDemo />

          <p className="text-center text-xs text-stone/60">
            All data shown is simulated for demonstration.
          </p>
        </div>
      </main>
    </>
  );
}
