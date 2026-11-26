import type { Dict } from '@/lib/i18n';
import { t, type Locale } from '@/lib/locales';
import { achievements, type Medal } from '@/lib/data';
import { Section } from './Section';

const MEDAL_STYLE: Record<Medal, string> = {
  trophy: 'bg-gradient-to-br from-sky-200 via-white to-sky-300 text-sky-900 ring-1 ring-sky-400',
  gold: 'bg-gold-500 text-brand-950',
  silver: 'bg-slate-300 text-slate-900',
  bronze: 'bg-[#C98B5A] text-[#2b1709]',
  honorable: 'bg-brand-100 text-brand-900',
  diploma: 'bg-emerald-100 text-emerald-900',
  finalist: 'bg-brand-100 text-brand-900',
};

const MEDAL_MARK: Record<Medal, string> = {
  trophy: '◆',
  gold: 'G',
  silver: 'S',
  bronze: 'B',
  honorable: 'HM',
  diploma: '★',
  finalist: 'F',
};

/**
 * Блок «Достижения и авторитет». Данные — data/achievements.json.
 * Если опубликованных записей нет, блок не выводится вовсе.
 */
export function Achievements({ lang, d, className = '' }: { lang: Locale; d: Dict; className?: string }) {
  const { competitions, cases, totals } = achievements;
  const a = d.achievements;
  if (!competitions.length && !cases.length) return null;

  const stats = [
    { value: totals.medals, label: a.statMedals },
    { value: totals.gold, label: a.statGold },
    { value: totals.olympiads, label: a.statOlympiads },
    ...(totals.trophies > 0 ? [{ value: '№1', label: a.statWorld }] : []),
  ].filter((s) => s.value !== 0);

  return (
    <Section title={a.title} subtitle={a.subtitle} className={className}>
      {competitions.length > 0 && (
        <dl className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="card flex flex-col-reverse p-6 text-center">
              <dt className="mt-2 text-sm text-slate-600 dark:text-slate-400">{s.label}</dt>
              <dd className="font-display text-4xl font-extrabold text-brand-900 sm:text-5xl dark:text-white">{s.value}</dd>
            </div>
          ))}
        </dl>
      )}

      {competitions.length > 0 && (
        <div className="mt-10">
          <h3 className="text-xl font-bold">{a.awardsTitle}</h3>
          <ul className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {competitions.map((c) => (
              <li
                key={c.name.az}
                className={`card flex flex-col p-5 ${c.highlight ? 'border-gold-500 ring-2 ring-gold-500/60 md:col-span-2 lg:col-span-1' : ''}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-display text-lg font-bold text-brand-900 dark:text-white">{t(c.name, lang)}</p>
                    <p className="text-xs text-slate-500">{t(c.fullName, lang)}</p>
                  </div>
                  <span className="chip shrink-0">{a.levels[c.level]}</span>
                </div>
                <ul className="mt-4 space-y-2.5">
                  {c.results.map((r) => (
                    <li key={r.medal} className="flex items-center gap-3">
                      <span
                        className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-display text-sm font-extrabold shadow-inner ${MEDAL_STYLE[r.medal]}`}
                        aria-hidden="true"
                      >
                        {MEDAL_MARK[r.medal]}
                      </span>
                      <span className="min-w-0 text-sm">
                        <span className="font-semibold text-brand-900 dark:text-white">
                          {r.count > 1 && <span className="text-gold-700 dark:text-gold-400">{r.count} × </span>}
                          {a.medals[r.medal]}
                        </span>
                        {r.note && t(r.note, lang) && <span className="block text-xs text-slate-500">{t(r.note, lang)}</span>}
                      </span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}

      {cases.length > 0 && (
        <div className="mt-10">
          <h3 className="text-xl font-bold">{a.casesTitle}</h3>
          <ul className="mt-4 grid gap-4 md:grid-cols-2">
            {cases.map((c, i) => (
              <li key={`${c.student}-${i}`} className="card p-6">
                <p className="font-bold">
                  {c.student} <span className="font-normal text-slate-500">· {a.grade}: {c.grade}</span>
                </p>
                <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
                  <div className="rounded-xl bg-slate-100 p-3 text-sm dark:bg-white/5">
                    <span className="block text-xs font-semibold uppercase tracking-wide text-slate-500">{a.before}</span>
                    {t(c.before, lang)}
                  </div>
                  <span className="text-center font-display text-xl text-gold-600 dark:text-gold-400" aria-hidden="true">
                    →
                  </span>
                  <div className="rounded-xl bg-gold-500/10 p-3 text-sm ring-1 ring-gold-500/40">
                    <span className="block text-xs font-semibold uppercase tracking-wide text-gold-700 dark:text-gold-400">{a.after}</span>
                    {t(c.after, lang)}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Section>
  );
}
