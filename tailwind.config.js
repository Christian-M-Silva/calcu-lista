/** @type {import('tailwindcss').Config} */
// tailwind.config.js
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    screens: {
      gt520: "520px",
      // => @media (min-width: 640px) { ... }
    },
  },
  plugins: [],
};
