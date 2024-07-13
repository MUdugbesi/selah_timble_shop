/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": '#F1F4F6',
        "primary_2": '#97DD0C',
        "secondary": '#F2F2F2',
        "secondary_2": '#056835',
        "text": "#232323",
        "outline": "#009646",
        "button": "#1F2A37"
      },
      fontFamily: {
        "athena": ["athena", "sans-serif"],
        "ibm-plex-sans": ["IBM Plex Sans", "sans-serif"],
        "lato": ["Lato", "sans-serif"],
        "italiana": ["Italiana", "sans-serif"]
      },


    },
  },
  plugins: [import('tailwindcss-animate')],
}

