/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
  plugins: [],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: {
          white: 'rgba(247, 250, 251, 1)',
          grey: 'rgba(55, 74, 80, 0.5)',
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
      fonts: {
        gordita: ['Gordita', 'sans-serif'],
        gorditaLight: ['Gordita Light', 'sans-serif']
      }
    }
  }
}
