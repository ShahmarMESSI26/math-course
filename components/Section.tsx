import type { ReactNode } from 'react';

export function Section({
  id,
  title,
  subtitle,
  children,
  className = '',
}: {
  id?: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`py-16 sm:py-20 ${className}`}>
      <div className="page">
        {title && (
          <div className="mb-10 max-w-2xl">
            <h2 className="text-3xl font-bold sm:text-4xl">{title}</h2>
            {subtitle && <p className="mt-3 text-slate-600 dark:text-slate-400">{subtitle}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

export function PageHeader({ title, subtitle, children }: { title: string; subtitle?: string; children?: ReactNode }) {
  return (
    <section className="bg-grid border-b border-slate-200 dark:border-white/10">
      <div className="page py-14 sm:py-20">
        {children}
        <h1 className="text-4xl font-extrabold sm:text-5xl">{title}</h1>
        {subtitle && <p className="mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">{subtitle}</p>}
      </div>
    </section>
  );
}
