/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          100: "#B0C4DE", // Light Navy
          200: "#7B9ED8", // Light Navy Darker
          300: "#4682B4", // Steel Blue
          400: "#4169E1", // Royal Blue
          500: "#1E90FF", // Dodger Blue
          600: "#1C6DD0", // Navy Blue (primary)
          700: "#1A3D80", // Navy Blue Darker
          800: "#0F1E60", // Navy Blue Darker
          900: "#000080", // Dark Navy
        },
      },
    },
  },
  plugins: [],
};
