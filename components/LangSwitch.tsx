'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { locales, type Locale } from '@/lib/locales';

export function LangSwitch({ lang, label }: { lang: Locale; label: string }) {
  const pathname = usePathname() || `/${lang}/`;
  // Оставляем текущую страницу, меняем только язык
  const rest = pathname.replace(/^\/(az|ru|en)(?=\/|$)/, '').replace(/\/+$/, '') + '/';

  return (
    <nav aria-label={label} className="flex rounded-full border border-slate-300 p-0.5 text-xs font-semibold dark:border-white/15">
      {locales.map((l) => {
        const active = l === lang;
        return (
          <Link
            key={l}
            href={`/${l}${rest}`}
            hrefLang={l}
            aria-current={active ? 'true' : undefined}
            className={`rounded-full px-2 py-1 transition ${
              active
                ? 'bg-brand-800 text-white dark:bg-brand-300 dark:text-night'
                : 'text-slate-600 hover:text-brand-800 dark:text-slate-300 dark:hover:text-white'
            }`}
          >
            {l.toUpperCase()}
          </Link>
        );
      })}
    </nav>
  );
}
