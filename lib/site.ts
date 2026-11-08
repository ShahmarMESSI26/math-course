export const SITE_URL = 'https://shahmath.az';

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
  { href: '/contact', key: 'contact' },
] as const;

/** Стоимость в AZN за месяц. Меняйте здесь. */
export const PLANS = [
  { key: 'one', price: 250, featured: false },
  { key: 'two', price: 500, featured: true },
] as const;

/** Карты (Google Maps embed, ключ не нужен). Замените запрос на точный адрес. */
export const MAPS = {
  baku: 'https://www.google.com/maps?q=Bak%C4%B1&z=12&output=embed',
  zaqatala: 'https://www.google.com/maps?q=Zaqatala&z=13&output=embed',
};
