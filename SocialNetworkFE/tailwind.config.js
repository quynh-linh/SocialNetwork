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
      'second' :'#141e2e',
      'search' :'#e4e6eb',
      'text-primary': '#3498db',
      'error' : '#e41e3f',
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
    extend: {
      boxShadow: {
        'bsd-bottom': 'box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;',
      }
    },
  },
  plugins: [],
}


