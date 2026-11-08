/** @type {import('next').NextConfig} */
const nextConfig = {
  // Корень сайта ведёт на азербайджанскую версию (основной язык)
  async redirects() {
    return [{ source: '/', destination: '/az', permanent: false }];
  },
};

export default nextConfig;
