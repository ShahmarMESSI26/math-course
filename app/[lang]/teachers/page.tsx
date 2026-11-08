import type { Metadata } from 'next';
import { getDict } from '@/lib/i18n';
import { asLocale } from '@/lib/locales';
import { pageMetadata } from '@/lib/seo';
import { teachers } from '@/lib/data';
import { PageHeader, Section } from '@/components/Section';
import { TeacherCard } from '@/components/TeacherCard';
import { CtaBanner } from '@/components/CtaBanner';

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = asLocale((await params).lang);
  const d = getDict(lang);
  return pageMetadata(lang, '/teachers', d.teachers.title, d.teachers.subtitle);
}

export default async function TeachersPage({ params }: Props) {
  const lang = asLocale((await params).lang);
  const d = getDict(lang);

  return (
    <>
      <PageHeader title={d.teachers.title} subtitle={d.teachers.subtitle} />
      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {teachers.map((teacher) => (
            <TeacherCard key={teacher.slug} teacher={teacher} lang={lang} d={d} />
          ))}
        </div>
      </Section>
      <CtaBanner lang={lang} d={d} />
    </>
  );
}
