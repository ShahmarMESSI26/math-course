import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getDict } from '@/lib/i18n';
import { asLocale, t } from '@/lib/locales';
import { pageMetadata } from '@/lib/seo';
import { getOlympiad, olympiads } from '@/lib/data';
import { PageHeader, Section } from '@/components/Section';
import { MaterialsExplorer } from '@/components/MaterialsExplorer';
import { PdfLink } from '@/components/PdfLink';

type Props = { params: Promise<{ lang: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return olympiads.map((o) => ({ slug: o.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang: raw, slug } = await params;
  const lang = asLocale(raw);
  const o = getOlympiad(slug);
  if (!o) return {};
  return pageMetadata(lang, `/materials/${o.slug}`, `${o.name} — ${t(o.fullName, lang)}`, t(o.description, lang));
}

export default async function OlympiadPage({ params }: Props) {
  const { lang: raw, slug } = await params;
  const lang = asLocale(raw);
  const d = getDict(lang);
  const m = d.materials;
  const o = getOlympiad(slug);
  if (!o) notFound();

  return (
    <>
      <PageHeader title={o.name} subtitle={t(o.fullName, lang)}>
        <Link href={`/${lang}/materials/`} className="mb-4 inline-block text-sm font-medium text-brand-700 hover:underline dark:text-brand-300">
          ← {m.back}
        </Link>
      </PageHeader>

      <section className="page grid gap-8 py-12 lg:grid-cols-3">
        <div className="space-y-10 lg:col-span-2">
          <div className="card p-6">
            <p className="leading-relaxed">{t(o.description, lang)}</p>
            <dl className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">{m.level}</dt>
                <dd className="mt-1 font-medium">{t(o.level, lang)}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">{m.format}</dt>
                <dd className="mt-1 font-medium">{t(o.format, lang)}</dd>
              </div>
            </dl>
            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{m.topicsTitle}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {o.topics.map((tp) => (
                  <span key={tp} className="chip">
                    {d.topics[tp]}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold">{m.yearsTitle}</h2>
            <div className="card mt-4 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500 dark:border-white/10">
                  <tr>
                    <th className="px-5 py-3">{m.yearCol}</th>
                    <th className="px-5 py-3">PDF</th>
                    <th className="hidden px-5 py-3 sm:table-cell">{m.topicsTitle}</th>
                  </tr>
                </thead>
                <tbody>
                  {o.years.map((y) => {
                    const yearTopics = Array.from(new Set(y.items.map((i) => i.topic)));
                    return (
                      <tr key={y.year} className="border-b border-slate-100 last:border-0 dark:border-white/5">
                        <td className="px-5 py-4 font-display text-base font-bold">{y.year}</td>
                        <td className="px-5 py-4">
                          <div className="flex flex-col gap-1.5">
                            <PdfLink href={y.problems} label={m.problemsPdf} soon={d.common.soon} />
                            <PdfLink href={y.solutions} label={m.solutionsPdf} soon={d.common.soon} />
                          </div>
                        </td>
                        <td className="hidden px-5 py-4 sm:table-cell">
                          <div className="flex flex-wrap gap-1.5">
                            {yearTopics.length ? (
                              yearTopics.map((tp) => (
                                <span key={tp} className="chip">
                                  {d.topics[tp]}
                                </span>
                              ))
                            ) : (
                              <span className="text-slate-400">—</span>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <aside>
          <div className="card sticky top-24 p-6">
            <h2 className="text-xl font-bold">{d.home.ctaTitle}</h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{d.home.ctaText}</p>
            <Link href={`/${lang}/contact/#trial`} className="btn-gold mt-6 w-full">
              {d.cta.trial}
            </Link>
          </div>
        </aside>
      </section>

      <Section title={m.browseTitle} className="pt-0">
        <MaterialsExplorer olympiads={[o]} lang={lang} d={d} showOlympiadFilter={false} />
      </Section>
    </>
  );
}
