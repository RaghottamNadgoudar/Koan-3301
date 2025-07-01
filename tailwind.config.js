// tailwind.config.js (Corrected for v2)
module.exports = {
  // We've updated the path to be more specific to your project structure
  purge: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false,
  theme: {
    extend: {
      animation: {
        "subtle-pulse": "pulse 7s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      boxShadow: { "glow-cyan": "0 0 25px rgba(0, 255, 255, 0.5)" },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
