import type { Dict } from '@/lib/i18n';
import { PHONE_TEL, whatsappLink } from '@/lib/site';
import { PhoneIcon, WhatsAppIcon } from './icons';

/** Закреплённая снизу панель на телефонах. */
export function MobileCTA({ d }: { d: Dict }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-slate-200 bg-paper/95 p-3 backdrop-blur md:hidden dark:border-white/10 dark:bg-night/95">
      <a href={PHONE_TEL} className="btn-primary">
        <PhoneIcon className="h-4 w-4" /> {d.cta.call}
      </a>
      <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
        <WhatsAppIcon className="h-4 w-4" /> {d.cta.whatsapp}
      </a>
    </div>
  );
}
