import Link from 'next/link';
import type { Dict } from '@/lib/i18n';
import type { Locale } from '@/lib/locales';
import { PLANS } from '@/lib/site';
import { CheckIcon } from './icons';

export function PricingCards({ lang, d }: { lang: Locale; d: Dict }) {
  return (
    <div className="grid max-w-4xl gap-6 md:grid-cols-2">
      {PLANS.map((p) => {
        const plan = d.pricing.plans[p.key];
        return (
          <div key={p.key} className={`card relative p-7 ${p.featured ? 'ring-2 ring-gold-500' : ''}`}>
            {p.featured && (
              <span className="absolute -top-3 left-7 rounded-full bg-gold-500 px-3 py-1 text-xs font-bold text-brand-950">
                {d.pricing.featured}
              </span>
            )}
            <h3 className="text-xl font-bold">{plan.name}</h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{plan.desc}</p>
            <p className="mt-6 flex items-baseline gap-2">
              <span className="font-display text-5xl font-extrabold text-brand-900 dark:text-white">{p.price}</span>
              <span className="text-slate-500 dark:text-slate-400">{d.common.perMonth}</span>
            </p>
            <ul className="mt-6 space-y-2.5 text-sm">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-600 dark:text-gold-400" />
                  {f}
                </li>
              ))}
            </ul>
            <Link href={`/${lang}/contact#trial`} className={`${p.featured ? 'btn-gold' : 'btn-primary'} mt-8 w-full`}>
              {d.cta.trial}
            </Link>
          </div>
        );
      })}
    </div>
  );
}
