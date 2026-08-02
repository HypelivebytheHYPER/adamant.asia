import type { Metadata } from "next";
import { FraudWatch } from "@/components/fraud-watch";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-json-ld";
import { WebPageJsonLd } from "@/components/webpage-json-ld";
import { SITE_URL } from "@/lib/site";

/** Live feed — refresh hourly rather than pinning headlines into the build. */
export const revalidate = 3600;

const TITLE = "Fraud Watch — data fraud, ad fraud, and bot traffic coverage";
const DESCRIPTION =
  "A running feed of reporting on ad fraud, click fraud, bot traffic, and attribution gaps. Updated hourly, linked to the original publishers.";
const URL = `${SITE_URL}/fraud-watch`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/fraud-watch" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    url: URL,
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

export default function FraudWatchPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Fraud Watch", url: URL },
        ]}
      />
      <WebPageJsonLd
        url={URL}
        title={TITLE}
        description={DESCRIPTION}
        pageType="CollectionPage"
      />
      <FraudWatch limit={12} />
    </>
  );
}
