import Link from 'next/link';

// not-found не получает параметр языка, поэтому текст на трёх языках
export default function NotFound() {
  return (
    <section className="bg-grid">
      <div className="page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <p className="font-display text-7xl font-extrabold text-gold-500">404</p>
        <h1 className="mt-4 text-2xl font-bold">Səhifə tapılmadı · Страница не найдена · Page not found</h1>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/az/" className="btn-primary">AZ</Link>
          <Link href="/ru/" className="btn-ghost">RU</Link>
          <Link href="/en/" className="btn-ghost">EN</Link>
        </div>
      </div>
    </section>
  );
}
