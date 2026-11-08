import olympiadsJson from '@/data/olympiads.json';
import teachersJson from '@/data/teachers.json';
import type { L10n } from './locales';
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
