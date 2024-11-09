// Import the withMT function
const withMT = require("@material-tailwind/react/utils/withMT");

/** @type {import('tailwindcss').Config} */
module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // specify the paths to all of your templates
  theme: {
    extend: {},
  },
  plugins: [],
});
