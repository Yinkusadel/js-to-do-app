const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        josefin: ['Josefin Sans', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}
