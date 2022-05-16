module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        body: '#fcf4f0',
        primary: 'rgba(219,53,41)',
        "primary-200": "#e37d79",
        "primary-300": "#de544e",
        "primary-400": "#ca3126",
        "primary-500": "#a1271e",
        "primary-600": "#7b1e17",
        input: 'rgb(234 104 126 / 30%)',
        label: 'rgb(234 104 126)'
      }
    },

    safelist: ['bg-[#1ABC9C]']
  },
  plugins: [],
}
