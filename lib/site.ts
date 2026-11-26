/**
 * Адрес сайта для sitemap, canonical, hreflang и robots.
 * 1. NEXT_PUBLIC_SITE_URL — если задан вручную (например, после покупки домена).
 * 2. VERCEL_PROJECT_PRODUCTION_URL — Vercel подставляет сам (xxx.vercel.app или свой домен).
 * 3. localhost — при локальной разработке.
 * Используется только на сервере / при сборке.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000')
).replace(/\/+$/, '');

export const PHONE_DISPLAY = '+994 50 616 62 62';
export const PHONE_TEL = 'tel:+994506166262';
export const WHATSAPP_NUMBER = '994506166262';

export function whatsappLink(text?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export const TOPICS = ['algebra', 'geometry', 'combinatorics', 'number-theory'] as const;
export type Topic = (typeof TOPICS)[number];

export const NAV = [
  { href: '', key: 'home' },
  { href: '/about', key: 'about' },
  { href: '/teachers', key: 'teachers' },
  { href: '/pricing', key: 'pricing' },
  { href: '/materials', key: 'materials' },
  { href: '/problems', key: 'problems' },
  { href: '/contact', key: 'contact' },
] as const;

/** Классы, которые можно выбрать в формах. */
export const GRADES = ['4', '5', '6', '7', '8', '9', '10', '11'] as const;

/**
 * Тарифы. Стоимость в AZN за месяц; null — «цена по запросу».
 * format: 'baku' — очные группы в Баку, 'online' — онлайн / индивидуально (любая страна).
 * Названия и пункты тарифов — в messages/*.json → pricing.plans.<key>.
 */
export const PLANS = [
  { key: 'one', format: 'baku', price: 250, featured: false },
  { key: 'two', format: 'baku', price: 500, featured: true },
  { key: 'online', format: 'online', price: null, featured: false },
  { key: 'individual', format: 'online', price: null, featured: false },
] as const satisfies readonly { key: string; format: 'baku' | 'online'; price: number | null; featured: boolean }[];

export type PlanKey = (typeof PLANS)[number]['key'];
export const PLAN_FORMATS = ['baku', 'online'] as const;

/** Карты (Google Maps embed, ключ не нужен). Замените запрос на точный адрес. */
export const MAPS = {
  baku: 'https://www.google.com/maps?q=Bak%C4%B1&z=12&output=embed',
  zaqatala: 'https://www.google.com/maps?q=Zaqatala&z=13&output=embed',
};
