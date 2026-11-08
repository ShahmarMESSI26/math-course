import Link from 'next/link';
import { olympiads } from '@/lib/data';
import { t, type Locale } from '@/lib/locales';
import { ArrowRightIcon } from './icons';

export function OlympiadGrid({ lang }: { lang: Locale }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {olympiads.map((o) => (
        <Link
          key={o.slug}
          href={`/${lang}/materials/${o.slug}`}
          className="card group p-6 transition hover:-translate-y-0.5 hover:border-gold-500 hover:shadow-md dark:hover:border-gold-500"
        >
          <div className="flex items-start justify-between">
            <span className="font-display text-3xl font-extrabold text-brand-800 dark:text-brand-200">{o.name}</span>
            <ArrowRightIcon className="h-5 w-5 text-slate-400 transition group-hover:translate-x-1 group-hover:text-gold-500" />
          </div>
          <p className="mt-2 font-medium text-slate-800 dark:text-slate-200">{t(o.fullName, lang)}</p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{t(o.level, lang)}</p>
        </Link>
      ))}
    </div>
  );
}
