const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        myBlue: {
          50: '#f2f7fb',
          100: '#e7f0f8',
          200: '#d3e2f2',
          300: '#b9cfe8',
          400: '#9cb6dd',
          500: '#839dd1',
          600: '#6a7fc1',
          700: '#6374ae',
          800: '#4a5989',
          900: '#414e6e',
          950: '#262c40',
      },
      },
    },
  },
  plugins: [],
});
