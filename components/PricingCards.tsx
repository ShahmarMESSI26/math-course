import Link from 'next/link';
import type { Dict } from '@/lib/i18n';
import type { Locale } from '@/lib/locales';
import { fmt } from '@/lib/format';
import { leadUrl } from '@/lib/leads';
import { PLAN_FORMATS, PLANS } from '@/lib/site';
import { planPriceText } from '@/lib/programs';
import { CheckIcon, GlobeIcon, MapPinIcon, WhatsAppIcon } from './icons';

/** Тарифы, сгруппированные по формату: очно в Баку и онлайн / индивидуально. */
export function PricingCards({ lang, d }: { lang: Locale; d: Dict }) {
  const p = d.pricing;

  return (
    <div className="space-y-12">
      {PLAN_FORMATS.map((format) => {
        const info = p.formats[format];
        const Icon = format === 'baku' ? MapPinIcon : GlobeIcon;
        return (
          <div key={format}>
            <div className="mb-6 flex items-start gap-4">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-800 dark:bg-white/10 dark:text-brand-200">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-2xl font-bold">{info.title}</h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{info.text}</p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {PLANS.filter((plan) => plan.format === format).map((plan) => {
                const text = p.plans[plan.key];
                const price = planPriceText(plan.price, d);
                const waUrl = leadUrl({
                  source: 'plan',
                  greeting: fmt(p.msgPlan, { plan: text.name }),
                  fields: [
                    [p.msgFormat, info.title],
                    [p.msgPrice, price],
                    [p.msgLang, d.common.langName],
                  ],
                });
                return (
                  <div
                    key={plan.key}
                    className={`card relative flex flex-col p-7 transition hover:-translate-y-0.5 hover:shadow-lg ${
                      plan.featured ? 'ring-2 ring-gold-500 md:scale-[1.02]' : ''
                    }`}
                  >
                    {plan.featured && (
                      <span className="absolute -top-3 left-7 rounded-full bg-gold-500 px-3 py-1 text-xs font-bold text-brand-950 shadow">
                        ★ {p.featured}
                      </span>
                    )}
                    <h4 className="font-display text-xl font-bold text-brand-900 dark:text-white">{text.name}</h4>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{text.desc}</p>
                    <p className="mt-6 flex items-baseline gap-2">
                      {plan.price === null ? (
                        <span className="font-display text-2xl font-extrabold text-brand-900 dark:text-white">{d.common.priceOnRequest}</span>
                      ) : (
                        <>
                          <span className="font-display text-5xl font-extrabold text-brand-900 dark:text-white">{plan.price}</span>
                          <span className="text-slate-500 dark:text-slate-400">{d.common.perMonth}</span>
                        </>
                      )}
                    </p>
                    <ul className="mt-6 flex-1 space-y-2.5 text-sm">
                      {text.features.map((f) => (
                        <li key={f} className="flex items-start gap-2">
                          <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-600 dark:text-gold-400" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8 grid gap-2">
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${plan.featured ? 'btn-gold' : 'btn-whatsapp'} w-full`}
                      >
                        <WhatsAppIcon className="h-4 w-4" /> {p.choosePlan}
                      </a>
                      <Link href={`/${lang}/test/`} className="btn-ghost w-full">
                        {d.cta.test}
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
