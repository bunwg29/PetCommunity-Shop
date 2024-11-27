/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./views/**/*.pug', './public/**/*.js'],
  theme: {
    fontFamily: {
      display: ['Source Serif Pro', 'Georgia', 'serif'],
      body: ['Synonym', 'system-ui', 'sans-serif'],
    },
    extend: {
      colors: {
        linearFooter1: '#FCEED5',
        linearFooter2: '#FFE7BA',
      },
      screens: {
        xs: '300px',
      },
    },
  },
  plugins: [],
};
