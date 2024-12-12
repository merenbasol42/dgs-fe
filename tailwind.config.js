/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        // Dark mode specific colors
        dark: {
          background: '#1a202c',
          text: '#e2e8f0',
          primary: '#4299e1',
        }
      },
      backgroundColor: {
        dark: {
          primary: '#2d3748',
          secondary: '#4a5568',
        }
      },
      textColor: {
        dark: {
          primary: '#e2e8f0',
          secondary: '#cbd5e0',
        }
      }
    },
  },
  plugins: [],
}
