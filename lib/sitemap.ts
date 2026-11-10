import { olympiads } from './data';
import { locales, type Locale } from './locales';
import { SITE_URL } from './site';

/** Все страницы сайта (без языкового префикса). Добавляйте новые страницы сюда. */
export function sitemapPaths(): string[] {
  return ['', '/about', '/teachers', '/pricing', '/materials', '/contact', ...olympiads.map((o) => `/materials/${o.slug}`)];
}

export type SitemapEntry = {
  url: string;
  lastModified: Date;
  changeFrequency: 'monthly';
  priority: number;
  languages: Record<Locale, string>; // hreflang-альтернативы
};

/** Записи карты сайта для указанных языков. */
export function sitemapEntries(langs: readonly Locale[] = locales): SitemapEntry[] {
  const lastModified = new Date();
  return sitemapPaths().flatMap((path) =>
    langs.map((lang) => ({
      url: `${SITE_URL}/${lang}${path}/`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: path === '' ? 1 : 0.7,
      languages: Object.fromEntries(locales.map((l) => [l, `${SITE_URL}/${l}${path}/`])) as Record<Locale, string>,
    })),
  );
}
