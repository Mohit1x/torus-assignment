/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customLight: "#9181F4",
        customDark: "#5038ED",
      },
      backgroundImage: {
        "custom-gradient": "linear-gradient(to right, #9181F4, #5038ED)",
      },
    },
  },
  plugins: [],
};
