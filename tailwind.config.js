/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#07090D',
        panel: '#0B0E14',
        pearl: '#F2F0E8',
        mist: '#AEB4C0',
        electric: '#6E8BFF',
        'electric-soft': '#B7C4FF',
      },
      fontFamily: {
        sans: ['"Space Grotesk"', '"Noto Sans Thai"', '"Noto Sans SC"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', '"Noto Sans Thai"', '"Noto Sans SC"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', '"Noto Serif Thai"', '"Noto Serif SC"', 'ui-serif', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', '"Noto Sans Thai"', '"Noto Sans SC"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        thai: ['"Noto Sans Thai"', '"Space Grotesk"', 'system-ui', 'sans-serif'],
        sc: ['"Noto Sans SC"', '"Space Grotesk"', 'system-ui', 'sans-serif'],
        'serif-thai': ['"Noto Serif Thai"', '"Instrument Serif"', 'serif'],
        'serif-sc': ['"Noto Serif SC"', '"Instrument Serif"', 'serif'],
      },
      animation: {
        marquee: 'marquee 42s linear infinite',
        float: 'float 7s ease-in-out infinite',
        'float-slow': 'float 11s ease-in-out infinite',
        'spin-slow': 'spin 18s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translate3d(0, 0, 0)' },
          '100%': { transform: 'translate3d(-50%, 0, 0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      boxShadow: {
        soft: '0 30px 90px -30px rgba(0, 0, 0, 0.9)',
        glow: '0 0 80px -20px rgba(110, 139, 255, 0.5)',
      },
    },
  },
  plugins: [],
}
