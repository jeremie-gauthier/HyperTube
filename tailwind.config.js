// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./pages/**/*.tsx", "./components/**/*.tsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      red: "#e50914",
      grey: {
        dark: "#222",
        light: "#939393",
      },
      blue: colors.blue,
      green: { DEFAULT: colors.lime[600] },
      white: "#fff",
      black: "#141414",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
