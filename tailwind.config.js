/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{vue,js}',
    './app.vue',
    './layouts/**/*.vue',
    "./index.html", 
    "./pages/**/*.{vue,js,ts}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif']
      },
      colors: {
        jade: {
          50: "#effef7",
          100: "#dafeef",
          200: "#b8fadd",
          300: "#81f4c3",
          400: "#43e5a0",
          500: "#1acd81",
          600: "#0fa968",
          700: "#108554",
          800: "#126945",
          900: "#11563a",
          950: "#03301f",
        },
        lwm:{
          50:"#ff8103", //orange
          100:"#366cc2", //blue
          200:"#7a96bf", //light-grey-blue
          300:"#ffa600", //orange-yellow
          400:"#73b048", //green
          500:"#544d4f"//grey
        }
      },
      animation: {
        marquee: 'marquee 12s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },      
    },
  },
  plugins: [],
}

