import type { Dict } from '@/lib/i18n';
import { Faq } from './Faq';
import { Section } from './Section';
import { StructuredData } from './StructuredData';

/** Секция «Частые вопросы» + разметка FAQPage для Google. Используйте не больше одного раза на странице. */
export function FaqSection({ d, className = '' }: { d: Dict; className?: string }) {
  const items = d.faq.items;
  return (
    <Section title={d.faq.title} subtitle={d.faq.subtitle} className={className}>
      <div className="max-w-3xl">
        <Faq items={items} />
      </div>
      <StructuredData
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: items.map((item) => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: { '@type': 'Answer', text: item.a },
          })),
        }}
      />
    </Section>
  );
}
