module.exports = {
  purge: { content: ['./public/**/*.html', './src/**/*.vue'] },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      textColor: {
        primary: '#D8DEE9',
        secondary: '#E5E9F0',
        highlighted: '#ECEFF4',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('tailwind-nord')],
}
