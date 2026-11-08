import { FileIcon } from './icons';

export function PdfLink({ href, label, soon }: { href: string | null; label: string; soon: string }) {
  if (!href) {
    return (
      <span className="inline-flex items-center gap-1.5 text-slate-400 dark:text-slate-500">
        <FileIcon className="h-4 w-4" /> {label} — {soon}
      </span>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 font-medium text-brand-700 hover:underline dark:text-brand-300"
    >
      <FileIcon className="h-4 w-4" /> {label}
    </a>
  );
}
