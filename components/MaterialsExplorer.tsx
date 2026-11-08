'use client';

import { useMemo, useState } from 'react';
import type { Dict } from '@/lib/i18n';
import type { Olympiad } from '@/lib/data';
import { t, type Locale } from '@/lib/locales';
import { TOPICS, type Topic } from '@/lib/site';
import { MathText } from './MathText';
import { PdfLink } from './PdfLink';
import { SearchIcon } from './icons';

type Props = {
  olympiads: Olympiad[];
  lang: Locale;
  d: Dict;
  showOlympiadFilter?: boolean;
};

/** Поиск и фильтр задач по олимпиаде, году и теме (работает в браузере). */
export function MaterialsExplorer({ olympiads, lang, d, showOlympiadFilter = true }: Props) {
  const m = d.materials;
  const [query, setQuery] = useState('');
  const [olympiad, setOlympiad] = useState('all');
  const [year, setYear] = useState('all');
  const [topic, setTopic] = useState<Topic | 'all'>('all');

  const norm = (s: string) => s.toLocaleLowerCase(lang);

  const rows = useMemo(
    () =>
      olympiads.flatMap((o) =>
        o.years.flatMap((y) =>
          y.items.map((item) => ({
            o,
            y,
            item,
            haystack: norm(
              `${o.name} ${t(o.fullName, lang)} ${y.year} ${d.topics[item.topic]} ${t(item.statement, lang)}`,
            ),
          })),
        ),
      ),
    [olympiads, lang, d],
  );

  const years = useMemo(
    () => Array.from(new Set(olympiads.flatMap((o) => o.years.map((y) => y.year)))).sort((a, b) => b - a),
    [olympiads],
  );

  const q = norm(query.trim());
  const filtered = rows.filter(
    (r) =>
      (olympiad === 'all' || r.o.slug === olympiad) &&
      (year === 'all' || String(r.y.year) === year) &&
      (topic === 'all' || r.item.topic === topic) &&
      (!q || r.haystack.includes(q)),
  );

  const topicOptions: (Topic | 'all')[] = ['all', ...TOPICS];

  return (
    <div>
      <div className="card p-4 sm:p-5">
        <div className={`grid gap-3 ${showOlympiadFilter ? 'sm:grid-cols-[1fr_auto_auto]' : 'sm:grid-cols-[1fr_auto]'}`}>
          <label className="relative block">
            <span className="sr-only">{m.search}</span>
            <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={m.search}
              className="input pl-10"
            />
          </label>

          {showOlympiadFilter && (
            <select aria-label={m.olympiad} value={olympiad} onChange={(e) => setOlympiad(e.target.value)} className="input sm:w-48">
              <option value="all">{m.allOlympiads}</option>
              {olympiads.map((o) => (
                <option key={o.slug} value={o.slug}>
                  {o.name}
                </option>
              ))}
            </select>
          )}

          <select aria-label={m.year} value={year} onChange={(e) => setYear(e.target.value)} className="input sm:w-40">
            <option value="all">{m.allYears}</option>
            {years.map((y) => (
              <option key={y} value={String(y)}>
                {y}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2" role="group" aria-label={m.topic}>
          <span className="mr-1 text-sm font-medium text-slate-500 dark:text-slate-400">{m.topic}:</span>
          {topicOptions.map((tp) => {
            const active = topic === tp;
            return (
              <button
                key={tp}
                type="button"
                onClick={() => setTopic(tp)}
                aria-pressed={active}
                className={`rounded-full border px-3 py-1 text-sm transition ${
                  active
                    ? 'border-brand-800 bg-brand-800 text-white dark:border-brand-300 dark:bg-brand-300 dark:text-night'
                    : 'border-slate-300 text-slate-700 hover:border-brand-500 dark:border-white/15 dark:text-slate-300'
                }`}
              >
                {tp === 'all' ? m.allTopics : d.topics[tp]}
              </button>
            );
          })}
        </div>
      </div>

      <p className="mt-6 text-sm text-slate-500 dark:text-slate-400" aria-live="polite">
        {m.found}: <strong className="text-slate-800 dark:text-white">{filtered.length}</strong>
      </p>

      {filtered.length === 0 ? (
        <p className="card mt-3 p-8 text-center text-slate-500 dark:text-slate-400">{m.empty}</p>
      ) : (
        <ul className="mt-3 grid gap-4 md:grid-cols-2">
          {filtered.map(({ o, y, item }) => (
            <li key={`${o.slug}-${y.year}-${item.n}`} className="card flex flex-col p-5">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="rounded-md bg-brand-800 px-2 py-0.5 font-display font-bold text-white dark:bg-brand-300 dark:text-night">
                  {o.name} {y.year}
                </span>
                <span className="chip">
                  {m.problem} {item.n}
                </span>
                <span className="chip">{d.topics[item.topic]}</span>
              </div>
              <MathText text={t(item.statement, lang)} className="mt-4 block flex-1 leading-relaxed" />
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 border-t border-slate-100 pt-4 text-sm dark:border-white/10">
                <PdfLink href={y.problems} label={m.problemsPdf} soon={d.common.soon} />
                <PdfLink href={y.solutions} label={m.solutionsPdf} soon={d.common.soon} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
