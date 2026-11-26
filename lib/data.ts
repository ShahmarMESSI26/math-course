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
  name: L10n;
  role: L10n;
  subjects: (Topic | 'olympiad')[];
  photo: string; // пусто = заглушка с инициалами
  bio: L10n;
};

export const olympiads = olympiadsJson as unknown as Olympiad[];
export const teachers = teachersJson as unknown as Teacher[];

export function getOlympiad(slug: string): Olympiad | undefined {
  return olympiads.find((o) => o.slug === slug);
}

/* ---------- Команда и достижения (data/achievements.json + data/teachers.json) ---------- */

export type Medal = 'trophy' | 'gold' | 'silver' | 'bronze' | 'honorable' | 'perfect' | 'finalist' | 'diploma';
export type AwardLevel = 'international' | 'national' | 'rating';

type Draftable = { draft?: boolean };
export type CompetitionInfo = { name: L10n; fullName: L10n; level: AwardLevel };
export type AwardResult = { competition: string; medal: Medal; count: number; note?: L10n };
type RawMember = Draftable & { teacher: string; results: AwardResult[]; highlights: L10n[] };
export type GrowthCase = Draftable & { student: string; grade: string; before: L10n; after: L10n };

/** Награды одного человека на одной олимпиаде — для вывода одной строкой. */
export type CompetitionGroup = { id: string; info: CompetitionInfo; results: AwardResult[] };
export type TeamMember = {
  teacher: Teacher;
  groups: CompetitionGroup[];
  highlights: L10n[];
  medals: number; // золото + серебро + бронза
};

/** Записи с "draft": true показываются только при локальной разработке. */
const showDrafts = process.env.NODE_ENV !== 'production';
const published = <T extends Draftable>(items: T[]) => items.filter((i) => showDrafts || !i.draft);

const rawAchievements = achievementsJson as unknown as {
  competitions: Record<string, CompetitionInfo>;
  team: RawMember[];
  cases: GrowthCase[];
};
const competitionInfo = rawAchievements.competitions;

const MEDALS: Medal[] = ['gold', 'silver', 'bronze'];
const sum = (results: AwardResult[], medals: Medal[]) =>
  results.filter((r) => medals.includes(r.medal)).reduce((s, r) => s + r.count, 0);

const team: TeamMember[] = published(rawAchievements.team).map((m) => {
  const teacher = teachers.find((t) => t.slug === m.teacher);
  if (!teacher) throw new Error(`achievements.json: преподаватель «${m.teacher}» не найден в teachers.json`);
  const groups: CompetitionGroup[] = [];
  for (const r of m.results) {
    const info = competitionInfo[r.competition];
    if (!info) throw new Error(`achievements.json: олимпиада «${r.competition}» не описана в competitions`);
    const group = groups.find((g) => g.id === r.competition);
    if (group) group.results.push(r);
    else groups.push({ id: r.competition, info, results: [r] });
  }
  return { teacher, groups, highlights: m.highlights ?? [], medals: sum(m.results, MEDALS) };
});

const allResults = team.flatMap((m) => m.groups.flatMap((g) => g.results));

export const achievements = {
  team,
  cases: published(rawAchievements.cases),
  /** Итоги по всей команде — считаются автоматически */
  totals: {
    medals: sum(allResults, MEDALS),
    gold: sum(allResults, ['gold']),
    trophies: sum(allResults, ['trophy']),
    olympiads: new Set(allResults.map((r) => r.competition)).size,
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
