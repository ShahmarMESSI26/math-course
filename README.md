# Shahmath — сайт центра подготовки к математическим олимпиадам

Next.js 15 (App Router) + Tailwind CSS + KaTeX. Три языка: `az` (основной), `ru`, `en`.

## Запуск локально

1. Установите **Node.js 20 LTS**: https://nodejs.org (при установке оставьте галочку «Add to PATH»).
2. Откройте терминал в папке проекта и выполните:

```bash
npm install
npm run dev
```

3. Откройте http://localhost:3000 — сайт перенаправит на `/az`.

Проверка production-сборки: `npm run build`, затем `npm start`.

## Где что менять

| Что | Файл |
|---|---|
| Тексты интерфейса (3 языка) | `messages/az.json`, `ru.json`, `en.json` |
| Преподаватели | `data/teachers.json` |
| Олимпиады, годы, задачи, PDF | `data/olympiads.json` |
| Телефон, WhatsApp, цены, карты | `lib/site.ts` |
| Цвета и шрифты | `tailwind.config.ts`, `app/globals.css` |
| Соцсети (когда появятся) | `components/SocialPlaceholder.tsx` |

### Фото преподавателей
Положите фото в `public/teachers/`, например `public/teachers/ismet-agazade.jpg`,
и укажите в `data/teachers.json`: `"photo": "/teachers/ismet-agazade.jpg"`.
Пока поле пустое, показывается заглушка с инициалами.

### PDF с задачами и решениями
Положите файлы в `public/materials/<олимпиада>/<год>/`, например
`public/materials/imo/2026/problems.pdf`, и укажите путь в `data/olympiads.json`:

```json
{ "year": 2026, "problems": "/materials/imo/2026/problems.pdf", "solutions": "/materials/imo/2026/solutions.pdf", "items": [] }
```

Пока значение `null`, на сайте показывается «tezliklə / скоро».

### Задачи с формулами
В `items` каждая задача: номер, тема (`algebra`, `geometry`, `combinatorics`, `number-theory`)
и условие на трёх языках. Формулы пишутся в KaTeX: `$x^2$` — в строке, `$$...$$` — отдельной строкой.
В JSON обратный слэш удваивается: `"$a \\ge b$"`.
Сейчас там примеры с пометкой «[Nümunə]» — замените их настоящими задачами.

### Адреса и карты
Адреса — в `messages/*.json` (`about.baku.address`, `about.zaqatala.address`).
Карты — в `lib/site.ts` (`MAPS`): замените `q=Bakı` на точный адрес.

## Публикация

### Vercel (рекомендуется)
1. Загрузите проект на GitHub.
2. https://vercel.com → **Add New → Project** → выберите репозиторий → **Deploy** (настройки определятся сами).
3. **Settings → Domains** → добавьте `shahmath.az` и `www.shahmath.az`.
   У регистратора домена пропишите DNS-записи, которые покажет Vercel
   (обычно `A @ → 76.76.21.21` и `CNAME www → cname.vercel-dns.com`).

### Netlify
1. Загрузите проект на GitHub.
2. https://app.netlify.com → **Add new site → Import an existing project** → репозиторий.
   Netlify сам распознает Next.js (build command `npm run build`).
3. **Domain management** → добавьте `shahmath.az` и пропишите DNS по инструкции Netlify.

После каждого `git push` сайт обновляется автоматически.
