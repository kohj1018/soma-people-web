const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ['Pretendard', ...defaultTheme.fontFamily.sans],
        roboto: ['Roboto', ...defaultTheme.fontFamily.sans]
      },
      boxShadow: {
        nav: '0px -4px 32px rgba(0, 0, 0, 0.04)',
        profileCard: '0px 12px 32px rgba(0, 0, 0, 0.06)'
      },
      dropShadow: {
        FAB: '4px 4px 32px rgba(59, 130, 246, 0.4)'
      }
    },
  },
  plugins: [],
}
