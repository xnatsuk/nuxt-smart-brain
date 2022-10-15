/** @type {import('tailwindcss').Config} */
module.exports = {
  jit: true,
  darkMode: 'class',
  content: [
    './components/**/*.{vue,js}',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
}
