/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#026535",
        om: "#f4802e",
        yellowCustom: "#FF8200",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
