/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'] },
      colors: {
        brand: { 50: '#EAF3FB', 100: '#CFE4F5', 500: '#0B6FB8', 600: '#095E9C', 700: '#074C7F' },
        accent: { lime: '#B3CC12', pink: '#E5328A', sky: '#7FCEF5', orange: '#F29B3C', green: '#3FA535', peach: '#FBC57D' },
        ink: { DEFAULT: '#3C4852', soft: '#7A8B94', line: '#E9EEF2', bg: '#F6F8FA' },
      },
      boxShadow: { card: '0 1px 3px rgba(16,24,40,0.06), 0 1px 2px rgba(16,24,40,0.04)' },
    },
  },
  plugins: [],
};
