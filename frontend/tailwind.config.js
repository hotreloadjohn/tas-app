const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  // content: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      padding: {
        "1/2": "50%",
        full: "100%",
      },
      backgroundImage: {
        bgimg: "url('./assets/spsoc.png')",
      },
    },
  },
  plugins: [require("daisyui")],
};
