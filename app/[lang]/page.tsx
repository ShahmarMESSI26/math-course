import type { ReactNode } from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getDict } from '@/lib/i18n';
import { asLocale } from '@/lib/locales';
import { pageMetadata } from '@/lib/seo';
import { olympiads, teachers } from '@/lib/data';
import { whatsappLink } from '@/lib/site';
import { Section } from '@/components/Section';
import { HeroFormulas } from '@/components/HeroFormulas';
import { OlympiadGrid } from '@/components/OlympiadGrid';
import { TeacherCard } from '@/components/TeacherCard';
import { PricingCards } from '@/components/PricingCards';
import { CtaBanner } from '@/components/CtaBanner';
import { ArrowRightIcon, WhatsAppIcon } from '@/components/icons';

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = asLocale((await params).lang);
  const d = getDict(lang);
  return { ...pageMetadata(lang, '', d.meta.title, d.meta.description), title: { absolute: d.meta.title } };
}

function MoreLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="mt-8 inline-flex items-center gap-2 font-semibold text-brand-700 hover:gap-3 dark:text-brand-300">
      {children} <ArrowRightIcon className="h-4 w-4" />
    </Link>
  );
}

export default async function HomePage({ params }: Props) {
  const lang = asLocale((await params).lang);
  const d = getDict(lang);

  return (
    <>
      {/* Hero */}
      <section className="bg-grid relative overflow-hidden border-b border-slate-200 dark:border-white/10">
        <div className="page grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-2">
          <div>
            <span className="chip">{d.home.badge}</span>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">{d.home.title}</h1>
            <p className="mt-5 max-w-xl text-lg text-slate-600 dark:text-slate-400">{d.home.subtitle}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={`/${lang}/contact#trial`} className="btn-gold">
                {d.cta.trial}
              </Link>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                <WhatsAppIcon className="h-4 w-4" /> {d.cta.whatsapp}
              </a>
            </div>
            <div className="mt-10 flex flex-wrap gap-2">
              {olympiads.map((o) => (
                <Link
                  key={o.slug}
                  href={`/${lang}/materials/${o.slug}`}
                  className="rounded-lg border border-slate-300 bg-white/70 px-3 py-1.5 font-display text-sm font-bold text-brand-800 transition hover:border-gold-500 dark:border-white/15 dark:bg-white/5 dark:text-brand-200"
                >
                  {o.name}
                </Link>
              ))}
            </div>
          </div>
          <HeroFormulas />
        </div>
      </section>

      {/* Преимущества */}
      <section className="page grid gap-4 py-12 sm:grid-cols-3">
        {d.home.features.map((f, i) => (
          <div key={f.title} className="card p-6">
            <span className="font-display text-sm font-bold text-gold-600 dark:text-gold-400">0{i + 1}</span>
            <h3 className="mt-2 text-lg font-bold">{f.title}</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{f.text}</p>
          </div>
        ))}
      </section>

      <Section title={d.home.olympiadsTitle} subtitle={d.home.olympiadsSubtitle} className="pt-4">
        <OlympiadGrid lang={lang} />
        <MoreLink href={`/${lang}/materials`}>{d.cta.allMaterials}</MoreLink>
      </Section>

      <Section
        title={d.home.teachersTitle}
        subtitle={d.home.teachersSubtitle}
        className="border-y border-slate-200 bg-white/60 dark:border-white/10 dark:bg-white/[0.02]"
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {teachers.map((teacher) => (
            <TeacherCard key={teacher.slug} teacher={teacher} lang={lang} d={d} compact />
          ))}
        </div>
        <MoreLink href={`/${lang}/teachers`}>{d.cta.allTeachers}</MoreLink>
      </Section>

      <Section title={d.home.pricingTitle} subtitle={d.home.pricingSubtitle}>
        <PricingCards lang={lang} d={d} />
        <MoreLink href={`/${lang}/pricing`}>{d.cta.allPricing}</MoreLink>
      </Section>

      <CtaBanner lang={lang} d={d} />
    </>
  );
}
