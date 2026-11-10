import { isLocale, locales } from '@/lib/locales';
import { sitemapEntries } from '@/lib/sitemap';

// Языковая карта сайта: /az/sitemap.xml, /ru/sitemap.xml, /en/sitemap.xml.
// Содержит только страницы своего языка — так её примет ресурс Search Console
// с префиксом <адрес сайта>/az/.

export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

const escapeXml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export async function GET(_request: Request, { params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) {
    return new Response('Not found', { status: 404 });
  }

  const urls = sitemapEntries([lang])
    .map((entry) => {
      const alternates = Object.entries(entry.languages)
        .map(([hreflang, href]) => `    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${escapeXml(href)}" />`)
        .join('\n');
      return [
        '  <url>',
        `    <loc>${escapeXml(entry.url)}</loc>`,
        alternates,
        `    <lastmod>${entry.lastModified.toISOString()}</lastmod>`,
        `    <changefreq>${entry.changeFrequency}</changefreq>`,
        `    <priority>${entry.priority}</priority>`,
        '  </url>',
      ].join('\n');
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
