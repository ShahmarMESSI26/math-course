import type { Metadata } from 'next';
import { locales, ogLocale, type Locale } from './locales';

export function pageMetadata(lang: Locale, path: string, title: string, description: string): Metadata {
  // trailingSlash: true — все адреса сайта заканчиваются на «/»
  const languages: Record<string, string> = Object.fromEntries(locales.map((l) => [l, `/${l}${path}/`]));
  languages['x-default'] = `/az${path}/`;

  return {
    title,
    description,
    alternates: { canonical: `/${lang}${path}/`, languages },
    openGraph: {
      title,
      description,
      url: `/${lang}${path}/`,
      siteName: 'Shahmath',
      locale: ogLocale[lang],
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}
