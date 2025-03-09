import {colors, heroui} from "@heroui/theme"

/** @type {import('tailwindcss').Config} */
module.exports = {
  
  content: [
    "./index.html",
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      league: ["League Spartan", "sans-serif"],
      cardo: ["Cardo", "serif"],
    },
    extend: {},
  },
  darkMode: "class",
  plugins: [heroui({
    prefix: 'padre',
    themes: {
      light: {
        colors: {  // light theme colors
          background: '#dad7cd',
          backdrop: '#d3dadd',
          primary: "#242d61",
        },
      },
      dark: { // dark theme colors
        colors: {
          backdrop: '#2e2d37'
        }, 
      },
    }
  })],
}
