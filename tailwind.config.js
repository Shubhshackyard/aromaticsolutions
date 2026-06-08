/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50:  '#f0faf4',
          100: '#d9f2e3',
          200: '#b3e5c8',
          300: '#7dd0a3',
          400: '#45b47a',
          500: '#259a5e',
          600: '#1a7b4b',
          700: '#17623c',
          800: '#154e31',
          900: '#1b4332',
          950: '#0a2118',
        },
        amber: {
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
        },
        gold: '#d4af37',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
