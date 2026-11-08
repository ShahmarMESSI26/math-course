'use client';

import { useState, type FormEvent } from 'react';
import type { Dict } from '@/lib/i18n';
import { whatsappLink } from '@/lib/site';
import { WhatsAppIcon } from './icons';

const GRADES = ['4', '5', '6', '7', '8', '9', '10', '11'];
const BRANCHES = ['baku', 'zaqatala', 'online'] as const;
type Branch = (typeof BRANCHES)[number];

/** Форма записи: собирает данные и открывает WhatsApp с готовым сообщением. */
export function TrialForm({ d }: { d: Dict }) {
  const f = d.contact.form;
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [grade, setGrade] = useState('');
  const [branch, setBranch] = useState<Branch>('baku');
  const [error, setError] = useState('');
  const [sentUrl, setSentUrl] = useState('');

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !grade) {
      setError(f.errRequired);
      return;
    }
    if (phone.replace(/\D/g, '').length < 9) {
      setError(f.errPhone);
      return;
    }
    setError('');

    const message = [
      f.msgGreeting,
      `${f.msgName}: ${name.trim()}`,
      `${f.msgPhone}: ${phone.trim()}`,
      `${f.msgGrade}: ${grade}`,
      `${f.msgBranch}: ${f.branches[branch]}`,
    ].join('\n');

    const url = whatsappLink(message);
    setSentUrl(url);
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  return (
    <form onSubmit={onSubmit} noValidate className="mt-6 space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="trial-name" className="label">
            {f.name}
          </label>
          <input
            id="trial-name"
            name="name"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={f.namePh}
            className="input"
            required
          />
        </div>
        <div>
          <label htmlFor="trial-phone" className="label">
            {f.phone}
          </label>
          <input
            id="trial-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={f.phonePh}
            className="input"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="trial-grade" className="label">
          {f.grade}
        </label>
        <select id="trial-grade" value={grade} onChange={(e) => setGrade(e.target.value)} className="input sm:w-48" required>
          <option value="" disabled>
            {f.gradePh}
          </option>
          {GRADES.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>

      <fieldset>
        <legend className="label">{f.branch}</legend>
        <div className="grid gap-2 sm:grid-cols-3">
          {BRANCHES.map((b) => (
            <label
              key={b}
              className="flex cursor-pointer items-center gap-2 rounded-xl border border-slate-300 px-4 py-3 text-sm transition hover:border-brand-500 has-[:checked]:border-gold-500 has-[:checked]:bg-gold-500/10 dark:border-white/15"
            >
              <input
                type="radio"
                name="branch"
                value={b}
                checked={branch === b}
                onChange={() => setBranch(b)}
                className="accent-brand-800 dark:accent-gold-500"
              />
              {f.branches[b]}
            </label>
          ))}
        </div>
      </fieldset>

      {error && (
        <p role="alert" className="text-sm font-medium text-red-600 dark:text-red-400">
          {error}
        </p>
      )}

      <button type="submit" className="btn-whatsapp w-full sm:w-auto">
        <WhatsAppIcon className="h-4 w-4" /> {f.submit}
      </button>

      {sentUrl && (
        <p role="status" className="rounded-xl bg-emerald-50 p-4 text-sm text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-300">
          {f.success}{' '}
          <a href={sentUrl} target="_blank" rel="noopener noreferrer" className="font-semibold underline">
            {f.fallback}
          </a>
        </p>
      )}
    </form>
  );
}
