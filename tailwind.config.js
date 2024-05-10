/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      poppins: ['Poppins', 'sans-serif'],
      roboto: ['Roboto', 'sans-serif'],
      inter: ['Inter', 'sans-serif'],
    },
    
    extend: {
      colors:{
        // "white":"#ffff",
        "black":"#000000",
        "light-black":"#212529",
        // "light-white":"#f8f9fa",
        // "dark":"#3295a8",
        "light-white":"rgba(255,255,255,0.17)",
        "green-1": "#038803",
        "green-2": "#002333",
        "green-3": "#4bc834",
        "green-4": "#1e6100",
        "purple-1": "#0a2c3c",
        primary: "#00404c",
        secondary: "#2cb072",
        dark: "#0a2c3c",
        greenMain: "#41ce8c",
        white: "#ffffff",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
}