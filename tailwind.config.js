/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e8edf3',
          100: '#d1dce7',
          200: '#a3b8cf',
          300: '#7595b7',
          400: '#47719f',
          500: '#1a3c5e',
          600: '#15304b',
          700: '#102438',
          800: '#0a1826',
          900: '#050c13',
          DEFAULT: '#1a3c5e',
        },
        gold: {
          50: '#f7f0e3',
          100: '#efe1c7',
          200: '#dfc38f',
          300: '#cfa557',
          400: '#c9a84c',
          500: '#b8973a',
          600: '#a08632',
          700: '#887529',
          800: '#706521',
          900: '#585418',
          DEFAULT: '#c9a84c',
        },
        burgundy: {
          500: '#8b3a3a',
          DEFAULT: '#8b3a3a',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'Merriweather', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 4px 6px -2px rgba(0, 0, 0, 0.03)',
        medium: '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.02)',
        large: '0 10px 50px -12px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}