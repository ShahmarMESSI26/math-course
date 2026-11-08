import type { MetadataRoute } from 'next';
import { olympiads } from '@/lib/data';
import { locales } from '@/lib/locales';
import { SITE_URL } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['', '/about', '/teachers', '/pricing', '/materials', '/contact', ...olympiads.map((o) => `/materials/${o.slug}`)];

  return paths.flatMap((path) =>
    locales.map((lang) => ({
      url: `${SITE_URL}/${lang}${path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: path === '' ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, `${SITE_URL}/${l}${path}`])),
      },
    })),
  );
}
