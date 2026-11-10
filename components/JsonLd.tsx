import type { Locale } from '@/lib/locales';
import { SITE_URL } from '@/lib/site';

/** Структурированные данные для поисковиков (schema.org). */
export function JsonLd({ lang }: { lang: Locale }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Shahmath',
    url: `${SITE_URL}/${lang}/`,
    logo: `${SITE_URL}/favicon.svg`,
    telephone: '+994506166262',
    address: { '@type': 'PostalAddress', addressLocality: 'Baku', addressCountry: 'AZ' },
    areaServed: ['Baku', 'Zaqatala', 'Online'],
    knowsAbout: ['IMO', 'JBMO', 'RFO', 'BOM', 'IZhO', 'EGMO', 'Mathematical olympiads'],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
