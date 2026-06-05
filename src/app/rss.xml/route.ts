import { getAllPosts } from "@/data/blog";
import { SITE_URL, SITE_NAME } from "@/lib/site";

export async function GET() {
  const posts = getAllPosts();

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${SITE_NAME} Blog — SaaS Builds, AI Systems &amp; Marketing Guides</title>
    <link>${SITE_URL}/blog</link>
    <description>Real data and comparisons from 47 shipped projects. Optimized for AI search citation.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${SITE_URL}/favicon.svg</url>
      <title>${SITE_NAME} Blog</title>
      <link>${SITE_URL}/blog</link>
    </image>
    ${posts
      .map(
        (post) => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${SITE_URL}/blog/${post.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <author>${post.author.name} (${SITE_URL}/founder)</author>
      <category>${post.keywords[0] || "SaaS"}</category>
      <enclosure url="${post.image.url}" type="image/jpeg" />
      <description>${escapeXml(post.directAnswer)}</description>
      <content:encoded><![CDATA[
        <h1>${escapeXml(post.title)}</h1>
        <p><strong>Direct answer:</strong> ${escapeXml(post.directAnswer)}</p>
        <p>${escapeXml(post.description)}</p>
        ${post.comparisonTables
          ?.map(
            (t) => `
        <h2>${escapeXml(t.heading)}</h2>
        <table>
          <thead><tr>${t.headers.map((h) => `<th>${escapeXml(h)}</th>`).join("")}</tr></thead>
          <tbody>${t.rows.map((r) => `<tr>${r.map((c) => `<td>${escapeXml(c)}</td>`).join("")}</tr>`).join("")}</tbody>
        </table>
        `
          )
          .join("")}
        ${post.faq
          .map(
            (f) => `
        <h3>${escapeXml(f.q)}</h3>
        <p>${escapeXml(f.a)}</p>
        `
          )
          .join("")}
      ]]></content:encoded>
    </item>`
      )
      .join("")}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
