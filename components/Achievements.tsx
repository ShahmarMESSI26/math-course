import type { Dict } from '@/lib/i18n';
import { t, type Locale } from '@/lib/locales';
import { fmt } from '@/lib/format';
import { achievements, type Medal, type TeamMember } from '@/lib/data';
import { Section } from './Section';
import { CheckIcon } from './icons';

const MEDAL_STYLE: Record<Medal, string> = {
  trophy: 'bg-gradient-to-br from-sky-200 via-white to-sky-300 text-sky-900 ring-1 ring-sky-400',
  gold: 'bg-gold-500 text-brand-950',
  silver: 'bg-slate-300 text-slate-900',
  bronze: 'bg-[#C98B5A] text-[#2b1709]',
  honorable: 'bg-brand-100 text-brand-900',
  perfect: 'bg-emerald-500 text-white',
  finalist: 'bg-brand-100 text-brand-900',
  diploma: 'bg-emerald-100 text-emerald-900',
};

const MEDAL_MARK: Record<Medal, string> = {
  trophy: '◆',
  gold: 'G',
  silver: 'S',
  bronze: 'B',
  honorable: 'HM',
  perfect: '100',
  finalist: 'F',
  diploma: '★',
};

/**
 * Блок «Команда и достижения». Данные — data/achievements.json (награды) и data/teachers.json (имена, роли).
 * Если опубликованных записей нет, блок не выводится вовсе.
 */
export function Achievements({ lang, d, className = '' }: { lang: Locale; d: Dict; className?: string }) {
  const { team, cases, totals } = achievements;
  const a = d.achievements;
  if (!team.length && !cases.length) return null;

  const stats = [
    { value: totals.medals, label: a.statMedals },
    { value: totals.gold, label: a.statGold },
    { value: totals.olympiads, label: a.statOlympiads },
    ...(totals.trophies > 0 ? [{ value: '№1', label: a.statWorld }] : []),
  ].filter((s) => s.value !== 0);

  return (
    <Section title={a.title} subtitle={a.subtitle} className={className}>
      {team.length > 0 && (
        <>
          <dl className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="card flex flex-col-reverse p-6 text-center">
                <dt className="mt-2 text-sm text-slate-600 dark:text-slate-400">{s.label}</dt>
                <dd className="font-display text-4xl font-extrabold text-brand-900 sm:text-5xl dark:text-white">{s.value}</dd>
              </div>
            ))}
          </dl>

          <ul className="mt-10 grid gap-6 lg:grid-cols-2">
            {team.map((m) => (
              <MemberCard key={m.teacher.slug} member={m} lang={lang} d={d} />
            ))}
          </ul>
        </>
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

function MemberCard({ member, lang, d }: { member: TeamMember; lang: Locale; d: Dict }) {
  const a = d.achievements;
  const name = t(member.teacher.name, lang);
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2);
  const hasTrophy = member.groups.some((g) => g.results.some((r) => r.medal === 'trophy'));

  return (
    <li className={`card flex flex-col p-6 ${hasTrophy ? 'ring-2 ring-gold-500/70' : ''}`}>
      <div className="flex items-center gap-4">
        <span className="bg-grid inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-800 font-display text-lg font-extrabold text-gold-400 [--grid-line:rgba(255,255,255,0.08)]">
          {initials}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="text-xl font-bold">{name}</h3>
          <p className="text-sm font-medium text-gold-700 dark:text-gold-400">{t(member.teacher.role, lang)}</p>
        </div>
        {member.medals > 0 && (
          <span className="shrink-0 rounded-full bg-gold-500/15 px-3 py-1 text-xs font-bold text-gold-700 ring-1 ring-gold-500/40 dark:text-gold-400">
            {fmt(a.memberMedals, { n: member.medals })}
          </span>
        )}
      </div>

      {member.groups.length > 0 && (
        <ul className="mt-5 divide-y divide-slate-100 border-t border-slate-100 dark:divide-white/5 dark:border-white/5">
          {member.groups.map((g) => (
            <li key={g.id} className="flex flex-col gap-2 py-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
              <div className="min-w-0">
                <p className="font-semibold text-brand-900 dark:text-white">
                  {t(g.info.name, lang)}{' '}
                  <span className="ml-1 align-middle text-[11px] font-medium uppercase tracking-wide text-slate-400">{a.levels[g.info.level]}</span>
                </p>
                <p className="text-xs text-slate-500">{t(g.info.fullName, lang)}</p>
              </div>
              <ul className="flex shrink-0 flex-col gap-1.5 sm:items-end">
                {g.results.map((r, i) => (
                  <li key={`${r.medal}-${i}`} className="flex items-center gap-2 text-sm sm:flex-row-reverse sm:text-right">
                    <span
                      className={`inline-flex h-7 min-w-7 shrink-0 items-center justify-center rounded-full px-1.5 font-display text-[11px] font-extrabold shadow-inner ${MEDAL_STYLE[r.medal]}`}
                      aria-hidden="true"
                    >
                      {MEDAL_MARK[r.medal]}
                    </span>
                    <span>
                      <span className="font-medium">
                        {r.count > 1 && <span className="font-bold text-gold-700 dark:text-gold-400">{r.count} × </span>}
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
      )}

      {member.highlights.length > 0 && (
        <ul className={`space-y-2.5 text-sm ${member.groups.length ? 'mt-3' : 'mt-5 border-t border-slate-100 pt-4 dark:border-white/5'}`}>
          {member.highlights.map((h) => (
            <li key={h.az} className="flex items-start gap-2">
              <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-600 dark:text-gold-400" />
              <span className="text-slate-700 dark:text-slate-300">{t(h, lang)}</span>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
