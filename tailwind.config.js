/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#08090b',
          900: '#0c0e12',
          850: '#101318',
          800: '#141821',
          750: '#191e29',
          700: '#1f2532',
          600: '#2a3142',
          500: '#3a4254',
          400: '#525c70',
          300: '#7a8499',
          200: '#aab4c7',
          100: '#d4dbe8',
        },
        accent: {
          DEFAULT: '#e8965a',
          50: '#fdf6f0',
          100: '#faeadb',
          200: '#f4d0b0',
          300: '#edb084',
          400: '#e8965a',
          500: '#d97a3e',
          600: '#b85f2e',
          700: '#934a28',
          800: '#6e3823',
          900: '#4a261a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'glow-pulse': 'glowPulse 4s ease-in-out infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'shimmer': 'shimmer 3s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.7' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};
