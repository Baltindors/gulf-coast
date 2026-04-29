/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0F2438',
          soft: '#1a324a'
        },
        gold: {
          DEFAULT: '#B89668',
          light: '#d4b88a',
          dark: '#8f7148'
        },
        ivory: {
          DEFAULT: '#F8F4ED',
          warm: '#F2EBDD'
        },
        sand: {
          DEFAULT: '#EDE4D3',
          deep: '#d9cdb5'
        },
        ink: '#1a2433',
        slate: {
          DEFAULT: '#6B7585',
          light: '#9aa0ab'
        },
        line: '#e3d8c2'
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'sans-serif'],
        serif: ['Cormorant Garamond', 'Times New Roman', 'serif'],
        script: ['Pinyon Script', 'cursive'],
        mono: ['JetBrains Mono', 'Courier New', 'monospace']
      },
      boxShadow: {
        sm: '0 1px 2px rgba(15, 36, 56, 0.04), 0 2px 8px rgba(15, 36, 56, 0.04)',
        md: '0 4px 16px rgba(15, 36, 56, 0.06), 0 12px 40px rgba(15, 36, 56, 0.08)'
      }
    },
  },
  plugins: [],
}
