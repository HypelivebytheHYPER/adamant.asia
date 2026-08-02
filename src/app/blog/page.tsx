import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/data/blog";
import { SITE_URL } from "@/lib/site";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-json-ld";
import { WebPageJsonLd } from "@/components/webpage-json-ld";

export const metadata: Metadata = {
  title: "Blog — SaaS, AI & Marketing Guides | Adamant",
  description:
    "Guides and comparisons on SaaS mini builds, AI workflow automation, and marketing systems. Real data from 47 shipped projects.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog — SaaS, AI & Marketing Guides | Adamant",
    description: "Real data and comparisons from 47 shipped projects.",
    type: "website",
    url: `${SITE_URL}/blog`,
    images: [`${SITE_URL}/opengraph-image`],
  },
  twitter: {
    card: "summary_large_image",
    images: [`${SITE_URL}/opengraph-image`],
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <WebPageJsonLd
        url={`${SITE_URL}/blog`}
        title="Blog — SaaS, AI & Marketing Guides | Adamant"
        description="Guides and comparisons on SaaS mini builds, AI workflow automation, and marketing systems. Real data from 47 shipped projects."
        pageType="CollectionPage"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${SITE_URL}/` },
          { name: "Blog", url: `${SITE_URL}/blog` },
        ]}
      />
      <main className="min-h-screen bg-background" id="main">
        <section className="mx-auto max-w-3xl px-4 sm:px-6 pt-24 sm:pt-32 pb-20">
          <header className="mb-16">
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground mb-4">
              Guides & Comparisons
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Real data from 47 shipped projects — SaaS builds, AI workflows,
              and marketing systems. Optimized for AI search citation.
            </p>
          </header>

          <div className="space-y-10">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="group border-b border-border pb-10 last:border-b-0"
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="block focus-visible:ring-2 focus-visible:ring-foreground/20 rounded-lg -mx-3 px-3 py-2 transition-colors hover:bg-accent/30"
                >
                  {/* Thumbnail — Unsplash (free license) */}
                  <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden mb-4 border border-border">
                    <Image
                      src={post.image.url}
                      alt={post.image.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 600px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground mb-3">
                    <time dateTime={post.publishedAt}>
                      {new Date(post.publishedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                    <span aria-hidden="true">·</span>
                    <span>{post.readTime} min read</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-xs px-2 py-0.5 bg-accent rounded-full">
                      {post.author.name}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-3 group-hover:underline underline-offset-4 decoration-1">
                    {post.title}
                  </h2>
                  <p className="text-base text-muted-foreground leading-relaxed line-clamp-2">
                    {post.directAnswer}
                  </p>
                  {post.keywords.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {post.keywords.slice(0, 4).map((kw) => (
                        <span
                          key={kw}
                          className="text-xs text-muted-foreground/70 px-2 py-0.5 border border-border rounded-md"
                        >
                          {kw}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
