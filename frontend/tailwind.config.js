/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#020617",
        surface: "#0f172a",
        border: "#1e293b",
        primary: {
          DEFAULT: "#2563eb",
          hover: "#1d4ed8",
          light: "#3b82f6",
        },
        secondary: {
          DEFAULT: "#4f46e5",
          hover: "#4338ca",
          light: "#6366f1",
        },
        heritage: {
          DEFAULT: "#f59e0b",
          light: "#fbbf24",
          dark: "#d97706",
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        '2xl': '1rem',
        'xl': '0.75rem',
      },
    },
  },
  plugins: [],
}
