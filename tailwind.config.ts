import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        os: {
          bg: '#0d1117',
          surface: '#161b22',
          surface2: '#1c2333',
          border: 'rgba(255,255,255,0.08)',
          text: '#e6edf3',
          textSecondary: '#8b949e',
          green: '#00ff41',
          cyan: '#00d2ff',
          purple: '#a78bfa',
          amber: '#f59e0b',
          red: '#ff5f56',
          yellow: '#ffbd2e',
          greenDot: '#27c93f',
        }
      }
    },
  },
  plugins: [],
};

export default config;