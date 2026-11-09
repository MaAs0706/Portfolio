/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#211914",
        parchment: "#e8dcc2",
        gold: "#b18a53",
        wine: "#633b35"
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', "serif"],
        sans: ['"DM Sans"', "sans-serif"]
      }
    }
  },
  plugins: []
};
