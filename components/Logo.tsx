import Link from 'next/link';
import type { Locale } from '@/lib/locales';

export function LogoMark({ className = 'h-8 w-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <rect width="64" height="64" rx="14" fill="#1E2A78" />
      <text
        x="32"
        y="45"
        textAnchor="middle"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="40"
        fontWeight="700"
        fill="#F2B33D"
      >
        Σ
      </text>
    </svg>
  );
}

export function Logo({ lang }: { lang: Locale }) {
  return (
    <Link
      href={`/${lang}/`}
      className="flex shrink-0 items-center gap-2 font-display text-lg font-extrabold text-brand-900 dark:text-white"
    >
      <LogoMark />
      <span>
        Shah<span className="text-gold-600 dark:text-gold-400">math</span>
      </span>
    </Link>
  );
}
