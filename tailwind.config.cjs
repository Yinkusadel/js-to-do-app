module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        custom: ['Josefin Sans', 'sans-serif'],
      },
      backgroundImage: {
        headerimage : "url('src/images/mobile-blue-bg.png')",
      }
    },
  },

  plugins: [],
}
