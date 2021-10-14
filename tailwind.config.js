module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      titulo: ['IBM Plex Sans'],
      boton: ['Montserrat'],
    },
    extend: {
      spacing:{
        '66': '20rem',
        '69': '29rem',
        '89': '40rem',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
