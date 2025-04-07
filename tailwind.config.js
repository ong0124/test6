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
      }      
    },
  },
  plugins: [],
}

