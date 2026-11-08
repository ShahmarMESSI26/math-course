import Link from 'next/link';
import type { Dict } from '@/lib/i18n';
import type { Locale } from '@/lib/locales';
import { whatsappLink } from '@/lib/site';
import { WhatsAppIcon } from './icons';

export function CtaBanner({ lang, d }: { lang: Locale; d: Dict }) {
  return (
    <section className="page py-16">
      <div className="bg-grid relative overflow-hidden rounded-3xl bg-brand-800 px-6 py-12 text-center [--grid-line:rgba(255,255,255,0.07)] sm:px-12 dark:bg-brand-900">
        <h2 className="text-3xl font-bold !text-white sm:text-4xl">{d.home.ctaTitle}</h2>
        <p className="mx-auto mt-3 max-w-xl text-brand-100">{d.home.ctaText}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href={`/${lang}/contact#trial`} className="btn-gold">
            {d.cta.trial}
          </Link>
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
            <WhatsAppIcon className="h-4 w-4" /> {d.cta.whatsapp}
          </a>
        </div>
      </div>
    </section>
  );
}
