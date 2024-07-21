import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        serif: ["Lora", ...defaultTheme.fontFamily.serif],
      },
      backgroundImage: {
        "topography-light": "linear-gradient(rgba(175, 190, 207, 0.6), rgba(175, 190, 207, 0.6)), url('/topography.png')",
        "topography-dark": "linear-gradient(rgba(37, 50, 65, 0.8), rgba(37, 50, 65, 0.8)), url('/topography.png')",
      }
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
