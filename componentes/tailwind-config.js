/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
      },
      colors: {
        'brand-light-black': '#1D1D1D',
        'brand-yellow': '#FFEAA2',
      },
      height: {
        '19': '4.75rem', // 76px
        '52': '13.25rem', // 53px
        '44': '11rem', // 176px
        '40': '10rem', // 160px
      },
      width: {
        '72': '18rem', // 288px
        '44': '11rem', // 176px
        '20': '5rem', // 80px
        '36': '9rem', // 144px
      },
      spacing: {
        '19': '4.75rem', // 76px
        '52': '13.25rem', // 53px
        '64': '16rem', // 256px
        '44': '11rem', // 176px
      }
    },
  },
  plugins: [],
}