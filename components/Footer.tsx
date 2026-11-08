import Link from 'next/link';
import type { Dict } from '@/lib/i18n';
import type { Locale } from '@/lib/locales';
import { NAV, PHONE_DISPLAY, PHONE_TEL, whatsappLink } from '@/lib/site';
import { Logo } from './Logo';
import { SocialPlaceholder } from './SocialPlaceholder';
import { GlobeIcon, MapPinIcon, PhoneIcon, WhatsAppIcon } from './icons';

export function Footer({ lang, d }: { lang: Locale; d: Dict }) {
  const year = new Date().getFullYear();
  const linkCls = 'text-slate-600 hover:text-brand-800 dark:text-slate-400 dark:hover:text-white';

  return (
    <footer className="border-t border-slate-200 bg-white dark:border-white/10 dark:bg-night-card/40">
      <div className="page grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo lang={lang} />
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">{d.footer.tagline}</p>
        </div>

        <div>
          <h2 className="text-sm font-semibold">{d.footer.navTitle}</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {NAV.map((item) => (
              <li key={item.key}>
                <Link href={`/${lang}${item.href}`} className={linkCls}>
                  {d.nav[item.key]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold">{d.footer.contactTitle}</h2>
          <ul className="mt-3 space-y-2.5 text-sm">
            <li>
              <a href={PHONE_TEL} className={`inline-flex items-center gap-2 ${linkCls}`}>
                <PhoneIcon className="h-4 w-4" /> {PHONE_DISPLAY}
              </a>
            </li>
            <li>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 ${linkCls}`}>
                <WhatsAppIcon className="h-4 w-4" /> WhatsApp
              </a>
            </li>
            <li className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <MapPinIcon className="h-4 w-4" /> {d.about.baku.name}
            </li>
            <li className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <MapPinIcon className="h-4 w-4" /> {d.about.zaqatala.name}
              <span className="chip py-0">{d.common.soon}</span>
            </li>
            <li className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <GlobeIcon className="h-4 w-4" /> {d.about.online.name}
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold">{d.footer.socialsTitle}</h2>
          <div className="mt-3">
            <SocialPlaceholder d={d} />
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 dark:border-white/10">
        <div className="page flex flex-col gap-1 py-5 text-xs text-slate-500 sm:flex-row sm:justify-between">
          <span>
            © {year} Shahmath. {d.footer.rights}
          </span>
          <span>shahmath.az</span>
        </div>
      </div>
    </footer>
  );
}
