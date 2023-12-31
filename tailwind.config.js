/** @type {import('tailwindcss').Config} */
export default {
  corePlugins: {
    preflight: false,
  },
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        p2c: "0px 7px 10px rgba(0, 0, 0, 0.15)",
      },
      colors: {
        primary: "#1864AB",
        "p2c-red": "#a10e22",
        "p2c-gray": "#B3B3B3",
        "p2c-grey": "#9D9D9D",
      },
      borderColor: {
        "p2c-gray": "#B3B3B3",
      },
      backgroundColor: {
        primary: "#1864AB",
        secondary: "#00000073",
        "light-blue": "#F2FAFA",
      },
      backgroundImage: {
        "hero-bg": "url(./src/assets/hero-bg.png)",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
