/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      letterSpacing: {
        'luxury': '0.35em',
        'tag': '0.25em'
      },
      fontSize: {
        'xxs': '0.65rem',
      },
      colors: {
        navy: {
          DEFAULT: '#021E36',
          soft: '#052a4a'
        },
        gold: {
          DEFAULT: '#C1A172',
          light: '#dfcfb7',
          dark: '#9d7f52'
        },
        ivory: {
          DEFAULT: '#FAF9F6',
          warm: '#F5F2ED'
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
        line: '#EAE3D5'
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
