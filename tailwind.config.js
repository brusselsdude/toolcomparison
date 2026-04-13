/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        midnight: {
          50:  '#eef2ff',
          100: '#dce4fd',
          200: '#b8c9fc',
          300: '#8aa6f8',
          400: '#5a7ef2',
          500: '#3a5ce8',
          600: '#2440c8',
          700: '#1e33a3',
          800: '#1a2c83',
          900: '#0f1b52',
          925: '#0a1230',
          950: '#060b1d',
        },
        electric: {
          50:  '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
        },
        neon: {
          green:  '#22ff88',
          blue:   '#3b82f6',
          purple: '#a855f7',
          pink:   '#ec4899',
          orange: '#f97316',
          red:    '#ef4444',
          yellow: '#facc15',
          cyan:   '#06d6a0',
        },
      },
      fontFamily: {
        display: ['"Outfit"', 'system-ui', 'sans-serif'],
        body:    ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'fade-in':      'fadeIn 0.5s ease-out forwards',
        'fade-up':      'fadeUp 0.55s ease-out forwards',
        'slide-right':  'slideRight 0.5s ease-out forwards',
        'glow-pulse':   'glowPulse 4s ease-in-out infinite',
        'float':        'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideRight: {
          '0%':   { opacity: '0', transform: 'translateX(-18px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.4' },
          '50%':      { opacity: '0.75' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};
