import { Formula } from './MathText';

const FORMULAS = [
  { tex: 'e^{i\\pi} + 1 = 0', cls: 'left-8 top-10 text-2xl text-gold-400' },
  { tex: '\\sum_{k=1}^{n} k = \\frac{n(n+1)}{2}', cls: 'right-8 top-28 text-xl text-white' },
  { tex: 'a^2 + b^2 \\ge 2ab', cls: 'left-10 top-[13.5rem] text-2xl text-white' },
  { tex: '\\binom{n}{k} = \\binom{n-1}{k-1} + \\binom{n-1}{k}', cls: 'right-6 bottom-24 text-lg text-brand-200' },
  { tex: 'a^{p} \\equiv a \\pmod{p}', cls: 'left-10 bottom-10 text-xl text-gold-300' },
];

/** Декоративная «доска» с формулами и вписанной окружностью на главной. */
export function HeroFormulas() {
  return (
    <div aria-hidden="true" className="relative hidden h-[420px] lg:block">
      <div className="bg-grid absolute inset-0 rounded-3xl bg-brand-800 shadow-xl [--grid-line:rgba(255,255,255,0.07)] dark:bg-brand-900" />
      <svg viewBox="0 0 400 400" className="absolute inset-0 m-auto h-3/4 w-3/4 opacity-25">
        <polygon points="200,40 360,330 40,330" fill="none" stroke="white" strokeWidth="1.5" />
        <circle cx="200" cy="235.5" r="94.5" fill="none" stroke="#F2B33D" strokeWidth="1.5" />
        <line x1="200" y1="40" x2="200" y2="330" stroke="white" strokeWidth="1" strokeDasharray="4 6" />
      </svg>
      {FORMULAS.map((f) => (
        <Formula key={f.tex} tex={f.tex} className={`absolute ${f.cls}`} />
      ))}
    </div>
  );
}
