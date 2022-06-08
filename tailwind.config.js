module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    backgroundImage: {
      'login-light': "url('../src/assets/login-light.jpg')",
    }
  },
  plugins: [ require('tailwind-scrollbar'),],
}
