import type { Dict } from '@/lib/i18n';

// Когда соцсети появятся: замените <span> на <a href="https://instagram.com/...">
const NETWORKS = ['Instagram', 'Telegram', 'Facebook', 'YouTube', 'TikTok'];

export function SocialPlaceholder({ d }: { d: Dict }) {
  return (
    <div>
      <p className="text-sm text-slate-600 dark:text-slate-400">{d.social.text}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {NETWORKS.map((name) => (
          <span key={name} className="chip cursor-not-allowed opacity-70" title={d.common.soon}>
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
