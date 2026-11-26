'use client';

import { useCallback, useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import type { Dict } from '@/lib/i18n';
import { fmt, formatTime } from '@/lib/format';
import { sendLead } from '@/lib/leads';
import { scoreQuiz, type QuizResult } from '@/lib/quiz';
import { GRADES } from '@/lib/site';
import { CheckIcon, CloseIcon, WhatsAppIcon } from '../icons';

/** Вопрос, уже отрисованный на сервере (формулы KaTeX не попадают в клиентский бандл). */
export type PreparedQuestion = {
  id: string;
  points: number;
  answer: number;
  statement: ReactNode;
  options: ReactNode[];
};

type Stage = 'intro' | 'running' | 'result';

type Props = {
  text: Dict['quiz'];
  langName: string;
  questions: PreparedQuestion[];
  timeLimitSec: number;
  olympiadThreshold: number;
};

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

export function LevelQuiz({ text: q, langName, questions, timeLimitSec, olympiadThreshold }: Props) {
  const [stage, setStage] = useState<Stage>('intro');
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(() => questions.map(() => null));
  const [timeLeft, setTimeLeft] = useState(timeLimitSec);
  const [timedOut, setTimedOut] = useState(false);
  const [result, setResult] = useState<QuizResult | null>(null);
  const topRef = useRef<HTMLDivElement>(null);

  const finish = useCallback(
    (byTimeout = false) => {
      setResult(scoreQuiz(questions, answers, olympiadThreshold));
      setTimedOut(byTimeout);
      setStage('result');
    },
    [questions, answers, olympiadThreshold],
  );

  // Таймер
  useEffect(() => {
    if (stage !== 'running') return;
    const id = window.setInterval(() => setTimeLeft((s) => Math.max(0, s - 1)), 1000);
    return () => window.clearInterval(id);
  }, [stage]);

  useEffect(() => {
    if (stage === 'running' && timeLeft === 0) finish(true);
  }, [stage, timeLeft, finish]);

  // При смене шага возвращаем начало теста в зону видимости
  useEffect(() => {
    if (stage !== 'intro') topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [stage, index]);

  function start() {
    setAnswers(questions.map(() => null));
    setIndex(0);
    setTimeLeft(timeLimitSec);
    setTimedOut(false);
    setResult(null);
    setStage('running');
  }

  function choose(option: number) {
    setAnswers((prev) => prev.map((a, i) => (i === index ? option : a)));
  }

  const total = questions.length;
  const isLast = index === total - 1;
  const answeredCount = answers.filter((a) => a !== null).length;
  const progress = stage === 'result' ? 100 : Math.round((answeredCount / total) * 100);
  const timeSpent = timeLimitSec - timeLeft;

  return (
    <div ref={topRef} className="card scroll-mt-24 overflow-hidden">
      {stage !== 'intro' && (
        <div className="h-1.5 w-full bg-slate-100 dark:bg-white/5" aria-hidden="true">
          <div className="h-full bg-gold-500 transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      )}

      {stage === 'intro' && (
        <div className="p-6 sm:p-10">
          <ul className="flex flex-wrap gap-2">
            {q.facts.map((f) => (
              <li key={f} className="chip">
                {f}
              </li>
            ))}
          </ul>
          <h2 className="mt-5 text-2xl font-bold sm:text-3xl">{q.introTitle}</h2>
          <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-400">{q.introText}</p>
          <p className="mt-3 text-sm text-slate-500">{q.note}</p>
          <button type="button" onClick={start} className="btn-gold mt-8 px-8 py-3 text-base">
            {q.start}
          </button>
        </div>
      )}

      {stage === 'running' && (
        <div className="p-6 sm:p-10">
          <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
            <span className="font-semibold text-brand-800 dark:text-brand-200">
              {fmt(q.question, { n: index + 1, total })}
              <span className="ml-2 font-normal text-slate-500">· {fmt(q.points, { n: questions[index].points })}</span>
            </span>
            <span
              className={`inline-flex items-center gap-2 rounded-full px-3 py-1 font-mono font-semibold tabular-nums ${
                timeLeft <= 60
                  ? 'bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-300'
                  : 'bg-slate-100 text-slate-700 dark:bg-white/5 dark:text-slate-200'
              }`}
              aria-label={q.timeLeft}
              role="timer"
            >
              ⏱ {formatTime(timeLeft)}
            </span>
          </div>

          <div className="mt-6 text-lg leading-relaxed text-slate-900 sm:text-xl dark:text-white">{questions[index].statement}</div>

          <div role="radiogroup" aria-label={fmt(q.question, { n: index + 1, total })} className="mt-6 grid gap-3 sm:grid-cols-2">
            {questions[index].options.map((opt, i) => {
              const selected = answers[index] === i;
              return (
                <button
                  key={i}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => choose(i)}
                  className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition ${
                    selected
                      ? 'border-gold-500 bg-gold-500/10 ring-2 ring-gold-500/40'
                      : 'border-slate-300 hover:border-brand-500 dark:border-white/15 dark:hover:border-brand-300'
                  }`}
                >
                  <span
                    className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-display text-sm font-bold ${
                      selected ? 'bg-gold-500 text-brand-950' : 'bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-300'
                    }`}
                  >
                    {LETTERS[i]}
                  </span>
                  <span className="font-medium">{opt}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
            <button type="button" onClick={() => setIndex((i) => i - 1)} disabled={index === 0} className="btn-ghost disabled:opacity-40">
              ← {q.back}
            </button>
            {isLast ? (
              <button type="button" onClick={() => finish()} className="btn-gold">
                {q.finish}
              </button>
            ) : (
              <button type="button" onClick={() => setIndex((i) => i + 1)} className="btn-primary">
                {answers[index] === null ? q.skip : q.next} →
              </button>
            )}
          </div>

          {/* Навигация по вопросам */}
          <div className="mt-6 flex gap-2" aria-hidden="true">
            {questions.map((question, i) => (
              <span
                key={question.id}
                className={`h-1.5 flex-1 rounded-full ${
                  i === index ? 'bg-brand-700 dark:bg-brand-300' : answers[i] !== null ? 'bg-gold-500' : 'bg-slate-200 dark:bg-white/10'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {stage === 'result' && result && (
        <QuizResultView
          q={q}
          langName={langName}
          result={result}
          timedOut={timedOut}
          timeSpent={timeSpent}
          questions={questions}
          answers={answers}
          onRetry={start}
        />
      )}
    </div>
  );
}

function QuizResultView({
  q,
  langName,
  result,
  timedOut,
  timeSpent,
  questions,
  answers,
  onRetry,
}: {
  q: Dict['quiz'];
  langName: string;
  result: QuizResult;
  timedOut: boolean;
  timeSpent: number;
  questions: PreparedQuestion[];
  answers: (number | null)[];
  onRetry: () => void;
}) {
  const [name, setName] = useState('');
  const [grade, setGrade] = useState('');
  const [error, setError] = useState('');
  const [sentUrl, setSentUrl] = useState('');
  const level = q.levels[result.level];
  const strong = result.level === 'olympiad';

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name.trim() || !grade) {
      setError(q.errRequired);
      return;
    }
    setError('');
    setSentUrl(
      sendLead({
        source: 'quiz',
        greeting: q.msgGreeting,
        fields: [
          [q.msgName, name.trim()],
          [q.msgGrade, grade],
          [q.msgScore, `${result.score} / ${result.maxScore}`],
          [q.msgCorrect, `${result.correct} / ${result.total}`],
          [q.msgTime, formatTime(timeSpent)],
          [q.msgLevel, level.name],
          [q.msgLang, langName],
        ],
      }),
    );
  }

  return (
    <div className="grid lg:grid-cols-2">
      <div className="p-6 sm:p-10">
        {timedOut && (
          <p role="status" className="mb-4 rounded-xl bg-amber-50 p-3 text-sm text-amber-800 dark:bg-amber-500/10 dark:text-amber-300">
            {q.timeUp}
          </p>
        )}
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">{q.resultTitle}</p>
        <p className="mt-2 font-display text-5xl font-extrabold text-brand-900 dark:text-white">
          {result.score}
          <span className="text-2xl text-slate-400"> / {result.maxScore}</span>
        </p>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          {fmt(q.correct, { correct: result.correct, total: result.total })} · {fmt(q.time, { time: formatTime(timeSpent) })}
        </p>

        <div
          className={`mt-6 rounded-2xl border p-5 ${
            strong ? 'border-gold-500 bg-gold-500/10' : 'border-brand-300 bg-brand-50 dark:border-brand-300/30 dark:bg-white/5'
          }`}
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{q.recommended}</p>
          <p className="mt-1 text-xl font-bold text-brand-900 dark:text-white">{level.name}</p>
          <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">{level.text}</p>
        </div>

        <details className="group mt-6">
          <summary className="cursor-pointer text-sm font-semibold text-brand-700 dark:text-brand-300">{q.review}</summary>
          <ol className="mt-3 space-y-2 text-sm">
            {questions.map((question, i) => {
              const ok = answers[i] === question.answer;
              return (
                <li key={question.id} className="flex items-start gap-2">
                  {ok ? (
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  ) : (
                    <CloseIcon className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                  )}
                  <span>
                    {fmt(q.question, { n: i + 1, total: questions.length })} — {q.correctAnswer}:{' '}
                    <strong>
                      {LETTERS[question.answer]}) {question.options[question.answer]}
                    </strong>
                  </span>
                </li>
              );
            })}
          </ol>
        </details>

        <button type="button" onClick={onRetry} className="mt-6 text-sm font-medium text-slate-500 underline hover:text-brand-700 dark:hover:text-white">
          {q.retry}
        </button>
      </div>

      <form onSubmit={onSubmit} noValidate className="space-y-5 border-t border-slate-200 bg-slate-50 p-6 sm:p-10 lg:border-l lg:border-t-0 dark:border-white/10 dark:bg-white/[0.02]">
        <div>
          <h3 className="text-xl font-bold">{q.formTitle}</h3>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{q.formText}</p>
        </div>
        <div>
          <label htmlFor="quiz-name" className="label">
            {q.name}
          </label>
          <input
            id="quiz-name"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={q.namePh}
            className="input"
            required
          />
        </div>
        <div>
          <label htmlFor="quiz-grade" className="label">
            {q.grade}
          </label>
          <select id="quiz-grade" value={grade} onChange={(e) => setGrade(e.target.value)} className="input" required>
            <option value="" disabled>
              {q.gradePh}
            </option>
            {GRADES.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>
        {error && (
          <p role="alert" className="text-sm font-medium text-red-600 dark:text-red-400">
            {error}
          </p>
        )}
        <button type="submit" className="btn-whatsapp w-full py-3">
          <WhatsAppIcon className="h-4 w-4" /> {q.submit}
        </button>
        {sentUrl && (
          <p role="status" className="rounded-xl bg-emerald-50 p-4 text-sm text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-300">
            {q.success}{' '}
            <a href={sentUrl} target="_blank" rel="noopener noreferrer" className="font-semibold underline">
              {q.fallback}
            </a>
          </p>
        )}
      </form>
    </div>
  );
}
