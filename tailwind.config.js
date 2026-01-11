import { colors, heroui } from "@heroui/theme"

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
      glass: ["Glass Antiqua", "serif"],
      cormorant: ["Cormorant Garamond", "serif"],
      lato: ["Lato", "sans-serif"],
    },
    extend: {},
  },
  darkMode: "class",
  plugins: [heroui({
    prefix: 'padre',
    themes: {
      light: {
        colors: {
          background: "#1a1a1a", // Dark background
          backdrop: "#262626",   // Slightly lighter dark
          primary: "#c59d5f",    // Gold accent
          foreground: "#ffffff",
        },
      },
      dark: {
        colors: {
          background: "#1a1a1a",
          backdrop: "#262626",
          primary: "#c59d5f",
          foreground: "#ffffff",
        },
      },
    }
  })],
}
