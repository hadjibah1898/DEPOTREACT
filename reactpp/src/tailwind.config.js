/**  @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src//*.{js,jsx,ts,tsx}", // ← pour que Tailwind analyse tous les fichiers React
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};