// Логика диагностического теста. Без зависимостей от React — можно переиспользовать
// на сервере (например, сохранять результат в БД) и в будущем личном кабинете.
import quizJson from '@/data/quiz.json';
import type { L10n } from './locales';

export type QuizOption = string | L10n;

export type QuizQuestion = {
  id: string;
  topic: string;
  points: number;
  statement: L10n; // поддерживает KaTeX: $...$
  options: QuizOption[];
  answer: number; // индекс правильного варианта
};

export type Quiz = {
  timeLimitSec: number;
  /** Сколько баллов нужно для рекомендации «Сильная / Олимпиадная группа» */
  olympiadThreshold: number;
  questions: QuizQuestion[];
};

export const quiz = quizJson as unknown as Quiz;

export type QuizLevel = 'foundation' | 'olympiad';

export type QuizResult = {
  score: number;
  maxScore: number;
  correct: number;
  total: number;
  level: QuizLevel;
};

/** answers[i] — выбранный индекс для вопроса i (null — без ответа). */
export function scoreQuiz(
  questions: Pick<QuizQuestion, 'points' | 'answer'>[],
  answers: (number | null)[],
  olympiadThreshold: number,
): QuizResult {
  let score = 0;
  let correct = 0;
  questions.forEach((q, i) => {
    if (answers[i] === q.answer) {
      score += q.points;
      correct += 1;
    }
  });
  const maxScore = questions.reduce((sum, q) => sum + q.points, 0);
  return {
    score,
    maxScore,
    correct,
    total: questions.length,
    level: score >= olympiadThreshold ? 'olympiad' : 'foundation',
  };
}
