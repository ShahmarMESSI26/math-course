import az from '@/messages/az.json';
import ru from '@/messages/ru.json';
import en from '@/messages/en.json';
import { asLocale, type Locale } from './locales';

export type Dict = typeof az;

// Если в ru/en не хватает ключа — TypeScript покажет ошибку здесь.
const dictionaries: Record<Locale, Dict> = { az, ru, en };

export function getDict(lang: string): Dict {
  return dictionaries[asLocale(lang)];
}
