/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{tsx,jsx}', './node_modules/flowbite/**/*.js'],
  theme: {
    fontFamily: {
      display: ['Bossa', 'sans-serif'],
      body: ['Inter', 'sans-serif'],
    },
    fontWeight: {
      light: 200,
      normal: 300,
      medium: 400,
      semibold: 500,
      bold: 600,
      extrabold: 700,
      black: 800,
    },
    extend: {
      colors: {
        n3blue: {
          100: '#e3f5ff',
          200: '#aae0ff',
          300: '#71ccff',
          400: '#39b8ff',
          DEFAULT: '#69c9ff',
          500: '#00a3ff',
          600: '#007fc6',
          700: '#005b8e',
          800: '#003655',
          900: '#00121c',
        },
        n3green: '#88F1BB',
        'n3green-100': '#D5FFFF',
        n3bg: '#F4FAFF',
        n3nav: '#7395B2',
      },
    },
  },
  plugins: [require('flowbite/plugin')],
}
