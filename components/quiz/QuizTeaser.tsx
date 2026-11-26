import Link from 'next/link';
import type { Dict } from '@/lib/i18n';
import type { Locale } from '@/lib/locales';
import { Formula } from '../MathText';
import { SparkIcon } from '../icons';

/** Приглашение пройти диагностический тест (главная страница). */
export function QuizTeaser({ lang, d }: { lang: Locale; d: Dict }) {
  const q = d.quiz;
  return (
    <section className="page py-8">
      <div className="card relative grid items-center gap-8 overflow-hidden border-gold-500/50 p-8 sm:p-10 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <span className="chip border-gold-500/60 text-gold-700 dark:text-gold-400">
            <SparkIcon className="mr-1.5 h-3.5 w-3.5" /> {q.teaserBadge}
          </span>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">{q.teaserTitle}</h2>
          <p className="mt-3 max-w-xl text-slate-600 dark:text-slate-400">{q.teaserText}</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {q.facts.map((f) => (
              <li key={f} className="chip">
                {f}
              </li>
            ))}
          </ul>
          <Link href={`/${lang}/test/`} className="btn-gold mt-7 px-7 py-3 text-base">
            {q.start} →
          </Link>
        </div>
        <div className="bg-grid hidden rounded-2xl border border-slate-200 p-6 lg:block dark:border-white/10" aria-hidden="true">
          <div className="space-y-4 text-brand-900 dark:text-brand-100">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
              <span>1 / 5</span>
              <span className="font-mono">⏱ 9:41</span>
            </div>
            <div className="h-1.5 rounded-full bg-slate-200 dark:bg-white/10">
              <div className="h-full w-1/5 rounded-full bg-gold-500" />
            </div>
            <Formula tex="2,\ 6,\ 12,\ 20,\ 30,\ ?" display />
            <div className="grid grid-cols-2 gap-2 text-sm font-semibold">
              {['36', '40', '42', '44'].map((o, i) => (
                <span
                  key={o}
                  className={`rounded-lg border px-3 py-2 ${i === 2 ? 'border-gold-500 bg-gold-500/10' : 'border-slate-300 dark:border-white/15'}`}
                >
                  {String.fromCharCode(65 + i)}) {o}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
