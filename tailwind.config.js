/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'neon-pink': '#FF00FF',
        'neon-cyan': '#00FFFF',
        'neon-yellow': '#FFFF00',
        'dark': '#0A0A0A',
      },
      animation: {
        'pulse': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      fontFamily: {
        marker: ['Permanent Marker', 'cursive'],
        sans: ['Archivo', 'sans-serif'],
      },
      boxShadow: {
        'neon-pink': '0 0 5px #FF00FF, 0 0 10px #FF00FF, 0 0 15px #FF00FF',
        'neon-cyan': '0 0 5px #00FFFF, 0 0 10px #00FFFF, 0 0 15px #00FFFF',
        'neon-yellow': '0 0 5px #FFFF00, 0 0 10px #FFFF00, 0 0 15px #FFFF00',
      },
    },
  },
  plugins: [],
};