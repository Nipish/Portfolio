import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ── Fonts ────────────────────────────────────────────────────────────
      fontFamily: {
        // Accessed via font-pixel class or var(--font-pixel)
        pixel: ['var(--font-pixel)', 'monospace'],
      },

      // ── XP Colour Palette ────────────────────────────────────────────────
      colors: {
        xp: {
          blue:       '#003c7e',
          'blue-light': '#2f6fd4',
          gray:       '#ece9d8',
          'gray-dark': '#d4d0c8',
          border:     '#aca899',
          teal:       '#008080', // classic XP desktop fallback
        },
      },

      // ── No border radius anywhere (8-bit aesthetic) ──────────────────────
      borderRadius: {
        DEFAULT: '0px',
        none:    '0px',
        sm:      '0px',
        md:      '0px',
        lg:      '0px',
        xl:      '0px',
        '2xl':   '0px',
        full:    '0px',
      },
    },
  },
  plugins: [],
};

export default config;
