import Link from 'next/link';
import type { Metadata } from 'next';
import { getDict } from '@/lib/i18n';
import { asLocale } from '@/lib/locales';
import { pageMetadata } from '@/lib/seo';
import { PageHeader, Section } from '@/components/Section';
import { PricingCards } from '@/components/PricingCards';
import { CtaBanner } from '@/components/CtaBanner';

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = asLocale((await params).lang);
  const d = getDict(lang);
  return pageMetadata(lang, '/pricing', d.pricing.title, d.pricing.subtitle);
}

export default async function PricingPage({ params }: Props) {
  const lang = asLocale((await params).lang);
  const d = getDict(lang);
  const p = d.pricing;

  return (
    <>
      <PageHeader title={p.title} subtitle={p.subtitle} />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <PricingCards lang={lang} d={d} />
          <aside className="card h-fit border-gold-500/60 bg-gold-500/5 p-6 dark:bg-gold-500/5">
            <span className="font-display text-4xl font-extrabold text-gold-600 dark:text-gold-400">2×</span>
            <h2 className="mt-2 text-xl font-bold">{p.trialTitle}</h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{p.trialText}</p>
            <Link href={`/${lang}/contact/#trial`} className="btn-gold mt-6 w-full">
              {d.cta.trial}
            </Link>
          </aside>
        </div>
      </Section>

      <Section title={p.howTitle} className="border-y border-slate-200 bg-white/60 dark:border-white/10 dark:bg-white/[0.02]">
        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {p.steps.map((step, i) => (
            <li key={step.title} className="relative">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-800 font-display font-bold text-white dark:bg-brand-300 dark:text-night">
                  {i + 1}
                </span>
                {i < p.steps.length - 1 && (
                  <span className="hidden h-px flex-1 bg-slate-300 lg:block dark:bg-white/15" aria-hidden="true" />
                )}
                {i === p.steps.length - 1 && (
                  <span className="hidden font-display text-xl text-gold-600 lg:block dark:text-gold-400" aria-hidden="true">
                    ↺
                  </span>
                )}
              </div>
              <h3 className="mt-4 text-lg font-bold">{step.title}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{step.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <CtaBanner lang={lang} d={d} />
    </>
  );
}
