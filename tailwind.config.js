/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'mls-bg': '#1B4332',
        'mls-card': '#40916C',
        'mls-card-hover': '#52B788',
        'mls-accent': '#95D5B2',
        'mls-text': '#D8F3DC',
      },
      fontFamily: {
        'bebas': ['"Bebas Neue"', 'sans-serif'],
        'dm': ['"DM Sans"', 'sans-serif'],
      },
      animation: {
        'pulse-fast': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
