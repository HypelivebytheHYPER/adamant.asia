import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getPostBySlug, getAllPosts, getRelatedPosts } from "@/data/blog";
import { SITE_URL } from "@/lib/site";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-json-ld";
import { ArticleJsonLd } from "@/components/article-json-ld";
import { FaqJsonLd } from "@/components/faq-json-ld";
import { WebPageJsonLd } from "@/components/webpage-json-ld";

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Not Found" };

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    authors: [{ name: post.author.name }],
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: `${SITE_URL}/blog/${slug}`,
      authors: [post.author.name],
      publishedTime: post.publishedAt,
      modifiedTime: post.modifiedAt,
      images: [post.image.url],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.image.url],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = post.relatedPosts ? getRelatedPosts(post.relatedPosts) : [];
  const authorUrl = `${SITE_URL}/founder`;
  const postUrl = `${SITE_URL}/blog/${slug}`;

  return (
    <>
      <WebPageJsonLd
        url={postUrl}
        title={post.title}
        description={post.description}
        datePublished={post.publishedAt}
        dateModified={post.modifiedAt || post.publishedAt}
        image={post.image.url}
        pageType="ItemPage"
      />
      <ArticleJsonLd
        title={post.title}
        description={post.description}
        url={postUrl}
        publishedAt={post.publishedAt}
        modifiedAt={post.modifiedAt}
        author={{
          name: post.author.name,
          url: authorUrl,
          knowsAbout: [
            "SaaS Development",
            "AI Workflow Automation",
            "Marketing Systems",
            "Campaign Management",
          ],
        }}
        image={post.image.url}
        imageWidth={1200}
        imageHeight={630}
        keywords={post.keywords}
        schemaType="BlogPosting"
        speakableSelector="#direct-answer"
        wordCount={post.readTime * 200}
      />
      <FaqJsonLd
        items={post.faq.map((f) => ({ question: f.q, answer: f.a }))}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${SITE_URL}/` },
          { name: "Blog", url: `${SITE_URL}/blog` },
          { name: post.title, url: postUrl },
        ]}
      />

      <main className="min-h-screen bg-background" id="main">
        <article className="mx-auto max-w-3xl px-4 sm:px-6 pt-24 sm:pt-32 pb-20">
          {/* Header */}
          <header className="mb-12">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground mb-6">
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
              <Link
                href="/founder"
                className="hover:underline underline-offset-2"
              >
                {post.author.name}
              </Link>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground mb-6 leading-tight">
              {post.title}
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground italic border-l-2 border-foreground/20 pl-4 break-words">
              Target AI query: &ldquo;{post.targetQuery}&rdquo;
            </p>
          </header>

          {/* Featured Image — Unsplash (free license) */}
          <figure className="relative w-full aspect-[16/9] rounded-xl overflow-hidden mb-10 border border-border">
            <Image
              src={post.image.url}
              alt={post.image.alt}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </figure>

          {/* Direct Answer — AI Citation Block */}
          <div id="direct-answer" className="bg-accent/40 rounded-xl p-6 sm:p-8 mb-12">
            <p className="text-lg sm:text-xl text-foreground leading-relaxed font-medium">
              {post.directAnswer}
            </p>
          </div>

          {/* Comparison Tables */}
          {post.comparisonTables?.map((table, ti) => (
            <div key={ti} className="mb-12">
              <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-6">
                {table.heading}
              </h2>
              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-muted/50 border-b border-border">
                      {table.headers.map((h, hi) => (
                        <th
                          key={hi}
                          className="text-left font-semibold text-foreground px-2 sm:px-4 py-2 sm:py-3"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {table.rows.map((row, ri) => (
                      <tr
                        key={ri}
                        className="border-b border-border last:border-b-0 hover:bg-accent/20 transition-colors"
                      >
                        {row.map((cell, ci) => (
                          <td
                            key={ci}
                            className="px-2 sm:px-4 py-2 sm:py-3 text-muted-foreground"
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}

          {/* Content Sections */}
          <div className="space-y-12">
            {post.sections.map((section, si) => (
              <section key={si}>
                <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-4">
                  {section.heading}
                </h2>
                <div className="space-y-4">
                  {section.paragraphs.map((p, pi) => (
                    <p key={pi} className="text-base text-muted-foreground leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>
                {section.bullets && section.bullets.length > 0 && (
                  <ul className="mt-4 space-y-2 list-disc list-outside ml-5">
                    {section.bullets.map((b, bi) => (
                      <li key={bi} className="text-base text-muted-foreground leading-relaxed pl-1">
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          {/* Post-specific CTA */}
          {slug === "saas-development-cost" && (
            <div className="mt-12 p-6 sm:p-8 rounded-xl border border-border bg-muted/30">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                See Adamant&apos;s fixed pricing
              </h3>
              <p className="text-muted-foreground mb-4">
                No hidden fees. No negotiation. Every service has a published price.
              </p>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center min-h-[48px] px-6 py-2.5 bg-foreground text-background font-medium rounded-lg hover:bg-primary transition-colors"
              >
                View pricing →
              </Link>
            </div>
          )}

          {/* FAQ Section */}
          <section className="mt-16 pt-10 border-t border-border">
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-8">
              Frequently asked questions
            </h2>
            <div className="space-y-6">
              {post.faq.map((item, fi) => (
                <details
                  key={fi}
                  className="group border border-border rounded-lg overflow-hidden open:border-foreground/20"
                >
                  <summary className="cursor-pointer px-5 py-4 text-foreground font-medium hover:bg-accent/30 transition-colors flex items-center justify-between gap-4 list-none">
                    <span>{item.q}</span>
                    <svg
                      className="shrink-0 w-5 h-5 text-muted-foreground transition-transform group-open:rotate-180"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </summary>
                  <div className="px-5 pb-4 text-base text-muted-foreground leading-relaxed">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </section>

          {/* Image Credit */}
          <div className="mt-12 text-center">
            <p className="text-xs text-muted-foreground/60">
              Photo by{" "}
              <a
                href={`https://unsplash.com/photos/${post.image.unsplashId.replace("photo-", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-muted-foreground"
              >
                Unsplash
              </a>
              {" "}(free to use under{" "}
              <a
                href="https://unsplash.com/license"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-muted-foreground"
              >
                Unsplash License
              </a>
              )
            </p>
          </div>

          {/* Author Block */}
          <footer className="mt-16 pt-10 border-t border-border">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-foreground/10 flex items-center justify-center text-lg font-semibold text-foreground shrink-0">
                {post.author.name[0]}
              </div>
              <div>
                <p className="font-medium text-foreground">{post.author.name}</p>
                <p className="text-sm text-muted-foreground">{post.author.role}</p>
                <p className="text-sm text-muted-foreground mt-1 max-w-md">
                  {post.author.bio}
                </p>
                <Link
                  href="/founder"
                  className="text-sm text-foreground underline underline-offset-2 mt-2 inline-block hover:no-underline"
                >
                  View profile →
                </Link>
              </div>
            </div>
          </footer>

          {/* Related Posts */}
          {related.length > 0 && (
            <aside className="mt-16 pt-10 border-t border-border">
              <h3 className="text-lg font-semibold text-foreground mb-6">
                Related guides
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {related.map((rp) => (
                  <Link
                    key={rp.slug}
                    href={`/blog/${rp.slug}`}
                    className="block p-4 rounded-lg border border-border hover:border-foreground/30 hover:bg-accent/20 transition-colors group"
                  >
                    <h4 className="text-base font-medium text-foreground group-hover:underline underline-offset-2 decoration-1">
                      {rp.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {rp.directAnswer}
                    </p>
                  </Link>
                ))}
              </div>
            </aside>
          )}
        </article>
      </main>
    </>
  );
}
