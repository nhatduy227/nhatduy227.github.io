/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'navy-dark': '#0a192f',
        'navy-light': '#112240',
        'slate': '#8892b0',
        'slate-light': '#a8b2d1',
        'slate-lighter': '#ccd6f6',
        'white': '#e6f1ff',
        'accent': '#7F00FF', // Vibrant Violet/Purple
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
