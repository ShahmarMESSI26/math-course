// Слой доступа к данным. Сейчас всё читается из JSON-файлов в /data.
// При переходе на базу данных (например, Supabase) меняются только функции этого файла —
// страницы и компоненты продолжают работать как прежде.
import olympiadsJson from '@/data/olympiads.json';
import teachersJson from '@/data/teachers.json';
import achievementsJson from '@/data/achievements.json';
import problemsJson from '@/data/problems.json';
import type { L10n, L10nList } from './locales';
import type { Topic } from './site';

export type Problem = {
  n: number;
  topic: Topic;
  statement: L10n; // поддерживает формулы KaTeX: $...$ и $$...$$
};

export type YearEntry = {
  year: number;
  problems: string | null; // путь к PDF в /public, null = «скоро»
  solutions: string | null;
  items: Problem[];
};

export type Olympiad = {
  slug: string;
  name: string;
  fullName: L10n;
  level: L10n;
  format: L10n;
  description: L10n;
  topics: Topic[];
  years: YearEntry[];
};

export type Teacher = {
  slug: string;
  name: string;
  subjects: (Topic | 'olympiad')[];
  photo: string; // пусто = заглушка с инициалами
  bio: L10n;
};

export const olympiads = olympiadsJson as unknown as Olympiad[];
export const teachers = teachersJson as unknown as Teacher[];

export function getOlympiad(slug: string): Olympiad | undefined {
  return olympiads.find((o) => o.slug === slug);
}

/* ---------- Достижения (data/achievements.json) ---------- */

export type Medal = 'trophy' | 'gold' | 'silver' | 'bronze' | 'honorable' | 'diploma' | 'finalist';
export type AwardLevel = 'international' | 'national' | 'rating';

type Draftable = { draft?: boolean };
export type AwardResult = { medal: Medal; count: number; note?: L10n };
export type Competition = Draftable & {
  name: L10n;
  fullName: L10n;
  level: AwardLevel;
  highlight?: boolean; // выделить карточку (главное достижение)
  results: AwardResult[];
};
export type GrowthCase = Draftable & { student: string; grade: string; before: L10n; after: L10n };

/** Записи с "draft": true показываются только при локальной разработке. */
const showDrafts = process.env.NODE_ENV !== 'production';
const published = <T extends Draftable>(items: T[]) => items.filter((i) => showDrafts || !i.draft);

const rawAchievements = achievementsJson as unknown as { competitions: Competition[]; cases: GrowthCase[] };

const competitions = published(rawAchievements.competitions);
const countOf = (...medals: Medal[]) =>
  competitions.reduce(
    (sum, c) => sum + c.results.filter((r) => medals.includes(r.medal)).reduce((s, r) => s + r.count, 0),
    0,
  );

export const achievements = {
  competitions,
  cases: published(rawAchievements.cases),
  /** Итоги считаются автоматически из списка олимпиад */
  totals: {
    medals: countOf('gold', 'silver', 'bronze'),
    gold: countOf('gold'),
    trophies: countOf('trophy'),
    olympiads: competitions.length,
  },
};

/* ---------- Олимпиадные разборы (data/problems.json) ---------- */

export type ProblemPost = {
  slug: string; // адрес страницы: /az/problems/<slug>/
  source: string; // например «IMO 1959, P1»; пусто = «Классическая задача»
  olympiad: string | null; // slug из olympiads.json или null
  year: number | null;
  topic: Topic;
  difficulty: 1 | 2 | 3;
  date: string; // дата публикации, ГГГГ-ММ-ДД
  title: L10n;
  summary: L10n; // описание для Google и карточки
  statement: L10n; // KaTeX: $...$ и $$...$$
  solution: L10nList; // абзацы решения
  answer?: L10n;
};

export const problemPosts = (problemsJson as unknown as ProblemPost[])
  .slice()
  .sort((a, b) => b.date.localeCompare(a.date));

export function getProblemPost(slug: string): ProblemPost | undefined {
  return problemPosts.find((p) => p.slug === slug);
}
