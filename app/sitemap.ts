import type { MetadataRoute } from 'next';
import { sitemapEntries } from '@/lib/sitemap';

// Общая карта сайта: <адрес сайта>/sitemap.xml (все языки)
export default function sitemap(): MetadataRoute.Sitemap {
  return sitemapEntries().map(({ languages, ...entry }) => ({
    ...entry,
    alternates: { languages },
  }));
}
