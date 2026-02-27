import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-black': '#0a0a0a',
        'brand-red': {
          DEFAULT: '#800000',
          light: '#b30000',
          dark: '#4d0000',
          glow: '#c00000',
        },
        'brand-muted': '#3a3a3a',
        'brand-text': '#f0f0f0',
        'brand-subtle': '#999999',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}

export default config
