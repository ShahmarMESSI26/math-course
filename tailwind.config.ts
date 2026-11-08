import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Основной цвет — глубокий индиго
        brand: {
          50: '#EEF0FB',
          100: '#DCE0F7',
          200: '#B9C1EF',
          300: '#8B9CFF',
          400: '#6577E6',
          500: '#4255C9',
          600: '#2F3FA6',
          700: '#24318A',
          800: '#1E2A78',
          900: '#171F57',
          950: '#0E1120',
        },
        // Акцент — «олимпийское золото»
        gold: {
          300: '#F8D27F',
          400: '#F5C25A',
          500: '#F2B33D',
          600: '#B7791F',
          700: '#8F5E14',
        },
        paper: '#FAFAF7',
        night: '#0E1120',
        'night-card': '#151A33',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-manrope)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
