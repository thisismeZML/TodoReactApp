/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "6rem",
        "2xl": "6rem",
      },
    },
    extend: {
      fontFamily: {
        'custom': ['Work Sans', 'Arial', 'sans-serif'],
      },
      colors: {
        "primary-clr": "#3670C7",
        "light-clr": "#f4f4f4",
        "dark-clr": "#333",
        "warning-clr": "#632424",
      },
      listStyleType: {
        square: 'square',
        circle: 'circle',
        roman: 'upper-roman',
      },
    },
  },
  plugins: [],
};
