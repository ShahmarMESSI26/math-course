/** @type {import('next').NextConfig} */
const nextConfig = {
  // Все адреса страниц заканчиваются на «/»: /az/, /az/about/ (как ресурс в Search Console).
  // Файлы с расширением (/az/sitemap.xml, /robots.txt, *.pdf) остаются без слэша.
  trailingSlash: true,

  // Корень сайта ведёт на азербайджанскую версию (основной язык)
  async redirects() {
    return [{ source: '/', destination: '/az/', permanent: false }];
  },
};

export default nextConfig;
