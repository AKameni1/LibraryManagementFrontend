/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      spacing: {
        '9rem': '9rem',
        '12rem': '12rem',
        '15rem': '15rem'
      }
    }
  },
  plugins: []
}
