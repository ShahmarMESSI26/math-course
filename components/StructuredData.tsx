/** Произвольные структурированные данные schema.org (JSON-LD). */
export function StructuredData({ data }: { data: Record<string, unknown> }) {
  // Экранируем «<», чтобы текст не мог закрыть тег <script>
  const json = JSON.stringify(data).replace(/</g, '\\u003c');
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
