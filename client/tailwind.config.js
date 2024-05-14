/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
  plugins: [],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: {
          primary: 'rgba(246,250,251,255)',
          white: 'rgba(247, 250, 251, 1)',
          grey: 'rgba(223, 229, 231, 1)',
          tertiary: 'rgba(255, 255, 255, 1)',
          red: 'rgba(225, 40, 40, 1)',
          green: 'rgba(0, 210, 162, 1)'
        },
        text: {
          white: '#f7fafb',
          black: '#17181c',
          grey: 'rgba(82, 87, 101, 1)'
        }
      },
      breakpoints: {
        large: '1624px'
      },
      fontFamily: {
        gordita: ['Gordita', 'sans-serif'],
        gorditaLight: ['Gordita Light', 'sans-serif']
      }
    }
  }
}
