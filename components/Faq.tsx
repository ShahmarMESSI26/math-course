'use client';

import { useId, useState } from 'react';

type Item = { q: string; a: string };

/** Аккордеон с плавным раскрытием (анимация высоты через grid-rows). */
export function Faq({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div className="divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-white dark:divide-white/10 dark:border-white/10 dark:bg-night-card">
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${baseId}-panel-${i}`;
        const buttonId = `${baseId}-button-${i}`;
        return (
          <div key={item.q}>
            <h3 className="text-base">
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-brand-900 transition hover:bg-slate-50 sm:px-6 dark:text-white dark:hover:bg-white/[0.03]"
              >
                {item.q}
                <span
                  className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-slate-300 text-lg leading-none transition-transform duration-300 dark:border-white/15 ${
                    isOpen ? 'rotate-45 border-gold-500 text-gold-600 dark:text-gold-400' : ''
                  }`}
                  aria-hidden="true"
                >
                  +
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-sm leading-relaxed text-slate-600 sm:px-6 dark:text-slate-400">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
