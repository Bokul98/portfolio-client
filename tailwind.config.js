/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'gradient-x': 'gradient-x 15s ease infinite',
        'gradient-text': 'gradient-text 5s ease infinite',
        'border-flow-x': 'border-flow-x 8s linear infinite',
        'border-flow-x-reverse': 'border-flow-x 8s linear infinite reverse',
        'border-flow-y': 'border-flow-y 8s linear infinite',
        'border-flow-y-reverse': 'border-flow-y 8s linear infinite reverse',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        'gradient-text': {
          '0%, 100%': {
            'background-size': '200% auto',
            'background-position': '0% center'
          },
          '50%': {
            'background-size': '200% auto',
            'background-position': '100% center'
          },
        },
        'border-flow-x': {
          '0%': {
            'transform': 'translateX(0%)'
          },
          '100%': {
            'transform': 'translateX(100%)'
          }
        },
        'border-flow-y': {
          '0%': {
            'transform': 'translateY(0%)'
          },
          '100%': {
            'transform': 'translateY(100%)'
          }
        },
      },
    },
  },
  plugins: [],
} 