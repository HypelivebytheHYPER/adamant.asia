import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePage } from "@/sections/service-page";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-json-ld";
import { ServiceJsonLd } from "@/components/service-json-ld";
import { WebPageJsonLd } from "@/components/webpage-json-ld";
import { siteContent } from "@/data/content";
import { SITE_URL } from "@/lib/site";

export async function generateStaticParams() {
  return siteContent.servicePages.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = siteContent.servicePages.find((s) => s.slug === slug);

  if (!service) {
    return { title: "Not Found" };
  }

  const title = `${service.name} | Adamant`;
  const shortHook = service.hook.length > 120 ? service.hook.slice(0, 117) + "..." : service.hook;
  const description = `${shortHook} Fixed-price. Two-week delivery.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/solutions/${slug}`,
    },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      type: "article",
      url: `${SITE_URL}/solutions/${slug}`,
      images: [`${SITE_URL}/opengraph-image`],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/opengraph-image`],
    },
  };
}

export default async function SolutionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = siteContent.servicePages.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const serviceUrl = `${SITE_URL}/solutions/${slug}`;

  return (
    <>
      <WebPageJsonLd
        url={serviceUrl}
        title={`${service.name} | Adamant`}
        description={service.hook}
        pageType="ItemPage"
      />
      <ServiceJsonLd
        name={service.name}
        description={service.hook}
        url={serviceUrl}
        serviceType={service.name}
        areaServed={["SG", "TH", "MY"]}
        priceRange="$$"
        estimatedCost={{ currency: "USD", value: "3000-8000" }}
        faq={service.faq.map((item) => ({
          question: item.q,
          answer: item.a,
        }))}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${SITE_URL}/` },
          {
            name: "Solutions",
            url: `${SITE_URL}/#solutions`,
          },
          {
            name: service.name,
            url: serviceUrl,
          },
        ]}
      />
      <ServicePage
        service={service}
        allTestimonials={siteContent.testimonials}
      />
    </>
  );
}
