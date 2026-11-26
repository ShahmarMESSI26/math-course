import type { Metadata } from 'next';
import { getDict } from '@/lib/i18n';
import { asLocale } from '@/lib/locales';
import { pageMetadata } from '@/lib/seo';
import { problemPosts } from '@/lib/data';
import { PageHeader, Section } from '@/components/Section';
import { ProblemCard } from '@/components/problems/ProblemCard';
import { CtaBanner } from '@/components/CtaBanner';

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = asLocale((await params).lang);
  const d = getDict(lang);
  return pageMetadata(lang, '/problems', d.problems.metaTitle, d.problems.metaDescription);
}

export default async function ProblemsPage({ params }: Props) {
  const lang = asLocale((await params).lang);
  const d = getDict(lang);

  return (
    <>
      <PageHeader title={d.problems.title} subtitle={d.problems.subtitle} />
      <Section>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {problemPosts.map((post) => (
            <ProblemCard key={post.slug} post={post} lang={lang} d={d} />
          ))}
        </div>
      </Section>
      <CtaBanner lang={lang} d={d} />
    </>
  );
}
