/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#FAF9F6",
        surface: "#F2F0EA",
        border: "#E2DFD7",
        ink: {
          DEFAULT: "#161616",
          muted: "#5A5854",
        },
        navy: {
          DEFAULT: "#0F2942",
          hover: "#183856",
        },
        bordeaux: {
          DEFAULT: "#7C1D26",
          hover: "#94232E",
        },
      },
      fontFamily: {
        serif: ['Newsreader', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        'none': '0px',
        'sm': '2px',
        DEFAULT: '2px',
      },
    },
  },
  plugins: [],
}
