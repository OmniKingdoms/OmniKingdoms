/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["var(--font-poppins)"],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    styled: true,
    themes: [
      {
        scroll: {
          primary: "#1976d2",
          secondary: "#3abff8",
          accent: "#e5649c",
          neutral: "#1B262D",
          "base-100": "#FFFFFF",
          info: "#2679DF",
          success: "#26B58A",
          warning: "#EBB728",
          error: "#EA5048",
        },
      },
    ],
  },
};
