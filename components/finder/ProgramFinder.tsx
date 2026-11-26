'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { Dict } from '@/lib/i18n';
import type { Locale } from '@/lib/locales';
import { fmt } from '@/lib/format';
import { leadUrl } from '@/lib/leads';
import { GRADES } from '@/lib/site';
import { GOALS, STUDY_FORMATS, getPlan, planPriceText, recommendProgram, type Goal, type StudyFormat } from '@/lib/programs';
import { CheckIcon, WhatsAppIcon } from '../icons';

type Props = { lang: Locale; d: Dict; compact?: boolean };

/** Калькулятор подбора программы: Класс → Цель → Формат → группа, цена и запись. */
export function ProgramFinder({ lang, d, compact = false }: Props) {
  const f = d.finder;
  const [grade, setGrade] = useState<string | null>(null);
  const [goal, setGoal] = useState<Goal | null>(null);
  const [format, setFormat] = useState<StudyFormat | null>(null);

  const step = grade === null ? 0 : goal === null ? 1 : format === null ? 2 : 3;
  const steps = [f.stepGrade, f.stepGoal, f.stepFormat];

  function reset() {
    setGrade(null);
    setGoal(null);
    setFormat(null);
  }

  const optionCls = (active: boolean) =>
    `rounded-xl border px-3 py-2.5 text-sm font-medium transition ${
      active
        ? 'border-gold-500 bg-gold-500/10 text-brand-900 ring-2 ring-gold-500/30 dark:text-white'
        : 'border-slate-300 hover:border-brand-500 dark:border-white/15 dark:hover:border-brand-300'
    }`;

  return (
    <div className={compact ? '' : 'card p-6 sm:p-8'}>
      {/* Шаги */}
      <ol className="flex items-center gap-2 text-xs font-semibold">
        {steps.map((label, i) => (
          <li key={label} className="flex flex-1 items-center gap-2">
            <span
              className={`inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                i < step ? 'bg-gold-500 text-brand-950' : i === step ? 'bg-brand-800 text-white dark:bg-brand-300 dark:text-night' : 'bg-slate-200 text-slate-500 dark:bg-white/10'
              }`}
            >
              {i < step ? <CheckIcon className="h-3.5 w-3.5" /> : i + 1}
            </span>
            <span className={`truncate ${i === step ? 'text-brand-900 dark:text-white' : 'text-slate-500'}`}>{label}</span>
          </li>
        ))}
      </ol>

      <div className="mt-6" aria-live="polite">
        {step === 0 && (
          <fieldset>
            <legend className="font-display text-lg font-bold text-brand-900 dark:text-white">{f.qGrade}</legend>
            <div className="mt-4 grid grid-cols-4 gap-2">
              {GRADES.map((g) => (
                <button key={g} type="button" onClick={() => setGrade(g)} className={optionCls(false)}>
                  {g}
                </button>
              ))}
            </div>
          </fieldset>
        )}

        {step === 1 && (
          <fieldset>
            <legend className="font-display text-lg font-bold text-brand-900 dark:text-white">{f.qGoal}</legend>
            <div className="mt-4 grid gap-2">
              {GOALS.map((g) => (
                <button key={g} type="button" onClick={() => setGoal(g)} className={`${optionCls(false)} text-left`}>
                  <span className="block font-semibold">{f.goals[g].name}</span>
                  <span className="block text-xs font-normal text-slate-500">{f.goals[g].hint}</span>
                </button>
              ))}
            </div>
          </fieldset>
        )}

        {step === 2 && (
          <fieldset>
            <legend className="font-display text-lg font-bold text-brand-900 dark:text-white">{f.qFormat}</legend>
            <div className="mt-4 grid gap-2">
              {STUDY_FORMATS.map((fm) => (
                <button key={fm} type="button" onClick={() => setFormat(fm)} className={`${optionCls(false)} text-left`}>
                  <span className="block font-semibold">{f.formats[fm].name}</span>
                  <span className="block text-xs font-normal text-slate-500">{f.formats[fm].hint}</span>
                </button>
              ))}
            </div>
          </fieldset>
        )}

        {step === 3 && grade && goal && format && (
          <FinderResult lang={lang} d={d} grade={grade} goal={goal} format={format} />
        )}
      </div>

      {step > 0 && (
        <div className="mt-5 flex items-center justify-between text-sm">
          <button
            type="button"
            onClick={() => (step === 3 ? setFormat(null) : step === 2 ? setGoal(null) : setGrade(null))}
            className="font-medium text-slate-500 hover:text-brand-700 dark:hover:text-white"
          >
            ← {f.back}
          </button>
          <button type="button" onClick={reset} className="font-medium text-slate-500 underline hover:text-brand-700 dark:hover:text-white">
            {f.reset}
          </button>
        </div>
      )}
    </div>
  );
}

function FinderResult({ lang, d, grade, goal, format }: { lang: Locale; d: Dict; grade: string; goal: Goal; format: StudyFormat }) {
  const f = d.finder;
  const { program, planKey } = recommendProgram(goal, format);
  const plan = getPlan(planKey);
  const planText = d.pricing.plans[planKey];
  const price = planPriceText(plan.price, d);
  const programText = f.programs[program];

  const waUrl = leadUrl({
    source: 'finder',
    greeting: f.msgGreeting,
    fields: [
      [f.msgGrade, grade],
      [f.msgGoal, f.goals[goal].name],
      [f.msgFormat, f.formats[format].name],
      [f.msgProgram, programText.name],
      [f.msgPlan, `${planText.name} — ${price}`],
      [f.msgLang, d.common.langName],
    ],
  });

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{f.resultTitle}</p>
      <div className="mt-2 rounded-2xl border border-gold-500 bg-gold-500/10 p-5">
        <p className="font-display text-xl font-bold text-brand-900 dark:text-white">{programText.name}</p>
        <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">{programText.text}</p>
        <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div>
            <dt className="text-xs text-slate-500">{f.planLabel}</dt>
            <dd className="font-semibold">{planText.name}</dd>
          </div>
          <div>
            <dt className="text-xs text-slate-500">{f.priceLabel}</dt>
            <dd className="font-display text-lg font-extrabold text-brand-900 dark:text-white">{price}</dd>
          </div>
        </dl>
        <p className="mt-3 text-xs text-slate-500">{fmt(f.summary, { grade, goal: f.goals[goal].name, format: f.formats[format].name })}</p>
      </div>
      <div className="mt-4 grid gap-2">
        <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn-whatsapp w-full py-3">
          <WhatsAppIcon className="h-4 w-4" /> {f.book}
        </a>
        <Link href={`/${lang}/test/`} className="btn-ghost w-full">
          {f.testFirst}
        </Link>
      </div>
    </div>
  );
}
