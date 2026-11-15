/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: 'rgb(var(--color-ink) / <alpha-value>)',
        panel: 'rgb(var(--color-panel) / <alpha-value>)',
        pearl: 'rgb(var(--color-pearl) / <alpha-value>)',
        mist: 'rgb(var(--color-mist) / <alpha-value>)',
        electric: 'rgb(var(--color-electric) / <alpha-value>)',
        'electric-soft': 'rgb(var(--color-electric-soft) / <alpha-value>)',
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
        soft: '0 18px 50px -28px rgba(17, 17, 17, 0.18)',
        glow: '0 0 0 1px rgba(33, 63, 209, 0.14)',
      },
    },
  },
  plugins: [],
}
