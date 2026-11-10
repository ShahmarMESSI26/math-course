'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { Dict } from '@/lib/i18n';
import type { Locale } from '@/lib/locales';
import { NAV } from '@/lib/site';
import { Logo } from './Logo';
import { LangSwitch } from './LangSwitch';
import { ThemeToggle } from './ThemeToggle';
import { CloseIcon, MenuIcon } from './icons';

export function Header({ lang, d }: { lang: Locale; d: Dict }) {
  const pathname = usePathname() || '';
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  // Сравниваем без завершающего слэша, чтобы /az и /az/ считались одной страницей
  const current = pathname.replace(/\/+$/, '');
  const isActive = (href: string) =>
    href === '' ? current === `/${lang}` : current.startsWith(`/${lang}${href}`);

  const links = NAV.map((item) => {
    const active = isActive(item.href);
    return (
      <Link
        key={item.key}
        href={`/${lang}${item.href}/`}
        aria-current={active ? 'page' : undefined}
        className={`rounded-full px-3 py-2 text-sm font-medium transition ${
          active
            ? 'bg-brand-50 text-brand-800 dark:bg-white/10 dark:text-white'
            : 'text-slate-600 hover:text-brand-800 dark:text-slate-300 dark:hover:text-white'
        }`}
      >
        {d.nav[item.key]}
      </Link>
    );
  });

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-paper/85 backdrop-blur dark:border-white/10 dark:bg-night/85">
      <div className="page flex h-16 items-center justify-between gap-3">
        <Logo lang={lang} />

        <nav className="hidden items-center gap-1 lg:flex">{links}</nav>

        <div className="flex items-center gap-1.5">
          <LangSwitch lang={lang} label={d.nav.language} />
          <ThemeToggle label={d.nav.theme} />
          <Link href={`/${lang}/contact/#trial`} className="btn-gold ml-1 hidden xl:inline-flex">
            {d.cta.trial}
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? d.nav.close : d.nav.menu}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 text-slate-700 lg:hidden dark:border-white/15 dark:text-slate-200"
          >
            {open ? <CloseIcon className="h-4 w-4" /> : <MenuIcon className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" className="border-t border-slate-200 lg:hidden dark:border-white/10">
          <nav className="page flex flex-col gap-1 py-3">
            {links}
            <Link href={`/${lang}/contact/#trial`} className="btn-gold mt-2">
              {d.cta.trial}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
