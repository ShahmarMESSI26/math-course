// Правила подбора программы (виджет «Подбор программы»). Без React — легко покрыть тестами
// или перенести на сервер / в личный кабинет.
import type { Dict } from './i18n';
import { PLANS, type PlanKey } from './site';

// Только направления, которые центр реально ведёт: школьная программа и олимпиадная математика.
export const GOALS = ['school', 'olympiad'] as const;
export type Goal = (typeof GOALS)[number];

export const STUDY_FORMATS = ['baku', 'online', 'individual'] as const;
export type StudyFormat = (typeof STUDY_FORMATS)[number];

export type Program = 'foundation' | 'olympiad';

export function recommendProgram(goal: Goal, format: StudyFormat): { program: Program; planKey: PlanKey } {
  const program: Program = goal === 'school' ? 'foundation' : goal;
  const planKey: PlanKey =
    format === 'baku' ? (program === 'olympiad' ? 'two' : 'one') : format === 'online' ? 'online' : 'individual';
  return { program, planKey };
}

export function getPlan(key: PlanKey) {
  return PLANS.find((p) => p.key === key)!;
}

/** Цена тарифа текстом: «250 AZN / ay» или «Qiymət sorğu ilə». */
export function planPriceText(price: number | null, d: Pick<Dict, 'common'>): string {
  return price === null ? d.common.priceOnRequest : `${price} ${d.common.perMonth}`;
}
