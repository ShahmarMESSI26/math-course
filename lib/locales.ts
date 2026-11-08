// Безопасно для клиентских компонентов: не тянет словари.
export const locales = ['az', 'ru', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'az';

export type L10n = Record<Locale, string>;

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function asLocale(value: string): Locale {
  return isLocale(value) ? value : defaultLocale;
}

/** Берёт строку на нужном языке, при отсутствии — азербайджанскую. */
export function t(value: L10n, lang: Locale): string {
  return value[lang] || value.az;
}

export const ogLocale: Record<Locale, string> = { az: 'az_AZ', ru: 'ru_RU', en: 'en_US' };
