import type { Metadata } from 'next';
import { getDict } from '@/lib/i18n';
import { asLocale } from '@/lib/locales';
import { pageMetadata } from '@/lib/seo';
import { olympiads } from '@/lib/data';
import { PageHeader, Section } from '@/components/Section';
import { OlympiadGrid } from '@/components/OlympiadGrid';
import { MaterialsExplorer } from '@/components/MaterialsExplorer';

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = asLocale((await params).lang);
  const d = getDict(lang);
  return pageMetadata(lang, '/materials', d.materials.title, d.materials.subtitle);
}

export default async function MaterialsPage({ params }: Props) {
  const lang = asLocale((await params).lang);
  const d = getDict(lang);

  return (
    <>
      <PageHeader title={d.materials.title} subtitle={d.materials.subtitle} />
      <Section>
        <OlympiadGrid lang={lang} />
      </Section>
      <Section title={d.materials.browseTitle} className="pt-0">
        <MaterialsExplorer olympiads={olympiads} lang={lang} d={d} />
      </Section>
    </>
  );
}
