/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      'black': '#0f0f10',
      'white': '#fff',
      'background' : '#191a1f',
      'sidebar' : '#141519',
      'color-text' : '#88888e',
      'primaryColor':'#0468eb',
      'comment':'#202227',
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
    extend: {
      boxShadow: {
        'bsd-bottom': 'rgb(47 47 47 / 40%)  0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset;',
      },
    },
  },
  plugins: [],
}


