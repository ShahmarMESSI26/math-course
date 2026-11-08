import type { Metadata } from 'next';
import { getDict } from '@/lib/i18n';
import { asLocale } from '@/lib/locales';
import { pageMetadata } from '@/lib/seo';
import { MAPS, PHONE_DISPLAY, PHONE_TEL, whatsappLink } from '@/lib/site';
import { PageHeader } from '@/components/Section';
import { TrialForm } from '@/components/TrialForm';
import { SocialPlaceholder } from '@/components/SocialPlaceholder';
import { GlobeIcon, MapPinIcon, PhoneIcon, WhatsAppIcon } from '@/components/icons';

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = asLocale((await params).lang);
  const d = getDict(lang);
  return pageMetadata(lang, '/contact', d.contact.title, d.contact.subtitle);
}

export default async function ContactPage({ params }: Props) {
  const lang = asLocale((await params).lang);
  const d = getDict(lang);
  const c = d.contact;

  const maps = [
    { key: 'baku', name: d.about.baku.name, address: d.about.baku.address, src: MAPS.baku, soon: false },
    { key: 'zaqatala', name: d.about.zaqatala.name, address: d.about.zaqatala.address, src: MAPS.zaqatala, soon: true },
  ];

  return (
    <>
      <PageHeader title={c.title} subtitle={c.subtitle} />

      <section className="page grid gap-8 py-14 lg:grid-cols-5">
        <div className="space-y-6 lg:col-span-2">
          <div className="card space-y-5 p-6">
            <a href={PHONE_TEL} className="group flex items-center gap-4">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-800 dark:bg-white/10 dark:text-brand-200">
                <PhoneIcon className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-xs text-slate-500">{c.phone}</span>
                <span className="font-display text-lg font-bold text-brand-900 group-hover:underline dark:text-white">{PHONE_DISPLAY}</span>
              </span>
            </a>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#25D366]/15 text-[#128C7E] dark:text-[#25D366]">
                <WhatsAppIcon className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-xs text-slate-500">{c.whatsapp}</span>
                <span className="font-semibold text-brand-900 group-hover:underline dark:text-white">{c.whatsappText}</span>
              </span>
            </a>
          </div>

          <div className="card p-6">
            <h2 className="text-lg font-bold">{c.addresses}</h2>
            <ul className="mt-4 space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-600 dark:text-gold-400" />
                <span>
                  <strong className="block">{d.about.baku.name}</strong>
                  <span className="text-slate-600 dark:text-slate-400">{d.about.baku.address}</span>
                </span>
              </li>
              <li className="flex gap-3">
                <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-600 dark:text-gold-400" />
                <span>
                  <strong className="block">
                    {d.about.zaqatala.name} <span className="chip ml-1 py-0">{d.common.soon}</span>
                  </strong>
                  <span className="text-slate-600 dark:text-slate-400">{d.about.zaqatala.address}</span>
                </span>
              </li>
              <li className="flex gap-3">
                <GlobeIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-600 dark:text-gold-400" />
                <span>
                  <strong className="block">{d.about.online.name}</strong>
                  <span className="text-slate-600 dark:text-slate-400">{d.about.online.address}</span>
                </span>
              </li>
            </ul>
          </div>

          <div className="card p-6">
            <h2 className="text-lg font-bold">{c.socialsTitle}</h2>
            <div className="mt-3">
              <SocialPlaceholder d={d} />
            </div>
          </div>
        </div>

        <div id="trial" className="card scroll-mt-24 p-6 sm:p-8 lg:col-span-3">
          <h2 className="text-2xl font-bold">{c.form.title}</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400">{c.form.text}</p>
          <TrialForm d={d} />
        </div>
      </section>

      <section className="page pb-16">
        <h2 className="text-2xl font-bold">{c.mapTitle}</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {maps.map((map) => (
            <div key={map.key} className="card overflow-hidden">
              <iframe
                src={map.src}
                title={map.name}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="aspect-video w-full border-0"
              />
              <div className="flex items-center justify-between gap-3 p-4">
                <div>
                  <p className="font-bold">{map.name}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{map.address}</p>
                </div>
                {map.soon && <span className="chip">{d.common.soon}</span>}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
