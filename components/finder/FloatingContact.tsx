'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useId, useState } from 'react';
import type { Dict } from '@/lib/i18n';
import type { Locale } from '@/lib/locales';
import { whatsappLink } from '@/lib/site';
import { CalculatorIcon, CloseIcon, WhatsAppIcon } from '../icons';
import { ProgramFinder } from './ProgramFinder';

/**
 * Плавающие кнопки в правом нижнем углу: «Подбор программы» (открывает калькулятор)
 * и WhatsApp. На телефонах WhatsApp уже есть в нижней панели (MobileCTA), поэтому
 * там показываем только кнопку подбора — над панелью.
 */
export function FloatingContact({ lang, d }: { lang: Locale; d: Dict }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const titleId = useId();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      {open && (
        <div
          role="dialog"
          aria-modal="false"
          aria-labelledby={titleId}
          className="fixed bottom-40 right-4 z-50 max-h-[calc(100vh-12rem)] w-[calc(100vw-2rem)] max-w-sm overflow-y-auto rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl md:bottom-24 dark:border-white/10 dark:bg-night-card"
        >
          <div className="mb-4 flex items-start justify-between gap-3">
            <div>
              <h2 id={titleId} className="text-lg font-bold">
                {d.finder.title}
              </h2>
              <p className="text-xs text-slate-500">{d.finder.widgetText}</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={d.floating.close}
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-300 dark:border-white/15"
            >
              <CloseIcon className="h-4 w-4" />
            </button>
          </div>
          <ProgramFinder lang={lang} d={d} compact />
        </div>
      )}

      <div className="fixed bottom-24 right-4 z-50 flex flex-col items-end gap-3 md:bottom-6 md:right-6">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="inline-flex items-center gap-2 rounded-full bg-brand-800 px-4 py-3 text-sm font-semibold text-white shadow-lg ring-1 ring-white/10 transition hover:bg-brand-700 dark:bg-brand-300 dark:text-night dark:hover:bg-brand-200"
        >
          {open ? <CloseIcon className="h-4 w-4" /> : <CalculatorIcon className="h-4 w-4" />}
          {d.floating.finder}
        </button>
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={d.floating.whatsapp}
          title={d.floating.whatsapp}
          className="relative hidden h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-[#08311b] shadow-lg transition hover:scale-105 md:inline-flex"
        >
          <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30 motion-reduce:hidden" aria-hidden="true" />
          <WhatsAppIcon className="relative h-7 w-7" />
        </a>
      </div>
    </>
  );
}
