/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        backgroundColor: '#B7D7E7',
        headerColor: '#115174',
        boardColor: '#77B6D3',
        playerXColor: '#2588B8',
        playerOColor: '#fff',
        hoverColor: '#a0cee6',
        winColor: '#123c53',
        resetColor: '#123c53',
      },
    },
  },
  plugins: [],
}

