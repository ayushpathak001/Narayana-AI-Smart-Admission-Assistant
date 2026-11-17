/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: '#102A43', 800: '#16385A' },
        royal: '#2563EB',
        gold: { DEFAULT: '#F4B942', dark: '#D99A1F' },
        mist: '#F5F7FA',
        ink: '#1E293B',
        leaf: '#2F8F3E', // green taken from the shield in the NCET logo
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Figtree', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 10px 30px -12px rgba(16,42,67,0.28)',
        soft: '0 2px 10px -4px rgba(16,42,67,0.2)',
      },
      keyframes: {
        dot: {
          '0%, 80%, 100%': { transform: 'translateY(0)', opacity: '0.4' },
          '40%': { transform: 'translateY(-4px)', opacity: '1' },
        },
      },
      animation: { dot: 'dot 1.2s infinite ease-in-out' },
    },
  },
  plugins: [],
};
