/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin';
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {


      fontFamily: {
        fontFamily: {
          sans: ['Noto Sans', 'sans-serif'],
        },
      },

      colors: ()=>({
        n: {
          1: "#111827",
          2: ' #1f2937',
          3: "#374151",
          4: "#374151 ",
          5: " #9ca3af",
          0: "#dc2626"
        }
      })
    },
  },
  plugins: [],
}

