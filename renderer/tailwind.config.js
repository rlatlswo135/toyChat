const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./renderer/pages/**/*.{js,ts,jsx,tsx}",
    "./renderer/components/**/*.{js,ts,jsx,tsx}",
  ],
  important: true,
  theme: {
    colors: {
      // use colors only specified
      ...colors,
      white: colors.white,
      gray: colors.gray,
      blue: colors.blue,
      logout: colors.gray[500],
      time: "rgb(209 213 219 / 0.3)",
    },
    extend: {},
  },
  plugins: [],
};
