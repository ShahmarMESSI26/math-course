import katex from 'katex';

function render(tex: string, displayMode: boolean): string {
  return katex.renderToString(tex, { displayMode, throwOnError: false });
}

/**
 * Текст с формулами: $...$ — в строке, $$...$$ — отдельной строкой.
 * Контент берётся только из наших JSON-файлов, KaTeX экранирует ввод.
 */
export function MathText({ text, className }: { text: string; className?: string }) {
  const parts = text.split(/(\$\$[^$]+\$\$|\$[^$]+\$)/g).filter(Boolean);

  return (
    <span className={className}>
      {parts.map((part, i) => {
        if (part.startsWith('$$') && part.endsWith('$$') && part.length > 4) {
          return (
            <span
              key={i}
              className="my-2 block overflow-x-auto"
              dangerouslySetInnerHTML={{ __html: render(part.slice(2, -2), true) }}
            />
          );
        }
        if (part.startsWith('$') && part.endsWith('$') && part.length > 2) {
          return <span key={i} dangerouslySetInnerHTML={{ __html: render(part.slice(1, -1), false) }} />;
        }
        return <span key={i}>{part}</span>;
      })}
    </span>
  );
}

/** Одна формула без текста вокруг (для декоративных блоков). */
export function Formula({ tex, display = false, className }: { tex: string; display?: boolean; className?: string }) {
  return <span className={className} dangerouslySetInnerHTML={{ __html: render(tex, display) }} />;
}
