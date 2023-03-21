/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-conic": "conic-gradient(var(--tw-gradient-stops))",
      },
      animation: {
        disco: "disco 3.5s linear infinite",
        rotate: "rotate 5s linear infinite",
      },
      fontFamily: {
        poppins: ["var(--font-poppins)"],
      },
      keyframes: {
        disco: {
          "0%": { transform: "translateY(-50%) rotate(0deg)" },
          "100%": { transform: "translateY(-50%) rotate(360deg)" },
        },
        rotate: {
          "0%": {
            "--rotate": "0deg",
          },
          "100%": {
            "--rotate": "360deg",
          },
        },
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
