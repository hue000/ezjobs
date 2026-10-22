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
        primary: '#1A73E8',
        accent: '#FF6B35',
      },
      fontFamily: {
        bengali: ['Hind Siliguri', 'Noto Sans Bengali', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
