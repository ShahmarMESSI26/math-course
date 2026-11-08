import type { ReactNode } from 'react';
import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { Inter, Manrope } from 'next/font/google';
import 'katex/dist/katex.min.css';
import '../globals.css';
import { getDict } from '@/lib/i18n';
import { isLocale, locales } from '@/lib/locales';
import { SITE_URL } from '@/lib/site';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { MobileCTA } from '@/components/MobileCTA';
import { JsonLd } from '@/components/JsonLd';

const inter = Inter({ subsets: ['latin', 'latin-ext', 'cyrillic'], variable: '--font-inter', display: 'swap' });
const manrope = Manrope({ subsets: ['latin', 'latin-ext', 'cyrillic'], variable: '--font-manrope', display: 'swap' });

type Props = { children: ReactNode; params: Promise<{ lang: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: Omit<Props, 'children'>): Promise<Metadata> {
  const { lang } = await params;
  const d = getDict(lang);
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: d.meta.title, template: '%s | Shahmath' },
    description: d.meta.description,
    icons: { icon: '/favicon.svg' },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FAFAF7' },
    { media: '(prefers-color-scheme: dark)', color: '#0E1120' },
  ],
};

export default async function LangLayout({ children, params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const d = getDict(lang);

  return (
    <html lang={lang} suppressHydrationWarning className={`${inter.variable} ${manrope.variable}`}>
      <body className="min-h-screen">
        <ThemeProvider>
          <Header lang={lang} d={d} />
          <main className="pb-20 md:pb-0">{children}</main>
          <Footer lang={lang} d={d} />
          <MobileCTA d={d} />
        </ThemeProvider>
        <JsonLd lang={lang} />
      </body>
    </html>
  );
}
