import type { MetadataRoute } from 'next';
import { locales } from '@/lib/locales';
import { SITE_URL } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: [`${SITE_URL}/sitemap.xml`, ...locales.map((l) => `${SITE_URL}/${l}/sitemap.xml`)],
    host: SITE_URL,
  };
}
