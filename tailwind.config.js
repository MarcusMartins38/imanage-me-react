/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      transitionProperty: {
        width: "width max-width",
      },
      maxWidth: {
        100: "25rem",
        104: "26rem",
        108: "27rem",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      "light",
      "dark",
      {
        synthwave: {
          primary: "#ff8c00",
          secondary: "#ff00ff",
          accent: "#00ffff",
          neutral: "#292929",
          "base-100": "#2b2b2b",
          "base-200": "#1f1f1f",
          "base-300": "#121212",
        },
      },
    ],
  },
};
