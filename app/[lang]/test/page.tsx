import type { Metadata } from 'next';
import { getDict } from '@/lib/i18n';
import { asLocale, t } from '@/lib/locales';
import { pageMetadata } from '@/lib/seo';
import { quiz } from '@/lib/quiz';
import { PageHeader } from '@/components/Section';
import { MathText } from '@/components/MathText';
import { LevelQuiz, type PreparedQuestion } from '@/components/quiz/LevelQuiz';

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = asLocale((await params).lang);
  const d = getDict(lang);
  return pageMetadata(lang, '/test', d.quiz.title, d.quiz.metaDescription);
}

export default async function TestPage({ params }: Props) {
  const lang = asLocale((await params).lang);
  const d = getDict(lang);

  // Формулы рендерим на сервере — клиент получает готовую разметку
  const questions: PreparedQuestion[] = quiz.questions.map((item) => ({
    id: item.id,
    points: item.points,
    answer: item.answer,
    statement: <MathText text={t(item.statement, lang)} />,
    options: item.options.map((o, i) => <MathText key={i} text={typeof o === 'string' ? o : t(o, lang)} />),
  }));

  return (
    <>
      <PageHeader title={d.quiz.title} subtitle={d.quiz.subtitle} />
      <section className="page py-12 sm:py-16">
        <LevelQuiz
          text={d.quiz}
          langName={d.common.langName}
          questions={questions}
          timeLimitSec={quiz.timeLimitSec}
          olympiadThreshold={quiz.olympiadThreshold}
        />
      </section>
    </>
  );
}
