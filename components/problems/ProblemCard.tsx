import Link from 'next/link';
import type { Dict } from '@/lib/i18n';
import { t, type Locale } from '@/lib/locales';
import type { ProblemPost } from '@/lib/data';
import { MathText } from '../MathText';
import { ArrowRightIcon } from '../icons';

export function DifficultyDots({ level, label }: { level: 1 | 2 | 3; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500" title={label}>
      <span className="flex gap-0.5" aria-hidden="true">
        {[1, 2, 3].map((i) => (
          <span key={i} className={`h-2 w-2 rounded-full ${i <= level ? 'bg-gold-500' : 'bg-slate-200 dark:bg-white/10'}`} />
        ))}
      </span>
      {label}
    </span>
  );
}

export function ProblemCard({ post, lang, d }: { post: ProblemPost; lang: Locale; d: Dict }) {
  const p = d.problems;
  return (
    <article className="card group relative flex flex-col p-6 transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-md bg-brand-800 px-2 py-0.5 font-display text-xs font-bold text-white dark:bg-brand-300 dark:text-night">
          {post.source || p.classic}
        </span>
        <span className="chip">{d.topics[post.topic]}</span>
      </div>
      <h2 className="mt-4 text-lg font-bold leading-snug">
        <Link href={`/${lang}/problems/${post.slug}/`} className="after:absolute after:inset-0 group-hover:underline">
          {t(post.title, lang)}
        </Link>
      </h2>
      <p className="mt-2 flex-1 text-sm text-slate-600 dark:text-slate-400">
        <MathText text={t(post.summary, lang)} />
      </p>
      <div className="mt-5 flex items-center justify-between">
        <DifficultyDots level={post.difficulty} label={p.difficulty[post.difficulty]} />
        <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700 dark:text-brand-300">
          {p.read} <ArrowRightIcon className="h-4 w-4" />
        </span>
      </div>
    </article>
  );
}
