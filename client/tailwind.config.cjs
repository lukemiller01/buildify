/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'jet': '#222326',
      'emerald': '#1db954',
      'emerald-tint': '#4ac776',

      'white': '#ffffff',
      'black': '#000000',
    }
  },
  plugins: [],
}