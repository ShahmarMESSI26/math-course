/** Подставляет значения в шаблон: fmt('Sual {n} / {total}', { n: 1, total: 5 }) → 'Sual 1 / 5'. */
export function fmt(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => (key in vars ? String(vars[key]) : match));
}

/** Текст с формулами KaTeX → обычный текст (для meta description, превью в соцсетях). */
export function plainText(text: string): string {
  return text
    .replace(/\$\$?([^$]+)\$\$?/g, (_, tex: string) =>
      tex
        .replace(/\\[dt]?frac\{([^{}]*)\}\{([^{}]*)\}/g, '($1)/($2)')
        .replace(/\\sqrt\{([^{}]*)\}/g, '√$1')
        .replace(/\\mid/g, '|')
        .replace(/\\le(q)?\b/g, '≤')
        .replace(/\\ge(q)?\b/g, '≥')
        .replace(/\\cdot/g, '·')
        .replace(/\\ldots|\\dots/g, '…')
        .replace(/\\([a-zA-Z]+)/g, '$1')
        .replace(/\\[ ,;!]/g, ' ')
        .replace(/[{}]/g, '')
        .replace(/\^(\S)/g, '^$1'),
    )
    .replace(/\s+/g, ' ')
    .trim();
}

/** Секунды → «м:сс». */
export function formatTime(totalSec: number): string {
  const s = Math.max(0, Math.round(totalSec));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}
