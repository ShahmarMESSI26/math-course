import type { Metadata } from 'next';
import { getDict } from '@/lib/i18n';
import { asLocale } from '@/lib/locales';
import { pageMetadata } from '@/lib/seo';
import { PageHeader, Section } from '@/components/Section';
import { CtaBanner } from '@/components/CtaBanner';
import { GlobeIcon, MapPinIcon } from '@/components/icons';

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = asLocale((await params).lang);
  const d = getDict(lang);
  return pageMetadata(lang, '/about', d.about.title, d.about.subtitle);
}

export default async function AboutPage({ params }: Props) {
  const lang = asLocale((await params).lang);
  const d = getDict(lang);
  const a = d.about;

  const locations = [
    { ...a.baku, icon: MapPinIcon, soon: false },
    { ...a.zaqatala, icon: MapPinIcon, soon: true },
    { ...a.online, icon: GlobeIcon, soon: false },
  ];

  return (
    <>
      <PageHeader title={a.title} subtitle={a.subtitle} />

      <Section>
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold">{a.missionTitle}</h2>
          </div>
          <p className="text-lg leading-relaxed text-slate-700 lg:col-span-3 dark:text-slate-300">{a.missionText}</p>
        </div>
      </Section>

      <Section title={a.locationsTitle} className="border-y border-slate-200 bg-white/60 dark:border-white/10 dark:bg-white/[0.02]">
        <div className="grid gap-6 md:grid-cols-3">
          {locations.map(({ icon: Icon, ...loc }) => (
            <div key={loc.name} className="card p-6">
              <div className="flex items-center justify-between">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-800 dark:bg-white/10 dark:text-brand-200">
                  <Icon className="h-5 w-5" />
                </span>
                {loc.soon && <span className="chip border-gold-500 text-gold-700 dark:text-gold-400">{d.common.soon}</span>}
              </div>
              <h3 className="mt-4 text-xl font-bold">{loc.name}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{loc.text}</p>
              <p className="mt-4 text-sm font-medium text-slate-500 dark:text-slate-400">{loc.address}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title={a.valuesTitle}>
        <div className="grid gap-6 md:grid-cols-3">
          {a.values.map((v, i) => (
            <div key={v.title} className="border-l-2 border-gold-500 pl-5">
              <span className="font-display text-sm font-bold text-gold-600 dark:text-gold-400">0{i + 1}</span>
              <h3 className="mt-1 text-lg font-bold">{v.title}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{v.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <CtaBanner lang={lang} d={d} />
    </>
  );
}
