/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        toolButtonGrey : '#EFEFEF',
        textGrey : '#555555',
        primaryDark : '#696969',
        primaryCanvas : '#333333',
        black : '#000000',
        white : '#ffffff'
      }
    },
  },
  plugins: [],
}