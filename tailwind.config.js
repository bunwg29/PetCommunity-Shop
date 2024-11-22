/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './views/**/*.pug', // Quét tất cả các file .pug trong thư mục views
    './public/**/*.js', // Quét các file JS trong thư mục public
  ],
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
    },
  },
  plugins: [],
};
