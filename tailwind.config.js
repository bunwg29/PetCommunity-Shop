/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './views/**/*.pug', // Quét tất cả các file .pug trong thư mục views
    './public/**/*.js', // Quét các file JS trong thư mục public
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
