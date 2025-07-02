/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#1a5490',
        'custom-green': '#2e7d32',
        'custom-orange': '#f57c00',
        'custom-surface': '#ffffff',
        'custom-background': '#f5f5f5',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'arabic': ['Noto Naskh Arabic', 'serif'],
      },
      animation: {
        'pulse-green': 'pulseGreen 0.3s ease-out',
      },
      keyframes: {
        pulseGreen: {
          '0%': { backgroundColor: '#2e7d32' },
          '50%': { backgroundColor: '#4caf50' },
          '100%': { backgroundColor: '#2e7d32' },
        },
      },
    },
  },
  plugins: [],
}