import Link from 'next/link';
import type { Dict } from '@/lib/i18n';
import type { Locale } from '@/lib/locales';
import { leadUrl } from '@/lib/leads';
import { WhatsAppIcon } from '../icons';

/** Баннер в конце каждого разбора: тест → сильная группа. */
export function ProblemCta({ lang, d, problemTitle }: { lang: Locale; d: Dict; problemTitle: string }) {
  const p = d.problems;
  const waUrl = leadUrl({
    source: 'trial',
    greeting: p.msgGreeting,
    fields: [
      [p.msgProblem, problemTitle],
      [p.msgLang, d.common.langName],
    ],
  });

  return (
    <aside className="bg-grid relative mt-12 overflow-hidden rounded-3xl bg-brand-800 px-6 py-10 [--grid-line:rgba(255,255,255,0.07)] sm:px-10 dark:bg-brand-900">
      <p className="font-display text-sm font-bold uppercase tracking-wider text-gold-400">Shahmath</p>
      <h2 className="mt-2 text-2xl font-bold !text-white sm:text-3xl">{p.ctaTitle}</h2>
      <p className="mt-3 max-w-2xl text-brand-100">{p.ctaText}</p>
      <div className="mt-7 flex flex-wrap gap-3">
        <Link href={`/${lang}/test/`} className="btn-gold">
          {d.cta.test} →
        </Link>
        <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
          <WhatsAppIcon className="h-4 w-4" /> {p.ctaWhatsapp}
        </a>
      </div>
    </aside>
  );
}
