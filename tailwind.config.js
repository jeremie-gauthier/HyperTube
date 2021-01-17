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
      white: "#fff",
      black: "#141414",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
