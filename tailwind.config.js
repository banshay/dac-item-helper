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
      fontSize: {
        dynamic: 'clamp(0.25rem, 1.5rem, 1.5rem)',
      },
      flex: {
        '10': '0 0 10em',
      },
      height: {
        '9/10': '90%',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('tailwind-nord'), require('tailwindcss-debug-screens')],
}
