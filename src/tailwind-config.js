/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
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
        '19': '4.75rem',
        '52': '13.25rem',
        '44': '11rem',
        '40': '10rem',
      },
      width: {
        '72': '18rem',
        '44': '11rem',
        '20': '5rem',
        '36': '9rem',
      },
      spacing: {
        '19': '4.75rem',
        '52': '13.25rem',
        '64': '16rem',
        '44': '11rem',
      }
    },
  },
  plugins: [],
};
