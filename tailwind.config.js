const { blackA, mauve, violet } = require('@radix-ui/colors');

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {

    fontSize: {
      xs: 14,
      sm: 16,
      md: 18,
      lg: 24,
      xl: 32
    },

    colors: {
      cyan: {
        300: '#A3E3FA',
        500: '#81D8F7'
      },

      transparent: 'transparent',

      white: '#ffffff',
      black: '#000',

      gray: {
        900: '#121214',
        600: '#202024',
        300: '#7C7C8A'
      },

      ...blackA,
      ...mauve,
      ...violet,
    },

    extend: {
      fontFamily: {
        sans: 'Inter, sans-serif'
      },

      screens: {
        notebook: {
          raw: '(max-height:600px)',
        },
        mobile: {
          raw: '(max-width: 648px)'
        },

      }
    },
  },
  plugins: [],
}