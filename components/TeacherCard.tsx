import Image from 'next/image';
import type { Dict } from '@/lib/i18n';
import type { Teacher } from '@/lib/data';
import { t, type Locale } from '@/lib/locales';

export function TeacherCard({
  teacher,
  lang,
  d,
  compact = false,
}: {
  teacher: Teacher;
  lang: Locale;
  d: Dict;
  compact?: boolean;
}) {
  const initials = teacher.name
    .split(' ')
    .map((w) => w[0])
    .join('');

  return (
    <article className="card flex flex-col overflow-hidden">
      <div className="relative aspect-[4/3] bg-gradient-to-br from-brand-800 to-brand-600 dark:from-brand-700 dark:to-brand-900">
        {teacher.photo ? (
          <Image
            src={teacher.photo}
            alt={teacher.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          // Фото-заглушка: инициалы на «тетрадной» сетке
          <div className="bg-grid absolute inset-0 flex items-center justify-center [--grid-line:rgba(255,255,255,0.08)]">
            <span className="font-display text-5xl font-extrabold text-gold-400">{initials}</span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold">{teacher.name}</h3>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {teacher.subjects.map((s) => (
            <span key={s} className="chip">
              {d.topics[s]}
            </span>
          ))}
        </div>
        <p className={`mt-3 text-sm text-slate-600 dark:text-slate-400 ${compact ? 'line-clamp-3' : ''}`}>
          {t(teacher.bio, lang)}
        </p>
      </div>
    </article>
  );
}
