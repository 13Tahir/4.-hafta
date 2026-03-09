/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'space-dark': '#0a0a0f',
        'space-purple': '#1a0b2e',
        'neon-purple': '#a855f7',
        'neon-blue': '#3b82f6',
        'status-pending': '#f59e0b',
        'status-active': '#10b981',
        'status-complete': '#6366f1',
      },
      backgroundImage: {
        'space-gradient': 'radial-gradient(circle at center, #1a0b2e 0%, #0a0a0f 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
}
