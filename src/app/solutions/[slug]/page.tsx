import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePage } from "@/sections/service-page";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-json-ld";
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
  const description = `${service.hook} View our indicative fees. Adamant builds systems with transparent, fixed-price proposals.`;

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
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
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

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${SITE_URL}/` },
          {
            name: "Solutions",
            url: `${SITE_URL}/#solutions`,
          },
          {
            name: service.name,
            url: `${SITE_URL}/solutions/${slug}`,
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
