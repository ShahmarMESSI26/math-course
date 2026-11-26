import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getDict } from '@/lib/i18n';
import { asLocale, t, tl } from '@/lib/locales';
import { pageMetadata } from '@/lib/seo';
import { plainText } from '@/lib/format';
import { SITE_URL } from '@/lib/site';
import { getOlympiad, getProblemPost, problemPosts } from '@/lib/data';
import { MathText } from '@/components/MathText';
import { StructuredData } from '@/components/StructuredData';
import { ProblemCard, DifficultyDots } from '@/components/problems/ProblemCard';
import { ProblemCta } from '@/components/problems/ProblemCta';

type Props = { params: Promise<{ lang: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return problemPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang: raw, slug } = await params;
  const lang = asLocale(raw);
  const post = getProblemPost(slug);
  if (!post) return {};
  const title = t(post.title, lang);
  const description = plainText(t(post.summary, lang));
  const base = pageMetadata(lang, `/problems/${post.slug}`, title, description);
  return {
    ...base,
    keywords: [post.source, getDict(lang).topics[post.topic], 'olympiad', 'olimpiada', 'олимпиада'].filter(Boolean),
    openGraph: { ...base.openGraph, type: 'article', publishedTime: post.date },
  };
}

export default async function ProblemPostPage({ params }: Props) {
  const { lang: raw, slug } = await params;
  const lang = asLocale(raw);
  const d = getDict(lang);
  const p = d.problems;
  const post = getProblemPost(slug);
  if (!post) notFound();

  const title = t(post.title, lang);
  const olympiad = post.olympiad ? getOlympiad(post.olympiad) : undefined;
  const related = problemPosts.filter((x) => x.slug !== post.slug).slice(0, 2);
  const url = `${SITE_URL}/${lang}/problems/${post.slug}/`;

  return (
    <>
      <article className="page max-w-3xl py-12 sm:py-16">
        <nav aria-label="breadcrumb" className="text-sm text-slate-500">
          <Link href={`/${lang}/`} className="hover:underline">
            Shahmath
          </Link>{' '}
          /{' '}
          <Link href={`/${lang}/problems/`} className="hover:underline">
            {p.title}
          </Link>
        </nav>

        <header className="mt-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-brand-800 px-2 py-0.5 font-display text-xs font-bold text-white dark:bg-brand-300 dark:text-night">
              {post.source || p.classic}
            </span>
            <span className="chip">{d.topics[post.topic]}</span>
            <DifficultyDots level={post.difficulty} label={p.difficulty[post.difficulty]} />
          </div>
          <h1 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl">{title}</h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            <MathText text={t(post.summary, lang)} />
          </p>
        </header>

        <section className="card mt-8 border-l-4 border-l-gold-500 p-6 sm:p-8">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gold-700 dark:text-gold-400">{p.statement}</h2>
          <div className="mt-3 text-lg leading-relaxed text-slate-900 dark:text-white">
            <MathText text={t(post.statement, lang)} />
          </div>
        </section>

        <p className="mt-6 rounded-xl bg-brand-50 p-4 text-sm text-brand-900 dark:bg-white/5 dark:text-brand-100">💡 {p.tryFirst}</p>

        {/* <details>: решение скрыто от читателя, но присутствует в HTML для Google */}
        <details className="group card mt-6 overflow-hidden">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-6 font-display text-lg font-bold text-brand-900 sm:px-8 dark:text-white [&::-webkit-details-marker]:hidden">
            {p.solution}
            <span className="rounded-full bg-gold-500 px-3 py-1 text-xs font-bold text-brand-950">
              <span className="group-open:hidden">{p.showSolution}</span>
              <span className="hidden group-open:inline">{p.hideSolution}</span>
            </span>
          </summary>
          <div className="space-y-4 border-t border-slate-200 p-6 leading-relaxed sm:px-8 dark:border-white/10">
            {tl(post.solution, lang).map((para, i) => (
              <p key={i}>
                <MathText text={para} />
              </p>
            ))}
            {post.answer && (
              <p className="rounded-xl bg-emerald-50 p-4 font-semibold text-emerald-900 dark:bg-emerald-500/10 dark:text-emerald-200">
                {p.answer}: <MathText text={t(post.answer, lang)} />
              </p>
            )}
          </div>
        </details>

        {olympiad && (
          <p className="mt-6 text-sm text-slate-600 dark:text-slate-400">
            {p.moreFrom}{' '}
            <Link href={`/${lang}/materials/${olympiad.slug}/`} className="font-semibold text-brand-700 hover:underline dark:text-brand-300">
              {olympiad.name} →
            </Link>
          </p>
        )}

        <ProblemCta lang={lang} d={d} problemTitle={post.source || title} />
      </article>

      {related.length > 0 && (
        <section className="page max-w-5xl pb-16">
          <h2 className="text-2xl font-bold">{p.related}</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {related.map((r) => (
              <ProblemCard key={r.slug} post={r} lang={lang} d={d} />
            ))}
          </div>
        </section>
      )}

      <StructuredData
        data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: title,
          description: plainText(t(post.summary, lang)),
          inLanguage: lang,
          datePublished: post.date,
          mainEntityOfPage: url,
          url,
          author: { '@type': 'Organization', name: 'Shahmath', url: `${SITE_URL}/${lang}/` },
          publisher: { '@type': 'Organization', name: 'Shahmath', logo: { '@type': 'ImageObject', url: `${SITE_URL}/favicon.svg` } },
          about: [d.topics[post.topic], post.source].filter(Boolean),
          educationalLevel: p.difficulty[post.difficulty],
        }}
      />
      <StructuredData
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Shahmath', item: `${SITE_URL}/${lang}/` },
            { '@type': 'ListItem', position: 2, name: p.title, item: `${SITE_URL}/${lang}/problems/` },
            { '@type': 'ListItem', position: 3, name: title, item: url },
          ],
        }}
      />
    </>
  );
}
