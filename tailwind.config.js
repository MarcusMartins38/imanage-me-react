/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
        maxWidth: {
        '100': '25rem',
        '104': '26rem',
        '108': '27rem',
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

