import { whatsappLink } from './site';

/**
 * Единая точка для всех заявок с сайта (форма записи, тест, тарифы, подбор программы).
 *
 * Сейчас заявка уходит в WhatsApp готовым сообщением. Когда появится база данных
 * (например, Supabase) или CRM, достаточно дописать сохранение в sendLead() —
 * все формы сайта уже вызывают именно её.
 */
export type LeadSource = 'trial' | 'quiz' | 'plan' | 'finder';

export type Lead = {
  source: LeadSource;
  /** Первая строка сообщения на языке страницы */
  greeting: string;
  /** Пары «подпись: значение»; пустые значения пропускаются */
  fields: [label: string, value: string | number | undefined][];
};

export function leadMessage(lead: Lead): string {
  return [
    lead.greeting,
    ...lead.fields.filter(([, value]) => value !== undefined && value !== '').map(([label, value]) => `${label}: ${value}`),
  ].join('\n');
}

/** Ссылка wa.me с готовым текстом — подходит и для обычных <a href>. */
export function leadUrl(lead: Lead): string {
  return whatsappLink(leadMessage(lead));
}

/** Открывает WhatsApp с заявкой и возвращает ссылку (для запасной кнопки). Только в браузере. */
export function sendLead(lead: Lead): string {
  const url = leadUrl(lead);
  // TODO (SaaS): здесь можно сохранить заявку в БД / отправить в CRM перед открытием WhatsApp.
  window.open(url, '_blank', 'noopener,noreferrer');
  return url;
}
